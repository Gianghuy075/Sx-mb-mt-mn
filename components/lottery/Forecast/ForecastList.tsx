/**
 * Forecast List Component
 */

'use client';

import { useState } from 'react';
import styles from './ForecastList.module.css';
import ForecastCard from './ForecastCard';
import { FORECAST_DEMO, FORECAST_CATEGORIES, ForecastItem } from '@/lib/data/forecast-demo';

export default function ForecastList() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredForecasts = selectedCategory === 'all'
    ? FORECAST_DEMO
    : FORECAST_DEMO.filter(f => f.region === selectedCategory.toUpperCase());

  return (
    <div className={styles.section}>
      {/* Category Tabs */}
      <div className={styles.categoriesContainer}>
        <h3 className={styles.categoriesTitle}>Chọn dự đoán</h3>
        <div className={styles.categoriesGrid}>
          {FORECAST_CATEGORIES.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryBtn} ${
                selectedCategory === category.id ? styles.active : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Forecast Items */}
      <div className={styles.forecastsContainer}>
        {filteredForecasts.length > 0 ? (
          filteredForecasts.map(forecast => (
            <ForecastCard key={forecast.id} item={forecast} />
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
