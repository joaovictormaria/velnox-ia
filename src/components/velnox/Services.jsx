import React from 'react';
import Link from 'next/link';
import { Code, Rocket, Layout, Search, Server, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { getContent, withLocale } from '@/lib/content';

const icons = { Code, Rocket, Layout, Search, Server, Cpu };

function ServiceCard({ service, locale, ui }) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={withLocale(locale, `/servicos/${service.slug}`)}
      className="group flex flex-col shrink-0 w-72 sm:w-80 md:w-auto bg-card/50 backdrop-blur-xl border border-border p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-neon-cyan/40 hover:shadow-[0_0_25px_rgba(0,255,255,0.08),0_0_50px_rgba(255,0,255,0.05)]"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
        <Icon className="w-6 h-6 text-neon-cyan" />
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">{service.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-1">{service.description}</p>
      {service.details?.differentiators?.[0] && (
        <div className="flex items-start gap-2 mb-4 pt-4 border-t border-border/60">
          <CheckCircle2 className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
          <span className="text-xs text-muted-foreground">{service.details.differentiators[0]}</span>
        </div>
      )}
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neon-cyan">
        {ui.readMoreLabel} <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default function Services({ headingLevel = 'h2', locale }) {
  const { services, ui } = getContent(locale);
  const Heading = headingLevel;
  const loopItems = [...services.items, ...services.items];

  return (
    <section id="servicos" className="relative py-16 md:py-24 scroll-mt-20 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4">
            {services.headingPrefix} {headingLevel === 'h1' ? (
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{services.headingHighlight}</span>
            ) : (
              <span className="text-neon-cyan">{services.headingHighlight}</span>
            )}
          </Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">{services.subtitle}</p>
        </div>

        <div className="md:hidden group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max gap-4 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {loopItems.map((service, index) => (
              <ServiceCard key={index} service={service} locale={locale} ui={ui} />
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((service) => (
            <ServiceCard key={service.title} service={service} locale={locale} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  );
}
