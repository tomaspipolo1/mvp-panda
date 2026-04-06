# Diagramas Mermaid - MVP Panda Monorepo 2026

## 0. Contexto: Monorepo e infraestructura

Este documento refleja el estado real del repositorio `mvp-panda` al día de hoy: dos apps Next.js (`landing` + `portal`) corriendo en paralelo desde un solo monorepo, con una sola URL visible para demo.

### Plataforma y automatización (estado real del repo)


| Aspecto                         | Detalle                                                 |
| ------------------------------- | ------------------------------------------------------- |
| **Repositorio**                 | Monorepo local `mvp-panda`                              |
| **Gestor de paquetes**          | `pnpm@10.12.2` (workspaces `apps/`*)                    |
| **Apps incluidas**              | `apps/landing` + `apps/portal`                          |
| **Comando único de desarrollo** | `pnpm dev` en raíz (levanta ambas apps en paralelo)     |
| **Puertos internos**            | Landing `3000`, Portal `3001`                           |
| **URL pública de demo**         | `http://localhost:3000`                                 |
| **Deploy productivo de MVP**    | Vercel                                                  |
| **URL publicada**               | `https://mvp-panda.vercel.app/`                         |
| **Exposición del portal**       | Subruta `/portal` mediante rewrites en landing          |
| **Scope funcional MVP**         | Landing completa + Portal recortado a Prensa y Contable |


### Landing y Portal en paralelo

La ejecución actual del MVP está centrada en:

- Landing accesible en raíz `/`.
- Portal accesible en `/portal` (proxy interno a `3001`).
- Experiencia de navegación unificada para demo, sin cambiar de dominio.

### Estructura del monorepo

```mermaid
flowchart TB
    subgraph Monorepo["mvp-panda (pnpm workspace)"]
        ROOT["package.json (scripts orquestados)"]
        DOCS["docs/"]
        subgraph Apps["apps/"]
            LAND["landing (Next.js 15)"]
            PORT["portal (Next.js 15)"]
        end
    end

    ROOT --> LAND
    ROOT --> PORT
    DOCS -.-> ROOT
```



### Integración de rutas entre apps

En dev, `apps/landing` reescribe:

- `/portal` -> `http://localhost:3001`
- `/portal/:path*` -> `http://localhost:3001/:path*`

Controlado por:

- `PORTAL_ORIGIN` (default `http://localhost:3001`)
- `ENABLE_LOCAL_PORTAL_PROXY` (activo salvo que sea `"false"`)

En `apps/portal` se usa `assetPrefix: "/portal"` y helpers (`toPortalPath`, `normalizePortalPath`) para asegurar rutas y assets bajo namespace `/portal`.

### Diagrama de integración Frontend

```mermaid
flowchart LR
    U[Usuario Demo] --> L["Landing :3000"]
    L -->|rewrite /portal/*| P["Portal :3001"]

    subgraph URL["URLs visibles"]
        U1["Local: http://localhost:3000"]
        U2["Local: http://localhost:3000/portal"]
        U3["Deploy: https://mvp-panda.vercel.app/"]
        U4["Deploy: https://mvp-panda.vercel.app/portal"]
    end

    U1 --> L
    U2 --> P
    U3 --> L
    U4 --> P
```



### Notas de integración


| Componente                  | Estado                                             | Ubicación                             |
| --------------------------- | -------------------------------------------------- | ------------------------------------- |
| **Monorepo root**           | Operativo con scripts únicos                       | `package.json`, `pnpm-workspace.yaml` |
| **Landing**                 | Completa para demo (con 3 secciones en desarrollo) | `apps/landing`                        |
| **Portal**                  | Recortado en runtime a 2 roles MVP                 | `apps/portal`                         |
| **Deploy**                  | Publicado en Vercel                                | `https://mvp-panda.vercel.app/`       |
| **Auth real backend**       | No integrado en este MVP (flujo demo/simulado)     | Landing + Portal                      |
| **Documentación operativa** | Disponible                                         | `docs/`                               |


---

## 1. Arquitectura general del proyecto (MVP actual)

