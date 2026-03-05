"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DetalleFacturaProveedorModalProps {
  isOpen: boolean
  onClose: () => void
  facturaId: string
}

export function DetalleFacturaProveedorModal({ isOpen, onClose, facturaId }: DetalleFacturaProveedorModalProps) {
  // Datos de ejemplo para la factura
  const factura = {
    id: "1",
    proveedor: "Suministros Industriales S.A.",
    cuit: "30-12345678-9",
    tipo: "Factura A",
    numeroFactura: "FC-A-0003-00000458",
    numeroOC: "0000123",
    estado: "Cargada",
    fechaEmision: "15/04/2023",
    fechaVencimiento: "15/05/2023",
    montoNeto: 70500.00,
    montoTotal: 85430.00,
    archivo: "factura_458.pdf",
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Cargada":
        return "bg-blue-100 text-blue-800"
      case "En Proceso":
        return "bg-yellow-100 text-yellow-800"
      case "Paga":
        return "bg-green-100 text-green-800"
      case "Anulada":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="pb-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-xl font-bold">Detalle de Factura</DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                {factura.tipo} - {factura.proveedor}
              </p>
            </div>
            <Badge className={`${getEstadoColor(factura.estado)} px-3 py-1 text-sm`}>{factura.estado}</Badge>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Proveedor</h3>
              <p className="font-semibold">{factura.proveedor}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">CUIT</h3>
              <p className="font-semibold">{factura.cuit}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Número Factura</h3>
              <p className="font-semibold font-mono">{factura.numeroFactura}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">N° Orden de Compra</h3>
              <p className="font-semibold">{factura.numeroOC}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha Emisión</h3>
              <p className="font-semibold">{factura.fechaEmision}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha Vencimiento</h3>
              <p className="font-semibold">{factura.fechaVencimiento}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Monto Neto</h3>
              <p className="font-semibold">${factura.montoNeto.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Monto Total</h3>
              <p className="font-semibold text-blue-700">${factura.montoTotal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="mb-6">
          <h3 className="text-md font-semibold mb-3">Archivo Adjunto</h3>
          <div className="border rounded-md p-3 flex items-center justify-between bg-gray-50">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              <span>{factura.archivo}</span>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
