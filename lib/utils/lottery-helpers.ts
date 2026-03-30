/**
 * Lottery Helper Functions
 */

import type { PrizeClass } from '@/lib/types/lottery';

/**
 * Map prize class to display number
 * MT/MN have 9 prizes: 8, 7, 6, 5, 4, 3, 2, 1, DB (đặc biệt)
 */
export function getPrizeNumber(prizeClass: PrizeClass): string {
  const prizeMap: Record<PrizeClass, string> = {
    eighth: '8',
    seventh: '7',
    sixth: '6',
    fifth: '5',
    fourth: '4',
    third: '3',
    second: '2',
    first: '1',
    special: 'ĐB',
  };
  return prizeMap[prizeClass] || '?';
}

/**
 * Format lottery number for display
 * E.g., "123456" stays as "123456"
 */
export function formatLotteryNumber(num: string): string {
  return num || '-';
}
