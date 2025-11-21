import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { generatorConfig, getGeneratorsByCategory } from '@/lib/generators/generatorConfig';
import GeneratorClient from '@/components/GeneratorClient';

// Generate static params for all writing generators
export async function generateStaticParams() {
  const writingGenerators = getGeneratorsByCategory('writing');
  return writingGenerators.map((gen) => ({
    slug: gen.slug,
  }));
}

// Generate metadata for each generator
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const generator = Object.values(generatorConfig).find(
    gen => gen.slug === params.slug && gen.category === 'writing'
  );

  if (!generator) {
    return { title: 'Generator Not Found' };
  }

  return {
    title: generator.title,
    description: generator.description,
    keywords: generator.keywords,
    openGraph: {
      title: generator.title,
      description: generator.description,
      url: `https://randomprompts.org${generator.path}`,
      type: 'website',
    },
  };
}

export default function WritingGeneratorPage({ params }: { params: { slug: string } }) {
  // Find the generator by slug
  const generator = Object.values(generatorConfig).find(
    gen => gen.slug === params.slug && gen.category === 'writing'
  );

  if (!generator) {
    notFound();
  }

  // Determine gradient colors based on slug
  const getGradientColors = (slug: string) => {
    switch (slug) {
      case 'christmas':
        return 'bg-gradient-to-r from-red-600 to-green-600';
      case 'october':
        return 'bg-gradient-to-r from-orange-600 to-purple-700';
      default:
        return 'bg-gradient-to-r from-blue-600 to-purple-600';
    }
  };

  // Determine button colors based on slug
  const getButtonColor = (slug: string) => {
    switch (slug) {
      case 'christmas':
        return 'bg-red-600 hover:bg-red-700';
      case 'october':
        return 'bg-orange-600 hover:bg-orange-700';
      default:
        return 'bg-purple-600 hover:bg-purple-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link href="/writing-prompts/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
            Writing Prompts
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 dark:text-gray-100">{generator.h1}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`${getGradientColors(params.slug)} text-white py-16`}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{generator.h1}</h1>
          <p className="text-xl text-white opacity-90 mb-6">{generator.description}</p>
        </div>
      </div>

      {/* Generator Client Component */}
      <GeneratorClient generator={generator} category="writing" buttonColor={getButtonColor(params.slug)} />

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
