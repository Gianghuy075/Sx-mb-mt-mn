/**
 * Article Table Component
 * Displays articles with search, filter, and pagination
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Article } from '@/lib/types/article';
import styles from './ArticleTable.module.css';

interface ArticleListResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ArticleTable() {
  const router = useRouter();
  const [data, setData] = useState<ArticleListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, [search, status, page]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (status) params.set('status', status);
      params.set('page', String(page));

      const response = await fetch(`/api/admin/articles?${params}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchArticles();
      } else {
        alert('Xóa thất bại');
      }
    } catch (error) {
      alert('Xóa thất bại');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchArticles();
      } else {
        alert('Cập nhật thất bại');
      }
    } catch (error) {
      alert('Cập nhật thất bại');
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { label: 'Nháp', className: styles.badgeDraft },
      published: { label: 'Đã xuất bản', className: styles.badgePublished },
      archived: { label: 'Đã xóa', className: styles.badgeArchived },
    };
    const badge = badges[status as keyof typeof badges] || badges.draft;
    return <span className={`${styles.badge} ${badge.className}`}>{badge.label}</span>;
  };

  if (loading && !data) {
    return <div className={styles.loading}>Đang tải...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className={styles.searchInput}
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className={styles.filterSelect}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="draft">Nháp</option>
          <option value="published">Đã xuất bản</option>
          <option value="archived">Đã xóa</option>
        </select>
      </div>

      {/* Table */}
      {data && data.articles.length > 0 ? (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Trạng thái</th>
                  <th>Tác giả</th>
                  <th>Ngày tạo</th>
                  <th>Lượt xem</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {data.articles.map((article) => (
                  <tr key={article.id}>
                    <td className={styles.titleCell}>
                      <Link href={`/admin/articles/${article.id}`} className={styles.titleLink}>
                        {article.title}
                      </Link>
                    </td>
                    <td>{getStatusBadge(article.status)}</td>
                    <td>{article.author?.name || article.author?.username}</td>
                    <td>{formatDate(article.createdAt)}</td>
                    <td>{article.views}</td>
                    <td>
                      <div className={styles.actions}>
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className={styles.actionButton}
                        >
                          ✏️
                        </Link>
                        {article.status === 'draft' && (
                          <button
                            onClick={() => handleStatusChange(article.id, 'published')}
                            className={styles.actionButton}
                            title="Xuất bản"
                          >
                            ✅
                          </button>
                        )}
                        {article.status === 'published' && (
                          <button
                            onClick={() => handleStatusChange(article.id, 'draft')}
                            className={styles.actionButton}
                            title="Chuyển về nháp"
                          >
                            ✏️
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(article.id)}
                          className={styles.actionButton}
                          title="Xóa"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={styles.paginationButton}
              >
                ← Trước
              </button>
              <span className={styles.paginationInfo}>
                Trang {page} / {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className={styles.paginationButton}
              >
                Sau →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.empty}>
          <p>Không có bài viết nào</p>
          <Link href="/admin/articles/new" className={styles.emptyButton}>
            Tạo bài viết đầu tiên
          </Link>
        </div>
      )}
    </div>
  );
}
