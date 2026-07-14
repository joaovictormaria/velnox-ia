import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteShell from '@/components/SiteShell';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Artigos sobre desenvolvimento web, performance e tecnologia.',
  path: '/blog',
});

function formatDate(value) {
  return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <SiteShell>
      <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }]} />
      <section className="relative py-24 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-cyan to-neon-magenta bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-muted-foreground">Artigos sobre desenvolvimento web, performance e tecnologia.</p>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6 hover:border-neon-cyan/40 transition-colors group"
              >
                <div className="text-xs text-muted-foreground mb-2">{formatDate(post.date)}</div>
                <h2 className="font-display text-xl font-semibold mb-2 text-foreground">{post.title}</h2>
                <p className="text-sm text-muted-foreground mb-3">{post.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-neon-cyan">
                  Ler artigo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
            {posts.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Nenhum post publicado ainda.</p>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
