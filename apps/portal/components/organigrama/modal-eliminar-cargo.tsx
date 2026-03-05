"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, X, AlertTriangle } from "lucide-react"

interface ModalEliminarCargoProps {
  isOpen: boolean
  onClose: () => void
  cargo: {
    codigo: string
    nombre: string
    empleados?: number
  }
}

export function ModalEliminarCargo({ isOpen, onClose, cargo }: ModalEliminarCargoProps) {
  const [confirmCode, setConfirmCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleDelete = async () => {
    if (confirmCode !== cargo.codigo) {
      setError("El código ingresado no coincide con el código del cargo")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Cargo eliminado:", cargo)
      onClose()
    } catch (error) {
      console.error("Error al eliminar cargo:", error)
      setError("Ocurrió un error al eliminar el cargo. Intente nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const hasEmployees = cargo.empleados && cargo.empleados > 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-red-600">Eliminar Cargo</h2>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isLoading}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-medium">
                ¿Está seguro que desea eliminar el cargo <span className="font-bold">{cargo.nombre}</span>?
              </p>
              <p className="text-sm text-muted-foreground mt-1">Esta acción no se puede deshacer.</p>
            </div>
          </div>

          {hasEmployees && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800">
              <p className="font-medium flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Advertencia
              </p>
              <p className="text-sm mt-1">
                Este cargo tiene <span className="font-bold">{cargo.empleados}</span> empleados asociados. Si elimina
                este cargo, los empleados quedarán sin cargo asignado.
              </p>
            </div>
          )}

          <div className="space-y-2 mt-4">
            <p className="text-sm">
              Para confirmar, escriba el código del cargo: <span className="font-bold">{cargo.codigo}</span>
            </p>
            <Input
              value={confirmCode}
              onChange={(e) => {
                setConfirmCode(e.target.value.toUpperCase())
                if (error) setError("")
              }}
              placeholder={`Escriba ${cargo.codigo} para confirmar`}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading || confirmCode !== cargo.codigo}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Eliminando..." : "Eliminar Cargo"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
