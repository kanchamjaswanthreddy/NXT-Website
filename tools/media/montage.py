"""The opening film as a montage: the two beach loops and three photographs, each photograph given
a slow camera move from its depth map, cross-faded into one seamless loop.

  python3 -I montage.py <site_public_dir> <work_dir> <out_dir> <wide|tall> [preview]

<work_dir> holds the enlarged photographs and depth maps (see README): up/*.png, depth/*.png and
montage/up/fa-crop.png with montage/fa-crop-depth.png. Writes montage-<shape>.mp4 and .jpg to
<out_dir>; with `preview`, writes still frames to <out_dir>/preview instead.
"""
import os
import subprocess
import sys

import cv2
import numpy as np

FPS = 30
XF = 21                      # frames of cross-fade between scenes


def smooth(t):
    t = min(1.0, max(0.0, t))
    return t * t * (3 - 2 * t)


class Loop:
    """A stretch of one of the existing film loops, cropped to the output shape."""

    def __init__(self, path, seconds, W, H, top=0, start=0):
        cap = cv2.VideoCapture(path)
        total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        cap.set(cv2.CAP_PROP_POS_FRAMES, start % total)
        self.n = int(round(seconds * FPS))
        self.frames = []
        for _ in range(self.n):
            ok, f = cap.read()
            if not ok:                               # the source is itself a loop: carry on from its first frame
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                ok, f = cap.read()
            h, w = f.shape[:2]
            ch = round(w * H / W)
            f = f[top: top + ch]
            if (f.shape[1], f.shape[0]) != (W, H):
                f = cv2.resize(f, (W, H), interpolation=cv2.INTER_AREA)
            self.frames.append(f)
        cap.release()

    def frame(self, k):
        return self.frames[k]


class Still:
    """A photograph seen by a slowly moving camera.

    `a` and `b` are the framing at the first and last frame as (centre x, centre y, width) in
    pixels of the photograph after `pad` (a fraction of its height) of soft, mirrored headroom has
    been added above it. `drift` is how far, in pixels, near things slide against far things over
    the move, which is what makes it read as a camera and not a zoom.
    """

    def __init__(self, image, depth, seconds, W, H, a, b, pad=0.0, drift=(14.0, 4.0), focus=0.45):
        img = cv2.imread(image, cv2.IMREAD_COLOR)
        h, w = img.shape[:2]
        d = cv2.imread(depth, cv2.IMREAD_GRAYSCALE).astype(np.float32) / 255.0
        d = cv2.resize(d, (w, h), interpolation=cv2.INTER_CUBIC)
        d = cv2.GaussianBlur(d, (0, 0), w * 0.007)                       # soft edges: no tearing at outlines
        p = int(round(pad * h))
        if p:
            # Headroom: the photograph mirrored upwards and melted into a heavy blur within a few
            # dozen pixels, so walls and sky carry on above the frame without a second subject.
            img = cv2.copyMakeBorder(img, p, 0, 0, 0, cv2.BORDER_REFLECT_101)
            soft = cv2.GaussianBlur(img[: p + 80], (0, 0), w * 0.05)
            ramp = np.clip((p - np.arange(p + 80, dtype=np.float32)) / 90.0, 0, 1)[:, None, None]
            ramp = ramp * ramp * (3 - 2 * ramp)
            img[: p + 80] = (img[: p + 80] * (1 - ramp) + soft * ramp).astype(np.uint8)
            d = cv2.copyMakeBorder(d, p, 0, 0, 0, cv2.BORDER_REPLICATE)
        self.img, self.depth = img, d
        self.n = int(round(seconds * FPS))
        self.a, self.b, self.drift, self.focus = a, b, drift, focus
        self.W, self.H = W, H
        gx, gy = np.meshgrid((np.arange(W, dtype=np.float32) + 0.5) / W - 0.5, (np.arange(H, dtype=np.float32) + 0.5) / H - 0.5)
        self.gx, self.gy = gx, gy

    def frame(self, k):
        u = k / (self.n - 1)
        cx, cy, cw = (self.a[i] + (self.b[i] - self.a[i]) * u for i in range(3))
        ch = cw * self.H / self.W
        xs = cx + self.gx * cw
        ys = cy + self.gy * ch
        d = cv2.remap(self.depth, xs, ys, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE) - self.focus
        s = (u - 0.5) * 2
        return cv2.remap(self.img, xs + d * (self.drift[0] * s), ys + d * (self.drift[1] * s), cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT_101)


