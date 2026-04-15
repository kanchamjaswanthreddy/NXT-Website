import vtracer
import re

print("Starting SVG trace...")
vtracer.convert_image_to_svg_py(
    "public/logo.png",
    "public/logo.svg",
    colormode='color',
    hierarchical='stacked',
    mode='spline',
    filter_speckle=4,
    color_precision=6,
    layer_difference=16,
    corner_threshold=60,
    length_threshold=4.0,
    max_iterations=10,
    splice_threshold=45,
    path_precision=8
)

print("Removing white background paths...")
with open("public/logo.svg", "r") as f:
    svg_data = f.read()

# Remove all paths that approach pure white or are actually white
clean_svg = re.sub(r'<path[^>]*fill="#(fff|ffffff|fefefe|fdfdfd|fcfcfc)"[^>]*>', '', svg_data, flags=re.IGNORECASE)

with open("public/logo.svg", "w") as f:
    f.write(clean_svg)

print("SVG generation complete and completely transparent!")
