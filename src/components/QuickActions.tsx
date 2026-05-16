import { motion } from 'motion/react';
import { ScanBarcode, Sparkles, Plus, Lock } from 'lucide-react';

interface QuickActionsProps {
  onScanClick: () => void;
  onAddClick: () => void;
  isPremium?: boolean;
}

export function QuickActions({ onScanClick, onAddClick, isPremium }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.button
        onClick={onScanClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-brand-ink text-white rounded-3xl p-5 flex flex-col items-start justify-between h-32 relative overflow-hidden group"
      >
        <div className="flex items-center justify-between w-full">
          <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-colors">
            <ScanBarcode className="w-6 h-6" />
          </div>
          {!isPremium && (
            <div className="bg-amber-400 text-brand-ink p-1.5 rounded-lg shadow-lg">
              <Lock className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
        <div className="z-10">
          <p className="font-display font-semibold text-lg leading-tight">Scan<br/>Barcode</p>
          <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">
            {isPremium ? 'Smart Match' : 'Premium Only'}
          </p>
        </div>
        <Sparkles className="absolute -bottom-4 -right-4 w-20 h-20 text-white/10 group-hover:text-white/20 transition-all group-hover:rotate-12" />
      </motion.button>

      <motion.button
        onClick={onAddClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-brand-sage rounded-3xl p-5 flex flex-col items-start justify-between h-32 border border-brand-sage group"
      >
        <div className="bg-white p-2 rounded-xl text-brand-ink shadow-sm group-hover:shadow-md transition-all">
          <Plus className="w-6 h-6" />
        </div>
        <div>
          <p className="font-display font-semibold text-lg leading-tight text-brand-ink">Add<br/>Product</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Manual Entry</p>
        </div>
      </motion.button>
    </div>
  );
}
