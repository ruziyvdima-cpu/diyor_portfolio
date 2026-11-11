import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Code, MapPin, Award, BookOpen, Lightbulb } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function About() {
  const { data, t } = usePortfolio();

  const highlights = [
    {
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      title: 'Robototexnika',
      desc: 'Arduino va ESP32 platformalari, sxemalar va pin-konfiguratsiyalar bilan ishlash.'
    },
    {
      icon: <Code className="w-6 h-6 text-emerald-400" />,
      title: 'Web Dasturlash',
      desc: 'HTML, CSS va JavaScript yordamida interaktiv web-interfeyslarni ishlab chiqish.'
    },
    {
      icon: <Award className="w-6 h-6 text-emerald-400 animate-pulse" />,
      title: 'Musobaqalar',
      desc: '"CAU Tech Hack and Robotic Challenge 2026" ishtirokchisi.'
    }
  ];

  const details = [
    { label: t('age'), value: data.personalInfo.age },
    { label: t('location'), value: data.personalInfo.location },
    { label: t('school'), value: data.personalInfo.landmark },
    { label: t('interests'), value: data.personalInfo.interests }
  ];

  return (
    <section
      id="about"
      className="py-24 bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-white dark:text-white light:text-slate-900 relative border-t border-slate-900 dark:border-slate-900 light:border-slate-200 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-xs text-emerald-400 font-mono uppercase tracking-wider shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t('aboutBadge')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white dark:text-white light:text-slate-900"
          >
            {t('whoAmI')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[2px] w-12 bg-emerald-500 mx-auto glow-emerald"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Big Story & Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-5 sm:space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-emerald-400 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0" /> {t('futureInnovator')}
            </h3>
            <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-sans leading-relaxed text-sm sm:text-base md:text-lg">
              {data.personalInfo.bioParagraph1}
            </p>
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 font-sans leading-relaxed text-xs sm:text-sm md:text-base">
              {data.personalInfo.bioParagraph2}
            </p>

            {/* Structured Table Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-slate-900 dark:border-slate-900 light:border-slate-200">
              {details.map((detail, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="text-[10px] sm:text-xs font-mono text-slate-500 dark:text-slate-500 light:text-slate-500 uppercase tracking-wider block">{detail.label}</span>
                  <span className="text-xs sm:text-sm font-sans font-medium text-slate-200 dark:text-slate-200 light:text-slate-800">{detail.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Key Focus Areas (Highlights) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-4 sm:space-y-6"
          >
            <h3 className="text-lg sm:text-xl font-display font-semibold text-white dark:text-white light:text-slate-900">
              {t('myDirections')}
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 4 }}
                  className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-slate-900 dark:border-slate-900 light:border-slate-200 bg-slate-900/20 dark:bg-slate-900/20 light:bg-white backdrop-blur-sm hover:border-slate-800 dark:hover:border-slate-700 transition-all duration-300 shadow-sm"
                >
                  <div className="flex-shrink-0 p-2.5 sm:p-3 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded-xl h-fit">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-display font-semibold text-slate-100 dark:text-slate-100 light:text-slate-900">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 font-sans leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mini Fargona Badge Card */}
            <div className="rounded-2xl p-4 sm:p-5 border border-emerald-500/10 bg-gradient-to-r from-emerald-950/10 to-emerald-950/5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-sm">
              <div className="p-2.5 sm:p-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-xl flex-shrink-0">
                <MapPin className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-display font-bold text-white dark:text-white light:text-slate-900 uppercase">Farg‘ona, O‘zbekiston</h4>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 font-sans mt-0.5">
                  Kelajakda Farg‘onani kiber-innovatsiyalar va zamonaviy IoT loyihalar markaziga aylantirishni orzu qilaman.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
