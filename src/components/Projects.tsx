import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, ShoppingBag, Radio, Code, Cpu, ExternalLink, Play, 
  Trash2, Plus, Minus, Send, RotateCcw, Award, CheckCircle2,
  Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sparkles,
  Trophy, Image as ImageIcon, Calendar
} from 'lucide-react';
import { Project, ChatMessage, ElectronicsProduct, CartItem } from '../types';
import { usePortfolio, CustomItem } from '../context/PortfolioContext';

export default function Projects() {
  const { data, t } = usePortfolio();
  
  // Active Filter: 'all' | 'Loyiha' | 'Musobaqa'
  const [filterCategory, setFilterCategory] = useState<'all' | 'Loyiha' | 'Musobaqa'>('all');
  
  // Currently selected item id
  const [selectedItemId, setSelectedItemId] = useState<string>('infinity');

  const customList = data.customProjects || [];
  
  const filteredList = customList.filter(item => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  // Selected item object
  const activeItem = customList.find(item => item.id === selectedItemId) || customList[0] || {
    id: 'infinity',
    title: data.projects.infinity.title,
    category: 'Loyiha',
    description: data.projects.infinity.description,
    details: data.projects.infinity.details,
    tech: data.projects.infinity.tech,
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=600&q=80'
  };

  // --- INFINITY VOICE ASSISTANT DEMO STATE ---
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'assistant', text: "Salom! Men 'Infinity' ovozli yordamchisiman. Menga robototexnika yoki kiberxavfsizlik haqida savol bering yoki quyidagi tugmalarni bosing!", timestamp: '03:11' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    { label: 'Arduino nima?', question: 'Arduino nima va u bilan nima qilsa bo‘ladi?' },
    { label: 'Kiberxavfsizlik', question: 'Menga 3 ta kiberxavfsizlik maslahatini ber' },
    { label: 'ESP32 vs Arduino', question: 'ESP32 mikrokontrollerining afzalligi nimada?' },
    { label: 'Infinity siri', question: 'Infinity qanday yaratilgan?' }
  ];

  const handleSendChat = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const t = text.toLowerCase();
      if (t.includes('arduino') && t.includes('nima')) {
        reply = "Arduino — bu oson dasturlanadigan ochiq kodli elektron platforma. U datchiklardan ma’lumotlarni qabul qilib, motorlar, chiroqlar va ekranlarni boshqarishga yordam beradi. Robototexnikaga kirish uchun eng zo‘r tanlov!";
      } else if (t.includes('maslahat') || t.includes('kiberxavfsizlik')) {
        reply = "Albatta, kiberxavfsizlik bo‘yicha 3 ta muhim qoida:\n1. Har bir hisobingiz uchun kuchli va takrorlanmas parollardan foydalaning (parollar menejeri tavsiya etiladi).\n2. Ikki bosqichli autentifikatsiyani (2FA) yoqing.\n3. Noma'lum manbalardan kelgan shubhali havolalarni aslo ochmang.";
      } else if (t.includes('esp32')) {
        reply = "ESP32 — bu o‘rnatilgan Wi-Fi va Bluetooth modullariga ega juda kuchli mikrokontroller. U Arduino-ga qaraganda ancha tezroq ishlaydi va IoT (Smart Home) loyihalarini yaratish uchun mukammal yechim hisoblanadi!";
      } else if (t.includes('infinity') || t.includes('siri') || t.includes('yaratilgan')) {
        reply = "Men Diyor tomonidan Python dasturlash tili, Speech Recognition (ovozni aniqlash) kutubxonasi va sun'iy intellekt API'lari yordamida yaratilganman. Menga C++ va ESP32 orqali uy chiroqlarini boshqarishni ham o'rgatgan!";
      } else {
        reply = "Ajoyib savol! Men hozircha o‘rganish jarayonidaman. Farg‘onalik Diyor meni yanada aqlliroq qilish ustida ishlamoqda. Robototexnika va kiberxavfsizlik bo‘yicha istalgan boshqa savolingizni bersangiz bo‘ladi!";
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1000);
  };

  // --- ELECTROMIR ONLINE STORE DEMO STATE ---
  const storeProducts: ElectronicsProduct[] = [
    { id: 'p1', name: 'ESP32 NodeMCU Wi-Fi DevKit', price: 65000, description: 'Dual-core processor, Wi-Fi & Bluetooth integrated.', category: 'Mikrokontroller' },
    { id: 'p2', name: 'Arduino Uno R3 (CH340)', price: 48000, description: '8-bit microcontroller, standard hobbyist development board.', category: 'Mikrokontroller' },
    { id: 'p3', name: 'Ultrasonik masofa datchigi HC-SR04', price: 15000, description: 'Masofani aniqlovchi sensor (2cm - 400cm).', category: 'Datchik' },
    { id: 'p4', name: 'Servo motor TowerPro SG90 9g', price: 18000, description: '180 daraja aylanadigan kichik harakatlantiruvchi motor.', category: 'Motorlar' }
  ];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product: ElectronicsProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setOrderPlaced(false);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    setCart([]);
  };

  // --- ROBO-FOOTBALL GAME DEMO STATE ---
  const [robotPos, setRobotPos] = useState({ x: 15, y: 50 });
  const [ballPos, setBallPos] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [goalScored, setGoalScored] = useState(false);

  const moveRobot = (dx: number, dy: number) => {
    setGoalScored(false);
    setRobotPos(prev => {
      const newX = Math.max(5, Math.min(85, prev.x + dx));
      const newY = Math.max(5, Math.min(95, prev.y + dy));

      const dist = Math.hypot(newX - ballPos.x, newY - ballPos.y);
      if (dist < 10) {
        setBallPos(bPrev => {
          let bX = bPrev.x + dx * 1.5;
          let bY = bPrev.y + dy * 1.5;

          bX = Math.max(5, Math.min(95, bX));
          bY = Math.max(5, Math.min(95, bY));

          if (bX >= 90 && bY >= 35 && bY <= 65) {
            setScore(s => s + 1);
            setGoalScored(true);
            setTimeout(() => {
              setBallPos({ x: 50, y: 50 });
              setRobotPos({ x: 15, y: 50 });
              setGoalScored(false);
            }, 1500);
          }

          return { x: bX, y: bY };
        });
      }

      return { x: newX, y: newY };
    });
  };

  const kickBall = () => {
    const dist = Math.hypot(robotPos.x - ballPos.x, robotPos.y - ballPos.y);
    if (dist < 15) {
      setGoalScored(false);
      setBallPos(prev => {
        const kX = Math.min(95, prev.x + 35);
        const kY = Math.max(5, Math.min(95, prev.y + (Math.random() * 20 - 10)));

        if (kX >= 90 && kY >= 35 && kY <= 65) {
          setScore(s => s + 1);
          setGoalScored(true);
          setTimeout(() => {
            setBallPos({ x: 50, y: 50 });
            setRobotPos({ x: 15, y: 50 });
            setGoalScored(false);
          }, 1500);
        }

        return { x: kX, y: kY };
      });
    }
  };

  const resetGame = () => {
    setRobotPos({ x: 15, y: 50 });
    setBallPos({ x: 50, y: 50 });
    setScore(0);
    setGoalScored(false);
  };

  return (
    <section
      id="projects"
      className="py-24 bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-white dark:text-white light:text-slate-900 relative border-t border-slate-900 dark:border-slate-900 light:border-slate-200 px-4 sm:px-6 lg:px-8 transition-colors"
    >
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-xs text-cyan-400 dark:text-cyan-400 light:text-cyan-600 font-mono uppercase tracking-wider shadow-sm"
          >
            <Code className="w-3.5 h-3.5" />
            {t('projectsBadge')}
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-bold tracking-tight"
          >
            {t('projectsTitle')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-lg mx-auto"
          >
            {t('projectsSub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[2px] w-12 bg-cyan-500 mx-auto glow-cyan"
          />
        </div>

        {/* Filter Category Switcher Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-8 sm:mb-10">
          {[
            { id: 'all', label: t('allTab'), icon: <Code className="w-3.5 h-3.5" /> },
            { id: 'Loyiha', label: t('projectsTab'), icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'Musobaqa', label: t('competitionsTab'), icon: <Trophy className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id as any)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 border ${
                filterCategory === tab.id
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 dark:bg-slate-900/60 light:bg-white text-slate-400 dark:text-slate-400 light:text-slate-700 border-slate-800 dark:border-slate-800 light:border-slate-300 hover:text-cyan-400'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Project Tabs Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {filteredList.map((proj) => {
            const isSelected = activeItem.id === proj.id;
            return (
              <motion.button
                key={proj.id}
                onClick={() => setSelectedItemId(proj.id)}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-slate-900 light:bg-white border-cyan-500 shadow-xl ring-2 ring-cyan-500/30'
                    : 'bg-slate-900/20 dark:bg-slate-900/20 light:bg-white/80 border-slate-900/60 dark:border-slate-900/60 light:border-slate-200 hover:border-slate-800 dark:hover:border-slate-700'
                }`}
              >
                {/* Glowing bar on top of card */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-cyan-500 glow-cyan" />
                )}

                {/* Card Image Header */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-950">
                  <img
                    src={proj.image || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Category badge */}
                  <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold uppercase backdrop-blur-md shadow ${
                    proj.category === 'Musobaqa'
                      ? 'bg-amber-500/90 text-slate-950'
                      : 'bg-cyan-500/90 text-slate-950'
                  }`}>
                    {proj.category}
                  </span>

                  {proj.date && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-white text-[8px] sm:text-[9px] font-mono border border-slate-800 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5 text-cyan-400" />
                      {proj.date}
                    </span>
                  )}
                </div>

                <div className="p-3.5 sm:p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-display font-bold text-white dark:text-white light:text-slate-900 leading-snug line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mt-1 font-sans line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-900/60 dark:border-slate-900/60 light:border-slate-200 flex flex-wrap gap-1">
                    {proj.tech.slice(0, 3).map(t => (
                      <span key={t} className="px-1.5 sm:px-2 py-0.5 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded font-mono text-[8px] sm:text-[9px] text-cyan-400 dark:text-cyan-400 light:text-cyan-700 font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Project / Competition Showcase Box */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/30 dark:bg-slate-900/30 light:bg-white backdrop-blur-md p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch overflow-hidden shadow-2xl">
          
          {/* Left panel info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 sm:p-3 bg-cyan-950/40 border border-cyan-500/20 rounded-xl text-cyan-400 flex-shrink-0">
                  {activeItem.category === 'Musobaqa' ? <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" /> : <Code className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-2xl font-display font-extrabold text-white dark:text-white light:text-slate-900 truncate">{activeItem.title}</h3>
                  <span className="text-[11px] sm:text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-cyan-600 font-bold">
                    {activeItem.category} • {activeItem.date || '2026'}
                  </span>
                </div>
              </div>

              {/* Uploaded Image display */}
              {activeItem.image && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-40 sm:h-48 w-full bg-slate-950">
                  <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
                </div>
              )}

              <p className="text-xs sm:text-sm font-sans text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                {activeItem.details || activeItem.description}
              </p>

              {/* Technologies details */}
              <div className="space-y-2 pt-2">
                <h4 className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t('techStack')}</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeItem.tech.map(t => (
                    <span key={t} className="px-2 sm:px-2.5 py-1 bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-850 dark:border-slate-850 light:border-slate-300 rounded-lg font-mono text-[10px] sm:text-xs font-bold text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 dark:border-slate-900 light:border-slate-200 flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-spin" style={{ animationDuration: '3s' }} />
              {t('interactiveSimulator')}
            </div>
          </div>

          {/* Right panel: Interactive Simulators or Image Spotlight */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 p-3.5 sm:p-5 relative min-h-[340px] flex flex-col justify-between shadow-inner">
            
            {/* 1. INFINITY SIMULATOR */}
            {activeItem.id === 'infinity' ? (
              <div className="flex flex-col h-full justify-between gap-3 sm:gap-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 animate-ping flex-shrink-0" />
                    <span className="font-mono text-[10px] sm:text-xs text-slate-400 truncate">INFINITY VOICE BOT [SIMULATOR]</span>
                  </div>
                  <button 
                    onClick={() => setChatMessages([{ id: '1', sender: 'assistant', text: "Chat tarixi tozalandi. Menga savol bering!", timestamp: 'Now' }])}
                    className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer"
                    title="Tozalash"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[200px] sm:max-h-[220px] space-y-2.5 pr-1 scrollbar-thin">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[90%] sm:max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                    >
                      <div className={`p-2.5 sm:p-3 rounded-2xl text-xs font-sans leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-cyan-500 text-slate-950 rounded-tr-none font-medium'
                          : 'bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-500 mt-0.5 font-mono">{msg.timestamp}</span>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="mr-auto flex items-center gap-1 bg-slate-900 p-2.5 rounded-full border border-slate-800">
                      <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-500 block">Tezkor savollar:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedQuestions.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => handleSendChat(s.question)}
                        className="px-2 sm:px-2.5 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[9px] sm:text-[10px] text-cyan-400 font-mono rounded-lg transition-colors cursor-pointer"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 border-t border-slate-900 pt-2.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat(chatInput)}
                    placeholder="Menga savol bering..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => handleSendChat(chatInput)}
                    className="p-2 sm:p-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl transition-all cursor-pointer flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : activeItem.id === 'electromir' ? (
              /* 2. ELECTROMIR STORE SIMULATOR */
              <div className="flex flex-col h-full justify-between gap-3 sm:gap-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                  <span className="font-mono text-[10px] sm:text-xs text-slate-400 truncate">ELECTROMIR PARTS STORE</span>
                  <div className="flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-mono flex-shrink-0">
                    <ShoppingBag className="w-3 h-3" /> Savat: {cart.reduce((sum, item) => sum + item.quantity, 0)} dona
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 flex-1 overflow-hidden min-h-[220px]">
                  <div className="md:col-span-7 space-y-2 overflow-y-auto max-h-[190px] sm:max-h-[220px] pr-1">
                    {storeProducts.map((p) => (
                      <div key={p.id} className="p-2 sm:p-2.5 rounded-lg border border-slate-900 bg-slate-900/40 flex items-center justify-between gap-2">
                        <div className="space-y-0.5 max-w-[68%]">
                          <h4 className="text-xs font-display font-bold text-slate-100 truncate">{p.name}</h4>
                          <span className="text-[10px] text-emerald-400 font-mono font-bold block">{p.price.toLocaleString('uz-UZ')} so‘m</span>
                        </div>
                        <button
                          onClick={() => addToCart(p)}
                          className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/30 text-emerald-400 rounded text-[9px] sm:text-[10px] font-mono font-bold transition-all cursor-pointer flex-shrink-0"
                        >
                          + Qo'shish
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-slate-900 pt-3 md:pt-0 pl-0 md:pl-3 flex flex-col justify-between h-full max-h-[200px] sm:max-h-[220px]">
                    <div className="space-y-1.5 overflow-y-auto max-h-[120px] sm:max-h-[140px] pr-1">
                      <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 block uppercase">Savat tarkibi:</span>
                      {orderPlaced ? (
                        <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/20 rounded-lg text-center space-y-1 my-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                          <h4 className="text-xs font-display font-bold text-white">Buyurtma berildi!</h4>
                        </div>
                      ) : cart.length === 0 ? (
                        <div className="text-center py-4 text-slate-500 text-xs">Savat bo'sh</div>
                      ) : (
                        cart.map((item) => (
                          <div key={item.product.id} className="flex items-center justify-between gap-1 border-b border-slate-900 pb-1 mb-1">
                            <span className="text-[10px] text-slate-200 truncate">{item.product.name}</span>
                            <span className="text-[10px] font-mono text-emerald-400">{item.quantity}x</span>
                          </div>
                        ))
                      )}
                    </div>

                    {!orderPlaced && cart.length > 0 && (
                      <div className="pt-2 border-t border-slate-900 space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400">Jami:</span>
                          <span className="text-emerald-400 font-bold">{calculateTotal().toLocaleString('uz-UZ')} UZS</span>
                        </div>
                        <button
                          onClick={placeOrder}
                          className="w-full py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                        >
                          Buyurtma berish
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : activeItem.id === 'robofootball' ? (
              /* 3. ROBO-FOOTBALL SIMULATOR */
              <div className="flex flex-col h-full justify-between gap-3 sm:gap-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <span className="font-mono text-[10px] sm:text-xs text-slate-400 truncate">ROBO-FOOTBALL GAME</span>
                  <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 font-bold">
                    <span>GOL: {score}</span>
                    <button onClick={resetGame} className="p-1 text-slate-500 hover:text-white cursor-pointer" title="Qaytadan">
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative flex-1 bg-emerald-950/30 border border-slate-900 rounded-xl h-[160px] sm:h-[180px] overflow-hidden">
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/10" />
                  <div className="absolute inset-y-[30%] right-0 w-6 border-y border-l border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center font-display font-extrabold text-[10px] text-cyan-400">GOAL</div>

                  <AnimatePresence>
                    {goalScored && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="absolute inset-0 bg-slate-950/80 z-20 flex flex-col items-center justify-center text-amber-400"
                      >
                        <h3 className="text-xl sm:text-2xl font-black uppercase">GOOOL!!!</h3>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="absolute z-10 w-7 sm:w-8 h-7 sm:h-8 -ml-3.5 -mt-3.5 rounded-lg bg-cyan-500 border border-white/40 flex items-center justify-center shadow-lg"
                    style={{ left: `${robotPos.x}%`, top: `${robotPos.y}%` }}
                  >
                    <span className="text-[7px] font-mono font-bold text-white uppercase">D1</span>
                  </motion.div>

                  <motion.div
                    className="absolute z-10 w-4 sm:w-5 h-4 sm:h-5 -ml-2 -mt-2 rounded-full bg-white border border-slate-950 flex items-center justify-center"
                    style={{ left: `${ballPos.x}%`, top: `${ballPos.y}%` }}
                  />
                </div>

                <div className="flex items-center justify-between border-t border-slate-900 pt-2.5">
                  <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400">READY</span>
                  <div className="flex gap-2">
                    <button onClick={() => moveRobot(-10, 0)} className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg cursor-pointer"><ArrowLeft className="w-4 h-4" /></button>
                    <button onClick={kickBall} className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black rounded-lg uppercase cursor-pointer">TEP!</button>
                    <button onClick={() => moveRobot(10, 0)} className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg cursor-pointer"><ArrowRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ) : (
              /* DEFAULT HIGH TECH DISPLAY SHOWCASE FOR CUSTOM ITEMS */
              <div className="flex flex-col h-full justify-between space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono text-xs text-cyan-400 uppercase">
                    [ HIGHLIGHT SHOWCASE ]
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                    VERIFIED PROJECT
                  </span>
                </div>

                <div className="flex-1 relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                  <img
                    src={activeItem.image || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                    <h4 className="text-lg font-display font-extrabold text-white">{activeItem.title}</h4>
                    <p className="text-xs text-slate-300 font-sans line-clamp-2">{activeItem.description}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Toifa: {activeItem.category}</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">CAU Tech Hack & Diyor Portfolio</span>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
