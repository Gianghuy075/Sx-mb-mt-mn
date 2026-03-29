/**
 * Admin Login Page
 */

import { Suspense } from 'react';
import LoginForm from '@/components/admin/Auth/LoginForm';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Đăng nhập Admin</h1>
          <p className={styles.subtitle}>Quản trị bài phân tích xổ số</p>
        </div>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '20px' }}>Đang tải...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
