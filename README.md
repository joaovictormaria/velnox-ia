# Velnox.IA

Landing page — React 18 + Vite + Tailwind CSS. Sem backend: formulário de contato/orçamento abre o WhatsApp com a mensagem pronta.

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

Zero-config: importe o repositório na Vercel, framework Vite é detectado automaticamente (`vercel.json` já define `buildCommand`/`outputDirectory` e o rewrite de SPA). Nenhuma env var é necessária.

## Antes de publicar

Confira `src/data/static-data.json` → `contact.whatsapp.number` (formato `55DDNNNNNNNNN`, sem espaços/símbolos) e o e-mail/Instagram — é a fonte única desses dados.
