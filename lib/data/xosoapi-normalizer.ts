/**
 * XoSoAPI Response Normalizer
 * Transforms XoSoAPI.online responses to LotteryData format
 */

import type { Region, LotteryData, Prize, PrizeClass } from '@/lib/types/lottery';

// Prize code to Vietnamese label mapping
const PRIZE_LABELS: Record<string, string> = {
  'DB': 'Giải đặc biệt',
  'G1': 'Giải nhất',
  'G2': 'Giải nhì',
  'G3': 'Giải ba',
  'G4': 'Giải tư',
  'G5': 'Giải năm',
  'G6': 'Giải sáu',
  'G7': 'Giải bảy',
  'G8': 'Giải tám',
};

// Prize code to CSS class mapping
const PRIZE_CLASSES: Record<string, PrizeClass> = {
  'DB': 'special',
  'G1': 'first',
  'G2': 'second',
  'G3': 'third',
  'G4': 'fourth',
  'G5': 'fifth',
  'G6': 'sixth',
  'G7': 'seventh',
  'G8': 'eighth',
};

/**
 * XoSoAPI Draw Response Structure
 */
interface XoSoAPIDrawResult {
  prizeCode: string;
  prizeOrder: number;
  values: string[];
}

interface XoSoAPIDraw {
  id: string;
  date: string; // ISO 8601 format
  province: {
    id: number;
    code: string;
    name: string;
    region: {
      code: string;
      name: string;
    };
  };
  results: XoSoAPIDrawResult[];
}

interface XoSoAPIResponse {
  success: boolean;
  data: XoSoAPIDraw[];
}

/**
 * Normalize XoSoAPI draws response to LotteryData format
 *
 * @param response - XoSoAPI response from /api/v1/vietnam/draws
 * @param region - Target region (mb, mt, mn)
 * @returns Normalized LotteryData
 */
export function normalizeXoSoAPIDraws(
  response: XoSoAPIResponse,
  region: Region
): LotteryData {
  if (!response.success || !response.data || response.data.length === 0) {
    throw new Error('Invalid XoSoAPI response');
  }

  const draw = response.data[0]; // Get the first draw

  // Extract date (YYYY-MM-DD)
  const date = draw.date.split('T')[0];

  // Transform results to prizes
  const prizes: Prize[] = draw.results
    .filter(r => r.prizeCode !== 'MA_DB') // Skip metadata field
    .sort((a, b) => a.prizeOrder - b.prizeOrder) // Ensure correct order
    .map(result => ({
      label: PRIZE_LABELS[result.prizeCode] || result.prizeCode,
      numbers: result.values,
      cls: PRIZE_CLASSES[result.prizeCode] || 'special',
    }));

  // Handle MB region (single province format)
  if (region === 'mb') {
    return {
      region: 'mb',
      date,
      provinces: [draw.province.name],
      prizes,
    };
  }

  // Handle MT/MN regions (multi-province format)
  return {
    region,
    date,
    provinces: [{
      name: draw.province.name,
      prizes,
    }],
  };
}

/**
 * Normalize multiple draws for multi-province regions (MT/MN)
 *
 * @param response - XoSoAPI response with multiple draws
 * @param region - Target region (mt or mn)
 * @returns Normalized LotteryData with multiple provinces
 */
export function normalizeMultiProvinceDraws(
  response: XoSoAPIResponse,
  region: 'mt' | 'mn'
): LotteryData {
  if (!response.success || !response.data || response.data.length === 0) {
    throw new Error('Invalid XoSoAPI response');
  }

  // Assume all draws are from the same date
  const date = response.data[0].date.split('T')[0];

  // Transform each draw to a province
  const provinces = response.data.map(draw => {
    const prizes: Prize[] = draw.results
      .filter(r => r.prizeCode !== 'MA_DB')
      .sort((a, b) => a.prizeOrder - b.prizeOrder)
      .map(result => ({
        label: PRIZE_LABELS[result.prizeCode] || result.prizeCode,
        numbers: result.values,
        cls: PRIZE_CLASSES[result.prizeCode] || 'special',
      }));

    return {
      name: draw.province.name,
      prizes,
    };
  });

  return {
    region,
    date,
    provinces,
  };
}

/**
 * Check if response is valid
 */
export function isValidXoSoAPIResponse(response: any): response is XoSoAPIResponse {
  return (
    response &&
    typeof response === 'object' &&
    response.success === true &&
    Array.isArray(response.data) &&
    response.data.length > 0
  );
}

/**
 * Extract error message from XoSoAPI response
 */
export function extractErrorMessage(response: any): string {
  if (response?.error?.message) {
    return response.error.message;
  }
  if (response?.error?.details) {
    return response.error.details;
  }
  return 'Unknown error from XoSoAPI';
}
