import React, { useState } from 'react';

interface Prompt {
  id: string;
  title: string;
  text: string;
  tag: string;
}

const prompts: Prompt[] = [
  {
    id: 'the-roast',
    title: 'The Roast Caricature',
    tag: 'Viral',
    text: "Create a caricature of me in the style of a brutally honest roast. Exaggerate my most recognizable features. Add a speech bubble with a savage but funny one-liner about my appearance. Bold outlines, bright colors, comedy club background.",
  },
  {
    id: 'simpsons-style',
    title: 'Simpsons Character',
    tag: 'Popular',
    text: "Turn me into a Simpsons character. Yellow skin, overbite, four fingers. Place me in a Springfield location that matches my vibe. Keep my hairstyle and outfit recognizable but in the Simpsons art style. Clean lines, flat shading.",
  },
  {
    id: 'red-flag',
    title: 'Red Flag Caricature',
    tag: 'Trending',
    text: "Create a caricature of me surrounded by my biggest personality red flags as visual symbols. Exaggerate my expression to look guilty but charming. Cartoon style, bold colors, humorous tone. Each red flag should be a funny illustrated icon.",
  },
  {
    id: 'linkedin-bro',
    title: 'LinkedIn Bro',
    tag: 'Funny',
    text: "Draw a caricature of me as an over-the-top LinkedIn influencer. Giant smile, power pose, oversized motivational quote behind me. Exaggerated suit or business casual outfit. Corporate background with hustle culture elements.",
  },
  {
    id: 'anime-hero',
    title: 'Anime Protagonist',
    tag: 'Creative',
    text: "Create an anime-style caricature of me as the main character of a shonen anime. Exaggerate my eyes and hair dramatically. Add an energy aura and a dramatic wind effect. Vibrant colors, action pose, manga panel framing.",
  },
  {
    id: 'renaissance',
    title: 'Renaissance Portrait',
    tag: 'Classy',
    text: "Paint a Renaissance-style caricature portrait of me. Exaggerate my features in the style of a Flemish oil painting. Regal clothing, dramatic Rembrandt lighting, ornate gold frame visible. Oil on canvas texture, classical composition.",
  },
  {
    id: 'pixar-character',
    title: 'Pixar Character',
    tag: 'Popular',
    text: "Turn me into a Pixar-style 3D animated character. Big expressive eyes, slightly oversized head, smooth skin texture. Place me in a colorful Pixar movie scene that matches my personality. Warm lighting, cinematic depth of field.",
  },
  {
    id: 'wanted-poster',
    title: 'Wanted Poster',
    tag: 'Fun',
    text: "Create a Wild West wanted poster caricature of me. Exaggerated features in a sketchy ink style. 'WANTED' in large letters at the top with a humorous crime listed below like 'Too many bad takes' or 'Excessive coffee consumption'. Aged paper texture, sepia tones.",
  },
  {
    id: 'sports-card',
    title: 'Trading Card',
    tag: 'Creative',
    text: "Design a sports trading card caricature of me. Exaggerated action pose, holographic background effect. Include made-up stats at the bottom (charisma, humor, caffeine tolerance). Bold card frame, shiny foil effect, retro 90s card design.",
  },
  {
    id: 'ghibli-style',
    title: 'Studio Ghibli',
    tag: 'Trending',
    text: "Create a Studio Ghibli-style caricature of me in a magical landscape. Soft watercolor textures, gentle exaggeration of my features. Whimsical details like floating spirits or a magical companion. Warm golden hour lighting, hand-painted look.",
  },
  {
    id: 'comic-cover',
    title: 'Comic Book Cover',
    tag: 'Bold',
    text: "Design a comic book cover starring me as the superhero. Exaggerated muscular or heroic pose, dramatic cape, bold title text at the top. Halftone dots, primary color palette, Jack Kirby-inspired dynamic composition. Issue #1 badge in the corner.",
  },
  {
    id: 'family-guy',
    title: 'Family Guy Style',
    tag: 'Funny',
    text: "Draw me in the Family Guy animation style. Characteristic round head, simplified features, thick outlines. Place me in a cutaway gag scene doing something absurd. Flat colors, TV animation quality, comedic pose.",
  },
];

