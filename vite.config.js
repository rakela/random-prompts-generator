import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePrerender from 'vite-plugin-prerender'
import path from 'path'

// All routes that need to be prerendered for SEO
const routes = [
  '/',
  '/writing-prompts',
  '/ai-images-prompt',
  '/ai-blog-post-generator',
  '/short-story-prompts-generator',
  '/random-name-generator',
  '/ghostface-ai-trend-prompt-generator',
  '/october-writing-prompts',
  '/writing-prompts-for-students',
  '/persuasive-writing-topics',
  '/persuasive-essays-topics',
  '/persuasive-writing-titles',
  '/nano-banana-prompts',
  '/midjourney-ai-picture-generator',
  '/privacy',
  '/terms'
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: routes,
      renderer: new vitePrerender.PuppeteerRenderer({
        // Wait for React Helmet to update meta tags
        renderAfterDocumentEvent: 'render-event',
        // Increase timeout for slower pages
        timeout: 10000,
        // Skip Chromium download (use system Chrome if available)
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })
    })
  ],
})