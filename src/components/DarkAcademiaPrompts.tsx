import React, { useState } from 'react';

interface Prompt {
  id: string;
  title: string;
  text: string;
}

const prompts: Prompt[] = [
  {
    id: 'the-library',
    title: 'The Library',
    text: "A sprawling private library at night, floor-to-ceiling wooden bookshelves filled with leather-bound books. A rolling ladder, a single green banker's lamp glowing on a desk. Moody, dark academia aesthetic, cinematic shadows.",
  },
  {
    id: 'the-student',
    title: 'The Student',
    text: "A portrait of a scholar wearing a brown tweed blazer and a turtleneck, sitting in a dimly lit mahogany-paneled room. They are reading an old manuscript. Warm candlelight, scholarly atmosphere.",
  },
  {
    id: 'the-desk',
    title: 'The Desk',
    text: "A mahogany desk covered in old maps, an inkwell with a quill, a brass telescope, and a half-melted candle. Wisps of smoke, dark moody lighting, 8k resolution.",
  },
  {
    id: 'the-window',
    title: 'The Window',
    text: "Looking out a Gothic arched window during a rainy autumn day. Reflections of a stack of books and a cup of black coffee on the glass. Moody, melancholic, forest green and deep brown tones.",
  },
  {
    id: 'the-architecture',
    title: 'The Architecture',
    text: "A wide shot of an old Ivy League university courtyard in the fog. Dark stone buildings, orange autumn leaves on the ground. Dark academia core, cinematic drone shot.",
  },
  {
    id: 'the-secret-room',
    title: 'The Secret Room',
    text: "A hidden attic room filled with anatomical sketches pinned to the walls, a human skull on a stack of books, and a telescope pointing at a moonlit sky.",
  },
  {
    id: 'the-violin',
    title: 'The Violin',
    text: "A vintage violin resting on a velvet chair in a dark, empty music room. A single beam of dusty light hitting the wood grain. Rich textures, dark classical aesthetic.",
  },
  {
    id: 'the-letter',
    title: 'The Letter',
    text: "A hand sealing a parchment envelope with red wax and a brass stamp. Surroundings include old stamps and dried lavender. 35mm film grain, moody lighting.",
  },
  {
    id: 'the-statue',
    title: 'The Statue',
    text: "A white marble bust of a Greek philosopher in a dimly lit hallway, partially covered in shadows. Dust motes dancing in a single light ray. Cinematic, scholarly.",
  },
  {
    id: 'the-outfit',
    title: 'The Outfit',
    text: "Flat-lay of a dark academia outfit: A pleated plaid skirt, a black wool coat, leather loafers, and a vintage satchel. Scattered old coins and a pocket watch.",
  },
];

export default function DarkAcademiaPrompts() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Hero */}
      <div className="bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border-b border-amber-800/30">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-10 text-center">
          <p className="text-amber-500 font-mono text-sm tracking-widest uppercase mb-3">Aesthetic Collection</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-amber-400">Dark Academia</span> Aesthetic AI Prompts
          </h1>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg">
            Scholarly moods, autumn tones, classic literature, and candle-lit textures. 10 curated AI image prompts for the dark academia aesthetic.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-stone-900 border border-amber-800/20 rounded-2xl overflow-hidden hover:border-amber-600/40 hover:shadow-lg hover:shadow-amber-900/10 transition-all duration-200 flex flex-col"
            >
              {/* Image Preview */}
              <div className="aspect-[4/3] bg-gradient-to-br from-amber-900 via-stone-800 to-stone-900 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-amber-600/40 text-6xl font-serif select-none">
                    {prompt.title.split(' ')[1]?.charAt(0) || prompt.title.charAt(0)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-950/80 text-amber-400 border border-amber-700/50">
                    Dark Academia
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-stone-100 mb-3">{prompt.title}</h3>

                <div className="bg-stone-950 border border-stone-800 rounded-lg p-3 mb-4 flex-1">
                  <pre className="whitespace-pre-wrap text-sm text-stone-300 font-mono leading-relaxed">
                    {prompt.text}
                  </pre>
                </div>

                <button
                  onClick={() => handleCopy(prompt)}
                  className={`w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    copiedId === prompt.id
                      ? 'bg-green-500 text-white'
                      : 'bg-amber-600 text-stone-950 hover:bg-amber-500'
                  }`}
                >
                  {copiedId === prompt.id ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-16 bg-stone-900 border border-amber-800/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-amber-400">About Dark Academia</h2>
          <p className="text-stone-400 max-w-3xl mx-auto leading-relaxed">
            Dark academia romanticizes scholarly pursuits, classical literature, and the beauty of old institutions.
            Its visual language includes leather-bound books, candlelight, autumn leaves, Gothic architecture, and rich brown-gold tones.
            These prompts are optimized for AI image generators like Midjourney, Stable Diffusion, and Gemini.
          </p>
        </div>

        {/* Related Links */}
        <div className="mt-10 bg-stone-900 border border-amber-800/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-stone-100 mb-4">Explore More Aesthetics</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/prompts/coquette-aesthetic" className="text-amber-400 hover:underline">Coquette Aesthetic</a>
            <a href="/prompts/cyberpunk-2077-aesthetic" className="text-amber-400 hover:underline">Cyberpunk 2077 Aesthetic</a>
            <a href="/art-prompts/aesthetic" className="text-amber-400 hover:underline">Aesthetic Prompt Generator</a>
          </div>
        </div>
      </div>
    </div>
  );
}
