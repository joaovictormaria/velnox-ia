import React from 'react';
import Navbar from '@/components/velnox/Navbar';
import Hero from '@/components/velnox/Hero';
import Services from '@/components/velnox/Services';
import Pricing from '@/components/velnox/Pricing';
import About from '@/components/velnox/About';
// import Portfolio from '@/components/velnox/Portfolio'; // oculto por enquanto
import FAQ from '@/components/velnox/FAQ';
import Contact from '@/components/velnox/Contact';
import Footer from '@/components/velnox/Footer';
import data from '@/data/static-data.json';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <h1 className="sr-only">{data.brand.name}{data.brand.suffix} — {data.brand.tagline}</h1>
      <main>
        <Hero />
        <Services />
        <Pricing />
        <About />
        {/* <Portfolio /> oculto por enquanto */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
