/**
 * Day Tabs Component
 * Hiển thị 7 ngày gần nhất (tính từ hôm nay về trước)
 * Click → navigate đến kết quả ngày đó
 */

'use client';

import { useRouter } from 'next/navigation';
import type { Region } from '@/lib/types/lottery';

interface DayTabsProps {
  currentRegion: Region;
  currentDate: string; // YYYY-MM-DD
}

const DAY_NAMES = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

const REGION_NAMES: Record<string, string> = {
  mb: 'Miền Bắc',
  mt: 'Miền Trung',
  mn: 'Miền Nam',
};

function getLast7Days(regionLabel: string): { date: string; label: string }[] {
  const result = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const label = i === 0 ? regionLabel : DAY_NAMES[d.getDay()];
    result.push({ date: dateStr, label });
  }

  return result;
}

export default function DayTabs({ currentRegion, currentDate }: DayTabsProps) {
  const router = useRouter();
  const regionLabel = REGION_NAMES[currentRegion] ?? 'Hôm nay';
  const days = getLast7Days(regionLabel);

  return (
    <div className="day-tabs">
      {days.map((day) => (
        <button
          key={day.date}
          className={`day-tab ${day.date === currentDate ? 'active' : ''}`}
          onClick={() => router.push(`/${currentRegion}/${day.date}`)}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}
