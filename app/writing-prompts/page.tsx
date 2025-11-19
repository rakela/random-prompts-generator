import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { getGeneratorsByCategory } from '@/lib/generators/generatorConfig';

export const metadata: Metadata = {
  title: 'Writing Prompts Generator - Free Creative Writing Ideas',
  description: 'Discover free writing prompt generators for stories, essays, paragraphs, and creative writing. Perfect for writers, students, and NaNoWriMo participants.',
  keywords: 'writing prompts, creative writing, story prompts, paragraph generator, essay prompts, writing ideas, NaNoWriMo, writing exercises',
  openGraph: {
    title: 'Writing Prompts Generator - Free Creative Writing Ideas',
    description: 'Discover free writing prompt generators for stories, essays, paragraphs, and creative writing.',
    url: 'https://randomprompts.org/writing-prompts/',
    type: 'website',
  },
};

export default function WritingPromptsHub() {
  const writingGenerators = getGeneratorsByCategory('writing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
            Home
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 dark:text-gray-100">Writing Prompts</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={48} />
            <h1 className="text-5xl md:text-6xl font-bold">Writing Prompts</h1>
          </div>
          <p className="text-2xl opacity-90 mb-6 max-w-3xl">
            Free writing prompt generators for creative writers, students, and storytellers.
            Generate unlimited ideas for stories, essays, paragraphs, and more.
          </p>
          <div className="flex flex-wrap gap-4 text-lg">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span>{writingGenerators.length} Generators</span>
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
          {writingGenerators.map((generator) => (
            <Link
              key={generator.id}
              href={generator.path}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all group"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {generator.h1}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                {generator.description}
              </p>
              <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1">
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
            <h2>Free Writing Prompt Generators</h2>
            <p>
              Our collection of writing prompt generators helps writers overcome writer's block and discover
              new creative directions. Whether you're working on a novel, short story, essay, or just practicing
              your craft, these tools provide endless inspiration.
            </p>

            <h3>Popular Writing Generators</h3>
            <ul>
              <li><strong>Paragraph Generator</strong> - Create complete paragraphs for essays and stories</li>
              <li><strong>Short Story Prompts</strong> - Get complete story ideas with characters and plots</li>
              <li><strong>Creative Writing Prompts</strong> - Spark your imagination with unique scenarios</li>
              <li><strong>Persuasive Writing Topics</strong> - Find compelling topics for argumentative essays</li>
              <li><strong>NaNoWriMo Prompts</strong> - Special prompts for National Novel Writing Month</li>
            </ul>

            <h3>Perfect For</h3>
            <ul>
              <li><strong>Students</strong> - Get ideas for essays, creative writing assignments, and homework</li>
              <li><strong>Authors</strong> - Overcome writer's block and explore new story concepts</li>
              <li><strong>Teachers</strong> - Create engaging writing assignments for your students</li>
              <li><strong>NaNoWriMo Participants</strong> - Find daily writing inspiration during November</li>
              <li><strong>Creative Writers</strong> - Practice and develop your writing skills</li>
            </ul>

            <h3>How to Use Writing Prompts</h3>
            <p>
              Select any generator above to start creating prompts. Each tool is designed for a specific type
              of writing, from quick paragraphs to complete story concepts. Save your favorites, share them
              with writing groups, or use them as starting points for your own creative work.
            </p>

            <h3>Why Use Writing Prompt Generators?</h3>
            <p>
              Writing prompts help you:
            </p>
            <ul>
              <li>Overcome writer's block and get unstuck</li>
              <li>Explore new genres and writing styles</li>
              <li>Practice writing regularly with fresh ideas</li>
              <li>Challenge yourself with unexpected scenarios</li>
              <li>Develop your creative thinking skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
