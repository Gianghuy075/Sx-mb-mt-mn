/**
 * Tra Cứu Kết Quả - Search lottery results by number
 * Server component: reads searchParams, fetches real draws, filters matches
 */

import Sidebar from '@/components/layout/Sidebar/Sidebar';
import TraCuuForm from './TraCuuForm';
import { getDraws } from '@/lib/api/lottery';
import { getTodayString } from '@/lib/utils/dates';
import type { Region, LotteryData, Prize } from '@/lib/types/lottery';

interface SearchPageProps {
  searchParams: Promise<{
    so?: string;
    from?: string;
    to?: string;
    region?: string;
  }>;
}

interface MatchedResult {
  date: string;
  label: string;
  numbers: string[];
  matched: string[];
}

function getDatesInRange(from: string, to: string): string[] {
  const dates: string[] = [];
  const cur = new Date(from);
  const end = new Date(to);
  while (cur <= end) {
    dates.push(cur.toISOString().split('T')[0]);
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

function getAllPrizes(draw: LotteryData): { label: string; numbers: string[] }[] {
  if (draw.region === 'mb') {
    return draw.prizes.map(p => ({ label: p.label, numbers: p.numbers }));
  }
  // MT/MN: flatten all provinces
  return draw.provinces.flatMap(province =>
    province.prizes.map((p: Prize) => ({ label: `${province.name} - ${p.label}`, numbers: p.numbers }))
  );
}

function findMatches(draw: LotteryData, searchNum: string): { label: string; numbers: string[]; matched: string[] }[] {
  const results = [];
  for (const prize of getAllPrizes(draw)) {
    const matched = prize.numbers.filter(n => n.slice(-2) === searchNum);
    if (matched.length > 0) {
      results.push({ label: prize.label, numbers: prize.numbers, matched });
    }
  }
  return results;
}

const MAX_DAYS = 30;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const today = getTodayString();
  const thirtyDaysAgo = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  })();

  const so = params.so?.trim() ?? '';
  const from = params.from ?? thirtyDaysAgo;
  const to = params.to ?? today;
  const region = (params.region ?? 'mb') as Region;

  let results: MatchedResult[] = [];
  let tooManyDays = false;
  let searched = false;

  if (so) {
    searched = true;
    const dates = getDatesInRange(from, to);

    if (dates.length > MAX_DAYS) {
      tooManyDays = true;
    } else {
      const draws = await Promise.all(dates.map(d => getDraws(region, d)));

      for (let i = 0; i < draws.length; i++) {
        const draw = draws[i];
        if (!draw) continue;
        const matches = findMatches(draw, so.slice(-2).padStart(2, '0'));
        for (const m of matches) {
          results.push({ date: dates[i], ...m });
        }
      }
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      <main style={{ minWidth: 0, background: 'white', borderRadius: '8px' }}>
        {/* Header */}
        <div style={{ background: '#fff9cc', padding: '20px', textAlign: 'center', borderRadius: '8px 8px 0 0' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000', margin: 0 }}>ĐỔ KẾT QUẢ</h1>
        </div>

        {/* Form (client component) */}
        <TraCuuForm
          defaultFrom={from}
          defaultTo={to}
          initialSo={so}
          initialRegion={region}
        />

        {/* Results */}
        {searched && !tooManyDays && (
          <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#0066cc' }}>
              Kết quả tìm kiếm cho bộ số &quot;{so}&quot;
            </h2>

            {results.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                Không tìm thấy kết quả nào trong khoảng thời gian đã chọn.
              </div>
            ) : (
              <>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e5e5' }}>
                  <thead>
                    <tr style={{ background: '#f8f8f8' }}>
                      <th style={{ padding: '12px', border: '1px solid #e5e5e5', textAlign: 'center', fontSize: '14px' }}>Ngày quay</th>
                      <th style={{ padding: '12px', border: '1px solid #e5e5e5', textAlign: 'center', fontSize: '14px' }}>Giải</th>
                      <th style={{ padding: '12px', border: '1px solid #e5e5e5', textAlign: 'left', fontSize: '14px' }}>Các số trúng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #e5e5e5' }}>
                        <td style={{ padding: '10px 12px', border: '1px solid #e5e5e5', textAlign: 'center' }}>
                          <a href={`/mb/${result.date}`} style={{ color: '#0066cc', textDecoration: 'none' }}>
                            {result.date}
                          </a>
                        </td>
                        <td style={{ padding: '10px 12px', border: '1px solid #e5e5e5', textAlign: 'center', fontWeight: 'bold' }}>
                          {result.label}
                        </td>
                        <td style={{ padding: '10px 12px', border: '1px solid #e5e5e5' }}>
                          {result.numbers.map((num, idx) => (
                            <span
                              key={idx}
                              style={{
                                display: 'inline-block',
                                margin: '0 8px 8px 0',
                                padding: '4px 8px',
                                background: result.matched.includes(num) ? '#ffebee' : 'transparent',
                                color: result.matched.includes(num) ? '#dc0000' : '#000',
                                fontWeight: result.matched.includes(num) ? 'bold' : 'normal',
                                borderRadius: '3px',
                              }}
                            >
                              {num}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '4px' }}>
                  <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
                    Tìm thấy <strong>{results.length} kết quả</strong> từ {from} đến {to}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {tooManyDays && (
          <div style={{ padding: '24px', color: '#cc0000' }}>
            Vui lòng chọn khoảng thời gian tối đa {MAX_DAYS} ngày.
          </div>
        )}

        {!searched && (
          <div style={{ padding: '60px 24px', textAlign: 'center', color: '#999' }}>
            <p style={{ fontSize: '15px' }}>Nhập bộ số và nhấn &quot;Đổ kết quả&quot; để tra cứu</p>
          </div>
        )}
      </main>

      <Sidebar />
    </div>
  );
}
