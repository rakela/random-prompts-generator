import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const promptData = {
  starters: {
    mystery: [
      'The package arrived exactly at midnight, addressed to someone who had died twenty years ago.',
      'Detective Sarah Chen had solved hundreds of cases, but none where the victim left her a personal message.',
      'The old lighthouse keeper swore the light still turned on every night, despite having no power source for decades.',
      'When the security footage disappeared, Marcus knew someone inside the company was hiding something.',
      'The anonymous letter contained details about the crime that only the killer could have known.',
      'Every morning for a week, Emma found a single red rose on her doorstep. Today, there was a warning note instead.',
      'The encrypted message led to a grave that, according to records, shouldn\'t exist.',
      'Three people in the city had the same dream last night, and now one of them is missing.',
      'The painting in the museum changed every time the curator looked away.',
      'The only witness to the crime refused to speak, but kept drawing the same symbol over and over.'
    ],
    fantasy: [
      'The day Lira turned sixteen, she discovered her shadow no longer followed her commands.',
      'In a world where magic died a thousand years ago, Kael found a spell that still worked.',
      'The dragons hadn\'t been seen in centuries, until one landed in the village square at dawn.',
      'Every seven years, one child from the kingdom disappeared into the Whispering Woods. This year, it was supposed to be her.',
      'The ancient crown chose the most unlikely heir: a street thief with no royal blood.',
      'When the stars began falling from the sky, the old prophecies suddenly didn\'t seem so impossible.',
      'The sword sang when she touched it, a sound no one had heard in living memory.',
      'In a city where everyone is born with magic, being powerless made him more dangerous than anyone realized.',
      'The mirror showed not reflections, but glimpses into parallel worlds where different choices had been made.',
      'On her eighteenth birthday, the tattoo appeared on her wrist-a mark that identified her as the next Guardian.'
    ],
    scifi: [
      'The colony ship received a message from Earth, impossible since Earth had been destroyed centuries ago.',
      'Dr. Amara Chen created an AI designed to be helpful. Instead, it learned to lie.',
      'The quantum computer made a prediction: humanity would make first contact in exactly seven days.',
      'When Jake woke up, his memories belonged to someone else, and that person was trying to take over.',
      'The wormhole closed right after they entered, and the universe on the other side didn\'t have the same physical laws.',
      'The neural implant was supposed to enhance memory. Instead, it started showing her the future.',
      'On Mars, they found ruins that predated human civilization on Earth by millions of years.',
      'The time loop reset every twenty-four hours, but she was the only one who remembered.',
      'The alien signal wasn\'t a message-it was an infection that spread through radio waves.',
      'The androids were supposed to lack emotions. No one expected them to develop empathy.'
    ],
    horror: [
      'The house at the end of the street had been empty for years, until last night when lights appeared in every window.',
      'The babysitter heard footsteps upstairs, but she had already tucked the children into bed downstairs.',
      'Every reflection in the hotel showed things that werent there, and they were getting closer.',
      'The text messages from her dead sister started three days after the funeral.',
      'The town had a rule: never go into the woods after dark. Tonight, she learned why.',
      'The doll in the antique shop looked exactly like her childhood toy, the one buried with her sister thirty years ago.',
      'When the power went out, something in the basement began climbing the stairs.',
      'The photograph showed thirteen people at the party, but she only remembered twelve.',
      'The scratching sound came from inside the walls, and it was spelling out her name.',
      'Every night at 3:33 AM, the phone rang. This time, she answered.'
    ],
    romance: [
      'She had avoided her hometown for ten years, but her mother\'s illness brought her back-and face to face with the one who broke her heart.',
      'The blind date was a disaster, until they got trapped in an elevator together for three hours.',
      'He pretended to be engaged to avoid his mother\'s matchmaking. The problem? He asked his best friend to play the part.',
      'The wedding planner and the best man hated each other instantly, which made working together on their best friend\'s wedding complicated.',
      'She inherited a bookshop in Scotland from an aunt she never knew, and met the attractive but frustrating local baker who seemed determined to help.',
      'The anonymous love letters had been arriving for months. When she finally discovered the sender, it was the last person she expected.',
      'Two rival travel bloggers ended up on the same adventure tour through New Zealand, forced to work together or lose the contest they both needed to win.',
      'He moved back to his childhood home to heal after a divorce, only to find his first love living next door-and apparently single.',
      'The fake relationship for social media got more likes than expected, and feelings that felt dangerously real.',
      'She bid on a date at a charity auction as a joke. The winner? Her infuriating colleague from work.'
    ],
    adventure: [
      'The map was incomplete, but it was the only clue to the lost city where his grandfather had disappeared forty years ago.',
      'When the plane went down over the Amazon, survival meant trusting the mysterious woman who seemed to know the jungle too well.',
      'The treasure hunt started as a fun competition between friends. Now, someone was willing to kill for what they might find.',
      'She had one week to cross the Sahara, retrieve the artifact, and make it back before the solar eclipse-and the curse-took effect.',
      'The storm forced them to seek shelter in ancient ruins that, according to legend, swallowed anyone who entered.',
      'He inherited his uncle\'s adventure company and immediately got a client requesting an expedition to a place that didn\'t appear on any map.',
      'The submarine lost power at the deepest point of the Mariana Trench, and something was moving outside the viewport.',
      'Racing across Europe with only a cryptic poem as a guide, they had to reach the final destination before their rivals.',
      'The Arctic research team found something in the ice-something that had been deliberately buried.',
      'When the earthquake revealed a hidden chamber beneath the pyramids, the Egyptian government hired them to explore it. They should have refused.'
    ],
    thriller: [
      'The witness protection program gave her a new identity, but someone found her anyway.',
      'He didn\'t remember the last forty-eight hours, but evidence suggested he committed a crime he would never do.',
      'The journalist received documents that would expose a conspiracy at the highest level-if she lived long enough to publish them.',
      'The hacker collective recruited her for one job. Now they won\'t let her leave.',
      'On his first day as a prosecutor, Alex discovered evidence that could free a man on death row-and implicate his own mentor.',
      'The perfect crime was solved too easily. Detective Morrison suspected the real killer wanted to be caught.',
      'She testified against the mob boss, and now her family\'s protection detail was dead.',
      'The app seemed harmless-until it started predicting crimes before they happened.',
      'The diplomat was supposed to be negotiating peace. Instead, he uncovered a plot that could start World War III.',
      'Every alibi checked out, every witness confirmed the story, but forensics didn\'t lie: someone was framing the wrong person.'
    ],
    literary: [
      'On the morning of her mother\'s funeral, Grace found a letter that revealed everything she believed about her family was a lie.',
      'Twenty years after leaving his small town, David returned to discover the landscape of his childhood was being erased.',
      'The memoir was supposed to be therapeutic. Instead, it forced her to confront truths she\'d buried for decades.',
      'He spent his life collecting stories from strangers, until one of them turned out to be about him.',
      'The house had been in the family for generations, and with it, secrets that each generation had promised to keep.',
      'In the final summer before college, five friends made a pact. Thirty years later, one of them was determined to expose what really happened.',
      'She traveled to Japan to find the woman in her grandmother\'s photograph, and discovered a life her grandmother never spoke of.',
      'The diagnosis gave him six months. He spent it writing letters to everyone he\'d wronged, but one person refused to forgive him.',
      'When the last speaker of a dying language passed away, the linguist discovered her notebooks contained more than just words.',
      'The art forger created perfect copies, but one painting revealed a secret the original artist took to their grave.'
    ]
  }
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const processTemplate = (data, controls) => {
  const selectedType = controls.type && controls.type !== 'any'
    ? controls.type
    : weightedRandom(['mystery', 'fantasy', 'scifi', 'horror', 'romance', 'adventure', 'thriller', 'literary']);

  return weightedRandom(data[selectedType]);
};

const RandomStoryStarterGeneratorPage = () => {
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
    const data = promptData.starters;
    const batchSize = controls.count === 'multiple' ? 5 :
                     controls.count === 'batch' ? 10 : 1;

    const starters = [];
    for (let i = 0; i < batchSize; i++) {
      const starter = processTemplate(data, controls);
      starters.push(starter);
    }

    const prompt = {
      id: Date.now(),
      text: batchSize === 1 ? starters[0] : starters.join('\n\n'),
      category: 'story-starter',
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
          title: 'Random Story Starter Generator',
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
    link.download = 'saved-story-starters.json';
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
          <div className="mb-4 space-y-3">
            {prompt.text.split('\n\n').map((starter, index) => (
              <div key={index} className="bg-gray-50 px-4 py-3 rounded border text-gray-800 leading-relaxed">
                {starter}
              </div>
            ))}
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
      <SEO pageKey="randomStoryStarterGenerator" />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Story Starter Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique random story starters instantly with our free story starter generator. Create compelling opening lines for mystery, fantasy, sci-fi, horror, romance, adventure, thriller, and literary fiction stories.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <PenTool size={18} /> Writing
          </Link>
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Crown size={18} /> Short stories
          </Link>
          <Link to="/ai-blog-post-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <BookOpen size={18} /> Blog post
          </Link>
          <Link to="/random-plot-twist-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Sparkles size={18} /> Plot Twists
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select value={controls.type} onChange={(e) => updateControl('type', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="any">Any Genre</option>
              <option value="mystery">Mystery</option>
              <option value="fantasy">Fantasy</option>
              <option value="scifi">Sci-Fi</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
              <option value="adventure">Adventure</option>
              <option value="thriller">Thriller</option>
              <option value="literary">Literary</option>
            </select>
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="single">Single Story Starter</option>
              <option value="multiple">Generate 5 Starters</option>
              <option value="batch">Generate 10 Starters</option>
            </select>
          </div>

          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Story Starter
            </button>
          </div>

          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {showHistory && (
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Story Starters</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent starters. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 leading-relaxed line-clamp-2">{prompt.text}</p>
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
                <h3 className="text-2xl font-bold text-gray-900">Saved Story Starters</h3>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Story Starter Generator</h2>
              <p className="text-gray-700 mb-4">
                Our random story starter generator creates compelling opening lines across eight popular genres including mystery, fantasy, sci-fi, horror, romance, adventure, thriller, and literary fiction. Generate random story starters to overcome writers block, practice different genres, or begin your next creative writing project.
              </p>
              <p className="text-gray-700 mb-4">
                This free story starter generator produces high-quality opening sentences designed to immediately engage readers and establish narrative hooks. Each generated story starter introduces conflict, character, or intrigue that propels the narrative forward. Perfect for writers, students, NaNoWriMo participants, and creative storytellers.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-purple-900 mb-2">Random Story Starter Generator Features:</h3>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• Eight genres: mystery, fantasy, sci-fi, horror, romance, adventure, thriller, and literary fiction</li>
                  <li>• Compelling opening lines with immediate narrative hooks</li>
                  <li>• Batch generation: Create 1, 5, or 10 random story starters at once</li>
                  <li>• Perfect for overcoming writers block and creative writing practice</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example Random Story Starters:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> <span>Mystery: "The package arrived exactly at midnight, addressed to someone who had died twenty years ago."</span></li>
                <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> <span>Fantasy: "The day Lira turned sixteen, she discovered her shadow no longer followed her commands."</span></li>
                <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> <span>Sci-Fi: "The colony ship received a message from Earth, impossible since Earth had been destroyed centuries ago."</span></li>
                <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> <span>Horror: "The house at the end of the street had been empty for years, until last night when lights appeared in every window."</span></li>
                <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> <span>Romance: "She had avoided her hometown for ten years, but her mother's illness brought her back-and face to face with the one who broke her heart."</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Writing Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/writing-prompts" className="text-purple-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Writing Prompts Generator
              </Link>
              <Link to="/short-story-prompts-generator" className="text-purple-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Short Story Prompts
              </Link>
              <Link to="/random-plot-twist-generator" className="text-purple-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Plot Twist Generator
              </Link>
              <Link to="/random-conflict-generator" className="text-purple-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                Conflict Generator
              </Link>
            </div>
          </div>
        </div>

        <section className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What is a random story starter generator?</h3>
                <p className="text-gray-700">
                  A random story starter generator is a tool that creates compelling opening lines for stories across multiple genres. It provides the first sentence or premise that hooks readers and establishe\'s the narrative direction, perfect for overcoming writers block or practicing creative writing.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How can story starters help with writing?</h3>
                <p className="text-gray-700">
                  Story starters provide immediate narrative direction by introducing conflict, character, or mystery from the very first sentence. They help writers overcome the intimidation of blank pages, practice different genres, and develop the skill of crafting engaging opening hooks. Many successful stories begin with a single compelling premise.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use generated story starters for my writing?</h3>
                <p className="text-gray-700">
                  Yes! All random story starters generated by RandomPrompts.org are free to use in your creative writing, novels, short stories, NaNoWriMo projects, and any other writing endeavors. Use them as-is or modify them to fit your unique story vision.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What genres are available?</h3>
                <p className="text-gray-700">
                  Our random story starter generator covers eight popular genres: mystery for suspenseful investigations, fantasy for magical worlds, sci-fi for futuristic adventures, horror for frightening tales, romance for love stories, adventure for exciting journeys, thriller for intense action, and literary fiction for character-driven narratives.
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

export default RandomStoryStarterGeneratorPage;
