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
import { XSMN_DEMO_DATA } from '@/lib/data/xsmn-demo';
import { XSMB_DEMO_DATA } from '@/lib/data/xsmb-demo';
import { XSMT_DEMO_DATA } from '@/lib/data/xsmt-demo';
import type { Region } from '@/lib/types/lottery';

interface PageProps {
  params: Promise<{
    region: string;
    date: string;
  }>;
}

export default async function ResultsPage({ params }: PageProps) {
  try {
    const { region, date } = await params;

    console.log(`[ResultsPage] Attempting to load ${region}/${date}`);

    // Validate region
    if (!isValidRegion(region)) {
      console.warn(`[ResultsPage] Invalid region: ${region}`);
      notFound();
    }

    // Handle "today" alias
    const actualDate = date === 'today' ? getTodayString() : date;

    // Validate date
    if (!isValidDate(actualDate)) {
      console.warn(`[ResultsPage] Invalid date format: ${actualDate}`);
      notFound();
    }

    if (isFutureDate(actualDate)) {
      console.warn(`[ResultsPage] Future date not allowed: ${actualDate}`);
      notFound();
    }

    console.log(`[ResultsPage] Valid params: region=${region}, date=${actualDate}`);

    // Fetch lottery data (Server Component - runs on server)
    // Use fixed demo data for both MB and MN
    let data;
    if (region === 'mb') {
      data = XSMB_DEMO_DATA;
      console.log(`[ResultsPage] Using fixed XSMB demo data`);
    } else if (region === 'mn') {
      data = XSMN_DEMO_DATA;
      console.log(`[ResultsPage] Using fixed XSMN demo data`);
    } else if (region === 'mt') {
      data = XSMT_DEMO_DATA;
      console.log(`[ResultsPage] Using fixed XSMT demo data`);
    } else {
      data = await fetchLotteryData(region as Region, actualDate);
    }

    console.log(`[ResultsPage] Data fetched: region=${data.region}, provinces=${data.region === 'mb' ? 1 : (data as any).provinces?.length || 0}`);

    return (
      <>
        <Breadcrumb region={region as Region} />

        <div className="main-wrapper">
          <main className="main-content">
            <DayTabs currentRegion={region as Region} />

            {data.region === 'mb' ? (
              <ResultsTableMB data={data as any} />
            ) : (
              <ResultsTableMulti data={data as any} />
            )}
          </main>

          <Sidebar />
        </div>
      </>
    );
  } catch (error) {
    console.error('[ResultsPage] Error:', error);
    throw error;
  }
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
