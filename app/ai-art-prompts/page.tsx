import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Palette, Sparkles } from 'lucide-react';
import { getGeneratorsByCategory } from '@/lib/generators/generatorConfig';

export const metadata: Metadata = {
  title: 'AI Art Prompts Generator - Free Prompts for Midjourney, DALL-E & More',
  description: 'Generate creative AI art prompts for Midjourney, DALL-E, Stable Diffusion, and other AI image generators. Free aesthetic and photography prompts.',
  keywords: 'AI art prompts, Midjourney prompts, DALL-E prompts, AI image generator, aesthetic prompts, photography prompts, Stable Diffusion prompts, AI art ideas',
  openGraph: {
    title: 'AI Art Prompts Generator - Free Prompts for Midjourney, DALL-E & More',
    description: 'Generate creative AI art prompts for Midjourney, DALL-E, Stable Diffusion, and other AI image generators.',
    url: 'https://randomprompts.org/ai-art-prompts/',
    type: 'website',
  },
};

export default function AIArtPromptsHub() {
  const aiArtGenerators = getGeneratorsByCategory('ai-art');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
            Home
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 dark:text-gray-100">AI Art Prompts</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Palette size={48} />
            <h1 className="text-5xl md:text-6xl font-bold">AI Art Prompts</h1>
          </div>
          <p className="text-2xl opacity-90 mb-6 max-w-3xl">
            Free AI art prompt generators for Midjourney, DALL-E, Stable Diffusion, and more.
            Create stunning visuals with professionally crafted prompts.
          </p>
          <div className="flex flex-wrap gap-4 text-lg">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span>{aiArtGenerators.length} Generators</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span>No Sign-up Required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generator Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiArtGenerators.map((generator) => (
            <Link
              key={generator.id}
              href={generator.path}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-purple-500 dark:hover:border-purple-400 transition-all group"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {generator.h1}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                {generator.description}
              </p>
              <div className="mt-4 text-purple-600 dark:text-purple-400 text-sm font-semibold flex items-center gap-1">
                Try it now
                <ChevronRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>Free AI Art Prompt Generators</h2>
            <p>
              Create stunning AI-generated artwork with our specialized prompt generators. Whether you're using
              Midjourney, DALL-E, Stable Diffusion, or any other AI image generator, our tools help you craft
              the perfect prompts for your creative vision.
            </p>

            <h3>Popular AI Art Generators</h3>
            <ul>
              <li><strong>Midjourney Prompts</strong> - Optimized prompts for Midjourney AI</li>
              <li><strong>Aesthetic Prompts</strong> - Create beautiful aesthetic images</li>
              <li><strong>Photography Prompts</strong> - Realistic photo-style AI images</li>
              <li><strong>Abstract Art Prompts</strong> - Generate unique abstract artwork</li>
              <li><strong>Character Design Prompts</strong> - Create detailed character illustrations</li>
            </ul>

            <h3>Perfect For</h3>
            <ul>
              <li><strong>Digital Artists</strong> - Enhance your creative workflow with AI</li>
              <li><strong>Designers</strong> - Generate concept art and design inspiration</li>
              <li><strong>Content Creators</strong> - Create unique visuals for social media and blogs</li>
              <li><strong>Hobbyists</strong> - Explore AI art generation as a creative outlet</li>
              <li><strong>Professionals</strong> - Quick mockups and visual concepts for clients</li>
            </ul>

            <h3>How to Use AI Art Prompts</h3>
            <p>
              Select a generator above to create prompts tailored to different artistic styles and subjects.
              Copy the generated prompt and paste it into your favorite AI image generator. Experiment with
              different variations to achieve your desired results.
            </p>

            <h3>Supported AI Image Generators</h3>
            <p>
              Our prompts work with all major AI art platforms:
            </p>
            <ul>
              <li><strong>Midjourney</strong> - Discord-based AI art generator</li>
              <li><strong>DALL-E 3</strong> - OpenAI's image generation model</li>
              <li><strong>Stable Diffusion</strong> - Open-source AI art model</li>
              <li><strong>Leonardo AI</strong> - Game asset and concept art generator</li>
              <li><strong>Adobe Firefly</strong> - Adobe's creative AI tools</li>
              <li><strong>And many more!</strong></li>
            </ul>

            <h3>Tips for Better AI Art</h3>
            <ul>
              <li>Be specific about style, mood, and composition</li>
              <li>Include lighting and color preferences</li>
              <li>Mention artistic influences or references</li>
              <li>Experiment with different prompt variations</li>
              <li>Combine multiple concepts for unique results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
