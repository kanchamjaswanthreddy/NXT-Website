"""Depth maps for photographs (Depth Anything V2 small, ONNX, CPU).

  python3 -I depth.py <model.onnx> <out_dir> <image> [<image> ...]

Writes <name>.png: 8-bit, white = near, black = far, edges tidied against the photo.
"""
import os
import sys

import cv2
import numpy as np
import onnxruntime as ort

MEAN = np.array([0.485, 0.456, 0.406], np.float32)
STD = np.array([0.229, 0.224, 0.225], np.float32)


def main():
    model, out_dir = sys.argv[1:3]
    sess = ort.InferenceSession(model, providers=['CPUExecutionProvider'])
    inp = sess.get_inputs()[0]
    size = inp.shape[2]
    os.makedirs(out_dir, exist_ok=True)
    for path in sys.argv[3:]:
        bgr = cv2.imread(path, cv2.IMREAD_COLOR)
        h, w = bgr.shape[:2]
        rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
        x = cv2.resize(rgb, (size, size), interpolation=cv2.INTER_AREA).astype(np.float32) / 255.0
        x = ((x - MEAN) / STD).transpose(2, 0, 1)[None]
        d = sess.run(None, {inp.name: x})[0][0]
        d = (d - d.min()) / max(1e-6, d.max() - d.min())
        ow = 1024 if w >= h else int(1024 * w / h)
        oh = int(ow * h / w)
        d = cv2.resize(d, (ow, oh), interpolation=cv2.INTER_CUBIC)
        guide = cv2.resize(rgb, (ow, oh), interpolation=cv2.INTER_AREA)
        d = cv2.ximgproc.guidedFilter(guide, d.astype(np.float32), 12, 1e-3)
        d = np.clip(d, 0, 1)
        name = os.path.splitext(os.path.basename(path))[0]
        cv2.imwrite(os.path.join(out_dir, name + '.png'), (d * 255 + 0.5).astype(np.uint8))
        print(name, (w, h), '->', (ow, oh), flush=True)


if __name__ == '__main__':
    main()
