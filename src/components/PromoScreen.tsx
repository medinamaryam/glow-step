import { motion } from 'motion/react';
import { Gift, Share2, Users, CheckCircle2, ChevronLeft, GraduationCap, Copy, Zap } from 'lucide-react';

interface PromoScreenProps {
  onBack: () => void;
  user: any;
}

export function PromoScreen({ onBack, user }: PromoScreenProps) {
  const referralCode = `GLOW-${user.name.split(' ')[0].toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const progress = 1; // Simulated progress
  const target = 3;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    // In a real app we'd show a toast here, but for now we rely on the visual feedback
  };

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button 
          onClick={onBack}
          className="p-3 bg-gray-50 rounded-2xl text-brand-ink"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-display font-bold text-2xl text-brand-ink">Kampus Promo</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Cuan Bareng Bestie ✨</p>
        </div>
      </div>

      {/* Hero Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-ink text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden mb-8"
      >
        <div className="relative z-10">
          <div className="w-12 h-12 bg-brand-peach rounded-2xl flex items-center justify-center text-brand-ink mb-6 rotate-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black font-display leading-tight mb-2">
            Ajak 3 Teman,<br />Gratis Premium!
          </h3>
          <p className="text-xs text-white/60 leading-relaxed mb-6">
            Bantu temen kampusmu dapet kulit glowing & raih 1 bulan akses Premium gratis untukmu.
          </p>

          <div className="bg-white/10 p-4 rounded-3xl border border-white/20 backdrop-blur-sm">
             <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-peach">Progres Referral</p>
                <p className="text-[10px] font-bold uppercase tracking-widest">{progress}/{target} Teman</p>
             </div>
             <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(progress/target) * 100}%` }}
                  className="h-full bg-brand-peach shadow-[0_0_12px_rgba(255,183,161,0.5)]"
                />
             </div>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-brand-peach/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Referral Code Box */}
      <div className="bg-gray-50 rounded-[32px] p-6 border border-gray-100 mb-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 ml-2 text-center">Kode Unik Kamu</p>
        <div className="bg-white p-5 rounded-[24px] border-2 border-dashed border-gray-200 flex items-center justify-between group hover:border-brand-peach/50 transition-colors">
           <span className="font-mono font-bold text-lg text-brand-ink tracking-wider">{referralCode}</span>
           <button 
            onClick={handleCopy}
            className="p-3 bg-brand-ink text-white rounded-xl active:scale-90 transition-transform shadow-lg"
           >
             <Copy className="w-4 h-4" />
           </button>
        </div>
        <p className="text-[9px] text-gray-400 text-center mt-4 italic">"Temen kamu dapet diskon 20%, kamu dapet Premium. Adil kan?"</p>
      </div>

      {/* Steps */}
      <div className="space-y-4 px-2">
         <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Cara Mainnya</h4>
         {[
           { icon: Share2, title: 'Share Kode Kamu', desc: 'Kirim kode referal lewat WhatsApp Group angkatan atau DM Instagram.' },
           { icon: Users, title: 'Teman Join GlowStep', desc: 'Pastikan mereka daftar & verifikasi email pakai kode kamu.' },
           { icon: Zap, title: 'Unlock Premium!', desc: 'Setelah 3 orang join, Premium kamu aktif otomatis 30 hari.' }
         ].map((step, i) => (
           <div key={i} className="flex gap-4 p-5 rounded-3xl bg-white border border-gray-50 shadow-sm">
              <div className="w-10 h-10 shrink-0 bg-brand-sage/10 rounded-xl flex items-center justify-center text-brand-sage">
                 <step.icon className="w-5 h-5" />
              </div>
              <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-brand-ink mb-1">{step.title}</p>
                 <p className="text-xs text-gray-500 leading-tight">{step.desc}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="mt-8">
         <button className="w-full bg-brand-peach text-brand-ink py-5 rounded-3xl font-black shadow-xl shadow-brand-peach/20 flex items-center justify-center gap-3 active:scale-95 transition-all">
            Share ke WhatsApp
            <Share2 className="w-5 h-5" />
         </button>
      </div>

      <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-12 pb-12">
        #GlowStepKampus • Low CAC Strategy
      </p>
    </div>
  );
}
