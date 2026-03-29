/**
 * Analysis Page - Phân tích
 */

import Sidebar from '@/components/layout/Sidebar/Sidebar';

export default function AnalysisPage() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '24px'
    }}>
      <main style={{ minWidth: 0, background: 'white', padding: '24px', borderRadius: '8px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc0000', marginBottom: '20px' }}>
          Phân Tích Xổ Số
        </h1>

        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          <p style={{ fontSize: '16px', marginBottom: '12px' }}>Trang phân tích đang được phát triển</p>
          <p style={{ fontSize: '14px' }}>Phân tích xu hướng, dự đoán, thống kê chi tiết...</p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Các công cụ phân tích:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Phân tích xu hướng:</strong> Theo dõi các con số nóng, lạnh
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Biểu đồ thống kê:</strong> Trực quan hóa dữ liệu
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Tần suất xuất hiện:</strong> Phân tích theo tuần, tháng
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Chu kỳ lô tô:</strong> Theo dõi chu kỳ của các con số
            </li>
          </ul>
        </div>
      </main>

      <Sidebar />
    </div>
  );
}

export const metadata = {
  title: 'Phân Tích Xổ Số - Dự Đoán & Thống Kê',
  description: 'Phân tích xổ số, dự đoán xu hướng, thống kê tần suất và chu kỳ các con số',
  keywords: 'phân tích xổ số, dự đoán, xu hướng, thống kê',
};
