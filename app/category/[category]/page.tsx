import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getCategoryById } from '@/lib/metadata/categories';
import { generatorConfig, getGeneratorBySlug } from '@/lib/generators/generatorConfig';
import { PenTool, Wand2, BookOpen, Crown, Sparkles, Zap } from 'lucide-react';

interface Props {
  params: {
    category: string;
  };
}

// Generate static params for all categories (SSG)
export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }));
}

// Generate metadata dynamically per category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryById(params.category);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: category.title,
    description: category.description,
    keywords: category.keywords,
    openGraph: {
      title: category.title,
      description: category.description,
      url: `https://randomprompts.org/category/${params.category}/`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: category.title,
      description: category.description,
    },
  };
}

// Page component
export default function CategoryPage({ params }: Props) {
  const category = getCategoryById(params.category);

  if (!category) {
    notFound();
  }

  // Get related generators
  const relatedGenerators = category.relatedGenerators
    .map((id) => {
      const gen = generatorConfig[id];
      return gen;
    })
    .filter(Boolean);

  // Color mapping for gradients
  const colorGradients: Record<string, string> = {
    purple: 'from-purple-600 to-pink-600',
    pink: 'from-pink-600 to-rose-600',
    blue: 'from-blue-600 to-cyan-600',
    green: 'from-green-600 to-teal-600',
    orange: 'from-orange-600 to-red-600',
    red: 'from-red-600 to-pink-600',
  };

  const gradient = colorGradients[category.color] || 'from-purple-600 to-pink-600';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-100">{category.id}</span>
      </nav>

      {/* Hero */}
      <div className={`bg-gradient-to-r ${gradient} text-white py-16`}>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.h1}</h1>
          <p className="text-xl opacity-90 max-w-3xl">{category.description}</p>
        </div>
      </div>

      {/* Related Generators */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          {category.h1} Generators
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {relatedGenerators.map((generator) => (
            <Link
              key={generator.id}
              href={generator.path}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-lg group"
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {generator.h1}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {generator.description}
              </p>
            </Link>
          ))}
        </div>

        {/* SEO Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>About {category.h1}</h2>

          <p className="text-lg leading-relaxed">
            Discover endless inspiration with our comprehensive collection of {category.h1.toLowerCase()}.
            Whether you're a seasoned writer looking to break through creative blocks or a beginner
            seeking guidance, our {category.h1.toLowerCase()} will spark your imagination and help you
            craft compelling narratives.
          </p>

          <h3>Why Use {category.h1}?</h3>

          <p>
            {category.h1} are essential tools for writers at every level. They provide:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Creative Inspiration:</strong> Break through writer's block with unique story concepts and plot ideas</li>
            <li><strong>Character Development:</strong> Create multi-dimensional characters with depth and complexity</li>
            <li><strong>Plot Structure:</strong> Build engaging narratives with compelling conflicts and satisfying resolutions</li>
            <li><strong>Worldbuilding:</strong> Develop rich, immersive settings that bring your stories to life</li>
            <li><strong>Writing Practice:</strong> Improve your craft with daily writing exercises and challenges</li>
          </ul>

          <h3>How to Use These Prompts Effectively</h3>

          <p>
            To get the most out of our {category.h1.toLowerCase()}, consider these tips:
          </p>

          <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Don't overthink it:</strong> Use the first prompt that resonates with you</li>
            <li><strong>Adapt freely:</strong> Modify prompts to fit your style and preferences</li>
            <li><strong>Set time limits:</strong> Give yourself 15-30 minutes to write from each prompt</li>
            <li><strong>Combine prompts:</strong> Mix elements from different prompts for unique stories</li>
            <li><strong>Keep exploring:</strong> Generate multiple prompts until one sparks inspiration</li>
          </ol>

          <h3>Popular {category.h1} Themes</h3>

          <p>
            Our {category.h1.toLowerCase()} cover a wide range of themes and subgenres, including:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Character-driven narratives with emotional depth</li>
            <li>Plot-heavy stories with unexpected twists</li>
            <li>Atmospheric settings that enhance your storytelling</li>
            <li>Conflict scenarios that create tension and drama</li>
            <li>Unique perspectives and unconventional narratives</li>
          </ul>

          <h3>Start Writing Today</h3>

          <p>
            Ready to begin your creative journey? Explore our {category.h1.toLowerCase()} generators above
            and discover the perfect starting point for your next masterpiece. Each generator is designed
            to provide fresh, unique prompts that will challenge and inspire you.
          </p>

          <p>
            Remember, the best story is the one you actually write. Don't wait for perfect inspiration—
            use these prompts to start writing now, and let your creativity flow. Happy writing!
          </p>

          <h3>Frequently Asked Questions</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Are these prompts free to use?
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Yes! All our {category.h1.toLowerCase()} are completely free to use for any purpose,
                including commercial projects. Generate as many as you need.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Can I modify the prompts?
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Absolutely! These prompts are meant to inspire you. Feel free to adapt, combine,
                or completely transform them to suit your creative vision.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                How often are new prompts added?
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Our generators use sophisticated algorithms to create unique combinations, giving you
                virtually unlimited prompt variations. You'll never run out of inspiration!
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Can I save prompts for later?
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Yes! Each generator includes save, favorite, and export features so you can build
                your own collection of prompts and return to them whenever inspiration strikes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`bg-gradient-to-r ${gradient} text-white py-16 mt-12`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Writing?</h2>
          <p className="text-lg opacity-90 mb-8">
            Choose a generator above and create your next masterpiece today.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Explore All Generators
          </Link>
        </div>
      </div>
    </div>
  );
}
