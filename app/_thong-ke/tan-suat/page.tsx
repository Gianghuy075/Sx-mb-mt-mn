/**
 * Frequency Page: /thong-ke/tan-suat
 * Detailed view of all number frequencies
 */

import { getFrequency } from '@/lib/api/lottery';
import Frequency from '@/components/lottery/Statistics/Frequency';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import StatsPageLayout from '@/components/lottery/Statistics/StatsPageLayout';

export default async function FrequencyPage() {
  const freqData = await getFrequency('mb', 100);

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
            { label: 'Tần Suất' },
          ]}
          headerTitle="📊 Tần Suất - Miền Bắc"
          headerSubtitle="Thống kê tần suất xuất hiện của tất cả các số từ 00 đến 99"
          headerColor="#2196F3"
        >
          {freqData?.success && freqData.data.length > 0 ? (
            <Frequency data={freqData.data} region="MB" />
          ) : (
            <div style={{ background: 'white', padding: '48px', borderRadius: '12px', textAlign: 'center', color: '#666' }}>
              <p>Không có dữ liệu tần suất</p>
            </div>
          )}

          <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #2196F3', marginTop: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>📖 Hướng dẫn sử dụng</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '8px 0', color: '#555', lineHeight: 1.6 }}>
                <strong>Sắp xếp theo tần suất</strong>: Xem các số xuất hiện nhiều nhất ở đầu danh sách.
              </li>
              <li style={{ padding: '8px 0', color: '#555', lineHeight: 1.6 }}>
                <strong>Sắp xếp theo số thứ tự</strong>: Xem các số theo thứ tự từ 00 đến 99.
              </li>
              <li style={{ padding: '8px 0', color: '#555', lineHeight: 1.6 }}>
                <strong>Lọc theo đầu số</strong>: Chọn 0x, 1x, 2x... để xem các số bắt đầu bằng chữ số đó.
              </li>
              <li style={{ padding: '8px 0', color: '#555', lineHeight: 1.6 }}>
                <strong>Thanh tiến trình</strong>: Thể hiện tần suất tương đối so với số xuất hiện nhiều nhất.
              </li>
              <li style={{ padding: '8px 0', color: '#555', lineHeight: 1.6 }}>
                <strong>Phần trăm</strong>: Tỷ lệ xuất hiện của mỗi số so với tổng số lần quay.
              </li>
            </ul>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', marginTop: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>📈 Tóm tắt thống kê</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3', marginBottom: '8px' }}>
                  {freqData?.data?.length || 0}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Số được theo dõi</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3', marginBottom: '8px' }}>
                  {freqData?.data?.[0]?.frequency || 0}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Tần suất cao nhất</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3', marginBottom: '8px' }}>30 ngày</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Khoảng thời gian</div>
              </div>
            </div>
          </div>
        </StatsPageLayout>
      </main>

      <Sidebar />
    </div>
  );
}

export const revalidate = 21600; // 6 hours

export const metadata = {
  title: 'Tần Suất Xuất Hiện - Thống Kê Miền Bắc',
  description: 'Thống kê tần suất xuất hiện của tất cả các số từ 00-99 tại xổ số Miền Bắc. Dữ liệu 30 ngày gần nhất.',
  keywords: 'tần suất xổ số, thống kê chi tiết, miền bắc, 00-99',
};
