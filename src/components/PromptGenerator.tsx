import React, { useState, useCallback, useEffect } from 'react';
import { Copy, RefreshCw, Save, Download, Share2, Star, History, FileText, FileJson, FileSpreadsheet, File, X, Edit, Book, Wand2, Sparkles } from 'lucide-react';
import promptsData from '../data/prompts.json';
import { jsPDF } from 'jspdf';

type CategoryType = 'writing' | 'aiArt' | 'blog' | 'fantasy' | 'persuasive' | 'names' | 'book' | 'movies';

interface PromptType {
  id: number;
  text: string;
  category: string;
  timestamp: string;
  isMultiple?: boolean;
}

interface ControlsType {
  [key: string]: any;
}

interface ToastType {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

// Toast Notification Component
const Toast: React.FC<{ toast: ToastType; onClose: () => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = toast.type === 'success' ? 'bg-green-500' :
                  toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3 min-w-[300px] animate-slide-in`}>
      <span>{toast.message}</span>
      <button onClick={onClose} className="hover:opacity-75">
        <X size={16} />
      </button>
    </div>
  );
};

// Weighted random selection
const weightedRandom = (items: string[], weights: number[] | null = null): string => {
  if (!weights) return items[Math.floor(Math.random() * items.length)];

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }
  return items[items.length - 1];
};

// Enhanced template processor
const processTemplate = (template: string, data: any, category: string, controls: any = {}): string => {
  if (category === 'names') {
    const selectedCulture = controls.origin && controls.origin !== 'any'
      ? controls.origin
      : weightedRandom(['elvish', 'dwarven', 'human', 'exotic']);

    const cultureData = data[selectedCulture];
    const nameType = controls.type || 'full';

    const firstName = weightedRandom(cultureData.first);
    const lastName = weightedRandom(cultureData.last);
    const title = weightedRandom(data.titles);

    switch (nameType) {
      case 'first':
        return firstName;
      case 'title':
        return `${firstName} ${title}`;
      case 'house':
        return `${firstName} of House ${lastName}`;
      default:
        return `${firstName} ${lastName}`;
    }
  }

  if (category === 'persuasive') {
    const type = controls.type || 'all';

    let sourceArray = [];
    if (type === 'topics') {
      sourceArray = data.topics;
    } else if (type === 'titles') {
      sourceArray = data.titles;
    } else {
      sourceArray = [...data.topics, ...data.titles];
    }

    return weightedRandom(sourceArray);
  }

  // Regular template processing
  return template.replace(/\{(\w+)\}/g, (match: string, key: string) => {
    if (data[key] && Array.isArray(data[key])) {
      return weightedRandom(data[key]);
    }
    return match;
  });
};

// Quality enhancement functions
const enhanceWritingPrompt = (prompt: string): string => {
  const enhancements = [
    ' Focus on the internal conflict.',
    ' Include a ticking clock element.',
    ' Show the cost of failure.',
    ' Add a moral dilemma.',
    ' Include sensory details.'
  ];

  if (Math.random() < 0.3) {
    prompt += weightedRandom(enhancements);
  }

  return prompt;
};

const enhanceAIArtPrompt = (prompt: string): string => {
  const qualityModifiers = [
    ', ultra detailed, 8k resolution',
    ', professional photography',
    ', award winning composition',
    ', cinematic lighting',
    ', sharp focus, detailed textures'
  ];

  return prompt + weightedRandom(qualityModifiers);
};

const enhanceBlogPrompt = (prompt: string): string => {
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

const enhanceFantasyPrompt = (prompt: string): string => {
  const worldbuilding = [
    ' Consider the economic implications.',
    ' Think about the cultural conflicts.',
    ' Explore the magic system\'s limitations.',
    ' Add political intrigue.',
    ' Include ancient history.'
  ];

  if (Math.random() < 0.3) {
    prompt += weightedRandom(worldbuilding);
  }

  return prompt;
};

interface PromptGeneratorProps {
  category: CategoryType;
}

const PromptGenerator: React.FC<PromptGeneratorProps> = ({ category }) => {
  const [generatedPrompt, setGeneratedPrompt] = useState<PromptType | null>(null);
  const [savedPrompts, setSavedPrompts] = useState<PromptType[]>([]);
  const [promptHistory, setPromptHistory] = useState<PromptType[]>([]);
  const [favorites, setFavorites] = useState<PromptType[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [controls, setControls] = useState<ControlsType>({
    writing: { genre: 'any', tone: 'any', length: 'medium' },
    aiArt: { style: 'any', mood: 'any', quality: 'high' },
    blog: { topic: 'any', format: 'any', angle: 'any' },
    fantasy: { race: 'any', magic: 'any', setting: 'any' },
    persuasive: { type: 'all' },
    names: { type: 'full', origin: 'any', count: 'single' },
    book: {},
    movies: {}
  });

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedPrompts');
    const history = localStorage.getItem('promptHistory');
    const favs = localStorage.getItem('favorites');

    if (saved) setSavedPrompts(JSON.parse(saved));
    if (history) setPromptHistory(JSON.parse(history));
    if (favs) setFavorites(JSON.parse(favs));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts));
  }, [savedPrompts]);

  useEffect(() => {
    localStorage.setItem('promptHistory', JSON.stringify(promptHistory));
  }, [promptHistory]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (message: string, type: ToastType['type'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const generatePrompt = useCallback(() => {
    const data = promptsData[category];
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

      setGeneratedPrompt(prompt);
      setPromptHistory(prev => [prompt, ...prev.slice(0, 49)]); // Keep last 50
      return;
    }

    const template = weightedRandom(data.templates);
    let promptText = processTemplate(template, data, category, categoryControls);

    // Apply category-specific enhancements
    switch (category) {
      case 'writing':
        promptText = enhanceWritingPrompt(promptText);
        break;
      case 'aiArt':
        promptText = enhanceAIArtPrompt(promptText);
        break;
      case 'blog':
        promptText = enhanceBlogPrompt(promptText);
        break;
      case 'fantasy':
        promptText = enhanceFantasyPrompt(promptText);
        break;
    }

    const prompt = {
      id: Date.now(),
      text: promptText,
      category,
      timestamp: new Date().toISOString()
    };

    setGeneratedPrompt(prompt);
    setPromptHistory(prev => [prompt, ...prev.slice(0, 49)]); // Keep last 50
  }, [category, controls]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy', 'error');
      console.error('Failed to copy:', err);
    }
  };

  const savePrompt = (prompt: PromptType) => {
    if (!savedPrompts.some(p => p.id === prompt.id)) {
      setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
      showToast('Prompt saved!', 'success');
    } else {
      showToast('Already saved', 'info');
    }
  };

  const toggleFavorite = (prompt: PromptType) => {
    const isFavorite = favorites.some(fav => fav.id === prompt.id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== prompt.id));
      showToast('Removed from favorites', 'info');
    } else {
      setFavorites(prev => [...prev, { ...prompt, favorited: true }]);
      showToast('Added to favorites!', 'success');
    }
  };

  const sharePrompt = async (prompt: PromptType) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Creative Prompt',
          text: prompt.text,
          url: window.location.href
        });
        showToast('Shared successfully!', 'success');
      } catch (err) {
        copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`);
      }
    } else {
      copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`);
    }
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(savedPrompts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompts.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported as JSON', 'success');
  };

  const exportAsCSV = () => {
    const headers = ['ID', 'Text', 'Category', 'Timestamp'];
    const rows = savedPrompts.map(p => [
      p.id,
      `"${p.text.replace(/"/g, '""')}"`,
      p.category,
      p.timestamp
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const dataBlob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompts.csv';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported as CSV', 'success');
  };

  const exportAsTXT = () => {
    const text = savedPrompts.map((p, i) =>
      `[${i + 1}] ${p.text}\nCategory: ${p.category}\nDate: ${new Date(p.timestamp).toLocaleString()}\n\n`
    ).join('---\n\n');

    const dataBlob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompts.txt';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Exported as TXT', 'success');
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    doc.setFontSize(18);
    doc.text('Saved Prompts', margin, yPosition);
    yPosition += 15;

    doc.setFontSize(10);
    savedPrompts.forEach((prompt, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.text(`[${index + 1}]`, margin, yPosition);
      yPosition += 7;

      doc.setFontSize(10);
      const lines = doc.splitTextToSize(prompt.text, pageWidth - 2 * margin);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 5 + 5;

      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(`Category: ${prompt.category} | Date: ${new Date(prompt.timestamp).toLocaleDateString()}`, margin, yPosition);
      doc.setTextColor(0);
      yPosition += 10;
    });

    doc.save('prompts.pdf');
    showToast('Exported as PDF', 'success');
  };

  const clearHistory = () => {
    setPromptHistory([]);
    showToast('History cleared', 'info');
  };

  const updateControl = (key: string, value: any) => {
    setControls(prev => ({
      ...prev,
      [category]: { ...prev[category], [key]: value }
    }));
  };

  const renderControls = () => {
    const data = promptsData[category];
    const categoryControls = controls[category];

    switch (category) {
      case 'writing':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.genre}
              onChange={(e) => updateControl('genre', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="any">Any Genre</option>
              <option value="scifi">Science Fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="horror">Horror</option>
            </select>
            <select
              value={categoryControls.tone}
              onChange={(e) => updateControl('tone', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="any">Any Tone</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="humorous">Humorous</option>
              <option value="serious">Serious</option>
            </select>
            <select
              value={categoryControls.length}
              onChange={(e) => updateControl('length', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="short">Short Story</option>
              <option value="medium">Medium Story</option>
              <option value="long">Novel</option>
            </select>
          </div>
        );

      case 'aiArt':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.style}
              onChange={(e) => updateControl('style', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="any">Any Style</option>
              <option value="realistic">Realistic</option>
              <option value="fantasy">Fantasy</option>
              <option value="anime">Anime</option>
              <option value="abstract">Abstract</option>
              <option value="oil">Oil Painting</option>
              <option value="digital">Digital Art</option>
            </select>
            <select
              value={categoryControls.mood}
              onChange={(e) => updateControl('mood', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="any">Any Mood</option>
              <option value="bright">Bright</option>
              <option value="dark">Dark</option>
              <option value="ethereal">Ethereal</option>
              <option value="dramatic">Dramatic</option>
            </select>
            <select
              value={categoryControls.quality}
              onChange={(e) => updateControl('quality', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="standard">Standard Quality</option>
              <option value="high">High Quality</option>
              <option value="ultra">Ultra Quality 8K</option>
            </select>
          </div>
        );

      case 'blog':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.topic}
              onChange={(e) => updateControl('topic', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="any">Any Topic</option>
              <option value="tech">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
              <option value="travel">Travel</option>
            </select>
            <select
              value={categoryControls.format}
              onChange={(e) => updateControl('format', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="any">Any Format</option>
              <option value="howto">How-To Guide</option>
              <option value="listicle">Listicle</option>
              <option value="tutorial">Tutorial</option>
              <option value="review">Review</option>
            </select>
            <select
              value={categoryControls.angle}
              onChange={(e) => updateControl('angle', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="any">Any Angle</option>
              <option value="beginner">Beginner-Friendly</option>
              <option value="expert">Expert</option>
              <option value="controversial">Controversial</option>
              <option value="data">Data-Driven</option>
            </select>
          </div>
        );

      case 'names':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={categoryControls.type}
              onChange={(e) => updateControl('type', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="full">Full Name</option>
              <option value="first">First Name Only</option>
              <option value="title">With Title</option>
              <option value="house">With House</option>
            </select>
            <select
              value={categoryControls.origin}
              onChange={(e) => updateControl('origin', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
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
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="single">Single Name</option>
              <option value="multiple">Generate 5 Names</option>
              <option value="batch">Batch of 10</option>
            </select>
          </div>
        );

      case 'persuasive':
        return (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
            <select
              value={categoryControls.type}
              onChange={(e) => updateControl('type', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="all">All Persuasive Topics</option>
              <option value="topics">Essay Topics Only</option>
              <option value="titles">Writing Titles Only</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPromptCard = () => {
    if (!generatedPrompt) return null;

    const isMultipleNames = generatedPrompt.category === 'names' && generatedPrompt.isMultiple;
    const isFavorited = favorites.some(fav => fav.id === generatedPrompt.id);

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {isMultipleNames ? (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Generated Names:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {generatedPrompt.text.split('\n').map((name, index) => (
                <div key={index} className="bg-gray-50 px-3 py-2 rounded border border-gray-200 text-gray-800">
                  {name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-800 text-lg leading-relaxed mb-4">{generatedPrompt.text}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyToClipboard(generatedPrompt.text)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
          >
            <Copy size={14} />
            Copy {isMultipleNames ? 'All' : ''}
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
              isFavorited
                ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Star size={14} fill={isFavorited ? 'currentColor' : 'none'} />
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
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Category Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-4">
        <a
          href="/writing-prompts"
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all rounded-lg ${
            category === 'writing'
              ? 'bg-blue-100 text-blue-900'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Edit size={20} />
          Writing
        </a>
        <a
          href="/ai-images-prompt"
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all rounded-lg ${
            category === 'aiArt'
              ? 'bg-purple-100 text-purple-900'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Wand2 size={20} />
          AI Images
        </a>
        <a
          href="/ai-blog-post-generator"
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all rounded-lg ${
            category === 'blog'
              ? 'bg-green-100 text-green-900'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Book size={20} />
          Blog post
        </a>
        <a
          href="/short-story-prompts-generator"
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all rounded-lg ${
            category === 'fantasy'
              ? 'bg-amber-100 text-amber-900'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Short stories
        </a>
        <a
          href="/random-name-generator"
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all rounded-lg ${
            category === 'names'
              ? 'bg-pink-100 text-pink-900'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Sparkles size={20} />
          Names
        </a>
      </div>

      {/* Controls */}
      {renderControls()}

      {/* Generate Button and History Link */}
      <div className="text-center mb-8 flex flex-col items-center gap-3">
        <button
          onClick={generatePrompt}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
        >
          Generate Prompt
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <History size={14} />
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>

      {/* Result */}
      {renderPromptCard()}

      {/* History Panel - displays below history button */}
      {showHistory && (
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent History</h3>
            <button
              onClick={clearHistory}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {promptHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No history yet. Generate some prompts!</p>
            ) : (
              promptHistory.map((prompt, index) => (
                <div
                  key={prompt.id}
                  className="bg-gray-50 p-3 rounded border border-gray-200 text-sm"
                >
                  <p className="text-gray-800 mb-2">{prompt.text}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(prompt.timestamp).toLocaleString()}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(prompt.text)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => savePrompt(prompt)}
                        className="text-green-600 hover:text-green-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Saved Prompts Section */}
      {savedPrompts.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Saved Prompts ({savedPrompts.length})</h3>
            <div className="flex gap-2">
              <button
                onClick={exportAsJSON}
                className="inline-flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                title="Export as JSON"
              >
                <FileJson size={16} />
                JSON
              </button>
              <button
                onClick={exportAsCSV}
                className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                title="Export as CSV"
              >
                <FileSpreadsheet size={16} />
                CSV
              </button>
              <button
                onClick={exportAsTXT}
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                title="Export as TXT"
              >
                <FileText size={16} />
                TXT
              </button>
              <button
                onClick={exportAsPDF}
                className="inline-flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                title="Export as PDF"
              >
                <File size={16} />
                PDF
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            {savedPrompts.slice(-10).reverse().map((prompt, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-800 mb-2">{prompt.text}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(prompt.timestamp).toLocaleDateString()}</span>
                  <button
                    onClick={() => copyToClipboard(prompt.text)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </div>
  );
};

export default PromptGenerator;
