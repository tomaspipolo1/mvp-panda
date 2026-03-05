"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface DetalleOrdenProps {
  isOpen: boolean
  onClose: () => void
  orden: {
    id: string
    fecha: string
    numero: string
    concepto: string
    formaCobro: string
    monto: number
    estado: string
    detalles?: {
      fechaCobro?: string
      cuentaOrigen?: string
      cuentaDestino?: string
      referencia?: string
      observaciones?: string
      facturas?: Array<{
        numero: string
        fecha: string
        concepto: string
        monto: number
      }>
    }
  } | null
}

export function DetalleOrdenModal({ isOpen, onClose, orden }: DetalleOrdenProps) {
  if (!orden) return null

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Aprobada</Badge>
      case "Cobrada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Cobrada</Badge>
      case "Anulada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Anulada</Badge>
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span>Orden de Cobro - {orden.numero}</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Descargar PDF
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="font-medium">{orden.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <div>{getEstadoBadge(orden.estado)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Concepto</p>
              <p className="font-medium">{orden.concepto}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Forma de Cobro</p>
              <p className="font-medium">{orden.formaCobro}</p>
            </div>
            {orden.detalles?.fechaCobro && (
              <div>
                <p className="text-sm text-gray-500">Fecha de Cobro</p>
                <p className="font-medium">{orden.detalles.fechaCobro}</p>
              </div>
            )}
            {orden.detalles?.cuentaOrigen && (
              <div>
                <p className="text-sm text-gray-500">Cuenta Origen</p>
                <p className="font-medium">{orden.detalles.cuentaOrigen}</p>
              </div>
            )}
            {orden.detalles?.cuentaDestino && (
              <div>
                <p className="text-sm text-gray-500">Cuenta Destino</p>
                <p className="font-medium">{orden.detalles.cuentaDestino}</p>
              </div>
            )}
            {orden.detalles?.referencia && (
              <div>
                <p className="text-sm text-gray-500">Referencia</p>
                <p className="font-medium">{orden.detalles.referencia}</p>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {orden.detalles?.facturas && orden.detalles.facturas.length > 0 && (
            <>
              <h3 className="font-semibold mb-2">Facturas Incluidas</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Número</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Concepto</th>
                      <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orden.detalles.facturas.map((factura, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-sm">{factura.numero}</td>
                        <td className="py-2 px-4 text-sm">{factura.fecha}</td>
                        <td className="py-2 px-4 text-sm">{factura.concepto}</td>
                        <td className="py-2 px-4 text-sm text-right font-medium">{formatCurrency(factura.monto)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="py-2 px-4 text-right font-medium">
                        Total
                      </td>
                      <td className="py-2 px-4 text-right font-bold">{formatCurrency(orden.monto)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Separator className="my-4" />
            </>
          )}

          {orden.detalles?.observaciones && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Observaciones</p>
              <p className="mt-1 p-2 bg-gray-50 rounded-md">{orden.detalles.observaciones}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
