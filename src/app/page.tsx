'use client';

import List from './components/List';
import Header from './components/Header';
import { Roboto_Slab } from 'next/font/google';

const robotoSlab = Roboto_Slab({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center space-y-8 ${robotoSlab.className}`}
    >
      <Header />
      <List />
    </main>
  );
}
