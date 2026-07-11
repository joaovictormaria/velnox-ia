import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const projectTypes = [
  'Landing Page (Launch)',
  'Site Institucional (Business)',
  'Plataforma Web (Premium)',
  'MVP para Startup',
  'Hospedagem',
  'Integrações API',
  'Outro',
];

const CONTACT_EMAIL = 'contato@velnox.com.br';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', message: '' });
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
      const body = `
<h2 style="font-family: sans-serif; color: #050810;">Novo orçamento solicitado — VELNOX.IA</h2>
<table style="font-family: sans-serif; font-size: 14px; color: #333; border-collapse: collapse;">
  <tr><td style="padding: 6px 0; font-weight: bold;">Nome:</td><td style="padding: 6px 0;">${form.name}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">E-mail:</td><td style="padding: 6px 0;">${form.email}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Telefone:</td><td style="padding: 6px 0;">${form.phone || '—'}</td></tr>
  <tr><td style="padding: 6px 0; font-weight: bold;">Tipo de projeto:</td><td style="padding: 6px 0;">${form.projectType || '—'}</td></tr>
</table>
<h3 style="font-family: sans-serif; font-size: 14px; color: #050810; margin-top: 20px;">Mensagem:</h3>
<p style="font-family: sans-serif; font-size: 14px; color: #333; white-space: pre-wrap;">${form.message}</p>
<hr style="margin-top: 24px; border: none; border-top: 1px solid #eee;">
<p style="font-family: sans-serif; font-size: 12px; color: #999;">Enviado pelo site VELNOX.IA — A velocidade nunca dorme.</p>
`;

      await base44.integrations.Core.SendEmail({
        to: CONTACT_EMAIL,
        subject: `Novo orçamento — ${form.name} (VELNOX.IA)`,
        body,
        from_name: 'Site VELNOX.IA',
      });

      setSuccess(true);
      setForm({ name: '', email: '', phone: '', projectType: '', message: '' });
    } catch (err) {
      setError('Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="relative py-24 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Pronto para <span className="gradient-text">começar?</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Solicite um orçamento e responderemos o mais rápido possível.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 glass-card-highlight p-6 md:p-8 rounded-2xl">
            {success ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-neon-cyan mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">Orçamento enviado!</h3>
                <p className="text-sm text-muted-foreground mb-6">Recebemos sua solicitação. Em breve entraremos em contato.</p>
                <button onClick={() => setSuccess(false)} className="text-sm text-neon-cyan hover:underline">
                  Enviar outra solicitação
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
                      {projectTypes.map((type) => (
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

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
                  ) : (
                    <>Solicitar Orçamento <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-neon-cyan/40 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-all shrink-0">
                <MessageCircle className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <div className="text-sm font-semibold">WhatsApp</div>
                <div className="text-xs text-muted-foreground">Resposta rápida</div>
              </div>
            </a>

            <a href="https://instagram.com/velnox.ia" target="_blank" rel="noopener noreferrer" className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-neon-magenta/40 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-neon-magenta/10 flex items-center justify-center group-hover:bg-neon-magenta/20 transition-all shrink-0">
                <Instagram className="w-5 h-5 text-neon-magenta" />
              </div>
              <div>
                <div className="text-sm font-semibold">Instagram</div>
                <div className="text-xs text-muted-foreground">@velnox.ia</div>
              </div>
            </a>

            <a href="mailto:contato@velnox.com.br" className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-neon-cyan/40 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-all shrink-0">
                <Mail className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <div className="text-sm font-semibold">E-mail</div>
                <div className="text-xs text-muted-foreground">contato@velnox.com.br</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}