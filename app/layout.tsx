/**
 * Root Layout
 * Applies to all pages
 */

import type { Metadata } from 'next';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Xổ Số Miền Bắc – Miền Trung – Miền Nam',
  description: 'Website tra cứu kết quả xổ số ba miền (Miền Bắc, Miền Trung, Miền Nam) của Việt Nam',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
