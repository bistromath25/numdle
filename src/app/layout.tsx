import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PublicEnvScript } from 'next-runtime-env';
import StoreProvider from './store/StoreProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Numdle',
  description: 'Wordle-inspired number ordering game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <PublicEnvScript />
      </head>
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
