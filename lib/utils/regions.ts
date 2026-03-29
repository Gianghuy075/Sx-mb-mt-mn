/**
 * Region utility functions
 */

import type { Region } from '@/lib/types/lottery';

/**
 * Validate if string is a valid region
 */
export function isValidRegion(region: string): region is Region {
  return ['mb', 'mt', 'mn'].includes(region);
}

/**
 * Get full Vietnamese name for region
 */
export function getRegionName(region: Region): string {
  const names: Record<Region, string> = {
    mb: 'Miền Bắc',
    mt: 'Miền Trung',
    mn: 'Miền Nam',
  };
  return names[region];
}

/**
 * Get region display info
 */
export function getRegionInfo(region: Region) {
  const info = {
    mb: {
      name: 'Miền Bắc',
      shortName: 'MB',
      fullName: 'Xổ Số Miền Bắc',
      description: 'Kết quả quay số hàng ngày tại Hà Nội',
    },
    mt: {
      name: 'Miền Trung',
      shortName: 'MT',
      fullName: 'Xổ Số Miền Trung',
      description: 'Lịch quay theo ngày trong tuần, nhiều tỉnh thành',
    },
    mn: {
      name: 'Miền Nam',
      shortName: 'MN',
      fullName: 'Xổ Số Miền Nam',
      description: 'Lịch quay theo ngày trong tuần, nhiều tỉnh thành',
    },
  };

  return info[region];
}

/**
 * Get all regions
 */
export function getAllRegions(): Region[] {
  return ['mb', 'mt', 'mn'];
}
