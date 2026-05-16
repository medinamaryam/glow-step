import { motion, AnimatePresence } from 'motion/react';
import { X, Columns, ArrowRightLeft } from 'lucide-react';
import { JournalEntry } from '../types';

interface JournalComparatorProps {
  isOpen: boolean;
  onClose: () => void;
  entries: JournalEntry[];
}

export function JournalComparator({ isOpen, onClose, entries }: JournalComparatorProps) {
  if (entries.length < 2) return null;

  // For this demo, let's just pick the oldest and newest
  const sorted = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const before = sorted[0];
  const after = sorted[sorted.length - 1];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-ink/80 backdrop-blur-md z-[300]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] p-8 z-[301] shadow-2xl h-[85vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-brand-sage rounded-2xl text-brand-ink">
                  <Columns className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl leading-tight">Skin Progression</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Side-by-side Analysis</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 bg-gray-50 rounded-full">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto">
              {/* Before/After View */}
              <div className="grid grid-cols-2 gap-2 relative">
                <div className="space-y-2">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-brand-cream bg-gray-50 flex items-center justify-center text-4xl">
                     <img src={before.imageUrl} className="w-full h-full object-cover" alt="Before" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Awal Perjalanan</p>
                    <p className="text-xs font-bold text-brand-ink">{new Date(before.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-brand-sage bg-gray-50 flex items-center justify-center text-4xl">
                     <img src={after.imageUrl} className="w-full h-full object-cover" alt="After" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-brand-sage uppercase tracking-widest">Kondisi Terbaru</p>
                    <p className="text-xs font-bold text-brand-ink">{new Date(after.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>

                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg border border-gray-100">
                  <ArrowRightLeft className="w-4 h-4 text-brand-ink" />
                </div>
              </div>

              <div className="bg-brand-sage/10 p-6 rounded-[32px] border border-brand-sage/20">
                <h4 className="font-bold text-sm text-brand-ink mb-3">Analisis GlowStep AI ✨</h4>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "Berdasarkan perbandingan foto, kulitmu terlihat lebih cerah dan tekstur area pipi tampak lebih halus. Konsistensi Niacinamide selama 14 hari terakhir membuahkan hasil!"
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Detail Catatan</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Terbaru</p>
                    <p className="text-xs text-brand-ink leading-relaxed">{after.note || 'No notes available'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={onClose}
                className="w-full bg-brand-ink text-white py-4 rounded-3xl font-bold shadow-xl active:scale-95 transition-all"
              >
                Keren, Lanjutkan!
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
