import React from 'react';
import Link from 'next/link';
import { Check, Server, Plug, ArrowRight } from 'lucide-react';
import { getContent, withLocale } from '@/lib/content';

const icons = { Server, Plug };

function PlanCard({ plan, related, locale, ui }) {
  return (
    <div className={`relative shrink-0 w-72 sm:w-80 md:w-auto p-6 rounded-2xl transition-all border ${plan.highlighted ? 'bg-card/60 backdrop-blur-xl border-neon-magenta/40 shadow-[0_0_40px_rgba(0,255,255,0.06),0_0_80px_rgba(255,0,255,0.04)]' : 'bg-card/50 backdrop-blur-xl border-border'}`}>
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta text-background text-xs font-semibold">
          {ui.mostPopularLabel}
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
      <Link href={withLocale(locale, `/orcamento?plano=${encodeURIComponent(plan.name)}`)} className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-all ${plan.highlighted ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-background hover:shadow-[0_0_25px_rgba(0,255,255,0.35)]' : 'border border-border text-foreground hover:border-neon-cyan/50'}`}>
        {ui.chooseLabel}
      </Link>
      {related && (
        <Link href={withLocale(locale, `/servicos/${related.slug}`)} className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-neon-cyan transition-colors">
          {ui.aboutPrefix}{related.title} <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
}

function AddonCard({ addon, related, locale, ui }) {
  const Icon = icons[addon.icon];
  return (
    <div className="shrink-0 w-80 sm:w-96 md:w-auto bg-card/50 backdrop-blur-xl border border-border p-6 rounded-2xl flex gap-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-neon-magenta" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-lg font-semibold">{addon.name}</h3>
          <span className="font-mono text-sm text-neon-cyan">{addon.price}</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          {addon.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="w-3 h-3 text-neon-cyan" /> {f}
            </li>
          ))}
        </ul>
        {related && (
          <Link href={withLocale(locale, `/servicos/${related.slug}`)} className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-neon-cyan transition-colors">
            {ui.aboutPrefix}{related.title} <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default function Pricing({ headingLevel = 'h2', locale }) {
  const { pricing, services, ui } = getContent(locale);
  const Heading = headingLevel;

  /** @param {{ planName?: string, addonName?: string }} args */
  function relatedServiceFor({ planName, addonName }) {
    return services.items.find((item) => {
      if (planName) return item.relatedPlan === planName;
      if (addonName) return item.relatedAddon === addonName;
      return false;
    });
  }

  const loopPlans = [...pricing.plans, ...pricing.plans];
  const loopAddons = [...pricing.addons, ...pricing.addons];

  return (
    <section id="planos" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4">
            {pricing.headingPrefix} {headingLevel === 'h1' ? (
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{pricing.headingHighlight}</span>
            ) : (
              <span className="text-neon-cyan">{pricing.headingHighlight}</span>
            )}
          </Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">{pricing.subtitle}</p>
        </div>

        <div className="md:hidden mb-12 group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max gap-6 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {loopPlans.map((plan, index) => (
              <PlanCard key={index} plan={plan} related={relatedServiceFor({ planName: plan.name })} locale={locale} ui={ui} />
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricing.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} related={relatedServiceFor({ planName: plan.name })} locale={locale} ui={ui} />
          ))}
        </div>

        <div className="md:hidden group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max gap-6 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {loopAddons.map((addon, index) => (
              <AddonCard key={index} addon={addon} related={relatedServiceFor({ addonName: addon.name })} locale={locale} ui={ui} />
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {pricing.addons.map((addon) => (
            <AddonCard key={addon.name} addon={addon} related={relatedServiceFor({ addonName: addon.name })} locale={locale} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  );
}
