import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { generatorConfig } from '@/lib/generators/generatorConfig';
import GeneratorClient from '@/components/GeneratorClient';

const generatorId = 'midjourney';

export const metadata: Metadata = {
  title: 'Midjourney AI Picture Generator - Free Prompt Generator',
  description: 'Generate creative AI art prompts specifically optimized for Midjourney.',
  keywords: 'midjourney prompts, AI art, midjourney generator, AI images',
  openGraph: {
    title: 'Midjourney AI Picture Generator - Free Prompt Generator',
    description: 'Generate creative AI art prompts specifically optimized for Midjourney.',
    url: 'https://randomprompts.org/midjourney-ai-picture-generator',
    type: 'website',
  },
};

export default function MidjourneyAIPicturePage() {
  const generator = generatorConfig[generatorId];

  if (!generator) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link href="/ai-art-prompts/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
            AI Art Prompts
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 dark:text-gray-100">{generator.h1}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{generator.h1}</h1>
          <p className="text-xl opacity-90 mb-6">{generator.description}</p>
        </div>
      </div>

      {/* Generator Client Component */}
      <GeneratorClient generator={generator} category="aiArt" />

      {/* SEO Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>About {generator.h1}</h2>
          <p>{generator.description}</p>

          <h3>How to Use This Generator</h3>
          <p>
            Click the "Generate" button above to create a new {generator.h1.toLowerCase()}.
            You can save your favorites, copy them to your clipboard, or share them with others.
          </p>

          <h3>Keywords</h3>
          <p>{generator.keywords}</p>
        </div>
      </div>
    </div>
  );
}
