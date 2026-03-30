/**
 * ResultsTableMulti - Display Miền Trung/Nam lottery results (multiple provinces)
 * Groups up to 3 provinces side-by-side in a single table
 */

import type { LotteryDataMulti } from '@/lib/types/lottery';
import { getRegionName } from '@/lib/utils/regions';
import { getPrizeNumber } from '@/lib/utils/lottery-helpers';
import styles from './ResultsTable.module.css';

interface ResultsTableMultiProps {
  data: LotteryDataMulti;
  hotNumbers?: any;
  gapNumbers?: any;
  frequencyData?: any;
}

export default function ResultsTableMulti({ data, hotNumbers, gapNumbers, frequencyData }: ResultsTableMultiProps) {
  const regionName = getRegionName(data.region);
  const hasStats = Boolean(
    (hotNumbers?.success && (hotNumbers.data ?? []).length) ||
    (gapNumbers?.success && (gapNumbers.data ?? []).length) ||
    (frequencyData?.success && (frequencyData.data ?? []).length)
  );

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
                const prizeNumber = getPrizeNumber(prizeClass);

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

      {hasStats && (
        <div className="loto-stats-grid">
          {hotNumbers?.success && (
            <div className="loto-stat-card">
              <h4>🔥 Top số nóng</h4>
              <p className="loto-stat-desc">Về nhiều nhất 30 ngày gần đây</p>
              <div className="loto-chip-list">
                {(hotNumbers.data || []).slice(0, 5).map((item: any, idx: number) => (
                  <div key={idx} className="loto-chip">
                    <span className="chip-number">{item.number}</span>
                    <span className="chip-meta">{item.count} lần</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {gapNumbers?.success && (
            <div className="loto-stat-card">
              <h4>🧊 Lô gan</h4>
              <p className="loto-stat-desc">Số lâu chưa về (tính theo ngày)</p>
              <div className="loto-chip-list">
                {(gapNumbers.data || []).slice(0, 5).map((item: any, idx: number) => (
                  <div key={idx} className="loto-chip">
                    <span className="chip-number">{item.number}</span>
                    <span className="chip-meta">{item.days} ngày</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {frequencyData?.success && (
            <div className="loto-stat-card">
              <h4>📊 Tần suất</h4>
              <p className="loto-stat-desc">Số xuất hiện nhiều nhất 100 kỳ</p>
              <div className="loto-chip-list">
                {(frequencyData.data || []).slice(0, 5).map((item: any, idx: number) => (
                  <div key={idx} className="loto-chip">
                    <span className="chip-number">{item.number}</span>
                    <span className="chip-meta">
                      {(item.frequency ?? item.count ?? item.percentage ?? '').toString()} lần
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
