import React from 'react';
import PageTemplate from '../components/PageTemplate';

const AIImagesPage: React.FC = () => {
  const metadata = {
    title: 'AI Images Prompt Generator - Free AI Art Prompts for MidJourney & DALL-E',
    description: 'Generate professional AI images prompts instantly. Create detailed prompts for MidJourney, DALL-E, and Stable Diffusion with technical terminology, lighting setups, and artist style references.',
    keywords: 'ai images prompt, ai art prompt generator, midjourney prompts, dall-e prompts, stable diffusion prompts, ai image generator',
    canonical: 'https://randomprompts.org/ai-images-prompt',
    h1: 'AI Images Prompt Generator',
    subtitle: 'Create gallery-quality AI art with professionally crafted prompts optimized for MidJourney, Stable Diffusion, DALL-E, and other platforms. Generate detailed prompts with technical terminology, professional lighting, and composition techniques.'
  };

  const faqs = [
    {
      question: 'What is an AI images prompt?',
      answer: 'An AI images prompt is a detailed text description that guides AI art generators like MidJourney, DALL-E, or Stable Diffusion to create specific images. Good prompts include subject details, style, lighting, composition, and quality modifiers.'
    },
    {
      question: 'How do I write better AI image prompts?',
      answer: 'Include specific details like art style, lighting (volumetric rays, golden hour), composition (rule of thirds, bird\'s eye view), quality modifiers (8K resolution, trending on ArtStation), and artist references for consistent results.'
    },
    {
      question: 'Which AI image generators work with these prompts?',
      answer: 'These prompts work with all major AI art generators including MidJourney, DALL-E 2, DALL-E 3, Stable Diffusion, Leonardo AI, and Playground AI. The technical terminology is universally recognized across platforms.'
    },
    {
      question: 'Can I use AI-generated images commercially?',
      answer: 'Usage rights depend on the AI platform you use. MidJourney allows commercial use for paid subscribers. DALL-E allows commercial use of generated images. Always check your specific platform\'s terms of service.'
    },
    {
      question: 'What makes a professional AI image prompt?',
      answer: 'Professional prompts include: specific subjects, technical art styles, professional lighting terminology, composition techniques, quality modifiers (trending on ArtStation, 8K), and artist style references for consistency and quality.'
    }
  ];

  const seoContent = (
    <div className="prose prose-gray max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional AI Images Prompt Generator</h2>
      <p className="text-gray-700 mb-4">
        Create gallery-quality AI art with professionally crafted prompts optimized for MidJourney, Stable Diffusion, DALL-E, and other AI image generators. Our prompts include specific technical terminology, professional lighting setups, composition techniques, and artist style references to produce consistent, high-quality results.
      </p>
      <p className="text-gray-700 mb-4">
        Each prompt combines detailed subject descriptions with professional art techniques (chiaroscuro lighting, rule of thirds composition), quality modifiers (trending on ArtStation, museum quality), and specific artist style references. Perfect for digital artists, designers, and content creators looking to generate stunning AI images.
      </p>
      <div className="bg-purple-50 p-4 rounded-lg mt-4">
        <h3 className="font-semibold text-purple-900 mb-2">Technical Features:</h3>
        <ul className="text-purple-800 text-sm space-y-1">
          <li>• Professional lighting terminology (volumetric rays, rim lighting)</li>
          <li>• Composition techniques (dutch angle, bird's eye view)</li>
          <li>• Quality modifiers and resolution specifications</li>
          <li>• Specific artist style references for consistency</li>
        </ul>
      </div>
    </div>
  );

  return <PageTemplate category="aiArt" metadata={metadata} faqs={faqs} seoContent={seoContent} />;
};

export default AIImagesPage;
