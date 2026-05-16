import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Calendar, ShieldCheck, Sparkles, AlertCircle, Star } from 'lucide-react';
import { Product } from '../types';
import { getExpiryStatus } from '../services/expiryService';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onIngredientClick: (name: string) => void;
}

export function ProductDetailModal({ product, onClose, onIngredientClick }: ProductDetailModalProps) {
  if (!product) return null;

  const status = getExpiryStatus(product.openedDate, product.paoMonths);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] z-[201] shadow-2xl h-[90vh] flex flex-col"
          >
            {/* Header / Image Area */}
            <div className="relative h-64 bg-gray-50 rounded-t-[40px] overflow-hidden">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-black/20 backdrop-blur-md text-white rounded-full z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full h-full flex items-center justify-center text-8xl">
                {product.imageUrl || '🧴'}
              </div>
              
              <div className="absolute bottom-6 left-6">
                <span className="bg-brand-peach text-brand-ink text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  {product.category || 'Skincare'}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
              <div>
                <h2 className="font-display font-bold text-3xl text-brand-ink">{product.name}</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">{product.brand}</p>
              </div>

              {/* Status Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Opened At</span>
                  </div>
                  <p className="text-sm font-bold text-brand-ink">{new Date(product.openedDate).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <AlertCircle className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Sisa Masa PAO</span>
                  </div>
                  <p className={`text-sm font-bold ${status.daysLeft <= 30 ? 'text-orange-500' : 'text-brand-ink'}`}>
                    {status.daysLeft <= 0 ? 'Sudah Basi' : `${status.daysLeft} Hari Lagi`}
                  </p>
                </div>
              </div>

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-sage" />
                    <h3 className="font-display font-bold text-lg">Bahan Aktif</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map(ing => (
                      <button
                        key={ing}
                        onClick={() => onIngredientClick(ing)}
                        className="bg-brand-sage/10 text-brand-sage text-[10px] font-bold px-3 py-1.5 rounded-full uppercase flex items-center gap-1 hover:bg-brand-sage/20 transition-colors active:scale-95 border border-brand-sage/20"
                      >
                        {ing}
                        <Sparkles className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 italic">Tap bahan di atas untuk melihat detail fungsinya di Wiki.</p>
                </div>
              )}

              {/* Recommendation / Desc */}
              <div className="bg-brand-cream rounded-3xl p-6">
                 <p className="text-sm text-brand-ink leading-relaxed">
                  Poduk ini sangat bagus untuk menjaga hidrasi kulitmu selama rutinitas {product.category === 'SPF' ? 'pagi' : 'malam'} hari. Pastikan selalu bersih sebelum aplikasi!
                 </p>
              </div>

              {/* User Reviews */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg">Ulasan Pengguna</h3>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-xs font-bold">4.8 (120+)</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                   <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-brand-ink">Sarah K. (Dry Skin)</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-2 h-2 fill-amber-400 text-amber-400" />)}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight italic">"Suka banget teksturnya! Ga bikin kulit ketarik sama sekali."</p>
                   </div>
                   <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-brand-ink">Kevin J. (Oily Skin)</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-2 h-2 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />)}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight italic">"Lembap telat di aku, tapi overall oke banget buat daily."</p>
                   </div>
                </div>

                <button className="w-full py-3 bg-gray-50 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brand-ink transition-colors">
                  Lihat Selengkapnya
                </button>
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="p-8 border-t border-gray-100 bg-white">
              <a 
                href={product.buyLink || 'https://shopee.co.id'} 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-brand-ink text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                Beli Lagi di Shopee/Tokopedia
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
