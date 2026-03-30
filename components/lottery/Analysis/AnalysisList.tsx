/**
 * Analysis List Component
 */

'use client';

import { useMemo, useState } from 'react';
import styles from './AnalysisList.module.css';
import AnalysisCard from './AnalysisCard';
import { ANALYSIS_DEMO, ANALYSIS_TYPES, ANALYSIS_REGIONS, AnalysisItem } from '@/lib/data/analysis-demo';

interface AnalysisListProps {
  items?: AnalysisItem[];
}

export default function AnalysisList({ items }: AnalysisListProps) {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const data = useMemo(() => items ?? ANALYSIS_DEMO, [items]);

  const filteredAnalysis = data.filter(item => {
    const typeMatch =
      selectedType === 'all' ||
      item.type === selectedType ||
      item.type === 'analysis'; // articles fallback

    const regionMatch =
      selectedRegion === 'all' ||
      item.region === selectedRegion.toUpperCase() ||
      item.region === 'ALL'; // articles fallback

    return typeMatch && regionMatch;
  });

  return (
    <div className={styles.section}>
      {/* Type Filter */}
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Loại phân tích</h3>
          <div className={styles.filterButtonsGrid}>
            {ANALYSIS_TYPES.map(type => (
              <button
                key={type.id}
                className={`${styles.filterBtn} ${selectedType === type.id ? styles.active : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Khu vực</h3>
          <div className={styles.filterButtonsGrid}>
            {ANALYSIS_REGIONS.map(region => (
              <button
                key={region.id}
                className={`${styles.filterBtn} ${selectedRegion === region.id ? styles.active : ''}`}
                onClick={() => setSelectedRegion(region.id)}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Items */}
      <div className={styles.analysisContainer}>
        <div className={styles.resultsInfo}>
          <h2 className={styles.resultsTitle}>
            Danh sách phân tích ({filteredAnalysis.length} kết quả)
          </h2>
        </div>

        {filteredAnalysis.length > 0 ? (
          <div className={styles.cardsList}>
            {filteredAnalysis.map(analysis => (
              <AnalysisCard key={analysis.id} item={analysis} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Không tìm thấy phân tích nào với tiêu chí tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}
