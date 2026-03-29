/**
 * Results Page: /[region]/[date]
 * Displays lottery results for a specific region and date
 */

import { notFound } from 'next/navigation';
import { fetchLotteryData } from '@/lib/api/client';
import { isValidRegion } from '@/lib/utils/regions';
import { isValidDate, getTodayString, isFutureDate } from '@/lib/utils/dates';
import ResultsTableMB from '@/components/lottery/ResultsTable/ResultsTableMB';
import ResultsTableMulti from '@/components/lottery/ResultsTable/ResultsTableMulti';
import DayTabs from '@/components/lottery/DayTabs/DayTabs';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Breadcrumb from '@/components/layout/Breadcrumb/Breadcrumb';
import type { Region } from '@/lib/types/lottery';

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

  // Fetch lottery data (Server Component - runs on server)
  const data = await fetchLotteryData(region as Region, actualDate);

  return (
    <>
      <Breadcrumb region={region as Region} />

      <div className="main-wrapper">
        <main className="main-content">
          <DayTabs currentRegion={region as Region} />

          {data.region === 'mb' ? (
            <ResultsTableMB data={data} />
          ) : (
            <ResultsTableMulti data={data} />
          )}
        </main>

        <Sidebar />
      </div>
    </>
  );
}

// Configure ISR revalidation (matches database cache TTL)
export const revalidate = 21600; // 6 hours

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

  // Generate params for today for all regions
  return regions.map((region) => ({
    region,
    date: today,
  }));
}
