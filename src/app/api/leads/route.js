import { after, NextResponse } from 'next/server';
import { createLead } from '@/lib/db';
import { notifyNewLead } from '@/lib/notify';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { name, email, phone, projectType, message, website, source } = body ?? {};

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const id = await createLead({ name, email, phone, projectType, message, source });
  after(() => notifyNewLead({ id, name, email, phone, projectType, message }));
  return NextResponse.json({ ok: true, id });
}
