import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Github, Twitter, Heart, History, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';
import Header from './components/Header';
import Footer from './components/Footer';

// October Writing Prompts Data
const octoberPrompts = {
  autumnFall: [
    {
      title: "The Café in October",
      description: "Write about a hidden café that only appears when the autumn leaves start to fall.",
      emoji: "🍁"
    },
    {
      title: "Whispers in the Woods",
      description: "A quiet forest that hums with voices when the wind passes through the golden trees.",
      emoji: "🍂"
    },
    {
      title: "Pumpkin Market at Sunset",
      description: "Capture the warmth of a local harvest fair filled with glowing lanterns and cinnamon air.",
      emoji: "🎃"
    },
    {
      title: "Letters from Autumn Past",
      description: "Someone starts receiving handwritten letters from their younger self every fall.",
      emoji: "✉️"
    },
    {
      title: "The Last Bonfire",
      description: "A group of old friends meets for their final bonfire before life takes them in different directions.",
      emoji: "🔥"
    }
  ],
  halloween: [
    {
      title: "Masks After Midnight",
      description: "At a Halloween party, everyone's masks begin to take on a life of their own.",
      emoji: "🎭"
    },
    {
      title: "The Haunted Costume Shop",
      description: "A shop that appears once a year and gives out costumes with strange powers.",
      emoji: "👻"
    },
    {
      title: "Pumpkin Hollow Manor",
      description: "A family inherits a mansion where carved pumpkins guard the secrets of the dead.",
      emoji: "🏚️"
    },
    {
      title: "The Photographer of Ghosts",
      description: "A street photographer in October starts seeing spirits appear in their Polaroids.",
      emoji: "📷"
    },
    {
      title: "31 Nights of Whispers",
      description: "Every night in October, someone hears a voice counting down to Halloween — but to what?",
      emoji: "🌙"
    }
  ]
};

const OctoberWritingPromptsPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper Functions
  const generatePrompt = useCallback(() => {
    const allPrompts = selectedCategory === 'all'
      ? [...octoberPrompts.autumnFall, ...octoberPrompts.halloween]
      : selectedCategory === 'autumn'
      ? octoberPrompts.autumnFall
      : octoberPrompts.halloween;

    const randomPrompt = allPrompts[Math.floor(Math.random() * allPrompts.length)];
    const promptWithId = {
      ...randomPrompt,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      fullText: `${randomPrompt.title} — ${randomPrompt.description}`
    };

    setGeneratedPrompt(promptWithId);
    setPromptHistory(prev => [promptWithId, ...prev.slice(0, 19)]);
  }, [selectedCategory]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const savePrompt = (prompt) => {
    setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
  };

  const toggleFavorite = (prompt) => {
    const isFavorite = favorites.some(fav => fav.id === prompt.id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== prompt.id));
    } else {
      setFavorites(prev => [...prev, { ...prompt, favorited: true }]);
    }
  };

  const sharePrompt = async (prompt) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'October Writing Prompt',
          text: prompt.fullText,
          url: window.location.href
        });
      } catch (err) {
        copyToClipboard(`${prompt.fullText}\n\nGenerated at: ${window.location.href}`);
      }
    } else {
      copyToClipboard(`${prompt.fullText}\n\nGenerated at: ${window.location.href}`);
    }
  };

  const exportPrompts = () => {
    const dataStr = JSON.stringify(savedPrompts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'october-writing-prompts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO pageKey="octoberWritingPrompts" />

      {/* Header */}
      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

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
          {/* Category Selection */}
          <div className="mb-6">
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Prompts
              </button>
              <button
                onClick={() => setSelectedCategory('autumn')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'autumn'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🍁 Autumn & Fall
              </button>
              <button
                onClick={() => setSelectedCategory('halloween')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'halloween'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🎃 Halloween
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={generatePrompt}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Generate October Prompt
            </button>
          </div>

          {/* Generated Prompt Card */}
          {generatedPrompt && (
            <div className="bg-white border border-orange-200 rounded-lg p-6 shadow-lg mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{generatedPrompt.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{generatedPrompt.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{generatedPrompt.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => copyToClipboard(generatedPrompt.fullText)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
                >
                  <Copy size={14} />
                  Copy
                </button>
                <button
                  onClick={() => savePrompt(generatedPrompt)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"
                >
                  <Save size={14} />
                  Save
                </button>
                <button
                  onClick={() => toggleFavorite(generatedPrompt)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                    favorites.some(fav => fav.id === generatedPrompt.id)
                      ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Star size={14} fill={favorites.some(fav => fav.id === generatedPrompt.id) ? 'currentColor' : 'none'} />
                  Favorite
                </button>
                <button
                  onClick={() => sharePrompt(generatedPrompt)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors"
                >
                  <Share2 size={14} />
                  Share
                </button>
                <button
                  onClick={generatePrompt}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-md text-sm transition-colors"
                >
                  <RefreshCw size={14} />
                  Regenerate
                </button>
              </div>
            </div>
          )}

          {/* History Panel */}
          {showHistory && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Prompts</h3>
                <button
                  onClick={() => setPromptHistory([])}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Clear History
                </button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent prompts. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{prompt.emoji}</span>
                            <span className="font-semibold text-gray-900">{prompt.title}</span>
                          </div>
                          <p className="text-sm text-gray-700">{prompt.description}</p>
                          <span className="text-xs text-gray-400 mt-1 inline-block">
                            {new Date(prompt.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyToClipboard(prompt.fullText)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            onClick={() => toggleFavorite(prompt)}
                            className={`p-1 transition-colors ${
                              favorites.some(fav => fav.id === prompt.id)
                                ? 'text-yellow-600 hover:text-yellow-700'
                                : 'text-gray-400 hover:text-yellow-600'
                            }`}
                            title="Favorite"
                          >
                            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Prompts Display */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">All October Writing Prompts</h2>

            {/* Autumn & Fall Prompts */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                🍁 Autumn & Fall Prompts
              </h3>
              <div className="grid gap-4">
                {octoberPrompts.autumnFall.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{index + 1}. {prompt.title}</h4>
                        <p className="text-gray-700">{prompt.description}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${prompt.title} — ${prompt.description}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy prompt"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Halloween Prompts */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                🎃 Halloween Prompts
              </h3>
              <div className="grid gap-4">
                {octoberPrompts.halloween.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{index + 6}. {prompt.title}</h4>
                        <p className="text-gray-700">{prompt.description}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${prompt.title} — ${prompt.description}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Copy prompt"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Saved Prompts Section */}
          {savedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Saved Prompts</h3>
                <button
                  onClick={exportPrompts}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{prompt.title}</h4>
                        <p className="text-gray-700">{prompt.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
      <Footer />
    </div>
  );
};

export default OctoberWritingPromptsPage;
