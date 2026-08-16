import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteShell from '@/components/SiteShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getContent, getDateLocale, withLocale } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { ui } = getContent(locale);
  return buildMetadata({
    title: ui.blogHeading,
    description: ui.blogSubtitle,
    path: '/blog',
    locale,
  });
}

function formatDate(value, locale) {
  return new Date(value).toLocaleDateString(getDateLocale(locale), { day: '2-digit', month: 'long', year: 'numeric' });
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const { ui } = getContent(locale);
  const posts = getAllPosts(locale);

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: ui.blogHeading, path: '/blog' }]} />
      <section className="relative py-16 md:py-24 scroll-mt-28 bg-velnox-section-a">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">{ui.blogHeading}</span>
            </h1>
            <p className="text-muted-foreground">{ui.blogSubtitle}</p>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={withLocale(locale, `/blog/${post.slug}`)}
                className="block bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6 hover:border-neon-cyan/40 transition-colors group"
              >
                <div className="text-xs text-muted-foreground mb-2">{formatDate(post.date, locale)}</div>
                <h2 className="font-display text-xl font-semibold mb-2 text-foreground">{post.title}</h2>
                <p className="text-sm text-muted-foreground mb-3">{post.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-neon-cyan">
                  {ui.readArticleLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
            {posts.length === 0 && (
              <p className="text-center text-muted-foreground py-12">{ui.noPostsLabel}</p>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
