import React, { useState, useCallback } from 'react';
import { Copy, RefreshCw, BookOpen, Lightbulb, HelpCircle, ExternalLink } from 'lucide-react';

// Simple generator data for basic generators
interface GeneratorData {
  intro: string;
  howItWorks: string;
  useCases: string[];
  faq: Array<{ question: string; answer: string }>;
  internalLinks: Array<{ text: string; url: string }>;
  externalLinks: Array<{ text: string; url: string }>;
  templates: string[];
  elements: Record<string, string[]>;
}

// Comprehensive generator data - includes placeholder data for all 30 generators
const GENERATOR_DATA: Record<string, GeneratorData> = {
  'random-paragraph-generator': {
    intro: 'Our random paragraph generator creates instant, readable paragraphs you can use for writing practice, warm-ups, and creative exercises. Each paragraph is built from natural-sounding sentences so it feels like real text, not lorem ipsum.',
    howItWorks: 'This random paragraph generator combines character actions, settings, objects, and emotions into coherent mini-scenes. Instead of purely random words, it uses structured templates and curated phrases so each paragraph has a clear focus.',
    useCases: [
      'Daily writing warm-ups',
      'Practice editing and rewriting',
      'ESL and language learning exercises',
      'Inspiration for stories, essays, and blog posts'
    ],
    faq: [
      { question: 'What can I use the random paragraphs for?', answer: 'You can use them as writing prompts, practice material, or starting points for stories, essays, and blog posts.' },
      { question: 'Are the paragraphs unique each time?', answer: 'Yes. Each click generates a new combination of sentences, so you can get unlimited variations.' },
      { question: 'Can I use the content commercially?', answer: 'Yes, you can build on these paragraphs in your own projects. They\'re meant as creative starting points.' }
    ],
    internalLinks: [
      { text: 'Writing Prompts', url: '/writing-prompts-generator' },
      { text: 'Short Story Prompts', url: '/short-story-prompts-generator' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest – Writing Prompts', url: 'https://www.writersdigest.com/write-better-fiction/prompts' },
      { text: 'The Write Practice – Writing Exercises', url: 'https://thewritepractice.com/creative-writing-prompts/' }
    ],
    templates: [
      '{character} {action} in {location}, {feeling} about {concern}. {object_desc} lay nearby, {state}. {thought}',
      'The {weather} made everything feel {mood}. {character} {action}, thinking about {past_event}. {decision}',
      '{character} had always {belief}, but {contrast}. Now, {action} in {location}, {realization}.'
    ],
    elements: {
      character: ['The wanderer', 'An old friend', 'A stranger', 'The detective', 'A young artist', 'The traveler'],
      action: ['walked slowly', 'sat quietly', 'stood watching', 'moved carefully', 'waited patiently'],
      location: ['the empty street', 'a crowded café', 'the forest edge', 'an old library', 'the train station'],
      feeling: ['uncertain', 'hopeful', 'worried', 'curious', 'determined', 'nostalgic'],
      concern: ['what came next', 'the missing letter', 'yesterday\'s conversation', 'the unopened door'],
      object_desc: ['A leather journal', 'An old photograph', 'A brass key', 'A folded map'],
      state: ['forgotten since morning', 'placed there deliberately', 'discovered by chance'],
      thought: ['The answer felt close.', 'Everything was about to change.', 'Time was running out.'],
      weather: ['autumn rain', 'morning fog', 'evening light', 'winter chill'],
      mood: ['distant', 'intimate', 'mysterious', 'melancholic'],
      past_event: ['last summer', 'the accident', 'their first meeting', 'the promise'],
      decision: ['It was time to move forward.', 'There was no turning back.', 'The choice was made.'],
      belief: ['believed in second chances', 'thought people never changed', 'trusted too easily'],
      contrast: ['today challenged everything', 'evidence suggested otherwise', 'the truth was different'],
      realization: ['they understood at last', 'the pattern became clear', 'nothing would be the same']
    }
  },

  // Villain Generator
  'random-villain-generator': {
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
      '{name}, a former {past_profession} turned {current_role}, seeks to {goal} because {motivation}. Operating from {base}, they use {method} to achieve their vision. Their signature trait is {trait}, and their greatest weakness is {weakness}. Once {past_belief}, they now believe {twisted_belief}. They see themselves as {self_perception}, though others see them as {perception}. Will stop at {extreme}, but refuses to {line_wont_cross}.',
      'Known as {title}, this {age} villain controls {domain} through {control_method}. Their tragic past includes {tragedy}, which transformed them from {before_tragedy} into {after_tragedy}. Their ultimate goal is {ambitious_goal}, achieved through {scheme}. Physically characterized by {physical_trait} and psychologically defined by {psychological_trait}. Their fatal flaw is {fatal_flaw}, exploitable through {exploit_method}.',
      '{name} emerged as a threat when {origin_event}. Now commanding {resources}, they implement {master_plan} to reshape {target} according to their vision of {ideology}. Their methods include {tactic_one}, {tactic_two}, and {tactic_three}. Driven by {deep_motivation}, haunted by {haunting}, and obsessed with {obsession}. Those who oppose them face {consequence}. Their one vulnerability: {vulnerability}.',
      'The {moniker}, once celebrated as {former_glory}, fell from grace after {downfall_event}. Now they wage war against {enemy} using {unconventional_method}. Their lair in {location_type} reflects their {mental_state}. Armed with {weapon_ability}, aided by {followers}, they pursue {endgame}. Their philosophy: {philosophy}. Their contradiction: {contradiction}. The key to defeating them lies in {defeat_key}.',
      '{formal_name}, {descriptor}, rose to power through {power_acquisition}. Their empire spans {scope}, built on {foundation}. What makes them terrifying is {terrifying_aspect}. What makes them tragic is {tragic_aspect}. They view {hero_type} as {hero_view}. Their master stroke will be {master_stroke}, unless stopped by {stopping_condition}. Secretly, they {secret}, which could be {secret_consequence}.',
      'Born as {birth_name} in {birthplace}, {current_identity} witnessed {formative_trauma} at age {age_number}, warping their sense of {warped_value}. Now {time_later}, they command {organization} and orchestrate {plot} across {geographic_scope}. Their public face shows {public_persona}, but in private they are {private_persona}. Three things drive them: {drive_one}, {drive_two}, {drive_three}. Their downfall will come through {downfall_method}.'
    ],
    elements: {
      name: ['Dr. Marcus Vane', 'Seraphina Blackwood', 'Viktor Kross', 'The Architect', 'Mordecai Stone', 'Lady Cassandra', 'Professor Ashton', 'Nikolai Frost', 'Isabella Raven', 'Commander Drake', 'Evelyn Thorne', 'Silas Darkmore', 'Anastasia Sharp', 'Donovan Steel', 'Lucinda Graves'],
      past_profession: ['idealistic doctor', 'brilliant scientist', 'decorated war hero', 'corporate executive', 'renowned philosopher', 'gifted artist', 'justice-seeking prosecutor', 'pioneering researcher', 'celebrated architect', 'devoted teacher'],
      current_role: ['ruthless industrialist', 'shadow broker', 'criminal mastermind', 'revolutionary leader', 'cult figurehead', 'terrorist commander', 'corrupt politician', 'rogue AI developer', 'bio-weapons dealer', 'dimensional conqueror'],
      goal: ['reshape society in their image', 'eradicate what they see as weakness', 'achieve immortality at any cost', 'prove their superiority', 'control human evolution', 'create their perfect world', 'punish those they deem guilty', 'transcend human limitations', 'reset civilization completely', 'eliminate free will'],
      motivation: ['they lost everything to chaos', 'betrayal by those they trusted', 'society rejected their genius', 'their loved ones died due to others\' incompetence', 'they discovered humanity\'s \'true nature\'', 'power corrupted their noble intentions', 'they alone see the coming catastrophe', 'revenge against those who wronged them', 'their god complex demands worship', 'mercy failed them repeatedly'],
      base: ['an underground network spanning continents', 'a floating fortress above the Arctic', 'the abandoned ruins of their former life', 'a corporate tower hiding secret labs', 'an island nation under their control', 'the dark web\'s deepest layers', 'a pocket dimension of their creation', 'deep within government infrastructure', 'orbiting space station', 'ancient temple complex'],
      method: ['psychological manipulation and blackmail', 'cutting-edge technology weaponized', 'economic warfare and market manipulation', 'biological agents and designer plagues', 'information control and propaganda', 'supernatural powers they\'ve harnessed', 'an army of fanatical believers', 'turning heroes\' strengths against them', 'systematic elimination of opposition', 'reality-warping devices'],
      trait: ['their unnerving calm under pressure', 'a disarming charm that hides cruelty', 'absolute conviction in their righteousness', 'brilliant strategic foresight', 'the ability to corrupt good people', 'their signature laugh at others\' pain', 'perfect patience over decades', 'turning victims into allies', 'theatrical flair in atrocities', 'cold, emotionless efficiency'],
      weakness: ['their need for acknowledgment', 'arrogance that blinds them', 'one person they still care for', 'the guilt they bury deep', 'their own creation turning against them', 'physical deterioration they hide', 'paranoia about betrayal', 'inability to understand compassion', 'addiction to their own power', 'fear of becoming irrelevant'],
      past_belief: ['in justice and mercy', 'that people were inherently good', 'in the power of reason', 'in redemption for all', 'that sacrifice meant something', 'in democratic ideals', 'that love conquers all', 'in scientific progress for humanity', 'that truth would prevail', 'in second chances'],
      twisted_belief: ['mercy is weakness enabling chaos', 'only the strong deserve to survive', 'emotions are diseases to be cured', 'free will causes all suffering', 'humanity must be saved from itself', 'order justifies any sacrifice', 'love is a chemical imbalance to exploit', 'progress requires culling the unworthy', 'lies maintain necessary social order', 'redemption is a fool\'s fantasy'],
      self_perception: ['humanity\'s savior', 'a necessary evil', 'the only one brave enough', 'a tragic hero', 'evolution personified', 'justice incarnate', 'a reluctant tyrant', 'the architect of utopia', 'a martyr for progress', 'the last sane person'],
      perception: ['an unhinged tyrant', 'pure evil incarnate', 'a cautionary tale', 'a broken genius', 'a monster', 'the ultimate threat', 'beyond redemption', 'pitiable and terrifying', 'the worst of humanity', 'a corrupted ideal'],
      extreme: ['killing thousands', 'destroying cities', 'rewriting reality', 'sacrificing innocents', 'triggering apocalypse', 'erasing memories', 'torturing information', 'creating biological weapons', 'manipulating minds', 'betraying anyone'],
      line_wont_cross: ['harm children directly', 'destroy art and knowledge', 'kill their former love', 'use nuclear weapons', 'abandon their principles', 'work with their nemesis', 'admit they were wrong', 'become chaotic', 'forget their original pain', 'kill witnesses to their humanity'],
      title: ['The Harbinger', 'The Cleansing Fire', 'The Iron Judge', 'The Silencer', 'The Remaker', 'The Void', 'The Red Queen', 'The Prophet of Ashes', 'The Sovereign', 'The Architect of Ruin'],
      age: ['ancient beyond memory', 'mysteriously ageless', 'middle-aged but timeless', 'young but ancient in soul', 'elderly yet vigorous', 'age unknown behind their mask'],
      domain: ['the criminal underworld', 'corporate boardrooms', 'the dark web', 'political systems', 'religious institutions', 'scientific community', 'entertainment industry', 'military operations', 'financial markets', 'social media'],
      control_method: ['fear and systematic elimination', 'debt and blackmail', 'addiction and dependency', 'charisma and cult of personality', 'technology and surveillance', 'prophecy and manipulation', 'information monopoly', 'genetic engineering', 'temporal manipulation', 'psychological conditioning'],
      tragedy: ['watching their family burn while authorities did nothing', 'being betrayed by their protégé', 'their cure being stolen and weaponized', 'losing their child to preventable disease', 'being experimented on by those they trusted', 'their peaceful revolution ending in massacre', 'discovering their entire life was a lie', 'surviving when they should have died', 'their creation being turned against innocents', 'being abandoned after giving everything'],
      before_tragedy: ['a compassionate healer', 'an idealistic reformer', 'a loving parent', 'a patriotic soldier', 'a humble researcher', 'a justice-seeking lawyer', 'a pacifist philosopher', 'a devoted friend', 'an optimistic inventor', 'a protective guardian'],
      after_tragedy: ['a remorseless executioner', 'a cynical manipulator', 'an emotionless calculator', 'a vengeful destroyer', 'an obsessed perfectionist', 'a cruel experimenter', 'a nihilistic anarchist', 'a paranoid controller', 'a megalomaniacal tyrant', 'a cold-blooded strategist'],
      ambitious_goal: ['global mind control network', 'engineered super-race', 'elimination of human emotion', 'forced technological singularity', 'new world order under their design', 'resurrection of the dead as servants', 'merger of humanity with machines', 'return to mythical \'purer\' past', 'ascension to godhood', 'heat death of the universe'],
      scheme: ['infiltrating every level of society', 'replacing leaders with puppets', 'releasing progressive stages of plague', 'collapsing the global economy', 'rewriting historical records', 'controlling weather patterns', 'monopolizing food supply', 'fracturing humanity into war', 'uploading consciousness into eternal servers', 'opening portals to dark dimensions'],
      physical_trait: ['burn scars covering half their face', 'unnaturally bright eyes', 'mechanical augmentations poorly hidden', 'perfect symmetry that unsettles', 'constantly changing appearance', 'ancient beyond their seeming age', 'albino features', 'towering, inhuman height', 'hauntingly beautiful', 'completely unremarkable - the perfect disguise'],
      psychological_trait: ['dissociative identity disorder they control', 'psychopathy disguised as logic', 'narcissism reaching delusion', 'obsessive-compulsive need for order', 'paranoid schizophrenia they weaponize', 'borderline personality creating chaos', 'sociopathy masked as charisma', 'megalomania backed by capability', 'sadism framed as necessity', 'messianic complex with followers'],
      fatal_flaw: ['pride that ensures overreach', 'inability to trust anyone', 'addiction to the game over winning', 'need to explain their brilliance', 'sentimental attachment to symbols', 'belief in their own prophecy', 'compulsion to test limits', 'desire to be understood', 'fear of obscurity', 'inability to adapt when plans fail'],
      exploit_method: ['turning their followers against them', 'using their past against them', 'threatening their one love', 'exploiting their need for recognition', 'proving their ideology false', 'introducing true chaos to their order', 'showing them what they\'ve become', 'forcing impossible choices', 'revealing their human weaknesses', 'making them face their victims'],
      origin_event: ['they discovered the conspiracy', 'their research went too far', 'they died and came back wrong', 'they touched something forbidden', 'the accident changed them fundamentally', 'they learned the terrible truth', 'betrayal shattered their worldview', 'they survived what killed everyone else', 'forbidden knowledge found them', 'they were chosen by something dark'],
      resources: ['billions in untraceable assets', 'an army of enhanced soldiers', 'blackmail on every leader', 'ancient artifacts of power', 'next-generation AI systems', 'a network of sleeper agents', 'weapons beyond current technology', 'pharmaceutical mind-control', 'multinational corporate empire', 'reality-bending devices'],
      master_plan: ['systematic replacement of world leaders', 'triggering engineered evolution', 'erasing concept of individuality', 'creating controlled economic collapse', 'activating global surveillance state', 'releasing targeted genetic plague', 'initiating mandatory neural integration', 'establishing new world religion', 'terraforming Earth for new species', 'summoning extra-dimensional beings'],
      target: ['democratic institutions', 'human free will', 'genetic diversity', 'cultural memory', 'emotional bonds', 'national sovereignty', 'technological progress', 'natural selection', 'moral ambiguity', 'individual identity'],
      ideology: ['absolute hierarchical order', 'survival of the strong', 'technological transcendence', 'collective consciousness', 'enforced equality', 'pure meritocracy', 'philosophical nihilism', 'extreme utilitarianism', 'social Darwinism', 'technocratic authoritarianism'],
      tactic_one: ['psychological torture sessions', 'public executions as theater', 'turning families against each other', 'weaponizing social media', 'releasing designer viruses', 'manipulating financial markets', 'staging false-flag operations', 'corrupting heroes', 'temporal manipulation', 'memory modification'],
      tactic_two: ['infiltration of institutions', 'controlling food and water', 'environmental terrorism', 'creating dependent populations', 'manufacturing crises', 'technological enslavement', 'genetic engineering', 'propaganda and disinformation', 'supernatural summoning', 'quantum sabotage'],
      tactic_three: ['recruiting through despair', 'eliminating witnesses methodically', 'creating martyrs strategically', 'demonstrating inevitability', 'offering false hope', 'dividing resistance movements', 'studying and countering heroes', 'threatening civilians', 'reality distortion', 'temporal loops'],
      deep_motivation: ['proving they were right all along', 'avenging their destroyed innocence', 'preventing future versions of their past', 'achieving immortality to continue their work', 'being remembered forever', 'making others feel their pain', 'creating meaning from meaninglessness', 'transcending human weakness', 'establishing perfect order', 'becoming more than human'],
      haunting: ['the faces of those they couldn\'t save', 'their last moment of innocence', 'the day they chose this path', 'what they had to sacrifice', 'the person they used to be', 'their first kill', 'the betrayal that broke them', 'the lie they told themselves', 'the point of no return', 'what they\'ve become'],
      obsession: ['a specific hero who represents their past', 'perfecting their masterpiece', 'surpassing their mentor', 'destroying a symbol of their failure', 'collecting trophies of victories', 'documenting everything', 'maintaining their philosophical consistency', 'proving their superiority', 'their lost love', 'achieving their destiny'],
      consequence: ['slow, creative death', 'forced participation in their scheme', 'complete erasure from existence', 'transformation into their servants', 'public humiliation and ruin', 'imprisonment in personal hells', 'genetic reprogramming', 'having everything they love destroyed', 'becoming examples', 'endless psychological torture'],
      vulnerability: ['the one they couldn\'t corrupt', 'their hidden humanity', 'the flaw in their plan they ignore', 'their need to be proven right', 'a secret they\'ll kill to protect', 'their dying body', 'the child they abandoned', 'their inability to let go', 'their dependence on their power source', 'the witnesses to their origin'],
      moniker: ['Crimson Oracle', 'Iron Shepherd', 'Pale Commissioner', 'Midnight Chancellor', 'Obsidian Prophet', 'The Surgeon', 'The Benefactor', 'The Cleanser', 'The Director', 'The Magistrate'],
      former_glory: ['Nobel Prize winner', 'decorated war hero', 'beloved philanthropist', 'Olympic champion', 'celebrated surgeon', 'renowned professor', 'artistic genius', 'diplomatic peacemaker', 'technological pioneer', 'spiritual leader'],
      downfall_event: ['their discovery was stolen', 'they were framed for massacre', 'their family was murdered', 'they were declared insane', 'the experiment went catastrophically wrong', 'they were betrayed by their country', 'their loved one chose another', 'they uncovered the conspiracy', 'they were exposed to toxic truth', 'they survived their own death'],
      enemy: ['the system that failed them', 'those who remain willfully ignorant', 'anyone standing in the way of progress', 'the hero who represents hope', 'the institution that destroyed them', 'nature itself', 'human weakness', 'those who have it easy', 'believers in outdated morality', 'champions of chaos'],
      unconventional_method: ['turning heroes\' compassion into weakness', 'making atrocities look like justice', 'weaponizing social movements', 'creating ethical dilemmas with no right answer', 'forcing heroes to become what they fight', 'revealing uncomfortable truths', 'orchestrating mass movements', 'manufacturing consent', 'making evil banal', 'normalizing the horrific'],
      location_type: ['a sterile, clinical environment reflecting their cold logic', 'a gothic cathedral to their ideology', 'a mirror of their traumatic past', 'a perfect replica of what they lost', 'an ever-changing labyrinth', 'a high-tech fortress', 'a humble facade hiding horrors', 'a place removed from time', 'a monument to their ego', 'a garden of twisted beauty'],
      mental_state: ['calculated control barely containing madness', 'serenity born of acceptance', 'barely-suppressed rage', 'detached observation', 'manic brilliance', 'nihilistic peace', 'delusional certainty', 'desperate need', 'cold pragmatism', 'transcendent vision'],
      weapon_ability: ['technology that rewrites reality', 'mastery of human psychology', 'control over life and death', 'seeing and manipulating probability', 'perfect prediction engines', 'weaponized empathy', 'reality-bending artifacts', 'command of natural forces', 'mastery of time', 'ability to corrupt anything'],
      followers: ['true believers who see them as savior', 'brainwashed victims with no choice', 'those who benefit from the chaos', 'people with nowhere else to turn', 'sociopaths who found their leader', 'desperate souls seeking meaning', 'enhanced super-soldiers', 'people they saved and enslaved', 'clones of their former self', 'digital consciousnesses they created'],
      endgame: ['forced transcendence of humanity', 'judgment day they believe necessary', 'reset of civilization', 'their death as ultimate message', 'creating their perfect world', 'revenge completed at any cost', 'achieving philosophical vindication', 'becoming the god they worship', 'saving humanity by destroying it', 'eternal suffering for their enemies'],
      philosophy: ['"Order justifies any sacrifice"', '"Mercy is the luxury of the weak"', '"Free will is humanity\'s fatal flaw"', '"The ends always justify the means"', '"Evolution demands culling"', '"Truth must be controlled"', '"Chaos must be eliminated"', '"Only the strong should survive"', '"Suffering builds character"', '"Love is the ultimate weakness"'],
      contradiction: ['they became what they hate most', 'their order creates chaos', 'they destroy to save', 'they\'re trapped by the freedom they seek', 'their logic is purely emotional', 'they need what they despise', 'their control is their prison', 'their strength is their weakness', 'their certainty is doubt', 'their transcendence is their limitation'],
      defeat_key: ['showing them they\'ve already lost', 'reflecting their own methods back', 'proving their philosophy wrong', 'offering genuine understanding', 'exposing them to their victims', 'reuniting them with their past', 'destroying their symbol', 'severing them from their power', 'turning their followers', 'forcing them to feel again'],
      formal_name: ['Doctor Cassandra Void', 'General Marcus Ironside', 'Professor Elena Darkstar', 'Madame Seraphine', 'Baron Von Schatten', 'Admiral Blackheart', 'Chancellor Graves', 'Archon Nightshade', 'Sovereign Null', 'Premier Obsidian'],
      descriptor: ['the immortal tyrant', 'the mind behind the throne', 'humanity\'s would-be god', 'the architect of atrocity', 'the prophet of annihilation', 'the harbinger of new order', 'the last philosopher', 'the perfect predator', 'the inevitable', 'the necessary evil'],
      power_acquisition: ['a Faustian bargain', 'systematic elimination of rivals', 'exploiting a global crisis', 'inheriting a dark legacy', 'technological singularity', 'discovered ancient power', 'political manipulation over decades', 'creating dependency then controlling supply', 'manufacturing the problem and solution', 'ascending through sacrifice'],
      scope: ['five continents', 'the criminal underworld', 'major governments', 'the digital realm', 'multiple dimensions', 'the world\'s resources', 'human consciousness', 'space and time', 'life and death', 'reality itself'],
      foundation: ['fear and systematic terror', 'economic dependency', 'technological superiority', 'information control', 'manufactured religion', 'genetic manipulation', 'temporal paradoxes', 'supernatural pacts', 'breaking the human spirit', 'exploiting desperation'],
      terrifying_aspect: ['they\'re always three steps ahead', 'they cannot be reasoned with', 'they see people as mathematical variables', 'they feel no remorse whatsoever', 'they make you understand their logic', 'they corrupt heroes just by existing', 'they make atrocity seem reasonable', 'they turn love into a weapon', 'they cannot be physically stopped', 'they make you question your own morality'],
      tragic_aspect: ['they were once the hero', 'they sincerely believe they\'re saving everyone', 'they\'re trapped by their own design', 'they lost their humanity saving it', 'they can never go back', 'they\'re already dead inside', 'they know they\'re wrong but continue anyway', 'they do it all for someone who\'s gone', 'they see no other way', 'they\'re the last of their kind'],
      hero_type: ['naive idealists', 'walking threats to order', 'useful pawns', 'future converts', 'noble fools', 'obstacles to progress', 'interesting experiments', 'unfinished projects', 'their greatest creations', 'younger versions of themselves'],
      hero_view: ['naive children playing hero', 'tools they haven\'t broken yet', 'future allies if they see reason', 'respected adversaries', 'the only worthy opponents', 'proof of humanity\'s potential', 'tragic victims of hope', 'interesting specimens', 'their ultimate test', 'mirrors of their former self'],
      master_stroke: ['revealing they\'ve already won', 'forcing the hero to choose who lives', 'proving their ideology correct', 'destroying hope itself', 'replacing themselves with something worse', 'succeeding through their defeat', 'converting the hero to their cause', 'triggering their doomsday device', 'achieving martyrdom', 'transcending mortality'],
      stopping_condition: ['finding what they still love', 'uniting all their enemies', 'proving there\'s another way', 'showing them their impact', 'destroying their certainty', 'offering genuine redemption', 'exploiting their one weakness', 'turning their plan against them', 'making them remember their humanity', 'sacrifice of what they value most'],
      secret: ['they\'re dying and desperate', 'they\'re someone\'s puppet', 'they don\'t believe their own ideology', 'they have a hidden heir', 'they were the hero once', 'they\'re trying to be stopped', 'they\'re multiple people', 'they\'re an AI or clone', 'they\'re from the future trying to prevent worse', 'they\'re already dead'],
      secret_consequence: ['their undoing', 'the key to redemption', 'worse than anything they\'ve done', 'the real plan', 'their greatest vulnerability', 'their true motivation', 'their greatest regret', 'their only hope', 'the source of their power', 'their unexpected salvation'],
      birth_name: ['Marcus Wellington', 'Sarah Chen', 'Alexander Petrov', 'Maria Santos', 'James Fitzgerald', 'Yuki Tanaka', 'David Okonkwo', 'Elena Rodriguez', 'Michael O\'Brien', 'Fatima Al-Rashid'],
      birthplace: ['a war-torn ghetto', 'an elite private estate', 'a corporate medical facility', 'a forgotten rural town', 'a refugee camp', 'a military black site', 'a prestigious family', 'an orphanage', 'a research colony', 'a religious commune'],
      current_identity: ['now known only by their title', 'having shed their birth name', 'maintaining their original name as power move', 'using multiple aliases', 'adopting their victim\'s name', 'taking their mentor\'s name', 'called only by their designation', 'known by different names in different circles', 'whose true name is forbidden', 'who exists in records as deceased'],
      formative_trauma: ['the massacre of their entire village', 'their parents\' murder-suicide', 'being sold into experimentation', 'watching their sibling executed', 'their city being destroyed in war', 'betrayal by their mentor', 'surviving a cult mass death', 'being the only survivor of a plague', 'their powers emerging destructively', 'discovering they were engineered'],
      age_number: ['eight', 'twelve', 'sixteen', 'seven', 'ten', 'fourteen', 'nine', 'eleven', 'thirteen', 'fifteen'],
      warped_value: ['justice', 'mercy', 'family', 'trust', 'love', 'loyalty', 'hope', 'fairness', 'safety', 'belonging'],
      time_later: ['fifteen years later', 'two decades hence', 'a generation later', 'ten years on', 'after years of planning', 'decades in the making', 'after a lifetime of preparation', 'years in the making', 'after much time', 'in the present day'],
      organization: ['The Synthesis Initiative', 'The Purification Council', 'The New Order', 'The Architects', 'The Brotherhood of Ascension', 'The Collective', 'Shadow Directorate', 'The Hierarchy', 'The Foundation', 'The Assembly'],
      plot: ['systematic infrastructure collapse', 'global consciousness integration', 'selective genetic purification', 'technological enslavement grid', 'manufactured crisis escalation', 'reality destabilization events', 'social order dismantling', 'forced evolutionary pressure', 'memory modification campaign', 'dimensional convergence'],
      geographic_scope: ['three continents', 'every major city', 'the digital sphere', 'corporate centers worldwide', 'underground networks globally', 'satellite and space infrastructure', 'the world\'s water supply', 'telecommunications networks', 'financial systems globally', 'military installations worldwide'],
      public_persona: ['charismatic philanthropist', 'reclusive genius', 'respected academic', 'controversial but admired leader', 'tragic figure seeking justice', 'misunderstood visionary', 'stern but fair authority', 'beloved benefactor', 'revolutionary hero', 'necessary evil'],
      private_persona: ['cold-blooded sociopath', 'barely-controlled rage', 'broken and desperate', 'methodically cruel', 'genuinely insane', 'sorrowfully resigned', 'gleefully sadistic', 'hollowed-out shell', 'terrifyingly calm', 'tragically aware of their monstrosity'],
      drive_one: ['avenging their past', 'proving they were right', 'preventing future tragedies', 'achieving recognition', 'transcending humanity', 'eliminating chaos', 'saving humanity from itself', 'creating perfect order', 'finding meaning in meaninglessness', 'never being victim again'],
      drive_two: ['making the pain stop', 'finding worthy opponent', 'completing their work', 'honoring the dead', 'surpassing their creator', 'escape from their prison', 'achieving immortality', 'perfect revenge', 'creating legacy', 'transcending their limitations'],
      drive_three: ['being understood', 'proving everyone wrong', 'protecting what they love', 'finishing what was started', 'breaking free from fate', 'showing there\'s no other way', 'making it all mean something', 'never being powerless again', 'ensuring they\'re remembered', 'finding peace in oblivion'],
      downfall_method: ['hubris leading to crucial mistake', 'their own creation turning against them', 'the one person they trust betraying them', 'underestimating their opponent', 'their body finally failing', 'exposure of their secret', 'their ideology proven catastrophically wrong', 'losing what gives them power', 'being outsmarted at their own game', 'their humanity emerging at crucial moment']
    }
  },

  // Default/fallback data for other generators
  'default': {
    intro: 'Generate creative prompts instantly with our free random generator. Perfect for writers, artists, and creative minds looking for inspiration.',
    howItWorks: 'This generator combines curated elements using randomized templates to create unique, inspiring prompts. Click the generate button to create a new prompt, and use the copy button to save your favorites.',
    useCases: [
      'Creative writing practice',
      'Overcoming creative blocks',
      'Daily inspiration and prompts',
      'Brainstorming and ideation'
    ],
    faq: [
      { question: 'How does this generator work?', answer: 'It combines curated word lists and templates to create unique, meaningful prompts each time.' },
      { question: 'Can I use the prompts commercially?', answer: 'Yes, all generated prompts can be used for personal or commercial projects.' },
      { question: 'Are the prompts unique?', answer: 'Each generation creates a new combination, giving you virtually unlimited unique prompts.' }
    ],
    internalLinks: [
      { text: 'Writing Prompts', url: '/writing-prompts-generator' },
      { text: 'AI Art Prompts', url: '/ai-images-prompt' }
    ],
    externalLinks: [
      { text: 'Writer\'s Digest', url: 'https://www.writersdigest.com/' },
      { text: 'Creative Bloq', url: 'https://www.creativebloq.com/' }
    ],
    templates: [
      '{adj} {noun} in a {setting}',
      '{character} discovers {object}',
      'A story about {concept} and {emotion}'
    ],
    elements: {
      adj: ['mysterious', 'ancient', 'forgotten', 'hidden', 'unusual', 'curious'],
      noun: ['artifact', 'message', 'door', 'path', 'secret', 'memory'],
      setting: ['misty forest', 'abandoned city', 'quiet village', 'endless desert'],
      character: ['a detective', 'an artist', 'a wanderer', 'a scholar'],
      object: ['an old map', 'a strange key', 'a faded photograph', 'a mysterious letter'],
      concept: ['time', 'identity', 'memory', 'destiny', 'truth'],
      emotion: ['hope', 'loss', 'wonder', 'courage', 'fear']
    }
  }
};

