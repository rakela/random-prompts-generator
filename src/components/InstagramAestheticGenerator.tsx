import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, Sparkles, Instagram, Camera, Palette } from 'lucide-react';

// Instagram aesthetic styles with their prompt templates
const AESTHETIC_STYLES = {
  cinematic: {
    name: 'Cinematic',
    icon: '🎬',
    description: 'Movie-like lighting and composition',
    prefixes: [
      'Cinematic wide shot,',
      'Film still,',
      'Movie scene,',
      'Dramatic lighting,',
      'Anamorphic lens,',
    ],
    modifiers: [
      'soft film grain, moody atmosphere',
      'golden hour lighting, lens flare',
      'blue and orange color grade',
      'shallow depth of field, bokeh',
      'dramatic shadows, high contrast',
      'natural lighting, authentic mood',
    ],
    suffixes: [
      '35mm film look',
      'shot on Arri Alexa',
      'Kodak Portra 400 aesthetic',
      'Hollywood production quality',
      'award-winning cinematography',
    ],
  },
  y2k: {
    name: 'Y2K',
    icon: '💿',
    description: 'Early 2000s nostalgia',
    prefixes: [
      'Y2K aesthetic,',
      'Early 2000s style,',
      'Nostalgic digital,',
      'Retro futuristic,',
      'Millennium era,',
    ],
    modifiers: [
      'metallic shimmer, iridescent highlights',
      'butterfly clips, glossy finish',
      'low-res digital camera quality',
      'bubblegum pink and cyber blue',
      'chrome reflections, plastic textures',
      'flip phone era vibes',
    ],
    suffixes: [
      'Paris Hilton era',
      'early internet aesthetic',
      'Limewire era nostalgia',
      'MySpace profile picture style',
      'flashy and glamorous',
    ],
  },
  cyberpunk: {
    name: 'Cyberpunk',
    icon: '🌃',
    description: 'Neon-lit dystopian future',
    prefixes: [
      'Cyberpunk scene,',
      'Neon noir,',
      'Dystopian future,',
      'Blade Runner style,',
      'Neo-Tokyo,',
    ],
    modifiers: [
      'neon lights reflecting on wet streets',
      'holographic advertisements, rain',
      'pink and cyan glow, dark atmosphere',
      'futuristic technology, urban decay',
      'LED lights, smoke and fog',
      'glitching effects, digital artifacts',
    ],
    suffixes: [
      'synthwave color palette',
      '2077 aesthetic',
      'high-tech low-life',
      'electric and atmospheric',
      'retrofuturism',
    ],
  },
  cottagecore: {
    name: 'Cottagecore',
    icon: '🌸',
    description: 'Rural romantic simplicity',
    prefixes: [
      'Cottagecore aesthetic,',
      'Rustic countryside,',
      'Pastoral scene,',
      'Fairytale cottage,',
      'Whimsical garden,',
    ],
    modifiers: [
      'wildflowers, soft natural light',
      'vintage lace, handmade pottery',
      'morning dew, misty meadows',
      'bread baking, linen textures',
      'honey jars, dried herbs',
      'soft focus, dreamy atmosphere',
    ],
    suffixes: [
      'romantic and peaceful',
      'back to nature vibes',
      'Anne of Green Gables inspired',
      'gentle and serene',
      'timeless countryside beauty',
    ],
  },
  darkAcademia: {
    name: 'Dark Academia',
    icon: '📚',
    description: 'Gothic scholarly aesthetic',
    prefixes: [
      'Dark academia,',
      'Gothic library,',
      'Classical study,',
      'Victorian scholar,',
      'Ancient university,',
    ],
    modifiers: [
      'candlelight, leather-bound books',
      'marble busts, dark wood paneling',
      'autumn leaves, tweed textures',
      'fountain pens, aged paper',
      'stained glass windows, moody lighting',
      'Latin inscriptions, classical art',
    ],
    suffixes: [
      'Oxford aesthetic',
      'scholarly and mysterious',
      'timeless intellectual beauty',
      'gothic romance vibes',
      'secret society atmosphere',
    ],
  },
  minimalist: {
    name: 'Minimalist',
    icon: '◻️',
    description: 'Clean, simple, essential',
    prefixes: [
      'Minimalist composition,',
      'Clean aesthetic,',
      'Simple and elegant,',
      'Scandinavian design,',
      'Essential beauty,',
    ],
    modifiers: [
      'white space, subtle shadows',
      'neutral tones, clean lines',
      'single subject, negative space',
      'soft natural light, muted colors',
      'geometric shapes, perfect symmetry',
      'less is more approach',
    ],
    suffixes: [
      'editorial quality',
      'intentional simplicity',
      'refined and sophisticated',
      'calm and balanced',
      'pure aesthetic',
    ],
  },
  vintageFilm: {
    name: 'Vintage Film',
    icon: '📷',
    description: 'Analog photography nostalgia',
    prefixes: [
      'Vintage film photography,',
      'Analog camera shot,',
      '1970s photograph,',
      'Retro snapshot,',
      'Old polaroid style,',
    ],
    modifiers: [
      'warm color cast, light leaks',
      'film grain, faded colors',
      'overexposed highlights, soft focus',
      'dust particles, scratches',
      'sepia tones, vignette',
      'expired film look, nostalgic',
    ],
    suffixes: [
      'found photograph aesthetic',
      'family album vibes',
      'authentic vintage feel',
      'timeless and warm',
      'memories captured on film',
    ],
  },
  vaporwave: {
    name: 'Vaporwave',
    icon: '🌴',
    description: 'Retro internet surrealism',
    prefixes: [
      'Vaporwave aesthetic,',
      'Retrowave scene,',
      'Digital surrealism,',
      'Aesthetic paradise,',
      '80s digital,',
    ],
    modifiers: [
      'pink and purple gradients, palm trees',
      'Greek statues, glitch effects',
      'VHS artifacts, chrome text',
      'sunset grids, dolphins',
      'Japanese text, marble columns',
      'Windows 95 nostalgia, pixelated',
    ],
    suffixes: [
      'A E S T H E T I C',
      'internet art style',
      'digital dream',
      'nostalgic and surreal',
      'mall soft aesthetic',
    ],
  },
};

