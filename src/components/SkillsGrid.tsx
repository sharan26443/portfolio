import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Skill } from '../types';
import { MagneticCard } from './MagneticCard';
import {
  Code2,
  FileCode2,
  Cpu,
  Terminal,
  Braces,
  Database,
  Cloud,
  GitBranch,
  Workflow,
  Server,
  Layers,
  ShieldCheck,
  Webhook,
  Boxes,
  HardDrive,
  DatabaseBackup,
  Sparkles,
  X,
  Atom,
  Layout,
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Atom,
  Layout,
  Code2,
  FileCode2,
  Cpu,
  Terminal,
  Braces,
  Database,
  Cloud,
  GitBranch,
  Workflow,
  Server,
  Layers,
  ShieldCheck,
  Webhook,
  Boxes,
  HardDrive,
  DatabaseBackup,
};

export const SkillsGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const categories = ['All', 'Frontend & UI', 'Languages', 'Cloud & DevOps', 'Backend', 'Databases'];

  const filteredSkills =
    selectedCategory === 'All'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-8 z-10 max-w-7xl mx-auto">
      
      {/* Background Accent Blur */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#ffd1ff]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/90 text-xs font-sans font-semibold text-[#4c1d95]">
          <Sparkles className="w-4 h-4 text-[#7c3aed]" />
          <span>Technical Expertise</span>
        </div>
        <h2 className="font-art font-normal text-4xl sm:text-6xl text-[#1e1b4b]">
          Architectural <span className="text-gradient-pastel font-serif-luxury italic font-bold">Capabilities</span>
        </h2>
        <p className="text-[#334155] max-w-2xl mx-auto text-base sm:text-lg font-sans font-medium">
          Hover cards for 3D kinetic feedback. Select any technology tile to view underlying engineering highlights.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-sans font-bold tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'bg-[#6d28d9] text-white shadow-md'
                  : 'glass-panel text-[#4338ca] hover:text-[#1e1b4b]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid with 3D Kinetic Tilt Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredSkills.map((skill) => {
          const IconComponent = ICON_MAP[skill.iconName] || Code2;

          return (
            <MagneticCard
              key={skill.name}
              intensity={0.8}
              onClick={() => setSelectedSkill(skill)}
              className="glass-panel glass-panel-hover p-5 border border-white/90 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#e0c3fc]/40 border border-[#7c3aed]/30 flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-[#6d28d9]" />
                </div>
                <span className="text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-white/90 text-[#4c1d95] border border-purple-200">
                  {skill.category}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#1e1b4b] mb-1">
                {skill.name}
              </h3>

              {/* Progress Bar */}
              <div className="space-y-1.5 mt-3">
                <div className="flex justify-between text-xs font-sans text-[#334155] font-medium">
                  <span>Proficiency</span>
                  <span className="text-[#6d28d9] font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-purple-100 rounded-full overflow-hidden border border-purple-200">
                  <div
                    className="h-full bg-gradient-to-r from-[#7c3aed] to-[#db2777] rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-[#475569] mt-3 line-clamp-2 font-sans font-medium leading-relaxed">
                {skill.highlight}
              </p>
            </MagneticCard>
          );
        })}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1b4b]/60 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white max-w-lg w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#1e1b4b] hover:bg-[#e0c3fc]/40"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-purple-200 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e0c3fc]/40 border border-[#7c3aed]/40 flex items-center justify-center">
                {React.createElement(ICON_MAP[selectedSkill.iconName] || Code2, {
                  className: 'w-6 h-6 text-[#6d28d9]',
                })}
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-[#1e1b4b]">
                  {selectedSkill.name}
                </h3>
                <span className="text-xs font-sans text-[#6d28d9] font-semibold">
                  Category: {selectedSkill.category}
                </span>
              </div>
            </div>

            <p className="text-[#334155] text-sm leading-relaxed font-sans font-medium">
              {selectedSkill.description}
            </p>

            <div className="p-4 rounded-2xl bg-white/90 border border-purple-200 space-y-2">
              <span className="text-xs font-sans text-[#6d28d9] font-bold block uppercase tracking-wider">
                ✨ Architectural Impact & Use Case
              </span>
              <p className="text-xs text-[#0f172a] font-sans font-medium">
                {selectedSkill.highlight}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-6 py-2.5 rounded-full bg-[#6d28d9] text-white font-sans text-xs font-bold hover:bg-[#5b21b6] transition-colors"
              >
                Done Inspecting
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
