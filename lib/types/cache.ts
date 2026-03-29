/**
 * Cache type definitions
 */

import type { Region } from './lottery';

export interface CacheEntry {
  id: string;
  cacheKey: string;
  region: string;
  dataType: string;
  date: string | null;
  data: string;  // JSON string
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CacheOptions {
  region: Region;
  dataType: string;
  date?: string;
  ttlMinutes?: number;
}

export interface CacheStats {
  totalEntries: number;
  hitRate: number;
  missRate: number;
  totalHits: number;
  totalMisses: number;
  averageAge: number;  // in hours
  oldestEntry: Date | null;
  newestEntry: Date | null;
}

export interface CacheResult<T> {
  data: T | null;
  fromCache: boolean;
  expiresAt?: Date;
}
