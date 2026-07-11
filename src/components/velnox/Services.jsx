import React from 'react';
import { Code, Rocket, Layout, Search, Server, Cpu } from 'lucide-react';
import data from '@/data/static-data.json';

const icons = { Code, Rocket, Layout, Search, Server, Cpu };
const { services } = data;

export default function Services() {
  return (
    <section id="servicos" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{services.headingPrefix} <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{services.headingHighlight}</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{services.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((service) => {
            const Icon = icons[service.icon];
            return (
              <div key={service.title} className="bg-card/50 backdrop-blur-xl border border-border p-6 rounded-2xl hover:border-neon-cyan/40 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center mb-4 group-hover:from-neon-cyan/30 group-hover:to-neon-magenta/30 transition-all">
                  <Icon className="w-6 h-6 text-neon-cyan" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
