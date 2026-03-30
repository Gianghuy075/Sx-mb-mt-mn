/**
 * Statistics Tabs Component
 */

'use client';

import { useState } from 'react';
import styles from './StatisticsTabs.module.css';
import StatisticsTable from './StatisticsTable';
import { STATISTICS_DEMO, STATISTICS_TABS } from '@/lib/data/statistics-demo';

export default function StatisticsTabs() {
  const [selectedTab, setSelectedTab] = useState('tkg-db');

  const getTabDescription = (tabId: string) => {
    switch (tabId) {
      case 'tkg-db':
        return 'Thống kê giải đặc biệt - Những lần số cuối giải ĐB vẽ 88';
      case 'weekly':
        return 'Thống kê theo tuần - Dữ liệu được tập hợp theo từng tuần';
      case 'monthly':
        return 'Thống kê theo tháng - Dữ liệu được tập hợp theo từng tháng';
      case 'yearly':
        return 'Thống kê theo năm - Dữ liệu được tập hợp theo từng năm';
      case 'total':
        return 'Thống kê tổng hợp - Tổng hợp tất cả dữ liệu thống kê';
      default:
        return '';
    }
  };

  const getTabTitle = (tabId: string) => {
    const tab = STATISTICS_TABS.find(t => t.id === tabId);
    return tab ? tab.label : 'Thống kê';
  };

  return (
    <div className={styles.container}>
      {/* Tabs Navigation */}
      <div className={styles.tabsNav}>
        {STATISTICS_TABS.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${selectedTab === tab.id ? styles.active : ''}`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Statistics Table */}
      <StatisticsTable
        data={STATISTICS_DEMO}
        title={getTabTitle(selectedTab)}
        description={getTabDescription(selectedTab)}
      />
    </div>
  );
}
