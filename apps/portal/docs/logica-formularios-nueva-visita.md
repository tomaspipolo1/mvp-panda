# Lógica de los formularios "Nueva Visita" (empleados y reutilizable)

## Resumen ejecutivo

- **Formulario reutilizable**: Un solo componente configurable por `ConfiguracionFormularioVisita`; hoy solo se usa en **usuario-básico** (completar visita).
- **Formulario empleado prensa**: Formulario específico y simple; **no se usa en ninguna ruta**.
- **Formulario empleado compras**: Formulario específico (tipos de visita, fechas, personas, vehículos); **no se usa en ninguna ruta**.
- **Página empleado-compras nueva-visita**: Contiene un formulario **duplicado e inline** de ~2400 líneas, con más campos que el componente `FormularioNuevaVisitaEmpleadoCompras` (destino, Transporte Cargas, Obras, proveedores, documentos, modal invitación). **Sí se puede** reemplazar por el componente de compras si se acepta un flujo más simple, o unificar vía el reutilizable con un nuevo `tipoUsuario`.

---

## 1. `formulario-nueva-visita-reutilizable.tsx`

### Propósito
Un único formulario que cambia de comportamiento según una **configuración** (`ConfiguracionFormularioVisita`). Evita duplicar lógica entre usuario-básico, proveedor y (en tipos) cliente y empresa-servicios-portuarios.

### Props
| Prop | Tipo | Descripción |
|------|------|-------------|
| `configuracion` | `ConfiguracionFormularioVisita` | Define tipo de usuario, tipos de visita, destinos, flags y datos cargados (vehículos, conductores, personal). |
| `backUrl` | string | URL para el botón "Volver". |
| `onSubmit` | `(datos: DatosFormularioVisita) => void \| Promise<void>` | Se llama al enviar con los datos normalizados. |
| `onCancel` | `() => void` | Opcional; al cancelar. |
| `modoEdicion` | boolean | Si es true, el formulario se usa para editar (ej. completar visita). |
| `datosPrecargados` | `Partial<DatosFormularioVisita>` | Valores iniciales en modo edición. |

### Lógica interna (resumida)

1. **Estado**: Todo el estado del formulario vive dentro del componente (tipo visita, destino, evento, fechas/horas, personas, vehículos, documentos, secciones específicas como Transporte Cargas u Obras/Mantenimiento, etc.).

2. **Configuración**:
   - `configuracion.tipoUsuario`: hoy se usa `"usuario-basico"` y `"proveedor"`. El tipo controla:
     - Qué tipos de visita se muestran.
     - Si hay selector de evento (usuario-básico).
     - Si hay “personal a visitar” (Laboral).
     - Si hay autocompletado de personal (proveedor).
     - Si se muestran vehículos/conductores cargados.
   - `configuracion.permiteEventos`, `permiteTransporteCargas`, `permiteObrasMantenimiento`, `permiteAccesoMuelle`, `permiteVisitaRecurrente`, etc.: muestran u ocultan bloques (Evento, Transporte Cargas, Obras/Mantenimiento, Acceso a Muelle, recurrencia).
   - `configuracion.opcionesDestino`: mapeo `tipoVisita -> string[]` de destinos.
   - Listas opcionales: `eventosDisponibles`, `vehiculosCargados`, `conductoresCargados`, `personalCargado`, `personasResponsables`, etc.

3. **Validación** (`validateForm`): Depende de `tipoUsuario` y tipo de visita:
   - Usuario-básico: evento o destino, personal a visitar (Laboral), al menos una persona (Laboral/Guiada).
   - Proveedor: destino (salvo Obras/Mantenimiento), reglas para Obras/Mantenimiento (tipo actividad, actividad, contratación, expediente/orden de compra), para Transporte Cargas (operación, tipo carga, empresa o conductor/vehículo), persona responsable en ciertos destinos.
   - Común: fechas/horas, días de la semana si visita recurrente.

