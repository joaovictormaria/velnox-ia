import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import data from '@/data/static-data.json';

const { faq } = data;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="relative py-24 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{faq.headingPrefix} <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{faq.headingHighlight}</span></h2>
          <p className="text-muted-foreground">{faq.subtitle}</p>
        </div>
        <div className="space-y-3">
          {faq.items.map((item, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-xl border border-border rounded-xl overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-medium text-foreground pr-4">{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-neon-cyan transition-transform shrink-0 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
