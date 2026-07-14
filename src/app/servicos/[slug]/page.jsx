import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Code, Rocket, Layout, Search, Server, Cpu, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import SiteShell from '@/components/SiteShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import data from '@/data/static-data.json';
import { buildMetadata } from '@/lib/seo';
import { serviceSchema } from '@/lib/jsonld';

const icons = { Code, Rocket, Layout, Search, Server, Cpu };

export function generateStaticParams() {
  return data.services.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = data.services.items.find((service) => service.slug === slug);
  if (!item) return {};

  return buildMetadata({
    title: item.title,
    description: item.description,
    path: `/servicos/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const item = data.services.items.find((service) => service.slug === slug);
  if (!item) notFound();

  const Icon = icons[item.icon];
  const relatedPlan = item.relatedPlan
    ? data.pricing.plans.find((plan) => plan.name === item.relatedPlan)
    : null;
  const relatedAddon = item.relatedAddon
    ? data.pricing.addons.find((addon) => addon.name === item.relatedAddon)
    : null;
  const relatedFaq = typeof item.relatedFaqIndex === 'number'
    ? data.faq.items[item.relatedFaqIndex]
    : null;

  return (
    <SiteShell>
      <Breadcrumbs items={[{ name: 'Serviços', path: '/servicos' }, { name: item.title, path: `/servicos/${slug}` }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(item)) }}
      />
      <section className="relative py-24 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/servicos" className="inline-flex items-center gap-1.5 text-sm text-neon-cyan hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Todos os serviços
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-neon-cyan" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">{item.title}</h1>
          </div>

          <p className="text-lg text-muted-foreground mb-10">{item.description}</p>

          {item.details && (
            <div className="mb-10 space-y-8">
              <p className="text-muted-foreground leading-relaxed">{item.details.explanation}</p>

              <div>
                <h2 className="font-display text-lg font-semibold mb-3">Benefícios</h2>
                <ul className="space-y-2">
                  {item.details.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" /> {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold mb-3">Como funciona</h2>
                <ol className="space-y-2">
                  {item.details.process.map((step, index) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="font-mono text-xs text-neon-cyan shrink-0 mt-0.5">{String(index + 1).padStart(2, '0')}</span> {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold mb-3">Casos de uso</h2>
                <ul className="space-y-2">
                  {item.details.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" /> {useCase}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold mb-3">Diferenciais</h2>
                <ul className="space-y-2">
                  {item.details.differentiators.map((diff) => (
                    <li key={diff} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" /> {diff}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {relatedPlan && (
            <div className="bg-card/60 backdrop-blur-xl border border-border shadow-[0_0_40px_rgba(0,255,255,0.06),0_0_80px_rgba(255,0,255,0.04)] p-6 md:p-8 rounded-2xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">Plano recomendado</span>
                <span className="font-display text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{relatedPlan.price}</span>
              </div>
              <h2 className="font-display text-xl font-semibold mb-1">{relatedPlan.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{relatedPlan.description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {relatedPlan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-neon-cyan shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/orcamento?plano=${encodeURIComponent(relatedPlan.name)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all"
              >
                Solicitar orçamento <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {relatedAddon && (
            <div className="bg-card/50 backdrop-blur-xl border border-border p-6 rounded-2xl mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-lg font-semibold">{relatedAddon.name}</h2>
                <span className="font-mono text-sm text-neon-cyan">{relatedAddon.price}</span>
              </div>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {relatedAddon.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 text-neon-cyan" /> {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/orcamento"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all"
              >
                Solicitar orçamento <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {relatedFaq && (
            <div className="border-t border-border pt-8">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Pergunta frequente relacionada</p>
              <h2 className="font-medium text-foreground mb-2">{relatedFaq.q}</h2>
              <p className="text-sm text-muted-foreground mb-3">{relatedFaq.a}</p>
              <Link href={`/faq#faq-${item.relatedFaqIndex}`} className="text-sm text-neon-cyan hover:underline">
                Ver todas as perguntas →
              </Link>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
