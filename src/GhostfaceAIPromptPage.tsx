import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Github, Twitter, Heart, History, Share2, Star, Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

// Ghostface AI prompt data
const ghostfacePrompts = [
  {
    id: 1,
    title: "Neon Ghostface in the City",
    icon: "🎭",
    prompt: "Ghostface wearing a glossy black robe and reflective neon mask, standing in a rainy cyberpunk alley, neon signs glowing pink and blue, reflections on wet pavement, smoke rising, cinematic lighting, ultra-realistic, high detail, moody cyberpunk atmosphere, DSLR bokeh, 8K --ar 16:9 --v 6 --style raw --q 2 --chaos 20"
  },
  {
    id: 2,
    title: "Ghostface Under the Full Moon",
    icon: "🌕",
    prompt: "Ghostface silhouette holding a knife, standing in a misty forest under a glowing full moon, fog drifting through tall trees, cinematic horror composition, blue-silver moonlight, eerie shadows, high-resolution 8K detail, dramatic lighting, haunting tone --ar 16:9 --v 6 --style raw --q 2 --chaos 15"
  },
  {
    id: 3,
    title: "Ghostface in a Luxury Mansion",
    icon: "🩸",
    prompt: "Modern Ghostface in a black tailored suit and mask, inside an elegant mansion with marble floors and golden chandeliers, cracked mirror behind him, red accent glow, cinematic horror fashion editorial, film noir aesthetic, soft shadows, ultra-detailed, 8K realism --ar 9:16 --v 6 --style raw --q 2 --chaos 10"
  },
  {
    id: 4,
    title: "Ghostface Selfie Trend",
    icon: "📸",
    prompt: "Female Ghostface taking a mirror selfie with smartphone, stylish outfit (black skirt, crop top, mask on), purple and red LED lights, neon room decor, cinematic selfie aesthetic, ultra-realistic lighting, social media vibe, viral TikTok style, soft background blur --ar 9:16 --v 6 --style raw --q 2 --chaos 25"
  },
  {
    id: 5,
    title: "Ghostface on the Run",
    icon: "🔥",
    prompt: "Ghostface sprinting through a burning street at night, fire and smoke behind, sparks flying, orange light reflecting on mask, cinematic motion blur, action horror scene, Hollywood style still frame, dynamic camera angle, photorealistic 8K --ar 21:9 --v 6 --style raw --q 2 --chaos 20"
  },
  {
    id: 6,
    title: "Ghostface Eating the Nano Banana",
    icon: "🍌",
    prompt: "Ghostface holding a glowing nano banana the size of a keychain, staring at it like a secret artifact, futuristic kitchen background, soft cinematic lighting, golden reflections, high-detail textures, surreal minimalist tone, ultra-realistic 8K macro photography, shallow depth of field --ar 16:9 --v 6 --style raw --q 2 --chaos 20"
  },
  {
    id: 7,
    title: "Nano Banana Universe – Ghostface Edition",
    icon: "⚡",
    prompt: "Tiny nano banana floating in space with Ghostface reflected inside its glossy surface, cosmic lighting, glowing energy waves, cinematic sci-fi tone, ultra-realistic space particles, macro shot focus, golden blue color palette, futuristic surrealism, 8K --ar 21:9 --v 6 --style raw --q 2 --chaos 25"
  }
];

