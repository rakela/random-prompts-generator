import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import PromptGenerator from '../prompt-generator.tsx'
import WritingPromptsPage from './WritingPromptsPage.tsx'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PromptGenerator />} />
          <Route path="/writing-prompts" element={<WritingPromptsPage />} />
        </Routes>
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)