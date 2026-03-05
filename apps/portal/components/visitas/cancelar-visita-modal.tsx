"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface CancelarVisitaModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (motivo: string) => void
  visita: {
    id: string
    fecha: string
    tipo: string
    sitio: string
  } | null
}

export function CancelarVisitaModal({ isOpen, onClose, onConfirm, visita }: CancelarVisitaModalProps) {
  const [motivo, setMotivo] = useState("")

  if (!visita) return null

  const handleConfirm = () => {
    if (motivo.trim()) {
      onConfirm(motivo)
      setMotivo("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancelar Visita</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-2">
            ¿Está seguro que desea cancelar la visita del {visita.fecha} a {visita.sitio}?
          </p>
          <p className="text-sm font-medium mb-4">Tipo: {visita.tipo}</p>
          <Textarea
            placeholder="Indique el motivo de la cancelación..."
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            No, volver
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={!motivo.trim()}>
            Sí, cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
