import { Metadata } from 'next';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import StatsDashboard from '@/components/lottery/Statistics/StatsDashboard';
import styles from '../_thong-ke/statistics.module.css';

export const metadata: Metadata = {
  title: 'Thống kê xổ số - Thống kê giải đặc biệt, giải đầu, giải đuôi',
  description: 'Thống kê xổ số Miền Bắc, Miền Trung, Miền Nam. Thống kê giải đặc biệt, giải đầu, giải đuôi',
};

export default function StatisticsPage() {

  return (
    <div className={styles.pageContainer}>

      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <StatsDashboard />
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
