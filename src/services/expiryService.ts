/**
 * Service to handle product expiry calculations (PAO - Period After Opening).
 */

import { Product } from '../types';

export interface ExpiryStatus {
  daysLeft: number;
  isExpiringSoon: boolean; // Less than 30 days
  isExpired: boolean;
  expiryDate: Date;
}

/**
 * Calculates how many days are left for a product based on its opened date and PAO.
 */
export function getExpiryStatus(openedDate: string, paoMonths: number): ExpiryStatus {
  const opened = new Date(openedDate);
  const expiry = new Date(opened);
  expiry.setMonth(opened.getMonth() + paoMonths);
  
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    daysLeft: diffDays,
    isExpiringSoon: diffDays <= 30 && diffDays > 0,
    isExpired: diffDays <= 0,
    expiryDate: expiry
  };
}

/**
 * Finds all products that require an "Expiry Guard" alert.
 */
export function findExpiringProducts(products: Product[]) {
  return products
    .map(p => ({ ...p, status: getExpiryStatus(p.openedDate, p.paoMonths) }))
    .filter(p => p.status.isExpiringSoon || p.status.isExpired);
}
