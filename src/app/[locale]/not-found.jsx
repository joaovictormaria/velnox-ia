'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, DEFAULT_LOCALE, withLocale } from '@/lib/content';

const TEXT = {
  pt: { title: 'Esta página não existe.', cta: 'Voltar ao início' },
  en: { title: 'This page does not exist.', cta: 'Back to home' },
  es: { title: 'Esta página no existe.', cta: 'Volver al inicio' },
  fr: { title: "Cette page n'existe pas.", cta: "Retour à l'accueil" },
  de: { title: 'Diese Seite existiert nicht.', cta: 'Zurück zur Startseite' },
};

export default function LocaleNotFound() {
  const pathname = usePathname();
  const firstSegment = pathname?.split('/')[1];
  const locale = LOCALES.includes(firstSegment) ? firstSegment : DEFAULT_LOCALE;
  const t = TEXT[locale] ?? TEXT[DEFAULT_LOCALE];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center space-y-6">
        <h1 className="font-display text-5xl md:text-7xl font-bold bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">404</h1>
        <p className="text-muted-foreground">{t.title}</p>
        <Link
          href={withLocale(locale, '/')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all"
        >
          {t.cta}
        </Link>
      </div>
    </div>
  );
}
