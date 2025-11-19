import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

const promptData = {
  settings: [
    'A floating city built on interconnected hot air balloons thousands of feet above the ground',
    'An underwater research station at the bottom of the Mariana Trench, isolated and claustrophobic',
    'A sprawling desert marketplace at the crossroads of three kingdoms where cultures collide',
    'An abandoned amusement park slowly being reclaimed by nature, rides rusting in silence',
    'A luxury space station orbiting Jupiter, catering to the ultra-wealthy',
    'A medieval castle perched on a cliff overlooking a stormy sea',
    'A hidden underground city illuminated by bioluminescent fungi',
    'A massive library built into the hollowed-out trunk of an ancient tree',
    'A frontier town on the edge of a recently discovered wilderness',
    'A neon-lit cyberpunk cityscape where the wealthy live in towers and the poor beneath',
    'A remote lighthouse on a rocky island, cut off during winter storms',
    'A sprawling refugee camp that has become a permanent city over decades',
    'A monastery built into the side of a mountain, accessible only by narrow stairs',
    'A traveling carnival that mysteriously appears in different towns',
    'A space colony on Mars, domed against the harsh environment',
    'A Victorian-era sanatorium deep in the mountains, still operating',
    'A massive generation ship traveling between stars for centuries',
    'A tropical island resort hiding darker secrets beneath it\'s paradise facade',
    'A post-apocalyptic community living in the remains of a shopping mall',
    'An exclusive boarding school isolated in the Scottish Highlands',
    'A magical forest where the trees are conscious and watchful',
    'A mining colony on an asteroid rich with valuable minerals',
    'A riverboat casino traveling the Mississippi, home to gamblers and con artists',
    'A sleepy coastal town where everyone knows everyone\'s secrets',
    'A megacity where different levels serve different social classes',
    'An arctic research base where the sun doesn\'t rise for months',
    'A pocket dimension accessible through specific doorways in the real world',
    'A wild west frontier town in a fantasy setting with magic',
    'A virtual reality world where people live their alternate lives',
    'A plague-ravaged city under strict quarantine',
    'A mountain village celebrating an ancient festival steeped in tradition',
    'An orbital prison station where the worst criminals are sent',
    'A magical academy hidden from the non-magical world',
    'A artist colony in an abandoned factory district',
    'A small farm town dependent on a single crop, threatened by drought',
    'A massive tree city in a fantasy forest, connected by rope bridges',
    'A dystopian shopping district where everything is monitored',
    'A jazz club in 1920s prohibition-era speakeasy',
    'A space elevator connecting Earth to an orbital platform',
    'A remote cabin in the woods, miles from civilization',
    'A grand hotel with a dark history, where rooms shift and change',
    'A beach town dependent on tourism, now facing environmental disaster',
    'A nomadic caravan crossing hostile desert territories',
    'A futuristic arcology-a self-contained city-building hybrid',
    'A haunted mansion on the outskirts of a wealthy neighborhood',
    'An artist\'s workshop filled with creations that seem to come alive',
    'A border checkpoint between two hostile nations, tense and dangerous',
    'A sunken ship that has become an artificial reef community',
    'A zen garden monastery where monks seek enlightenment',
    'A bustling spaceport where thousands of species interact and trade'
  ]
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];
const RandomSettingGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('random-setting-generator-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage('random-setting-generator-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage('random-setting-generator-favorites', []);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({ count: 'single' });
  const generatePrompt = useCallback(() => {
    const data = promptData.settings;
    const batchSize = controls.count === 'multiple' ? 5 : controls.count === 'batch' ? 10 : 1;
    const settings = [];
    for (let i = 0; i < batchSize; i++) { settings.push(weightedRandom(data)); }
    const prompt = { id: Date.now(), text: batchSize === 1 ? settings[0] : settings.join('\n\n'), category: 'setting', timestamp: new Date().toISOString(), isMultiple: batchSize > 1 };
    setGeneratedPrompt(prompt); setPromptHistory(prev => [prompt, ...prev.slice(0, 19)]);
  }, [controls]);
  const copyToClipboard = async (text) => { try { await navigator.clipboard.writeText(text); } catch (err) { console.error('Failed to copy:', err); } };
  const savePrompt = (prompt) => setSavedPrompts(prev => [...prev, { ...prompt, saved: true }]);
  const toggleFavorite = (prompt) => { const isFavorite = favorites.some(fav => fav.id === prompt.id); if (isFavorite) { setFavorites(prev => prev.filter(fav => fav.id !== prompt.id)); } else { setFavorites(prev => [...prev, { ...prompt, favorited: true }]); } };
  const sharePrompt = async (prompt) => { if (navigator.share) { try { await navigator.share({ title: 'Random Setting Generator', text: prompt.text, url: window.location.href }); } catch (err) { copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`); } } else { copyToClipboard(`${prompt.text}\n\nGenerated at: ${window.location.href}`); } };
  const exportPrompts = () => { const dataStr = JSON.stringify(savedPrompts, null, 2); const dataBlob = new Blob([dataStr], { type: 'application/json' }); const url = URL.createObjectURL(dataBlob); const link = document.createElement('a'); link.href = url; link.download = 'saved-settings.json'; link.click(); URL.revokeObjectURL(url); };
  const updateControl = (key, value) => setControls(prev => ({ ...prev, [key]: value }));
  const renderPromptCard = (prompt) => { if (!prompt) return null; const isMultiple = prompt.isMultiple; return (<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">{isMultiple ? (<div className="mb-4 space-y-3">{prompt.text.split('\n\n').map((setting, index) => (<div key={index} className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded border text-gray-800 dark:text-gray-200 leading-relaxed">{setting}</div>))}</div>) : (<p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-4">{prompt.text}</p>)}<div className="flex flex-wrap gap-2"><button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-colors"><Copy size={14} /> Copy {isMultiple ? 'All' : ''}</button><button onClick={() => savePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm transition-colors"><Save size={14} /> Save</button><button onClick={() => toggleFavorite(prompt)} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${favorites.some(fav => fav.id === prompt.id) ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}><Star size={14} fill={favorites.some(fav => fav.id === prompt.id) ? 'currentColor' : 'none'} /> Favorite</button><button onClick={() => sharePrompt(prompt)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm transition-colors"><Share2 size={14} /> Share</button><button onClick={() => generatePrompt()} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"><RefreshCw size={14} /> Regenerate</button></div></div>); };
  return (<div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800"><SEO pageKey="randomSettingGenerator" /><Header promptHistory={promptHistory} showHistory={showHistory} onHistoryToggle={() => setShowHistory(!showHistory)} /><div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16"><div className="max-w-4xl mx-auto px-4 text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">Random Setting Generator</h1><p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">Generate unique random settings instantly with our free setting generator. Create vivid locations and atmospheres perfect for stories, novels, role-playing games, and creative writing projects.</p></div></div><div className="max-w-6xl mx-auto px-4"><div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 dark:border-gray-700"><Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"><PenTool size={18} /> Writing</Link><Link to="/random-worldbuilding-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"><Crown size={18} /> Worldbuilding</Link><Link to="/random-character-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700"><Sparkles size={18} /> Characters</Link></div></div><div className="max-w-6xl mx-auto px-4 py-8"><div className="max-w-4xl mx-auto"><div className="grid grid-cols-1 gap-4 mb-6"><select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"><option value="single">Single Setting</option><option value="multiple">Generate 5 Settings</option><option value="batch">Generate 10 Settings</option></select></div><div className="text-center mb-8"><button onClick={() => generatePrompt()} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">Generate Random Setting</button></div>{generatedPrompt && renderPromptCard(generatedPrompt)}{savedPrompts.length > 0 && (<div className="mt-12"><div className="flex items-center justify-between mb-6"><h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Settings</h3><button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"><Download size={16} /> Export All</button></div></div>)}<div className="mt-16 space-y-8"><div className="prose prose-gray max-w-none"><h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Random Setting Generator</h2><p className="text-gray-700 dark:text-gray-300 mb-4">Our random setting generator creates vivid, atmospheric locations across all genres. Generate random settings for fantasy, sci-fi, contemporary, historical, and speculative fiction.</p></div></div><div className="mt-12 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700"><h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Related Tools</h3><div className="grid md:grid-cols-2 gap-4"><Link to="/random-worldbuilding-prompts-generator" className="text-amber-600 hover:underline flex items-center gap-2"><Crown size={16} />Worldbuilding Generator</Link><Link to="/writing-prompts" className="text-amber-600 hover:underline flex items-center gap-2"><PenTool size={16} />Writing Prompts</Link></div></div></div><section className="bg-white dark:bg-gray-800 py-16 mt-16 transition-colors"><div className="max-w-4xl mx-auto px-4"><h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2><div className="space-y-6"><div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700"><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What is a setting in storytelling?</h3><p className="text-gray-700 dark:text-gray-300">A setting is the time and place where a story occurs. It includes physical location, time period, atmosphere, and cultural context that shape the narrative and characters.</p></div><div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700"><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I use generated settings in my stories?</h3><p className="text-gray-700 dark:text-gray-300">Yes! All random settings generated by RandomPrompts.org are free to use in your creative projects including novels, games, screenplays, and stories.</p></div></div></div></section></div><Footer /></div>);
};
export default RandomSettingGeneratorPage;
