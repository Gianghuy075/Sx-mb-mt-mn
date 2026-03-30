/**
 * Sidebar Component
 */

import Link from 'next/link';
import { getTodayString } from '@/lib/utils/dates';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const today = getTodayString();
  const thirtyDaysAgo = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  })();

  return (
    <aside className="sidebar">
      {/* Lotto Statistics */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>THỐNG KÊ LOTO</h3>
        <ul className={styles.sidebarList}>
          <li>
            <Link href="/thong-ke/so-nong">Số Nóng</Link>
          </li>
          <li>
            <Link href="/thong-ke/so-gan">Lô Gan</Link>
          </li>
          <li>
            <Link href="/thong-ke/tan-suat">Tần suất Loto</Link>
          </li>
          <li>
            <a href="#">TK Đầu-Đuôi</a>
          </li>
          <li>
            <a href="#">Theo Tổng</a>
          </li>
          <li>
            <Link href="/thong-ke">Xem tất cả</Link>
          </li>
        </ul>
      </div>

      {/* Featured Box */}
      <div className={styles.featuredBox}>
        <h3 className={styles.featuredTitle}>XỔ SỐ ĐIỆN TOÀN</h3>
        <ul className={styles.featuredList}>
          <li>
            <a href="#">XS Mega 6/45</a>
          </li>
          <li>
            <a href="#">Thứ 4</a>
          </li>
          <li>
            <a href="#">Thứ 6</a>
          </li>
          <li>
            <a href="#">Chủ Nhật</a>
          </li>
          <li>
            <a href="#">XS Power 6/55</a>
          </li>
          <li>
            <a href="#">Thứ 3</a>
          </li>
          <li>
            <a href="#">Thứ 5</a>
          </li>
          <li>
            <a href="#">Thứ 7</a>
          </li>
          <li>
            <a href="#">XS Điều toàn 6x36</a>
          </li>
          <li>
            <a href="#">XS Điều toàn 123</a>
          </li>
          <li>
            <a href="#">XS Thần tài 4</a>
          </li>
        </ul>
      </div>

      {/* Search Box - ĐỔ KẾT QUẢ */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>ĐỔ KẾT QUẢ</h3>
        <p className="info-text">Bộ số:</p>
        <p className="info-hint">Nhập bộ số để xem kết quả</p>
        <div className="date-range">
          <label>Từ ngày:</label>
          <input type="date" defaultValue={thirtyDaysAgo} />
          <label>Đến ngày:</label>
          <input type="date" defaultValue={today} />
        </div>
        <div className="province-select">
          <label>Tỉnh TP:</label>
          <select>
            <option>Miền Bắc</option>
          </select>
        </div>
        <button className="search-btn">ĐỔ KẾT QUẢ</button>
      </div>

      {/* Mega Lotto */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>THỐNG KỀ XS MEGA</h3>
        <ul className={styles.sidebarList}>
          <li>
            <a href="#">Thống kê 01-45</a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
