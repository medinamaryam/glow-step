import { motion, AnimatePresence } from 'motion/react';
import { X, Crown, ShieldAlert, Scan, Bell, Check, QrCode, Wallet, Smartphone } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PremiumModal({ isOpen, onClose, onSuccess }: PremiumModalProps) {
  const features = [
    { icon: ShieldAlert, title: 'Safety Alert Otomatis', desc: 'Deteksi interaksi bahan aktif berbahaya secara real-time.' },
    { icon: Scan, title: 'Barcode Scanner', desc: 'Input produk instan tanpa ribet ketik manual.' },
    { icon: Bell, title: 'Expiry Guard', desc: 'Notifikasi masa kedaluwarsa PAO agar kulit tetap aman.' },
  ];

  const payMethods = [
    { name: 'QRIS', icon: QrCode, color: 'text-blue-500' },
    { name: 'Dana', icon: Wallet, color: 'text-blue-400' },
    { name: 'GoPay', icon: Smartphone, color: 'text-teal-500' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-ink/60 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] p-8 z-[201] shadow-2xl h-[90vh] overflow-y-auto"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-500 mb-6 rotate-3">
                <Crown className="w-8 h-8 fill-amber-500/20" />
              </div>
              
              <h2 className="font-display font-bold text-3xl text-brand-ink leading-tight">GlowStep Premium</h2>
              <p className="text-gray-500 text-sm mt-2 mb-8 px-4">Investasikan <span className="font-bold text-brand-ink">Rp15.000/bulan</span> untuk kulit impianmu (hanya seharga satu kopi!) ☕️</p>

              <div className="w-full space-y-4 mb-10">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-3xl border border-gray-100 bg-gray-50/50 text-left">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-brand-ink h-fit">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{f.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full space-y-4 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pilih Metode Pembayaran</p>
                <div className="grid grid-cols-3 gap-3">
                  {payMethods.map((m) => (
                    <button key={m.name} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-ink/20 transition-colors">
                      <m.icon className={`w-6 h-6 ${m.color}`} />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={onSuccess}
                className="w-full bg-brand-ink text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all mb-4 shadow-xl active:scale-95"
              >
                Bayar & Berlangganan
                <Check className="w-5 h-5 text-green-400" />
              </button>
              
              <button onClick={onClose} className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-brand-ink px-4 py-2">
                Mungkin Nanti
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
