'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import velnoxTextLogo from '@/images/texto-velnox.png';
import { Menu, X, MessageCircle, Globe } from 'lucide-react';
import { getContent, LOCALES, withLocale, getLocaleLabel } from '@/lib/content';

function stripLocale(pathname) {
  const segments = pathname.split('/');
  const first = segments[1];
  if (LOCALES.includes(first)) {
    const rest = '/' + segments.slice(2).join('/');
    return rest === '/' ? '/' : rest.replace(/\/$/, '') || '/';
  }
  return pathname;
}

/** @param {{ locale: string }} props */
export default function Navbar({ locale }) {
  const { brand, nav, ui } = getContent(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const agnosticPath = stripLocale(pathname || '/');

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 rounded-b-[2rem] md:rounded-b-[3rem] backdrop-blur backdrop-saturate-150 border-b transition-all duration-300 ${scrolled ? 'bg-background/20 border-white/10' : 'bg-background/5 border-white/5'}`}>
      <nav className="max-w-7xl mx-auto px-6 h-[4.5rem] md:h-[5.5rem] flex items-center justify-between">
        {/* Arte 4500x622 (7.23:1) — a altura controla, a largura acompanha.
            Alturas 14/16/20px dao 101/116/145px de largura, e mantem a marca
            em ~20% da altura do header. O `sizes` replica esses degraus para o
            next/image nao servir uma variante maior que o necessario. */}
        <Link href={withLocale(locale, '/#inicio')} className="shrink-0">
          <Image
            src={velnoxTextLogo}
            alt={`${brand.name}${brand.suffix}`}
            sizes="(max-width: 767px) 101px, (max-width: 1023px) 116px, 145px"
            className="h-3.5 md:h-4 lg:h-5 w-auto"
          />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <Link key={link.href} href={withLocale(locale, link.href)} className="text-base text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-label={getLocaleLabel(locale)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-base text-muted-foreground hover:text-foreground hover:border-neon-cyan/40 transition-colors"
            >
              <Globe className="w-5 h-5" /> {locale.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 py-2 min-w-[10rem] rounded-lg border border-border bg-background/95 backdrop-blur-xl shadow-lg">
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    href={withLocale(l, agnosticPath)}
                    onClick={() => setLangOpen(false)}
                    className={`block px-4 py-2 text-base transition-colors ${l === locale ? 'text-neon-cyan' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {getLocaleLabel(l)}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href={withLocale(locale, '/#contato')} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-base hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] transition-all">
            <MessageCircle className="w-5 h-5" /> {nav.cta}
          </Link>
        </div>
        <button
          className="md:hidden text-foreground p-2.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? ui.mobileMenuCloseLabel : ui.mobileMenuOpenLabel}
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden rounded-b-[2rem] bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            {nav.links.map((link) => (
              <Link key={link.href} href={withLocale(locale, link.href)} onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={withLocale(l, agnosticPath)}
                  onClick={() => setMobileOpen(false)}
                  className={`px-2.5 py-1 rounded-md border text-xs transition-colors ${l === locale ? 'border-neon-cyan/50 text-neon-cyan' : 'border-border text-muted-foreground'}`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <Link href={withLocale(locale, '/#contato')} onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-base justify-center">
              <MessageCircle className="w-5 h-5" /> {nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
