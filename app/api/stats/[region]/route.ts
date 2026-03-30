import { NextRequest, NextResponse } from 'next/server';
import { getHotNumbers, getGapNumbers, getFrequency, getHeadTail } from '@/lib/api/lottery';
import * as xosoapi from '@/lib/api/xosoapi';
import type { Region } from '@/lib/types/lottery';

const normalizeRegion = (value: string | null): Region => {
  const v = (value || '').trim().toLowerCase();
  if (v === 'mt') return 'mt';
  if (v === 'mn') return 'mn';
  return 'mb';
};

export async function GET(_req: NextRequest, { params }: { params: { region: string } }) {
  const region = normalizeRegion(params.region);

  const [
    hotNumbers,
    gap,
    frequency,
    headTail,
    pairFrequency,
    specialWeek,
    lotoCycle,
    matrix,
    theoTong,
    loGan,
  ] = await Promise.all([
    getHotNumbers(region),
    getGapNumbers(region),
    getFrequency(region),
    getHeadTail(region),
    xosoapi.getPairFrequency({ region: region.toUpperCase() as any }).catch((e) => ({ success: false, error: String(e) })),
    xosoapi.getSpecialWeek({ region: region.toUpperCase() as any }).catch((e) => ({ success: false, error: String(e) })),
    xosoapi.getLotoCycle({ region: region.toUpperCase() as any }).catch((e) => ({ success: false, error: String(e) })),
    xosoapi.getMatrix({ region: region.toUpperCase() as any }).catch((e) => ({ success: false, error: String(e) })),
    xosoapi.getTheoTong({ region: region.toUpperCase() as any }).catch((e) => ({ success: false, error: String(e) })),
    xosoapi.getLoGan({ region: 'MB' as any }).catch((e) => ({ success: false, error: String(e) })), // chỉ MB hỗ trợ
  ]);

  return NextResponse.json({
    region,
    hotNumbers,
    gap,
    frequency,
    headTail,
    pairFrequency,
    specialWeek,
    lotoCycle,
    matrix,
    theoTong,
    loGan,
  });
}
