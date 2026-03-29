/**
 * Date utility functions for lottery application
 */

import { format, addDays, isAfter, parseISO, isValid } from 'date-fns';

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Format date string to Vietnamese format (DD/MM/YYYY)
 */
export function formatDateVN(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  } catch {
    return dateStr;
  }
}

/**
 * Get Vietnamese day name from date string
 */
export function getVietnameseDayName(dateStr: string): string {
  const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  try {
    const date = parseISO(dateStr);
    return days[date.getDay()];
  } catch {
    return '';
  }
}

/**
 * Format full Vietnamese date with day name
 * Example: "Thứ Bảy ngày 28/03/2026"
 */
export function formatFullDateVN(dateStr: string): string {
  const dayName = getVietnameseDayName(dateStr);
  const formattedDate = formatDateVN(dateStr);
  return `${dayName} ngày ${formattedDate}`;
}

/**
 * Validate date string format (YYYY-MM-DD)
 */
export function isValidDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return false;
  }

  const date = parseISO(dateStr);
  return isValid(date);
}

/**
 * Check if date is in the future
 */
export function isFutureDate(dateStr: string): boolean {
  try {
    const date = parseISO(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isAfter(date, today);
  } catch {
    return false;
  }
}

/**
 * Add days to a date string
 */
export function addDaysToDate(dateStr: string, days: number): string {
  try {
    const date = parseISO(dateStr);
    const newDate = addDays(date, days);
    return format(newDate, 'yyyy-MM-dd');
  } catch {
    return dateStr;
  }
}

/**
 * Get previous date
 */
export function getPreviousDate(dateStr: string): string {
  return addDaysToDate(dateStr, -1);
}

/**
 * Get next date (only if not in future)
 */
export function getNextDate(dateStr: string): string | null {
  const nextDate = addDaysToDate(dateStr, 1);
  if (isFutureDate(nextDate)) {
    return null;
  }
  return nextDate;
}

/**
 * Get last N days as date strings
 */
export function getLastNDays(n: number): string[] {
  const today = new Date();
  const dates: string[] = [];

  for (let i = 0; i < n; i++) {
    const date = addDays(today, -i);
    dates.push(format(date, 'yyyy-MM-dd'));
  }

  return dates;
}
