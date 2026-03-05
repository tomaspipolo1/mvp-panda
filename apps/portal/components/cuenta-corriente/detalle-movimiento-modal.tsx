"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface DetalleMovimientoProps {
  isOpen: boolean
  onClose: () => void
  movimiento: {
    id: string
    fecha: string
    tipo: string
    numero: string
    concepto: string
    debe: number | null
    haber: number | null
    saldo: number
    estado: string
    detalles?: {
      entidad: string
      referencia?: string
      fechaVencimiento?: string
      items?: Array<{
        descripcion: string
        cantidad: number
        precioUnitario: number
        subtotal: number
      }>
      observaciones?: string
    }
  } | null
}

export function DetalleMovimientoModal({ isOpen, onClose, movimiento }: DetalleMovimientoProps) {
  if (!movimiento) return null

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
      case "Pagado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Pagado</Badge>
      case "Procesado":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Procesado</Badge>
      default:
        return null
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Factura":
        return "text-blue-600"
      case "Recibo":
        return "text-green-600"
      case "Nota de Crédito":
        return "text-red-600"
      case "Nota de Débito":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span className={getTipoColor(movimiento.tipo)}>{movimiento.tipo}</span>
              <span className="mx-2">-</span>
              <span>{movimiento.numero}</span>
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
              <p className="font-medium">{movimiento.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <div>{getEstadoBadge(movimiento.estado)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Concepto</p>
              <p className="font-medium">{movimiento.concepto}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Entidad</p>
              <p className="font-medium">{movimiento.detalles?.entidad || "N/A"}</p>
            </div>
            {movimiento.detalles?.referencia && (
              <div>
                <p className="text-sm text-gray-500">Referencia</p>
                <p className="font-medium">{movimiento.detalles.referencia}</p>
              </div>
            )}
            {movimiento.detalles?.fechaVencimiento && (
              <div>
                <p className="text-sm text-gray-500">Fecha de Vencimiento</p>
                <p className="font-medium">{movimiento.detalles.fechaVencimiento}</p>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {movimiento.detalles?.items && movimiento.detalles.items.length > 0 && (
            <>
              <h3 className="font-semibold mb-2">Detalle de Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Descripción</th>
                      <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">Cantidad</th>
                      <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">Precio Unitario</th>
                      <th className="py-2 px-4 text-right text-sm font-medium text-gray-600">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movimiento.detalles.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-sm">{item.descripcion}</td>
                        <td className="py-2 px-4 text-sm text-right">{item.cantidad}</td>
                        <td className="py-2 px-4 text-sm text-right">{formatCurrency(item.precioUnitario)}</td>
                        <td className="py-2 px-4 text-sm text-right font-medium">{formatCurrency(item.subtotal)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="py-2 px-4 text-right font-medium">
                        Total
                      </td>
                      <td className="py-2 px-4 text-right font-bold">
                        {formatCurrency(movimiento.detalles.items.reduce((sum, item) => sum + item.subtotal, 0))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Separator className="my-4" />
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Monto</p>
              <p className="font-bold text-lg">
                {movimiento.debe !== null
                  ? formatCurrency(movimiento.debe)
                  : movimiento.haber !== null
                    ? formatCurrency(movimiento.haber)
                    : "-"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Saldo Resultante</p>
              <p className="font-bold text-lg">{formatCurrency(movimiento.saldo)}</p>
            </div>
          </div>

          {movimiento.detalles?.observaciones && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Observaciones</p>
              <p className="mt-1 p-2 bg-gray-50 rounded-md">{movimiento.detalles.observaciones}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
