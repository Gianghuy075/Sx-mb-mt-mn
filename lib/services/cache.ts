/**
 * Cache Service Layer
 * Manages lottery data caching in MySQL database
 */

import { prisma } from '@/lib/db/prisma';
import type { Region } from '@/lib/types/lottery';
import type { CacheOptions, CacheEntry, CacheStats } from '@/lib/types/cache';
import { getTodayString } from '@/lib/utils/dates';

export class CacheService {
  /**
   * Get cached data by key
   * Returns null if not found or expired
   */
  async get(key: string, options?: { includeExpired?: boolean }): Promise<CacheEntry | null> {
    // Database disabled - skip caching
    if (!prisma) return null;

    try {
      const entry = await prisma.lotteryCache.findUnique({
        where: { cacheKey: key },
      });

      if (!entry) {
        return null;
      }

      // Check if expired (unless explicitly asking for expired data)
      if (!options?.includeExpired && this.isExpired(entry.expiresAt)) {
        return null;
      }

      return entry as CacheEntry;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Set cached data
   * Upserts entry (creates or updates)
   */
  async set(key: string, data: any, expiresAt: Date): Promise<void> {
    // Database disabled - skip caching
    if (!prisma) return;

    try {
      const parsedKey = this.parseKey(key);

      await prisma.lotteryCache.upsert({
        where: { cacheKey: key },
        create: {
          cacheKey: key,
          region: parsedKey.region,
          dataType: parsedKey.dataType,
          date: parsedKey.date || null,
          data: JSON.stringify(data),
          expiresAt,
        },
        update: {
          data: JSON.stringify(data),
          expiresAt,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Cache set error:', error);
      throw error;
    }
  }

  /**
   * Invalidate cache entries matching pattern
   * Example: invalidate('draws:mb:*')
   */
  async invalidate(pattern: string): Promise<number> {
    // Database disabled - skip caching
    if (!prisma) return 0;

    try {
      // Simple pattern matching (supports * wildcard at end)
      const isWildcard = pattern.endsWith('*');
      const basePattern = isWildcard ? pattern.slice(0, -1) : pattern;

      const result = await prisma.lotteryCache.deleteMany({
        where: isWildcard
          ? { cacheKey: { startsWith: basePattern } }
          : { cacheKey: pattern },
      });

      return result.count;
    } catch (error) {
      console.error('Cache invalidate error:', error);
      return 0;
    }
  }

  /**
   * Remove expired cache entries
   */
  async cleanup(): Promise<number> {
    // Database disabled - skip caching
    if (!prisma) return 0;

    try {
      const result = await prisma.lotteryCache.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      console.log(`Cleaned up ${result.count} expired cache entries`);
      return result.count;
    } catch (error) {
      console.error('Cache cleanup error:', error);
      return 0;
    }
  }

  /**
   * Generate cache key from options
   * Format: {dataType}:{region}:{date?}
   */
  generateKey(options: CacheOptions): string {
    const { dataType, region, date } = options;

    if (date) {
      return `${dataType}:${region.toLowerCase()}:${date}`;
    }

    return `${dataType}:${region.toLowerCase()}`;
  }

  /**
   * Calculate expiration date based on options
   */
  calculateExpiration(options: CacheOptions): Date {
    const { dataType, date, ttlMinutes } = options;

    // Use explicit TTL if provided
    if (ttlMinutes !== undefined) {
      return new Date(Date.now() + ttlMinutes * 60 * 1000);
    }

    // Smart TTL based on data type and date
    const ttl = this.getTTL(dataType, date);

    if (ttl === Infinity) {
      // Never expire (100 years from now)
      return new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000);
    }

    return new Date(Date.now() + ttl * 60 * 1000);
  }

  /**
   * Check if entry is expired
   */
  isExpired(expiresAt: Date): boolean {
    return new Date() > expiresAt;
  }

  /**
   * Get TTL in minutes based on data type and date
   */
  private getTTL(dataType: string, date?: string): number {
    if (dataType === 'draws' && date) {
      const today = getTodayString();
      const daysDiff = this.getDaysDiff(date, today);

      if (date === today) return 360;          // 6 hours for today
      if (daysDiff <= 7) return 360;           // 6 hours for last 7 days
      return Infinity;                         // Never expire for old data
    }

    if (dataType.startsWith('stats/') || dataType.includes('-numbers') || dataType === 'gap') {
      return 360;                              // 6 hours for statistics
    }

    return 360;                                // Default 6 hours
  }

  /**
   * Get days difference between two dates
   */
  private getDaysDiff(date1: string, date2: string): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Parse cache key to extract components
   */
  private parseKey(key: string): { dataType: string; region: string; date?: string } {
    const parts = key.split(':');

    return {
      dataType: parts[0],
      region: parts[1] || 'mb',
      date: parts[2],
    };
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<CacheStats> {
    // Database disabled - return empty stats
    if (!prisma) {
      return {
        totalEntries: 0,
        hitRate: 0,
        missRate: 0,
        totalHits: 0,
        totalMisses: 0,
        averageAge: 0,
        oldestEntry: null,
        newestEntry: null,
      };
    }

    try {
      const [totalEntries, oldestEntry, newestEntry] = await Promise.all([
        prisma.lotteryCache.count(),
        prisma.lotteryCache.findFirst({
          orderBy: { createdAt: 'asc' },
          select: { createdAt: true },
        }),
        prisma.lotteryCache.findFirst({
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true },
        }),
      ]);

      // Calculate average age
      const entries = await prisma.lotteryCache.findMany({
        select: { createdAt: true },
      });

      const now = Date.now();
      const totalAge = entries.reduce((sum: number, entry: { createdAt: Date }) => {
        return sum + (now - entry.createdAt.getTime());
      }, 0);

      const averageAge = entries.length > 0
        ? totalAge / entries.length / (1000 * 60 * 60)  // Convert to hours
        : 0;

      return {
        totalEntries,
        hitRate: 0,      // TODO: Implement hit tracking
        missRate: 0,     // TODO: Implement miss tracking
        totalHits: 0,    // TODO: Implement hit tracking
        totalMisses: 0,  // TODO: Implement miss tracking
        averageAge,
        oldestEntry: oldestEntry?.createdAt || null,
        newestEntry: newestEntry?.createdAt || null,
      };
    } catch (error) {
      console.error('Cache stats error:', error);
      return {
        totalEntries: 0,
        hitRate: 0,
        missRate: 0,
        totalHits: 0,
        totalMisses: 0,
        averageAge: 0,
        oldestEntry: null,
        newestEntry: null,
      };
    }
  }
}

// Export singleton instance
export const cacheService = new CacheService();
