import React, { useState } from 'react';

interface Prompt {
  id: string;
  title: string;
  text: string;
}

const prompts: Prompt[] = [
  {
    id: 'the-vanity',
    title: 'The Vanity',
    text: "A vintage white wooden vanity with a large oval mirror. Scattered across the surface are silk pink ribbons, a pearl necklace, a half-eaten bowl of bright red cherries, and an antique gold perfume bottle. Soft morning sunlight, coquette aesthetic, 8k macro photography.",
  },
  {
    id: 'the-picnic',
    title: 'The Picnic',
    text: "A flat-lay of a dainty picnic on a lace blanket. A heart-shaped cake with pink frosting, a vintage teacup with gold trim, and a small bouquet of baby's breath tied with a satin bow. Dreamy, nostalgic lighting.",
  },
  {
    id: 'the-portrait',
    title: 'The Portrait',
    text: "A close-up portrait of a girl with soft wavy hair tied with two oversized pink silk bows. She is wearing a delicate white lace dress. Soft-focus background, ethereal glow, pastel color palette.",
  },
  {
    id: 'the-bedroom',
    title: 'The Bedroom',
    text: "A cozy bedroom corner with a wrought-iron bed frame, white linen bedding, and a wall covered in vintage floral wallpaper. A pair of pink ballet slippers hangs from the bedpost. Coquette core, cinematic soft lighting.",
  },
  {
    id: 'the-tea',
    title: 'The Tea',
    text: "A hand holding a vintage floral teacup, pink tea inside. Delicate lace sleeves are visible. Small bows tied around the fingers. High-fashion editorial style, coquette aesthetic.",
  },
  {
    id: 'the-stationery',
    title: 'The Stationery',
    text: "An open leather-bound journal with a handwritten letter. A pressed rose and a pink ribbon bookmark. Scattered pearls and a fountain pen nearby. Moody but soft lighting.",
  },
  {
    id: 'the-floral',
    title: 'The Floral',
    text: "A white porcelain vase filled with pink peonies and tulips. A single silk bow tied around the neck of the vase. Grainy film aesthetic, vintage 90s photography style.",
  },
  {
    id: 'the-shoes',
    title: 'The Shoes',
    text: "A pair of white platform Mary Janes with frilly lace socks, standing on a bed of rose petals. Soft pink lighting, high-detail texture.",
  },
  {
    id: 'the-cake',
    title: 'The Cake',
    text: "A hyper-realistic heart-shaped 'Lambeth' cake with intricate white and pink piping. 'Love' written in red cursive. Cinematic lighting, soft bokeh background.",
  },
  {
    id: 'the-accessory',
    title: 'The Accessory',
    text: "A stack of vintage books tied together with a pink satin ribbon, topped with a pair of gold-rimmed glasses and a single pearl. Soft, romantic atmosphere.",
  },
];

export default function CoquetteAestheticPrompts() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-b from-pink-100 via-pink-50 to-white border-b border-pink-200">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-10 text-center">
          <p className="text-pink-400 font-serif text-sm tracking-widest uppercase mb-3">Aesthetic Collection</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-pink-500">Coquette</span> Aesthetic AI Prompts
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Soft pinks, lace, vintage femininity, and dainty details. 10 curated AI image prompts for the coquette aesthetic.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white border border-pink-200 rounded-2xl overflow-hidden hover:border-pink-400 hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {/* Image Preview */}
              <div className="aspect-[4/3] bg-gradient-to-br from-pink-200 via-rose-100 to-pink-300 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-pink-400/50 text-6xl font-serif select-none">
                    {prompt.title.split(' ')[1]?.charAt(0) || prompt.title.charAt(0)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-pink-500 border border-pink-200">
                    Coquette
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{prompt.title}</h3>

                <div className="bg-pink-50 border border-pink-100 rounded-lg p-3 mb-4 flex-1">
                  <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono leading-relaxed">
                    {prompt.text}
                  </pre>
                </div>

                <button
                  onClick={() => handleCopy(prompt)}
                  className={`w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    copiedId === prompt.id
                      ? 'bg-green-500 text-white'
                      : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  {copiedId === prompt.id ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-16 bg-white border border-pink-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">About the Coquette Aesthetic</h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The coquette aesthetic celebrates soft femininity through vintage details, pastel palettes, and delicate textures.
            Inspired by French romanticism and old-money elegance, it features lace, silk ribbons, pearls, bows, and blush pink tones.
            These prompts are optimized for AI image generators like Midjourney, Stable Diffusion, and Gemini.
          </p>
        </div>

        {/* Related Links */}
        <div className="mt-10 bg-white border border-pink-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More Aesthetics</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/prompts/dark-academia-aesthetic" className="text-pink-600 hover:underline">Dark Academia Aesthetic</a>
            <a href="/prompts/cyberpunk-2077-aesthetic" className="text-pink-600 hover:underline">Cyberpunk 2077 Aesthetic</a>
            <a href="/art-prompts/aesthetic" className="text-pink-600 hover:underline">Aesthetic Prompt Generator</a>
          </div>
        </div>
      </div>
    </div>
  );
}
