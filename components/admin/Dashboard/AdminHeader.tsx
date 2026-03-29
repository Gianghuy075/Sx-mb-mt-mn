/**
 * Admin Header Component
 */

'use client';

import { signOut } from 'next-auth/react';
import styles from './AdminHeader.module.css';

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>Quản trị nội dung</h1>

        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name || user.email}</span>
            <span className={styles.userRole}>Admin</span>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}
