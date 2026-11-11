import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Menu, X, Terminal, Settings, Sun, Moon, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Language } from '../lib/translations';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { data, setAdminOpen, theme, toggleTheme, language, setLanguage, t } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', name: t('home') },
    { id: 'about', name: t('about') },
    { id: 'projects', name: t('projects') },
    { id: 'skills', name: t('skills') },
    { id: 'cybervision', name: t('cybervision') },
    { id: 'contact', name: t('contact') },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'uz', label: 'UZ' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/90 dark:bg-slate-950/90 light:bg-white/90 backdrop-blur-md border-b border-slate-900/80 dark:border-slate-900/80 light:border-slate-200/80 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll progress bar top indicator */}
      <div 
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            {/* Custom Monogram Logo */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-950 dark:bg-slate-950 light:bg-slate-900 border border-emerald-500/30 group-hover:border-emerald-400 transition-all shadow-lg shadow-emerald-500/5 overflow-hidden">
              <div className="absolute inset-0.5 border border-dashed border-emerald-500/20 rounded-lg animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75" />
              <div className="absolute w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs font-mono font-black text-white relative z-10">R7</span>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-white dark:text-white light:text-slate-900 font-display font-black tracking-wider text-sm sm:text-base leading-tight group-hover:text-emerald-400 transition-colors truncate max-w-[135px] sm:max-w-none">
                {data.personalInfo.name.toUpperCase()}.S7
              </span>
              <span className="text-emerald-500 dark:text-emerald-400 light:text-emerald-600 font-mono text-[8px] sm:text-[9px] tracking-widest uppercase">
                ROBOTICS & WEB
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 font-sans text-xs lg:text-sm font-medium transition-colors ${
                  activeSection === item.id 
                    ? 'text-emerald-500 dark:text-emerald-400 light:text-emerald-600 font-bold' 
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-emerald-400 dark:hover:text-white light:hover:text-slate-900'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-emerald-400 glow-emerald"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Language Switcher */}
            <div className="ml-2 flex items-center bg-slate-900 dark:bg-slate-900 light:bg-slate-100 p-1 rounded-lg border border-slate-800 dark:border-slate-800 light:border-slate-300">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg bg-slate-900 dark:bg-slate-900 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-emerald-400 transition-colors cursor-pointer"
              title={theme === 'dark' ? "Light mode ga o'tish" : "Dark mode ga o'tish"}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Control panel launcher */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setAdminOpen(true)}
              className="ml-3 px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 hover:from-emerald-500/20 hover:to-cyan-500/20 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
              CONTROL_PANEL();
            </motion.button>
          </nav>

          {/* Mobile menu controls */}
          <div className="md:hidden flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 dark:border-slate-800 light:border-slate-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 text-slate-400 hover:text-white border border-slate-800 dark:border-slate-800 light:border-slate-300 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/98 dark:bg-slate-950/98 light:bg-white/98 backdrop-blur-2xl border-b border-slate-900 dark:border-slate-900 light:border-slate-200 px-4 pt-3 pb-6 space-y-2 max-h-[calc(100vh-4.5rem)] overflow-y-auto shadow-2xl"
          >
            {/* Language switcher mobile */}
            <div className="flex items-center justify-between py-2.5 border-b border-slate-900 dark:border-slate-900 light:border-slate-200 mb-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" /> Til / Language:
              </span>
              <div className="flex gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                      language === lang.code
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-900 dark:bg-slate-900 light:bg-slate-100 text-slate-400 border border-slate-800 dark:border-slate-800 light:border-slate-300'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-400 font-bold'
                      : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-900/40 dark:hover:bg-slate-900/40 light:hover:bg-slate-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="pt-3 space-y-2 border-t border-slate-900 dark:border-slate-900 light:border-slate-200">
              <button
                onClick={() => { setIsOpen(false); setAdminOpen(true); }}
                className="w-full py-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 text-emerald-400 rounded-xl font-mono text-xs font-bold tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Settings className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                CONTROL_PANEL();
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
