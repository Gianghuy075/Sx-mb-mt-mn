/**
 * API Response Normalizers
 * Transform xsapi.vn responses to internal format
 * Ported from original app.js lines 243-293
 */

import type {
  LotteryDataMB,
  LotteryDataMulti,
  XSApiResponseMB,
  XSApiResponseMulti,
  XSApiProvinceData,
  Region,
} from '@/lib/types/lottery';

/**
 * Normalize Miền Bắc API response
 */
export function normaliseMB(raw: any, dateStr: string): LotteryDataMB | null {
  try {
    const d = raw.data || raw;

    return {
      region: 'mb',
      date: dateStr,
      provinces: [d.tinh || 'Hà Nội'],
      prizes: [
        { label: 'Giải đặc biệt', numbers: [d.dacbiet].filter(Boolean),         cls: 'special'  },
        { label: 'Giải nhất',     numbers: [d.nhat].filter(Boolean),            cls: 'first'    },
        { label: 'Giải nhì',      numbers: (d.nhi || []).filter(Boolean),       cls: 'second'   },
        { label: 'Giải ba',       numbers: (d.ba || []).filter(Boolean),        cls: 'third'    },
        { label: 'Giải tư',       numbers: (d.bon || []).filter(Boolean),       cls: 'fourth'   },
        { label: 'Giải năm',      numbers: (d.nam || []).filter(Boolean),       cls: 'fifth'    },
        { label: 'Giải sáu',      numbers: (d.sau || []).filter(Boolean),       cls: 'sixth'    },
        { label: 'Giải bảy',      numbers: (d.bay || []).filter(Boolean),       cls: 'seventh'  },
      ],
    };
  } catch (error) {
    console.error('Failed to normalize MB response:', error);
    return null;
  }
}

/**
 * Normalize Miền Trung/Nam API response (multiple provinces)
 */
export function normaliseMulti(
  raw: any,
  region: 'mt' | 'mn',
  dateStr: string
): LotteryDataMulti | null {
  try {
    const arr = Array.isArray(raw.data) ? raw.data : [raw.data || raw];

    return {
      region,
      date: dateStr,
      provinces: arr.map((d: any) => ({
        name: d.tinh || '—',
        prizes: [
          { label: 'Giải tám',      numbers: [d.tam].filter(Boolean),           cls: 'eighth'   },
          { label: 'Giải bảy',      numbers: [d.bay].filter(Boolean),           cls: 'seventh'  },
          { label: 'Giải sáu',      numbers: (d.sau || []).filter(Boolean),     cls: 'sixth'    },
          { label: 'Giải năm',      numbers: [d.nam].filter(Boolean),           cls: 'fifth'    },
          { label: 'Giải tư',       numbers: (d.bon || []).filter(Boolean),     cls: 'fourth'   },
          { label: 'Giải ba',       numbers: (d.ba || []).filter(Boolean),      cls: 'third'    },
          { label: 'Giải nhì',      numbers: [d.nhi].filter(Boolean),           cls: 'second'   },
          { label: 'Giải nhất',     numbers: [d.nhat].filter(Boolean),          cls: 'first'    },
          { label: 'Giải đặc biệt', numbers: [d.dacbiet].filter(Boolean),       cls: 'special'  },
        ],
      })),
    };
  } catch (error) {
    console.error('Failed to normalize Multi response:', error);
    return null;
  }
}
