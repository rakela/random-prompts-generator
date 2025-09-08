import React from 'react'
import ReactDOM from 'react-dom/client'
import PromptGenerator from '../prompt-generator.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PromptGenerator />
  </React.StrictMode>,
)