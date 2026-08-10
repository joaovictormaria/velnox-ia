import React from 'react';
import dynamic from 'next/dynamic';
import LightningStorm from '@/components/velnox/LightningStorm';
import Navbar from '@/components/velnox/Navbar';
import Hero from '@/components/velnox/Hero';
import Services from '@/components/velnox/Services';
import Pricing from '@/components/velnox/Pricing';
import About from '@/components/velnox/About';
import Portfolio from '@/components/velnox/Portfolio';
import Feedbacks from '@/components/velnox/Feedbacks';
import FAQ from '@/components/velnox/FAQ';
import Footer from '@/components/velnox/Footer';
import { getContent } from '@/lib/content';

const Contact = dynamic(() => import('@/components/velnox/Contact'));

export default async function Home({ params }) {
  const { locale } = await params;
  const data = getContent(locale);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <LightningStorm />
      <Navbar locale={locale} />
      <h1 className="sr-only">{data.brand.name}{data.brand.suffix} — {data.brand.tagline}</h1>
      <main>
        <Hero locale={locale} />
        <About locale={locale} />
        <Portfolio locale={locale} />
        <Services locale={locale} />
        <Pricing locale={locale} />
        <Feedbacks locale={locale} />
        <FAQ locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
