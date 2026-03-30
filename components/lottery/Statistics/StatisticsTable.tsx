/**
 * Statistics Table Component
 */

import styles from './StatisticsTable.module.css';
import { StatisticsRecord } from '@/lib/data/statistics-demo';

interface StatisticsTableProps {
  data: StatisticsRecord[];
  title: string;
  description?: string;
}

export default function StatisticsTable({ data, title, description }: StatisticsTableProps) {
  const lastDateData = data.length > 0 ? data[0] : null;
  const lastTwoDigits = lastDateData ? lastDateData.db.split(' ')[1] : '??';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {lastDateData && (
          <div className={styles.highlight}>
            <p className={styles.highlightText}>
              2 số cuối giải ĐB vẽ <span className={styles.number}>{lastTwoDigits}</span>, xem bảng thống kê để biết có thể về ngày mai
            </p>
          </div>
        )}
      </div>

      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ngày về</th>
              <th>ĐB</th>
              <th>ĐB hôm sau</th>
              <th>Hôm sau</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record, idx) => (
              <tr key={idx}>
                <td className={styles.date}>{record.date}</td>
                <td className={styles.special}>
                  <span className={styles.firstPart}>{record.db.split(' ')[0]}</span>
                  <span className={styles.secondPart}>{record.db.split(' ')[1]}</span>
                </td>
                <td className={styles.nextDaySpecial}>
                  {record.dbNextDay ? (
                    <>
                      <span className={styles.firstPart}>{record.dbNextDay.split(' ')[0]}</span>
                      <span className={styles.secondPart}>{record.dbNextDay.split(' ')[1]}</span>
                    </>
                  ) : (
                    '-'
                  )}
                </td>
                <td className={styles.nextDay}>{record.nextDay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>Xem thêm</p>
        <ul className={styles.footerLinks}>
          <li>
            <a href="#" className={styles.link}>
              Xem thêm giải đặc biệt ngày mai
            </a>
          </li>
          <li>
            <a href="#" className={styles.link}>
              Xem thống kê lô gan miền Bắc
            </a>
          </li>
          <li>
            <a href="#" className={styles.link}>
              Mời bạn quay thử miền Bắc
            </a>
          </li>
          <li>
            <a href="#" className={styles.link}>
              Xem cao thủ dự đoán miền Bắc hôm nay ra con gì?
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
