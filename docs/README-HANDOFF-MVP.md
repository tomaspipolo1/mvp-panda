# README Handoff - MVP Landing + Portal

Este documento resume el contexto del chat para continuar en otro proyecto/ventana de Cursor.

## 1) Objetivo del MVP

Construir un repo MVP unificado con dos apps:

- `landing` (completa)
- `portal` (recortado)

### Alcance funcional MVP

#### Landing
- Landing completa.
- En secciones **Licitaciones**, **Eventos** y **Estadísticas** mostrar:
  - `"Seccion en desarrollo"`

#### Portal
- Solo roles:
  - **Prensa**: Blog, Material descargable, Galería
  - **Contable**: Tarifario
- No incluir otros roles/módulos en MVP.

## 2) Contexto de repositorios

- Repo Portal actual: `D:\Proyectos\Panda\Panda_2025`
- Repo Landing actual: `D:\Proyectos\Panda\PLP_landingPage`
- Repo MVP unificado: `D:\Proyectos\Panda\mvp-panda`

En `mvp-panda` ya existe estructura raíz y documentación base:

- `README.md`
- `docs/MVP_SCOPE.md`
- `docs/CONTEXTO_E_INSTRUCCIONES_MVP.md`
- `package.json` raíz con scripts para ambas apps

## 3) Cómo quiere ejecutarse el MVP

Deseado por usuario:

- Un solo comando: `npm run dev` (o `pnpm dev`) en la raíz de `mvp-panda`
- Una sola URL visible: `http://localhost:3000`
- Acceder al portal por `/portal` (proxy/rewrite interno)

### Modelo técnico sugerido

- Landing corre en `3000`
- Portal corre en `3001` (interno)
- Landing hace rewrite/proxy de `/portal/*` -> `http://localhost:3001/*`

## 4) Contexto de arquitectura (alto nivel)

### Monorepo y operación
- Monorepo en GitHub (según contexto del usuario final)
- Infra AWS, CI/CD, aprobaciones y seguridad ya automatizadas (fuera del alcance de este prototipo)
- Roles/usuarios gestionados con AWS
- Objetivo futuro: UI Admin para gestionar usuarios/roles sin entrar a consola AWS

### Landing (PLP_landingPage) - estado actual
- Next.js App Router (`app/`)
- Menú grande y móvil con múltiples rutas reales
- Secciones/páginas existentes para:
  - Noticias, detalle de noticias
  - Descargas
  - Galería
  - Eventos
  - Tarifario
  - Licitaciones
  - Estadísticas
- Datos mayormente mock/local (sin backend acoplado)
- Auth actual simulado en frontend (`auth-context`)

### Portal (Panda_2025) - estado actual
- Next.js App Router
- Gran cantidad de roles y módulos
- Para MVP recortar a Prensa y Contable únicamente

## 5) Decisiones clave tomadas en chat

1. Mantener repos originales separados (productos finales).
2. Crear repo MVP separado para demo/integración.
3. En `apps/` colocar carpetas completas de landing y portal.
4. Evitar scope creep: MVP solo con módulos que alimentan landing.
5. Prioridad temprana de roles:
   - Prensa -> Blog, Descargas, Galería
   - Contable -> Tarifario
   - Compras -> Licitaciones (mencionado para roadmap, no necesariamente dentro del recorte actual si se marca en desarrollo)

## 6) Estimaciones discutidas

### Opción A (2 FE + 1 BE)
- MVP: 10-12 semanas
- Completo: 6-8 meses

### Opción B (1 FE + 1 BE)
- MVP: 14-18 semanas
- Completo: 10-14 meses

## 7) Prompt de arranque recomendado (copiar/pegar en nuevo chat)

```md
Contexto de trabajo:
- Repo objetivo: `D:\Proyectos\Panda\mvp-panda`
- Monorepo MVP con dos apps:
  - `apps/landing` (copiada desde `D:\Proyectos\Panda\PLP_landingPage`)
  - `apps/portal` (copiada desde Panda_2025)
- Objetivo MVP:
  1) Landing completa
  2) En landing, secciones Licitaciones, Eventos y Estadísticas deben mostrar "Seccion en desarrollo"
  3) Portal solo con roles:
     - Prensa: Blog, Material descargable, Galería
     - Contable: Tarifario
- No ampliar alcance más allá del MVP sin consultarme.

Cómo quiero ejecutarlo:
- Con un solo comando en raíz: `npm run dev` (o `pnpm dev`)
- Usar una sola URL visible: `http://localhost:3000`
- Navegar a portal por `/portal` (proxy/rewrite interno)

Tareas:
1. Auditar estructura y scripts actuales del repo mvp-panda.
2. Implementar rewrites/proxy para exponer portal en `/portal` desde landing.
3. Validar conflictos de rutas/assets entre apps.
4. Dejar checklist de ejecución local y pruebas manuales.
5. Proponer deploy simple para MVP desde monorepo.
```

## 8) Checklist de continuación

- [ ] Verificar scripts root en `mvp-panda`
- [ ] Confirmar puertos 3000/3001
- [ ] Implementar rewrites de `/portal`
- [ ] Aplicar recorte de módulos/roles en portal
- [ ] Aplicar placeholders "Seccion en desarrollo" en landing
- [ ] Test manual completo

