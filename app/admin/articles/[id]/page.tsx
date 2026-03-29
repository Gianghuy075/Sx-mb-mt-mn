/**
 * Edit Article Page
 */

'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import ArticleEditor from '@/components/admin/ArticleEditor/ArticleEditor';
import ImageUploadInput from '@/components/admin/ArticleEditor/ImageUploadInput';
import type { Article } from '@/lib/types/article';
import styles from '../new/page.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditArticlePage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/admin/articles/${id}`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
        setTitle(data.title);
        setContent(JSON.parse(data.content));
        setExcerpt(data.excerpt || '');
        setFeaturedImage(data.featuredImage || '');
        setStatus(data.status);
      } else {
        alert('Không tìm thấy bài viết');
        router.push('/admin/articles');
      }
    } catch (error) {
      alert('Lỗi khi tải bài viết');
      router.push('/admin/articles');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề');
      return;
    }

    if (!content) {
      alert('Vui lòng nhập nội dung');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content: JSON.stringify(content),
          excerpt: excerpt || undefined,
          featuredImage: featuredImage || undefined,
          status,
        }),
      });

      if (response.ok) {
        router.push('/admin/articles');
      } else {
        const error = await response.json();
        alert('Lỗi: ' + (error.error || 'Không thể cập nhật bài viết'));
      }
    } catch (error) {
      alert('Lỗi: Không thể cập nhật bài viết');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/articles');
      } else {
        alert('Xóa thất bại');
      }
    } catch (error) {
      alert('Xóa thất bại');
    }
  };

  if (loading) {
    return <div className={styles.container}>Đang tải...</div>;
  }

  if (!article) {
    return <div className={styles.container}>Không tìm thấy bài viết</div>;
  }

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h1 className={styles.title}>Chỉnh sửa bài viết</h1>
        <button onClick={handleDelete} className={styles.cancelButton} style={{ background: '#dc2626', color: 'white' }}>
          🗑️ Xóa bài viết
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Tiêu đề <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
            placeholder="Nhập tiêu đề bài viết"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="excerpt" className={styles.label}>
            Mô tả ngắn
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className={styles.textarea}
            rows={3}
            placeholder="Mô tả ngắn về bài viết (tùy chọn)"
          />
        </div>

        <ImageUploadInput
          label="Ảnh đại diện"
          value={featuredImage}
          onChange={setFeaturedImage}
        />

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Nội dung <span className={styles.required}>*</span>
          </label>
          <ArticleEditor content={content} onChange={setContent} />
        </div>

        <div className={styles.formActions}>
          <div className={styles.statusGroup}>
            <label className={styles.label}>Trạng thái</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className={styles.select}
            >
              <option value="draft">Nháp</option>
              <option value="published">Đã xuất bản</option>
              <option value="archived">Đã xóa</option>
            </select>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelButton}
              disabled={isSaving}
            >
              Hủy
            </button>
            <button type="submit" className={styles.submitButton} disabled={isSaving}>
              {isSaving ? 'Đang lưu...' : 'Cập nhật'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
