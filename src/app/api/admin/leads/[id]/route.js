import { NextResponse } from 'next/server';
import { deleteLeadById, LEAD_STATUSES, updateLeadById } from '@/lib/db';
import { SITE_URL } from '@/lib/seo';

function originIsTrusted(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  return origin === SITE_URL || origin === request.nextUrl.origin;
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

  const { status, notes } = body ?? {};

  if (status !== undefined && !LEAD_STATUSES.includes(status)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const lead = await updateLeadById(id, { status, notes });
  if (!lead) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  return NextResponse.json({ ok: true, lead });
}

export async function DELETE(request, { params }) {
  if (!originIsTrusted(request)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const { id } = await params;
  await deleteLeadById(id);
  return NextResponse.json({ ok: true });
}
