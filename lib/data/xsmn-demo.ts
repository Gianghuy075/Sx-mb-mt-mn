/**
 * Hard-coded demo data for XSMN (Miền Nam) - matches screenshot exactly
 */

import type { LotteryDataMulti } from '@/lib/types/lottery';

export const XSMN_DEMO_DATA: LotteryDataMulti = {
  region: 'mn',
  date: '2026-03-29',
  provinces: [
    {
      name: 'Tiền Giang',
      prizes: [
        { label: 'Giải tám', numbers: ['21'], cls: 'eighth' },
        { label: 'Giải bảy', numbers: ['227'], cls: 'seventh' },
        { label: 'Giải sáu', numbers: ['1807', '6895'], cls: 'sixth' },
        { label: 'Giải năm', numbers: ['0601'], cls: 'fifth' },
        { label: 'Giải tư', numbers: ['67927', '26947', '63294', '74209', '41618', '93994', '14472', '31973', '09940', '21991', '83666'], cls: 'fourth' },
        { label: 'Giải ba', numbers: ['9081', '6895', '0601', '6895'], cls: 'third' },
        { label: 'Giải nhì', numbers: ['1078', '9405', '4371', '5253'], cls: 'second' },
        { label: 'Giải nhất', numbers: ['9456', '5872', '3658', '8308', '4573', '6848'], cls: 'first' },
        { label: 'Giải đặc biệt', numbers: ['531689'], cls: 'special' },
      ],
    },
    {
      name: 'Kiên Giang',
      prizes: [
        { label: 'Giải tám', numbers: ['91'], cls: 'eighth' },
        { label: 'Giải bảy', numbers: ['828'], cls: 'seventh' },
        { label: 'Giải sáu', numbers: ['8944', '6256'], cls: 'sixth' },
        { label: 'Giải năm', numbers: ['5658'], cls: 'fifth' },
        { label: 'Giải tư', numbers: ['48943', '81180', '72190', '30606', '65874', '35096', '53475', '46130', '33592', '61553', '04778'], cls: 'fourth' },
        { label: 'Giải ba', numbers: ['7510', '6256', '5658', '6256'], cls: 'third' },
        { label: 'Giải nhì', numbers: ['1078', '9405', '4371', '5253'], cls: 'second' },
        { label: 'Giải nhất', numbers: ['8765', '5872', '3658', '8308', '4573', '6848'], cls: 'first' },
        { label: 'Giải đặc biệt', numbers: ['085111'], cls: 'special' },
      ],
    },
    {
      name: 'Đà Lạt',
      prizes: [
        { label: 'Giải tám', numbers: ['18'], cls: 'eighth' },
        { label: 'Giải bảy', numbers: ['066'], cls: 'seventh' },
        { label: 'Giải sáu', numbers: ['2591', '2229'], cls: 'sixth' },
        { label: 'Giải năm', numbers: ['4139'], cls: 'fifth' },
        { label: 'Giải tư', numbers: ['49203', '60677', '37404', '21428', '29817', '06409', '81088', '93614', '98111', '14436', '03328'], cls: 'fourth' },
        { label: 'Giải ba', numbers: ['0104', '2229', '4139', '2229'], cls: 'third' },
        { label: 'Giải nhì', numbers: ['0824', '6372', '1926', '7482'], cls: 'second' },
        { label: 'Giải nhất', numbers: ['1234', '5678', '9012', '3456', '7890', '2345'], cls: 'first' },
        { label: 'Giải đặc biệt', numbers: ['992334'], cls: 'special' },
      ],
    },
  ],
};
