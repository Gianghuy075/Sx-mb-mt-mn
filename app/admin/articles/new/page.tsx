/**
 * Create New Article Page
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArticleEditor from '@/components/admin/ArticleEditor/ArticleEditor';
import ImageUploadInput from '@/components/admin/ArticleEditor/ImageUploadInput';
import styles from './page.module.css';

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isSaving, setIsSaving] = useState(false);

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
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
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
        const article = await response.json();
        router.push('/admin/articles');
      } else {
        const error = await response.json();
        alert('Lỗi: ' + (error.error || 'Không thể tạo bài viết'));
      }
    } catch (error) {
      alert('Lỗi: Không thể tạo bài viết');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tạo bài viết mới</h1>

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
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className={styles.select}
            >
              <option value="draft">Lưu nháp</option>
              <option value="published">Xuất bản ngay</option>
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
              {isSaving ? 'Đang lưu...' : status === 'published' ? 'Xuất bản' : 'Lưu nháp'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
