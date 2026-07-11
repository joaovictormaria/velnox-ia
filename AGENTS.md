# AGENTS.md

## Project

Velnox.IA — landing page de agência de desenvolvimento web. React 18 + Vite + Tailwind, sem backend. O formulário de contato/orçamento monta um link `wa.me` com a mensagem pronta e abre o WhatsApp — não envia e-mail, não chama nenhuma API.

## Stack

- `src/App.jsx`: rotas (react-router-dom) — `/` (Home, scroll único), `/servicos`, `/planos`, `/sobre`, `/faq`, `/contato`, `/orcamento` (cada seção também como página própria via `PageLayout`), `*` (NotFound).
- `src/pages/Home.jsx`: monta a landing a partir dos componentes em `src/components/velnox/`.
- `src/components/velnox/`: seções da página (Navbar, Hero, Services, Pricing, About, FAQ, Contact, Budget, Footer).
- `src/data/static-data.json`: fonte única de todo o conteúdo estático do site (textos, planos, FAQ, dados de contato).
- `src/lib/contact.js`: deriva WHATSAPP_URL/CONTACT_EMAIL/INSTAGRAM_URL do JSON acima, e `buildWhatsappMessageUrl(form, extraLines)` monta a mensagem pro wa.me a partir dos campos do formulário.

## Comandos

- `npm run dev` — servidor local.
- `npm run build` — build de produção (`dist/`).
- `npm run lint` — ESLint.
- `npm run typecheck` — checagem de tipos via `tsc` sobre os `.jsx`/`.js` (jsconfig).

## Deploy (Vercel)

Zero-config: a Vercel detecta Vite automaticamente e `vercel.json` cuida do rewrite de SPA. Nenhuma env var é necessária — não há função serverless.

## Working notes

- Antes de publicar, conferir `src/data/static-data.json` → `contact.whatsapp.number`, `contact.email`, `contact.instagram.handle`.
- `src/vite-env.d.ts` declara os módulos de imagem (`*.png` etc) pro `tsc` não quebrar em imports de asset.
