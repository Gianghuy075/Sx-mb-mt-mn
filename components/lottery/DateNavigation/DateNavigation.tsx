/**
 * DateNavigation Component (Client)
 * Handles date navigation: Previous, Today, Next, Date Picker
 */

'use client';

import { useRouter } from 'next/navigation';
import { getPreviousDate, getNextDate, getTodayString } from '@/lib/utils/dates';
import type { Region } from '@/lib/types/lottery';

interface DateNavigationProps {
  currentDate: string;
  currentRegion: Region;
}

export default function DateNavigation({
  currentDate,
  currentRegion,
}: DateNavigationProps) {
  const router = useRouter();

  const handlePrevious = () => {
    const prevDate = getPreviousDate(currentDate);
    router.push(`/${currentRegion}/${prevDate}`);
  };

  const handleNext = () => {
    const nextDate = getNextDate(currentDate);
    if (nextDate) {
      router.push(`/${currentRegion}/${nextDate}`);
    }
  };

  const handleToday = () => {
    router.push(`/${currentRegion}/today`);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      router.push(`/${currentRegion}/${selectedDate}`);
    }
  };

  const today = getTodayString();
  const isToday = currentDate === today;
  const canGoNext = getNextDate(currentDate) !== null;

  return (
    <div className="date-nav">
      <button className="date-btn" onClick={handlePrevious}>
        ← Hôm qua
      </button>

      <button
        className="date-btn today-btn"
        onClick={handleToday}
        disabled={isToday}
      >
        Hôm nay
      </button>

      <button
        className="date-btn"
        onClick={handleNext}
        disabled={!canGoNext}
      >
        Ngày mai →
      </button>

      <input
        type="date"
        className="date-picker"
        value={currentDate}
        max={today}
        onChange={handleDateChange}
      />
    </div>
  );
}
