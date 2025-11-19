import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all .tsx files
const getAllTsxFiles = () => {
  const srcDir = path.join(__dirname, '../src');
  const rootDir = path.join(__dirname, '..');

  const files = [];

  // Get all files from src/
  const srcFiles = fs.readdirSync(srcDir)
    .filter(f => f.endsWith('.tsx'))
    .map(f => `src/${f}`);

  // Get prompt-generator.tsx from root
  const rootFile = 'prompt-generator.tsx';
  if (fs.existsSync(path.join(rootDir, rootFile))) {
    files.push(rootFile);
  }

  return [...srcFiles, ...files];
};

const gradientPatterns = [
  // Main container backgrounds (gray/white)
  {
    pattern: /className="(.*?)min-h-screen bg-gradient-to-br from-gray-50 to-white(.*?)"/g,
    replacement: 'className="$1min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800$2"',
    name: 'main-gray-white'
  },
  {
    pattern: /className="(.*?)min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50(.*?)"/g,
    replacement: 'className="$1min-h-screen bg-gradient-to-br from-slate-50 dark:from-gray-900 via-purple-50 dark:via-gray-800 to-pink-50 dark:to-gray-900$2"',
    name: 'main-slate-purple-pink'
  },
  {
    pattern: /className="(.*?)min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50(.*?)"/g,
    replacement: 'className="$1min-h-screen bg-gradient-to-br from-slate-50 dark:from-gray-900 via-cyan-50 dark:via-gray-800 to-blue-50 dark:to-gray-900$2"',
    name: 'main-slate-cyan-blue'
  },
  {
    pattern: /className="(.*?)min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50(.*?)"/g,
    replacement: 'className="$1min-h-screen bg-gradient-to-br from-slate-50 dark:from-gray-900 via-blue-50 dark:via-gray-800 to-indigo-50 dark:to-gray-900$2"',
    name: 'main-slate-blue-indigo'
  },

  // Card/section backgrounds - light colors
  {
    pattern: /className="(.*?)bg-gradient-to-br from-pink-50 to-purple-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-br from-pink-50 dark:from-gray-800 to-purple-50 dark:to-gray-700$2"',
    name: 'card-pink-purple'
  },
  {
    pattern: /className="(.*?)bg-gradient-to-br from-purple-50 to-indigo-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-br from-purple-50 dark:from-gray-800 to-indigo-50 dark:to-gray-700$2"',
    name: 'card-purple-indigo'
  },
  {
    pattern: /className="(.*?)bg-gradient-to-br from-blue-50 to-cyan-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-br from-blue-50 dark:from-gray-800 to-cyan-50 dark:to-gray-700$2"',
    name: 'card-blue-cyan'
  },

  // Inline gradients - light colors
  {
    pattern: /className="(.*?)bg-gradient-to-r from-purple-50 to-pink-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-r from-purple-50 dark:from-gray-800 to-pink-50 dark:to-gray-700$2"',
    name: 'inline-purple-pink'
  },
  {
    pattern: /className="(.*?)bg-gradient-to-r from-blue-50 to-indigo-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-r from-blue-50 dark:from-gray-800 to-indigo-50 dark:to-gray-700$2"',
    name: 'inline-blue-indigo'
  },
  {
    pattern: /className="(.*?)bg-gradient-to-r from-purple-50 to-indigo-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-r from-purple-50 dark:from-gray-800 to-indigo-50 dark:to-gray-700$2"',
    name: 'inline-purple-indigo'
  },
  {
    pattern: /className="(.*?)bg-gradient-to-r from-blue-50 to-cyan-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-r from-blue-50 dark:from-gray-800 to-cyan-50 dark:to-gray-700$2"',
    name: 'inline-blue-cyan'
  },
  {
    pattern: /className="(.*?)bg-gradient-to-r from-pink-50 to-purple-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-r from-pink-50 dark:from-gray-800 to-purple-50 dark:to-gray-700$2"',
    name: 'inline-pink-purple'
  },
  {
    pattern: /className="(.*?)bg-gradient-to-r from-indigo-50 to-purple-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-r from-indigo-50 dark:from-gray-800 to-purple-50 dark:to-gray-700$2"',
    name: 'inline-indigo-purple'
  },
  {
    pattern: /className="(.*?)bg-gradient-to-r from-green-50 to-emerald-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-r from-green-50 dark:from-gray-800 to-emerald-50 dark:to-gray-700$2"',
    name: 'inline-green-emerald'
  },
  {
    pattern: /className="(.*?)bg-gradient-to-r from-orange-50 to-red-50(.*?)"/g,
    replacement: 'className="$1bg-gradient-to-r from-orange-50 dark:from-gray-800 to-red-50 dark:to-gray-700$2"',
    name: 'inline-orange-red'
  },

  // Overlay gradients (semi-transparent - need careful handling)
  {
    pattern: /className="(.*?)absolute inset-0 bg-gradient-to-br from-purple-600\/10 via-pink-500\/10 to-blue-600\/10(.*?)"/g,
    replacement: 'className="$1absolute inset-0 bg-gradient-to-br from-purple-600/10 dark:from-purple-400/5 via-pink-500/10 dark:via-pink-400/5 to-blue-600/10 dark:to-blue-400/5$2"',
    name: 'overlay-purple-pink-blue'
  },
  {
    pattern: /className="(.*?)absolute inset-0 bg-gradient-to-br from-blue-600\/10 via-indigo-500\/10 to-purple-600\/10(.*?)"/g,
    replacement: 'className="$1absolute inset-0 bg-gradient-to-br from-blue-600/10 dark:from-blue-400/5 via-indigo-500/10 dark:via-indigo-400/5 to-purple-600/10 dark:to-purple-400/5$2"',
    name: 'overlay-blue-indigo-purple'
  },
  {
    pattern: /className="(.*?)absolute inset-0 bg-gradient-to-br from-cyan-600\/10 via-blue-500\/10 to-indigo-600\/10(.*?)"/g,
    replacement: 'className="$1absolute inset-0 bg-gradient-to-br from-cyan-600/10 dark:from-cyan-400/5 via-blue-500/10 dark:via-blue-400/5 to-indigo-600/10 dark:to-indigo-400/5$2"',
    name: 'overlay-cyan-blue-indigo'
  },
];

function updateFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    return { changed: false, patterns: [] };
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const appliedPatterns = [];

  for (const { pattern, replacement, name } of gradientPatterns) {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      appliedPatterns.push(name);
    }
  }

  if (appliedPatterns.length > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ ${path.basename(filePath)}: ${appliedPatterns.join(', ')}`);
    return { changed: true, patterns: appliedPatterns };
  }

  return { changed: false, patterns: [] };
}

console.log('🌙 Fixing ALL gradient backgrounds for dark mode...\n');

const allFiles = getAllTsxFiles();
let stats = {
  total: allFiles.length,
  updated: 0,
  patternCounts: {}
};

allFiles.forEach(file => {
  const result = updateFile(file);
  if (result.changed) {
    stats.updated++;
    result.patterns.forEach(p => {
      stats.patternCounts[p] = (stats.patternCounts[p] || 0) + 1;
    });
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Total files processed: ${stats.total}`);
console.log(`   Files updated: ${stats.updated}`);
console.log(`\n   Pattern fixes applied:`);
Object.entries(stats.patternCounts).forEach(([pattern, count]) => {
  console.log(`   - ${pattern}: ${count} occurrences`);
});
console.log(`\n✅ Complete!`);
