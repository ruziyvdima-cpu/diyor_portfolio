import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Mail, MapPin, CheckCircle, AlertCircle, 
  Github, Instagram, Send as TelegramIcon, Phone, Terminal, Compass, Globe
} from 'lucide-react';
import { ContactForm } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const { data, t } = usePortfolio();
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMessage("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }
    if (!validateEmail(form.email)) {
      setStatus('error');
      setErrorMessage("Yaroqli elektron pochta manzilini kiriting.");
      return;
    }

    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-white dark:text-white light:text-slate-900 relative border-t border-slate-900 dark:border-slate-900 light:border-slate-200 px-4 sm:px-6 lg:px-8 transition-colors"
    >
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-xs text-emerald-400 font-mono uppercase tracking-wider shadow-sm"
          >
            <Compass className="w-3.5 h-3.5" />
            ALOQA VA GEOLOKATSIYA
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white dark:text-white light:text-slate-900"
          >
            {t('contactTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-md mx-auto"
          >
            {t('contactSub')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[2px] w-12 bg-emerald-500 mx-auto glow-emerald"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Location Map & Contact info card */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-white dark:text-white light:text-slate-900">Geolokatsiya va Tarmoqlar</h3>
            
            {/* Custom Cyberpunk Radar Location Screen of Farg'ona */}
            <div className="relative rounded-2xl border border-slate-850 dark:border-slate-850 light:border-slate-200 bg-slate-900/10 dark:bg-slate-900/10 light:bg-white backdrop-blur-md p-4 sm:p-6 overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              
              {/* Radar Grid Graphics using custom CSS / SVG */}
              <div className="relative h-44 sm:h-48 bg-slate-950 rounded-xl border border-slate-900 overflow-hidden flex items-center justify-center">
                {/* Radar Grid lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                {/* Radar concentric rotating circles */}
                <div className="absolute h-36 sm:h-40 w-36 sm:w-40 rounded-full border border-emerald-500/20 animate-ping" style={{ animationDuration: '4s' }} />
                <div className="absolute h-20 sm:h-24 w-20 sm:w-24 rounded-full border border-emerald-500/10" />
                <div className="absolute h-10 w-10 rounded-full border border-emerald-500/30" />
                
                {/* Radar sweep line */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-500/0 to-emerald-500/10 origin-center animate-spin" style={{ animationDuration: '6s' }} />

                {/* Central Fergana Coordinate Marker */}
                <div className="absolute flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="p-1 sm:p-1.5 bg-emerald-500 text-slate-950 rounded-full glow-emerald z-10"
                  >
                    <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </motion.div>
                  <span className="mt-1.5 px-2 py-0.5 bg-slate-950/90 border border-emerald-500/30 rounded text-[8px] sm:text-[9px] font-mono text-emerald-400 font-bold whitespace-nowrap">
                    FARG'ONA (ACTIVE_NODE)
                  </span>
                </div>

                {/* Cyber coordinates text overlay */}
                <div className="absolute bottom-2 left-3 font-mono text-[8px] sm:text-[9px] text-slate-500 space-y-0.5 pointer-events-none">
                  <div>LAT: 40.3864° N</div>
                  <div>LON: 71.7864° E</div>
                </div>

                <div className="absolute top-2 right-3 font-mono text-[8px] sm:text-[9px] text-emerald-400 flex items-center gap-1 bg-emerald-950/50 border border-emerald-500/20 px-1.5 py-0.5 rounded pointer-events-none">
                  <Globe className="w-2.5 h-2.5" /> GPS: LOCKED
                </div>
              </div>

              {/* Geographical description text */}
              <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
                <div className="flex gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs sm:text-sm">Manzil</h4>
                    <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 font-sans text-xs">{data.contacts.address} {data.personalInfo.landmark ? `(mo‘ljal: ${data.personalInfo.landmark})` : ''}</p>
                  </div>
                </div>

                <div className="flex gap-3 text-sm">
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 text-xs sm:text-sm">Elektron pochta</h4>
                    <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 font-sans text-xs break-all">{data.contacts.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social handles list */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Ijtimoiy Tarmoq Havolalari</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                
                <a
                  href={`https://t.me/${data.contacts.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-900/30 dark:bg-slate-900/30 light:bg-white hover:bg-slate-900/60 transition-all group shadow-sm"
                >
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-slate-950 transition-all flex-shrink-0">
                    <TelegramIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-display font-bold text-white dark:text-white light:text-slate-900">Telegram</h4>
                    <span className="text-[10px] text-slate-500 font-mono truncate block">{data.contacts.telegram}</span>
                  </div>
                </a>

                <a
                  href={`https://instagram.com/${data.contacts.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-900/30 dark:bg-slate-900/30 light:bg-white hover:bg-slate-900/60 transition-all group shadow-sm"
                >
                  <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg group-hover:bg-rose-500 group-hover:text-slate-950 transition-all flex-shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-display font-bold text-white dark:text-white light:text-slate-900">Instagram</h4>
                    <span className="text-[10px] text-slate-500 font-mono truncate block">{data.contacts.instagram}</span>
                  </div>
                </a>

                <a
                  href={data.contacts.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-900/30 dark:bg-slate-900/30 light:bg-white hover:bg-slate-900/60 transition-all group shadow-sm"
                >
                  <div className="p-2 bg-slate-800 text-slate-200 rounded-lg group-hover:bg-white group-hover:text-slate-950 transition-all flex-shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-display font-bold text-white dark:text-white light:text-slate-900">GitHub</h4>
                    <span className="text-[10px] text-slate-500 font-mono truncate block">ruziyvdima-cpu</span>
                  </div>
                </a>

                <a
                  href={`tel:${data.contacts.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-900/30 dark:bg-slate-900/30 light:bg-white hover:bg-slate-900/60 transition-all group shadow-sm"
                >
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-display font-bold text-white dark:text-white light:text-slate-900">Telefon</h4>
                    <span className="text-[10px] text-slate-500 font-mono truncate block">{data.contacts.phone}</span>
                  </div>
                </a>

              </div>
            </div>
          </div>

          {/* Right Column: Contact form box */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-850 dark:border-slate-850 light:border-slate-200 bg-slate-900/10 dark:bg-slate-900/10 light:bg-white backdrop-blur-md p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-900 dark:border-slate-900 light:border-slate-200 pb-3 sm:pb-4">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base sm:text-lg font-display font-extrabold text-white dark:text-white light:text-slate-900">Xabar yuborish terminali</h3>
              </div>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-emerald-500/30 rounded-xl text-center space-y-4"
                >
                  <div className="h-12 w-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-display font-bold text-white dark:text-white light:text-slate-900">Xabaringiz qabul qilindi!</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 font-sans leading-relaxed">
                      Rahmat! Sizning xabaringiz tizimga muvaffaqiyatli saqlandi va tez orada Farg'onadan Diyor siz bilan bog'lanadi.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-4 py-2 bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 text-xs text-emerald-400 font-mono rounded-lg transition-all cursor-pointer"
                  >
                    Yangi xabar yozish
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 block uppercase">{t('yourName')}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ismingizni kiriting..."
                      className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-850 dark:border-slate-850 light:border-slate-300 rounded-xl px-4 py-3 text-xs text-white dark:text-white light:text-slate-900 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 block uppercase">{t('yourEmail')}</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. name@domain.com"
                      className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-850 dark:border-slate-850 light:border-slate-300 rounded-xl px-4 py-3 text-xs text-white dark:text-white light:text-slate-900 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-600 block uppercase">{t('yourMessage')}</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Loyihangiz, taklifingiz yoki savolingiz..."
                      className="w-full bg-slate-950 dark:bg-slate-950 light:bg-slate-50 border border-slate-850 dark:border-slate-850 light:border-slate-300 rounded-xl px-4 py-3 text-xs text-white dark:text-white light:text-slate-900 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-rose-950/40 border border-rose-500/20 rounded-lg text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-emerald-500/10 cursor-pointer text-center flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        Xabar yuborilmoqda...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        {t('sendMessage')}
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Status footer inside card */}
              <div className="pt-4 border-t border-slate-850 dark:border-slate-850 light:border-slate-200 text-center font-mono text-[9px] text-slate-500 flex justify-between items-center">
                <span>ENCRYPTION: AES_256_ACTIVE</span>
                <span>DEST: DIYOR_PORTFOLIO_NODE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
