/**
 * Admin Dashboard Page
 */

import Link from 'next/link';
import { getDb } from '@/lib/db/mongodb';
import styles from './page.module.css';

export const metadata = {
  title: 'Dashboard - Admin',
  description: 'Quản trị hệ thống',
};

async function getStats() {
  try {
    const db = await getDb();
    const [totalArticles, draftArticles, publishedArticles] = await Promise.all([
      db.collection('articles').countDocuments(),
      db.collection('articles').countDocuments({ status: 'draft' }),
      db.collection('articles').countDocuments({ status: 'published' }),
    ]);

    return {
      totalArticles,
      draftArticles,
      publishedArticles,
    };
  } catch (error) {
    // Database not connected yet
    return {
      totalArticles: 0,
      draftArticles: 0,
      publishedArticles: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📝</div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Tổng bài viết</div>
            <div className={styles.statValue}>{stats.totalArticles}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✏️</div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Bản nháp</div>
            <div className={styles.statValue}>{stats.draftArticles}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Đã xuất bản</div>
            <div className={styles.statValue}>{stats.publishedArticles}</div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/admin/articles/new" className={styles.primaryButton}>
          <span>➕</span>
          <span>Tạo bài viết mới</span>
        </Link>

        <Link href="/admin/articles" className={styles.secondaryButton}>
          <span>📋</span>
          <span>Quản lý bài viết</span>
        </Link>
      </div>
    </div>
  );
}
