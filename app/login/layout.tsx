/**
 * Login Page Layout
 * Standalone layout without main site header/footer
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập Admin - Xổ Số',
  description: 'Đăng nhập vào hệ thống quản trị',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
