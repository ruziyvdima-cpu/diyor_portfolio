import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Shield, Terminal, ArrowDown, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { data, t } = usePortfolio();
  const [typedText, setTypedText] = useState('');
  const [phase, setPhase] = useState(0); // 0: typing, 1: pausing, 2: deleting
  const [index, setIndex] = useState(0);

  const words = data.personalInfo.typingTexts.length > 0 
    ? data.personalInfo.typingTexts 
    : [
        'Robotics Enthusiast',
        'Cybersecurity Enthusiast',
        'Web Developer',
        '9th Grade Student'
      ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[index] || '';

    if (phase === 0) {
      // Typing
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        if (typedText === currentWord) {
          setPhase(1); // switch to pause
        }
      }, 70);
    } else if (phase === 1) {
      // Pause
      timer = setTimeout(() => {
        setPhase(2); // switch to delete
      }, 2000);
    } else {
      // Deleting
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        if (typedText === '') {
          setPhase(0);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }, 40);
    }

    return () => clearTimeout(timer);
  }, [typedText, phase, index, words]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 pb-16 overflow-hidden bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-white dark:text-white light:text-slate-900 px-4 sm:px-6 lg:px-8 transition-colors"
    >
      {/* Background Decorative Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Cyberpunk Grid Background */}
        <div 
          className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:4rem_4rem]"
          style={{ maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)' }}
        />

        {/* Ambient colored glowing blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse duration-5000" />
        <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/5 rounded-full blur-[120px] animate-pulse duration-7000" />
        <div className="absolute top-1/2 left-2/3 w-64 sm:w-80 h-64 sm:h-80 bg-emerald-500/10 rounded-full blur-[110px] animate-pulse duration-4000" />
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left column: Bio & Call to action */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-[10px] sm:text-xs text-emerald-400 font-mono shadow-sm max-w-full"
          >
            <span className="flex h-2 w-2 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="truncate">SYSTEM_ONLINE: FARG'ONA, UZBEKISTAN</span>
          </motion.div>

          {/* Main Title */}
          <div className="space-y-3 sm:space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.15] text-white dark:text-white light:text-slate-900 break-words"
            >
              Assalomu alaykum, <br />
              men <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 font-black">{data.personalInfo.greeting}</span>
            </motion.h1>

            {/* Subtitle / Animated Typing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="min-h-[2.5rem] py-1 text-base sm:text-xl md:text-2xl font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium flex items-center justify-center lg:justify-start flex-wrap"
            >
              <span className="text-emerald-400 mr-2">&gt;</span>
              <span className="break-words">{typedText}</span>
              <span className="w-2 sm:w-2.5 h-5 sm:h-6 ml-1 bg-emerald-400 inline-block animate-pulse flex-shrink-0" />
            </motion.div>
          </div>

          {/* Intro Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed"
          >
            {data.personalInfo.bioParagraph1}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-display font-black tracking-wide rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer text-center text-xs uppercase"
            >
              {t('viewProjects')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-slate-900 dark:bg-slate-900 light:bg-white hover:bg-slate-850 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 border border-emerald-500/30 hover:border-emerald-400 rounded-xl font-mono text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer text-center uppercase shadow-sm"
            >
              {t('contactBtn')}
            </button>
          </motion.div>
        </div>

        {/* Right column: High-Tech Profile Photo & Terminal Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="lg:col-span-5 w-full max-w-xs sm:max-w-sm mx-auto mt-4 lg:mt-0"
        >
          <div className="relative rounded-2xl border border-slate-850 dark:border-slate-850 light:border-slate-300 bg-slate-900/20 dark:bg-slate-900/20 light:bg-white backdrop-blur-xl p-3.5 sm:p-4 shadow-2xl overflow-hidden">
            {/* Glossy highlight line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500" />

            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between mb-3.5 border-b border-slate-900 dark:border-slate-900 light:border-slate-200 pb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 truncate">
                <Terminal className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{data.personalInfo.name.toLowerCase()}@profile: ~</span>
              </div>
            </div>

            {/* Profile Photo with high-tech overlays */}
            <div className="relative rounded-xl overflow-hidden aspect-[3/4] mb-3.5 border border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-950/80 group">
              <img
                src={data.personalInfo.profileImage || "/src/assets/images/diyor_profile_1784196116098.jpg"}
                alt={data.personalInfo.name}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              {/* Floating tech badges on the photo */}
              <div className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-sm border border-emerald-500/30 px-1.5 sm:px-2 py-0.5 rounded font-mono text-[8px] sm:text-[9px] text-emerald-400 uppercase tracking-wider">
                ROBOTICS_DEV
              </div>
              
              <div className="absolute top-2.5 right-2.5 bg-slate-950/85 backdrop-blur-sm border border-emerald-400/30 px-1.5 sm:px-2 py-0.5 rounded font-mono text-[8px] sm:text-[9px] text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                ONLINE
              </div>

              {/* Bottom tag overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-950/85 backdrop-blur-sm border border-slate-900 p-2 rounded-lg font-mono text-[8px] sm:text-[9px] text-slate-300 flex justify-between items-center">
                <span className="truncate mr-1">MODEL: {data.personalInfo.name.toUpperCase()}_V2.0</span>
                <span className="text-emerald-400 flex-shrink-0">LOC: FARG'ONA</span>
              </div>
            </div>

            {/* Microcontroller details overlay */}
            <div className="space-y-2 font-mono text-[10px] sm:text-[11px]">
              <div className="flex items-center justify-between text-slate-400 dark:text-slate-400 light:text-slate-600 border-b border-slate-900 dark:border-slate-900 light:border-slate-200 pb-1.5">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" /> CORE_CHIP:
                </span>
                <span className="text-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold">ESP32 & ARDUINO</span>
              </div>
              
              <div className="flex items-center justify-between text-slate-400 dark:text-slate-400 light:text-slate-600 border-b border-slate-900 dark:border-slate-900 light:border-slate-200 pb-1.5">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> CYBER_STATUS:
                </span>
                <span className="text-emerald-400 font-semibold">SECURE_INTEGRATED</span>
              </div>

              <div className="flex items-center justify-between text-slate-400 dark:text-slate-400 light:text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" /> INF_ASSISTANT:
                </span>
                <span className="text-emerald-400 font-semibold truncate ml-1">{data.projects.infinity.title}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Arrow down anchor */}
      <div 
        className="mt-8 lg:mt-0 lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer z-10" 
        onClick={() => scrollToSection('about')}
      >
        <span className="font-mono text-[9px] uppercase tracking-widest">{t('about')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
        </motion.div>
      </div>
    </section>
  );
}
