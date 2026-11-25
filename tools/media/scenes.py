"""Scene pictures for the home page's opening: one per word in "Protect your ...".

Each photograph is reframed for a full-screen picture with a headline over its upper half: soft
headroom is added above it (the photograph mirrored upwards and melted into a blur), the faces are
placed in the lower part of the frame, and the picture is graded towards warm evening light so the
five scenes sit together and white type reads on them.

  python3 -I scenes.py <work_dir> <site_public_dir> [preview]

<work_dir> holds up/*.png and depth/*.png (see README). Writes to <site_public_dir>/media/scenes:
  <name>.jpg (1920x1080), <name>-tall.jpg (1080x2160), their depth maps (-depth.jpg, half size),
  <name>-thumb.jpg (240x240) and <name>-blur.jpg (64 px wide, for the backdrop outside the frame).
With `preview`, writes one contact sheet to <work_dir>/scenes-preview.jpg instead.

The family scene is not made here: it is the evening film's own still frame (dusk-open-wide.jpg
and dusk-open-tall.jpg in /videos), copied across with depth maps cut from the beach photograph to match.
"""
import os
import sys

import cv2
import numpy as np

WIDE, TALL = (1920, 1080), (1080, 2160)

# name: (photograph, wide (left, top, width), tall (left, top, width), thumbnail (centre x, centre y, size))
# `top` is in rows of the photograph and may be negative: that much headroom is added above it.
SCENES = {
    'retirement': ('retirement', (0, -330, 2400), (250, -930, 1250), (900, 620, 900)),
    'care': ('care', (0, -300, 2400), (300, -940, 1250), (1000, 600, 900)),
    'health': ('medicare', (0, -330, 2400), (1250, -680, 1000), (1700, 560, 900)),
    'paycheck': ('professional', (0, -180, 2400), (850, -940, 1250), (1150, 640, 900)),
}
# The evening film's framing of the beach photograph (see beach.py): left, top, width, height.
FAMILY = {'wide': (0, 70, 2400, 1350), 'tall': (765, 0, 900, 1600)}


