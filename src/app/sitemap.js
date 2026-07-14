import data from '@/data/static-data.json';
import { SITE_URL } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';

export default function sitemap() {
  const lastModified = new Date();

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

  const staticEntries = routes.map((route) => ({
    url: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
