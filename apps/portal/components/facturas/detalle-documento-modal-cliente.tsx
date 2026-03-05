"use client"

import type React from "react"

import { useEffect } from "react"
import { X, Download, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface DetalleDocumentoClienteProps {
  isOpen: boolean
  onClose: () => void
  tipo: "facturas" | "notasCredito" | "notasDebito"
  documento: {
    id: string
    fecha: string
    numero: string
    concepto: string
    monto: number
    estado: string
    detalles?: {
      fechaVencimiento?: string
      ordenCompra?: string
      formaPago?: string
      observaciones?: string
    }
    historial?: Array<{
      usuario: string
      accion: string
      fecha: string
    }>
  } | null
}

export function DetalleDocumentoModalCliente({ isOpen, onClose, tipo, documento }: DetalleDocumentoClienteProps) {
  // Efecto para manejar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      // Bloquear el scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      // Restaurar el scroll del body cuando el modal se cierra
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  // Si el modal no está abierto o no hay documento, no renderizar nada
  if (!isOpen || !documento) return null

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
      case "Ingresada":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Ingresada</Badge>
      case "En Proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Proceso</Badge>
      case "Paga":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paga</Badge>
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

  // Función para manejar el clic en el overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Solo cerrar si se hizo clic directamente en el overlay, no en su contenido
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">
            {getTipoDocumento()} - {documento.numero}
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </Button>
            <Button type="button" variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4">
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
              <p className="text-sm text-gray-500">Organismo</p>
              <p className="font-medium">Consorcio de Gestión Puerto La Plata</p>
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
            <div>
              <p className="text-sm text-gray-500">Monto Total</p>
              <p className="font-medium">{formatCurrency(documento.monto)}</p>
            </div>
          </div>

          {documento.detalles?.observaciones && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Observaciones</p>
              <p className="mt-1 p-2 bg-gray-50 rounded-md">{documento.detalles.observaciones}</p>
            </div>
          )}

          <Separator className="my-4" />

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Historial de Acciones</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Usuario</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Acción</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {documento.historial ? (
                    documento.historial.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 px-4 text-sm">{item.usuario}</td>
                        <td className="py-2 px-4 text-sm">{item.accion}</td>
                        <td className="py-2 px-4 text-sm">{item.fecha}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-4 px-4 text-sm text-center text-gray-500">
                        No hay historial disponible
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}
