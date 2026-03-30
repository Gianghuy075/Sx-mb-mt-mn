/**
 * Stats Dashboard - fetches 10 stats endpoints and renders basic tables per region
 */

'use client';

import { useEffect, useState } from 'react';
import styles from './StatsDashboard.module.css';

type Region = 'mb' | 'mt' | 'mn';

interface StatsResponse {
  region: string;
  hotNumbers?: any;
  gap?: any;
  frequency?: any;
  headTail?: any;
  pairFrequency?: any;
  specialWeek?: any;
  lotoCycle?: any;
  matrix?: any;
  theoTong?: any;
  loGan?: any;
}

const REGIONS: { id: Region; label: string }[] = [
  { id: 'mb', label: 'Miền Bắc' },
  { id: 'mn', label: 'Miền Nam' },
  { id: 'mt', label: 'Miền Trung' },
];

export default function StatsDashboard() {
  const [region, setRegion] = useState<Region>('mb');
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    fetch(`/api/stats/${region}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((json) => {
        if (!ignore) setData(json);
      })
      .catch((err) => {
        if (!ignore) setError(String(err));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [region]);

  const renderHotNumbers = () => {
    const items = data?.hotNumbers?.data || [];
    return (
      <div className={styles.card}>
        <h3>🔥 Số nóng (top)</h3>
        <table className={styles.table}>
          <thead>
            <tr><th>Số</th><th>Số lần</th></tr>
          </thead>
          <tbody>
            {items.slice(0, 10).map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{item.number}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderGap = () => {
    const items = data?.gap?.data || [];
    return (
      <div className={styles.card}>
        <h3>🧊 Lô gan</h3>
        <table className={styles.table}>
          <thead>
            <tr><th>Số</th><th>Ngày chưa về</th><th>Max lịch sử</th></tr>
          </thead>
          <tbody>
            {items.slice(0, 10).map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{item.number}</td>
                <td>{item.days}</td>
                <td>{item.max_gap_historic ?? item.maxGapHistoric ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFrequency = () => {
    const items = data?.frequency?.data || [];
    return (
      <div className={styles.card}>
        <h3>📊 Tần suất</h3>
        <table className={styles.table}>
          <thead>
            <tr><th>Số</th><th>Số lần</th><th>%</th></tr>
          </thead>
          <tbody>
            {items.slice(0, 10).map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{item.number}</td>
                <td>{item.frequency ?? item.count}</td>
                <td>{item.percentage ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderHeadTail = () => {
    const head = data?.headTail?.data?.head || {};
    const tail = data?.headTail?.data?.tail || {};
    const rows = Array.from({ length: 10 }, (_, i) => ({
      head: i,
      numbers: (head[String(i)] || []).join(', '),
      tail: (tail[String(i)] || []).join(', '),
    }));
    return (
      <div className={styles.card}>
        <h3>🔢 Đầu - Đuôi</h3>
        <table className={styles.table}>
          <thead><tr><th>Đầu</th><th>Số</th><th>Đuôi</th><th>Số</th></tr></thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.head}</td><td>{r.numbers}</td><td>{r.head}</td><td>{r.tail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPairFrequency = () => {
    const items: any[] = data?.pairFrequency?.data || [];
    return (
      <div className={styles.card}>
        <h3>📌 Cặp số</h3>
        <table className={styles.table}>
          <thead><tr><th>Cặp số</th><th>Số lần</th></tr></thead>
          <tbody>
            {items.slice(0, 10).map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{Array.isArray(item.pair) ? item.pair.join(' - ') : item.pair}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSpecialWeek = () => {
    const items: any[] = data?.specialWeek?.data || [];
    return (
      <div className={styles.card}>
        <h3>📅 Đặc biệt theo tuần</h3>
        <table className={styles.table}>
          <thead><tr><th>Thứ</th><th>Ngày</th><th>Kết quả</th><th>Lô tô</th></tr></thead>
          <tbody>
            {items.slice(0, 10).map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{item.day}</td>
                <td>{item.date}</td>
                <td>{item.result}</td>
                <td>{item.loto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderLotoCycle = () => {
    const items: any[] = data?.lotoCycle?.data || [];
    return (
      <div className={styles.card}>
        <h3>⏱️ Chu kỳ lô tô</h3>
        <table className={styles.table}>
          <thead><tr><th>Số</th><th>Chu kỳ TB</th><th>Nóng</th><th>Lạnh</th></tr></thead>
          <tbody>
            {items.slice(0, 10).map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{item.number}</td>
                <td>{item.count ?? item.avgCycle ?? '-'}</td>
                <td>{item.isHot ? '🔥' : '-'}</td>
                <td>{item.isCold ? '🧊' : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderMatrix = () => {
    const items: any[] = data?.matrix?.data || [];
    return (
      <div className={styles.card}>
        <h3>🧮 Ma trận 00-99</h3>
        <table className={styles.table}>
          <thead><tr><th>Số</th><th>Số lần</th><th>Nóng</th><th>Lạnh</th></tr></thead>
          <tbody>
            {items.slice(0, 10).map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{item.number}</td>
                <td>{item.count}</td>
                <td>{item.isHot ? '🔥' : '-'}</td>
                <td>{item.isCold ? '🧊' : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTheoTong = () => {
    const items: any[] = data?.theoTong?.data || [];
    return (
      <div className={styles.card}>
        <h3>➕ Theo tổng</h3>
        <table className={styles.table}>
          <thead><tr><th>Tổng</th><th>Số lần</th></tr></thead>
          <tbody>
            {items.slice(0, 10).map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{item.total}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderLoGan = () => {
    const items: any[] = data?.loGan?.data || [];
    return (
      <div className={styles.card}>
        <h3>🧊 Lô gan</h3>
        <table className={styles.table}>
          <thead><tr><th>Số</th><th>Ngày chưa về</th><th>Max lịch sử</th><th>Lần cuối</th></tr></thead>
          <tbody>
            {items.slice(0, 10).map((item: any, idx: number) => (
              <tr key={idx}>
                <td>{item.number}</td>
                <td>{item.days}</td>
                <td>{item.max_gap_historic ?? item.maxGapHistoric ?? '-'}</td>
                <td>{item.last_appeared_date ?? item.lastAppearedDate ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.regionTabs}>
        {REGIONS.map(r => (
          <button
            key={r.id}
            className={`${styles.regionTab} ${region === r.id ? styles.active : ''}`}
            onClick={() => setRegion(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      {loading && <div className={styles.notice}>Đang tải thống kê...</div>}
      {error && <div className={styles.error}>Lỗi tải thống kê: {error}</div>}

      {!loading && !error && (
        <div className={styles.grid}>
          {renderHotNumbers()}
          {renderGap()}
          {renderFrequency()}
          {renderHeadTail()}
          {renderPairFrequency()}
          {renderSpecialWeek()}
          {renderLotoCycle()}
          {renderMatrix()}
          {renderTheoTong()}
          {renderLoGan()}
        </div>
      )}
    </div>
  );
}
