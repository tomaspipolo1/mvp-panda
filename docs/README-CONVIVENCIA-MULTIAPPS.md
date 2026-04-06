# Convivencia de Múltiples Apps en Un Solo Deploy

Este documento resume los conflictos que aparecen cuando varias apps viven en el mismo monorepo y se exponen bajo una sola URL, tomando como referencia este MVP (`landing` + `portal`) y generalizando a escenarios de 3+ apps.

## 1) Qué problema resolvimos en el MVP

Objetivo operativo:

- Correr dos apps (`apps/landing` y `apps/portal`) desde un solo comando.
- Mostrar una sola URL pública: `http://localhost:3000`.
- Exponer `portal` vía subruta: `/portal`.

La clave no era solo "levantar dos servidores", sino hacer que **rutas, assets, navegación y experiencia** no se pisen entre apps.

## 2) Conflictos reales que encontramos (y por qué pasan)

### A. Colisión de rutas y assets internos

En Next.js, cada app expone assets y chunks bajo rutas internas (ej. `/_next/*`).  
Si proxyeás una app dentro de otra sin namespacing, puede haber choques de recursos.

**Resolución aplicada:**

- `portal` con `basePath: "/portal"`.
- `landing` con rewrite/proxy de `/portal/:path*` hacia `portal` interno.

Esto garantiza que el portal sirva sus rutas y assets bajo su propio namespace.

### B. Enlaces hardcodeados a ambientes externos

Había links apuntando a Vercel en lugar de rutas internas del monorepo.

**Impacto:** rompe la idea de URL única y mezcla ambientes.

**Resolución aplicada:** reemplazar URLs absolutas por rutas internas (`/`, `/portal/...`).

### C. Scripts y toolchain inconsistentes

Problemas típicos:

- `packageManager` mal definido.
- argumentos de puertos mal pasados en scripts.
- dependencias no instaladas en workspaces.

**Lección:** la convivencia multi-app falla más por "orquestación" que por código de negocio.

### D. Alcance funcional sin recorte estricto

El portal traía muchos roles/módulos heredados.

**Impacto:** riesgo de scope creep y navegación a pantallas fuera de MVP.

**Resolución aplicada:** whitelist de roles/rutas y guard de navegación.

## 3) Regla más importante de convivencia

Cada app debe tener un **namespace de URL propio y estable**.

Ejemplo:

- App A (landing): `/`
- App B (portal): `/portal/*`
- App C (futura): `/intranet/*` o `/operaciones/*`

Sin namespace claro, crecen los conflictos de:

- rutas (`/login`, `/api`, `/dashboard`)
- assets (`/_next`, `public/*`)
- sesiones/cookies
- observabilidad y debugging.

## 4) Qué cambia cuando son 3 o más apps

Al agregar apps, no escala bien improvisar rewrites uno por uno sin contrato de rutas.

### Riesgos que se multiplican

- Duplicación de rutas comunes (`/login`, `/perfil`, `/api`).
- Cookies con mismo nombre y distinto dominio/path.
- Variables de entorno ambiguas.
- Builds más lentos y pipelines acoplados.
- Dificultad para rollback parcial de una sola app.

### Buenas prácticas para 3+ apps

1. Definir un **mapa global de rutas** (source of truth).
2. Asignar un `basePath` por app cuando comparten dominio.
3. Centralizar rewrites/proxy en una sola capa (gateway/edge).
4. Estándar de naming para cookies, headers y env vars por app.
5. Contract tests de routing (smoke tests automáticos por subruta).
6. Versionado y deploy desacoplable por app (aunque compartan repo).

## 5) Patrones de despliegue recomendados

### Patrón 1: Un dominio + subrutas (el usado en este MVP)

- `midominio.com/` -> landing
- `midominio.com/portal/*` -> portal
- `midominio.com/app3/*` -> tercera app

**Pros:** experiencia unificada, simple para usuario.  
**Contras:** requiere disciplina fuerte en routing/basePath.

### Patrón 2: Subdominios por app

- `www.midominio.com`
- `portal.midominio.com`
- `app3.midominio.com`

**Pros:** aislamiento alto, menos choques.  
**Contras:** UX menos unificada, más gestión de DNS/cookies/CORS.

### Patrón 3: Gateway/BFF frontal

Un gateway enruta por reglas a varias apps y APIs.

**Pros:** control centralizado, observabilidad unificada.  
**Contras:** complejidad operativa mayor.

## 6) Checklist mínimo antes de agregar una 3ra app

- [ ] Definido namespace de ruta de la nueva app.
- [ ] Confirmado `basePath` (si aplica).
- [ ] Reglas de proxy/rewrite documentadas.
- [ ] Verificado conflicto de rutas reservadas (`/api`, `/_next`, `/auth`).
- [ ] Smoke test de navegación cruzada entre las 3 apps.
- [ ] Revisión de cookies/sesión por path y dominio.
- [ ] Logs/metrics con etiqueta por app.

## 7) Recomendación concreta para este proyecto

Para la próxima app, mantener la estrategia actual pero formalizarla:

- `landing`: raíz `/`
- `portal`: `/portal`
- `app futura`: `/app3` (nombre de negocio real)

Y crear un documento único de "Mapa de rutas del monorepo" que se trate como contrato.  
Eso evita la mayoría de regresiones cuando crece el número de apps.
