export const SITE_URL = 'https://www.velnoxia.com.br';
export const SITE_NAME = 'VELNOX.IA';
export const SITE_TAGLINE = 'Desenvolvendo o Impossível';

export function buildMetadata({ title, description, path }) {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: SITE_NAME,
      url: path,
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
