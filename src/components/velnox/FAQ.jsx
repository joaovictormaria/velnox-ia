import React from 'react';
import { ChevronDown } from 'lucide-react';
import data from '@/data/static-data.json';

const { faq } = data;

/** @param {{ headingLevel?: 'h1' | 'h2' }} props */
export default function FAQ({ headingLevel = 'h2' }) {
  const Heading = headingLevel;

  return (
    <section id="faq" className="relative py-24 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4">{faq.headingPrefix} <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{faq.headingHighlight}</span></Heading>
          <p className="text-muted-foreground">{faq.subtitle}</p>
        </div>
        <div className="space-y-3">
          {faq.items.map((item, index) => (
            <details key={index} className="group bg-card/50 backdrop-blur-xl border border-border rounded-xl overflow-hidden">
              <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-foreground pr-4">{item.q}</span>
                <ChevronDown className="w-5 h-5 text-neon-cyan transition-transform shrink-0 group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
