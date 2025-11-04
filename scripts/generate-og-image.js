import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple SVG that will serve as our OG image
// This SVG can be converted to PNG using online tools or ImageMagick
const ogImageSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>

  <!-- Logo icon (simplified version) -->
  <g transform="translate(100, 180)">
    <path d="M 60 0 L 90 40 L 60 80 L 30 40 Z" fill="#FFCE54" opacity="0.9"/>
    <path d="M 0 40 L 30 0 L 60 40 L 30 80 Z" fill="#0b63d5" opacity="0.8"/>
  </g>

  <!-- Main text -->
  <text x="220" y="260" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="#FFFFFF">
    Random Prompts
  </text>
  <text x="220" y="330" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="#FFFFFF">
    Generator
  </text>

  <!-- Subtitle -->
  <text x="220" y="400" font-family="Arial, sans-serif" font-size="32" fill="#E0E7FF">
    Writing, AI Art, Blogs &amp; More
  </text>

  <!-- Badge -->
  <rect x="220" y="440" width="160" height="50" rx="25" fill="#FFCE54"/>
  <text x="300" y="473" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1E40AF" text-anchor="middle">
    Free Tool
  </text>

  <!-- Domain -->
  <text x="1100" y="590" font-family="Arial, sans-serif" font-size="24" fill="#E0E7FF" text-anchor="end">
    randomprompts.org
  </text>
</svg>`;

// Write SVG to public folder
const publicDir = path.resolve(__dirname, '../public');
const svgPath = path.join(publicDir, 'og-image.svg');

fs.writeFileSync(svgPath, ogImageSVG);
console.log('✓ Created og-image.svg');

// Also create a basic HTML instruction file for manual PNG conversion
const conversionInstructions = `
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
`;

fs.writeFileSync(path.join(__dirname, 'OG-IMAGE-INSTRUCTIONS.md'), conversionInstructions);
console.log('✓ Created conversion instructions');
console.log('\nNote: PNG format is preferred for OG images. See scripts/OG-IMAGE-INSTRUCTIONS.md');
