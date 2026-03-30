/**
 * High-Level Lottery API with Database Caching
 * Integrates XoSoAPI with cache layer to optimize API usage
 */

import type { Region, LotteryData } from '@/lib/types/lottery';
import { cacheService } from '@/lib/services/cache';
import * as xosoapi from '@/lib/api/xosoapi';
import {
  normalizeXoSoAPIDraws,
  normalizeMultiProvinceDraws,
  isValidXoSoAPIResponse,
  extractErrorMessage,
} from '@/lib/data/xosoapi-normalizer';
import { getTodayString, getPreviousDate } from '@/lib/utils/dates';
import { demoMB, demoMT, demoMN } from '@/lib/data/demoGenerator';

/**
 * Dev-only detailed API error logger.
 * Helps pinpoint which upstream endpoint/params failed without spamming production logs.
 */
function logApiError(source: string, endpoint: string, params: Record<string, any>, error: any) {
  if (process.env.NODE_ENV !== 'development') return;

  const status = error?.response?.status ?? 'n/a';
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Unknown error';

  let body = '';
  try {
    body = error?.response?.data ? JSON.stringify(error.response.data).slice(0, 800) : '';
  } catch {
    body = '[unserializable]';
  }

  console.error(
    `[API ERROR][${source}] endpoint=${endpoint} status=${status} msg=${message} params=${JSON.stringify(
      params
    )} body=${body}`
  );
}

/**
 * Helper function to generate demo data for any region
 */
function generateDemoData(region: Region, date: string): LotteryData {
  switch (region) {
    case 'mb':
      return demoMB(date);
    case 'mt':
      return demoMT(date);
    case 'mn':
      return demoMN(date);
  }
}

/**
 * Get lottery draws with caching
 *
 * Flow:
 * 1. Check cache (fresh)
 * 2. Call XoSoAPI if cache miss/expired
 * 3. Return stale cache on rate limit (429)
 * 4. Fallback to demo data if all fails
 *
 * @param region - Lottery region (mb, mt, mn)
 * @param date - Date in YYYY-MM-DD format
 * @returns LotteryData
 */
export async function getDraws(region: Region, date: string): Promise<LotteryData> {
  const cacheKey = cacheService.generateKey({
    region,
    dataType: 'draws',
    date,
  });

  try {
    // 1. Try fresh cache
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }

    console.log(`[Cache MISS] ${cacheKey}`);

    // 2. Call XoSoAPI
    const response = await xosoapi.getRecentDraws({
      region: region.toUpperCase() as 'MB' | 'MT' | 'MN',
      date,
      limit: region === 'mb' ? 1 : undefined, // MB: 1 draw, MT/MN: all draws for date
    });

    // If today's draw hasn't happened yet (API returns empty []), retry with yesterday
    if (
      response?.success === true &&
      Array.isArray(response?.data) &&
      response.data.length === 0 &&
      date === getTodayString()
    ) {
      const yesterday = getPreviousDate(date);
      console.log(`[Empty draws] Today (${date}) has no results yet, retrying with ${yesterday}`);
      return await getDraws(region, yesterday);
    }

    // Validate response
    if (!isValidXoSoAPIResponse(response)) {
      throw new Error(`Invalid API response: ${extractErrorMessage(response)}`);
    }

    // 3. Normalize data
    let normalizedData: LotteryData;
    if (region === 'mb') {
      normalizedData = normalizeXoSoAPIDraws(response, region);
    } else {
      normalizedData = normalizeMultiProvinceDraws(response, region);
    }

    // 4. Store in cache
    const expiresAt = cacheService.calculateExpiration({
      region,
      dataType: 'draws',
      date,
    });

    await cacheService.set(cacheKey, normalizedData, expiresAt);
    console.log(`[Cache SET] ${cacheKey} (expires: ${expiresAt.toISOString()})`);

    return normalizedData;

  } catch (error: any) {
    logApiError('getDraws', 'xosoapi.getRecentDraws', { region, date }, error);

    // 5. On rate limit (429), try stale cache
    if (error.response?.status === 429) {
      console.warn('[Rate Limited] Attempting stale cache...');
      const stale = await cacheService.get(cacheKey, { includeExpired: true });
      if (stale) {
        console.log(`[Cache STALE] ${cacheKey}`);
        return JSON.parse(stale.data);
      }
    }

    // 6. Fallback to demo data
    console.warn('[Fallback] Using demo data');
    return generateDemoData(region, date);
  }
}

