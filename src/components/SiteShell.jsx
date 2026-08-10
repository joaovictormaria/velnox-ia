import React from 'react';
import Navbar from '@/components/velnox/Navbar';
import Footer from '@/components/velnox/Footer';

/** @param {{ children: React.ReactNode, locale: string }} props */
export default function SiteShell({ children, locale }) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar locale={locale} />
      <main className="pt-16">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
