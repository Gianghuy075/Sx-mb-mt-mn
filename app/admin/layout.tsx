/**
 * Admin Layout
 * Wraps all admin pages with sidebar and header
 */

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authConfig } from '@/lib/auth/auth';
import AdminSidebar from '@/components/admin/Dashboard/AdminSidebar';
import AdminHeader from '@/components/admin/Dashboard/AdminHeader';
import styles from './layout.module.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <div className={styles.mainArea}>
        <AdminHeader user={session.user} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
