"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, Phone, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export interface ContactoExternoModalProps {
  /** Controla si el modal está abierto */
  open: boolean
  /** Callback al cambiar estado (cerrar/abrir) */
  onOpenChange: (open: boolean) => void
  /** Teléfono de la empresa/organismo (se muestra y usa en link tel:) */
  telefono: string
  /** Correo electrónico (se muestra y usa en link mailto:) */
  email: string
  /** Título opcional del modal (ej. "Contactar a TecPlata") */
  titulo?: string
  /** Clase opcional para el contenido del modal */
  className?: string
}

/**
 * Modal de contacto externo al puerto (terminales, operadores, organismos).
 * Muestra teléfono y correo; se cierra con el botón o al hacer clic fuera.
 */
export function ContactoExternoModal({
  open,
  onOpenChange,
  telefono,
  email,
  titulo = "Contacto",
  className,
}: ContactoExternoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-lg",
            className
          )}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <DialogPrimitive.Title className="text-xl font-semibold text-gray-900">
                {titulo}
              </DialogPrimitive.Title>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full opacity-70 hover:opacity-100"
                  aria-label="Cerrar"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={`tel:${telefono.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-lg border border-plp-gray-200 bg-plp-gray-50/50 px-4 py-3 text-plp-gray-800 hover:bg-plp-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5 text-plp-primary shrink-0" />
                <span className="font-medium">{telefono}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 rounded-lg border border-plp-gray-200 bg-plp-gray-50/50 px-4 py-3 text-plp-gray-800 hover:bg-plp-gray-100 transition-colors"
              >
                <Mail className="h-5 w-5 text-plp-primary shrink-0" />
                <span className="font-medium break-all">{email}</span>
              </a>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
