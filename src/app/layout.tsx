import type { Metadata } from 'next';
import { Inter, Oswald, Oooh_Baby } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
});
const ooohBaby = Oooh_Baby({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-oooh',
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${oswald.variable} ${ooohBaby.variable} ${inter.className}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
