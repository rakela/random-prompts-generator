import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Github, Twitter, Heart, History, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

// Persuasive Writing Topics Data
const persuasiveTopics = {
  school: [
    {
      title: "Should schools ban homework?",
      description: "Many students argue homework causes stress and limits free time, while teachers believe it reinforces learning. Should homework be replaced with project-based learning or shorter, more meaningful assignments?",
      emoji: "📚"
    },
    {
      title: "Should students be allowed to use phones in class?",
      description: "Phones can help with research, organization, and communication — but they also distract and enable cheating. Should schools integrate phones into learning or ban them entirely?",
      emoji: "📱"
    },
    {
      title: "Should school start times be later in the morning?",
      description: "Research shows teens need more sleep. Would starting school later improve focus and grades, or would it interfere with parents' schedules and after-school activities?",
      emoji: "⏰"
    },
    {
      title: "Is online learning better than traditional classrooms?",
      description: "Online education offers flexibility and access, but some say it reduces interaction and motivation. Which environment leads to better learning outcomes?",
      emoji: "💻"
    },
    {
      title: "Should uniforms be mandatory in all schools?",
      description: "Uniforms promote equality and discipline, but they can suppress individuality. Should students have freedom of expression through clothing, or do uniforms create a better learning environment?",
      emoji: "👔"
    }
  ],
  environment: [
    {
      title: "Should plastic bottles and bags be banned?",
      description: "Plastic pollution is destroying oceans and wildlife. Would banning plastic help the planet, or would it create new challenges for consumers and businesses?",
      emoji: "♻️"
    },
    {
      title: "Is it everyone's duty to recycle?",
      description: "Recycling helps the environment, but not everyone does it properly. Should governments enforce stricter recycling laws, or is education and personal responsibility enough?",
      emoji: "🌍"
    },
    {
      title: "Should animals be used for scientific testing?",
      description: "Animal testing has saved lives through medical research but raises ethical concerns. Is it ever justifiable to harm animals for the benefit of humans?",
      emoji: "🐭"
    },
    {
      title: "Should zoos be banned or reimagined?",
      description: "Zoos protect endangered species but also confine animals. Should we close zoos completely or transform them into sanctuaries focused on conservation and education?",
      emoji: "🦁"
    },
    {
      title: "Is climate change the biggest threat to humanity?",
      description: "Rising temperatures, sea levels, and natural disasters affect millions. Should climate action take priority over issues like poverty or education?",
      emoji: "🌡️"
    }
  ],
  technology: [
    {
      title: "Should children under 13 be allowed on social media?",
      description: "Platforms expose kids to creativity — and to danger. Should social media companies restrict access for minors, or should parents decide?",
      emoji: "📲"
    },
    {
      title: "Does technology make people less social?",
      description: "While tech connects us globally, it can also isolate us behind screens. Are we losing real human connection in exchange for convenience?",
      emoji: "🤖"
    },
    {
      title: "Should AI-generated content be labeled or restricted?",
      description: "AI can create realistic images, essays, and even news. Should there be transparency laws to help users identify what's real vs. AI-made?",
      emoji: "🤖"
    },
    {
      title: "Is screen time more harmful than helpful for students?",
      description: "Screens are part of learning and entertainment, but overuse harms sleep, focus, and mood. Should schools limit screen-based assignments?",
      emoji: "📺"
    },
    {
      title: "Should influencers be responsible for what they promote?",
      description: "From products to lifestyles, influencers shape opinions — especially among teens. Should they face penalties for promoting harmful or false messages?",
      emoji: "⭐"
    }
  ],
  ethics: [
    {
      title: "Should people become vegetarian to save the planet?",
      description: "Meat production causes deforestation and emissions, yet many depend on it for nutrition and culture. Would a plant-based lifestyle truly solve environmental issues?",
      emoji: "🥗"
    },
    {
      title: "Is it fair to judge people by appearance?",
      description: "First impressions are powerful but often misleading. Should society make more effort to see beyond looks, or are judgments based on appearance natural and unavoidable?",
      emoji: "👀"
    },
    {
      title: "Should college education be free for everyone?",
      description: "Free education could open opportunities for all, but it would also raise taxes and strain budgets. Is higher education a right or a privilege?",
      emoji: "🎓"
    },
    {
      title: "Should voting be mandatory?",
      description: "Democracy depends on participation, but forcing people to vote may reduce genuine engagement. Would mandatory voting strengthen democracy or weaken it?",
      emoji: "🗳️"
    },
    {
      title: "Should parents control how much screen time their kids get?",
      description: "Technology shapes childhood today — both positively and negatively. Should parents enforce strict digital rules, or should kids learn self-control naturally?",
      emoji: "⏱️"
    }
  ]
};

const PersuasiveWritingTopicsPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('persuasive-writing-topics-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage('persuasive-writing-topics-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage('persuasive-writing-topics-favorites', []);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper Functions
  const generatePrompt = useCallback(() => {
    const allPrompts = selectedCategory === 'all'
      ? [...persuasiveTopics.school, ...persuasiveTopics.environment, ...persuasiveTopics.technology, ...persuasiveTopics.ethics]
      : selectedCategory === 'school'
      ? persuasiveTopics.school
      : selectedCategory === 'environment'
      ? persuasiveTopics.environment
      : selectedCategory === 'technology'
      ? persuasiveTopics.technology
      : persuasiveTopics.ethics;

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
          title: 'Persuasive Writing Topic',
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
    link.download = 'persuasive-writing-topics.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO pageKey="persuasiveWritingTopics" />

      {/* Header */}
      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Persuasive Writing Topics
          </h1>

          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Explore thought-provoking persuasive writing topics and debate ideas for students. From school policies to technology ethics, these topics help develop critical thinking, argumentation skills, and persuasive writing abilities.
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
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Topics
              </button>
              <button
                onClick={() => setSelectedCategory('school')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'school'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📚 School & Education
              </button>
              <button
                onClick={() => setSelectedCategory('environment')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'environment'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🌍 Environment & Society
              </button>
              <button
                onClick={() => setSelectedCategory('technology')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'technology'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💻 Technology & Media
              </button>
              <button
                onClick={() => setSelectedCategory('ethics')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'ethics'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💡 Ethics & Lifestyle
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={generatePrompt}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Generate Persuasive Writing Topic
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
                <h3 className="text-lg font-semibold text-gray-900">Recent Topics</h3>
                <button
                  onClick={() => setPromptHistory([])}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Clear History
                </button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent topics. Generate some to see them here!</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">All Persuasive Writing Topics</h2>

            {/* School & Education */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                📚 School & Education
              </h3>
              <div className="grid gap-4">
                {persuasiveTopics.school.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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

            {/* Environment & Society */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                🌍 Environment & Society
              </h3>
              <div className="grid gap-4">
                {persuasiveTopics.environment.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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

            {/* Technology & Media */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                💻 Technology & Media
              </h3>
              <div className="grid gap-4">
                {persuasiveTopics.technology.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{index + 11}. {prompt.title}</h4>
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

            {/* Ethics & Lifestyle */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                💡 Ethics & Lifestyle
              </h3>
              <div className="grid gap-4">
                {persuasiveTopics.ethics.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{index + 16}. {prompt.title}</h4>
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
                <h3 className="text-2xl font-bold text-gray-900">Saved Topics</h3>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Persuasive Writing Topics for Students</h2>
              <p className="text-gray-700 mb-4">
                Persuasive writing topics help students develop critical thinking, argumentation skills, and the ability to express and defend their opinions effectively. These carefully curated topics cover relevant, contemporary issues that resonate with students' lives and experiences.
              </p>
              <p className="text-gray-700 mb-4">
                From school policies and environmental concerns to technology ethics and social responsibility, these persuasive writing topics encourage students to research, think critically, consider multiple perspectives, and build compelling arguments. Perfect for persuasive essays, classroom debates, speech competitions, or <Link to="/writing-prompts-for-students" className="text-orange-600 hover:underline">writing assignments</Link>, these topics challenge students to engage with real-world issues and develop their voice as thoughtful, articulate writers.
              </p>
              <p className="text-gray-700 mb-4">
                Each topic presents both sides of an issue, helping students understand that persuasive writing requires acknowledging counterarguments while building a strong case for their position. This approach develops nuanced thinking and sophisticated argumentation skills essential for academic and professional success.
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
              <Link to="/writing-prompts" className="text-orange-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Writing Prompts
              </Link>
              <Link to="/writing-prompts-for-students" className="text-orange-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Writing Prompts for Students
              </Link>
              <Link to="/short-story-prompts-generator" className="text-orange-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Short Story Prompt Generator
              </Link>
              <Link to="/october-writing-prompts" className="text-orange-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                October Writing Prompts
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What makes a good persuasive writing topic?</h3>
                <p className="text-gray-700">
                  A good persuasive writing topic is debatable, relevant to students' lives, and has multiple valid perspectives. It should encourage critical thinking, research, and the development of well-reasoned arguments supported by evidence.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How do persuasive writing topics help students?</h3>
                <p className="text-gray-700">
                  Persuasive writing topics help students develop essential skills including critical thinking, research abilities, logical reasoning, evidence-based argumentation, and clear communication. They also teach students to consider multiple perspectives and construct compelling arguments.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can these topics be used for classroom debates?</h3>
                <p className="text-gray-700">
                  Absolutely! These persuasive writing topics work excellently for classroom debates, speech competitions, essay assignments, research projects, and discussion activities. Each topic presents multiple viewpoints, making them ideal for structured debates and class discussions.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What's the difference between persuasive and argumentative writing?</h3>
                <p className="text-gray-700">
                  While similar, persuasive writing aims to convince readers through emotional appeals, logic, and credibility, while argumentative writing focuses more heavily on logical reasoning and evidence. Both require strong critical thinking and research skills, and these topics work well for either approach.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Are these topics age-appropriate for all students?</h3>
                <p className="text-gray-700">
                  These topics are designed primarily for middle school and high school students. Teachers can adapt the complexity and depth of exploration based on grade level and student abilities. Topics cover contemporary issues that resonate with today's students.
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

export default PersuasiveWritingTopicsPage;
