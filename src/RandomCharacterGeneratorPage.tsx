import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const promptData = {
  characters: {
    archetypes: ['The Reluctant Hero', 'The Mentor with a Dark Past', 'The Comic Relief Genius', 'The Femme Fatale', 'The Antihero', 'The Innocent', 'The Rebel', 'The Caregiver', 'The Explorer', 'The Sage'],
    traits: ['fiercely loyal but struggles with trust', 'brilliant yet socially awkward', 'charismatic with a hidden vulnerability', 'cold and calculating on the surface, warm underneath', 'impulsive and reckless', 'methodical and cautious', 'optimistic despite past traumas', 'cynical but secretly hopeful', 'confident to the point of arrogance', 'humble yet secretly ambitious'],
    backgrounds: ['grew up in poverty, now wealthy', 'former military turned civilian', 'raised by a secret organization', 'orphaned at young age', 'child of famous parents living in their shadow', 'trained as an assassin, seeking redemption', 'scientist who lost everything in an experiment', 'artist struggling with inner demons', 'heir to a criminal empire', 'former athlete forced into early retirement'],
    goals: ['seeking revenge for a past wrong', 'trying to protect someone they love', 'searching for a missing family member', 'attempting to clear their name', 'pursuing forbidden knowledge', 'fighting against an unjust system', 'trying to prevent a prophesied disaster', 'seeking redemption for past mistakes', 'protecting a dangerous secret', 'trying to change their destiny'],
    flaws: ['trusts too easily', 'holds grudges forever', 'lies compulsively', 'afraid of commitment', 'addicted to adrenaline', 'perfectionist to a fault', 'emotionally unavailable', 'seeks approval constantly', 'refuses to ask for help', 'self-sabotages when things go well'],
    skills: ['expert hacker', 'master of disguise', 'multilingual negotiator', 'skilled martial artist', 'brilliant strategist', 'gifted mechanic', 'talented con artist', 'exceptional tracker', 'medical expert', 'supernatural ability they can\'t control'],
    secrets: ['is actually royalty in hiding', 'caused the death of someone close', 'is working as a double agent', 'has a terminal illness they hide', 'possesses forbidden knowledge', 'is the child of the villain', 'faked their own death once before', 'has amnesia about their true identity', 'is from the future/another dimension', 'is protecting a dangerous artifact'],
    fears: ['losing control', 'being abandoned', 'their secret being discovered', 'repeating past mistakes', 'deep water', 'confined spaces', 'failing those who depend on them', 'becoming like their parents', 'intimacy and emotional connection', 'their own potential for violence']
  }
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const processTemplate = (data) => {
  const archetype = weightedRandom(data.archetypes);
  const trait = weightedRandom(data.traits);
  const background = weightedRandom(data.backgrounds);
  const goal = weightedRandom(data.goals);
  const flaw = weightedRandom(data.flaws);
  const skill = weightedRandom(data.skills);
  const secret = weightedRandom(data.secrets);
  const fear = weightedRandom(data.fears);

  return `**Archetype:** ${archetype}

**Personality:** A character who is ${trait}

**Background:** They ${background}

**Primary Goal:** Currently ${goal}

**Fatal Flaw:** ${flaw}

**Special Skill:** ${skill}

**Hidden Secret:** ${secret}

**Deepest Fear:** ${fear}`;
};

const RandomCharacterGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    count: 'single'
  });

  const generatePrompt = useCallback(() => {
    const data = promptData.characters;
    const batchSize = controls.count === 'multiple' ? 3 :
                     controls.count === 'batch' ? 5 : 1;

    const characters = [];
    for (let i = 0; i < batchSize; i++) {
      const character = processTemplate(data);
      characters.push(character);
    }

    const prompt = {
      id: Date.now(),
      text: batchSize === 1 ? characters[0] : characters.join('\n\n---\n\n'),
      category: 'character',
      timestamp: new Date().toISOString(),
      isMultiple: batchSize > 1
    };

    setGeneratedPrompt(prompt);
    setPromptHistory(prev => [prompt, ...prev.slice(0, 19)]);
  }, [controls]);

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
          title: 'Random Character Generator',
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
    link.download = 'saved-characters.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const updateControl = (key, value) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;
    const isMultiple = prompt.isMultiple;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {isMultiple ? (
          <div className="mb-4 space-y-4">
            {prompt.text.split('\n\n---\n\n').map((character, index) => (
              <div key={index} className="bg-gray-50 px-4 py-3 rounded border text-gray-800 leading-relaxed whitespace-pre-line">
                {character}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-800 text-base leading-relaxed mb-4 whitespace-pre-line">{prompt.text}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors">
            <Copy size={14} /> Copy {isMultiple ? 'All' : ''}
          </button>
          <button onClick={() => savePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors">
            <Save size={14} /> Save
          </button>
          <button onClick={() => toggleFavorite(prompt)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
            <Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} /> Favorite
          </button>
          <button onClick={() => sharePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors">
            <Share2 size={14} /> Share
          </button>
          <button onClick={() => generatePrompt()} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors">
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO pageKey="randomCharacterGenerator" />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Character Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique random characters instantly with our free character generator. Create detailed character profiles with personality traits, backgrounds, goals, flaws, and secrets perfect for stories, novels, D&D campaigns, and creative writing.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <PenTool size={18} /> Writing
          </Link>
          <Link to="/ai-images-prompt" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
              <path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path>
            </svg>
            AI Images
          </Link>
          <Link to="/ai-blog-post-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <BookOpen size={18} /> Blog post
          </Link>
          <Link to="/random-name-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Crown size={18} /> Names
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="single">Single Character</option>
              <option value="multiple">Generate 3 Characters</option>
              <option value="batch">Generate 5 Characters</option>
            </select>
          </div>

          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Random Character
            </button>
          </div>

          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {showHistory && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Characters</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent characters. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 leading-relaxed line-clamp-4 whitespace-pre-line">{prompt.text}</p>
                          <span className="text-xs text-gray-400 mt-2 block">{new Date(prompt.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => copyToClipboard(prompt.text)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Copy">
                            <Copy size={14} />
                          </button>
                          <button onClick={() => toggleFavorite(prompt)} className={`p-1 transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-yellow-600'}`} title="Favorite">
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

          {savedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Saved Characters</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Download size={16} /> Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-800 whitespace-pre-line text-sm">{prompt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Character Generator</h2>
              <p className="text-gray-700 mb-4">
                Our random character generator creates detailed, three-dimensional character profiles complete with personality traits, backgrounds, motivations, flaws, and secrets. Generate random characters for creative writing, D&D campaigns, role-playing games, novel writing, and storytelling projects.
              </p>
              <p className="text-gray-700 mb-4">
                This free character generator produces comprehensive character profiles including archetype, personality traits, background story, primary goals, fatal flaws, special skills, hidden secrets, and deepest fears. Each generated character is designed to be complex, interesting, and ready to use in your creative projects.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Random Character Generator Features:</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Complete character profiles with 8 key elements for depth and complexity</li>
                  <li>• Diverse archetypes, traits, backgrounds, and motivations</li>
                  <li>• Batch generation: Create 1, 3, or 5 random characters at once</li>
                  <li>• Perfect for writers, game masters, novelists, and creative storytellers</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example Random Character:</h3>
              <div className="text-gray-700 text-sm space-y-2 whitespace-pre-line">
                <strong>Archetype:</strong> The Reluctant Hero
                <strong>Personality:</strong> A character who is brilliant yet socially awkward
                <strong>Background:</strong> They grew up in poverty, now wealthy
                <strong>Primary Goal:</strong> Currently seeking revenge for a past wrong
                <strong>Fatal Flaw:</strong> Trusts too easily
                <strong>Special Skill:</strong> Expert hacker
                <strong>Hidden Secret:</strong> Is actually royalty in hiding
                <strong>Deepest Fear:</strong> Losing control
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Writing Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/random-name-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Random Name Generator
              </Link>
              <Link to="/random-hero-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Hero Generator
              </Link>
              <Link to="/random-villain-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Villain Generator
              </Link>
              <Link to="/random-dialogue-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                Dialogue Generator
              </Link>
            </div>
          </div>
        </div>

        <section className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is a random character generator?</h3>
                <p className="text-gray-700">
                  A random character generator is a tool that creates detailed character profiles including personality traits, backgrounds, motivations, flaws, skills, secrets, and fears. Its perfect for writers, game masters, and creative storytellers who need fully-developed characters for their projects.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use generated characters in my stories and games?</h3>
                <p className="text-gray-700">
                  Yes! All random characters generated by RandomPrompts.org are free to use in your novels, short stories, D&D campaigns, role-playing games, screenplays, and any creative projects. Customize and adapt the characters to fit your specific needs and narrative.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How detailed are the generated characters?</h3>
                <p className="text-gray-700">
                  Each random character includes eight key elements: archetype (character type), personality trait, background story, primary goal, fatal flaw, special skill, hidden secret, and deepest fear. This comprehensive profile provides depth and complexity, giving you a solid foundation to build upon.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What makes a good character for storytelling?</h3>
                <p className="text-gray-700">
                  Good characters have clear motivations, relatable flaws, interesting backgrounds, and internal conflicts. Our random character generator creates characters with all these elements, ensuring they feel three-dimensional and compelling. The combination of goals, flaws, and secrets creates natural story tension.
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

export default RandomCharacterGeneratorPage;
