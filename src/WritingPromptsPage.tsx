import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SEO from './components/SEO';

// High-quality data dictionaries for generation
const promptData = {
  writing: {
    // Story structures and hooks
    openings: [
      'A mysterious letter arrives with no return address',
      'The last person on Earth hears a knock at the door',
      'Your character wakes up with someone else\'s memories',
      'A child finds a door in their bedroom that wasn\'t there yesterday',
      'The GPS leads your character to a place that doesn\'t exist on any map',
      'Your character receives a phone call from themselves',
      'A time capsule is opened 50 years early',
      'Your character discovers their reflection is acting independently',
      'A stranger approaches claiming to be from the future',
      'Your character finds a diary that predicts their life perfectly'
    ],

    // Specific conflicts with emotional stakes
    conflicts: [
      'must choose between saving their child or saving a thousand strangers',
      'discovers their life-saving medication is slowly poisoning someone they love',
      'learns their memory of a traumatic event was deliberately implanted',
      'finds out their soulmate is their mortal enemy in disguise',
      'realizes they\'re the only one who remembers the world before it changed',
      'must betray their deepest principles to save their family',
      'discovers they\'re living in a simulation but escaping means abandoning everyone inside',
      'learns their healing powers come at the cost of shortening others\' lives',
      'finds out their deceased parent is alive but has become their greatest enemy',
      'must use their fear of heights to rescue someone from a collapsing tower'
    ],

    // Rich, specific settings
    settings: [
      'a floating city that only appears during solar eclipses',
      'an underground library where books rewrite themselves',
      'a small town where time moves backward every midnight',
      'a space station orbiting a dying star',
      'a school for children who remember their past lives',
      'a hospital where patients\' dreams become reality',
      'a lighthouse that guides souls instead of ships',
      'a coffee shop that exists in multiple dimensions simultaneously',
      'an antique store where every item has a dangerous history',
      'a forest where the trees whisper secrets of the dead'
    ],

    // Character archetypes with depth
    protagonists: [
      'a memory thief who can steal and experience others\' recollections',
      'a retired superhero living under witness protection',
      'a therapist who absorbs their patients\' traumas',
      'a time loop victim who ages while everyone else resets',
      'a prophet who sees multiple futures but can\'t control which becomes real',
      'a ghost who doesn\'t know they\'re dead',
      'a dream architect who builds worlds in people\'s sleep',
      'a voice actor who discovers their recordings can alter reality',
      'a cartographer mapping places that exist only in stories',
      'a funeral director who can speak with the recently deceased'
    ],

    // High-impact plot twists
    revelations: [
      'the narrator has been the villain all along',
      'everyone except the protagonist is an AI',
      'the story is happening in reverse chronological order',
      'the protagonist is their own time-traveling descendant',
      'the entire conflict was manufactured by the protagonist\'s future self',
      'death in this world just means waking up in another',
      'the protagonist is the only real person in a philosophical thought experiment',
      'the story is being told by the protagonist to their killer',
      'each chapter is a different iteration of the same day',
      'the protagonist has been dead since chapter one'
    ],

    templates: [
      '{openings}, but when your protagonist {conflicts}, they discover that {revelations}. Set in {settings}.',
      'Your protagonist is {protagonists} who lives in {settings}. When they {conflicts}, {revelations}.',
      'In {settings}, {openings}. Your protagonist, {protagonists}, must {conflicts} while facing the truth that {revelations}.',
      'Write about {protagonists} in {settings}. The story begins when {openings}, forcing them to {conflicts}, ultimately revealing that {revelations}.',
      '{protagonists} discovers {revelations} when {openings} in {settings}. Now they must {conflicts} to set things right.'
    ]
  }
};

// Weighted random selection
const weightedRandom = (items, weights = null) => {
  if (!weights) return items[Math.floor(Math.random() * items.length)];

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }
  return items[items.length - 1];
};

// Enhanced template processor
const processTemplate = (template, data) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (data[key] && Array.isArray(data[key])) {
      return weightedRandom(data[key]);
    }
    return match;
  });
};

