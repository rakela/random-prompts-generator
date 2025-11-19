import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import PromptGenerator from '../prompt-generator.tsx'
import WritingPromptsPage from './WritingPromptsPage.tsx'
import AIImagesPromptPage from './AIImagesPromptPage.tsx'
import BlogPostGeneratorPage from './BlogPostGeneratorPage.tsx'
import ShortStoryPromptsPage from './ShortStoryPromptsPage.tsx'
import RandomNameGeneratorPage from './RandomNameGeneratorPage.tsx'
import GhostfaceAIPromptPage from './GhostfaceAIPromptPage.tsx'
import GeminiAISnowPromptTutorialPage from './GeminiAISnowPromptTutorialPage.tsx'
import ChatGPTPhotoEditingPromptsPage from './ChatGPTPhotoEditingPromptsPage.tsx'
import GeminiPhotoEditingPromptsPage from './GeminiPhotoEditingPromptsPage.tsx'
import OctoberWritingPromptsPage from './OctoberWritingPromptsPage.tsx'
import WritingPromptsForStudentsPage from './WritingPromptsForStudentsPage.tsx'
import PersuasiveWritingTopicsPage from './PersuasiveWritingTopicsPage.tsx'
import PersuasiveEssaysTopicsPage from './PersuasiveEssaysTopicsPage.tsx'
import PersuasiveWritingTitlesPage from './PersuasiveWritingTitlesPage.tsx'
import NanoBananaPromptsPage from './NanoBananaPromptsPage.tsx'
import MidjourneyAIPromptsPage from './MidjourneyAIPromptsPage.tsx'
import PrivacyPage from './PrivacyPage.tsx'
import TermsPage from './TermsPage.tsx'
// NEW GENERATOR PAGES - Writing & Story Generators
import RandomParagraphGeneratorPage from './RandomParagraphGeneratorPage.tsx'
import RandomSentenceGeneratorPage from './RandomSentenceGeneratorPage.tsx'
import RandomDialogueGeneratorPage from './RandomDialogueGeneratorPage.tsx'
import RandomCharacterGeneratorPage from './RandomCharacterGeneratorPage.tsx'
import RandomStoryStarterGeneratorPage from './RandomStoryStarterGeneratorPage.tsx'
import RandomConflictGeneratorPage from './RandomConflictGeneratorPage.tsx'
import RandomPlotTwistGeneratorPage from './RandomPlotTwistGeneratorPage.tsx'
import RandomThemeGeneratorPage from './RandomThemeGeneratorPage.tsx'
import RandomSettingGeneratorPage from './RandomSettingGeneratorPage.tsx'
import RandomVillainGeneratorPage from './RandomVillainGeneratorPage.tsx'
import RandomHeroGeneratorPage from './RandomHeroGeneratorPage.tsx'
import RandomWorldbuildingPromptsGeneratorPage from './RandomWorldbuildingPromptsGeneratorPage.tsx'
import RandomMagicSystemGeneratorPage from './RandomMagicSystemGeneratorPage.tsx'
import RandomEmotionPromptGeneratorPage from './RandomEmotionPromptGeneratorPage.tsx'
import RandomRelationshipPromptGeneratorPage from './RandomRelationshipPromptGeneratorPage.tsx'
// NEW GENERATOR PAGES - AI Art / Visual Prompts
import RandomAestheticPromptGeneratorPage from './RandomAestheticPromptGeneratorPage.tsx'
import RandomArtStyleGeneratorPage from './RandomArtStyleGeneratorPage.tsx'
import RandomPhotographyPromptGeneratorPage from './RandomPhotographyPromptGeneratorPage.tsx'
import RandomCharacterDesignPromptGeneratorPage from './RandomCharacterDesignPromptGeneratorPage.tsx'
import RandomEnvironmentDesignGeneratorPage from './RandomEnvironmentDesignGeneratorPage.tsx'
import RandomSciFiPromptGeneratorPage from './RandomSciFiPromptGeneratorPage.tsx'
import RandomFantasyArtPromptGeneratorPage from './RandomFantasyArtPromptGeneratorPage.tsx'
import RandomAnimePromptGeneratorPage from './RandomAnimePromptGeneratorPage.tsx'
import RandomPortraitPromptGeneratorPage from './RandomPortraitPromptGeneratorPage.tsx'
import RandomLightingStyleGeneratorPage from './RandomLightingStyleGeneratorPage.tsx'
// NEW GENERATOR PAGES - Creative Tools
import RandomObjectGeneratorPage from './RandomObjectGeneratorPage.tsx'
import RandomHobbyGeneratorPage from './RandomHobbyGeneratorPage.tsx'
import RandomSuperpowerGeneratorPage from './RandomSuperpowerGeneratorPage.tsx'
import RandomIdeaGeneratorPage from './RandomIdeaGeneratorPage.tsx'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PromptGenerator />} />
          <Route path="/writing-prompts" element={<WritingPromptsPage />} />
          <Route path="/ai-images-prompt" element={<AIImagesPromptPage />} />
          <Route path="/ai-blog-post-generator" element={<BlogPostGeneratorPage />} />
          <Route path="/short-story-prompts-generator" element={<ShortStoryPromptsPage />} />
          <Route path="/random-name-generator" element={<RandomNameGeneratorPage />} />
          <Route path="/ghostface-ai-trend-prompt-generator" element={<GhostfaceAIPromptPage />} />
          <Route path="/gemini-ai-snow-prompt-tutorial" element={<GeminiAISnowPromptTutorialPage />} />
          <Route path="/chatgpt-photo-editing-prompts" element={<ChatGPTPhotoEditingPromptsPage />} />
          <Route path="/gemini-photo-editing-prompts" element={<GeminiPhotoEditingPromptsPage />} />
          <Route path="/october-writing-prompts" element={<OctoberWritingPromptsPage />} />
          <Route path="/writing-prompts-for-students" element={<WritingPromptsForStudentsPage />} />
          <Route path="/persuasive-writing-topics" element={<PersuasiveWritingTopicsPage />} />
          <Route path="/persuasive-essays-topics" element={<PersuasiveEssaysTopicsPage />} />
          <Route path="/persuasive-writing-titles" element={<PersuasiveWritingTitlesPage />} />
          <Route path="/nano-banana-prompts" element={<NanoBananaPromptsPage />} />
          <Route path="/midjourney-ai-picture-generator" element={<MidjourneyAIPromptsPage />} />
          {/* NEW GENERATOR ROUTES - Writing & Story Generators */}
          <Route path="/random-paragraph-generator" element={<RandomParagraphGeneratorPage />} />
          <Route path="/random-sentence-generator" element={<RandomSentenceGeneratorPage />} />
          <Route path="/random-dialogue-generator" element={<RandomDialogueGeneratorPage />} />
          <Route path="/random-character-generator" element={<RandomCharacterGeneratorPage />} />
          <Route path="/random-story-starter-generator" element={<RandomStoryStarterGeneratorPage />} />
          <Route path="/random-conflict-generator" element={<RandomConflictGeneratorPage />} />
          <Route path="/random-plot-twist-generator" element={<RandomPlotTwistGeneratorPage />} />
          <Route path="/random-theme-generator" element={<RandomThemeGeneratorPage />} />
          <Route path="/random-setting-generator" element={<RandomSettingGeneratorPage />} />
          <Route path="/random-villain-generator" element={<RandomVillainGeneratorPage />} />
          <Route path="/random-hero-generator" element={<RandomHeroGeneratorPage />} />
          <Route path="/random-worldbuilding-prompts-generator" element={<RandomWorldbuildingPromptsGeneratorPage />} />
          <Route path="/random-magic-system-generator" element={<RandomMagicSystemGeneratorPage />} />
          <Route path="/random-emotion-prompt-generator" element={<RandomEmotionPromptGeneratorPage />} />
          <Route path="/random-relationship-prompt-generator" element={<RandomRelationshipPromptGeneratorPage />} />
          {/* NEW GENERATOR ROUTES - AI Art / Visual Prompts */}
          <Route path="/random-aesthetic-prompt-generator" element={<RandomAestheticPromptGeneratorPage />} />
          <Route path="/random-art-style-generator" element={<RandomArtStyleGeneratorPage />} />
          <Route path="/random-photography-prompt-generator" element={<RandomPhotographyPromptGeneratorPage />} />
          <Route path="/random-character-design-prompt-generator" element={<RandomCharacterDesignPromptGeneratorPage />} />
          <Route path="/random-environment-design-generator" element={<RandomEnvironmentDesignGeneratorPage />} />
          <Route path="/random-sci-fi-prompt-generator" element={<RandomSciFiPromptGeneratorPage />} />
          <Route path="/random-fantasy-art-prompt-generator" element={<RandomFantasyArtPromptGeneratorPage />} />
          <Route path="/random-anime-prompt-generator" element={<RandomAnimePromptGeneratorPage />} />
          <Route path="/random-portrait-prompt-generator" element={<RandomPortraitPromptGeneratorPage />} />
          <Route path="/random-lighting-style-generator" element={<RandomLightingStyleGeneratorPage />} />
          {/* NEW GENERATOR ROUTES - Creative Tools */}
          <Route path="/random-object-generator" element={<RandomObjectGeneratorPage />} />
          <Route path="/random-hobby-generator" element={<RandomHobbyGeneratorPage />} />
          <Route path="/random-superpower-generator" element={<RandomSuperpowerGeneratorPage />} />
          <Route path="/random-idea-generator" element={<RandomIdeaGeneratorPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)