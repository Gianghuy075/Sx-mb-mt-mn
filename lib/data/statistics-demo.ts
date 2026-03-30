/**
 * Demo data for lottery statistics
 */

export interface StatisticsRecord {
  date: string;
  dateObj: Date;
  db: string;
  dbNextDay: string;
  nextDay: string;
}

export const STATISTICS_DEMO: StatisticsRecord[] = [
  { date: '29-03-2026', dateObj: new Date('2026-03-29'), db: '371 88', dbNextDay: '', nextDay: '30-03-2026' },
  { date: '25-03-2026', dateObj: new Date('2026-03-25'), db: '539 88', dbNextDay: '445 93', nextDay: '26-03-2026' },
  { date: '30-11-2025', dateObj: new Date('2025-11-30'), db: '514 88', dbNextDay: '133 12', nextDay: '01-12-2025' },
  { date: '30-10-2025', dateObj: new Date('2025-10-30'), db: '297 88', dbNextDay: '683 01', nextDay: '31-10-2025' },
  { date: '23-09-2025', dateObj: new Date('2025-09-23'), db: '368 88', dbNextDay: '778 59', nextDay: '24-09-2025' },
  { date: '19-06-2025', dateObj: new Date('2025-06-19'), db: '762 88', dbNextDay: '049 06', nextDay: '20-06-2025' },
  { date: '09-06-2025', dateObj: new Date('2025-06-09'), db: '234 88', dbNextDay: '111 39', nextDay: '10-06-2025' },
  { date: '24-03-2025', dateObj: new Date('2025-03-24'), db: '919 88', dbNextDay: '694 09', nextDay: '25-03-2025' },
  { date: '06-06-2024', dateObj: new Date('2024-06-06'), db: '666 88', dbNextDay: '046 51', nextDay: '07-06-2024' },
  { date: '22-02-2024', dateObj: new Date('2024-02-22'), db: '824 88', dbNextDay: '160 53', nextDay: '23-02-2024' },
  { date: '26-10-2023', dateObj: new Date('2023-10-26'), db: '267 88', dbNextDay: '740 36', nextDay: '27-10-2023' },
  { date: '24-10-2023', dateObj: new Date('2023-10-24'), db: '913 88', dbNextDay: '613 80', nextDay: '25-10-2023' },
  { date: '20-10-2023', dateObj: new Date('2023-10-20'), db: '428 88', dbNextDay: '573 49', nextDay: '21-10-2023' },
  { date: '08-10-2023', dateObj: new Date('2023-10-08'), db: '751 88', dbNextDay: '912 45', nextDay: '09-10-2023' },
  { date: '03-08-2023', dateObj: new Date('2023-08-03'), db: '802 88', dbNextDay: '561 77', nextDay: '04-08-2023' },
  { date: '09-06-2023', dateObj: new Date('2023-06-09'), db: '842 88', dbNextDay: '019 36', nextDay: '10-06-2023' },
  { date: '13-12-2022', dateObj: new Date('2022-12-13'), db: '966 88', dbNextDay: '485 07', nextDay: '14-12-2022' },
  { date: '01-09-2022', dateObj: new Date('2022-09-01'), db: '694 88', dbNextDay: '031 38', nextDay: '02-09-2022' },
  { date: '28-11-2021', dateObj: new Date('2021-11-28'), db: '559 88', dbNextDay: '280 87', nextDay: '29-11-2021' },
  { date: '21-10-2021', dateObj: new Date('2021-10-21'), db: '931 88', dbNextDay: '566 28', nextDay: '22-10-2021' },
];

export const STATISTICS_TABS = [
  { id: 'tkg-db', name: 'TK GĐB', label: 'Thống kê giải đặc biệt' },
  { id: 'weekly', name: 'Theo tuần', label: 'Thống kê theo tuần' },
  { id: 'monthly', name: 'Theo tháng', label: 'Thống kê theo tháng' },
  { id: 'yearly', name: 'Theo năm', label: 'Thống kê theo năm' },
  { id: 'total', name: 'Theo tổng', label: 'Thống kê tổng hợp' },
];

export const REGIONS_STATS = [
  { id: 'mb', name: 'Miền Bắc', label: 'Thống kê XSMB' },
  { id: 'mn', name: 'Miền Nam', label: 'Thống kê XSMN' },
  { id: 'mt', name: 'Miền Trung', label: 'Thống kê XSMT' },
];
