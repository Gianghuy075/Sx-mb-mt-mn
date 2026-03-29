# XoSoAPI Response Format Documentation

Documentation của tất cả API responses từ **xosoapi.online** để developers có thể reference.

**Base URL:** `https://xosoapi.online/api`

**Authentication:** Header `X-API-Key: your-api-key`

---

## 1. Lottery Draws - `/api/v1/vietnam/draws`

Lấy kết quả xổ số gần nhất.

### Request Parameters
- `region` (required): `MB` | `MT` | `MN`
- `limit` (optional): Number of draws to return (default: 1)
- `date` (optional): Specific date in `YYYY-MM-DD` format

### Response Structure

```json
{
  "success": true,
  "data": [
    {
      "id": "88114",
      "date": "2026-03-28T00:00:00.000Z",
      "province": {
        "id": 1,
        "regionId": 1,
        "code": "MB_TRADITION",
        "name": "Miền Bắc",
        "schedule": "2,3,4,5,6,7,CN",
        "region": {
          "id": 1,
          "code": "MB",
          "name": "Miền Bắc",
          "description": "Xổ số Kiến thiết Miền Bắc"
        }
      },
      "drawCode": "",
      "jackpot": null,
      "results": [
        {
          "prizeCode": "DB",
          "prizeOrder": 0,
          "values": ["96422"]
        },
        {
          "prizeCode": "G1",
          "prizeOrder": 1,
          "values": ["19843"]
        },
        {
          "prizeCode": "G2",
          "prizeOrder": 2,
          "values": ["50838", "44534"]
        },
        {
          "prizeCode": "G3",
          "prizeOrder": 3,
          "values": ["29883", "54840", "33497", "94988", "98142", "42209"]
        },
        {
          "prizeCode": "G4",
          "prizeOrder": 4,
          "values": ["1804", "3611", "2755", "0569"]
        },
        {
          "prizeCode": "G5",
          "prizeOrder": 5,
          "values": ["7194", "9927", "2925", "1164", "2143", "4991"]
        },
        {
          "prizeCode": "G6",
          "prizeOrder": 6,
          "values": ["188", "358", "385"]
        },
        {
          "prizeCode": "G7",
          "prizeOrder": 7,
          "values": ["09", "61", "76", "18"]
        }
      ]
    }
  ]
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | API call successful |
| `data` | array | Array of draw results |
| `data[].id` | string | Unique draw ID |
| `data[].date` | string | Draw date (ISO 8601 format) |
| `data[].province` | object | Province information |
| `data[].province.code` | string | Province code (e.g., `MB_TRADITION`) |
| `data[].province.name` | string | Province name (e.g., `Miền Bắc`) |
| `data[].results` | array | Array of prize results |
| `data[].results[].prizeCode` | string | Prize code (DB, G1-G7) |
| `data[].results[].prizeOrder` | number | Prize order (0-7) |
| `data[].results[].values` | array | Winning numbers |

### Prize Code Mapping

| Code | Vietnamese Name | English Name | Order |
|------|----------------|--------------|-------|
| `DB` | Giải đặc biệt | Special Prize | 0 |
| `G1` | Giải nhất | First Prize | 1 |
| `G2` | Giải nhì | Second Prize | 2 |
| `G3` | Giải ba | Third Prize | 3 |
| `G4` | Giải tư | Fourth Prize | 4 |
| `G5` | Giải năm | Fifth Prize | 5 |
| `G6` | Giải sáu | Sixth Prize | 6 |
| `G7` | Giải bảy | Seventh Prize | 7 |

---

## 2. Hot Numbers - `/api/stats/hot-numbers`

Số nóng - Top số hay về nhất trong 30 ngày gần đây.

### Request Parameters
- `region` (required): `MB` | `MT` | `MN`
- `limit` (optional): Number of hot numbers to return (default: 10)

### Response Structure

```json
{
  "success": true,
  "data": [
    {
      "number": "91",
      "count": 17
    },
    {
      "number": "52",
      "count": 16
    },
    {
      "number": "30",
      "count": 15
    },
    {
      "number": "38",
      "count": 14
    },
    {
      "number": "51",
      "count": 14
    }
  ],
  "meta": {
    "region": "MB",
    "period": "30 ngày",
    "generated_at": "2026-03-28T16:32:33.516Z"
  }
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | API call successful |
| `data` | array | Array of hot numbers |
| `data[].number` | string | 2-digit number (00-99) |
| `data[].count` | number | Frequency count in period |
| `meta.region` | string | Region code |
| `meta.period` | string | Analysis period |
| `meta.generated_at` | string | Timestamp |

---

## 3. Gap Numbers - `/api/stats/gap`

Lô gan - Các số lâu không về.

### Request Parameters
- `region` (required): `MB` | `MT` | `MN`
- `limit` (optional): Number of gap numbers to return (default: 10)

### Response Structure

```json
{
  "success": true,
  "data": [
    {
      "number": "53",
      "days": 19,
      "max_gap_historic": 37,
      "last_appeared_date": "2026-03-09"
    },
    {
      "number": "71",
      "days": 17,
      "max_gap_historic": 29,
      "last_appeared_date": "2026-03-11"
    },
    {
      "number": "79",
      "days": 17,
      "max_gap_historic": 25,
      "last_appeared_date": "2026-03-11"
    }
  ],
  "meta": {
    "region": "MB",
    "timestamp": "2026-03-28T16:32:49.052Z"
  }
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | API call successful |
| `data` | array | Array of gap numbers |
| `data[].number` | string | 2-digit number (00-99) |
| `data[].days` | number | Days since last appearance |
| `data[].max_gap_historic` | number | Longest gap historically |
| `data[].last_appeared_date` | string | Last appearance date (YYYY-MM-DD) |
| `meta.region` | string | Region code |
| `meta.timestamp` | string | Timestamp |

---

## 4. Frequency - `/api/stats/frequency`

Tần suất xuất hiện của các số.

### Request Parameters
- `region` (required): `MB` | `MT` | `MN`
- `limit` (optional): Number of results (default: 100)

### Response Structure (Expected)

```json
{
  "success": true,
  "data": [
    {
      "number": "00",
      "frequency": 42,
      "percentage": 4.2
    },
    {
      "number": "01",
      "frequency": 38,
      "percentage": 3.8
    }
  ],
  "meta": {
    "region": "MB",
    "period": "100 ngày",
    "total_draws": 100
  }
}
```

---

## 5. Head-Tail Statistics - `/api/stats/head-tail`

Thống kê đầu-đuôi của các số về.

### Request Parameters
- `region` (required): `MB` | `MT` | `MN`

### Response Structure (Expected)

```json
{
  "success": true,
  "data": {
    "head": {
      "0": ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"],
      "1": ["10", "11", "12", ...]
    },
    "tail": {
      "0": ["00", "10", "20", "30", ...],
      "1": ["01", "11", "21", ...]
    }
  },
  "meta": {
    "region": "MB"
  }
}
```

---

## 6. Other Statistics Endpoints

### Pair Frequency - `/api/stats/pair-frequency`
Tần suất xuất hiện của cặp số.

### Special Week - `/api/stats/special-week`
Phân tích giải đặc biệt theo tuần.

### Loto Cycle - `/api/stats/loto-cycle`
Chu kỳ xuất hiện của lô tô.

### Matrix - `/api/stats/matrix`
Bảng ma trận 00-99.

### Theo Tong - `/api/stats/theo-tong`
Thống kê theo tổng của số.

### Lo Gan - `/api/stats/lo-gan`
Lô gan (số lâu về) - Similar to `/gap`

---

## Transformation to LotteryData Format

### Before (XoSoAPI Response)

```json
{
  "success": true,
  "data": [{
    "date": "2026-03-28T00:00:00.000Z",
    "province": { "name": "Miền Bắc" },
    "results": [
      { "prizeCode": "DB", "values": ["96422"] },
      { "prizeCode": "G1", "values": ["19843"] }
    ]
  }]
}
```

### After (LotteryData Format)

```typescript
{
  region: 'mb',
  date: '2026-03-28',
  provinces: ['Miền Bắc'],
  prizes: [
    {
      label: 'Giải đặc biệt',
      numbers: ['96422'],
      cls: 'special'
    },
    {
      label: 'Giải nhất',
      numbers: ['19843'],
      cls: 'first'
    }
  ]
}
```

### Normalizer Logic

```typescript
function normalizeXoSoAPIDraws(response: any, region: Region): LotteryData {
  const draw = response.data[0];

  const prizeLabels = {
    'DB': 'Giải đặc biệt',
    'G1': 'Giải nhất',
    'G2': 'Giải nhì',
    'G3': 'Giải ba',
    'G4': 'Giải tư',
    'G5': 'Giải năm',
    'G6': 'Giải sáu',
    'G7': 'Giải bảy',
  };

  const prizeClasses = {
    'DB': 'special',
    'G1': 'first',
    'G2': 'second',
    'G3': 'third',
    'G4': 'fourth',
    'G5': 'fifth',
    'G6': 'sixth',
    'G7': 'seventh',
  };

  const prizes = draw.results
    .filter(r => r.prizeCode !== 'MA_DB')
    .map(result => ({
      label: prizeLabels[result.prizeCode],
      numbers: result.values,
      cls: prizeClasses[result.prizeCode],
    }));

  return {
    region,
    date: draw.date.split('T')[0],
    provinces: region === 'mb' ? [draw.province.name] : [{ name: draw.province.name, prizes }],
    prizes: region === 'mb' ? prizes : undefined,
  };
}
```

---

## Error Responses

### Rate Limit (429)

```json
{
  "success": false,
  "error": {
    "code": 429,
    "message": "Rate limit exceeded",
    "details": "You have exceeded your rate limit of 10 requests per minute"
  }
}
```

### Unauthorized (401)

```json
{
  "success": false,
  "error": {
    "code": 401,
    "message": "Unauthorized",
    "details": "Invalid or missing API key"
  }
}
```

### Not Found (404)

```json
{
  "success": false,
  "error": {
    "code": 404,
    "message": "Not Found",
    "details": "No data found for the specified date"
  }
}
```

---

## Rate Limits

| Plan | Requests/Day | Requests/Minute |
|------|--------------|-----------------|
| FREE | 100 | 10 |
| BASIC | 1,000 | 60 |
| PRO | 10,000 | 300 |
| ENTERPRISE | Unlimited | Custom |

---

## Notes

- All dates are returned in ISO 8601 format (`YYYY-MM-DDTHH:mm:ss.SSSZ`)
- Numbers are always returned as strings with leading zeros (e.g., `"09"`, `"00"`)
- Prize order determines display order (0 = Special, 1 = First, etc.)
- Statistics are calculated based on 30-day rolling window by default
- `MA_DB` in results should be filtered out (metadata field)

---

**Last Updated:** 2026-03-29

**API Version:** v1

**Documentation:** https://xosoapi.online/docs
