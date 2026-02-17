import React, { useState } from 'react';

interface Prompt {
  id: string;
  text: string;
}

interface PromptCategory {
  id: string;
  emoji: string;
  title: string;
  color: string;
  bgColor: string;
  prompts: Prompt[];
}

const promptCategories: PromptCategory[] = [
  {
    id: 'grounding',
    emoji: '🌅',
    title: 'Grounding & Awareness',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    prompts: [
      { id: 'grounding-1', text: 'What emotion is most present in me this morning—and where do I feel it in my body?' },
      { id: 'grounding-2', text: 'What did my mind linger on as I woke up, and what might that say about my current priorities?' },
      { id: 'grounding-3', text: 'If today had a "weather forecast," what would it be and why?' },
      { id: 'grounding-4', text: "What am I carrying into today that doesn't actually belong to today?" },
    ],
  },
  {
    id: 'focus',
    emoji: '🎯',
    title: 'Focus & Intention',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    prompts: [
      { id: 'focus-1', text: "What would make today feel meaningful, even if it's not productive?" },
      { id: 'focus-2', text: 'What is one small decision today that could improve my next week?' },
      { id: 'focus-3', text: 'If I could only do three things today, what should they be—and why those?' },
      { id: 'focus-4', text: 'What am I tempted to rush today, and what would happen if I slowed that down?' },
    ],
  },
  {
    id: 'mindset',
    emoji: '🧠',
    title: 'Mindset & Inner Dialogue',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    prompts: [
      { id: 'mindset-1', text: 'What story am I telling myself about today before it has even started?' },
      { id: 'mindset-2', text: 'What assumption am I making that might not be true?' },
      { id: 'mindset-3', text: 'If my inner critic speaks up today, what does it usually say—and how can I respond differently?' },
      { id: 'mindset-4', text: 'What belief about myself is being tested lately?' },
    ],
  },
  {
    id: 'growth',
    emoji: '🌱',
    title: 'Growth & Alignment',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    prompts: [
      { id: 'growth-1', text: 'What part of me is asking for more attention right now?' },
      { id: 'growth-2', text: 'What would "showing up as my future self" look like today—in one concrete action?' },
      { id: 'growth-3', text: 'What discomfort might actually be pointing me in the right direction?' },
      { id: 'growth-4', text: 'Where am I currently choosing familiarity over growth?' },
    ],
  },
  {
    id: 'energy',
    emoji: '💛',
    title: 'Energy & Self-Care',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    prompts: [
      { id: 'energy-1', text: 'What usually drains my energy early in the day, and how can I protect myself from that today?' },
      { id: 'energy-2', text: 'What would nourish me today that has nothing to do with achievement?' },
      { id: 'energy-3', text: 'How do I want to feel by the end of today—and what supports that feeling?' },
      { id: 'energy-4', text: 'What does my body need from me this morning?' },
    ],
  },
  {
    id: 'reflection',
    emoji: '🔄',
    title: 'Reflection-in-Advance',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    prompts: [
      { id: 'reflection-1', text: 'When I look back on today tonight, what would I regret not doing?' },
      { id: 'reflection-2', text: 'What moment today deserves my full presence?' },
      { id: 'reflection-3', text: 'If today were a chapter in my life, what would I want it to be about?' },
      { id: 'reflection-4', text: "What am I learning right now that I shouldn't rush past?" },
    ],
  },
];

const inspiringWords = [
  'Breathe', 'Begin', 'Grow', 'Shine', 'Create', 'Trust', 'Flow', 'Rise',
  'Dream', 'Believe', 'Bloom', 'Discover', 'Embrace', 'Evolve', 'Flourish',
  'Inspire', 'Journey', 'Nurture', 'Radiate', 'Thrive', 'Wonder', 'Awaken'
];

