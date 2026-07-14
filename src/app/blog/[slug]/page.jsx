import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import SiteShell from '@/components/SiteShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { articleSchema } from '@/lib/jsonld';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <SiteShell>
      <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${slug}` }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />
      <article className="relative py-24 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-neon-cyan hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Todos os posts
          </Link>

          <div className="text-xs text-muted-foreground mb-3">{formatDate(post.date)}</div>
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
