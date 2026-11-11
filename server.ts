import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser for JSON with larger limit for images
  app.use(express.json({ limit: "25mb" }));

  // API Route for Image Analysis
  app.post("/api/gemini/analyze", async (req, res) => {
    try {
      const { image, mimeType, prompt } = req.body;
      if (!image || !mimeType) {
        return res.status(400).json({ error: "Rasm va uning format turi (mimeType) kiritilishi shart." });
      }

      // Convert base64 data (strip prefix if present)
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

      const systemPrompt = 
        "Siz robototexnika, datchiklar, IoT, elektronika, va sun'iy intellekt bo'yicha professional muhandissiz. " +
        "Foydalanuvchi yuklagan rasmga qarab, uni o'ta sinchkovlik bilan tahlil qiling. " +
        "Rasmda nimalar borligini (masalan: datchiklar, mikrokontrollerlar, Arduino, ESP32, motorlar, simlar, sxemalar, robotlar yoki boshqa narsalar) aniqlang. " +
        "Ularning ishlash prinsiplari, qanday ulanishi kerakligi, amaliy maslahatlar va kelajakdagi loyihalarda qanday ishlatilishi mumkinligini o'zbek tilida, texnik hamda tushunarli uslubda bayon eting.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          },
          prompt || "Ushbu rasmni robototexnika va texnika nuqtai nazaridan batafsil tahlil qilib bering."
        ],
        config: {
          systemInstruction: systemPrompt
        }
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "Tahlil qilishda xatolik yuz berdi." });
    }
  });

  // API Route for Portfolio Assistant AI Chatbot
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages, contextData, language } = req.body;
      
      const langNotice = 
        language === 'en' ? "Always reply in English." :
        language === 'ru' ? "Always reply in Russian." :
        "Har doim o'zbek tilida javob bering.";

      const systemPrompt = `
Siz Diyorning shaxsiy portfoliosi uchun yaratilgan intellektual AI assistentsiz.
Portfolioga tashrif buyurgan foydalanuvchilarning barcha savollariga Diyor nomidan va u haqida do'stona, aniq va texnik savodli tarzda javob bering.

Diyor va uning portfoliosi haqida ma'lumotlar:
- Ismi: ${contextData?.personalInfo?.name || "Diyor"}
- Yoshi va sinfi: ${contextData?.personalInfo?.age || "15 yosh (9-sinf o'quvchisi)"}
- Manzil: ${contextData?.personalInfo?.location || "Farg'ona shahar, Oq-ariq 100"}, Mo'ljal: ${contextData?.personalInfo?.landmark || "35-o'rta ta'lim maktabi"}
- Qiziqishlar va sohalar: ${contextData?.personalInfo?.interests || "Robototexnika, Web dasturlash, IoT, Musobaqalar"}
- Tarjimai hol: ${contextData?.personalInfo?.bioParagraph1 || ""} ${contextData?.personalInfo?.bioParagraph2 || ""}
- Aloqa ma'lumotlari: Email: ${contextData?.contacts?.email || "ruziyvdima@gmail.com"}, Telegram: @${contextData?.contacts?.telegram || "ruziyvv7"}, Telefon: ${contextData?.contacts?.phone || "+998 88 443-1776"}, GitHub: ${contextData?.contacts?.github || "ruziyvdima-cpu"}
- Musobaqa va Yutuqlar: "CAU Tech Hack and Robotic Challenge 2026" nufuzli musobaqasi faol ishtirokchisi.
- Asosiy loyihalar: Infinity Voice Assistant (Windows ovozli yordamchisi), ElectroMir Online Store (elektronika do'koni), Robo-football Robot (musobaqa roboti).
- Dasturlash & Texnologik bilimlari: Arduino C++, ESP32 Hardware, Wi-Fi/Bluetooth, HTML5 & CSS3, JavaScript (ES6+), Python, Datchiklar, Motorlar, 3D modellashtirish.

Ko'rsatmalar:
1. ${langNotice}
2. Javoblaringiz qisqa, tushunarli, xushmuomala va emojilar hamda ro'yxatlar bilan chiroyli shakllantirilgan bo'lsin.
3. Foydalanuvchi robototexnika yoki dasturlash bo'yicha texnik savol bersa, uni quvvatlang va amaliy tushuntirish bering.
`;

      const formattedContents = (messages || []).map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemPrompt
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini Chat API error:", error);
      res.status(500).json({ error: error.message || "AI bilan bog'lanishda xatolik yuz berdi." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
