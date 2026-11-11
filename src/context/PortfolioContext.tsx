import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '../lib/translations';

export interface CustomItem {
  id: string;
  title: string;
  category: 'Loyiha' | 'Musobaqa';
  description: string;
  details: string;
  tech: string[];
  image?: string;
  date?: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    greeting: string;
    typingTexts: string[];
    age: string;
    location: string;
    landmark: string;
    interests: string;
    bioParagraph1: string;
    bioParagraph2: string;
    profileImage?: string;
  };
  contacts: {
    address: string;
    email: string;
    telegram: string;
    instagram: string;
    github: string;
    phone: string;
  };
  projects: {
    infinity: {
      title: string;
      description: string;
      details: string;
      tech: string[];
    };
    electromir: {
      title: string;
      description: string;
      details: string;
      tech: string[];
    };
    robofootball: {
      title: string;
      description: string;
      details: string;
      tech: string[];
    };
  };
  customProjects: CustomItem[];
  skills: {
    name: string;
    level: number;
    category: 'Dasturlash' | 'Mikrokontrollerlar' | 'Musobaqalar';
    description: string;
  }[];
}

const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: 'Diyor',
    greeting: 'men Diyorman',
    typingTexts: [
      'Robototexnika mutaxassisi',
      'Web dasturchi',
      'Kiberxavfsizlik ishqibozi',
      'CAU Tech Hack 2026 ishtirokchisi'
    ],
    age: '15 yosh (9-sinf o‘quvchisi)',
    location: 'Farg‘ona shahar, Oq-ariq 100',
    landmark: '35-o‘rta ta‘lim maktabi',
    interests: 'Robototexnika, Web dasturlash, IoT, Musobaqalar',
    bioParagraph1: 'Men Diyor, Farg‘ona shahar, Oq-ariq 100 manzilida (mo‘ljal: 35-o‘rta ta‘lim maktabi) yashayman va 9-sinf o‘quvchisiman. Kichkinaligimdan buyon robotlar qanday ishlashi, mikrokontrollerlar va ularning dasturiy ta’minoti meni juda qiziqtirib keladi. Aynan shu sababli men Arduino va ESP32 platformalari dunyosiga qadam qo‘ydim.',
    bioParagraph2: 'Men faqatgina elektronika bilan cheklanmay, ushbu robotlarni boshqarish uchun chiroyli va tezkor interaktiv veb-interfeyslar tuzish (veb-dasturlash) hamda sxemalar va pin-konfiguratsiyalar ustida ishlashni mukammal darajaga yetkazishga harakat qilyapman. Shuningdek, nufuzli "CAU Tech Hack and Robotic Challenge 2026" kabi musobaqalarda faol ishtirok etib, amaliy ko‘nikmalarimni doimiy ravishda oshirib bormoqdaman.',
    profileImage: '/src/assets/images/diyor_profile_1784196116098.jpg'
  },
  contacts: {
    address: 'Farg‘ona shahar, Oq-ariq 100 (mo‘ljal: 35-o‘rta ta‘lim maktabi)',
    email: 'ruziyvdima@gmail.com',
    telegram: 'ruziyvv7',
    instagram: 'ruziev_.s7',
    github: 'ruziyvdima-cpu',
    phone: '+998 88 443-1776'
  },
  projects: {
    infinity: {
      title: 'Infinity Voice Assistant',
      description: 'Windows operatsion tizimi uchun mo‘ljallangan, ko‘p tilli buyruqlarni tushunadigan intellektual ovozli yordamchi tizimi.',
      details: 'Infinity — Windows operatsion tizimini boshqaruvchi intellektual ovozli yordamchidir. Tizim o‘zbek va boshqa tillardagi ko‘p tilli buyruqlarni tushunadi hamda ular orqali kompyuterdagi turli dasturlarni boshqarish, axborot izlash va buyruqlarni bajarish imkoniyatiga ega.',
      tech: ['Python', 'Speech Recognition', 'Gemini API', 'Windows OS']
    },
    electromir: {
      title: 'ElectroMir Online Store',
      description: 'Avtomatlashtirish komponentlari va sensorlarni sotishga mo‘ljallangan professional web-do‘kon interfeysi.',
      details: 'ElectroMir — bu robototexnika, avtomatlashtirish datchiklari, motorlar va boshqa elektron butlovchi qismlarni sotish uchun mo‘ljallangan zamonaviy professional web-do‘kon interfeysi. Bu yerda savatcha, narx hisoblagich va tovarlar filtri mukammal ishlaydi.',
      tech: ['HTML5', 'Tailwind CSS', 'JavaScript (ES6+)', 'Local Storage']
    },
    robofootball: {
      title: 'Robo-football Robot',
      description: '25x25x25 sm o‘lchamdagi, dual-motorli, musobaqalar uchun maxsus ishlab chiqilgan ixcham robot loyihasi.',
      details: 'Robo-football Robot — bu robot-futbol musobaqalari va chempionatlar uchun maxsus loyihalashtirilgan qurilma. U 25x25x25 sm o‘lchamda bo‘lib, dual-motor tizimi orqali yuqori tezlik va manevrlik ko‘rsatadi.',
      tech: ['Arduino / ESP32', 'C++', 'Dual-Motor', '3D Design']
    }
  },
  customProjects: [
    {
      id: 'infinity',
      title: 'Infinity Voice Assistant',
      category: 'Loyiha',
      description: 'Windows operatsion tizimi uchun mo‘ljallangan, ko‘p tilli buyruqlarni tushunadigan intellektual ovozli yordamchi tizimi.',
      details: 'Infinity — Windows operatsion tizimini boshqaruvchi intellektual ovozli yordamchidir. Tizim o‘zbek va boshqa tillardagi ko‘p tilli buyruqlarni tushunadi hamda ular orqali kompyuterdagi turli dasturlarni boshqarish, axborot izlash va buyruqlarni bajarish imkoniyatiga ega.',
      tech: ['Python', 'Speech Recognition', 'Gemini API', 'Windows OS'],
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=600&q=80',
      date: '2025'
    },
    {
      id: 'electromir',
      title: 'ElectroMir Online Store',
      category: 'Loyiha',
      description: 'Avtomatlashtirish komponentlari va sensorlarni sotishga mo‘ljallangan professional web-do‘kon interfeysi.',
      details: 'ElectroMir — bu robototexnika, avtomatlashtirish datchiklari, motorlar va boshqa elektron butlovchi qismlarni sotish uchun mo‘ljallangan zamonaviy professional web-do‘kon interfeysi. Bu yerda savatcha, narx hisoblagich va tovarlar filtri mukammal ishlaydi.',
      tech: ['HTML5', 'Tailwind CSS', 'JavaScript (ES6+)', 'Local Storage'],
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80',
      date: '2025'
    },
    {
      id: 'robofootball',
      title: 'Robo-football Robot',
      category: 'Musobaqa',
      description: '25x25x25 sm o‘lchamdagi, dual-motorli, musobaqalar uchun maxsus ishlab chiqilgan ixcham robot loyihasi.',
      details: 'Robo-football Robot — bu robot-futbol musobaqalari va chempionatlar uchun maxsus loyihalashtirilgan qurilma. U 25x25x25 sm o‘lchamda bo‘lib, dual-motor tizimi orqali yuqori tezlik va manevrlik ko‘rsatadi.',
      tech: ['Arduino / ESP32', 'C++', 'Dual-Motor', '3D Design'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
      date: '2026'
    },
    {
      id: 'cau_hack_2026',
      title: 'CAU Tech Hack & Robotic Challenge 2026',
      category: 'Musobaqa',
      description: 'IoT va Avtonom Robototexnika bo‘yicha xalqaro muhandislik musobaqasi.',
      details: 'Nufuzli CAU Tech Hack 2026 musobaqasida robototexnika hamda IoT yechimlari yo‘nalishida avtonom harakatlanuvchi robotlar va aqlli datchiklar tizimini muvaffaqiyatli namoyish etish.',
      tech: ['ESP32', 'Robotics', 'IoT Sensors', 'C++ Algorithm'],
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
      date: '2026'
    }
  ],
  skills: [
    {
      name: 'HTML5 & CSS3',
      level: 90,
      category: 'Dasturlash',
      description: 'HTML, CSS va JavaScript yordamida interaktiv modern web-interfeyslarni va murakkab moslashuvchan (responsive) andozalarni ishlab chiqish.'
    },
    {
      name: 'JavaScript (ES6+)',
      level: 85,
      category: 'Dasturlash',
      description: 'Dinamik va interaktiv web-interfeyslar, silliq animatsiyalar, asinxron mantiq va hodisalarni mukammal boshqarish.'
    },
    {
      name: 'Arduino C++',
      level: 90,
      category: 'Mikrokontrollerlar',
      description: 'Arduino mikrokontrollerlari, datchiklar, motorlar va pin-konfiguratsiyalar bilan ishlash hamda murakkab algoritmlarni yaratish.'
    },
    {
      name: 'ESP32 Hardware',
      level: 85,
      category: 'Mikrokontrollerlar',
      description: 'ESP32 platformasi, simsiz Wi-Fi va Bluetooth aloqalari, veb-serverlar va IoT loyihalarini to‘liq sozlash hamda ishlash prinsiplari.'
    },
    {
      name: 'CAU Tech Hack 2026',
      level: 100,
      category: 'Musobaqalar',
      description: '"CAU Tech Hack and Robotic Challenge 2026" nufuzli musobaqasi ishtirokchisi va robototexnika/IoT yo‘nalishi bo‘yicha muhandis.'
    }
  ]
};

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetData: () => void;
  isAdminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  login: (id: string, pass: string) => boolean;
  logout: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['uz']) => string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isAdminOpen, setAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguageState] = useState<Language>('uz');

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem('diyor_portfolio_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.customProjects) {
          parsed.customProjects = defaultPortfolioData.customProjects;
        }
        setData(parsed);
      } catch (e) {
        console.error('Error parsing portfolio data', e);
      }
    }
    
    const savedAuth = localStorage.getItem('diyor_portfolio_auth');
    if (savedAuth === 'true') {
      setIsLoggedIn(true);
    }

    const savedTheme = localStorage.getItem('diyor_portfolio_theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light', savedTheme === 'light');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }

    const savedLang = localStorage.getItem('diyor_portfolio_lang') as Language;
    if (savedLang && (savedLang === 'uz' || savedLang === 'en' || savedLang === 'ru')) {
      setLanguageState(savedLang);
    }
  }, []);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('diyor_portfolio_data', JSON.stringify(newData));
  };

  const resetData = () => {
    setData(defaultPortfolioData);
    localStorage.removeItem('diyor_portfolio_data');
  };

  const login = (id: string, pass: string): boolean => {
    if (id === 'Diyor' && pass === 'd1ma1776') {
      setIsLoggedIn(true);
      localStorage.setItem('diyor_portfolio_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('diyor_portfolio_auth');
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('diyor_portfolio_theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('diyor_portfolio_lang', lang);
  };

  const t = (key: keyof typeof translations['uz']): string => {
    return translations[language]?.[key] || translations['uz']?.[key] || key;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetData,
        isAdminOpen,
        setAdminOpen,
        isLoggedIn,
        login,
        logout,
        theme,
        toggleTheme,
        language,
        setLanguage,
        t
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
