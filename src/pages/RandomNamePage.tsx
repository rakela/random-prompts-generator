import React from 'react';
import PageTemplate from '../components/PageTemplate';

const RandomNamePage: React.FC = () => {
  const metadata = {
    title: 'Random Name Generator - Fantasy Character Names for Stories & Games',
    description: 'Generate authentic fantasy character names instantly. Create culturally consistent names for elves, dwarves, humans, and exotic races with meaningful combinations perfect for stories, games, and worldbuilding.',
    keywords: 'random name generator, fantasy name generator, character name generator, elf name generator, dwarf names, fantasy character names',
    canonical: 'https://randomprompts.org/random-name-generator',
    h1: 'Random Name Generator',
    subtitle: 'Generate authentic fantasy character names with cultural consistency and meaningful combinations. Create names for elves, dwarves, humans, and exotic races that sound natural and suggest character backgrounds.'
  };

  const faqs = [
    {
      question: 'What is a random name generator?',
      answer: 'A random name generator creates character names by combining culturally consistent first names, last names, titles, and house affiliations. Our generator creates names that sound authentic within their fantasy cultures while suggesting character backgrounds and personalities.'
    },
    {
      question: 'How do I use the random name generator?',
      answer: 'Select a culture (Elvish, Dwarven, Human, or Exotic), choose a name format (full name, first name only, with title, or with house), and decide how many names to generate (single, 5 names, or batch of 10). Click generate to create your names.'
    },
    {
      question: 'Are these names suitable for D&D and other RPGs?',
      answer: 'Yes! These names are perfect for Dungeons & Dragons, Pathfinder, and other tabletop RPGs. Each name is crafted from culturally consistent elements that fit fantasy game settings and provide character depth.'
    },
    {
      question: 'Can I use these names for my novel or story?',
      answer: 'Absolutely! All generated names are free to use for personal or commercial creative projects including novels, short stories, screenplays, and game development. No attribution required.'
    },
    {
      question: 'What makes a good fantasy character name?',
      answer: 'A good fantasy name is culturally consistent (matching the race/culture), easy to pronounce, memorable, and suggests something about the character\'s background or personality. Our generator creates names that balance these elements naturally.'
    }
  ];

  const seoContent = (
    <div className="prose prose-gray max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Fantasy Character Random Name Generator</h2>
      <p className="text-gray-700 mb-4">
        Generate authentic fantasy character names with cultural consistency and meaningful combinations. Our random name generator creates names that sound natural within their fantasy cultures while suggesting character backgrounds and personalities. Perfect for novelists, game masters, and worldbuilders.
      </p>
      <p className="text-gray-700 mb-4">
        Each name is crafted from culturally consistent elements (Elvish, Dwarven, Human, Exotic) with optional titles and house affiliations that suggest the character's role, background, and social status within their world. Generate single names or batches of up to 10 names at once for NPCs and supporting characters.
      </p>
      <div className="bg-pink-50 p-4 rounded-lg mt-4">
        <h3 className="font-semibold text-pink-900 mb-2">Name Generation Features:</h3>
        <ul className="text-pink-800 text-sm space-y-1">
          <li>• Culturally consistent names (Elvish, Dwarven, Human, Exotic)</li>
          <li>• Multiple formats (full name, first only, with title, with house)</li>
          <li>• Batch generation (create up to 10 names at once)</li>
          <li>• Perfect for D&D, novels, games, and worldbuilding</li>
        </ul>
      </div>
    </div>
  );

  return <PageTemplate category="names" metadata={metadata} faqs={faqs} seoContent={seoContent} />;
};

export default RandomNamePage;
