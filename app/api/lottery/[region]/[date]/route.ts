/**
 * API Route: /api/lottery/[region]/[date]
 * Proxy to xsapi.vn with server-side caching
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchLotteryData, getRevalidationTime } from '@/lib/api/client';
import { isValidRegion } from '@/lib/utils/regions';
import { isValidDate, isFutureDate } from '@/lib/utils/dates';
import type { Region } from '@/lib/types/lottery';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ region: string; date: string }> }
) {
  const { region, date } = await params;

  // Validate region
  if (!isValidRegion(region)) {
    return NextResponse.json(
      { error: 'Invalid region. Must be mb, mt, or mn' },
      { status: 400 }
    );
  }

  // Validate date format
  if (!isValidDate(date)) {
    return NextResponse.json(
      { error: 'Invalid date format. Must be YYYY-MM-DD' },
      { status: 400 }
    );
  }

  // Prevent future dates
  if (isFutureDate(date)) {
    return NextResponse.json(
      { error: 'Cannot fetch data for future dates' },
      { status: 400 }
    );
  }

  try {
    // Fetch lottery data (with demo fallback)
    const data = await fetchLotteryData(region as Region, date);

    // Get revalidation time based on date
    const revalidate = getRevalidationTime(date);

    // Return with appropriate cache headers
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': revalidate
          ? `public, s-maxage=${revalidate}, stale-while-revalidate=86400`
          : 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('API route error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch lottery data' },
      { status: 500 }
    );
  }
}

// Enable Edge Runtime for better performance (optional)
export const runtime = 'nodejs';

// Set revalidation based on date (ISR)
export const revalidate = 300; // Default: 5 minutes
