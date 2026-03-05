import Swal from 'sweetalert2'

// Configuración global de SweetAlert
const defaultConfig = {
  confirmButtonColor: '#002169',
  cancelButtonColor: '#6B7280',
  background: '#FFFFFF',
  color: '#374151',
  customClass: {
    popup: 'rounded-lg shadow-xl',
    title: 'text-lg font-semibold',
    content: 'text-sm',
    confirmButton: 'rounded-md px-4 py-2 font-medium',
    cancelButton: 'rounded-md px-4 py-2 font-medium'
  }
}

// Función para mostrar alerta de éxito
export const showSuccess = (title: string, message?: string) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'success',
    title,
    text: message,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  })
}

// Función para mostrar alerta de error
export const showError = (title: string, message?: string) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'error',
    title,
    text: message,
    confirmButtonText: 'Entendido'
  })
}

// Función para mostrar alerta de advertencia
export const showWarning = (title: string, message?: string) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'warning',
    title,
    text: message,
    confirmButtonText: 'Entendido'
  })
}

// Función para mostrar alerta de información
export const showInfo = (title: string, message?: string) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'info',
    title,
    text: message,
    confirmButtonText: 'Entendido'
  })
}

// Función para mostrar confirmación
export const showConfirm = (
  title: string, 
  message: string, 
  confirmText: string = 'Sí, continuar',
  cancelText: string = 'Cancelar'
) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'question',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true
  })
}

// Función para mostrar alerta de carga
export const showLoading = (title: string = 'Cargando...') => {
  return Swal.fire({
    ...defaultConfig,
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading()
    }
  })
}

// Función para cerrar cualquier alerta
export const closeAlert = () => {
  Swal.close()
}

// Función específica para validación de formularios
export const showValidationError = (tabsWithErrors: string[]) => {
  const errorMessage = `Faltan completar campos obligatorios en: ${tabsWithErrors.join(', ')}`
  
  return Swal.fire({
    ...defaultConfig,
    icon: 'error',
    title: 'Error de validación',
    text: errorMessage,
    confirmButtonText: 'Entendido'
  })
}

// Función específica para éxito de creación de proveedor
export const showProviderCreated = () => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'success',
    title: 'Solicitud enviada',
    text: 'Se ha enviado correctamente la solicitud de inscripción de proveedor.',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  })
}

// Función específica para éxito de creación de cliente
export const showClientCreated = () => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'success',
    title: 'Solicitud enviada',
    text: 'Se ha enviado correctamente la solicitud de inscripción de cliente.',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  })
}

// Función específica para éxito de creación de empresa servicios portuarios
export const showEmpresaServiciosPortuariosCreated = () => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'success',
    title: 'Solicitud enviada',
    text: 'Se ha enviado correctamente la solicitud de inscripción de empresa de servicios portuarios.',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false
  })
}

// Función para confirmar eliminación
export const showDeleteConfirm = (itemName: string) => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'warning',
    title: '¿Estás seguro?',
    text: `¿Deseas eliminar "${itemName}"? Esta acción no se puede deshacer.`,
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#DC2626',
    reverseButtons: true
  })
}

// Función para mostrar alerta de guardado de borrador
export const showDraftSaved = () => {
  return Swal.fire({
    ...defaultConfig,
    icon: 'success',
    title: 'Borrador guardado',
    text: 'Tu borrador se ha guardado correctamente',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false
  })
} 