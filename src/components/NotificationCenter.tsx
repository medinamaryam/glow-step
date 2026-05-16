import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Calendar, AlertTriangle, Sparkles, Check } from 'lucide-react';
import { AppNotification } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationCenter({ isOpen, onClose, notifications, onMarkRead, onClearAll }: NotificationCenterProps) {
  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'routine': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'expiry': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'tip': return <Sparkles className="w-4 h-4 text-brand-peach" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
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
            className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-[300]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[301] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand-ink" />
                <h2 className="font-display font-bold text-xl text-brand-ink">Notifikasi</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.length > 0 ? (
                <>
                  <div className="flex justify-end px-2 mb-2">
                    <button 
                      onClick={onClearAll}
                      className="text-[10px] font-bold text-gray-400 hover:text-brand-ink uppercase tracking-widest"
                    >
                      Hapus Semua
                    </button>
                  </div>
                  {notifications.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((n) => (
                    <motion.div
                      key={n.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 rounded-3xl border transition-all ${
                        n.isRead ? 'bg-white border-gray-100 opacity-60' : 'bg-brand-peach/5 border-brand-peach/20'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                          n.isRead ? 'bg-gray-50' : 'bg-white shadow-sm'
                        }`}>
                          {getIcon(n.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-brand-ink leading-tight">{n.title}</h4>
                            {!n.isRead && (
                              <button 
                                onClick={() => onMarkRead(n.id)}
                                className="p-1 bg-brand-peach/20 text-brand-peach rounded-lg"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 leading-relaxed mt-1">{n.message}</p>
                          <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest mt-2">
                            {new Date(n.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-10">
                  <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-200 mb-6">
                    <Bell className="w-10 h-10" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-ink">Belum Ada Kabar</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Kami akan kasih tau kamu kalau ada info terbaru soal kulitmu! ✨
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
