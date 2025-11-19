#!/usr/bin/env node

/**
 * Migrate React Router components to Next.js
 * - Replace react-router-dom imports with next/link
 * - Update Link components to Next.js syntax
 * - Add 'use client' directive where needed
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const files = [
  'components/Header.tsx',
  'components/Footer.tsx',
];

console.log('🔧 Migrating components to Next.js...\n');

files.forEach(filePath => {
  const fullPath = join(process.cwd(), filePath);
  let content = readFileSync(fullPath, 'utf8');

  console.log(`📝 Processing: ${filePath}`);

  // Add 'use client' directive at the top
  if (!content.startsWith("'use client'")) {
    content = "'use client';\n\n" + content;
    console.log('  ✅ Added "use client" directive');
  }

  // Replace react-router-dom import with next/link
  content = content.replace(
    /import\s+{\s*Link\s*}\s+from\s+['"]react-router-dom['"]/g,
    "import Link from 'next/link'"
  );
  console.log('  ✅ Updated Link import');

  // Update relative imports to use @/ alias
  content = content.replace(
    /from\s+['"]\.\.\/hooks\/useTheme['"]/g,
    "from '@/lib/utils/useTheme'"
  );
  content = content.replace(
    /from\s+['"]\.\.\/hooks\/useLocalStorage['"]/g,
    "from '@/lib/utils/useLocalStorage'"
  );
  content = content.replace(
    /from\s+['"]\.\/Logo['"]/g,
    "from '@/components/Logo'"
  );
  console.log('  ✅ Updated import paths');

  // Update Link components to Next.js syntax (to -> href)
  content = content.replace(
    /<Link\s+to="([^"]*)"/g,
    '<Link href="$1"'
  );
  console.log('  ✅ Updated Link components (to -> href)');

  writeFileSync(fullPath, content, 'utf8');
  console.log(`  ✅ Saved: ${filePath}\n`);
});

console.log('✅ Component migration complete!\n');
