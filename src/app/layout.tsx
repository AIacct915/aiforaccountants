import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI for Accountants – AI Tools Directory',
  description: 'Discover the best AI tools for accounting, tax, and finance professionals. Curated, searchable, and always up-to-date.',
  openGraph: {
    title: 'AI for Accountants – AI Tools Directory',
    description: 'Discover the best AI tools for accounting, tax, and finance professionals.',
    url: 'https://aiforaccountants.vercel.app',
    siteName: 'AI for Accountants',
    images: [
  {
    url: '/og-image.png', // ← updated here
    width: 1200,
    height: 630,
    alt: 'AI for Accountants Preview',
  },
],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