```mermaid
flowchart TB
    subgraph Stack["Stack tecnológico"]
        NEXT["Next.js 15.2.8"]
        REACT["React 19"]
        TAILWIND["Tailwind CSS"]
        RADIX["Radix UI"]
    end

    subgraph Root["Root monorepo"]
        R_SCRIPTS["dev/build/lint orquestados"]
        R_WS["pnpm workspace apps/*"]
    end

    subgraph Landing["apps/landing"]
        L_APP["app/"]
        L_COMP["components/"]
        L_PROXY["rewrites /portal -> :3001"]
    end

    subgraph Portal["apps/portal"]
        P_APP["app/ + (user-pages)/"]
        P_COMP["components/"]
        P_GUARD["layout bloquea rutas fuera de Prensa/Contable"]
        P_ASSET["assetPrefix /portal + portal-path.ts"]
    end

    NEXT --> Landing
    NEXT --> Portal
    Root --> Landing
    Root --> Portal
    L_PROXY --> Portal
    P_GUARD --> P_APP
```



Puntos técnicos claves:

- El portal contiene muchas rutas históricas, pero el layout MVP permite navegación solo a:
  - `/empleado-prensa/*`
  - `/empleado-contable/*`
- Si se ingresa a otra ruta del portal, redirige automáticamente a `/portal/empleado-prensa`.

## 2. Portales y roles de usuario

```mermaid
flowchart LR
    subgraph Landing["Landing Pública"]
        LP["Navegación institucional/comercial/comunidad"]
    end

    subgraph PortalMVP["Portal habilitado en MVP (runtime)"]
        PR["Empleado - Prensa"]
        CO["Empleado - Contable"]
    end

    subgraph PortalCode["Roles presentes en código (fuera de alcance MVP)"]
        EX["Proveedor, Cliente, Usuario Básico, ESP, Compras, Seguridad, RRHH, Legales, Admin, etc."]
    end

    Landing --> PortalMVP
    EX -. rutas existentes pero bloqueadas .-> PortalMVP
```



## 3. Módulos por portal (vista simplificada)

```mermaid
flowchart TB
    subgraph Landing["Landing (MVP)"]
        L_INI["Inicio / Home"]
        L_INST["Institucional"]
        L_SERV["Servicios y Negocios"]
        L_COM["Comunicación"]
        L_COMU["Comunidad y visitas"]
        L_CAL["Calidad y sostenibilidad"]
        L_INNOV["Innovación y futuro"]
        L_DEV["Licitaciones + Eventos + Estadísticas = en desarrollo"]
    end

    subgraph Prensa["Portal Empleado - Prensa (MVP)"]
        P_INI["Inicio"]
        P_BLOG["Blog"]
        P_DOC["Material descargable"]
        P_GAL["Galería"]
    end

    subgraph Contable["Portal Empleado - Contable (MVP)"]
        C_INI["Inicio"]
        C_TAR["Tarifario"]
    end

    P_BLOG --> L_COM
    P_DOC --> L_COM
    P_GAL --> L_COM
    C_TAR --> L_SERV
```



## 4. Flujo de datos y capas

```mermaid
flowchart TB
    subgraph UX["Capa de experiencia"]
        LAND_UI["Landing UI"]
        PORT_UI["Portal UI"]
    end

    subgraph Routing["Capa de enrutamiento"]
        REW["Landing rewrites /portal/*"]
        PREF["Portal path helpers + assetPrefix"]
        GUARD["Guard de rutas MVP en layout"]
    end

    subgraph Data["Capa de datos MVP"]
        MOCK["Mocks / datos estáticos locales"]
        CLIENT["Estado client-side (React)"]
    end

    LAND_UI --> REW
    REW --> PORT_UI
    PORT_UI --> PREF
    PORT_UI --> GUARD
    LAND_UI --> MOCK
    PORT_UI --> MOCK
    LAND_UI --> CLIENT
    PORT_UI --> CLIENT
```



Observaciones:

- Este MVP no está acoplado a una API backend productiva en todos los módulos.
- Hay componentes/pantallas con datos simulados para demostración funcional.

## 5. Estructura de carpetas principal

```mermaid
flowchart LR
    subgraph root["mvp-panda/"]
        r_app["apps/"]
        r_docs["docs/"]
        r_pkg["package.json"]
        r_ws["pnpm-workspace.yaml"]
    end

    subgraph apps["apps/"]
        a_land["landing/"]
        a_port["portal/"]
    end

    subgraph landing["apps/landing"]
        l_app["app/ (rutas públicas)"]
        l_comp["components/"]
        l_cfg["next.config.mjs (rewrites /portal)"]
    end

    subgraph portal["apps/portal"]
        p_app["app/ + (user-pages)/"]
        p_comp["components/ (header/sidebar)"]
        p_lib["lib/portal-path.ts"]
        p_cfg["next.config.mjs (assetPrefix /portal)"]
    end

    root --> apps
    root --> r_docs
    apps --> landing
    apps --> portal
```



