import React from 'react';
import { ArrowRight, Video } from 'lucide-react';

export default function CreatorSidebar() {
  return (
    <aside className="sticky top-24 w-full">
      <div className="bg-slate-900 rounded-xl p-6 text-white shadow-xl relative overflow-hidden group">

        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 transition-opacity group-hover:opacity-30"></div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-blue-600/20 text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-500/30 mb-4 relative z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          New Tools
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-2 relative z-10">
          Are you a YouTuber?
        </h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed relative z-10">
          Don't just write stories—film them. Turn your random prompts into viral video scripts instantly.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 relative z-10">
          <a
            href="/tools/youtube-content-brief"
            className="flex items-center justify-center gap-2 w-full bg-white text-slate-900 font-semibold py-2.5 px-4 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Video className="w-4 h-4" />
            <span>Generate Script</span>
          </a>

          <a
            href="/workflows/youtube-to-blog-and-linkedin"
            className="flex items-center justify-center gap-2 w-full bg-slate-800 text-slate-300 text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-slate-700 transition-colors group/link"
          >
            <span>Repurpose Video</span>
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </aside>
  );
}
