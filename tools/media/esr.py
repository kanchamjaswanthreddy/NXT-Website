"""Upscale photos with Real-ESRGAN weights, without torch.

The .pth files are read with a restricted unpickler (tensors and ordered dicts only), turned into
an ONNX graph, and run with onnxruntime on the CPU.

  python3 -I esr.py <weights.pth> <x2plus|general> <out_dir> <image> [<image> ...]
"""
import collections
import io
import os
import pickle
import sys
import time
import zipfile

import numpy as np
import onnx
import onnxruntime as ort
from onnx import TensorProto, helper, numpy_helper
from PIL import Image

DTYPES = {'FloatStorage': np.float32, 'HalfStorage': np.float16, 'DoubleStorage': np.float64, 'LongStorage': np.int64, 'IntStorage': np.int32}


class _Storage:
    def __init__(self, dtype):
        self.dtype = dtype


def load_pth(path):
    zf = zipfile.ZipFile(path)
    pkl = [n for n in zf.namelist() if n.endswith('data.pkl')][0]
    prefix = pkl[: -len('data.pkl')]

    def rebuild(storage, offset, size, stride, *rest):
        n = int(np.prod(size)) if len(size) else 1
        return np.array(storage[offset: offset + n]).reshape(size)

    class Safe(pickle.Unpickler):
        def find_class(self, mod, name):
            if mod == 'collections' and name == 'OrderedDict':
                return collections.OrderedDict
            if mod == 'torch._utils' and name == '_rebuild_tensor_v2':
                return rebuild
            if mod == 'torch' and name in DTYPES:
                return _Storage(DTYPES[name])
            raise pickle.UnpicklingError(f'blocked {mod}.{name}')

        def persistent_load(self, pid):
            _, storage, key, _loc, _numel = pid
            return np.frombuffer(zf.read(f'{prefix}data/{key}'), dtype=storage.dtype)

    state = Safe(io.BytesIO(zf.read(pkl))).load()
    for k in ('params_ema', 'params'):
        if k in state:
            return state[k]
    return state


class G:
    """Tiny ONNX graph builder."""

    def __init__(self):
        self.nodes, self.inits, self.n = [], [], 0

    def name(self, p='t'):
        self.n += 1
        return f'{p}{self.n}'

    def const(self, arr, p='c'):
        nm = self.name(p)
        self.inits.append(numpy_helper.from_array(np.ascontiguousarray(arr), nm))
        return nm

    def op(self, kind, ins, **attrs):
        out = self.name()
        self.nodes.append(helper.make_node(kind, ins, [out], **attrs))
        return out

    def conv(self, x, w, b):
        k = w.shape[2]
        return self.op('Conv', [x, self.const(w.astype(np.float32)), self.const(b.astype(np.float32))], kernel_shape=[k, k], pads=[k // 2] * 4)

    def lrelu(self, x):
        return self.op('LeakyRelu', [x], alpha=0.2)

    def up2(self, x, s=2.0):
        return self.op('Resize', [x, '', self.const(np.array([1, 1, s, s], np.float32))], mode='nearest')

    def model(self, out):
        graph = helper.make_graph(self.nodes, 'sr', [helper.make_tensor_value_info('x', TensorProto.FLOAT, [1, 3, 'h', 'w'])], [helper.make_tensor_value_info(out, TensorProto.FLOAT, None)], self.inits)
        m = helper.make_model(graph, opset_imports=[helper.make_opsetid('', 13)])
        m.ir_version = 8
        return m, out


def build_general(sd):
    """SRVGGNetCompact (realesr-general-x4v3): conv, PReLU pairs, pixel shuffle, plus a nearest-neighbour skip."""
    g = G()
    convs = sorted({int(k.split('.')[1]) for k, v in sd.items() if v.ndim == 4})
    h = 'x'
    for i in convs:
        h = g.conv(h, sd[f'body.{i}.weight'], sd[f'body.{i}.bias'])
        slope = sd.get(f'body.{i + 1}.weight')
        if slope is not None and slope.ndim == 1:
            h = g.op('PRelu', [h, g.const(slope.astype(np.float32).reshape(-1, 1, 1))])
    scale = int(round((sd[f'body.{convs[-1]}.weight'].shape[0] / 3) ** 0.5))
    h = g.op('DepthToSpace', [h], blocksize=scale, mode='CRD')
    return g.model(g.op('Add', [h, g.up2('x', float(scale))])) + (scale,)


def build_rrdb(sd, scale):
    """RRDBNet (RealESRGAN_x2plus / x4plus)."""
    g = G()
    x = 'x'
    if scale == 2:
        # PyTorch pixel_unshuffle order = SpaceToDepth followed by a channel reorder.
        x = g.op('SpaceToDepth', [x], blocksize=2)
        idx = np.array([k * 3 + c for c in range(3) for k in range(4)], np.int64)
        x = g.op('Gather', [x, g.const(idx)], axis=1)
    c = lambda nm, t: g.conv(t, sd[f'{nm}.weight'], sd[f'{nm}.bias'])
    feat = c('conv_first', x)
    k02 = g.const(np.array(0.2, np.float32))
    h = feat
    blocks = sorted({int(k.split('.')[1]) for k in sd if k.startswith('body.')})
    for b in blocks:
        r_in = h
        for r in (1, 2, 3):
            p = f'body.{b}.rdb{r}'
            xs = [h]
            for j in (1, 2, 3, 4):
                cat = xs[0] if len(xs) == 1 else g.op('Concat', xs, axis=1)
                xs.append(g.lrelu(c(f'{p}.conv{j}', cat)))
            x5 = c(f'{p}.conv5', g.op('Concat', xs, axis=1))
            h = g.op('Add', [g.op('Mul', [x5, k02]), h])
        h = g.op('Add', [g.op('Mul', [h, k02]), r_in])
    feat = g.op('Add', [feat, c('conv_body', h)])
    feat = g.lrelu(c('conv_up1', g.up2(feat)))
    feat = g.lrelu(c('conv_up2', g.up2(feat)))
    out = c('conv_last', g.lrelu(c('conv_hr', feat)))
    return g.model(out) + (scale,)


def main():
    weights, kind, out_dir = sys.argv[1:4]
    images = sys.argv[4:]
    sd = load_pth(weights)
    (model, out_name, scale) = build_general(sd) if kind == 'general' else build_rrdb(sd, 2 if kind == 'x2plus' else 4)
    opts = ort.SessionOptions()
    opts.intra_op_num_threads = os.cpu_count() or 2
    sess = ort.InferenceSession(model.SerializeToString(), opts, providers=['CPUExecutionProvider'])
    os.makedirs(out_dir, exist_ok=True)
    for path in images:
        t0 = time.time()
        im = Image.open(path).convert('RGB')
        w, h = im.size
        im = im.crop((0, 0, w - w % 2, h - h % 2))
        x = np.asarray(im, np.float32).transpose(2, 0, 1)[None] / 255.0
        y = sess.run([out_name], {'x': x})[0][0]
        y = (np.clip(y, 0, 1).transpose(1, 2, 0) * 255.0 + 0.5).astype(np.uint8)
        dst = os.path.join(out_dir, os.path.splitext(os.path.basename(path))[0] + '.png')
        Image.fromarray(y).save(dst)
        print(f'{os.path.basename(path)} {im.size} -> {y.shape[1]}x{y.shape[0]} in {time.time() - t0:.0f}s', flush=True)


if __name__ == '__main__':
    main()
