import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});
const moontime = localFont({
  src: './fonts/MoonTime-Regular.ttf',
  variable: '--font-moontime',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Natalia Pérez Aguja - Brand Manager & Marketing Strategist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/n-logo-2.png" type="image/png" />
      </head>
      <body className={`${playfair.variable} ${moontime.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
