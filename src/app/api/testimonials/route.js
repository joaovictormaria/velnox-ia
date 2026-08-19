import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { countRecentTestimonialsByIp, createTestimonial } from '@/lib/db';
import { LOCALES } from '@/lib/content';

const NAME_MAX = 60;
const ROLE_MAX = 60;
const QUOTE_MIN = 20;
const QUOTE_MAX = 1200;

// A foto chega como data URL ja reduzida no navegador (lado maior 320px). O
// teto vale mesmo assim: o cliente e quem envia, e nada impede um POST montado
// a mao. 260 mil caracteres de base64 dao ~195 KB de imagem.
const PHOTO_MAX_CHARS = 260_000;
const PHOTO_PREFIX = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;

const MAX_PER_HOUR = 3;

function clean(value, max) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

/**
 * Hash do IP, nunca o IP. Serve so para contar envios recentes da mesma
 * origem; o SESSION_SECRET entra como sal para o valor nao ser reversivel por
 * forca bruta sobre o espaco de enderecos IPv4.
 */
function hashIp(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip');
  if (!ip) return null;
  return createHash('sha256').update(`${process.env.SESSION_SECRET ?? ''}:${ip}`).digest('hex');
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  const { name, role, quote, rating, photo, locale, website } = body ?? {};

  // Campo isca: invisivel no formulario, entao so um robo preenche. Responde
  // ok para o robo nao aprender que foi barrado.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const cleanName = clean(name, NAME_MAX);
  const cleanQuote = clean(quote, QUOTE_MAX);
  const cleanRole = role === undefined || role === null || role === '' ? null : clean(role, ROLE_MAX);
  const numericRating = Number(rating);

  if (!cleanName || !cleanQuote || cleanQuote.length < QUOTE_MIN) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  if (cleanRole === null && role) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  let cleanPhoto = null;
  if (photo) {
    if (typeof photo !== 'string' || photo.length > PHOTO_MAX_CHARS || !PHOTO_PREFIX.test(photo)) {
      return NextResponse.json({ ok: false, error: 'photo' }, { status: 400 });
    }
    cleanPhoto = photo;
  }

  const ipHash = hashIp(request);

  try {
    if ((await countRecentTestimonialsByIp(ipHash)) >= MAX_PER_HOUR) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
    }

    const id = await createTestimonial({
      name: cleanName,
      role: cleanRole,
      quote: cleanQuote,
      rating: numericRating,
      photo: cleanPhoto,
      locale: LOCALES.includes(locale) ? locale : null,
      ipHash,
    });

    // Entra como 'pendente': o depoimento so aparece no site depois de
    // aprovado no /admin.
    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
