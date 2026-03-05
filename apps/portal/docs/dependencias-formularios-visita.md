# Dependencias para reutilizar los formularios de nueva visita

Este documento lista **todos los archivos y dependencias** necesarios para que funcionen en otro proyecto:

- **Formulario reutilizable (empleados):** `formulario-nueva-visita-reutilizable.tsx`
- **Formulario externos (proveedor, cliente, usuario básico, etc.):** `formulario-nueva-visita-externos-reutilizable.tsx`

---

## 1. Imports que usa cada componente

### Formulario reutilizable y formulario externos (ambos usan lo mismo)

```ts
// React
import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

// Iconos
import { ArrowLeft, Plus, Trash2, Upload, FileSpreadsheet } from "lucide-react"

// UI (shadcn-style)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Fechas
import { format } from "date-fns"

// Tipos y estáticos locales (carpeta visitas)
import { ... } from "./types"
import { ... } from "./formulario-visita-estaticos"
```

---

## 2. Archivos que debes copiar (lista completa)

Mantén la misma estructura de carpetas o ajusta los alias `@/` en tu proyecto.

### 2.1 Componentes de visitas (obligatorios)

| Archivo | Descripción |
|---------|-------------|
| `components/visitas/formulario-nueva-visita-reutilizable.tsx` | Formulario para empleados (sin listas de vehículos/conductores cargados). |
| `components/visitas/formulario-nueva-visita-externos-reutilizable.tsx` | Formulario para externos (con selector de vehículos/conductores cargados + modales). |
| `components/visitas/types.ts` | Tipos: `Persona`, `Vehiculo`, `Documento`, `Evento`, `ConfiguracionFormularioVisita`, `DatosFormularioVisita`, etc. |
| `components/visitas/formulario-visita-estaticos.ts` | Valores por defecto de destinos, sitios, tipos de operación/carga/actividad, etc. |

### 2.2 Componentes UI (obligatorios para los formularios)

| Archivo | Usado por |
|---------|-----------|
| `components/ui/button.tsx` | Ambos formularios |
| `components/ui/input.tsx` | Ambos formularios |
| `components/ui/label.tsx` | Ambos formularios |
| `components/ui/select.tsx` | Ambos formularios |
| `components/ui/textarea.tsx` | Ambos formularios |
| `components/ui/checkbox.tsx` | Ambos formularios |
| `components/ui/dialog.tsx` | Ambos formularios |

### 2.3 Utilidad (obligatorio)

| Archivo | Descripción |
|---------|-------------|
| `lib/utils.ts` | Función `cn()` para clases CSS (usada por todos los UI). |

### 2.4 Opcionales (para páginas de ejemplo o flujo completo)

| Archivo | Descripción |
|---------|-------------|
| `components/visitas/mock-data.ts` | Datos de ejemplo: `vehiculosCargadosData`, `conductoresCargadosData`, `personalCargadoData`. Solo necesario si usas el formulario **externos** y quieres datos de prueba. |
| `components/visitas/modal-invitacion-visita.tsx` | Modal que se muestra tras enviar la visita (usado por las **páginas**, no por los formularios). Incluir si quieres el mismo flujo “enviar → ver invitación”. |

---

## 3. Dependencias npm

En tu `package.json` deben estar (o equivalentes compatibles):

```json
{
  "dependencies": {
    "react": "...",
    "next": "...",
    "date-fns": "latest",
    "lucide-react": "^0.454.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "...",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-label": "latest",
    "@radix-ui/react-select": "latest",
    "@radix-ui/react-checkbox": "latest",
    "@radix-ui/react-slot": "latest"
  }
}
```

- **react / next:** entorno del proyecto.
- **date-fns:** `format` para fechas.
- **lucide-react:** iconos (ArrowLeft, Plus, Trash2, Upload, FileSpreadsheet).
- **class-variance-authority (cva), clsx, tailwind-merge:** usados por `button`, `label` y `lib/utils.ts`.
- **@radix-ui/…:** los componentes UI usan Radix (dialog, label, select, checkbox, slot en button).

Si ya usas **shadcn/ui** con Radix, seguramente tienes estas dependencias; solo falta que existan los 7 componentes UI listados arriba.

---

## 4. Cómo usarlos en una página

### Formulario reutilizable (empleados)

```tsx
import { FormularioNuevaVisitaReutilizable } from "@/components/visitas/formulario-nueva-visita-reutilizable"
import type { ConfiguracionFormularioVisita, DatosFormularioVisita } from "@/components/visitas/types"

const config: ConfiguracionFormularioVisita = {
  tipoUsuario: "empleado-compras",
  tiposVisita: ["Laboral", "Transporte Cargas", "Obras/Mantenimiento"],
  permiteTransporteCargas: true,
  permiteObrasMantenimiento: true,
  permiteVisitaRecurrente: true,
  muestraDocumentacion: true,
  muestraPersonaResponsable: true,
  // ... más opciones según necesidad
}

export default function NuevaVisitaPage() {
  return (
    <FormularioNuevaVisitaReutilizable
      configuracion={config}
      backUrl="/empleado-compras/visitas/mis-visitas"
      onSubmit={(datos: DatosFormularioVisita) => {
        console.log(datos)
        // enviar al backend o abrir modal
      }}
    />
  )
}
```

### Formulario externos (proveedor, cliente, usuario básico)

```tsx
import { FormularioNuevaVisitaExternosReutilizable } from "@/components/visitas/formulario-nueva-visita-externos-reutilizable"
import type { ConfiguracionFormularioVisita, DatosFormularioVisita } from "@/components/visitas/types"
import { vehiculosCargadosData, conductoresCargadosData, personalCargadoData } from "@/components/visitas/mock-data"

const config: ConfiguracionFormularioVisita = {
  tipoUsuario: "proveedor",
  tiposVisita: ["Laboral", "Transporte Cargas", "Obras/Mantenimiento", "Servicio a buques"],
  vehiculosCargados: vehiculosCargadosData,
  conductoresCargados: conductoresCargadosData,
  personalCargado: personalCargadoData,
  permiteTransporteCargas: true,
  permiteObrasMantenimiento: true,
  // ...
}

export default function NuevaVisitaPage() {
  return (
    <FormularioNuevaVisitaExternosReutilizable
      configuracion={config}
      backUrl="/proveedor/visitas/mis-visitas"
      onSubmit={(datos: DatosFormularioVisita) => console.log(datos)}
    />
  )
}
```

---

## 5. Resumen: lista de archivos para enviar

**Mínimo para que funcionen los dos formularios:**

```
components/visitas/
  formulario-nueva-visita-reutilizable.tsx
  formulario-nueva-visita-externos-reutilizable.tsx
  types.ts
  formulario-visita-estaticos.ts

components/ui/
  button.tsx
  input.tsx
  label.tsx
  select.tsx
  textarea.tsx
  checkbox.tsx
  dialog.tsx

lib/
  utils.ts
```

**Opcional (recomendado para tener el flujo completo):**

```
components/visitas/
  mock-data.ts
  modal-invitacion-visita.tsx
```

