/**
 * Statistics Page: /thong-ke
 * Redirects to gap numbers page (main statistics feature)
 */

import { redirect } from 'next/navigation';

export default function StatisticsPage() {
  // Redirect to gap numbers as default statistics page
  redirect('/thong-ke/so-gan');
}
