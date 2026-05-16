import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Star, Zap, ArrowLeft, Crown, Flame, Info, ShoppingCart } from 'lucide-react';
import { ExpiryWidget } from './components/ExpiryWidget';
import { RoutineWidget } from './components/RoutineWidget';
import { QuickActions } from './components/QuickActions';
import { SafetyAlert } from './components/SafetyAlert';
import { JournalWidget } from './components/JournalWidget';
import { AddProductModal } from './components/AddProductModal';
import { ScanModal } from './components/ScanModal';
import { SafetyWarningModal } from './components/SafetyWarningModal';
import { PremiumModal } from './components/AddPremiumModal';
import { WikiModal } from './components/WikiModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthScreen } from './components/AuthScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { JournalComparator } from './components/JournalComparator';
import { AdminDashboard } from './components/AdminDashboard';
import { GlowBot } from './components/GlowBot';
import { CommunityScreen } from './components/CommunityScreen';
import { PromoScreen } from './components/PromoScreen';
import { ShelfScreen } from './components/ShelfScreen';
import { JournalScreen } from './components/JournalScreen';
import { AddJournalModal } from './components/AddJournalModal';
import { NotificationCenter } from './components/NotificationCenter';
import { Product, RoutineItem, Screen, User, JournalEntry, AppNotification } from './types';
import { checkIngredientConflicts, IngredientConflict } from './services/safetyService';
import { getIngredientInfo, IngredientInfo } from './services/wikiService';
import { findExpiringProducts } from './services/expiryService';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Niacinamide Serum', brand: 'The Ordinary', category: 'Serum', openedDate: '2026-02-06', paoMonths: 3, remainingPercent: 45, ingredients: ['Niacinamide', 'Zinc'], buyLink: 'https://shopee.co.id/The-Ordinary-Niacinamide-10-Zinc-1-30ml-i.51862547.795034608' },
  { id: '2', name: 'Hydro Boost Gel', brand: 'Neutrogena', category: 'Moisturizer', openedDate: '2026-04-15', paoMonths: 1, remainingPercent: 82, ingredients: ['Hyaluronic Acid'], buyLink: 'https://www.tokopedia.com/search?st=product&q=neutrogena%20hydro%20boost' },
  { id: '3', name: 'SPF 50+ Sunscreen', brand: 'Beauty of Joseon', category: 'Sunscreen', openedDate: '2026-01-01', paoMonths: 12, remainingPercent: 12, ingredients: ['Propolis', 'SPF'], buyLink: 'https://shopee.co.id/search?keyword=beauty%20of%20joseon%20sunscreen' },
  { id: '4', name: 'Retinol 0.5% in Squalane', brand: 'The Ordinary', category: 'Serum', openedDate: '2026-03-01', paoMonths: 6, remainingPercent: 30, ingredients: ['Retinol', 'Squalane'], buyLink: 'https://shopee.co.id/search?keyword=the%20ordinary%20retinol' },
  { id: '5', name: 'Vitamin C Suspension', brand: 'The Ordinary', category: 'Serum', openedDate: '2026-03-01', paoMonths: 6, remainingPercent: 65, ingredients: ['Vitamin C', 'Silicones'], buyLink: 'https://shopee.co.id/search?keyword=the%20ordinary%20vitamin%20c' },
];

const MOCK_ROUTINE: RoutineItem[] = [
  { id: 'r1', productId: '1', productName: 'Gentle Cleanser', time: 'morning', order: 1, isDone: true },
  { id: 'r2', productId: '2', productName: 'Niacinamide Serum', time: 'morning', order: 2, isDone: true },
  { id: 'r3', productId: '3', productName: 'Moisturizer', time: 'morning', order: 3, isDone: false },
  { id: 'r4', productId: '4', productName: 'SPF 50+', time: 'morning', order: 4, isDone: false },
  { id: 'r5', productId: '1', productName: 'Oil Cleanser', time: 'night', order: 1, isDone: false },
  { id: 'r6', productId: '4', productName: 'Retinol 0.5%', time: 'night', order: 2, isDone: false },
  { id: 'r7', productId: '5', productName: 'Vitamin C', time: 'night', order: 3, isDone: false },
];

