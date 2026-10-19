import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onRequestQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onRequestQuote,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.diagnostic, href: '#diagnostic' },
    { label: t.nav.about, href: '#why-us' },
    { label: t.nav.insights, href: '#insights' },
    { label: t.nav.contact, href: '#consultation' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090D14]/90 backdrop-blur-md border-b border-[rgba(120,170,200,0.18)] py-3 shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            aria-label="audit.az home"
          >
            <span className="w-8 h-8 rounded-lg bg-[#131B26] border border-[#D4AF37]/40 flex items-center justify-center transition-colors group-hover:border-[#F4D36B]">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-[#D4AF37]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span className="font-editorial text-2xl tracking-tight text-[#F5F7FA]">
              audit<span className="text-[#D4AF37] font-sans font-semibold text-lg">.az</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links (clean single-line text links) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#9BAABD]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#F5F7FA] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D4AF37]/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Language Selector & Primary CTA */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center p-0.5 rounded-lg bg-[#131B26] border border-[rgba(120,170,200,0.18)]">
              {(['az', 'en', 'ru'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                    currentLang === lang
                      ? 'bg-[#D4AF37] text-[#090D14] font-semibold shadow-sm'
                      : 'text-[#9BAABD] hover:text-[#F5F7FA]'
                  }`}
                  aria-label={`Switch to ${lang.toUpperCase()}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onRequestQuote}
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F4D36B] bg-[#131B26] border border-[#D4AF37]/60 rounded-lg hover:bg-[#D4AF37]/15 hover:border-[#F4D36B] transition-all duration-200 shadow-sm shadow-[#D4AF37]/10 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <span>{t.nav.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <div className="flex items-center p-0.5 rounded-md bg-[#131B26] border border-[rgba(120,170,200,0.18)] mr-1">
              {(['az', 'en', 'ru'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
                    currentLang === lang ? 'bg-[#D4AF37] text-[#090D14] font-bold' : 'text-[#9BAABD]'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#131B26] border border-[rgba(120,170,200,0.2)] text-[#F5F7FA] hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[rgba(120,170,200,0.2)] bg-[#0C131D] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#9BAABD] hover:text-[#D4AF37] py-2 border-b border-[rgba(120,170,200,0.08)]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#090D14] bg-[#D4AF37] rounded-lg hover:bg-[#F4D36B] transition-colors"
              >
                <span>{t.nav.cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
