'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle } from 'lucide-react';
import data from '@/data/static-data.json';

const { brand, nav } = data;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/#inicio" className="font-display font-bold text-lg tracking-tight">
          <span className="text-foreground">{brand.name}</span><span className="text-neon-cyan">{brand.suffix}</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/#contato" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] transition-all">
          <MessageCircle className="w-4 h-4" /> {nav.cta}
        </Link>
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            {nav.links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/#contato" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm justify-center">
              <MessageCircle className="w-4 h-4" /> {nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
