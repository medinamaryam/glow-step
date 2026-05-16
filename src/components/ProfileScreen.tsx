import { motion } from 'motion/react';
import { User as UserIcon, Crown, Bell, Globe, LogOut, ChevronRight, Settings, BarChart3, Gift } from 'lucide-react';
import { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
  onUpgradeClick: () => void;
  onAdminClick?: () => void;
  onPromoClick?: () => void;
}

export function ProfileScreen({ user, onLogout, onUpgradeClick, onAdminClick, onPromoClick }: ProfileScreenProps) {
  return (
    <div className="pb-12">
      {/* Profile Card */}
      <div className="bg-brand-sage/20 rounded-[40px] p-8 flex flex-col items-center text-center mb-8 border border-brand-sage/30">
        <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-4xl mb-4 p-1 border-4 border-white">
          {user.avatarUrl || '👤'}
        </div>
        <h2 className="font-display font-bold text-3xl text-brand-ink">{user.name}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-brand-ink text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            {user.skinType} Skin
          </span>
          {user.isPremium ? (
            <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 border border-amber-200">
              <Crown className="w-3 h-3" />
              Premium
            </span>
          ) : (
            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-gray-200">
              Gratis
            </span>
          )}
        </div>
      </div>

      {/* Subscription CTA if not premium */}
      {!user.isPremium && (
        <button 
          onClick={onUpgradeClick}
          className="w-full bg-brand-ink text-white p-6 rounded-[32px] mb-8 relative overflow-hidden group active:scale-[0.98] transition-transform"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="text-left">
              <h3 className="font-display font-bold text-xl mb-1 flex items-center gap-2">
                Upgrade ke Premium
                <Crown className="w-5 h-5 text-amber-400" />
              </h3>
              <p className="text-xs text-white/60">Buka semua fitur canggih GlowStep!</p>
            </div>
            <ChevronRight className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-amber-400/10 -rotate-12 translate-x-12" />
        </button>
      )}

      {/* Menu Sections */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4 mb-2">Pengaturan Akun</h4>
        
        <SettingsItem icon={Bell} label="Notifikasi Pengingat" value="Pagi & Malam" />
        <SettingsItem icon={Globe} label="Bahasa" value="Bahasa Indonesia" />
        <SettingsItem icon={UserIcon} label="Informasi Personal" />

        <div className="pt-4">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4 mb-2">Rewards & Promo</h4>
          <SettingsItem 
            icon={Gift} 
            label="Promo Kampus" 
            value="Dapet Premium Gratis!"
            onClick={() => onPromoClick?.()}
          />
        </div>

        {onAdminClick && (
          <div className="pt-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4 mb-2">Internal Tools</h4>
            <SettingsItem 
              icon={BarChart3} 
              label="Admin Simulation Dashboard" 
              value="Revenue & Churn Analysis"
              onClick={onAdminClick}
            />
          </div>
        )}

        <div className="pt-6">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-5 rounded-3xl text-red-500 bg-red-50 hover:bg-red-100 transition-colors font-bold active:scale-[0.98]"
          >
            <div className="p-3 bg-white rounded-2xl shadow-sm">
              <LogOut className="w-5 h-5" />
            </div>
            <span>Keluar dari Akun</span>
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-12 pb-12">
        GlowStep v1.2.0 • Made for You
      </p>
    </div>
  );
}

function SettingsItem({ icon: Icon, label, value, onClick }: { icon: any, label: string, value?: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-[28px] border border-gray-100 group active:scale-[0.99] transition-all"
    >      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-2xl shadow-sm text-brand-ink group-hover:bg-brand-sage group-hover:text-brand-ink transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <p className="font-bold text-sm text-brand-ink">{label}</p>
          {value && <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{value}</p>}
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-ink transition-colors" />
    </button>
  );
}
