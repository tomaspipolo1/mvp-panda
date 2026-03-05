"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"

interface RegistrarEntregaProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: any) => void
  orden: {
    id: string
    numero: string
  } | null
}

export function RegistrarEntregaModal({ isOpen, onClose, onConfirm, orden }: RegistrarEntregaProps) {
  const [fechaEntrega, setFechaEntrega] = useState<string>(new Date().toISOString().split("T")[0])
  const [numeroRemito, setNumeroRemito] = useState<string>("")
  const [observaciones, setObservaciones] = useState<string>("")

  if (!orden) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm({
      ordenId: orden.id,
      fechaEntrega,
      numeroRemito,
      observaciones,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Entrega</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Orden de Compra</p>
              <p className="font-medium">{orden.numero}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="fechaEntrega" className="text-right">
                  Fecha de Entrega
                </Label>
                <div className="relative">
                  <Input
                    id="fechaEntrega"
                    type="date"
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e.target.value)}
                    className="w-full pl-10"
                    required
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <Label htmlFor="numeroRemito" className="text-right">
                  Número de Remito
                </Label>
                <Input
                  id="numeroRemito"
                  value={numeroRemito}
                  onChange={(e) => setNumeroRemito(e.target.value)}
                  placeholder="Ej: REM-2023-0123"
                  required
                />
              </div>
              <div>
                <Label htmlFor="observaciones" className="text-right">
                  Observaciones
                </Label>
                <Textarea
                  id="observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Ingrese observaciones adicionales"
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Confirmar Entrega</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