const MOCK_JOURNAL: JournalEntry[] = [
  { id: 'j1', date: '2026-04-01', imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=400', tags: ['Breakout', 'Kusam'], note: 'Mulai pake Niacinamide hari ini.' },
  { id: 'j2', date: '2026-04-15', imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=400', tags: ['Glow'], note: 'Kulit kerasa makin lembap!' },
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientInfo | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeConflicts, setActiveConflicts] = useState<IngredientConflict[]>([]);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [routine, setRoutine] = useState<RoutineItem[]>(MOCK_ROUTINE);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(MOCK_JOURNAL);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    { id: 'n1', title: 'Rutinitas Pagi', message: 'Waktunya rutinitas pagi! Jangan lupa sunscreen ya ☀️', type: 'routine', date: new Date().toISOString(), isRead: false },
    { id: 'n2', title: 'GlowBot Tips', message: 'GlowBot punya tips baru untuk kulit berminyakmu. Coba cek bahan Salicylic Acid!', type: 'tip', date: new Date().toISOString(), isRead: true }
  ]);
  const [reminder, setReminder] = useState<string | null>(null);

  // Expiry Guard
  useEffect(() => {
    if (user) {
      const expiring = findExpiringProducts(products);
      if (expiring.length > 0) {
        const first = expiring[0];
        const expiryMsg = `${first.name} akan basi dalam ${first.status.daysLeft} hari!`;
        
        // Add to notifications if not already there today
        const hasNotification = notifications.some(n => n.message.includes(first.name) && n.type === 'expiry');
        if (!hasNotification) {
          const newNotif: AppNotification = {
            id: `expiry-${first.id}-${Date.now()}`,
            title: 'Expiry Warning ⚠️',
            message: `Produk ${first.brand} ${first.name} akan kedaluwarsa dalam ${first.status.daysLeft} hari!`,
            type: 'expiry',
            date: new Date().toISOString(),
            isRead: false
          };
          setNotifications(prev => [newNotif, ...prev]);
        }

        setTimeout(() => {
          showReminder(`EXPIRY GUARD: ${expiryMsg}`);
        }, 1500);
      }
    }
  }, [user, products]);

  const morningIngredients = routine
    .filter(i => i.time === 'morning')
    .map(i => products.find(p => p.id === i.productId)?.ingredients || []);
  
  const nightIngredients = routine
    .filter(i => i.time === 'night')
    .map(i => products.find(p => p.id === i.productId)?.ingredients || []);
  
  const morningConflicts = checkIngredientConflicts(morningIngredients);
  const nightConflicts = checkIngredientConflicts(nightIngredients);
  const allConflicts = [...morningConflicts, ...nightConflicts];

  const handleToggleRoutine = (id: string) => {
    const item = routine.find(r => r.id === id);
    if (!item || item.isDone) return;

    // Update routine state
    setRoutine(prev => prev.map(r => r.id === id ? { ...r, isDone: true } : r));
    
    // Update Inventory
    setProducts(prev => prev.map(p => {
      if (p.id === item.productId) {
        const newRemaining = Math.max(0, p.remainingPercent - 1);
        if (newRemaining <= 10) showReminder(`STOK LIMIT: ${p.name} sisa ${newRemaining}%, waktunya beli lagi!`);
        return { ...p, remainingPercent: newRemaining };
      }
      return p;
    }));

    // Update Streak
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      if (user.lastActiveDate !== today) {
        setUser({
          ...user,
          streakCount: (user.streakCount || 0) + 1,
          lastActiveDate: today
        });
        showReminder(`STREAK BOOST! 🔥 Hari ke-${(user.streakCount || 0) + 1} konsisten.`);
      }
    }
  };

  const handleAddProduct = (newProduct: any) => {
    const currentIngredients = products.map(p => (p.ingredients || []));
    const newConflicts = checkIngredientConflicts([...currentIngredients, newProduct.ingredients]);
    
    if (newConflicts.length > 0) {
      setActiveConflicts(newConflicts);
      setIsSafetyModalOpen(true);
    }
    
    setProducts([...products, { ...newProduct, id: Math.random().toString(), remainingPercent: 100 }]);
    showReminder(`Product "${newProduct.name}" ditambahkan!`);
  };

  const showReminder = (msg: string) => {
    setReminder(msg);
    setTimeout(() => setReminder(null), 4000);
  };

  if (!user) {
    return <AuthScreen onLogin={(u) => setUser({ ...u, streakCount: 5, lastActiveDate: '2026-05-09' })} />;
  }

  return (
    <div className="min-h-screen bg-brand-cream font-sans">
      <div className="mobile-container overflow-y-auto pb-24 shadow-2xl min-h-screen relative bg-white">
        <AnimatePresence>
          {reminder && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 20, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="fixed top-0 left-1/2 -translate-x-1/2 bg-brand-ink text-white px-6 py-3 rounded-full z-[200] shadow-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 whitespace-nowrap"
            >
              <Zap className="w-4 h-4 text-brand-peach" />
              {reminder}
            </motion.div>
          )}
        </AnimatePresence>

        <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-3">
            {activeScreen !== 'dashboard' && (
              <button 
                onClick={() => setActiveScreen('dashboard')}
                className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
            )}
            <button 
              onClick={() => setActiveScreen('profile')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left"
            >
              <div className="w-10 h-10 bg-brand-ink rounded-2xl flex items-center justify-center text-white rotate-3 shadow-lg">
                <Star className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl tracking-tight text-brand-ink">GlowStep</h1>
                <p className="text-[9px] text-brand-peach font-bold mt-0.5">Smart & Safe Skincare ✨</p>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsPremiumModalOpen(true)}
              className={`p-2 rounded-xl transition-colors ${user.isPremium ? 'bg-amber-100 text-amber-600' : 'bg-amber-50 text-amber-400'}`}
            >
              <Crown className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsNotificationOpen(true)}
              className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-500" />
              {notifications.some(n => !n.isRead) && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-brand-peach rounded-full border-2 border-white" />
              )}
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeScreen === 'dashboard' && (
            <motion.main
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-6 space-y-8"
            >
              {/* Greeting & Streak */}
              <section className="pt-4 flex items-end justify-between">
                <div>
                  <h2 className="font-display font-bold text-3xl leading-tight text-brand-ink">
                    Hi, {user.name.split(' ')[0]}! <span className="text-brand-peach">✨</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Siap untuk rutinitas hari ini?</p>
                </div>
                <div className="bg-brand-peach/10 px-4 py-2 rounded-2xl flex items-center gap-2 border border-brand-peach/20">
                  <Flame className="w-5 h-5 text-brand-peach fill-brand-peach/20" />
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter leading-none">Streaks</p>
                    <p className="text-lg font-black text-brand-peach leading-none">{user.streakCount} Hari</p>
                  </div>
                </div>
              </section>

              {/* Quick Actions */}
              <QuickActions 
                onScanClick={user.isPremium ? () => setIsScanModalOpen(true) : () => setIsPremiumModalOpen(true)}
                onAddClick={() => setIsAddModalOpen(true)}
                isPremium={user.isPremium}
              />

              {/* Journal Widget */}
              <JournalWidget onCameraClick={() => setIsJournalModalOpen(true)} />

              {/* Inventory Summary (Quick View) */}
              <section className="bg-gray-50 rounded-[32px] p-6">
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="font-display font-semibold text-lg text-brand-ink">Inventory Monitor</h3>
                   <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                     <Info className="w-3 h-3" /> Real-time
                   </div>
                 </div>
                 <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                    {products.filter(p => p.remainingPercent < 50).map(p => (
                      <div key={p.id} className="min-w-[120px] bg-white p-3 rounded-2xl shadow-sm border border-gray-100 shrink-0">
                        <p className="text-[10px] font-bold text-brand-ink truncate">{p.name}</p>
                        <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${p.remainingPercent < 20 ? 'bg-red-400' : 'bg-brand-sage'}`} 
                            style={{ width: `${p.remainingPercent}%` }} 
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-[10px] font-bold text-gray-400">{p.remainingPercent}%</p>
                          {p.remainingPercent < 15 && (
                            <a href={p.buyLink} target="_blank" rel="noreferrer" className="text-brand-peach">
                               <ShoppingCart className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                 </div>
              </section>

              <SafetyAlert 
                conflicts={allConflicts} 
                onIngredientClick={(name) => setSelectedIngredient(getIngredientInfo(name))}
                isPremium={user.isPremium}
                onLockedClick={() => setIsPremiumModalOpen(true)}
              />

              <ExpiryWidget 
                products={products} 
                onProductClick={user.isPremium ? (p) => setSelectedProduct(p) : () => setIsPremiumModalOpen(true)}
                isPremium={user.isPremium}
              />

              {/* Routine Widgets */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-xl text-brand-ink">Jadwal Hari Ini</h3>
                  <button className="text-xs font-bold text-brand-ink/40 uppercase tracking-widest hover:text-brand-ink">Lihat Semua</button>
                </div>
                <div className="space-y-4 pb-4">
                  <RoutineWidget items={routine} type="morning" onToggle={handleToggleRoutine} />
                  <RoutineWidget items={routine} type="night" onToggle={handleToggleRoutine} />
                </div>
              </section>
            </motion.main>
          )}

          {activeScreen === 'profile' && (
            <motion.main
              key="profile"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="px-6 pt-6"
            >
              <ProfileScreen 
                user={user} 
                onLogout={() => setUser(null)}
                onUpgradeClick={() => setIsPremiumModalOpen(true)}
                onAdminClick={() => setActiveScreen('admin')}
                onPromoClick={() => setActiveScreen('promo')}
              />
            </motion.main>
          )}

          {activeScreen === 'admin' && (
            <motion.main
              key="admin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 pt-6"
            >
              <AdminDashboard onBack={() => setActiveScreen('profile')} />
            </motion.main>
          )}

          {activeScreen === 'promo' && (
            <motion.main
              key="promo"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 pt-6"
            >
              <PromoScreen onBack={() => setActiveScreen('profile')} user={user} />
            </motion.main>
          )}

          {activeScreen === 'community' && (
            <motion.main
              key="community"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 pt-6"
            >
              <CommunityScreen products={products} user={user} />
            </motion.main>
          )}

          {activeScreen === 'shelf' && (
            <motion.main
              key="shelf"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 pt-6"
            >
              <ShelfScreen 
                products={products} 
                user={user}
                onAddClick={() => setIsAddModalOpen(true)}
                onProductClick={(p) => setSelectedProduct(p)}
              />
            </motion.main>
          )}

          {activeScreen === 'journal' && (
            <motion.main
              key="journal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 pt-6"
            >
              <JournalScreen 
                entries={journalEntries} 
                onAddClick={() => setIsJournalModalOpen(true)}
                onCompareClick={() => setIsComparatorOpen(true)}
                onEntryClick={(e) => console.log('View entry', e)}
              />
            </motion.main>
          )}

          {activeScreen === 'routine' && (
            <motion.main
              key="routine"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 pt-6"
            >
               <section className="pt-4 space-y-8">
                <div>
                  <h2 className="font-display font-bold text-3xl leading-tight text-brand-ink">
                    Routine <span className="text-brand-peach">Manager</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Atur urutan skincare-mu ✨</p>
                </div>
                
                <div className="space-y-6">
                  <RoutineWidget items={routine} type="morning" onToggle={handleToggleRoutine} />
                  <RoutineWidget items={routine} type="night" onToggle={handleToggleRoutine} />
                </div>
              </section>
            </motion.main>
          )}

          {activeScreen !== 'dashboard' && activeScreen !== 'profile' && activeScreen !== 'admin' && activeScreen !== 'community' && activeScreen !== 'promo' && activeScreen !== 'shelf' && activeScreen !== 'journal' && activeScreen !== 'routine' && (
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 pt-10"
            >
              <div className="bg-gray-50 rounded-[40px] p-10 text-center border-2 border-dashed border-gray-200">
                <h2 className="font-display font-bold text-2xl text-gray-400 capitalize">{activeScreen}</h2>
                <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                  Halaman ini masih dalam tahap pengembangan.<br/>
                  Nantikan di update selanjutnya! 🚀
                </p>
                <button 
                  onClick={() => setActiveScreen('dashboard')}
                  className="mt-8 bg-brand-ink text-white px-8 py-3 rounded-2xl font-bold text-sm tracking-wide"
                >
                  Kembali ke Beranda
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </div>

      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={handleAddProduct}
      />
      <ScanModal 
        isOpen={isScanModalOpen} 
        onClose={() => setIsScanModalOpen(false)} 
        onScan={(data) => {
          handleAddProduct(data);
          setIsScanModalOpen(false);
        }}
      />
      <SafetyWarningModal 
        isOpen={isSafetyModalOpen} 
        onClose={() => setIsSafetyModalOpen(false)} 
        conflicts={activeConflicts}
      />
      <PremiumModal 
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        onSuccess={() => {
          if (user) setUser({ ...user, isPremium: true });
          setIsPremiumModalOpen(false);
          showReminder('UPGRADE BERHASIL! Selamat berkulit sehat Premium ✨');
        }}
      />
      <WikiModal 
        ingredient={selectedIngredient}
        onClose={() => setSelectedIngredient(null)}
      />
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onIngredientClick={(name) => {
          setSelectedProduct(null);
          setTimeout(() => setSelectedIngredient(getIngredientInfo(name)), 300);
        }}
      />
      <JournalComparator 
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
        entries={journalEntries}
      />
      <AddJournalModal 
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        onSave={(data) => {
          setJournalEntries([...journalEntries, { ...data, id: Math.random().toString() }]);
          showReminder('Journal entry saved! Keep it up ✨');
        }}
      />
      <NotificationCenter 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))}
        onClearAll={() => setNotifications([])}
      />
      <GlowBot user={user} />
    </div>
  );
}
