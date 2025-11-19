import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatorPages = [
  'src/RandomAestheticPromptGeneratorPage.tsx',
  'src/RandomAnimePromptGeneratorPage.tsx',
  'src/RandomArtStyleGeneratorPage.tsx',
  'src/RandomCharacterDesignPromptGeneratorPage.tsx',
  'src/RandomCharacterGeneratorPage.tsx',
  'src/RandomConflictGeneratorPage.tsx',
  'src/RandomDialogueGeneratorPage.tsx',
  'src/RandomEmotionPromptGeneratorPage.tsx',
  'src/RandomEnvironmentDesignGeneratorPage.tsx',
  'src/RandomFantasyArtPromptGeneratorPage.tsx',
  'src/RandomHeroGeneratorPage.tsx',
  'src/RandomHobbyGeneratorPage.tsx',
  'src/RandomIdeaGeneratorPage.tsx',
  'src/RandomLightingStyleGeneratorPage.tsx',
  'src/RandomMagicSystemGeneratorPage.tsx',
  'src/RandomNameGeneratorPage.tsx',
  'src/RandomObjectGeneratorPage.tsx',
  'src/RandomPhotographyPromptGeneratorPage.tsx',
  'src/RandomPlotTwistGeneratorPage.tsx',
  'src/RandomPortraitPromptGeneratorPage.tsx',
  'src/RandomRelationshipPromptGeneratorPage.tsx',
  'src/RandomSciFiPromptGeneratorPage.tsx',
  'src/RandomSentenceGeneratorPage.tsx',
  'src/RandomSettingGeneratorPage.tsx',
  'src/RandomStoryStarterGeneratorPage.tsx',
  'src/RandomSuperpowerGeneratorPage.tsx',
  'src/RandomThemeGeneratorPage.tsx',
  'src/RandomVillainGeneratorPage.tsx',
  'src/RandomWorldbuildingPromptsGeneratorPage.tsx',
];

function updateFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${filePath} - file not found`);
    return { changed: false };
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changes = [];

  // 1. Fix gradient backgrounds for dark mode
  const gradientRegex = /className="min-h-screen bg-gradient-to-br from-gray-50 to-white"/g;
  if (gradientRegex.test(content)) {
    content = content.replace(
      gradientRegex,
      'className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800"'
    );
    changes.push('gradient-bg');
  }

  // Alternative gradient patterns
  const altGradientRegex = /className="min-h-screen bg-gradient-to-br from-(\w+)-50 via-white to-(\w+)-50"/g;
  if (altGradientRegex.test(content)) {
    content = content.replace(
      altGradientRegex,
      'className="min-h-screen bg-gradient-to-br from-$1-50 dark:from-gray-900 via-white dark:via-gray-800 to-$2-50 dark:to-gray-900"'
    );
    changes.push('gradient-bg-alt');
  }

  // 2. Fix missing saved prompts display
  const incompleteSavedSection = /<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Items<\/h3>\s*<button onClick={exportPrompts}[^>]+><Download[^>]+\/> Export All<\/button>\s*<\/div>\s*<\/div>\s*\)\}/;

  if (incompleteSavedSection.test(content)) {
    const savedItemsDisplay = `<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Items</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"><Download size={16} /> Export All</button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200">{prompt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}`;

    content = content.replace(incompleteSavedSection, savedItemsDisplay);
    changes.push('saved-display');
  }

  if (changes.length > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Updated ${path.basename(filePath)}: ${changes.join(', ')}`);
    return { changed: true, changes };
  } else {
    console.log(`- No changes needed for ${path.basename(filePath)}`);
    return { changed: false };
  }
}

console.log('🔧 Applying comprehensive fixes to all generator pages...\n');

let stats = {
  total: 0,
  updated: 0,
  gradientFixed: 0,
  savedDisplayFixed: 0
};

generatorPages.forEach(file => {
  stats.total++;
  const result = updateFile(file);
  if (result.changed) {
    stats.updated++;
    if (result.changes?.includes('gradient-bg') || result.changes?.includes('gradient-bg-alt')) {
      stats.gradientFixed++;
    }
    if (result.changes?.includes('saved-display')) {
      stats.savedDisplayFixed++;
    }
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Total pages processed: ${stats.total}`);
console.log(`   Pages updated: ${stats.updated}`);
console.log(`   Gradient backgrounds fixed: ${stats.gradientFixed}`);
console.log(`   Saved display sections fixed: ${stats.savedDisplayFixed}`);
console.log(`\n✅ Complete!`);
