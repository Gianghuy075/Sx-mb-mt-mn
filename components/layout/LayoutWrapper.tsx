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
  const isEmbedPage = pathname === '/minh-ngoc';

  if (isEmbedPage) {
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
