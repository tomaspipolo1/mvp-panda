"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Download } from "lucide-react"
import { confirmarIngresoFactura, confirmarAnulacionFactura, mostrarErrorValidacion } from "./factura-confirmations"
import type { Factura } from "./tabla-facturas-mesa-entradas"

interface IngresoFacturaModalProps {
  isOpen: boolean
  onClose: () => void
  factura: Factura | null
  onIngresar: (data: IngresoFacturaData) => void
  onAnular: () => void
}

export interface IngresoFacturaData {
  numeroNota: string
  numeroExpediente: string
  numeroOrdenCompra: string
  fechaIngresoMesaEntrada: string
}

export function IngresoFacturaModal({
  isOpen,
  onClose,
  factura,
  onIngresar,
  onAnular,
}: IngresoFacturaModalProps) {
  const [numeroNota, setNumeroNota] = useState("")
  const [numeroExpediente, setNumeroExpediente] = useState("")
  const [numeroOrdenCompra, setNumeroOrdenCompra] = useState("")
  const [fechaIngresoMesaEntrada, setFechaIngresoMesaEntrada] = useState("")

  if (!isOpen || !factura) return null

  const handleIngresar = async () => {
    // Validar campos obligatorios
    if (!numeroNota.trim()) {
      await mostrarErrorValidacion("El número de nota es obligatorio")
      return
    }

    if (!fechaIngresoMesaEntrada.trim()) {
      await mostrarErrorValidacion("La fecha de ingreso a mesa de entradas es obligatoria")
      return
    }

    // Mostrar confirmación y mensaje de éxito si se confirma
    const result = await confirmarIngresoFactura(factura.numeroFactura, numeroNota)

    if (result.isConfirmed) {
      // Ejecutar callback
      onIngresar({
        numeroNota,
        numeroExpediente,
        numeroOrdenCompra,
        fechaIngresoMesaEntrada,
      })

      // Limpiar campos y cerrar modal
      setNumeroNota("")
      setNumeroExpediente("")
      setNumeroOrdenCompra("")
      setFechaIngresoMesaEntrada("")
      onClose()
    }
  }

  const handleAnular = async () => {
    // Mostrar confirmación y mensaje de éxito si se confirma
    const result = await confirmarAnulacionFactura(factura.numeroFactura)

    if (result.isConfirmed) {
      onAnular()
      onClose()
    }
  }

  const handleCancelar = () => {
    // Limpiar campos
    setNumeroNota("")
    setNumeroExpediente("")
    setNumeroOrdenCompra("")
    setFechaIngresoMesaEntrada("")
    onClose()
  }

  const handleDescargarArchivo = () => {
    console.log("Descargando archivo de la factura:", factura)
    // TODO: Implementar lógica de descarga del archivo PDF
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">
            {factura.numeroFactura} - {factura.proveedor}
          </h2>
          <button
            onClick={handleCancelar}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
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
              <Select disabled value="factura">
                <SelectTrigger id="tipoComprobante" className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed">
                  <SelectValue placeholder="Seleccionar tipo" />
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
              <Select disabled value="A">
                <SelectTrigger id="letra" className="mt-1 bg-gray-100 text-gray-600 cursor-not-allowed">
                  <SelectValue placeholder="Seleccionar letra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="archivo" className="text-gray-700">
                Archivo (PDF)
              </Label>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm text-gray-600 flex-1 truncate">
                  {factura.numeroFactura}.pdf
                </span>
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

          {/* CAMPOS EDITABLES */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Datos de ingreso</h3>

            {/* Grid de 2 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Columna 1 */}
              <div className="space-y-4">
                {/* Número de Nota (obligatorio) */}
                <div>
                  <Label htmlFor="numeroNota" className="text-gray-700">
                    Número de Nota <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="numeroNota"
                    placeholder="Ingrese el número de nota"
                    value={numeroNota}
                    onChange={(e) => setNumeroNota(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                {/* Orden de Compra */}
                <div>
                  <Label htmlFor="ordenCompra" className="text-gray-700">
                    Orden de Compra
                  </Label>
                  <Input
                    id="ordenCompra"
                    placeholder="0000000"
                    value={numeroOrdenCompra}
                    onChange={(e) => setNumeroOrdenCompra(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Columna 2 */}
              <div className="space-y-4">
                {/* Número de Expediente (opcional) */}
                <div>
                  <Label htmlFor="numeroExpediente" className="text-gray-700">
                    Número de Expediente
                  </Label>
                  <Input
                    id="numeroExpediente"
                    placeholder="Ingrese el número de expediente (opcional)"
                    value={numeroExpediente}
                    onChange={(e) => setNumeroExpediente(e.target.value)}
                    className="mt-1"
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
                    value={fechaIngresoMesaEntrada}
                    onChange={(e) => setFechaIngresoMesaEntrada(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con botones */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={handleCancelar}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleAnular}
            className="bg-red-600 hover:bg-red-700"
          >
            Anular
          </Button>
          <Button
            onClick={handleIngresar}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Ingresar
          </Button>
        </div>
      </div>
    </div>
  )
}