/**
 * Get hot numbers statistics with caching
 *
 * @param region - Lottery region
 * @param limit - Number of results (default: 10)
 * @returns Hot numbers data
 */
export async function getHotNumbers(region: Region, limit: number = 10) {
  const cacheKey = cacheService.generateKey({
    region,
    dataType: 'hot-numbers',
  });

  try {
    // 1. Try fresh cache
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }

    console.log(`[Cache MISS] ${cacheKey}`);

    // 2. Call XoSoAPI
    const response = await xosoapi.getHotNumbers({
      region: region.toUpperCase() as 'MB',
      limit,
    });

    if (!response.success) {
      throw new Error(extractErrorMessage(response));
    }

    // 3. Store in cache (6 hours TTL for stats)
    const expiresAt = cacheService.calculateExpiration({
      region,
      dataType: 'hot-numbers',
    });

    await cacheService.set(cacheKey, response, expiresAt);
    console.log(`[Cache SET] ${cacheKey}`);

    return response;

  } catch (error: any) {
    logApiError('getHotNumbers', 'xosoapi.getHotNumbers', { region, limit }, error);

    // Fallback to stale cache
    const stale = await cacheService.get(cacheKey, { includeExpired: true });
    if (stale) {
      console.log(`[Cache STALE] ${cacheKey}`);
      return JSON.parse(stale.data);
    }

    // Return empty result
    return {
      success: false,
      data: [],
      meta: { region: region.toUpperCase(), error: 'Failed to fetch hot numbers' },
    };
  }
}

/**
 * Get gap numbers statistics with caching
 *
 * @param region - Lottery region
 * @param limit - Number of results (default: 10)
 * @returns Gap numbers data
 */
export async function getGapNumbers(region: Region, limit: number = 10) {
  const cacheKey = cacheService.generateKey({
    region,
    dataType: 'gap',
  });

  try {
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }

    console.log(`[Cache MISS] ${cacheKey}`);

    const response = await xosoapi.getGapNumbers({
      region: region.toUpperCase() as 'MB',
      limit,
    });

    if (!response.success) {
      throw new Error(extractErrorMessage(response));
    }

    const expiresAt = cacheService.calculateExpiration({
      region,
      dataType: 'gap',
    });

    await cacheService.set(cacheKey, response, expiresAt);
    console.log(`[Cache SET] ${cacheKey}`);

    return response;

  } catch (error: any) {
    logApiError('getGapNumbers', 'xosoapi.getGapNumbers', { region, limit }, error);

    const stale = await cacheService.get(cacheKey, { includeExpired: true });
    if (stale) {
      console.log(`[Cache STALE] ${cacheKey}`);
      return JSON.parse(stale.data);
    }

    return {
      success: false,
      data: [],
      meta: { region: region.toUpperCase(), error: 'Failed to fetch gap numbers' },
    };
  }
}

/**
 * Get frequency statistics with caching
 *
 * @param region - Lottery region
 * @param limit - Number of results (default: 100)
 * @returns Frequency data
 */
export async function getFrequency(region: Region, limit: number = 100) {
  const cacheKey = cacheService.generateKey({
    region,
    dataType: 'frequency',
  });

  try {
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }

    console.log(`[Cache MISS] ${cacheKey}`);

    const response = await xosoapi.getFrequency({
      region: region.toUpperCase() as 'MB',
      limit,
    });

    if (!response.success) {
      throw new Error(extractErrorMessage(response));
    }

    const expiresAt = cacheService.calculateExpiration({
      region,
      dataType: 'frequency',
    });

    await cacheService.set(cacheKey, response, expiresAt);
    console.log(`[Cache SET] ${cacheKey}`);

    return response;

  } catch (error: any) {
    logApiError('getFrequency', 'xosoapi.getFrequency', { region, limit }, error);

    const stale = await cacheService.get(cacheKey, { includeExpired: true });
    if (stale) {
      console.log(`[Cache STALE] ${cacheKey}`);
      return JSON.parse(stale.data);
    }

    return {
      success: false,
      data: [],
      meta: { region: region.toUpperCase(), error: 'Failed to fetch frequency data' },
    };
  }
}

