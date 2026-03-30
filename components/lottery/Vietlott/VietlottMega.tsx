/**
 * Vietlott Mega Display Component
 */

import styles from './VietlottMega.module.css';

interface VietlottMegaProps {
  data: {
    date: string;
    type: string;
    numbers: number[];
    jackpot: number;
    prizes: Array<{
      name: string;
      matches: string;
      quantity: number;
      value: number;
    }>;
  };
}

export default function VietlottMega({ data }: VietlottMegaProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  return (
    <section className={styles.vietlottSection}>
      <h2 className={styles.sectionTitle}>
        {data.type} chủ nhật ngày {data.date}
      </h2>

      {/* Numbers Display */}
      <div className={styles.numbersContainer}>
        {data.numbers.map((num, idx) => (
          <div key={idx} className={styles.numberBall}>
            {String(num).padStart(2, '0')}
          </div>
        ))}
      </div>

      {/* Jackpot Info */}
      <div className={styles.jackpotInfo}>
        <p>
          Giá trị Jackpot: <span className={styles.jackpotValue}>
            {formatCurrency(data.jackpot)} đồng
          </span>
        </p>
      </div>

      {/* Prizes Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.prizeTable}>
          <thead>
            <tr>
              <th>Giải thưởng</th>
              <th>Trúng khớp</th>
              <th>Số lượng giải</th>
              <th>Giá trị giải (đồng)</th>
            </tr>
          </thead>
          <tbody>
            {data.prizes.map((prize, idx) => (
              <tr key={idx} className={prize.name === 'Jackpot' ? styles.jackpotRow : ''}>
                <td className={styles.prizeName}>{prize.name}</td>
                <td className={styles.matches}>{prize.matches}</td>
                <td className={styles.quantity}>{formatCurrency(prize.quantity)}</td>
                <td className={styles.value}>{formatCurrency(prize.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
