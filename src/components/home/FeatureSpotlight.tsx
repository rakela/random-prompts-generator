import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function FeatureSpotlight() {
  return (
    <section className="w-full bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Copy & Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-400 text-sm font-semibold">New for Creators</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Stop Wasting Your Video Content.
            </h2>

            {/* Body */}
            <p className="text-gray-400 text-lg leading-relaxed">
              You spend hours filming. Don't let the algorithm bury your hard work. Turn one YouTube video into a Blog Post, LinkedIn Thread, and Newsletter in 60 seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Main CTA */}
              <a
                href="/workflows/youtube-to-blog-and-linkedin"
                className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-xl group"
              >
                <span>Unlock Creator Workflow</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary Link */}
              <a
                href="/tools"
                className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white font-medium px-8 py-4 transition-colors group"
              >
                <span>View all tools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Free 10 credits</span>
              </div>
            </div>
          </div>

          {/* Right Column: Card Stack Visual */}
          <div className="relative h-[400px] flex items-center justify-center lg:justify-end">
            {/* Back Card - Rotated -6deg */}
            <div
              className="absolute w-80 h-96 bg-gray-700/30 rounded-xl shadow-2xl"
              style={{
                transform: 'rotate(-6deg) translateX(-20px)',
                zIndex: 1
              }}
            ></div>

            {/* Middle Card - Rotated -3deg */}
            <div
              className="absolute w-80 h-96 bg-gray-600/40 rounded-xl shadow-2xl"
              style={{
                transform: 'rotate(-3deg) translateX(-10px)',
                zIndex: 2
              }}
            ></div>

            {/* Front Card - White with Success State */}
            <div
              className="relative w-80 h-96 bg-white rounded-xl shadow-2xl overflow-hidden"
              style={{ zIndex: 3 }}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <div className="flex items-center gap-2 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span className="font-semibold">Success</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Blog Post Generated</h3>
                  <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    COMPLETE
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Checkmark Items */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Blog Post (1,200 words)</p>
                      <p className="text-xs text-gray-500">SEO optimized & ready to publish</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">LinkedIn Post</p>
                      <p className="text-xs text-gray-500">Professional & engaging</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Newsletter Draft</p>
                      <p className="text-xs text-gray-500">Ready for your audience</p>
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Generated in 43 seconds</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Premium Quality</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
