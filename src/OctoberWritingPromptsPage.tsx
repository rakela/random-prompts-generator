import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Github, Twitter, Heart, History, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';

const OctoberWritingPromptsPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Helmet>
        <title>October Writing Prompts - Fall & Halloween Story Ideas</title>
        <meta name="description" content="Generate creative October writing prompts featuring autumn themes, Halloween stories, and fall-inspired narratives. Perfect for seasonal creative writing, spooky stories, and cozy autumn tales." />
        <meta name="keywords" content="october writing prompts, halloween writing prompts, fall writing prompts, autumn story ideas, seasonal writing prompts, spooky story prompts" />
        <link rel="canonical" href="https://randomprompts.org/october-writing-prompts" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="October Writing Prompts - Fall & Halloween Story Ideas" />
        <meta property="og:description" content="Generate creative October writing prompts featuring autumn themes, Halloween stories, and fall-inspired narratives. Perfect for seasonal creative writing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://randomprompts.org/october-writing-prompts" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="October Writing Prompts - Fall & Halloween Story Ideas" />
        <meta name="twitter:description" content="Generate creative October writing prompts featuring autumn themes, Halloween stories, and fall-inspired narratives." />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Logo size={28} />
              <span className="text-xl font-bold text-gray-900">Random Prompts</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                  Prompts
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/ghostface-ai-trend-prompt-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                    Ghostface AI Trend
                  </Link>
                  <Link to="/october-writing-prompts" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                    October Writing Prompts
                  </Link>
                </div>
              </div>
              <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                <Github size={16} />
                GitHub
              </a>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <History size={16} />
                History ({promptHistory.length})
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            October Writing Prompts
          </h1>

          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Discover creative October writing prompts featuring autumn themes, Halloween stories, and fall-inspired narratives. Perfect for seasonal creative writing, spooky tales, and cozy autumn stories.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link
            to="/writing-prompts"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <PenTool size={18} />
            Writing
          </Link>
          <Link
            to="/ai-images-prompt"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
              <path d="m14 7 3 3"></path>
              <path d="M5 6v4"></path>
              <path d="M19 14v4"></path>
              <path d="M10 2v2"></path>
              <path d="M7 8H3"></path>
              <path d="M21 16h-4"></path>
              <path d="M11 3H9"></path>
            </svg>
            AI Images
          </Link>
          <Link
            to="/ai-blog-post-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <BookOpen size={18} />
            Blog post
          </Link>
          <Link
            to="/short-story-prompts-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Crown size={18} />
            Short stories
          </Link>
          <Link
            to="/random-name-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Sparkles size={18} />
            Names
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Coming Soon Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-center mb-8">
            <div className="text-6xl mb-4">🍂</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Coming Soon</h2>
            <p className="text-gray-700 mb-4">
              October Writing Prompts are currently being curated. Check back soon for autumn-themed story ideas, Halloween prompts, and fall-inspired creative writing challenges.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Link to="/writing-prompts" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                <PenTool size={18} />
                Try Writing Prompts
              </Link>
              <Link to="/short-story-prompts-generator" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                <Crown size={18} />
                Short Story Prompts
              </Link>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">October Writing Prompts for Autumn & Halloween</h2>
              <p className="text-gray-700 mb-4">
                October writing prompts capture the magic of autumn — from crisp fallen leaves and harvest moons to spooky Halloween tales and cozy fireside stories. Whether you're writing horror fiction, seasonal poetry, or heartwarming autumn narratives, October-themed prompts provide endless creative inspiration.
              </p>
              <p className="text-gray-700 mb-4">
                Perfect for <Link to="/writing-prompts" className="text-blue-600 hover:underline">creative writing exercises</Link>, NaNoWriMo preparation, or exploring seasonal storytelling, October writing prompts help writers tap into the atmospheric richness of fall — mysterious fog, changing seasons, and the thin veil between worlds that makes October storytelling so compelling.
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">More Writing Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/writing-prompts" className="text-blue-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Writing Prompts
              </Link>
              <Link to="/short-story-prompts-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Short Story Prompt Generator
              </Link>
              <Link to="/ai-blog-post-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                Blog Post Generator
              </Link>
              <Link to="/random-name-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Random Name Generator
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What are October writing prompts?</h3>
                <p className="text-gray-700">
                  October writing prompts are creative story starters inspired by autumn themes, Halloween elements, fall seasons, and the atmospheric mood of October. They help writers explore seasonal storytelling through horror, mystery, cozy autumn tales, and harvest-themed narratives.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use October prompts for NaNoWriMo?</h3>
                <p className="text-gray-700">
                  Absolutely! October writing prompts are perfect for NaNoWriMo (National Novel Writing Month) preparation and brainstorming. Many writers use seasonal prompts in October to warm up for the November writing challenge.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Are Halloween writing prompts included?</h3>
                <p className="text-gray-700">
                  Yes! October writing prompts include Halloween-themed story ideas featuring spooky scenarios, supernatural elements, horror atmospheres, and classic October traditions like trick-or-treating, haunted houses, and autumn festivals.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What genres work best with October prompts?</h3>
                <p className="text-gray-700">
                  October writing prompts span multiple genres: horror and supernatural fiction, cozy mysteries, literary fiction with autumn settings, romance with fall backdrops, magical realism, and reflective personal essays about change and seasons.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles size={20} />
                <span className="text-lg font-bold">Random Prompts</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Free writing prompt generator for seasonal stories, creative writing, and narrative inspiration.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://twitter.com/intent/tweet?text=Check%20out%20these%20October%20writing%20prompts!&url=https://randomprompts.org/october-writing-prompts" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">All Prompts</Link></li>
                <li><Link to="/writing-prompts" className="text-gray-400 hover:text-white transition-colors">Writing Prompts</Link></li>
                <li><Link to="/ai-images-prompt" className="text-gray-400 hover:text-white transition-colors">AI Images Prompt</Link></li>
                <li><Link to="/ghostface-ai-trend-prompt-generator" className="text-gray-400 hover:text-white transition-colors">Ghostface AI Trend</Link></li>
                <li><Link to="/october-writing-prompts" className="text-gray-400 hover:text-white transition-colors">October Writing Prompts</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">ChatGPT</a></li>
                <li><a href="https://nanowrimo.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">NaNoWriMo</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/rakela/random-prompts-generator/issues" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Report Issues</a></li>
                <li><a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Contribute</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Random Prompts. Made with <Heart size={14} className="inline text-red-500" /> for the creative community.</p>
            <p className="mt-2">Free and open source. No registration required. No data collected.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OctoberWritingPromptsPage;
