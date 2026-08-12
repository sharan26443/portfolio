import React, { useEffect } from 'react';
import { FreelanceProjectsSection } from './FreelanceProjectsSection';
import { ArrowLeft, Globe, Layers, Sparkles } from 'lucide-react';
import { MagneticCard } from './MagneticCard';

interface ClientAppsPageViewProps {
  onBackToPortfolio: () => void;
}

export const ClientAppsPageView: React.FC<ClientAppsPageViewProps> = ({ onBackToPortfolio }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto z-10 animate-fadeIn">
      
      {/* Top Breadcrumb & Return CTA */}
      <div className="mb-8">
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900/80 border border-white/10 hover:border-purple-500 text-purple-200 text-xs sm:text-sm font-sans font-bold tracking-wide transition-all duration-300 shadow-md group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Main Portfolio</span>
        </button>
      </div>

      {/* Page Hero Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-panel border border-white/10 text-xs sm:text-sm font-sans font-semibold text-purple-200 shadow-sm bg-slate-900/80">
          <Globe className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Deployed Client Ecosystems</span>
        </div>

        <h1 className="font-art font-normal text-4xl sm:text-6xl text-white tracking-tight">
          Client Web <span className="text-gradient-pastel font-serif-luxury italic font-bold">Applications</span>
        </h1>

        <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg font-sans font-medium leading-relaxed">
          Production full-stack web applications deployed for European luxury hospitality resorts, Michelin dining establishments, and real estate brokerages.
        </p>
      </div>

      {/* Freelance Projects Section */}
      <FreelanceProjectsSection />

      {/* Bottom Floating Navigation Card */}
      <div className="mt-16 text-center">
        <MagneticCard intensity={0.5} className="inline-block">
          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#a855f7] text-white font-sans font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(124,58,237,0.5)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.7)] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Explore Technical Skills & Experience</span>
          </button>
        </MagneticCard>
      </div>

    </div>
  );
};
