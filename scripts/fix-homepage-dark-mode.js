#!/usr/bin/env node

/**
 * Fix Dark Mode Issues on Homepage
 * - Fixes all select dropdowns (white text on white background)
 * - Fixes all bg-white containers
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '..', 'prompt-generator.tsx');

console.log('🔧 Fixing dark mode on homepage...\n');

let content = readFileSync(filePath, 'utf8');
let changesCount = 0;

// Fix 1: All select elements - add dark mode classes
const selectPattern = /className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(blue|purple|green|amber|orange|pink)-500 focus:border-transparent"/g;
const selectReplacement = 'className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-$1-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"';

const selectMatches = content.match(selectPattern);
if (selectMatches) {
  content = content.replace(selectPattern, selectReplacement);
  changesCount += selectMatches.length;
  console.log(`✅ Fixed ${selectMatches.length} select dropdown(s)`);
}

// Fix 2: Prompt card container
const promptCardPattern = /<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">/g;
const promptCardReplacement = '<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">';

const promptCardMatches = content.match(promptCardPattern);
if (promptCardMatches) {
  content = content.replace(promptCardPattern, promptCardReplacement);
  changesCount += promptCardMatches.length;
  console.log(`✅ Fixed ${promptCardMatches.length} prompt card container(s)`);
}

// Fix 3: Text colors in prompt cards
content = content.replace(
  /<h3 className="font-semibold text-gray-900 mb-3">Generated Names:<\/h3>/g,
  '<h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Generated Names:</h3>'
);

content = content.replace(
  /<div key={index} className="bg-gray-50 px-3 py-2 rounded border text-gray-800">/g,
  '<div key={index} className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded border dark:border-gray-600 text-gray-800 dark:text-gray-100">'
);

content = content.replace(
  /<p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt\.text}<\/p>/g,
  '<p className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed mb-4">{prompt.text}</p>'
);

console.log('✅ Fixed text colors in prompt cards');
changesCount += 3;

// Fix 4: Button colors
content = content.replace(
  /className="inline-flex items-center gap-2 px-3 py-1\.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"/g,
  'className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm transition-colors"'
);

content = content.replace(
  /className="inline-flex items-center gap-2 px-3 py-1\.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"/g,
  'className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 rounded-md text-sm transition-colors"'
);

content = content.replace(
  /className="inline-flex items-center gap-2 px-3 py-1\.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors"/g,
  'className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-md text-sm transition-colors"'
);

content = content.replace(
  /className="inline-flex items-center gap-2 px-3 py-1\.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"/g,
  'className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-md text-sm transition-colors"'
);

console.log('✅ Fixed button colors');
changesCount += 4;

// Fix 5: History panel
content = content.replace(
  /<div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">/g,
  '<div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">'
);

content = content.replace(
  /<h3 className="text-lg font-semibold text-gray-900">Recent Prompts<\/h3>/g,
  '<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Prompts</h3>'
);

content = content.replace(
  /<div key={prompt\.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">/g,
  '<div key={prompt.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600">'
);

content = content.replace(
  /<p className="text-sm text-gray-800 leading-relaxed">{prompt\.text}<\/p>/g,
  '<p className="text-sm text-gray-800 dark:text-gray-100 leading-relaxed">{prompt.text}</p>'
);

console.log('✅ Fixed history panel');
changesCount += 4;

// Fix 6: Tab navigation links
content = content.replace(
  /className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"/g,
  'className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"'
);

console.log('✅ Fixed tab navigation');
changesCount += 1;

// Fix 7: Featured tools section
content = content.replace(
  /<section className="bg-white py-16">/g,
  '<section className="bg-white dark:bg-gray-800 py-16">'
);

content = content.replace(
  /<h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Prompt Generators<\/h2>/g,
  '<h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Featured Prompt Generators</h2>'
);

content = content.replace(
  /<Link to="\/[^"]+?" className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">/g,
  (match) => match.replace('bg-white', 'bg-white dark:bg-gray-700').replace('border-gray-200', 'border-gray-200 dark:border-gray-600')
);

content = content.replace(
  /<h3 className="font-semibold text-lg mb-2 text-gray-900">/g,
  '<h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">'
);

content = content.replace(
  /<p className="text-gray-600 text-sm">/g,
  '<p className="text-gray-600 dark:text-gray-400 text-sm">'
);

console.log('✅ Fixed featured tools section');
changesCount += 5;

// Write the updated content
writeFileSync(filePath, content, 'utf8');

console.log(`\n✅ Successfully fixed ${changesCount} dark mode issues on homepage!`);
console.log('📍 File: prompt-generator.tsx\n');
