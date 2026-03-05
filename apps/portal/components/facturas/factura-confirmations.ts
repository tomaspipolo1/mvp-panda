import Swal from "sweetalert2"
import { showSuccess } from "@/lib/sweetalert"

/**
 * Muestra confirmación para ingresar una factura
 * @param numeroFactura - Número de la factura a ingresar
 * @param numeroNota - Número de nota para el ingreso
 * @returns Promise con el resultado de la confirmación
 */
export const confirmarIngresoFactura = async (numeroFactura: string, numeroNota: string) => {
  const result = await Swal.fire({
    icon: "question",
    title: "¿Confirmar ingreso de factura?",
    text: `Se ingresará la factura ${numeroFactura} con el número de nota ${numeroNota}`,
    showCancelButton: true,
    confirmButtonText: "Sí, ingresar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#002169",
    cancelButtonColor: "#6B7280",
    reverseButtons: true,
    customClass: {
      popup: "rounded-lg shadow-xl",
      title: "text-lg font-semibold",
      content: "text-sm",
      confirmButton: "rounded-md px-4 py-2 font-medium",
      cancelButton: "rounded-md px-4 py-2 font-medium",
    },
  })

  // Si se confirma, mostrar mensaje de éxito
  if (result.isConfirmed) {
    await showSuccess(
      "¡Factura ingresada con éxito!",
      `La factura ${numeroFactura} ha sido ingresada correctamente.`
    )
  }

  return result
}

/**
 * Muestra confirmación para anular una factura con comentario para el proveedor
 * @param numeroFactura - Número de la factura a anular
 * @returns Promise con el resultado de la confirmación y el comentario ingresado
 */
export const confirmarAnulacionFactura = async (numeroFactura?: string) => {
  const result = await Swal.fire({
    icon: "warning",
    title: "¿Está seguro que desea anular esta factura?",
    html: `
      <div style="text-align: left;">
        <p style="margin-bottom: 16px; color: #374151;">
          ${numeroFactura 
            ? `Se anulará la factura <strong>${numeroFactura}</strong>. Esta acción no se puede deshacer.`
            : "Esta acción no se puede deshacer."}
        </p>
        <label for="swal-comentario" style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">
          Comentario para el proveedor <span style="color: #DC2626;">*</span>
        </label>
        <textarea
          id="swal-comentario"
          class="swal2-input"
          placeholder="Ingrese el motivo de la anulación..."
          rows="8"
          style="width: 100%; min-height: 120px; padding: 8px 12px; border: 1px solid #D1D5DB; border-radius: 6px; resize: vertical; font-size: 14px;"
        ></textarea>
        <p style="margin-top: 8px; font-size: 12px; color: #6B7280;">
          Este mensaje será enviado al proveedor.
        </p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Sí, anular",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#DC2626", // Rojo para acción destructiva
    cancelButtonColor: "#6B7280",
    reverseButtons: true,
    customClass: {
      popup: "rounded-lg shadow-xl",
      title: "text-lg font-semibold",
      htmlContainer: "text-sm",
      confirmButton: "rounded-md px-4 py-2 font-medium",
      cancelButton: "rounded-md px-4 py-2 font-medium",
    },
    preConfirm: () => {
      const comentario = (document.getElementById("swal-comentario") as HTMLTextAreaElement)?.value
      if (!comentario || comentario.trim() === "") {
        Swal.showValidationMessage("Debe ingresar un comentario para el proveedor")
        return false
      }
      return comentario.trim()
    },
  })

  // Si se confirma, mostrar mensaje de éxito
  if (result.isConfirmed) {
    await showSuccess(
      "Factura anulada", 
      `La factura ha sido anulada correctamente.<br><small style="color: #6B7280;">El proveedor será notificado.</small>`
    )
  }

  return result
}

/**
 * Muestra confirmación para descargar una factura
 * @param numeroFactura - Número de la factura a descargar
 * @returns Promise con el resultado de la confirmación
 */
export const confirmarDescargaFactura = async (numeroFactura: string) => {
  return await Swal.fire({
    icon: "info",
    title: "Descargar factura",
    text: `¿Desea descargar la factura ${numeroFactura}?`,
    showCancelButton: true,
    confirmButtonText: "Sí, descargar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#002169",
    cancelButtonColor: "#6B7280",
    reverseButtons: true,
    customClass: {
      popup: "rounded-lg shadow-xl",
      title: "text-lg font-semibold",
      content: "text-sm",
      confirmButton: "rounded-md px-4 py-2 font-medium",
      cancelButton: "rounded-md px-4 py-2 font-medium",
    },
  })
}

/**
 * Muestra mensaje de error en la validación de campos
 * @param mensaje - Mensaje de error a mostrar
 */
export const mostrarErrorValidacion = async (mensaje: string) => {
  return await Swal.fire({
    icon: "error",
    title: "Error de validación",
    text: mensaje,
    confirmButtonText: "Entendido",
    confirmButtonColor: "#002169",
    customClass: {
      popup: "rounded-lg shadow-xl",
      title: "text-lg font-semibold",
      content: "text-sm",
      confirmButton: "rounded-md px-4 py-2 font-medium",
    },
  })
}

