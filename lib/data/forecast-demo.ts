/**
 * Demo data for lottery forecasts
 */

export interface ForecastItem {
  id: string;
  date: string;
  day: number;
  month: number;
  year: number;
  region: 'MB' | 'MN' | 'MT';
  regionName: string;
  fullTitle: string;
  shortDescription: string;
  participants: number;
  conditions: string;
  image?: string;
}

export const FORECAST_DEMO: ForecastItem[] = [
  {
    id: 'mb-30-03',
    date: '30/03/2026',
    day: 30,
    month: 3,
    year: 2026,
    region: 'MB',
    regionName: 'Miền Bắc',
    fullTitle: 'Dự đoán Xổ Số Miền Bắc 30/03/2026 - Dự đoán MB ngày 30 tháng 3',
    shortDescription: 'Dự đoán xổ số miền Bắc ngày 30/3 - Dự đoán MB 30/3 - Thông khảo hoàn toàn miễn phí',
    participants: 10,
    conditions: '❤️ Dự đoán lô tô, giải đặc biệt MB ngày 30/3',
  },
  {
    id: 'mt-30-03',
    date: '30/03/2026',
    day: 30,
    month: 3,
    year: 2026,
    region: 'MT',
    regionName: 'Miền Trung',
    fullTitle: 'Dự đoán Xổ Số Miền Trung 30/03/2026 - Dự đoán MT ngày 30 tháng 3',
    shortDescription: 'Dự đoán xổ số miền Trung ngày 30/3 - Dự đoán MT 30/3 - Thông khảo hoàn toàn miễn phí',
    participants: 8,
    conditions: '❤️ Dự đoán lô tô, giải đặc biệt miền Trung ngày 30/03/2026',
  },
  {
    id: 'mn-30-03',
    date: '30/03/2026',
    day: 30,
    month: 3,
    year: 2026,
    region: 'MN',
    regionName: 'Miền Nam',
    fullTitle: 'Dự đoán Xổ Số Miền Nam 30/03/2026 - Dự đoán MN ngày 30 tháng 3',
    shortDescription: 'Dự đoán xổ số miền Nam ngày 30/3 - Dự đoán MN 30/3 - Thông khảo hoàn toàn miễn phí',
    participants: 9,
    conditions: '❤️ Dự đoán lô tô, giải đặc biệt miền Nam ngày 30/03/2026',
  },
  {
    id: 'mb-29-03',
    date: '29/03/2026',
    day: 29,
    month: 3,
    year: 2026,
    region: 'MB',
    regionName: 'Miền Bắc',
    fullTitle: 'Dự đoán Xổ Số Miền Bắc 29/03/2026 - Dự đoán MB ngày 29 tháng 3',
    shortDescription: 'Dự đoán xổ số miền Bắc ngày 29/3 - Dự đoán MB 29/3 - Thông khảo hoàn toàn miễn phí',
    participants: 12,
    conditions: '❤️ Dự đoán lô tô, giải đặc biệt MB ngày 29/3',
  },
  {
    id: 'mt-29-03',
    date: '29/03/2026',
    day: 29,
    month: 3,
    year: 2026,
    region: 'MT',
    regionName: 'Miền Trung',
    fullTitle: 'Dự đoán Xổ Số Miền Trung 29/03/2026 - Dự đoán MT ngày 29 tháng 3',
    shortDescription: 'Dự đoán xổ số miền Trung ngày 29/3 - Dự đoán MT 29/3 - Thông khảo hoàn toàn miễn phí',
    participants: 7,
    conditions: '❤️ Dự đoán lô tô, giải đặc biệt miền Trung ngày 29/03/2026',
  },
];

export const FORECAST_CATEGORIES = [
  {
    id: 'all',
    name: 'Tất cả dự đoán',
  },
  {
    id: 'mb',
    name: 'Dự đoán XSMB',
  },
  {
    id: 'mn',
    name: 'Dự đoán XSMN',
  },
  {
    id: 'mt',
    name: 'Dự đoán XSMT',
  },
];
