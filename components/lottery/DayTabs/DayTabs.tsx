/**
 * Day Tabs Component
 * Shows tabs for different days/regions
 */


'use client';

import type { Region } from '@/lib/types/lottery';

interface DayTabsProps {
  currentRegion: Region;
}

export default function DayTabs({ currentRegion }: DayTabsProps) {
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
            // Navigation logic will be added later
            console.log('Navigate to:', tab.id);
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
