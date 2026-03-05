"use client"

import { Button } from "@/components/ui/button"
import { 
  showSuccess, 
  showError, 
  showWarning, 
  showInfo, 
  showConfirm, 
  showLoading, 
  showDeleteConfirm,
  showValidationError,
  showProviderCreated,
  showDraftSaved
} from "@/lib/sweetalert"

export default function SweetAlertExamples() {
  const handleSuccess = () => {
    showSuccess("¡Operación exitosa!", "Los datos se han guardado correctamente")
  }

  const handleError = () => {
    showError("Error", "Ha ocurrido un error al procesar la solicitud")
  }

  const handleWarning = () => {
    showWarning("Advertencia", "Esta acción puede tener consecuencias importantes")
  }

  const handleInfo = () => {
    showInfo("Información", "Este es un mensaje informativo para el usuario")
  }

  const handleConfirm = async () => {
    const result = await showConfirm(
      "¿Estás seguro?", 
      "¿Deseas continuar con esta acción?",
      "Sí, continuar",
      "Cancelar"
    )
    
    if (result.isConfirmed) {
      showSuccess("Confirmado", "Has confirmado la acción")
    }
  }

  const handleLoading = () => {
    showLoading("Procesando datos...")
    
    // Simular una operación asíncrona
    setTimeout(() => {
      showSuccess("Completado", "La operación se ha completado exitosamente")
    }, 3000)
  }

  const handleDelete = async () => {
    const result = await showDeleteConfirm("Proveedor ABC")
    
    if (result.isConfirmed) {
      showSuccess("Eliminado", "El proveedor ha sido eliminado correctamente")
    }
  }

  const handleValidationError = () => {
    showValidationError(["Datos Generales", "Información Comercial"])
  }

  const handleProviderCreated = () => {
    showProviderCreated()
  }

  const handleDraftSaved = () => {
    showDraftSaved()
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Ejemplos de SweetAlert</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button onClick={handleSuccess} variant="default">
          Éxito
        </Button>
        
        <Button onClick={handleError} variant="destructive">
          Error
        </Button>
        
        <Button onClick={handleWarning} variant="outline">
          Advertencia
        </Button>
        
        <Button onClick={handleInfo} variant="secondary">
          Información
        </Button>
        
        <Button onClick={handleConfirm} variant="outline">
          Confirmación
        </Button>
        
        <Button onClick={handleLoading} variant="secondary">
          Cargando
        </Button>
        
        <Button onClick={handleDelete} variant="destructive">
          Eliminar
        </Button>
        
        <Button onClick={handleValidationError} variant="outline">
          Error Validación
        </Button>
        
        <Button onClick={handleProviderCreated} variant="default">
          Proveedor Creado
        </Button>
        
        <Button onClick={handleDraftSaved} variant="secondary">
          Borrador Guardado
        </Button>
      </div>
    </div>
  )
} 