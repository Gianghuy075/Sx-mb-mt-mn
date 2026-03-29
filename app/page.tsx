/**
 * Home Page
 * Redirects to /mb/today
 */

import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/mb/today');
}