## 6. Entidades de negocio (dominio MVP)

```mermaid
erDiagram
    ROL_MVP ||--o{ MODULO_PORTAL : habilita
    MODULO_PORTAL ||--o{ CONTENIDO : gestiona
    CONTENIDO ||--o{ SECCION_LANDING : publica
    LANDING_PAGE ||--o{ SECCION_LANDING : contiene

    ROL_MVP {
        string nombre
    }
    MODULO_PORTAL {
        string nombre
        string rutaBase
    }
    CONTENIDO {
        string tipo
        string estado
    }
    SECCION_LANDING {
        string nombre
        string estado
    }
```



Modelo MVP real:

- Roles habilitados: **Empleado - Prensa**, **Empleado - Contable**.
- Contenido operativo para demo:
  - Prensa: blog, documentación/descargas, galería.
  - Contable: tarifario.
- Secciones explícitamente en desarrollo en landing:
  - Licitaciones (`/licitaciones`)
  - Eventos (`/comunidad/eventos`)
  - Estadísticas (`/estadisticas`)

## 7. Navegación Sidebar -> Rutas

```mermaid
flowchart TD
    U[Usuario] --> L["Landing /"]
    L -->|Portal usuario| P["/portal/empleado-prensa"]

    P --> H[Header: selector de tipo de usuario]
    H -->|Prensa| R1["/portal/empleado-prensa/*"]
    H -->|Contable| R2["/portal/empleado-contable/*"]

    R3["Cualquier otra ruta del portal"] --> G["Guard layout MVP"]
    G --> R1
```



Notas:

- El `Sidebar` tiene definición amplia de roles, pero en runtime toma solo el set MVP (`mvpUserModules`).
- El `Header` del portal solo permite cambiar entre Prensa y Contable.

---

## 8. Módulos por portal desmenuzado

### 8.1 Proveedor


| Estado MVP           | Detalle                                                                                |
| -------------------- | -------------------------------------------------------------------------------------- |
| **Fuera de alcance** | Existen rutas/páginas en código, pero el guard de layout no permite navegación en MVP. |


### 8.2 Cliente


| Estado MVP           | Detalle                                                                 |
| -------------------- | ----------------------------------------------------------------------- |
| **Fuera de alcance** | Existen rutas/páginas en código, pero no habilitadas en navegación MVP. |


### 8.3 Usuario Básico


| Estado MVP           | Detalle                                                             |
| -------------------- | ------------------------------------------------------------------- |
| **Fuera de alcance** | Existen rutas/páginas en código, bloqueadas por guard de rutas MVP. |


### 8.4 Empresa Servicios Portuarios


| Estado MVP           | Detalle                                                      |
| -------------------- | ------------------------------------------------------------ |
| **Fuera de alcance** | Rutas presentes en código, no habilitadas en flujo demo MVP. |


### 8.5 Empleado - Compras


| Estado MVP                     | Detalle                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------- |
| **Fuera de alcance funcional** | Módulos históricos existen en código, pero no se exponen en sidebar ni selector de usuario MVP. |


### 8.6 Empleado - Prensa


| Módulo MVP                        | Submódulos / Pantallas                                                                                                       |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Inicio**                        | Dashboard base de Prensa                                                                                                     |
| **Blog**                          | Mis post, nuevo post, editar, detalle                                                                                        |
| **Material descargable**          | Gestión documental para descargas                                                                                            |
| **Galería**                       | Gestión de imágenes                                                                                                          |
| **Rutas relacionadas existentes** | Calendario, buzones, solicitudes, visitas, perfil (presentes en código; no todas forman parte del alcance funcional de demo) |


### 8.7 Empleado - Seguridad


| Estado MVP           | Detalle                                                        |
| -------------------- | -------------------------------------------------------------- |
| **Fuera de alcance** | Existe implementación, no habilitada por navegación/guard MVP. |


### 8.8 Empleado - Mesa de Entradas


| Estado MVP           | Detalle                                              |
| -------------------- | ---------------------------------------------------- |
| **Fuera de alcance** | Módulos no habilitados en la experiencia MVP actual. |


