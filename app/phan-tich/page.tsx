/**
 * Phân tích - UI gốc (header gradient + info) nhưng dữ liệu lấy từ API bài viết
 */

import { prisma } from '@/lib/db/prisma';
import { formatFullDateVN } from '@/lib/utils/dates';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import AnalysisList from '@/components/lottery/Analysis/AnalysisList';
import type { AnalysisItem } from '@/lib/data/analysis-demo';
import styles from './analysis.module.css';

function detectRegion(text: string): 'MB' | 'MN' | 'MT' | 'ALL' {
  const t = text.toLowerCase();
  if (t.includes('miền bắc') || t.includes('xsm b') || t.includes('xsmb') || t.includes(' mb ')) return 'MB';
  if (t.includes('miền nam') || t.includes('xsm n') || t.includes('xsmn') || t.includes(' mn ')) return 'MN';
  if (t.includes('miền trung') || t.includes('xsm t') || t.includes('xsmt') || t.includes(' mt ')) return 'MT';
  return 'ALL';
}

function detectType(text: string): 'trend' | 'hot-cold' | 'frequency' | 'cycle' | 'analysis' {
  const t = text.toLowerCase();
  if (t.includes('xu hướng') || t.includes('trend')) return 'trend';
  if (t.includes('nóng') || t.includes('lạnh') || t.includes('hot') || t.includes('cold')) return 'hot-cold';
  if (t.includes('tần suất') || t.includes('frequency')) return 'frequency';
  if (t.includes('chu kỳ') || t.includes('cycle')) return 'cycle';
  return 'analysis';
}

export const metadata = {
  title: 'Phân tích xổ số - Xu hướng, số nóng, tần suất',
  description: 'Phân tích xổ số chi tiết, xu hướng, số nóng lạnh, tần suất, chu kỳ lô tô.',
};

async function getPublishedArticles() {
  try {
    return await prisma.article.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
      take: 24,
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
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function AnalysisPage() {
  const articles = await getPublishedArticles();
  const analysisItems: AnalysisItem[] = articles.map((article) => ({
    id: article.id,
    slug: article.slug,
    date: article.publishedAt
      ? `Cập nhật ${formatFullDateVN(article.publishedAt.toISOString().split('T')[0])}`
      : 'Chưa xuất bản',
    region: ((article.region as any) || detectRegion(`${article.title} ${article.excerpt ?? ''}`)).toUpperCase() as any,
    regionName: 'Toàn quốc',
    title: article.title,
    description: article.excerpt || 'Xem chi tiết bài phân tích.',
    type: (article.type as any) || detectType(`${article.title} ${article.excerpt ?? ''}`),
    typeLabel: 'Phân tích',
    metrics: `👁️ ${article.views} lượt xem`,
  }));

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <div className={styles.articlesSection}>
            <div className={styles.articlesHeader}>
              <h2 className={styles.articlesTitle}>Bài viết mới nhất</h2>
              <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                {articles.length} bài đã xuất bản
              </span>
            </div>

            {articles.length === 0 ? (
              <div className={styles.empty}>Chưa có bài viết nào được xuất bản.</div>
            ) : (
              <AnalysisList items={analysisItems} />
            )}
          </div>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}
