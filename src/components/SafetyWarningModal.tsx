import { motion, AnimatePresence } from 'motion/react';
import { TriangleAlert, X, Info } from 'lucide-react';
import { IngredientConflict } from '../services/safetyService';

interface SafetyWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  conflicts: IngredientConflict[];
}

export function SafetyWarningModal({ isOpen, onClose, conflicts }: SafetyWarningModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-red-950/80 backdrop-blur-md z-[150]"
          />
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[151] p-6 pointer-events-none"
          >
            <div className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl pointer-events-auto border-4 border-red-50">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600 animate-pulse">
                  <TriangleAlert className="w-10 h-10" />
                </div>
                
                <h2 className="font-display font-bold text-2xl text-red-600 leading-tight">Safety Alert!</h2>
                <p className="text-gray-500 text-sm mt-2 mb-8">We found ingredients that shouldn't be used together.</p>

                <div className="w-full space-y-4 mb-8">
                  {conflicts.map((c, i) => (
                    <div key={i} className="bg-red-50 p-5 rounded-3xl text-left border border-red-100">
                       <div className="flex items-center gap-2 mb-2">
                        {c.ingredients.map(ing => (
                          <span key={ing} className="bg-white text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-red-100">
                            {ing}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-red-800 leading-relaxed italic">{c.message}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-gray-400 mb-8">
                  <Info className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Medical Disclaimer Applied</span>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-brand-ink text-white py-4 rounded-3xl font-bold hover:bg-black transition-colors"
                >
                  I Understand
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