export default function MorningJournalPrompts() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.text);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-gray-900">
      {/* Floating Inspiring Words Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.04] select-none">
        <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-8 p-8 transform rotate-[-5deg] scale-110">
          {inspiringWords.map((word, i) => (
            <span
              key={i}
              className="text-4xl md:text-6xl font-bold text-amber-900"
              style={{ transform: `rotate(${(i % 5) * 3 - 6}deg)` }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-50 border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-4 pt-14 pb-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm border border-amber-200">
            <span className="text-2xl">☀️</span>
            <span className="text-amber-700 font-medium text-sm">Start Your Day with Intention</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            morning journal prompts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Begin each day with clarity and purpose. These <strong>morning journal prompts</strong> help you connect with your thoughts, set intentions, and cultivate mindfulness before the day unfolds.
          </p>
        </div>

        {/* Decorative sunrise rays */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-50"></div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-4xl mx-auto px-4 py-10 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm border border-amber-200 rounded-2xl p-6 md:p-8 mb-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Morning Journal Prompts?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Morning journal prompts</strong> are designed to help you start your day with intention and self-awareness. Instead of reaching for your phone or jumping straight into tasks, taking a few minutes to reflect can transform how you experience your entire day.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Research shows that morning journaling reduces anxiety, increases focus, and helps you make better decisions throughout the day. These <strong>morning journal prompts</strong> are organized into six categories to address different aspects of your inner life—from emotional awareness to practical planning.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Pick one or two prompts that resonate with you each morning, or work through an entire category when you have more time. There are no rules—just honest reflection.
          </p>
        </div>

        {/* How to Use */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use These Morning Journal Prompts</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <span>Choose a quiet moment before your day begins—with your coffee, tea, or in stillness</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <span>Pick 1-3 <strong>morning journal prompts</strong> that feel relevant to where you are today</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <span>Write freely without judgment—aim for 5-10 minutes of honest reflection</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <span>Notice any insights or intentions that emerge, and carry them into your day</span>
            </li>
          </ol>
        </div>

        {/* Prompt Categories */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">24 Morning Journal Prompts for a Meaningful Day</h2>

        <div className="space-y-8 mb-12">
          {promptCategories.map((category) => (
            <div key={category.id} className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              {/* Category Header */}
              <div className={`${category.bgColor} px-6 py-4 border-b border-gray-200`}>
                <h3 className={`text-xl font-bold ${category.color} flex items-center gap-2`}>
                  <span className="text-2xl">{category.emoji}</span>
                  {category.title}
                </h3>
              </div>

              {/* Prompts Grid */}
              <div className="p-6 grid gap-4">
                {category.prompts.map((prompt, index) => (
                  <div
                    key={prompt.id}
                    className="group bg-gray-50 hover:bg-white border border-gray-200 hover:border-amber-300 rounded-xl p-4 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <span className={`flex-shrink-0 w-8 h-8 ${category.bgColor} ${category.color} rounded-full flex items-center justify-center text-sm font-bold`}>
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-800 leading-relaxed">{prompt.text}</p>
                        <button
                          onClick={() => handleCopy(prompt)}
                          className={`mt-3 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                            copiedId === prompt.id
                              ? 'bg-green-500 text-white'
                              : 'bg-amber-100 hover:bg-amber-200 text-amber-700'
                          }`}
                        >
                          {copiedId === prompt.id ? 'Copied!' : 'Copy Prompt'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Morning Journal Prompts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-xl">✨</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Increased Self-Awareness</h4>
                  <p className="text-gray-600 text-sm">Morning journal prompts help you notice patterns in your thoughts and emotions before they run your day.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Clearer Priorities</h4>
                  <p className="text-gray-600 text-sm">Journaling in the morning helps you identify what truly matters before distractions take over.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-xl">💆</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Reduced Anxiety</h4>
                  <p className="text-gray-600 text-sm">Writing down worries and concerns releases them from your mind, creating space for clarity.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-xl">🌱</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Personal Growth</h4>
                  <p className="text-gray-600 text-sm">Regular reflection accelerates learning from experiences and supports lasting change.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Better Decision-Making</h4>
                  <p className="text-gray-600 text-sm">When you start the day grounded, you respond rather than react to challenges.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-xl">🙏</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Gratitude & Presence</h4>
                  <p className="text-gray-600 text-sm">Morning journaling cultivates appreciation for the present moment and what you have.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for Effective Morning Journaling</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1 font-bold">•</span>
              <span><strong>Keep your journal accessible</strong> — leave it on your nightstand or desk where you'll see it first thing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1 font-bold">•</span>
              <span><strong>Don't overthink it</strong> — these morning journal prompts work best when you write quickly and honestly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1 font-bold">•</span>
              <span><strong>Start small</strong> — even 5 minutes of journaling can shift your entire day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1 font-bold">•</span>
              <span><strong>Be consistent</strong> — the magic happens when morning journaling becomes a daily ritual</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1 font-bold">•</span>
              <span><strong>Review occasionally</strong> — looking back at past entries reveals growth and recurring themes</span>
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">How long should I spend on morning journal prompts?</h3>
              <p className="text-gray-600 text-sm">Start with 5-10 minutes. Quality matters more than quantity. Some days a single prompt will spark deep reflection; other days you might breeze through several. Trust your intuition.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Should I answer the same morning journal prompts daily?</h3>
              <p className="text-gray-600 text-sm">Both approaches work. Rotating through different prompts keeps things fresh and explores different aspects of your inner life. Repeating the same prompt daily reveals how your answers evolve over time.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">What if I don't know how to answer a prompt?</h3>
              <p className="text-gray-600 text-sm">Start with "I don't know..." and keep writing. Often the act of writing unlocks thoughts you didn't know you had. If a prompt doesn't resonate, skip it and try another.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Can I use these prompts digitally or do I need paper?</h3>
              <p className="text-gray-600 text-sm">Both work. Paper journaling can feel more reflective and helps you disconnect from screens. Digital journaling is convenient and searchable. Choose what you'll actually do consistently.</p>
            </div>
          </div>
        </div>

        {/* Internal Links */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More Prompt Collections</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <a href="/writing-prompts-generator/journaling" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-amber-400 transition-colors">
              <span className="font-medium text-gray-900">Journaling Prompts Generator</span>
              <p className="text-sm text-gray-500 mt-1">Random journaling prompts for any time of day</p>
            </a>
            <a href="/writing-prompts-generator/story-starters" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-amber-400 transition-colors">
              <span className="font-medium text-gray-900">Story Starters</span>
              <p className="text-sm text-gray-500 mt-1">Creative writing prompts to spark your imagination</p>
            </a>
            <a href="/october-writing-prompts" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-amber-400 transition-colors">
              <span className="font-medium text-gray-900">October Writing Prompts</span>
              <p className="text-sm text-gray-500 mt-1">Seasonal prompts for fall reflection</p>
            </a>
            <a href="/writing-prompts-for-students" className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-amber-400 transition-colors">
              <span className="font-medium text-gray-900">Writing Prompts for Students</span>
              <p className="text-sm text-gray-500 mt-1">Educational prompts for classroom journaling</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
