import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Heart, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles size={20} />
              <span className="text-lg font-bold">Random Prompts</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Free writing prompt generator for writers, storytellers, and creative minds.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20free%20writing%20prompt%20generator!&url=https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">All Prompts</Link></li>
              <li><Link to="/writing-prompts" className="text-gray-400 hover:text-white transition-colors">Writing Prompts</Link></li>
              <li><Link to="/ai-images-prompt" className="text-gray-400 hover:text-white transition-colors">AI Images Prompt</Link></li>
              <li><Link to="/ai-blog-post-generator" className="text-gray-400 hover:text-white transition-colors">Blog Post Generator</Link></li>
              <li><Link to="/short-story-prompts-generator" className="text-gray-400 hover:text-white transition-colors">Short Story Prompts</Link></li>
              <li><Link to="/random-name-generator" className="text-gray-400 hover:text-white transition-colors">Random Name Generator</Link></li>
              <li><Link to="/writing-prompts-for-students" className="text-gray-400 hover:text-white transition-colors">Writing Prompts for Students</Link></li>
              <li><Link to="/nano-banana-prompts" className="text-gray-400 hover:text-white transition-colors">Nano Banana Prompts</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">ChatGPT</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/rakela/random-prompts-generator/issues" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Report Issues</a></li>
              <li><a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Contribute</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col items-center gap-4">
            <a href="https://www.producthunt.com/products/random-prompts-generator?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-random&#0045;prompts&#0045;generator" target="_blank" rel="noopener noreferrer">
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1031771&theme=dark&t=1761655780520" alt="Random&#0032;Prompts&#0032;Generator - Generate&#0032;endless&#0032;ideas&#0032;for&#0032;writing&#0044;&#0032;art&#0044;&#0032;and&#0032;stories&#0046; | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" />
            </a>
            <a href="https://turbo0.com/item/random-prompts-generator" target="_blank" rel="noopener noreferrer">
              <img src="https://img.turbo0.com/badge-listed-light.svg" alt="Listed on Turbo0" style={{ height: '54px', width: 'auto' }} />
            </a>
            <div className="text-center text-sm text-gray-400">
              <p>© 2024 Random Prompts. Made with <Heart size={14} className="inline text-red-500" /> for the creative community.</p>
              <p className="mt-2">Free and open source. No registration required. No data collected.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
