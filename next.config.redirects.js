/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for hosting on any platform
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // SEO-friendly URLs with trailing slashes

  // Skip linting during build (we'll run separately)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors during build (for now, during migration)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Redirects for legacy URLs (301 permanent redirects)
  async redirects() {
    return [
      // Writing generators
      {
        source: '/writing-prompts',
        destination: '/generators/writing/prompts/',
        permanent: true,
      },
      {
        source: '/random-paragraph-generator',
        destination: '/generators/writing/paragraph/',
        permanent: true,
      },
      {
        source: '/random-sentence-generator',
        destination: '/generators/writing/sentence/',
        permanent: true,
      },
      {
        source: '/random-dialogue-generator',
        destination: '/generators/writing/dialogue/',
        permanent: true,
      },
      {
        source: '/random-character-generator',
        destination: '/generators/writing/character/',
        permanent: true,
      },
      {
        source: '/random-story-starter-generator',
        destination: '/generators/writing/story-starter/',
        permanent: true,
      },
      {
        source: '/random-conflict-generator',
        destination: '/generators/writing/conflict/',
        permanent: true,
      },
      {
        source: '/random-plot-twist-generator',
        destination: '/generators/writing/plot-twist/',
        permanent: true,
      },
      {
        source: '/random-theme-generator',
        destination: '/generators/writing/theme/',
        permanent: true,
      },
      {
        source: '/random-setting-generator',
        destination: '/generators/writing/setting/',
        permanent: true,
      },
      {
        source: '/random-villain-generator',
        destination: '/generators/writing/villain/',
        permanent: true,
      },
      {
        source: '/random-hero-generator',
        destination: '/generators/writing/hero/',
        permanent: true,
      },
      {
        source: '/random-worldbuilding-prompts-generator',
        destination: '/generators/writing/worldbuilding/',
        permanent: true,
      },
      {
        source: '/random-magic-system-generator',
        destination: '/generators/writing/magic-system/',
        permanent: true,
      },
      {
        source: '/random-emotion-prompt-generator',
        destination: '/generators/writing/emotion/',
        permanent: true,
      },
      {
        source: '/random-relationship-prompt-generator',
        destination: '/generators/writing/relationship/',
        permanent: true,
      },
      {
        source: '/short-story-prompts-generator',
        destination: '/generators/writing/short-story/',
        permanent: true,
      },
      {
        source: '/october-writing-prompts',
        destination: '/generators/writing/october/',
        permanent: true,
      },
      {
        source: '/writing-prompts-for-students',
        destination: '/generators/writing/students/',
        permanent: true,
      },
      {
        source: '/persuasive-writing-topics',
        destination: '/generators/writing/persuasive-topics/',
        permanent: true,
      },
      {
        source: '/persuasive-essays-topics',
        destination: '/generators/writing/persuasive-essays/',
        permanent: true,
      },
      {
        source: '/persuasive-writing-titles',
        destination: '/generators/writing/persuasive-titles/',
        permanent: true,
      },

      // AI Art generators
      {
        source: '/ai-images-prompt',
        destination: '/generators/ai-art/images/',
        permanent: true,
      },
      {
        source: '/random-aesthetic-prompt-generator',
        destination: '/generators/ai-art/aesthetic/',
        permanent: true,
      },
      {
        source: '/random-art-style-generator',
        destination: '/generators/ai-art/art-style/',
        permanent: true,
      },
      {
        source: '/random-photography-prompt-generator',
        destination: '/generators/ai-art/photography/',
        permanent: true,
      },
      {
        source: '/random-character-design-prompt-generator',
        destination: '/generators/ai-art/character-design/',
        permanent: true,
      },
      {
        source: '/random-environment-design-generator',
        destination: '/generators/ai-art/environment/',
        permanent: true,
      },
      {
        source: '/random-sci-fi-prompt-generator',
        destination: '/generators/ai-art/sci-fi/',
        permanent: true,
      },
      {
        source: '/random-fantasy-art-prompt-generator',
        destination: '/generators/ai-art/fantasy/',
        permanent: true,
      },
      {
        source: '/random-anime-prompt-generator',
        destination: '/generators/ai-art/anime/',
        permanent: true,
      },
      {
        source: '/random-portrait-prompt-generator',
        destination: '/generators/ai-art/portrait/',
        permanent: true,
      },
      {
        source: '/random-lighting-style-generator',
        destination: '/generators/ai-art/lighting/',
        permanent: true,
      },
      {
        source: '/midjourney-ai-picture-generator',
        destination: '/generators/ai-art/midjourney/',
        permanent: true,
      },
      {
        source: '/ghostface-ai-trend-prompt-generator',
        destination: '/generators/ai-art/ghostface/',
        permanent: true,
      },
      {
        source: '/gemini-ai-snow-prompt-tutorial',
        destination: '/generators/ai-art/gemini-snow/',
        permanent: true,
      },
      {
        source: '/chatgpt-photo-editing-prompts',
        destination: '/generators/ai-art/chatgpt-photo/',
        permanent: true,
      },
      {
        source: '/gemini-photo-editing-prompts',
        destination: '/generators/ai-art/gemini-photo/',
        permanent: true,
      },

      // Blog and other generators
      {
        source: '/ai-blog-post-generator',
        destination: '/generators/blog/post/',
        permanent: true,
      },
      {
        source: '/nano-banana-prompts',
        destination: '/generators/blog/nano-banana/',
        permanent: true,
      },
      {
        source: '/random-name-generator',
        destination: '/generators/creative/names/',
        permanent: true,
      },
      {
        source: '/random-object-generator',
        destination: '/generators/creative/objects/',
        permanent: true,
      },
      {
        source: '/random-hobby-generator',
        destination: '/generators/creative/hobbies/',
        permanent: true,
      },
      {
        source: '/random-superpower-generator',
        destination: '/generators/creative/superpowers/',
        permanent: true,
      },
      {
        source: '/random-idea-generator',
        destination: '/generators/creative/ideas/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
