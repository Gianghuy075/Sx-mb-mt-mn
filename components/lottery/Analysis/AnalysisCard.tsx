/**
 * Analysis Card Component
 */

import styles from './AnalysisCard.module.css';
import { AnalysisItem } from '@/lib/data/analysis-demo';

interface AnalysisCardProps {
  item: AnalysisItem;
}

export default function AnalysisCard({ item }: AnalysisCardProps) {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trend':
        return '#667eea';
      case 'hot-cold':
        return '#f59e0b';
      case 'frequency':
        return '#10b981';
      case 'cycle':
        return '#8b5cf6';
      default:
        return '#666';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return '📈';
      case 'hot-cold':
        return '🌡️';
      case 'frequency':
        return '📊';
      case 'cycle':
        return '⏱️';
      default:
        return '📋';
    }
  };

  return (
    <article
      className={styles.card}
      style={{ borderLeftColor: getRegionColor(item.region) }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.headerTop}>
          <div className={styles.badges}>
            <span
              className={styles.regionBadge}
              style={{ backgroundColor: getRegionColor(item.region) }}
            >
              {item.region}
            </span>
            <span
              className={styles.typeBadge}
              style={{ backgroundColor: getTypeColor(item.type) }}
            >
              {getTypeIcon(item.type)} {item.typeLabel}
            </span>
          </div>
          <span className={styles.date}>{item.date}</span>
        </div>

        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.metrics}>{item.metrics}</div>
      </div>
    </article>
  );
}
