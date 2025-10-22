import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, RefreshCw, Save, Download, Sparkles, Wand2, PenTool, BookOpen, Crown, Github, Twitter, Heart, History, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  promptData,
  weightedRandom,
  processTemplate,
  enhanceWritingPrompt,
  enhanceAIArtPrompt,
  enhanceBlogPrompt,
  enhanceFantasyPrompt
} from './promptUtils';

const WritingPromptsPage = () => {
  const [activeTab, setActiveTab] = useState('writing');
  const [generatedPrompts, setGeneratedPrompts] = useState<any>({});
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);
  const [promptHistory, setPromptHistory] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    writing: { genre: 'any', tone: 'any', length: 'medium' },
    aiArt: { style: 'any', mood: 'any', quality: 'high' },
    blog: { topic: 'any', format: 'any', angle: 'any' },
    fantasy: { race: 'any', magic: 'any', setting: 'any' },
    names: { type: 'full', origin: 'any', count: 'single' }
  });

  const tabs = [
    { id: 'writing', label: 'Writing', icon: PenTool },
    { id: 'aiArt', label: 'AI Art', icon: Wand2 },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'fantasy', label: 'Fantasy', icon: Crown },
    { id: 'names', label: 'Names', icon: Sparkles }
  ];

  const generatePrompt = useCallback((category = activeTab, count = 1) => {
    const data = promptData[category];
    if (!data) return;

    const categoryControls = controls[category];

    // Special handling for names with multiple generation
    if (category === 'names') {
      const batchSize = categoryControls.count === 'multiple' ? 5 :
                       categoryControls.count === 'batch' ? 10 : 1;

      const names = [];
      for (let i = 0; i < batchSize; i++) {
        const name = processTemplate('', data, category, categoryControls);
        names.push(name);
      }

      const prompt = {
        id: Date.now(),
        text: batchSize === 1 ? names[0] : names.join('\n'),
        category,
        timestamp: new Date().toISOString(),
        isMultiple: batchSize > 1
      };

      setGeneratedPrompts(prev => ({
        ...prev,
        [category]: prompt
      }));
      return;
    }

    const prompts = [];
    for (let i = 0; i < count; i++) {
      const template = weightedRandom(data.templates);
      let prompt = processTemplate(template, data, category, categoryControls);

      // Apply category-specific enhancements
      switch (category) {
        case 'writing':
          prompt = enhanceWritingPrompt(prompt);
          break;
        case 'aiArt':
          prompt = enhanceAIArtPrompt(prompt);
          break;
        case 'blog':
          prompt = enhanceBlogPrompt(prompt);
          break;
        case 'fantasy':
          prompt = enhanceFantasyPrompt(prompt);
          break;
      }

      prompts.push({
        id: Date.now() + i,
        text: prompt,
        category,
        timestamp: new Date().toISOString()
      });
    }

    const newPrompt = count === 1 ? prompts[0] : prompts;

    setGeneratedPrompts(prev => ({
      ...prev,
      [category]: newPrompt
    }));

    // Add to history
    if (count === 1) {
      setPromptHistory(prev => [prompts[0], ...prev.slice(0, 19)]); // Keep last 20
    }
  }, [activeTab, controls]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const savePrompt = (prompt: any) => {
    setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
  };

  const toggleFavorite = (prompt: any) => {
    const isFavorite = favorites.some(fav => fav.id === prompt.id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== prompt.id));
    } else {
      setFavorites(prev => [...prev, { ...prompt, favorited: true }]);
    }
  };

  const sharePrompt = async (prompt: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Creative Prompt',
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
    link.download = 'saved-prompts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderControls = (category: string) => {
    const categoryControls = controls[category];
    const updateControl = (key: string, value: string) => {
      setControls(prev => ({
        ...prev,
        [category]: { ...prev[category], [key]: value }
      }));
    };

    const data = promptData[category];

    switch (category) {
      case 'writing':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.genre}
              onChange={(e) => updateControl('genre', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Story Type</option>
              <option value="character-driven">Character-Driven</option>
              <option value="plot-driven">Plot-Driven</option>
              <option value="experimental">Experimental</option>
              <option value="traditional">Traditional</option>
            </select>
            <select
              value={categoryControls.tone}
              onChange={(e) => updateControl('tone', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Complexity</option>
              <option value="simple">Simple Conflict</option>
              <option value="complex">Complex Conflict</option>
              <option value="moral">Moral Dilemma</option>
              <option value="psychological">Psychological</option>
            </select>
            <select
              value={categoryControls.length}
              onChange={(e) => updateControl('length', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Length</option>
              <option value="flash">Flash Fiction</option>
              <option value="short">Short Story</option>
              <option value="novella">Novella</option>
              <option value="novel">Novel</option>
            </select>
          </div>
        );

      case 'aiArt':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.style}
              onChange={(e) => updateControl('style', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="any">Any Medium</option>
              <option value="digital">Digital Art</option>
              <option value="traditional">Traditional Art</option>
              <option value="photography">Photography</option>
              <option value="3d">3D Render</option>
            </select>
            <select
              value={categoryControls.mood}
              onChange={(e) => updateControl('mood', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="any">Any Subject</option>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
              <option value="fantasy">Fantasy</option>
              <option value="scifi">Sci-Fi</option>
              <option value="abstract">Abstract</option>
            </select>
            <select
              value={categoryControls.quality}
              onChange={(e) => updateControl('quality', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="standard">Standard Quality</option>
              <option value="high">High Quality</option>
              <option value="professional">Professional</option>
              <option value="masterpiece">Masterpiece</option>
            </select>
          </div>
        );

      case 'blog':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.topic}
              onChange={(e) => updateControl('topic', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="any">Any Niche</option>
              {data.niches.slice(0, 8).map((niche: string, index: number) => (
                <option key={index} value={niche}>{niche}</option>
              ))}
            </select>
            <select
              value={categoryControls.format}
              onChange={(e) => updateControl('format', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="any">Any Format</option>
              {data.formats.slice(0, 8).map((format: string, index: number) => (
                <option key={index} value={format}>{format}</option>
              ))}
            </select>
            <select
              value={categoryControls.angle}
              onChange={(e) => updateControl('angle', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="any">Any Angle</option>
              {data.angles.slice(0, 8).map((angle: string, index: number) => (
                <option key={index} value={angle}>{angle}</option>
              ))}
            </select>
          </div>
        );

      case 'fantasy':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.race}
              onChange={(e) => updateControl('race', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="any">Any Magic System</option>
              {data.magicSystems.slice(0, 8).map((magic: string, index: number) => (
                <option key={index} value={magic}>{magic}</option>
              ))}
            </select>
            <select
              value={categoryControls.magic}
              onChange={(e) => updateControl('magic', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="any">Any Culture</option>
              {data.cultures.slice(0, 8).map((culture: string, index: number) => (
                <option key={index} value={culture}>{culture}</option>
              ))}
            </select>
            <select
              value={categoryControls.setting}
              onChange={(e) => updateControl('setting', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="any">Any Location</option>
              {data.locations.slice(0, 8).map((location: string, index: number) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
        );

      case 'names':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.type}
              onChange={(e) => updateControl('type', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="full">Full Name</option>
              <option value="first">First Name Only</option>
              <option value="title">With Title</option>
              <option value="house">With House</option>
            </select>
            <select
              value={categoryControls.origin}
              onChange={(e) => updateControl('origin', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="any">Any Culture</option>
              <option value="elvish">Elvish</option>
              <option value="dwarven">Dwarven</option>
              <option value="human">Human</option>
              <option value="exotic">Exotic</option>
            </select>
            <select
              value={categoryControls.count}
              onChange={(e) => updateControl('count', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="single">Single Name</option>
              <option value="multiple">Generate 5 Names</option>
              <option value="batch">Batch of 10</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPromptCard = (prompt: any) => {
    if (!prompt) return null;

    const isMultipleNames = prompt.category === 'names' && prompt.isMultiple;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {isMultipleNames ? (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Generated Names:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {prompt.text.split('\n').map((name: string, index: number) => (
                <div key={index} className="bg-gray-50 px-3 py-2 rounded border text-gray-800">
                  {name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt.text}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyToClipboard(prompt.text)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
          >
            <Copy size={14} />
            Copy {isMultipleNames ? 'All' : ''}
          </button>
          <button
            onClick={() => savePrompt(prompt)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"
          >
            <Save size={14} />
            Save
          </button>
          <button
            onClick={() => toggleFavorite(prompt)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              favorites.some(fav => fav.id === prompt.id)
                ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} />
            Favorite
          </button>
          <button
            onClick={() => sharePrompt(prompt)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors"
          >
            <Share2 size={14} />
            Share
          </button>
          <button
            onClick={() => generatePrompt(prompt.category)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"
          >
            <RefreshCw size={14} />
            Regenerate
          </button>
        </div>
      </div>
    );
  };

  const getTabColor = (tabId: string) => {
    const colors: Record<string, string> = {
      writing: 'blue',
      aiArt: 'purple',
      blog: 'green',
      fantasy: 'amber',
      names: 'pink'
    };
    return colors[tabId] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Helmet>
        <title>Random Writing Prompt Generator - Free Writing Prompts</title>
        <meta name="description" content="Generate unlimited writing prompts instantly with our free writing prompt generator. Create unique story ideas with compelling conflicts, emotional stakes, and creative plot twists to overcome writer's block." />
        <meta name="keywords" content="writing prompts, random writing prompts, writing prompt generator, story prompts, creative writing prompts, random story prompt generator" />
        <link rel="canonical" href="https://randomprompts.org/writing-prompts" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Random Writing Prompt Generator - Free Writing Prompts" />
        <meta property="og:description" content="Generate unlimited writing prompts instantly with our free writing prompt generator. Create unique story ideas with compelling conflicts, emotional stakes, and creative plot twists to overcome writer's block." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://randomprompts.org/writing-prompts" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Random Writing Prompt Generator - Free Writing Prompts" />
        <meta name="twitter:description" content="Generate unlimited writing prompts instantly with our free writing prompt generator. Create unique story ideas with compelling conflicts, emotional stakes, and creative plot twists to overcome writer's block." />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="text-blue-600" size={24} />
              <span className="text-xl font-bold text-gray-900">Random Prompts</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Random Writing Prompt Generator
          </h1>

          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unlimited writing prompts instantly. Our free writing prompt generator creates unique story ideas with compelling conflicts, emotional stakes, and creative plot twists to spark your creativity and overcome writer's block.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const color = getTabColor(tab.id);
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                  isActive
                    ? `text-${color}-600 border-b-2 border-${color}-600 bg-${color}-50`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Generator Section */}
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          {renderControls(activeTab)}

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => generatePrompt()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Generate Prompt
            </button>
          </div>

          {/* Result */}
          {generatedPrompts[activeTab] && renderPromptCard(generatedPrompts[activeTab])}

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
                          <p className="text-sm text-gray-800 leading-relaxed">{prompt.text}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full bg-${getTabColor(prompt.category)}-100 text-${getTabColor(prompt.category)}-700`}>
                              {prompt.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(prompt.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyToClipboard(prompt.text)}
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
                    <div className="flex items-start justify-between">
                      <p className="text-gray-800 flex-1">{prompt.text}</p>
                      <span className={`px-2 py-1 text-xs rounded-full bg-${getTabColor(prompt.category)}-100 text-${getTabColor(prompt.category)}-700 ml-4`}>
                        {prompt.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO Content Section */}
          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Writing Prompts - Professional Story Ideas</h2>
              <p className="text-gray-700 mb-4">
                Our random writing prompt generator creates professional writing prompts designed to spark creativity and overcome writer's block. This free writing prompt generator delivers unlimited story ideas featuring unique conflicts, emotional stakes, and compelling plot twists. Each randomly generated prompt combines proven story elements with sophisticated narratives perfect for creative writers, novelists, and storytellers.
              </p>
              <p className="text-gray-700 mb-4">
                Generate random writing prompts with detailed character archetypes (memory thieves, dream architects, retired superheroes), specific story conflicts, and creative plot twists that go beyond generic writing prompts. This random story prompt generator tool is ideal for daily writing practice, NaNoWriMo preparation, creative writing exercises, and exploring new narrative ideas.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Quality Features:</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Emotional stakes and internal conflicts</li>
                  <li>• Specific, evocative settings beyond generic locations</li>
                  <li>• Complex character archetypes with built-in motivations</li>
                  <li>• Plot twists that recontextualize the entire story</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What are writing prompts?</h3>
                <p className="text-gray-700">
                  Writing prompts are short ideas or situations designed to inspire new stories, essays, or creative pieces. They help overcome writer's block and spark creativity.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I use writing prompts effectively?</h3>
                <p className="text-gray-700">
                  Choose a prompt that catches your interest, set a timer (10–15 minutes), and start writing without overthinking. Let the prompt lead your imagination.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use these writing prompts for commercial projects?</h3>
                <p className="text-gray-700">
                  Yes. All writing prompts on RandomPrompts.org are free to use for personal or commercial purposes — no attribution required.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Are the writing prompts generated by AI?</h3>
                <p className="text-gray-700">
                  Yes. Our Random Prompts Generator uses AI-assisted templates to produce unique, high-quality writing ideas across genres and tones.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What types of writing prompts can I generate?</h3>
                <p className="text-gray-700">
                  You can create prompts for fiction, poetry, blogging, journaling, or screenwriting — including genres like fantasy, romance, mystery, and sci-fi.
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
                Free writing prompt generator for writers, storytellers, and creative minds.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20free%20writing%20prompt%20generator!&url=https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">All Prompts</Link></li>
                <li><Link to="/writing-prompts" className="text-gray-400 hover:text-white transition-colors">Writing Prompts</Link></li>
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

export default WritingPromptsPage;
