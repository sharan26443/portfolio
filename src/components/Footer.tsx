import React, { useState, useEffect } from 'react';
import { Sparkles, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' IST'
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 glass-panel bg-slate-900/80 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-950/80 border border-purple-500/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-300" />
          </div>
          <div>
            <span className="font-art font-normal text-lg text-white block">
              {PERSONAL_INFO.name} — Full-Stack & Cloud Architect
            </span>
            <span className="text-xs font-sans text-slate-400 font-medium">
              © {new Date().getFullYear()} {PERSONAL_INFO.fullName}. All rights reserved.
            </span>
          </div>
        </div>

        {/* Local Time Clock & Status */}
        <div className="flex items-center gap-4 text-xs font-sans text-purple-200 bg-slate-800/90 px-4 py-2 rounded-full border border-white/10 shadow-sm font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
            <span>Node Active</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-purple-300 font-bold">{currentTime || '12:00:00 IST'}</span>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.contact.github}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-slate-800 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-slate-800 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.contact.email}`}
            className="p-2.5 rounded-full bg-slate-800 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#7c3aed] text-white font-bold hover:bg-[#6d28d9] transition-colors ml-2 cursor-pointer shadow-md"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
