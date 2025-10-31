import React, { useState, useCallback, useMemo } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, History, Share2, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Midjourney Prompts Data organized by category
const midjourneyPrompts = {
  'nature-landscapes': [
    { id: 1, prompt: "A glowing autumn forest at sunrise, mist over golden trees, ultra-realistic lighting, 8K, cinematic mood", category: "Nature & Landscapes" },
    { id: 2, prompt: "Ancient cherry blossom tree on a mountain peak, petals flowing in the wind, Japanese art style, soft lighting", category: "Nature & Landscapes" },
    { id: 3, prompt: "Storm over an ocean cliff, dramatic sky, painterly brush strokes, Rembrandt lighting", category: "Nature & Landscapes" },
    { id: 4, prompt: "Frozen waterfall in a crystal cave, glowing ice reflections, hyper-detailed fantasy scene", category: "Nature & Landscapes" },
    { id: 5, prompt: "Desert at twilight with bioluminescent plants, surreal colors, dreamlike atmosphere", category: "Nature & Landscapes" }
  ],
  'architecture-cityscapes': [
    { id: 6, prompt: "Futuristic floating city above the clouds, neon glow, cyberpunk palette, ultra-realistic render", category: "Architecture & Cityscapes" },
    { id: 7, prompt: "Abandoned Victorian mansion overtaken by vines, golden-hour lighting, gothic atmosphere", category: "Architecture & Cityscapes" },
    { id: 8, prompt: "Mediterranean seaside village at dusk, warm lights and cobblestone streets, cinematic composition", category: "Architecture & Cityscapes" },
    { id: 9, prompt: "Modern glass house in the forest, minimal design, morning fog, photo-realistic", category: "Architecture & Cityscapes" },
    { id: 10, prompt: "Ancient city carved into a canyon, torch-lit paths, cinematic wide-angle view", category: "Architecture & Cityscapes" }
  ],
  'fantasy-characters': [
    { id: 11, prompt: "Female sorceress with silver hair casting light magic, floating particles, fantasy armor, highly detailed", category: "Fantasy & Characters" },
    { id: 12, prompt: "Cyberpunk samurai standing in neon rain, katana reflection, dramatic lighting, 8K resolution", category: "Fantasy & Characters" },
    { id: 13, prompt: "Vampire queen in a moonlit ballroom, gothic fashion, ethereal lighting, baroque style", category: "Fantasy & Characters" },
    { id: 14, prompt: "Ghostly knight emerging from fog, spectral armor, cinematic realism, dark fantasy atmosphere", category: "Fantasy & Characters" },
    { id: 15, prompt: "AI goddess made of crystal and circuits, glowing eyes, futuristic sacred energy", category: "Fantasy & Characters" }
  ],
  'art-concept-styles': [
    { id: 16, prompt: "Dreamy surreal portrait of a woman with galaxies in her hair, double exposure effect, fine-art photography style", category: "Art & Concept Styles" },
    { id: 17, prompt: "Minimalist ink illustration of a fox under a full moon, Japanese sumi-e style, high contrast", category: "Art & Concept Styles" },
    { id: 18, prompt: "Ancient ruins floating in space, cosmic dust, mystical lighting, cinematic depth of field", category: "Art & Concept Styles" },
    { id: 19, prompt: "Renaissance-style oil painting of astronauts exploring a temple, classical lighting and textures", category: "Art & Concept Styles" },
    { id: 20, prompt: "Cyberpunk café on a rainy night, reflections on wet pavement, warm neon lights, cinematic framing", category: "Art & Concept Styles" }
  ],
  'christmas-classic': [
    { id: 21, prompt: "Santa Claus flying over a snowy village at night, glowing windows, reindeer in the sky, cinematic lighting, ultra-detailed, 8K", category: "Classic Christmas Scenes" },
    { id: 22, prompt: "Warm cozy living room with fireplace, Christmas tree, and children opening presents, golden glow, soft shadows, photo-realistic", category: "Classic Christmas Scenes" },
    { id: 23, prompt: "Victorian Christmas street market at dusk, gas lamps, horse carriages, snow falling, painterly style, nostalgic mood", category: "Classic Christmas Scenes" },
    { id: 24, prompt: "Rustic cabin in snowy woods, candlelight through windows, smoke from chimney, tranquil night, ultra-realistic lighting", category: "Classic Christmas Scenes" },
    { id: 25, prompt: "Modern family Christmas dinner, laughter, festive table decorations, natural light, cinematic realism", category: "Classic Christmas Scenes" }
  ],
  'christmas-magical': [
    { id: 26, prompt: "Elf village hidden in a snow-covered forest, twinkling lights, glowing mushrooms, magical realism, fantasy illustration", category: "Magical & Fantasy Holiday Themes" },
    { id: 27, prompt: "Ice queen in a crystal palace, snow swirling around her, ethereal atmosphere, fantasy portrait, soft lighting", category: "Magical & Fantasy Holiday Themes" },
    { id: 28, prompt: "Reindeer with glowing antlers running through the aurora borealis, majestic and surreal composition", category: "Magical & Fantasy Holiday Themes" },
    { id: 29, prompt: "Gingerbread house in a candy forest, colorful lights, whimsical, storybook illustration, detailed textures", category: "Magical & Fantasy Holiday Themes" },
    { id: 30, prompt: "Snow globe world with a tiny cozy town inside, magical sparkles, bokeh background, macro lens effect", category: "Magical & Fantasy Holiday Themes" }
  ],
  'christmas-minimal': [
    { id: 31, prompt: "Minimalist Scandinavian Christmas interior, wooden decor, warm light, clean lines, modern photography style", category: "Winter Aesthetic & Minimal Christmas" },
    { id: 32, prompt: "Christmas ornaments in flat lay style, neutral tones, elegant product photography composition", category: "Winter Aesthetic & Minimal Christmas" },
    { id: 33, prompt: "Frosted pine branches with fairy lights, soft focus macro, cozy winter mood board aesthetic", category: "Winter Aesthetic & Minimal Christmas" },
    { id: 34, prompt: "Winter morning in the city, snowflakes falling slowly, coffee cup steam, street photography vibe", category: "Winter Aesthetic & Minimal Christmas" },
    { id: 35, prompt: "Luxury holiday branding flat lay, gold and white tones, ribbons, candles, elegant lighting", category: "Winter Aesthetic & Minimal Christmas" }
  ],
  'christmas-spiritual': [
    { id: 36, prompt: "Midnight Christmas Mass in a cathedral, candlelit interior, stained glass reflections, dramatic composition", category: "Spiritual & Cinematic Atmosphere" },
    { id: 37, prompt: "Nativity scene reimagined in a modern minimalist style, soft natural light, artistic realism", category: "Spiritual & Cinematic Atmosphere" },
    { id: 38, prompt: "Lonely streetlight in snowfall, single red scarf on a bench, poetic, cinematic solitude scene", category: "Spiritual & Cinematic Atmosphere" },
    { id: 39, prompt: "Christmas angel descending through the snow, ethereal light rays, peaceful mood, fantasy art style", category: "Spiritual & Cinematic Atmosphere" },
    { id: 40, prompt: "Winter night over a frozen lake reflecting the northern lights, serene and magical atmosphere, 8K landscape", category: "Spiritual & Cinematic Atmosphere" }
  ]
};

