import { NextRequest, NextResponse } from 'next/server';
import { fetchLotteryData } from '@/lib/api/client';
import { getTodayString } from '@/lib/utils/dates';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const region = (searchParams.get('region') || 'mn') as 'mb' | 'mt' | 'mn';
    const date = searchParams.get('date') || getTodayString();

    console.log(`[Test API] Fetching ${region}/${date}`);

    const data = await fetchLotteryData(region, date);

    return NextResponse.json({
      success: true,
      region: data.region,
      date: data.date,
      provinces: data.region === 'mb' ? 1 : (data as any).provinces?.length || 0,
    });
  } catch (error) {
    console.error('[Test API Error]', error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
