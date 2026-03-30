/**
 * Demo data for lottery news/forecasts
 */

export interface NewsItem {
  id: string;
  date: string;
  day: number;
  month: number;
  year: number;
  region: 'MB' | 'MN' | 'MT';
  regionName: string;
  regionVN: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam';
  title: string;
  description: string;
  image?: string;
}

export const NEWS_DEMO: NewsItem[] = [
  {
    id: 'mb-30-03-1',
    date: '30/03/2026',
    day: 30,
    month: 3,
    year: 2026,
    region: 'MB',
    regionName: 'XSMB',
    regionVN: 'Miền Bắc',
    title: 'Dự đoán Xổ Số Miền Bắc 30/03/2026 - Dự đoán MB ngày 30 tháng 3',
    description: 'Dự đoán MB 30/3 - Dự đoán xổ số miền Bắc ngày 30/03/2026 tham khảo hoàn toàn miễn phí ❤️ Dự đoán lô tô, giải đặc biệt MB ngày 30/3',
  },
  {
    id: 'mt-30-03-1',
    date: '30/03/2026',
    day: 30,
    month: 3,
    year: 2026,
    region: 'MT',
    regionName: 'XSMT',
    regionVN: 'Miền Trung',
    title: 'Dự đoán Xổ Số Miền Trung 30/03/2026 - Dự đoán MT ngày 30 tháng 3',
    description: 'Dự đoán xổ số miền Trung ngày 30/03/2026 tham khảo hoàn toàn miễn phí ❤️ Dự đoán lô tô, giải đặc biệt miền Trung ngày 30/03/2026',
  },
  {
    id: 'mn-30-03-1',
    date: '30/03/2026',
    day: 30,
    month: 3,
    year: 2026,
    region: 'MN',
    regionName: 'XSMN',
    regionVN: 'Miền Nam',
    title: 'Dự đoán Xổ Số Miền Nam 30/03/2026 - Dự đoán MN ngày 30 tháng 3',
    description: 'Dự đoán xổ số miền Nam ngày 30 tháng 3 tham khảo hoàn toàn miễn phí ❤️ Dự đoán lô tô, giải đặc biệt miền Nam ngày 30/03/2026',
  },
  {
    id: 'mb-29-03-1',
    date: '29/03/2026',
    day: 29,
    month: 3,
    year: 2026,
    region: 'MB',
    regionName: 'XSMB',
    regionVN: 'Miền Bắc',
    title: 'Dự đoán Xổ Số Miền Bắc 29/03/2026 - Dự đoán MB ngày 29 tháng 3',
    description: 'Dự đoán MB 29/3 - Dự đoán xổ số miền Bắc ngày 29/03/2026 tham khảo hoàn toàn miễn phí ❤️ Dự đoán lô tô, giải đặc biệt MB ngày 29/3',
  },
  {
    id: 'mt-29-03-1',
    date: '29/03/2026',
    day: 29,
    month: 3,
    year: 2026,
    region: 'MT',
    regionName: 'XSMT',
    regionVN: 'Miền Trung',
    title: 'Dự đoán Xổ Số Miền Trung 29/03/2026 - Dự đoán MT ngày 29 tháng 3',
    description: 'Dự đoán xổ số miền Trung ngày 29/03/2026 tham khảo hoàn toàn miễn phí ❤️ Dự đoán lô tô, giải đặc biệt miền Trung ngày 29/03/2026',
  },
  {
    id: 'mn-29-03-1',
    date: '29/03/2026',
    day: 29,
    month: 3,
    year: 2026,
    region: 'MN',
    regionName: 'XSMN',
    regionVN: 'Miền Nam',
    title: 'Dự đoán Xổ Số Miền Nam 29/03/2026 - Dự đoán MN ngày 29 tháng 3',
    description: 'Dự đoán xổ số miền Nam ngày 29 tháng 3 tham khảo hoàn toàn miễn phí ❤️ Dự đoán lô tô, giải đặc biệt miền Nam ngày 29/03/2026',
  },
  {
    id: 'mb-28-03-1',
    date: '28/03/2026',
    day: 28,
    month: 3,
    year: 2026,
    region: 'MB',
    regionName: 'XSMB',
    regionVN: 'Miền Bắc',
    title: 'Dự đoán Xổ Số Miền Bắc 28/03/2026 - Dự đoán MB ngày 28 tháng 3',
    description: 'Dự đoán MB 28/3 - Dự đoán xổ số miền Bắc ngày 28/03/2026 tham khảo hoàn toàn miễn phí ❤️ Dự đoán lô tô, giải đặc biệt MB ngày 28/3',
  },
  {
    id: 'mt-28-03-1',
    date: '28/03/2026',
    day: 28,
    month: 3,
    year: 2026,
    region: 'MT',
    regionName: 'XSMT',
    regionVN: 'Miền Trung',
    title: 'Dự đoán Xổ Số Miền Trung 28/03/2026 - Dự đoán MT ngày 28 tháng 3',
    description: 'Dự đoán xổ số miền Trung ngày 28/03/2026 tham khảo hoàn toàn miễn phí ❤️ Dự đoán lô tô, giải đặc biệt miền Trung ngày 28/03/2026',
  },
];

export const NEWS_TABS = [
  { id: 'all', name: 'Tất cả', label: 'Tất cả dự đoán' },
  { id: 'mb', name: 'Dự đoán XSMB', label: 'Dự đoán XSMB' },
  { id: 'mn', name: 'Dự đoán XSMN', label: 'Dự đoán XSMN' },
  { id: 'mt', name: 'Dự đoán XSMT', label: 'Dự đoán XSMT' },
];
