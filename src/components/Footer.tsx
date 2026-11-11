import React from 'react';
import { Cpu, Terminal, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-500 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left side: branding & copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-1.5 text-slate-300 font-display font-black text-sm">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>DIYOR | PORTFOLIO</span>
          </div>
          <p className="text-[11px] text-slate-600 font-sans mt-1 text-center md:text-left">
            &copy; 2026 Diyor. Barcha huquqlar himoyalangan. Farg'ona, O'zbekiston.
          </p>
        </div>

        {/* Center: status and diagnostics */}
        <div className="hidden lg:flex items-center gap-6 text-[10px] text-slate-600 border-x border-slate-900 px-8">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-500" />
            <span>ENGINE: REACT 19 + VITE 6</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>LATENCY: 12ms [LOCAL_IFRAME]</span>
          </div>
        </div>

        {/* Right side: scroll to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/40 text-slate-400 hover:text-white transition-all cursor-pointer text-[10px]"
        >
          <span>TEPAGA QAYTISH</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
        </button>

      </div>
    </footer>
  );
}
