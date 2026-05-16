import { motion } from 'motion/react';
import { Clock, AlertTriangle, BellRing, Lock } from 'lucide-react';
import { Product } from '../types';
import { getExpiryStatus } from '../services/expiryService';

interface ExpiryWidgetProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  isPremium?: boolean;
}

export function ExpiryWidget({ products, onProductClick, isPremium }: ExpiryWidgetProps) {
  const expiringSoon = products
    .map(p => ({ ...p, status: getExpiryStatus(p.openedDate, p.paoMonths) }))
    .sort((a, b) => a.status.daysLeft - b.status.daysLeft)
    .slice(0, 2);

  return (
    <div className="bg-brand-peach/30 rounded-3xl p-6 border border-brand-peach/50 relative overflow-hidden">
      {/* Decorative Guard Icon */}
      <BellRing className="absolute -top-4 -right-4 w-24 h-24 text-brand-peach/10 -rotate-12" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="font-display font-semibold text-lg flex items-center gap-2 text-brand-ink">
          <Clock className="w-5 h-5 text-red-500" />
          Expiry Guard
        </h3>
        {!isPremium && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            <Lock className="w-3 h-3" />
            Premium
          </span>
        )}
      </div>
      
      <div className="space-y-4 relative z-10">
        {expiringSoon.map((product) => (
          <motion.div 
            key={product.id}
            onClick={() => onProductClick(product as Product)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 bg-white/80 p-3 rounded-2xl shadow-sm border border-brand-peach/20 cursor-pointer relative"
          >
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-inner">
              {product.imageUrl || '🧴'}
            </div>
            <div className={`flex-1 ${!isPremium ? 'blur-[3px]' : ''}`}>
              <p className="text-sm font-bold truncate text-brand-ink">{product.name}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.brand}</p>
            </div>
            <div className={`text-right ${!isPremium ? 'blur-[3px]' : ''}`}>
              <p className={`text-sm font-black ${product.status.daysLeft <= 7 ? 'text-red-500' : 'text-orange-500'}`}>
                {product.status.daysLeft <= 0 ? 'EXPIRED' : `${product.status.daysLeft}d left`}
              </p>
              <div className="flex items-center justify-end gap-1">
                <AlertTriangle className={`w-2.5 h-2.5 ${product.status.daysLeft <= 7 ? 'text-red-500' : 'text-orange-400'}`} />
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">PAO {product.paoMonths}M</p>
              </div>
            </div>
            {!isPremium && (
               <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px] rounded-2xl">
                 <div className="bg-brand-ink/80 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    Unlock Detail
                 </div>
               </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
