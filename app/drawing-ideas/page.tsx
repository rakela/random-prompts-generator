import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Pencil, Sparkles } from 'lucide-react';
import { getGeneratorsByCategory } from '@/lib/generators/generatorConfig';

export const metadata: Metadata = {
  title: 'Drawing Ideas Generator - Free Random Drawing Prompts & Name Generators',
  description: 'Generate random drawing ideas, character names, objects, hobbies, and creative inspiration. Perfect for artists, illustrators, and creative minds.',
  keywords: 'drawing ideas, random name generator, character names, drawing prompts, object generator, hobby ideas, creative inspiration, art ideas',
  openGraph: {
    title: 'Drawing Ideas Generator - Free Random Drawing Prompts & Name Generators',
    description: 'Generate random drawing ideas, character names, objects, hobbies, and creative inspiration.',
    url: 'https://randomprompts.org/drawing-ideas/',
    type: 'website',
  },
};

export default function DrawingIdeasHub() {
  const drawingGenerators = getGeneratorsByCategory('drawing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:underline hover:text-gray-900 dark:hover:text-gray-100">
            Home
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 dark:text-gray-100">Drawing Ideas</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Pencil size={48} />
            <h1 className="text-5xl md:text-6xl font-bold">Drawing Ideas</h1>
          </div>
          <p className="text-2xl opacity-90 mb-6 max-w-3xl">
            Free random generators for drawing ideas, character names, objects, and creative inspiration.
            Perfect for artists, worldbuilders, and creative minds.
          </p>
          <div className="flex flex-wrap gap-4 text-lg">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span>{drawingGenerators.length} Generators</span>
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
          {drawingGenerators.map((generator) => (
            <Link
              key={generator.id}
              href={generator.path}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-green-500 dark:hover:border-green-400 transition-all group"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {generator.h1}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                {generator.description}
              </p>
              <div className="mt-4 text-green-600 dark:text-green-400 text-sm font-semibold flex items-center gap-1">
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
            <h2>Free Drawing Ideas & Random Generators</h2>
            <p>
              Overcome creative blocks with our collection of random generators for artists and creative minds.
              From character names to drawing prompts, these tools provide endless inspiration for your creative
              projects.
            </p>

            <h3>Popular Generators</h3>
            <ul>
              <li><strong>Random Name Generator</strong> - Create unique character names for fantasy, sci-fi, and more</li>
              <li><strong>Random Object Generator</strong> - Generate objects to draw or include in your artwork</li>
              <li><strong>Random Drawing Ideas</strong> - Get instant inspiration for your next sketch</li>
              <li><strong>Random Hobbies</strong> - Discover new interests and character traits</li>
              <li><strong>Random Superpowers</strong> - Create unique abilities for your characters</li>
            </ul>

            <h3>Perfect For</h3>
            <ul>
              <li><strong>Artists & Illustrators</strong> - Find drawing subjects and character inspiration</li>
              <li><strong>Writers & Worldbuilders</strong> - Create unique names and character details</li>
              <li><strong>Game Developers</strong> - Generate NPCs, items, and character concepts</li>
              <li><strong>Dungeon Masters</strong> - Quick character names and creative ideas for RPGs</li>
              <li><strong>Creative Hobbyists</strong> - Explore new ideas and overcome creative blocks</li>
            </ul>

            <h3>How to Use These Generators</h3>
            <p>
              Each generator is designed to spark creativity and provide instant inspiration. Click on any
              tool above to start generating. Save your favorites, share them with others, or use them as
              starting points for your own creative work.
            </p>

            <h3>Why Use Random Generators?</h3>
            <p>
              Random generators help you:
            </p>
            <ul>
              <li>Overcome creative blocks and artist's block</li>
              <li>Discover unexpected combinations and ideas</li>
              <li>Practice drawing with varied subjects</li>
              <li>Create diverse characters and worlds</li>
              <li>Challenge yourself with new concepts</li>
              <li>Save time brainstorming names and concepts</li>
            </ul>

            <h3>For Character Creation</h3>
            <p>
              Our name generators are perfect for creating unique characters in fantasy novels, sci-fi stories,
              games, and role-playing campaigns. Generate names that fit specific cultures, races, or styles,
              and combine them with our other tools to flesh out complete character concepts.
            </p>

            <h3>For Drawing Practice</h3>
            <p>
              Use our object and idea generators to build a diverse portfolio and improve your drawing skills.
              Random subjects push you outside your comfort zone and help you develop versatility as an artist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
