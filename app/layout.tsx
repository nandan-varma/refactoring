import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import { APP_METADATA } from '@/lib/constants';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_METADATA.TITLE,
  description: APP_METADATA.DESCRIPTION,
  keywords: APP_METADATA.KEYWORDS,
  openGraph: {
    title: APP_METADATA.TITLE,
    description: APP_METADATA.SHORT_DESCRIPTION,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_METADATA.TITLE,
    description: APP_METADATA.SHORT_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased')}>
        {children}
      </body>
    </html>
  );
}
