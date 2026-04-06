# Entrevista Frontend MVP - Preguntas Seleccionadas y Respuestas

Este documento contiene unicamente las preguntas seleccionadas y su respuesta modelo, aterrizadas al contexto de `mvp-panda`.

---

## 1) Arquitectura y contexto real del proyecto

### 1. En un monorepo con dos apps Next.js (`landing` y `portal`), como organizarias cambios para no romper una app mientras tocas la otra?
**Respuesta:**  
Separaria el trabajo por app y por objetivo. Haria PRs chicos y tematicos (por ejemplo: "routing portal", "integracion blog", "ajuste landing"), evitando mezclar cambios de `landing` y `portal` salvo que sea estrictamente necesario.  
Ademas, pondria una verificacion minima obligatoria por cada cambio:
- Smoke test `landing`: `/` y rutas publicas clave.
- Smoke test `portal`: `/portal`, cambio de rol Prensa/Contable, y rutas principales.
- Validacion de navegacion cruzada landing -> portal y portal -> landing.

Si hay codigo compartido (helpers de rutas, cliente API, tipos), lo centralizo y versiono con cuidado para evitar divergencias.

### 2. Como manejarias configuracion por entorno (local, dev, prod) para URLs de backend y portal?
**Respuesta:**  
Usaria variables por entorno y una capa de config central (no URLs hardcodeadas). Ejemplo de variables:
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_PORTAL_BASE_PATH=/portal`
- `PORTAL_ORIGIN` (para rewrites internos cuando aplique)
- Flags de entorno (`NODE_ENV`, feature flags)

Reglas:
- Local: backend local y portal local.
- Dev/staging: backend de staging y dominio de prueba.
- Prod: backend productivo y dominio `https://puertolaplata.com`.

Tambien agregaria una validacion al iniciar la app para detectar variables faltantes y evitar deploys rotos.

---

## 2) Next.js / routing / navegacion

### 1. Como harias que links internos funcionen bien cuando hay basePath/prefijo (`/portal`)?
**Respuesta:**  
No usaria strings de ruta "a mano" en toda la app. Centralizaria helpers (como `toPortalPath`) y obligaria a que `Link` y `router.push` pasen por esa utilidad.  
Esto evita errores tipicos:
- rutas dobles (`/portal/portal/...`)
- rutas sin prefijo
- assets que apuntan fuera del namespace

Adicionalmente, validaria deep-links directos y refresco de pagina para asegurar que App Router y el servidor resuelven correctamente.

---

## 3) Integracion con backend (clave para lo que necesitan ahora)

### 1. Como estructuras el consumo de APIs para que sea mantenible (servicios, hooks, tipos, manejo de errores)?
**Respuesta:**  
Armo una capa por dominio, por ejemplo:
- `services/blog.service.ts`
- `services/tarifario.service.ts`
- `services/auth.service.ts`

Y arriba de eso, hooks de UI:
- `useBlogPosts()`, `useTarifario()`, etc.

Siempre con:
- Tipos compartidos (`types/` o schemas)
- Manejo de errores uniforme (normalizador de errores API)
- Timeouts y cancelacion de requests donde corresponda
- Sin `fetch` suelto en componentes de pantalla

Asi mantenes desacople entre UI y transporte.

### 2. Que patron usas para estados de loading/error/empty/success en modulos como Blog o Tarifario?
**Respuesta:**  
Uso una maquina de estados simple y explicita por vista:
- `loading`: skeleton o spinner con texto claro
- `error`: mensaje + reintento
- `empty`: estado vacio con CTA
- `success`: render normal de datos

Esto lo aplico de forma consistente en todos los modulos para que la UX no cambie segun la pantalla.

### 3. Como abordarias autenticacion y autorizacion por rol cuando el frontend esta conectado al backend real? (tenemos autenticacion local y por AWS Cognito)
**Respuesta:**  
Lo resolveria en dos capas:

