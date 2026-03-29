/**
 * Gap Numbers Table Component (Simple style like xoso.com.vn)
 */

'use client';

import { useState } from 'react';

interface GapNumber {
  number: string;
  days: number;
  max_gap_historic: number;
  last_appeared_date: string;
}

interface GapNumbersTableProps {
  data: GapNumber[];
  region: string;
}

export default function GapNumbersTable({ data, region }: GapNumbersTableProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedRegion, setSelectedRegion] = useState(region);

  if (!data || data.length === 0) {
    return <div>Không có dữ liệu</div>;
  }

  return (
    <div className="gap-stats-container">
      {/* Region Tabs */}
      <div className="region-tabs">
        <button className={selectedRegion === 'MB' ? 'active' : ''}>Gan XSMB</button>
        <button className={selectedRegion === 'MT' ? 'active' : ''}>Gan XSMT</button>
        <button className={selectedRegion === 'MN' ? 'active' : ''}>Gan XSMN</button>
      </div>

      {/* Header */}
      <div className="stats-header">
        <h1>Lô gan miền Bắc – Thống kê lo gan XSMB</h1>
      </div>

      {/* Search Form */}
      <div className="search-form">
        <div className="form-group">
          <label>Chọn ngày</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tỉnh, TP</label>
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="MB">Miền Bắc</option>
            <option value="MT">Miền Trung</option>
            <option value="MN">Miền Nam</option>
          </select>
        </div>
        <button className="search-btn">Xem kết quả</button>
      </div>

      {/* Table */}
      <div className="stats-table-section">
        <h2 className="table-title">Thống kê Loto gan Xổ số Miền Bắc</h2>

        <table className="stats-table">
          <thead>
            <tr>
              <th>Lô gan</th>
              <th>Lần chưa về</th>
              <th>Về gần nhất</th>
              <th>Gan cực đại</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.number}>
                <td className="number-cell">{item.number}</td>
                <td>{item.days} lần</td>
                <td>
                  <a href="#" className="date-link">{item.last_appeared_date}</a>
                </td>
                <td>{item.max_gap_historic} lần</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ads-section">
        <p>Advertisements</p>
      </div>

      <style jsx>{`
        .gap-stats-container {
          background: #fff;
          max-width: 800px;
        }

        .region-tabs {
          display: flex;
          background: #f5f5f5;
          border-radius: 8px 8px 0 0;
          overflow: hidden;
        }

        .region-tabs button {
          flex: 1;
          padding: 12px 20px;
          border: none;
          background: #e8e8e8;
          color: #333;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border-right: 1px solid #ddd;
        }

        .region-tabs button:last-child {
          border-right: none;
        }

        .region-tabs button.active {
          background: #fff;
          color: #000;
          font-weight: 600;
        }

        .stats-header {
          background: #fff9cc;
          padding: 20px;
          text-align: center;
        }

        .stats-header h1 {
          font-size: 20px;
          font-weight: bold;
          color: #000;
          margin: 0;
        }

        .search-form {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 15px;
          padding: 20px;
          background: #fff;
          border-bottom: 1px solid #e5e5e5;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 13px;
          color: #666;
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group select {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .search-btn {
          align-self: flex-end;
          padding: 10px 30px;
          background: #dc0000;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .search-btn:hover {
          background: #c00000;
        }

        .stats-table-section {
          padding: 20px;
        }

        .table-title {
          font-size: 16px;
          font-weight: bold;
          color: #0066cc;
          margin-bottom: 15px;
        }

        .stats-table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #e5e5e5;
        }

        .stats-table thead {
          background: #f8f8f8;
        }

        .stats-table th {
          padding: 12px;
          text-align: center;
          border: 1px solid #e5e5e5;
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .stats-table td {
          padding: 10px 12px;
          text-align: center;
          border: 1px solid #e5e5e5;
          font-size: 14px;
        }

        .stats-table tbody tr:hover {
          background: #f9f9f9;
        }

        .number-cell {
          font-weight: bold;
          font-size: 16px;
          color: #000;
        }

        .date-link {
          color: #0066cc;
          text-decoration: none;
        }

        .date-link:hover {
          text-decoration: underline;
        }

        .ads-section {
          padding: 40px 20px;
          text-align: center;
          color: #999;
          border-top: 1px solid #e5e5e5;
        }

        @media (max-width: 768px) {
          .search-form {
            grid-template-columns: 1fr;
          }

          .search-btn {
            align-self: stretch;
          }
        }
      `}</style>
    </div>
  );
}
