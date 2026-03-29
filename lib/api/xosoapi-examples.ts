/**
 * XoSoAPI Usage Examples
 * Documentation: https://xosoapi.online/docs
 */

import {
  getRecentDraws,
  getProvinces,
  getHotNumbers,
  getGapNumbers,
  getFrequency,
  getHeadTail,
  getBachThu,
  getXien2,
  getDanDe,
  createWebhook,
  handleApiError,
} from './xosoapi';

// ==================== EXAMPLE 1: Lấy kết quả xổ số ====================

export async function example1_GetRecentDraws() {
  try {
    // Lấy kết quả Miền Bắc gần nhất
    const drawsMB = await getRecentDraws({
      region: 'MB',
      limit: 10,
    });
    console.log('Kết quả XSMB:', drawsMB);

    // Lấy kết quả theo ngày cụ thể
    const drawsToday = await getRecentDraws({
      region: 'MB',
      date: '2026-03-28',
    });
    console.log('Kết quả hôm nay:', drawsToday);

    return drawsMB;
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 2: Lấy danh sách tỉnh ====================

export async function example2_GetProvinces() {
  try {
    const provinces = await getProvinces();
    console.log('Danh sách tỉnh:', provinces);
    return provinces;
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 3: Thống kê số nóng ====================

export async function example3_GetHotNumbers() {
  try {
    // Top 10 số nóng Miền Bắc
    const hotNumbers = await getHotNumbers({
      region: 'MB',
      limit: 10,
    });
    console.log('Top 10 số nóng:', hotNumbers);
    return hotNumbers;
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 4: Thống kê số gan ====================

export async function example4_GetGapNumbers() {
  try {
    // Top số lâu không về
    const gapNumbers = await getGapNumbers({
      region: 'MB',
      limit: 10,
    });
    console.log('Số gan:', gapNumbers);
    return gapNumbers;
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 5: Tần suất xuất hiện ====================

export async function example5_GetFrequency() {
  try {
    const frequency = await getFrequency({
      region: 'MB',
      limit: 100,
    });
    console.log('Tần suất:', frequency);
    return frequency;
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 6: Thống kê đầu-đuôi ====================

export async function example6_GetHeadTail() {
  try {
    const headTail = await getHeadTail({
      region: 'MB',
    });
    console.log('Thống kê đầu-đuôi:', headTail);
    return headTail;
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 7: Soi cầu bạch thủ ====================

export async function example7_GetBachThu() {
  try {
    const bachThu = await getBachThu({
      region: 'MB',
    });
    console.log('Bạch thủ:', bachThu);
    return bachThu;
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 8: Soi cầu xiên 2 ====================

export async function example8_GetXien2() {
  try {
    const xien2 = await getXien2({
      region: 'MB',
    });
    console.log('Xiên 2:', xien2);
    return xien2;
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 9: Dàn đề ====================

export async function example9_GetDanDe() {
  try {
    // Dàn đề 10 số
    const danDe10 = await getDanDe({
      region: 'MB',
      type: 10,
    });
    console.log('Dàn đề 10 số:', danDe10);

    // Dàn đề 36 số
    const danDe36 = await getDanDe({
      region: 'MB',
      type: 36,
    });
    console.log('Dàn đề 36 số:', danDe36);

    return { danDe10, danDe36 };
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 10: Tạo Webhook ====================

export async function example10_CreateWebhook() {
  try {
    const webhook = await createWebhook({
      url: 'https://your-domain.com/api/webhooks/lottery',
      events: ['DRAW_COMPLETED'],
      secret: 'your-secret-key-for-signature-verification',
    });
    console.log('Webhook created:', webhook);
    return webhook;
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 11: Kết hợp nhiều API ====================

export async function example11_Dashboard() {
  try {
    // Lấy data cho dashboard
    const [draws, hotNumbers, gapNumbers, frequency] = await Promise.all([
      getRecentDraws({ region: 'MB', limit: 5 }),
      getHotNumbers({ region: 'MB', limit: 10 }),
      getGapNumbers({ region: 'MB', limit: 10 }),
      getFrequency({ region: 'MB', limit: 20 }),
    ]);

    return {
      recentDraws: draws,
      hotNumbers,
      gapNumbers,
      frequency,
    };
  } catch (error) {
    handleApiError(error);
  }
}

// ==================== EXAMPLE 12: Component Usage ====================

/**
 * Example: Sử dụng trong React Component
 */
export const ExampleReactComponent = `
'use client';

import { useEffect, useState } from 'react';
import { getRecentDraws, getHotNumbers } from '@/lib/api/xosoapi';

export default function LotteryDashboard() {
  const [draws, setDraws] = useState(null);
  const [hotNumbers, setHotNumbers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [drawsData, hotData] = await Promise.all([
          getRecentDraws({ region: 'MB', limit: 10 }),
          getHotNumbers({ region: 'MB', limit: 10 }),
        ]);

        setDraws(drawsData);
        setHotNumbers(hotData);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Kết quả xổ số</h1>
      <div>{/* Hiển thị draws */}</div>

      <h2>Số nóng</h2>
      <div>{/* Hiển thị hotNumbers */}</div>
    </div>
  );
}
`;
