import React from 'react';
import Link from 'next/link';
import { Instagram, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { WHATSAPP_URL, INSTAGRAM_URL, CONTACT_EMAIL } from '@/lib/contact';
import { getContent, withLocale } from '@/lib/content';

/** @param {{ locale: string }} props */
export default function Footer({ locale }) {
  const { brand, footer, ui } = getContent(locale);

  return (
    <footer className="border-t border-border pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-display font-bold text-lg">
              <span className="text-foreground">{brand.name}</span><span className="text-neon-cyan">{brand.suffix}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{brand.tagline}</p>
          </div>

          <div className="flex items-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/50 transition-all">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-neon-magenta hover:border-neon-magenta/50 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label={ui.emailAriaLabel} className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:border-neon-cyan/50 transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-center text-sm text-muted-foreground">
          <span>{footer.copyright}</span>
          <div className="flex items-center gap-4">
            {/* Sem rotulo traduzido de proposito: "Velnox.app" e nome de
                produto, e nome de produto e igual nos cinco idiomas. */}
            <Link href={withLocale(locale, '/velnox-app')} className="hover:text-foreground transition-colors">Velnox.app</Link>
            <Link href={withLocale(locale, '/privacidade')} className="hover:text-foreground transition-colors">{ui.privacyPolicyLinkText}</Link>
            <Link href={withLocale(locale, '/termos')} className="hover:text-foreground transition-colors">{ui.termsLinkText}</Link>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://portifolio.velnoxia.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-border py-2 pl-4 pr-2 text-xs text-muted-foreground transition-colors hover:border-neon-cyan/50"
          >
            <span className="whitespace-nowrap">Site desenvolvido por</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-neon-cyan px-3 py-1.5 font-bold text-black">
              João Victor Maria
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
