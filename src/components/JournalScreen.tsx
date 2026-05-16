import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Calendar, Tag, ChevronRight, Maximize2, Columns, Sparkles, Plus, Image as ImageIcon, X, MapPin } from 'lucide-react';
import { JournalEntry } from '../types';

interface JournalScreenProps {
  entries: JournalEntry[];
  onAddClick: () => void;
  onCompareClick: () => void;
  onEntryClick: (entry: JournalEntry) => void;
}

export function JournalScreen({ entries, onAddClick, onCompareClick, onEntryClick }: JournalScreenProps) {
  const [filter, setFilter] = useState<string>('All');
  const allTags = Array.from(new Set(entries.flatMap(e => e.tags)));

  const filteredEntries = filter === 'All' 
    ? entries 
    : entries.filter(e => e.tags.includes(filter));

  return (
    <div className="pb-12 space-y-8">
      {/* Header */}
      <section className="pt-4 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-3xl leading-tight text-brand-ink">
            Progress <span className="text-brand-peach">Journal</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Lacak perjalanan glowing-mu ✨</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onCompareClick}
            className="w-12 h-12 bg-white border border-gray-100 text-brand-ink rounded-2xl shadow-sm flex items-center justify-center active:scale-95 transition-transform"
          >
            <Columns className="w-5 h-5" />
          </button>
          <button 
            onClick={onAddClick}
            className="w-12 h-12 bg-brand-ink text-white rounded-2xl shadow-xl flex items-center justify-center active:scale-95 transition-transform"
          >
            <Camera className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', ...allTags].map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
              filter === tag 
                ? 'bg-brand-ink text-white border-brand-ink shadow-lg shadow-brand-ink/20' 
                : 'bg-white text-gray-400 border-gray-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredEntries.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onEntryClick(entry)}
            className="group relative bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm cursor-pointer active:scale-95 transition-transform"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={entry.imageUrl} 
                alt={entry.date} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="absolute top-3 left-3 flex gap-1">
               {entry.tags.slice(0, 1).map(tag => (
                 <span key={tag} className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[8px] font-black uppercase text-brand-ink shadow-sm">
                   {tag}
                 </span>
               ))}
            </div>

            <div className="absolute bottom-4 left-4 right-4">
               <div className="flex items-center gap-1.5 text-white mb-1">
                  <Calendar className="w-3 h-3 opacity-60" />
                  <span className="text-[9px] font-black uppercase tracking-widest">
                    {new Date(entry.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </span>
               </div>
               <p className="text-[10px] text-white/80 font-medium truncate italic leading-tight">"{entry.note}"</p>
            </div>

            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-8 h-8 bg-brand-peach rounded-xl flex items-center justify-center text-brand-ink shadow-lg">
                  <Maximize2 className="w-4 h-4" />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEntries.length === 0 && (
        <div className="py-20 text-center flex flex-col items-center justify-center px-8">
           <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-200 mb-6">
              <ImageIcon className="w-10 h-10" />
           </div>
           <h3 className="font-display font-bold text-xl text-brand-ink">Mulai Jurnal Kamu</h3>
           <p className="text-sm text-gray-400 mt-2 leading-relaxed">
             Foto wajah hari ini untuk melihat perubahan kulit kamu secara nyata dalam beberapa minggu.
           </p>
           <button 
            onClick={onAddClick}
            className="mt-8 bg-brand-peach text-brand-ink px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-peach/20 active:scale-95 transition-all"
           >
             Ambil Foto Sekarang ✨
           </button>
        </div>
      )}

      {/* Pro Tip Card */}
      <div className="bg-brand-sage/10 p-6 rounded-[32px] border border-brand-sage/20 relative overflow-hidden">
         <Sparkles className="absolute -top-2 -right-2 w-12 h-12 text-brand-sage/20" />
         <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-sage text-white rounded-xl">
               <Tag className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-brand-ink">GlowBot Tip!</h4>
         </div>
         <p className="text-xs text-gray-600 leading-relaxed">
           "Selalu foto di pencahayaan yang sama (misal: deket jendela di pagi hari) biar progresnya keliatan jelas ya, bestie! ✨"
         </p>
      </div>
    </div>
  );
}
