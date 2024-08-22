import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        ></meta>
      </head>
      <html lang='en'>
        <body className={inter.className}>
          <StoreProvider>{children}</StoreProvider>
        </body>
      </html>
    </>
  );
}
