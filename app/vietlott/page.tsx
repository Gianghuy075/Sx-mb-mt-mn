import { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation/Navigation';
import Breadcrumb from '@/components/layout/Breadcrumb/Breadcrumb';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import VietlottMega from '@/components/lottery/Vietlott/VietlottMega';
import { VIETLOTT_MEGA_DEMO } from '@/lib/data/vietlott-demo';
import styles from './vietlott.module.css';

export const metadata: Metadata = {
  title: 'XS Vietlott - Kết quả xổ số Vietlott hôm nay',
  description: 'Xem kết quả xổ số Vietlott, giá trị Jackpot, và bảng giải thưởng chi tiết',
};

export default function VietlottPage() {

  return (
    <div className={styles.pageContainer}>

      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <h1 className={styles.pageTitle}>Kết quả XS Vietlott</h1>

          {/* Navigation Tabs */}
          <div className={styles.tabsContainer}>
            <button className={styles.tabActive}>Mega 6/45</button>
            <button className={styles.tabInactive}>Power 6/55</button>
            <button className={styles.tabInactive}>Max 6/50</button>
          </div>

          {/* Vietlott Mega Section */}
          <VietlottMega data={VIETLOTT_MEGA_DEMO} />

          {/* Additional Info */}
          <div className={styles.infoSection}>
            <h3>Quy tắc chơi Vietlott Mega 6/45</h3>
            <ul>
              <li>Chọn 6 số từ 1 đến 45</li>
              <li>Toàn bộ 6 số trúng khớp = Jackpot</li>
              <li>5 số trúng khớp = Giải nhất</li>
              <li>4 số trúng khớp = Giải nhì</li>
              <li>3 số trúng khớp = Giải ba</li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
