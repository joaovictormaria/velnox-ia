import { WHATSAPP_NUMBER, INSTAGRAM_URL } from '@/lib/contact';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import data from '@/data/static-data.json';

export function organizationSchema() {
  const { founder } = data.about;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${WHATSAPP_NUMBER}`,
      contactType: 'customer service',
      areaServed: 'BR',
      availableLanguage: 'pt-BR',
    },
    sameAs: [INSTAGRAM_URL],
    founder: {
      '@type': 'Person',
      name: founder.name,
      jobTitle: founder.role,
      sameAs: [founder.linkedin, founder.github, founder.instagram],
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema(item) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: item.title,
    description: item.description,
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    areaServed: 'BR',
    url: `${SITE_URL}/servicos/${item.slug}`,
  };
}

function parsePrice(priceStr) {
  const isMinimum = priceStr.includes('+');
  const value = Number(priceStr.replace(/[^\d]/g, ''));
  return { value, isMinimum };
}

export function offerCatalogSchema(plans) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `Planos ${SITE_NAME}`,
    itemListElement: plans.map((plan) => {
      const { value, isMinimum } = parsePrice(plan.price);
      return {
        '@type': 'Offer',
        name: plan.name,
        description: plan.description,
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        ...(isMinimum
          ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: value, priceCurrency: 'BRL' } }
          : { price: value }),
      };
    }),
  };
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
