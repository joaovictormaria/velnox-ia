import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, Send, Loader2, CheckCircle2 } from 'lucide-react';
import data from '@/data/static-data.json';

const { budget, pricing, contact } = data;

export default function Budget() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plano') || '';
  const selectedPlan = pricing.plans.find(
    (plan) => plan.name.toLowerCase() === planParam.toLowerCase()
  );

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: selectedPlan ? selectedPlan.projectType : '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSuccess(true);
    } catch (err) {
      console.error('Failed to send budget request:', err);
      setError(budget.errorFallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {budget.headingPrefix} <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{budget.headingHighlight}</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{budget.subtitle}</p>
        </div>

        {selectedPlan ? (
          <div className="bg-card/60 backdrop-blur-xl border border-border shadow-[0_0_40px_rgba(0,255,255,0.06),0_0_80px_rgba(255,0,255,0.04)] p-6 md:p-8 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">{budget.planSummaryLabel}</span>
              <Link to="/planos" className="text-xs text-neon-cyan hover:underline">{budget.changePlanLabel}</Link>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="font-display text-2xl font-bold">{selectedPlan.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
              </div>
              <div className="font-display text-3xl font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{selectedPlan.price}</div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedPlan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-neon-cyan shrink-0" /> {feature}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-card/50 backdrop-blur-xl border border-border p-6 rounded-2xl mb-8 text-center">
            <h2 className="font-display text-lg font-semibold mb-1">{budget.noPlanTitle}</h2>
            <p className="text-sm text-muted-foreground mb-4">{budget.noPlanText}</p>
            <Link to="/planos" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-border text-foreground text-sm font-semibold hover:border-neon-cyan/50 transition-all">
              {budget.backToPlans}
            </Link>
          </div>
        )}

        <div className="bg-card/60 backdrop-blur-xl border border-border shadow-[0_0_40px_rgba(0,255,255,0.06),0_0_80px_rgba(255,0,255,0.04)] p-6 md:p-8 rounded-2xl">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-neon-cyan mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">{budget.successTitle}</h3>
              <p className="text-sm text-muted-foreground">{budget.successText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Nome *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">Tipo de projeto *</label>
                  <select
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  >
                    <option value="">Selecione...</option>
                    {contact.projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">{budget.messageLabel} *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
                  placeholder={budget.messagePlaceholder}
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> {budget.submittingLabel}</>
                ) : (
                  <>{budget.submitLabel} <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
