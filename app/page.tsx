/**
 * Home Page - XSMB hôm nay
 */

import { fetchLotteryData } from '@/lib/api/client';
import { getHeadTail, getHotNumbers, getGapNumbers, getFrequency } from '@/lib/api/lottery';
import { getTodayString } from '@/lib/utils/dates';
import ResultsTableMB from '@/components/lottery/ResultsTable/ResultsTableMB';
import DayTabs from '@/components/lottery/DayTabs/DayTabs';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Breadcrumb from '@/components/layout/Breadcrumb/Breadcrumb';
import type { LotteryDataMB } from '@/lib/types/lottery';

export const revalidate = 300; // 5 phút

export default async function HomePage() {
  const today = getTodayString();
  const [data, headTailData, hotNumbers, gapNumbers, frequencyData] = await Promise.all([
    fetchLotteryData('mb', today),
    getHeadTail('mb'),
    getHotNumbers('mb', 10),
    getGapNumbers('mb', 10),
    getFrequency('mb', 20),
  ]);

  return (
    <>
      <Breadcrumb region="mb" />
      <div className="main-wrapper">
        <main className="main-content">
          <DayTabs currentRegion="mb" currentDate={today} />
          {data ? (
            <ResultsTableMB
              data={data as LotteryDataMB}
              headTailData={headTailData}
              hotNumbers={hotNumbers}
              gapNumbers={gapNumbers}
              frequencyData={frequencyData}
            />
          ) : (
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '48px',
              textAlign: 'center',
              color: '#666',
              fontSize: '16px',
            }}>
              Chưa có kết quả xổ số hôm nay. Vui lòng quay lại sau 18:30.
            </div>
          )}
        </main>
        <Sidebar />
      </div>
    </>
  );
}
