'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-light mb-4">404</h1>
        <p className="text-xl text-neutral-600 mb-8">Page not found</p>
        <Link href="/" className="text-neutral-900 hover:underline">
          Go back home
        </Link>
      </div>
    </main>
  );
}