interface SimpleGeneratorProps {
  generatorKey: string;
}

const SimpleGenerator: React.FC<SimpleGeneratorProps> = ({ generatorKey }) => {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [copiedMessage, setCopiedMessage] = useState<string>('');

  // Get generator data (use default if specific key not found)
  const data = GENERATOR_DATA[generatorKey] || GENERATOR_DATA['default'];

  const generateContent = useCallback(() => {
    // Pick a random template
    const template = data.templates[Math.floor(Math.random() * data.templates.length)];

    // Replace all placeholders
    let result = template;
    const placeholderRegex = /\{(\w+)\}/g;
    result = result.replace(placeholderRegex, (match, key) => {
      const options = data.elements[key];
      if (options && options.length > 0) {
        return options[Math.floor(Math.random() * options.length)];
      }
      return match;
    });

    setGeneratedContent(result);
  }, [data]);

  const copyToClipboard = useCallback(async () => {
    if (!generatedContent) return;

    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopiedMessage('Copied to clipboard!');
      setTimeout(() => setCopiedMessage(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopiedMessage('Failed to copy');
      setTimeout(() => setCopiedMessage(''), 2000);
    }
  }, [generatedContent]);

  // Auto-generate on mount
  React.useEffect(() => {
    generateContent();
  }, [generateContent]);

  return (
    <div className="space-y-12">
      {/* Generator Section */}
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Generate</h2>
          <button
            onClick={generateContent}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <RefreshCw size={18} />
            Generate
          </button>
        </div>

        {generatedContent && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
                {generatedContent}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Copy size={16} />
                Copy
              </button>
              {copiedMessage && (
                <span className="text-sm text-green-600 font-medium">{copiedMessage}</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <section className="prose prose-gray max-w-none">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-0">How It Works</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">{data.howItWorks}</p>
      </section>

      {/* Use Cases Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Lightbulb className="text-purple-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Best Ways to Use This Generator</h2>
        </div>
        <ul className="space-y-2">
          {data.useCases.map((useCase, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-gray-700">{useCase}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <HelpCircle className="text-green-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {data.faq.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
              <p className="text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Helpful Resources</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Internal Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">More Generators</h3>
            <div className="space-y-2">
              {data.internalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="block text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">External Resources</h3>
            <div className="space-y-2">
              {data.externalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {link.text}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleGenerator;
