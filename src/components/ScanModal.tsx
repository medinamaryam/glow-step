import { motion, AnimatePresence } from 'motion/react';
import { X, Scan, Zap } from 'lucide-react';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: any) => void;
}

export function ScanModal({ isOpen, onClose, onScan }: ScanModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110]"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[111] p-6"
          >
            <div className="w-full max-w-sm aspect-[9/16] bg-gray-900 rounded-[40px] relative overflow-hidden border-4 border-white/20">
              {/* Simulated Camera View */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-white/40 rounded-3xl relative">
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-brand-peach rounded-tl-xl" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-brand-peach rounded-tr-xl" />
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-brand-peach rounded-bl-xl" />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-brand-peach rounded-br-xl" />
                  
                  {/* Moving Scan Line */}
                  <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-x-0 h-0.5 bg-brand-peach shadow-[0_0_15px_rgba(255,235,232,0.8)]"
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="absolute top-8 left-0 right-0 px-8 flex items-center justify-between">
                <button onClick={onClose} className="p-3 bg-white/10 rounded-full text-white backdrop-blur-md">
                  <X className="w-6 h-6" />
                </button>
                <div className="px-4 py-2 bg-brand-peach text-brand-ink rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Scanning...
                </div>
                <button className="p-3 bg-white/10 rounded-full text-white backdrop-blur-md">
                   <Zap className="w-6 h-6" />
                </button>
              </div>

              <div className="absolute bottom-12 left-0 right-0 px-8">
                 <button
                  onClick={() => onScan({ name: 'Simulated Product', brand: 'SimBrand', ingredients: ['Retinol', 'Water'] })}
                  className="w-full bg-white text-brand-ink py-4 rounded-3xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform"
                 >
                  <Scan className="w-5 h-5" />
                  Capture Barcode
                 </button>
                 <p className="text-white/40 text-[10px] text-center mt-4 font-bold uppercase tracking-widest">Point camera at product label</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
