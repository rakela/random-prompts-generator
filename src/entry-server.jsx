import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
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

// Route to component mapping
const routeComponents = {
  '/': PromptGenerator,
  '/writing-prompts': WritingPromptsPage,
  '/ai-images-prompt': AIImagesPromptPage,
  '/ai-blog-post-generator': BlogPostGeneratorPage,
  '/short-story-prompts-generator': ShortStoryPromptsPage,
  '/random-name-generator': RandomNameGeneratorPage,
  '/ghostface-ai-trend-prompt-generator': GhostfaceAIPromptPage,
  '/gemini-ai-snow-prompt-tutorial': GeminiAISnowPromptTutorialPage,
  '/chatgpt-photo-editing-prompts': ChatGPTPhotoEditingPromptsPage,
  '/gemini-photo-editing-prompts': GeminiPhotoEditingPromptsPage,
  '/october-writing-prompts': OctoberWritingPromptsPage,
  '/writing-prompts-for-students': WritingPromptsForStudentsPage,
  '/persuasive-writing-topics': PersuasiveWritingTopicsPage,
  '/persuasive-essays-topics': PersuasiveEssaysTopicsPage,
  '/persuasive-writing-titles': PersuasiveWritingTitlesPage,
  '/nano-banana-prompts': NanoBananaPromptsPage,
  '/midjourney-ai-picture-generator': MidjourneyAIPromptsPage,
  '/privacy': PrivacyPage,
  '/terms': TermsPage
}

export function render(url) {
  const helmetContext = {}

  // Get the component for this route
  const Component = routeComponents[url] || PromptGenerator

  // Render the component
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <MemoryRouter initialEntries={[url]}>
          <Component />
        </MemoryRouter>
      </HelmetProvider>
    </React.StrictMode>
  )

  const { helmet } = helmetContext

  return { html, helmet }
}
