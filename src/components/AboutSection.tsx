import React, { useState } from 'react';
import { EXPERIENCE_DATA, FULL_BIO } from '../data/portfolioData';
import { GraduationCap, Briefcase, Cpu, Layers, Server, Code, CheckCircle2, User } from 'lucide-react';
import { MagneticCard } from './MagneticCard';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'architecture'>('timeline');

  const architecturePrinciples = [
    {
      title: "Model-View-Controller (MVC) Rigor",
      desc: "Strict separation of concerns separating database models, business logic controllers, and presentation layers for high maintainability.",
      icon: Layers,
    },
    {
      title: "Asynchronous Concurrency",
      desc: "Leveraging non-blocking async event loops (Python asyncio, Node streams) for scaling bot infrastructure to 1,600+ concurrent members.",
      icon: Cpu,
    },
    {
      title: "AWS Cloud Governance",
      desc: "Architecting cloud infrastructure around the AWS Well-Architected Framework: Security (IAM), Reliability (VPC/Multi-AZ), and Cost Optimization.",
      icon: Server,
    },
    {
      title: "Clean API Contracts",
      desc: "Designing idempotent RESTful APIs with strict validation, JWT auth, structured error boundaries, and comprehensive HTTP status codes.",
      icon: Code,
    },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-8 z-10 max-w-7xl mx-auto scroll-mt-24">
      
      {/* Section Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/90 dark:border-slate-800 text-xs font-sans font-semibold text-[#4c1d95] dark:text-purple-300">
          <GraduationCap className="w-4 h-4 text-[#7c3aed]" />
          <span>Background & Experience</span>
        </div>
        <h2 className="font-art font-normal text-4xl sm:text-6xl text-[#1e1b4b] dark:text-white">
          Engineered for <span className="text-gradient-pastel font-serif-luxury italic font-semibold">Scale & Reliability</span>
        </h2>
        <p className="text-[#334155] dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-sans font-medium">
          Combining deep computer science fundamentals with hands-on AWS cloud architecture and backend system design.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'timeline'
                ? 'bg-[#6d28d9] text-white shadow-md'
                : 'glass-panel text-[#4338ca] dark:text-slate-300 hover:text-[#1e1b4b] dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Timeline & Roles</span>
          </button>
          
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-[#6d28d9] text-white shadow-md'
                : 'glass-panel text-[#4338ca] dark:text-slate-300 hover:text-[#1e1b4b] dark:hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Systems Philosophy</span>
          </button>
        </div>
      </div>

      {/* Full Developer Bio Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/90 dark:border-slate-800 shadow-xl mb-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md max-w-4xl mx-auto">
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-purple-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-[#6d28d9] dark:text-purple-300 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1e1b4b] dark:text-white">
              Developer Profile & Foundation
            </h3>
            <p className="text-xs text-[#6d28d9] dark:text-purple-300 font-semibold">
              {FULL_BIO.degree} — {FULL_BIO.college}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-[#334155] dark:text-slate-200 font-sans leading-relaxed">
          <p className="font-display font-bold text-xl text-[#1e1b4b] dark:text-purple-200">
            {FULL_BIO.greeting}
          </p>
          {FULL_BIO.paragraphs.map((p, idx) => (
            <p key={idx} className="font-medium">
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Tab 1: Experience & Education Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          
          {/* Timeline Stack */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#7c3aed]/30 space-y-8">
            {EXPERIENCE_DATA.map((exp) => (
              <div key={exp.id} className="relative group">
                
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full bg-white border-2 border-[#6d28d9] group-hover:bg-[#6d28d9] group-hover:scale-125 transition-all shadow-[0_0_12px_#6d28d9]" />

                <MagneticCard intensity={0.7} className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/90">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-display font-bold text-xl text-[#1e1b4b]">
                        {exp.role}
                      </h4>
                      <p className="font-serif-luxury italic text-[#6d28d9] text-sm font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-xs font-sans text-[#4c1d95] bg-white/90 px-3 py-1 rounded-full border border-purple-200 w-fit font-semibold">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-[#334155] text-sm mb-4 leading-relaxed font-medium">
                    {exp.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {exp.achievements.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1e293b] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#7c3aed] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((s, i) => (
                      <span key={i} className="text-[11px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-white/80 text-[#4c1d95] border border-purple-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </MagneticCard>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Tab 2: Systems Philosophy */}
      {activeTab === 'architecture' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {architecturePrinciples.map((item, index) => {
            const Icon = item.icon;
            return (
              <MagneticCard
                key={index}
                intensity={0.8}
                className="glass-panel glass-panel-hover rounded-3xl p-7 border border-white/90"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#e0c3fc]/40 border border-[#7c3aed]/30 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#6d28d9]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#1e1b4b] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-[#334155] text-sm leading-relaxed font-sans font-medium">
                  {item.desc}
                </p>
              </MagneticCard>
            );
          })}
        </div>
      )}

    </section>
  );
};
