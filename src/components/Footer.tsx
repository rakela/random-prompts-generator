import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Heart, ExternalLink } from 'lucide-react';

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
              The ultimate free prompt generator for writers, artists, bloggers, and worldbuilders.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com/intent/tweet?text=Check%20out%20this%20free%20prompt%20generator!&url=https://randomprompts.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/writing-prompts" className="text-gray-400 hover:text-white transition-colors">Writing Prompts</Link></li>
              <li><Link to="/ai-images-prompt" className="text-gray-400 hover:text-white transition-colors">AI Images Prompt</Link></li>
              <li><Link to="/ai-blog-post-generator" className="text-gray-400 hover:text-white transition-colors">AI Blog Post Generator</Link></li>
              <li><Link to="/short-story-prompts-generator" className="text-gray-400 hover:text-white transition-colors">Short Story Prompts</Link></li>
              <li><Link to="/random-name-generator" className="text-gray-400 hover:text-white transition-colors">Random Name Generator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://midjourney.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                MidJourney <ExternalLink size={12} />
              </a></li>
              <li><a href="https://openai.com/dall-e-2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                DALL-E <ExternalLink size={12} />
              </a></li>
              <li><a href="https://stability.ai/stablediffusion" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                Stable Diffusion <ExternalLink size={12} />
              </a></li>
              <li><a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                ChatGPT <ExternalLink size={12} />
              </a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/rakela/random-prompts-generator/issues" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Report Issues</a></li>
              <li><a href="https://github.com/rakela/random-prompts-generator/discussions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Discussions</a></li>
              <li><a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Contribute</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 Random Prompts. Made with <Heart size={14} className="inline text-red-500" /> for the creative community.</p>
          <p className="mt-2">Free and open source. No registration required. No data collected.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
