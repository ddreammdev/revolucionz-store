# Revolucionz Store

Storefront headless de **Revolucion Z**, construido sobre Shopify Hydrogen para ofrecer una experiencia moderna, rápida y optimizada para catálogo, búsqueda y compra.

## Stack principal

- Shopify Hydrogen
- Remix / React Router
- React 18
- TypeScript
- Vite
- Tailwind CSS

## Requisitos

- Node.js `^22 || ^24`
- pnpm (recomendado) o npm
- Shopify CLI configurado para tu tienda

## Instalación

```bash
pnpm install
```

## Desarrollo local

```bash
pnpm dev
```

## Build de producción

```bash
pnpm build
```

## Scripts útiles

- `pnpm dev`: inicia entorno local con codegen.
- `pnpm build`: compila para producción.
- `pnpm preview`: levanta el build local.
- `pnpm lint`: ejecuta linting.
- `pnpm typecheck`: valida tipos de TypeScript.
- `pnpm codegen`: ejecuta codegen de Shopify + typegen de rutas.

## Estructura general

- `app/components`: componentes UI reutilizables.
- `app/routes`: rutas y páginas del storefront.
- `app/assets`: recursos visuales (logos, carruseles, productos).
- `app/styles`: estilos globales.

## Notas

- Este proyecto usa flujo headless con Shopify, por lo que requiere credenciales y configuración de entorno para conectarse al storefront.
- Para Account API (`/account`), sigue la guía oficial de Hydrogen:
  <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>
