'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Github, Menu, X, Moon, Sun } from 'lucide-react';
import Logo from '@/components/Logo';
import { useTheme } from '@/lib/utils/useTheme';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo size={28} />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Random Prompts</span>
          </Link>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                Prompts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/ghostface-ai-trend-prompt-generator" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                  Ghostface AI Trend
                </Link>
                <Link href="/gemini-ai-snow-prompt-tutorial" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                  Gemini AI Snow Tutorial
                </Link>
                <Link href="/chatgpt-photo-editing-prompts" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                  ChatGPT Photo Editing
                </Link>
                <Link href="/gemini-photo-editing-prompts" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                  Gemini Photo Editing
                </Link>
                <Link href="/writing-prompts/october/" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                  October Writing Prompts
                </Link>
                <Link href="/writing-prompts/students/" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                  Writing Prompts for Students
                </Link>
                <div className="relative group/submenu">
                  <button className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 flex items-center justify-between">
                    Persuasive Writing
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute left-full top-0 ml-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50">
                    <Link href="/writing-prompts/persuasive-topics/" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                      Persuasive Writing Topics
                    </Link>
                    <Link href="/writing-prompts/persuasive-essays/" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                      Persuasive Essays Topics
                    </Link>
                    <Link href="/writing-prompts/persuasive-titles/" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      Persuasive Writing Titles
                    </Link>
                  </div>
                </div>
                <Link href="/ai-art-prompts/midjourney/" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                  Midjourney AI Prompts
                </Link>
                <Link href="/writing-prompts/nano-banana/" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Nano Banana Prompts
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                Generators
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {/* Writing Prompts Hub */}
                <Link href="/writing-prompts/" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 font-medium">
                  Writing Prompts →
                </Link>
                {/* AI Art Prompts Hub */}
                <Link href="/ai-art-prompts/" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 font-medium">
                  AI Art Prompts →
                </Link>
                {/* Drawing Ideas Hub */}
                <Link href="/drawing-ideas/" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium">
                  Drawing Ideas →
                </Link>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Github size={16} />
              GitHub
            </a>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <Link href="/"
                className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Prompts Section */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Prompts</div>
                <div className="flex flex-col space-y-2 pl-3">
                  <Link href="/ghostface-ai-trend-prompt-generator"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ghostface AI Trend
                  </Link>
                  <Link href="/gemini-ai-snow-prompt-tutorial"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Gemini AI Snow Tutorial
                  </Link>
                  <Link href="/chatgpt-photo-editing-prompts"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ChatGPT Photo Editing
                  </Link>
                  <Link href="/gemini-photo-editing-prompts"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Gemini Photo Editing
                  </Link>
                  <Link href="/writing-prompts/october/"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    October Writing Prompts
                  </Link>
                  <Link href="/writing-prompts/students/"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Writing Prompts for Students
                  </Link>

                  {/* Persuasive Writing Submenu */}
                  <div className="pl-3 border-l-2 border-gray-200 dark:border-gray-600 space-y-2">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Persuasive Writing</div>
                    <Link href="/writing-prompts/persuasive-topics/"
                      className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Persuasive Writing Topics
                    </Link>
                    <Link href="/writing-prompts/persuasive-essays/"
                      className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Persuasive Essays Topics
                    </Link>
                    <Link href="/writing-prompts/persuasive-titles/"
                      className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Persuasive Writing Titles
                    </Link>
                  </div>

                  <Link href="/ai-art-prompts/midjourney/"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Midjourney AI Prompts
                  </Link>
                  <Link href="/writing-prompts/nano-banana/"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Nano Banana Prompts
                  </Link>
                </div>
              </div>

              {/* Generators Section */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Generators</div>
                <div className="flex flex-col space-y-2 pl-3">
                  <Link href="/writing-prompts/" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Writing Prompts →
                  </Link>
                  <Link href="/ai-art-prompts/" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    AI Art Prompts →
                  </Link>
                  <Link href="/drawing-ideas/" className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Drawing Ideas →
                  </Link>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 border-t border-gray-100 dark:border-gray-700 pt-3 text-left"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>

              <a
                href="https://github.com/rakela/random-prompts-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
              >
                <Github size={16} />
                GitHub
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
