import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { breadcrumbSchema } from '@/lib/jsonld';
import { getContent, withLocale } from '@/lib/content';

/** @param {{ items: { name: string, path: string }[], locale: string }} props */
export default function Breadcrumbs({ items, locale }) {
  const { ui } = getContent(locale);
  const trail = [{ name: ui.homeLabel, path: '/' }, ...items];
  const schema = breadcrumbSchema(trail, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="breadcrumb" className="max-w-7xl mx-auto px-6 pt-6 text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
        {trail.map((item, index) => (
          <span key={item.path} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />}
            {index === trail.length - 1 ? (
              <span className="text-foreground" aria-current="page">{item.name}</span>
            ) : (
              <Link href={withLocale(locale, item.path)} className="hover:text-neon-cyan transition-colors">{item.name}</Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
