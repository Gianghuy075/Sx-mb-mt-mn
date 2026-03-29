/**
 * Zod validation schemas for Article operations
 */

import { z } from 'zod';

export const articleStatusEnum = z.enum(['draft', 'published', 'archived']);

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(1, 'Tiêu đề không được để trống')
    .max(500, 'Tiêu đề không được quá 500 ký tự'),
  content: z.string().min(1, 'Nội dung không được để trống'),
  excerpt: z.string().max(1000, 'Mô tả không được quá 1000 ký tự').optional(),
  featuredImage: z.string().url('URL ảnh không hợp lệ').optional().or(z.literal('')),
  status: articleStatusEnum.optional().default('draft'),
});

export const updateArticleSchema = z.object({
  title: z
    .string()
    .min(1, 'Tiêu đề không được để trống')
    .max(500, 'Tiêu đề không được quá 500 ký tự')
    .optional(),
  content: z.string().min(1, 'Nội dung không được để trống').optional(),
  excerpt: z.string().max(1000, 'Mô tả không được quá 1000 ký tự').optional(),
  featuredImage: z.string().url('URL ảnh không hợp lệ').optional().or(z.literal('')),
  status: articleStatusEnum.optional(),
});

export const articleListFiltersSchema = z.object({
  status: articleStatusEnum.optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type ArticleListFiltersInput = z.infer<typeof articleListFiltersSchema>;
