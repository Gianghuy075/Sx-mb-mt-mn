/**
 * Results Page: /[region]/[date]
 * Displays lottery results for a specific region and date
 */

import { notFound } from 'next/navigation';
import { fetchLotteryData } from '@/lib/api/client';
import { getHeadTail, getHotNumbers, getGapNumbers, getFrequency } from '@/lib/api/lottery';
import { isValidRegion } from '@/lib/utils/regions';
import { isValidDate, getTodayString, isFutureDate } from '@/lib/utils/dates';
import ResultsTableMB from '@/components/lottery/ResultsTable/ResultsTableMB';
import ResultsTableMulti from '@/components/lottery/ResultsTable/ResultsTableMulti';
import DayTabs from '@/components/lottery/DayTabs/DayTabs';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Breadcrumb from '@/components/layout/Breadcrumb/Breadcrumb';
import type { Region, LotteryDataMB } from '@/lib/types/lottery';

interface PageProps {
  params: Promise<{
    region: string;
    date: string;
  }>;
}

export default async function ResultsPage({ params }: PageProps) {
  const { region, date } = await params;

  // Validate region
  if (!isValidRegion(region)) {
    notFound();
  }

  // Handle "today" alias
  const actualDate = date === 'today' ? getTodayString() : date;

  // Validate date
  if (!isValidDate(actualDate) || isFutureDate(actualDate)) {
    notFound();
  }

  const typedRegion = region as Region;

  // Fetch lottery data and statistics in parallel (per-region)
  const [data, headTailData, hotNumbers, gapNumbers, frequencyData] = await Promise.all([
    fetchLotteryData(typedRegion, actualDate),
    getHeadTail(typedRegion),
    getHotNumbers(typedRegion, 10),
    getGapNumbers(typedRegion, 10),
    getFrequency(typedRegion, 20),
  ]);

  return (
    <>
      <Breadcrumb region={typedRegion} />

      <div className="main-wrapper">
        <main className="main-content">
          <DayTabs currentRegion={typedRegion} currentDate={actualDate} />

          {!data ? (
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '48px',
              textAlign: 'center',
              color: '#666',
              fontSize: '16px',
            }}>
              Chưa có kết quả xổ số. Vui lòng quay lại sau 18:30.
            </div>
          ) : data.region === 'mb' ? (
              <ResultsTableMB
                data={data as LotteryDataMB}
                headTailData={headTailData}
                hotNumbers={hotNumbers}
                gapNumbers={gapNumbers}
                frequencyData={frequencyData}
              />
            ) : (
              <ResultsTableMulti
                data={data}
                hotNumbers={hotNumbers}
                gapNumbers={gapNumbers}
                frequencyData={frequencyData}
              />
            )}
        </main>

        <Sidebar />
      </div>
    </>
  );
}

// Disable HTML/route caching – we already cache data at API layer
export const revalidate = 0;

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { region, date } = await params;
  const actualDate = date === 'today' ? getTodayString() : date;

  const regionNames = {
    mb: 'Miền Bắc',
    mt: 'Miền Trung',
    mn: 'Miền Nam',
  };

  const regionName = isValidRegion(region) ? regionNames[region as Region] : 'Xổ Số';

  return {
    title: `KQXS ${regionName} ${actualDate} - Kết quả xổ số ${regionName}`,
    description: `Xem kết quả xổ số ${regionName} ngày ${actualDate}. Cập nhật nhanh nhất, chính xác nhất.`,
    keywords: `xổ số ${regionName}, KQXS ${regionName}, kết quả xổ số, ${actualDate}`,
  };
}

// Generate static params for recent dates (optional)
export async function generateStaticParams() {
  const regions: Region[] = ['mb', 'mt', 'mn'];
  const today = getTodayString();

  return regions.map((region) => ({
    region,
    date: today,
  }));
}
