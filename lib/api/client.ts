/**
 * API Client for fetching lottery data
 * Integrates with XoSoAPI.online with database caching
 * Replaces xsapi.vn with cached XoSoAPI implementation
 */

import type { LotteryData, Region } from '@/lib/types/lottery';
import { getDraws } from '@/lib/api/lottery';
import { getTodayString } from '@/lib/utils/dates';

/**
 * Main function to fetch lottery data for any region
 *
 * Now uses XoSoAPI with database caching for optimized API usage:
 * - Checks cache first (fresh data)
 * - Calls XoSoAPI on cache miss
 * - Returns stale cache on rate limit (429)
 * - Fallback to demo data if all fails
 */
export async function fetchLotteryData(region: Region, date: string): Promise<LotteryData> {
  // Handle "today" alias
  const dateStr = date === 'today' ? getTodayString() : date;

  // Use cached API (handles all fallback logic internally)
  return await getDraws(region, dateStr);
}

/**
 * Get revalidation time based on date
 * - Today: 5 minutes (results update frequently)
 * - Last 7 days: 1 hour (results mostly final)
 * - Older: Static (never changes)
 */
export function getRevalidationTime(dateStr: string): number | false {
  const today = getTodayString();
  const date = new Date(dateStr);
  const todayDate = new Date(today);

  const daysDiff = Math.floor(
    (todayDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (dateStr === today) {
    return 300; // 5 minutes for today
  } else if (daysDiff <= 7) {
    return 3600; // 1 hour for last week
  } else {
    return false; // Static for old results
  }
}
