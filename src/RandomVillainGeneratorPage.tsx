import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const promptData = {
  villains: {
    motivations: ['seeking revenge for a past wrong', 'pursuing ultimate power', 'wanting to reshape the world in their image', 'protecting something at any cost', 'proving their superiority', 'seeking justice through extreme means', 'pursuing forbidden knowledge', 'trying to save someone they love', 'embracing nihilism and chaos', 'correcting a perceived injustice'],
    methods: ['manipulation and deception', 'overwhelming force and brutality', 'subtle corruption from within', 'exploiting people's fears', 'using advanced technology', 'wielding dark magic', 'controlling minds', 'economic domination', 'political maneuvering', 'creating false flag operations'],
    traits: ['charismatic and persuasive', 'cold and calculating', 'volatile and unpredictable', 'methodical and patient', 'sadistic and cruel', 'tragic and sympathetic', 'brilliantly intelligent', 'driven by obsession', 'ruthlessly pragmatic', 'convinced they're the hero'],
    weaknesses: ['their pride and arrogance', 'an emotional attachment', 'overconfidence in their plan', 'underestimating their opponents', 'a physical vulnerability', 'their own past haunting them', 'loyalty to someone who betrays them', 'inability to adapt', 'their humanity despite their actions', 'a moral line they won't cross'],
    backgrounds: ['was once a hero who fell', 'suffered a great tragedy', 'was betrayed by those they trusted', 'grew up in poverty and deprivation', 'was created/made to be a weapon', 'comes from a line of villains', 'discovered a terrible truth', 'lost everything they loved', 'was corrupted by power', 'rebelled against an unjust system'],
    appearances: ['scarred and intimidating', 'beautiful but unsettling', 'ordinary and unremarkable', 'imposing and powerful', 'elegant and refined', 'decayed and monstrous', 'youthful but ancient', 'masked identity', 'disfigured by their own experiments', 'changing form constantly']
  }
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const processTemplate = (data) => {
  const motivation = weightedRandom(data.motivations);
  const method = weightedRandom(data.methods);
  const trait = weightedRandom(data.traits);
  const weakness = weightedRandom(data.weaknesses);
  const background = weightedRandom(data.backgrounds);
  const appearance = weightedRandom(data.appearances);

  return `**Motivation:** ${motivation}

**Methods:** Uses ${method}

**Personality:** ${trait}

**Fatal Weakness:** ${weakness}

**Background:** ${background}

**Appearance:** ${appearance}`;
};

const RandomVillainGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({ count: 'single' });

  const generatePrompt = useCallback(() => {
    const data = promptData.villains;
    const batchSize = controls.count === 'multiple' ? 3 : controls.count === 'batch' ? 5 : 1;
    const villains = [];
    for (let i = 0; i < batchSize; i++) {
      villains.push(processTemplate(data));
    }
    const prompt = {
      id: Date.now(),
      text: batchSize === 1 ? villains[0] : villains.join('\n\n---\n\n'),
      category: 'villain',
      timestamp: new Date().toISOString(),
      isMultiple: batchSize > 1
    };
    setGeneratedPrompt(prompt);
    setPromptHistory(prev => [prompt, ...prev.slice(0, 19)]);
  }, [controls]);

  const copyToClipboard = async (text) => { try { await navigator.clipboard.writeText(text); } catch (err) { console.error('Failed to copy:', err); } };
  const savePrompt = (prompt) => setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
  const toggleFavorite = (prompt) => { const isFavorite = favorites.some(fav => fav.id === prompt.id); if (isFavorite) { setFavorites(prev => prev.filter(fav => fav.id !== prompt.id)); } else { setFavorites(prev => [...prev, { ...prompt, favorited: true }]); } };
  const sharePrompt = async (prompt) => { if (navigator.share) { try { await navigator.share({ title: 'Random Villain Generator', text: prompt.text, url: window.location.href }); } catch (err) { copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`); } } else { copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`); } };
  const exportPrompts = () => { const dataStr = JSON.stringify(savedPrompts, null, 2); const dataBlob = new Blob([dataStr], { type: 'application/json' }); const url = URL.createObjectURL(dataBlob); const link = document.createElement('a'); link.href = url; link.download = 'saved-villains.json'; link.click(); URL.revokeObjectURL(url); };
  const updateControl = (key, value) => setControls(prev => ({ ...prev, [key]: value }));

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;
    const isMultiple = prompt.isMultiple;
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {isMultiple ? (
          <div className="mb-4 space-y-4">
            {prompt.text.split('\n\n---\n\n').map((villain, index) => (
              <div key={index} className="bg-gray-50 px-4 py-3 rounded border text-gray-800 leading-relaxed whitespace-pre-line">
                {villain}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-800 text-base leading-relaxed mb-4 whitespace-pre-line">{prompt.text}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"><Copy size={14} /> Copy</button>
          <button onClick={() => savePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"><Save size={14} /> Save</button>
          <button onClick={() => toggleFavorite(prompt)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}><Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} /> Favorite</button>
          <button onClick={() => sharePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors"><Share2 size={14} /> Share</button>
          <button onClick={() => generatePrompt()} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"><RefreshCw size={14} /> Regenerate</button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO pageKey="randomVillainGenerator" />
      <Header promptHistory={promptHistory} showHistory={showHistory} onHistoryToggle={() => setShowHistory(!showHistory)} />
      <div className="bg-gradient-to-r from-red-700 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Villain Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique random villains instantly with our free villain generator. Create complex antagonists with motivations, methods, and weaknesses perfect for stories, novels, D&D campaigns, and creative writing.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"><PenTool size={18} /> Writing</Link>
          <Link to="/random-character-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"><Crown size={18} /> Characters</Link>
          <Link to="/random-hero-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"><Sparkles size={18} /> Heroes</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option value="single">Single Villain</option>
              <option value="multiple">Generate 3 Villains</option>
              <option value="batch">Generate 5 Villains</option>
            </select>
          </div>
          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Random Villain
            </button>
          </div>
          {generatedPrompt && renderPromptCard(generatedPrompt)}
          {savedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Saved Villains</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"><Download size={16} /> Export All</button>
              </div>
            </div>
          )}
          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Villain Generator</h2>
              <p className="text-gray-700 mb-4">
                Our random villain generator creates complex, multi-dimensional antagonists with clear motivations, dangerous methods, compelling traits, and exploitable weaknesses. Generate random villains for novels, screenplays, D&D campaigns, and creative storytelling.
              </p>
              <div className="bg-red-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-red-900 mb-2">Features:</h3>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Complete villain profiles with motivations, methods, traits, weaknesses, backgrounds, and appearance</li>
                  <li>• Complex antagonists that drive compelling narratives</li>
                  <li>• Batch generation: Create 1, 3, or 5 villains at once</li>
                  <li>• Perfect for writers, game masters, and storytellers</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/random-hero-generator" className="text-red-700 hover:underline flex items-center gap-2"><Sparkles size={16} />Hero Generator</Link>
              <Link to="/random-character-generator" className="text-red-700 hover:underline flex items-center gap-2"><Crown size={16} />Character Generator</Link>
              <Link to="/random-conflict-generator" className="text-red-700 hover:underline flex items-center gap-2"><PenTool size={16} />Conflict Generator</Link>
              <Link to="/writing-prompts" className="text-red-700 hover:underline flex items-center gap-2"><BookOpen size={16} />Writing Prompts</Link>
            </div>
          </div>
        </div>
        <section className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What makes a good villain?</h3>
                <p className="text-gray-700">A good villain has clear motivations that make sense from their perspective, poses a genuine threat to the protagonist, and ideally has relatable human qualities that create complexity. The best villains believe they are the hero of their own story.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use generated villains in my projects?</h3>
                <p className="text-gray-700">Yes! All random villains generated by RandomPrompts.org are free to use in your creative writing, D&D campaigns, novels, screenplays, and storytelling projects.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Why include a weakness for villains?</h3>
                <p className="text-gray-700">A villain's weakness makes them defeatable and creates dramatic tension. It also humanizes them and provides story opportunities. The most interesting weaknesses are tied to the villain's strengths or motivations.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default RandomVillainGeneratorPage;
