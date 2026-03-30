/**
 * Slug generation utilities
 */

import slugify from 'slugify';
import { getDb } from '@/lib/db/mongodb';

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
  const db = await getDb();
  let slug = generateSlug(title);
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const existing = await db.collection('articles').findOne(
      { slug },
      { projection: { _id: 1 } }
    );

    if (!existing || (excludeId && existing._id.toString() === excludeId)) {
      isUnique = true;
    } else {
      slug = `${generateSlug(title)}-${counter}`;
      counter++;
    }
  }

  return slug;
}
