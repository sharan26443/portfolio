import React from 'react';
import { ArrowDownRight, Cloud, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticCard } from './MagneticCard';

interface HeroSectionProps {
  onExploreWork: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onContactClick,
}) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 sm:pt-32 lg:pt-36 pb-16 px-4 sm:px-8 overflow-hidden z-10">
      
      {/* Soft Pastel Ambient Radial Blurs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#e0c3fc]/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#ffd1ff]/20 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8">
        
        {/* Pre-Title Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-panel border border-white/10 text-xs sm:text-sm font-sans font-semibold text-purple-200 shadow-sm bg-slate-900/80">
          <Cloud className="w-4 h-4 text-[#7c3aed] animate-pulse" />
          <span className="tracking-wide">{PERSONAL_INFO.preTitle}</span>
        </div>

        {/* Stylish Calligraphy Display Title "Saravanan R A" */}
        <div className="py-2 w-full flex flex-col items-center justify-center overflow-visible">
          <h1 className="hero-title font-calligraphy text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-wide text-white flex flex-nowrap whitespace-nowrap justify-center items-center gap-3 sm:gap-6 select-none leading-relaxed py-4 px-2 overflow-visible drop-shadow-[0_15px_35px_rgba(124,58,237,0.6)]">
            {PERSONAL_INFO.fullName.split(' ').map((word, wIndex) => (
              <span
                key={wIndex}
                className="inline-block p-2 sm:p-4 overflow-visible bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:drop-shadow-[0_20px_35px_rgba(168,85,247,0.9)] cursor-pointer"
                style={{
                  animation: `letterPopUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${wIndex * 0.15}s forwards`,
                }}
              >
                {word}
              </span>
            ))}
          </h1>
          
          {/* Subheading Badge Centered Below Title */}
          <p className="mt-2 sm:mt-4 text-purple-300 font-serif-luxury text-base sm:text-lg md:text-xl max-w-2xl mx-auto tracking-widest font-semibold italic text-center">
            {PERSONAL_INFO.fullName} <span className="text-[#6d28d9] not-italic">•</span> B.Tech IT & Cloud Solutions Architect
          </p>
        </div>

        {/* Tagline */}
        <p className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-wide max-w-2xl mx-auto leading-relaxed">
          "<span className="text-gradient-pastel font-serif-luxury italic font-bold">{PERSONAL_INFO.tagline}</span>"
        </p>

        {/* Brief Bio Text */}
        <p className="text-slate-300 font-sans text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          {PERSONAL_INFO.aboutBrief}
        </p>

        {/* Call-to-Action Buttons with Magnetic Interaction */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
          <MagneticCard intensity={1.2}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                onExploreWork();
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#a855f7] text-white font-sans font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(124,58,237,0.5)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.7)]"
            >
              <span>Explore Creations</span>
              <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </a>
          </MagneticCard>

          <MagneticCard intensity={1.2}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onContactClick();
              }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass-panel border border-white/20 hover:border-purple-500 text-white font-sans font-bold text-sm tracking-wider uppercase transition-all duration-300 bg-slate-900/80 hover:bg-slate-800"
            >
              <Mail className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>Inquire & Connect</span>
            </a>
          </MagneticCard>
        </div>

        {/* Key Metrics & Achievements Bar */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <MagneticCard key={idx} intensity={0.8} className="stat-card glass-panel glass-panel-hover p-5 border border-white/10 text-center bg-slate-900/80">
              <div className="font-display font-bold text-2xl sm:text-3xl text-gradient-pastel">
                {stat.value}
              </div>
              <div className="text-xs font-sans text-purple-300 mt-1.5 uppercase tracking-widest font-bold">
                {stat.label}
              </div>
            </MagneticCard>
          ))}
        </div>

      </div>

    </section>
  );
};
