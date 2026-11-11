import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Cpu, Code, Shield, HelpCircle, Flame, Layers } from 'lucide-react';
import { Skill } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

export default function Skills() {
  const { data, t } = usePortfolio();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeTab, setActiveTab] = useState<'Hammasi' | 'Dasturlash' | 'Mikrokontrollerlar' | 'Musobaqalar'>('Hammasi');

  const skills: Skill[] = data.skills;

  const filteredSkills = activeTab === 'Hammasi'
    ? skills
    : skills.filter(skill => skill.category === activeTab);

  const defaultSkill = skills[0] || {
    name: 'HTML5 & CSS3',
    level: 90,
    category: 'Dasturlash',
    description: 'HTML, CSS va JavaScript yordamida interaktiv modern web-interfeyslarni va murakkab moslashuvchan (responsive) andozalarni ishlab chiqish.'
  };
  const activeDetail = selectedSkill || defaultSkill;

  return (
    <section
      id="skills"
      className="py-24 bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-white dark:text-white light:text-slate-900 relative border-t border-slate-900 dark:border-slate-900 light:border-slate-200 px-4 sm:px-6 lg:px-8 transition-colors"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 dark:bg-slate-900 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-300 text-xs text-cyan-400 dark:text-cyan-400 light:text-cyan-600 font-mono uppercase tracking-wider shadow-sm"
          >
            <Award className="w-3.5 h-3.5" />
            {t('skillsBadge')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white dark:text-white light:text-slate-900"
          >
            {t('skillsTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-md mx-auto"
          >
            {t('skillsSub')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[2px] w-12 bg-cyan-500 mx-auto glow-cyan"
          />
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {(['Hammasi', 'Dasturlash', 'Mikrokontrollerlar', 'Musobaqalar'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedSkill(null); // Reset detail panel
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                activeTab === tab
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-semibold shadow-md glow-cyan'
                  : 'bg-slate-900/50 dark:bg-slate-900/50 light:bg-white text-slate-400 dark:text-slate-400 light:text-slate-700 border-slate-800 dark:border-slate-800 light:border-slate-300 hover:text-cyan-400'
              }`}
            >
              {tab === 'Hammasi' ? t('allTab') : tab}
            </button>
          ))}
        </div>

        {/* Core Layout: List of skills on Left, Detail Viewer on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Skill List with Bars */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-5">
            {filteredSkills.map((skill, index) => {
              const isSelected = activeDetail.name === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-slate-900 light:bg-white border-cyan-500/50 glow-cyan shadow-md'
                      : 'bg-slate-900/30 dark:bg-slate-900/30 light:bg-white/80 border-slate-900 dark:border-slate-900 light:border-slate-200 hover:border-slate-800 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 mr-2">
                      <div className="p-1 sm:p-1.5 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 rounded text-cyan-400 dark:text-cyan-400 light:text-cyan-700 text-xs font-mono font-bold flex-shrink-0">
                        {skill.category === 'Dasturlash' && <Code className="w-3.5 h-3.5" />}
                        {skill.category === 'Mikrokontrollerlar' && <Cpu className="w-3.5 h-3.5" />}
                        {skill.category === 'Musobaqalar' && <Award className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-display font-bold text-xs sm:text-base text-slate-200 dark:text-slate-200 light:text-slate-800 truncate">{skill.name}</span>
                    </div>
                    <span className="font-mono text-xs text-cyan-400 dark:text-cyan-400 light:text-cyan-600 font-bold flex-shrink-0">{skill.level}%</span>
                  </div>

                  {/* Meter Track */}
                  <div className="w-full h-2 bg-slate-950 dark:bg-slate-950 light:bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${
                        skill.category === 'Dasturlash' ? 'from-cyan-500 to-emerald-400' :
                        skill.category === 'Mikrokontrollerlar' ? 'from-emerald-400 to-cyan-400' :
                        'from-cyan-400 to-slate-200'
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Detailed Interactive Description Card */}
          <div className="lg:col-span-5 h-auto lg:h-full">
            <motion.div
              layoutId="skillDetailCard"
              className="rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/40 dark:bg-slate-900/40 light:bg-white backdrop-blur-xl p-4 sm:p-6 h-auto flex flex-col justify-between relative overflow-hidden shadow-xl"
            >
              {/* Top ambient highlight line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-4">
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" /> Batafsil Ma’lumot
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{activeDetail.category}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-cyan-950/50 border border-cyan-500/30 rounded-lg text-cyan-400">
                      {activeDetail.category === 'Dasturlash' && <Code className="w-5 h-5" />}
                      {activeDetail.category === 'Mikrokontrollerlar' && <Cpu className="w-5 h-5" />}
                      {activeDetail.category === 'Musobaqalar' && <Award className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-extrabold text-white dark:text-white light:text-slate-900">{activeDetail.name}</h3>
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-400 light:text-slate-600">O‘zlashtirish darajasi: {activeDetail.level}%</span>
                    </div>
                  </div>

                  <p className="text-sm font-sans leading-relaxed text-slate-300 dark:text-slate-300 light:text-slate-700">
                    {activeDetail.description}
                  </p>
                </div>

                {/* Practical Applications Box */}
                <div className="p-4 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100 rounded-xl border border-slate-900 dark:border-slate-900 light:border-slate-200 space-y-2">
                  <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-400 light:text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" /> Amaliy Qo‘llanilishi
                  </h4>
                  <ul className="text-xs font-sans text-slate-400 dark:text-slate-400 light:text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
                    {activeDetail.name === 'HTML5 & CSS3' && (
                      <>
                        <li>Mukammal UI komponentlar va sahifa andozalari</li>
                        <li>Silliq va tezkor sahifa o‘tishlar va animatsiyalar</li>
                        <li>Turli ekranlarga (mobil, planshet, desktop) moslashuvchanlik</li>
                      </>
                    )}
                    {activeDetail.name === 'JavaScript (ES6+)' && (
                      <>
                        <li>Dinamik interfeyslar va interaktiv dasturiy modullar</li>
                        <li>JSON ma’lumotlar almashinuvi va integratsiyalar</li>
                        <li>Front-end algoritmlari va asinxron mantiq</li>
                      </>
                    )}
                    {activeDetail.name === 'Arduino C++' && (
                      <>
                        <li>Robot mashinalar uchun datchiklar va relelar bilan ishlash</li>
                        <li>Sxemalar va pin-konfiguratsiyalarni to‘g‘ri va xavfsiz yig‘ish</li>
                        <li>C++ dasturlash tili yordamida tezkor mikrokontroller mantiqi</li>
                      </>
                    )}
                    {activeDetail.name === 'ESP32 Hardware' && (
                      <>
                        <li>Smart Home tizimlarini simsiz boshqarish modullari</li>
                        <li>Veb-interfeys orqali mikrokontrollerni boshqarish (Webserver)</li>
                        <li>IoT loyihalarida Bluetooth va Wi-Fi aloqa kanallari</li>
                      </>
                    )}
                    {activeDetail.name === 'CAU Tech Hack 2026' && (
                      <>
                        <li>Nufuzli chempionat va musobaqalarda amaliy ishtirok</li>
                        <li>G‘oyalar integratsiyasi va yuqori tezlikdagi robotlar taqdimoti</li>
                        <li>"Robo-football" va "Smart City" loyihalari realizatsiyasi</li>
                      </>
                    )}
                    {activeDetail.name !== 'HTML5 & CSS3' && 
                     activeDetail.name !== 'JavaScript (ES6+)' && 
                     activeDetail.name !== 'Arduino C++' && 
                     activeDetail.name !== 'ESP32 Hardware' && 
                     activeDetail.name !== 'CAU Tech Hack 2026' && (
                      <>
                        <li>Ushbu ko‘nikmani turli xil amaliy loyihalar va vazifalarda ishlatish</li>
                        <li>Tizimli mantiq va yuqori darajada moslashtirilgan yechimlar</li>
                        <li>Kelajakda ushbu yo‘nalish doirasida yangi innovatsion modullarni integratsiya qilish</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 text-center text-xs font-mono text-slate-500">
                Kurslar va amaliy sinovlar orqali mukammallashtirilgan
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
