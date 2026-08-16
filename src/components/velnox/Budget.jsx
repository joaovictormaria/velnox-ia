'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { buildWhatsappMessageUrl } from '@/lib/contact';
import { getContent, withLocale } from '@/lib/content';

/** @param {{ selectedPlan?: object | null, locale: string }} props */
export default function Budget({ selectedPlan = null, locale }) {
  const { budget, contact, ui } = getContent(locale);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: selectedPlan ? selectedPlan.projectType : '',
    message: '',
  });
  const [website, setWebsite] = useState('');
  const [success, setSuccess] = useState(false);
  const [sentWhatsappUrl, setSentWhatsappUrl] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (website) return;
    const planLines = selectedPlan
      ? [
          `*Plano escolhido:* ${selectedPlan.name} (${selectedPlan.price})`,
          `*Sobre o plano:* ${selectedPlan.description}`,
          '*Recursos inclusos:*',
          ...selectedPlan.features.map((feature) => `• ${feature}`),
        ]
      : [];
    const url = buildWhatsappMessageUrl(form, planLines);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentWhatsappUrl(url);
    setSuccess(true);
  };

  return (
    <section className="relative py-16 md:py-24 scroll-mt-28 bg-velnox-section-a">
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
              <Link href={withLocale(locale, '/planos')} className="text-xs text-neon-cyan hover:underline">{budget.changePlanLabel}</Link>
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
            <Link href={withLocale(locale, '/planos')} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-border text-foreground text-sm font-semibold hover:border-neon-cyan/50 transition-all">
              {budget.backToPlans}
            </Link>
          </div>
        )}

        <div className="bg-card/60 backdrop-blur-xl border border-border shadow-[0_0_40px_rgba(0,255,255,0.06),0_0_80px_rgba(255,0,255,0.04)] p-6 md:p-8 rounded-2xl">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-neon-cyan mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">{budget.successTitle}</h3>
              <p className="text-sm text-muted-foreground mb-6">{budget.successText}</p>
              <a
                href={sentWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all"
              >
                <MessageCircle className="w-4 h-4" /> {budget.whatsappCtaLabel}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget-name" className="block text-sm text-muted-foreground mb-1.5">{ui.nameLabel}</label>
                  <input
                    id="budget-name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    placeholder={ui.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="budget-email" className="block text-sm text-muted-foreground mb-1.5">{ui.emailLabel}</label>
                  <input
                    id="budget-email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    placeholder={ui.emailPlaceholder}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget-phone" className="block text-sm text-muted-foreground mb-1.5">{ui.phoneLabel}</label>
                  <input
                    id="budget-phone"
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
                    placeholder={ui.phonePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="budget-project-type" className="block text-sm text-muted-foreground mb-1.5">{ui.projectTypeLabel}</label>
                  <select
                    id="budget-project-type"
                    name="projectType"
                    required
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  >
                    <option value="">{ui.selectPlaceholder}</option>
                    {contact.projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="budget-message" className="block text-sm text-muted-foreground mb-1.5">{budget.messageLabel} *</label>
                <textarea
                  id="budget-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
                  placeholder={budget.messagePlaceholder}
                />
              </div>

              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <p className="text-xs text-muted-foreground">
                {ui.consentPrefix}{' '}
                <Link href={withLocale(locale, '/privacidade')} className="text-neon-cyan underline hover:no-underline">{ui.privacyPolicyLinkText}</Link>{ui.consentSuffix}.
              </p>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all"
              >
                {budget.submitLabel} <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
