import { LOCALES, DEFAULT_LOCALE, getOgLocale, withLocale } from '@/lib/content';

export const SITE_URL = 'https://www.velnoxia.com.br';
export const SITE_NAME = 'VELNOX.IA';
export const SITE_TAGLINE = 'Desenvolvendo o Impossível';

/**
 * @param {{ title: string, description: string, path: string, locale?: string, appendSiteName?: boolean }} args
 * `path` is the locale-agnostic pathname (e.g. '/servicos', not '/en/servicos') —
 * this builds the canonical URL and every language alternate from it.
 * `appendSiteName` defaults to true (page titles read "Serviços | VELNOX.IA");
 * pass false for the site root, whose title already IS the site name.
 */
export function buildMetadata({ title, description, path, locale = DEFAULT_LOCALE, appendSiteName = true }) {
  const fullTitle = appendSiteName ? `${title} | ${SITE_NAME}` : title;
  const localizedPath = withLocale(locale, path);

  const languages = Object.fromEntries(
    LOCALES.map((l) => [l === 'pt' ? 'pt-BR' : l, withLocale(l, path)])
  );
  languages['x-default'] = path;

  return {
    // `absolute` opts out of any ancestor layout's title.template — every
    // caller already gets the fully-resolved string, so nothing should
    // re-wrap it (the extra [locale] layout otherwise causes double-suffixing).
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: localizedPath, languages },
    openGraph: {
      type: 'website',
      locale: getOgLocale(locale),
      siteName: SITE_NAME,
      url: localizedPath,
      title: fullTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
