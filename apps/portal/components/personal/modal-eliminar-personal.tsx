"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, X } from "lucide-react"

interface ModalEliminarPersonalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (id: number) => void
  personalData: { id: number; nombre: string; apellido: string } | null
}

export function ModalEliminarPersonal({ isOpen, onClose, onConfirm, personalData }: ModalEliminarPersonalProps) {
  const handleConfirm = () => {
    if (personalData) {
      onConfirm(personalData.id)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold">Confirmar eliminación</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-6">
          <p>
            ¿Está seguro que desea eliminar a <strong>{personalData?.nombre} {personalData?.apellido}</strong>?
          </p>
          <p className="text-sm text-gray-500 mt-2">Esta acción no se puede deshacer.</p>
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm} className="flex-1">
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}
