import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb/Breadcrumb';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import StatisticsTabs from '@/components/lottery/Statistics/StatisticsTabs';
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
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>📊 THỐNG KÊ XỐ SỐ</h1>
            <p className={styles.pageSubtitle}>
              🔴 Mời bạn xem Dự đoán miễn Bắc cùng chuyên gia
            </p>
          </div>

          {/* Statistics Tabs Component */}
          <StatisticsTabs />

          {/* Info Section */}
          <div className={styles.infoSection}>
            <h2>📋 Hướng dẫn sử dụng</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3>🎯 TK GĐB</h3>
                <p>Thống kê Giải Đặc Biệt - Những lần 2 số cuối vẽ 88</p>
              </div>
              <div className={styles.infoCard}>
                <h3>📅 Theo tuần</h3>
                <p>Thống kê được tập hợp theo từng tuần</p>
              </div>
              <div className={styles.infoCard}>
                <h3>📆 Theo tháng</h3>
                <p>Thống kê được tập hợp theo từng tháng</p>
              </div>
              <div className={styles.infoCard}>
                <h3>📊 Theo năm</h3>
                <p>Thống kê được tập hợp theo từng năm</p>
              </div>
            </div>

            <div className={styles.disclaimer}>
              <h3>⚠️ Lưu ý:</h3>
              <p>
                Thống kê lịch sử không đảm bảo kết quả tương lai. Xổ số là trò chơi may rủi.
                Hãy chơi một cách lành mạnh và kiểm soát chi tiêu.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
