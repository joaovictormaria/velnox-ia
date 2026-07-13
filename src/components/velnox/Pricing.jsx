import React from 'react';
import Link from 'next/link';
import { Check, Server, Plug } from 'lucide-react';
import data from '@/data/static-data.json';

const icons = { Server, Plug };
const { pricing } = data;

/** @param {{ headingLevel?: 'h1' | 'h2' }} props */
export default function Pricing({ headingLevel = 'h2' }) {
  const Heading = headingLevel;

  return (
    <section id="planos" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4">{pricing.headingPrefix} <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{pricing.headingHighlight}</span></Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">{pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricing.plans.map((plan) => (
            <div key={plan.name} className={`relative p-6 rounded-2xl transition-all border ${plan.highlighted ? 'bg-card/60 backdrop-blur-xl border-neon-magenta/40 shadow-[0_0_40px_rgba(0,255,255,0.06),0_0_80px_rgba(255,0,255,0.04)]' : 'bg-card/50 backdrop-blur-xl border-border'}`}>
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta text-background text-xs font-semibold">
                  Mais Popular
                </div>
              )}
              <h3 className="font-mono text-sm text-muted-foreground mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
              <div className="font-display text-3xl font-bold mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/orcamento?plano=${encodeURIComponent(plan.name)}`} className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-all ${plan.highlighted ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-background hover:shadow-[0_0_25px_rgba(0,255,255,0.35)]' : 'border border-border text-foreground hover:border-neon-cyan/50'}`}>
                Escolher
              </Link>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pricing.addons.map((addon) => {
            const Icon = icons[addon.icon];
            return (
              <div key={addon.name} className="bg-card/50 backdrop-blur-xl border border-border p-6 rounded-2xl flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-neon-magenta" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-lg font-semibold">{addon.name}</h3>
                    <span className="font-mono text-sm text-neon-cyan">{addon.price}</span>
                  </div>
                  <ul className="grid grid-cols-2 gap-2 mt-3">
                    {addon.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="w-3 h-3 text-neon-cyan" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
