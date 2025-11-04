
# OG Image Conversion Instructions

An og-image.svg file has been created in the public folder.

To convert to PNG (1200x630), you can use:

## Option 1: Online Tool
1. Go to https://cloudconvert.com/svg-to-png
2. Upload public/og-image.svg
3. Set dimensions to 1200x630
4. Download as og-image.png

## Option 2: Command Line (if ImageMagick is installed)
convert -background none -resize 1200x630 public/og-image.svg public/og-image.png

## Option 3: Inkscape (if installed)
inkscape public/og-image.svg --export-type=png --export-filename=public/og-image.png -w 1200 -h 630

For now, we'll use the SVG as a fallback, but PNG is preferred for better social media compatibility.