4. **Envío**: Arma un objeto `DatosFormularioVisita` (tipoVisita, destino, fechas, personas, vehículos, documentos, observaciones, y campos opcionales según flags) y llama a `onSubmit(datos)`.

5. **Dónde se usa**: Solo en **usuario-básico** → `app/(user-pages)/usuario-basico/visitas/mis-visitas/[id]/completar/page.tsx`, con `modoEdicion={true}` y `datosPrecargados` para completar una visita existente.

### Conclusión reutilizable
- Sigue una **lógica clara**: un formulario, muchas variantes por configuración.
- **No** incluye actualmente un rol “empleado-compras” ni “empleado-prensa”; se podría extender con un nuevo `tipoUsuario` y una config específica si se quiere unificar todo ahí.

---

## 2. `formulario-nueva-visita-empleado-prensa.tsx`

### Propósito
Formulario específico para **empleado prensa**: datos del visitante (nombre, apellido, DNI, email, teléfono, empresa), motivo, fecha/hora, sector, tipo de visita y observaciones.

### Props
| Prop | Tipo | Descripción |
|------|------|-------------|
| `personas` | `Persona[]` | Lista de personas (el componente no las modifica; recibe desde fuera). |
| `onSubmit` | `(data: any) => void` | Callback con los datos del formulario. |
| `submitted` | boolean | Indica si ya se intentó enviar (para mostrar errores). |
| `errors` | object | Errores por campo (manejados fuera). |

### Lógica
- Tipos de visita: **Laboral**, **Visita Guiada**, **Visita de tipo Evento**.
- Si es “Visita Guiada”: campo obligatorio **coordinador de visita** (selector).
- Si es “Visita de tipo Evento”: **nombre del evento** y **descripción**.
- Validación local en `validateForm`; el componente no hace submit del form completo (solo llama `onSubmit` con los datos).
- **No se usa en ninguna ruta** (no hay import en ninguna página).

---

## 3. `formulario-nueva-visita-empleado-compras.tsx`

### Propósito
Formulario específico para **empleado compras**: más simple que la página actual de nueva visita de compras. Incluye tipo de visita, rango de fechas/horas, persona visitada (solo Laboral), lista de personas y de vehículos, y observaciones.

### Props
| Prop | Tipo | Descripción |
|------|------|-------------|
| `onSubmit` | `(data: any) => void` | Se llama con los datos al enviar. |
| `onCancel` | `() => void` | Al cancelar (ej. volver a listado). |

### Lógica
- **Tipos de visita**: Laboral, Guiada, Evento, Materiales, Acceso a Obra, Acceso a Muelle.
- **Persona visitada**: solo visible y obligatoria si tipo = "Laboral" (`useEffect` que setea `showPersonaVisitada`).
- **Personas**: array `{ nombre, documento, empresa }`; agregar/quitar con validación mínima (nombre y documento).
- **Vehículos**: array `{ tipo, patente, modelo }`; agregar/quitar (tipo y patente obligatorios).
- **Validación en submit**: fechas desde/hasta, persona visitada si Laboral, al menos una persona.
- **Payload** que envía: `tipoVisita`, `fechaDesde`, `horaDesde`, `fechaHasta`, `horaHasta`, `personaVisitada` (o null), `personas`, `vehiculos`, `observaciones`.
- **No se usa en ninguna ruta**; la pantalla de empleado-compras implementa su propio formulario inline.

---

## 4. Página `empleado-compras/visitas/nueva-visita/page.tsx`

### Qué hace hoy
- Formulario **completo inline** (~2400 líneas) con:
  - Tipo de visita y **destino** (y destinos múltiples).
  - **Transporte Cargas**: operación, tipo de carga, empresa transporte, terciarizado, búsqueda de proveedor (razón social, CUIT, email, teléfono).
  - **Obras/Mantenimiento** y persona responsable.
  - Acceso a muelle, persona responsable del puerto.
  - Fechas/horas, personal a visitar, personas (con más campos: email, teléfono, licencia, etc.), **vehículos y conductores** con modales de alta y listas “cargados”.
  - Documentos adjuntos, visita recurrente, días de la semana, observaciones.
