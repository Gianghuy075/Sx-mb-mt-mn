/**
 * Layout Wrapper - Conditionally renders header/footer
 */

'use client';

import { usePathname } from 'next/navigation';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pages that should NOT show header/footer
  // Admin panel and login page have their own layouts
  const isAdminPage = pathname?.startsWith('/admin');
  const isLoginPage = pathname === '/login';
  const shouldSkipLayout = isAdminPage || isLoginPage;

  if (shouldSkipLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
