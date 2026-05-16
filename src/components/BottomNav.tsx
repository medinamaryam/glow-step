import { Home, LayoutGrid, Camera, User, MessageSquare } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (s: Screen) => void;
}

export function BottomNav({ activeScreen, setActiveScreen }: BottomNavProps) {
  const tabs: { id: Screen, icon: any, label: string }[] = [
    { id: 'dashboard', icon: Home, label: 'Beranda' },
    { id: 'shelf', icon: LayoutGrid, label: 'Inventory' },
    { id: 'community', icon: MessageSquare, label: 'Honest' },
    { id: 'journal', icon: Camera, label: 'Journal' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-6 py-4 pb-8 flex justify-between items-center z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] backdrop-blur-lg bg-white/95">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveScreen(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-brand-ink scale-110' : 'text-gray-300 hover:text-gray-400'}`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-brand-ink/5' : ''}`} />
            <span className={`text-[10px] font-bold uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-0'}`}>
              {tab.label}
            </span>
            {isActive && (
              <div className="w-1 h-1 bg-brand-ink rounded-full mt-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
}
