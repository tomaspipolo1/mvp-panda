# Contexto e Instrucciones MVP

## 1) Contexto general

Este repositorio unifica dos apps para demo/prototipo:

- `apps/landing`
- `apps/portal`

Objetivo: trabajar y desplegar MVP desde un solo lugar, sin alternar entre repos separados.

## 2) Alcance funcional del MVP

### Landing

- Landing completa.
- En secciones no implementadas para MVP (por ejemplo Licitaciones/Eventos/Estadisticas), mostrar mensaje:
  - `"Seccion en desarrollo"`

### Portal

Roles habilitados en MVP:

- **Prensa**
  - Blog
  - Material descargable
  - Galeria
- **Contable**
  - Tarifario

Fuera de alcance MVP:

- Resto de roles
- Resto de modulos del portal

## 3) Instrucciones para levantar entorno local

Desde raiz del repo:

1. `pnpm install`
2. `pnpm dev`
3. Abrir:
   - URL unica visible: `http://localhost:3000`
   - Portal (proxy interno): `http://localhost:3000/portal`

## 4) Instrucciones para el chat/asistente (operativas)

Cuando se pida ayuda al chat para este repo:

1. **Confirmar app objetivo** antes de editar:
   - Landing (`apps/landing`) o Portal (`apps/portal`)
2. **No expandir alcance** sin validacion:
   - Mantener recorte MVP
3. **Respetar roles MVP del portal**:
   - Solo Prensa y Contable
4. **No romper rutas/UX actuales** de demo
5. Al finalizar cambios:
   - Revisar errores de lint/build
   - Indicar que se cambio y como probarlo

## 5) Buenas practicas de desarrollo

- Commits chicos y claros por funcionalidad.
- PRs con:
  - objetivo
  - alcance
  - pasos de prueba
  - capturas (si aplica)
- Evitar refactors grandes no solicitados.
- Mantener consistencia visual y de componentes.
- Centralizar textos de placeholders MVP ("Seccion en desarrollo") para facilitar reemplazo.
- No mezclar cambios de landing y portal en el mismo commit si no es necesario.

## 6) Checklist antes de merge

- [ ] Corre `pnpm lint` sin errores bloqueantes.
- [ ] Landing levanta en `:3000`.
- [ ] Portal responde en `/portal` desde `:3000`.
- [ ] Funcionalidad nueva validada manualmente.
- [ ] No se agrego alcance fuera del MVP.

## 7) Proximo paso recomendado

Agregar un documento de "Mapa de rutas MVP" por app:

- rutas activas
- rutas ocultas/deshabilitadas
- responsables por modulo (Prensa/Contable)
