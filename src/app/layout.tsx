import type { Metadata } from 'next';
import { Inter, Cinzel_Decorative, Oooh_Baby } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel',
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
      <body className={`${inter.variable} ${cinzel.variable} ${ooohBaby.variable} ${inter.className}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
