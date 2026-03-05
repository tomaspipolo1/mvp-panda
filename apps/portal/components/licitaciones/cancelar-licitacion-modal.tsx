"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CancelarLicitacionModalProps {
  isOpen: boolean
  onClose: () => void
  licitacionId: string
  licitacionTitulo: string
  licitacionNumero: string
  onCancelar: (motivo: string) => void
}

export function CancelarLicitacionModal({
  isOpen,
  onClose,
  licitacionId,
  licitacionTitulo,
  licitacionNumero,
  onCancelar,
}: CancelarLicitacionModalProps) {
  const [motivo, setMotivo] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!motivo.trim()) {
      setError("Debe ingresar un motivo para cancelar la licitación")
      return
    }

    onCancelar(motivo)
  }

  const handleClose = () => {
    setMotivo("")
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-red-600">Cancelar Licitación</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <h3 className="font-semibold text-lg">{licitacionTitulo}</h3>
            <p className="text-sm text-gray-500">Número: {licitacionNumero}</p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
              <div>
                <h4 className="font-semibold text-red-800">Atención</h4>
                <p className="text-sm text-red-700">
                  Está a punto de cancelar esta licitación. Esta acción no se puede deshacer y notificará a todos los
                  proveedores inscritos.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivo" className="font-medium">
                Motivo de cancelación <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="motivo"
                placeholder="Ingrese el motivo por el cual se cancela la licitación..."
                value={motivo}
                onChange={(e) => {
                  setMotivo(e.target.value)
                  if (e.target.value.trim()) setError("")
                }}
                className={`min-h-[120px] ${error ? "border-red-500" : ""}`}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleClose}>
            Volver
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            Confirmar Cancelación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
