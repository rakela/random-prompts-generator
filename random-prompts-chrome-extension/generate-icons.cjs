// Simple script to generate extension icons
// Run: node generate-icons.cjs

const fs = require('fs');
const path = require('path');

// SVG template for the icon
const createSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>

  <!-- Icon design - Sparkles/Stars representing prompts -->
  <g transform="translate(${size * 0.5}, ${size * 0.5})">
    <!-- Main star -->
    <path d="M 0,-${size * 0.25} L ${size * 0.05},-${size * 0.08} L ${size * 0.22},-${size * 0.08} L ${size * 0.08},${size * 0.02} L ${size * 0.14},${size * 0.2} L 0,${size * 0.1} L -${size * 0.14},${size * 0.2} L -${size * 0.08},${size * 0.02} L -${size * 0.22},-${size * 0.08} L -${size * 0.05},-${size * 0.08} Z"
          fill="white" opacity="1"/>

    <!-- Small stars -->
    <circle cx="${size * 0.25}" cy="-${size * 0.2}" r="${size * 0.04}" fill="white" opacity="0.8"/>
    <circle cx="-${size * 0.22}" cy="${size * 0.18}" r="${size * 0.03}" fill="white" opacity="0.7"/>
    <circle cx="${size * 0.18}" cy="${size * 0.22}" r="${size * 0.035}" fill="white" opacity="0.75"/>
  </g>
</svg>`;

const iconSizes = [16, 32, 48, 128];
const iconsDir = path.join(__dirname, 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG files
iconSizes.forEach(size => {
  const svg = createSVG(size);
  const filePath = path.join(iconsDir, `icon${size}.svg`);
  fs.writeFileSync(filePath, svg.trim());
  console.log(`✓ Generated icon${size}.svg`);
});

console.log('\n📝 SVG icons generated successfully!');
console.log('\n⚠️  Note: Chrome extensions require PNG icons.');
console.log('Please convert these SVG files to PNG using one of these methods:');
console.log('  1. Online converter: https://svgtopng.com/');
console.log('  2. ImageMagick: convert icon.svg icon.png');
console.log('  3. Inkscape: inkscape --export-type=png icon.svg');
console.log('  4. Or use the provided SVG files and manually convert them\n');

// Also create a simple HTML file to preview icons
const previewHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Icon Preview</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }
    .icon-preview {
      display: inline-block;
      margin: 20px;
      text-align: center;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    img {
      display: block;
      margin: 10px auto;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>Random Prompts Generator - Icon Preview</h1>
  ${iconSizes.map(size => `
    <div class="icon-preview">
      <h3>${size}x${size}</h3>
      <img src="icon${size}.svg" width="${size}" height="${size}" alt="Icon ${size}x${size}">
    </div>
  `).join('\n')}

  <div style="margin-top: 40px; padding: 20px; background: #fff; border-radius: 8px;">
    <h2>Next Steps:</h2>
    <ol>
      <li>Convert these SVG files to PNG format</li>
      <li>Name them as icon16.png, icon32.png, icon48.png, icon128.png</li>
      <li>Place them in the icons/ directory</li>
      <li>Load the extension in Chrome</li>
    </ol>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(iconsDir, 'preview.html'), previewHTML);
console.log('✓ Created preview.html in icons/ directory\n');
