'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Instagram, Mail, Send, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE, CONTACT_EMAIL, buildWhatsappMessageUrl } from '@/lib/contact';
import { getLeadSource } from '@/lib/attribution';
import { getContent, withLocale } from '@/lib/content';

/** @param {{ headingLevel?: 'h1' | 'h2', locale: string }} props */
export default function Contact({ headingLevel = 'h2', locale }) {
  const { contact, ui } = getContent(locale);
  const Heading = headingLevel;
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', message: '' });
  const [website, setWebsite] = useState('');
  const [success, setSuccess] = useState(false);
  const [sentForm, setSentForm] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (website) return;
    window.open(buildWhatsappMessageUrl(form), '_blank', 'noopener,noreferrer');

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, website, source: getLeadSource() }),
    }).catch(() => {});

    setSentForm(form);
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', projectType: '', message: '' });
  };

  return (
    <section id="contato" className="relative py-16 md:py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <Heading className="font-display text-4xl md:text-5xl font-bold mb-4">{contact.headingPrefix} <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{contact.headingHighlight}</span></Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">{contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 bg-card/60 backdrop-blur-xl border border-border shadow-[0_0_40px_rgba(0,255,255,0.06),0_0_80px_rgba(255,0,255,0.04)] p-6 md:p-8 rounded-2xl">
            {success ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-neon-cyan mb-4" />
                <h2 className="font-display text-xl font-semibold mb-2">{contact.successTitle}</h2>
                <p className="text-sm text-muted-foreground mb-6">{contact.successText}</p>
                {sentForm && (
                  <a
                    href={buildWhatsappMessageUrl(sentForm)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all mb-4"
                  >
                    <MessageCircle className="w-4 h-4" /> {contact.whatsappCtaLabel}
                  </a>
                )}
                <button onClick={() => { setSuccess(false); setSentForm(null); }} className="text-sm text-neon-cyan hover:underline">
                  {contact.resendLabel}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm text-muted-foreground mb-1.5">{ui.nameLabel}</label>
                    <input
                      id="contact-name"
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
                    <label htmlFor="contact-email" className="block text-sm text-muted-foreground mb-1.5">{ui.emailLabel}</label>
                    <input
                      id="contact-email"
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
                    <label htmlFor="contact-phone" className="block text-sm text-muted-foreground mb-1.5">{ui.phoneLabel}</label>
                    <input
                      id="contact-phone"
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
                      placeholder={ui.phonePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm text-muted-foreground mb-1.5">{ui.projectTypeLabel}</label>
                    <select
                      id="contact-subject"
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
                  <label htmlFor="contact-message" className="block text-sm text-muted-foreground mb-1.5">{ui.contactMessageLabel}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
                    placeholder={ui.contactMessagePlaceholder}
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
                  {contact.submitLabel} <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-card/50 backdrop-blur-xl border border-border p-5 rounded-2xl flex items-center gap-4 hover:border-neon-cyan/40 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-all shrink-0">
                <MessageCircle className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <div className="text-sm font-semibold">{contact.whatsapp.label}</div>
                <div className="text-xs text-muted-foreground">{contact.whatsapp.sublabel}</div>
              </div>
            </a>

            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="bg-card/50 backdrop-blur-xl border border-border p-5 rounded-2xl flex items-center gap-4 hover:border-neon-magenta/40 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-neon-magenta/10 flex items-center justify-center group-hover:bg-neon-magenta/20 transition-all shrink-0">
                <Instagram className="w-5 h-5 text-neon-magenta" />
              </div>
              <div>
                <div className="text-sm font-semibold">{contact.instagram.label}</div>
                <div className="text-xs text-muted-foreground">@{INSTAGRAM_HANDLE}</div>
              </div>
            </a>

            <a href={`mailto:${CONTACT_EMAIL}`} className="bg-card/50 backdrop-blur-xl border border-border p-5 rounded-2xl flex items-center gap-4 hover:border-neon-cyan/40 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-all shrink-0">
                <Mail className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <div className="text-sm font-semibold">{ui.emailInfoHeading}</div>
                <div className="text-xs text-muted-foreground">{CONTACT_EMAIL}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
