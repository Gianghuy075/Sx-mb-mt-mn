/**
 * Gap Numbers Page: /thong-ke/so-gan
 * Simple table style like xoso.com.vn
 */

import { getGapNumbers } from '@/lib/api/lottery';
import GapNumbersTable from '@/components/lottery/Statistics/GapNumbersTable';
import Sidebar from '@/components/layout/Sidebar/Sidebar';

export default async function GapNumbersPage() {
  const gapData = await getGapNumbers('mb', 20);

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
        {gapData?.success && gapData.data.length > 0 ? (
          <GapNumbersTable data={gapData.data} region="MB" />
        ) : (
          <div style={{ background: 'white', padding: '48px', textAlign: 'center', color: '#666' }}>
            <p>Không có dữ liệu lô gan</p>
          </div>
        )}
      </main>

      <Sidebar />
    </div>
  );
}

export const revalidate = 21600; // 6 hours

export const metadata = {
  title: 'Lô Gan Miền Bắc - Số Lâu Không Về',
  description: 'Thống kê lô gan (số lâu không xuất hiện) tại xổ số Miền Bắc. Xem các con số đang ở trạng thái "gan".',
  keywords: 'lô gan, số lâu về, thống kê xổ số, miền bắc',
};