const categoryInfo = {
  'all': { label: 'All Prompts', icon: '🎨', color: 'blue', emoji: '🎨' },
  'nature-landscapes': { label: 'Nature & Landscapes', icon: '🌅', color: 'green', emoji: '🌅' },
  'architecture-cityscapes': { label: 'Architecture & Cityscapes', icon: '🏙️', color: 'slate', emoji: '🏙️' },
  'fantasy-characters': { label: 'Fantasy & Characters', icon: '🎭', color: 'purple', emoji: '🎭' },
  'art-concept-styles': { label: 'Art & Concept Styles', icon: '🖼️', color: 'rose', emoji: '🖼️' },
  'christmas-classic': { label: 'Classic Christmas Scenes', icon: '🎅', color: 'red', emoji: '🎅' },
  'christmas-magical': { label: 'Magical & Fantasy Holiday', icon: '🎁', color: 'emerald', emoji: '🎁' },
  'christmas-minimal': { label: 'Winter Aesthetic & Minimal', icon: '🌟', color: 'cyan', emoji: '🌟' },
  'christmas-spiritual': { label: 'Spiritual & Cinematic', icon: '🕯️', color: 'amber', emoji: '🕯️' }
};

const MidjourneyAIPromptsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const promptsPerPage = 12;

  // Get all prompts for the selected category
  const filteredPrompts = useMemo(() => {
    let prompts = [];
    if (selectedCategory === 'all') {
      Object.values(midjourneyPrompts).forEach(categoryPrompts => {
        prompts = [...prompts, ...categoryPrompts];
      });
    } else {
      prompts = midjourneyPrompts[selectedCategory] || [];
    }

    if (searchTerm) {
      prompts = prompts.filter(p =>
        p.prompt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return prompts;
  }, [selectedCategory, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPrompts.length / promptsPerPage);
  const paginatedPrompts = useMemo(() => {
    const startIndex = (currentPage - 1) * promptsPerPage;
    return filteredPrompts.slice(startIndex, startIndex + promptsPerPage);
  }, [filteredPrompts, currentPage, promptsPerPage]);

  // Reset to page 1 when category or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Helper Functions
  const generatePrompt = useCallback(() => {
    if (filteredPrompts.length === 0) return;

    const randomPrompt = filteredPrompts[Math.floor(Math.random() * filteredPrompts.length)];
    const promptWithId = {
      ...randomPrompt,
      timestamp: new Date().toISOString(),
    };

    setGeneratedPrompt(promptWithId);
    setPromptHistory(prev => [promptWithId, ...prev.slice(0, 19)]);
  }, [filteredPrompts]);

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
          title: 'Midjourney AI Prompt',
          text: prompt.prompt,
          url: window.location.href
        });
      } catch (err) {
        copyToClipboard(`${prompt.prompt}\n\nGenerated at: ${window.location.href}`);
      }
    } else {
      copyToClipboard(`${prompt.prompt}\n\nGenerated at: ${window.location.href}`);
    }
  };

  const exportPrompts = () => {
    const dataStr = JSON.stringify(savedPrompts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'midjourney-prompts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <SEO pageKey="midjourneyPrompts" />

      {/* Header */}
      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Midjourney AI Picture Generator
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Explore 40+ professional Midjourney AI prompts for creating stunning images across 8 unique categories. From breathtaking landscapes to fantasy characters, magical Christmas scenes to cyberpunk cityscapes - find the perfect prompt for your next AI art masterpiece.
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
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(categoryInfo).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                    selectedCategory === key
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {info.emoji} {info.label}
                </button>
              ))}
            </div>
          </div>

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
                    <div key={`${prompt.id}-${prompt.timestamp}`} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{prompt.prompt}</p>
                          <span className="text-xs text-gray-400 mt-1 inline-block">
                            {new Date(prompt.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyToClipboard(prompt.prompt)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            onClick={() => toggleFavorite(prompt)}
                            className={`p-1 transition-colors ${
                              favorites.some(fav => fav.id === prompt.id)
                                ? 'text-purple-600 hover:text-purple-700'
                                : 'text-gray-400 hover:text-purple-600'
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {selectedCategory === 'all' ? 'All Midjourney AI Prompts' : `${categoryInfo[selectedCategory].label} Prompts`}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {paginatedPrompts.map((prompt) => (
                <div key={prompt.id} className="bg-white border border-purple-200 rounded-lg p-4 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col">
                  <div className="w-full h-32 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-4xl">{categoryInfo[selectedCategory]?.emoji || '🎨'}</span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed flex-1 mb-3 line-clamp-4">{prompt.prompt}</p>
                  <button
                    onClick={() => copyToClipboard(prompt.prompt)}
                    className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm transition-colors flex items-center justify-center gap-2"
                    title="Copy prompt"
                  >
                    <Copy size={14} />
                    Copy Prompt
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Next
                </button>
              </div>
            )}

            {/* Generate Button */}
            <div className="text-center mt-12 mb-8">
              <button
                onClick={generatePrompt}
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Generate Random Midjourney Prompt
              </button>
            </div>

            {/* Generated Prompt Card */}
            {generatedPrompt && (
              <div className="bg-white border-2 border-purple-300 rounded-lg p-6 shadow-xl mb-8">
                <div className="mb-4">
                  <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 rounded-lg h-48 flex items-center justify-center mb-4 overflow-hidden">
                    <div className="text-6xl">🎨</div>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed">{generatedPrompt.prompt}</p>
                  <p className="text-sm text-gray-500 mt-2">{generatedPrompt.category}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => copyToClipboard(generatedPrompt.prompt)}
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
                        ? 'bg-purple-100 hover:bg-purple-200 text-purple-700'
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
                  <div key={`${prompt.id}-saved-${index}`} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-800">{prompt.prompt}</p>
                    <p className="text-sm text-gray-500 mt-1">{prompt.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Links */}
          <div className="mt-12 bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">More Prompt Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/ai-images-prompt" className="text-purple-600 hover:underline flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
                  <path d="m14 7 3 3"></path>
                  <path d="M5 6v4"></path>
                  <path d="M19 14v4"></path>
                  <path d="M10 2v2"></path>
                  <path d="M7 8H3"></path>
                  <path d="M21 16h-4"></path>
                  <path d="M11 3H9"></path>
                </svg>
                AI Images Prompt Generator
              </Link>
              <Link to="/writing-prompts" className="text-purple-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Writing Prompts
              </Link>
              <Link to="/nano-banana-prompts" className="text-purple-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Nano Banana Prompts
              </Link>
              <Link to="/ghostface-ai-trend-prompt-generator" className="text-purple-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Ghostface AI Trend Prompts
              </Link>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <section className="bg-white py-16 mt-16 rounded-lg">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Professional Midjourney AI Prompts for Stunning Visual Art</h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p>
                Welcome to the ultimate collection of Midjourney AI prompts designed to help you create breathtaking visual art across multiple genres and styles. Whether you're an experienced AI artist or just starting your creative journey, these carefully crafted prompts will inspire your next masterpiece.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Explore 8 Diverse Categories</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">🌅 Nature & Landscapes</h4>
                  <p className="text-gray-700">
                    Create stunning natural scenes from glowing autumn forests to frozen crystal caves. Perfect for landscape photography and environmental art enthusiasts.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-lg border border-slate-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">🏙️ Architecture & Cityscapes</h4>
                  <p className="text-gray-700">
                    Generate futuristic cities, Victorian mansions, and Mediterranean villages with cinematic composition and dramatic lighting.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">🎭 Fantasy & Characters</h4>
                  <p className="text-gray-700">
                    Bring fantasy characters to life - from cyberpunk samurai to vampire queens, with highly detailed armor and magical effects.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-lg border border-rose-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">🖼️ Art & Concept Styles</h4>
                  <p className="text-gray-700">
                    Explore artistic styles from surreal portraits to minimalist ink illustrations, Renaissance oil paintings to cyberpunk scenes.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-lg border border-red-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">🎅 Classic Christmas Scenes</h4>
                  <p className="text-gray-700">
                    Create warm, nostalgic Christmas imagery - from Santa flying over snowy villages to cozy family moments by the fireplace.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">🎁 Magical & Fantasy Holiday</h4>
                  <p className="text-gray-700">
                    Design enchanted winter scenes with elf villages, ice queens, glowing reindeer, and whimsical gingerbread houses.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">🌟 Winter Aesthetic & Minimal</h4>
                  <p className="text-gray-700">
                    Generate minimalist Scandinavian interiors, elegant flat lays, and modern winter photography with clean lines.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-lg border border-amber-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">🕯️ Spiritual & Cinematic</h4>
                  <p className="text-gray-700">
                    Craft atmospheric scenes with dramatic lighting - from candlelit cathedrals to ethereal winter landscapes.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Use These Midjourney Prompts</h3>
              <p>
                Each prompt has been carefully crafted with specific details about lighting, composition, style, and mood. Simply copy any prompt and paste it into Midjourney, Stable Diffusion, DALL-E, or your preferred AI image generation tool. The prompts include technical parameters like "8K resolution," "ultra-realistic lighting," and "cinematic composition" to help you achieve professional-quality results.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips for Best Results</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Start with our curated prompts and adjust parameters to match your vision</li>
                <li>Combine multiple style keywords for unique results (e.g., "cyberpunk + baroque")</li>
                <li>Experiment with different lighting conditions to change the mood</li>
                <li>Use specific technical terms like "8K," "ultra-detailed," or "photo-realistic" for higher quality</li>
                <li>Save your favorite prompts for easy access and future reference</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16 mt-8 rounded-lg">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Midjourney and how do I use these prompts?</h3>
                <p className="text-gray-700">
                  Midjourney is a powerful AI image generation tool. To use these prompts, simply copy any prompt from our collection and paste it into Midjourney's Discord bot using the /imagine command. You can also use these prompts with other AI art tools like Stable Diffusion, DALL-E, or Leonardo AI.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How can I get the best results with Midjourney prompts?</h3>
                <p className="text-gray-700">
                  For optimal results, use detailed descriptions that include style keywords (e.g., "cinematic," "ultra-realistic"), lighting conditions (e.g., "golden hour," "dramatic lighting"), and technical specifications (e.g., "8K," "high resolution"). Our prompts are already optimized with these elements, but feel free to customize them to match your creative vision.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Are these prompts suitable for beginners?</h3>
                <p className="text-gray-700">
                  Absolutely! These prompts are designed to work well for both beginners and experienced AI artists. Simply copy and paste them as-is for great results, or use them as a foundation to learn prompt engineering by tweaking different elements.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use the generated images commercially?</h3>
                <p className="text-gray-700">
                  The prompts themselves are free to use. However, the commercial usage rights of the generated images depend on the terms of service of the AI tool you're using (Midjourney, Stable Diffusion, etc.). Please check their respective licensing agreements for details on commercial use.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How often are new prompts added?</h3>
                <p className="text-gray-700">
                  We regularly update our collection with new prompts across various categories. Bookmark this page and check back frequently to discover fresh inspiration for your AI art projects.
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What makes a good Midjourney prompt?</h3>
                <p className="text-gray-700">
                  A great Midjourney prompt includes: a clear subject, specific style references, lighting details, mood descriptors, technical quality parameters (like 8K or ultra-detailed), and composition notes (like cinematic or wide-angle). All our prompts incorporate these elements to help you create stunning AI art.
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

export default MidjourneyAIPromptsPage;
