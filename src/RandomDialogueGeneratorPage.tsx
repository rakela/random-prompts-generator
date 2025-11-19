import React, { useState, useCallback } from 'react';
import SEO from './components/SEO';
import { Copy, RefreshCw, Save, Download, Sparkles, PenTool, BookOpen, Crown, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';

const promptData = {
  dialogue: {
    conflict: [
      '"You said you\'d be there," she whispered, fighting back tears. "You promised."\n"I know, and I\'m sorry, but-"\n"No. No more excuses. I\'m done."',
      '"This is your fault!" he shouted, slamming his fist on the table.\n"My fault?" She laughed bitterly. "You made your choice. Live with it."',
      '"I trusted you with everything," Marcus said quietly. "How could you betray me like this?"\n"It wasn\'t personal," came the cold reply. "It was business."',
      '"Choose," the captain demanded. "Her or the mission. You can\'t save both."\n"Then I\'ll find a third option," Sarah replied, her voice steady despite her pounding heart.',
      '"You\'re making a mistake," the old man warned.\n"Maybe," she agreed, "but it\'s my mistake to make."',
      '"I can\'t do this anymore," he said, his voice breaking. "I can\'t keep pretending everything\'s fine."\n"Then stop pretending. Tell me the truth."',
      '"The data says otherwise," Dr. Chen insisted, pointing at the screen.\n"Then your data is wrong!" her colleague shot back. "I\'ve seen it with my own eyes."',
      '"You don\'t understand what you\'re asking," the stranger replied, backing away.\n"Then help me understand. Because right now, I have no other choice."',
      '"Leave her out of this," Jake growled, stepping between them.\n"Too late for that," the villain smiled. "She\'s already involved."',
      '"I followed your orders," the lieutenant said through clenched teeth. "Good soldiers followed orders."\n"Then maybe," the general replied softly, "we need fewer good soldiers."'
    ],
    mysterious: [
      '"They told me you\'d come," the old woman said, not looking up from her knitting.\n"Who told you?"\n"The ones who know. They always know."',
      '"The door in the basement," he whispered urgently. "Whatever you do, don\'t open it after midnight."\n"Why? What\'s behind it?"\nHe was already gone.',
      '"I remember you," she said, studying his face. "From the photograph. But you\'re supposed to be dead."\n"I am dead. At least, I should be."',
      '"This place doesn\'t exist on any map," the driver said, pulling away quickly. "And you were never here."\nShe watched the car disappear into the fog.',
      '"Everyone who investigates this case goes missing," the detective warned. "Everyone."\n"Then I guess I\'m about to become an exception," she replied.',
      '"The numbers," he muttered, scribbling frantically. "They\'re communicating. Can you see it?"\n"All I see is a crazy person with too much coffee."',
      '"She visits every year on this day," the innkeeper explained. "Always asks for room 237. Always checks out before sunrise. Never ages."\n"How long has this been happening?"\n"Seventy-three years."',
      '"Don\'t trust your reflection," the message read. "It\'s not always you looking back."\nHe folded the note carefully, glancing nervously at the mirror.',
      '"The library closes in five minutes," the librarian announced.\n"But I just got here."\n"That was three hours ago."\nHe checked his watch. She was right.',
      '"Your brother asked me to give you this," the stranger said, handing over a sealed envelope.\n"I don\'t have a brother."\n"You did. Once."'
    ],
    romantic: [
      '"I love you," he said simply. "I have for years. I just never had the courage to say it."\nShe looked up, tears streaming down her face. "You idiot. I loved you too. All this time..."',
      '"Dance with me," she offered, extending her hand.\n"There\'s no music."\n"Then we\'ll make our own," she smiled.',
      '"Five more minutes," he mumbled, pulling her closer.\n"You said that an hour ago," she laughed.\n"And I meant it then too."',
      '"I don\'t believe in fate," he said.\n"Neither do I," she replied. "But I believe in us. Isn\'t that enough?"\n"It\'s everything."',
      '"We\'re terrible for each other," she said, though she didn\'t pull away.\n"The worst," he agreed, closing the distance between them.\n"This is a bad idea."\n"The absolute worst."',
      '"I brought you coffee," he said, setting the cup on her desk.\n"It\'s 3 AM. Why are you here?"\n"Because you\'re here. And someone needs to make sure you eat."',
      '"I can\'t lose you," she whispered against his chest.\n"You\'re not going to," he promised, holding her tighter. "Not now. Not ever."',
      '"Tell me again," she requested softly.\n"I love you."\n"Again."\n"I love you."\n"One more time?"\n"Every day for the rest of our lives."',
      '"What if this doesn\'t work?" she asked, fear evident in her voice.\n"Then we\'ll fail together," he replied, taking her hand. "But at least we tried."',
      '"You kept the ticket stub," he noticed, surprised.\n"I kept everything," she admitted. "Every movie, every concert, every moment. I couldn\'t let go."'
    ],
    humorous: [
      '"I can explain," he started.\n"You better," she said, staring at the llama in their living room.\n"Okay, I can\'t explain."',
      '"Instructions unclear," he announced. "I somehow built a working time machine."\n"From IKEA furniture?"\n"The instructions were in Swedish!"',
      '"I\'m not saying it was aliens," he whispered dramatically.\n"But?" she prompted.\n"But it was definitely aliens."',
      '"The cat is plotting something," she said, eyeing the feline suspiciously.\n"Honey, all cats are always plotting something. It\'s literally their thing."\n"This feels different. More... ambitious."',
      '"I specifically said no karaoke," the wedding planner sighed.\n"You said no karaoke at the reception," the groom clarified. "This is the ceremony."\n"That\'s worse! This is so much worse!"',
      '"Your resume says expert multitasker," the interviewer noted.\n"Yes."\n"You\'re currently eating a sandwich, texting, and juggling."\n"And absolutely crushing this interview, if I may say so."',
      '"The good news is, I found your car."\n"And the bad news?"\n"Remember how you were worried about the parking ticket?"\n"Yes..."\n"Not your biggest problem anymore."',
      '"I am not a morning person," she growled into her coffee.\n"It\'s 2 PM."\n"Your point being?"',
      '"We need to talk about your online shopping," he said gently.\n"I don\'t have a problem."\n"There\'s a pallet of rubber ducks in the driveway."\n"They\'re for... charity."',
      '"Trust me," he said confidently. "I\'ve done this before."\n"Really?"\n"Well, I\'ve watched someone do it on YouTube. Same thing."'
    ],
    dramatic: [
      '"If you walk out that door," he said quietly, "don\'t come back."\nShe paused, hand on the doorknob. "Goodbye, then."\nThe door closed with a soft click that echoed like thunder.',
      '"The test results came back," the doctor said, his expression grave.\n"And?"\n"You should sit down."\n"Just tell me. Please."',
      '"He didn\'t make it," the nurse said softly. "I\'m so sorry."\nThe world stopped. Everything went silent. Nothing would ever be the same.',
      '"You\'re my son!" his father shouted. "How could you side with them?"\n"Because they\'re right," he replied steadily. "And you taught me to do what\'s right, no matter the cost."',
      '"The jury has reached a verdict," the judge announced.\nHer hands trembled. Twenty years of fighting for this moment. Everything depended on the next words.',
      '"I hereby resign," she stated clearly into the microphone, cameras flashing.\nThe crowd erupted. History was being made.',
      '"Tell my family I loved them," he gasped, blood seeping through his fingers.\n"Tell them yourself," she insisted, pressing harder on the wound. "You\'re going to be fine. Do you hear me? You\'re going to be fine."',
      '"The city\'s evacuating," the radio crackled. "This is not a drill. I repeat, this is not a drill."\nHe looked at the horizon. They had maybe an hour.',
      '"Choose," the voice commanded. "Save a thousand strangers or one person you love."\n"No," she said firmly. "I\'m not playing your game."\n"Then everyone dies."',
      '"It\'s over," the commander said, watching the last ship escape. "We held them off long enough."\n"What about us, sir?"\n"We knew the mission when we volunteered. No regrets."'
    ],
    philosophical: [
      '"What is truth, really?" he mused, staring at the stars. "Our perception? Objective reality? Or something else entirely?"\n"Maybe," she replied, "truth is what we agree to believe together."',
      '"If you could erase one memory," the therapist asked, "which would it be?"\n"None," she said after a long pause. "Even the painful ones made me who I am. To erase them would erase myself."',
      '"Do you think we\'re the heroes of our story?" he asked.\n"I think," she said carefully, "we\'re all the heroes and villains of different stories, depending on who\'s telling them."',
      '"Time is an illusion," the physicist insisted.\n"Tell that to my aging body," his friend laughed.\n"What if age is just the illusion of experiencing time?"',
      '"Why do we create?" she asked, brush poised over canvas.\n"To prove we existed," he suggested. "To leave something behind that says we were here."\n"Or maybe," she added, "because not creating would be a kind of death."',
      '"If consciousness is just neurons firing," he wondered aloud, "what makes love feel so real?"\n"Maybe reality and feeling are the same thing," she proposed. "Maybe what we feel is the only reality that matters."',
      '"You can\'t change the past," he said.\n"But we change how we understand it," she countered. "Every memory is a new interpretation. The past is always becoming something different."',
      '"Freedom or security?" the philosopher posed.\n"Neither is worth much without the other," his student replied. "And pursuing only one leads to losing both."',
      '"What makes a life meaningful?" she asked the dying man.\n"Not what you achieve," he whispered, "but what you give. What you leave behind in others hearts."',
      '"Are we our choices," he asked, "or our circumstances?"\n"Both," she answered. "And neither. We\'re the space between them – the constant negotiation of who we want to be."'
    ]
  }
};

const weightedRandom = (items) => items[Math.floor(Math.random() * items.length)];

const processTemplate = (data, controls) => {
  const selectedType = controls.type && controls.type !== 'any'
    ? controls.type
    : weightedRandom(['conflict', 'mysterious', 'romantic', 'humorous', 'dramatic', 'philosophical']);

  return weightedRandom(data[selectedType]);
};

const RandomDialogueGeneratorPage = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [savedPrompts, setSavedPrompts] = useLocalStorage('random-dialogue-generator-saved-prompts', []);
  const [promptHistory, setPromptHistory] = useLocalStorage('random-dialogue-generator-prompt-history', []);
  const [favorites, setFavorites] = useLocalStorage('random-dialogue-generator-favorites', []);
  const [showHistory, setShowHistory] = useState(false);
  const [controls, setControls] = useState({
    type: 'any',
    count: 'single'
  });

  const generatePrompt = useCallback(() => {
    const data = promptData.dialogue;
    const batchSize = controls.count === 'multiple' ? 3 :
                     controls.count === 'batch' ? 5 : 1;

    const dialogues = [];
    for (let i = 0; i < batchSize; i++) {
      const dialogue = processTemplate(data, controls);
      dialogues.push(dialogue);
    }

    const prompt = {
      id: Date.now(),
      text: batchSize === 1 ? dialogues[0] : dialogues.join('\n\n---\n\n'),
      category: 'dialogue',
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
          title: 'Random Dialogue Generator',
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
    link.download = 'saved-dialogues.json';
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
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
        {isMultiple ? (
          <div className="mb-4 space-y-4">
            {prompt.text.split('\n\n---\n\n').map((dialogue, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded border text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
                {dialogue}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-4 whitespace-pre-line">{prompt.text}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => copyToClipboard(prompt.text)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-colors">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 dark:from-gray-900 to-white dark:to-gray-800">
      <SEO pageKey="randomDialogueGenerator" />

      <Header
        promptHistory={promptHistory}
        showHistory={showHistory}
        onHistoryToggle={() => setShowHistory(!showHistory)}
      />

      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Random Dialogue Generator</h1>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Generate unique random dialogue instantly with our free dialogue generator. Create conflict-driven conversations, mysterious exchanges, romantic interactions, and dramatic dialogues perfect for stories, scripts, and creative writing.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
          <Link to="/writing-prompts" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700">
            <PenTool size={18} /> Writing
          </Link>
          <Link to="/ai-images-prompt" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
              <path d="m14 7 3 3"></path><path d="M5 6v4"></path><path d="M19 14v4"></path><path d="M10 2v2"></path><path d="M7 8H3"></path><path d="M21 16h-4"></path><path d="M11 3H9"></path>
            </svg>
            AI Images
          </Link>
          <Link to="/ai-blog-post-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700">
            <BookOpen size={18} /> Blog post
          </Link>
          <Link to="/short-story-prompts-generator" className="flex items-center gap-2 px-6 py-3 font-medium transition-all text-gray-600  hover:text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700">
            <Crown size={18} /> Short stories
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select value={controls.type} onChange={(e) => updateControl('type', e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100">
              <option value="any">Any Type</option>
              <option value="conflict">Conflict</option>
              <option value="mysterious">Mysterious</option>
              <option value="romantic">Romantic</option>
              <option value="humorous">Humorous</option>
              <option value="dramatic">Dramatic</option>
              <option value="philosophical">Philosophical</option>
            </select>
            <select value={controls.count} onChange={(e) => updateControl('count', e.target.value)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100">
              <option value="single">Single Dialogue</option>
              <option value="multiple">Generate 3 Dialogues</option>
              <option value="batch">Generate 5 Dialogues</option>
            </select>
          </div>

          <div className="text-center mb-8">
            <button onClick={() => generatePrompt()} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
              Generate Random Dialogue
            </button>
          </div>

          {generatedPrompt && renderPromptCard(generatedPrompt)}

          {showHistory && (
            <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Dialogues</h3>
                <button onClick={() => setPromptHistory([])} className="text-sm text-gray-500 hover:text-red-600 transition-colors">Clear History</button>
              </div>
              {promptHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent dialogues. Generate some to see them here!</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {promptHistory.map((prompt) => (
                    <div key={prompt.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed line-clamp-3 whitespace-pre-line">{prompt.text}</p>
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Saved Dialogues</h3>
                <button onClick={exportPrompts} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Download size={16} /> Export All
                </button>
              </div>
              <div className="grid gap-4">
                {savedPrompts.slice(-5).map((prompt, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{prompt.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 space-y-8">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Random Dialogue Generator</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our random dialogue generator creates authentic, engaging conversations across multiple tones and contexts including conflict-driven arguments, mysterious exchanges, romantic interactions, humorous banter, dramatic confrontations, and philosophical discussions. Generate random dialogue for character development, script writing, and story creation.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This free dialogue generator produces high-quality character conversations perfect for novels, screenplays, creative writing exercises, and storytelling practice. Each generated dialogue captures realistic character voices, emotional depth, and narrative tension.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">Random Dialogue Generator Features:</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Six dialogue types: conflict, mysterious, romantic, humorous, dramatic, and philosophical</li>
                  <li>• Realistic character voices with emotional depth and narrative tension</li>
                  <li>• Batch generation: Create 1, 3, or 5 random dialogues at once</li>
                  <li>• Perfect for writers, screenwriters, novelists, and creative storytellers</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Example Random Dialogues:</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Conflict: "You said you'd be there," she whispered. "You promised." "I know, and I'm sorry, but-" "No. No more excuses."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Mysterious: "They told me you'd come," the old woman said. "Who told you?" "The ones who know. They always know."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Romantic: "I love you," he said simply. "I have for years." She looked up, tears streaming. "You idiot. I loved you too."</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Humorous: "I can explain," he started. "You better," she said, staring at the llama in their living room.</span></li>
                <li className="flex gap-2"><span className="text-blue-600 font-bold">•</span> <span>Dramatic: "If you walk out that door," he said quietly, "don\'t come back." She paused. "Goodbye, then."</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Related Writing Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/random-character-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <PenTool size={16} />
                Random Character Generator
              </Link>
              <Link to="/random-conflict-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <Sparkles size={16} />
                Conflict Generator
              </Link>
              <Link to="/writing-prompts" className="text-blue-600 hover:underline flex items-center gap-2">
                <Crown size={16} />
                Writing Prompts Generator
              </Link>
              <Link to="/random-emotion-prompt-generator" className="text-blue-600 hover:underline flex items-center gap-2">
                <BookOpen size={16} />
                Emotion Prompt Generator
              </Link>
            </div>
          </div>
        </div>

        <section className="bg-white dark:bg-gray-800 py-16 mt-16 transition-colors">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What is a random dialogue generator?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A random dialogue generator is a tool that creates realistic character conversations across various tones including conflict, mystery, romance, humor, drama, and philosophical discussions. Its perfect for character development, script writing, and storytelling practice.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">How can random dialogue help with writing?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Random dialogue provides examples of character voice, emotional authenticity, and narrative tension. Use generated dialogues to study conversation structure, practice different tones, develop character relationships, or overcome dialogue writing blocks. They re excellent for learning how to write realistic conversations.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Can I use generated dialogues in my stories?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! All random dialogues generated by RandomPrompts.org are free to use as inspiration, practice examples, or starting points for your novels, screenplays, short stories, and creative writing projects. Adapt them to fit your characters and narrative needs.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">What dialogue types are available?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our random dialogue generator offers six distinct types: conflict dialogues for tension and arguments, mysterious conversations for intrigue, romantic exchanges for love stories, humorous banter for comedy, dramatic confrontations for intense scenes, and philosophical discussions for deeper themes.
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

export default RandomDialogueGeneratorPage;
