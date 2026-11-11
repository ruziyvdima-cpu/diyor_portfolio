import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RefreshCcw, 
  MessageSquareText, 
  Minimize2, 
  HelpCircle,
  User,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function AiAssistant() {
  const { data, language, t } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: t('aiGreeting'),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    t('aiQuick1'),
    t('aiQuick2'),
    t('aiQuick3'),
    t('aiQuick4')
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          contextData: data,
          language
        })
      });

      const resData = await response.json();
      if (response.ok && resData.reply) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: resData.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "Kechirasiz, javob olishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "Server bilan aloqada xatolik bo'ldi.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'assistant',
        text: t('aiGreeting'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
      {/* Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative p-3 sm:p-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 shadow-2xl shadow-emerald-500/30 cursor-pointer flex items-center justify-center border border-white/20"
        title={t('aiTitle')}
        aria-label="Open AI Assistant"
      >
        {/* Pulsing rings */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
        
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] animate-bounce" />
            <span className="hidden sm:inline font-display font-black text-xs uppercase tracking-wider pr-1">
              AI ASSISTANT
            </span>
          </div>
        )}

        {/* Live status badge */}
        <span className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
      </motion.button>

      {/* Chatbot Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-x-3 bottom-20 sm:inset-auto sm:absolute sm:bottom-16 sm:left-0 w-auto sm:w-[380px] h-[480px] sm:h-[520px] max-h-[75vh] sm:max-h-[80vh] rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/98 dark:bg-slate-950/98 light:bg-white/98 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200 dark:text-slate-200 light:text-slate-800 z-50"
          >
            {/* Window Header */}
            <div className="p-4 bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-display font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-1.5">
                    {t('aiTitle')}
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold">
                      GEMINI AI
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans">{t('aiSubtitle')}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-1.5 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
                  title="Tozalash"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs scrollbar-thin bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 max-w-[88%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-full flex-shrink-0 text-slate-950 ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500'
                        : 'bg-emerald-500'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-cyan-500 text-slate-950 rounded-tr-none font-medium'
                          : 'bg-slate-900 dark:bg-slate-900 light:bg-white text-slate-200 dark:text-slate-200 light:text-slate-800 rounded-tl-none border border-slate-800 dark:border-slate-800 light:border-slate-200 shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono mt-1 block px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 mr-auto bg-slate-900 dark:bg-slate-900 light:bg-white p-3 rounded-2xl rounded-tl-none border border-slate-800 max-w-[80%]">
                  <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span className="text-xs text-emerald-400 font-mono animate-pulse">
                    AI javob tayyorlamoqda...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Suggestions */}
            <div className="p-2.5 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border-t border-slate-850 dark:border-slate-850 light:border-slate-200">
              <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 mb-1.5">
                <HelpCircle className="w-3 h-3 text-emerald-400" />
                <span>Tezkor savollar:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    disabled={loading}
                    onClick={() => handleSend(q)}
                    className="px-2 py-1 bg-slate-950 dark:bg-slate-950 light:bg-white hover:border-emerald-500/50 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-lg text-[10px] font-sans text-slate-300 dark:text-slate-300 light:text-slate-700 transition-all cursor-pointer truncate max-w-[170px]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="p-3 bg-slate-900 dark:bg-slate-900 light:bg-white border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex gap-2">
              <input
                type="text"
                disabled={loading}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('aiPlaceholder')}
                className="flex-1 bg-slate-950 dark:bg-slate-950 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl px-3 py-2 text-xs text-white dark:text-white light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                disabled={loading || !input.trim()}
                onClick={() => handleSend()}
                className="p-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
