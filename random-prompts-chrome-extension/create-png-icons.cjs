// Create simple PNG icon placeholders
// This creates basic colored PNG files for Chrome extension icons

const fs = require('fs');
const path = require('path');

// Create a simple PNG data buffer for a colored square
// This is a minimal 1x1 PNG that we'll document should be replaced
function createSimplePNG(size) {
  // PNG header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk (image header)
  const width = size;
  const height = size;
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth
  ihdrData.writeUInt8(2, 9); // color type (RGB)
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Create image data (simple gradient purple/blue)
  const imageData = Buffer.alloc(size * size * 3);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 3;
      // Gradient from blue to purple
      const ratio = (x + y) / (size * 2);
      imageData[idx] = Math.floor(59 + ratio * (139 - 59)); // R
      imageData[idx + 1] = Math.floor(130 + ratio * (92 - 130)); // G
      imageData[idx + 2] = Math.floor(246 + ratio * (246 - 246)); // B
    }
  }

  // IDAT chunk (compressed image data)
  // For simplicity, we'll create a minimal valid structure
  const zlib = require('zlib');

  // Add filter bytes (0 = no filter) for each scanline
  const dataWithFilter = Buffer.alloc(size * (size * 3 + 1));
  for (let y = 0; y < size; y++) {
    dataWithFilter[y * (size * 3 + 1)] = 0; // filter byte
    imageData.copy(dataWithFilter, y * (size * 3 + 1) + 1, y * size * 3, (y + 1) * size * 3);
  }

  const compressedData = zlib.deflateSync(dataWithFilter);
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND chunk (end of file)
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type, 'ascii');

  const crc = calculateCRC(Buffer.concat([typeBuffer, data]));
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);

  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function calculateCRC(buffer) {
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    crcTable[n] = c;
  }

  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buffer.length; i++) {
    crc = crcTable[(crc ^ buffer[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

const iconSizes = [16, 32, 48, 128];
const iconsDir = path.join(__dirname, 'icons');

console.log('Generating PNG icons...\n');

iconSizes.forEach(size => {
  const png = createSimplePNG(size);
  const filePath = path.join(iconsDir, `icon${size}.png`);
  fs.writeFileSync(filePath, png);
  console.log(`✓ Generated icon${size}.png (${size}x${size})`);
});

console.log('\n✅ PNG icons generated successfully!');
console.log('\n📝 Note: These are basic placeholder icons with a gradient.');
console.log('For production, consider creating custom icons with:');
console.log('  - Your brand colors and logo');
console.log('  - Tool like Figma, Adobe Illustrator, or Canva');
console.log('  - Or convert the SVG icons to PNG using an online tool\n');
