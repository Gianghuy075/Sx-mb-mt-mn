/**
 * Hot Numbers Component
 * Displays top numbers that appear most frequently
 */

'use client';

interface HotNumber {
  number: string;
  count: number;
}

interface HotNumbersProps {
  data: HotNumber[];
  region: string;
}

export default function HotNumbers({ data, region }: HotNumbersProps) {
  if (!data || data.length === 0) {
    return (
      <div className="stats-card">
        <h2 className="stats-title">Số Nóng</h2>
        <p className="text-gray-500">Không có dữ liệu</p>
      </div>
    );
  }

  const maxCount = data[0]?.count || 1;

  return (
    <div className="stats-card">
      <h2 className="stats-title">
        🔥 Số Nóng - {region.toUpperCase()}
      </h2>
      <p className="stats-subtitle">
        Top {data.length} số xuất hiện nhiều nhất trong 30 ngày
      </p>

      <div className="hot-numbers-grid">
        {data.map((item, index) => {
          const percentage = (item.count / maxCount) * 100;
          const isTop3 = index < 3;

          return (
            <div key={item.number} className="hot-number-item">
              <div className="hot-number-rank">
                {index === 0 && '🥇'}
                {index === 1 && '🥈'}
                {index === 2 && '🥉'}
                {index > 2 && `#${index + 1}`}
              </div>

              <div className={`hot-number-badge ${isTop3 ? 'top-3' : ''}`}>
                {item.number}
              </div>

              <div className="hot-number-bar-container">
                <div
                  className="hot-number-bar"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="hot-number-count">
                {item.count} lần
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

        .hot-numbers-grid {
          display: grid;
          gap: 16px;
        }

        .hot-number-item {
          display: grid;
          grid-template-columns: 50px 60px 1fr 80px;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .hot-number-item:hover {
          border-color: #ff4444;
          box-shadow: 0 2px 8px rgba(255,68,68,0.1);
        }

        .hot-number-rank {
          font-size: 20px;
          text-align: center;
        }

        .hot-number-badge {
          font-size: 24px;
          font-weight: bold;
          color: #ff4444;
          text-align: center;
          padding: 8px;
          background: #fff5f5;
          border-radius: 8px;
          border: 2px solid #ffcccc;
        }

        .hot-number-badge.top-3 {
          background: linear-gradient(135deg, #ff4444 0%, #ff6666 100%);
          color: white;
          border-color: #ff4444;
          box-shadow: 0 2px 8px rgba(255,68,68,0.3);
        }

        .hot-number-bar-container {
          height: 24px;
          background: #f0f0f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .hot-number-bar {
          height: 100%;
          background: linear-gradient(90deg, #ff4444 0%, #ff6666 100%);
          border-radius: 12px;
          transition: width 0.3s ease;
        }

        .hot-number-count {
          font-weight: 600;
          color: #333;
          text-align: right;
        }

        @media (max-width: 768px) {
          .hot-number-item {
            grid-template-columns: 40px 50px 1fr 70px;
            gap: 8px;
            padding: 8px;
          }

          .hot-number-badge {
            font-size: 18px;
            padding: 6px;
          }

          .hot-number-count {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
