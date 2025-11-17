import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define all routes that need to be prerendered
const routes = [
  { path: '/', title: 'Random Prompts Generator - Writing, Stories, & AI Art', description: 'Generate unlimited random prompts for writing, AI art, blogs, stories & names. Free prompt generator for ChatGPT, MidJourney & creative projects.' },
  { path: '/writing-prompts', title: 'Random Writing Prompt Generator - Free Writing Prompts', description: 'Free random writing prompt generator with unique conflicts, plot twists & emotional stakes. Break through writer\'s block with creative story prompts.' },
  { path: '/ai-images-prompt', title: 'AI Images Prompt Generator - Free AI Art Prompts for MidJourney & DALL-E', description: 'Generate professional AI art prompts for MidJourney, DALL-E & Stable Diffusion. Free AI images prompt with lighting, composition & artistic styles.' },
  { path: '/ai-blog-post-generator', title: 'AI Blog Post Generator - Free Blog Post Ideas & Topics', description: 'Generate SEO-optimized blog post ideas instantly. Free blog topic generator with proven formats, compelling hooks & keyword-rich content strategies.' },
  { path: '/short-story-prompts-generator', title: 'Short Story Prompts Generator - Free Random Story Ideas', description: 'Generate creative short story prompts with compelling conflicts & plot twists. Free random story prompt generator for flash fiction & short stories.' },
  { path: '/random-name-generator', title: 'Random Name Generator - Fantasy & Character Names', description: 'Generate unique fantasy character names for stories & games. Random name generator with elvish, dwarven, human & exotic names. Free & unlimited.' },
  { path: '/ghostface-ai-trend-prompt-generator', title: 'Ghostface AI Prompt Generator - Horror Character Prompts', description: 'Generate Ghostface AI art prompts for horror-themed images. Free Ghostface prompt generator for MidJourney, DALL-E & Stable Diffusion Halloween art.' },
  { path: '/gemini-ai-snow-prompt-tutorial', title: 'Gemini AI Snow Prompt Tutorial - Professional Winter Portrait Prompts', description: 'Master Gemini AI snow portraits with professional prompts. Create stunning winter photography with ready-to-use templates & advanced techniques.' },
  { path: '/october-writing-prompts', title: 'October Writing Prompts - Halloween & Fall Story Ideas', description: 'Generate spooky October writing prompts for Halloween & autumn stories. Free fall writing prompt generator with horror, mystery & seasonal themes.' },
  { path: '/writing-prompts-for-students', title: 'Writing Prompts for Students - Creative Writing Ideas for School', description: 'Free writing prompts for students K-12. Generate age-appropriate creative writing ideas for essays, stories & classroom assignments. Educational prompts.' },
  { path: '/persuasive-writing-topics', title: 'Persuasive Writing Topics Generator - Debate & Opinion Topics', description: 'Generate engaging persuasive writing topics for essays & debates. Free persuasive topic generator with controversial & thought-provoking subjects.' },
  { path: '/persuasive-essays-topics', title: 'Persuasive Essays Topics Generator - Argumentative Essay Ideas', description: 'Generate compelling persuasive essay topics for students. Free argumentative essay topic generator with debate-worthy ideas & controversial subjects.' },
  { path: '/persuasive-writing-titles', title: 'Persuasive Writing Titles Generator - Compelling Essay Titles', description: 'Generate attention-grabbing persuasive writing titles. Free essay title generator with powerful headlines for argumentative & persuasive essays.' },
  { path: '/nano-banana-prompts', title: 'Nano Banana Prompts - NaNoWriMo Writing Prompts Generator', description: 'Nano Banana Prompts for NaNoWriMo! Generate creative writing prompts to hit your 50k word goal. Free NaNoWriMo prompt generator for novelists.' },
  { path: '/midjourney-ai-picture-generator', title: 'MidJourney AI Prompts Generator - Free MidJourney Prompts', description: 'Generate professional MidJourney prompts with advanced techniques. Free MidJourney AI prompt generator optimized for stunning V6 AI art results.' },
  { path: '/privacy', title: 'Privacy Policy - Random Prompts Generator', description: 'Privacy Policy for RandomPrompts.org. Learn how we protect your data and privacy when using our free random prompt generator tools.' },
  { path: '/terms', title: 'Terms of Service - Random Prompts Generator', description: 'Terms of Service for RandomPrompts.org. Review our usage terms and conditions for the free random prompts generator platform.' }
];