### 8.9 Empleado - Contable


| Módulo MVP                        | Submódulos / Pantallas                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Inicio**                        | Dashboard base de Contable                                                                                                            |
| **Tarifario**                     | Gestión/visualización de tarifas                                                                                                      |
| **Rutas relacionadas existentes** | Calendario, buzones, solicitudes, proveedores, clientes, visitas, perfil (presentes en código; no todas incluidas en recorte de demo) |


### 8.10 Empleado - RRHH


| Estado MVP           | Detalle                                                 |
| -------------------- | ------------------------------------------------------- |
| **Fuera de alcance** | Rutas disponibles en código, no expuestas en flujo MVP. |


### 8.11 Empleado - Legales


| Estado MVP           | Detalle                       |
| -------------------- | ----------------------------- |
| **Fuera de alcance** | No habilitado en runtime MVP. |


### 8.12 Admin


| Estado MVP           | Detalle                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------- |
| **Fuera de alcance** | Existen pantallas de administración en código, pero no habilitadas en navegación MVP actual. |


---

## 9. Orden de prioridad de desarrollo (etapas)

### Responsable por rol (quién desarrolla qué en este MVP)


| Rol                      | Módulos foco                                              | Prioridad |
| ------------------------ | --------------------------------------------------------- | --------- |
| **Empleado - Prensa**    | Blog, Material descargable, Galería                       | 1         |
| **Empleado - Contable**  | Tarifario                                                 | 2         |
| **Frontend transversal** | Integración landing-portal, navegación, coherencia visual | 3         |
| **QA funcional MVP**     | Flujos de demo y validación de rutas recortadas           | 4         |


### Diagrama rol -> módulos (MVP real)

```mermaid
flowchart TB
    subgraph Prensa["Empleado - Prensa"]
        PB["Blog"]
        PM["Material descargable"]
        PG["Galería"]
    end

    subgraph Contable["Empleado - Contable"]
        CT["Tarifario"]
    end

    subgraph Landing["Landing"]
        LB["Comunicación / Noticias"]
        LD["Descargas"]
        LG["Galería"]
        LT["Tarifario"]
    end

    PB --> LB
    PM --> LD
    PG --> LG
    CT --> LT
```



### Diagrama de prioridad de módulos (orden de desarrollo)

```mermaid
flowchart LR
    P1["1. Integración monorepo y /portal"]
    P2["2. Recorte de navegación MVP"]
    P3["3. Prensa: Blog"]
    P4["4. Prensa: Descargas"]
    P5["5. Prensa: Galería"]
    P6["6. Contable: Tarifario"]
    P7["7. Placeholders Landing (Licitaciones/Eventos/Estadísticas)"]
    P8["8. Hardening demo + QA"]

    P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7 --> P8
```



### Diagrama de etapas (bloques) con roles

```mermaid
flowchart TB
    subgraph Etapa1["Etapa 1 - Base técnica"]
        E1["Monorepo + scripts + rewrites + assetPrefix"]
    end

    subgraph Etapa2["Etapa 2 - Portal MVP"]
        E2A["Prensa"]
        E2B["Contable"]
    end

    subgraph Etapa3["Etapa 3 - Landing MVP"]
        E3A["Secciones productivas"]
        E3B["Secciones en desarrollo"]
    end

    subgraph Etapa4["Etapa 4 - Cierre demo"]
        E4["Pruebas E2E manuales + estabilización"]
    end

    Etapa1 --> Etapa2 --> Etapa3 --> Etapa4
```



### Tabla de prioridad de módulos (con rol responsable)


| #     | Etapa     | Módulo                            | Rol responsable | Justificación                                         |
| ----- | --------- | --------------------------------- | --------------- | ----------------------------------------------------- |
| **1** | Base      | Proxy `/portal` + helpers de path | Frontend        | Habilita convivencia de apps en una URL.              |
| **2** | Base      | Guard de rutas MVP                | Frontend        | Evita scope creep en demo.                            |
| **3** | Contenido | Blog                              | Prensa          | Activo y visible para demo institucional.             |
| **4** | Contenido | Material descargable              | Prensa          | Módulo de valor público directo.                      |
| **5** | Contenido | Galería                           | Prensa          | Refuerza narrativa visual de landing.                 |
| **6** | Contenido | Tarifario                         | Contable        | Requisito funcional explícito del recorte MVP.        |
| **7** | Landing   | Secciones en desarrollo           | Frontend        | Asegura consistencia del alcance sin ocultar roadmap. |
| **8** | Cierre    | QA funcional demo                 | QA / Frontend   | Reduce riesgo de fallos en presentación.              |


