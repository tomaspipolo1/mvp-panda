"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

interface ModalConfirmacionEventoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  tituloEvento: string
  accion: "crear" | "actualizar" | "eliminar"
}

export default function ModalConfirmacionEvento({
  open,
  onOpenChange,
  onConfirm,
  tituloEvento,
  accion,
}: ModalConfirmacionEventoProps) {
  const mensajes = {
    crear: {
      titulo: "Evento creado con éxito",
      descripcion: `El evento "${tituloEvento}" ha sido creado correctamente.`,
    },
    actualizar: {
      titulo: "Evento actualizado con éxito",
      descripcion: `El evento "${tituloEvento}" ha sido actualizado correctamente.`,
    },
    eliminar: {
      titulo: "Evento eliminado con éxito",
      descripcion: `El evento "${tituloEvento}" ha sido eliminado correctamente.`,
    },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">{mensajes[accion].titulo}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <p className="text-center">{mensajes[accion].descripcion}</p>
        </div>
        <div className="flex justify-center">
          <Button onClick={onConfirm}>Aceptar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
