/**
 * Admin Sidebar Component
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin' && pathname === '/admin') return true;
    if (path !== '/admin' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2 className={styles.logoText}>Admin Panel</h2>
        <p className={styles.logoSubtext}>Xổ Số</p>
      </div>

      <nav className={styles.nav}>
        <Link
          href="/admin"
          className={`${styles.navItem} ${isActive('/admin') ? styles.active : ''}`}
        >
          <span className={styles.icon}>📊</span>
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/articles"
          className={`${styles.navItem} ${isActive('/admin/articles') ? styles.active : ''}`}
        >
          <span className={styles.icon}>📝</span>
          <span>Bài phân tích</span>
        </Link>
      </nav>

      <div className={styles.footer}>
        <p className={styles.footerText}>Admin CMS v1.0</p>
      </div>
    </aside>
  );
}
