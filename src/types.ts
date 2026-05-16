export type SkinType = 'Sensitif' | 'Berminyak' | 'Kering' | 'Kombinasi';

export interface User {
  id: string;
  name: string;
  email: string;
  skinType: SkinType;
  isPremium: boolean;
  avatarUrl?: string;
  streakCount: number;
  lastActiveDate?: string;
  reminders: {
    morning: boolean;
    night: boolean;
  };
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  openedDate: string;
  paoMonths: number; // Period After Opening in months
  remainingPercent: number;
  expiryDate?: string;
  imageUrl?: string;
  ingredients?: string[];
  buyLink?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  imageUrl: string;
  tags: string[];
  note?: string;
}

export interface RoutineItem {
  id: string;
  productId: string;
  productName: string;
  time: 'morning' | 'night';
  order: number;
  isDone: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  date: string;
  likes: number;
}

export interface AppTestimonial {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'routine' | 'expiry' | 'tip' | 'system';
  date: string;
  isRead: boolean;
}

export type Screen = 'dashboard' | 'shelf' | 'routine' | 'journal' | 'profile' | 'admin' | 'community' | 'promo';
