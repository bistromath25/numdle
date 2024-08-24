import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
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
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        ></meta>
      </Head>
      <html lang='en'>
        <body className={inter.className}>
          <StoreProvider>{children}</StoreProvider>
        </body>
      </html>
    </>
  );
}
