/**
 * Article Detail Page (Public)
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
      where: {
        slug,
        status: 'published',
      },
      select: {
        id: true,
        title: true,
        content: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
        views: true,
        author: {
          select: {
            name: true,
            username: true,
          },
        },
      },
    });

    // Increment views
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
    return {
      title: 'Bài viết không tồn tại',
    };
  }

  return {
    title: `${article.title} - Tin tức`,
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
      <article className={styles.article}>
        {article.featuredImage && (
          <div className={styles.featuredImage}>
            <img src={article.featuredImage} alt={article.title} />
          </div>
        )}

        <header className={styles.articleHeader}>
          <h1 className={styles.title}>{article.title}</h1>

          <div className={styles.meta}>
            <span className={styles.author}>
              ✍️ {article.author?.name || article.author?.username || 'Admin'}
            </span>
            <span className={styles.date}>
              📅{' '}
              {article.publishedAt
                ? formatFullDateVN(article.publishedAt.toISOString().split('T')[0])
                : 'N/A'}
            </span>
            <span className={styles.views}>👁️ {article.views} lượt xem</span>
          </div>

          {article.excerpt && <p className={styles.excerpt}>{article.excerpt}</p>}
        </header>

        <ArticleContent content={article.content} className={styles.content} />
      </article>
    </div>
  );
}
