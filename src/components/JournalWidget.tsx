import { motion } from 'motion/react';
import { Camera, Calendar, ArrowRight } from 'lucide-react';

interface JournalWidgetProps {
  onCameraClick: () => void;
}

export function JournalWidget({ onCameraClick }: JournalWidgetProps) {
  return (
    <div className="bg-brand-sage/40 rounded-3xl p-6 border border-brand-sage">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-xl">Skin Journal</h3>
          <p className="text-xs text-gray-500">Track your skin's progress</p>
        </div>
        <button 
          onClick={onCameraClick}
          className="p-3 bg-brand-ink text-white rounded-2xl shadow-lg active:scale-95 transition-transform"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="aspect-square rounded-2xl bg-white border-2 border-white shadow-sm overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src={`https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=200`} 
              className="w-full h-full object-cover"
              alt="Skin progress"
            />
            <span className="absolute bottom-1 left-2 text-[8px] font-bold text-white opacity-0 group-hover:opacity-100 uppercase">Day {i}</span>
          </motion.div>
        ))}
        {/* Placeholder and CTA */}
        <button className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 hover:border-brand-ink hover:bg-white/50 transition-all">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase">Archive</span>
        </button>
      </div>

      <button className="w-full mt-6 py-3 bg-white/60 hover:bg-white rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
        Full Progression Chart
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}
