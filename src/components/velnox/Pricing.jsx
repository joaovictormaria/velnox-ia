import React from 'react';
import { getContent, withLocale } from '@/lib/content';
import PricingBackdrop from '@/components/velnox/pricing/PricingBackdrop';
import PricingCard from '@/components/velnox/pricing/PricingCard';
import AddonCard from '@/components/velnox/pricing/AddonCard';
import TypewriterHeading from '@/components/velnox/TypewriterHeading';

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default function Pricing({ headingLevel = 'h2', locale }) {
  const { pricing, ui } = getContent(locale);
  const quoteHref = withLocale(locale, '/orcamento');

  return (
    <section id="planos" className="relative overflow-hidden py-20 md:py-28 scroll-mt-28">
      <PricingBackdrop />

      {/* Container largo como o da secao de servicos: os planos ficam a
          esquerda e os adicionais a direita, e ambos precisam de espaco. */}
      <div className="relative mx-auto max-w-[108rem] px-5 sm:px-8 lg:px-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
            {pricing.headingPrefix} {pricing.headingHighlight}
          </span>

          <TypewriterHeading
            as={headingLevel}
            prefix={pricing.headingPrefix}
            highlight={pricing.headingHighlight}
            className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            highlightClassName="bg-gradient-to-r from-neon-cyan to-neon-cyan/70 bg-clip-text text-transparent"
          />

          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">{pricing.subtitle}</p>
        </div>

        {/* Coluna da direita com largura fixa em vez de fracao: assim o que
            sobra vai todo para os planos, e a largura de cada plano nao muda
            conforme o tamanho da tela mais do que o necessario. */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] lg:items-start">
          {/* items-stretch para os cards da fileira terminarem na mesma altura,
              mesmo com quantidades diferentes de itens na lista. */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
            {pricing.plans.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} ui={ui} quoteHref={quoteHref} />
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {pricing.addons.map((addon, i) => (
              <AddonCard key={addon.name} addon={addon} index={i} ui={ui} quoteHref={quoteHref} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
