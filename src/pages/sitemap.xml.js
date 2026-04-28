import categoryPrompts from '../data/categoryPrompts.json';
import { getAllBlogPosts } from '../data/blogPosts';

const SITE_URL = 'https://randomprompts.org';

// All static pages in the site
const staticPageUrls = [
  // Homepage
  '',
  // Main generators (Hub pages)
  'writing-prompts',
  'writing-prompts-generator',
  'art-prompts',
  'generators',
  // Other main generators
  'ai-images-prompt',
  'ai-blog-post-generator',
  'short-story-prompts-generator',
  'random-name-generator',
  'writing-generators',
  // Writing Prompts Generator sub-pages
  'writing-prompts-generator/story-starters',
  'writing-prompts-generator/random-dialogue',
  'writing-prompts-generator/theme',
  'writing-prompts-generator/conflict',
  'writing-prompts-generator/plot-twist',
  'writing-prompts-generator/character',
  'writing-prompts-generator/relationship',
  'writing-prompts-generator/setting',
  'writing-prompts-generator/villain',
  'writing-prompts-generator/hero',
  'writing-prompts-generator/worldbuilding',
  'writing-prompts-generator/magic-system',
  'writing-prompts-generator/emotion',
  'writing-prompts-generator/dialogue',
  'writing-prompts-generator/otp-ideas',
  'writing-prompts-generator/horror-thriller',
  'writing-prompts-generator/first-lines',
  'writing-prompts-generator/journaling',
  // Art Prompts sub-pages
  'art-prompts/drawing',
  'art-prompts/aesthetic',
  'art-prompts/art-style',
  'art-prompts/photography',
  'art-prompts/sci-fi-art',
  'art-prompts/fantasy-art',
  'art-prompts/environment',
  'art-prompts/anime',
  'art-prompts/character-design',
  'art-prompts/portrait',
  'art-prompts/lighting',
  'art-prompts/drawing-challenge',
  // Generators sub-pages
  'generators/paragraph',
  'generators/sentence',
  'generators/hobby',
  'generators/object',
  'generators/superpower',
  'generators/idea',
  'generators/fantasy-name',
  'generators/character-creator',
  'generators/fantasy-world',
  // For Kids
  'for-kids/story-starters',
  // Seasonal/themed
  'october-writing-prompts',
  'christmas-writing-prompts',
  // Book and Movie Prompts
  'random-book-prompt-generator',
  'movie-prompts-generator',
  'movie-prompts-generator/sci-fi',
  'movie-prompts-generator/horror',
  'fanfic-prompt-generator',
  // AI-specific
  'chatgpt-photo-editing-prompts',
  'gemini-photo-editing-prompts',
  'gemini-ai-snow-prompt-tutorial',
  'midjourney-ai-picture-generator',
  'ghostface-ai-trend-prompt-generator',
  'nano-banana-prompts',
  // Prompt Libraries
  'prompts/nanobanana',
  'prompts/gemini-editing',
  'prompts/coquette-aesthetic',
  'prompts/dark-academia-aesthetic',
  'prompts/cyberpunk-2077-aesthetic',
  'prompts/chatgpt-caricature-trend',
  'prompts/ai-linkedin-headshot-prompt-generator',
  // New prompt pages
  'morning-journal-prompts',
  'chatgpt-family-photo-prompt',
  'caricature-prompt',
  // Persuasive writing
  'persuasive-essays-topics',
  'persuasive-writing-titles',
  'persuasive-writing-topics',
  // Educational
  'writing-prompts-for-students',
  // YouTube Tools (new)
  'workflows/youtube-to-blog-and-linkedin',
  'tools/youtube-content-brief',
  'tools/youtube-blog-post-generator',
  'tools/youtube-linkedin-post-generator',
  // New AI Prompt Tools
  'tools/text-to-prompt',
  'tools/image-to-prompt',
  'tools/video-ai-generation',
  'tools/instagram-aesthetic-generator',
  // Veo 3 (exploding keyword — Veo 3.1 free for all April 2026)
  'veo-3-prompt-generator',
  // GPT Image 2 (exploding keyword — released April 21 2026)
  'gpt-image-2-prompt-generator',
  // ChatGPT Action Figure (viral trend April 2026)
  'chatgpt-action-figure-prompt-generator',
  // Blog
  'blog',
  // Other pages
  'pricing',
  'contact',
  // Legal
  'privacy',
  'terms',
  // SEO Prompt Landing Pages
  'ai-linkedin-headshot-prompt',
  'ai-corporate-headshot-generator-prompt',
  'studio-ghibli-ai-prompt',
  'cinematic-lighting-ai-prompt',
  'double-exposure-ai-prompt',
  'ai-lead-generation-prompt',
  'ai-chatbot-prompt-template',
  'ai-prompt-generator-for-images',
  'ai-prompt-templates-free',
  // Content & Platform-Specific Prompts
  'ai-social-media-prompt',
  'ai-blog-writing-prompt',
  'ai-product-photography-prompt',
  'midjourney-prompt-generator'
];

// Generate sitemap XML
export async function GET(context) {
  const today = new Date().toISOString().split('T')[0];

  // Extract unique categories from category prompts
  const categories = [...new Set(categoryPrompts.map(prompt => prompt.category))];

  // Build static pages with priorities
  const staticPages = staticPageUrls.map((url, index) => ({
    url,
    changefreq: url === '' ? 'daily' : url.startsWith('workflows/') || url.startsWith('tools/') || url.startsWith('blog') || url === 'veo-3-prompt-generator' || url === 'gpt-image-2-prompt-generator' || url === 'chatgpt-action-figure-prompt-generator' ? 'daily' : 'weekly',
    priority: url === '' ? '1.0' :
              // YouTube Tools and new AI Tools get very high priority (new features)
              url === 'veo-3-prompt-generator' || url === 'gpt-image-2-prompt-generator' || url === 'chatgpt-action-figure-prompt-generator' || url.startsWith('workflows/youtube') || url.startsWith('tools/youtube') || url.startsWith('tools/text-to-prompt') || url.startsWith('tools/image-to-prompt') || url.startsWith('tools/video-ai-generation') || url.startsWith('tools/instagram-aesthetic-generator') ? '0.95' :
              // Blog gets high priority
              url === 'blog' ? '0.9' :
              // Hub pages get high priority
              ['writing-prompts-generator', 'art-prompts', 'generators'].includes(url) ? '0.95' :
              // Sub-pages under hubs
              url.includes('/') ? '0.8' :
              // Other main pages
              index < 10 ? '0.9' : '0.8',
    lastmod: today
  }));

  // Generate category pages (programmatic SEO)
  const categoryPages = categories.map(category => ({
    url: `prompts/${category}`,
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: today
  }));

  // Generate blog post pages
  const blogPosts = getAllBlogPosts();
  const blogPages = blogPosts.map(post => ({
    url: `blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: post.date || today
  }));

  // Combine all pages
  const allPages = [...staticPages, ...categoryPages, ...blogPages];

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
