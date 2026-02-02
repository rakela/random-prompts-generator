import React, { useState, useEffect, useMemo } from 'react';

interface Prompt {
  id: string;
  category: string;
  title: string;
  text: string;
  tier: 'fast' | 'thinking';
  gradient: string;
}

const prompts: Prompt[] = [
  {
    id: 'photorealism',
    category: 'Photorealism',
    title: 'Tokyo Street Vendor',
    text: "80s Kodak film photo of a street vendor in Tokyo, slight film grain, warm color grading, candid moment, shallow depth of field, 35mm lens.",
    tier: 'fast',
    gradient: 'from-amber-700 to-orange-900',
  },
  {
    id: 'text-in-image',
    category: 'Text-in-Image',
    title: 'Neon Stay Curious',
    text: "A minimalist neon sign on a brick wall that says 'STAY CURIOUS' in sharp, glowing pink sans-serif font. Cinematic night lighting, 8k resolution.",
    tier: 'fast',
    gradient: 'from-pink-600 to-purple-900',
  },
  {
    id: 'branding-logo',
    category: 'Branding / Logo',
    title: 'Solana Coffee Kit',
    text: "A professional branding kit for 'Solana Coffee' including: a minimalist logo on a business card, a paper coffee cup with the logo, and a clean typography sheet.",
    tier: 'thinking',
    gradient: 'from-emerald-700 to-teal-900',
  },
  {
    id: 'product-shot',
    category: 'Product Shot',
    title: 'Glass Perfume Bottle',
    text: "High-end product photography of a glass perfume bottle on a reflective black marble surface. Sharp rim lighting, water droplets on the glass, 4k macro shot.",
    tier: 'fast',
    gradient: 'from-gray-700 to-gray-900',
  },
  {
    id: 'character-cc',
    category: 'Character C.C.',
    title: 'Blue Hair London Rain',
    text: "Maintain 100% identity: A woman with short blue hair and a silver ear piercing, wearing a yellow raincoat in a rainy London street, cinematic lighting.",
    tier: 'thinking',
    gradient: 'from-blue-700 to-indigo-900',
  },
  {
    id: 'character-art',
    category: 'Character (Art)',
    title: 'Ghibli Watercolor Sky',
    text: "GHIBSKY style illustration of a dreamy watercolor sky with soft cumulus clouds and a pastel gradient. Ghibli-inspired aesthetic, gentle lighting.",
    tier: 'fast',
    gradient: 'from-sky-400 to-rose-300',
  },
  {
    id: 'hyper-real-edit',
    category: 'Hyper-Real Edit',
    title: 'Santa Hat Blend',
    text: "Upload [Image]: Add a realistic Santa hat to every person in this photo. Blend the lighting and texture of the hat to match the original image exactly.",
    tier: 'thinking',
    gradient: 'from-red-700 to-red-900',
  },
  {
    id: 'logic-infographic',
    category: 'Logic / Infographic',
    title: 'Star Lifecycle Infographic',
    text: "Create a clean, high-resolution infographic titled 'The Lifecycle of a Star.' Include labeled sections for Nebula, Protostar, and Supernova. High readability.",
    tier: 'thinking',
    gradient: 'from-violet-700 to-indigo-900',
  },
  {
    id: 'zootopia-style',
    category: 'Zootopia Style',
    title: 'Golden Retriever Officer',
    text: "Create an ultra-realistic 'Zootopia' version of a golden retriever wearing a police uniform, standing in a futuristic animal city. Disney-Pixar 3D style.",
    tier: 'fast',
    gradient: 'from-yellow-500 to-amber-700',
  },
  {
    id: 'retro-portrait',
    category: 'Retro-Portrait',
    title: '90s Mall Couple',
    text: "A 1990s mall studio portrait of a young couple. Soft focus, mottled blue backdrop, awkward posing, authentic 90s fashion and hair textures.",
    tier: 'fast',
    gradient: 'from-cyan-600 to-blue-800',
  },
];

