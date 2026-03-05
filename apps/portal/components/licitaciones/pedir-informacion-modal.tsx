"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface PedirInformacionModalProps {
  isOpen: boolean
  onClose: () => void
  oferta: any
  onSubmit: (ofertaId: string, mensaje: string) => void
}

export function PedirInformacionModal({ isOpen, onClose, oferta, onSubmit }: PedirInformacionModalProps) {
  const [mensaje, setMensaje] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!mensaje.trim()) {
      toast({
        title: "Error",
        description: "Debe ingresar la información solicitada",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulamos una petición a la API
    setTimeout(() => {
      onSubmit(oferta?.id, mensaje)
      setMensaje("")
      setIsSubmitting(false)

      toast({
        title: "Solicitud enviada",
        description: `Se ha enviado la solicitud de información adicional a ${oferta?.proveedor}`,
      })
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Solicitar Información Adicional</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-gray-500 mb-4">
              Está solicitando información adicional a <span className="font-medium">{oferta?.proveedor}</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje">Información solicitada</Label>
            <Textarea
              id="mensaje"
              placeholder="Detalle la información adicional que necesita del proveedor..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="min-h-[120px]"
              disabled={isSubmitting}
            />
          </div>

          <div className="text-sm text-gray-500">
            <p>Esta solicitud será enviada al proveedor y se registrará en el historial de la licitación.</p>
            <p>El proveedor recibirá una notificación por correo electrónico.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
