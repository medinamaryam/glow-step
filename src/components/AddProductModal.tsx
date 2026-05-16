import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, AlertCircle } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
}

export function AddProductModal({ isOpen, onClose, onSave }: AddProductModalProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [pao, setPao] = useState('6');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const ingredientList = ingredients.split(',').map(i => i.trim());
    onSave({
      name,
      brand,
      ingredients: ingredientList,
      paoMonths: parseInt(pao),
      openedDate: new Date().toISOString().split('T')[0]
    });
    setName('');
    setBrand('');
    setIngredients('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] p-8 z-[101] shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-2xl">New Product</h2>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Product Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Niacinamide Serum"
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-peach outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Brand</label>
                <input
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. The Ordinary"
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-peach outline-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Ingredients</label>
                  <AlertCircle className="w-3 h-3 text-brand-peach" />
                </div>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g. Retinol, Vitamin C, Zinc (comma separated)"
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-peach outline-none h-24 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">PAO (Months)</label>
                  <select
                    value={pao}
                    onChange={(e) => setPao(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-peach outline-none appearance-none"
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>
                <div className="flex items-end">
                   <button
                    type="submit"
                    className="w-full bg-brand-ink text-white rounded-2xl p-4 font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Save Product
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
