/**
 * Public News/Articles Page
 * Shows published articles without requiring authentication
 */

import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { formatFullDateVN } from '@/lib/utils/dates';
import styles from './page.module.css';

export const metadata = {
  title: 'Tin tức - Phân tích xổ số',
  description: 'Tin tức và phân tích xổ số mới nhất',
};

async function getPublishedArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'published',
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 20,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
        views: true,
      },
    });
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function NewsPage() {
  const articles = await getPublishedArticles();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>📰 Tin tức & Phân tích</h1>
        <p className={styles.subtitle}>Tin tức và phân tích xổ số mới nhất</p>
      </div>

      {articles.length === 0 ? (
        <div className={styles.empty}>
          <p>Chưa có bài viết nào được xuất bản.</p>
        </div>
      ) : (
        <div className={styles.articleGrid}>
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/tin-tuc/${article.slug}`}
              className={styles.articleCard}
            >
              {article.featuredImage && (
                <div className={styles.imageWrapper}>
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className={styles.articleImage}
                  />
                </div>
              )}
              <div className={styles.articleContent}>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                {article.excerpt && (
                  <p className={styles.articleExcerpt}>{article.excerpt}</p>
                )}
                <div className={styles.articleMeta}>
                  <span className={styles.date}>
                    📅 {article.publishedAt ? formatFullDateVN(article.publishedAt.toISOString().split('T')[0]) : 'N/A'}
                  </span>
                  <span className={styles.views}>👁️ {article.views} lượt xem</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
