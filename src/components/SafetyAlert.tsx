import { motion } from 'motion/react';
import { AlertCircle, ShieldAlert, Sparkles, Lock, Crown } from 'lucide-react';
import { IngredientConflict } from '../services/safetyService';

interface SafetyAlertProps {
  conflicts: IngredientConflict[];
  onIngredientClick: (name: string) => void;
  isPremium?: boolean;
  onLockedClick?: () => void;
}

export function SafetyAlert({ conflicts, onIngredientClick, isPremium, onLockedClick }: SafetyAlertProps) {
  if (conflicts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, -4, 4, -4, 4, 0] // Shake animation
      }}
      transition={{ duration: 0.5 }}
      className="bg-red-600 border-4 border-red-200 rounded-[32px] p-6 space-y-4 relative overflow-hidden shadow-2xl shadow-red-200/50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-white">
          <div className="bg-white/20 p-2 rounded-xl animate-pulse">
            <ShieldAlert className="w-6 h-6 shrink-0" />
          </div>
          <div>
            <h3 className="font-display font-black text-xl leading-tight uppercase tracking-tighter">⚠️ Bahaya Interaksi!</h3>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">Segera Cek Rutinitasmu</p>
          </div>
        </div>
        {!isPremium && (
          <div className="bg-amber-400 text-brand-ink p-1.5 rounded-lg shadow-sm">
            <Lock className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className={`space-y-3 ${!isPremium ? 'blur-[4px] pointer-events-none select-none h-24 overflow-hidden' : ''}`}>
        {conflicts.map((conflict, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-lg border-l-8 border-red-600">
            <div className="flex flex-wrap gap-2 mb-3">
              {conflict.ingredients.map(ing => (
                <button 
                  key={ing} 
                  onClick={() => onIngredientClick(ing)}
                  className="bg-red-100 text-red-600 text-[10px] font-black px-3 py-1 rounded-full uppercase flex items-center gap-1 active:scale-95 transition-transform hover:bg-red-200"
                >
                  {ing}
                  <Sparkles className="w-2.5 h-2.5" />
                </button>
              ))}
            </div>
            <p className="text-sm text-brand-ink font-bold leading-relaxed">"{conflict.message}"</p>
          </div>
        ))}
      </div>

      {!isPremium && (
        <div 
          onClick={onLockedClick}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[2px] cursor-pointer group"
        >
          <div className="bg-brand-ink text-white p-4 rounded-[28px] shadow-2xl flex flex-col items-center gap-2 group-hover:scale-105 transition-transform">
             <div className="w-10 h-10 bg-amber-400 rounded-2xl flex items-center justify-center text-brand-ink mb-1">
                <Crown className="w-6 h-6" />
             </div>
             <p className="text-xs font-bold uppercase tracking-widest">Upgrade ke Premium</p>
             <p className="text-[10px] opacity-60 italic">Aktifkan Safety Alert otomatis</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
