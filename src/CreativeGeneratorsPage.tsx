import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box, Activity, Zap, Lightbulb, Sparkles } from 'lucide-react';

const CreativeGeneratorsPage = () => {
  const generators = [
    {
      name: 'Random Object Generator',
      path: '/random-object-generator',
      icon: Box,
      description: 'Generate random objects for drawing practice',
      color: 'blue'
    },
    {
      name: 'Random Hobby Generator',
      path: '/random-hobby-generator',
      icon: Activity,
      description: 'Discover new hobbies and activities',
      color: 'green'
    },
    {
      name: 'Random Superpower Generator',
      path: '/random-superpower-generator',
      icon: Zap,
      description: 'Create unique superhero abilities',
      color: 'purple'
    },
    {
      name: 'Random Idea Generator',
      path: '/random-idea-generator',
      icon: Lightbulb,
      description: 'Spark creativity with random ideas',
      color: 'yellow'
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600',
      green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600',
      yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 dark:hover:border-yellow-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      <SEO
        title="Creative Generators - Random Ideas & Inspiration Tools | Random Prompts"
        description="Explore creative generators for random objects, hobbies, superpowers, and ideas. Perfect for brainstorming, drawing practice, and creative projects."
        keywords="creative generators, random ideas, object generator, hobby generator, brainstorming tools"
        ogTitle="Creative Generators - Spark Your Imagination"
        ogDescription="4 free creative generators for random objects, hobbies, superpowers, and ideas. Perfect for artists, writers, and creative thinkers."
      />
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Creative Generators</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Creative Generators</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Unleash your creativity with random generators for objects, hobbies, superpowers, and ideas. Perfect for brainstorming and creative exercises.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <Lightbulb className="inline mr-2" size={16} />
              4 Generators
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <Sparkles className="inline mr-2" size={16} />
              Endless Ideas
            </div>
          </div>
        </div>
      </div>

      {/* Generators Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            All Creative Generators
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Tools for creative thinking, brainstorming, and inspiration. Each generator helps you break through mental blocks and discover new possibilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {generators.map((generator) => {
            const Icon = generator.icon;
            return (
              <Link
                key={generator.path}
                to={generator.path}
                className={`block p-6 rounded-xl border-2 transition-all hover:shadow-lg ${getColorClasses(generator.color)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon size={24} className="text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                      {generator.name}
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

        {/* SEO Content */}
        <div className="mt-16 prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Boost Your Creativity with Random Generators
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Creative generators are essential tools for artists, writers, and anyone looking to think outside the box. By introducing randomness into your creative process, these tools help you discover unexpected combinations and fresh perspectives you might never have considered on your own.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Perfect for Artists and Designers
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Use the random object generator for daily drawing practice, improving your observation skills and expanding your visual library. Artists who practice drawing random objects develop versatility and the ability to render any subject convincingly.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Break Through Creative Blocks
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            When you're stuck in a creative rut, random generators provide the external stimulus needed to break free. The unexpected combinations force your brain to make new connections, often leading to innovative solutions and fresh ideas for your projects.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreativeGeneratorsPage;
