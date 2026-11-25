# Media tools

How the films and photographs in `/public/videos` and `/public/media` were produced. None of this
runs as part of the site; it is here so the files can be regenerated or extended.

Needs Python 3 with `numpy`, `pillow`, `opencv-contrib-python`, `onnx`, `onnxruntime`, and `ffmpeg`
on the path.

## Models (downloaded once, not stored in this repository)

| File | From |
|---|---|
| `RealESRGAN_x2plus.pth` | github.com/xinntao/Real-ESRGAN, release v0.2.1 |
| `depth_anything_v2_vits.onnx` | github.com/fabio-sim/Depth-Anything-ONNX, release v2.0.0 |

## Steps

```sh
# 1. Enlarge the photographs two times (reads the .pth safely and runs it without torch)
python3 esr.py RealESRGAN_x2plus.pth x2plus work/up ../../public/images/family.png ../../public/images/retirement.png ...

# 2. Depth maps (white = near)
python3 depth.py depth_anything_v2_vits.onnx work/depth ../../public/images/family.png ...

# 3. The films: a looping, living version of the beach photograph
python3 beach.py work/up/family.png work/depth/family.png ../../public/videos hero-wide
python3 beach.py work/up/family.png work/depth/family.png ../../public/videos hero-tall
python3 beach.py work/up/family.png work/depth/family.png ../../public/videos dusk-wide
python3 beach.py work/up/family.png work/depth/family.png ../../public/videos dusk-tall

# 4. Site photographs, 5:4 chapter crops and their depth maps
python3 build_media.py work/up work/depth ../../public
```

`montage.py` makes the opening film for `/preview`: the two beach loops and three photographs,
each photograph given a slow camera move from its depth map, cross-faded into one seamless loop.

```sh
# 5. The montage (needs work/montage/up/fa-crop.png: rows 300 to 1280 of the enlarged
#    family-advisor photograph, enlarged once more, and work/montage/fa-crop-depth.png, the same
#    rows of its depth map)
python3 montage.py ../../public work ../../public/videos wide
python3 montage.py ../../public work ../../public/videos tall
```

Add `preview` as a last argument to write still frames instead of the film. Scenes, their length
and their framing are the list at the top of `scenes()`. Each photograph's top edge is carried
upwards into soft headroom, because the top fifth of the frame sits behind the letters of the name.

`beach.py` holds the people still (their outline comes from the depth map), moves the water and
sky with a looping flow, adds glints on the far water, and for the `dusk-` versions applies the
evening grade. Add `preview` as a last argument to write still frames and the mask overlay instead
of the film.

## Using real footage instead

Replace the four `.mp4` files in `/public/videos` and their `.jpg` still frames, keeping the names:
`hero-wide` and `dusk-wide` at 1920x1080, `hero-tall` and `dusk-tall` at 1080x1920. A 10 to 20
second silent loop at about 2 Mbps is plenty, for example:

```sh
ffmpeg -i clip.mov -an -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" \
  -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart -t 15 hero-wide.mp4
ffmpeg -i hero-wide.mp4 -frames:v 1 -q:v 3 hero-wide.jpg
```

### Clips that would suit the frame

Found on Pexels (free to use under the Pexels licence; check the licence page before publishing).
They could not be downloaded into the workspace this site was built in, so they are listed here
rather than included.

| Clip | By | Where it fits |
|---|---|---|
| [Wide angle family playing on beach during sunset](https://www.pexels.com/video/wide-angle-family-playing-on-beach-during-sunset-19975930/) | iShoot Movies | Opening or closing frame: open sky above, small figures at the water's edge |
| [Father and daughter walking along the shore](https://www.pexels.com/video/father-and-daughter-walking-along-the-shore-3120663/) | Pressmaster | Opening frame, daylight |
| [A family holding hands while walking](https://www.pexels.com/video/a-family-holding-hands-while-walking-8620356/) | Kampus Production | Closing frame: three generations, seen from behind |

If the opening film changes, the headline size in `app/globals.css` (`.hero-h1`) is worked out
from where the heads sit in the current film; adjust the `37.5svh` and `7.03vw` figures to the new
picture, or simply cap the size.
