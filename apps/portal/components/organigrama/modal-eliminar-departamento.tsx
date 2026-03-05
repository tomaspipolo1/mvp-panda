"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface Departamento {
  id: number
  codigo: string
  nombre: string
  descripcion: string
  gerencia: string
  superior: string
  cantidadEmpleados: number
  estado: string
}

interface ModalEliminarDepartamentoProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  departamento?: Departamento
}

export function ModalEliminarDepartamento({
  isOpen,
  onClose,
  onConfirm,
  departamento,
}: ModalEliminarDepartamentoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmText, setConfirmText] = useState("")

  // Si el modal no está abierto o no hay departamento, no renderizar nada
  if (!isOpen || !departamento) return null

  const handleConfirm = async () => {
    if (confirmText !== departamento.codigo) {
      setError(`Por favor escriba "${departamento.codigo}" para confirmar la eliminación.`)
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      // Simulación de envío al servidor
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Llamar al callback de confirmación
      onConfirm()

      // Resetear estado y cerrar modal
      setIsSubmitting(false)
      setConfirmText("")
      onClose()
    } catch (err) {
      setError("Ocurrió un error al eliminar el departamento. Intente nuevamente.")
      console.error(err)
      setIsSubmitting(false)
    }
  }

  const tieneEmpleados = departamento.cantidadEmpleados > 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-red-600">Eliminar Departamento</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" disabled={isSubmitting}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <p>
              ¿Está seguro que desea eliminar el departamento <span className="font-bold">{departamento.nombre}</span>?
            </p>

            <div className="bg-gray-50 p-3 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Código:</span>
                <span className="font-mono font-bold">{departamento.codigo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Gerencia:</span>
                <Badge variant="outline">{departamento.gerencia}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Superior:</span>
                <span>{departamento.superior}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Empleados:</span>
                <Badge variant={tieneEmpleados ? "destructive" : "outline"}>{departamento.cantidadEmpleados}</Badge>
              </div>
            </div>

            {tieneEmpleados && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Este departamento tiene {departamento.cantidadEmpleados} empleados asignados. Al eliminarlo, deberá
                  reasignar estos empleados a otros departamentos.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Escriba <span className="font-mono font-bold">{departamento.codigo}</span> para confirmar:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder={`Escriba ${departamento.codigo} para confirmar`}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isSubmitting || confirmText !== departamento.codigo}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}
