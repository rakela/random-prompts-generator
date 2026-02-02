import React, { useState, useMemo } from 'react';

interface EditPrompt {
  id: string;
  goal: string;
  goalTag: string;
  title: string;
  text: string;
  tip: string;
  color: string;
  bgColor: string;
}

const GOALS = ['All', 'Background', 'Fashion', 'Objects', 'Lighting', 'Weather', 'Style'] as const;

const goalColors: Record<string, { color: string; bg: string }> = {
  Background: { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  Fashion:    { color: 'text-red-700',  bg: 'bg-red-50 border-red-200' },
  Objects:    { color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' },
  Lighting:   { color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  Weather:    { color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  Style:      { color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
};

const prompts: EditPrompt[] = [
  {
    id: 'change-background',
    goal: 'Background',
    goalTag: 'Background',
    title: 'Cinematic Santorini Sunset',
    text: "Replace the background with a cinematic sunset over the Santorini coastline, keeping the subject in the foreground sharp and untouched.",
    tip: "Tip: Always specify 'keep the subject sharp' to prevent AI from modifying your main subject.",
    color: 'text-blue-600',
    bgColor: 'border-blue-100',
  },
  {
    id: 'change-clothing',
    goal: 'Fashion',
    goalTag: 'Fashion',
    title: 'High-Fashion Outfit Swap',
    text: "Change the subject's current outfit to a high-fashion black turtleneck and a beige trench coat, maintaining the same body pose.",
    tip: "Tip: Mention 'maintaining the same body pose' to preserve natural positioning.",
    color: 'text-red-600',
    bgColor: 'border-red-100',
  },
  {
    id: 'object-addition',
    goal: 'Objects',
    goalTag: 'Objects',
    title: 'Add Coffee Cup to Scene',
    text: "Add a realistic, steaming cup of coffee on the table next to the laptop, matching the existing lighting and shadows.",
    tip: "Tip: Describe the lighting match explicitly for better blending results.",
    color: 'text-yellow-600',
    bgColor: 'border-yellow-100',
  },
  {
    id: 'lighting-shift',
    goal: 'Lighting',
    goalTag: 'Lighting',
    title: 'Golden Hour Re-Light',
    text: "Re-light this scene to look like 'Golden Hour.' Add warm, orange-hued sunlight hitting the subject's face from the left side.",
    tip: "Tip: Specify light direction (left, right, above) for precise control over shadows.",
    color: 'text-amber-600',
    bgColor: 'border-amber-100',
  },
  {
    id: 'object-removal',
    goal: 'Objects',
    goalTag: 'Objects',
    title: 'Clean Background Removal',
    text: "Remove the people and the trash can in the background of this photo and seamlessly fill the space with more park grass and trees.",
    tip: "Tip: Tell the AI what to fill the space with — don't leave it to guess.",
    color: 'text-yellow-600',
    bgColor: 'border-yellow-100',
  },
  {
    id: 'weather-change',
    goal: 'Weather',
    goalTag: 'Weather',
    title: 'Add Falling Snow',
    text: "Make it look like it's snowing in this photo. Add soft falling snowflakes and a light dusting of frost on the ground and trees.",
    tip: "Tip: Use words like 'soft' and 'light dusting' to keep it realistic, not overdone.",
    color: 'text-green-600',
    bgColor: 'border-green-100',
  },
  {
    id: 'style-transfer',
    goal: 'Style',
    goalTag: 'Style',
    title: 'Oil Painting Style Transfer',
    text: "Transform this portrait into a professional oil painting in the style of John Singer Sargent, with visible brushstrokes and rich textures.",
    tip: "Tip: Reference a specific artist for a more consistent and recognizable style.",
    color: 'text-purple-600',
    bgColor: 'border-purple-100',
  },
  {
    id: 'face-hair-edit',
    goal: 'Style',
    goalTag: 'Face / Hair',
    title: 'Hairstyle & Accessories Edit',
    text: "Change the subject's hairstyle to a messy bun and add a pair of classic gold-rimmed aviator sunglasses.",
    tip: "Tip: Be specific about accessory style (gold-rimmed, classic) for realistic results.",
    color: 'text-purple-600',
    bgColor: 'border-purple-100',
  },
  {
    id: 'epic-expansion',
    goal: 'Background',
    goalTag: 'Expansion',
    title: 'Cinematic 16:9 Outpaint',
    text: "Outpaint this image to a 16:9 cinematic aspect ratio, extending the forest landscape on both the left and right sides.",
    tip: "Tip: Specify the exact aspect ratio and which sides to extend for precise framing.",
    color: 'text-blue-600',
    bgColor: 'border-blue-100',
  },
  {
    id: 'vintage-filter',
    goal: 'Style',
    goalTag: 'Vintage',
    title: '1970s Polaroid Filter',
    text: "Edit this photo to look like a faded 1970s Polaroid, with muted colors, high contrast, and a slightly blurry vignette.",
    tip: "Tip: Name a specific decade and film type for a more authentic retro feel.",
    color: 'text-purple-600',
    bgColor: 'border-purple-100',
  },
];

export default function GeminiEditingPrompts() {
  const [activeGoal, setActiveGoal] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeGoal === 'All') return prompts;
    return prompts.filter((p) => p.goal === activeGoal);
  }, [activeGoal]);

  const handleCopy = async (prompt: EditPrompt) => {
    await navigator.clipboard.writeText(prompt.text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
            <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" />
            <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Gemini AI Photo Editing Prompts
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Master Google's Magic Editor with these precise text commands. Copy, paste, edit.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Goal Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 justify-center">
          {GOALS.map((goal) => {
            const isActive = activeGoal === goal;
            const gc = goal !== 'All' ? goalColors[goal] : null;
            return (
              <button
                key={goal}
                onClick={() => setActiveGoal(goal)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  isActive
                    ? goal === 'All'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : `${gc?.bg} ${gc?.color} border`
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                {goal}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Prompt Cards (3 cols) */}
          <div className="lg:col-span-3">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-xl">No prompts match this filter.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {filtered.map((prompt) => {
                  const gc = goalColors[prompt.goal];
                  return (
                    <div
                      key={prompt.id}
                      className={`bg-white rounded-xl border ${prompt.bgColor} shadow-sm hover:shadow-md transition-shadow flex flex-col`}
                    >
                      <div className="p-5 flex flex-col flex-1">
                        {/* Goal Tag */}
                        <span
                          className={`self-start inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold mb-3 ${gc?.bg} ${gc?.color} border`}
                        >
                          {prompt.goalTag}
                        </span>

                        <h3 className="font-bold text-gray-900 text-lg mb-3">{prompt.title}</h3>

                        {/* Prompt Text */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5 mb-4 flex-1">
                          <p className="text-sm text-gray-700 leading-relaxed font-mono">{prompt.text}</p>
                        </div>

                        {/* Pro Tip */}
                        <p className="text-xs text-gray-400 italic mb-4">{prompt.tip}</p>

                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopy(prompt)}
                          className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
                            copiedId === prompt.id
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {copiedId === prompt.id ? 'Copied!' : 'Copy Command'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* How to Use */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">How to Use</h3>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
                  <span>Open <strong>Google Photos</strong> and select an image</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">2</span>
                  <span>Tap <strong>Magic Editor</strong> or "Edit with AI"</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-xs font-bold">3</span>
                  <span>Paste any prompt from this page into the text field</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">4</span>
                  <span>Review the result and iterate if needed</span>
                </li>
              </ol>
              <p className="mt-4 text-xs text-gray-400">
                Works best with <strong>Gemini Advanced</strong> and the latest Google Photos app.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-2">Can't find the right edit?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Use our Random Prompt Generator to discover creative styles and editing ideas.
              </p>
              <a
                href="/"
                className="inline-block w-full text-center bg-white text-blue-700 font-semibold text-sm py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Try the Prompt Generator
              </a>
            </div>

            {/* Keywords / Info */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-3">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['AI inpainting', 'Magic Editor', 'Background replacement', 'AI photo editing', 'Gemini prompts', 'Google Photos AI'].map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