def scenes(shape, public, work):
    up, depth = os.path.join(work, 'up'), os.path.join(work, 'depth')
    fa, fa_d = os.path.join(work, 'montage', 'up', 'fa-crop.png'), os.path.join(work, 'montage', 'fa-crop-depth.png')
    v = lambda name: os.path.join(public, 'videos', f'{name}-{shape}.mp4')
    u = lambda name: os.path.join(up, name + '.png')
    dp = lambda name: os.path.join(depth, name + '.png')
    if shape == 'wide':
        W, H = 1920, 1080
        return W, H, [
            Loop(v('hero'), 4.3, W, H),
            Still(fa, fa_d, 3.7, W, H, a=(1280, 780, 2560), b=(1290, 790, 2440), drift=(16, 5)),
            Still(u('retirement'), dp('retirement'), 3.7, W, H, a=(1130, 772, 2220), b=(1200, 735, 2400), pad=0.14, drift=(-15, 4), focus=0.5),
            Still(u('care'), dp('care'), 3.7, W, H, a=(1200, 705, 2400), b=(1140, 724, 2240), pad=0.22, drift=(14, -4), focus=0.5),
            Loop(v('dusk'), 4.3, W, H, start=40),
        ]
    W, H = 1080, 1440
    return W, H, [
        Loop(v('hero'), 4.3, W, H, top=300),
        Still(fa, fa_d, 3.7, W, H, a=(1340, 940, 1410), b=(1350, 960, 1350), drift=(12, 5)),
        Still(u('retirement'), dp('retirement'), 3.7, W, H, a=(930, 990, 1250), b=(950, 964, 1320), pad=0.22, drift=(-11, 4), focus=0.5),
        Still(u('care'), dp('care'), 3.7, W, H, a=(1010, 930, 1350), b=(990, 950, 1270), pad=0.30, drift=(10, -4), focus=0.5),
        Loop(v('dusk'), 4.3, W, H, top=180, start=40),
    ]


def main():
    public, work, out_dir, shape = sys.argv[1:5]
    preview = len(sys.argv) > 5 and sys.argv[5] == 'preview'
    W, H, sc = scenes(shape, public, work)
    starts, s = [], 0
    for x in sc:
        starts.append(s)
        s += x.n - XF
    T = s

    def compose(j):
        f = (j + XF) % T                      # the film opens on the first scene fully in, so its still frame is clean
        live = []
        for i, x in enumerate(sc):
            for k in (f - starts[i], f - starts[i] + T):
                if 0 <= k < x.n:
                    live.append((k, x))
        live.sort(key=lambda t: -t[0])        # oldest first
        out = live[0][1].frame(live[0][0])
        for k, x in live[1:]:
            a = smooth(k / XF)
            out = cv2.addWeighted(out, 1 - a, x.frame(k), a, 0)
        return out

    os.makedirs(out_dir, exist_ok=True)
    if preview:
        pdir = os.path.join(out_dir, 'preview')
        os.makedirs(pdir, exist_ok=True)
        marks = [0]
        for i in range(1, len(sc)):
            marks += [starts[i] - XF + XF // 2, starts[i] - XF + 4, starts[i] + sc[i].n - XF - 2 - XF]
        marks += [T - XF // 2 - 1]
        for j in sorted(set(m % T for m in marks)):
            cv2.imwrite(os.path.join(pdir, f'{shape}-{j:04d}.jpg'), compose(j), [cv2.IMWRITE_JPEG_QUALITY, 88])
        print('frames', T, 'seconds', T / FPS, 'preview at', sorted(set(m % T for m in marks)))
        return

    name = os.path.join(out_dir, f'montage-{shape}')
    tmp = name + '.part.mp4'
    enc = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                            '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-pix_fmt', 'yuv420p', '-g', '60', '-movflags', '+faststart', tmp], stdin=subprocess.PIPE)
    for j in range(T):
        frame = compose(j)
        if j == 0:
            cv2.imwrite(name + '.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 84, cv2.IMWRITE_JPEG_PROGRESSIVE, 1, cv2.IMWRITE_JPEG_OPTIMIZE, 1])
        enc.stdin.write(frame.tobytes())
    enc.stdin.close()
    if enc.wait() != 0:
        raise SystemExit('encoder failed')
    os.replace(tmp, name + '.mp4')
    print(name + '.mp4', T, 'frames', round(T / FPS, 2), 's', round(os.path.getsize(name + '.mp4') / 1e6, 2), 'MB')


if __name__ == '__main__':
    main()
