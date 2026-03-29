/**
 * TypeScript types for Article system
 */

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  authorId: string;
  status: ArticleStatus;
  publishedAt: Date | null;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: string;
    username: string;
    name: string | null;
    email: string;
  };
}

export interface CreateArticleDto {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status?: ArticleStatus;
}

export interface UpdateArticleDto {
  title?: string;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  status?: ArticleStatus;
}

export interface ArticleListFilters {
  status?: ArticleStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ArticleListResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
