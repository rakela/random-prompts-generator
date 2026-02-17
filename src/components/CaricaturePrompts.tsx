import React, { useState } from 'react';

interface Prompt {
  id: string;
  title: string;
  text: string;
  tag: string;
}

const prompts: Prompt[] = [
  {
    id: 'soft-cute',
    title: 'Soft & Cute Caricature',
    tag: 'Friendly',
    text: "Create a friendly caricature illustration of a family of four. Slightly exaggerated facial features, big expressive eyes, warm smiles. The style should be cute, colorful, and approachable, similar to a modern children's book illustration. Keep the characters recognizable and full of personality.",
  },
  {
    id: 'professional-cartoon',
    title: 'Professional Cartoon Caricature',
    tag: 'Polished',
    text: "Generate a clean, professional caricature of a family of four. Exaggerated but balanced facial features, smooth line art, soft shading, and vibrant colors. The style should feel polished and playful, suitable for a website, profile picture, or family poster.",
  },
  {
    id: 'fun-playful',
    title: 'Fun & Playful Cartoon Style',
    tag: 'Fun',
    text: "Create a playful cartoon caricature of a mother, father, and two kids. Slightly oversized heads, expressive faces, fun poses. Bright colors, cheerful mood, and a lighthearted illustration style that emphasizes personality and family connection.",
  },
  {
    id: 'semi-realistic',
    title: 'Semi-Realistic Caricature',
    tag: 'Artistic',
    text: "Generate a semi-realistic caricature of a family of four. Faces are recognizable with gentle exaggeration, natural skin tones, and expressive eyes. The style should balance realism and illustration, keeping proportions believable but artistic.",
  },
  {
    id: 'line-art',
    title: 'Line Art / Illustration Caricature',
    tag: 'Minimal',
    text: "Create a stylized caricature illustration of a family using clean line art and soft colors. Minimalist but expressive faces, subtle exaggeration, modern illustration style suitable for prints or digital use.",
  },
];

