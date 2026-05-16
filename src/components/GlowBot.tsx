import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Bot, User as UserIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { User } from '../types';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface GlowBotProps {
  user: User;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function GlowBot({ user }: GlowBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: `Hai ${user.name.split(' ')[0]}! ✨ Ada yang bisa GlowBot bantu untuk rutinitas kulitmu hari ini?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Show bot greeting with animation if just opened
    if (isOpen && messages.length === 1) {
      // Just a trigger for potential animation or logic
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }]
          }
        ],
        config: {
          systemInstruction: `
            Kamu adalah 'GlowBot', seorang pakar skincare yang santai, gaul, dan bersahabat (seperti teman ngobrol mahasiswa usia 18-25 tahun). 
            Tugasmu:
            1. Menjawab pertanyaan seputar urutan pemakaian skincare (Morning & Night routine).
            2. Menjelaskan kecocokan bahan aktif (ingredients) - misal: 'Bolehkah saya pakai Retinol malam ini?'. 
            3. Memberikan saran produk atau tips berdasarkan profil user saat ini.
            
            Profil User:
            - Nama: ${user.name}
            - Jenis Kulit: ${user.skinType}
            - Status: ${user.isPremium ? 'Premium User' : 'Free User'}
            
            Gunakan bahasa Indonesia yang santai, pake emoji yang lucu-lucu ✨💖, tapi tetap informatif dan akurat secara medis/teknis skincare. 
            Jangan terlalu kaku! Anggap aja lagi chat di WhatsApp/Line bareng bestie.
            Kalau user nanya soal Retinol + Vit C, ingatkan bahayanya kalau dipakai barengan (iritasi parah).
          `
        }
      });

      const botResponse = response.text || "Aduh mian, GlowBot lagi loading nih.. Coba tanya lagi ya!";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('GlowBot Error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: "Ups, sinyal GlowBot lagi keganggu nih. Coba lagi sebentar ya! 🆘" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md pointer-events-none z-[250] flex justify-end px-6">
      <div className="flex flex-col items-end gap-4 pointer-events-auto">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="w-80 h-[450px] bg-white rounded-[32px] shadow-2xl border border-brand-peach/20 overflow-hidden flex flex-col mb-4"
            >
              {/* Header */}
              <div className="bg-brand-ink p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-peach rounded-xl flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-brand-ink" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-bold leading-none">GlowBot AI</h3>
                    <p className="text-[9px] text-brand-peach font-bold uppercase tracking-widest mt-1">Status: Online ✨</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-brand-sage text-brand-ink rounded-tr-none' 
                        : 'bg-gray-100 text-brand-ink rounded-tl-none'
                    }`}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-100">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Tanya GlowBot..."
                    className="flex-1 bg-transparent text-xs outline-none px-2"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="p-2 bg-brand-ink text-white rounded-xl active:scale-95 transition-transform disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-brand-ink text-white rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden group border-2 border-brand-peach/30"
        >
          <div className="absolute inset-0 bg-brand-peach/10 group-hover:bg-brand-peach/20 transition-colors" />
          {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageCircle className="w-6 h-6 relative z-10" />}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full z-20"
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}
