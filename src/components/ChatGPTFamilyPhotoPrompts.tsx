import React, { useState } from 'react';

interface Prompt {
  id: string;
  title: string;
  text: string;
  tag: string;
}

const prompts: Prompt[] = [
  {
    id: 'realistic-warm',
    title: 'Realistic, Warm Family Portrait',
    tag: 'Popular',
    text: "Create a realistic family photo of a mother, father, and two children. The image should feel natural and candid, like a professional lifestyle photoshoot. Soft natural lighting, warm tones, relaxed smiles, and subtle details that show connection and affection. Background is simple and elegant, slightly blurred. Everyone looks like real people, not overly polished or artificial.",
  },
  {
    id: 'cozy-home',
    title: 'Cozy Home Lifestyle Shot',
    tag: 'Authentic',
    text: "Generate a realistic family photo taken at home, showing a mother, father, and two kids in a cozy living room. Natural daylight, casual clothing, authentic expressions, slight imperfections for realism. The atmosphere should feel warm, intimate, and lived-in, like a real moment captured unexpectedly.",
  },
  {
    id: 'outdoor-golden',
    title: 'Outdoor Family Photo',
    tag: 'Natural',
    text: "Create a realistic outdoor family photo of four people (parents and two children) taken during golden hour. Soft sunlight, gentle shadows, natural skin tones, relaxed body language. The mood should feel joyful, calm, and authentic, as if taken by a professional photographer in a park or garden.",
  },
  {
    id: 'editorial-magazine',
    title: 'Editorial / Magazine-Style Family Photo',
    tag: 'Professional',
    text: "Generate a high-quality editorial family photo of two parents and two children. Clean composition, balanced framing, natural but refined styling. The image should look like it belongs in a lifestyle magazine, realistic facial features, soft expressions, and elegant lighting.",
  },
  {
    id: 'timeless-minimal',
    title: 'Timeless & Minimal',
    tag: 'Classic',
    text: "Create a timeless, minimalist family portrait of four people. Neutral background, simple clothing in soft colors, gentle natural lighting. The photo should feel emotional, authentic, and classic, with realistic proportions and facial expressions.",
  },
];

