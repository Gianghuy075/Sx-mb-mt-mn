/**
 * Phân tích chi tiết (tin tức)
 */

import { notFound } from 'next/navigation';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db/mongodb';
import { formatFullDateVN } from '@/lib/utils/dates';
import ArticleContent from '@/components/ArticleContent';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticleBySlug(slug: string) {
  try {
    const db = await getDb();
    const doc = await db.collection('articles').findOne(
      { slug, status: 'published' },
      { projection: { _id: 1, title: 1, content: 1, excerpt: 1, featured_image: 1, published_at: 1, views: 1, author_id: 1 } }
    );

    if (!doc) return null;

    // Increment views
    await db.collection('articles').updateOne(
      { _id: doc._id },
      { $inc: { views: 1 } }
    );

    // Get author
    const author = await db.collection('users').findOne(
      { _id: doc.author_id },
      { projection: { name: 1, username: 1 } }
    );

    return {
      id: (doc._id as ObjectId).toString(),
      title: doc.title as string,
      content: doc.content as string,
      excerpt: (doc.excerpt ?? null) as string | null,
      featuredImage: (doc.featured_image ?? null) as string | null,
      publishedAt: doc.published_at ? new Date(doc.published_at) : null,
      views: (doc.views ?? 0) as number,
      author: author
        ? { name: (author.name ?? null) as string | null, username: author.username as string }
        : null,
    };
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
