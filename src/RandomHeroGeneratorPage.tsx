import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const promptData = { items: ['A reluctant farm boy who discovers their royal heritage', 'A grizzled veteran learning to trust again', 'A reformed thief using skills for good', 'A young healer discovering inner strength', 'A scholar forced to become a warrior', 'A street kid with hidden magical ability', 'An exiled prince seeking redemption', 'A gentle giant protecting the innocent', 'A brilliant inventor fighting injustice', 'A cursed individual seeking to break their curse', 'A time traveler trying to fix the past', 'A pacifist forced to take up arms', 'A disabled person with extraordinary abilities', 'A former villain seeking atonement', 'A prophesied hero who doubts their destiny', 'An AI learning what it means to be human', 'A sidekick stepping into the spotlight', 'A coward finding courage', 'An ordinary person in extraordinary circumstances', 'A leader who never wanted power', 'A lone wolf learning teamwork', 'A betrayed friend seeking justice', 'A child prodigy with adult responsibilities', 'An unlikely chosen one', 'A hero from another dimension', 'A shape-shifter hiding their true form', 'A telepath overwhelmed by others thoughts', 'A immortal who has lost hope', 'A clone discovering their individuality', 'A robot developing emotions'] };
const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const RandomHeroGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({ count: 'single' });

  const generatePrompt = useCallback(() => {
    const data = promptData.items;
    const batchSize = controls.count === 'multiple' ? 5 : controls.count === 'batch' ? 10 : 1;
    const items = [];
    for (let i = 0; i < batchSize; i++) { items.push(weightedRandom(data)); }
    const prompt = { id: Date.now(), text: batchSize === 1 ? items[0] : items.join('\n\n'), category: 'randomherogenerator', timestamp: new Date().toISOString(), isMultiple: batchSize > 1 };
    setGeneratedPrompt(prompt);
    setPromptHistory(prev => [prompt, ...prev.slice(0, 19)]);
  }, [controls]);

  const copyToClipboard = async (text) => { try { await navigator.clipboard.writeText(text); } catch (err) { console.error('Failed to copy:', err); } };
  const savePrompt = (prompt) => setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
  const toggleFavorite = (prompt) => { const isFavorite = favorites.some(fav => fav.id === prompt.id); if (isFavorite) { setFavorites(prev => prev.filter(fav => fav.id !== prompt.id)); } else { setFavorites(prev => [...prev, { ...prompt, favorited: true }]); } };
  const sharePrompt = async (prompt) => { if (navigator.share) { try { await navigator.share({ title: 'Random Hero Generator', text: prompt.text, url: window.location.href }); } catch (err) { copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`); } } else { copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`); } };
  const exportPrompts = () => { const dataStr = JSON.stringify(savedPrompts, null, 2); const dataBlob = new Blob([dataStr], { type: 'application/json' }); const url = URL.createObjectURL(dataBlob); const link = document.createElement('a'); link.href = url; link.download = 'saved-randomherogenerator.json'; link.click(); URL.revokeObjectURL(url); };
  const updateControl = (key, value) => setControls(prev => ({ ...prev, [key]: value }));

  const renderPromptCard = (prompt) => {
    if (!prompt) return null;
    const isMultiple = prompt.isMultiple;
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {isMultiple ? (
          <div className="mb-4 space-y-3">
            {prompt.text.split('\\n\\n').map((item, index) => (
              <div key={index} className="bg-gray-50 px-4 py-3 rounded border text-gray-800 leading-relaxed">{item}</div>
            ))}
          </div>
        ) : (
          <p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt.text}</p>
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
      <SEO pageKey="randomHeroGenerator" />
      <Header promptHistory={promptHistory} showHistory={showHistory} onHistoryToggle={() => setShowHistory(!showHistory)} />
      <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Hero Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">Generate unique heroes with traits, backgrounds, and motivations for your stories.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"><PenTool size={18} /> Writing</Link>
          <Link to="/ai-images-prompt" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"><Sparkles size={18} /> AI Art</Link>
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50"><Crown size={18} /> Stories</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="single">Single Item</option>
              <option value="multiple">Generate 5 Items</option>
              <option value="batch">Generate 10 Items</option>
            </select>
          </div>
          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">Generate</button>
          </div>
          {generatedPrompt && renderPromptCard(generatedPrompt)}
          {savedPrompts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Saved Items</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"><Download size={16} /> Export All</button>
              </div>
            </div>
          )}
          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Hero Generator</h2>
              <p className="text-gray-700 mb-4">Generate unique heroes with traits, backgrounds, and motivations for your stories.</p>
            </div>
          </div>
        </div>
        <section className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use generated content in my projects?</h3>
                <p className="text-gray-700">Yes! All content generated by RandomPrompts.org is free to use in your creative projects.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default RandomHeroGeneratorPage;