export default function ChatGPTFamilyPhotoPrompts() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-100 via-sky-50 to-white border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-10 text-center">
          <p className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-3">Prompt Library</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            chatgpt family photo prompt
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Create stunning, realistic family portraits with AI. These <strong>chatgpt family photo prompt</strong> templates help you generate natural-looking family photos that capture genuine moments and emotions.
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white border border-blue-200 rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a ChatGPT Family Photo Prompt?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>chatgpt family photo prompt</strong> is a carefully crafted text description that tells ChatGPT's image generation model exactly how to create a realistic family portrait. The right prompt can produce images that look like professional photography—natural lighting, authentic expressions, and genuine family connection.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you need a family portrait for social media, a creative project, or just want to see what AI can create, these <strong>chatgpt family photo prompt</strong> templates are designed to produce the most realistic results possible.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Below are 5 tested prompts you can copy and paste directly into ChatGPT. Each <strong>chatgpt family photo prompt</strong> is optimized for natural-looking results with proper lighting, composition, and emotional warmth.
          </p>
        </div>

        {/* How to Use */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use These ChatGPT Family Photo Prompts</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Open <strong>ChatGPT</strong> (GPT-4o or newer with image generation)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Copy any <strong>chatgpt family photo prompt</strong> below</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Customize the details (number of children, clothing, setting) to match your vision</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Paste and generate—refine with follow-up instructions if needed</span>
            </li>
          </ol>
        </div>

        {/* Prompt Cards Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">5 Realistic ChatGPT Family Photo Prompts</h2>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-100 to-sky-100 px-5 py-4 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">{prompt.title}</h3>
                <span className="text-xs font-semibold bg-blue-500 text-white px-2 py-0.5 rounded-full">{prompt.tag}</span>
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
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Better ChatGPT Family Photo Results</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1 font-bold">1.</span>
              <span><strong>Specify realistic details</strong> — words like "natural skin tones," "slight imperfections," and "candid moment" help avoid the AI-generated look</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1 font-bold">2.</span>
              <span><strong>Describe the lighting</strong> — "soft natural light," "golden hour," and "window light" produce more realistic results than generic lighting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1 font-bold">3.</span>
              <span><strong>Add emotional context</strong> — each chatgpt family photo prompt above includes emotional cues like "relaxed," "joyful," and "connected" for authentic expressions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1 font-bold">4.</span>
              <span><strong>Customize family composition</strong> — adjust the number of children, ages, and family structure to match your needs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1 font-bold">5.</span>
              <span><strong>Iterate and refine</strong> — if the first result isn't perfect, ask ChatGPT to "make it more natural" or "adjust the lighting"</span>
            </li>
          </ul>
        </div>

        {/* Customization Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Customize Your ChatGPT Family Photo Prompt</h2>
          <p className="text-gray-700 mb-4">
            Each chatgpt family photo prompt above can be modified to match your specific needs. Here are common customizations:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-2">Family Size</h4>
              <p className="text-sm text-gray-600">Change "two children" to "one child," "three children," or "grandparents included"</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-2">Setting</h4>
              <p className="text-sm text-gray-600">Swap "living room" for "beach," "backyard," "studio," or "holiday scene"</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-2">Clothing Style</h4>
              <p className="text-sm text-gray-600">Add "matching outfits," "formal attire," or "casual summer clothes"</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-2">Mood & Tone</h4>
              <p className="text-sm text-gray-600">Adjust from "playful and energetic" to "calm and serene" or "festive and joyful"</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">What is the best ChatGPT family photo prompt?</h3>
              <p className="text-gray-600 text-sm">The best chatgpt family photo prompt includes specific details about lighting, expressions, and setting. Our "Realistic, Warm Family Portrait" prompt is the most popular because it balances natural aesthetics with professional quality.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Do I need ChatGPT Plus for family photo generation?</h3>
              <p className="text-gray-600 text-sm">Yes, you need access to GPT-4o or newer, which includes image generation capabilities. ChatGPT Plus or Team plans provide reliable access to the image generation feature needed for these prompts.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Can I use these prompts with other AI image generators?</h3>
              <p className="text-gray-600 text-sm">Yes, these chatgpt family photo prompt templates work with Midjourney, DALL-E, and other AI image generators. Results may vary slightly based on each platform's style and capabilities.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">How do I make the family photos look more realistic?</h3>
              <p className="text-gray-600 text-sm">Include phrases like "slight imperfections," "natural skin texture," "candid moment," and "not overly polished" in your chatgpt family photo prompt. These cues help the AI avoid the typical "AI-generated" look.</p>
            </div>
          </div>
        </div>

        {/* Internal Links */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More AI Prompt Collections</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <a href="/caricature-prompt" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
              <span className="font-medium text-gray-900">Caricature Prompts</span>
              <p className="text-sm text-gray-500 mt-1">Fun, stylized caricature illustrations</p>
            </a>
            <a href="/chatgpt-photo-editing-prompts" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
              <span className="font-medium text-gray-900">ChatGPT Photo Editing</span>
              <p className="text-sm text-gray-500 mt-1">Edit and enhance photos with AI</p>
            </a>
            <a href="/prompts/chatgpt-caricature-trend" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
              <span className="font-medium text-gray-900">ChatGPT Caricature Trend</span>
              <p className="text-sm text-gray-500 mt-1">Viral caricature prompts</p>
            </a>
            <a href="/tools/instagram-aesthetic-generator" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
              <span className="font-medium text-gray-900">Instagram Aesthetic Generator</span>
              <p className="text-sm text-gray-500 mt-1">Generate prompts for any IG style</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
