/**
 * Admin Login Page
 */

import LoginForm from '@/components/admin/Auth/LoginForm';
import styles from './page.module.css';

export const metadata = {
  title: 'Đăng nhập Admin - Xổ Số',
  description: 'Đăng nhập vào hệ thống quản trị',
};

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Đăng nhập Admin</h1>
          <p className={styles.subtitle}>Quản trị bài phân tích xổ số</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
