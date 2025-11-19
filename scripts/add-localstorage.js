import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of all generator page files
const generatorPages = [
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

function extractCategoryFromFilename(filename) {
  // Extract category name from filename for localStorage keys
  const name = path.basename(filename, '.tsx')
    .replace(/Page$/, '')
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
  return name;
}

function updateFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Skipping ${filePath} - file not found`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Check if already updated
  if (content.includes('useLocalStorage')) {
    console.log(`✓ Skipped ${filePath} - already updated`);
    return;
  }

  const category = extractCategoryFromFilename(filePath);

  // Add import statement
  const importRegex = /(import Footer from ['"]\.\/components\/Footer['"];)/;
  if (importRegex.test(content)) {
    content = content.replace(
      importRegex,
      `$1\nimport useLocalStorage from './hooks/useLocalStorage';`
    );
  }

  // Replace useState with useLocalStorage for savedPrompts
  content = content.replace(
    /const \[savedPrompts, setSavedPrompts\] = useState\(\[\]\);/g,
    `const [savedPrompts, setSavedPrompts] = useLocalStorage('${category}-saved-prompts', []);`
  );

  // Replace useState with useLocalStorage for promptHistory
  content = content.replace(
    /const \[promptHistory, setPromptHistory\] = useState\(\[\]\);/g,
    `const [promptHistory, setPromptHistory] = useLocalStorage('${category}-prompt-history', []);`
  );

  // Replace useState with useLocalStorage for favorites
  content = content.replace(
    /const \[favorites, setFavorites\] = useState\(\[\]\);/g,
    `const [favorites, setFavorites] = useLocalStorage('${category}-favorites', []);`
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✓ Updated ${filePath}`);
}

console.log('🔧 Adding localStorage persistence to all generator pages...\n');

let updatedCount = 0;
let skippedCount = 0;

generatorPages.forEach(page => {
  try {
    updateFile(page);
    updatedCount++;
  } catch (error) {
    console.error(`❌ Error updating ${page}:`, error.message);
    skippedCount++;
  }
});

console.log(`\n✅ Complete! Updated ${updatedCount} files, skipped ${skippedCount} files.`);