const GhostfaceAIPromptPage = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('ghostface-a-i-prompt-saved-prompts', []);
  const [favorites, setFavorites] = useLocalStorage('ghostface-a-i-prompt-favorites', []);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
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

  const exportPrompts = () => {
    const dataStr = ghostfacePrompts.map(p => `${p.title}\n${p.prompt}\n\n---\n`).join('\n');
    const dataBlob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ghostface-ai-prompts.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO pageKey="ghostfacePrompt" />

      {/* Header */}
      <Header
        promptHistory={[]}
        showHistory={false}
        onHistoryToggle={() => {}}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 via-red-900 to-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ghost size={48} className="text-white" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Ghostface AI Trend Prompt Generator
            </h1>
          </div>

          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Create viral Ghostface AI art for TikTok, Instagram, and social media. Professional MidJourney and DALL-E prompts featuring cyberpunk aesthetics, horror vibes, and trending Ghostface styles. Generate cinematic AI images that go viral.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          <Link
            to="/writing-prompts"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <PenTool size={18} />
            Writing
          </Link>
          <Link
            to="/ai-images-prompt"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
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
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <BookOpen size={18} />
            Blog post
          </Link>
          <Link
            to="/short-story-prompts-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Crown size={18} />
            Short stories
          </Link>
          <Link
            to="/random-name-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Sparkles size={18} />
            Names
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-purple-50 to-red-50 rounded-lg p-6 mb-8 border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">🎭 Viral Ghostface AI Art Prompts</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The <strong>Ghostface AI trend</strong> has taken TikTok, Instagram, and social media by storm. Create stunning, viral-worthy AI art using these professionally crafted prompts for <Link to="/ai-images-prompt" className="text-purple-600 hover:underline">MidJourney</Link>, DALL-E, and Stable Diffusion.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              From <strong>cyberpunk neon aesthetics</strong> to <strong>horror mansion scenes</strong> and <strong>viral selfie trends</strong>, these Ghostface prompts combine cinematic lighting, ultra-realistic details, and trending styles perfect for content creators and AI art enthusiasts.
            </p>
          </div>

          {/* Export Button */}
          <div className="text-center mb-8">
            <button
              onClick={exportPrompts}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
            >
              <Download size={18} />
              Export All Prompts
            </button>
          </div>

          {/* Prompts Grid */}
          <div className="space-y-8 mb-12">
            {ghostfacePrompts.map((item, index) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{item.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{index + 1}. {item.title}</h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed font-mono">{item.prompt}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 ml-16">
                  <button
                    onClick={() => copyToClipboard(item.prompt, item.id)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      copiedId === item.id
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Copy size={14} />
                    {copiedId === item.id ? 'Copied!' : 'Copy Prompt'}
                  </button>
                  <button
                    onClick={() => savePrompt(item)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md text-sm transition-colors"
                  >
                    <Save size={14} />
                    Save
                  </button>
                  <button
                    onClick={() => toggleFavorite(item)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                      favorites.some(fav => fav.id === item.id)
                        ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Star size={14} fill={favorites.some(fav => fav.id === item.id) ? 'currentColor' : 'none'} />
                    Favorite
                  </button>
                </div>

                {/* Concept explanation for nano banana prompts */}
                {(item.id === 6 || item.id === 7) && (
                  <div className="ml-16 mt-4 bg-amber-50 rounded-lg p-3 border border-amber-200">
                    <p className="text-sm text-amber-900">
                      <strong>Concept:</strong> {item.id === 6
                        ? "Merges the humor of \"nano banana\" scale with Ghostface's dark persona — perfect for meme-style viral edits and surreal AI art."
                        : "Cinematic surrealism — the banana becomes a cosmic symbol, reflecting Ghostface's mask inside for a dreamy, viral AI trend look that stands out on social media."}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* How to Use Section */}
          <div className="bg-blue-50 rounded-lg p-6 mb-12 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">🎨 How to Use These Ghostface AI Prompts</h2>
            <div className="space-y-3 text-blue-800">
              <div className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                <p><strong>Copy your favorite prompt</strong> using the "Copy Prompt" button above.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                <p><strong>Paste into your AI tool:</strong> Use with <a href="https://www.midjourney.com" target="_blank" rel="noopener noreferrer" className="underline">MidJourney</a>, <a href="https://openai.com/dall-e-2" target="_blank" rel="noopener noreferrer" className="underline">DALL-E</a>, or <a href="https://stability.ai" target="_blank" rel="noopener noreferrer" className="underline">Stable Diffusion</a>.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                <p><strong>Customize parameters:</strong> Adjust --ar (aspect ratio), --chaos (variation), or --style for different effects.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">4.</span>
                <p><strong>Generate & share:</strong> Create your Ghostface AI art and share on TikTok, Instagram, or Twitter with #GhostfaceAI</p>
              </div>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Ghostface AI Art is Trending</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The <strong>Ghostface AI trend</strong> combines horror iconography with cutting-edge AI art generation, creating visually stunning images that resonate across social media platforms. From <strong>cyberpunk neon aesthetics</strong> to <strong>luxury horror editorials</strong>, these prompts tap into viral content trends that drive engagement.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our professionally crafted <strong>Ghostface prompt templates</strong> include technical parameters like <code>--ar 16:9</code> for widescreen compositions, <code>--chaos 20</code> for creative variation, and <code>--style raw</code> for ultra-realistic results. Each prompt is optimized for <Link to="/ai-images-prompt" className="text-blue-600 hover:underline">MidJourney v6</Link>, DALL-E 3, and Stable Diffusion XL.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-8">Popular Ghostface AI Styles</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                <li><strong>Cyberpunk Ghostface:</strong> Neon-lit urban environments with rain-soaked streets and moody atmospheric lighting</li>
                <li><strong>Horror Aesthetic:</strong> Moonlit forests, mansion interiors, and classic slasher film compositions</li>
                <li><strong>Fashion Editorial:</strong> Luxury settings with tailored suits, elegant poses, and film noir styling</li>
                <li><strong>Viral Selfie Trend:</strong> Mirror selfies with LED lighting, perfect for TikTok and Instagram content</li>
                <li><strong>Action Scenes:</strong> Dynamic motion blur, fire effects, and Hollywood-style cinematography</li>
                <li><strong>Surreal Concepts:</strong> Nano banana memes, cosmic surrealism, and viral humor aesthetics</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-8">Tips for Viral Ghostface AI Content</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To maximize engagement with your Ghostface AI art, consider these content strategies: Use <strong>9:16 aspect ratio</strong> (--ar 9:16) for vertical TikTok and Instagram Reels formats. Experiment with the <code>--chaos</code> parameter (15-25) to create unique variations that stand out. Combine multiple prompts in sequences to create <Link to="/short-story-prompts-generator" className="text-blue-600 hover:underline">storytelling content</Link> that keeps viewers engaged.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The <strong>Ghostface selfie trend</strong> particularly resonates with younger audiences, combining horror aesthetics with relatable selfie culture. Try customizing outfits, LED colors, and room decor to match your brand or aesthetic. For content creators, these prompts work excellently as <Link to="/ai-blog-post-generator" className="text-blue-600 hover:underline">blog post visuals</Link>, video thumbnails, and social media headers.
              </p>

              <div className="bg-purple-50 p-6 rounded-lg mt-6 border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-3 text-xl">Pro Tips for AI Artists:</h3>
                <ul className="text-purple-800 space-y-2">
                  <li>✓ <strong>Batch generate</strong> multiple variations to find the perfect shot</li>
                  <li>✓ <strong>Combine elements</strong> from different prompts for unique compositions</li>
                  <li>✓ <strong>Use upscaling</strong> tools to enhance detail for print or high-res displays</li>
                  <li>✓ <strong>Add text overlays</strong> in editing apps to create meme-ready content</li>
                  <li>✓ <strong>Track trending hashtags</strong> like #GhostfaceAI, #AIArt, #MidJourneyArt</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Links Section */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">🔗 More AI Prompt Generators</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/ai-images-prompt" className="text-blue-600 hover:underline flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
                </svg>
                AI Images Prompt Generator
              </Link>
              <Link to="/writing-prompts" className="text-blue-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Writing Prompts
              </Link>
              <Link to="/short-story-prompts-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Short Story Prompt Generator
              </Link>
              <Link to="/october-writing-prompts" className="text-blue-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                October Writing Prompts
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-gray-800 py-16 mt-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What is the Ghostface AI trend?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The Ghostface AI trend involves using AI image generators like MidJourney and DALL-E to create artistic interpretations of the iconic Ghostface character in various aesthetic styles — from cyberpunk and horror to fashion editorials and viral selfie trends.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Which AI tools work with these Ghostface prompts?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  These prompts are optimized for <strong>MidJourney v6</strong> (with parameters like --ar, --v 6, --chaos), but also work with <strong>DALL-E 3</strong>, <strong>Stable Diffusion XL</strong>, and <strong>Leonardo.ai</strong>. You may need to adjust or remove specific parameters depending on the platform.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I use these AI-generated Ghostface images commercially?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The prompts themselves are free to use. However, commercial usage of AI-generated images depends on your AI platform's terms of service and potential copyright considerations around the Ghostface character. Always review platform policies and consider transformative use guidelines.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How do I make Ghostface AI art go viral on TikTok?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Use vertical formats (--ar 9:16), trending audio, and relevant hashtags like #GhostfaceAI #MidJourney #AIArt. Post during peak hours, create series or storytelling sequences, and engage with trending Ghostface content to boost visibility. The selfie trend format (prompt #4) performs especially well.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What does the --chaos parameter do in MidJourney?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The <code>--chaos</code> parameter (0-100) controls how varied and unexpected the AI results are. Higher values (20-25) create more unique, experimental images, while lower values produce more predictable results. It's perfect for discovering surprising creative directions.
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

export default GhostfaceAIPromptPage;
