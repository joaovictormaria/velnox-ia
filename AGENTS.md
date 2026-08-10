# AGENTS.md

## Project

Velnox.IA — landing page de agência de desenvolvimento web. React 18 + Next.js (App Router) + Tailwind, sem backend. O formulário de contato/orçamento monta um link `wa.me` com a mensagem pronta e abre o WhatsApp — não envia e-mail, não chama nenhuma API. Migrado de Vite/react-router-dom para Next.js App Router para viabilizar SEO técnico (metadata por rota, sitemap, robots, next/image, next/font — ver fases em `.claude/plans` se existirem).

## Stack

- `src/app/`: rotas via App Router — `/` (`page.jsx`, Home em scroll único), `/servicos`, `/planos`, `/sobre`, `/faq`, `/contato`, `/orcamento` (cada uma um `page.jsx` que envolve a seção correspondente em `SiteShell`), `not-found.jsx`.
- `src/app/layout.jsx`: layout raiz (html/body, fontes, metadata base).
- `src/components/SiteShell.jsx`: Navbar+main+Footer, usado pelas 6 rotas standalone (não pelo `/` nem pelo `not-found`).
- `src/components/velnox/`: seções da página (Navbar, Hero, Services, Pricing, About, FAQ, Contact, Budget, Footer) — reaproveitadas tanto inline na Home quanto nas rotas standalone.
- `src/data/static-data.json`: fonte única de todo o conteúdo estático do site (textos, planos, FAQ, dados de contato).
- `src/lib/contact.js`: deriva WHATSAPP_URL/CONTACT_EMAIL/INSTAGRAM_URL do JSON acima, e `buildWhatsappMessageUrl(form, extraLines)` monta a mensagem pro wa.me a partir dos campos do formulário.
- `Budget` recebe `selectedPlan` via prop (resolvido no `orcamento/page.jsx`, server component, a partir de `searchParams`) — não usa hook de router para isso.

## Comandos

- `npm run dev` — servidor local (`next dev`).
- `npm run build` — build de produção (`next build`).
- `npm run lint` — ESLint (inclui `eslint-config-next`).
- `npm run typecheck` — checagem de tipos via `tsc` sobre os `.jsx`/`.js` (jsconfig).

## Deploy (Vercel)

Zero-config: a Vercel detecta Next.js automaticamente. Nenhuma env var é necessária — não há função serverless custom (sem Middleware, sem API routes).

## Working notes

- Antes de publicar, conferir `src/data/static-data.json` → `contact.whatsapp.number`, `contact.email`, `contact.instagram.handle`.
- `src/env.d.ts` declara os módulos de imagem (`*.png` etc) pro `tsc` não quebrar em imports de asset.
- IDs de GA4/GTM/Search Console não devem ser inventados — adicionar só quando houver um ID real do usuário.
