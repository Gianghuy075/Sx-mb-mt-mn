/**
 * News Card Component
 */

import styles from './NewsCard.module.css';
import { NewsItem } from '@/lib/data/news-demo';

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  const getRegionColor = (region: string) => {
    switch (region) {
      case 'MB':
        return '#dc2626';
      case 'MN':
        return '#b91c1c';
      case 'MT':
        return '#991b1b';
      default:
        return '#666';
    }
  };

  return (
    <article className={styles.newsCard}>
      <div className={styles.cardImage}>
        <div
          className={styles.imagePlaceholder}
          style={{ backgroundColor: getRegionColor(item.region) }}
        >
          <div className={styles.imageContent}>
            <span className={styles.regionLabel}>{item.region}</span>
            <span className={styles.label}>Dự đoán kỳ vọng</span>
            <span className={styles.labelSmall}>Tổ 8 trùng com</span>
          </div>
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </div>
    </article>
  );
}
