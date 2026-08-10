import React from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { getContent, withLocale } from '@/lib/content';

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default function FAQ({ headingLevel = 'h2', locale }) {
  const { faq, nav } = getContent(locale);
  const Heading = headingLevel;

  return (
    <section id="faq" className="relative py-16 md:py-24 scroll-mt-20 border-y border-border/60">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4">
            {faq.headingPrefix} {headingLevel === 'h1' ? (
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{faq.headingHighlight}</span>
            ) : (
              <span className="text-neon-cyan">{faq.headingHighlight}</span>
            )}
          </Heading>
          <p className="text-muted-foreground">{faq.subtitle}</p>
        </div>
        <div className="space-y-3">
          {faq.items.map((item, index) => (
            <details
              key={index}
              name="faq"
              id={`faq-${index}`}
              className="group bg-card/50 backdrop-blur-xl border border-border rounded-xl overflow-hidden scroll-mt-24 open:border-neon-cyan/50 open:shadow-[0_0_20px_rgba(0,255,255,0.12)] transition-colors"
            >
              <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-card/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/60">
                <span className="font-medium text-foreground pr-4">{item.q}</span>
                <ChevronDown className="w-5 h-5 text-neon-cyan transition-transform shrink-0 group-open:rotate-180" />
              </summary>
              <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</div>
                </div>
              </div>
            </details>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href={withLocale(locale, '/contato')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all"
          >
            <MessageCircle className="w-4 h-4" /> {nav.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
