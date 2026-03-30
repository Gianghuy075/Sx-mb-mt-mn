/**
 * Head-Tail Numbers Page - Số đầu đuôi
 */

import Sidebar from '@/components/layout/Sidebar/Sidebar';

export default function HeadTailPage() {
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
          Thống Kê Số Đầu Đuôi
        </h1>

        <div style={{ background: '#fff9cc', padding: '20px', borderRadius: '8px', marginBottom: '30px', textAlign: 'center' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Bảng Thống Kê Đầu Đuôi Xổ Số</p>
        </div>

        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          <p style={{ fontSize: '16px', marginBottom: '12px' }}>Trang thống kê đầu đuôi đang được phát triển</p>
          <p style={{ fontSize: '14px' }}>Thống kê số đầu 0-9, số đuôi 0-9, tần suất xuất hiện...</p>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Các loại thống kê:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Thống kê đầu:</strong> Các số bắt đầu từ 0x, 1x, 2x... đến 9x
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Thống kê đuôi:</strong> Các số kết thúc bằng x0, x1, x2... đến x9
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Lô xiên:</strong> Kết hợp đầu và đuôi
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #e5e5e5' }}>
              <strong>Tần suất:</strong> Đầu/đuôi nào hay về nhất
            </li>
          </ul>
        </div>
      </main>

      <Sidebar />
    </div>
  );
}

export const metadata = {
  title: 'Thống Kê Số Đầu Đuôi',
  description: 'Thống kê số đầu, số đuôi, lô xiên trong xổ số Miền Bắc, Miền Trung, Miền Nam',
  keywords: 'số đầu, số đuôi, lô xiên, thống kê đầu đuôi',
};
