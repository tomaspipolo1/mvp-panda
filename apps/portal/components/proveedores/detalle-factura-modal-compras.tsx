"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, X } from "lucide-react"
import { type FacturaCompras } from "./tabla-facturas-compras"

interface DetalleFacturaModalComprasProps {
  isOpen: boolean
  onClose: () => void
  factura: FacturaCompras | null
}

export function DetalleFacturaModalCompras({ isOpen, onClose, factura }: DetalleFacturaModalComprasProps) {
  if (!factura) return null

  const handleDescargarArchivo = () => {
    console.log("Descargar archivo de factura:", factura.numeroFactura)
    alert(`Descargando ${factura.numeroFactura}.pdf`)
  }

  const handleClose = () => {
    // Cerrar el modal con un pequeño delay para evitar bloqueo de interfaz
    setTimeout(() => {
      onClose()
    }, 0)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {factura.numeroFactura} - {factura.proveedor}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Fila 1: CUIT, Punto de venta, Número */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cuit" className="text-gray-700">
                CUIT
              </Label>
              <Input
                id="cuit"
                value="30-71234567-8"
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <Label htmlFor="puntoVenta" className="text-gray-700">
                Punto de venta
              </Label>
              <Input
                id="puntoVenta"
                value="0001"
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <Label htmlFor="numero" className="text-gray-700">
                Número
              </Label>
              <Input
                id="numero"
                value="00012345"
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Fila 2: Fecha Emisión, Fecha Vencimiento, Monto Neto, Monto Total */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="fechaEmision" className="text-gray-700">
                Fecha Emisión
              </Label>
              <Input
                id="fechaEmision"
                type="date"
                value="2024-05-10"
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <Label htmlFor="fechaVencimiento" className="text-gray-700">
                Fecha Vencimiento
              </Label>
              <Input
                id="fechaVencimiento"
                type="date"
                value="2024-06-10"
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <Label htmlFor="montoNeto" className="text-gray-700">
                Monto Neto
              </Label>
              <Input
                id="montoNeto"
                value={factura.monto}
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <Label htmlFor="montoTotal" className="text-gray-700">
                Monto Total
              </Label>
              <Input
                id="montoTotal"
                value={factura.monto}
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Fila 3: Tipo Comprobante, Letra, Archivo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="tipoComprobante" className="text-gray-700">
                Tipo Comprobante
              </Label>
              <Input
                id="tipoComprobante"
                value="Factura"
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <Label htmlFor="letra" className="text-gray-700">
                Letra
              </Label>
              <Input
                id="letra"
                value="A"
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
            <div>
              <Label htmlFor="archivo" className="text-gray-700">
                Archivo (PDF)
              </Label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-gray-600 flex-1 truncate">{factura.numeroFactura}.pdf</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleDescargarArchivo}
                  title="Descargar archivo"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Detalle */}
          <div>
            <Label htmlFor="detalle" className="text-gray-700">
              Detalle
            </Label>
            <Textarea
              id="detalle"
              value="Servicios de mantenimiento portuario mes de mayo 2024"
              disabled
              className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed resize-none"
              rows={3}
            />
          </div>

          {/* Divisor */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Datos de ingreso (Mesa de Entradas) */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Datos de ingreso</h3>

            {/* Grid de 2 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Columna 1 */}
              <div className="space-y-4">
                {/* Número de Nota */}
                <div>
                  <Label htmlFor="numeroNota" className="text-gray-700">
                    Número de Nota <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="numeroNota"
                    value="N-2024-00567"
                    disabled
                    className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Orden de Compra */}
                <div>
                  <Label htmlFor="ordenCompra" className="text-gray-700">
                    Orden de Compra
                  </Label>
                  <Input
                    id="ordenCompra"
                    value="OC-2024-00123"
                    disabled
                    className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Columna 2 */}
              <div className="space-y-4">
                {/* Número de Expediente */}
                <div>
                  <Label htmlFor="numeroExpediente" className="text-gray-700">
                    Número de Expediente
                  </Label>
                  <Input
                    id="numeroExpediente"
                    value="EXP-2024-00234"
                    disabled
                    className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* Fecha Ingreso Mesa Entrada */}
                <div>
                  <Label htmlFor="fechaIngresoMesaEntrada" className="text-gray-700">
                    Fecha Ingreso Mesa Entrada <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fechaIngresoMesaEntrada"
                    type="date"
                    value="2024-05-10"
                    disabled
                    className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón para cerrar */}
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            <X className="mr-2 h-4 w-4" />
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

