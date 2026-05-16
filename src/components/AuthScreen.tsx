import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SkinType, User as UserType } from '../types';

interface AuthScreenProps {
  onLogin: (user: UserType) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [mode, setMode] = useState<'splash' | 'login' | 'signup'>('splash');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skinType: 'Kombinasi' as SkinType
  });

  const handleSignup = (e: any) => {
    e.preventDefault();
    onLogin({
      id: Math.random().toString(),
      name: formData.name || 'Maryam',
      email: formData.email,
      skinType: formData.skinType,
      isPremium: false,
      streakCount: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      reminders: { morning: true, night: true }
    });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    onLogin({
      id: '1',
      name: 'Maryam',
      email: formData.email || 'maryam@glowstep.com',
      skinType: 'Kombinasi',
      isPremium: false,
      streakCount: 5,
      lastActiveDate: '2026-05-09',
      reminders: { morning: true, night: true }
    });
  };

  return (
    <div className="min-h-screen bg-brand-cream overflow-hidden">
      <AnimatePresence mode="wait">
        {mode === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="h-screen flex flex-col items-center justify-center px-8 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-24 h-24 bg-brand-ink rounded-[32px] flex items-center justify-center text-white mb-8 shadow-2xl"
            >
              <Star className="w-12 h-12 fill-white" />
            </motion.div>
            <h1 className="font-display font-bold text-5xl tracking-tight text-brand-ink">GlowStep</h1>
            <p className="text-gray-500 font-medium text-sm mt-4 max-w-[200px] mx-auto leading-relaxed">Manajemen skincare cerdas, aman, dan praktis. ✨</p>
            
            <div className="mt-20 w-full space-y-4">
              <button
                onClick={() => setMode('signup')}
                className="w-full bg-brand-ink text-white py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:bg-black transition-all"
              >
                Mulai Sekarang
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMode('login')}
                className="w-full bg-white text-brand-ink py-5 rounded-3xl font-bold text-lg shadow-sm hover:shadow-md transition-all"
              >
                Sudah punya akun? Masuk
              </button>
            </div>
          </motion.div>
        )}

        {mode === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen pt-20 px-8"
          >
            <button onClick={() => setMode('splash')} className="text-sm font-bold text-gray-400 mb-8">← Kembali</button>
            <h2 className="font-display font-bold text-4xl text-brand-ink mb-2">Selamat Datang Kembali!</h2>
            <p className="text-gray-500 mb-10">Lanjutkan perjalanan kulit sehatmu.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <AuthInput icon={Mail} type="email" placeholder="Email" required />
              <AuthInput icon={Lock} type="password" placeholder="Kata Sandi" required />
              
              <button className="w-full bg-brand-ink text-white py-5 rounded-3xl font-bold shadow-xl hover:bg-black transition-all">
                Masuk
              </button>
            </form>
          </motion.div>
        )}

        {mode === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen pt-20 px-8 pb-12"
          >
            <button onClick={() => setMode('splash')} className="text-sm font-bold text-gray-400 mb-8">← Kembali</button>
            <h2 className="font-display font-bold text-4xl text-brand-ink mb-2">Buat Akun Baru</h2>
            <p className="text-gray-500 mb-10">Kenali kulitmu lebih dalam.</p>

            <form onSubmit={handleSignup} className="space-y-6">
              <AuthInput 
                icon={User} 
                placeholder="Nama Lengkap" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
              <AuthInput 
                icon={Mail} 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
              <AuthInput 
                icon={Lock} 
                type="password" 
                placeholder="Kata Sandi" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Jenis Kulit Anda</p>
                <div className="grid grid-cols-2 gap-3">
                  {(['Sensitif', 'Berminyak', 'Kering', 'Kombinasi'] as SkinType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, skinType: type})}
                      className={`py-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                        formData.skinType === type 
                        ? 'bg-brand-sage border-brand-sage text-brand-ink' 
                        : 'bg-white border-gray-100 text-gray-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-brand-ink text-white py-5 rounded-3xl font-bold shadow-xl hover:bg-black transition-all mt-4">
                Daftar Sekarang
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AuthInput({ icon: Icon, ...props }: any) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-ink transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <input
        {...props}
        className="w-full bg-white border-2 border-gray-100 rounded-3xl py-5 pl-14 pr-6 text-brand-ink font-medium placeholder:text-gray-300 focus:border-brand-ink focus:outline-none transition-all"
      />
    </div>
  );
}