export default function ChatGPTCaricaturePrompts() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-b from-orange-100 via-amber-50 to-white border-b border-orange-200">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-10 text-center">
          <p className="text-orange-400 font-mono text-sm tracking-widest uppercase mb-3">Prompt Library</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            ChatGPT Caricature Trend Prompt
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            The viral ChatGPT caricature trend prompt collection. 12 copy-paste prompts to create hilarious AI caricatures of yourself — from savage roasts to Pixar characters.
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white border border-orange-200 rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is the ChatGPT Caricature Trend?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>ChatGPT caricature trend prompt</strong> craze has taken over social media. People are uploading selfies to ChatGPT and asking it to create exaggerated, funny caricatures — and the results are going viral.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            From "roast me" caricatures that highlight your most recognizable features to Simpsons-style character transformations, the ChatGPT caricature trend prompt has become the most-shared AI art format of 2025-2026.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Below are 12 tested prompts you can copy and paste directly into ChatGPT. Upload your photo, paste the prompt, and share the result. Each <strong>chatgpt caricature trend prompt</strong> is designed for maximum humor and shareability.
          </p>
        </div>

        {/* How to Use */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use These ChatGPT Caricature Trend Prompts</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Open <strong>ChatGPT</strong> (GPT-4o or newer with image generation)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Upload a clear selfie or photo of yourself</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Copy any <strong>chatgpt caricature trend prompt</strong> below and paste it</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Share the result on Instagram, TikTok, or LinkedIn</span>
            </li>
          </ol>
        </div>

        {/* Prompt Cards Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">12 Viral ChatGPT Caricature Trend Prompts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-orange-400 hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-orange-100 to-amber-100 px-5 py-4 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">{prompt.title}</h3>
                <span className="text-xs font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full">{prompt.tag}</span>
              </div>

              {/* Prompt Text */}
              <div className="flex-1 p-5">
                <p className="text-sm text-gray-700 leading-relaxed">{prompt.text}</p>
              </div>

              {/* Copy Button */}
              <div className="px-5 pb-4">
                <button
                  onClick={() => handleCopy(prompt)}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    copiedId === prompt.id
                      ? 'bg-green-500 text-white'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  {copiedId === prompt.id ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Better ChatGPT Caricature Results</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1 font-bold">1.</span>
              <span><strong>Use a clear, well-lit photo</strong> — front-facing selfies with good lighting produce the best caricatures</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1 font-bold">2.</span>
              <span><strong>Be specific about style</strong> — each chatgpt caricature trend prompt above targets a specific art style for consistent results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1 font-bold">3.</span>
              <span><strong>Iterate and refine</strong> — if the first result isn't perfect, ask ChatGPT to "exaggerate more" or "make it funnier"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1 font-bold">4.</span>
              <span><strong>Try combining prompts</strong> — mix a style prompt with a scenario for unique results (e.g., Ghibli + wanted poster)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1 font-bold">5.</span>
              <span><strong>Share side-by-side</strong> — the most viral posts show the original photo next to the AI caricature</span>
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">What is the ChatGPT caricature trend prompt?</h3>
              <p className="text-gray-600 text-sm">The ChatGPT caricature trend prompt is a viral social media trend where people upload their photos to ChatGPT and use specific prompts to generate exaggerated, humorous caricatures of themselves. The trend started in late 2024 and exploded across Instagram, TikTok, and X.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Do I need ChatGPT Plus for the caricature trend?</h3>
              <p className="text-gray-600 text-sm">Yes, you need access to GPT-4o or newer, which includes image generation capabilities. The free tier of ChatGPT may have limited image generation access. ChatGPT Plus or Team plans give you reliable access to the caricature feature.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Can I use these prompts with other AI tools?</h3>
              <p className="text-gray-600 text-sm">While these prompts are optimized for ChatGPT, many work with Gemini, Midjourney, and other AI image generators. Results may vary depending on the platform's style capabilities.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Are the caricature results safe to share online?</h3>
              <p className="text-gray-600 text-sm">Yes, the AI-generated caricatures are your creations to share. However, be mindful when creating caricatures of other people — always get their permission before posting caricatures of friends, colleagues, or public figures.</p>
            </div>
          </div>
        </div>

        {/* Internal Links */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More AI Prompt Collections</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <a href="/prompts/coquette-aesthetic" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-400 transition-colors">
              <span className="font-medium text-gray-900">Coquette Aesthetic Prompts</span>
              <p className="text-sm text-gray-500 mt-1">Soft pinks, lace, and vintage femininity</p>
            </a>
            <a href="/prompts/cyberpunk-2077-aesthetic" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-400 transition-colors">
              <span className="font-medium text-gray-900">Cyberpunk 2077 Prompts</span>
              <p className="text-sm text-gray-500 mt-1">Neon-lit dystopian future aesthetics</p>
            </a>
            <a href="/prompts/dark-academia-aesthetic" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-400 transition-colors">
              <span className="font-medium text-gray-900">Dark Academia Prompts</span>
              <p className="text-sm text-gray-500 mt-1">Gothic scholarly aesthetic</p>
            </a>
            <a href="/tools/instagram-aesthetic-generator" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-400 transition-colors">
              <span className="font-medium text-gray-900">Instagram Aesthetic Generator</span>
              <p className="text-sm text-gray-500 mt-1">Generate prompts for any IG style</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
