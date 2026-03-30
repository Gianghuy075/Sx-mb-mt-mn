'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TraCuuFormProps {
  defaultFrom: string;
  defaultTo: string;
  initialSo?: string;
  initialRegion?: string;
}

const REGION_MAP: Record<string, string> = {
  'mb': 'Miền Bắc',
  'mt': 'Miền Trung',
  'mn': 'Miền Nam',
};

const REGION_REVERSE: Record<string, string> = {
  'Miền Bắc': 'mb',
  'Miền Trung': 'mt',
  'Miền Nam': 'mn',
};

export default function TraCuuForm({ defaultFrom, defaultTo, initialSo = '', initialRegion = 'mb' }: TraCuuFormProps) {
  const router = useRouter();
  const [so, setSo] = useState(initialSo);
  const [fromDate, setFromDate] = useState(defaultFrom);
  const [toDate, setToDate] = useState(defaultTo);
  const [region, setRegion] = useState(REGION_MAP[initialRegion] ?? 'Miền Bắc');

  const handleSearch = () => {
    if (!so.trim()) return;
    const regionCode = REGION_REVERSE[region] ?? 'mb';
    const params = new URLSearchParams({ so: so.trim(), from: fromDate, to: toDate, region: regionCode });
    router.push(`/tra-cuu?${params.toString()}`);
  };

  return (
    <div style={{ padding: '24px', borderBottom: '1px solid #e5e5e5' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          Bộ số:
        </label>
        <input
          type="text"
          value={so}
          onChange={(e) => setSo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Nhập bộ số để đối số lần gần"
          style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
        />
        <p style={{ fontSize: '12px', color: '#999', marginTop: '6px' }}>Ví dụ: 50 hoặc 68</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Từ ngày:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Đến ngày:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Tỉnh TP:</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', background: 'white', boxSizing: 'border-box' }}
        >
          <option>Miền Bắc</option>
          <option>Miền Trung</option>
          <option>Miền Nam</option>
        </select>
      </div>

      <button
        onClick={handleSearch}
        style={{ width: '100%', padding: '14px', background: '#dc0000', color: 'white', border: 'none', borderRadius: '4px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
      >
        Đổ kết quả
      </button>
    </div>
  );
}
