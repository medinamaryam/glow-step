import { motion } from 'motion/react';
import { Plus, ShoppingBag, AlertCircle, CheckCircle2, FlaskRound as Flask, Calendar, MoreVertical, ShoppingCart, Zap } from 'lucide-react';
import { Product, User } from '../types';
import { getExpiryStatus } from '../services/expiryService';

interface ShelfScreenProps {
  products: Product[];
  user: User;
  onAddClick: () => void;
  onProductClick: (product: Product) => void;
}

const RECOMMENDED_BRANDS = {
  'Sensitif': [
    { brand: 'Avène', name: 'Thermal Spring Water', desc: 'Menenangkan kulit kemerahan.', price: 'Rp 180.000', imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=200' },
    { brand: 'La Roche-Posay', name: 'Cicaplast Baume B5', desc: 'Memperbaiki skin barrier.', price: 'Rp 210.000', imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=200' },
  ],
  'Berminyak': [
    { brand: 'COSRX', name: 'Low pH Good Morning Cleanser', desc: 'Kontrol minyak tanpa bikin kering.', price: 'Rp 120.000', imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=200' },
    { brand: 'Somethinc', name: 'Niacinamide + Moisture Sabi Beet', desc: 'Cerahkan & kecilkan pori-pori.', price: 'Rp 115.000', imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b73e5c074?auto=format&fit=crop&q=80&w=200' },
  ],
  'Kering': [
    { brand: 'Hada Labo', name: 'Gokujyun Premium Lotion', desc: 'Hidrasi mendalam 7 lapis.', price: 'Rp 145.000', imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200' },
    { brand: 'Skintific', name: '5X Ceramide Barrier Repair', desc: 'Lembap seharian penuh.', price: 'Rp 135.000', imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=200' },
  ],
  'Kombinasi': [
    { brand: 'Kiehl\'s', name: 'Ultra Facial Cream', desc: 'Keseimbangan hidrasi area T & U.', price: 'Rp 520.000', imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=200' },
    { brand: 'Laneige', name: 'Water Bank Blue Hyaluronic', desc: 'Tekstur gel yang ringan.', price: 'Rp 450.000', imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200' },
  ],
};

export function ShelfScreen({ products, user, onAddClick, onProductClick }: ShelfScreenProps) {
  const recommendations = RECOMMENDED_BRANDS[user.skinType] || [];
  return (
    <div className="pb-12 space-y-8">
      {/* Header */}
      <section className="pt-4 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-3xl leading-tight text-brand-ink">
            My <span className="text-brand-peach">Inventory</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Kelola stok skincare kamu ✨</p>
        </div>
        <button 
          onClick={onAddClick}
          className="w-12 h-12 bg-brand-ink text-white rounded-2xl shadow-xl flex items-center justify-center active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      </section>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: products.length, color: 'bg-blue-50 text-blue-600' },
          { label: 'Aman', value: products.filter(p => getExpiryStatus(p.openedDate, p.paoMonths).isExpired === false).length, color: 'bg-green-50 text-green-600' },
          { label: 'Basi', value: products.filter(p => getExpiryStatus(p.openedDate, p.paoMonths).isExpired === true).length, color: 'bg-red-50 text-red-600' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} p-4 rounded-3xl text-center border border-current/10`}>
             <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">{stat.label}</p>
             <p className="text-xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Brand Recommendations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-brand-ink">Rekomendasi Brand</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-peach">Berdasarkan Kulit {user.skinType} ✨</p>
          </div>
          <Zap className="w-5 h-5 text-brand-peach fill-brand-peach/20" />
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
          {recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[240px] bg-brand-ink text-white p-5 rounded-[32px] shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-peach mb-1">{rec.brand}</p>
                <h4 className="font-display font-bold text-sm mb-3 leading-tight truncate">{rec.name}</h4>
                <p className="text-[10px] text-white/60 mb-4 leading-relaxed line-clamp-2">{rec.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                   <span className="text-xs font-black">{rec.price}</span>
                   <button className="bg-white/10 hover:bg-white/20 p-2 rounded-xl border border-white/10 transition-colors">
                      <ShoppingCart className="w-4 h-4 text-brand-peach" />
                   </button>
                </div>
              </div>
              <div 
                className="absolute right-0 top-0 w-24 h-full opacity-30 bg-cover bg-center"
                style={{ backgroundImage: `url(${rec.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-transparent" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product List */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Persediaan Saat Ini</h3>
        {products.map((product, i) => {
          const expiry = getExpiryStatus(product.openedDate, product.paoMonths);
          const isLow = product.remainingPercent < 20;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onProductClick(product)}
              className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex gap-4 group active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden relative shrink-0">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Flask className="w-8 h-8" />
                  </div>
                )}
                {expiry.isExpired && (
                  <div className="absolute inset-0 bg-red-500/20 backdrop-blur-[2px] flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-[10px] font-bold text-brand-peach uppercase tracking-tighter">{product.brand}</p>
                    <button className="p-1 text-gray-300 hover:text-gray-500">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-display font-bold text-sm text-brand-ink truncate leading-tight">{product.name}</h4>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Opened: {new Date(product.openedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 mt-3">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {expiry.isExpired ? (
                          <div className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase">
                            <AlertCircle className="w-2 h-2" /> Basi
                          </div>
                        ) : expiry.daysLeft < 30 ? (
                          <div className="flex items-center gap-1 bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase">
                            <AlertCircle className="w-2 h-2" /> Hampir Basi
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase">
                            <CheckCircle2 className="w-2 h-2" /> Aman
                          </div>
                        )}
                      </div>
                      <span className={`text-[9px] font-black ${isLow ? 'text-red-500' : 'text-brand-ink'}`}>{product.remainingPercent}% Left</span>
                   </div>
                   <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${product.remainingPercent}%` }}
                        className={`h-full ${isLow ? 'bg-red-400' : 'bg-brand-sage'}`} 
                      />
                   </div>
                </div>
              </div>

              {isLow && (
                <a 
                  href={product.buyLink} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-10 h-10 bg-brand-peach/20 text-brand-peach rounded-2xl flex items-center justify-center self-center hover:bg-brand-peach hover:text-white transition-all shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
