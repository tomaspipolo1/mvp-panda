"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface DetalleDocumentoProps {
  isOpen: boolean
  onClose: () => void
  tipo: "facturas" | "notasCredito" | "notasDebito"
  documento: {
    id: string
    fecha: string
    numero: string
    cliente: string
    concepto: string
    monto: number
    estado: string
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

export function DetalleDocumentoModal({ isOpen, onClose, tipo, documento }: DetalleDocumentoProps) {
  if (!documento) return null

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
      // Estados de Proveedores
      case "Cargada":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Cargada</Badge>
      case "En Proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Proceso</Badge>
      case "Paga":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paga</Badge>
      case "Anulada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Anulada</Badge>
      // Estados de Clientes
      case "Emitida":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Emitida</Badge>
      case "Cobrada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Cobrada</Badge>
      case "Vencida":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Vencida</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const getTipoDocumento = () => {
    switch (tipo) {
      case "facturas":
        return "Factura"
      case "notasCredito":
        return "Nota de Crédito"
      case "notasDebito":
        return "Nota de Débito"
      default:
        return "Documento"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span>{getTipoDocumento()}</span>
              <span className="mx-2">-</span>
              <span>{documento.numero}</span>
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
              <p className="font-medium">{documento.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <div>{getEstadoBadge(documento.estado)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cliente</p>
              <p className="font-medium">{documento.cliente}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Concepto</p>
              <p className="font-medium">{documento.concepto}</p>
            </div>
            {documento.detalles?.fechaVencimiento && (
              <div>
                <p className="text-sm text-gray-500">Fecha de Vencimiento</p>
                <p className="font-medium">{documento.detalles.fechaVencimiento}</p>
              </div>
            )}
            {documento.detalles?.ordenCompra && (
              <div>
                <p className="text-sm text-gray-500">Orden de Compra</p>
                <p className="font-medium">{documento.detalles.ordenCompra}</p>
              </div>
            )}
            {documento.detalles?.formaPago && (
              <div>
                <p className="text-sm text-gray-500">Forma de Pago</p>
                <p className="font-medium">{documento.detalles.formaPago}</p>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {documento.detalles?.items && documento.detalles.items.length > 0 && (
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
                    {documento.detalles.items.map((item, index) => (
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
                      <td className="py-2 px-4 text-right font-bold">
                        {formatCurrency(documento.monto)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Separator className="my-4" />
            </>
          )}

          {documento.detalles?.observaciones && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Observaciones</p>
              <p className="mt-1 p-2 bg-gray-50 rounded-md">{documento.detalles.observaciones}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
