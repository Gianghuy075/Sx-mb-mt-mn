# 📘 XoSoAPI Integration Guide

Hướng dẫn tích hợp API từ [xosoapi.online](https://xosoapi.online) vào dự án.

## 🚀 Quick Start

### 1. Đăng ký API Key

Truy cập: https://xosoapi.online/pricing

**Gói FREE:**
- ✅ 100 requests/ngày
- ✅ 10 requests/phút
- ✅ Đủ để test và phát triển

**Gói trả phí:**
- 💼 BASIC: 1,000 req/ngày - 60 req/phút
- 🚀 PRO: 10,000 req/ngày - 300 req/phút
- 🏢 ENTERPRISE: Unlimited

### 2. Cấu hình .env

```bash
XOSOAPI_KEY="your-api-key-here"
```

### 3. Sử dụng

```typescript
import { getRecentDraws, getHotNumbers } from '@/lib/api/xosoapi';

// Lấy kết quả XSMB
const draws = await getRecentDraws({ region: 'MB', limit: 10 });

// Lấy số nóng
const hotNumbers = await getHotNumbers({ region: 'MB', limit: 10 });
```

---

## 📚 Available Functions

### 🎲 Kết Quả Xổ Số

```typescript
// Lấy kết quả gần nhất
getRecentDraws({ region: 'MB', limit: 10 })

// Lấy danh sách tỉnh
getProvinces()
```

### 📊 Thống Kê

```typescript
getHotNumbers({ region: 'MB', limit: 10 })      // Số nóng
getGapNumbers({ region: 'MB', limit: 10 })      // Số gan
getFrequency({ region: 'MB' })                   // Tần suất
getHeadTail({ region: 'MB' })                    // Đầu-đuôi
getPairFrequency({ region: 'MB' })               // Cặp số
getSpecialWeek({ region: 'MB' })                 // Theo tuần
getLotoCycle({ region: 'MB' })                   // Chu kỳ
getMatrix({ region: 'MB' })                      // Ma trận 00-99
getTheoTong({ region: 'MB' })                    // Theo tổng
getLoGan({ region: 'MB' })                       // Lô gan
```

### 🔮 Soi Cầu / Dự Đoán

```typescript
getBachThu({ region: 'MB' })                     // Bạch thủ
getXien2({ region: 'MB' })                       // Xiên 2
getXien3({ region: 'MB' })                       // Xiên 3
getDeDacBiet({ region: 'MB' })                   // Đề đặc biệt
getDanDe({ region: 'MB', type: 10 })            // Dàn đề
getPascal({ region: 'MB' })                      // Pascal
getCauNhay({ region: 'MB' })                     // Cầu nhảy
getCauChay({ region: 'MB' })                     // Cầu chạy
```

### 🔔 Webhooks

```typescript
// Tạo webhook để nhận thông báo real-time
createWebhook({
  url: 'https://your-domain.com/api/webhooks/lottery',
  events: ['DRAW_COMPLETED'],
  secret: 'your-secret-key'
})

// Xem webhooks đã tạo
listWebhooks()
```

---

## 💡 Use Cases

### 1. Trang Kết Quả Xổ Số

```typescript
// app/[region]/[date]/page.tsx
import { getRecentDraws } from '@/lib/api/xosoapi';

export default async function ResultsPage({ params }) {
  const { region, date } = await params;

  const draws = await getRecentDraws({
    region: region.toUpperCase(),
    date,
  });

  return <ResultsTable data={draws} />;
}
```

### 2. Dashboard Thống Kê

```typescript
// app/thong-ke/page.tsx
import { getHotNumbers, getGapNumbers, getFrequency } from '@/lib/api/xosoapi';

export default async function StatsPage() {
  const [hot, gap, freq] = await Promise.all([
    getHotNumbers({ region: 'MB', limit: 10 }),
    getGapNumbers({ region: 'MB', limit: 10 }),
    getFrequency({ region: 'MB', limit: 20 }),
  ]);

  return (
    <div>
      <HotNumbers data={hot} />
      <GapNumbers data={gap} />
      <FrequencyChart data={freq} />
    </div>
  );
}
```

### 3. Trang Soi Cầu

```typescript
// app/soi-cau/page.tsx
import { getBachThu, getXien2, getDanDe } from '@/lib/api/xosoapi';

export default async function SoiCauPage() {
  const [bachThu, xien2, danDe] = await Promise.all([
    getBachThu({ region: 'MB' }),
    getXien2({ region: 'MB' }),
    getDanDe({ region: 'MB', type: 10 }),
  ]);

  return (
    <div>
      <BachThuSection data={bachThu} />
      <Xien2Section data={xien2} />
      <DanDeSection data={danDe} />
    </div>
  );
}
```

### 4. Real-time Updates với Webhooks

```typescript
// app/api/webhooks/lottery/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const signature = request.headers.get('X-Hub-Signature-256');
  const body = await request.text();

  // Verify signature
  const secret = process.env.WEBHOOK_SECRET || '';
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  if (`sha256=${hash}` !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const data = JSON.parse(body);

  // Process new draw results
  console.log('New draw completed:', data);

  // TODO: Cập nhật database, gửi notification, etc.

  return NextResponse.json({ success: true });
}
```

---

## ⚠️ Error Handling

```typescript
import { handleApiError } from '@/lib/api/xosoapi';

try {
  const draws = await getRecentDraws({ region: 'MB' });
} catch (error) {
  handleApiError(error);
  // Hiển thị fallback UI hoặc demo data
}
```

**Error Codes:**
- `400` - Bad Request (tham số không hợp lệ)
- `401` - Unauthorized (API key sai)
- `403` - Forbidden (không có quyền)
- `404` - Not Found (không tìm thấy)
- `429` - Rate Limit (vượt giới hạn)
- `500` - Server Error

---

## 🎯 Best Practices

### 1. Caching

```typescript
// Next.js ISR
export const revalidate = 300; // 5 phút

export default async function Page() {
  const draws = await getRecentDraws({ region: 'MB' });
  return <ResultsTable data={draws} />;
}
```

### 2. Parallel Requests

```typescript
// Tốt ✅
const [draws, stats] = await Promise.all([
  getRecentDraws({ region: 'MB' }),
  getHotNumbers({ region: 'MB' }),
]);

// Không tốt ❌
const draws = await getRecentDraws({ region: 'MB' });
const stats = await getHotNumbers({ region: 'MB' });
```

### 3. Error Fallback

```typescript
async function getDrawsWithFallback(region: string) {
  try {
    return await getRecentDraws({ region: region as any });
  } catch (error) {
    console.error('API failed, using demo data');
    return demoData; // Fallback to demo data
  }
}
```

### 4. Rate Limit Management

```typescript
// Implement request queuing nếu cần nhiều requests
import pQueue from 'p-queue';

const queue = new pQueue({
  concurrency: 5,  // Max 5 requests đồng thời
  interval: 60000, // 1 phút
  intervalCap: 10  // Max 10 requests/phút
});

const results = await queue.add(() => getRecentDraws({ region: 'MB' }));
```

---

## 📖 Documentation

- **API Docs**: https://xosoapi.online/docs
- **Pricing**: https://xosoapi.online/pricing
- **Support**: Contact via website

---

## 🔗 Related Files

- **API Client**: `lib/api/xosoapi.ts`
- **Examples**: `lib/api/xosoapi-examples.ts`
- **Environment**: `.env` (XOSOAPI_KEY)

---

## ⚡ Quick Examples

Xem file `lib/api/xosoapi-examples.ts` để có 12 ví dụ chi tiết!
