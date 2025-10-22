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
        </Routes>
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)