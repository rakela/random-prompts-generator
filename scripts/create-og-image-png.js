import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createOGImage() {
  const width = 1200;
  const height = 630;

  // Create SVG for sharp to render
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background gradient -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>

      <!-- Decorative elements -->
      <circle cx="100" cy="100" r="40" fill="#FFCE54" opacity="0.2"/>
      <circle cx="1100" cy="530" r="60" fill="#60A5FA" opacity="0.2"/>
      <circle cx="950" cy="150" r="35" fill="#FBBF24" opacity="0.15"/>

      <!-- Logo icon -->
      <g transform="translate(90, 200)">
        <path d="M 60 0 L 100 50 L 60 100 L 20 50 Z" fill="#FFCE54" opacity="0.9"/>
        <path d="M 0 50 L 40 0 L 80 50 L 40 100 Z" fill="#ffffff" opacity="0.3"/>
      </g>

      <!-- Main text -->
      <text x="240" y="250" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="bold" fill="#FFFFFF" letter-spacing="-1">
        Random Prompts
      </text>
      <text x="240" y="330" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="bold" fill="#FFFFFF" letter-spacing="-1">
        Generator
      </text>

      <!-- Subtitle with icons -->
      <text x="240" y="405" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#E0E7FF">
        ✍️ Writing  •  🎨 AI Art  •  📝 Blogs  •  ⚔️ Fantasy
      </text>

      <!-- Badge -->
      <rect x="240" y="445" width="200" height="55" rx="27.5" fill="#FFCE54"/>
      <text x="340" y="482" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="bold" fill="#1E3A8A" text-anchor="middle">
        100% Free
      </text>

      <!-- Domain -->
      <text x="1120" y="595" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600" fill="#E0E7FF" text-anchor="end">
        randomprompts.org
      </text>
    </svg>
  `;

  const publicDir = path.resolve(__dirname, '../public');
  const outputPath = path.join(publicDir, 'og-image.png');

  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log('✅ Successfully created og-image.png');
    console.log(`   Path: ${outputPath}`);
    console.log(`   Dimensions: ${width}x${height}`);

    // Get file size
    const stats = fs.statSync(outputPath);
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('❌ Error creating OG image:', error);
    process.exit(1);
  }
}

createOGImage();