/**
 * Get head-tail statistics with caching
 *
 * @param region - Lottery region
 * @returns Head-tail data
 */
export async function getHeadTail(region: Region) {
  const cacheKey = cacheService.generateKey({
    region,
    dataType: 'head-tail',
  });

  try {
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }

    console.log(`[Cache MISS] ${cacheKey}`);

    const response = await xosoapi.getHeadTail({
      region: region.toUpperCase() as 'MB',
    });

    if (!response.success) {
      throw new Error(extractErrorMessage(response));
    }

    const expiresAt = cacheService.calculateExpiration({
      region,
      dataType: 'head-tail',
    });

    await cacheService.set(cacheKey, response, expiresAt);
    console.log(`[Cache SET] ${cacheKey}`);

    return response;

  } catch (error: any) {
    logApiError('getHeadTail', 'xosoapi.getHeadTail', { region }, error);

    const stale = await cacheService.get(cacheKey, { includeExpired: true });
    if (stale) {
      console.log(`[Cache STALE] ${cacheKey}`);
      return JSON.parse(stale.data);
    }

    return {
      success: false,
      data: {},
      meta: { region: region.toUpperCase(), error: 'Failed to fetch head-tail data' },
    };
  }
}

/**
 * Get pair frequency statistics with caching
 */
export async function getPairFrequency(region: Region) {
  const cacheKey = cacheService.generateKey({ region, dataType: 'pair-frequency' });

  try {
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }
    console.log(`[Cache MISS] ${cacheKey}`);

    const response = await xosoapi.getPairFrequency({ region: region.toUpperCase() as 'MB' });

    if (!response.success) throw new Error(extractErrorMessage(response));

    const expiresAt = cacheService.calculateExpiration({ region, dataType: 'pair-frequency' });
    await cacheService.set(cacheKey, response, expiresAt);
    console.log(`[Cache SET] ${cacheKey}`);
    return response;
  } catch (error: any) {
    logApiError('getPairFrequency', 'xosoapi.getPairFrequency', { region }, error);
    const stale = await cacheService.get(cacheKey, { includeExpired: true });
    if (stale) return JSON.parse(stale.data);
    return { success: false, data: [], meta: { region: region.toUpperCase() } };
  }
}

/**
 * Get special week statistics with caching
 */
export async function getSpecialWeek(region: Region) {
  const cacheKey = cacheService.generateKey({ region, dataType: 'special-week' });

  try {
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }
    console.log(`[Cache MISS] ${cacheKey}`);

    const response = await xosoapi.getSpecialWeek({ region: region.toUpperCase() as 'MB' });

    if (!response.success) throw new Error(extractErrorMessage(response));

    const expiresAt = cacheService.calculateExpiration({ region, dataType: 'special-week' });
    await cacheService.set(cacheKey, response, expiresAt);
    console.log(`[Cache SET] ${cacheKey}`);
    return response;
  } catch (error: any) {
    logApiError('getSpecialWeek', 'xosoapi.getSpecialWeek', { region }, error);
    const stale = await cacheService.get(cacheKey, { includeExpired: true });
    if (stale) return JSON.parse(stale.data);
    return { success: false, data: [], meta: { region: region.toUpperCase() } };
  }
}

/**
 * Get loto cycle statistics with caching
 */
export async function getLotoCycle(region: Region) {
  const cacheKey = cacheService.generateKey({ region, dataType: 'loto-cycle' });

  try {
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }
    console.log(`[Cache MISS] ${cacheKey}`);

    const response = await xosoapi.getLotoCycle({ region: region.toUpperCase() as 'MB' });

    if (!response.success) throw new Error(extractErrorMessage(response));

    const expiresAt = cacheService.calculateExpiration({ region, dataType: 'loto-cycle' });
    await cacheService.set(cacheKey, response, expiresAt);
    console.log(`[Cache SET] ${cacheKey}`);
    return response;
  } catch (error: any) {
    logApiError('getLotoCycle', 'xosoapi.getLotoCycle', { region }, error);
    const stale = await cacheService.get(cacheKey, { includeExpired: true });
    if (stale) return JSON.parse(stale.data);
    return { success: false, data: [], meta: { region: region.toUpperCase() } };
  }
}

