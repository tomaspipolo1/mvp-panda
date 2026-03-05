"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Award, AlertTriangle } from "lucide-react"

// Datos de ejemplo para las ofertas
const ofertasEjemplo = [
  {
    id: "1",
    proveedor: {
      id: "p1",
      nombre: "TecnoSoluciones S.A.",
      cuit: "30-12345678-9",
    },
    monto: 1180000,
    fechaPresentacion: "25/04/2023",
    estado: "Presentada",
  },
  {
    id: "2",
    proveedor: {
      id: "p2",
      nombre: "InnovaTech Argentina",
      cuit: "30-98765432-1",
    },
    monto: 1250000,
    fechaPresentacion: "26/04/2023",
    estado: "Presentada",
  },
  {
    id: "3",
    proveedor: {
      id: "p3",
      nombre: "Equipamiento Sur",
      cuit: "30-45678912-3",
    },
    monto: 1320000,
    fechaPresentacion: "27/04/2023",
    estado: "Presentada",
  },
  {
    id: "4",
    proveedor: {
      id: "p4",
      nombre: "Sistemas Integrados S.R.L.",
      cuit: "30-78912345-6",
    },
    monto: 1150000,
    fechaPresentacion: "28/04/2023",
    estado: "Presentada",
  },
]

interface AnunciarAdjudicacionModalProps {
  isOpen: boolean
  onClose: () => void
  licitacionId: string
  licitacionTitulo: string
  licitacionNumero: string
  onAdjudicar: (ofertaId: string, proveedorNombre: string, montoOferta: number) => void
}

export function AnunciarAdjudicacionModal({
  isOpen,
  onClose,
  licitacionId,
  licitacionTitulo,
  licitacionNumero,
  onAdjudicar,
}: AnunciarAdjudicacionModalProps) {
  const [selectedOfertaId, setSelectedOfertaId] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Formatear montos en pesos argentinos
  const formatMonto = (monto: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(monto)
  }

  const handleSeleccionarOferta = (ofertaId: string) => {
    setSelectedOfertaId(ofertaId)
  }

  const handleAdjudicarClick = () => {
    setShowConfirmation(true)
  }

  const handleConfirmarAdjudicacion = () => {
    const ofertaSeleccionada = ofertasEjemplo.find((o) => o.id === selectedOfertaId)
    if (ofertaSeleccionada) {
      onAdjudicar(ofertaSeleccionada.id, ofertaSeleccionada.proveedor.nombre, ofertaSeleccionada.monto)
    }
  }

  const handleCancel = () => {
    // Resetear el estado y cerrar el modal
    setSelectedOfertaId(null)
    setShowConfirmation(false)
    onClose()
  }

  const ofertaSeleccionada = ofertasEjemplo.find((o) => o.id === selectedOfertaId)

  // Si estamos mostrando la confirmación, mostrar ese contenido en lugar del selector de ofertas
  if (showConfirmation && ofertaSeleccionada) {
    return (
      <Dialog open={isOpen} onOpenChange={handleCancel}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Confirmar Adjudicación
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="mb-4">
              Está a punto de adjudicar la licitación <strong>N° {licitacionNumero}</strong> a:
            </p>

            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="font-medium">{ofertaSeleccionada.proveedor.nombre}</p>
              <p className="text-gray-600">Monto: {formatMonto(ofertaSeleccionada.monto)}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> Esta acción no se puede deshacer y notificará automáticamente a todos los
                proveedores participantes.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmarAdjudicacion} className="bg-purple-600 hover:bg-purple-700">
              Confirmar Adjudicación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Mostrar el selector de ofertas (vista principal)
  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Award className="mr-2 h-5 w-5 text-purple-600" />
            Anunciar Adjudicación
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{licitacionTitulo}</h3>
            <p className="text-gray-600">Licitación N° {licitacionNumero}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Seleccione el proveedor ganador:</h4>
            <RadioGroup value={selectedOfertaId || ""} onValueChange={handleSeleccionarOferta}>
              <div className="space-y-4">
                {ofertasEjemplo.map((oferta) => (
                  <div
                    key={oferta.id}
                    className={`flex items-start p-4 border rounded-md ${
                      selectedOfertaId === oferta.id ? "border-purple-500 bg-purple-50" : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem value={oferta.id} id={`oferta-${oferta.id}`} className="mt-1" />
                    <div className="ml-3 flex-1">
                      <Label htmlFor={`oferta-${oferta.id}`} className="font-medium text-gray-900 cursor-pointer">
                        {oferta.proveedor.nombre}
                      </Label>
                      <div className="mt-1 text-sm text-gray-600">
                        <p>CUIT: {oferta.proveedor.cuit}</p>
                        <p>Monto ofertado: {formatMonto(oferta.monto)}</p>
                        <p>Fecha de presentación: {oferta.fechaPresentacion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {selectedOfertaId && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-yellow-800">Importante</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Al adjudicar esta licitación a{" "}
                    <span className="font-medium">{ofertaSeleccionada?.proveedor.nombre}</span>, se notificará
                    automáticamente a todos los proveedores participantes. Esta acción no se puede deshacer.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            onClick={handleAdjudicarClick}
            disabled={!selectedOfertaId}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Adjudicar Ganador
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
