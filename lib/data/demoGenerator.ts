/**
 * Demo Data Generator
 * Generates deterministic lottery results using seeded RNG
 * Ported from original app.js lines 131-218
 */

import type { LotteryDataMB, LotteryDataMulti, Province, Prize } from '@/lib/types/lottery';
import { MT_SCHEDULE, MN_SCHEDULE } from './schedules';

/**
 * Simple deterministic hash function
 * Same date always produces same numbers
 */
function hashDate(dateStr: string, salt: number = 0): number {
  let h = salt * 31337;
  for (let i = 0; i < dateStr.length; i++) {
    h = Math.imul(h ^ dateStr.charCodeAt(i), 0x9e3779b9) >>> 0;
  }
  return h;
}

/**
 * XORShift32 pseudo-random number generator
 * Provides deterministic randomness from a seed
 */
function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return (): number => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 0xffffffff;
  };
}

/**
 * Generate a random number with specified digits
 */
function randNum(rand: () => number, digits: number): string {
  const max = Math.pow(10, digits);
  const n = Math.floor(rand() * max);
  return String(n).padStart(digits, '0');
}

/**
 * Generate array of random numbers
 */
function makeArray(rand: () => number, count: number, digits: number): string[] {
  return Array.from({ length: count }, () => randNum(rand, digits));
}

/**
 * Generate demo data for Miền Bắc (North Vietnam)
 * 8 prize tiers: Special (6 digits) → 7th (2 digits)
 */
export function demoMB(dateStr: string): LotteryDataMB {
  const rand = rng(hashDate(dateStr, 1));

  return {
    region: 'mb',
    date: dateStr,
    provinces: ['Hà Nội'],
    prizes: [
      { label: 'Giải đặc biệt', numbers: makeArray(rand, 1, 6), cls: 'special' },
      { label: 'Giải nhất',     numbers: makeArray(rand, 1, 5), cls: 'first'   },
      { label: 'Giải nhì',      numbers: makeArray(rand, 2, 5), cls: 'second'  },
      { label: 'Giải ba',       numbers: makeArray(rand, 6, 5), cls: 'third'   },
      { label: 'Giải tư',       numbers: makeArray(rand, 4, 4), cls: 'fourth'  },
      { label: 'Giải năm',      numbers: makeArray(rand, 6, 4), cls: 'fifth'   },
      { label: 'Giải sáu',      numbers: makeArray(rand, 3, 3), cls: 'sixth'   },
      { label: 'Giải bảy',      numbers: makeArray(rand, 4, 2), cls: 'seventh' },
    ],
  };
}

/**
 * Generate demo data for a single province (MT/MN)
 * 9 prize tiers: 8th (2 digits) → Special (6 digits)
 */
function demoProvince(dateStr: string, provinceName: string, salt: number): Province {
  const rand = rng(hashDate(dateStr + provinceName, salt));

  return {
    name: provinceName,
    prizes: [
      { label: 'Giải tám',      numbers: makeArray(rand, 1, 2), cls: 'eighth'  },
      { label: 'Giải bảy',      numbers: makeArray(rand, 1, 3), cls: 'seventh' },
      { label: 'Giải sáu',      numbers: makeArray(rand, 3, 3), cls: 'sixth'   },
      { label: 'Giải năm',      numbers: makeArray(rand, 1, 4), cls: 'fifth'   },
      { label: 'Giải tư',       numbers: makeArray(rand, 7, 5), cls: 'fourth'  },
      { label: 'Giải ba',       numbers: makeArray(rand, 2, 5), cls: 'third'   },
      { label: 'Giải nhì',      numbers: makeArray(rand, 1, 5), cls: 'second'  },
      { label: 'Giải nhất',     numbers: makeArray(rand, 1, 5), cls: 'first'   },
      { label: 'Giải đặc biệt', numbers: makeArray(rand, 1, 6), cls: 'special' },
    ],
  };
}

/**
 * Generate demo data for Miền Trung (Central Vietnam)
 * Multiple provinces based on day of week
 */
export function demoMT(dateStr: string): LotteryDataMulti {
  const dow = new Date(dateStr).getDay();
  const provinces = MT_SCHEDULE[dow] || ['Khánh Hoà'];

  return {
    region: 'mt',
    date: dateStr,
    provinces: provinces.map((p, i) => demoProvince(dateStr, p, 200 + i)),
  };
}

/**
 * Generate demo data for Miền Nam (South Vietnam)
 * Multiple provinces based on day of week
 */
export function demoMN(dateStr: string): LotteryDataMulti {
  const dow = new Date(dateStr).getDay();
  const provinces = MN_SCHEDULE[dow] || ['TP.HCM'];

  return {
    region: 'mn',
    date: dateStr,
    provinces: provinces.map((p, i) => demoProvince(dateStr, p, 400 + i)),
  };
}
