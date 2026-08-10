import { notFound } from 'next/navigation';
import LocaleHtmlLang from '@/components/LocaleHtmlLang';
import { LOCALES, isLocale, getContent } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const data = getContent(locale);
  return buildMetadata({
    title: `${data.brand.name}${data.brand.suffix} — ${data.brand.tagline}`,
    description: data.hero.description,
    path: '/',
    locale,
    appendSiteName: false,
  });
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlLang locale={locale} />
      {children}
    </>
  );
}
