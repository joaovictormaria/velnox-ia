'use client';

import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, Send, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE, CONTACT_EMAIL, buildWhatsappMessageUrl } from '@/lib/contact';
import data from '@/data/static-data.json';

const { contact } = data;

/** @param {{ headingLevel?: 'h1' | 'h2' }} props */
export default function Contact({ headingLevel = 'h2' }) {
  const Heading = headingLevel;
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [sentForm, setSentForm] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(buildWhatsappMessageUrl(form), '_blank', 'noopener,noreferrer');
    setSentForm(form);
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', projectType: '', message: '' });
  };

  return (
    <section id="contato" className="relative py-24 scroll-mt-20">
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
                <h3 className="font-display text-xl font-semibold mb-2">{contact.successTitle}</h3>
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
                  <label className="block text-sm text-muted-foreground mb-1.5">Mensagem *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
                    placeholder="Conte-nos sobre o seu projeto..."
                  />
                </div>

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
                <div className="text-sm font-semibold">E-mail</div>
                <div className="text-xs text-muted-foreground">{CONTACT_EMAIL}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
