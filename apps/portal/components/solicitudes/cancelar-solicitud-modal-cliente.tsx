"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface CancelarSolicitudModalClienteProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (motivo: string) => void
  solicitudNumero: string
}

export function CancelarSolicitudModalCliente({
  isOpen,
  onClose,
  onConfirm,
  solicitudNumero,
}: CancelarSolicitudModalClienteProps) {
  const [motivo, setMotivo] = useState("")
  const [confirmacion, setConfirmacion] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    if (!motivo.trim() || !confirmacion) return

    setIsSubmitting(true)
    try {
      // Aquí iría la lógica para enviar la cancelación al backend
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulación de envío
      onConfirm(motivo)
      setMotivo("")
      setConfirmacion(false)
      onClose()
    } catch (error) {
      console.error("Error al cancelar solicitud:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Cancelar solicitud {solicitudNumero}</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. La solicitud será cancelada permanentemente.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo de cancelación</Label>
            <Textarea
              id="motivo"
              placeholder="Indique el motivo por el cual desea cancelar esta solicitud..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirmacion"
              checked={confirmacion}
              onCheckedChange={(checked) => setConfirmacion(!!checked)}
            />
            <Label htmlFor="confirmacion" className="text-sm">
              Confirmo que deseo cancelar esta solicitud
            </Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Volver
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={!motivo.trim() || !confirmacion || isSubmitting}
            >
              {isSubmitting ? "Cancelando..." : "Cancelar solicitud"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
