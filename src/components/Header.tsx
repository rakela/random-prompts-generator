import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, History, Menu, X } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  promptHistory?: any[];
  showHistory?: boolean;
  onHistoryToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ promptHistory = [], showHistory = false, onHistoryToggle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo size={28} />
            <span className="text-xl font-bold text-gray-900">Random Prompts</span>
          </Link>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
                Prompts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/ghostface-ai-trend-prompt-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  Ghostface AI Trend
                </Link>
                <Link to="/october-writing-prompts" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  October Writing Prompts
                </Link>
                <Link to="/writing-prompts-for-students" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  Writing Prompts for Students
                </Link>
                <div className="relative group/submenu">
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    Persuasive Writing
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50">
                    <Link to="/persuasive-writing-topics" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Persuasive Writing Topics
                    </Link>
                    <Link to="/persuasive-essays-topics" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                      Persuasive Essays Topics
                    </Link>
                    <Link to="/persuasive-writing-titles" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                      Persuasive Writing Titles
                    </Link>
                  </div>
                </div>
                <Link to="/midjourney-ai-picture-generator" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                  Midjourney AI Prompts
                </Link>
                <Link to="/nano-banana-prompts" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                  Nano Banana Prompts
                </Link>
              </div>
            </div>
            <a href="https://github.com/rakela/random-prompts-generator" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
              <Github size={16} />
              GitHub
            </a>
            {onHistoryToggle && (
              <button
                onClick={onHistoryToggle}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <History size={16} />
                History ({promptHistory.length})
              </button>
            )}
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Prompts Section */}
              <div className="border-t border-gray-100 pt-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Prompts</div>
                <div className="flex flex-col space-y-2 pl-3">
                  <Link
                    to="/ghostface-ai-trend-prompt-generator"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ghostface AI Trend
                  </Link>
                  <Link
                    to="/october-writing-prompts"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    October Writing Prompts
                  </Link>
                  <Link
                    to="/writing-prompts-for-students"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Writing Prompts for Students
                  </Link>

                  {/* Persuasive Writing Submenu */}
                  <div className="pl-3 border-l-2 border-gray-200 space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Persuasive Writing</div>
                    <Link
                      to="/persuasive-writing-topics"
                      className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Persuasive Writing Topics
                    </Link>
                    <Link
                      to="/persuasive-essays-topics"
                      className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Persuasive Essays Topics
                    </Link>
                    <Link
                      to="/persuasive-writing-titles"
                      className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Persuasive Writing Titles
                    </Link>
                  </div>

                  <Link
                    to="/midjourney-ai-picture-generator"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Midjourney AI Prompts
                  </Link>
                  <Link
                    to="/nano-banana-prompts"
                    className="text-gray-600 hover:text-blue-600 transition-colors py-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Nano Banana Prompts
                  </Link>
                </div>
              </div>

              <a
                href="https://github.com/rakela/random-prompts-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors py-2 border-t border-gray-100 pt-3"
              >
                <Github size={16} />
                GitHub
              </a>

              {onHistoryToggle && (
                <button
                  onClick={() => {
                    onHistoryToggle();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors py-2 text-left"
                >
                  <History size={16} />
                  History ({promptHistory.length})
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
