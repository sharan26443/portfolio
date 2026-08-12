import React from 'react';
import { TerminalContact } from './TerminalContact';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowLeft, Mail, Phone, Github, Linkedin, MapPin, ShieldCheck, Sparkles, Calendar, Clock } from 'lucide-react';

interface ContactPageViewProps {
  onBackToPortfolio: () => void;
}

export const ContactPageView: React.FC<ContactPageViewProps> = ({ onBackToPortfolio }) => {
  return (
    <div className="min-h-screen relative pt-24 sm:pt-28 pb-20 px-4 sm:px-8 z-20 max-w-7xl mx-auto font-sans">
      
      {/* Top Header Navigation Bar & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-purple-200 dark:border-slate-800">
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 border border-purple-200 dark:border-slate-800 text-xs sm:text-sm font-sans font-bold text-[#4c1d95] dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 shadow-md transition-all group w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio Overview</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#5b21b6] dark:text-slate-300">
          <span>Portfolio</span>
          <span>/</span>
          <span className="text-[#7c3aed] dark:text-purple-400 font-bold">Inquire & Contact Page</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/90 dark:border-slate-800 text-xs font-sans font-semibold text-[#4c1d95] dark:text-purple-300">
          <Sparkles className="w-4 h-4 text-[#7c3aed]" />
          <span>Direct Professional Inquiry Gateway</span>
        </div>
        <h1 className="font-art font-normal text-4xl sm:text-6xl text-[#1e1b4b] dark:text-white">
          Inquire & <span className="text-gradient-pastel font-serif-luxury italic font-bold">Connect</span>
        </h1>
        <p className="text-[#334155] dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-sans font-medium">
          Have a project requirement, cloud architecture query, or full-stack software opportunity? Send a message directly to Saravanan R A.
        </p>
      </div>

      {/* Availability Status Banner */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <h4 className="font-sans font-bold text-sm text-emerald-950 dark:text-emerald-300">
              Contract & Full-Stack Availability: OPEN
            </h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">
              Accepting custom web application, Python automation, and AWS cloud engineering projects.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans font-semibold text-purple-900 dark:text-purple-300 bg-white/80 dark:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-purple-200 dark:border-slate-800 shrink-0">
          <Clock className="w-3.5 h-3.5 text-[#7c3aed]" />
          <span>Avg Response: &lt; 4 Hours</span>
        </div>
      </div>

      {/* Quick Direct Communication Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
        
        {/* Email Card */}
        <a
          href={`mailto:${PERSONAL_INFO.contact.email}`}
          className="glass-panel p-5 rounded-2xl border border-white/90 dark:border-slate-800 hover:border-purple-400 transition-all flex items-center gap-3.5 group shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-[#6d28d9] dark:text-purple-300 shrink-0 group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[11px] font-sans font-bold text-[#6d28d9] dark:text-purple-400 uppercase tracking-wider block">Direct Email</span>
            <span className="text-xs sm:text-sm font-sans font-bold text-[#1e1b4b] dark:text-white truncate block group-hover:text-[#6d28d9] transition-colors">
              {PERSONAL_INFO.contact.email}
            </span>
          </div>
        </a>

        {/* Phone Card */}
        <a
          href={`tel:${PERSONAL_INFO.contact.phone}`}
          className="glass-panel p-5 rounded-2xl border border-white/90 dark:border-slate-800 hover:border-purple-400 transition-all flex items-center gap-3.5 group shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-[#6d28d9] dark:text-purple-300 shrink-0 group-hover:scale-110 transition-transform">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-sans font-bold text-[#6d28d9] dark:text-purple-400 uppercase tracking-wider block">Direct Line</span>
            <span className="text-xs sm:text-sm font-sans font-bold text-[#1e1b4b] dark:text-white block group-hover:text-[#6d28d9] transition-colors">
              {PERSONAL_INFO.contact.phone}
            </span>
          </div>
        </a>

        {/* LinkedIn Card */}
        <a
          href={PERSONAL_INFO.contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="glass-panel p-5 rounded-2xl border border-white/90 dark:border-slate-800 hover:border-purple-400 transition-all flex items-center gap-3.5 group shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-[#6d28d9] dark:text-purple-300 shrink-0 group-hover:scale-110 transition-transform">
            <Linkedin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-sans font-bold text-[#6d28d9] dark:text-purple-400 uppercase tracking-wider block">LinkedIn Profile</span>
            <span className="text-xs sm:text-sm font-sans font-bold text-[#1e1b4b] dark:text-white block group-hover:text-[#6d28d9] transition-colors">
              /in/saravanan-ra
            </span>
          </div>
        </a>

        {/* GitHub Card */}
        <a
          href={PERSONAL_INFO.contact.github}
          target="_blank"
          rel="noreferrer"
          className="glass-panel p-5 rounded-2xl border border-white/90 dark:border-slate-800 hover:border-purple-400 transition-all flex items-center gap-3.5 group shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-[#6d28d9] dark:text-purple-300 shrink-0 group-hover:scale-110 transition-transform">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-sans font-bold text-[#6d28d9] dark:text-purple-400 uppercase tracking-wider block">GitHub Repos</span>
            <span className="text-xs sm:text-sm font-sans font-bold text-[#1e1b4b] dark:text-white block group-hover:text-[#6d28d9] transition-colors">
              @{PERSONAL_INFO.contact.githubUser}
            </span>
          </div>
        </a>

      </div>

      {/* Main Terminal & Inquiry Form Interface */}
      <div className="mb-12">
        <TerminalContact />
      </div>

      {/* Bottom Consultation Footer Banner */}
      <div className="text-center pt-8 border-t border-purple-200/60 dark:border-slate-800">
        <p className="text-xs text-[#334155] dark:text-slate-400 font-medium">
          Saravanan R A — Full-Stack Developer & AWS Certified Solutions Engineer
        </p>
      </div>

    </div>
  );
};