---

## 10. Estimación de tiempos y responsabilidades

Escenarios orientados al cierre y estabilización del MVP vigente.

### Opción A: 2 Frontend + 1 QA

#### MVP (Opción A)


| Rol            | Responsabilidades                                   | Estimación  |
| -------------- | --------------------------------------------------- | ----------- |
| **Frontend 1** | Landing (ajustes, placeholders, navegación pública) | 1-2 semanas |
| **Frontend 2** | Portal MVP (Prensa/Contable, guard y rutas)         | 2-3 semanas |
| **QA**         | Casos de prueba end-to-end de demo                  | 1 semana    |


**Total Opción A: 3-4 semanas**

### Opción B: 1 Frontend fullstack UX

#### MVP (Opción B)


| Rol                    | Responsabilidades                         | Estimación  |
| ---------------------- | ----------------------------------------- | ----------- |
| **Frontend único**     | Landing + Portal + estabilización de demo | 4-6 semanas |
| **Soporte QA parcial** | Verificación manual guiada                | 0.5 semana  |


**Total Opción B: 4-6.5 semanas**

### Resumen comparativo


| Hito                      | Opción A    | Opción B      |
| ------------------------- | ----------- | ------------- |
| **Cierre MVP**            | 3-4 semanas | 4-6.5 semanas |
| **Riesgo operativo**      | Bajo-medio  | Medio         |
| **Capacidad de paralelo** | Alta        | Baja          |


---

## 11. Propuesta de MVP (Minimum Viable Product)

### Alcance del MVP sugerido (landing + portal recortado)


| Incluir en MVP                                                             | No incluir en MVP (siguiente etapa)                           |
| -------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Landing completa navegable                                                 | Habilitación de roles extra del portal                        |
| Placeholder "Seccion en desarrollo" en Licitaciones, Eventos, Estadísticas | Operación funcional de esos 3 módulos                         |
| Portal con dos roles habilitados (Prensa y Contable)                       | Rutas de Proveedor, Cliente, Usuario Básico, ESP, Admin, etc. |
| Prensa: Blog + Descargas + Galería                                         | Flujos integrales de solicitudes/visitas/facturación          |
| Contable: Tarifario                                                        | Gobernanza completa de usuarios/roles productiva              |


### Diagrama MVP

```mermaid
flowchart TB
    subgraph Landing["Landing :3000"]
        L0["Home y secciones públicas"]
        L1["Comunicación (noticias/descargas/galería)"]
        L2["Tarifario"]
        L3["Licitaciones/Eventos/Estadísticas -> Seccion en desarrollo"]
        L4["Acceso a /portal"]
    end

    subgraph Portal["Portal :3001 (vía /portal)"]
        P1["Empleado - Prensa"]
        P2["Empleado - Contable"]
        G["Guard rutas MVP"]
    end

    L4 --> P1
    L4 --> P2
    G --> P1
    G --> P2
```



### Resumen MVP en una frase

> **MVP actual**: monorepo con una sola URL pública donde la landing está completa para demo, tres secciones se muestran explícitamente en desarrollo, y el portal queda recortado en runtime a los roles Prensa y Contable bajo `/portal`.

### Criterios de éxito para salida productiva del MVP

1. El MVP está desplegado en **AWS** con infraestructura estable (frontend + backend + networking + SSL).
2. La URL pública oficial `https://puertolaplata.com` responde correctamente y sirve la landing sin errores críticos.
3. La subruta `https://puertolaplata.com/portal` expone el portal correctamente, sin conflictos de rutas ni assets.
4. El frontend está conectado al backend productivo y las funcionalidades clave operan con datos reales.
5. El portal mantiene el recorte MVP de navegación (Prensa y Contable), sin fuga a roles fuera de alcance.
6. Blog, Descargas, Galería y Tarifario funcionan end-to-end (alta/edición/visualización) sobre backend.
7. Licitaciones, Eventos y Estadísticas respetan el estado definido para MVP en ambiente productivo.
8. Monitoreo, logs y alertas mínimas están activos en AWS para detectar caídas y errores críticos.
9. Existe checklist de smoke tests productivos validado post-deploy sobre `puertolaplata.com`.

---

