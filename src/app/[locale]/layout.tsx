import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import '../globals.css';

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  metadataBase: new URL('https://seisdelocho.com'),
  title: 'Natalia Pérez Aguja - Brand Manager & Marketing Strategist',
  description: 'Marketing professional with expertise in brand management, digital strategy, and creative design.',
  openGraph: {
    title: 'Natalia Pérez Aguja - Brand Manager & Marketing Strategist',
    description: 'Marketing professional with expertise in brand management, digital strategy, and creative design.',
    url: 'https://seisdelocho.com',
    siteName: 'Natalia Pérez Aguja',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Natalia Pérez Aguja - Brand Manager & Marketing Strategist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Natalia Pérez Aguja - Brand Manager & Marketing Strategist',
    description: 'Marketing professional with expertise in brand management, digital strategy, and creative design.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    languages: {
      en: 'https://seisdelocho.com/en',
      es: 'https://seisdelocho.com/es',
      nl: 'https://seisdelocho.com/nl',
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
