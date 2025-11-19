import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

// Persuasive Writing Titles Data
const persuasiveWritingTitles = {
  global: [
    "Should governments impose a carbon tax to fight climate change?",
    "Is space exploration worth the environmental cost?",
    "Should countries ban bottled water to reduce plastic waste?",
    "Is nuclear energy a safe alternative to fossil fuels?",
    "Should wealthy nations be required to help poorer countries fight climate change?"
  ],
  health: [
    "Should mental health days be mandatory in schools and workplaces?",
    "Is social media addiction as harmful as substance abuse?",
    "Should fast food companies be held responsible for obesity?",
    "Should junk food advertising to children be banned?",
    "Should therapy be free and accessible for everyone?"
  ],
  technology: [
    "Should AI be allowed to create art, music, and literature?",
    "Are privacy rights more important than national security in the digital age?",
    "Should robots be granted legal rights if they become sentient?",
    "Should schools teach prompt engineering as a core skill?",
    "Should deepfake technology be banned completely?"
  ],
  culture: [
    "Should celebrities and influencers be role models for society?",
    "Should cancel culture be seen as accountability or censorship?",
    "Is traditional media still trustworthy in the digital era?",
    "Should cultural appropriation be punished by law?",
    "Should patriotism be taught in schools, or does it create division?"
  ]
};

const PersuasiveWritingTitlesPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('persuasive-writing-titles-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage('persuasive-writing-titles-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage('persuasive-writing-titles-favorites', []);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper Functions
  const generatePrompt = useCallback(() => {
    const allPrompts = selectedCategory === 'all'
      ? [...persuasiveWritingTitles.global, ...persuasiveWritingTitles.health, ...persuasiveWritingTitles.technology, ...persuasiveWritingTitles.culture]
      : selectedCategory === 'global'
      ? persuasiveWritingTitles.global
      : selectedCategory === 'health'
      ? persuasiveWritingTitles.health
      : selectedCategory === 'technology'
      ? persuasiveWritingTitles.technology
      : persuasiveWritingTitles.culture;

    const randomPrompt = allPrompts[Math.floor(Math.random() * allPrompts.length)];
    const promptWithId = {
      title: randomPrompt,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      fullText: randomPrompt
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
          title: 'Persuasive Writing Title',
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
    link.download = 'persuasive-writing-titles.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryEmoji = (category) => {
    switch(category) {
      case 'global': return '🌎';
      case 'health': return '🧠';
      case 'technology': return '⚙️';
      case 'culture': return '💬';
      default: return '📝';
    }
  };

  const getCategoryForTitle = (title) => {
    if (persuasiveWritingTitles.global.includes(title)) return 'global';
    if (persuasiveWritingTitles.health.includes(title)) return 'health';
    if (persuasiveWritingTitles.technology.includes(title)) return 'technology';
    if (persuasiveWritingTitles.culture.includes(title)) return 'culture';
    return 'global';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO pageKey="persuasiveWritingTitles" />

      {/* Header */}
      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Persuasive Writing Titles
          </h1>

          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Explore thought-provoking persuasive writing titles on global issues, health, technology, and culture. Perfect for argumentative essays, classroom debates, research papers, and developing compelling persuasive arguments.
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
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Titles
              </button>
              <button
                onClick={() => setSelectedCategory('global')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'global'
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🌎 Global & Environmental
              </button>
              <button
                onClick={() => setSelectedCategory('health')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'health'
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🧠 Health & Psychology
              </button>
              <button
                onClick={() => setSelectedCategory('technology')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'technology'
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⚙️ Technology & AI
              </button>
              <button
                onClick={() => setSelectedCategory('culture')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'culture'
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💬 Culture & Society
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={generatePrompt}
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Generate Persuasive Writing Title
            </button>
          </div>

          {/* Generated Prompt Card */}
          {generatedPrompt && (
            <div className="bg-white border border-rose-200 rounded-lg p-6 shadow-lg mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{getCategoryEmoji(getCategoryForTitle(generatedPrompt.title))}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{generatedPrompt.title}</h3>
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
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-md text-sm transition-colors"
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
                <h3 className="text-lg font-semibold text-gray-900">Recent Titles</h3>
                <button
                  onClick={() => setPromptHistory([])}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Clear History
                </button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent titles. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{getCategoryEmoji(getCategoryForTitle(prompt.title))}</span>
                            <span className="font-semibold text-gray-900">{prompt.title}</span>
                          </div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">All Persuasive Writing Titles</h2>

            {/* Global & Environmental Issues */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                🌎 Global & Environmental Issues
              </h3>
              <div className="grid gap-3">
                {persuasiveWritingTitles.global.map((title, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">🌎</span>
                        <h4 className="font-semibold text-gray-900">{index + 1}. {title}</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(title)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                        title="Copy title"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health & Psychology */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                🧠 Health & Psychology
              </h3>
              <div className="grid gap-3">
                {persuasiveWritingTitles.health.map((title, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">🧠</span>
                        <h4 className="font-semibold text-gray-900">{index + 6}. {title}</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(title)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                        title="Copy title"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology & AI */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                ⚙️ Technology & AI
              </h3>
              <div className="grid gap-3">
                {persuasiveWritingTitles.technology.map((title, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">⚙️</span>
                        <h4 className="font-semibold text-gray-900">{index + 11}. {title}</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(title)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                        title="Copy title"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Culture & Society */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                💬 Culture & Society
              </h3>
              <div className="grid gap-3">
                {persuasiveWritingTitles.culture.map((title, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">💬</span>
                        <h4 className="font-semibold text-gray-900">{index + 16}. {title}</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(title)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                        title="Copy title"
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
                <h3 className="text-2xl font-bold text-gray-900">Saved Titles</h3>
                <button
                  onClick={exportPrompts}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Export All
                </button>
              </div>
              <div className="grid gap-3">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCategoryEmoji(getCategoryForTitle(prompt.title))}</span>
                      <h4 className="font-semibold text-gray-900">{prompt.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO Content Section */}
          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Persuasive Writing Titles for Essays and Debates</h2>
              <p className="text-gray-700 mb-4">
                Persuasive writing titles serve as powerful starting points for argumentative essays, research papers, classroom debates, and persuasive speeches. These carefully curated titles cover contemporary issues across global affairs, health, technology, and culture—topics that resonate with today's audiences and offer rich opportunities for critical thinking and persuasive argumentation.
              </p>
              <p className="text-gray-700 mb-4">
                Each persuasive writing title is framed as a thought-provoking question that invites exploration of multiple perspectives. From climate change and AI ethics to social media impact and cultural debates, these titles address real-world issues that students encounter in their daily lives, making the writing process more engaging and relevant.
              </p>
              <p className="text-gray-700 mb-4">
                Perfect for high school and college students developing persuasive writing skills, these titles encourage research, critical analysis, and the development of well-supported arguments. Whether you're writing a persuasive essay, preparing for a debate competition, or exploring argumentative writing, these titles provide compelling foundations for meaningful discourse.
              </p>
              <p className="text-gray-700 mb-4">
                Prefer shorter prompts? Try our <Link to="/writing-prompts" className="text-blue-600 hover:underline">Writing Prompts Generator</Link> or switch to seasonal visuals by visiting our <Link to="/ai-images-prompt" className="text-blue-600 hover:underline">AI Art Prompts page</Link>.
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">More Writing Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/persuasive-essays-topics" className="text-rose-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Persuasive Essays Topics
              </Link>
              <Link to="/persuasive-writing-topics" className="text-rose-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Persuasive Writing Topics
              </Link>
              <Link to="/writing-prompts-for-students" className="text-rose-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Writing Prompts for Students
              </Link>
              <Link to="/writing-prompts" className="text-rose-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Writing Prompts
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What makes a good persuasive writing title?</h3>
                <p className="text-gray-700">
                  A good persuasive writing title presents a debatable question on a relevant topic with clear opposing viewpoints. It should be specific enough to guide research and argument development while broad enough to allow for comprehensive exploration of the issue.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I turn these titles into full essays?</h3>
                <p className="text-gray-700">
                  Start by choosing a title that interests you, research both sides of the issue, develop a clear thesis statement taking a position, gather evidence supporting your argument, acknowledge counterarguments, and structure your essay with a strong introduction, body paragraphs, and conclusion.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I modify these persuasive writing titles?</h3>
                <p className="text-gray-700">
                  Absolutely! These persuasive writing titles serve as starting points. You can narrow the focus, adjust the wording, add specific contexts, or combine elements from multiple titles to create the perfect topic for your assignment or interest area.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Are these titles suitable for debates?</h3>
                <p className="text-gray-700">
                  Yes! These persuasive writing titles work excellently as debate topics. Each title presents a clear question with multiple valid perspectives, making them ideal for structured debates, classroom discussions, speech competitions, and argumentative presentations.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What's the difference between persuasive titles and argumentative titles?</h3>
                <p className="text-gray-700">
                  While often used interchangeably, persuasive titles may appeal more to emotion and values, while argumentative titles focus on logic and evidence. Our titles work for both approaches—they present debatable questions that can be argued through logical reasoning or persuasive appeals depending on your assignment requirements.
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

export default PersuasiveWritingTitlesPage;
