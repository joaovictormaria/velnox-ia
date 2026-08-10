'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function scrollToHash() {
  const { hash } = window.location;
  if (!hash) return;

  const id = decodeURIComponent(hash.slice(1));
  window.setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

export default function HashScrollFix() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToHash();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return null;
}
