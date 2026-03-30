/**
 * Demo data for lottery analysis
 */

export interface AnalysisItem {
  id: string;
  date: string;
  region: 'MB' | 'MN' | 'MT';
  regionName: string;
  title: string;
  description: string;
  type: 'trend' | 'hot-cold' | 'frequency' | 'cycle';
  typeLabel: string;
  metrics: string;
}

export const ANALYSIS_DEMO: AnalysisItem[] = [
  {
    id: 'mb-trends',
    date: 'Cập nhật 30/03/2026',
    region: 'MB',
    regionName: 'Miền Bắc',
    title: 'Phân tích xu hướng XSMB tháng 3/2026',
    description: 'Xu hướng các con số nóng lạnh, phân tích các số đã về nhiều lần và các số lạnh ít xuất hiện trong tháng này',
    type: 'trend',
    typeLabel: 'Xu hướng',
    metrics: '📊 123 kỳ phân tích | 🔥 35 số nóng | ❄️ 28 số lạnh',
  },
  {
    id: 'mn-hotcold',
    date: 'Cập nhật 30/03/2026',
    region: 'MN',
    regionName: 'Miền Nam',
    title: 'Phân tích số nóng lạnh XSMN gần đây',
    description: 'Thống kê chi tiết các số nóng (xuất hiện nhiều) và các số lạnh (ít xuất hiện) từ các tỉnh trong tuần qua',
    type: 'hot-cold',
    typeLabel: 'Số nóng - Lạnh',
    metrics: '🌡️ 89 lần phân tích | 📈 Top 5 số nóng: 15, 28, 42, 67, 88 | 📉 Top 5 số lạnh: 03, 11, 25, 39, 71',
  },
  {
    id: 'mt-frequency',
    date: 'Cập nhật 30/03/2026',
    region: 'MT',
    regionName: 'Miền Trung',
    title: 'Tần suất xuất hiện số trong tháng 3/2026',
    description: 'Bảng thống kê tần suất xuất hiện của tất cả các con số từ 00-99 trong tháng 3, phân tích theo tuần',
    type: 'frequency',
    typeLabel: 'Tần suất',
    metrics: '📋 Phân tích 15 ngày | 💯 Số top: 45 (7 lần) | 📊 Số bot: 02 (0 lần)',
  },
  {
    id: 'mb-cycle',
    date: 'Cập nhật 30/03/2026',
    region: 'MB',
    regionName: 'Miền Bắc',
    title: 'Chu kỳ lô tô XSMB - Theo dõi chu kỳ 30 ngày',
    description: 'Theo dõi chu kỳ xuất hiện của các con số trong 30 ngày qua, dự đoán khả năng xuất hiện trong 7 ngày tới',
    type: 'cycle',
    typeLabel: 'Chu kỳ',
    metrics: '⏱️ Chu kỳ trung bình: 8.5 ngày | 🎯 Số sắp xuất hiện: 12, 34, 56, 78',
  },
  {
    id: 'mn-patterns',
    date: 'Cập nhật 30/03/2026',
    region: 'MN',
    regionName: 'Miền Nam',
    title: 'Phân tích mẫu số - Cặp số thường cùng xuất hiện',
    description: 'Phát hiện các cặp số thường xuất hiện cùng nhau (pair analysis), giúp tối ưu hóa lựa chọn',
    type: 'trend',
    typeLabel: 'Phân tích mẫu',
    metrics: '🔗 85 cặp số phân tích | 👥 Top cặp: (12,45), (67,89), (23,56)',
  },
  {
    id: 'mt-comparison',
    date: 'Cập nhật 30/03/2026',
    region: 'MT',
    regionName: 'Miền Trung',
    title: 'So sánh thống kê giữa các tỉnh XSMT',
    description: 'So sánh xu hướng các con số giữa các tỉnh khác nhau, tìm ra sự khác biệt và các con số đặc trưng của từng vùng',
    type: 'trend',
    typeLabel: 'So sánh',
    metrics: '🗺️ 10 tỉnh so sánh | 📊 Tỷ lệ khác biệt: 32% | 🔍 Con số độc đáo: 44 (Khánh Hòa)',
  },
];

export const ANALYSIS_TYPES = [
  { id: 'all', name: 'Tất cả phân tích' },
  { id: 'trend', name: 'Xu hướng' },
  { id: 'hot-cold', name: 'Số nóng - Lạnh' },
  { id: 'frequency', name: 'Tần suất' },
  { id: 'cycle', name: 'Chu kỳ' },
];

export const ANALYSIS_REGIONS = [
  { id: 'all', name: 'Tất cả khu vực' },
  { id: 'mb', name: 'Miền Bắc' },
  { id: 'mn', name: 'Miền Nam' },
  { id: 'mt', name: 'Miền Trung' },
];
