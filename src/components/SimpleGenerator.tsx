import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, BookOpen, Lightbulb, HelpCircle, ExternalLink } from 'lucide-react';

// Simple generator data for basic generators
interface GeneratorData {
  intro: string;
  howItWorks: string;
  useCases: string[];
  faq: Array<{ question: string; answer: string }>;
  internalLinks: Array<{ text: string; url: string }>;
  externalLinks: Array<{ text: string; url: string }>;
  templates: string[];
  elements: Record<string, string[]>;
}

// Comprehensive generator data - includes placeholder data for all 30 generators
const GENERATOR_DATA: Record<string, GeneratorData> = {
  'random-paragraph-generator': {
    intro: 'Our random paragraph generator creates instant, readable paragraphs you can use for writing practice, warm-ups, and creative exercises. Each paragraph is built from natural-sounding sentences so it feels like real text, not lorem ipsum.',
    howItWorks: 'This random paragraph generator combines character actions, settings, objects, and emotions into coherent mini-scenes. Instead of purely random words, it uses structured templates and curated phrases so each paragraph has a clear focus.',
    useCases: [
      'Daily writing warm-ups',
      'Practice editing and rewriting',
      'ESL and language learning exercises',
      'Inspiration for stories, essays, and blog posts'
    ],
    faq: [
      { question: 'What can I use the random paragraphs for?', answer: 'You can use them as writing prompts, practice material, or starting points for stories, essays, and blog posts.' },
      { question: 'Are the paragraphs unique each time?', answer: 'Yes. Each click generates a new combination of sentences, so you can get unlimited variations.' },
      { question: 'Can I use the content commercially?', answer: 'Yes, you can build on these paragraphs in your own projects. They\'re meant as creative starting points.' }
    ],
    internalLinks: [
      { text: 'Writing Prompts', url: '/writing-prompts' },
      { text: 'Short Story Prompts', url: '/short-story-prompts-generator' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Writing Prompts', url: 'https://www.writersdigest.com/write-better-fiction/prompts' },
      { text: 'The Write Practice – Writing Exercises', url: 'https://thewritepractice.com/creative-writing-prompts/' }
    ],
    templates: [
      '{character} {action} in {location}, {feeling} about {concern}. {object_desc} lay nearby, {state}. {thought}',
      'The {weather} made everything feel {mood}. {character} {action}, thinking about {past_event}. {decision}',
      '{character} had always {belief}, but {contrast}. Now, {action} in {location}, {realization}.'
    ],
    elements: {
      character: ['The wanderer', 'An old friend', 'A stranger', 'The detective', 'A young artist', 'The traveler'],
      action: ['walked slowly', 'sat quietly', 'stood watching', 'moved carefully', 'waited patiently'],
      location: ['the empty street', 'a crowded café', 'the forest edge', 'an old library', 'the train station'],
      feeling: ['uncertain', 'hopeful', 'worried', 'curious', 'determined', 'nostalgic'],
      concern: ['what came next', 'the missing letter', 'yesterday\'s conversation', 'the unopened door'],
      object_desc: ['A leather journal', 'An old photograph', 'A brass key', 'A folded map'],
      state: ['forgotten since morning', 'placed there deliberately', 'discovered by chance'],
      thought: ['The answer felt close.', 'Everything was about to change.', 'Time was running out.'],
      weather: ['autumn rain', 'morning fog', 'evening light', 'winter chill'],
      mood: ['distant', 'intimate', 'mysterious', 'melancholic'],
      past_event: ['last summer', 'the accident', 'their first meeting', 'the promise'],
      decision: ['It was time to move forward.', 'There was no turning back.', 'The choice was made.'],
      belief: ['believed in second chances', 'thought people never changed', 'trusted too easily'],
      contrast: ['today challenged everything', 'evidence suggested otherwise', 'the truth was different'],
      realization: ['they understood at last', 'the pattern became clear', 'nothing would be the same']
    }
  },

  // Default/fallback data for other generators
  'default': {
    intro: 'Generate creative prompts instantly with our free random generator. Perfect for writers, artists, and creative minds looking for inspiration.',
    howItWorks: 'This generator combines curated elements using randomized templates to create unique, inspiring prompts. Click the generate button to create a new prompt, and use the copy button to save your favorites.',
    useCases: [
      'Creative writing practice',
      'Overcoming creative blocks',
      'Daily inspiration and prompts',
      'Brainstorming and ideation'
    ],
    faq: [
      { question: 'How does this generator work?', answer: 'It combines curated word lists and templates to create unique, meaningful prompts each time.' },
      { question: 'Can I use the prompts commercially?', answer: 'Yes, all generated prompts can be used for personal or commercial projects.' },
      { question: 'Are the prompts unique?', answer: 'Each generation creates a new combination, giving you virtually unlimited unique prompts.' }
    ],
    internalLinks: [
      { text: 'Writing Prompts', url: '/writing-prompts' },
      { text: 'AI Art Prompts', url: '/ai-images-prompt' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest', url: 'https://www.writersdigest.com/' },
      { text: 'Creative Bloq', url: 'https://www.creativebloq.com/' }
    ],
    templates: [
      '{adj} {noun} in a {setting}',
      '{character} discovers {object}',
      'A story about {concept} and {emotion}'
    ],
    elements: {
      adj: ['mysterious', 'ancient', 'forgotten', 'hidden', 'unusual', 'curious'],
      noun: ['artifact', 'message', 'door', 'path', 'secret', 'memory'],
      setting: ['misty forest', 'abandoned city', 'quiet village', 'endless desert'],
      character: ['a detective', 'an artist', 'a wanderer', 'a scholar'],
      object: ['an old map', 'a strange key', 'a faded photograph', 'a mysterious letter'],
      concept: ['time', 'identity', 'memory', 'destiny', 'truth'],
      emotion: ['hope', 'loss', 'wonder', 'courage', 'fear']
    }
  }
};

interface SimpleGeneratorProps {
  generatorKey: string;
}

const SimpleGenerator: React.FC<SimpleGeneratorProps> = ({ generatorKey }) => {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [copiedMessage, setCopiedMessage] = useState<string>('');

  // Get generator data (use default if specific key not found)
  const data = GENERATOR_DATA[generatorKey] || GENERATOR_DATA['default'];

  const generateContent = useCallback(() => {
    // Pick a random template
    const template = data.templates[Math.floor(Math.random() * data.templates.length)];

    // Replace all placeholders
    let result = template;
    const placeholderRegex = /\{(\w+)\}/g;
    result = result.replace(placeholderRegex, (match, key) => {
      const options = data.elements[key];
      if (options && options.length > 0) {
        return options[Math.floor(Math.random() * options.length)];
      }
      return match;
    });

    setGeneratedContent(result);
  }, [data]);

  const copyToClipboard = useCallback(async () => {
    if (!generatedContent) return;

    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopiedMessage('Copied to clipboard!');
      setTimeout(() => setCopiedMessage(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopiedMessage('Failed to copy');
      setTimeout(() => setCopiedMessage(''), 2000);
    }
  }, [generatedContent]);

  // Auto-generate on mount
  React.useEffect(() => {
    generateContent();
  }, [generateContent]);

  return (
    <div className="space-y-12">
      {/* Generator Section */}
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Generate</h2>
          <button
            onClick={generateContent}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <RefreshCw size={18} />
            Generate
          </button>
        </div>

        {generatedContent && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
                {generatedContent}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Copy size={16} />
                Copy
              </button>
              {copiedMessage && (
                <span className="text-sm text-green-600 font-medium">{copiedMessage}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <section className="prose prose-gray max-w-none">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-0">How It Works</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">{data.howItWorks}</p>
      </section>

      {/* Use Cases Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Lightbulb className="text-purple-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Best Ways to Use This Generator</h2>
        </div>
        <ul className="space-y-2">
          {data.useCases.map((useCase, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-gray-700">{useCase}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <HelpCircle className="text-green-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {data.faq.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Helpful Resources</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Internal Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">More Generators</h3>
            <div className="space-y-2">
              {data.internalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
            <div className="space-y-2">
              {data.externalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {link.text}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleGenerator;
