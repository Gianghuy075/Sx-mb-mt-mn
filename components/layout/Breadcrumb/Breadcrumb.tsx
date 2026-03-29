/**
 * Breadcrumb Component
 */

import type { Region } from '@/lib/types/lottery';

interface BreadcrumbProps {
  region: Region;
}

export default function Breadcrumb({ region }: BreadcrumbProps) {
  const regionNames: Record<Region, string> = {
    mb: 'Xổ số miền Bắc',
    mt: 'Xổ số miền Trung',
    mn: 'Xổ số miền Nam',
  };

  return (
    <div className="breadcrumb">
      <span>Trang chủ</span> / <span>{regionNames[region]}</span>
    </div>
  );
}
