import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import Header from './components/Header';
import Footer from './components/Footer';
import { PenTool, BookOpen, MessageSquare, Users, Sparkles, Zap, Globe, Wand2, Heart, Swords, Map, Crown, ScrollText } from 'lucide-react';

const WritingGeneratorsPage = () => {
  const generators = [
    {
      name: 'Paragraph Generator',
      path: '/random-paragraph-generator',
      icon: PenTool,
      description: 'Generate random paragraphs in various styles',
      color: 'blue'
    },
    {
      name: 'Sentence Generator',
      path: '/random-sentence-generator',
      icon: MessageSquare,
      description: 'Create unique random sentences',
      color: 'indigo'
    },
    {
      name: 'Dialogue Generator',
      path: '/random-dialogue-generator',
      icon: Users,
      description: 'Generate realistic dialogue exchanges',
      color: 'purple'
    },
    {
      name: 'Character Generator',
      path: '/random-character-generator',
      icon: Users,
      description: 'Create unique character profiles',
      color: 'pink'
    },
    {
      name: 'Story Starter Generator',
      path: '/random-story-starter-generator',
      icon: BookOpen,
      description: 'Get compelling story opening lines',
      color: 'rose'
    },
    {
      name: 'Conflict Generator',
      path: '/random-conflict-generator',
      icon: Swords,
      description: 'Generate story conflicts and tensions',
      color: 'red'
    },
    {
      name: 'Plot Twist Generator',
      path: '/random-plot-twist-generator',
      icon: Zap,
      description: 'Create unexpected plot twists',
      color: 'orange'
    },
    {
      name: 'Theme Generator',
      path: '/random-theme-generator',
      icon: Sparkles,
      description: 'Discover central themes for stories',
      color: 'amber'
    },
    {
      name: 'Setting Generator',
      path: '/random-setting-generator',
      icon: Map,
      description: 'Generate vivid story settings',
      color: 'yellow'
    },
    {
      name: 'Villain Generator',
      path: '/random-villain-generator',
      icon: Crown,
      description: 'Create compelling antagonists',
      color: 'emerald'
    },
    {
      name: 'Hero Generator',
      path: '/random-hero-generator',
      icon: Crown,
      description: 'Generate heroic protagonists',
      color: 'green'
    },
    {
      name: 'Worldbuilding Generator',
      path: '/random-worldbuilding-prompts-generator',
      icon: Globe,
      description: 'Build immersive fictional worlds',
      color: 'teal'
    },
    {
      name: 'Magic System Generator',
      path: '/random-magic-system-generator',
      icon: Wand2,
      description: 'Design unique magic systems',
      color: 'cyan'
    },
    {
      name: 'Emotion Prompt Generator',
      path: '/random-emotion-prompt-generator',
      icon: Heart,
      description: 'Explore emotional depth in writing',
      color: 'sky'
    },
    {
      name: 'Relationship Prompt Generator',
      path: '/random-relationship-prompt-generator',
      icon: Heart,
      description: 'Generate character relationships',
      color: 'violet'
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600',
      pink: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600',
      rose: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600',
      red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:border-red-400 dark:hover:border-red-600',
      orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600',
      amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600',
      yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 dark:hover:border-yellow-600',
      emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 dark:hover:border-emerald-600',
      green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600',
      teal: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 hover:border-teal-400 dark:hover:border-teal-600',
      cyan: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600',
      sky: 'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600',
      violet: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      <SEO
        title="Writing Generators - Random Story & Creative Writing Tools | Random Prompts"
        description="Explore our complete collection of 15+ writing generators for stories, characters, dialogue, plots, and more. Free creative writing tools for authors, students, and storytellers."
        keywords="writing generators, story generators, character generator, plot generator, creative writing tools"
        ogTitle="Writing Generators - Complete Creative Writing Toolset"
        ogDescription="15+ free writing generators for paragraphs, dialogue, characters, plots, themes, and worldbuilding. Perfect for writers, students, and creative projects."
      />
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Writing Generators</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Writing Generators</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Complete collection of creative writing tools to spark your imagination. Generate paragraphs, characters, plots, dialogue, and more with our free writing generators.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <ScrollText className="inline mr-2" size={16} />
              15+ Generators
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <Sparkles className="inline mr-2" size={16} />
              Unlimited Use
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <BookOpen className="inline mr-2" size={16} />
              Free Forever
            </div>
          </div>
        </div>
      </div>

      {/* Generators Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            All Writing Generators
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Choose from our collection of specialized writing tools. Each generator is designed to help you overcome writer's block and create compelling content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            Why Use Writing Generators?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Writing generators are powerful creative tools that help writers overcome blocks, explore new ideas, and develop their craft. Whether you're working on a novel, short story, screenplay, or creative writing assignment, our generators provide the spark you need to get started or push through difficult sections.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Perfect for Every Writer
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our writing generators serve novelists crafting epic stories, students completing creative writing assignments, screenwriters developing compelling scenes, and hobbyists exploring their creativity. Each tool is designed to be intuitive and instantly useful, requiring no signup or registration.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            How to Use Writing Generators Effectively
          </h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
            <li>Start your writing session by generating 3-5 prompts to warm up your creativity</li>
            <li>Use character and conflict generators together to create dynamic story scenarios</li>
            <li>Combine setting and theme generators for rich, atmospheric narratives</li>
            <li>Save your favorite outputs for future reference and inspiration</li>
            <li>Challenge yourself to write for 15 minutes using a generated prompt without editing</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            From Idea to Finished Story
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Many successful writers use prompt generators as part of their daily practice. Start with a story starter or theme, develop your characters using the character generator, create tension with the conflict generator, and add depth with emotion and relationship prompts. Our tools work together to help you build complete, compelling narratives from the ground up.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WritingGeneratorsPage;
