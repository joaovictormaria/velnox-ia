# Velnox.IA

Landing page — React 18 + Vite + Tailwind CSS.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # gera dist/
npm run preview # serve o build localmente
```

## Qualidade

```bash
npm run lint
npm run typecheck
```

## Deploy (Vercel)

1. Importe o repositório na Vercel — framework Vite é detectado automaticamente (`vercel.json` já define `buildCommand`/`outputDirectory` e o rewrite de SPA).
2. Configure as env vars do formulário de contato (Project Settings → Environment Variables):
   - `RESEND_API_KEY` — chave da conta [Resend](https://resend.com/).
   - `CONTACT_TO_EMAIL` — e-mail que recebe os pedidos de orçamento.
   - `CONTACT_FROM_EMAIL` — opcional, remetente verificado no Resend.
3. Deploy.

O formulário de contato em `/contato` faz `POST /api/contact`, que é uma função serverless (`api/contact.js`) rodando na própria Vercel.

## Antes de publicar

Edite `src/lib/contact.js` com o WhatsApp/e-mail/Instagram reais — hoje tem valores placeholder.
