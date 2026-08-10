'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={withLocale(locale, '/#inicio')} className="font-display font-bold text-lg tracking-tight">
          <span className="text-foreground">{brand.name}</span><span className="text-neon-cyan">{brand.suffix}</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <Link key={link.href} href={withLocale(locale, link.href)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-neon-cyan/40 transition-colors"
            >
              <Globe className="w-4 h-4" /> {locale.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 py-1.5 min-w-[9rem] rounded-lg border border-border bg-background/95 backdrop-blur-xl shadow-lg">
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    href={withLocale(l, agnosticPath)}
                    onClick={() => setLangOpen(false)}
                    className={`block px-3 py-1.5 text-sm transition-colors ${l === locale ? 'text-neon-cyan' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {getLocaleLabel(l)}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href={withLocale(locale, '/#contato')} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] transition-all">
            <MessageCircle className="w-4 h-4" /> {nav.cta}
          </Link>
        </div>
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? ui.mobileMenuCloseLabel : ui.mobileMenuOpenLabel}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
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
            <Link href={withLocale(locale, '/#contato')} onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm justify-center">
              <MessageCircle className="w-4 h-4" /> {nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
