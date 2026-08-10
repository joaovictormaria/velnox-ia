import { getContent, LOCALES, DEFAULT_LOCALE, withLocale } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';

function languageAlternates(path) {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l === 'pt' ? 'pt-BR' : l, `${SITE_URL}${withLocale(l, path)}`])
  );
  languages['x-default'] = `${SITE_URL}${path}`;
  return languages;
}

export default function sitemap() {
  const lastModified = new Date();
  const data = getContent(DEFAULT_LOCALE);

  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/servicos', priority: 0.7, changeFrequency: 'monthly' },
    ...data.services.items.map((item) => ({
      path: `/servicos/${item.slug}`,
      priority: 0.6,
      changeFrequency: 'monthly',
    })),
    { path: '/planos', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/sobre', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/portfolio', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contato', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/orcamento', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/privacidade', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/termos', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  ];

  const staticEntries = LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}${withLocale(locale, route.path)}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: languageAlternates(route.path) },
    }))
  );

  const blogEntries = LOCALES.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${SITE_URL}${withLocale(locale, `/blog/${post.slug}`)}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: { languages: languageAlternates(`/blog/${post.slug}`) },
    }))
  );

  return [...staticEntries, ...blogEntries];
}
