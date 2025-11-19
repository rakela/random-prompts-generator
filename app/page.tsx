'use client';

import { useState, useCallback } from 'react';
import { Copy, RefreshCw, Save, Download, Sparkles, Wand2, PenTool, BookOpen, Crown, Zap, History, Share2, Star } from 'lucide-react';
import Link from 'next/link';
import { generatePrompt as generatePromptFn } from '@/lib/generators/promptEngine';
import { promptData, PromptCategory } from '@/lib/generators/promptData';
import useLocalStorage from '@/lib/utils/useLocalStorage';

interface Prompt {
  id: number;
  text: string;
  category: string;
  timestamp: string;
  isMultiple?: boolean;
}

type Controls = {
  [key: string]: Record<string, string>;
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<PromptCategory>('writing');
  const [generatedPrompts, setGeneratedPrompts] = useState<Record<string, Prompt>>({});
  const [savedPrompts, setSavedPrompts] = useLocalStorage<Prompt[]>('homepage-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage<Prompt[]>('homepage-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage<Prompt[]>('homepage-favorites', []);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState<Controls>({
    writing: { genre: 'any', tone: 'any', length: 'medium' },
    aiArt: { style: 'any', mood: 'any', quality: 'high' },
    blog: { topic: 'any', format: 'any', angle: 'any' },
    fantasy: { race: 'any', magic: 'any', setting: 'any' },
    persuasive: { type: 'all' },
    names: { type: 'full', origin: 'any', count: 'single' }
  });

  const tabs = [
    { id: 'writing' as PromptCategory, label: 'Writing', icon: PenTool },
    { id: 'aiArt' as PromptCategory, label: 'AI Art', icon: Wand2 },
    { id: 'blog' as PromptCategory, label: 'Blog', icon: BookOpen },
    { id: 'fantasy' as PromptCategory, label: 'Fantasy', icon: Crown },
    { id: 'persuasive' as PromptCategory, label: 'Persuasive', icon: Zap },
    { id: 'names' as PromptCategory, label: 'Names', icon: Sparkles }
  ];

  const generatePrompt = useCallback((category: PromptCategory = activeTab) => {
    const categoryControls = controls[category];

    // Generate using the extracted promptEngine
    const text = generatePromptFn(category, categoryControls);

    const prompt: Prompt = {
      id: Date.now(),
      text,
      category,
      timestamp: new Date().toISOString(),
      isMultiple: category === 'names' && (categoryControls.count === 'multiple' || categoryControls.count === 'batch')
    };

    setGeneratedPrompts(prev => ({
      ...prev,
      [category]: prompt
    }));

    // Add to history
    setPromptHistory(prev => [prompt, ...prev.slice(0, 19)]); // Keep last 20
  }, [activeTab, controls, setPromptHistory]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const savePrompt = (prompt: Prompt) => {
    setSavedPrompts(prev => [...prev, { ...prompt, saved: true } as Prompt]);
  };

  const toggleFavorite = (prompt: Prompt) => {
    const isFavorite = favorites.some(fav => fav.id === prompt.id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== prompt.id));
    } else {
      setFavorites(prev => [...prev, { ...prompt, favorited: true } as Prompt]);
    }
  };

  const sharePrompt = async (prompt: Prompt) => {
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

  const updateControl = (key: string, value: string) => {
    setControls(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [key]: value
      }
    }));
  };

  const renderControls = (category: PromptCategory) => {
    const categoryControls = controls[category];
    const data = promptData[category];

    switch (category) {
      case 'writing':
        return (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
            <select
              value={categoryControls.length}
              onChange={(e) => updateControl('length', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="any">Any Niche</option>
              {data.niches && data.niches.slice(0, 8).map((niche: string, index: number) => (
                <option key={index} value={niche}>{niche}</option>
              ))}
            </select>
            <select
              value={categoryControls.format}
              onChange={(e) => updateControl('format', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="any">Any Format</option>
              {data.formats && data.formats.slice(0, 8).map((format: string, index: number) => (
                <option key={index} value={format}>{format}</option>
              ))}
            </select>
            <select
              value={categoryControls.angle}
              onChange={(e) => updateControl('angle', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="any">Any Angle</option>
              {data.angles && data.angles.slice(0, 8).map((angle: string, index: number) => (
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="any">Any Magic System</option>
              {data.magicSystems && data.magicSystems.slice(0, 8).map((magic: string, index: number) => (
                <option key={index} value={magic}>{magic}</option>
              ))}
            </select>
            <select
              value={categoryControls.magic}
              onChange={(e) => updateControl('magic', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="any">Any Culture</option>
              {data.cultures && data.cultures.slice(0, 8).map((culture: string, index: number) => (
                <option key={index} value={culture}>{culture}</option>
              ))}
            </select>
            <select
              value={categoryControls.setting}
              onChange={(e) => updateControl('setting', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="any">Any Location</option>
              {data.locations && data.locations.slice(0, 8).map((location: string, index: number) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
        );

      case 'persuasive':
        return (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
            <select
              value={categoryControls.type}
              onChange={(e) => updateControl('type', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Persuasive Topics</option>
              <option value="topics">Essay Topics Only</option>
              <option value="titles">Writing Titles Only</option>
            </select>
          </div>
        );

      case 'names':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.type}
              onChange={(e) => updateControl('type', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="full">Full Name</option>
              <option value="first">First Name Only</option>
              <option value="title">With Title</option>
              <option value="house">With House</option>
            </select>
            <select
              value={categoryControls.origin}
              onChange={(e) => updateControl('origin', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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

  const renderPromptCard = (prompt: Prompt) => {
    if (!prompt) return null;

    const isMultipleNames = prompt.category === 'names' && prompt.isMultiple;

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
        {isMultipleNames ? (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Generated Names:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {prompt.text.split('\n').map((name, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded border dark:border-gray-600 text-gray-800 dark:text-gray-100">
                  {name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed mb-4">{prompt.text}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyToClipboard(prompt.text)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm transition-colors"
          >
            <Copy size={14} />
            Copy {isMultipleNames ? 'All' : ''}
          </button>
          <button
            onClick={() => savePrompt(prompt)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 rounded-md text-sm transition-colors"
          >
            <Save size={14} />
            Save
          </button>
          <button
            onClick={() => toggleFavorite(prompt)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              favorites.some(fav => fav.id === prompt.id)
                ? 'bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
            }`}
          >
            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} />
            Favorite
          </button>
          <button
            onClick={() => sharePrompt(prompt)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 rounded-md text-sm transition-colors"
          >
            <Share2 size={14} />
            Share
          </button>
          <button
            onClick={() => generatePrompt(prompt.category as PromptCategory)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-md text-sm transition-colors"
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
      persuasive: 'orange',
      names: 'pink'
    };
    return colors[tabId] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Random Prompts Generator
          </h1>

          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Random Prompts Generator for writing, AI art, blogging, stories, and character creation,
            all in one clean, powerful tool. Instantly generate professional-quality prompts for
            ChatGPT, MidJourney, and creative writing.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const color = getTabColor(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all ${
                  activeTab === tab.id
                    ? `bg-${color}-600 text-white shadow-lg`
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={() => generatePrompt()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Generate Prompt
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors"
            >
              <History size={18} />
              {showHistory ? 'Hide' : 'Show'} History ({promptHistory.length})
            </button>
          </div>

          {/* Result */}
          {generatedPrompts[activeTab] && renderPromptCard(generatedPrompts[activeTab])}

          {/* History Panel */}
          {showHistory && (
            <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Prompts</h3>
                <button
                  onClick={() => setPromptHistory([])}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  Clear History
                </button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent prompts. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-gray-100 leading-relaxed">{prompt.text}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full bg-${getTabColor(prompt.category)}-100 dark:bg-${getTabColor(prompt.category)}-900/30 text-${getTabColor(prompt.category)}-700 dark:text-${getTabColor(prompt.category)}-400`}>
                              {prompt.category}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {new Date(prompt.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(prompt.text)}
                          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Featured Tools Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">Featured Prompt Generators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/generators/writing/prompts/" className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Writing Prompts</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Creative writing prompts with unique characters and plots</p>
            </Link>
            <Link href="/generators/ai-art/images/" className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">AI Art Prompts</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Professional prompts for MidJourney and DALL-E</p>
            </Link>
            <Link href="/generators/blog/post/" className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Blog Post Ideas</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">SEO-optimized blog content ideas and hooks</p>
            </Link>
            <Link href="/generators/writing/short-story/" className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Short Story Prompts</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Complete prompts for flash fiction and short stories</p>
            </Link>
            <Link href="/generators/creative/names/" className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Character Names</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Fantasy names from multiple cultures and origins</p>
            </Link>
            <Link href="/october-writing-prompts" className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">October Prompts</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Spooky Halloween and autumn-themed prompts</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
