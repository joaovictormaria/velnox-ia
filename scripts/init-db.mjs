import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'novo'
      CHECK (status IN ('novo','em_contato','convertido','perdido')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
await sql`CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status)`;

console.log('leads table ready.');
