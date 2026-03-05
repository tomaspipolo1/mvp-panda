"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface DetalleOrdenProps {
  isOpen: boolean
  onClose: () => void
  orden: {
    id: string
    fecha: string
    numero: string
    expediente: string
    descripcion: string
    monto: number
    detalles?: {
      contacto?: string
      observaciones?: string
      items: Array<{
        codigo: string
        descripcion: string
        cantidad: number
        precioUnitario: number
        subtotal: number
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


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span>Orden de Compra - {orden.numero}</span>
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
              <p className="text-sm text-gray-500">Número</p>
              <p className="font-medium">{orden.numero}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha OC</p>
              <p className="font-medium">{orden.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Expediente</p>
              <p className="font-medium">{orden.expediente}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Descripción</p>
              <p className="font-medium">{orden.descripcion}</p>
            </div>
            {orden.detalles?.contacto && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Contacto (Proveedor)</p>
                <p className="font-medium">{orden.detalles.contacto}</p>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {orden.detalles?.items && orden.detalles.items.length > 0 && (
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
                    {orden.detalles.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-sm">{item.codigo}</td>
                        <td className="py-2 px-4 text-sm">{item.descripcion}</td>
                        <td className="py-2 px-4 text-sm text-right">{item.cantidad}</td>
                        <td className="py-2 px-4 text-sm text-right">{formatCurrency(item.precioUnitario)}</td>
                        <td className="py-2 px-4 text-sm text-right font-medium">{formatCurrency(item.subtotal)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-2 px-4 text-right font-medium">
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
