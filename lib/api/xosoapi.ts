/**
 * XoSoAPI.online Client
 * Documentation: https://xosoapi.online/docs
 */

import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://xosoapi.online/api';
const BASE_URL_V1 = 'https://xosoapi.online/api/v1';

// API Key - Cần đăng ký tại https://xosoapi.online
const API_KEY = process.env.XOSOAPI_KEY || '';

/**
 * Axios client với authentication
 */
const createClient = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'X-API-Key': API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

const apiClient = createClient(BASE_URL);
const apiClientV1 = createClient(BASE_URL_V1);

// ==================== LOTTERY RESULTS ====================

/**
 * Lấy kết quả xổ số gần nhất
 */
export async function getRecentDraws(params?: {
  region?: 'MB' | 'MT' | 'MN';
  limit?: number;
  date?: string;
}) {
  const response = await apiClientV1.get('/vietnam/draws', { params });
  return response.data;
}

/**
 * Lấy danh sách tỉnh/đài
 */
export async function getProvinces() {
  const response = await apiClientV1.get('/vietnam/provinces');
  return response.data;
}

// ==================== STATISTICS ====================

/**
 * Số nóng - Top số hay về nhất
 */
export async function getHotNumbers(params?: {
  region?: 'MB';
  limit?: number;
}) {
  const response = await apiClient.get('/stats/hot-numbers', { params });
  return response.data;
}

/**
 * Số gan - Số lâu không về
 */
export async function getGapNumbers(params?: {
  region?: 'MB';
  limit?: number;
}) {
  const response = await apiClient.get('/stats/gap', { params });
  return response.data;
}

/**
 * Tần suất xuất hiện
 */
export async function getFrequency(params?: {
  region?: 'MB';
  limit?: number;
}) {
  const response = await apiClient.get('/stats/frequency', { params });
  return response.data;
}

/**
 * Thống kê đầu-đuôi
 */
export async function getHeadTail(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/stats/head-tail', { params });
  return response.data;
}

/**
 * Tần suất cặp số
 */
export async function getPairFrequency(params?: {
  region?: 'MB';
  limit?: number;
}) {
  const response = await apiClient.get('/stats/pair-frequency', { params });
  return response.data;
}

/**
 * Phân tích theo tuần (giải đặc biệt)
 */
export async function getSpecialWeek(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/stats/special-week', { params });
  return response.data;
}

/**
 * Chu kỳ loto
 */
export async function getLotoCycle(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/stats/loto-cycle', { params });
  return response.data;
}

/**
 * Bảng ma trận 00-99
 */
export async function getMatrix(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/stats/matrix', { params });
  return response.data;
}

/**
 * Thống kê theo tổng
 */
export async function getTheoTong(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/stats/theo-tong', { params });
  return response.data;
}

/**
 * Lô gan (số lâu về)
 */
export async function getLoGan(params?: {
  region?: 'MB';
  limit?: number;
}) {
  const response = await apiClient.get('/stats/lo-gan', { params });
  return response.data;
}

// ==================== SOI CẦU / PREDICTIONS ====================

/**
 * Bạch thủ - Dự đoán 1 số
 */
export async function getBachThu(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/soi-cau/bach-thu', { params });
  return response.data;
}

/**
 * Xiên 2 - Dự đoán cặp số
 */
export async function getXien2(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/soi-cau/xien-2', { params });
  return response.data;
}

/**
 * Xiên 3 - Dự đoán bộ 3 số
 */
export async function getXien3(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/soi-cau/xien-3', { params });
  return response.data;
}

/**
 * Đề đặc biệt
 */
export async function getDeDacBiet(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/soi-cau/de-dac-biet', { params });
  return response.data;
}

/**
 * Dàn đề (10/20/36 số)
 */
export async function getDanDe(params?: {
  region?: 'MB';
  type?: 10 | 20 | 36;
}) {
  const response = await apiClient.get('/soi-cau/dan-de', { params });
  return response.data;
}

/**
 * Tam giác Pascal
 */
export async function getPascal(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/soi-cau/pascal', { params });
  return response.data;
}

/**
 * Cầu nhảy
 */
export async function getCauNhay(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/soi-cau/nhay', { params });
  return response.data;
}

/**
 * Cầu chạy
 */
export async function getCauChay(params?: {
  region?: 'MB';
}) {
  const response = await apiClient.get('/soi-cau/cau-chay', { params });
  return response.data;
}

// ==================== WEBHOOKS ====================

/**
 * Lấy danh sách webhooks
 */
export async function listWebhooks() {
  const response = await apiClient.get('/user/webhooks');
  return response.data;
}

/**
 * Tạo/Cập nhật webhook
 */
export async function createWebhook(data: {
  url: string;
  events: ['DRAW_COMPLETED'];
  secret?: string;
}) {
  const response = await apiClient.post('/user/webhooks', data);
  return response.data;
}

// ==================== ERROR HANDLING ====================

/**
 * Handle API errors
 */
export function handleApiError(error: any) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    switch (status) {
      case 400:
        throw new Error(`Bad Request: ${message}`);
      case 401:
        throw new Error('Unauthorized: Invalid API key');
      case 403:
        throw new Error('Forbidden: Access denied');
      case 404:
        throw new Error('Not Found: Resource unavailable');
      case 429:
        throw new Error('Rate limit exceeded');
      case 500:
        throw new Error('Server error');
      default:
        throw new Error(`API Error: ${message}`);
    }
  }
  throw error;
}
