import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  UploadCloud, 
  Cpu, 
  Zap, 
  AlertCircle, 
  FileImage, 
  CornerDownRight, 
  Bot,
  RefreshCw,
  Search,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function CyberVision() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Example Presets for quick trial
  const presets = [
    {
      name: 'ESP32 DevKit',
      url: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=400&q=80',
      mimeType: 'image/jpeg',
      description: 'ESP32 mikrokontroller platasi va simsiz modullar'
    },
    {
      name: 'Arduino Smart Car',
      url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=400&q=80',
      mimeType: 'image/jpeg',
      description: 'Dvigatellar va g‘ildirakli Arduino platformasi'
    },
    {
      name: 'Datchiklar & Simlar',
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
      mimeType: 'image/jpeg',
      description: 'Elektronika laboratoriyasi datchiklari va sxemalari'
    }
  ];

  // Load preset image as base64
  const handleSelectPreset = async (url: string, type: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setMimeType(type);
        setLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      setError("Preset rasmini yuklashda xatolik yuz berdi.");
      setLoading(false);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Iltimos, faqat rasm fayllarini yuklang (JPEG, PNG, WebP).');
      return;
    }
    
    setError(null);
    setResult(null);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.onerror = () => {
      setError('Rasmni o‘qishda xatolik yuz berdi.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image,
          mimeType,
          prompt: prompt.trim() || undefined
        })
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error || 'Rasm tahlilida xatolik yuz berdi.');
      }
    } catch (err: any) {
      setError('Server bilan bog‘lanishda xatolik yuz berdi: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setImage(null);
    setMimeType('');
    setResult(null);
    setError(null);
    setPrompt('');
  };

  return (
    <section id="cybervision" className="py-24 bg-[#050508] text-white relative border-t border-slate-900 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Cool glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono uppercase tracking-widest"
          >
            <Eye className="w-3.5 h-3.5 animate-pulse" />
            CYBER-VISION AI
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white"
          >
            AI Texnik Rasm Tahlilchisi
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Istalgan elektronika sxemasi, mikrokontroller, sensor yoki robot rasmini yuklang yoki quyidagi presetlardan tanlang. 
            Gemini AI ularning tarkibiy qismlarini aniqlab, ishlash mantiqini tushuntirib beradi.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-[2px] w-12 bg-emerald-500 mx-auto glow-emerald"
          />
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image scanner & upload */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-850 bg-slate-900/10 backdrop-blur-md p-5 sm:p-6 space-y-6 glow-emerald">
              
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">SCANNER_INPUT_MODULE</span>
                </div>
                {image && (
                  <button 
                    onClick={resetScanner}
                    className="text-[10px] font-mono text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                  >
                    RESET_SCANNER
                  </button>
                )}
              </div>

              {!image ? (
                /* Drag Drop Upload Container */
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer overflow-hidden group ${
                    isDragActive 
                      ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10' 
                      : 'border-slate-800 hover:border-emerald-500/50 hover:bg-slate-950/40'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInputChange}
                  />

                  {/* Cyber Grid pattern inside upload area */}
                  <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                  <div className="p-4 rounded-full bg-slate-950 border border-slate-900 text-slate-500 group-hover:text-emerald-400 group-hover:border-emerald-500/20 group-hover:shadow-lg group-hover:shadow-emerald-500/10 transition-all mb-4 relative z-10">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  
                  <span className="text-xs font-display font-bold text-slate-200 relative z-10">
                    Rasmni tortib tashlang yoki bosing
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 relative z-10">
                    Maksimal o‘lcham: 10MB (PNG, JPG, WEBP)
                  </span>
                </div>
              ) : (
                /* Active Image View with cyber overlays */
                <div className="relative rounded-xl border border-slate-900 bg-slate-950 overflow-hidden flex items-center justify-center min-h-64 group">
                  <img 
                    src={image} 
                    alt="Scan target" 
                    className="max-h-80 w-auto object-contain rounded-lg p-2"
                  />
                  
                  {/* Cyber scanning visual effects */}
                  {loading && (
                    <>
                      <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px]" />
                      
                      {/* Scanning laser line */}
                      <motion.div 
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.8)] z-20 pointer-events-none"
                      />

                      {/* Sci-fi Scanning overlay text */}
                      <div className="absolute flex flex-col items-center gap-2 text-emerald-400 font-mono text-xs z-30 font-bold bg-slate-950/80 px-4 py-2.5 rounded-lg border border-emerald-500/30 shadow-lg animate-pulse">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>ANALYZING_HARDWARE_TARGET...</span>
                      </div>
                    </>
                  )}

                  {/* Ready Indicator */}
                  {!loading && !result && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-emerald-500 text-slate-950 text-[9px] font-mono font-black uppercase rounded tracking-wider shadow-md">
                      SCAN_TARGET_LOADED
                    </div>
                  )}
                </div>
              )}

              {/* Presets and helper */}
              {!image && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    <CornerDownRight className="w-3 h-3 text-emerald-500" />
                    Sinab ko‘rish uchun tayyor namunalar:
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {presets.map((preset, idx) => (
                      <button
                        key={idx}
                        disabled={loading}
                        onClick={() => handleSelectPreset(preset.url, preset.mimeType)}
                        className="flex flex-col items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-slate-950/60 border border-slate-900 rounded-lg hover:border-emerald-500/30 transition-all text-left cursor-pointer group hover:bg-slate-950/90"
                      >
                        <img 
                          src={preset.url} 
                          alt={preset.name} 
                          className="h-9 sm:h-10 w-full object-cover rounded border border-slate-900 group-hover:scale-105 transition-transform" 
                        />
                        <span className="text-[8px] sm:text-[9px] font-display font-extrabold text-slate-400 group-hover:text-emerald-400 truncate w-full text-center">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom prompt input field */}
              {image && (
                <div className="space-y-2.5 animate-fadeIn">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> Qo‘shimcha savol (ixtiyoriy)
                  </label>
                  <input
                    type="text"
                    disabled={loading}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Masalan: Ushbu datchik qanday ishlaydi?"
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  
                  {/* Analysis Trigger Button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={loading || !image}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-display font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        TAHLIL QILINMOQDA...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-current" />
                        RASMNI TAHLIL QILISH [AI]
                      </>
                    )}
                  </button>
                </div>
              )}

              {error && (
                <div className="p-3.5 bg-rose-950/20 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2 font-sans animate-shake">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: AI Analysis terminal result */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-850 bg-slate-900/10 backdrop-blur-md overflow-hidden glow-emerald flex flex-col min-h-80 lg:min-h-[430px]">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-900 bg-slate-950/60">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">AI_SCANNER_CONSOLE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                </div>
              </div>

              {/* Terminal Body */}
              <div className="flex-1 p-6 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {loading && !result ? (
                    /* Loading terminal state */
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 font-mono text-emerald-400/80 text-xs"
                    >
                      <p className="animate-pulse">SYS_INIT: Bo‘g‘lanish o‘rnatildi...</p>
                      <p className="animate-pulse" style={{ animationDelay: '0.2s' }}>SYS_DATA: Tasvir tahlilga jo‘natildi (Gemini-3.5-Flash)...</p>
                      <p className="animate-pulse" style={{ animationDelay: '0.4s' }}>SYS_PROCESS: Robototexnika va IoT me’yorlari yuklanmoqda...</p>
                      <div className="pt-4 flex items-center gap-2 text-slate-500">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Kuting, sun'iy intellekt rasm elementlarini o'rganmoqda...</span>
                      </div>
                    </motion.div>
                  ) : result ? (
                    /* Actual markdown-ish render */
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 whitespace-pre-line text-slate-300"
                    >
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold mb-4">
                        <CheckCircle className="w-4 h-4" />
                        <span>TAHLIL MUVAFFAQIYATLI YAKUNLANDI (SYS_OK)</span>
                      </div>
                      
                      {/* Split text into formatted paragraphs/bullet points for easier reading */}
                      <p className="font-sans leading-relaxed tracking-wide text-slate-200">
                        {result}
                      </p>
                    </motion.div>
                  ) : (
                    /* Idle terminal state */
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-3 py-12"
                    >
                      <div className="p-4 rounded-full bg-slate-900 border border-slate-850">
                        <Search className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">AWAITING_INPUT_TARGET</p>
                        <p className="text-xs text-slate-400 font-sans max-w-sm">
                          Tizim ishlashi uchun chap tarafdan rasm yuklang va "Rasmni tahlil qilish" tugmasini bosing.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
