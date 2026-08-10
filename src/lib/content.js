import pt from '@/data/content/pt.json';
import en from '@/data/content/en.json';
import es from '@/data/content/es.json';
import fr from '@/data/content/fr.json';
import de from '@/data/content/de.json';

export const DEFAULT_LOCALE = 'pt';
export const LOCALES = ['pt', 'en', 'es', 'fr', 'de'];

const CONTENT = { pt, en, es, fr, de };

// BCP-47 tag for OpenGraph metadata / <html lang>.
const OG_LOCALE = { pt: 'pt_BR', en: 'en_US', es: 'es_ES', fr: 'fr_FR', de: 'de_DE' };

// Locale string for Date#toLocaleDateString and similar.
const DATE_LOCALE = { pt: 'pt-BR', en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE' };

const LOCALE_LABEL = { pt: 'Português', en: 'English', es: 'Español', fr: 'Français', de: 'Deutsch' };

export function getContent(locale) {
  return CONTENT[locale] ?? CONTENT[DEFAULT_LOCALE];
}

export function getOgLocale(locale) {
  return OG_LOCALE[locale] ?? OG_LOCALE[DEFAULT_LOCALE];
}

export function getDateLocale(locale) {
  return DATE_LOCALE[locale] ?? DATE_LOCALE[DEFAULT_LOCALE];
}

export function getLocaleLabel(locale) {
  return LOCALE_LABEL[locale] ?? locale;
}

export function isLocale(value) {
  return LOCALES.includes(value);
}

/**
 * Prefixes an internal path with the locale segment, except for the
 * default locale (pt), whose routes stay unprefixed at the site root.
 * Preserves hash fragments (`/#servicos` -> `/en#servicos`).
 */
export function withLocale(locale, path) {
  if (locale === DEFAULT_LOCALE) return path;

  const hashIndex = path.indexOf('#');
  if (hashIndex === -1) {
    return path === '/' ? `/${locale}` : `/${locale}${path}`;
  }

  const base = path.slice(0, hashIndex);
  const hash = path.slice(hashIndex);
  const prefixedBase = base === '/' || base === '' ? `/${locale}` : `/${locale}${base}`;
  return `${prefixedBase}${hash}`;
}
