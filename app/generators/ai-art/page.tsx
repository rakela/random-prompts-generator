import type { Metadata } from 'next';
import Link from 'next/link';
import { Image, Palette, Brush, Camera, User, Mountain, Rocket, Crown, Star, Sun, Sparkles, Ghost, Snowflake, Edit } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Art Generators - MidJourney, DALL-E & Stable Diffusion Prompts',
  description: 'Generate professional AI art prompts for MidJourney, DALL-E, Stable Diffusion, and more. 16+ generators for images, characters, environments, and visual styles.',
  keywords: 'AI art prompts, MidJourney prompts, DALL-E prompts, Stable Diffusion, AI image generator, art prompts, visual prompts, AI art generator',
  openGraph: {
    title: 'AI Art Generators - MidJourney, DALL-E & Stable Diffusion Prompts | Random Prompts',
    description: 'Generate professional AI art prompts for MidJourney, DALL-E, and Stable Diffusion with our 16+ specialized generators.',
    url: 'https://randomprompts.org/generators/ai-art/',
  },
};

const generators = [
  {
    title: 'AI Image Prompts',
    description: 'Professional prompts for MidJourney, DALL-E, and Stable Diffusion',
    href: '/generators/ai-art/images/',
    icon: Image,
    color: 'purple'
  },
  {
    title: 'Aesthetic Prompts',
    description: 'Generate aesthetic and visual style ideas for AI art',
    href: '/generators/ai-art/aesthetic/',
    icon: Palette,
    color: 'pink'
  },
  {
    title: 'Art Style Generator',
    description: 'Random art styles and artistic techniques',
    href: '/generators/ai-art/art-style/',
    icon: Brush,
    color: 'purple'
  },
  {
    title: 'Photography Prompts',
    description: 'Photo prompts with composition and lighting ideas',
    href: '/generators/ai-art/photography/',
    icon: Camera,
    color: 'blue'
  },
  {
    title: 'Character Design',
    description: 'Detailed character design prompts for AI art',
    href: '/generators/ai-art/character-design/',
    icon: User,
    color: 'purple'
  },
  {
    title: 'Environment Design',
    description: 'Scene and landscape design prompts',
    href: '/generators/ai-art/environment/',
    icon: Mountain,
    color: 'green'
  },
  {
    title: 'Sci-Fi Prompts',
    description: 'Futuristic sci-fi art prompts',
    href: '/generators/ai-art/sci-fi/',
    icon: Rocket,
    color: 'blue'
  },
  {
    title: 'Fantasy Art',
    description: 'Fantasy art prompts with magic and dragons',
    href: '/generators/ai-art/fantasy/',
    icon: Crown,
    color: 'purple'
  },
  {
    title: 'Anime Prompts',
    description: 'Anime and manga art prompts',
    href: '/generators/ai-art/anime/',
    icon: Star,
    color: 'pink'
  },
  {
    title: 'Portrait Prompts',
    description: 'Face and portrait art prompts',
    href: '/generators/ai-art/portrait/',
    icon: User,
    color: 'purple'
  },
  {
    title: 'Lighting Styles',
    description: 'Lighting techniques for AI art',
    href: '/generators/ai-art/lighting/',
    icon: Sun,
    color: 'orange'
  },
  {
    title: 'MidJourney Prompts',
    description: 'Optimized prompts for MidJourney AI',
    href: '/generators/ai-art/midjourney/',
    icon: Sparkles,
    color: 'purple'
  },
  {
    title: 'Ghostface AI Trend',
    description: 'Viral Ghostface AI trend prompts',
    href: '/generators/ai-art/ghostface/',
    icon: Ghost,
    color: 'red'
  },
  {
    title: 'Gemini Snow Tutorial',
    description: 'Create snow effects with Google Gemini AI',
    href: '/generators/ai-art/gemini-snow/',
    icon: Snowflake,
    color: 'blue'
  },
  {
    title: 'ChatGPT Photo Editing',
    description: 'ChatGPT prompts for photo editing',
    href: '/generators/ai-art/chatgpt-photo/',
    icon: Image,
    color: 'green'
  },
  {
    title: 'Gemini Photo Editing',
    description: 'Gemini AI prompts for image manipulation',
    href: '/generators/ai-art/gemini-photo/',
    icon: Edit,
    color: 'blue'
  },
];