export default function CaricaturePrompts() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-b from-pink-100 via-fuchsia-50 to-white border-b border-pink-200">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-10 text-center">
          <p className="text-pink-400 font-mono text-sm tracking-widest uppercase mb-3">Prompt Library</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            caricature prompt
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Create fun, stylized caricature illustrations with AI. These <strong>caricature prompt</strong> templates help you generate expressive, personality-filled artwork—from cute cartoon styles to semi-realistic portraits.
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white border border-pink-200 rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a Caricature Prompt?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>caricature prompt</strong> is a text description that guides AI image generators to create stylized, exaggerated portraits. Unlike realistic photo prompts, a good caricature prompt emphasizes personality, expression, and artistic style over photorealism.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Caricatures have been popular in art for centuries—from theme park artists to political cartoons. Now, with AI, you can create your own caricature illustrations using the right <strong>caricature prompt</strong> techniques.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Below are 5 tested prompts you can copy and paste into ChatGPT, Midjourney, or other AI image generators. Each <strong>caricature prompt</strong> is designed for a different style—from soft and cute to professional and polished.
          </p>
        </div>

        {/* How to Use */}
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use These Caricature Prompts</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-pink-200 text-pink-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Open your preferred AI image generator (ChatGPT, Midjourney, DALL-E, etc.)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-pink-200 text-pink-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Copy any <strong>caricature prompt</strong> below</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-pink-200 text-pink-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Customize the subject (individual, couple, family, pet) and any specific features</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-pink-200 text-pink-700 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Paste and generate—ask for variations if you want to explore different styles</span>
            </li>
          </ol>
        </div>

        {/* Prompt Cards Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">5 Caricature Prompt Templates</h2>
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-pink-400 hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-pink-100 to-fuchsia-100 px-5 py-4 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">{prompt.title}</h3>
                <span className="text-xs font-semibold bg-pink-500 text-white px-2 py-0.5 rounded-full">{prompt.tag}</span>
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
                      : 'bg-pink-500 hover:bg-pink-600 text-white'
                  }`}
                >
                  {copiedId === prompt.id ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Style Guide Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Caricature Prompt Style Guide</h2>
          <p className="text-gray-700 mb-6">
            Different caricature prompt styles create different moods. Here's when to use each:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
              <h4 className="font-semibold text-gray-900 mb-2">Soft & Cute</h4>
              <p className="text-sm text-gray-600">Best for: Children's illustrations, family-friendly content, gifts for kids, storybook characters</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
              <h4 className="font-semibold text-gray-900 mb-2">Professional Cartoon</h4>
              <p className="text-sm text-gray-600">Best for: Profile pictures, business avatars, website illustrations, branding materials</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
              <h4 className="font-semibold text-gray-900 mb-2">Fun & Playful</h4>
              <p className="text-sm text-gray-600">Best for: Social media content, party invitations, casual gifts, humorous portraits</p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
              <h4 className="font-semibold text-gray-900 mb-2">Semi-Realistic</h4>
              <p className="text-sm text-gray-600">Best for: Artistic portraits, gifts for adults, editorial illustrations, gallery-worthy prints</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-pink-50 to-fuchsia-50 border border-pink-200 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for Better Caricature Results</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1 font-bold">1.</span>
              <span><strong>Specify the level of exaggeration</strong> — use "slightly exaggerated" for subtle caricatures or "highly exaggerated" for bold, comedic styles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1 font-bold">2.</span>
              <span><strong>Describe key features</strong> — mention specific features you want emphasized (big eyes, expressive eyebrows, distinctive hairstyle)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1 font-bold">3.</span>
              <span><strong>Include mood and expression</strong> — each caricature prompt should specify the emotional tone (warm smiles, mischievous grins, thoughtful expressions)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1 font-bold">4.</span>
              <span><strong>Reference art styles</strong> — mention specific styles like "Pixar-inspired," "anime-influenced," or "classic caricature artist" for consistent results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-500 mt-1 font-bold">5.</span>
              <span><strong>Add background context</strong> — specify if you want a plain background, themed setting, or specific colors that complement the subject</span>
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">What makes a good caricature prompt?</h3>
              <p className="text-gray-600 text-sm">A good caricature prompt includes the art style, level of exaggeration, subject description, emotional tone, and any specific features to emphasize. The prompts above include all these elements for consistent results.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Can I use these caricature prompts with any AI tool?</h3>
              <p className="text-gray-600 text-sm">Yes, these caricature prompt templates work with ChatGPT (GPT-4o), Midjourney, DALL-E, and most AI image generators. Results may vary slightly based on each platform's style capabilities.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">How do I create a caricature of a specific person?</h3>
              <p className="text-gray-600 text-sm">For ChatGPT, you can upload a photo along with your caricature prompt. For other tools, describe the person's distinctive features (hair color, face shape, accessories) in your prompt. Always get permission before creating caricatures of others.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">What's the difference between a caricature and a portrait?</h3>
              <p className="text-gray-600 text-sm">A portrait aims for realistic representation, while a caricature intentionally exaggerates features for artistic or humorous effect. A caricature prompt emphasizes style and personality over photorealism.</p>
            </div>
          </div>
        </div>

        {/* Internal Links */}
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More AI Prompt Collections</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <a href="/chatgpt-family-photo-prompt" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-pink-400 transition-colors">
              <span className="font-medium text-gray-900">ChatGPT Family Photo Prompts</span>
              <p className="text-sm text-gray-500 mt-1">Realistic AI family portraits</p>
            </a>
            <a href="/prompts/chatgpt-caricature-trend" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-pink-400 transition-colors">
              <span className="font-medium text-gray-900">ChatGPT Caricature Trend</span>
              <p className="text-sm text-gray-500 mt-1">Viral caricature trend prompts</p>
            </a>
            <a href="/chatgpt-photo-editing-prompts" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-pink-400 transition-colors">
              <span className="font-medium text-gray-900">ChatGPT Photo Editing</span>
              <p className="text-sm text-gray-500 mt-1">Edit and enhance photos with AI</p>
            </a>
            <a href="/art-prompts/portrait" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-pink-400 transition-colors">
              <span className="font-medium text-gray-900">Portrait Generator</span>
              <p className="text-sm text-gray-500 mt-1">AI portrait prompt ideas</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
