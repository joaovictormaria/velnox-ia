import { breadcrumbSchema } from '@/lib/jsonld';

export default function BreadcrumbJsonLd({ page, path }) {
  const schema = breadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: page, path },
  ]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
