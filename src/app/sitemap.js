import { SITE_URL } from '@/lib/seo';

export default function sitemap() {
  const lastModified = new Date();

  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/servicos', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/planos', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/sobre', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contato', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/orcamento', priority: 0.9, changeFrequency: 'monthly' },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
