import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, MapPin, Smile, Send, Image as ImageIcon, Check, ChevronRight } from 'lucide-react';

interface AddJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: { date: string; imageUrl: string; tags: string[]; note: string }) => void;
}

export function AddJournalModal({ isOpen, onClose, onSave }: AddJournalModalProps) {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<{front?: string, right?: string, left?: string}>({});
  const [note, setNote] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSave = () => {
    // In a real app we'd combine these or upload them
    // For now we'll just use the front photo or a dummy
    onSave({
      date: new Date().toISOString().split('T')[0],
      imageUrl: photos.front || 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=400',
      tags: tags.length > 0 ? tags : ['Progress'],
      note: note
    });
    setStep(1);
    setPhotos({});
    setNote('');
    setTags([]);
    onClose();
  };

  const PhotoSlot = ({ type, label }: { type: 'front' | 'right' | 'left', label: string }) => (
    <div className="flex flex-col items-center gap-2">
      <button 
        onClick={() => setPhotos({ ...photos, [type]: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=200' })}
        className={`w-full aspect-[3/4] rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
          photos[type] ? 'border-brand-peach bg-brand-peach/5' : 'border-dashed border-gray-200 bg-gray-50'
        }`}
      >
        {photos[type] ? (
          <img src={photos[type]} className="w-full h-full object-cover rounded-[14px]" />
        ) : (
          <>
            <Camera className="w-6 h-6 text-gray-300" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
          </>
        )}
      </button>
      {photos[type] && <Check className="w-4 h-4 text-green-500" />}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-ink/80 backdrop-blur-md z-[300]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] p-8 z-[301] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-bold text-xl">Catat Progres Baru</h3>
              <button onClick={onClose} className="p-2 bg-gray-50 rounded-full">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {step === 1 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-3 gap-3">
                  <PhotoSlot type="front" label="Depan" />
                  <PhotoSlot type="right" label="Kanan" />
                  <PhotoSlot type="left" label="Kiri" />
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                   <Smile className="w-5 h-5 text-amber-500 shrink-0" />
                   <p className="text-[10px] text-amber-700 leading-relaxed font-medium">
                     Pastikan wajah bersih dan ambil foto di pencahayaan yang sama dengan foto-foto sebelumnya ya!
                   </p>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-brand-ink text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-brand-ink/20"
                >
                  Lanjut ke Catatan
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2 block mb-2">Gimana Kondisi Kulitmu?</label>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Contoh: 'Wajah kerasa lebih lembap, jerawat di pipi kanan mulai kempes...'"
                    className="w-full min-h-[120px] bg-gray-50 p-4 rounded-3xl border border-gray-100 text-sm focus:border-brand-peach/30 transition-colors outline-none"
                  />
                </div>

                <div>
                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2 block mb-2">Tags</label>
                   <div className="flex flex-wrap gap-2">
                     {['Breakout', 'Kemerahan', 'Glowing', 'Kering', 'Berminyak'].map(tag => (
                       <button 
                        key={tag}
                        onClick={() => setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${
                          tags.includes(tag) ? 'bg-brand-peach text-white' : 'bg-gray-100 text-gray-400'
                        }`}
                       >
                         {tag}
                       </button>
                     ))}
                   </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-50 text-gray-500 py-4 rounded-3xl font-bold"
                  >
                    Kembali
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex-[2] bg-brand-ink text-white py-4 rounded-3xl font-bold shadow-xl shadow-brand-ink/20 flex items-center justify-center gap-2"
                  >
                    Simpan Jurnal ✨
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
