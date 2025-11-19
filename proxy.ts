import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Legacy URL redirects mapping
const redirects: Record<string, string> = {
  // Writing Prompts
  '/random-writing-prompts': '/writing-prompts/prompts/',
  '/random-paragraph-generator': '/writing-prompts/paragraph/',
  '/random-sentence-generator': '/writing-prompts/sentence/',
  '/short-story-prompts': '/writing-prompts/short-story/',
  '/creative-writing-prompts': '/writing-prompts/creative/',
  '/sci-fi-writing-prompts': '/writing-prompts/sci-fi/',
  '/fantasy-writing-prompts': '/writing-prompts/fantasy/',
  '/horror-writing-prompts': '/writing-prompts/horror/',
  '/romance-writing-prompts': '/writing-prompts/romance/',
  '/mystery-writing-prompts': '/writing-prompts/mystery/',
  '/dialogue-prompts': '/writing-prompts/dialogue/',
  '/character-prompts': '/writing-prompts/character/',
  '/plot-generator': '/writing-prompts/plot/',
  '/setting-generator': '/writing-prompts/setting/',
  '/conflict-generator': '/writing-prompts/conflict/',
  '/theme-generator': '/writing-prompts/theme/',
  '/writing-prompts-for-students': '/writing-prompts/students/',
  '/october-writing-prompts': '/writing-prompts/october/',
  '/nano-banana-generator': '/writing-prompts/nano-banana/',
  '/persuasive-writing-topics': '/writing-prompts/persuasive-topics/',
  '/persuasive-essay-topics': '/writing-prompts/persuasive-essays/',
  '/persuasive-writing-titles': '/writing-prompts/persuasive-titles/',
  '/poetry-prompts': '/writing-prompts/poetry/',
  '/journal-prompts': '/writing-prompts/journal/',

  // AI Art Prompts
  '/ai-art-prompts': '/ai-art-prompts/images/',
  '/midjourney-ai-picture-generator': '/ai-art-prompts/midjourney/',
  '/aesthetic-ai-prompts': '/ai-art-prompts/aesthetic/',
  '/photography-prompts': '/ai-art-prompts/photography/',
  '/portrait-prompts': '/ai-art-prompts/portrait/',
  '/landscape-prompts': '/ai-art-prompts/landscape/',
  '/abstract-art-prompts': '/ai-art-prompts/abstract/',
  '/character-design-prompts': '/ai-art-prompts/character/',
  '/environment-prompts': '/ai-art-prompts/environment/',
  '/creature-design-prompts': '/ai-art-prompts/creature/',
  '/architecture-prompts': '/ai-art-prompts/architecture/',
  '/fashion-design-prompts': '/ai-art-prompts/fashion/',
  '/concept-art-prompts': '/ai-art-prompts/concept/',
  '/digital-art-prompts': '/ai-art-prompts/digital/',
  '/3d-art-prompts': '/ai-art-prompts/3d/',
  '/pixel-art-prompts': '/ai-art-prompts/pixel/',

  // Drawing Ideas
  '/random-name-generator': '/drawing-ideas/names/',
  '/random-object-generator': '/drawing-ideas/objects/',
  '/random-hobby-generator': '/drawing-ideas/hobbies/',
  '/random-superpower-generator': '/drawing-ideas/superpowers/',
  '/random-drawing-ideas': '/drawing-ideas/ideas/',

  // Old generator paths - redirect to new category-based paths
  '/generators/writing/prompts': '/writing-prompts/prompts/',
  '/generators/writing/paragraph': '/writing-prompts/paragraph/',
  '/generators/writing/sentence': '/writing-prompts/sentence/',
  '/generators/writing/short-story': '/writing-prompts/short-story/',
  '/generators/writing/creative': '/writing-prompts/creative/',
  '/generators/writing/sci-fi': '/writing-prompts/sci-fi/',
  '/generators/writing/fantasy': '/writing-prompts/fantasy/',
  '/generators/writing/horror': '/writing-prompts/horror/',
  '/generators/writing/romance': '/writing-prompts/romance/',
  '/generators/writing/mystery': '/writing-prompts/mystery/',
  '/generators/writing/dialogue': '/writing-prompts/dialogue/',
  '/generators/writing/character': '/writing-prompts/character/',
  '/generators/writing/plot': '/writing-prompts/plot/',
  '/generators/writing/setting': '/writing-prompts/setting/',
  '/generators/writing/conflict': '/writing-prompts/conflict/',
  '/generators/writing/theme': '/writing-prompts/theme/',
  '/generators/writing/students': '/writing-prompts/students/',
  '/generators/writing/october': '/writing-prompts/october/',
  '/generators/writing/poetry': '/writing-prompts/poetry/',
  '/generators/writing/journal': '/writing-prompts/journal/',
  '/generators/writing/persuasive-topics': '/writing-prompts/persuasive-topics/',
  '/generators/writing/persuasive-essays': '/writing-prompts/persuasive-essays/',
  '/generators/writing/persuasive-titles': '/writing-prompts/persuasive-titles/',

  '/generators/ai-art/images': '/ai-art-prompts/images/',
  '/generators/ai-art/midjourney': '/ai-art-prompts/midjourney/',
  '/generators/ai-art/aesthetic': '/ai-art-prompts/aesthetic/',
  '/generators/ai-art/photography': '/ai-art-prompts/photography/',
  '/generators/ai-art/portrait': '/ai-art-prompts/portrait/',
  '/generators/ai-art/landscape': '/ai-art-prompts/landscape/',
  '/generators/ai-art/abstract': '/ai-art-prompts/abstract/',
  '/generators/ai-art/character': '/ai-art-prompts/character/',
  '/generators/ai-art/environment': '/ai-art-prompts/environment/',
  '/generators/ai-art/creature': '/ai-art-prompts/creature/',
  '/generators/ai-art/architecture': '/ai-art-prompts/architecture/',
  '/generators/ai-art/fashion': '/ai-art-prompts/fashion/',
  '/generators/ai-art/concept': '/ai-art-prompts/concept/',
  '/generators/ai-art/digital': '/ai-art-prompts/digital/',
  '/generators/ai-art/3d': '/ai-art-prompts/3d/',
  '/generators/ai-art/pixel': '/ai-art-prompts/pixel/',

  '/generators/blog/post': '/ai-blog-post-generator/',
  '/generators/blog/nano-banana': '/writing-prompts/nano-banana/',

  '/generators/creative/names': '/drawing-ideas/names/',
  '/generators/creative/objects': '/drawing-ideas/objects/',
  '/generators/creative/hobbies': '/drawing-ideas/hobbies/',
  '/generators/creative/superpowers': '/drawing-ideas/superpowers/',
  '/generators/creative/ideas': '/drawing-ideas/ideas/',
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Remove trailing slash for comparison if present
  const normalizedPath = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;

  // Check if this is a legacy URL that needs to be redirected
  if (redirects[normalizedPath]) {
    const destination = redirects[normalizedPath];
    return NextResponse.redirect(new URL(destination, request.url), {
      status: 301, // Permanent redirect for SEO
    });
  }

  // Also check with trailing slash
  if (redirects[normalizedPath + '/']) {
    const destination = redirects[normalizedPath + '/'];
    return NextResponse.redirect(new URL(destination, request.url), {
      status: 301,
    });
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|logo.svg|og-image.png|robots.txt|sitemap.xml).*)',
  ],
};
