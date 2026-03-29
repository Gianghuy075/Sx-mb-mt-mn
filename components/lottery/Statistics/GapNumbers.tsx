/**
 * Gap Numbers Component
 * Displays numbers that haven't appeared for a long time
 */

'use client';

interface GapNumber {
  number: string;
  days: number;
  max_gap_historic: number;
  last_appeared_date: string;
}

interface GapNumbersProps {
  data: GapNumber[];
  region: string;
}

export default function GapNumbers({ data, region }: GapNumbersProps) {
  if (!data || data.length === 0) {
    return (
      <div className="stats-card">
        <h2 className="stats-title">Lô Gan</h2>
        <p className="text-gray-500">Không có dữ liệu</p>
      </div>
    );
  }

  return (
    <div className="stats-card">
      <h2 className="stats-title">
        ⏰ Lô Gan - {region.toUpperCase()}
      </h2>
      <p className="stats-subtitle">
        Top {data.length} số lâu không xuất hiện
      </p>

      <div className="gap-numbers-grid">
        {data.map((item, index) => {
          const isNearRecord = item.days >= item.max_gap_historic * 0.8;
          const progressPercentage = Math.min((item.days / item.max_gap_historic) * 100, 100);

          return (
            <div key={item.number} className={`gap-number-item ${isNearRecord ? 'near-record' : ''}`}>
              <div className="gap-number-header">
                <div className="gap-number-badge">
                  {item.number}
                </div>
                <div className="gap-number-days">
                  <span className="days-count">{item.days}</span>
                  <span className="days-label">ngày</span>
                </div>
              </div>

              <div className="gap-number-progress">
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="progress-label">
                  Kỷ lục: {item.max_gap_historic} ngày
                </div>
              </div>

              <div className="gap-number-footer">
                <span className="last-date">
                  Lần cuối: {item.last_appeared_date}
                </span>
                {isNearRecord && (
                  <span className="record-badge">⚠️ Gần kỷ lục</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

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
          margin-bottom: 24px;
          font-size: 14px;
        }

        .gap-numbers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }

        .gap-number-item {
          padding: 16px;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          transition: all 0.2s;
          background: #fafafa;
        }

        .gap-number-item:hover {
          border-color: #4CAF50;
          box-shadow: 0 4px 12px rgba(76,175,80,0.15);
          transform: translateY(-2px);
        }

        .gap-number-item.near-record {
          border-color: #ff9800;
          background: #fff8f0;
        }

        .gap-number-item.near-record:hover {
          border-color: #ff9800;
          box-shadow: 0 4px 12px rgba(255,152,0,0.2);
        }

        .gap-number-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .gap-number-badge {
          font-size: 32px;
          font-weight: bold;
          color: #4CAF50;
          padding: 8px 16px;
          background: white;
          border-radius: 8px;
          border: 2px solid #4CAF50;
        }

        .near-record .gap-number-badge {
          color: #ff9800;
          border-color: #ff9800;
        }

        .gap-number-days {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .days-count {
          font-size: 28px;
          font-weight: bold;
          color: #333;
          line-height: 1;
        }

        .days-label {
          font-size: 12px;
          color: #666;
        }

        .gap-number-progress {
          margin-bottom: 12px;
        }

        .progress-bar-container {
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 4px;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .near-record .progress-bar {
          background: linear-gradient(90deg, #ff9800 0%, #ffb74d 100%);
        }

        .progress-label {
          font-size: 11px;
          color: #666;
        }

        .gap-number-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
        }

        .last-date {
          color: #666;
        }

        .record-badge {
          background: #ff9800;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .gap-numbers-grid {
            grid-template-columns: 1fr;
          }

          .gap-number-badge {
            font-size: 24px;
            padding: 6px 12px;
          }

          .days-count {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}
