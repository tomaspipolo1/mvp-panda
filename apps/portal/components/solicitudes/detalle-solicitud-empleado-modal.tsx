"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Paperclip, Download, X } from "lucide-react"

interface DetalleSolicitudEmpleadoModalProps {
  isOpen: boolean
  onClose: () => void
  onCancelar?: (solicitud: any) => void
  solicitud: {
    id: number
    numero: string
    tipo: string
    estado: string
    fecha: string
    ultimaActualizacion: string
    empleado: {
      nombre: string
      apellido: string
      legajo: string
    }
    descripcion: string
    aprobadores: Array<{
      nombre: string
      apellido: string
      firma: string
      fecha: string | null
    }>
    documentos?: string[]
  } | null
}

export function DetalleSolicitudModal({ isOpen, onClose, onCancelar, solicitud }: DetalleSolicitudEmpleadoModalProps) {
  if (!solicitud) return null

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const renderFirmaBadge = (firma: string) => {
    switch (firma) {
      case "Aprobado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobado</Badge>
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      default:
        return <Badge>{firma}</Badge>
    }
  }

  const puedeCancel = solicitud.estado === "Pendiente" || solicitud.estado === "Aprobada"

  const handleCancelar = () => {
    if (onCancelar) {
      onCancelar(solicitud)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Detalle de Solicitud</DialogTitle>
            <div className="flex items-center space-x-2">
              {renderEstadoBadge(solicitud.estado)}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Número de Solicitud</h3>
              <p className="text-sm font-semibold">{solicitud.numero}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Tipo de Solicitud</h3>
              <p className="text-sm">{solicitud.tipo}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha de Solicitud</h3>
              <p className="text-sm">{solicitud.fecha}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Última Actualización</h3>
              <p className="text-sm">{solicitud.ultimaActualizacion}</p>
            </div>
          </div>

          <Separator />

          {/* Datos del empleado */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Datos del Empleado</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Nombre</h4>
                <p className="text-sm">{solicitud.empleado.nombre}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Apellido</h4>
                <p className="text-sm">{solicitud.empleado.apellido}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Legajo</h4>
                <p className="text-sm font-mono">{solicitud.empleado.legajo}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Descripción */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Descripción</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">{solicitud.descripcion}</p>
            </div>
          </div>

          <Separator />

          {/* Tabla de aprobadores */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Aprobadores</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Nombre y Apellido</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Firma</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitud.aprobadores.map((aprobador, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm">
                        {aprobador.nombre} {aprobador.apellido}
                      </td>
                      <td className="px-4 py-3 text-sm">{renderFirmaBadge(aprobador.firma)}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{aprobador.fecha || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Documentación adjunta */}
          {solicitud.documentos && solicitud.documentos.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Documentación Adjunta</h3>
                <div className="space-y-2">
                  {solicitud.documentos.map((documento, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Paperclip className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{documento}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-4 border-t">
          <div>
            {puedeCancel && (
              <Button variant="destructive" onClick={handleCancelar}>
                Cancelar Solicitud
              </Button>
            )}
          </div>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
