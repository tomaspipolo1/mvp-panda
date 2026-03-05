# MVP Panda Monorepo

Repositorio prototipo para ejecutar **Landing + Portal** desde un solo repo.

## Estructura

- `apps/landing`: app de landing (Next.js)
- `apps/portal`: app del portal (Next.js)
- `docs/`: alcance MVP, contexto funcional e instrucciones operativas

## Quick Start

1. Instalar dependencias en raíz:
   - `pnpm install`
2. Levantar ambas apps:
   - `pnpm dev`
3. URLs:
   - URL unica visible: `http://localhost:3000`
   - Portal MVP via proxy interno: `http://localhost:3000/portal`

## Scripts útiles

- `pnpm dev`: levanta landing + portal en paralelo
- `pnpm dev:landing`
- `pnpm dev:portal`
- `pnpm build`
- `pnpm lint`
- `pnpm start:landing`
- `pnpm start:portal`

## Configuracion de proxy interno (/portal)

- `apps/landing` expone `portal` por rewrite hacia `apps/portal`.
- Variable opcional: `PORTAL_ORIGIN` (default `http://localhost:3001`).
- `apps/portal` usa `basePath: "/portal"` para evitar conflictos de assets/rutas con landing.

## Alcance MVP (resumen)

- Landing completa, con secciones marcadas como "Sección en desarrollo" donde aplique.
- Portal limitado a:
  - Rol Prensa: Blog, Material descargable, Galería.
  - Rol Contable: Tarifario.

## Documentación clave

- `docs/MVP_SCOPE.md`
- `docs/CONTEXTO_E_INSTRUCCIONES_MVP.md`

## Notas

- Este repo es de prototipo/demo, separado de los repos finales.
- Evitar cambios de alcance fuera del MVP sin acordarlo antes.
