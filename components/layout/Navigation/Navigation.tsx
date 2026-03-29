/**
 * Navigation Component
 */

import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.mainNav}>
      <div className={styles.navContainer}>
        <Link href="/" className={`${styles.navItem} ${styles.navHome}`}>
          🏠
        </Link>
        <Link href="/mb/today" className={styles.navItem}>
          XSMB
        </Link>
        <Link href="/mn/today" className={styles.navItem}>
          XSMN
        </Link>
        <Link href="/mt/today" className={styles.navItem}>
          XSMT
        </Link>
        <Link href="/vietlott" className={styles.navItem}>
          VIETLOTT
        </Link>
        <Link href="/phan-tich" className={styles.navItem}>
          PHÂN TÍCH
        </Link>
        <Link href="/thong-ke" className={styles.navItem}>
          THỐNG KÊ
        </Link>
        <Link href="/tra-cuu" className={styles.navItem}>
          TRA CỨU KQ
        </Link>
        <Link href="/so-dau-duoi" className={styles.navItem}>
          SỐ ĐẦU ĐUÔI
        </Link>
        <Link href="/tin-xo-so" className={styles.navItem}>
          TIN XỔ SỐ
        </Link>
      </div>
    </nav>
  );
}
