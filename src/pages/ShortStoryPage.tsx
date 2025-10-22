import React from 'react';
import PageTemplate from '../components/PageTemplate';

const ShortStoryPage: React.FC = () => {
  const metadata = {
    title: 'Short Story Prompts Generator - Fantasy Worldbuilding Ideas',
    description: 'Generate unique short story prompts for fantasy worldbuilding. Create intricate worlds with original magic systems, rich cultures, compelling conflicts, and evocative locations for your next fantasy story.',
    keywords: 'short story prompts generator, fantasy prompts, worldbuilding generator, fantasy story ideas, magic system generator, fantasy writing prompts',
    canonical: 'https://randomprompts.org/short-story-prompts-generator',
    h1: 'Short Story Prompts Generator',
    subtitle: 'Create intricate fantasy worlds and short story prompts with unique magic systems, rich cultures, and compelling conflicts. Generate original worldbuilding ideas that go beyond typical fantasy tropes for your next story.'
  };

  const faqs = [
    {
      question: 'What are short story prompts?',
      answer: 'Short story prompts are creative starting points that combine characters, settings, conflicts, and themes to inspire complete short stories. They provide the foundation for narrative ideas that can be developed into full stories.'
    },
    {
      question: 'How do fantasy short story prompts help with worldbuilding?',
      answer: 'Fantasy short story prompts include detailed magic systems with rules and costs, unique cultures with specific practices, world-threatening conflicts, and evocative locations. These elements provide a complete foundation for building immersive fantasy worlds.'
    },
    {
      question: 'What makes these fantasy prompts unique?',
      answer: 'Our prompts feature original magic systems with built-in limitations (emotion-based magic, memory-trading), detailed cultures with specific practices, complex conflicts with political implications, and locations that go beyond standard fantasy settings like generic medieval kingdoms.'
    },
    {
      question: 'Can I use these prompts for longer stories?',
      answer: 'Yes! While designed for short stories, these prompts provide rich worldbuilding foundations that can be expanded into novellas or full novels. The detailed magic systems, cultures, and conflicts provide depth for longer narratives.'
    },
    {
      question: 'Are these suitable for different fantasy sub-genres?',
      answer: 'Absolutely. The prompts work for high fantasy, urban fantasy, dark fantasy, magical realism, and more. The modular nature of magic systems, cultures, and conflicts allows you to adapt them to any fantasy sub-genre.'
    }
  ];

  const seoContent = (
    <div className="prose prose-gray max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Fantasy Short Story Prompts Generator</h2>
      <p className="text-gray-700 mb-4">
        Create intricate fantasy worlds and short story prompts with unique magic systems, rich cultures, and compelling conflicts that go beyond typical fantasy tropes. Our generator combines innovative magical concepts with specific cultural details and world-threatening conflicts to provide complete worldbuilding foundations.
      </p>
      <p className="text-gray-700 mb-4">
        Each prompt features original magic systems with built-in limitations (emotion-based magic, memory-trading), detailed cultures with specific practices, and conflicts that create interesting political and social dynamics. Perfect for fantasy writers, game masters, and creative worldbuilders looking to create unique fantasy settings.
      </p>
      <div className="bg-amber-50 p-4 rounded-lg mt-4">
        <h3 className="font-semibold text-amber-900 mb-2">Worldbuilding Features:</h3>
        <ul className="text-amber-800 text-sm space-y-1">
          <li>• Original magic systems with clear rules and costs</li>
          <li>• Unique cultures with specific practices and beliefs</li>
          <li>• Complex conflicts with political implications</li>
          <li>• Evocative locations beyond standard fantasy settings</li>
        </ul>
      </div>
    </div>
  );

  return <PageTemplate category="fantasy" metadata={metadata} faqs={faqs} seoContent={seoContent} />;
};

export default ShortStoryPage;
