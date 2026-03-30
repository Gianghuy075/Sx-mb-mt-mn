/**
 * Day Tabs Component
 * Shows tabs for different days/regions or provinces for multi-region
 */

'use client';

import Link from 'next/link';
import type { Region } from '@/lib/types/lottery';
import { getProvincesForDate } from '@/lib/data/schedules';
import { getTodayString } from '@/lib/utils/dates';

interface DayTabsProps {
  currentRegion: Region;
}

export default function DayTabs({ currentRegion }: DayTabsProps) {
  const today = getTodayString();
  
  // For MB, show days of week
  // For MT/MN, show provinces
  if (currentRegion === 'mb') {
    const tabs = [
      { id: 'mb', label: 'Miền Bắc' },
      { id: 'thu2', label: 'Thứ 2' },
      { id: 'thu3', label: 'Thứ 3' },
      { id: 'thu4', label: 'Thứ 4' },
      { id: 'thu5', label: 'Thứ 5' },
      { id: 'thu6', label: 'Thứ 6' },
      { id: 'thu7', label: 'Thứ 7' },
      { id: 'cn', label: 'Chủ Nhật' },
    ];

    return (
      <div className="day-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`day-tab ${tab.id === currentRegion ? 'active' : ''}`}
            onClick={() => {
              console.log('Navigate to:', tab.id);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  // For MT/MN, show provinces and day tabs
  const provinces = getProvincesForDate(currentRegion, today);
  const dayLabels: Record<number, string> = {
    0: 'CN',
    1: 'Thứ 2',
    2: 'Thứ 3',
    3: 'Thứ 4',
    4: 'Thứ 5',
    5: 'Thứ 6',
    6: 'Thứ 7',
  };
  const dayLabel = dayLabels[new Date(today).getDay()];

  const tabs = [
    { id: `${currentRegion}`, label: `XS${currentRegion.toUpperCase()}`, isRegion: true },
    { id: 'mon', label: 'Thứ 2' },
    { id: 'tue', label: 'Thứ 3' },
    { id: 'wed', label: 'Thứ 4' },
    { id: 'thu', label: 'Thứ 5' },
    { id: 'fri', label: 'Thứ 6' },
    { id: 'sat', label: 'Thứ 7' },
    { id: 'sun', label: 'CN' },
  ];

  return (
    <div className="day-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`day-tab ${tab.isRegion ? 'active' : ''}`}
          onClick={() => {
            console.log('Navigate to:', tab.id);
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
