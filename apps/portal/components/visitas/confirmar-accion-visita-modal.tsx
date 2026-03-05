"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ConfirmarAccionVisitaModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (motivo: string) => void
  accion: "aceptar" | "rechazar" | null
  visitaId?: string
}

export function ConfirmarAccionVisitaModal({
  isOpen,
  onClose,
  onConfirm,
  accion,
  visitaId,
}: ConfirmarAccionVisitaModalProps) {
  const [motivo, setMotivo] = useState("")
  const [error, setError] = useState("")

  const handleConfirm = () => {
    if (accion === "rechazar" && !motivo.trim()) {
      setError("Debe ingresar un motivo para rechazar la visita")
      return
    }
    onConfirm(motivo)
    setMotivo("")
    setError("")
  }

  const handleClose = () => {
    setMotivo("")
    setError("")
    onClose()
  }

  if (!accion) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {accion === "aceptar" ? "Confirmar Aprobación" : "Confirmar Rechazo"} {visitaId ? `#${visitaId}` : ""}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            {accion === "aceptar"
              ? `¿Está seguro que desea aprobar la solicitud de acceso${visitaId ? ` ${visitaId}` : ""}?`
              : `¿Está seguro que desea rechazar la solicitud de acceso${visitaId ? ` ${visitaId}` : ""}?`}
          </p>
          {accion === "rechazar" && (
            <div className="mt-4">
              <Label htmlFor="motivoRechazo" className="block text-sm font-medium text-gray-700 mb-1">
                Motivo del rechazo (obligatorio)
              </Label>
              <Textarea
                id="motivoRechazo"
                className={"w-full p-2 border rounded-md " + (error ? "border-red-500" : "border-gray-300")}
                rows={3}
                value={motivo}
                onChange={(e) => {
                  setMotivo(e.target.value)
                  if (e.target.value.trim()) setError("")
                }}
                placeholder="Indique el motivo del rechazo..."
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className={accion === "aceptar" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            disabled={accion === "rechazar" && !motivo.trim()}
          >
            {accion === "aceptar" ? "Aprobar" : "Rechazar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
