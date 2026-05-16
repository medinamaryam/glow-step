import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Heart, Image as ImageIcon, Plus, Crown, Quote, Camera } from 'lucide-react';
import { Review, AppTestimonial } from '../types';

interface CommunityScreenProps {
  products: any[];
  user: any;
}

const MOCK_TESTIMONIALS: AppTestimonial[] = [
  { id: 't1', userName: 'Anisa R.', rating: 5, comment: 'Gila sih, fitur Safety Alert-nya bener-bener ngebantu banget buat aku yang suka asal campur skincare. Sekarang kulit ga pernah iritasi lagi! ✨', date: '2026-05-01' },
  { id: 't2', userName: 'Budi S.', rating: 4, comment: 'Puas banget pake Premium! Barcode scanner-nya cepet bangett, ga perlu capek ngetik bahan satu-satu.', date: '2026-05-05' },
];

const MOCK_REVIEWS: Review[] = [
  { 
    id: 'rev1', 
    userId: 'u1', 
    userName: 'Citra Kirana', 
    productId: 'p1', 
    productName: 'Niacinamide Serum', 
    rating: 5, 
    comment: 'Setelah rutin pake ini bareng GlowStep, bekas jerawatt pudar banget dalam 2 minggu! My holy grail combination. 😍', 
    imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=400',
    date: '2026-05-08',
    likes: 24
  },
  { 
    id: 'rev2', 
    userId: 'u2', 
    userName: 'Dimas Anggara', 
    productId: 'p2', 
    productName: 'Hydro Boost Gel', 
    rating: 4, 
    comment: 'Lembap banget di kulit berminyak, ga bikin greasy. Pencatatan di Expiry Guard ngebantu banget biar ga telat ganti produk.', 
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400',
    date: '2026-05-09',
    likes: 12
  }
];

export function CommunityScreen({ products, user }: CommunityScreenProps) {
  const [activeTab, setActiveTab] = useState<'app' | 'products'>('app');
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="pb-12 space-y-8">
      {/* Community Header */}
      <section className="pt-4">
        <h2 className="font-display font-bold text-3xl leading-tight text-brand-ink">
          Honest <span className="text-brand-peach">Reviews</span>
        </h2>
        <p className="text-gray-500 text-sm mt-1">Dengerin apa kata GlowUp community ✨</p>
      </section>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-2xl">
        <button 
          onClick={() => setActiveTab('app')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all ${activeTab === 'app' ? 'bg-white text-brand-ink shadow-sm' : 'text-gray-400'}`}
        >
          GlowStep Premium
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all ${activeTab === 'products' ? 'bg-white text-brand-ink shadow-sm' : 'text-gray-400'}`}
        >
          Product Experience
        </button>
      </div>

      {activeTab === 'app' ? (
        <div className="space-y-6">
          <div className="bg-brand-ink text-white p-6 rounded-[32px] shadow-xl relative overflow-hidden">
            <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/10" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                 <div className="p-2 bg-amber-400 rounded-lg text-brand-ink">
                   <Crown className="w-4 h-4" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">User Satisfaction</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Kenapa Mahasiswa Pake Premium?</h3>
              <p className="text-xs text-white/70 leading-relaxed">Bergabunglah dengan ribuan mahasiswa lainnya yang sudah mengamankan skin barrier mereka dengan GlowStep AI.</p>
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2">
                     <span className="text-xs font-bold text-brand-ink">{t.userName}</span>
                     <span className="text-[10px] text-gray-400">• Verified Student</span>
                   </div>
                   <div className="flex gap-0.5">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                     ))}
                   </div>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">"{t.comment}"</p>
                <p className="mt-3 text-[10px] text-gray-300 font-bold uppercase tracking-widest">{new Date(t.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
              </motion.div>
            ))}
          </div>

          <button className="w-full bg-brand-peach/10 text-brand-peach py-4 rounded-3xl font-bold text-xs uppercase tracking-widest border border-brand-peach/20 hover:bg-brand-peach/20 transition-all">
             Bagikan Testimonimu
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{MOCK_REVIEWS.length} Social Reviews</p>
            <button 
              onClick={() => setShowReviewForm(true)}
              className="flex items-center gap-2 bg-brand-ink text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest"
            >
              <Plus className="w-4 h-4" /> Post Review
            </button>
          </div>

          <div className="space-y-6">
            {MOCK_REVIEWS.map((rev, i) => (
              <motion.div 
                key={rev.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-peach/20 flex items-center justify-center text-[10px] font-bold text-brand-peach">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-brand-ink">{rev.userName}</p>
                         <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Using {rev.productName}</p>
                      </div>
                   </div>
                   <div className="flex gap-0.5">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} className={`w-2.5 h-2.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                     ))}
                   </div>
                </div>

                <div className="aspect-[4/3] bg-gray-50 relative group">
                   <img src={rev.imageUrl} alt="Review" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-5">
                   <p className="text-sm text-gray-700 leading-relaxed font-medium mb-4">
                     {rev.comment}
                   </p>
                   <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-brand-ink">
                         <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                         <span className="text-[10px] font-black">{rev.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400">
                         <MessageSquare className="w-5 h-5" />
                         <span className="text-[10px] font-black">4 Comments</span>
                      </button>
                      <div className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">
                        {new Date(rev.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Basic Review Form Modal (Simplified) */}
      <AnimatePresence>
        {showReviewForm && (
           <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewForm(false)}
              className="fixed inset-0 bg-brand-ink/80 backdrop-blur-md z-[300]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] p-8 z-[301] shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display font-bold text-xl">Honest Review Baru</h3>
                <button onClick={() => setShowReviewForm(false)} className="p-2 bg-gray-50 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                 <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2 block mb-2">Pilih Produk</label>
                   <select className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 text-sm outline-none focus:border-brand-peach/30 transition-colors">
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.brand} - {p.name}</option>
                      ))}
                   </select>
                 </div>

                 <div className="flex justify-center gap-2">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} className="p-2">
                         <Star className="w-8 h-8 text-amber-400" />
                      </button>
                    ))}
                 </div>

                 <div className="aspect-video bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 group hover:border-brand-peach/30 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Upload Foto Hasil (Before/After)</span>
                 </div>

                 <textarea 
                  className="w-full p-6 bg-gray-50 rounded-[32px] border border-gray-100 text-sm outline-none focus:border-brand-peach/30 transition-colors min-h-[120px]"
                  placeholder="Gimana rasanya pake produk ini? Sharing dong ke temen-temen GlowUp!"
                 />

                 <button 
                  onClick={() => setShowReviewForm(false)}
                  className="w-full bg-brand-ink text-white py-4 rounded-3xl font-bold shadow-xl active:scale-95 transition-all"
                 >
                   Posting Sekarang ✨
                 </button>
              </div>
            </motion.div>
           </>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  );
}
