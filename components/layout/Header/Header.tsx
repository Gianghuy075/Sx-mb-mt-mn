/**
 * Header Component — Glassmorphism Indigo
 */

'use client';

import Link from 'next/link';
import { getTodayString, formatFullDateVN } from '@/lib/utils/dates';
import styles from './Header.module.css';

export default function Header() {
  const today = getTodayString();
  const dateDisplay = formatFullDateVN(today);

  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerTop}>
        <div className={styles.logoSection}>
          <span className={styles.siteName}>KQXS.MOBI</span>
          <span className={styles.taglineHeader}>Kết quả xổ số trực tiếp</span>
        </div>
        <div className={styles.headerInfo}>
          <span className={styles.dateInfo}>{dateDisplay}</span>
          <Link href="/login" className={styles.loginBtn}>
            Đăng nhập
          </Link>
        </div>
        <button className={styles.mobileMenuToggle} id="mobileMenuBtn">
          ☰
        </button>
      </div>
    </header>
  );
}
