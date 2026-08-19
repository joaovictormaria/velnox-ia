import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { deleteTestimonialById, TESTIMONIAL_STATUSES, updateTestimonialById } from '@/lib/db';
import { SITE_URL } from '@/lib/seo';

function originIsTrusted(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  return origin === SITE_URL || origin === request.nextUrl.origin;
}

// A home e ISR: sem isto um depoimento aprovado so apareceria quando a
// revalidacao por tempo vencesse.
function refreshHome() {
  revalidatePath('/[locale]', 'page');
}

export async function PATCH(request, { params }) {
  if (!originIsTrusted(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { status } = body ?? {};
  if (status !== undefined && !TESTIMONIAL_STATUSES.includes(status)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const testimonial = await updateTestimonialById(id, { status });
  if (!testimonial) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  refreshHome();
  return NextResponse.json({ ok: true, testimonial });
}

export async function DELETE(request, { params }) {
  if (!originIsTrusted(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const { id } = await params;
  await deleteTestimonialById(id);
  refreshHome();
  return NextResponse.json({ ok: true });
}
