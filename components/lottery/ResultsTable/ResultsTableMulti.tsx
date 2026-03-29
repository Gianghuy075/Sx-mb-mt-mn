/**
 * ResultsTableMulti - Display Miền Trung/Nam lottery results (multiple provinces)
 * Groups up to 3 provinces side-by-side in a single table
 */

import type { LotteryDataMulti } from '@/lib/types/lottery';
import { getRegionName } from '@/lib/utils/regions';
import styles from './ResultsTable.module.css';

interface ResultsTableMultiProps {
  data: LotteryDataMulti;
}

export default function ResultsTableMulti({ data }: ResultsTableMultiProps) {
  const regionName = getRegionName(data.region);

  // Group provinces into chunks of 3
  const provinceGroups: typeof data.provinces[] = [];
  for (let i = 0; i < data.provinces.length; i += 3) {
    provinceGroups.push(data.provinces.slice(i, i + 3));
  }

  return (
    <section className={styles.resultsSection}>
      <h2 className={styles.sectionTitle}>
        XS{data.region.toUpperCase()} - Kết quả Xổ số {regionName} - XS
        {data.region.toUpperCase()} hôm nay
      </h2>

      <div className={styles.resultsInfo}>
        <span className={styles.infoLink}>
          <a href="#">XS{data.region.toUpperCase()}</a>
        </span>
        {' / '}
        <span className={styles.infoLink}>
          <a href="#">XS{data.region.toUpperCase()} {data.date}</a>
        </span>
        {' / '}
        <span>
          ({data.provinces.map((p) => p.name).join(', ')})
        </span>
      </div>

      {provinceGroups.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.lotteryTableWrap}>
          <table className={styles.lotteryTable}>
            <thead>
              <tr>
                <th className={styles.prizeHeader}>G</th>
                {group.map((province, pIndex) => (
                  <th key={pIndex} className={styles.provinceHeader}>
                    {province.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Assume all provinces have same number of prizes */}
              {group[0].prizes.map((_, prizeIndex) => {
                const prizeClass = group[0].prizes[prizeIndex].cls;
                const prizeLabel = group[0].prizes[prizeIndex].label;

                // Extract prize number (8, 7, 6, etc.) from label
                const prizeNumber = prizeLabel.includes('tám') ? '8'
                  : prizeLabel.includes('bảy') ? '7'
                  : prizeLabel.includes('sáu') ? '6'
                  : prizeLabel.includes('năm') ? '5'
                  : prizeLabel.includes('tư') ? '4'
                  : prizeLabel.includes('ba') ? '3'
                  : prizeLabel.includes('nhì') ? '2'
                  : prizeLabel.includes('nhất') ? '1'
                  : prizeLabel.includes('đặc biệt') ? 'ĐB'
                  : prizeIndex.toString();

                return (
                  <tr key={prizeIndex} className={styles[prizeClass]}>
                    <th className={styles.prizeLabel}>{prizeNumber}</th>
                    {group.map((province, pIndex) => {
                      const prize = province.prizes[prizeIndex];
                      return (
                        <td key={pIndex}>
                          <div className={styles.prizeNumbers}>
                            {prize.numbers.map((number, numIndex) => (
                              <span key={numIndex} className={styles.prizeNum}>
                                {number}
                              </span>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}
