/**
 * Phân tích chi tiết (tin tức)
 */

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { formatFullDateVN } from '@/lib/utils/dates';
import ArticleContent from '@/components/ArticleContent';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticleBySlug(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug, status: 'published' },
      select: {
        id: true,
        title: true,
        content: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
        views: true,
        author: {
          select: { name: true, username: true },
        },
      },
    });

    if (article) {
      await prisma.article.update({
        where: { id: article.id },
        data: { views: { increment: 1 } },
      });
    }

    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Bài viết không tồn tại' };
  }

  return {
    title: `${article.title} - Phân tích`,
    description: article.excerpt || article.title,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.breadcrumb}>Trang chủ / Phân tích / {article.title}</p>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.meta}>
            <span>✍️ {article.author?.name || article.author?.username || 'Admin'}</span>
            <span>📅 {article.publishedAt ? formatFullDateVN(article.publishedAt.toISOString().split('T')[0]) : 'N/A'}</span>
            <span>👁️ {article.views} lượt xem</span>
          </div>
          {article.excerpt && <p className={styles.excerpt}>{article.excerpt}</p>}
        </div>
        {article.featuredImage && (
          <div className={styles.heroImage}>
            <img src={article.featuredImage} alt={article.title} />
          </div>
        )}
      </div>

      <article className={styles.article}>
        <ArticleContent content={article.content} className={styles.content} />
      </article>
    </div>
  );
}
