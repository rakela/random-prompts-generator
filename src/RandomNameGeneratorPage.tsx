import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

const promptData = {
  names: {
    elvish: {
      first: ['Aelindra', 'Thalorin', 'Silvanis', 'Elenion', 'Mirithel', 'Caelynn', 'Faelivrin', 'Galathil'],
      last: ['Moonwhisper', 'Starweaver', 'Dawnbringer', 'Nightbreeze', 'Silverleaf', 'Goldensong', 'Stormwind', 'Brightblade']
    },
    dwarven: {
      first: ['Thorek', 'Grimvar', 'Baelin', 'Dwalin', 'Nala', 'Vera', 'Kili', 'Dori'],
      last: ['Ironforge', 'Stonebeard', 'Goldaxe', 'Mountainheart', 'Deepdelver', 'Forgehammer', 'Rockbreaker', 'Steelshield']
    },
    human: {
      first: ['Alaric', 'Seraphina', 'Gareth', 'Evangeline', 'Roderick', 'Cordelia', 'Matthias', 'Isadora'],
      last: ['Blackwood', 'Ravencrest', 'Goldmane', 'Stormborn', 'Brightwater', 'Shadowmere', 'Swiftarrow', 'Ironhand']
    },
    exotic: {
      first: ['Zephyria', 'Vorthak', 'Nyxaria', 'Kaelthas', 'Ysara', 'Drakmor', 'Selvara', 'Xerion'],
      last: ['Voidcaller', 'Soulrender', 'Dreamwalker', 'Mindshaper', 'Flameweaver', 'Iceheart', 'Stormcaller', 'Netherbane']
    },
    titles: ['the Bold', 'the Wise', 'the Fierce', 'the Just', 'Dragonbane', 'Lightbringer', 'the Ancient', 'the Swift', 'the Pure', 'Shadowhunter']
  }
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const processTemplate = (data, controls) => {
  const selectedCulture = controls.origin && controls.origin !== 'any' 
    ? controls.origin 
    : weightedRandom(['elvish', 'dwarven', 'human', 'exotic']);
  
  const cultureData = data[selectedCulture];
  const nameType = controls.type || 'full';
  
  const firstName = weightedRandom(cultureData.first);
  const lastName = weightedRandom(cultureData.last);
  const title = weightedRandom(data.titles);
  
  switch (nameType) {
    case 'first':
      return firstName;
    case 'title':
      return `${firstName} ${title}`;
    case 'house':
      return `${firstName} of House ${lastName}`;
    default:
      return `${firstName} ${lastName}`;
  }
};

const RandomNameGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('random-name-generator-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage('random-name-generator-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage('random-name-generator-favorites', []);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    type: 'full',
    origin: 'any',
    count: 'single'
  });

  const generatePrompt = useCallback(() => {
    const data = promptData.names;
    const batchSize = controls.count === 'multiple' ? 5 : 
                     controls.count === 'batch' ? 10 : 1;
    
    const names = [];
    for (let i = 0; i < batchSize; i++) {
      const name = processTemplate(data, controls);
      names.push(name);
    }
    
    const prompt = {
      id: Date.now(),
      text: batchSize === 1 ? names[0] : names.join('\n'),
      category: 'names',
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
          title: 'Random Name Generator',
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
    link.download = 'saved-random-names.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const updateControl = (key, value) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;
    const isMultipleNames = prompt.isMultiple;

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
        {isMultipleNames ? (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Generated Names:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {prompt.text.split('\n').map((name, index) => (
                <div key={index} className="bg-gray-50 px-3 py-2 rounded border text-gray-800 dark:text-gray-200">
                  {name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-4">{prompt.text}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-colors">
            <Copy size={14} /> Copy {isMultipleNames ? 'All' : ''}
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
      <SEO pageKey="randomNameGenerator" />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Name Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique fantasy character names instantly with our free random name generator. Create authentic names for elvish, dwarven, human, and exotic characters perfect for D&D campaigns, novels, games, and creative writing projects.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <PenTool size={18} /> Writing
          </Link>
          <Link to="/ai-images-prompt" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
              <path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path>
            </svg>
            AI Images
          </Link>
          <Link to="/ai-blog-post-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <BookOpen size={18} /> Blog post
          </Link>
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Crown size={18} /> Short stories
          </Link>
          <Link to="/random-name-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-pink-600 border-b-2 border-pink-600 bg-pink-50">
            <Sparkles size={18} /> Names
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <select value={controls.type} onChange={(e) => updateControl('type', e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
              <option value="full">Full Name</option>
              <option value="first">First Name Only</option>
              <option value="title">With Title</option>
              <option value="house">With House</option>
            </select>
            <select value={controls.origin} onChange={(e) => updateControl('origin', e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
              <option value="any">Any Culture</option>
              <option value="elvish">Elvish</option>
              <option value="dwarven">Dwarven</option>
              <option value="human">Human</option>
              <option value="exotic">Exotic</option>
            </select>
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
              <option value="single">Single Name</option>
              <option value="multiple">Generate 5 Names</option>
              <option value="batch">Batch of 10</option>
            </select>
          </div>

          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Random Name
            </button>
          </div>

          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {showHistory && (
            <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Names</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent names. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{prompt.text}</p>
                          <span className="text-xs text-gray-400 mt-2 block">{new Date(prompt.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => copyToClipboard(prompt.text)} className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-400 transition-colors" title="Copy">
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Names</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Download size={16} /> Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200">{prompt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Fantasy Random Name Generator</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our random name generator creates authentic fantasy character names with cultural consistency and meaningful combinations. Generate random names for elvish, dwarven, human, and exotic characters that sound natural within their fantasy cultures while suggesting character backgrounds and personalities. Perfect for D&D campaigns, fantasy novels, role-playing games, and creative writing projects.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This random name generator crafts names from culturally consistent elements including Elvish names like "Aelindra Moonwhisper," Dwarven names like "Thorek Ironforge," Human names like "Alaric Blackwood," and Exotic names like "Zephyria Voidcaller." Generate single random names or batch generate 5-10 names at once with optional titles and house affiliations that suggest the character's role, background, and social status.
              </p>
              <div className="bg-pink-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-pink-900 mb-2">Random Name Generator Features:</h3>
                <ul className="text-pink-800 text-sm space-y-1">
                  <li>• Culturally consistent name combinations for authentic fantasy characters</li>
                  <li>• Multiple cultures: Elvish, Dwarven, Human, and Exotic names</li>
                  <li>• Name formats: Full names, first names, titled names, house affiliations</li>
                  <li>• Batch generation: Create 1, 5, or 10 random names at once</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">More Creative Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/writing-prompts" className="text-pink-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Writing Prompts Generator
              </Link>
              <Link to="/short-story-prompts-generator" className="text-pink-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Short Story Prompts
              </Link>
              <Link to="/ai-images-prompt" className="text-pink-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                AI Art Prompts
              </Link>
              <Link to="/ai-blog-post-generator" className="text-pink-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                Blog Post Generator
              </Link>
            </div>
          </div>
        </div>

        <section className="bg-white dark:bg-gray-800 py-16 mt-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How does the random name generator work?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our random name generator combines culturally consistent first names and last names from elvish, dwarven, human, and exotic fantasy cultures. Each generated random name is designed to sound authentic and natural within its cultural context, perfect for fantasy characters, D&D campaigns, and creative writing.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I use random names for my D&D characters?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Absolutely! This random name generator is perfect for D&D character creation. Generate authentic elvish names for your elf characters, dwarven names for dwarves, human names for human characters, or exotic names for tieflings, dragonborn, and other fantasy races. All random names are free to use in your campaigns.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Are random names copyrighted?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  No. All random names generated by RandomPrompts.org are free to use for personal or commercial projects including novels, games, D&D campaigns, screenplays, and any creative work. The random names are procedurally generated and belong to you once created.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I generate multiple random names at once?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! Our random name generator offers batch generation. Choose "Generate 5 Names" to create 5 random names simultaneously, or "Batch of 10" for 10 names. Perfect when you need multiple NPCs, character options, or a list of fantasy names for your worldbuilding project.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What name formats does the random name generator support?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The random name generator offers four formats: Full Name (first and last), First Name Only, With Title (e.g., "Alaric the Bold"), and With House (e.g., "Thalorin of House Moonwhisper"). Select the format that best fits your character's background and social status.
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

export default RandomNameGeneratorPage;
