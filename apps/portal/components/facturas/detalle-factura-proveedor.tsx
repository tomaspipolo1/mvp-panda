"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, X } from "lucide-react"

interface Documento {
  id: string
  fecha: string
  numero: string
  puntoVenta: string
  fechaVencimiento: string
  tipoComprobante: string
  ordenCompra: string
  cliente: string
  concepto: string
  monto: number
  estado: string
  fechaEstimadaPago?: string
}

interface DetalleFacturaProveedorProps {
  isOpen: boolean
  onClose: () => void
  documento: Documento | null
}

export function DetalleFacturaProveedor({ isOpen, onClose, documento }: DetalleFacturaProveedorProps) {
  if (!documento) return null

  const handleDescargarArchivo = () => {
    console.log("Descargar archivo de factura:", documento.numero)
    alert(`Descargando ${documento.tipoComprobante}-${documento.puntoVenta}-${documento.numero}.pdf`)
  }

  const handleClose = () => {
    // Cerrar el modal con un pequeño delay para evitar bloqueo de interfaz
    setTimeout(() => {
      onClose()
    }, 0)
  }

  // Extraer la letra del tipo de comprobante
  const getLetra = () => {
    if (documento.tipoComprobante.includes("Factura")) {
      return documento.tipoComprobante.split(" ").pop() || "A"
    } else if (documento.tipoComprobante.includes("Nota") && documento.tipoComprobante.includes("Crédito")) {
      return documento.tipoComprobante.split(" ").pop() || "A"
    } else if (documento.tipoComprobante.includes("Nota") && documento.tipoComprobante.includes("Débito")) {
      return documento.tipoComprobante.split(" ").pop() || "A"
    }
    return "A"
  }

  // Formatear el número de factura completo
  const getNumeroFacturaCompleto = () => {
    const tipoAbrev = documento.tipoComprobante.includes("Factura")
      ? "FC"
      : documento.tipoComprobante.includes("Crédito")
      ? "NC"
      : "ND"
    return `${tipoAbrev}-${getLetra()}-${documento.puntoVenta}-${documento.numero}`
  }

  // CUIT hardcodeado
  const cuit = "30-71234567-8"

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {getNumeroFacturaCompleto()} - {documento.cliente}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Primera fila: CUIT, Punto de venta, Número */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cuit" className="text-gray-700">
                CUIT
              </Label>
              <Input id="cuit" value={cuit} disabled className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed" />
            </div>
            <div>
              <Label htmlFor="puntoVenta" className="text-gray-700">
                Punto de venta
              </Label>
              <Input
                id="puntoVenta"
                value={documento.puntoVenta}
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
                value={documento.numero}
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Segunda fila: Fecha Emisión, Fecha Vencimiento, Monto Neto, Monto Total */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="fechaEmision" className="text-gray-700">
                Fecha Emisión
              </Label>
              <Input
                id="fechaEmision"
                value={documento.fecha}
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
                value={documento.fechaVencimiento}
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
                value={`$${documento.monto.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
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
                value={`$${documento.monto.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
                disabled
                className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tercera fila: Tipo Comprobante, Letra, Archivo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="tipoComprobante" className="text-gray-700">
                Tipo Comprobante
              </Label>
              <Select value="factura" disabled>
                <SelectTrigger className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed">
                  <SelectValue placeholder="Seleccione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="factura">Factura</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="letra" className="text-gray-700">
                Letra
              </Label>
              <Select value={getLetra().toLowerCase()} disabled>
                <SelectTrigger className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed">
                  <SelectValue placeholder="Seleccione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="archivo" className="text-gray-700">
                Archivo (PDF)
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="archivo"
                  value={`${getNumeroFacturaCompleto()}.pdf`}
                  disabled
                  className="bg-gray-100 text-gray-600 cursor-not-allowed"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleDescargarArchivo}
                  className="shrink-0"
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
              value={documento.concepto}
              disabled
              className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed"
              rows={3}
            />
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

