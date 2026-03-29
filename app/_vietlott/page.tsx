/**
 * Vietlott Page
 */

import Sidebar from '@/components/layout/Sidebar/Sidebar';

export default function VietlottPage() {
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
          Xổ Số Điện Toán Vietlott
        </h1>

        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          <p style={{ fontSize: '16px', marginBottom: '12px' }}>Trang Vietlott đang được phát triển</p>
          <p style={{ fontSize: '14px' }}>Mega 6/45, Power 6/55, Max 3D, Max 4D...</p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Các sản phẩm Vietlott:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Mega 6/45:</strong> Quay thưởng Thứ 4, Thứ 6, Chủ nhật
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Power 6/55:</strong> Quay thưởng Thứ 3, Thứ 5, Thứ 7
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Max 3D:</strong> Quay thưởng hàng ngày
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Max 4D:</strong> Quay thưởng hàng ngày
            </li>
          </ul>
        </div>
      </main>

      <Sidebar />
    </div>
  );
}

export const metadata = {
  title: 'Vietlott - Xổ Số Điện Toán',
  description: 'Kết quả xổ số điện toán Vietlott: Mega 6/45, Power 6/55, Max 3D, Max 4D',
  keywords: 'vietlott, mega 6/45, power 6/55, max 3d, max 4d',
};
