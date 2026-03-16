import { FunnelIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import Header from 'components/layout/Header';
import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function AppLayout({ title, children }: Props) {
  return (
    <div className="h-dvh">
      <Header />

      <main className="mx-auto max-w-7xl sm:px-6 px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        </div>

        <section className="pt-6 pb-24">{children}</section>
      </main>
    </div>
  );
}
