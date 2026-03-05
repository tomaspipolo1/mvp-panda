"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle2, Loader2 } from "lucide-react"

interface CrearLicitacionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  proveedoresCount: number
}

type EstadoModal = "confirmacion" | "creando" | "enviando" | "completado"

export function CrearLicitacionModal({ open, onOpenChange, onConfirm, proveedoresCount }: CrearLicitacionModalProps) {
  const [estado, setEstado] = useState<EstadoModal>("confirmacion")

  // Reiniciar el estado cuando se abre el modal
  useEffect(() => {
    if (open) {
      setEstado("confirmacion")
    }
  }, [open])

  const handleConfirm = () => {
    // Cambiar al estado "creando"
    setEstado("creando")

    // Simular la creación de la licitación (2 segundos)
    setTimeout(() => {
      // Si hay proveedores, cambiar al estado "enviando"
      if (proveedoresCount > 0) {
        setEstado("enviando")

        // Simular el envío de invitaciones (3 segundos)
        setTimeout(() => {
          setEstado("completado")
        }, 3000)
      } else {
        // Si no hay proveedores, ir directamente a "completado"
        setEstado("completado")
      }
    }, 2000)
  }

  const handleClose = () => {
    // Solo permitir cerrar en los estados "confirmacion" o "completado"
    if (estado === "confirmacion" || estado === "completado") {
      if (estado === "completado") {
        onConfirm()
      }
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {estado === "confirmacion" && (
          <>
            <DialogHeader>
              <DialogTitle>Crear licitación</DialogTitle>
              <DialogDescription>
                ¿Está seguro que desea crear esta licitación?
                {proveedoresCount > 0 && <> Se enviarán invitaciones a {proveedoresCount} proveedores.</>}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="button" onClick={handleConfirm}>
                Crear licitación
              </Button>
            </DialogFooter>
          </>
        )}

        {estado === "creando" && (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium">Creando licitación</h3>
            <p className="text-sm text-muted-foreground mt-2">Por favor espere mientras se crea la licitación...</p>
          </div>
        )}

        {estado === "enviando" && (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium">Enviando invitaciones</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Enviando invitaciones a {proveedoresCount} proveedores...
            </p>
          </div>
        )}

        {estado === "completado" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                Licitación creada exitosamente
              </DialogTitle>
              <DialogDescription>
                La licitación ha sido creada correctamente.
                {proveedoresCount > 0 && <> Se han enviado invitaciones a {proveedoresCount} proveedores.</>}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" onClick={handleClose}>
                Aceptar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