1) **Autenticacion**  
- Local: mantiene flujo de demo/desarrollo rapido.  
- Cognito: flujo real productivo (login, tokens, expiracion, claims).

2) **Autorizacion por rol**  
- El frontend controla navegacion/UX (que menus mostrar, guard de rutas).  
- El backend valida permisos reales en cada endpoint (fuente de verdad).

Tambien mantendria un "modo local" y "modo cognito" por flag de entorno para no frenar desarrollo y asegurar paridad en staging/prod.

### 4. Como manejarias refresh de sesion/token expirado sin degradar experiencia?
**Respuesta:**  
Implementaria un wrapper/interceptor de requests:
- Si llega 401 por expiracion, intenta refresh una sola vez.
- Mientras refresca, encola requests concurrentes.
- Si refresh ok, reintenta requests pendientes.
- Si refresh falla, logout limpio y redireccion a login.

Con esto evitas pantallas rotas, loops infinitos y mala UX.

---

## 4) Calidad

### 1. Que estrategia de testing propones para este MVP (unitario, integracion, e2e)?
**Respuesta:**  
Estrategia pragmatica:
- **Unitario**: utilidades criticas (helpers de rutas, normalizadores de errores, auth helpers).
- **Integracion**: modulos clave (Blog, Tarifario, login/rol).
- **E2E smoke**: rutas y flujos minimos (`/`, `/portal`, cambio de rol, modulo principal por rol).

Objetivo: cobertura inteligente en lo critico, sin frenar entrega.

### 2. Si manana aparece un bug en produccion solo en `/portal`, como lo diagnosticarias rapido?
**Respuesta:**  
Checklist rapido:
1. Reproducir en prod con pasos exactos.
2. Revisar consola/red (errores JS, 4xx/5xx, assets 404).
3. Verificar si falla routing, auth o backend.
4. Comparar con staging para aislar diferencia de entorno.
5. Revisar ultimos deploys/commits tocando portal.
6. Si impacto alto: feature flag o rollback parcial mientras se corrige.

La clave es aislar capa afectada en minutos (frontend, proxy/routing o backend).

### 3. Que harias para capturar errores en produccion? (logging, monitoreo, trazabilidad)
**Respuesta:**  
Implementaria minimo:
- **Logging estructurado** frontend + backend (con correlation/request id).
- **Monitoreo** de errores y disponibilidad (alertas por umbral).
- **Trazabilidad** de requests criticos (auth, blog, tarifario).
- **Dashboard** de salud (error rate, latencia, endpoints con mas fallas).

Asi podes detectar, priorizar y corregir incidentes sin depender de reportes manuales.

---

## 5) Performance

### 1. Como decidirias que renderizar en server/client en App Router?
**Respuesta:**  
Regla base: **Server Components por defecto** y Client Components solo donde hay interaccion/estado de navegador.

Criterio practico:
- Server: contenido inicial, fetch de datos que no requiere interaccion inmediata.
- Client: formularios, modales, tablas interactivas, estados locales, eventos UI.

Objetivo: menos JS enviado al browser, mejor performance inicial y mejor SEO donde aplique.

---

## 6) Preguntas no tecnicas

### 1. Que necesitas del equipo para rendir bien desde la primera semana?
**Respuesta:**  
Necesito:
- Contexto funcional claro (que entra y que no entra en MVP)
- Acceso a repos, ambientes y credenciales necesarias
- Referente tecnico para decisiones rapidas
- Criterio de "done" acordado (tecnico + funcional)

Con eso puedo empezar a entregar valor desde la primera semana sin retrabajo.

### 2. Como priorizas cuando te piden 10 cosas y solo entran 3 en la semana?
**Respuesta:**  
Priorizo por:
1. Impacto en objetivo de negocio/MVP.
2. Riesgo productivo (lo que puede romper o bloquear).
3. Dependencias (lo que habilita trabajo posterior).

Propongo una terna cerrada para la semana (3 items), dejo visibles los 7 restantes con razon de no ingreso, y alineo expectativas con negocio/producto.

---

Fin del documento.
