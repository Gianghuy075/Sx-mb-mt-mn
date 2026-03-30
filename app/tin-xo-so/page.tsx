import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb/Breadcrumb';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import NewsList from '@/components/lottery/News/NewsList';
import styles from '../_tin-xo-so/news.module.css';

export const metadata: Metadata = {
  title: 'Tin xổ số - Dự đoán xổ số Miền Bắc, Miền Trung, Miền Nam hôm nay',
  description: 'Tin xổ số hôm nay, dự đoán xổ số Miền Bắc, Miền Trung, Miền Nam. Thông báo kết quả xổ số mới nhất',
};

export default function NewsPage() {

  return (
    <div className={styles.pageContainer}>

      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>🔴 Mời bạn xem Dự đoán miễn Bắc cùng chuyên gia</h1>
          </div>

          {/* News List Component */}
          <NewsList />

          {/* Info Section */}
          <div className={styles.infoSection}>
            <h2>📋 Thông tin thêm</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3>Xem thêm giải đặc biệt ngày mai</h3>
                <p>Dự đoán kết quả giải đặc biệt cho ngày mai</p>
              </div>
              <div className={styles.infoCard}>
                <h3>Xem thống kê lô gan miền Bắc</h3>
                <p>Thống kê chi tiết các lô gan xuất hiện</p>
              </div>
              <div className={styles.infoCard}>
                <h3>Mời bạn quay thử miền Bắc</h3>
                <p>Công cụ quay thử xổ số miễn phí</p>
              </div>
              <div className={styles.infoCard}>
                <h3>Xem cao thủ dự đoán</h3>
                <p>Xem dự đoán từ các cao thủ hàng đầu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