// Subject suggestions for each style
const SUBJECT_SUGGESTIONS = [
  'a person sitting by a window',
  'a cozy coffee shop corner',
  'a city street at dusk',
  'a vintage car',
  'a bedroom interior',
  'a portrait with natural light',
  'a rooftop view',
  'food arranged on a table',
  'a mirror selfie setup',
  'an outdoor café scene',
];

const InstagramAestheticGenerator: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<keyof typeof AESTHETIC_STYLES>('cinematic');
  const [subject, setSubject] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copiedMessage, setCopiedMessage] = useState('');

  const generatePrompt = useCallback(() => {
    const style = AESTHETIC_STYLES[selectedStyle];

    // Random selections from each category
    const prefix = style.prefixes[Math.floor(Math.random() * style.prefixes.length)];
    const modifier = style.modifiers[Math.floor(Math.random() * style.modifiers.length)];
    const suffix = style.suffixes[Math.floor(Math.random() * style.suffixes.length)];

    // Use provided subject or random suggestion
    const subjectText = subject.trim() || SUBJECT_SUGGESTIONS[Math.floor(Math.random() * SUBJECT_SUGGESTIONS.length)];

    // Construct the prompt
    const prompt = `${prefix} ${subjectText}, ${modifier}, ${suffix}`;
    setGeneratedPrompt(prompt);
  }, [selectedStyle, subject]);

  const copyToClipboard = useCallback(async () => {
    if (!generatedPrompt) return;

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopiedMessage('Copied!');
      setTimeout(() => setCopiedMessage(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopiedMessage('Failed to copy');
      setTimeout(() => setCopiedMessage(''), 2000);
    }
  }, [generatedPrompt]);

  const suggestSubject = useCallback(() => {
    const suggestion = SUBJECT_SUGGESTIONS[Math.floor(Math.random() * SUBJECT_SUGGESTIONS.length)];
    setSubject(suggestion);
  }, []);

  // Auto-generate on mount and style change
  React.useEffect(() => {
    generatePrompt();
  }, [selectedStyle]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
          <Instagram size={16} />
          Free Tool
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Instagram Aesthetic Prompt Generator
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Generate copy-pasteable prompts for any Instagram aesthetic. Works with Midjourney, DALL-E, Gemini, and more.
        </p>
      </div>

      {/* Style Selection */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="text-purple-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Choose Your Aesthetic</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(AESTHETIC_STYLES).map(([key, style]) => (
            <button
              key={key}
              onClick={() => setSelectedStyle(key as keyof typeof AESTHETIC_STYLES)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedStyle === key
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-1">{style.icon}</div>
              <div className="font-medium text-gray-900">{style.name}</div>
              <div className="text-xs text-gray-500 mt-1">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Input */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Camera className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Describe Your Subject (Optional)</h2>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., a person reading in a library..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={suggestSubject}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors whitespace-nowrap"
          >
            Suggest
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Leave blank for a random subject suggestion</p>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={generatePrompt}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all font-medium text-lg shadow-lg hover:shadow-xl"
        >
          <Sparkles size={20} />
          Generate Prompt
        </button>
      </div>

      {/* Generated Prompt Output */}
      {generatedPrompt && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Prompt</h2>
            <div className="flex items-center gap-2">
              {copiedMessage && (
                <span className="text-sm text-green-600 font-medium">{copiedMessage}</span>
              )}
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Copy size={16} />
                Copy
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 border border-purple-100">
            <p className="text-lg text-gray-800 leading-relaxed">
              {generatedPrompt}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Works with:</span>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">Midjourney</span>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">DALL-E 3</span>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">Gemini</span>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">Stable Diffusion</span>
          </div>
        </div>
      )}

      {/* How to Use Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use This Generator</h2>
        <ol className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <span>Select an aesthetic style that matches your desired Instagram vibe</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <span>Optionally describe your subject (person, scene, object)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <span>Click "Generate Prompt" to create a unique prompt</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <span>Copy the prompt and paste it into your favorite AI image generator</span>
          </li>
        </ol>
      </div>

      {/* SEO Content Section */}
      <div className="prose prose-gray max-w-none">
        <h2>Why Use an Instagram Aesthetic Generator?</h2>
        <p>
          Creating a consistent aesthetic for your Instagram feed is essential for growing your audience.
          Whether you're going for cinematic vibes, Y2K nostalgia, or dark academia, having the right
          prompts makes all the difference when using AI image generators.
        </p>

        <h3>Popular Instagram Aesthetics in 2026</h3>
        <ul>
          <li><strong>Cinematic</strong> — Movie-like compositions with dramatic lighting</li>
          <li><strong>Y2K</strong> — Early 2000s nostalgia with metallic and glossy elements</li>
          <li><strong>Cyberpunk</strong> — Neon-lit urban dystopia with futuristic tech</li>
          <li><strong>Cottagecore</strong> — Romantic rural simplicity with natural elements</li>
          <li><strong>Dark Academia</strong> — Gothic scholarly aesthetic with classical influences</li>
          <li><strong>Minimalist</strong> — Clean, simple compositions with intentional negative space</li>
          <li><strong>Vintage Film</strong> — Analog photography look with warm tones and grain</li>
          <li><strong>Vaporwave</strong> — Retro internet surrealism with pink and purple gradients</li>
        </ul>

        <h3>Tips for Better AI-Generated Instagram Content</h3>
        <ol>
          <li>Be specific about lighting conditions (golden hour, neon, candlelight)</li>
          <li>Include camera or film references for realistic looks</li>
          <li>Add texture descriptors (grain, bokeh, soft focus)</li>
          <li>Specify color palettes that match your feed</li>
          <li>Generate multiple versions and pick the best</li>
        </ol>
      </div>
    </div>
  );
};

export default InstagramAestheticGenerator;