def smooth(a, lo, hi):
    t = np.clip((a - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


def headroom(img, depth, p):
    """Add p rows above the photograph.

    The new rows are the wall behind the people, not the people: each column takes the colour of
    the far pixels (dark in the depth map) along the photograph's top edge, columns hidden by a
    head borrow from their neighbours, and the result is carried upwards as a soft, out-of-focus
    surface. The photograph's own top rows melt into it over a short ramp.
    """
    if p <= 0:
        return img, depth
    h, w = img.shape[:2]
    band = 70
    top = img[:band].astype(np.float32)
    far = (depth[:band] < np.percentile(depth, 42)).astype(np.float32)
    num = (top * far[..., None]).sum(0)[None]                     # 1 x w x 3
    den = far.sum(0)[None, :, None].repeat(3, axis=2)             # 1 x w x 3
    sig = w * 0.11
    num = cv2.GaussianBlur(num, (0, 0), sig, borderType=cv2.BORDER_REPLICATE)
    den = cv2.GaussianBlur(den, (0, 0), sig, borderType=cv2.BORDER_REPLICATE)
    mean = top.reshape(-1, 3).mean(0)
    wall = np.where(den > 0.5, num / np.maximum(den, 1e-3), mean)  # 1 x w x 3
    wall = cv2.GaussianBlur(wall.astype(np.float32), (0, 0), w * 0.03, borderType=cv2.BORDER_REPLICATE)
    ramp_px = 110
    reach = p + ramp_px
    out = cv2.copyMakeBorder(img, p, 0, 0, 0, cv2.BORDER_REPLICATE).astype(np.float32)
    # a little darker towards the top, as a wall falls off above a lit room
    fall = (0.9 + 0.1 * np.clip(np.arange(reach, dtype=np.float32) / max(1, p), 0, 1))[:, None, None]
    surface = np.repeat(wall, reach, axis=0) * fall
    # Where a head is cut by the photograph's top edge, carry it a short way up (its own top rows,
    # mirrored) and let it fade, so it ends in a soft round and not a straight line.
    near = 1.0 - far[:40].mean(0)
    near = cv2.GaussianBlur(near[None].astype(np.float32), (0, 0), w * 0.012, borderType=cv2.BORDER_REPLICATE)[0]
    near = np.clip((near - 0.25) / 0.5, 0, 1)[None, :, None]
    ramp = np.clip((p + ramp_px - np.arange(reach, dtype=np.float32)) / ramp_px, 0, 1)[:, None, None]
    ramp = ramp * ramp * (3 - 2 * ramp)
    keep = 1 - ramp * (1 - near)                       # the wall melts into the surface; heads do not
    keep[:p] = 0
    out[:reach] = out[:reach] * keep + surface * (1 - keep)
    R = min(p, 170)
    mirror = img[1:R + 1][::-1].astype(np.float32)
    t = (np.arange(R, dtype=np.float32) + 1) / R       # 0 at the top of the carried-up part, 1 at the edge
    alpha = (t * t * (3 - 2 * t))[:, None, None] ** 1.6 * near
    out[p - R:p] = out[p - R:p] * (1 - alpha) + mirror * alpha
    depth = cv2.copyMakeBorder(depth, p, 0, 0, 0, cv2.BORDER_REPLICATE)
    return np.clip(out, 0, 255).astype(np.uint8), depth


def grade(img):
    """Warm evening light: lower exposure, amber highlights, cooler shadows, a soft vignette."""
    h, w = img.shape[:2]
    x = img.astype(np.float32) / 255.0
    lum = x @ np.array([0.114, 0.587, 0.299], np.float32)
    hi = smooth(lum, 0.28, 0.9)[..., None]
    tone = hi * np.array([0.70, 0.88, 1.0], np.float32) + (1 - hi) * np.array([0.98, 0.90, 0.87], np.float32)
    x = (x ** 1.24) * tone * 0.98
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    # a low sun from the upper right, and darker corners
    glow = np.exp(-(((xx - w * 0.86) / (w * 0.5)) ** 2 + ((yy - h * 0.2) / (h * 0.5)) ** 2))[..., None] * np.array([0.02, 0.07, 0.13], np.float32)
    x = x + glow * (0.3 + 0.7 * x)
    vig = (1 - 0.36 * smooth(np.hypot((xx - w / 2) / (w / 2), (yy - h / 2) / (h / 2)), 0.55, 1.45))[..., None]
    return np.clip(x * vig * 255.0, 0, 255).astype(np.uint8)


def frame(img, depth, left, top, width, size):
    W, H = size
    height = int(round(width * H / W))
    p = max(0, -top)
    img, depth = headroom(img, depth, p)
    y0 = top + p
    cut = lambda a: a[y0:y0 + height, left:left + width]
    assert y0 + height <= img.shape[0], 'frame runs off the bottom of the photograph'
    pic = cv2.resize(cut(img), (W, H), interpolation=cv2.INTER_AREA if width > W else cv2.INTER_CUBIC)
    dep = cv2.resize(cut(depth), (W // 2, H // 2), interpolation=cv2.INTER_AREA)
    return pic, dep


def write(path, a, q=84):
    cv2.imwrite(path, a, [cv2.IMWRITE_JPEG_QUALITY, q, cv2.IMWRITE_JPEG_PROGRESSIVE, 1, cv2.IMWRITE_JPEG_OPTIMIZE, 1])


def main():
    work, public = sys.argv[1:3]
    preview = len(sys.argv) > 3
    out = os.path.join(public, 'media', 'scenes')
    os.makedirs(out, exist_ok=True)
    sheet = []

    for name, (photo, wide, tall, thumb) in SCENES.items():
        img = cv2.imread(os.path.join(work, 'up', photo + '.png'), cv2.IMREAD_COLOR)
        h, w = img.shape[:2]
        depth = cv2.resize(cv2.imread(os.path.join(work, 'depth', photo + '.png'), cv2.IMREAD_GRAYSCALE), (w, h), interpolation=cv2.INTER_CUBIC)
        depth = cv2.GaussianBlur(depth, (0, 0), w * 0.006)
        a, ad = frame(img, depth, *wide, WIDE)
        b, bd = frame(img, depth, *tall, TALL)
        a, b = grade(a), grade(b)
        cx, cy, s = thumb
        t = grade(cv2.resize(img[cy - s // 2:cy + s // 2, cx - s // 2:cx + s // 2], (240, 240), interpolation=cv2.INTER_AREA))
        if preview:
            sheet.append((name, a, b))
            continue
        write(os.path.join(out, name + '.jpg'), a)
        write(os.path.join(out, name + '-tall.jpg'), b)
        write(os.path.join(out, name + '-depth.jpg'), ad, 80)
        write(os.path.join(out, name + '-tall-depth.jpg'), bd, 80)
        write(os.path.join(out, name + '-thumb.jpg'), t, 82)
        write(os.path.join(out, name + '-blur.jpg'), cv2.resize(a, (64, 36), interpolation=cv2.INTER_AREA), 70)

    # The family scene: the evening film's still frames, with depth maps cut to the same framing.
    beach = cv2.imread(os.path.join(work, 'up', 'family.png'), cv2.IMREAD_COLOR)
    bh, bw = beach.shape[:2]
    bdepth = cv2.resize(cv2.imread(os.path.join(work, 'depth', 'family.png'), cv2.IMREAD_GRAYSCALE), (bw, bh), interpolation=cv2.INTER_CUBIC)
    bdepth = cv2.GaussianBlur(bdepth, (0, 0), bw * 0.006)
    for shape, (x0, y0, cw, ch) in FAMILY.items():
        still = cv2.imread(os.path.join(public, 'videos', f'dusk-open-{shape}.jpg'), cv2.IMREAD_COLOR)
        H, W = still.shape[:2]
        dep = cv2.resize(bdepth[y0:y0 + ch, x0:x0 + cw], (W // 2, H // 2), interpolation=cv2.INTER_AREA)
        suffix = '' if shape == 'wide' else '-tall'
        if preview:
            if shape == 'wide':
                sheet.insert(0, ('family', still, cv2.imread(os.path.join(public, 'videos', 'dusk-open-tall.jpg'))))
            continue
        write(os.path.join(out, f'family{suffix}.jpg'), still, 86)
        write(os.path.join(out, f'family{suffix}-depth.jpg'), dep, 80)
        if shape == 'wide':
            fx, fy = int(W * 0.5), int(H * 0.56)
            write(os.path.join(out, 'family-thumb.jpg'), cv2.resize(still[fy - 270:fy + 270, fx - 270:fx + 270], (240, 240), interpolation=cv2.INTER_AREA), 82)
            write(os.path.join(out, 'family-blur.jpg'), cv2.resize(still, (64, 36), interpolation=cv2.INTER_AREA), 70)

    if preview:
        rows = []
        for name, a, b in sheet:
            a2 = cv2.resize(a, (960, 540))
            b2 = cv2.resize(b, (270, 540))
            cv2.putText(a2, name, (16, 40), cv2.FONT_HERSHEY_SIMPLEX, 1.1, (255, 255, 255), 2)
            rows.append(np.hstack([a2, b2]))
        half = (len(rows) + 1) // 2
        left, right = np.vstack(rows[:half]), np.vstack(rows[half:] + [np.zeros_like(rows[0])] * (half - len(rows[half:])))
        write(os.path.join(work, 'scenes-preview.jpg'), np.hstack([left, right]), 82)


main()
