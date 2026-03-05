"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface DetallePercepcionProps {
  isOpen: boolean
  onClose: () => void
  percepcion: {
    id: string
    fecha: string
    tipo: string
    jurisdiccion: string
    comprobante: string
    concepto: string
    baseImponible: number
    alicuota: number
    monto: number
    detalles?: {
      fechaVencimiento?: string
      ordenCompra?: string
      formaPago?: string
      observaciones?: string
      items?: Array<{
        codigo: string
        descripcion: string
        cantidad: number
        precioUnitario: number
        subtotal: number
      }>
    }
  } | null
}

export function DetallePercepcionModal({ isOpen, onClose, percepcion }: DetallePercepcionProps) {
  if (!percepcion) return null

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const formatPercentage = (value: number) => {
    return `${value}%`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span>Detalle de Percepción - {percepcion.comprobante}</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Descargar Certificado
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="font-medium">{percepcion.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipo de Percepción</p>
              <p className="font-medium">{percepcion.tipo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jurisdicción</p>
              <p className="font-medium">{percepcion.jurisdiccion}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Comprobante</p>
              <p className="font-medium">{percepcion.comprobante}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Concepto</p>
              <p className="font-medium">{percepcion.concepto}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Base Imponible</p>
              <p className="font-medium">{formatCurrency(percepcion.baseImponible)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Alícuota</p>
              <p className="font-medium">{formatPercentage(percepcion.alicuota)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monto</p>
              <p className="font-medium">{formatCurrency(percepcion.monto)}</p>
            </div>
          </div>

          <Separator className="my-4" />

          {percepcion.detalles?.items && percepcion.detalles.items.length > 0 && (
            <>
              <h3 className="font-semibold mb-2">Detalle de Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Código</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Descripción</th>
                      <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">Cantidad</th>
                      <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">Precio Unitario</th>
                      <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {percepcion.detalles.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-sm">{item.codigo}</td>
                        <td className="py-2 px-4 text-sm">{item.descripcion}</td>
                        <td className="py-2 px-4 text-sm text-right">{item.cantidad}</td>
                        <td className="py-2 px-4 text-sm text-right">{formatCurrency(item.precioUnitario)}</td>
                        <td className="py-2 px-4 text-sm text-right font-medium">{formatCurrency(item.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Separator className="my-4" />
            </>
          )}

          {percepcion.detalles?.observaciones && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Observaciones</p>
              <p className="mt-1 p-2 bg-gray-50 rounded-md">{percepcion.detalles.observaciones}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
