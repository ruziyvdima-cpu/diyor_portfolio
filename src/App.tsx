import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import CyberVision from './components/CyberVision';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AiAssistant from './components/AiAssistant';
import { usePortfolio } from './context/PortfolioContext';
import { Settings, Cpu, Terminal, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const { setAdminOpen, isLoggedIn } = usePortfolio();
  
  // Welcome preloader animation state
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLog, setLoadingLog] = useState('SYSTEM_INIT');

  useEffect(() => {
    // Scroll tracking
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'cybervision', 'contact'];
      const scrollPosition = window.scrollY + 160; // Offset for header trigger

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preloader interval simulator
  useEffect(() => {
    const logs = [
      'SYS_INIT: Booting Cybernetic Portfolio Core...',
      'HARDWARE: Connecting Arduino & ESP32 interfaces...',
      'AI_CORE: Synchronizing with Gemini AI Assistant...',
      'SECURITY: Verification passed...',
      'GRAPHICS: Allocating hardware-accelerated nodes...',
      'COMPILING: Rendering futuristic display matrices...',
      'SUCCESS: Portfolio is ready. Enjoy your visit!'
    ];

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        
        // Update logs based on progress
        const logIndex = Math.min(Math.floor((next / 100) * logs.length), logs.length - 1);
        setLoadingLog(logs[logIndex]);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 600); // Small buffer for visual pleasure
          return 100;
        }
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-white dark:text-white light:text-slate-900 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200 transition-colors">
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* Futurist Preloader Welcome Screen */
          <motion.div
            key="preloader"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#030306] z-[200] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
          >
            {/* Ambient cyber matrix glow in background */}
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />

            <div className="relative max-w-md w-full space-y-8 z-10">
              
              {/* Spinning futuristic emblem */}
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-0 border border-emerald-500/20 border-dashed rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute inset-2 border-2 border-emerald-500/40 border-dotted rounded-full"
                />
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400">
                  <Cpu className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              {/* Loader typography */}
              <div className="space-y-2">
                <h1 className="text-2xl font-display font-black tracking-widest text-white uppercase flex items-center justify-center gap-2">
                  DIYOR <span className="text-emerald-400 font-mono text-lg font-normal">[V3.0]</span>
                </h1>
                <p className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase">
                  ROBOTICS & WEB ENGINEERING DECK
                </p>
              </div>

              {/* Progress bar container */}
              <div className="space-y-3">
                <div className="h-[2px] w-full bg-slate-900 border border-slate-900 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    style={{ width: `${loadingProgress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
                
                <div className="flex items-center justify-between font-mono text-[9px] text-slate-500">
                  <span className="uppercase">DECK_BOOT_SEQUENCE</span>
                  <span className="text-emerald-400 font-bold">{loadingProgress}%</span>
                </div>
              </div>

              {/* Detailed retro diagnostic logs */}
              <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl font-mono text-[10px] text-left text-slate-400 min-h-[48px] flex items-start gap-2 max-w-sm mx-auto shadow-inner">
                <Terminal className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-emerald-400/80 leading-relaxed truncate">{loadingLog}</span>
              </div>

            </div>
          </motion.div>
        ) : (
          /* Main Portfolio Entrance with elegant slide + fade animation */
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Dynamic Header navbar */}
            <Header activeSection={activeSection} />

            {/* Main sections */}
            <main>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <CyberVision />
              <Contact />
            </main>

            {/* Floating Control Deck Trigger */}
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-3">
              <button
                onClick={() => setAdminOpen(true)}
                className={`p-3 sm:p-3.5 rounded-full border transition-all duration-300 shadow-lg cursor-pointer group flex items-center justify-center relative ${
                  isLoggedIn 
                    ? 'bg-emerald-950/90 border-emerald-500 text-emerald-400 hover:bg-emerald-900 shadow-emerald-500/20' 
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-850 shadow-black/50'
                }`}
                title="CyberDeck Control Panel"
                aria-label="Control Panel"
              >
                <span className={`absolute inset-0 rounded-full border border-dashed animate-spin ${isLoggedIn ? 'border-emerald-500/40' : 'border-slate-800/40 group-hover:border-emerald-500/30'}`} style={{ animationDuration: '8s' }} />
                
                <Settings className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${isLoggedIn ? 'animate-spin' : 'group-hover:rotate-45'} transition-transform duration-500`} style={{ animationDuration: isLoggedIn ? '6s' : '0.5s' }} />
                
                <span className={`absolute top-0 right-0 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border border-slate-950 ${isLoggedIn ? 'bg-emerald-400 animate-pulse' : 'bg-amber-500'}`} />
              </button>
            </div>

            {/* AI Assistant Chatbot */}
            <AiAssistant />

            {/* Admin Panel Modal Overlay */}
            <AdminPanel />

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
