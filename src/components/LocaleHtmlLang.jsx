'use client';

import { useEffect } from 'react';

/**
 * The root <html lang> is set once in the true root layout (Next.js requires
 * html/body to live there, and that layout sits above the [locale] segment so
 * it can't read the locale param). This corrects it client-side per locale.
 */
export default function LocaleHtmlLang({ locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
