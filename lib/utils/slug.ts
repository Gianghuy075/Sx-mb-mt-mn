/**
 * Slug generation utilities
 */

import slugify from 'slugify';
import { prisma } from '@/lib/db/prisma';

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: 'vi',
    remove: /[*+~.()'"!:@]/g,
  });
}

/**
 * Ensure slug is unique by appending number if needed
 */
export async function generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
  let slug = generateSlug(title);
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const existing = await prisma.article.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || (excludeId && existing.id === excludeId)) {
      isUnique = true;
    } else {
      slug = `${generateSlug(title)}-${counter}`;
      counter++;
    }
  }

  return slug;
}
