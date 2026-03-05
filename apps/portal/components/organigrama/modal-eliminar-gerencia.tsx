"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Loader2, X } from "lucide-react"

interface ModalEliminarGerenciaProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  gerencia: {
    nombre: string
    codigo: string
    cantidadDepartamentos: number
    cantidadEmpleados: number
  } | null
}

export function ModalEliminarGerencia({ isOpen, onClose, onConfirm, gerencia }: ModalEliminarGerenciaProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [codigoConfirmacion, setCodigoConfirmacion] = useState("")

  const handleConfirm = async () => {
    setIsLoading(true)

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onConfirm()
      setIsLoading(false)
      onClose()
      setCodigoConfirmacion("")
    } catch (error) {
      console.error("Error al eliminar gerencia:", error)
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      setCodigoConfirmacion("")
      onClose()
    }
  }

  if (!gerencia || !isOpen) return null

  const tieneRelaciones = gerencia.cantidadDepartamentos > 0 || gerencia.cantidadEmpleados > 0
  const puedeEliminar = codigoConfirmacion === gerencia.codigo

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-semibold">Eliminar Gerencia</h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-500">
            Esta acción no se puede deshacer. La gerencia será eliminada permanentemente.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Gerencia a eliminar:</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Código:</span> {gerencia.codigo}
              </p>
              <p>
                <span className="font-medium">Nombre:</span> {gerencia.nombre}
              </p>
              <p>
                <span className="font-medium">Departamentos:</span> {gerencia.cantidadDepartamentos}
              </p>
              <p>
                <span className="font-medium">Empleados:</span> {gerencia.cantidadEmpleados}
              </p>
            </div>
          </div>

          {tieneRelaciones && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-700">
                  <p className="font-medium mb-1">¡Atención!</p>
                  <p>
                    Esta gerencia tiene {gerencia.cantidadDepartamentos} departamento(s) y {gerencia.cantidadEmpleados}{" "}
                    empleado(s) asociados. Al eliminarla, también se eliminarán todas las relaciones asociadas.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="codigo-confirmacion" className="text-sm font-medium">
              Para confirmar, escriba el código de la gerencia:{" "}
              <span className="font-mono text-red-600">{gerencia.codigo}</span>
            </Label>
            <Input
              id="codigo-confirmacion"
              type="text"
              value={codigoConfirmacion}
              onChange={(e) => setCodigoConfirmacion(e.target.value)}
              placeholder="Ingrese el código de la gerencia"
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <p className="text-sm text-gray-600">¿Está seguro que desea eliminar esta gerencia?</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm} disabled={isLoading || !puedeEliminar}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              "Eliminar Gerencia"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
