import React from 'react';
import { Sidebar } from './Sidebar';
import { PageType } from '../../types';

interface LayoutProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
  children: React.ReactNode;
}

export function Layout({ activePage, onNavigate, children }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#080b12] text-slate-100 font-sans tracking-wide">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="flex-1 overflow-y-auto bg-transparent">
        <div className="container mx-auto p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
