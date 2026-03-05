"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, AlertTriangle, Crown } from "lucide-react"

interface ModalEliminarNivelJerarquicoProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  nivel: any
}

export default function ModalEliminarNivelJerarquico({
  isOpen,
  onClose,
  onConfirm,
  nivel,
}: ModalEliminarNivelJerarquicoProps) {
  const [confirmText, setConfirmText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen || !nivel) return null

  const handleConfirm = async () => {
    if (confirmText !== nivel.codigo) return

    setIsLoading(true)
    try {
      await onConfirm()
      onClose()
      setConfirmText("")
    } catch (error) {
      console.error("Error al eliminar nivel jerárquico:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const tieneEmpleados = nivel.empleados > 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Eliminar Nivel Jerárquico</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-red-800">¿Estás seguro?</h3>
                <p className="text-sm text-red-700 mt-1">
                  Esta acción no se puede deshacer. Se eliminará permanentemente el nivel jerárquico.
                </p>
              </div>
            </div>
          </div>

          {/* Información del nivel */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900">{nivel.cargo}</h3>
                <p className="text-sm text-gray-600">
                  Nivel {nivel.nivel} - Código: {nivel.codigo}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{nivel.descripcion}</p>
          </div>

          {/* Advertencia si tiene empleados */}
          {tieneEmpleados && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-yellow-800">¡Atención!</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Este nivel jerárquico tiene <strong>{nivel.empleados} empleado(s)</strong> asignado(s). Al
                    eliminarlo, estos empleados quedarán sin nivel jerárquico asignado.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Confirmación */}
          <div className="space-y-2">
            <Label htmlFor="confirmText" className="text-sm font-medium text-gray-700">
              Para confirmar, escribe el código del nivel: <strong>{nivel.codigo}</strong>
            </Label>
            <Input
              id="confirmText"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
              placeholder={`Escribe ${nivel.codigo} para confirmar`}
              className={confirmText && confirmText !== nivel.codigo ? "border-red-500" : ""}
              style={{ textTransform: "uppercase" }}
            />
            {confirmText && confirmText !== nivel.codigo && (
              <p className="text-sm text-red-600">El código no coincide. Debe escribir exactamente: {nivel.codigo}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={confirmText !== nivel.codigo || isLoading}>
            {isLoading ? "Eliminando..." : "Eliminar Nivel"}
          </Button>
        </div>
      </div>
    </div>
  )
}
