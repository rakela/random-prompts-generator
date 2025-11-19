'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Heart, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors">
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
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">All Prompts</Link></li>
              <li><Link href="/writing-prompts" className="text-gray-400 hover:text-white transition-colors">Writing Prompts</Link></li>
              <li><Link href="/ai-images-prompt" className="text-gray-400 hover:text-white transition-colors">AI Images Prompt</Link></li>
              <li><Link href="/ai-blog-post-generator" className="text-gray-400 hover:text-white transition-colors">Blog Post Generator</Link></li>
              <li><Link href="/short-story-prompts-generator" className="text-gray-400 hover:text-white transition-colors">Short Story Prompts</Link></li>
              <li><Link href="/random-name-generator" className="text-gray-400 hover:text-white transition-colors">Random Name Generator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Specialized Prompts</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/writing-prompts-for-students" className="text-gray-400 hover:text-white transition-colors">Writing Prompts for Students</Link></li>
              <li><Link href="/nano-banana-prompts" className="text-gray-400 hover:text-white transition-colors">Nano Banana Prompts</Link></li>
              <li><Link href="/october-writing-prompts" className="text-gray-400 hover:text-white transition-colors">October Writing Prompts</Link></li>
              <li><Link href="/ghostface-ai-trend-prompt-generator" className="text-gray-400 hover:text-white transition-colors">Ghostface AI Prompts</Link></li>
              <li><Link href="/gemini-ai-snow-prompt-tutorial" className="text-gray-400 hover:text-white transition-colors">Gemini AI Snow Tutorial</Link></li>
              <li><Link href="/midjourney-ai-picture-generator" className="text-gray-400 hover:text-white transition-colors">MidJourney AI Prompts</Link></li>
              <li><Link href="/persuasive-writing-topics" className="text-gray-400 hover:text-white transition-colors">Persuasive Writing Topics</Link></li>
              <li><Link href="/persuasive-essays-topics" className="text-gray-400 hover:text-white transition-colors">Persuasive Essays Topics</Link></li>
              <li><Link href="/persuasive-writing-titles" className="text-gray-400 hover:text-white transition-colors">Persuasive Writing Titles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><a href="https://github.com/rakela/random-prompts-generator/issues" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Report Issues</a></li>
              <li><a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Contribute</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://www.producthunt.com/products/random-prompts-generator?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-random&#0045;prompts&#0045;generator" target="_blank" rel="noopener noreferrer">
                <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1031771&theme=neutral&t=1761741756475" alt="Random Prompts Generator - Generate endless ideas for writing, art, and stories | Product Hunt" style={{ width: '250px', height: '54px' }} width={250} height={54} />
              </a>
              <a href="https://startupfa.me/s/randomprompts.org?utm_source=randomprompts.org" target="_blank" rel="noopener noreferrer">
                <img src="https://startupfa.me/badges/featured-badge.webp" alt="randomprompts.org - Featured on Startup Fame" width="171" height="54" />
              </a>
              <a href="https://turbo0.com/item/random-prompts-generator" target="_blank" rel="noopener noreferrer">
                <img src="https://img.turbo0.com/badge-listed-light.svg" alt="Listed on Turbo0" style={{ height: '54px', width: 'auto' }} />
              </a>
            </div>
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
