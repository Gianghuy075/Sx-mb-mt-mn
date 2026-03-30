/**
 * Forecast Card Component
 */

import styles from './ForecastCard.module.css';
import { ForecastItem } from '@/lib/data/forecast-demo';

interface ForecastCardProps {
  item: ForecastItem;
}

export default function ForecastCard({ item }: ForecastCardProps) {
  const getRegionColor = (region: string) => {
    switch (region) {
      case 'MB':
        return '#d75651';
      case 'MN':
        return '#cc3333';
      case 'MT':
        return '#e85c47';
      default:
        return '#666';
    }
  };

  const getRegionBgColor = (region: string) => {
    switch (region) {
      case 'MB':
        return '#f9e8e7';
      case 'MN':
        return '#f9e6e6';
      case 'MT':
        return '#f9e8e3';
      default:
        return '#f5f5f5';
    }
  };

  return (
    <div
      className={styles.card}
      style={{ borderLeftColor: getRegionColor(item.region) }}
    >
      <div
        className={styles.regionBadge}
        style={{
          backgroundColor: getRegionColor(item.region),
          color: 'white',
        }}
      >
        {item.region}
      </div>

      <div className={styles.cardHeader}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{item.fullTitle}</h3>
          <p className={styles.description}>{item.shortDescription}</p>
        </div>
        <div
          className={styles.dateBox}
          style={{ backgroundColor: getRegionBgColor(item.region) }}
        >
          <div className={styles.date}>{item.date}</div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.footerInfo}>
          <span className={styles.participants}>
            👥 {item.participants} dự đoán
          </span>
          <span className={styles.conditions}>{item.conditions}</span>
        </div>
      </div>
    </div>
  );
}
