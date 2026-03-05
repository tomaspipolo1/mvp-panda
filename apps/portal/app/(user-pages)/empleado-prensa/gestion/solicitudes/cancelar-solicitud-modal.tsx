"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle } from "lucide-react"

interface CancelarSolicitudModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (motivo: string) => void
  solicitudNumero: string
}

export function CancelarSolicitudModal({ isOpen, onClose, onConfirm, solicitudNumero }: CancelarSolicitudModalProps) {
  const [motivo, setMotivo] = useState("")
  const [error, setError] = useState("")

  const handleConfirm = () => {
    if (!motivo.trim()) {
      setError("Por favor, ingrese un motivo para la cancelación")
      return
    }

    onConfirm(motivo)
    setMotivo("")
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Cancelar Solicitud
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm mb-4">
            ¿Está seguro que desea cancelar la solicitud <strong>{solicitudNumero}</strong>? Esta acción no se puede
            deshacer.
          </p>

          <div className="space-y-2">
            <label htmlFor="motivo" className="text-sm font-medium">
              Motivo de cancelación
            </label>
            <Textarea
              id="motivo"
              value={motivo}
              onChange={(e) => {
                setMotivo(e.target.value)
                if (e.target.value.trim()) setError("")
              }}
              placeholder="Ingrese el motivo de la cancelación..."
              rows={4}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirmar Cancelación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
