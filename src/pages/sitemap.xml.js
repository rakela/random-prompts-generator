import categoryPrompts from '../data/categoryPrompts.json';

const SITE_URL = 'https://randomprompts.org';

// All static pages in the site
const staticPageUrls = [
  // Homepage
  '',
  // Main generators
  'writing-prompts',
  'ai-images-prompt',
  'ai-blog-post-generator',
  'short-story-prompts-generator',
  'random-name-generator',
  // Category pages
  'ai-art-generators',
  'writing-generators',
  'creative-idea-generators',
  // Seasonal/themed
  'october-writing-prompts',
  'christmas-writing-prompts',
  // AI-specific
  'chatgpt-photo-editing-prompts',
  'gemini-photo-editing-prompts',
  'gemini-ai-snow-prompt-tutorial',
  'midjourney-ai-picture-generator',
  'ghostface-ai-trend-prompt-generator',
  'nano-banana-prompts',
  // Persuasive writing
  'persuasive-essays-topics',
  'persuasive-writing-titles',
  'persuasive-writing-topics',
  // Random generators
  'random-aesthetic-prompt-generator',
  'random-anime-prompt-generator',
  'random-art-style-generator',
  'random-character-design-prompt-generator',
  'random-character-generator',
  'random-conflict-generator',
  'random-dialogue-generator',
  'random-emotion-prompt-generator',
  'random-environment-design-generator',
  'random-fantasy-art-prompt-generator',
  'random-fantasy-name-generator',
  'random-hero-generator',
  'random-hobby-generator',
  'random-idea-generator',
  'random-lighting-style-generator',
  'random-magic-system-generator',
  'random-object-generator',
  'random-paragraph-generator',
  'random-photography-prompt-generator',
  'random-plot-twist-generator',
  'random-portrait-prompt-generator',
  'random-relationship-prompt-generator',
  'random-sci-fi-prompt-generator',
  'random-sentence-generator',
  'random-setting-generator',
  'random-story-starter-generator',
  'random-superpower-generator',
  'random-theme-generator',
  'random-villain-generator',
  'random-worldbuilding-prompts-generator',
  // Educational
  'writing-prompts-for-students',
  // Legal
  'privacy',
  'terms'
];

// Generate sitemap XML
export async function GET(context) {
  const today = new Date().toISOString().split('T')[0];

  // Extract unique categories from category prompts
  const categories = [...new Set(categoryPrompts.map(prompt => prompt.category))];

  // Build static pages with priorities
  const staticPages = staticPageUrls.map((url, index) => ({
    url,
    changefreq: url === '' ? 'daily' : 'weekly',
    priority: url === '' ? '1.0' : index < 6 ? '0.9' : '0.8',
    lastmod: today
  }));

  // Generate category pages (programmatic SEO)
  const categoryPages = categories.map(category => ({
    url: `prompts/${category}`,
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: today
  }));

  // Combine all pages
  const allPages = [...staticPages, ...categoryPages];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}/${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
