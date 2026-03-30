/**
 * Frequency Component
 * Displays frequency statistics of all numbers
 */

'use client';

import { useState } from 'react';

interface FrequencyData {
  number: string;
  frequency: number;
  percentage: number;
}

interface FrequencyProps {
  data: FrequencyData[];
  region: string;
}

export default function Frequency({ data, region }: FrequencyProps) {
  const [sortBy, setSortBy] = useState<'frequency' | 'number'>('frequency');
  const [filterDigit, setFilterDigit] = useState<string | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="stats-card">
        <h2 className="stats-title">Tần Suất</h2>
        <p className="text-gray-500">Không có dữ liệu</p>
      </div>
    );
  }

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'frequency') {
      return b.frequency - a.frequency;
    }
    return a.number.localeCompare(b.number);
  });

  // Filter by digit
  const filteredData = filterDigit !== null
    ? sortedData.filter(item => item.number.startsWith(filterDigit))
    : sortedData;

  const maxFrequency = Math.max(...data.map(d => d.frequency));

  return (
    <div className="stats-card">
      <h2 className="stats-title">
        📊 Tần Suất - {region.toUpperCase()}
      </h2>
      <p className="stats-subtitle">
        Thống kê xuất hiện của tất cả các số
      </p>

      {/* Controls */}
      <div className="controls">
        <div className="sort-buttons">
          <button
            className={`sort-btn ${sortBy === 'frequency' ? 'active' : ''}`}
            onClick={() => setSortBy('frequency')}
          >
            Tần suất
          </button>
          <button
            className={`sort-btn ${sortBy === 'number' ? 'active' : ''}`}
            onClick={() => setSortBy('number')}
          >
            Số thứ tự
          </button>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterDigit === null ? 'active' : ''}`}
            onClick={() => setFilterDigit(null)}
          >
            Tất cả
          </button>
          {Array.from({ length: 10 }, (_, i) => i.toString()).map(digit => (
            <button
              key={digit}
              className={`filter-btn ${filterDigit === digit ? 'active' : ''}`}
              onClick={() => setFilterDigit(digit)}
            >
              {digit}x
            </button>
          ))}
        </div>
      </div>

      {/* Frequency Grid */}
      <div className="frequency-grid">
        {filteredData.map((item) => {
          const barWidth = (item.frequency / maxFrequency) * 100;

          return (
            <div key={item.number} className="frequency-item">
              <div className="frequency-number">{item.number}</div>
              <div className="frequency-bar-container">
                <div
                  className="frequency-bar"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <div className="frequency-value">
                {item.frequency}
                <span className="frequency-percent">({(item.percentage ?? 0).toFixed(1)}%)</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredData.length === 0 && (
        <p className="no-data">Không có số nào bắt đầu bằng {filterDigit}</p>
      )}

      <style jsx>{`
        .stats-card {
          background: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 24px;
        }

        .stats-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #1a1a1a;
        }

        .stats-subtitle {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e5e5;
        }

        .sort-buttons {
          display: flex;
          gap: 8px;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .sort-btn,
        .filter-btn {
          padding: 8px 16px;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .sort-btn:hover,
        .filter-btn:hover {
          border-color: #2196F3;
          color: #2196F3;
        }

        .sort-btn.active,
        .filter-btn.active {
          background: #2196F3;
          color: white;
          border-color: #2196F3;
        }

        .frequency-grid {
          display: grid;
          gap: 8px;
        }

        .frequency-item {
          display: grid;
          grid-template-columns: 50px 1fr 120px;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .frequency-item:hover {
          background: #f5f5f5;
        }

        .frequency-number {
          font-size: 18px;
          font-weight: bold;
          color: #2196F3;
          text-align: center;
        }

        .frequency-bar-container {
          height: 20px;
          background: #f0f0f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .frequency-bar {
          height: 100%;
          background: linear-gradient(90deg, #2196F3 0%, #64B5F6 100%);
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .frequency-value {
          font-weight: 600;
          color: #333;
          text-align: right;
        }

        .frequency-percent {
          font-size: 12px;
          color: #666;
          margin-left: 4px;
        }

        .no-data {
          text-align: center;
          color: #666;
          padding: 24px;
        }

        @media (max-width: 768px) {
          .controls {
            gap: 8px;
          }

          .filter-buttons {
            gap: 4px;
          }

          .filter-btn {
            padding: 6px 12px;
            font-size: 12px;
          }

          .frequency-item {
            grid-template-columns: 40px 1fr 100px;
            gap: 8px;
          }

          .frequency-number {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
