/**
 * Hard-coded demo data for Vietlott - matches screenshot exactly
 */

export const VIETLOTT_MEGA_DEMO = {
  date: '2026-03-29',
  type: 'XS MEGA',
  numbers: [5, 8, 18, 30, 37, 45],
  jackpot: 49393298500,
  prizes: [
    {
      name: 'Jackpot',
      matches: '6 ● ● ● ● ● ●',
      quantity: 0,
      value: 49393298500,
    },
    {
      name: 'Giải nhất',
      matches: '5 ● ● ● ● ●',
      quantity: 25,
      value: 10000000,
    },
    {
      name: 'Giải nhì',
      matches: '4 ● ● ● ●',
      quantity: 1561,
      value: 300000,
    },
    {
      name: 'Giải ba',
      matches: '3 ● ● ●',
      quantity: 26967,
      value: 30000,
    },
  ],
};

export const VIETLOTT_XSMT_DEMO = {
  date: '2026-03-29',
  provinces: ['Khánh Hoà', 'Kon Tum', 'Thừa Thiên Huế'],
  prizes: [
    { name: 'G8', numbers: { 'Khánh Hoà': '30', 'Kon Tum': '70', 'Thừa Thiên Huế': '66' } },
    { name: 'G7', numbers: { 'Khánh Hoà': '393', 'Kon Tum': '306', 'Thừa Thiên Huế': '223' } },
    {
      name: 'G6',
      numbers: {
        'Khánh Hoà': '9580, 1046, 6087',
        'Kon Tum': '3690, 2919, 7752',
        'Thừa Thiên Huế': '3979, 5806, 7281',
      },
    },
    {
      name: 'G5',
      numbers: {
        'Khánh Hoà': '9406, 39480, 86251, 87076',
        'Kon Tum': '9858, 14811, 76651, 69029',
        'Thừa Thiên Huế': '8149, 35865, 89098, 99726',
      },
    },
    {
      name: 'G4',
      numbers: {
        'Khánh Hoà': '10908, 79047, 83601, 72446, 36543, 14112',
        'Kon Tum': '11324, 83818, 79261, 91516, 71844, 89867',
        'Thừa Thiên Huế': '25189, 85773, 65363, 98843, 43363, 20962',
      },
    },
    { name: 'G3', numbers: { 'Khánh Hoà': '60044', 'Kon Tum': '88216', 'Thừa Thiên Huế': '01577' } },
    { name: 'G2', numbers: { 'Khánh Hoà': '14275', 'Kon Tum': '76446', 'Thừa Thiên Huế': '43721' } },
    {
      name: 'DB',
      numbers: { 'Khánh Hoà': '589049', 'Kon Tum': '914993', 'Thừa Thiên Huế': '924386' },
    },
  ],
};
