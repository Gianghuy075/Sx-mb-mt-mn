import { NextRequest, NextResponse } from 'next/server';
import {
  getHotNumbers,
  getGapNumbers,
  getFrequency,
  getHeadTail,
  getPairFrequency,
  getSpecialWeek,
  getLotoCycle,
  getMatrix,
  getTheoTong,
  getLoGan,
} from '@/lib/api/lottery';
import type { Region } from '@/lib/types/lottery';

const normalizeRegion = (value: string | null): Region => {
  const v = (value || '').trim().toLowerCase();
  if (v === 'mt') return 'mt';
  if (v === 'mn') return 'mn';
  return 'mb';
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ region: string }> }) {
  const { region: regionParam } = await params;
  const region = normalizeRegion(regionParam);

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
    getPairFrequency(region),
    getSpecialWeek(region),
    getLotoCycle(region),
    getMatrix(region),
    getTheoTong(region),
    getLoGan(region),
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