// Quality enhancement for writing prompts
const enhanceWritingPrompt = (prompt) => {
  const enhancements = [
    ' Focus on the internal conflict.',
    ' Include a ticking clock element.',
    ' Show the cost of failure.',
    ' Add a moral dilemma.',
    ' Include sensory details.'
  ];

  if (Math.random() < 0.3) {
    prompt += weightedRandom(enhancements);
  }

  return prompt;
};

const WritingPromptsPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    genre: 'any',
    tone: 'any',
    length: 'medium'
  });

  const generatePrompt = useCallback(() => {
    const data = promptData.writing;
    const template = weightedRandom(data.templates);
    let prompt = processTemplate(template, data);
    prompt = enhanceWritingPrompt(prompt);

    const newPrompt = {
      id: Date.now(),
      text: prompt,
      category: 'writing',
      timestamp: new Date().toISOString()
    };

    setGeneratedPrompt(newPrompt);
    setPromptHistory(prev => [newPrompt, ...prev.slice(0, 19)]);
  }, []);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const savePrompt = (prompt) => {
    setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
  };

  const toggleFavorite = (prompt) => {
    const isFavorite = favorites.some(fav => fav.id === prompt.id);
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== prompt.id));
    } else {
      setFavorites(prev => [...prev, { ...prompt, favorited: true }]);
    }
  };

  const sharePrompt = async (prompt) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Writing Prompt',
          text: prompt.text,
          url: window.location.href
        });
      } catch (err) {
        copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`);
      }
    } else {
      copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`);
    }
  };

  const exportPrompts = () => {
    const dataStr = JSON.stringify(savedPrompts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'saved-writing-prompts.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const updateControl = (key, value) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt.text}</p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyToClipboard(prompt.text)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
          >
            <Copy size={14} />
            Copy
          </button>
          <button
            onClick={() => savePrompt(prompt)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"
          >
            <Save size={14} />
            Save
          </button>
          <button
            onClick={() => toggleFavorite(prompt)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              favorites.some(fav => fav.id === prompt.id)
                ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} />
            Favorite
          </button>
          <button
            onClick={() => sharePrompt(prompt)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors"
          >
            <Share2 size={14} />
            Share
          </button>
          <button
            onClick={() => generatePrompt()}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"
          >
            <RefreshCw size={14} />
            Regenerate
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO
        path="writing-prompts"
        title="Random Writing Prompt Generator - Free Writing Prompts"
        description="Generate unlimited writing prompts instantly with our free writing prompt generator. Create unique story ideas with compelling conflicts, emotional stakes, and creative plot twists to overcome writer's block."
        keywords="writing prompts, random writing prompts, writing prompt generator, story prompts, creative writing prompts, random story prompt generator"
      />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Random Writing Prompt Generator
          </h1>

          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unlimited writing prompts instantly. Our free writing prompt generator creates unique story ideas with compelling conflicts, emotional stakes, and creative plot twists to spark your creativity and overcome writer's block.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link
            to="/writing-prompts"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-blue-600 border-b-2 border-blue-600 bg-blue-50"
          >
            <PenTool size={18} />
            Writing
          </Link>
          <Link
            to="/ai-images-prompt"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
              <path d="m14 7 3 3"></path>
              <path d="M5 6v4"></path>
              <path d="M19 14v4"></path>
              <path d="M10 2v2"></path>
              <path d="M7 8H3"></path>
              <path d="M21 16h-4"></path>
              <path d="M11 3H9"></path>
            </svg>
            AI Images
          </Link>
          <Link
            to="/ai-blog-post-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <BookOpen size={18} />
            Blog post
          </Link>
          <Link
            to="/short-story-prompts-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Crown size={18} />
            Short stories
          </Link>
          <Link
            to="/random-name-generator"
            className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Sparkles size={18} />
            Names
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Generator Section */}
        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select
              value={controls.genre}
              onChange={(e) => updateControl('genre', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Story Type</option>
              <option value="character-driven">Character-Driven</option>
              <option value="plot-driven">Plot-Driven</option>
              <option value="experimental">Experimental</option>
              <option value="traditional">Traditional</option>
            </select>
            <select
              value={controls.tone}
              onChange={(e) => updateControl('tone', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Complexity</option>
              <option value="simple">Simple Conflict</option>
              <option value="complex">Complex Conflict</option>
              <option value="moral">Moral Dilemma</option>
              <option value="psychological">Psychological</option>
            </select>
            <select
              value={controls.length}
              onChange={(e) => updateControl('length', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="any">Any Length</option>
              <option value="flash">Flash Fiction</option>
              <option value="short">Short Story</option>
              <option value="novella">Novella</option>
              <option value="novel">Novel</option>
            </select>
          </div>

          {/* Generate Button */}
          <div className="text-center mb-8">
            <button
              onClick={() => generatePrompt()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Generate Writing Prompt
            </button>
          </div>

          {/* Result */}
          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {/* History Panel */}
          {showHistory && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Prompts</h3>
                <button
                  onClick={() => setPromptHistory([])}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                >
                  Clear History
                </button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent prompts. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 leading-relaxed">{prompt.text}</p>
                          <span className="text-xs text-gray-400 mt-2 block">
                            {new Date(prompt.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyToClipboard(prompt.text)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            onClick={() => toggleFavorite(prompt)}
                            className={`p-1 transition-colors ${
                              favorites.some(fav => fav.id === prompt.id)
                                ? 'text-yellow-600 hover:text-yellow-700'
                                : 'text-gray-400 hover:text-yellow-600'
                            }`}
                            title="Favorite"
                          >
                            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Prompts Section */}
          {savedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Saved Prompts</h3>
                <button
                  onClick={exportPrompts}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-800">{prompt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO Content Section */}
          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Writing Prompts - Professional Story Ideas</h2>
              <p className="text-gray-700 mb-4">
                Our random writing prompt generator creates professional writing prompts designed to spark creativity and overcome writer's block. This free writing prompt generator delivers unlimited story ideas featuring unique conflicts, emotional stakes, and compelling plot twists. Each randomly generated prompt combines proven story elements with sophisticated narratives perfect for creative writers, novelists, and storytellers.
              </p>
              <p className="text-gray-700 mb-4">
                Generate random writing prompts with detailed character archetypes (memory thieves, dream architects, retired superheroes), specific story conflicts, and creative plot twists that go beyond generic writing prompts. This random story prompt generator tool is ideal for daily writing practice, NaNoWriMo preparation, creative writing exercises, and exploring new narrative ideas.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Quality Features:</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Emotional stakes and internal conflicts</li>
                  <li>• Specific, evocative settings beyond generic locations</li>
                  <li>• Complex character archetypes with built-in motivations</li>
                  <li>• Plot twists that recontextualize the entire story</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What are writing prompts?</h3>
                <p className="text-gray-700">
                  Writing prompts are short ideas or situations designed to inspire new stories, essays, or creative pieces. They help overcome writer's block and spark creativity.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I use writing prompts effectively?</h3>
                <p className="text-gray-700">
                  Choose a prompt that catches your interest, set a timer (10–15 minutes), and start writing without overthinking. Let the prompt lead your imagination.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use these writing prompts for commercial projects?</h3>
                <p className="text-gray-700">
                  Yes. All writing prompts on RandomPrompts.org are free to use for personal or commercial purposes — no attribution required.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Are the writing prompts generated by AI?</h3>
                <p className="text-gray-700">
                  Yes. Our Random Prompts Generator uses AI-assisted templates to produce unique, high-quality writing ideas across genres and tones.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What types of writing prompts can I generate?</h3>
                <p className="text-gray-700">
                  You can create prompts for fiction, poetry, blogging, journaling, or screenwriting — including genres like fantasy, romance, mystery, and sci-fi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default WritingPromptsPage;
