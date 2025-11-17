#!/usr/bin/env node

/**
 * Sitemap Generator for Random Prompts Generator
 * Generates sitemap.xml dynamically based on routes configuration
 * Run: node scripts/generate-sitemap.js
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Primary domain configuration
const DOMAIN = 'https://randomprompts.org';

// Routes configuration
// Add new routes here to keep sitemap in sync
const routes = [
  {
    path: '',
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    path: 'writing-prompts',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'ai-images-prompt',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'ai-blog-post-generator',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'short-story-prompts-generator',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'random-name-generator',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'ghostface-ai-trend-prompt-generator',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'gemini-ai-snow-prompt-tutorial',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'chatgpt-photo-editing-prompts',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'gemini-photo-editing-prompts',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'october-writing-prompts',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'writing-prompts-for-students',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'persuasive-writing-topics',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'persuasive-essays-topics',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'persuasive-writing-titles',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'nano-banana-prompts',
    priority: '0.9',
    changefreq: 'weekly'
  },
  {
    path: 'midjourney-ai-picture-generator',
    priority: '0.9',
    changefreq: 'weekly'
  }
];

/**
 * Generate sitemap XML
 */
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const urls = routes.map(route => {
    const loc = route.path ? `${DOMAIN}/${route.path}` : DOMAIN;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${urls}

</urlset>
`;

  return sitemap;
}

/**
 * Write sitemap to public directory
 */
function writeSitemap() {
  try {
    const sitemap = generateSitemap();
    const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');

    writeFileSync(outputPath, sitemap, 'utf8');

    console.log('✅ Sitemap generated successfully!');
    console.log(`   Location: public/sitemap.xml`);
    console.log(`   URLs: ${routes.length}`);
    console.log(`   Domain: ${DOMAIN}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

/**
 * Validate routes against main.jsx
 * This helps catch missing routes in the sitemap
 */
function validateRoutes() {
  console.log('\n📋 Configured Routes:');
  routes.forEach(route => {
    const url = route.path ? `/${route.path}` : '/';
    console.log(`   ${url} (priority: ${route.priority})`);
  });
  console.log('');
}

// Run the script
validateRoutes();
writeSitemap();
