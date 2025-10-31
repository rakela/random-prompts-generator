import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Persuasive Essays Topics Data
const persuasiveEssaysTopics = {
  education: [
    {
      title: "Should schools eliminate homework and replace it with hands-on projects?",
      emoji: "🎓",
      thesis: "Schools should replace traditional homework with hands-on projects that encourage creativity, collaboration, and practical learning.",
      arguments: [
        "Projects promote real-world problem solving and teamwork.",
        "They reduce stress and improve mental health compared to repetitive homework.",
        "Students retain knowledge longer when they apply it."
      ],
      counterpoint: "Homework builds discipline and time management.",
      rebuttal: "Projects can be structured with deadlines to teach the same skills more effectively."
    },
    {
      title: "Should college education be free for all students?",
      emoji: "⚖️",
      thesis: "Higher education should be free to ensure equal access to opportunities and reduce inequality.",
      arguments: [
        "Education is a public good that benefits society.",
        "Free tuition reduces student debt and financial anxiety.",
        "Countries with free education (e.g., Germany) have strong economies and innovation."
      ],
      counterpoint: "Free college could strain government budgets.",
      rebuttal: "A small tax adjustment or public-private partnership can fund it sustainably."
    },
    {
      title: "Should schools require financial literacy courses for graduation?",
      emoji: "🏫",
      thesis: "Financial literacy should be a required subject in all schools to prepare students for real-world money management.",
      arguments: [
        "Many young adults face debt due to poor financial knowledge.",
        "Early education fosters responsibility and independence.",
        "Financially literate citizens strengthen the economy."
      ],
      counterpoint: "Core subjects already take up too much time.",
      rebuttal: "Financial literacy can be integrated into math or social studies with minimal disruption."
    }
  ],
  environment: [
    {
      title: "Should governments ban single-use plastics completely?",
      emoji: "🌍",
      thesis: "Governments must ban single-use plastics to protect ecosystems and reduce long-term environmental damage.",
      arguments: [
        "Plastic pollution harms oceans and wildlife globally.",
        "Alternatives like biodegradable materials are now affordable.",
        "Regulation drives innovation in sustainable packaging."
      ],
      counterpoint: "Banning plastic may hurt small businesses.",
      rebuttal: "Governments can subsidize eco-friendly transitions for local producers."
    },
    {
      title: "Should everyone become vegetarian to protect the planet?",
      emoji: "🌿",
      thesis: "Adopting a vegetarian diet is one of the most effective ways to reduce environmental damage.",
      arguments: [
        "Livestock farming contributes heavily to greenhouse gas emissions.",
        "Plant-based diets require fewer resources like water and land.",
        "It improves health and reduces global food shortages."
      ],
      counterpoint: "Meat provides vital nutrients and cultural value.",
      rebuttal: "Balanced vegetarian diets and supplements can meet nutritional needs while respecting culture."
    },
    {
      title: "Should public transportation be free to reduce pollution?",
      emoji: "🌏",
      thesis: "Making public transport free can significantly lower pollution and traffic congestion in cities.",
      arguments: [
        "Encourages people to use eco-friendly travel instead of cars.",
        "Reduces carbon emissions and noise pollution.",
        "Helps low-income communities access jobs and education."
      ],
      counterpoint: "Funding free transport may be too expensive.",
      rebuttal: "Governments can reallocate funds from fuel taxes and congestion charges."
    }
  ],
  technology: [
    {
      title: "Should AI-generated content be labeled to protect creative industries?",
      emoji: "💻",
      thesis: "AI-generated content should be clearly labeled to maintain transparency and protect human creators.",
      arguments: [
        "Labels help consumers distinguish human creativity from machine output.",
        "Prevents misinformation from AI-generated fake content.",
        "Protects copyright and fair recognition for human work."
      ],
      counterpoint: "Labels might discourage AI innovation.",
      rebuttal: "Transparency promotes trust and responsible AI use — not limitation."
    },
    {
      title: "Does social media do more harm than good for young people?",
      emoji: "🧠",
      thesis: "Social media causes more harm than good for young users due to its impact on mental health and self-esteem.",
      arguments: [
        "Increases anxiety and depression among teens.",
        "Promotes unrealistic standards through curated content.",
        "Reduces focus and sleep quality."
      ],
      counterpoint: "Social media connects people globally.",
      rebuttal: "Connection loses value when it harms emotional well-being — boundaries are essential."
    }
  ],
  ethics: [
    {
      title: "Is it ethical to use animals for medical or cosmetic testing?",
      emoji: "🧬",
      thesis: "Using animals for testing is unethical when alternative methods exist that provide accurate results.",
      arguments: [
        "Animal testing causes unnecessary suffering.",
        "Modern technology (cell cultures, AI simulations) can replace animal trials.",
        "Ethical science must evolve alongside innovation."
      ],
      counterpoint: "Animal testing has led to major medical breakthroughs.",
      rebuttal: "Alternatives now achieve similar results without cruelty."
    },
    {
      title: "Should voting be mandatory in democratic countries?",
      emoji: "🗳️",
      thesis: "Mandatory voting strengthens democracy by increasing representation and civic responsibility.",
      arguments: [
        "Higher turnout ensures fairer results.",
        "Encourages political awareness and public debate.",
        "Prevents domination by minority voter groups."
      ],
      counterpoint: "Forced voting limits freedom of choice.",
      rebuttal: "Citizens can still vote blank — participation itself strengthens democracy."
    }
  ]
};

const PersuasiveEssaysTopicsPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper Functions
  const generatePrompt = useCallback(() => {
    const allPrompts = selectedCategory === 'all'
      ? [...persuasiveEssaysTopics.education, ...persuasiveEssaysTopics.environment, ...persuasiveEssaysTopics.technology, ...persuasiveEssaysTopics.ethics]
      : selectedCategory === 'education'
      ? persuasiveEssaysTopics.education
      : selectedCategory === 'environment'
      ? persuasiveEssaysTopics.environment
      : selectedCategory === 'technology'
      ? persuasiveEssaysTopics.technology
      : persuasiveEssaysTopics.ethics;

    const randomPrompt = allPrompts[Math.floor(Math.random() * allPrompts.length)];
    const promptWithId = {
      ...randomPrompt,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      fullText: `${randomPrompt.title}\n\nThesis: ${randomPrompt.thesis}\n\nArguments:\n${randomPrompt.arguments.map((arg, i) => `${i + 1}. ${arg}`).join('\n')}\n\nCounterpoint: ${randomPrompt.counterpoint}\n\nRebuttal: ${randomPrompt.rebuttal}`
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
          title: 'Persuasive Essay Topic',
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
    link.download = 'persuasive-essays-topics.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Helmet>
        <title>Persuasive Essays Topics - Complete Essay Arguments & Thesis Ideas</title>
        <meta name="description" content="Comprehensive persuasive essays topics with ready-made thesis statements, arguments, counterpoints, and rebuttals. Best persuasive essay ideas for students on education, environment, technology, and ethics. Complete argumentative essay framework." />
        <meta name="keywords" content="persuasive essays topics, persuasive essay ideas, argumentative essay topics, thesis statements, essay arguments, persuasive essay examples, debate topics with arguments" />
        <link rel="canonical" href="https://randomprompts.org/persuasive-essays-topics" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Persuasive Essays Topics - Complete Essay Arguments & Thesis Ideas" />
        <meta property="og:description" content="Comprehensive persuasive essays topics with thesis statements, arguments, counterpoints & rebuttals. Best essay ideas for students. Complete argumentative framework." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://randomprompts.org/persuasive-essays-topics" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Persuasive Essays Topics - Complete Essay Arguments & Thesis Ideas" />
        <meta name="twitter:description" content="Get persuasive essays topics with thesis statements, arguments, counterpoints & rebuttals! Complete essay framework for students. Free persuasive essay ideas!" />
      </Helmet>

      {/* Header */}
      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Persuasive Essays Topics
          </h1>

          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Explore comprehensive persuasive essays topics with detailed thesis statements, supporting arguments, counterpoints, and rebuttals. Perfect for students developing strong persuasive essays with complete argumentative structures.
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
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Topics
              </button>
              <button
                onClick={() => setSelectedCategory('education')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'education'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🎓 Education & School
              </button>
              <button
                onClick={() => setSelectedCategory('environment')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'environment'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🌍 Environment & Society
              </button>
              <button
                onClick={() => setSelectedCategory('technology')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'technology'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💻 Technology & Media
              </button>
              <button
                onClick={() => setSelectedCategory('ethics')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'ethics'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⚖️ Ethics & Lifestyle
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={generatePrompt}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Generate Persuasive Essay Topic
            </button>
          </div>

          {/* Generated Prompt Card */}
          {generatedPrompt && (
            <div className="bg-white border border-indigo-200 rounded-lg p-6 shadow-lg mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{generatedPrompt.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{generatedPrompt.title}</h3>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-indigo-700 mb-1">Thesis:</h4>
                      <p className="text-gray-700">{generatedPrompt.thesis}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-indigo-700 mb-1">Arguments:</h4>
                      <ul className="list-decimal list-inside space-y-1 text-gray-700">
                        {generatedPrompt.arguments.map((arg, index) => (
                          <li key={index}>{arg}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-orange-700 mb-1">Counterpoint:</h4>
                      <p className="text-gray-700">{generatedPrompt.counterpoint}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-700 mb-1">Rebuttal:</h4>
                      <p className="text-gray-700">{generatedPrompt.rebuttal}</p>
                    </div>
                  </div>
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
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md text-sm transition-colors"
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
                          <p className="text-sm text-gray-700 mb-1"><strong>Thesis:</strong> {prompt.thesis}</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">All Persuasive Essays Topics</h2>

            {/* Education & School */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                🎓 Education & School
              </h3>
              <div className="grid gap-4">
                {persuasiveEssaysTopics.education.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{index + 1}. {prompt.title}</h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700"><strong className="text-indigo-700">Thesis:</strong> {prompt.thesis}</p>
                          <div>
                            <strong className="text-indigo-700">Arguments:</strong>
                            <ul className="list-disc list-inside ml-2 text-gray-700">
                              {prompt.arguments.map((arg, i) => (
                                <li key={i}>{arg}</li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-gray-700"><strong className="text-orange-700">Counterpoint:</strong> {prompt.counterpoint}</p>
                          <p className="text-gray-700"><strong className="text-green-700">Rebuttal:</strong> {prompt.rebuttal}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${prompt.title}\n\nThesis: ${prompt.thesis}\n\nArguments:\n${prompt.arguments.map((arg, i) => `${i + 1}. ${arg}`).join('\n')}\n\nCounterpoint: ${prompt.counterpoint}\n\nRebuttal: ${prompt.rebuttal}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
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
                {persuasiveEssaysTopics.environment.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{index + 4}. {prompt.title}</h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700"><strong className="text-green-700">Thesis:</strong> {prompt.thesis}</p>
                          <div>
                            <strong className="text-green-700">Arguments:</strong>
                            <ul className="list-disc list-inside ml-2 text-gray-700">
                              {prompt.arguments.map((arg, i) => (
                                <li key={i}>{arg}</li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-gray-700"><strong className="text-orange-700">Counterpoint:</strong> {prompt.counterpoint}</p>
                          <p className="text-gray-700"><strong className="text-green-700">Rebuttal:</strong> {prompt.rebuttal}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${prompt.title}\n\nThesis: ${prompt.thesis}\n\nArguments:\n${prompt.arguments.map((arg, i) => `${i + 1}. ${arg}`).join('\n')}\n\nCounterpoint: ${prompt.counterpoint}\n\nRebuttal: ${prompt.rebuttal}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
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
                {persuasiveEssaysTopics.technology.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{index + 7}. {prompt.title}</h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700"><strong className="text-blue-700">Thesis:</strong> {prompt.thesis}</p>
                          <div>
                            <strong className="text-blue-700">Arguments:</strong>
                            <ul className="list-disc list-inside ml-2 text-gray-700">
                              {prompt.arguments.map((arg, i) => (
                                <li key={i}>{arg}</li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-gray-700"><strong className="text-orange-700">Counterpoint:</strong> {prompt.counterpoint}</p>
                          <p className="text-gray-700"><strong className="text-green-700">Rebuttal:</strong> {prompt.rebuttal}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${prompt.title}\n\nThesis: ${prompt.thesis}\n\nArguments:\n${prompt.arguments.map((arg, i) => `${i + 1}. ${arg}`).join('\n')}\n\nCounterpoint: ${prompt.counterpoint}\n\nRebuttal: ${prompt.rebuttal}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
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
                ⚖️ Ethics & Lifestyle
              </h3>
              <div className="grid gap-4">
                {persuasiveEssaysTopics.ethics.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{index + 9}. {prompt.title}</h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700"><strong className="text-purple-700">Thesis:</strong> {prompt.thesis}</p>
                          <div>
                            <strong className="text-purple-700">Arguments:</strong>
                            <ul className="list-disc list-inside ml-2 text-gray-700">
                              {prompt.arguments.map((arg, i) => (
                                <li key={i}>{arg}</li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-gray-700"><strong className="text-orange-700">Counterpoint:</strong> {prompt.counterpoint}</p>
                          <p className="text-gray-700"><strong className="text-green-700">Rebuttal:</strong> {prompt.rebuttal}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${prompt.title}\n\nThesis: ${prompt.thesis}\n\nArguments:\n${prompt.arguments.map((arg, i) => `${i + 1}. ${arg}`).join('\n')}\n\nCounterpoint: ${prompt.counterpoint}\n\nRebuttal: ${prompt.rebuttal}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
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
                        <p className="text-sm text-gray-700">{prompt.thesis}</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Persuasive Essays Topics with Complete Arguments</h2>
              <p className="text-gray-700 mb-4">
                Persuasive essays topics require more than just a question—they need a clear thesis, supporting arguments, acknowledgment of counterpoints, and effective rebuttals. Our comprehensive persuasive essays topics provide all these elements, helping students develop well-structured, convincing essays that demonstrate critical thinking and strong argumentation skills.
              </p>
              <p className="text-gray-700 mb-4">
                Each persuasive essay topic includes a thesis statement that clearly states a position, three supporting arguments backed by logic and evidence, a counterpoint that acknowledges opposing views, and a rebuttal that addresses those objections. This complete structure teaches students how to build persuasive essays that are balanced, well-reasoned, and academically rigorous.
              </p>
              <p className="text-gray-700 mb-4">
                Perfect for high school and college students, these persuasive essays topics cover contemporary issues in education, environment, technology, and ethics. Whether you're writing a persuasive essay for class, preparing for a debate, or practicing argumentative writing, these topics provide a solid foundation for developing compelling, evidence-based arguments.
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">More Writing Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/persuasive-writing-topics" className="text-indigo-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Persuasive Writing Topics
              </Link>
              <Link to="/writing-prompts-for-students" className="text-indigo-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Writing Prompts for Students
              </Link>
              <Link to="/writing-prompts" className="text-indigo-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Writing Prompts
              </Link>
              <Link to="/short-story-prompts-generator" className="text-indigo-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Short Story Prompt Generator
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What makes these persuasive essays topics different?</h3>
                <p className="text-gray-700">
                  Our persuasive essays topics include complete argumentative structures with thesis statements, supporting arguments, counterpoints, and rebuttals. This comprehensive approach teaches students how to build balanced, well-reasoned persuasive essays rather than one-sided arguments.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I use these persuasive essay topics effectively?</h3>
                <p className="text-gray-700">
                  Start with the thesis statement to understand the position, review the supporting arguments to see how evidence builds the case, study the counterpoint to learn opposing views, and analyze the rebuttal to understand how to address objections. Then develop your own essay using this structure as a guide.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I modify these persuasive essay arguments?</h3>
                <p className="text-gray-700">
                  Absolutely! These persuasive essays topics serve as frameworks. You can adapt the arguments, add your own research and evidence, incorporate additional counterpoints, and develop more detailed rebuttals based on your own critical thinking and analysis.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Are these topics suitable for all grade levels?</h3>
                <p className="text-gray-700">
                  These persuasive essays topics are designed primarily for high school and college students. Middle school students can use simplified versions, while advanced students can expand on the arguments with deeper research, additional evidence, and more sophisticated reasoning.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What's the difference between persuasive essays and argumentative essays?</h3>
                <p className="text-gray-700">
                  Persuasive essays aim to convince readers through emotion, logic, and credibility, while argumentative essays focus primarily on logical reasoning and evidence. Our topics work for both styles since they include logical arguments (for argumentative essays) and engaging real-world issues (for persuasive essays).
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

export default PersuasiveEssaysTopicsPage;
