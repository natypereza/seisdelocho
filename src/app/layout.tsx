import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Natalia Pérez Aguja - Brand Manager & Marketing Strategist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