export default function NanoBananaPrompts() {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'fast' | 'thinking'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  // Load likes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nanobanana-likes');
      if (stored) setLikes(JSON.parse(stored));
    } catch {}
  }, []);

  // Persist likes
  useEffect(() => {
    try {
      localStorage.setItem('nanobanana-likes', JSON.stringify(likes));
    } catch {}
  }, [likes]);

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchesTier = tierFilter === 'all' || p.tier === tierFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.text.toLowerCase().includes(q);
      return matchesTier && matchesSearch;
    });
  }, [search, tierFilter]);

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleLike = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <div className="border-b border-yellow-500/20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-10 text-center">
          <p className="text-yellow-400 font-mono text-sm tracking-widest uppercase mb-3">2026 AI Trends</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-yellow-400">Nanobanana</span> Prompts Library
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Copy-paste prompts for photorealism, branding, character consistency, infographics, and more. Filter by Fast or Thinking model.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Search + Toggle Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-900 border-2 border-yellow-500/30 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors text-lg"
            />
          </div>

          {/* Model Toggle */}
          <div className="flex rounded-xl overflow-hidden border-2 border-yellow-500/30 shrink-0">
            {(['all', 'fast', 'thinking'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`px-5 py-3 text-sm font-semibold capitalize transition-colors ${
                  tierFilter === t
                    ? 'bg-yellow-500 text-gray-950'
                    : 'bg-gray-900 text-gray-400 hover:text-yellow-400'
                }`}
              >
                {t === 'all' ? 'All' : t === 'fast' ? 'Fast' : 'Thinking'}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No prompts found.</p>
            <p className="text-sm mt-2">Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-gray-900 border border-yellow-500/15 rounded-2xl overflow-hidden hover:border-yellow-500/40 transition-all duration-200 flex flex-col"
              >
                {/* Image Preview */}
                <div className={`aspect-square bg-gradient-to-br ${prompt.gradient} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/60 text-6xl font-black select-none">
                      {prompt.category.charAt(0)}
                    </span>
                  </div>
                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        prompt.tier === 'fast'
                          ? 'bg-yellow-400/90 text-gray-950'
                          : 'bg-gray-950/80 text-yellow-400 border border-yellow-500/50'
                      }`}
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
                      {prompt.tier === 'fast' ? 'Nano Banana' : 'Nano Banana Pro'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-yellow-500/70 text-xs font-semibold uppercase tracking-wider mb-1">
                    {prompt.category}
                  </p>
                  <h3 className="text-lg font-bold text-gray-100 mb-3">{prompt.title}</h3>

                  {/* Prompt code block */}
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 mb-4 flex-1">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed">
                      {prompt.text}
                    </pre>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-auto">
                    <button
                      onClick={() => handleCopy(prompt)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                        copiedId === prompt.id
                          ? 'bg-green-500 text-white'
                          : 'bg-yellow-500 text-gray-950 hover:bg-yellow-400'
                      }`}
                    >
                      {copiedId === prompt.id ? 'Copied!' : 'Copy Prompt'}
                    </button>

                    <button
                      onClick={() => handleLike(prompt.id)}
                      className="flex items-center gap-1.5 text-gray-500 hover:text-yellow-400 transition-colors text-sm"
                    >
                      <svg
                        className="w-5 h-5"
                        fill={likes[prompt.id] ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className={likes[prompt.id] ? 'text-yellow-400' : ''}>
                        {likes[prompt.id] || 0}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guide Section */}
        <div className="mt-20 border-t border-yellow-500/20 pt-14">
          <h2 className="text-2xl font-bold text-center mb-8">
            How to use <span className="text-yellow-400">Nanobanana</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-yellow-500/15 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold text-yellow-400 mb-2">Subject</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Define your main subject clearly. Be specific about who or what should appear: a person, object, scene, or concept. Specificity drives quality.
              </p>
            </div>
            <div className="bg-gray-900 border border-yellow-500/15 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold text-yellow-400 mb-2">Lighting</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Lighting sets mood. Specify golden hour, neon, rim lighting, or cinematic. This single parameter can change the entire feel of your output.
              </p>
            </div>
            <div className="bg-gray-900 border border-yellow-500/15 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold text-yellow-400 mb-2">Reasoning Logic</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                For complex prompts (branding kits, edits, infographics), use a Thinking model. It plans layout, consistency, and composition before generating.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
