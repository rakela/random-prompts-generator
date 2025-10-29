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
import OctoberWritingPromptsPage from './OctoberWritingPromptsPage.tsx'
import WritingPromptsForStudentsPage from './WritingPromptsForStudentsPage.tsx'
import PersuasiveWritingTopicsPage from './PersuasiveWritingTopicsPage.tsx'
import PersuasiveEssaysTopicsPage from './PersuasiveEssaysTopicsPage.tsx'
import PersuasiveWritingTitlesPage from './PersuasiveWritingTitlesPage.tsx'
import NanoBananaPromptsPage from './NanoBananaPromptsPage.tsx'
import MidjourneyAIPromptsPage from './MidjourneyAIPromptsPage.tsx'
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
          <Route path="/october-writing-prompts" element={<OctoberWritingPromptsPage />} />
          <Route path="/writing-prompts-for-students" element={<WritingPromptsForStudentsPage />} />
          <Route path="/persuasive-writing-topics" element={<PersuasiveWritingTopicsPage />} />
          <Route path="/persuasive-essays-topics" element={<PersuasiveEssaysTopicsPage />} />
          <Route path="/persuasive-writing-titles" element={<PersuasiveWritingTitlesPage />} />
          <Route path="/nano-banana-prompts" element={<NanoBananaPromptsPage />} />
          <Route path="/midjourney-ai-picture-generator" element={<MidjourneyAIPromptsPage />} />
        </Routes>
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)