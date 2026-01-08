import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CreatorSidebar() {
  return (
    <div className="sticky top-20">
      <div className="bg-black text-white rounded-xl p-6 shadow-2xl border border-gray-800 relative overflow-hidden">
        {/* New Badge - Small in corner */}
        <div className="absolute top-4 right-4">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            NEW
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* YouTube Icon */}
          <div className="mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Headline */}
          <h3 className="text-2xl font-bold mb-3 leading-tight">
            Are you a YouTuber?
          </h3>

          {/* Body */}
          <p className="text-gray-300 mb-6 leading-relaxed">
            Stop guessing. Turn your ideas into viral videos with our AI Content Briefs.
          </p>

          {/* Button */}
          <a
            href="/workflows/youtube-to-blog-and-linkedin"
            className="flex items-center justify-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all hover:scale-105 transform duration-200 shadow-lg w-full"
          >
            <span>Try Creator Tools</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Feature list */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Generate content briefs in 60s</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Turn videos into blog posts</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Create LinkedIn posts instantly</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
