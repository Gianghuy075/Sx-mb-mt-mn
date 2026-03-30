/**
 * Home Page - Display today's Miền Bắc lottery results
 */

import { fetchLotteryData } from '@/lib/api/client';
import { getTodayString } from '@/lib/utils/dates';
import ResultsTableMB from '@/components/lottery/ResultsTable/ResultsTableMB';
import DayTabs from '@/components/lottery/DayTabs/DayTabs';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Breadcrumb from '@/components/layout/Breadcrumb/Breadcrumb';
import type { LotteryDataMB } from '@/lib/types/lottery';

export default async function HomePage() {
  const today = getTodayString();
  
  try {
    const data = await fetchLotteryData('mb', today);
    
    return (
      <>
        <Breadcrumb region="mb" />

        <div className="main-wrapper">
          <main className="main-content">
            <DayTabs currentRegion="mb" />

            {data.region === 'mb' ? (
              <ResultsTableMB data={data as LotteryDataMB} />
            ) : (
              <div style={{ padding: '20px', background: '#fff', textAlign: 'center' }}>
                Không thể tải dữ liệu
              </div>
            )}
          </main>

          <Sidebar />
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching lottery data:', error);
    
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#f5f5f5' }}>
        <h1>Lỗi tải dữ liệu</h1>
        <p>Không thể tải kết quả xổ số. Vui lòng thử lại sau.</p>
      </div>
    );
  }
}
