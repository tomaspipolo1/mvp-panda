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

interface DetalleSolicitudProps {
  isOpen: boolean
  onClose: () => void
  solicitud: {
    id: string
    fecha: string
    numero: string
    tipo: string
    asunto: string
    estado: string
    ultimaActualizacion: string
    descripcion: string
    comentarios: Comentario[]
    historial: Historial[]
  } | null
}

export function DetalleSolicitudModal({ isOpen, onClose, solicitud }: DetalleSolicitudProps) {
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
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Solicitud {solicitud.numero} - {solicitud.asunto}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Fecha de Creación</p>
              <p className="font-medium">{solicitud.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <div>{getEstadoBadge(solicitud.estado)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipo</p>
              <p className="font-medium">{solicitud.tipo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Última Actualización</p>
              <p className="font-medium">{solicitud.ultimaActualizacion}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <Tabs defaultValue="descripcion">
            <TabsList className="mb-4">
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="comentarios">Comentarios</TabsTrigger>
              <TabsTrigger value="historial">Historial</TabsTrigger>
            </TabsList>

            <TabsContent value="descripcion">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Descripción de la Solicitud</h3>
                <p className="text-gray-700">{solicitud.descripcion}</p>
              </div>
            </TabsContent>

            <TabsContent value="comentarios">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Comentarios</h3>
                {solicitud.comentarios.length > 0 ? (
                  solicitud.comentarios.map((comentario) => (
                    <div key={comentario.id} className="border border-gray-200 rounded-md p-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">{comentario.usuario}</p>
                        <p className="text-sm text-gray-500">{comentario.fecha}</p>
                      </div>
                      <p className="text-gray-700">{comentario.texto}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No hay comentarios para esta solicitud.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="historial">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Historial</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Acción</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Usuario</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Comentario</th>
                      </tr>
                    </thead>
                    <tbody>
                      {solicitud.historial.map((evento) => (
                        <tr key={evento.id} className="border-b border-gray-200">
                          <td className="py-2 px-4 text-sm">{evento.fecha}</td>
                          <td className="py-2 px-4 text-sm">{evento.accion}</td>
                          <td className="py-2 px-4 text-sm">{evento.usuario}</td>
                          <td className="py-2 px-4 text-sm">{evento.comentario || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
