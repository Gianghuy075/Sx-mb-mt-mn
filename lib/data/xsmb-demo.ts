/**
 * Hard-coded demo data for XSMB (Miền Bắc) - matches screenshot exactly
 */

import type { LotteryDataMB } from '@/lib/types/lottery';

export const XSMB_DEMO_DATA: LotteryDataMB = {
  region: 'mb',
  date: '2026-03-29',
  provinces: ['Hà Nội'],
  prizes: [
    { label: 'Giải đặc biệt', numbers: ['37188'], cls: 'special' },
    { label: 'Giải nhất', numbers: ['60695'], cls: 'first' },
    { label: 'Giải nhì', numbers: ['97205', '88249'], cls: 'second' },
    { label: 'Giải ba', numbers: ['08030', '17531', '24964', '66457', '58967', '53051'], cls: 'third' },
    { label: 'Giải tư', numbers: ['1573', '8230', '9688', '5058', '7370', '3151', '8175', '1811', '3534', '4776'], cls: 'fourth' },
    { label: 'Giải năm', numbers: ['387', '717', '786'], cls: 'fifth' },
    { label: 'Giải sáu', numbers: [], cls: 'sixth' },
    { label: 'Giải bảy', numbers: ['86', '06', '13', '81'], cls: 'seventh' },
  ],
};
