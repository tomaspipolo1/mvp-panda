"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar } from "lucide-react"

interface VerDocumentoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  documento: {
    nombre: string
    tipo: string
    tamano: string
    fechaActualizacion: string
    fechaVencimiento?: string
  }
}

export function VerDocumentoModal({ open, onOpenChange, documento }: VerDocumentoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Documento: {documento.nombre}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-gray-50">
            <FileText className="h-16 w-16 text-plp-primary mb-4" />
            <h3 className="text-lg font-semibold mb-1">{documento.nombre}</h3>
            <p className="text-sm text-gray-500 mb-4">
              {documento.tipo} - {documento.tamano}
            </p>
            <div className="flex flex-col w-full space-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Actualizado: {documento.fechaActualizacion}</span>
              </div>
              {documento.fechaVencimiento && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Vence: {documento.fechaVencimiento}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Vista previa no disponible</p>
            <div className="h-40 border rounded-lg flex items-center justify-center bg-gray-100">
              <p className="text-gray-400">Vista previa no disponible para este tipo de documento</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Descargar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
