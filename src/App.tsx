import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { InteractiveBlobs } from './components/InteractiveBlobs';
import { CustomCursor } from './components/CustomCursor';
import { DOMMagneticPhysics } from './components/DOMMagneticPhysics';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsGrid } from './components/SkillsGrid';
import { ProjectsSection } from './components/ProjectsSection';
import { ClientAppsPageView } from './components/ClientAppsPageView';
import { ContactPageView } from './components/ContactPageView';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentPage, setCurrentPage] = useState<'portfolio' | 'client-apps' | 'contact'>('portfolio');

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Track Active Section on Scroll
  useEffect(() => {
    if (currentPage !== 'portfolio') return;

    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'freelance', 'contact'];
      const scrollPos = window.scrollY + 300;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const scrollToProjects = () => {
    setCurrentPage('portfolio');
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToContact = () => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#0a0f1d] text-[#1a1926] dark:text-[#f8fafc] font-sans selection:bg-[#e0c3fc] selection:text-[#1a1926] pt-0 pb-[6.5rem] lg:pb-0 transition-colors duration-300">
      
      {/* Interactive Frosted Glassmorphism with Floating Pastel Gradient Blobs */}
      <InteractiveBlobs />

      {/* DOM Magnetic Physics Controller */}
      <DOMMagneticPhysics />

      {/* Custom Pointer Cursor with Pastel Glow Ring */}
      <CustomCursor />

      {/* Glassmorphic Navbar */}
      <Navbar
        activeSection={activeSection}
        currentPage={currentPage}
        onContactPageClick={() => {
          setCurrentPage('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onClientAppsPageClick={() => {
          setCurrentPage('client-apps');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onPortfolioViewClick={() => {
          setCurrentPage('portfolio');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content View Switcher */}
      {currentPage === 'portfolio' ? (
        <main className="relative z-10">
          <HeroSection
            onExploreWork={scrollToProjects}
            onContactClick={scrollToContact}
          />

          <AboutSection />

          <SkillsGrid />

          <ProjectsSection />
        </main>
      ) : currentPage === 'client-apps' ? (
        <ClientAppsPageView onBackToPortfolio={() => setCurrentPage('portfolio')} />
      ) : (
        <ContactPageView onBackToPortfolio={() => setCurrentPage('portfolio')} />
      )}

      {/* Minimalist Pastel Footer */}
      <Footer />

    </div>
  );
}


