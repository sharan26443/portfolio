import React, { useState } from 'react';
import { FREELANCE_PROJECTS_DATA } from '../data/portfolioData';
import { MagneticCard } from './MagneticCard';
import { ExternalLink, Globe, CheckCircle2, Sparkles, ShieldCheck, ArrowUpRight, Monitor, ChevronDown, ChevronUp, Layers, FileText } from 'lucide-react';

export const FreelanceProjectsSection: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="freelance" className="relative py-24 px-4 sm:px-8 z-10 max-w-7xl mx-auto scroll-mt-24">
      
      {/* Background Accent Soft Lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/90 dark:border-slate-700/80 text-xs font-sans font-semibold text-[#4c1d95] dark:text-purple-300">
          <Globe className="w-4 h-4 text-[#7c3aed]" />
          <span>Client Portfolio & Web Applications</span>
        </div>
        <h2 className="font-art font-normal text-4xl sm:text-6xl text-[#1e1b4b] dark:text-white">
          Freelance <span className="text-gradient-pastel font-serif-luxury italic font-bold">Full-Stack Solutions</span>
        </h2>
        <p className="text-[#334155] dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-sans font-medium">
          Production-deployed web applications engineered for international clients across hospitality, real estate, and lodging sectors.
        </p>
      </div>

      {/* Freelance Projects Grid / List */}
      <div className="grid grid-cols-1 gap-10">
        {FREELANCE_PROJECTS_DATA.map((project, idx) => {
          const isExpanded = !!expandedProjects[project.id];

          // Determine custom theme header styling per client application screenshot identity
          let headerBg = "bg-slate-900 text-white";
          let mockBadge = "Real Estate Platform";

          if (project.previewTheme === 'gold-resort') {
            headerBg = "bg-[#181512] text-[#fef08a]";
            mockBadge = "Resort & Michelin Dining";
          } else if (project.previewTheme === 'warm-hospitality') {
            headerBg = "bg-[#291711] text-[#fde047]";
            mockBadge = "Hotel & Steakhouse";
          } else if (project.previewTheme === 'navy-lodging') {
            headerBg = "bg-[#0b1938] text-white";
            mockBadge = "Practical Lodging Engine";
          } else if (project.previewTheme === 'villa-luxury') {
            headerBg = "bg-[#1c1917] text-amber-200";
            mockBadge = "Boutique Luxury Suites";
          }

          return (
            <div key={project.id} className="w-full">
              <MagneticCard
                intensity={0.3}
                className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border border-white/90 dark:border-slate-800 relative overflow-hidden shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Project Overview & Specs */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#e0c3fc]/40 dark:bg-purple-950/60 border border-[#7c3aed]/30 text-xs font-sans text-[#4c1d95] dark:text-purple-200 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        {project.badge}
                      </span>
                      <span className="text-xs font-sans text-[#334155] dark:text-slate-400 font-semibold">
                        {project.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1e1b4b] dark:text-white mb-2 flex items-center gap-2">
                        <span>{project.title}</span>
                      </h3>
                      <p className="text-[#334155] dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-medium">
                        {project.description}
                      </p>
                    </div>

                    {/* Features Quick Checklist */}
                    <div className="space-y-2 pt-1">
                      <h4 className="text-xs font-sans text-[#6d28d9] dark:text-purple-400 uppercase tracking-wider font-bold">
                        Core Built Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.keyFeatures.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="pt-1">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/80 border border-purple-200 dark:border-slate-700 text-xs font-sans font-semibold text-[#4c1d95] dark:text-purple-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={project.clientUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-sans font-bold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-purple-500/25 transition-all group"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Visit Live Web Application</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-purple-200 font-sans font-semibold text-xs transition-all border border-purple-500/30"
                      >
                        <Layers className="w-4 h-4 text-purple-400" />
                        <span>{isExpanded ? 'Hide Full Features' : 'View Full Feature Breakdown'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Realistic Browser Mockup Preview */}
                  <div className="lg:col-span-6">
                    <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950">
                      
                      {/* Browser Chrome Header */}
                      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                        </div>
                        <div className="flex-1 max-w-sm mx-4 bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1 flex items-center gap-2 text-[11px] text-slate-400 font-mono overflow-hidden">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{project.clientUrl}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Monitor className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Mockup Screen Viewport with Custom Theme Backdrop */}
                      <div className={`p-6 sm:p-8 min-h-[260px] flex flex-col justify-between ${headerBg} relative overflow-hidden group/screen`}>
                        
                        {/* Decorative Background Mesh */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/30 pointer-events-none" />

                        <div className="relative z-10 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-white/10 backdrop-blur-md border border-white/20">
                              {mockBadge}
                            </span>
                            <span className="text-xs font-mono opacity-80">Netlify Deployment</span>
                          </div>

                          <h4 className="font-display font-bold text-2xl sm:text-3xl tracking-tight leading-tight pt-2">
                            {project.title}
                          </h4>

                          <p className="text-xs sm:text-sm font-sans opacity-90 max-w-md line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        {/* Interactive Banner Action Bar inside Mockup */}
                        <div className="relative z-10 pt-6 flex items-center justify-between border-t border-white/10 mt-6">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[11px] font-sans font-semibold">Active Netlify SSL Service</span>
                          </div>

                          <a
                            href={project.clientUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all text-white border border-white/30"
                          >
                            <span>Open Web App</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                      </div>

                    </div>
                  </div>

                </div>

                {/* Detailed Feature Breakdown Drawer */}
                {isExpanded && (
                  <div className="mt-8 pt-8 border-t border-slate-700/80 animate-fadeIn space-y-6">
                    
                    {/* Executive Summary Box */}
                    {project.executiveSummary && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-200">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300 uppercase tracking-wider mb-1.5">
                          <FileText className="w-4 h-4 text-purple-400" />
                          <span>Executive Summary & Client Scope</span>
                        </div>
                        <p className="text-xs sm:text-sm font-sans leading-relaxed text-slate-200">
                          {project.executiveSummary}
                        </p>
                      </div>
                    )}

                    {/* Detailed Categorized Feature Sections Grid */}
                    {project.featureSections && project.featureSections.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-sans font-bold text-white flex items-center gap-2">
                          <Layers className="w-4 h-4 text-purple-400" />
                          <span>Comprehensive Feature Breakdown ({project.featureSections.length} Core Modules)</span>
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {project.featureSections.map((sec, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/30 transition-colors space-y-2.5"
                            >
                              <h5 className="font-sans font-bold text-xs sm:text-sm text-purple-300 border-b border-slate-800 pb-2">
                                {sec.title}
                              </h5>
                              <ul className="space-y-2">
                                {sec.items.map((item, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-sans">
                                    <span className="text-purple-400 font-bold shrink-0 mt-0.5">▸</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </MagneticCard>
            </div>
          );
        })}
      </div>

    </section>
  );
};