- Al enviar: valida con `validateForm()`, arma un objeto con todos esos campos + `id` simulado, hace `setDatosVisitaActual(visitaConId)` y `setModalAbierto(true)`.
- **Modal de invitación** (`ModalInvitacionVisita`): recibe `datosVisita` (con `id` y opcionalmente `fechaDesde`); al cerrar redirige a mis-visitas.

### Comparación con el componente de compras
- El **componente** `FormularioNuevaVisitaEmpleadoCompras` es más simple: no tiene destino, Transporte Cargas, Obras, proveedores, documentos, ni modales de vehículo/conductor; solo tipo visita, fechas, persona visitada (Laboral), personas, vehículos y observaciones.
- La **página** tiene muchas más secciones y flujos. Por tanto:
  - **Reemplazar la página por el componente tal cual** implica **simplificar** el flujo (menos campos y menos tipos de visita/destino).
  - Si se quiere **mantener** toda la funcionalidad actual de la página, no basta con usar el componente sin cambios; habría que o bien extender el componente de compras, o bien usar el **reutilizable** añadiendo un `tipoUsuario` "empleado-compras" (o "empleado") y una config que refleje los mismos bloques que la página actual.

---

## 5. ¿Se puede usar uno de los componentes en la pantalla de compras?

### Opción A: Usar `FormularioNuevaVisitaEmpleadoCompras` (reemplazo simple)
- **Sí**, se puede usar en `empleado-compras/visitas/nueva-visita/page.tsx` y eliminar el formulario inline.
- La página quedaría reducida a: layout, `FormularioNuevaVisitaEmpleadoCompras` con `onSubmit` / `onCancel`. En `onSubmit` se arma un objeto con `id` (ej. `VIS-...`), se setea en el estado y se abre `ModalInvitacionVisita`; `onClose` del modal redirige a mis-visitas.
- **Contras**: Se pierden destino, Transporte Cargas, Obras, proveedores, documentos, alta de vehículos/conductores en modales. Solo tendrás el flujo “simple” del componente (tipo visita, fechas, persona visitada, personas, vehículos, observaciones).

### Opción B: Extender el reutilizable para empleado-compras
- Añadir en `types.ts` un tipo de usuario (ej. `"empleado-compras"` o `"empleado"`) y armar una `ConfiguracionFormularioVisita` que refleje los mismos tipos de visita y bloques que la página actual.
- En `formulario-nueva-visita-reutilizable.tsx` agregar ramas `configuracion.tipoUsuario === "empleado-compras"` en validación y en el JSX (destino, Transporte Cargas, Obras, etc.) reutilizando la misma lógica que para proveedor donde aplique.
- La página de nueva visita de compras pasaría a ser: config + `FormularioNuevaVisitaReutilizable` + manejo del modal de invitación. Así se **unifica** la lógica en un solo formulario configurable.

### Opción C: Mantener la página y solo extraer partes a componentes
- Sin reemplazar todo el formulario: ir sacando bloques (Transporte Cargas, Obras, Proveedor, etc.) a subcomponentes y seguir usando la página como orquestador. No se reutiliza ninguno de los tres formularios existentes como “pantalla completa”.

---

## 6. Recomendación

- Si el flujo que necesitas para **empleado-compras** es el **simple** (tipo visita, fechas, persona visitada, personas, vehículos, observaciones): **Opción A** — usar `FormularioNuevaVisitaEmpleadoCompras` en la página y conectar el modal de invitación.
- Si necesitas **mantener** destino, Transporte Cargas, Obras, proveedores y documentos: **Opción B** — extender el reutilizable con un rol empleado-compras y una config que replique la página actual, y que la página solo renderice ese componente + modal.

Si indicas si quieres simplificar (A) o mantener toda la funcionalidad (B), se puede bajar a cambios concretos en archivos y props.
