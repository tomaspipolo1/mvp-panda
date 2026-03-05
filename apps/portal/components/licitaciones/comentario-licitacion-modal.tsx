"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"

interface ComentarioLicitacionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (comentario: string) => void
  licitacionNumero: string
  tipo: "inscripcion" | "rechazo"
}

export function ComentarioLicitacionModal({
  isOpen,
  onClose,
  onSubmit,
  licitacionNumero,
  tipo,
}: ComentarioLicitacionModalProps) {
  const [comentario, setComentario] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!comentario.trim()) return

    setIsSubmitting(true)
    try {
      // Aquí iría la lógica para enviar el comentario al backend
      // Se enviará al mail compras@puertolaplata.com
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulación de envío
      
      console.log(`Enviando ${tipo} de licitación ${licitacionNumero} a compras@puertolaplata.com`)
      console.log(`Comentario: ${comentario}`)
      
      onSubmit(comentario)
      setComentario("")
      onClose()
    } catch (error) {
      console.error(`Error al enviar ${tipo}:`, error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setComentario("")
    onClose()
  }

  const titulo = tipo === "inscripcion" 
    ? `Inscribirse en licitación ${licitacionNumero}`
    : `Rechazar licitación ${licitacionNumero}`

  const textoBoton = tipo === "inscripcion" ? "Inscribirse" : "Rechazar"
  const colorBoton = tipo === "inscripcion" 
    ? "bg-green-600 hover:bg-green-700"
    : "bg-red-600 hover:bg-red-700"

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {tipo === "inscripcion" ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            {titulo}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="comentario">
              Comentario {tipo === "inscripcion" ? "(opcional)" : "(requerido)"}
            </Label>
            <Textarea
              id="comentario"
              placeholder={
                tipo === "inscripcion"
                  ? "Agregue un comentario sobre su inscripción..."
                  : "Indique el motivo del rechazo..."
              }
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
          <p className="text-sm text-gray-500">
            Se enviará una notificación a <strong>compras@puertolaplata.com</strong>
          </p>
        </div>
        <DialogFooter>
          <div className="flex justify-end space-x-2 w-full">
            <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={(tipo === "rechazo" && !comentario.trim()) || isSubmitting}
              className={`${colorBoton} text-white`}
            >
              {isSubmitting ? "Enviando..." : textoBoton}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

