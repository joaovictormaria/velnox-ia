import { neon } from '@neondatabase/serverless';

let client;

// Lazy: constructing the neon client throws if DATABASE_URL is unset, and this
// module is imported (evaluated) for every route during `next build`'s page-data
// collection, not just when a query actually runs. Deferring the throw to first
// query time keeps the build/other routes working before the DB is provisioned.
export function sql(strings, ...values) {
  client ??= neon(process.env.DATABASE_URL);
  return client(strings, ...values);
}

export const LEAD_STATUSES = ['novo', 'em_contato', 'convertido', 'perdido'];

export async function createLead({ name, email, phone, projectType, message, source }) {
  const rows = await sql`
    INSERT INTO leads (name, email, phone, project_type, message, source)
    VALUES (${name}, ${email}, ${phone ?? null}, ${projectType ?? null}, ${message ?? null}, ${source ?? null})
    RETURNING id
  `;
  return rows[0].id;
}

export async function getLeads() {
  return sql`SELECT * FROM leads ORDER BY created_at DESC`;
}

export async function updateLeadById(id, patch) {
  const status = patch.status ?? null;
  const notes = patch.notes !== undefined ? patch.notes : null;

  const rows = await sql`
    UPDATE leads
    SET status = COALESCE(${status}, status),
        notes = COALESCE(${notes}, notes)
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] ?? null;
}

export async function deleteLeadById(id) {
  await sql`DELETE FROM leads WHERE id = ${id}`;
}

export async function recordPageView({ path, country }) {
  await sql`
    INSERT INTO page_views (path, country)
    VALUES (${path ?? '/'}, ${country ?? null})
  `;
}

export const TESTIMONIAL_STATUSES = ['pendente', 'aprovado', 'rejeitado'];

export async function createTestimonial({ name, role, quote, rating, photo, locale, ipHash }) {
  const rows = await sql`
    INSERT INTO testimonials (name, role, quote, rating, photo, locale, ip_hash)
    VALUES (${name}, ${role ?? null}, ${quote}, ${rating}, ${photo ?? null}, ${locale ?? null}, ${ipHash ?? null})
    RETURNING id
  `;
  return rows[0].id;
}

/**
 * Quantos depoimentos a mesma origem mandou na ultima hora. E o freio contra
 * envio em massa: sem estado em memoria, que nao sobrevive ao serverless.
 */
export async function countRecentTestimonialsByIp(ipHash) {
  if (!ipHash) return 0;
  const [{ count }] = await sql`
    SELECT COUNT(*)::int AS count
    FROM testimonials
    WHERE ip_hash = ${ipHash} AND created_at > now() - INTERVAL '1 hour'
  `;
  return count;
}

/** Somente os aprovados, que sao os que a home publica. */
export async function getApprovedTestimonials() {
  return sql`
    SELECT id, name, role, quote, rating, photo
    FROM testimonials
    WHERE status = 'aprovado'
    ORDER BY created_at DESC
  `;
}

export async function getTestimonials() {
  return sql`SELECT * FROM testimonials ORDER BY created_at DESC`;
}

export async function updateTestimonialById(id, patch) {
  const status = patch.status ?? null;
  const rows = await sql`
    UPDATE testimonials
    SET status = COALESCE(${status}, status)
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] ?? null;
}

export async function deleteTestimonialById(id) {
  await sql`DELETE FROM testimonials WHERE id = ${id}`;
}

export async function getVisitStats() {
  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM page_views`;
  const byCountry = await sql`
    SELECT COALESCE(country, 'XX') AS country, COUNT(*)::int AS count
    FROM page_views
    GROUP BY country
    ORDER BY count DESC
  `;
  return { total: count, byCountry };
}