export default function AIArtGeneratorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100">AI Art Generators</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Art Generators</h1>
          <p className="text-xl opacity-90 max-w-3xl mb-6">
            Create stunning AI art with our collection of 16+ specialized prompt generators.
            Optimized for MidJourney, DALL-E, Stable Diffusion, and all major AI image platforms.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>MidJourney Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>DALL-E Compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Professional Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generators Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generators.map((generator) => {
            const Icon = generator.icon;
            return (
              <Link
                key={generator.href}
                href={generator.href}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-lg group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-${generator.color}-100 dark:bg-${generator.color}-900/30 text-${generator.color}-600 dark:text-${generator.color}-400 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {generator.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {generator.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* SEO Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>Professional AI Art Prompt Generators</h2>
          <p className="text-lg">
            Create stunning AI-generated artwork with our specialized prompt generators. Whether you're
            using MidJourney, DALL-E, Stable Diffusion, or any other AI image generator, our tools
            help you craft professional-quality prompts that produce exceptional results.
          </p>

          <h3>Why Use AI Art Prompt Generators?</h3>
          <p>
            Creating effective AI art prompts is both an art and a science. Our generators help you:
          </p>
          <ul>
            <li>Learn proper prompt syntax and structure for different AI platforms</li>
            <li>Discover new artistic styles and visual techniques</li>
            <li>Generate complex prompts with lighting, composition, and quality modifiers</li>
            <li>Explore different genres from photorealistic to fantasy and anime</li>
            <li>Save time experimenting with prompt variations</li>
            <li>Understand what makes an effective AI art prompt</li>
          </ul>

          <h3>Optimized for Major AI Platforms</h3>
          <p>
            Our prompt generators are optimized for the most popular AI art platforms:
          </p>

          <h4>MidJourney</h4>
          <p>
            Generate prompts with proper MidJourney syntax, including aspect ratios, quality settings,
            and stylization parameters. Perfect for creating stunning concept art and illustrations.
          </p>

          <h4>DALL-E 3</h4>
          <p>
            Create detailed, descriptive prompts that work perfectly with OpenAI's DALL-E 3.
            Our generators help you achieve photorealistic results and creative compositions.
          </p>

          <h4>Stable Diffusion</h4>
          <p>
            Generate prompts optimized for Stable Diffusion's various models. Includes technical
            modifiers for quality, detail level, and artistic style.
          </p>

          <h3>Categories of AI Art Prompts</h3>

          <h4>Character & Portrait Prompts</h4>
          <p>
            Create detailed character designs, portraits, and figure art. Perfect for character
            concept art, profile pictures, and portrait photography.
          </p>

          <h4>Environment & Landscape Prompts</h4>
          <p>
            Generate breathtaking environments, landscapes, and architectural scenes. Ideal for
            worldbuilding, concept art, and scenic wallpapers.
          </p>

          <h4>Style & Aesthetic Prompts</h4>
          <p>
            Explore different artistic styles from anime and cyberpunk to Renaissance and impressionism.
            Perfect for discovering new visual directions.
          </p>

          <h3>Tips for Better AI Art</h3>
          <ol>
            <li><strong>Be specific:</strong> Include details about style, lighting, and composition</li>
            <li><strong>Use quality modifiers:</strong> Terms like "highly detailed" and "8K resolution" improve results</li>
            <li><strong>Combine elements:</strong> Mix different prompt components for unique outputs</li>
            <li><strong>Iterate:</strong> Generate multiple variations and refine based on results</li>
            <li><strong>Study examples:</strong> Learn from successful prompts in the AI art community</li>
          </ol>

          <h3>Start Creating Amazing AI Art</h3>
          <p>
            Choose a generator above and start creating professional-quality AI art prompts.
            Whether you're a digital artist, designer, or creative enthusiast, our tools will
            help you unlock the full potential of AI image generation.
          </p>
        </div>
      </div>
    </div>
  );
}
