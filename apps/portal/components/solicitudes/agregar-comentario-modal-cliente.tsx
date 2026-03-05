"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface AgregarComentarioModalClienteProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (comentario: string) => void
  solicitudNumero: string
}

export function AgregarComentarioModalCliente({
  isOpen,
  onClose,
  onSubmit,
  solicitudNumero,
}: AgregarComentarioModalClienteProps) {
  const [comentario, setComentario] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!comentario.trim()) return

    setIsSubmitting(true)
    try {
      // Aquí iría la lógica para enviar el comentario al backend
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulación de envío
      onSubmit(comentario)
      setComentario("")
      onClose()
    } catch (error) {
      console.error("Error al enviar comentario:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar comentario a la solicitud {solicitudNumero}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="comentario">Comentario</Label>
            <Textarea
              id="comentario"
              placeholder="Escriba su comentario aquí..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={!comentario.trim() || isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar comentario"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
