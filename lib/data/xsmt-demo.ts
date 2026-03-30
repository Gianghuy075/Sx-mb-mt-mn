/**
 * Hard-coded demo data for XSMT (Miền Trung) - matches screenshot exactly
 */

import type { LotteryDataMulti } from '@/lib/types/lottery';

export const XSMT_DEMO_DATA: LotteryDataMulti = {
  region: 'mt',
  date: '2026-03-29',
  provinces: [
    {
      name: 'Khánh Hòa',
      prizes: [
        { label: 'Giải tám', numbers: ['30'], cls: 'eighth' },
        { label: 'Giải bảy', numbers: ['393'], cls: 'seventh' },
        { label: 'Giải sáu', numbers: ['9580', '1046', '6087'], cls: 'sixth' },
        { label: 'Giải năm', numbers: ['9406'], cls: 'fifth' },
        { label: 'Giải tư', numbers: ['39480', '86251', '87076', '10908', '79047', '83601', '72446', '36543', '14112'], cls: 'fourth' },
        { label: 'Giải ba', numbers: ['60044'], cls: 'third' },
        { label: 'Giải nhì', numbers: ['14275'], cls: 'second' },
        { label: 'Giải nhất', numbers: [], cls: 'first' },
        { label: 'Giải đặc biệt', numbers: ['589049'], cls: 'special' },
      ],
    },
    {
      name: 'Kon Tum',
      prizes: [
        { label: 'Giải tám', numbers: ['70'], cls: 'eighth' },
        { label: 'Giải bảy', numbers: ['306'], cls: 'seventh' },
        { label: 'Giải sáu', numbers: ['3690', '2919', '7752'], cls: 'sixth' },
        { label: 'Giải năm', numbers: ['9858'], cls: 'fifth' },
        { label: 'Giải tư', numbers: ['14811', '76651', '69029', '11324', '83818', '79261', '91516', '71844', '89867'], cls: 'fourth' },
        { label: 'Giải ba', numbers: ['88216'], cls: 'third' },
        { label: 'Giải nhì', numbers: ['76446'], cls: 'second' },
        { label: 'Giải nhất', numbers: [], cls: 'first' },
        { label: 'Giải đặc biệt', numbers: ['914993'], cls: 'special' },
      ],
    },
    {
      name: 'Thừa Thiên Huế',
      prizes: [
        { label: 'Giải tám', numbers: ['66'], cls: 'eighth' },
        { label: 'Giải bảy', numbers: ['223'], cls: 'seventh' },
        { label: 'Giải sáu', numbers: ['3979', '5806', '7281'], cls: 'sixth' },
        { label: 'Giải năm', numbers: ['8149'], cls: 'fifth' },
        { label: 'Giải tư', numbers: ['35865', '89098', '99726', '25189', '85773', '65363', '98843', '43363', '20962'], cls: 'fourth' },
        { label: 'Giải ba', numbers: ['01577'], cls: 'third' },
        { label: 'Giải nhì', numbers: ['43721'], cls: 'second' },
        { label: 'Giải nhất', numbers: [], cls: 'first' },
        { label: 'Giải đặc biệt', numbers: ['924386'], cls: 'special' },
      ],
    },
  ],
};
