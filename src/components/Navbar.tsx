import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onContactPageClick?: () => void;
  onClientAppsPageClick?: () => void;
  onPortfolioViewClick?: () => void;
  currentPage?: 'portfolio' | 'client-apps' | 'contact';
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onContactPageClick,
  onClientAppsPageClick,
  onPortfolioViewClick,
  currentPage = 'portfolio',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', page: 'portfolio' },
    { name: 'Expertise', href: '#skills', page: 'portfolio' },
    { name: 'Selected Works', href: '#projects', page: 'portfolio' },
    { name: 'Client Apps', href: '#freelance', page: 'client-apps' },
    { name: 'Inquire & Contact', href: '#contact', page: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);

    if (link.page === 'contact') {
      e.preventDefault();
      if (onContactPageClick) onContactPageClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (link.page === 'client-apps') {
      e.preventDefault();
      if (onClientAppsPageClick) onClientAppsPageClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'portfolio') {
      e.preventDefault();
      if (onPortfolioViewClick) onPortfolioViewClick();
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-[90%] max-w-7xl mx-auto transition-all duration-300">
        <div className="glass-panel rounded-full px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between shadow-2xl border border-white/10 backdrop-blur-xl bg-slate-900/80">
          
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              if (currentPage === 'contact' && onPortfolioViewClick) {
                e.preventDefault();
                onPortfolioViewClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#4338ca] to-[#7c3aed] border border-[#7c3aed]/50 flex items-center justify-center group-hover:scale-105 transition-all shadow-md">
              <Sparkles className="w-4 h-4 text-[#e0c3fc] group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="nav-brand-title font-art font-bold text-sm sm:text-base tracking-wider text-white block leading-tight">
                SARAVANAN R A
              </span>
              <span className="nav-brand-sub block text-[10px] sm:text-[11px] font-sans text-purple-300 font-semibold tracking-wide">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive =
                currentPage === 'contact'
                  ? link.page === 'contact'
                  : currentPage === 'client-apps'
                  ? link.page === 'client-apps'
                  : activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`nav-item-link text-xs font-sans tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'nav-link-active'
                      : 'px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 font-semibold'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AWS Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-xs font-sans text-purple-200 font-semibold shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7c3aed] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7c3aed]"></span>
              </span>
              <span>AWS Certified</span>
            </div>

            {/* Mobile/Tablet Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-800/90 text-white hover:bg-slate-700 transition-colors border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Nav Drawer */}
      <div className={`lg:hidden mobile-menu-popup space-y-3 ${mobileMenuOpen ? 'open' : 'closed'}`}>
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive =
              currentPage === 'contact'
                ? link.page === 'contact'
                : currentPage === 'client-apps'
                ? link.page === 'client-apps'
                : activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`px-4 py-3 rounded-2xl text-sm font-sans font-semibold transition-all flex items-center justify-between ${
                  isActive
                    ? 'bg-[#7c3aed] text-white shadow-lg'
                    : 'bg-slate-800/80 border border-white/10 text-white hover:bg-[#7c3aed]/30'
                }`}
              >
                <span className="text-white font-semibold">{link.name}</span>
                <span className="text-xs text-purple-300 font-bold">→</span>
              </a>
            );
          })}
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between px-2">
          <span className="text-xs font-semibold text-slate-300">Saravanan R A</span>
          <div className="flex items-center gap-3">
            <a href="https://github.com/sharan26443" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/saravanan-ra" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="text-slate-300 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

