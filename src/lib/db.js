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
