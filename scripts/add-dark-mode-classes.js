import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of all page files to update
const pageFiles = [
  'src/WritingPromptsPage.tsx',
  'src/WritingPromptsForStudentsPage.tsx',
  'src/ShortStoryPromptsPage.tsx',
  'src/PersuasiveWritingTopicsPage.tsx',
  'src/PersuasiveWritingTitlesPage.tsx',
  'src/PersuasiveEssaysTopicsPage.tsx',
  'src/OctoberWritingPromptsPage.tsx',
  'src/NanoBananaPromptsPage.tsx',
  'src/MidjourneyAIPromptsPage.tsx',
  'src/GhostfaceAIPromptPage.tsx',
  'src/GeminiPhotoEditingPromptsPage.tsx',
  'src/GeminiAISnowPromptTutorialPage.tsx',
  'src/ChatGPTPhotoEditingPromptsPage.tsx',
  'src/BlogPostGeneratorPage.tsx',
  'src/AIImagesPromptPage.tsx',
  'src/RandomAnimePromptGeneratorPage.tsx',
  'src/RandomAestheticPromptGeneratorPage.tsx',
  'src/RandomCharacterGeneratorPage.tsx',
  'src/RandomCharacterDesignPromptGeneratorPage.tsx',
  'src/RandomArtStyleGeneratorPage.tsx',
  'src/RandomEmotionPromptGeneratorPage.tsx',
  'src/RandomEnvironmentDesignGeneratorPage.tsx',
  'src/RandomDialogueGeneratorPage.tsx',
  'src/RandomConflictGeneratorPage.tsx',
  'src/RandomMagicSystemGeneratorPage.tsx',
  'src/RandomLightingStyleGeneratorPage.tsx',
  'src/RandomHobbyGeneratorPage.tsx',
  'src/RandomIdeaGeneratorPage.tsx',
  'src/RandomFantasyArtPromptGeneratorPage.tsx',
  'src/RandomHeroGeneratorPage.tsx',
  'src/RandomObjectGeneratorPage.tsx',
  'src/RandomNameGeneratorPage.tsx',
  'src/RandomPlotTwistGeneratorPage.tsx',
  'src/RandomPhotographyPromptGeneratorPage.tsx',
  'src/RandomParagraphGeneratorPage.tsx',
  'src/RandomSentenceGeneratorPage.tsx',
  'src/RandomSciFiPromptGeneratorPage.tsx',
  'src/RandomRelationshipPromptGeneratorPage.tsx',
  'src/RandomPortraitPromptGeneratorPage.tsx',
  'src/RandomThemeGeneratorPage.tsx',
  'src/RandomSuperpowerGeneratorPage.tsx',
  'src/RandomStoryStarterGeneratorPage.tsx',
  'src/RandomSettingGeneratorPage.tsx',
  'src/RandomWorldbuildingPromptsGeneratorPage.tsx',
  'src/RandomVillainGeneratorPage.tsx',
];

// Common dark mode class replacements
const classReplacements = [
  // Main container backgrounds
  { from: /className="min-h-screen bg-gradient-to-br from-(\w+)-50 via-white to-(\w+)-50"/g,
    to: 'className="min-h-screen bg-gradient-to-br from-$1-50 dark:from-gray-900 via-white dark:via-gray-800 to-$2-50 dark:to-gray-900 transition-colors"' },

  // Card backgrounds
  { from: /className="([^"]*?)bg-white([^"]*?)"/g,
    to: 'className="$1bg-white dark:bg-gray-800$2 transition-colors"' },

  // Text colors - primary
  { from: /className="([^"]*?)text-gray-900([^"]*?)"/g,
    to: 'className="$1text-gray-900 dark:text-gray-100$2"' },
  { from: /className="([^"]*?)text-gray-800([^"]*?)"/g,
    to: 'className="$1text-gray-800 dark:text-gray-200$2"' },
  { from: /className="([^"]*?)text-gray-700([^"]*?)"/g,
    to: 'className="$1text-gray-700 dark:text-gray-300$2"' },
  { from: /className="([^"]*?)text-gray-600([^"]*?)"/g,
    to: 'className="$1text-gray-600 dark:text-gray-400$2"' },

  // Borders
  { from: /className="([^"]*?)border-gray-200([^"]*?)"/g,
    to: 'className="$1border-gray-200 dark:border-gray-700$2"' },
  { from: /className="([^"]*?)border-gray-300([^"]*?)"/g,
    to: 'className="$1border-gray-300 dark:border-gray-600$2"' },

  // Hover states for light backgrounds
  { from: /className="([^"]*?)hover:bg-gray-50([^"]*?)"/g,
    to: 'className="$1hover:bg-gray-50 dark:hover:bg-gray-700$2"' },
  { from: /className="([^"]*?)hover:bg-gray-100([^"]*?)"/g,
    to: 'className="$1hover:bg-gray-100 dark:hover:bg-gray-600$2"' },
];

function updateFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${filePath} - file not found`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  // Apply each replacement
  for (const replacement of classReplacements) {
    const before = content;
    content = content.replace(replacement.from, replacement.to);
    if (content !== before) {
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Updated ${filePath}`);
    return true;
  } else {
    console.log(`- No changes ${filePath}`);
    return false;
  }
}

console.log('🎨 Adding dark mode classes to all pages...\n');

let updatedCount = 0;
let skippedCount = 0;
let unchangedCount = 0;

pageFiles.forEach(file => {
  try {
    const wasUpdated = updateFile(file);
    if (wasUpdated) {
      updatedCount++;
    } else {
      unchangedCount++;
    }
  } catch (error) {
    console.error(`❌ Error updating ${file}:`, error.message);
    skippedCount++;
  }
});

console.log(`\n✅ Complete! Updated ${updatedCount} files, ${unchangedCount} unchanged, ${skippedCount} errors.`);
