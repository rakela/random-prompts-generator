import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Github, Twitter, Heart, History, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';

// Blog post generation data
const promptData = {
  blog: {
    niches: [
      'remote work productivity for developers',
      'sustainable fashion on a budget',
      'cryptocurrency for beginners over 50',
      'plant-based meal prep for busy families',
      'digital minimalism for social media addicts',
      'freelance writing for introverts',
      'smart home automation for renters',
      'meditation techniques for anxiety relief',
      'side hustles for teachers',
      'budget travel for digital nomads'
    ],

    formats: [
      'step-by-step tutorial with screenshots',
      'ultimate beginner\'s guide',
      'myth-busting listicle',
      'before and after case study',
      'tool comparison and review',
      'interview with industry expert',
      'personal transformation story',
      'data-driven research analysis',
      'controversial opinion piece',
      'seasonal trend prediction'
    ],

    hooks: [
      'I tried [topic] for 30 days and here\'s what happened',
      'The [number] mistakes everyone makes with [topic]',
      'Why [common belief] is completely wrong',
      'How I [achieved result] in [timeframe] using [method]',
      'The [industry] secret that [companies] don\'t want you to know',
      '[Number] signs you\'re doing [topic] wrong',
      'What [expert] taught me about [topic] that changed everything',
      'The uncomfortable truth about [topic] that no one talks about',
      'How to [achieve goal] even if [common obstacle]',
      'Why [year] is the perfect time to start [topic]'
    ],

    angles: [
      'beginner-friendly with no prior experience needed',
      'backed by scientific research and studies',
      'contrarian viewpoint challenging conventional wisdom',
      'personal experience with honest failures included',
      'expert roundup with multiple professional opinions',
      'data-driven analysis with charts and statistics',
      'actionable tips you can implement today',
      'comprehensive comparison of all available options',
      'controversial stance on widely accepted practices',
      'industry insider perspective with behind-the-scenes details'
    ],

    templates: [
      'Write a {formats} about {niches} with a {angles} approach. Hook: "{hooks}"',
      'Create a {formats} targeting "{niches}" using {angles} perspective. Start with "{hooks}"',
      '{formats} for {niches}: {angles} insights. Opening hook: "{hooks}"',
      'Develop a {angles} {formats} about {niches}. Lead with: "{hooks}"',
      '{hooks} - Turn this into a {formats} about {niches} from a {angles} standpoint'
    ]
  }
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const processTemplate = (template, data) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (data[key] && Array.isArray(data[key])) {
      return weightedRandom(data[key]);
    }
    return match;
  });
};

const enhanceBlogPrompt = (prompt) => {
  const seoTips = [
    ' Target long-tail keywords.',
    ' Include actionable takeaways.',
    ' Add personal anecdotes.',
    ' Use data and statistics.',
    ' Include expert quotes.'
  ];
  
  if (Math.random() < 0.4) {
    prompt += weightedRandom(seoTips);
  }
  
  return prompt;
};

const BlogPostGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const generatePrompt = useCallback(() => {
    const data = promptData.blog;
    const template = weightedRandom(data.templates);
    let prompt = processTemplate(template, data);
    prompt = enhanceBlogPrompt(prompt);

    const newPrompt = {
      id: Date.now(),
      text: prompt,
      category: 'blog',
      timestamp: new Date().toISOString()
    };

    setGeneratedPrompt(newPrompt);
    setPromptHistory(prev => [newPrompt, ...prev.slice(0, 19)]);
  }, []);

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
          title: 'AI Blog Post Generator',
          text: prompt.text,
          url: window.location.href
        });
      } catch (err) {
        copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`);
      }
    } else {
      copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`);
    }
  };

  const exportPrompts = () => {
    const dataStr = JSON.stringify(savedPrompts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'saved-blog-post-ideas.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt.text}</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors">
            <Copy size={14} /> Copy
          </button>
          <button onClick={() => savePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors">
            <Save size={14} /> Save
          </button>
          <button onClick={() => toggleFavorite(prompt)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} /> Favorite
          </button>
          <button onClick={() => sharePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors">
            <Share2 size={14} /> Share
          </button>
          <button onClick={() => generatePrompt()} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors">
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Helmet>
        <title>AI Blog Post Generator - Free Blog Ideas & Content Generator</title>
        <meta name="description" content="Generate SEO-optimized blog post ideas instantly with our free AI blog post generator. Create engaging blog content topics with proven formats, compelling hooks, and data-driven angles for maximum traffic and engagement." />
        <meta name="keywords" content="ai blog post generator, blog post generator, blog idea generator, content generator, seo blog ideas, blog topic generator, free blog generator" />
        <link rel="canonical" href="https://randomprompts.org/ai-blog-post-generator" />
        <meta property="og:title" content="AI Blog Post Generator - Free Blog Ideas Generator" />
        <meta property="og:description" content="Generate SEO-optimized blog post ideas instantly with our free AI blog post generator." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://randomprompts.org/ai-blog-post-generator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Blog Post Generator - Free Blog Ideas Generator" />
        <meta name="twitter:description" content="Generate SEO-optimized blog post ideas instantly with our free AI blog post generator." />
      </Helmet>

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
                  <Link to="/october-writing-prompts" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                    October Writing Prompts
                  </Link>
                  <Link to="/writing-prompts-for-students" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                    Writing Prompts for Students
                  </Link>
                  <Link to="/persuasive-writing-topics" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                    Persuasive Writing Topics
                  </Link>
                  <Link to="/nano-banana-prompts" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                    Nano Banana Prompts
                  </Link>
                </div>
              </div>
              <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                <Github size={16} /> GitHub
              </a>
              <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                <History size={16} /> History ({promptHistory.length})
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Blog Post Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate SEO-optimized blog post ideas instantly with our free AI blog post generator. Create engaging content topics with proven formats, compelling hooks, and data-driven angles designed to drive traffic and reader engagement.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <PenTool size={18} /> Writing
          </Link>
          <Link to="/ai-images-prompt" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
              <path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path>
            </svg>
            AI Images
          </Link>
          <Link to="/ai-blog-post-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-green-600 border-b-2 border-green-600 bg-green-50">
            <BookOpen size={18} /> Blog post
          </Link>
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Crown size={18} /> Short stories
          </Link>
          <Link to="/random-name-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Sparkles size={18} /> Names
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Blog Post Idea
            </button>
          </div>

          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {showHistory && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Ideas</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent ideas. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 leading-relaxed">{prompt.text}</p>
                          <span className="text-xs text-gray-400 mt-2 block">{new Date(prompt.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => copyToClipboard(prompt.text)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Copy">
                            <Copy size={14} />
                          </button>
                          <button onClick={() => toggleFavorite(prompt)} className={`p-1 transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-yellow-600'}`} title="Favorite">
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

          {savedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Saved Ideas</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Download size={16} /> Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-800">{prompt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">SEO-Optimized AI Blog Post Generator</h2>
              <p className="text-gray-700 mb-4">
                Our AI blog post generator creates SEO-optimized blog post ideas with built-in SEO value, compelling hooks, and proven content formats. Generate blog post topics with ready-made angles that drive traffic and engage readers from the first sentence. Each idea includes specific niches, proven formats, data-driven angles, and compelling hooks.
              </p>
              <p className="text-gray-700 mb-4">
                This AI blog post generator delivers blog ideas with specific niches like "remote work productivity for developers" and "sustainable fashion on a budget," proven content formats including tutorials and case studies, plus data-driven angles and compelling hooks that encourage clicks and social shares. Perfect for content creators, bloggers, and digital marketers.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-green-900 mb-2">AI Blog Post Generator Features:</h3>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Long-tail keyword opportunities built into every blog post idea</li>
                  <li>• Proven content formats that rank well in search engines</li>
                  <li>• Emotional hooks that drive engagement and social sharing</li>
                  <li>• Specific, searchable niche topics ready to write</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is an AI blog post generator?</h3>
                <p className="text-gray-700">
                  An AI blog post generator is a tool that creates SEO-optimized blog post ideas, topics, and outlines using AI algorithms. Our AI blog post generator combines proven formats, compelling hooks, and searchable niches to generate blog content ideas that drive traffic and engagement.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I use the AI blog post generator?</h3>
                <p className="text-gray-700">
                  Click "Generate Blog Post Idea" to instantly create a complete blog post concept. Each idea includes the topic, format, angle, and opening hook. Copy your favorite ideas, save them for later, or regenerate to explore different blog post concepts. Use the ideas as starting points for your blog content.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Are blog posts from this AI blog post generator SEO-friendly?</h3>
                <p className="text-gray-700">
                  Yes! Our AI blog post generator creates ideas with built-in SEO value including long-tail keywords, searchable niches, and proven content formats that rank well. Each blog post idea is designed to target specific search queries and audience needs for maximum organic traffic.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use AI blog post generator ideas for commercial blogs?</h3>
                <p className="text-gray-700">
                  Absolutely! All blog post ideas generated by our AI blog post generator are free to use for personal or commercial projects. Use them for your business blog, client projects, content marketing, or any blogging purpose without attribution requirements.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What makes this AI blog post generator different?</h3>
                <p className="text-gray-700">
                  Our AI blog post generator focuses on SEO-optimized, specific blog post ideas with proven formats and compelling hooks. Instead of generic topics, you get complete blog post concepts with niche focus, content angle, format recommendations, and attention-grabbing opening hooks ready to expand into full articles.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles size={20} />
                <span className="text-lg font-bold">Random Prompts</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Free AI blog post generator for content creators and bloggers.</p>
              <div className="flex space-x-4">
                <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20free%20AI%20blog%20post%20generator!&url=https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
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
                <li><Link to="/ai-blog-post-generator" className="text-gray-400 hover:text-white transition-colors">Blog Post Generator</Link></li>
                <li><Link to="/short-story-prompts-generator" className="text-gray-400 hover:text-white transition-colors">Short Story Prompts</Link></li>
                <li><Link to="/random-name-generator" className="text-gray-400 hover:text-white transition-colors">Random Name Generator</Link></li>
                <li><Link to="/writing-prompts-for-students" className="text-gray-400 hover:text-white transition-colors">Writing Prompts for Students</Link></li>
                <li><Link to="/nano-banana-prompts" className="text-gray-400 hover:text-white transition-colors">Nano Banana Prompts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">ChatGPT</a></li>
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

export default BlogPostGeneratorPage;