/**
 * Get matrix statistics with caching
 */
export async function getMatrix(region: Region) {
  const cacheKey = cacheService.generateKey({ region, dataType: 'matrix' });

  try {
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }
    console.log(`[Cache MISS] ${cacheKey}`);

    const response = await xosoapi.getMatrix({ region: region.toUpperCase() as 'MB' });

    if (!response.success) throw new Error(extractErrorMessage(response));

    const expiresAt = cacheService.calculateExpiration({ region, dataType: 'matrix' });
    await cacheService.set(cacheKey, response, expiresAt);
    console.log(`[Cache SET] ${cacheKey}`);
    return response;
  } catch (error: any) {
    logApiError('getMatrix', 'xosoapi.getMatrix', { region }, error);
    const stale = await cacheService.get(cacheKey, { includeExpired: true });
    if (stale) return JSON.parse(stale.data);
    return { success: false, data: [], meta: { region: region.toUpperCase() } };
  }
}

/**
 * Get theo tong statistics with caching
 */
export async function getTheoTong(region: Region) {
  const cacheKey = cacheService.generateKey({ region, dataType: 'theo-tong' });

  try {
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }
    console.log(`[Cache MISS] ${cacheKey}`);

    const response = await xosoapi.getTheoTong({ region: region.toUpperCase() as 'MB' });

    if (!response.success) throw new Error(extractErrorMessage(response));

    const expiresAt = cacheService.calculateExpiration({ region, dataType: 'theo-tong' });
    await cacheService.set(cacheKey, response, expiresAt);
    console.log(`[Cache SET] ${cacheKey}`);
    return response;
  } catch (error: any) {
    logApiError('getTheoTong', 'xosoapi.getTheoTong', { region }, error);
    const stale = await cacheService.get(cacheKey, { includeExpired: true });
    if (stale) return JSON.parse(stale.data);
    return { success: false, data: [], meta: { region: region.toUpperCase() } };
  }
}

/**
 * Get lo gan statistics with caching
 * Note: XoSoAPI only supports MB for this endpoint
 */
export async function getLoGan(region: Region) {
  const cacheKey = cacheService.generateKey({ region, dataType: 'lo-gan' });

  try {
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`[Cache HIT] ${cacheKey}`);
      return JSON.parse(cached.data);
    }
    console.log(`[Cache MISS] ${cacheKey}`);

    const response = await xosoapi.getLoGan({ region: 'MB' });

    if (!response.success) throw new Error(extractErrorMessage(response));

    const expiresAt = cacheService.calculateExpiration({ region, dataType: 'lo-gan' });
    await cacheService.set(cacheKey, response, expiresAt);
    console.log(`[Cache SET] ${cacheKey}`);
    return response;
  } catch (error: any) {
    logApiError('getLoGan', 'xosoapi.getLoGan', { region }, error);
    const stale = await cacheService.get(cacheKey, { includeExpired: true });
    if (stale) return JSON.parse(stale.data);
    return { success: false, data: [], meta: { region: 'MB' } };
  }
}

/**
 * Invalidate cache for a specific region and date
 *
 * @param region - Lottery region
 * @param date - Optional date (if omitted, invalidates all dates)
 */
export async function invalidateCache(region: Region, date?: string): Promise<number> {
  if (date) {
    // Invalidate specific date
    const pattern = `draws:${region}:${date}`;
    return await cacheService.invalidate(pattern);
  } else {
    // Invalidate all draws for region
    const pattern = `draws:${region}:*`;
    return await cacheService.invalidate(pattern);
  }
}

/**
 * Invalidate statistics cache for a region
 *
 * @param region - Lottery region
 */
export async function invalidateStatsCache(region: Region): Promise<number> {
  const patterns = [
    `hot-numbers:${region}`,
    `gap:${region}`,
    `frequency:${region}`,
    `head-tail:${region}`,
    `pair-frequency:${region}`,
    `special-week:${region}`,
    `loto-cycle:${region}`,
    `matrix:${region}`,
    `theo-tong:${region}`,
    `lo-gan:${region}`,
  ];

  let total = 0;
  for (const pattern of patterns) {
    total += await cacheService.invalidate(pattern);
  }

  return total;
}
