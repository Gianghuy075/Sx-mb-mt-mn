/**
 * Breadcrumb Component
 */

import Link from 'next/link';
import type { Region } from '@/lib/types/lottery';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  region?: Region;
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ region, items }: BreadcrumbProps) {
  const regionNames: Record<Region, string> = {
    mb: 'Xổ số miền Bắc',
    mt: 'Xổ số miền Trung',
    mn: 'Xổ số miền Nam',
  };

  // Use items if provided, otherwise use region
  if (items && items.length > 0) {
    return (
      <div className="breadcrumb">
        {items.map((item, idx) => (
          <span key={idx}>
            {item.href && !item.active ? (
              <>
                <Link href={item.href}>{item.label}</Link>
                {idx < items.length - 1 && ' / '}
              </>
            ) : (
              <>
                <span>{item.label}</span>
                {idx < items.length - 1 && ' / '}
              </>
            )}
          </span>
        ))}
      </div>
    );
  }

  // Fallback to region-based breadcrumb

  return null;
}
