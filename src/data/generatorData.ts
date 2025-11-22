// Generator data for all 30 new generator pages
export interface GeneratorConfig {
  key: string;
  name: string;
  category: 'writing' | 'art' | 'creative';
  intro: string;
  howItWorks: string;
  useCases: string[];
  faq: Array<{ question: string; answer: string }>;
  internalLinks: Array<{ text: string; url: string }>;
  externalLinks: Array<{ text: string; url: string }>;
  templates: string[];
  elements: Record<string, string[]>;
}

export const generatorConfigs: Record<string, GeneratorConfig> = {
  // Writing Generators
  randomParagraph: {
    key: 'randomParagraph',
    name: 'Random Paragraph Generator',
    category: 'writing',
    intro: 'Our random paragraph generator creates instant, readable paragraphs you can use for writing practice, warm-ups, and creative exercises. Each paragraph is built from natural-sounding sentences so it feels like real text, not lorem ipsum. Use this tool when you need a paragraph to expand, rewrite, or edit, or when you want a quick starting point for a story, essay, or blog idea.',
    howItWorks: 'This random paragraph generator combines character actions, settings, objects, and emotions into coherent mini-scenes. Instead of purely random words, it uses structured templates and curated phrases so each paragraph has a clear focus. Click "Generate Paragraph" to get a new block of text. You can copy it directly into your document, use it as a writing prompt, or ask an AI like ChatGPT to expand it into a full story.',
    useCases: [
      'Daily writing warm-ups',
      'Practice editing and rewriting',
      'ESL and language learning exercises',
      'Inspiration for stories, essays, and blog posts'
    ],
    faq: [
      {
        question: 'What can I use the random paragraphs for?',
        answer: 'You can use them as writing prompts, practice material, or starting points for stories, essays, and blog posts.'
      },
      {
        question: 'Are the paragraphs unique each time?',
        answer: 'Yes. Each click generates a new combination of sentences, so you can get unlimited variations.'
      },
      {
        question: 'Can I use the content commercially?',
        answer: 'Yes, you can build on these paragraphs in your own projects. They\'re meant as creative starting points.'
      },
      {
        question: 'Is this better than lorem ipsum?',
        answer: 'For creative work, yes. These paragraphs are meaningful and can spark ideas, not just fill space.'
      }
    ],
    internalLinks: [
      { text: 'Writing Prompts', url: '/writing-prompts-generator' },
      { text: 'Short Story Prompts', url: '/short-story-prompts-generator' },
      { text: 'Random Sentence Generator', url: '/generators/sentence' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Writing Prompts', url: 'https://www.writersdigest.com/write-better-fiction/prompts' },
      { text: 'The Write Practice – Writing Exercises', url: 'https://thewritepractice.com/creative-writing-prompts/' }
    ],
    templates: [
      '{character} {action} in {location}, {feeling} about {concern}.',
      'The {adjective} {object} lay on the {surface}, forgotten since {time_period}.',
      '{character} always thought that {belief}, but {twist}.'
    ],
    elements: {
      character: ['The wanderer', 'An old friend', 'A stranger', 'The detective', 'A child', 'The artist'],
      action: ['walked slowly', 'sat quietly', 'stood waiting', 'moved carefully', 'looked around'],
      location: ['the empty street', 'a crowded café', 'the forest edge', 'an old library', 'the train station'],
      feeling: ['uncertain', 'hopeful', 'worried', 'curious', 'determined'],
      concern: ['what came next', 'the missing letter', 'yesterday\'s conversation', 'the unopened door'],
      adjective: ['rusty', 'leather-bound', 'forgotten', 'antique', 'weathered'],
      object: ['key', 'journal', 'photograph', 'coin', 'map'],
      surface: ['the desk', 'the windowsill', 'the shelf', 'the ground'],
      time_period: ['last summer', 'the war', 'childhood', 'the move'],
      belief: ['courage was enough', 'people never changed', 'home would wait forever'],
      twist: ['today proved otherwise', 'the truth was more complex', 'everything had shifted']
    }
  },

  randomSentence: {
    key: 'randomSentence',
    name: 'Random Sentence Generator',
    category: 'writing',
    intro: 'Our random sentence generator creates grammatically correct, meaningful sentences for writing practice, creative warm-ups, and language learning. Unlike generic lorem ipsum, each sentence tells a mini-story or presents an interesting idea. Use this tool for daily writing exercises, ESL practice, or to spark new story concepts.',
    howItWorks: 'This random sentence generator uses curated word lists and proven sentence structures to create readable, interesting sentences. Each generation combines subjects, verbs, and descriptive elements in natural ways. The sentences work as standalone prompts or can be combined into larger pieces. Perfect for writers who need a quick creative spark or students practicing sentence construction.',
    useCases: [
      'Writing warm-ups and daily practice',
      'ESL and grammar exercises',
      'Story starters and creative prompts',
      'Social media content ideas'
    ],
    faq: [
      {
        question: 'Are these sentences grammatically correct?',
        answer: 'Yes, all sentences follow proper grammar rules and natural language patterns.'
      },
      {
        question: 'Can I modify the generated sentences?',
        answer: 'Absolutely! Use them as starting points and adapt them to fit your needs.'
      },
      {
        question: 'How are these different from lorem ipsum?',
        answer: 'These are meaningful sentences that can inspire ideas, not just placeholder text.'
      },
      {
        question: 'Can I use these for teaching?',
        answer: 'Yes, they\'re perfect for classroom exercises, ESL practice, and creative writing lessons.'
      }
    ],
    internalLinks: [
      { text: 'Random Paragraph Generator', url: '/generators/paragraph' },
      { text: 'Story Starter Generator', url: '/writing-prompts-generator/story-starters' },
      { text: 'Writing Prompts', url: '/writing-prompts-generator' }
    ],
    externalLinks: [
      { text: 'Grammarly – Sentence Structure', url: 'https://www.grammarly.com/blog/sentence-structure/' },
      { text: 'Purdue OWL – Sentence Variety', url: 'https://owl.purdue.edu/owl/general_writing/mechanics/sentence_variety.html' }
    ],
    templates: [
      '{subject} {verb} {object} {when}.',
      'The {adjective} {noun} {action} {location}.',
      '{character} never expected to {discover} {object}.'
    ],
    elements: {
      subject: ['The artist', 'A scientist', 'The traveler', 'An old friend', 'The detective'],
      verb: ['discovered', 'created', 'remembered', 'questioned', 'imagined'],
      object: ['a hidden truth', 'an ancient secret', 'a forgotten memory', 'a new possibility'],
      when: ['at dawn', 'during the storm', 'in the silence', 'before leaving', 'after the meeting'],
      adjective: ['mysterious', 'unexpected', 'ancient', 'curious', 'abandoned'],
      noun: ['letter', 'painting', 'doorway', 'melody', 'shadow'],
      action: ['appeared suddenly', 'vanished completely', 'changed everything', 'revealed itself'],
      location: ['in the attic', 'by the river', 'beneath the stairs', 'in the garden'],
      character: ['She', 'He', 'They', 'The stranger', 'The child'],
      discover: ['find', 'inherit', 'remember', 'create', 'encounter']
    }
  },

  randomDialogue: {
    key: 'randomDialogue',
    name: 'Random Dialogue Generator',
    category: 'writing',
    intro: 'Our random dialogue generator creates authentic conversation snippets to practice character voice, develop scenes, and overcome writer\'s block. Each dialogue line comes with context and emotion, perfect for fiction writers working on character development and natural-sounding conversations.',
    howItWorks: 'This dialogue generator combines character types, emotional states, and situational contexts to create believable conversation snippets. Each generation includes speaker context, tone indicators, and subtext suggestions. Use these as writing exercises, scene starters, or character voice practice. The tool helps you explore how different characters might express the same idea based on their personality and situation.',
    useCases: [
      'Character voice practice and development',
      'Scene starting points and transitions',
      'Screenwriting and script exercises',
      'Exploring subtext and emotional layers'
    ],
    faq: [
      {
        question: 'How can dialogue prompts improve my writing?',
        answer: 'They help you practice character voice, explore emotional subtext, and develop more natural conversations.'
      },
      {
        question: 'Can I use these in my stories?',
        answer: 'Yes, use them as starting points and adapt them to fit your characters and scenes.'
      },
      {
        question: 'Do the prompts include context?',
        answer: 'Yes, each dialogue comes with character type, emotional state, and situational context.'
      },
      {
        question: 'How do I make dialogue sound natural?',
        answer: 'Read it aloud, cut unnecessary words, and add subtext that reveals character while advancing the plot.'
      }
    ],
    internalLinks: [
      { text: 'Character Generator', url: '/writing-prompts-generator/character' },
      { text: 'Relationship Prompts', url: '/writing-prompts-generator/relationship' },
      { text: 'Emotion Prompts', url: '/writing-prompts-generator/emotion' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Writing Dialogue', url: 'https://www.writersdigest.com/write-better-fiction/writing-dialogue' },
      { text: 'MasterClass – Dialogue Writing Guide', url: 'https://www.masterclass.com/articles/how-to-write-dialogue' }
    ],
    templates: [
      '"{line}" {character} said, {tone}.',
      '"{question}" — {emotional_state}, {subtext}.',
      '{character}: "{statement}" ({internal_thought})'
    ],
    elements: {
      line: [
        'I thought you\'d never ask',
        'That\'s not what I meant',
        'You don\'t understand',
        'Tell me the truth',
        'I remember it differently'
      ],
      character: ['the mentor', 'the skeptic', 'the optimist', 'the cynic', 'the innocent'],
      tone: ['avoiding eye contact', 'with false confidence', 'barely audible', 'too quickly'],
      question: ['What if you\'re wrong?', 'Why now?', 'Who else knows?', 'Can you prove it?'],
      emotional_state: ['defensive', 'vulnerable', 'suspicious', 'hopeful', 'resigned'],
      subtext: ['hiding fear', 'testing loyalty', 'seeking permission', 'offering forgiveness'],
      statement: ['Fine. Have it your way', 'I always knew', 'This changes nothing', 'You should leave'],
      internal_thought: ['lying', 'terrified', 'relieved', 'calculating next move']
    }
  },

  randomCharacter: {
    key: 'randomCharacter',
    name: 'Random Character Generator',
    category: 'writing',
    intro: 'Our random character generator creates fully-developed characters with personality traits, goals, flaws, and backstory elements. Perfect for writers, RPG players, and storytellers who need compelling characters fast. Each generation provides a foundation you can build on and customize for your story.',
    howItWorks: 'This character generator combines personality archetypes, motivations, internal conflicts, and distinctive traits to create three-dimensional characters. You\'ll get physical descriptions, personality quirks, fears, desires, and relationship patterns. Use these as character templates for novels, short stories, D&D campaigns, or screenplays. The generator creates characters with built-in dramatic potential and room for growth.',
    useCases: [
      'Novel and short story character creation',
      'RPG and D&D character development',
      'Writing exercises and character studies',
      'NaNoWriMo and quick drafting prep'
    ],
    faq: [
      {
        question: 'How detailed are the generated characters?',
        answer: 'Each character includes personality traits, goals, flaws, fears, and quirks that work together dramatically.'
      },
      {
        question: 'Can I modify the characters?',
        answer: 'Absolutely! These are starting points meant to be customized and developed for your specific story.'
      },
      {
        question: 'Are these characters original?',
        answer: 'Yes, they combine traits in unique ways, but always adapt them to avoid clichés and fit your narrative.'
      },
      {
        question: 'How do I make a character feel real?',
        answer: 'Give them contradictions, specific details, and goals that conflict with their fears or beliefs.'
      }
    ],
    internalLinks: [
      { text: 'Dialogue Generator', url: '/writing-prompts-generator/random-dialogue' },
      { text: 'Relationship Prompts', url: '/writing-prompts-generator/relationship' },
      { text: 'Hero Generator', url: '/writing-prompts-generator/hero' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Character Development', url: 'https://www.writersdigest.com/be-inspired/character-development-101' },
      { text: 'Creative Writing Now – Character Worksheets', url: 'https://www.creative-writing-now.com/character-worksheets.html' }
    ],
    templates: [
      '{archetype} who {goal}, but struggles with {flaw}. {distinctive_trait}.',
      'A {age} {profession} with {personality_trait}, haunted by {fear}, seeking {desire}.',
      '{name} appears {surface_trait} but is secretly {hidden_trait}. {quirk}.'
    ],
    elements: {
      archetype: ['The reluctant hero', 'The wise fool', 'The wounded healer', 'The rebel', 'The perfectionist'],
      goal: ['wants redemption', 'seeks the truth', 'needs to prove themselves', 'desires connection', 'must protect others'],
      flaw: ['pride', 'trust issues', 'fear of failure', 'self-sabotage', 'inability to forgive'],
      distinctive_trait: ['Speaks in questions', 'Never makes eye contact', 'Collects broken things', 'Always arrives early'],
      age: ['young', 'middle-aged', 'elderly', 'ageless'],
      profession: ['librarian', 'detective', 'artist', 'scientist', 'teacher', 'merchant'],
      personality_trait: ['sharp wit', 'quiet intensity', 'nervous energy', 'easy confidence'],
      fear: ['abandonment', 'obscurity', 'losing control', 'their own potential'],
      desire: ['belonging', 'freedom', 'recognition', 'peace', 'revenge'],
      name: ['Morgan', 'Alex', 'Casey', 'River', 'Sam'],
      surface_trait: ['confident', 'cold', 'carefree', 'intimidating'],
      hidden_trait: ['deeply insecure', 'sentimental', 'terrified', 'lonely'],
      quirk: ['Hums when nervous', 'Reads endings first', 'Names inanimate objects', 'Never uses contractions']
    }
  },

  randomStoryStarter: {
    key: 'randomStoryStarter',
    name: 'Random Story Starter Generator',
    category: 'writing',
    intro: 'Our random story starter generator provides compelling opening lines and scenarios to launch your next story. Each starter includes a hook, character introduction, and narrative tension designed to pull readers in immediately. Perfect for beating writer\'s block, NaNoWriMo prep, and daily writing practice.',
    howItWorks: 'This story starter generator creates opening scenarios that establish character, conflict, and stakes in the first few lines. Each starter combines a strong hook, immediate tension, and room for development. Use them as-is for writing exercises or adapt them to fit your genre and style. The prompts work for flash fiction, short stories, or novel openings.',
    useCases: [
      'Overcoming writer\'s block and blank page syndrome',
      'NaNoWriMo and fast drafting kickstarts',
      'Daily writing practice and timed exercises',
      'Exploring new genres and styles'
    ],
    faq: [
      {
        question: 'What makes a good story starter?',
        answer: 'Strong starters introduce character, establish stakes, and create immediate tension or curiosity.'
      },
      {
        question: 'Can I change the starter to fit my genre?',
        answer: 'Yes! Adapt the tone, setting, and details to match your genre and style.'
      },
      {
        question: 'How long should I write from each starter?',
        answer: 'Try 15-30 minute timed writes, or develop it into a full short story or chapter.'
      },
      {
        question: 'Do I need to use the exact wording?',
        answer: 'No, use it as inspiration and rewrite it in your own voice and style.'
      }
    ],
    internalLinks: [
      { text: 'Conflict Generator', url: '/writing-prompts-generator/conflict' },
      { text: 'Plot Twist Generator', url: '/writing-prompts-generator/plot-twist' },
      { text: 'Writing Prompts', url: '/writing-prompts-generator' }
    ],
    externalLinks: [
      { text: 'NY Book Editors – Story Openers', url: 'https://nybookeditors.com/blog/how-to-start-a-story/' },
      { text: 'Reedsy – Opening Lines', url: 'https://blog.reedsy.com/guide/story/opening-lines/' }
    ],
    templates: [
      '{character} {action} when {discovery}.',
      'The {object} arrived on {timeframe}, {implication}.',
      '{character} had {duration} to {goal}, but {obstacle}.'
    ],
    elements: {
      character: ['She', 'He', 'They', 'The detective', 'The artist', 'The stranger'],
      action: ['woke to find', 'discovered', 'realized', 'remembered', 'received a message that'],
      discovery: ['everything had changed', 'they were being watched', 'the door was unlocked', 'the map was wrong'],
      object: ['letter', 'package', 'stranger', 'message', 'photograph'],
      timeframe: ['Tuesday', 'three years late', 'without explanation', 'in the middle of the night'],
      implication: ['and nothing would be the same', 'but the sender was dead', 'changing everything'],
      duration: ['three days', 'one chance', 'until midnight', 'one final opportunity'],
      goal: ['escape', 'find the truth', 'save them', 'prove their innocence'],
      obstacle: ['the bridge was out', 'no one would listen', 'they couldn\'t remember how', 'time was running out']
    }
  },

  randomConflict: {
    key: 'randomConflict',
    name: 'Random Conflict Generator',
    category: 'writing',
    intro: 'Our random conflict generator creates story problems, obstacles, and dramatic tensions that challenge your characters and drive your narrative forward. Each conflict includes stakes, complications, and potential consequences. Essential for plotting novels, developing scenes, and ensuring your story has meaningful dramatic tension.',
    howItWorks: 'This conflict generator produces internal and external conflicts across person vs. person, person vs. self, person vs. society, and person vs. nature categories. Each conflict includes escalating stakes and branching complications. Use these to structure your plot, design key scenes, or add layers to existing storylines. The generator ensures conflicts have meaningful consequences that force character growth.',
    useCases: [
      'Plot development and story structure',
      'Scene design and beat sheets',
      'Character arc development',
      'Adding tension to flat narratives'
    ],
    faq: [
      {
        question: 'What types of conflict can I generate?',
        answer: 'Internal conflicts, interpersonal tension, societal pressures, and survival challenges.'
      },
      {
        question: 'How do I choose the right conflict for my story?',
        answer: 'Pick conflicts that test your character\'s core beliefs and force difficult choices.'
      },
      {
        question: 'Should every scene have conflict?',
        answer: 'Strong scenes have tension, which can be conflict, anticipation, or unresolved questions.'
      },
      {
        question: 'How do I escalate conflict effectively?',
        answer: 'Raise the stakes, eliminate easy solutions, and add time pressure or moral complications.'
      }
    ],
    internalLinks: [
      { text: 'Plot Twist Generator', url: '/writing-prompts-generator/plot-twist' },
      { text: 'Character Generator', url: '/writing-prompts-generator/character' },
      { text: 'Story Starter Generator', url: '/writing-prompts-generator/story-starters' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Types of Conflict', url: 'https://www.writersdigest.com/write-better-fiction/types-of-conflict' },
      { text: 'MasterClass – Story Conflict Guide', url: 'https://www.masterclass.com/articles/guide-to-conflict-in-literature' }
    ],
    templates: [
      '{character} must {goal} before {deadline}, but {obstacle}.',
      '{character} discovers that {ally} has been {betrayal}, forcing them to {choice}.',
      'To {desire}, {character} must {sacrifice}, but {consequence}.'
    ],
    elements: {
      character: ['the protagonist', 'the hero', 'they', 'the detective', 'the rebel'],
      goal: ['find the truth', 'save someone', 'prove their innocence', 'stop the plan', 'escape'],
      deadline: ['midnight', 'the trial', 'the invasion', 'their memory fades', 'the door closes'],
      obstacle: ['they can\'t trust anyone', 'the evidence is destroyed', 'no one will believe them', 'they\'re being hunted'],
      ally: ['their mentor', 'their partner', 'the only witness', 'their best friend'],
      betrayal: ['working for the enemy', 'lying all along', 'hiding the truth', 'planning to leave'],
      choice: ['continue alone', 'trust a stranger', 'reveal their secret', 'choose sides'],
      desire: ['gain freedom', 'protect their family', 'uncover the conspiracy', 'find redemption'],
      sacrifice: ['betray their principles', 'give up everything', 'trust their enemy', 'reveal their past'],
      consequence: ['it might destroy them', 'someone innocent will suffer', 'there\'s no going back', 'they\'ll lose everything']
    }
  },

  randomPlotTwist: {
    key: 'randomPlotTwist',
    name: 'Random Plot Twist Generator',
    category: 'writing',
    intro: 'Our random plot twist generator creates surprising story revelations that recontextualize everything that came before. Each twist is designed to be both shocking and inevitable, with clues you can plant throughout your narrative. Perfect for mysteries, thrillers, and any story that needs an unforgettable surprise.',
    howItWorks: 'This plot twist generator produces reveals that change perspective, expose hidden truths, and force readers to reconsider the entire story. Each twist includes setup suggestions and consequence implications. The best twists feel surprising yet earned—use these as inspiration to craft reversals that work with your story\'s logic and themes.',
    useCases: [
      'Mystery and thriller plotting',
      'Midpoint and climax reveals',
      'Subverting reader expectations',
      'Adding depth to predictable plots'
    ],
    faq: [
      {
        question: 'What makes a good plot twist?',
        answer: 'It should surprise readers while feeling inevitable in hindsight, with clues planted throughout.'
      },
      {
        question: 'When should I place the twist in my story?',
        answer: 'Major twists work well at the midpoint (shifting direction) or near the climax (recontextualizing everything).'
      },
      {
        question: 'How do I set up a twist without giving it away?',
        answer: 'Plant clues readers notice on reread, use misdirection, and hide information in plain sight.'
      },
      {
        question: 'Can a story have multiple twists?',
        answer: 'Yes, but each should serve the story—too many can feel gimmicky or exhausting.'
      }
    ],
    internalLinks: [
      { text: 'Conflict Generator', url: '/writing-prompts-generator/conflict' },
      { text: 'Character Generator', url: '/writing-prompts-generator/character' },
      { text: 'Writing Prompts', url: '/writing-prompts-generator' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Plot Twists', url: 'https://www.writersdigest.com/write-better-fiction/how-to-write-plot-twists' },
      { text: 'The Write Practice – Twist Endings', url: 'https://thewritepractice.com/twist-ending/' }
    ],
    templates: [
      '{assumed_truth} was actually {real_truth}, meaning {implication}.',
      '{character} was never {what_they_seemed}—they were {reality} all along.',
      'The {object} everyone sought {doesn\'t_exist}, but {what_matters_instead}.'
    ],
    elements: {
      assumed_truth: ['The mentor', 'The victim', 'The enemy', 'The goal', 'The memory'],
      real_truth: ['the true villain', 'still alive', 'an ally in disguise', 'impossible to achieve', 'planted false'],
      implication: ['the real enemy is still hidden', 'they\'ve been helping the wrong side', 'everything must change', 'they\'re in more danger than ever'],
      character: ['the protagonist', 'the detective', 'the ally', 'the innocent bystander'],
      what_they_seemed: ['trying to stop it', 'a victim', 'trustworthy', 'dead', 'human'],
      reality: ['orchestrating everything', 'the true mastermind', 'the one being protected', 'alive and aware', 'something else entirely'],
      object: ['treasure', 'weapon', 'cure', 'truth', 'person'],
      doesn_exist: ['never existed', 'was destroyed years ago', 'was never the point', 'was a misdirection'],
      what_matters_instead: ['the real treasure was what they became', 'the journey revealed the true enemy', 'they had what they needed all along', 'the search itself was the trap'}
    }
  },

  randomTheme: {
    key: 'randomTheme',
    name: 'Random Theme Generator',
    category: 'writing',
    intro: 'Our random theme generator provides deep thematic concepts to explore in your writing. Themes give stories meaning beyond plot—they\'re the "why" behind your narrative. Each generated theme includes exploration angles, symbolic possibilities, and character arc connections. Perfect for adding depth to stories, essays, and creative projects.',
    howItWorks: 'This theme generator produces universal human experiences, philosophical questions, and emotional truths worth exploring. Themes work best when shown through character choices, conflict resolution, and symbolic details rather than stated directly. Use these themes to guide your story\'s emotional arc, inform character development, and create resonant endings.',
    useCases: [
      'Story planning and outlining',
      'Essay and article brainstorming',
      'Adding depth to existing drafts',
      'Creative project conceptualization'
    ],
    faq: [
      {
        question: 'What\'s the difference between theme and plot?',
        answer: 'Plot is what happens; theme is what the story means or explores emotionally and philosophically.'
      },
      {
        question: 'How do I incorporate theme without being preachy?',
        answer: 'Show theme through character choices, consequences, and symbolic details—never state it directly.'
      },
      {
        question: 'Can a story have multiple themes?',
        answer: 'Yes, one primary theme with related subthemes creates rich, layered storytelling.'
      },
      {
        question: 'When should I decide on my theme?',
        answer: 'Some writers start with theme; others discover it during drafting. Either approach works.'
      }
    ],
    internalLinks: [
      { text: 'Character Generator', url: '/writing-prompts-generator/character' },
      { text: 'Conflict Generator', url: '/writing-prompts-generator/conflict' },
      { text: 'Emotion Prompts', url: '/writing-prompts-generator/emotion' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Writing Theme', url: 'https://www.writersdigest.com/write-better-fiction/theme-in-fiction' },
      { text: 'The Write Life – Thematic Development', url: 'https://thewritelife.com/how-to-write-theme/' }
    ],
    templates: [
      '{concept} vs. {opposite_concept}: {question}',
      'The cost of {desire}: {exploration}',
      '{value} in the face of {challenge}'
    ],
    elements: {
      concept: ['identity', 'freedom', 'truth', 'loyalty', 'belonging', 'power', 'love', 'justice'],
      opposite_concept: ['conformity', 'security', 'comfortable lies', 'self-interest', 'independence', 'powerlessness', 'duty', 'mercy'],
      question: ['What are we willing to sacrifice?', 'Which matters more?', 'Can they coexist?', 'At what cost?'],
      desire: ['revenge', 'perfection', 'control', 'acceptance', 'success', 'change'],
      exploration: ['Is the price too high?', 'What do we lose in pursuit?', 'Does achieving it bring happiness?'],
      value: ['Hope', 'Courage', 'Forgiveness', 'Honesty', 'Compassion', 'Growth'],
      challenge: ['overwhelming odds', 'betrayal', 'loss', 'moral compromise', 'impossible choices', 'crushing failure']
    }
  },

  randomSetting: {
    key: 'randomSetting',
    name: 'Random Setting Generator',
    category: 'writing',
    intro: 'Our random setting generator creates vivid locations with atmosphere, time period, and sensory details. Settings do more than provide a backdrop—they influence mood, reflect themes, and shape character behavior. Each generated setting includes time, place, weather, atmosphere, and symbolic potential for your story or RPG campaign.',
    howItWorks: 'This setting generator combines location type, time period, weather, mood, and sensory details to create immersive environments. Strong settings affect plot possibilities, character choices, and reader emotions. Use these settings to establish tone, create obstacles, or symbolize internal character states. Perfect for fiction, screenwriting, and tabletop RPG worldbuilding.',
    useCases: [
      'Story and scene setting',
      'RPG campaign location design',
      'Establishing mood and atmosphere',
      'Symbolic environment creation'
    ],
    faq: [
      {
        question: 'How detailed should setting descriptions be?',
        answer: 'Include enough sensory details to ground readers, but focus on details that affect mood or plot.'
      },
      {
        question: 'How can setting reflect character or theme?',
        answer: 'Choose details that mirror internal states or symbolize thematic concepts—storms for turmoil, decay for loss.'
      },
      {
        question: 'Should I describe settings all at once?',
        answer: 'No, weave setting details throughout action and dialogue for natural immersion.'
      },
      {
        question: 'How do I make fantastical settings believable?',
        answer: 'Include specific sensory details, show how people live there, and establish consistent rules.'
      }
    ],
    internalLinks: [
      { text: 'Worldbuilding Prompts', url: '/writing-prompts-generator/worldbuilding' },
      { text: 'Environment Design', url: '/art-prompts/environment' },
      { text: 'Fantasy Art Prompts', url: '/art-prompts/fantasy-art' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Setting Guide', url: 'https://www.writersdigest.com/write-better-fiction/how-to-write-setting' },
      { text: 'Now Novel – Setting Description', url: 'https://www.nownovel.com/blog/how-to-describe-setting/' }
    ],
    templates: [
      '{location} {time_period}, {weather}, {atmosphere}',
      'A {adjective} {place_type} where {unique_detail}, {sensory_detail}',
      '{time_of_day} in {location}: {mood_setting}'
    ],
    elements: {
      location: ['An abandoned mansion', 'A bustling marketplace', 'A fog-covered bridge', 'A desert outpost', 'An underground library'],
      time_period: ['during wartime', 'in the distant future', 'in an alternate 1920s', 'in the age of sail', 'in a post-apocalyptic era'],
      weather: ['during a storm', 'in scorching heat', 'under heavy snow', 'in perpetual twilight', 'during an eclipse'],
      atmosphere: ['thick with tension', 'eerily quiet', 'charged with anticipation', 'heavy with secrets', 'alive with possibility'],
      adjective: ['forgotten', 'hidden', 'sacred', 'forbidden', 'contested', 'liminal'],
      place_type: ['café', 'train station', 'temple', 'laboratory', 'garden', 'crossroads'],
      unique_detail: ['time moves differently', 'no shadows fall', 'everyone whispers', 'music plays from nowhere', 'the walls remember'],
      sensory_detail: ['the air tastes like copper', 'everything echoes', 'sweet decay fills the air', 'light filters strangely'],
      time_of_day: ['Dawn', 'Midnight', 'The golden hour', 'The blue hour', 'High noon'],
      mood_setting: ['Everything feels possible', 'Danger lurks in every shadow', 'The past feels present', 'Isolation weighs heavy', 'Hope flickers weakly']
    }
  },

  randomVillain: {
    key: 'randomVillain',
    name: 'Random Villain Generator',
    category: 'writing',
    intro: 'Our random villain generator creates complex antagonists with understandable motivations, personal flaws, and compelling backstories. The best villains believe they\'re right—they\'re heroes of their own stories. Each generated villain includes goals, methods, weaknesses, and the twisted logic that justifies their actions.',
    howItWorks: 'This villain generator produces antagonists with clear motivations, moral complexity, and dramatic opposition to your protagonist. Great villains challenge heroes ideologically, not just physically. Each villain includes their origin wound, corrupted values, and the line they won\'t cross. Use these to create memorable antagonists for novels, comics, RPGs, and screenplays.',
    useCases: [
      'Novel and story antagonist development',
      'RPG and D&D campaign villains',
      'Comic book and screenplay antagonists',
      'Character foil creation'
    ],
    faq: [
      {
        question: 'What makes a compelling villain?',
        answer: 'Clear motivation, understandable (if twisted) logic, personal connection to the hero, and genuine threat level.'
      },
      {
        question: 'Should villains be sympathetic?',
        answer: 'Complex villains have understandable motivations, even if their methods are wrong—readers needn\'t agree, but should understand why.'
      },
      {
        question: 'How powerful should my villain be?',
        answer: 'Powerful enough to credibly threaten victory, but with exploitable weaknesses tied to their psychology.'
      },
      {
        question: 'Can a villain be redeemed?',
        answer: 'Redemption works if their core motivation wasn\'t pure evil and they face real consequences—it must be earned.'
      }
    ],
    internalLinks: [
      { text: 'Hero Generator', url: '/writing-prompts-generator/hero' },
      { text: 'Character Generator', url: '/writing-prompts-generator/character' },
      { text: 'Conflict Generator', url: '/writing-prompts-generator/conflict' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Writing Villains', url: 'https://www.writersdigest.com/write-better-fiction/how-to-write-a-villain' },
      { text: 'MasterClass – Antagonist Guide', url: 'https://www.masterclass.com/articles/how-to-write-an-antagonist' }
    ],
    templates: [
      '{name}, who seeks {goal} because {motivation}, using {method}. Weakness: {weakness}.',
      'Once {past}, now {present}, believing {twisted_logic}.',
      'Opposes the hero because {ideological_conflict}, willing to {extreme_action}.'
    ],
    elements: {
      name: ['The Architect', 'The Purifier', 'The Collector', 'The Prophet', 'The Revolutionary'],
      goal: ['absolute order', 'forced evolution', 'preserved perfection', 'purified society', 'total control'],
      motivation: ['they lost everything to chaos', 'they were betrayed by weakness', 'they alone see the truth', 'love became obsession'],
      method: ['manipulation and leverage', 'overwhelming force', 'turning systems against themselves', 'corrupting the pure'],
      weakness: ['arrogance blinds them', 'they need validation', 'they can\'t see they\'ve become what they hate', 'one person they won\'t harm'],
      past: ['a healer', 'a protector', 'a believer', 'an idealist', 'a victim'],
      present: ['a destroyer', 'a tyrant', 'a cynic', 'a fanatic', 'a monster'],
      twisted_logic: ['mercy is weakness', 'the ends justify all means', 'only they can save everyone', 'love requires control', 'freedom is chaos'],
      ideological_conflict: ['hero values freedom, they value security', 'hero trusts people, they see only weakness', 'hero believes in change, they in preservation'],
      extreme_action: ['sacrifice the innocent', 'destroy what they once loved', 'become the very thing they fought', 'burn the world to remake it']
    }
  },

  randomHero: {
    key: 'randomHero',
    name: 'Random Hero Generator',
    category: 'writing',
    intro: 'Our random hero generator creates compelling protagonists with goals, inner conflicts, and room to grow. Great heroes are flawed, relatable, and tested by their journey. Each generated hero includes their ordinary world, inciting incident hook, core desire, fatal flaw, and arc potential.',
    howItWorks: 'This hero generator produces protagonists with active goals, personal stakes, and internal conflicts that mirror external challenges. The best heroes want something, need something different, and must change to succeed. Use these hero templates for novels, screenplays, comics, and RPG campaigns. Each hero is designed with a transformational arc built in.',
    useCases: [
      'Protagonist development for novels and stories',
      'RPG and D&D character creation',
      'Comic book and film hero design',
      'Character arc planning'
    ],
    faq: [
      {
        question: 'What makes a hero compelling?',
        answer: 'Clear goal, personal stakes, relatable flaws, and capacity for growth through challenge.'
      },
      {
        question: 'Does every hero need to be likable?',
        answer: 'No, but they need to be understandable—readers should grasp their motivation and root for their growth.'
      },
      {
        question: 'How do I show character development?',
        answer: 'Put the hero in situations where their flaw causes problems, forcing them to change or fail.'
      },
      {
        question: 'Can a hero have multiple flaws?',
        answer: 'Yes, but one central flaw should drive their arc—others add depth but shouldn\'t dilute the core journey.'
      }
    ],
    internalLinks: [
      { text: 'Villain Generator', url: '/writing-prompts-generator/villain' },
      { text: 'Character Generator', url: '/writing-prompts-generator/character' },
      { text: 'Conflict Generator', url: '/writing-prompts-generator/conflict' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Protagonist Guide', url: 'https://www.writersdigest.com/write-better-fiction/protagonist' },
      { text: 'The Write Practice – Hero\'s Journey', url: 'https://thewritepractice.com/heros-journey/' }
    ],
    templates: [
      '{name}, a {profession} who wants {goal} but fears {fear}, must {challenge}.',
      'From {starting_point}, must learn {lesson} to {achieve}.',
      '{trait} hero whose {flaw} threatens everything, seeking {desire}.'
    ],
    elements: {
      name: ['The wanderer', 'The student', 'The guardian', 'The seeker', 'The artist'],
      profession: ['detective', 'healer', 'soldier', 'scholar', 'exile', 'apprentice'],
      goal: ['find the truth', 'protect others', 'prove themselves', 'find home', 'achieve mastery'],
      fear: ['failure', 'loss', 'inadequacy', 'abandonment', 'their own power'],
      challenge: ['trust their enemy', 'embrace their past', 'lead others', 'sacrifice their dream', 'become what they fear'],
      starting_point: ['Comfortable but unfulfilled', 'Running from the past', 'Believing they\'re ordinary', 'Broken by loss'],
      lesson: ['true strength is vulnerability', 'they\'re enough as they are', 'some things are worth the risk', 'they can\'t do it alone'],
      achieve: ['save what matters', 'find peace', 'protect the future', 'become who they\'re meant to be'],
      trait: ['Reluctant', 'Cynical', 'Idealistic', 'Inexperienced', 'Haunted'],
      flaw: ['pride', 'self-doubt', 'inability to trust', 'need for control', 'fear of vulnerability'],
      desire: ['redemption', 'belonging', 'revenge', 'freedom', 'purpose', 'connection']
    }
  },

  // Continuing with more generators in next response due to length...
};

export function getGeneratorConfig(key: string): GeneratorConfig | null {
  return generatorConfigs[key] || null;
}

export function generateContent(config: GeneratorConfig): string {
  const template = config.templates[Math.floor(Math.random() * config.templates.length)];
  let result = template;

  // Replace all placeholders in the template
  const placeholderRegex = /\{(\w+)\}/g;
  result = result.replace(placeholderRegex, (match, key) => {
    const options = config.elements[key];
    if (options && options.length > 0) {
      return options[Math.floor(Math.random() * options.length)];
    }
    return match;
  });

  return result;
}
