# Componentes en `components/visitas/` que no se utilizaban (eliminados)

Comprobado buscando imports en todo el proyecto (app + components).  
Los archivos listados **no eran importados por ninguna página ni por ningún otro componente** y fueron **eliminados**.

---

## Lista de componentes no usados

| Archivo | Nota |
|---------|------|
| `cancelar-visita-modal-cliente.tsx` | Reemplazado por flujo con formulario reutilizable / tabla genérica. |
| `cancelar-visita-modal-empleado-compras.tsx` | No referenciado. |
| `cancelar-visita-modal-empleado-gerente.tsx` | No referenciado. |
| `cancelar-visita-modal-usuario-basico.tsx` | No referenciado. |
| `confirmar-accion-modal.tsx` | En visitas no se usa; en camiones sí se usa `@/components/camiones/confirmar-accion-modal`. |
| `custom-calendar.tsx` | No importado; admin y mesa-entradas usan su propio calendario inline. |
| `detalle-visita-content.tsx` | No importado por `detalle-visita-component` ni por nadie. |
| `detalle-visita-mi-buzon-modal.tsx` | No referenciado. |
| `detalle-visita-modal-cliente.tsx` | No referenciado. |
| `detalle-visita-modal-empleado-gerente.tsx` | No referenciado (se usa `detalle-visita-modal-empleado-compras` en todos). |
| `detalle-visita-modal-usuario-basico.tsx` | No referenciado. |
| `filtros-visitas-cliente.tsx` | No referenciado; se usa `filtros-visitas.tsx` en cliente y demás. |
| `formulario-nueva-visita-cliente.tsx` | Sustituido por `formulario-nueva-visita-externos-reutilizable`. |
| `formulario-nueva-visita-empleado-compras.tsx` | Sustituido por `formulario-nueva-visita-reutilizable`. |
| `formulario-nueva-visita-empleado-gerente.tsx` | Sustituido por `formulario-nueva-visita-reutilizable`. |
| `formulario-nueva-visita-empleado-mesa-entradas.tsx` | No referenciado. |
| `formulario-nueva-visita-empleado-prensa.tsx` | Sustituido por `formulario-nueva-visita-reutilizable`. |
| `formulario-nueva-visita.tsx` | No referenciado. |
| `tabla-visitas-cliente.tsx` | No referenciado; cliente usa `tabla-visitas.tsx`. |
| `time-selector.tsx` | No referenciado. |

**Total: 20 archivos** en `components/visitas/` que no se usan.

---

## Componentes que sí se usan (referencia)

- `cancelar-visita-modal.tsx` (base)
- `cerrar-visita-modal.tsx`
- `confirmar-accion-visita-modal.tsx`
- `detalle-visita-buzon-modal.tsx`
- `detalle-visita-component.tsx`
- `detalle-visita-modal.tsx` (base)
- `detalle-visita-modal-empleado-compras.tsx`
- `filtros-visitas.tsx`
- `formulario-nueva-visita-externos-reutilizable.tsx`
- `formulario-nueva-visita-reutilizable.tsx`
- `formulario-visita-estaticos.ts`
- `historial-acciones.tsx`
- `mock-data.ts`
- `modal-invitacion-visita.tsx`
- `tabla-visitas-empleado-seguridad.tsx`
- `tabla-visitas.tsx`
- `types.ts`

**Estado:** Los 20 archivos listados fueron eliminados del proyecto.
