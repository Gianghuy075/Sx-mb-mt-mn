/**
 * ResultsTableMB - Display Miền Bắc lottery results
 */

import type { LotteryDataMB } from '@/lib/types/lottery';
import LotoStatistics from '@/components/lottery/LotoStatistics/LotoStatistics';
import styles from './ResultsTable.module.css';

interface ResultsTableMBProps {
  data: LotteryDataMB;
}

export default function ResultsTableMB({ data }: ResultsTableMBProps) {
  return (
    <>
      <section className={styles.resultsSection}>
        <h2 className={styles.sectionTitle}>
          XSMB - Kết quả Xổ số Miền Bắc - XSMB hôm nay
        </h2>

        <div className={styles.resultsInfo}>
          <span className={styles.infoLink}>
            <a href="#">XSMB</a>
          </span>
          {' / '}
          <span className={styles.infoLink}>
            <a href="#">XSMB {data.date}</a>
          </span>
          {' / '}
          <span>({data.provinces[0]})</span>
        </div>

      <div className={styles.resultsList}>
        {data.prizes.map((prize, index) => (
          <div key={index} className={styles.resultRow}>
            <div className={styles.resultLabel}>{prize.label}</div>
            <div className={styles.resultNumbers}>
              {prize.numbers.map((number, numIndex) => (
                <span
                  key={numIndex}
                  className={`${styles.number} ${
                    prize.cls === 'special' ? styles.large : ''
                  }`}
                >
                  {number}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

        <div className="advertisements">
          <p>Advertisements</p>
        </div>
      </section>

      <LotoStatistics />
    </>
  );
}
