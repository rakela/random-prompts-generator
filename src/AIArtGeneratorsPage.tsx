import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import Header from './components/Header';
import Footer from './components/Footer';
import { Palette, Camera, User, Home, Sparkles, Sun, Image, Wand2, Users, Mountain } from 'lucide-react';

const AIArtGeneratorsPage = () => {
  const generators = [
    {
      name: 'Aesthetic Prompt Generator',
      path: '/random-aesthetic-prompt-generator',
      icon: Palette,
      description: 'Generate aesthetic and style prompts',
      color: 'pink'
    },
    {
      name: 'Art Style Generator',
      path: '/random-art-style-generator',
      icon: Palette,
      description: 'Discover unique art styles and techniques',
      color: 'purple'
    },
    {
      name: 'Photography Prompt Generator',
      path: '/random-photography-prompt-generator',
      icon: Camera,
      description: 'Create photography composition ideas',
      color: 'blue'
    },
    {
      name: 'Character Design Prompt',
      path: '/random-character-design-prompt-generator',
      icon: Users,
      description: 'Generate character design concepts',
      color: 'indigo'
    },
    {
      name: 'Environment Design Generator',
      path: '/random-environment-design-generator',
      icon: Mountain,
      description: 'Create environment and landscape prompts',
      color: 'green'
    },
    {
      name: 'Sci-Fi Prompt Generator',
      path: '/random-sci-fi-prompt-generator',
      icon: Sparkles,
      description: 'Generate futuristic sci-fi art prompts',
      color: 'cyan'
    },
    {
      name: 'Fantasy Art Prompt Generator',
      path: '/random-fantasy-art-prompt-generator',
      icon: Wand2,
      description: 'Create magical fantasy art concepts',
      color: 'violet'
    },
    {
      name: 'Anime Prompt Generator',
      path: '/random-anime-prompt-generator',
      icon: User,
      description: 'Generate anime character and scene prompts',
      color: 'rose'
    },
    {
      name: 'Portrait Prompt Generator',
      path: '/random-portrait-prompt-generator',
      icon: User,
      description: 'Create portrait photography concepts',
      color: 'amber'
    },
    {
      name: 'Lighting Style Generator',
      path: '/random-lighting-style-generator',
      icon: Sun,
      description: 'Explore lighting techniques and moods',
      color: 'yellow'
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      pink: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600',
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600',
      green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600',
      cyan: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600',
      violet: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 hover:border-violet-400 dark:hover:border-violet-600',
      rose: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 hover:border-rose-400 dark:hover:border-rose-600',
      amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600',
      yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 dark:hover:border-yellow-600',
    };
    return colors[color] || colors.pink;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      <SEO
        title="AI Art Generators - Visual Prompt Tools for Artists | Random Prompts"
        description="Explore 10+ AI art prompt generators for Midjourney, Stable Diffusion, DALL-E, and more. Create stunning visual prompts for characters, environments, and artistic styles."
        keywords="AI art generators, midjourney prompts, stable diffusion prompts, character design, art style generator"
        ogTitle="AI Art Generators - Visual Prompt Creation Tools"
        ogDescription="10+ free AI art prompt generators for creating stunning visual prompts. Perfect for Midjourney, Stable Diffusion, DALL-E, and digital artists."
      />
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>AI Art Generators</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Art Generators</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Professional-grade prompt generators for AI art tools. Create stunning visuals with prompts for Midjourney, Stable Diffusion, DALL-E, and more.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <Image className="inline mr-2" size={16} />
              10+ Generators
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <Sparkles className="inline mr-2" size={16} />
              AI-Ready Prompts
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <Palette className="inline mr-2" size={16} />
              All Art Styles
            </div>
          </div>
        </div>
      </div>

      {/* Generators Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            All AI Art Generators
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Professional prompt generators designed for AI art creation. Each tool creates detailed, optimized prompts for maximum quality results.
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
            Master AI Art Creation with Professional Prompts
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Creating compelling AI art requires well-crafted prompts. Our AI art generators provide professionally structured prompts optimized for popular AI image generation tools including Midjourney, Stable Diffusion, DALL-E 3, Leonardo AI, and more. Each generator focuses on specific aspects of visual creation to help you achieve exactly the results you envision.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            For Digital Artists and Creators
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Whether you're a professional digital artist, concept designer, illustrator, or hobbyist exploring AI art, our generators help you create detailed prompts that capture your artistic vision. From character designs to environmental concepts, each tool provides the vocabulary and structure needed for high-quality AI-generated images.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Optimized for Popular AI Tools
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our prompts work seamlessly with Midjourney's latest models, Stable Diffusion XL, DALL-E 3, and other leading AI art platforms. Each prompt includes relevant style descriptors, lighting suggestions, composition guidance, and technical parameters that AI systems understand and respond to effectively.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            Tips for Better AI Art Results
          </h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
            <li>Combine prompts from multiple generators for unique, complex compositions</li>
            <li>Use lighting style prompts to dramatically change the mood of your images</li>
            <li>Experiment with different art style generators to discover new visual approaches</li>
            <li>Save successful prompt combinations for consistent character or environment designs</li>
            <li>Iterate on generated prompts by adding specific details or modifying parameters</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            From Concept to Creation
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Start with a character design or environment prompt, refine with specific aesthetic choices, enhance with lighting styles, and specify technical parameters. Our generators help you build comprehensive prompts that communicate your vision clearly to AI systems, resulting in images that match your creative intent.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AIArtGeneratorsPage;
