import categoryPrompts from '../data/categoryPrompts.json';

const SITE_URL = 'https://randomprompts.org';

// Generate sitemap XML
export async function GET(context) {
  // Extract unique categories from category prompts
  const categories = [...new Set(categoryPrompts.map(prompt => prompt.category))];

  // Define all static pages
  const staticPages = [
    {
      url: '',
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: new Date().toISOString().split('T')[0]
    }
  ];

  // Generate category pages
  const categoryPages = categories.map(category => ({
    url: `prompts/${category}`,
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: new Date().toISOString().split('T')[0]
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
