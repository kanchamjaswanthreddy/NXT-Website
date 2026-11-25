"""Write the site's photographs: upscaled masters, 5:4 chapter crops and depth maps.

  python3 -I build_media.py <upscaled_dir> <depth_dir> <site_public_dir> [sheet.jpg]
"""
import os
import sys

from PIL import Image

UP, DEPTH, PUBLIC = sys.argv[1:4]
SHEET = sys.argv[4] if len(sys.argv) > 4 else None

# name -> longest side of the master written to /media
# The site serves images as they are (next.config: images.unoptimized), so sizes are set here:
# a master for large frames, and an 800px copy for cards.
MASTERS = {'family': 1600, 'retirement': 1600, 'medicare': 1600, 'care': 1600, 'professional': 1600,
           'advisors': 1280, 'team-meeting': 1280, 'health': 1280, 'family-advisor': 1280, 'team': 1280, 'atrium': 1280, 'desk': 1280, 'knot': 1280}

# Portraits shown as small round pictures beside testimonials: (source under /public, square crop from the top)
AVATARS = ['images/testimonials/makeshwar-yadav.png', 'images/testimonials/pankaj-mandal.png', 'images/testimonials/dipendra-thakur.png',
           'images/testimonials/bimlesh-yadav.png', 'images/testimonials/carmelo-aguilar.png', 'images/testimonials/andy-martinez.jpg',
           'images/team/rigoberto-ayala.png', 'images/team/ashish-sood.png', 'images/team/sony-pradhan.png']

# chapter slug -> (source, crop box as fractions x0, y0, x1, y1)
CHAPTERS = {
    'annuities': ('retirement', (0.0, 0.0, 0.8333, 1.0)),
    'life-insurance': ('health', (0.30, 0.12, 1.0, 0.68)),
    'care-planning': ('care', (0.0, 0.0, 0.8333, 1.0)),
    'medicare-planning': ('medicare', (0.11, 0.0, 0.935, 1.0)),
    'disability-income': ('professional', (0.1667, 0.0, 1.0, 1.0)),
}


def save(im, path, q=84):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.convert('RGB' if im.mode != 'L' else 'L').save(path, 'JPEG', quality=q, optimize=True, progressive=True)
    return os.path.getsize(path)


def box_px(im, frac):
    w, h = im.size
    return (round(frac[0] * w), round(frac[1] * h), round(frac[2] * w), round(frac[3] * h))


total = 0
for name, side in MASTERS.items():
    im = Image.open(os.path.join(UP, name + '.png'))
    if max(im.size) > side:
        im.thumbnail((side, side), Image.LANCZOS)
    total += save(im, os.path.join(PUBLIC, 'media', name + '.jpg'))
    small = im.copy()
    small.thumbnail((800, 800), Image.LANCZOS)
    total += save(small, os.path.join(PUBLIC, 'media', name + '-800.jpg'), 80)
    d = Image.open(os.path.join(DEPTH, name + '.png')).convert('L')
    d.thumbnail((640, 640), Image.LANCZOS)
    total += save(d, os.path.join(PUBLIC, 'media', 'depth', name + '.jpg'), 86)

tiles = []
for slug, (src, frac) in CHAPTERS.items():
    override = os.path.join(UP, f'chapter-{slug}.png')          # a second upscale pass, when one exists
    if os.path.exists(override):
        crop = Image.open(override)
    else:
        im = Image.open(os.path.join(UP, src + '.png'))
        crop = im.crop(box_px(im, frac))
    crop = crop.resize((1600, 1280), Image.LANCZOS)
    total += save(crop, os.path.join(PUBLIC, 'media', 'chapters', slug + '.jpg'))
    total += save(crop.resize((800, 640), Image.LANCZOS), os.path.join(PUBLIC, 'media', 'chapters', slug + '-800.jpg'), 80)
    d = Image.open(os.path.join(DEPTH, src + '.png')).convert('L')
    d = d.crop(box_px(d, frac)).resize((640, 512), Image.LANCZOS)
    total += save(d, os.path.join(PUBLIC, 'media', 'chapters', slug + '-depth.jpg'), 86)
    tiles.append(crop.resize((500, 400), Image.LANCZOS))

for rel in AVATARS:
    im = Image.open(os.path.join(PUBLIC, rel)).convert('RGB')
    w, h = im.size
    side = min(w, h)
    top = 0 if h <= w else int(h * 0.04)
    face = im.crop(((w - side) // 2, top, (w - side) // 2 + side, top + side)).resize((160, 160), Image.LANCZOS)
    total += save(face, os.path.join(PUBLIC, 'media', 'avatars', os.path.splitext(os.path.basename(rel))[0] + '.jpg'), 84)

print('media written,', round(total / 1e6, 2), 'MB')
if SHEET:
    sheet = Image.new('RGB', (500 * 3, 400 * 2), (20, 20, 20))
    for i, t in enumerate(tiles):
        sheet.paste(t, ((i % 3) * 500, (i // 3) * 400))
    sheet.save(SHEET, quality=86)
