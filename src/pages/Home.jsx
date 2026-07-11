import React from 'react';
import Navbar from '@/components/velnox/Navbar';
import Hero from '@/components/velnox/Hero';
import Services from '@/components/velnox/Services';
import Pricing from '@/components/velnox/Pricing';
import About from '@/components/velnox/About';
import FAQ from '@/components/velnox/FAQ';
import Contact from '@/components/velnox/Contact';
import Footer from '@/components/velnox/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
