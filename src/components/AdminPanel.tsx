import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio, PortfolioData, CustomItem } from '../context/PortfolioContext';
import {
  X,
  Lock,
  Unlock,
  Save,
  RefreshCw,
  Terminal,
  Cpu,
  User,
  Phone,
  MapPin,
  Code,
  Award,
  BookOpen,
  Mail,
  Instagram,
  Compass,
  AlertTriangle,
  Github,
  Send,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

export default function AdminPanel() {
  const {
    data,
    updateData,
    resetData,
    isAdminOpen,
    setAdminOpen,
    isLoggedIn,
    login,
    logout,
    t
  } = usePortfolio();

  // Authentication State
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Editing tabs: 'info' | 'projects' | 'skills' | 'contacts'
  const [activeTab, setActiveTab] = useState<'info' | 'projects' | 'skills' | 'contacts'>('info');
  const [formData, setFormData] = useState<PortfolioData>({ ...data });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // New project/competition state
  const [newItem, setNewItem] = useState<{
    title: string;
    category: 'Loyiha' | 'Musobaqa';
    description: string;
    details: string;
    tech: string;
    image: string;
    date: string;
  }>({
    title: '',
    category: 'Loyiha',
    description: '',
    details: '',
    tech: '',
    image: '',
    date: '2026'
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Sync state with Context when opening
  React.useEffect(() => {
    if (isAdminOpen) {
      setFormData({ ...data });
      setSaveStatus('idle');
    }
  }, [isAdminOpen, data]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(userId, password);
    if (success) {
      setUserId('');
      setPassword('');
      setAuthError('');
      setFormData({ ...data });
    } else {
      setAuthError('ID yoki Parol noto‘g‘ri kiritildi!');
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    try {
      updateData(formData);
      setTimeout(() => {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }, 1000);
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const handleReset = () => {
    if (window.confirm('Haqiqatdan ham barcha ma’lumotlarni dastlabki holatiga qaytarmoqchimisiz?')) {
      resetData();
      setFormData({ ...data });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handleSkillsChange = (index: number, field: string, value: any) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleCustomProjectChange = (index: number, field: keyof CustomItem, value: any) => {
    const updated = [...(formData.customProjects || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, customProjects: updated });
  };

  const handleDeleteCustomItem = (id: string) => {
    if (window.confirm("Ushbu loyiha/musobaqani o'chirmoqchimisiz?")) {
      const updated = (formData.customProjects || []).filter(item => item.id !== id);
      setFormData({ ...formData, customProjects: updated });
    }
  };

  const handleAddCustomItem = () => {
    if (!newItem.title.trim()) {
      alert("Loyiha yoki musobaqa sarlavhasini kiriting!");
      return;
    }
    const createdItem: CustomItem = {
      id: Date.now().toString(),
      title: newItem.title,
      category: newItem.category,
      description: newItem.description,
      details: newItem.details,
      tech: newItem.tech.split(',').map(t => t.trim()).filter(Boolean),
      image: newItem.image || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      date: newItem.date
    };

    setFormData({
      ...formData,
      customProjects: [createdItem, ...(formData.customProjects || [])]
    });

    setNewItem({
      title: '',
      category: 'Loyiha',
      description: '',
      details: '',
      tech: '',
      image: '',
      date: '2026'
    });
    setShowAddForm(false);
  };

  const handleTypingTextsChange = (value: string) => {
    const texts = value.split(',').map(t => t.trim()).filter(t => t.length > 0);
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        typingTexts: texts
      }
    });
  };

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl max-h-[94vh] sm:max-h-[90vh] bg-[#09090b] border border-slate-850 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans text-slate-300">
        
        {/* Glow Header bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 animate-pulse" />

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-900 bg-slate-950/60">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 flex-shrink-0">
              <Terminal className="w-4 sm:w-5 h-4 sm:h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display font-extrabold text-white tracking-tight text-xs sm:text-sm uppercase truncate">
                CYBERCORE CONTROL PANEL
              </h2>
              <p className="text-[9px] sm:text-[10px] text-emerald-400 font-mono tracking-widest uppercase truncate">
                {isLoggedIn ? 'SYSTEM_STATUS: AUTHENTICATED' : 'SYSTEM_STATUS: LOCKED'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAdminOpen(false)}
            className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 scrollbar-thin">
          {!isLoggedIn ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-12 space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-500">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-white text-base">Tizimga kirish</h3>
                <p className="text-xs text-slate-500">Portfolio ma'lumotlarini o'zgartirish uchun avtorizatsiyadan o'ting</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                    Foydalanuvchi ID
                  </label>
                  <input
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Foydalanuvchi ID kiriting..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500/50 text-white font-mono text-xs transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                    Parol
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parolni kiriting..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500/50 text-white font-mono text-xs transition-all"
                  />
                </div>

                {authError && (
                  <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-lg text-rose-400 text-xs flex items-center gap-2 font-sans">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-emerald-500/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  KIRISH
                </button>
              </form>
            </div>
          ) : (
            /* Logged In Dashboard Form */
            <div className="space-y-6">
              
              {/* Tabs navigation */}
              <div className="flex border-b border-slate-900 pb-px overflow-x-auto gap-2">
                {[
                  { id: 'info', name: 'Ma’lumotlar', icon: <User className="w-3.5 h-3.5" /> },
                  { id: 'projects', name: 'Loyihalar & Musobaqalar', icon: <Code className="w-3.5 h-3.5" /> },
                  { id: 'skills', name: 'Ko’nikmalar', icon: <Award className="w-3.5 h-3.5" /> },
                  { id: 'contacts', name: 'Aloqa', icon: <Phone className="w-3.5 h-3.5" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg border-t border-x font-display font-bold text-xs uppercase transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-slate-950 border-slate-800 text-emerald-400'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* TAB 1: Ma’lumotlar */}
              {activeTab === 'info' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">ISM</label>
                      <input
                        type="text"
                        value={formData.personalInfo.name}
                        onChange={(e) => setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, name: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">SALOMLASHISH MATNI</label>
                      <input
                        type="text"
                        value={formData.personalInfo.greeting}
                        onChange={(e) => setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, greeting: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                      ANIMATSIYALI YOZUVLAR (VERGUL BILAN AJRATIB YOZING)
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.typingTexts.join(', ')}
                      onChange={(e) => handleTypingTextsChange(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">YOSHI & SINFI</label>
                      <input
                        type="text"
                        value={formData.personalInfo.age}
                        onChange={(e) => setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, age: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">JOYLAShUV</label>
                      <input
                        type="text"
                        value={formData.personalInfo.location}
                        onChange={(e) => setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, location: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">MO'LJAL (MAKTAB)</label>
                      <input
                        type="text"
                        value={formData.personalInfo.landmark}
                        onChange={(e) => setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, landmark: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">ASOSIY QIZIQIShLAR</label>
                    <input
                      type="text"
                      value={formData.personalInfo.interests}
                      onChange={(e) => setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, interests: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">MENING HAQIMDA - 1-XATBOSHI</label>
                    <textarea
                      rows={3}
                      value={formData.personalInfo.bioParagraph1}
                      onChange={(e) => setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, bioParagraph1: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">MENING HAQIMDA - 2-XATBOSHI</label>
                    <textarea
                      rows={3}
                      value={formData.personalInfo.bioParagraph2}
                      onChange={(e) => setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, bioParagraph2: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40 resize-none"
                    />
                  </div>

                  {/* PROFIL RASMI (UPLOAD) */}
                  <div className="border border-slate-850 p-4 rounded-xl space-y-3 bg-slate-950/20">
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">PROFIL RASMI (ALMASHTIRISH)</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-16 h-20 rounded border border-slate-800 overflow-hidden bg-slate-950 flex-shrink-0">
                        <img 
                          src={formData.personalInfo.profileImage || "/src/assets/images/diyor_profile_1784196116098.jpg"} 
                          alt="Profile Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 w-full">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setFormData({
                                    ...formData,
                                    personalInfo: {
                                      ...formData.personalInfo,
                                      profileImage: event.target.result as string
                                    }
                                  });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                          id="profile-img-upload"
                        />
                        <label
                          htmlFor="profile-img-upload"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 text-xs font-mono rounded-lg transition-all cursor-pointer"
                        >
                          <ImageIcon className="w-4 h-4 text-emerald-400" />
                          Yangi rasm tanlash (.png, .jpg, .webp)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Loyihalar & Musobaqalar */}
              {activeTab === 'projects' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Top Add Button */}
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <div>
                      <h3 className="text-sm font-display font-bold text-white uppercase">Loyihalar va Musobaqalar Ro'yxati</h3>
                      <p className="text-[10px] font-mono text-slate-500">Loyihalaringiz va qatnashgan musobaqalaringiz va ularning rasmlarini boshqaring</p>
                    </div>

                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-xs uppercase rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Yangi Qo'shish
                    </button>
                  </div>

                  {/* Add New Project/Competition Form Modal Box */}
                  {showAddForm && (
                    <div className="border border-emerald-500/40 p-5 rounded-2xl bg-emerald-950/20 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                        <span className="font-mono text-xs text-emerald-400 font-bold uppercase">
                          + YANGI LOYIHA YOKI MUSOBAQA QO'SHISH
                        </span>
                        <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">SARLAVHA *</label>
                          <input
                            type="text"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            placeholder="Masalan: Robo-Soccer Tournament 2026"
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-sans text-white focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">TOIFA (KATEGORIYA)</label>
                          <select
                            value={newItem.category}
                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-sans text-white focus:border-emerald-500"
                          >
                            <option value="Loyiha">Loyiha (Project)</option>
                            <option value="Musobaqa">Musobaqa (Competition)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">TEXNOLOGIYALAR / DATCHIKLAR (Vergul bilan)</label>
                          <input
                            type="text"
                            value={newItem.tech}
                            onChange={(e) => setNewItem({ ...newItem, tech: e.target.value })}
                            placeholder="Arduino, ESP32, Ultrasonic, C++"
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-sans text-white focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">YIL / SANA</label>
                          <input
                            type="text"
                            value={newItem.date}
                            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                            placeholder="2026"
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-sans text-white focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Image Upload for New Item */}
                      <div className="border border-slate-800 p-3 rounded-xl bg-slate-950/60 flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-20 h-16 rounded border border-slate-700 overflow-hidden bg-slate-900 flex items-center justify-center flex-shrink-0">
                          {newItem.image ? (
                            <img src={newItem.image} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1 w-full">
                          <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">LOYIHA / MUSOBAQA RASMI</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setNewItem({ ...newItem, image: event.target.result as string });
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                            id="new-item-img"
                          />
                          <label
                            htmlFor="new-item-img"
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-mono text-emerald-400 rounded cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            Rasm yuklash
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">QISQA TAVSIF</label>
                        <input
                          type="text"
                          value={newItem.description}
                          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                          placeholder="Musobaqa yoki loyihaning qisqacha mazmuni..."
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-sans text-white focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">BATAFSIL MA'LUMOT</label>
                        <textarea
                          rows={2}
                          value={newItem.details}
                          onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                          placeholder="Natijalar, qo'llanilgan usullar, olingan o'rinlar va tajribalar..."
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-sans text-white focus:border-emerald-500 resize-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setShowAddForm(false)}
                          className="px-4 py-2 bg-slate-900 text-slate-400 text-xs font-mono rounded-lg"
                        >
                          Bekor qilish
                        </button>
                        <button
                          onClick={handleAddCustomItem}
                          className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-bold text-xs uppercase rounded-lg shadow-lg"
                        >
                          Ro'yxatga qo'shish
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Items List */}
                  <div className="space-y-4">
                    {(formData.customProjects || []).map((item, index) => (
                      <div key={item.id} className="border border-slate-850 p-4 rounded-xl space-y-3 bg-slate-950/40 relative">
                        <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                              item.category === 'Musobaqa' 
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            }`}>
                              {item.category}
                            </span>
                            <span className="font-mono text-xs text-slate-400">#{index + 1}</span>
                          </div>

                          <button
                            onClick={() => handleDeleteCustomItem(item.id)}
                            className="p-1 text-rose-500 hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors"
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Image Preview & Upload for existing item */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="w-24 h-20 rounded border border-slate-800 overflow-hidden bg-slate-950 flex-shrink-0">
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 w-full space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div className="md:col-span-2">
                                <label className="block text-[8px] font-mono text-slate-500 uppercase">Sarlavha</label>
                                <input
                                  type="text"
                                  value={item.title}
                                  onChange={(e) => handleCustomProjectChange(index, 'title', e.target.value)}
                                  className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[8px] font-mono text-slate-500 uppercase">Toifa</label>
                                <select
                                  value={item.category}
                                  onChange={(e) => handleCustomProjectChange(index, 'category', e.target.value as any)}
                                  className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                                >
                                  <option value="Loyiha">Loyiha</option>
                                  <option value="Musobaqa">Musobaqa</option>
                                </select>
                              </div>
                            </div>

                            {/* Image Picker */}
                            <div className="flex items-center gap-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      if (event.target?.result) {
                                        handleCustomProjectChange(index, 'image', event.target.result as string);
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                                id={`item-img-${item.id}`}
                              />
                              <label
                                htmlFor={`item-img-${item.id}`}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] font-mono text-emerald-400 rounded cursor-pointer"
                              >
                                <ImageIcon className="w-3 h-3" />
                                Rasmni yangilash
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[8px] font-mono text-slate-500 uppercase">Texnologiyalar (Vergul bilan)</label>
                            <input
                              type="text"
                              value={item.tech.join(', ')}
                              onChange={(e) => handleCustomProjectChange(index, 'tech', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                              className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-mono text-slate-500 uppercase">Yil / Sana</label>
                            <input
                              type="text"
                              value={item.date || '2026'}
                              onChange={(e) => handleCustomProjectChange(index, 'date', e.target.value)}
                              className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[8px] font-mono text-slate-500 uppercase">Qisqa Tavsif</label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleCustomProjectChange(index, 'description', e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[8px] font-mono text-slate-500 uppercase">Batafsil ma'lumot</label>
                          <textarea
                            rows={2}
                            value={item.details}
                            onChange={(e) => handleCustomProjectChange(index, 'details', e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-white resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 3: Ko’nikmalar */}
              {activeTab === 'skills' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-slate-950/40 p-4 border border-slate-850 rounded-xl space-y-4">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="p-3 border border-slate-900 rounded-lg bg-slate-950/80 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-xs text-emerald-400">KO‘NIKMA #{index + 1} ({skill.category})</span>
                          <span className="text-xs font-mono font-bold">{skill.level}%</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="md:col-span-2">
                            <label className="block text-[8px] font-mono text-slate-500 uppercase mb-0.5">NOMI</label>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleSkillsChange(index, 'name', e.target.value)}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 rounded text-xs font-sans text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] font-mono text-slate-500 uppercase mb-0.5">DARAJA (0 - 100)</label>
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={skill.level}
                              onChange={(e) => handleSkillsChange(index, 'level', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 rounded text-xs font-sans text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[8px] font-mono text-slate-500 uppercase mb-0.5">TAVSIF</label>
                          <input
                            type="text"
                            value={skill.description}
                            onChange={(e) => handleSkillsChange(index, 'description', e.target.value)}
                            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-850 rounded text-xs font-sans text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Aloqa */}
              {activeTab === 'contacts' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">ELEKTRON POCHTA</label>
                      <input
                        type="email"
                        value={formData.contacts.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          contacts: { ...formData.contacts, email: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">TELEFON RAQAM</label>
                      <input
                        type="text"
                        value={formData.contacts.phone}
                        onChange={(e) => setFormData({
                          ...formData,
                          contacts: { ...formData.contacts, phone: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">TELEGRAM USERNAME</label>
                      <input
                        type="text"
                        value={formData.contacts.telegram}
                        onChange={(e) => setFormData({
                          ...formData,
                          contacts: { ...formData.contacts, telegram: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">INSTAGRAM ACCOUNT</label>
                      <input
                        type="text"
                        value={formData.contacts.instagram}
                        onChange={(e) => setFormData({
                          ...formData,
                          contacts: { ...formData.contacts, instagram: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">GITHUB ACCOUNT</label>
                      <input
                        type="text"
                        value={formData.contacts.github}
                        onChange={(e) => setFormData({
                          ...formData,
                          contacts: { ...formData.contacts, github: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">TO'LIQ MANZIL MATNI</label>
                    <input
                      type="text"
                      value={formData.contacts.address}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: { ...formData.contacts, address: e.target.value }
                      })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-white text-xs font-sans focus:border-emerald-500/40"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between border-t border-slate-900 pt-6 gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-display font-bold text-xs uppercase rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Tiklash
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white font-display font-bold text-xs uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    Chiqish
                  </button>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saveStatus === 'saving'}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-display font-black text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-emerald-500/10 transition-all flex items-center gap-2 cursor-pointer"
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      SAQLANMOQDA...
                    </>
                  ) : saveStatus === 'saved' ? (
                    <>
                      <Save className="w-4 h-4" />
                      SAQLANDI! [OK]
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      SAQLASH [SYNC]
                    </>
                  )}
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
