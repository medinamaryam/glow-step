import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, CheckCircle, Info } from 'lucide-react';
import { IngredientInfo } from '../services/wikiService';

interface WikiModalProps {
  ingredient: IngredientInfo | null;
  onClose: () => void;
}

export function WikiModal({ ingredient, onClose }: WikiModalProps) {
  return (
    <AnimatePresence>
      {ingredient && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-[250]"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[251] p-6 pointer-events-none"
          >
            <div className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl pointer-events-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand-sage rounded-2xl text-brand-ink">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl leading-tight">Skincare Wiki</h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Ingredient Guide</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 bg-gray-50 rounded-full">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-ink">{ingredient.name}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {ingredient.function}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Cocok Untuk Jenis Kulit:</p>
                  <div className="flex flex-wrap gap-2">
                    {ingredient.bestFor.map(type => (
                      <span key={type} className="flex items-center gap-1.5 bg-gray-50 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-100">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-peach/20 rounded-3xl p-5 border border-brand-peach/30">
                  <div className="flex items-center gap-2 mb-2 text-brand-peach font-bold text-[10px] uppercase tracking-widest">
                    <Info className="w-4 h-4" />
                    Pro Tip
                  </div>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed italic">
                    "{ingredient.tip}"
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-brand-ink text-white py-4 rounded-3xl font-bold hover:bg-black transition-colors shadow-lg active:scale-95"
                >
                  Selesai Membaca
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
