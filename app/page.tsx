import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Prompts Generator - Free AI & Writing Prompts',
  description: 'Generate endless creative prompts for writing, AI art, and stories. Perfect for ChatGPT, MidJourney, and creative writing.',
  keywords: 'random prompts, writing prompts, AI art prompts, creative writing, story generator',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Random Prompts Generator
          </h1>

          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Random Prompts Generator for writing, AI art, blogging, stories, and character creation,
            all in one clean, powerful tool. Instantly generate professional-quality prompts for
            ChatGPT, MidJourney, and creative writing.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Next.js Migration in Progress
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're migrating to Next.js for better SEO and performance.
            The full generator functionality is coming soon!
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Writing Generators
              </h3>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                15+ writing and story prompt generators
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                AI Art Generators
              </h3>
              <p className="text-purple-700 dark:text-purple-400 text-sm">
                10+ AI art and visual prompt generators
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                Creative Tools
              </h3>
              <p className="text-green-700 dark:text-green-400 text-sm">
                Random objects, hobbies, and creative ideas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