async function prerender() {
  const distDir = path.resolve(__dirname, '../dist');
  const serverDir = path.resolve(__dirname, '../dist-ssr');
  const indexPath = path.join(distDir, 'index.html');

  console.log('Starting SSR prerendering process...');
  console.log(`Distribution directory: ${distDir}`);
  console.log(`Server directory: ${serverDir}`);

  // Check if dist/index.html exists
  if (!fs.existsSync(indexPath)) {
    console.error('ERROR: dist/index.html not found. Please run client build first.');
    process.exit(1);
  }

  // Check if server build exists (try both .cjs and .js)
  let serverEntryPath = path.join(serverDir, 'entry-server.cjs');
  if (!fs.existsSync(serverEntryPath)) {
    serverEntryPath = path.join(serverDir, 'entry-server.js');
    if (!fs.existsSync(serverEntryPath)) {
      console.error('ERROR: Server build not found. Please run server build first.');
      process.exit(1);
    }
  }

  // Import the server render function
  const { render } = await import(serverEntryPath);

  // Read the base index.html template
  const baseHtml = fs.readFileSync(indexPath, 'utf-8');

  // Generate HTML for each route
  for (const route of routes) {
    console.log(`\nRendering: ${route.path}`);

    const canonicalUrl = `https://randomprompts.org${route.path}`.replace(/\/$/, '');

    try {
      // Render the component for this route
      const { html, helmet } = render(route.path);

      // Start with base HTML
      let finalHtml = baseHtml;

      // Inject the rendered HTML into the root div
      finalHtml = finalHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      );

      // Replace meta tags
      finalHtml = finalHtml.replace(/<title>.*?<\/title>/g, `<title>${route.title}</title>`);

      finalHtml = finalHtml.replace(
        /<meta name="description" content="[^"]*" \/>/g,
        `<meta name="description" content="${route.description}" />`
      );

      finalHtml = finalHtml.replace(
        /<link rel="canonical" href="[^"]*" \/>/g,
        `<link rel="canonical" href="${canonicalUrl}" />`
      );

      // Replace OG tags
      finalHtml = finalHtml.replace(
        /<meta property="og:title" content="[^"]*" \/>/g,
        `<meta property="og:title" content="${route.title}" />`
      );
      finalHtml = finalHtml.replace(
        /<meta property="og:description" content="[^"]*" \/>/g,
        `<meta property="og:description" content="${route.description}" />`
      );
      finalHtml = finalHtml.replace(
        /<meta property="og:url" content="[^"]*" \/>/g,
        `<meta property="og:url" content="${canonicalUrl}" />`
      );

      // Replace Twitter tags
      finalHtml = finalHtml.replace(
        /<meta name="twitter:title" content="[^"]*" \/>/g,
        `<meta name="twitter:title" content="${route.title}" />`
      );
      finalHtml = finalHtml.replace(
        /<meta name="twitter:description" content="[^"]*" \/>/g,
        `<meta name="twitter:description" content="${route.description}" />`
      );

      // Determine output path
      let outputPath;
      if (route.path === '/') {
        outputPath = indexPath;
      } else {
        const routeDir = path.join(distDir, route.path);
        fs.mkdirSync(routeDir, { recursive: true });
        outputPath = path.join(routeDir, 'index.html');
      }

      // Write the prerendered HTML
      fs.writeFileSync(outputPath, finalHtml);
      console.log(`✓ Prerendered: ${route.path} -> ${outputPath}`);
    } catch (error) {
      console.error(`✗ Failed to render ${route.path}:`, error.message);
      // Continue with other routes even if one fails
    }
  }

  console.log(`\n✓ SSR Prerendering complete! Generated ${routes.length} pages.`);
}

prerender().catch(err => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
