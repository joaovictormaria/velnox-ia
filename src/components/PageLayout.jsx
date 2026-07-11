import React from 'react';
import Navbar from '@/components/velnox/Navbar';
import Footer from '@/components/velnox/Footer';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
