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

function updateFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${filePath} - file not found`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  // Fix select/input elements - add dark mode background and text
  const selectInputRegex = /className="([^"]*px-3 py-2 border[^"]*?)"/g;
  const beforeSelect = content;
  content = content.replace(selectInputRegex, (match, classes) => {
    if (!classes.includes('dark:bg-gray-800') && !classes.includes('dark:bg-gray-700')) {
      const newClasses = `${classes} dark:bg-gray-800 dark:text-gray-100`;
      return `className="${newClasses}"`;
    }
    return match;
  });
  if (content !== beforeSelect) changed = true;

  // Fix textarea elements
  const textareaRegex = /<textarea([^>]*className="[^"]*?)"/g;
  const beforeTextarea = content;
  content = content.replace(textareaRegex, (match) => {
    if (!match.includes('dark:bg-gray-800')) {
      return match.replace('className="', 'className="dark:bg-gray-800 dark:text-gray-100 ');
    }
    return match;
  });
  if (content !== beforeTextarea) changed = true;

  // Fix button backgrounds that might be too light in dark mode
  const buttonRegex = /className="([^"]*bg-gray-50[^"]*?)"/g;
  const beforeButton = content;
  content = content.replace(buttonRegex, (match, classes) => {
    if (!classes.includes('dark:bg-gray-700')) {
      const newClasses = classes.replace('bg-gray-50', 'bg-gray-50 dark:bg-gray-700');
      return `className="${newClasses}"`;
    }
    return match;
  });
  if (content !== beforeButton) changed = true;

  // Fix duplicate dark: classes (e.g., "dark:text-gray-400 ... dark:text-gray-100")
  const duplicateDarkRegex = /className="([^"]*)(dark:text-\w+-\d+)([^"]*)(dark:text-\w+-\d+)([^"]*)"/g;
  const beforeDuplicate = content;
  content = content.replace(duplicateDarkRegex, (match, before, first, middle, second, after) => {
    // Keep the last one (usually the intended override)
    return `className="${before}${middle}${second}${after}"`;
  });
  if (content !== beforeDuplicate) changed = true;

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Updated ${filePath}`);
    return true;
  } else {
    console.log(`- No changes needed ${filePath}`);
    return false;
  }
}

console.log('🌙 Fixing dark mode styling issues...\n');

let updatedCount = 0;
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
  }
});

console.log(`\n✅ Complete! Updated ${updatedCount} files, ${unchangedCount} unchanged.`);
