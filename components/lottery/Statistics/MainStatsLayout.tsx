/**
 * Main Statistics Page Layout (Client Component)
 * Layout for the main /thong-ke page
 */

'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface MainStatsLayoutProps {
  children: ReactNode;
}

export default function MainStatsLayout({ children }: MainStatsLayoutProps) {
  return (
    <>
      <div className="breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span> › </span>
        <span>Thống kê</span>
      </div>

      <div className="stats-header">
        <h1>📊 Thống Kê Xổ Số</h1>
        <p>Phân tích số liệu, xu hướng và tần suất xuất hiện</p>
      </div>

      <div className="region-tabs">
        <button className="tab active">Miền Bắc</button>
        <button className="tab" disabled>Miền Trung (Coming Soon)</button>
        <button className="tab" disabled>Miền Nam (Coming Soon)</button>
      </div>

      <div className="quick-links">
        <Link href="/thong-ke/so-nong" className="quick-link">
          <span className="icon">🔥</span>
          <span className="label">Số Nóng</span>
        </Link>
        <Link href="/thong-ke/so-gan" className="quick-link">
          <span className="icon">⏰</span>
          <span className="label">Lô Gan</span>
        </Link>
        <Link href="/thong-ke/tan-suat" className="quick-link">
          <span className="icon">📊</span>
          <span className="label">Tần Suất</span>
        </Link>
      </div>

      {children}

      <style jsx>{`
        .breadcrumb {
          padding: 12px 20px;
          background: #f5f5f5;
          font-size: 14px;
          color: #666;
        }

        .breadcrumb :global(a) {
          color: #2196F3;
          text-decoration: none;
        }

        .breadcrumb :global(a):hover {
          text-decoration: underline;
        }

        .stats-header {
          background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
          color: white;
          padding: 32px;
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(33,150,243,0.2);
        }

        .stats-header h1 {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .stats-header p {
          font-size: 16px;
          opacity: 0.9;
        }

        .region-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          padding: 4px;
          background: #f5f5f5;
          border-radius: 8px;
        }

        .tab {
          flex: 1;
          padding: 12px 24px;
          border: none;
          background: transparent;
          color: #666;
          font-size: 14px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab:hover:not(:disabled) {
          background: white;
          color: #2196F3;
        }

        .tab.active {
          background: white;
          color: #2196F3;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .tab:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .quick-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .quick-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          background: white;
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          text-decoration: none;
          color: #333;
          transition: all 0.2s;
        }

        .quick-link:hover {
          border-color: #2196F3;
          box-shadow: 0 4px 12px rgba(33,150,243,0.15);
          transform: translateY(-2px);
        }

        .quick-link .icon {
          font-size: 32px;
        }

        .quick-link .label {
          font-size: 16px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .stats-header {
            padding: 20px;
          }

          .stats-header h1 {
            font-size: 24px;
          }

          .stats-header p {
            font-size: 14px;
          }

          .region-tabs {
            flex-direction: column;
          }

          .quick-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
