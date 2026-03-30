import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb/Breadcrumb';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import AnalysisList from '@/components/lottery/Analysis/AnalysisList';
import styles from '../_phan-tich/analysis.module.css';

export const metadata: Metadata = {
  title: 'Phân tích xổ số - Phân tích xu hướng, số nóng, tần suất xổ số Miền Bắc, Miền Trung, Miền Nam',
  description: 'Phân tích xổ số chi tiết: xu hướng, số nóng lạnh, tần suất, chu kỳ lô tô. Công cụ phân tích xổ số hôm nay',
};

export default function AnalysisPage() {

  return (
    <div className={styles.pageContainer}>

      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>📊 PHÂN TÍCH XỐ SỐ</h1>
            <p className={styles.pageSubtitle}>
              Công cụ phân tích xu hướng, số nóng, tần suất, chu kỳ xổ số chi tiết
            </p>
          </div>

          {/* Analysis List Component */}
          <AnalysisList />

          {/* Info Section */}
          <div className={styles.infoSection}>
            <h2>📈 Các loại phân tích</h2>
            
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3>Xu hướng</h3>
                <p>
                  Phân tích các con số nóng (xuất hiện nhiều) và lạnh (ít xuất hiện) để
                  nhận biết xu hướng hiện tại của thị trường.
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3>Số nóng - Lạnh</h3>
                <p>
                  Theo dõi các con số có tần suất xuất hiện cao (nóng) và thấp (lạnh)
                  trong khoảng thời gian nhất định.
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3>Tần suất</h3>
                <p>
                  Thống kê chi tiết số lần mỗi con số xuất hiện, giúp xác định mẫu
                  và xu hướng dài hạn.
                </p>
              </div>

              <div className={styles.infoCard}>
                <h3>Chu kỳ</h3>
                <p>
                  Theo dõi chu kỳ xuất hiện của các con số, dự đoán thời điểm có khả
                  năng xuất hiện tiếp theo.
                </p>
              </div>
            </div>

            <div className={styles.disclaimer}>
              <h3>⚠️ Lưu ý quan trọng:</h3>
              <ul>
                <li>Phân tích dữ liệu lịch sử không đảm bảo kết quả tương lai</li>
                <li>Xổ số là trò chơi may rủi, không có cách chắc chắn để dự đoán</li>
                <li>Hãy chơi một cách lành mạnh và kiểm soát chi tiêu</li>
                <li>Chỉ chơi xổ số hợp pháp tại các cơ sở được phép</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
