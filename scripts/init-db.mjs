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

await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT`;

await sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
await sql`CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status)`;

console.log('leads table ready.');

await sql`
  CREATE TABLE IF NOT EXISTS page_views (
    id SERIAL PRIMARY KEY,
    path TEXT NOT NULL,
    country TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views (created_at DESC)`;
await sql`CREATE INDEX IF NOT EXISTS page_views_country_idx ON page_views (country)`;

console.log('page_views table ready.');

await sql`
  CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    quote TEXT NOT NULL,
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    -- data URL ja reduzida no navegador (lado maior 320px, JPEG). Guardar o
    -- proprio bytes aqui evita ter de provisionar um bucket so para tres ou
    -- quatro fotos por mes; o limite de tamanho e imposto na rota.
    photo TEXT,
    locale TEXT,
    status TEXT NOT NULL DEFAULT 'pendente'
      CHECK (status IN ('pendente','aprovado','rejeitado')),
    -- Hash, nao o IP: serve so para contar envios recentes da mesma origem.
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`CREATE INDEX IF NOT EXISTS testimonials_status_idx ON testimonials (status, created_at DESC)`;
await sql`CREATE INDEX IF NOT EXISTS testimonials_ip_hash_idx ON testimonials (ip_hash, created_at DESC)`;

console.log('testimonials table ready.');
