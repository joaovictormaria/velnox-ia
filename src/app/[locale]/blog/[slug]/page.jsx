import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import SiteShell from '@/components/SiteShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getContent, getDateLocale, LOCALES, withLocale } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { articleSchema } from '@/lib/jsonld';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getAllPosts(locale).map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    locale,
  });
}

function formatDate(value, locale) {
  return new Date(value).toLocaleDateString(getDateLocale(locale), { day: '2-digit', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  const { ui } = getContent(locale);
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  return (
    <SiteShell locale={locale}>
      <Breadcrumbs locale={locale} items={[{ name: ui.blogHeading, path: '/blog' }, { name: post.title, path: `/blog/${slug}` }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post, locale)) }}
      />
      <article className="relative py-16 md:py-24 scroll-mt-28 bg-velnox-section-a">
        <div className="max-w-3xl mx-auto px-6">
          <Link href={withLocale(locale, '/blog')} className="inline-flex items-center gap-1.5 text-sm text-neon-cyan hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> {ui.allPostsLabel}
          </Link>

          <div className="text-xs text-muted-foreground mb-3">{formatDate(post.date, locale)}</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{post.title}</h1>

          <div
            className="prose prose-invert prose-headings:font-display prose-a:text-neon-cyan max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>
    </SiteShell>
  );
}
