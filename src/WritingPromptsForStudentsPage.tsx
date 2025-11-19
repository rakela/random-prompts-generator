import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Github, Twitter, Heart, History, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

// Writing Prompts for Students Data
const studentPrompts = {
  creative: [
    {
      title: "The Door That Wasn't There Yesterday",
      description: "You wake up and find a new door in your room. What happens when you open it?",
      emoji: "🚪"
    },
    {
      title: "A Message from the Future",
      description: "You receive a text from your future self warning you about something. What does it say?",
      emoji: "📱"
    },
    {
      title: "The Day the Internet Disappeared",
      description: "Describe how life changes when the world suddenly loses access to the internet.",
      emoji: "🌐"
    },
    {
      title: "The Secret Library",
      description: "You discover a hidden library where books write themselves as you read them.",
      emoji: "📚"
    },
    {
      title: "The Last Tree on Earth",
      description: "Write from the perspective of the last tree surviving in a futuristic world.",
      emoji: "🌳"
    }
  ],
  reflective: [
    {
      title: "A Lesson I Learned the Hard Way",
      description: "Describe a mistake that taught you something important.",
      emoji: "💡"
    },
    {
      title: "My Favorite Place in the World",
      description: "Write about a place that makes you feel calm, happy, or inspired.",
      emoji: "🏞️"
    },
    {
      title: "If I Could Talk to My Younger Self",
      description: "What advice would you give to yourself five years ago?",
      emoji: "⏳"
    },
    {
      title: "The Power of Kindness",
      description: "Write about a moment when someone's kindness changed your day (or your life).",
      emoji: "💝"
    },
    {
      title: "What Makes a Hero?",
      description: "Who do you consider a hero in your life and why?",
      emoji: "🦸"
    }
  ]
};

const WritingPromptsForStudentsPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('writing-prompts-for-students-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage('writing-prompts-for-students-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage('writing-prompts-for-students-favorites', []);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper Functions
  const generatePrompt = useCallback(() => {
    const allPrompts = selectedCategory === 'all'
      ? [...studentPrompts.creative, ...studentPrompts.reflective]
      : selectedCategory === 'creative'
      ? studentPrompts.creative
      : studentPrompts.reflective;

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
          title: 'Writing Prompt for Students',
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
    link.download = 'writing-prompts-for-students.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO pageKey="writingPromptsForStudents" />

      {/* Header */}
      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Writing Prompts for Students
          </h1>

          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Discover engaging writing prompts designed specifically for students. From creative storytelling to personal reflection, these prompts help develop writing skills and inspire creative thinking.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          <Link
            to="/writing-prompts"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"
          >
            <PenTool size={18} />
            Writing
          </Link>
          <Link
            to="/ai-images-prompt"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"
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
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"
          >
            <BookOpen size={18} />
            Blog post
          </Link>
          <Link
            to="/short-story-prompts-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"
          >
            <Crown size={18} />
            Short stories
          </Link>
          <Link
            to="/random-name-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"
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
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Prompts
              </button>
              <button
                onClick={() => setSelectedCategory('creative')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'creative'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ✏️ Creative Writing
              </button>
              <button
                onClick={() => setSelectedCategory('reflective')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'reflective'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💭 Reflective / Personal
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={generatePrompt}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Generate Writing Prompt
            </button>
          </div>

          {/* Generated Prompt Card */}
          {generatedPrompt && (
            <div className="bg-white dark:bg-gray-800 border border-blue-200 rounded-lg p-6 shadow-lg mb-8 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{generatedPrompt.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{generatedPrompt.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{generatedPrompt.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => copyToClipboard(generatedPrompt.fullText)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-colors"
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
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"
                >
                  <RefreshCw size={14} />
                  Regenerate
                </button>
              </div>
            </div>
          )}

          {/* History Panel */}
          {showHistory && (
            <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Prompts</h3>
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
                    <div key={prompt.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{prompt.emoji}</span>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{prompt.title}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{prompt.description}</p>
                          <span className="text-xs text-gray-400 mt-1 inline-block">
                            {new Date(prompt.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyToClipboard(prompt.fullText)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition-colors"
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">All Writing Prompts for Students</h2>

            {/* Creative Writing Prompts */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                ✏️ Creative Writing Prompts
              </h3>
              <div className="grid gap-4">
                {studentPrompts.creative.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{index + 1}. {prompt.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300">{prompt.description}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${prompt.title} — ${prompt.description}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition-colors"
                        title="Copy prompt"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reflective / Personal Prompts */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                💭 Reflective / Personal Prompts
              </h3>
              <div className="grid gap-4">
                {studentPrompts.reflective.map((prompt, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{index + 6}. {prompt.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300">{prompt.description}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${prompt.title} — ${prompt.description}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition-colors"
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Prompts</h3>
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
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{prompt.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{prompt.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300">{prompt.description}</p>
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Writing Prompts for Students</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Writing prompts for students are powerful tools that spark creativity, develop critical thinking skills, and build confidence in written expression. These carefully crafted prompts combine imaginative storytelling with personal reflection, helping students explore both creative fiction and meaningful self-examination.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Perfect for <Link to="/writing-prompts" className="text-blue-600 hover:underline">creative writing assignments</Link>, classroom activities, homework exercises, or journal writing, these prompts encourage students to think deeply, express themselves clearly, and develop their unique voice as writers. From fantastical scenarios that ignite imagination to thoughtful reflections that build emotional intelligence, these prompts support comprehensive writing development.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-8">More Seasonal Writing Resources</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For additional fall-themed ideas check out <a href="https://www.writersdigest.com/write-better-fiction/50-fall-writing-prompts" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">50 Fall Writing Prompts – WritersDigest</a> and <a href="https://blog.reedsy.com/halloween-writing-prompts/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Halloween Writing Prompts – Reedsy</a>.
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">More Writing Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/writing-prompts" className="text-blue-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Writing Prompts
              </Link>
              <Link to="/short-story-prompts-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Short Story Prompt Generator
              </Link>
              <Link to="/october-writing-prompts" className="text-blue-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                October Writing Prompts
              </Link>
              <Link to="/ai-blog-post-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                Blog Post Generator
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-gray-800 py-16 mt-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What are writing prompts for students?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Writing prompts for students are carefully designed story starters and thought-provoking questions that help students practice writing skills, develop creativity, and explore personal reflection. They provide a starting point that makes it easier to begin writing and overcome writer's block.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How do writing prompts help students?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Writing prompts help students develop essential skills including creative thinking, self-expression, grammar and composition, critical reasoning, and emotional intelligence. They provide structure while encouraging imagination, making writing practice more engaging and effective.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can teachers use these prompts in the classroom?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Absolutely! These writing prompts are perfect for classroom use, homework assignments, writing workshops, creative writing clubs, or independent study. They work well for various grade levels and can be adapted to different skill levels and learning objectives.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What's the difference between creative and reflective prompts?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Creative writing prompts focus on imagination and storytelling, encouraging students to create fictional narratives and explore "what if" scenarios. Reflective prompts encourage personal exploration, helping students examine their experiences, values, and perspectives through introspective writing.
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

export default WritingPromptsForStudentsPage;
