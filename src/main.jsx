import React from 'react'
import ReactDOM from 'react-dom/client'
import PromptGenerator from '../prompt-generator.tsx'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PromptGenerator />
    <SpeedInsights />
  </React.StrictMode>,
)