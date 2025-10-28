import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// High-quality data dictionaries for AI art generation
const promptData = {
  aiArt: {
    // Professional art techniques and styles
    techniques: [
      'hyperrealistic digital painting', 'concept art', 'matte painting', 'photorealistic 3D render',
      'oil painting masterpiece', 'watercolor illustration', 'pencil sketch portrait',
      'acrylic painting', 'charcoal drawing', 'digital art illustration'
    ],

    // Specific subjects with visual appeal
    subjects: [
      'ethereal elven warrior with glowing tattoos',
      'steampunk airship soaring through storm clouds',
      'cyberpunk samurai in neon-lit alleyway',
      'ancient dragon perched atop crystalline mountains',
      'space marine battling alien creatures on distant planet',
      'mystical forest guardian with antler crown',
      'robotic angel with mechanical wings',
      'underwater palace with bioluminescent details',
      'post-apocalyptic survivor in gas mask',
      'celestial being made of stars and nebulae'
    ],

    // Professional lighting setups
    lighting: [
      'dramatic chiaroscuro lighting', 'golden hour rim lighting', 'volumetric god rays',
      'neon accent lighting', 'soft box studio lighting', 'harsh spotlight from above',
      'bioluminescent ambient glow', 'candlelight and shadows', 'aurora borealis backdrop',
      'lens flare and bloom effects', 'moody atmospheric lighting', 'backlit silhouette'
    ],

    // Camera and composition terms
    composition: [
      'extreme close-up portrait', 'wide establishing shot', 'dramatic low angle',
      'bird\'s eye view', 'dutch angle composition', 'symmetrical framing',
      'rule of thirds composition', 'leading lines', 'depth of field focus',
      'macro detail shot', 'panoramic landscape', 'tilt-shift miniature effect'
    ],

    // Quality and style modifiers
    quality: [
      'trending on ArtStation', 'highly detailed', 'award-winning photography',
      'museum quality', 'photorealistic', 'hyper-detailed',
      'studio quality', 'masterpiece', '8K resolution', 'ultra-realistic'
    ],

    // Artist style references
    artists: [
      'painted by Greg Rutkowski', 'in the style of Alphonse Mucha',
      'reminiscent of H.R. Giger', 'inspired by Hayao Miyazaki',
      'like a John Singer Sargent portrait', 'in Caravaggio\'s style',
      'digital art by Loish', 'concept art by Feng Zhu',
      'illustration by James Jean', 'photography by Annie Leibovitz'
    ],

    templates: [
      '{subjects}, {techniques}, {lighting}, {composition}, {quality}, {artists}',
      '{composition} of {subjects}, {techniques} with {lighting}, {quality}, {artists}',
      '{subjects} rendered as {techniques}, featuring {lighting} and {composition}, {quality}, {artists}',
      'Professional {techniques} showing {subjects}, {lighting}, {composition}, {quality}, {artists}',
      '{artists} style {techniques} of {subjects}, {lighting}, {composition}, {quality}'
    ]
  }
};

// Weighted random selection
const weightedRandom = (items, weights = null) => {
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
const processTemplate = (template, data) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (data[key] && Array.isArray(data[key])) {
      return weightedRandom(data[key]);
    }
    return match;
  });
};

// Quality enhancement for AI art prompts
const enhanceAIArtPrompt = (prompt) => {
  const qualityModifiers = [
    ', ultra detailed, 8k resolution',
    ', professional photography',
    ', award winning composition',
    ', cinematic lighting',
    ', sharp focus, detailed textures'
  ];

  return prompt + weightedRandom(qualityModifiers);
};

const AIImagesPromptPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    style: 'any',
    mood: 'any',
    quality: 'high'
  });

  const generatePrompt = useCallback(() => {
    const data = promptData.aiArt;
    const template = weightedRandom(data.templates);
    let prompt = processTemplate(template, data);
    prompt = enhanceAIArtPrompt(prompt);

    const newPrompt = {
      id: Date.now(),
      text: prompt,
      category: 'aiArt',
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
          title: 'AI Images Prompt',
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
    link.download = 'saved-ai-images-prompts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const updateControl = (key, value) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt.text}</p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyToClipboard(prompt.text)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
          >
            <Copy size={14} />
            Copy
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
            onClick={() => generatePrompt()}
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Helmet>
        <title>AI Images Prompt Generator - Free AI Art Prompts for MidJourney & DALL-E</title>
        <meta name="description" content="Generate professional AI images prompt instantly with our free AI art prompt generator. Create detailed prompts for MidJourney, DALL-E, Stable Diffusion with advanced lighting, composition, and style techniques." />
        <meta name="keywords" content="ai images prompt, ai art prompt generator, midjourney prompts, dall-e prompts, stable diffusion prompts, ai image generation, free ai art prompts" />
        <link rel="canonical" href="https://randomprompts.org/ai-images-prompt" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="AI Images Prompt Generator - Free AI Art Prompts" />
        <meta property="og:description" content="Generate professional AI images prompt instantly with our free AI art prompt generator. Create detailed prompts for MidJourney, DALL-E, Stable Diffusion." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://randomprompts.org/ai-images-prompt" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Images Prompt Generator - Free AI Art Prompts" />
        <meta name="twitter:description" content="Generate professional AI images prompt instantly with our free AI art prompt generator." />
      </Helmet>

      {/* Header */}
      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Images Prompt Generator
          </h1>

          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate professional AI images prompt for MidJourney, DALL-E, and Stable Diffusion. Our free AI art prompt generator creates detailed prompts with advanced lighting, composition techniques, and style references to produce stunning AI-generated images.
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
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-purple-600 border-b-2 border-purple-600 bg-purple-50"
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
        {/* Generator Section */}
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={controls.style}
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
              value={controls.mood}
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
              value={controls.quality}
              onChange={(e) => updateControl('quality', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="standard">Standard Quality</option>
              <option value="high">High Quality</option>
              <option value="professional">Professional</option>
              <option value="masterpiece">Masterpiece</option>
            </select>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => generatePrompt()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Generate AI Images Prompt
            </button>
          </div>

          {/* Result */}
          {generatedPrompt && renderPromptCard(generatedPrompt)}

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
                          <span className="text-xs text-gray-400 mt-2 block">
                            {new Date(prompt.timestamp).toLocaleTimeString()}
                          </span>
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
                    <p className="text-gray-800">{prompt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO Content Section */}
          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional AI Images Prompt Generator</h2>
              <p className="text-gray-700 mb-4">
                Our AI images prompt generator creates professional prompts optimized for MidJourney, DALL-E, Stable Diffusion, and other AI art platforms. Generate detailed AI images prompt with specific technical terminology, professional lighting setups, composition techniques, and artist style references that produce gallery-quality results.
              </p>
              <p className="text-gray-700 mb-4">
                Each AI images prompt combines detailed subject descriptions with professional art techniques including chiaroscuro lighting, rule of thirds composition, quality modifiers like "trending on ArtStation" and "museum quality," plus specific artist style references to produce consistent, high-quality AI-generated images for commercial and personal projects.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-purple-900 mb-2">AI Images Prompt Features:</h3>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• Professional lighting terminology (volumetric rays, rim lighting, golden hour)</li>
                  <li>• Advanced composition techniques (dutch angle, bird's eye view, depth of field)</li>
                  <li>• Quality modifiers and resolution specifications (8K, ultra-realistic, photorealistic)</li>
                  <li>• Specific artist style references for consistent AI image generation</li>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is an AI images prompt?</h3>
                <p className="text-gray-700">
                  An AI images prompt is a detailed text description that tells AI art generators like MidJourney, DALL-E, or Stable Diffusion exactly what image to create. The best AI images prompt includes specific details about subject, style, lighting, composition, and quality to produce professional results.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I use AI images prompts effectively?</h3>
                <p className="text-gray-700">
                  Copy the generated AI images prompt and paste it directly into your AI art generator (MidJourney, DALL-E, Stable Diffusion). For best results, use prompts that include specific technical terms, lighting descriptions, and style references. Our generator creates prompts optimized for professional AI image generation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use these AI images prompts for commercial projects?</h3>
                <p className="text-gray-700">
                  Yes. All AI images prompts generated by RandomPrompts.org are free to use for personal or commercial projects. Check your AI art platform's terms (MidJourney, DALL-E, etc.) regarding commercial use of generated images.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Which AI art generators work with these prompts?</h3>
                <p className="text-gray-700">
                  Our AI images prompts work with all major AI art platforms including MidJourney, DALL-E 2, DALL-E 3, Stable Diffusion, Leonardo AI, and more. The prompts use universal terminology that produces excellent results across different AI image generation platforms.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What makes a good AI images prompt?</h3>
                <p className="text-gray-700">
                  A professional AI images prompt includes: specific subject descriptions, art style or technique, lighting setup, composition angle, quality modifiers, and optional artist references. Our generator combines these elements automatically to create detailed prompts that produce stunning AI-generated images.
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

export default AIImagesPromptPage;
