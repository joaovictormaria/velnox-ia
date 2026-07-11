import React from 'react';
import { Check, Server, Plug } from 'lucide-react';

const plans = [
  { name: 'LAUNCH', price: 'R$ 450', description: 'Landing Page de alto impacto', features: ['1 página', 'Design responsivo', 'SEO básico', 'Entrega em 3-5 dias'], highlighted: false },
  { name: 'BUSINESS', price: 'R$ 850', description: 'Site institucional completo', features: ['Até 5 páginas', 'Painel administrativo', 'SEO avançado', 'Integração WhatsApp', 'Entrega em 7-15 dias'], highlighted: true },
  { name: 'PREMIUM', price: 'R$ 1.250+', description: 'Plataforma web personalizada', features: ['Páginas ilimitadas', 'Sistema completo', 'Dashboard personalizado', 'Integrações API', 'Suporte dedicado'], highlighted: false },
  { name: 'MVP', price: 'R$ 2.500+', description: 'Para startups que querem lançar', features: ['Produto mínimo viável', 'Desenvolvimento completo', 'Pronto para investidores', 'Escalável', 'Consultoria de produto'], highlighted: false },
];

const addons = [
  { icon: Server, name: 'Hospedagem Premium', price: 'R$ 185/mês', features: ['Servidor 24/7', 'SSL incluso', 'Backups automáticos', 'Suporte dedicado'] },
  { icon: Plug, name: 'Integrações API', price: 'Sob consulta', features: ['Pagamentos online', 'CRM', 'Automação', 'APIs personalizadas'] },
];

export default function Pricing() {
  return (
    <section id="planos" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Planos & <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">Preços</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Escolha o plano ideal para o seu projeto. Cada um é personalizado conforme sua necessidade.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => (
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
              <a href="#contato" className={`block text-center py-2.5 rounded-lg font-semibold text-sm transition-all ${plan.highlighted ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-background hover:shadow-[0_0_25px_rgba(0,255,255,0.35)]' : 'border border-border text-foreground hover:border-neon-cyan/50'}`}>
                Escolher
              </a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addons.map((addon) => (
            <div key={addon.name} className="bg-card/50 backdrop-blur-xl border border-border p-6 rounded-2xl flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center shrink-0">
                <addon.icon className="w-6 h-6 text-neon-magenta" />
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
          ))}
        </div>
      </div>
    </section>
  );
}