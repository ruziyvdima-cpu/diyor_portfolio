export interface Project {
  id: string;
  title: string;
  tech: string[];
  description: string;
  details: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Dasturlash' | 'Mikrokontrollerlar' | 'Musobaqalar';
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isAudio?: boolean;
}

export interface ElectronicsProduct {
  id: string;
  name: string;
  price: number; // in UZS (sum)
  description: string;
  category: string;
}

export interface CartItem {
  product: ElectronicsProduct;
  quantity: number;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
