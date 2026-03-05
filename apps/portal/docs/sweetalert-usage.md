# SweetAlert2 - Guía de Uso

## Instalación

SweetAlert2 ya está instalado en el proyecto. Si necesitas reinstalarlo:

```bash
pnpm add sweetalert2
```

## Configuración

El archivo `lib/sweetalert.ts` contiene todas las funciones de SweetAlert configuradas con el estilo de la aplicación.

## Funciones Disponibles

### Alertas Básicas

#### `showSuccess(title, message?)`
Muestra una alerta de éxito con timer automático.

```typescript
import { showSuccess } from "@/lib/sweetalert"

showSuccess("¡Operación exitosa!", "Los datos se han guardado correctamente")
```

#### `showError(title, message?)`
Muestra una alerta de error.

```typescript
import { showError } from "@/lib/sweetalert"

showError("Error", "Ha ocurrido un error al procesar la solicitud")
```

#### `showWarning(title, message?)`
Muestra una alerta de advertencia.

```typescript
import { showWarning } from "@/lib/sweetalert"

showWarning("Advertencia", "Esta acción puede tener consecuencias importantes")
```

#### `showInfo(title, message?)`
Muestra una alerta informativa.

```typescript
import { showInfo } from "@/lib/sweetalert"

showInfo("Información", "Este es un mensaje informativo para el usuario")
```

### Confirmaciones

#### `showConfirm(title, message, confirmText?, cancelText?)`
Muestra una confirmación con botones personalizables.

```typescript
import { showConfirm } from "@/lib/sweetalert"

const result = await showConfirm(
  "¿Estás seguro?", 
  "¿Deseas continuar con esta acción?",
  "Sí, continuar",
  "Cancelar"
)

if (result.isConfirmed) {
  // Usuario confirmó la acción
  showSuccess("Confirmado", "Has confirmado la acción")
}
```

#### `showDeleteConfirm(itemName)`
Confirmación específica para eliminaciones.

```typescript
import { showDeleteConfirm } from "@/lib/sweetalert"

const result = await showDeleteConfirm("Proveedor ABC")

if (result.isConfirmed) {
  // Eliminar el item
  showSuccess("Eliminado", "El proveedor ha sido eliminado correctamente")
}
```

### Estados de Carga

#### `showLoading(title?)`
Muestra un indicador de carga.

```typescript
import { showLoading, showSuccess } from "@/lib/sweetalert"

showLoading("Procesando datos...")

// Simular operación asíncrona
setTimeout(() => {
  showSuccess("Completado", "La operación se ha completado exitosamente")
}, 3000)
```

#### `closeAlert()`
Cierra cualquier alerta abierta.

```typescript
import { closeAlert } from "@/lib/sweetalert"

closeAlert()
```

### Funciones Específicas del Proyecto

#### `showValidationError(tabsWithErrors)`
Muestra errores de validación de formularios.

```typescript
import { showValidationError } from "@/lib/sweetalert"

showValidationError(["Datos Generales", "Información Comercial"])
```

#### `showProviderCreated()`
Muestra confirmación de proveedor creado.

```typescript
import { showProviderCreated } from "@/lib/sweetalert"

showProviderCreated()
```

#### `showDraftSaved()`
Muestra confirmación de borrador guardado.

```typescript
import { showDraftSaved } from "@/lib/sweetalert"

showDraftSaved()
```

## Ejemplos de Uso

### En un Formulario

```typescript
"use client"

import { showSuccess, showError, showLoading } from "@/lib/sweetalert"

const handleSubmit = async (formData: any) => {
  try {
    showLoading("Guardando datos...")
    
    // Simular llamada a API
    await saveData(formData)
    
    showSuccess("¡Datos guardados!", "La información se ha guardado correctamente")
  } catch (error) {
    showError("Error", "No se pudieron guardar los datos")
  }
}
```

### En una Eliminación

```typescript
"use client"

import { showDeleteConfirm, showSuccess, showError } from "@/lib/sweetalert"

const handleDelete = async (itemId: string, itemName: string) => {
  const result = await showDeleteConfirm(itemName)
  
  if (result.isConfirmed) {
    try {
      await deleteItem(itemId)
      showSuccess("Eliminado", `${itemName} ha sido eliminado correctamente`)
    } catch (error) {
      showError("Error", "No se pudo eliminar el elemento")
    }
  }
}
```

### En Validación de Formularios

```typescript
"use client"

import { showValidationError } from "@/lib/sweetalert"

const validateForm = (formData: any) => {
  const errors = []
  
  if (!formData.name) errors.push("Nombre")
  if (!formData.email) errors.push("Email")
  if (!formData.phone) errors.push("Teléfono")
  
  if (errors.length > 0) {
    showValidationError(errors)
    return false
  }
  
  return true
}
```

## Personalización

### Colores
Los colores están configurados en `lib/sweetalert.ts`:

- **Color principal**: `#002169` (azul de la marca)
- **Color de cancelar**: `#6B7280` (gris)
- **Color de eliminar**: `#DC2626` (rojo)

### Estilos
Los estilos están configurados con Tailwind CSS en el objeto `customClass`.

## Componente de Ejemplos

Puedes ver todos los ejemplos en `components/ui/sweetalert-examples.tsx`.

Para usarlo en desarrollo:

```typescript
import SweetAlertExamples from "@/components/ui/sweetalert-examples"

// En tu página de desarrollo
<SweetAlertExamples />
```

## Notas Importantes

1. **Importación**: Siempre importa las funciones desde `@/lib/sweetalert`
2. **Async/Await**: Las funciones de confirmación devuelven promesas, usa `await`
3. **Timer**: Las alertas de éxito tienen timer automático de 3 segundos
4. **Estilo consistente**: Todas las alertas usan el mismo estilo de la aplicación 