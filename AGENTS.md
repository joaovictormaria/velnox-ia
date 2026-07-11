# AGENTS.md

## Project

Velnox.IA — landing page de agência de desenvolvimento web. React 18 + Vite + Tailwind, sem backend próprio além de uma função serverless para o formulário de contato.

## Stack

- `src/App.jsx`: rotas (react-router-dom). Só duas: `/` (Home) e `*` (NotFound).
- `src/pages/Home.jsx`: monta a landing a partir dos componentes em `src/components/velnox/`.
- `src/components/velnox/`: seções da página (Navbar, Hero, Services, Pricing, About, FAQ, Contact, Footer).
- `src/lib/contact.js`: fonte única de WhatsApp/e-mail/Instagram usados no site.
- `api/contact.js`: função serverless da Vercel que recebe o POST do formulário de contato e envia e-mail via Resend.

## Comandos

- `npm run dev` — servidor local.
- `npm run build` — build de produção (`dist/`).
- `npm run lint` — ESLint.
- `npm run typecheck` — checagem de tipos via `tsc` sobre os `.jsx`/`.js` (jsconfig).

## Deploy (Vercel)

Zero-config: a Vercel detecta Vite automaticamente e `vercel.json` cuida do rewrite de SPA + da função em `api/`.

Variáveis de ambiente necessárias na Vercel (Project Settings → Environment Variables):

- `RESEND_API_KEY` — chave da conta Resend (resend.com), usada por `api/contact.js`.
- `CONTACT_TO_EMAIL` — e-mail que recebe os orçamentos.
- `CONTACT_FROM_EMAIL` — opcional; remetente verificado no Resend. Sem isso, usa o domínio sandbox `onboarding@resend.dev` (só funciona pra testar, não entrega em produção pra qualquer destinatário).

## Working notes

- Antes de publicar, trocar os valores placeholder em `src/lib/contact.js` (número de WhatsApp e afins) pelos reais.
- `src/vite-env.d.ts` declara os módulos de imagem (`*.png` etc) pro `tsc` não quebrar em imports de asset.
