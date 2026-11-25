"""Hero film: a living photograph made from the beach still.

The people stay still; the surf creeps in as if in slow motion, the clouds drift and the far
water glints. Motion is a looping flow warp blended over several phases, so the last frame meets
the first exactly and nothing pulses.

  python3 -I beach.py <upscaled.png> <depth.png> <out_dir> <hero-wide|hero-tall|dusk-wide|dusk-tall|dusk-open-wide|dusk-open-tall> [preview]

The dusk versions are a tighter framing of the same scene, graded towards evening light.

`preview` writes mask and frame stills instead of the film.
"""
import os
import subprocess
import sys

import cv2
import numpy as np

FPS = 30
SECONDS = 10
N = FPS * SECONDS
CYCLES = 4          # flow cycles per loop
PHASES = 4


def smooth(a, lo, hi):
    t = np.clip((a - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


def main():
    src_path, depth_path, out_dir, shape = sys.argv[1:5]
    preview = len(sys.argv) > 5
    os.makedirs(out_dir, exist_ok=True)
    src = cv2.imread(src_path, cv2.IMREAD_COLOR)          # 2400x1600 BGR
    depth = cv2.imread(depth_path, cv2.IMREAD_GRAYSCALE)
    H0, W0 = src.shape[:2]
    depth = cv2.resize(depth, (W0, H0), interpolation=cv2.INTER_CUBIC).astype(np.float32) / 255.0

    W, H, x0, y0, cw, ch = {
        'hero-wide': (1920, 1080, 0, 70, 2400, 1350),
        'hero-tall': (1080, 1920, 765, 0, 900, 1600),
        'dusk-wide': (1920, 1080, 415, 360, 1600, 900),
        'dusk-tall': (1080, 1920, 821, 190, 788, 1400),
        'dusk-open-wide': (1920, 1080, 0, 70, 2400, 1350),      # the evening grade on the open, daytime framing
        'dusk-open-tall': (1080, 1920, 765, 0, 900, 1600),
    }[shape]
    evening = shape.startswith('dusk')
    crop = lambda a: cv2.resize(a[y0:y0 + ch, x0:x0 + cw], (W, H), interpolation=cv2.INTER_AREA if cw > W else cv2.INTER_CUBIC)
    img = crop(src).astype(np.float32)
    dep = crop(depth)
    k = W / cw                                            # source px -> frame px
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    ys = yy / k + y0                                      # each frame pixel's source row
    xs = xx / k + x0
    row_of = lambda src_row: int(np.clip(round((src_row - y0) * k), 0, H - 1))

    # Landmarks in source rows.
    HORIZON, CREST, WASH_END, FEET = 699.0, 860.0, 1120.0, 996.0

    # People: nearer than the water at the same row. Depth along a row is close to constant for
    # sea and sand, so the row median is the background.
    row_med = np.median(dep, axis=1, keepdims=True)
    body = smooth(dep - row_med, 0.03, 0.08)
    body[(ys < 520) | (ys > 1010)] = 0
    body[(xs < 930) | (xs > 1500)] = 0
    # Depth cannot tell feet from the ground they stand on: carry each column of the figures
    # straight down to the waterline so legs never move with the surf.
    hard = body > 0.5
    r_lo, r_hi, r_feet = row_of(845), row_of(905), row_of(FEET)   # hips, below the joined hands
    has = hard[r_lo:r_hi].any(axis=0)
    lowest = r_hi - 1 - np.argmax(hard[r_lo:r_hi][::-1], axis=0)
    legs = np.zeros_like(body)
    for x in np.nonzero(has)[0]:
        legs[lowest[x]:r_feet, x] = 1
    people = np.maximum(body, legs)
    people = cv2.dilate(people, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (int(11 * k) | 1, int(11 * k) | 1)))
    people = cv2.GaussianBlur(people, (0, 0), 4 * k)
    # Their shadows and reflections lie on the wet sand just in front of them: hold that still too.
    shade = np.exp(-(((xs - 1300) / 470) ** 2 + ((ys - 1035) / 70) ** 2) ** 2)
    still = np.clip(people + 0.9 * shade, 0, 1)

    # Water (foam and sea) against sand: sand is orange and saturated.
    hsv = cv2.cvtColor(img.astype(np.uint8), cv2.COLOR_BGR2HSV).astype(np.float32)
    hue, sat = hsv[..., 0], hsv[..., 1]
    sand = ((hue > 5) & (hue < 28) & (sat > 70)).astype(np.float32)
    water = (1 - cv2.GaussianBlur(sand, (0, 0), 3 * k)) * smooth(ys, HORIZON + 4, HORIZON + 22)
    water = cv2.GaussianBlur(np.clip(water, 0, 1), (0, 0), 14 * k)
    water *= smooth(-ys, -(WASH_END + 110), -(WASH_END - 60))
    water *= 1 - still

    # Sky: everything above the horizon, fading out around the sun and at the horizon line.
    sun_x, sun_y = 1175.0, 10.0
    r = np.hypot(xs - sun_x, (ys - sun_y) * 1.2)
    sky = smooth(-ys, -(HORIZON - 6), -(HORIZON - 70)) * smooth(r, 170, 520) * (1 - people)

    # Flow, in frame pixels over one cycle (a cycle is SECONDS / CYCLES long).
    fx = np.zeros((H, W), np.float32)
    fy = np.zeros((H, W), np.float32)
    fx += sky * (5 + 9 * smooth(-ys, -HORIZON, -150)) * k * 1.25      # higher cloud is nearer: it moves further
    far = water * smooth(-ys, -(CREST - 60), -(HORIZON + 10))
    fx += far * 6 * k * 1.25                                           # far water slides sideways a little
    near = water * smooth(ys, HORIZON + 30, CREST)
    fy += near * (7 + 12 * smooth(ys, CREST - 20, WASH_END - 60)) * k * 1.25   # crest and wash run towards the camera
    fx += near * (xs - 1215) / 1200 * 8 * k * 1.25                    # and the wash fans out

    # A slow swell under the flow so the water does not slide as one sheet.
    rng = np.random.default_rng(11)
    swell = [(rng.uniform(0.004, 0.012) / k, rng.uniform(0.01, 0.03) / k, int(rng.integers(1, 3)) * int(rng.choice([-1, 1])), rng.uniform(0, 6.28), rng.uniform(0, 6.28)) for _ in range(4)]

    weights = lambda p: 0.5 - 0.5 * np.cos(2 * np.pi * p)

    # Glints on the far water and in the sun's path: travelling waves with whole-number cycles.
    waves = [(rng.uniform(0.05, 0.16) / k, rng.uniform(0.16, 0.5) / k, int(rng.integers(1, 4)) * int(rng.choice([-1, 1])), rng.uniform(0, 6.28)) for _ in range(7)]
    lum = img.mean(axis=2) / 255.0
    glint_zone = smooth(ys, HORIZON + 2, HORIZON + 14) * smooth(-ys, -(CREST + 40), -(HORIZON + 30)) * smooth(lum, 0.55, 0.95) * (1 - people)
    glint_zone *= 0.35 + 0.65 * np.exp(-((xs - 1190) / 330) ** 2)

    # Evening grade: lower exposure, warm highlights, cooler shadows, a low sun glow and a vignette.
    lum0 = (img @ np.array([0.114, 0.587, 0.299], np.float32)) / 255.0
    hi = smooth(lum0, 0.30, 0.92)[..., None]
    tone = hi * np.array([0.64, 0.83, 1.0], np.float32) + (1 - hi) * np.array([0.96, 0.86, 0.82], np.float32)
    glow = np.exp(-(((xx - W * 0.5) / (W * 0.55)) ** 2 + ((ys - HORIZON) / 260) ** 2))[..., None] * np.array([26, 74, 138], np.float32)
    vig = (1 - 0.42 * smooth(np.hypot((xx - W / 2) / (W / 2), (yy - H / 2) / (H / 2)), 0.55, 1.45))[..., None]

    def grade(out):
        if not evening:
            return out
        x = np.clip(out / 255.0, 0, 1) ** 1.42
        x = x * tone * 0.93 + glow / 255.0 * (0.25 + 0.75 * x)
        return x * vig * 255.0

    def frame(i):
        t = i / N
        sx = np.zeros((H, W), np.float32)
        sy = np.zeros((H, W), np.float32)
        for kx, ky, cyc, pa, pb in swell:
            arg = xx * kx + yy * ky + 2 * np.pi * cyc * t
            sx += np.sin(arg + pa)
            sy += np.cos(xx * kx * 1.3 - yy * ky * 0.8 + 2 * np.pi * cyc * t + pb)
        sx *= water * 1.6 * k
        sy *= water * 2.2 * k
        out = np.zeros_like(img)
        total = 0.0
        for j in range(PHASES):
            p = (t * CYCLES + j / PHASES) % 1.0
            w = weights(p)
            total += w
            out += w * cv2.remap(img, xx - fx * (p - 0.5) + sx, yy - fy * (p - 0.5) + sy, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
        out /= total
        g = np.zeros((H, W), np.float32)
        for kx, ky, cyc, ph in waves:
            g += np.sin(xx * kx + yy * ky + 2 * np.pi * cyc * t + ph)
        g = np.clip(g / len(waves) * 2.2, -1, 1)
        out *= (1 + 0.16 * g * glint_zone)[..., None]
        return np.clip(grade(out), 0, 255).astype(np.uint8)

    if preview:
        vis = img.copy() * 0.45
        vis[..., 0] += water * 140
        vis[..., 1] += sky * 140
        vis[..., 2] += still * 200
        cv2.imwrite(os.path.join(out_dir, f'{shape}-masks.jpg'), np.clip(vis, 0, 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 88])
        for i in (0, 38, 75, 150):
            cv2.imwrite(os.path.join(out_dir, f'{shape}-f{i:03d}.jpg'), frame(i), [cv2.IMWRITE_JPEG_QUALITY, 92])
        print('flow max', float(np.abs(fx).max()), float(np.abs(fy).max()))
        return

    tmp = os.path.join(out_dir, f'{shape}.part.mp4')
    final = os.path.join(out_dir, f'{shape}.mp4')
    enc = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                            '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', os.environ.get('CRF', '22'), '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', '-g', str(N), '-keyint_min', str(N), '-sc_threshold', '0', tmp], stdin=subprocess.PIPE)
    for i in range(N):
        enc.stdin.write(frame(i).tobytes())
    enc.stdin.close()
    if enc.wait() == 0:
        os.replace(tmp, final)
        cv2.imwrite(os.path.join(out_dir, f'{shape}.jpg'), frame(0), [cv2.IMWRITE_JPEG_QUALITY, 84, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
        print('wrote', final, os.path.getsize(final))
    else:
        print('encode failed')


if __name__ == '__main__':
    main()
