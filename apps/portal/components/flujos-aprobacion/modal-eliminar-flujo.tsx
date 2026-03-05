"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"
import { FlujoAprobacion } from "@/app/(user-pages)/admin/admin/flujos-aprobacion/types"

interface ModalEliminarFlujoProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  flujo: FlujoAprobacion | null
}

export function ModalEliminarFlujo({ isOpen, onClose, onConfirm, flujo }: ModalEliminarFlujoProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  if (!flujo) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Eliminar Flujo de Aprobación
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. El flujo será eliminado permanentemente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted/50 p-4 rounded-md">
            <p className="font-medium mb-2">¿Está seguro que desea eliminar el siguiente flujo?</p>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Nombre:</span> {flujo.nombre}
              </p>
              <p>
                <span className="font-medium">Tipo:</span> {flujo.tipo.nombre}
              </p>
              <p>
                <span className="font-medium">Aprobadores:</span> {flujo.aprobadores.length}
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Eliminar Flujo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

