"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle } from "lucide-react"
import { useState } from "react"

interface CerrarVisitaModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (observaciones: string) => void
  visita: {
    id: string
    numero: string
    visitante: string
    fechaVisita: string
    tipo: string
    sitio: string
    recurrente?: boolean
    fechaVigenciaHasta?: string
  } | null
}

export function CerrarVisitaModal({ isOpen, onClose, onConfirm, visita }: CerrarVisitaModalProps) {
  const [observaciones, setObservaciones] = useState("")

  if (!visita) return null

  const handleConfirm = () => {
    onConfirm(observaciones)
    setObservaciones("")
    onClose()
  }

  const handleClose = () => {
    setObservaciones("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cerrar Visita</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Número:</strong> {visita.numero}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Visitante:</strong> {visita.visitante}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Fecha:</strong> {visita.fechaVisita}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Sitio:</strong> {visita.sitio}
            </p>
          </div>

          {/* Advertencia para visitas recurrentes */}
          {visita.recurrente && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Visita Recurrente</p>
                  <p className="text-sm text-amber-700">
                    Esta visita es recurrente y está vigente hasta el{" "}
                    <strong>{visita.fechaVigenciaHasta}</strong>. 
                    Al cerrarla, solo se finalizará la sesión actual.
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-600 mb-3">
            ¿Está seguro que desea cerrar esta visita?
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones (opcional)
            </label>
            <Textarea
              placeholder="Agregue observaciones sobre el cierre de la visita..."
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} className="bg-blue-600 hover:bg-blue-700">
            Cerrar Visita
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}



