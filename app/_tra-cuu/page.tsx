/**
 * Search Results Page - Tra cứu kết quả (Đổ kết quả)
 */

'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar/Sidebar';

export default function SearchPage() {
  const [numberSet, setNumberSet] = useState('');
  const [fromDate, setFromDate] = useState('02/28/2026');
  const [toDate, setToDate] = useState('03/29/2026');
  const [region, setRegion] = useState('Miền Bắc');
  const [showResults, setShowResults] = useState(false);

  // Fake data results
  const fakeResults = [
    { date: '29/03/2026', prize: 'G7', numbers: ['09', '61', '76', '18'], matched: ['18'] },
    { date: '28/03/2026', prize: 'G5', numbers: ['7194', '9927', '2925', '1164', '2143', '4991'], matched: ['18'] },
    { date: '27/03/2026', prize: 'ĐB', numbers: ['18234'], matched: ['18'] },
    { date: '26/03/2026', prize: 'G6', numbers: ['188', '358', '385'], matched: ['18'] },
    { date: '25/03/2026', prize: 'G4', numbers: ['1804', '3611', '2755', '0569'], matched: ['18'] },
  ];

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '24px'
    }}>
      <main style={{ minWidth: 0, background: 'white', borderRadius: '8px' }}>
        {/* Header */}
        <div style={{ background: '#fff9cc', padding: '20px', textAlign: 'center', borderRadius: '8px 8px 0 0' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#000', margin: 0 }}>
            ĐỔ KẾT QUẢ
          </h1>
        </div>

        {/* Search Form */}
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e5e5' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              Bộ số:
            </label>
            <input
              type="text"
              value={numberSet}
              onChange={(e) => setNumberSet(e.target.value)}
              placeholder="Nhập bộ số để đối số lần gần"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <p style={{ fontSize: '12px', color: '#999', marginTop: '6px' }}>
              Ví dụ: 50 hoặc 68, 86
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Từ ngày:
              </label>
              <input
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Đến ngày:
              </label>
              <input
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              Tỉnh TP:
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                background: 'white'
              }}
            >
              <option>Miền Bắc</option>
              <option>Miền Trung</option>
              <option>Miền Nam</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            style={{
              width: '100%',
              padding: '14px',
              background: '#dc0000',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Đổ kết quả
          </button>
        </div>

        {/* Results */}
        {showResults && (
          <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#0066cc' }}>
              Kết quả tìm kiếm cho bộ số "{numberSet || '18'}"
            </h2>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
              Đang có thể thử lại số này. Nhập bộ số để kiếm tra kết quả trúng thưởng.
              Ví dụ: 50 hoặc 68, 86
            </p>

            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #e5e5e5'
            }}>
              <thead>
                <tr style={{ background: '#f8f8f8' }}>
                  <th style={{ padding: '12px', border: '1px solid #e5e5e5', textAlign: 'center', fontSize: '14px' }}>
                    Ngày quay
                  </th>
                  <th style={{ padding: '12px', border: '1px solid #e5e5e5', textAlign: 'center', fontSize: '14px' }}>
                    Giải
                  </th>
                  <th style={{ padding: '12px', border: '1px solid #e5e5e5', textAlign: 'left', fontSize: '14px' }}>
                    Các số trúng
                  </th>
                </tr>
              </thead>
              <tbody>
                {fakeResults.map((result, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td style={{ padding: '10px 12px', border: '1px solid #e5e5e5', textAlign: 'center' }}>
                      <a href="#" style={{ color: '#0066cc', textDecoration: 'none' }}>
                        {result.date}
                      </a>
                    </td>
                    <td style={{ padding: '10px 12px', border: '1px solid #e5e5e5', textAlign: 'center', fontWeight: 'bold' }}>
                      {result.prize}
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
                            borderRadius: '3px'
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
                📊 Tìm thấy <strong>5 kết quả</strong> trong khoảng thời gian từ {fromDate} đến {toDate}
              </p>
            </div>
          </div>
        )}

        {!showResults && (
          <div style={{ padding: '60px 24px', textAlign: 'center', color: '#999' }}>
            <p style={{ fontSize: '15px' }}>Nhập bộ số và nhấn "Đổ kết quả" để tra cứu</p>
          </div>
        )}
      </main>

      <Sidebar />
    </div>
  );
}
