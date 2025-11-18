import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const promptData = {
  sentences: {
    starters: [
      'The stars shimmered above the ancient temple, revealing secrets lost to time.',
      'Without warning, the ground beneath their feet began to tremble.',
      'She discovered the hidden journal tucked behind the bookshelf.',
      'Music drifted through the empty streets long after midnight.',
      'Lightning split the sky, illuminating the path forward.',
      'In the depths of winter, hope bloomed like an unexpected flower.',
      'His words echoed through the empty hall, unanswered.',
      'The photograph revealed a truth no one was prepared to face.',
      'Beyond the mountains lay a world untouched by modern civilization.',
      'Her laughter filled the room, dispelling the heavy silence.',
      'The compass spun wildly, pointing nowhere and everywhere at once.',
      'Footprints in the snow led to a place that shouldnt exist.',
      'The old clock struck thirteen, though it had been broken for years.',
      'Beneath the ordinary facade, something extraordinary was awakening.',
      'The letter arrived on the anniversary of his disappearance.',
      'Memories flooded back as the familiar scent filled the air.',
      'Against all odds, the experiment succeeded beyond their wildest dreams.',
      'The painting changed every time she looked away.',
      'Dawn broke over the city, bringing with it unexpected revelations.',
      'His shadow moved independently, a warning of things to come.'
    ],
    mysterious: [
      'The door that wasnt there yesterday beckoned with silent promise.',
      'Every mirror in the house showed a different reflection.',
      'The stranger knew her name though theyd never met before.',
      'Objects rearranged themselves when no one was watching.',
      'The message appeared in a language that hadnt existed for centuries.',
      'Dreams became reality, but not in the way anyone expected.',
      'The photograph showed people who hadnt been there when it was taken.',
      'Time moved differently inside the abandoned mansion.',
      'The antique music box played songs that hadnt been written yet.',
      'Shadows lengthened in directions they shouldnt.',
      'The missing persons case connected to events from fifty years ago.',
      'Her reflection smiled when she didnt.',
      'The book wrote itself, new pages appearing overnight.',
      'Voices whispered from behind walls that should be solid.',
      'The portrait aged while everything else remained the same.',
      'Electronic devices malfunctioned in her presence without explanation.',
      'The locked room contained evidence of someone living there.',
      'Stars formed patterns that spelled out impossible warnings.',
      'The lighthouse keeper vanished, but the light still burned.',
      'Memory and reality blurred until no one knew which was which.'
    ],
    emotional: [
      'Tears of joy streamed down her face as the plane touched down.',
      'The weight of guilt pressed heavily on his shoulders.',
      'Her heart swelled with pride watching her daughter perform.',
      'Loneliness wrapped around him like a cold blanket.',
      'Relief washed over them when the test results came back clear.',
      'Anger simmered beneath the surface of his calm exterior.',
      'The reunion brought bittersweet memories flooding back.',
      'Fear paralyzed her, rendering her unable to move or speak.',
      'Gratitude filled her heart for the kindness of strangers.',
      'Disappointment etched lines across his weary face.',
      'Love radiated from every gesture, every word, every glance.',
      'Anxiety gnawed at the edges of her thoughts.',
      'The betrayal cut deeper than any physical wound could.',
      'Hope flickered like a candle in the darkness.',
      'Shame colored her cheeks as the truth came to light.',
      'Wonder sparkled in the childs eyes seeing snow for the first time.',
      'Grief settled in her bones, a permanent, heavy companion.',
      'Excitement bubbled up, impossible to contain.',
      'Contentment came not from having everything, but from wanting nothing more.',
      'Regret haunted his quiet moments, whispering what if.'
    ],
    philosophical: [
      'Reality bends to perception more than truth.',
      'Every choice creates a universe where the opposite occurred.',
      'Consciousness may be the universes way of observing itself.',
      'The meaning we seek is the meaning we create.',
      'Time flows not in a line but in spirals of possibility.',
      'Identity remains fluid, shaped by experience and reflection.',
      'Questions matter more than answers in the pursuit of wisdom.',
      'Freedom and security exist in perpetual tension.',
      'Beauty lies in imperfection, not despite it.',
      'The self is both singular and multiple, constant and changing.',
      'Knowledge expands the boundaries of ignorance.',
      'Existence precedes essence in the construction of meaning.',
      'Language shapes thought as much as thought shapes language.',
      'The past exists only in memory, the future only in imagination.',
      'Suffering and growth often walk hand in hand.',
      'Truth reveals itself in layers, never all at once.',
      'Connection defines us more than independence.',
      'The universe appears designed because we evolved within it.',
      'Chaos and order dance together in the patterns of nature.',
      'Death gives meaning to life through the gift of limitation.'
    ],
    action: [
      'The glass shattered as she rolled beneath the hail of gunfire.',
      'He sprinted toward the closing door, reaching it with seconds to spare.',
      'Metal clashed against metal as the swords met in mid-air.',
      'The building exploded behind them as they dove for cover.',
      'She yanked the steering wheel hard left, narrowly avoiding collision.',
      'The guard crumpled to the ground before the alarm could be raised.',
      'Adrenaline surged through his veins as he leaped across the chasm.',
      'The arrow whistled past her ear, embedding itself in the wall.',
      'They burst through the barricade in a shower of splinters.',
      'His fist connected with jaw-breaking force.',
      'The helicopter descended rapidly as ground fire erupted around them.',
      'She pivoted and kicked, sending her attacker sprawling.',
      'The timer hit zero as they cleared the blast radius.',
      'Bullets ricocheted off steel beams in a deadly symphony.',
      'He vaulted over the railing, landing in a roll on the floor below.',
      'The door buckled under repeated impacts before finally giving way.',
      'Fire erupted around them as the fuel tanks ignited.',
      'She slid beneath the descending gate just as it sealed shut.',
      'The pursuing vehicle flipped end over end after hitting the spike strip.',
      'With a desperate lunge, he caught the falling child mid-air.'
    ],
    descriptive: [
      'Golden sunlight filtered through leaves, creating dancing shadows on the forest floor.',
      'The ocean stretched endlessly, it's surface glittering like scattered diamonds.',
      'Frost painted intricate patterns on the windowpane, delicate as lace.',
      'The market overflowed with colors, scents, and the cheerful chaos of commerce.',
      'Mountains rose majestically against the horizon, their peaks crowned with snow.',
      'Autumn leaves crunched underfoot, a carpet of rust and gold.',
      'The library smelled of old paper, leather, and countless untold stories.',
      'Rain drummed steadily against the roof, a soothing, rhythmic melody.',
      'The abandoned factory stood rusted and silent, a monument to forgotten industry.',
      'Cherry blossoms drifted on the breeze like pink snow.',
      'The desert night sky blazed with more stars than seemed possible.',
      'Fog rolled through the valley, obscuring everything in gray mystery.',
      'The cafe buzzed with conversation, clinking cups, and the hiss of the espresso machine.',
      'Moonlight painted the lake silver, still as glass.',
      'The city skyline glowed with a thousand windows, each a separate story.',
      'Thunder rumbled in the distance, promising a storm to come.',
      'The garden bloomed in wild profusion, nature barely contained.',
      'Snow muffled all sound, creating a peaceful, white-blanketed world.',
      'The sunset painted the clouds in shades of orange, pink, and purple.',
      'Ancient stone walls held centuries of history within their worn surfaces.'
    ],
    humor: [
      'The cat knocked the vase off the shelf with the precision of a trained assassin.',
      'His attempt at cooking resulted in smoke alarms and a fire department visit.',
      'She opened the closet, and an avalanche of random objects tumbled out.',
      'The meeting that could have been an email stretched into it's third hour.',
      'His dance moves suggested someone fighting invisible bees.',
      'The WiFi password was changed, bringing civilization to it's knees.',
      'She promised to wake up early, a lie she told herself every night.',
      'The assembly instructions were clearly written by someone who hated humanity.',
      'His parallel parking attempt made nearby pedestrians nervous.',
      'Coffee: because adulting is hard and murder is illegal.',
      'The autocorrect changed the message from professional to catastrophically embarrassing.',
      'He tried to be mysterious and alluring but came across as mildly confused.',
      'The diet started Monday, as it had for the past seventeen Mondays.',
      'She laughed at the notification saying her storage was full – everything is full.',
      'The cat judged him silently, as cats do, finding him wanting.',
      'His budget spreadsheet was more fiction than his actual novel.',
      'The plant died despite her best efforts and extensive googling.',
      'He pretended to understand the plot of the movie everyone loved.',
      'The snooze button became her most-used technology.',
      'She added "expert procrastinator" to her resume, thinking it showed honesty.'
    ],
    poetic: [
      'Stars whispered ancient lullabies to the dreaming earth below.',
      'Time flowed like honey, sweet and slow through summer afternoons.',
      'Her words bloomed like flowers in the garden of his mind.',
      'Shadows danced with light in an eternal, graceful waltz.',
      'The wind carried secrets between the branche's of sleeping trees.',
      'Memories scattered like petals on the surface of a still pond.',
      'Silence sang louder than any symphony in the space between heartbeats.',
      'Dreams painted reality in colors borrowed from forgotten hopes.',
      'The moon wore clouds like silk scarves across her silver face.',
      'Love burned gentle as candlelight, fierce as wildfire.',
      'Waves wrote poetry on the sand, only to erase it and begin again.',
      'Hope sprouted through cracks in the concrete of despair.',
      'The night sky held infinite possibilities in it's velvet embrace.',
      'Music lived in the spaces between notes, in the breath before sound.',
      'Autumn gathered summer in her arms and waltzed it into winter.',
      'Truth wore many masks but always kept the same eyes.',
      'The ocean kept time with the moon, their dance eternal.',
      'Words fell like rain, nourishing the gardens of understanding.',
      'The river remembered every stone it had smoothed along it's journey.',
      'Sunrise painted promises across the canvas of another chance.'
    ]
  }
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const processTemplate = (data, controls) => {
  const selectedType = controls.type && controls.type !== 'any'
    ? controls.type
    : weightedRandom(['starters', 'mysterious', 'emotional', 'philosophical', 'action', 'descriptive', 'humor', 'poetic']);

  return weightedRandom(data[selectedType]);
};

const RandomSentenceGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    type: 'any',
    count: 'single'
  });

  const generatePrompt = useCallback(() => {
    const data = promptData.sentences;
    const batchSize = controls.count === 'multiple' ? 5 :
                     controls.count === 'batch' ? 10 : 1;

    const sentences = [];
    for (let i = 0; i < batchSize; i++) {
      const sentence = processTemplate(data, controls);
      sentences.push(sentence);
    }

    const prompt = {
      id: Date.now(),
      text: batchSize === 1 ? sentences[0] : sentences.join('\n'),
      category: 'sentence',
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
          title: 'Random Sentence Generator',
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
    link.download = 'saved-sentences.json';
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
          <div className="mb-4">
            <div className="space-y-2">
              {prompt.text.split('\n').map((sentence, index) => (
                <div key={index} className="bg-gray-50 px-3 py-2 rounded border text-gray-800">
                  {sentence}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-800 text-lg leading-relaxed mb-4">{prompt.text}</p>
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
      <SEO pageKey="randomSentenceGenerator" />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Sentence Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique random sentences instantly with our free sentence generator. Create story starters, mysterious prompts, emotional expressions, and creative sentences perfect for writing practice and inspiration.
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
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Crown size={18} /> Short stories
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select value={controls.type} onChange={(e) => updateControl('type', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="any">Any Type</option>
              <option value="starters">Story Starters</option>
              <option value="mysterious">Mysterious</option>
              <option value="emotional">Emotional</option>
              <option value="philosophical">Philosophical</option>
              <option value="action">Action-Packed</option>
              <option value="descriptive">Descriptive</option>
              <option value="humor">Humorous</option>
              <option value="poetic">Poetic</option>
            </select>
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="single">Single Sentence</option>
              <option value="multiple">Generate 5 Sentences</option>
              <option value="batch">Generate 10 Sentences</option>
            </select>
          </div>

          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Random Sentence
            </button>
          </div>

          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {showHistory && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Sentences</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent sentences. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 leading-relaxed">{prompt.text}</p>
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
                <h3 className="text-2xl font-bold text-gray-900">Saved Sentences</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Download size={16} /> Export All
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

          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Sentence Generator</h2>
              <p className="text-gray-700 mb-4">
                Our random sentence generator creates diverse, engaging sentences across multiple styles including story starters, mysterious prompts, emotional expressions, philosophical musings, action sequences, descriptive passages, humorous quips, and poetic lines. Generate random sentences for writing practice, creative inspiration, or storytelling exercises.
              </p>
              <p className="text-gray-700 mb-4">
                This free sentence generator produces high-quality random sentences suitable for various creative purposes: writing prompts, story beginnings, dialogue practice, social media content, and creative writing exercises. Each generated sentence is designed to spark imagination and inspire your next writing project.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Random Sentence Generator Features:</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Eight distinct sentence types: starters, mysterious, emotional, philosophical, action, descriptive, humor, and poetic</li>
                  <li>• Perfect for writing practice, story development, and creative inspiration</li>
                  <li>• Batch generation: Create 1, 5, or 10 random sentences at once</li>
                  <li>• Ideal for writers, students, content creators, and creative professionals</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example Random Sentences:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Story Starter: "The stars shimmered above the ancient temple, revealing secrets lost to time."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Mysterious: "The door that wasnt there yesterday beckoned with silent promise."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Emotional: "Tears of joy streamed down her face as the plane touched down."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Action: "The glass shattered as she rolled beneath the hail of gunfire."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Poetic: "Stars whispered ancient lullabies to the dreaming earth below."</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Writing Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/random-paragraph-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Paragraph Generator
              </Link>
              <Link to="/writing-prompts" className="text-blue-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Writing Prompts Generator
              </Link>
              <Link to="/random-story-starter-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Story Starter Generator
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is a random sentence generator?</h3>
                <p className="text-gray-700">
                  A random sentence generator is a tool that creates diverse, creative sentences across multiple styles including story starters, mysterious prompts, emotional expressions, action sequences, and more. Its perfect for writing practice, creative inspiration, and overcoming writers block.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How can random sentences help with creative writing?</h3>
                <p className="text-gray-700">
                  Random sentences provide excellent starting points for stories, practice prompts for different writing styles, and inspiration when facing writers block. Use them as story openers, dialogue practice, or creative exercises to develop your writing skills across various genres and tones.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use generated sentences in my writing projects?</h3>
                <p className="text-gray-700">
                  Yes! All random sentences generated by RandomPrompts.org are free to use in your creative writing, stories, novels, blog posts, and other projects. Use them as inspiration, starting points, or incorporate them directly into your work. They re designed to spark creativity and help you develop your writing.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What types of sentences can I generate?</h3>
                <p className="text-gray-700">
                  Our random sentence generator offers eight distinct types: story starters for beginning narratives, mysterious sentences for intrigue, emotional expressions for character development, philosophical musings for depth, action-packed sequences for excitement, descriptive passages for vivid imagery, humorous quips for levity, and poetic lines for beauty.
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

export default RandomSentenceGeneratorPage;
