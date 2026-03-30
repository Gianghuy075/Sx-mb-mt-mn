/**
 * Header Component
 */

'use client';

import Link from 'next/link';
import { getTodayString, formatFullDateVN } from '@/lib/utils/dates';

export default function Header() {
  const today = getTodayString();
  const dateDisplay = formatFullDateVN(today);

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="logo-section">
          <span className="site-name">XỔ SỐ</span>
          <span className="tagline-header">Bản demo Website xổ số</span>
        </div>
        <div className="header-info">
          <span className="date-info">Hôm nay: {dateDisplay}</span>
          <Link href="/phan-tich" className="news-btn">
            Phân tích
          </Link>
          <Link href="/login" className="login-btn">
            Đăng nhập
          </Link>
        </div>
        <button className="mobile-menu-toggle" id="mobileMenuBtn">
          ☰
        </button>
      </div>
    </header>
  );
}
