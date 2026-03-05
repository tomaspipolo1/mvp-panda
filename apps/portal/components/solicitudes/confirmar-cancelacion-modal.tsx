"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"

interface ConfirmarCancelacionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (motivo: string) => void
  solicitud: {
    numero: string
    tipo: string
  } | null
}

export function ConfirmarCancelacionModal({ isOpen, onClose, onConfirm, solicitud }: ConfirmarCancelacionModalProps) {
  const [motivo, setMotivo] = useState("")

  if (!solicitud) return null

  const handleConfirm = () => {
    if (motivo.trim()) {
      onConfirm(motivo)
      setMotivo("")
      onClose()
    }
  }

  const handleClose = () => {
    setMotivo("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <DialogTitle>Cancelar Solicitud</DialogTitle>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-2">¿Está seguro que desea cancelar la siguiente solicitud?</p>
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <p className="text-sm font-medium">{solicitud.numero}</p>
            <p className="text-sm text-gray-600">{solicitud.tipo}</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="motivo" className="text-sm font-medium text-gray-700">
              Motivo de la cancelación <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="motivo"
              placeholder="Indique el motivo por el cual cancela esta solicitud..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            No, mantener
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={!motivo.trim()}>
            Sí, cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
