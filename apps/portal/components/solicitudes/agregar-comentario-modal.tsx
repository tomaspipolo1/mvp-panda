"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface AgregarComentarioModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (comentario: string) => void
  solicitud: {
    id: string
    numero: string
    asunto: string
  } | null
}

export function AgregarComentarioModal({ isOpen, onClose, onSubmit, solicitud }: AgregarComentarioModalProps) {
  const [comentario, setComentario] = useState("")

  if (!solicitud) return null

  const handleSubmit = () => {
    if (comentario.trim()) {
      onSubmit(comentario)
      setComentario("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Comentario</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            Solicitud {solicitud.numero} - {solicitud.asunto}
          </p>
          <Textarea
            placeholder="Escriba su comentario aquí..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={5}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!comentario.trim()}>
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
