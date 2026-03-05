"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Calendar, User, Clock, Tag } from "lucide-react"

interface DetalleSolicitudModalProps {
  isOpen: boolean
  onClose: () => void
  solicitud: {
    id: number
    numero: string
    tipo: string
    asunto: string
    descripcion: string
    fecha: string
    estado: string
    ultimaActualizacion: string
    solicitante: string
    fechaInicio?: string
    fechaFin?: string
    monto?: string
    periodo?: string
    comentarios: Array<{
      id: number
      autor: string
      fecha: string
      texto: string
    }>
    documentos: Array<{
      id: number
      nombre: string
      tipo: string
      tamano: string
    }>
  }
}

export function DetalleSolicitudModal({ isOpen, onClose, solicitud }: DetalleSolicitudModalProps) {
  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  // Renderizado condicional de campos específicos según el tipo de solicitud
  const renderCamposEspecificos = () => {
    if (
      solicitud.tipo === "Licencia Ordinaria Anual" ||
      solicitud.tipo === "Licencia Médica" ||
      solicitud.tipo === "Día de trámite"
    ) {
      return (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Fecha de Inicio</p>
            <p className="text-sm">{solicitud.fechaInicio || "No especificada"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Fecha de Fin</p>
            <p className="text-sm">{solicitud.fechaFin || "No especificada"}</p>
          </div>
        </div>
      )
    } else if (solicitud.tipo === "Solicitud de Préstamo") {
      return (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">Monto Solicitado</p>
          <p className="text-sm">${solicitud.monto || "No especificado"}</p>
        </div>
      )
    } else if (solicitud.tipo === "Solicitud de Recibos de Sueldo") {
      return (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">Período</p>
          <p className="text-sm">{solicitud.periodo || "No especificado"}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalle de Solicitud</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Encabezado */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{solicitud.asunto}</h3>
              <p className="text-sm text-gray-500">Solicitud #{solicitud.numero}</p>
            </div>
            <div>{renderEstadoBadge(solicitud.estado)}</div>
          </div>

          <Separator />

          {/* Información general */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <Tag className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Tipo de Solicitud</p>
                  <p className="text-sm">{solicitud.tipo}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha de Solicitud</p>
                  <p className="text-sm">{solicitud.fecha}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Última Actualización</p>
                  <p className="text-sm">{solicitud.ultimaActualizacion}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Solicitante</p>
                  <p className="text-sm">{solicitud.solicitante}</p>
                </div>
              </div>

              {/* Campos específicos según el tipo de solicitud */}
              {renderCamposEspecificos()}
            </div>
          </div>

          <Separator />

          {/* Descripción */}
          <div>
            <h4 className="text-md font-semibold mb-2">Descripción</h4>
            <p className="text-sm whitespace-pre-line">{solicitud.descripcion}</p>
          </div>

          {/* Documentos adjuntos */}
          <div>
            <h4 className="text-md font-semibold mb-2">Documentos Adjuntos</h4>
            {solicitud.documentos.length > 0 ? (
              <div className="space-y-2">
                {solicitud.documentos.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{doc.nombre}</p>
                        <p className="text-xs text-gray-500">
                          {doc.tipo} • {doc.tamano}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No hay documentos adjuntos</p>
            )}
          </div>

          {/* Comentarios */}
          <div>
            <h4 className="text-md font-semibold mb-2">Comentarios</h4>
            {solicitud.comentarios.length > 0 ? (
              <div className="space-y-4">
                {solicitud.comentarios.map((comentario) => (
                  <div key={comentario.id} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">{comentario.autor}</p>
                      <p className="text-xs text-gray-500">{comentario.fecha}</p>
                    </div>
                    <p className="text-sm">{comentario.texto}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No hay comentarios</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
