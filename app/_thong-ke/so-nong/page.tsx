/**
 * Hot Numbers Page: /thong-ke/so-nong
 * Detailed view of hot numbers (most frequent)
 */

import { getHotNumbers } from '@/lib/api/lottery';
import HotNumbers from '@/components/lottery/Statistics/HotNumbers';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import StatsPageLayout from '@/components/lottery/Statistics/StatsPageLayout';

export default async function HotNumbersPage() {
  const hotData = await getHotNumbers('mb', 20);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '24px'
    }}>
      <main style={{ minWidth: 0 }}>
        <StatsPageLayout
          breadcrumbs={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Thống kê', href: '/thong-ke' },
            { label: 'Số Nóng' },
          ]}
          headerTitle="🔥 Số Nóng - Miền Bắc"
          headerSubtitle="Top 20 số xuất hiện nhiều nhất trong 30 ngày gần đây"
          headerColor="#ff4444"
        >
          {hotData?.success && hotData.data.length > 0 ? (
            <HotNumbers data={hotData.data} region="MB" />
          ) : (
            <div style={{ background: 'white', padding: '48px', borderRadius: '12px', textAlign: 'center', color: '#666' }}>
              <p>Không có dữ liệu số nóng</p>
            </div>
          )}

          <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #ff4444', marginTop: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>📖 Giải thích</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '8px 0', color: '#555', lineHeight: 1.6 }}>
                <strong>Số nóng</strong> là những con số xuất hiện với tần suất cao nhất trong khoảng thời gian gần đây (30 ngày).
              </li>
              <li style={{ padding: '8px 0', color: '#555', lineHeight: 1.6 }}>
                Top 3 số nóng được đánh dấu với huy chương 🥇🥈🥉 và màu sắc nổi bật.
              </li>
              <li style={{ padding: '8px 0', color: '#555', lineHeight: 1.6 }}>
                Thanh tiến trình cho biết tần suất tương đối của mỗi số so với số nóng nhất.
              </li>
              <li style={{ padding: '8px 0', color: '#555', lineHeight: 1.6 }}>
                Dữ liệu được cập nhật định kỳ mỗi 6 giờ.
              </li>
            </ul>
          </div>
        </StatsPageLayout>
      </main>

      <Sidebar />
    </div>
  );
}

export const revalidate = 21600; // 6 hours

export const metadata = {
  title: 'Số Nóng Miền Bắc - Top Số Hay Về Nhất',
  description: 'Thống kê số nóng (số hay về nhất) trong 30 ngày gần đây tại xổ số Miền Bắc. Cập nhật liên tục.',
  keywords: 'số nóng, số hay về, thống kê xổ số, miền bắc',
};
