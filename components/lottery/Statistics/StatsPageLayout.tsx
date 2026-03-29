/**
 * Statistics Page Layout (Client Component)
 * Handles styling for statistics pages
 */

'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface StatsPageLayoutProps {
  children: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  headerTitle: string;
  headerSubtitle: string;
  headerColor: string; // e.g., '#2196F3', '#ff4444', '#4CAF50'
}

export default function StatsPageLayout({
  children,
  breadcrumbs = [],
  headerTitle,
  headerSubtitle,
  headerColor,
}: StatsPageLayoutProps) {
  return (
    <>
      {breadcrumbs.length > 0 && (
        <div className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span> › </span>}
            </span>
          ))}
        </div>
      )}

      <div className="page-header" style={{ background: `linear-gradient(135deg, ${headerColor} 0%, ${adjustColor(headerColor, 20)} 100%)` }}>
        <h1>{headerTitle}</h1>
        <p>{headerSubtitle}</p>
      </div>

      {children}

      <style jsx>{`
        .breadcrumb {
          padding: 12px 20px;
          background: #f5f5f5;
          font-size: 14px;
          color: #666;
        }

        .breadcrumb :global(a) {
          color: #2196F3;
          text-decoration: none;
        }

        .breadcrumb :global(a):hover {
          text-decoration: underline;
        }

        .page-header {
          color: white;
          padding: 32px;
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .page-header h1 {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .page-header p {
          font-size: 16px;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .page-header {
            padding: 20px;
          }

          .page-header h1 {
            font-size: 24px;
          }

          .page-header p {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

// Helper function to adjust color brightness
function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1);
}
