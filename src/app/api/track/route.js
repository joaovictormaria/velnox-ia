import { NextResponse } from 'next/server';
import { recordPageView } from '@/lib/db';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const path = typeof body?.path === 'string' ? body.path.slice(0, 255) : '/';
  const country = request.headers.get('x-vercel-ip-country');

  try {
    await recordPageView({ path, country });
  } catch {
    // Telemetry only — never fail the page for the visitor over this.
  }

  return NextResponse.json({ ok: true });
}
