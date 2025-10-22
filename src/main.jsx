import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import PromptGenerator from '../prompt-generator.tsx'
import WritingPromptsPage from './pages/WritingPromptsPage.tsx'
import AIImagesPage from './pages/AIImagesPage.tsx'
import BlogPostPage from './pages/BlogPostPage.tsx'
import ShortStoryPage from './pages/ShortStoryPage.tsx'
import RandomNamePage from './pages/RandomNamePage.tsx'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PromptGenerator />} />
          <Route path="/writing-prompts" element={<WritingPromptsPage />} />
          <Route path="/ai-images-prompt" element={<AIImagesPage />} />
          <Route path="/ai-blog-post-generator" element={<BlogPostPage />} />
          <Route path="/short-story-prompts-generator" element={<ShortStoryPage />} />
          <Route path="/random-name-generator" element={<RandomNamePage />} />
        </Routes>
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)