import React, { useState } from 'react';

interface Prompt {
  id: string;
  title: string;
  text: string;
}

const prompts: Prompt[] = [
  {
    id: 'night-city-street',
    title: 'The Night City Street',
    text: "A rain-slicked street in Night City at midnight. Neon signs in Japanese and English reflecting in puddles. A flying vehicle passing between massive skyscrapers. Hyper-realistic, 8k, vibrant pink and cyan lighting.",
  },
  {
    id: 'the-cyborg',
    title: 'The Cyborg',
    text: "A portrait of a person with visible golden cybernetic implants on their face and neck. They are wearing a high-collar tech-wear jacket with glowing fiber-optic seams. Blue neon backlight, gritty texture.",
  },
  {
    id: 'the-arcade',
    title: 'The Arcade',
    text: "A futuristic neon-drenched arcade in a basement. Holographic games being played by shadows in hoods. Smoke-filled air, retro-future cyberpunk style.",
  },
  {
    id: 'the-vehicle',
    title: 'The Vehicle',
    text: "A low-slung, brutalist black supercar with glowing red taillights parked under a flickering neon 'Hotel' sign. Cinematic steam rising from the vents.",
  },
  {
    id: 'the-market',
    title: 'The Market',
    text: "An outdoor night market in a mega-city. Stalls selling robotic limbs and synthetic street food. Colorful holograms, crowded, chaotic, high-detail urban environment.",
  },
  {
    id: 'the-hacker',
    title: 'The Hacker',
    text: "A close-up of hands typing on a glowing holographic keyboard. Data streams reflecting in the user's chrome-plated eyes. Matrix-green and neon-purple palette.",
  },
  {
    id: 'the-skyline',
    title: 'The Skyline',
    text: "A panoramic view of a futuristic skyline with massive corporate pyramids. Dense fog at the base, neon lights piercing through the clouds. Cyberpunk 2077 aesthetic.",
  },
  {
    id: 'the-apartment',
    title: 'The Apartment',
    text: "A small, cluttered apartment with a wall-sized window overlooking a neon city. A high-tech PC setup with three monitors and a messy bed. 'Low-life, high-tech' vibes.",
  },
  {
    id: 'the-cyber-dog',
    title: 'The Cyber-Dog',
    text: "A robotic Doberman with glowing red eyes and carbon-fiber plating, standing guard in a dark industrial alleyway. Rain falling, cinematic lighting.",
  },
  {
    id: 'the-bar',
    title: 'The Bar',
    text: "The interior of a high-end cyberpunk bar. The bar counter is made of glass with swimming digital fish inside. Patrons with body modifications drinking glowing blue cocktails.",
  },
];

export default function CyberpunkPrompts() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-10 text-center">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">Aesthetic Collection</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Cyberpunk 2077</span> Aesthetic AI Prompts
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Neon lights, chrome implants, rain-slicked streets, and high-tech dystopia. 10 curated AI image prompts for the cyberpunk aesthetic.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-gray-900 border border-cyan-500/15 rounded-2xl overflow-hidden hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-200 flex flex-col"
            >
              {/* Image Preview */}
              <div className="aspect-[4/3] bg-gradient-to-br from-cyan-900 via-gray-900 to-pink-900 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-cyan-400/30 text-6xl font-mono font-black select-none">
                    {prompt.title.split(' ')[1]?.charAt(0) || prompt.title.charAt(0)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-950/80 text-cyan-400 border border-cyan-500/50">
                    Cyberpunk
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-100 mb-3">{prompt.title}</h3>

                <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 mb-4 flex-1">
                  <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed">
                    {prompt.text}
                  </pre>
                </div>

                <button
                  onClick={() => handleCopy(prompt)}
                  className={`w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    copiedId === prompt.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:from-cyan-400 hover:to-pink-400'
                  }`}
                >
                  {copiedId === prompt.id ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-16 bg-gray-900 border border-cyan-500/15 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">About the Cyberpunk Aesthetic</h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Cyberpunk envisions a future of advanced technology and societal decay — "high tech, low life."
            Its visual language includes neon-drenched cityscapes, chrome body modifications, holographic interfaces, and rain-soaked urban environments.
            These prompts are optimized for AI image generators like Midjourney, Stable Diffusion, and Gemini.
          </p>
        </div>

        {/* Related Links */}
        <div className="mt-10 bg-gray-900 border border-cyan-500/15 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-100 mb-4">Explore More Aesthetics</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/prompts/coquette-aesthetic" className="text-cyan-400 hover:underline">Coquette Aesthetic</a>
            <a href="/prompts/dark-academia-aesthetic" className="text-cyan-400 hover:underline">Dark Academia Aesthetic</a>
            <a href="/art-prompts/aesthetic" className="text-cyan-400 hover:underline">Aesthetic Prompt Generator</a>
          </div>
        </div>
      </div>
    </div>
  );
}
