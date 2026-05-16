import { motion } from 'motion/react';
import { Sun, Moon, CheckCircle2, Circle } from 'lucide-react';
import { RoutineItem } from '../types';

interface RoutineWidgetProps {
  items: RoutineItem[];
  type: 'morning' | 'night';
  onToggle?: (id: string) => void;
}

export function RoutineWidget({ items, type, onToggle }: RoutineWidgetProps) {
  const filteredItems = items.filter(i => i.time === type).sort((a, b) => a.order - b.order);
  const Icon = type === 'morning' ? Sun : Moon;
  const bgColor = type === 'morning' ? 'bg-amber-50' : 'bg-indigo-50';
  const textColor = type === 'morning' ? 'text-amber-600' : 'text-indigo-600';

  return (
    <div className={`rounded-3xl p-6 ${bgColor} border border-transparent`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-white ${textColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg capitalize">{type} Routine</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
              {filteredItems.filter(i => i.isDone).length} / {filteredItems.length} Completed
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => onToggle?.(item.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full flex items-center justify-between bg-white/40 p-3 rounded-2xl backdrop-blur-sm group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 w-4">{index + 1}</span>
              <div className="text-left">
                <p className={`text-sm font-bold ${item.isDone ? 'text-gray-400 line-through' : 'text-brand-ink'}`}>
                  {item.productName}
                </p>
                {!item.isDone && (
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Tap to use (reduces 1%)</p>
                )}
              </div>
            </div>
            <div className={`${item.isDone ? textColor : 'text-gray-300'}`}>
              {item.isDone ? (
                <CheckCircle2 className="w-6 h-6 transition-transform active:scale-90" />
              ) : (
                <Circle className="w-6 h-6 transition-transform active:scale-90" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
