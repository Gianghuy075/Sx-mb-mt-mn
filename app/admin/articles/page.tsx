/**
 * Articles List Page
 */

import Link from 'next/link';
import ArticleTable from '@/components/admin/ArticleList/ArticleTable';
import styles from './page.module.css';

export const metadata = {
  title: 'Quản lý bài viết - Admin',
  description: 'Danh sách bài phân tích',
};

export default function ArticlesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý bài viết</h1>
        <Link href="/admin/articles/new" className={styles.createButton}>
          <span>➕</span>
          <span>Tạo bài viết mới</span>
        </Link>
      </div>

      <ArticleTable />
    </div>
  );
}
