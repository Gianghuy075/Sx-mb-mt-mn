/**
 * News List Component
 */

'use client';

import { useState } from 'react';
import styles from './NewsList.module.css';
import NewsCard from './NewsCard';
import { NEWS_DEMO, NEWS_TABS } from '@/lib/data/news-demo';

export default function NewsList() {
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredNews = selectedTab === 'all'
    ? NEWS_DEMO
    : NEWS_DEMO.filter(news => news.region === selectedTab.toUpperCase());

  return (
    <div className={styles.section}>
      {/* Tabs Navigation */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabsNav}>
          {NEWS_TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${selectedTab === tab.id ? styles.active : ''}`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section Title */}
      <div className={styles.sectionTitle}>
        <h2>Dự Đoán kết quả xổ số hôm nay</h2>
      </div>

      {/* News Items */}
      <div className={styles.newsContainer}>
        {filteredNews.length > 0 ? (
          filteredNews.map(news => (
            <NewsCard key={news.id} item={news} />
          ))
        ) : (
          <div className={styles.empty}>
            <p>Không có dự đoán nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
