"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Comentario {
  id: string
  fecha: string
  usuario: string
  texto: string
}

interface Historial {
  id: string
  fecha: string
  accion: string
  usuario: string
  comentario: string | null
}

interface DetalleSolicitudUsuarioBasicoProps {
  isOpen: boolean
  onClose: () => void
  solicitud: {
    id: string
    fecha: string
    numero: string
    tipo: string
    clase: string
    asunto: string
    estado: string
    ultimaActualizacion: string
    descripcion: string
    comentarios: Comentario[]
    historial: Historial[]
  } | null
}

export function DetalleSolicitudModalUsuarioBasico({ isOpen, onClose, solicitud }: DetalleSolicitudUsuarioBasicoProps) {
  if (!solicitud) return null

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En Proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Proceso</Badge>
      case "Resuelta":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resuelta</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalle de Solicitud - {solicitud.numero}</span>
            {getEstadoBadge(solicitud.estado)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información General */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha de Creación</h3>
              <p className="text-gray-900">{solicitud.fecha}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Última Actualización</h3>
              <p className="text-gray-900">{solicitud.ultimaActualizacion}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Tipo</h3>
              <p className="text-gray-900">{solicitud.tipo}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Clase</h3>
              <p className="text-gray-900">{solicitud.clase}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Asunto</h3>
            <p className="text-gray-900">{solicitud.asunto}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Descripción</h3>
            <p className="text-gray-900 whitespace-pre-wrap">{solicitud.descripcion}</p>
          </div>

          <Separator />

          {/* Tabs para Comentarios e Historial */}
          <Tabs defaultValue="comentarios" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comentarios">Comentarios ({solicitud.comentarios.length})</TabsTrigger>
              <TabsTrigger value="historial">Historial ({solicitud.historial.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="comentarios" className="mt-4">
              <div className="space-y-4">
                {solicitud.comentarios.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No hay comentarios disponibles</p>
                ) : (
                  solicitud.comentarios.map((comentario) => (
                    <div key={comentario.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-900">{comentario.usuario}</span>
                        <span className="text-sm text-gray-500">{comentario.fecha}</span>
                      </div>
                      <p className="text-gray-700">{comentario.texto}</p>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="historial" className="mt-4">
              <div className="space-y-4">
                {solicitud.historial.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No hay historial disponible</p>
                ) : (
                  solicitud.historial.map((item) => (
                    <div key={item.id} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-900">{item.accion}</span>
                        <span className="text-sm text-gray-500">{item.fecha}</span>
                      </div>
                      <p className="text-sm text-gray-600">por {item.usuario}</p>
                      {item.comentario && (
                        <p className="text-gray-700 mt-1 italic">"{item.comentario}"</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
