"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

interface Persona {
  id: string
  nombre: string
  documento: string
  empresa: string
}

interface Vehiculo {
  id: string
  tipo: string
  patente: string
  marca: string
  modelo: string
}

interface DetalleVisitaEmpleadoComprasProps {
  isOpen: boolean
  onClose: () => void
  visita: {
    id: string
    fecha: string
    tipo: string
    sitio: string
    personas: number
    vehiculos: number
    estado: string
    motivo?: string
    fechaInicio?: string
    fechaFin?: string
    horaInicio?: string
    horaFin?: string
    personasDetalle?: Persona[]
    vehiculosDetalle?: Vehiculo[]
    observaciones?: string
    solicitante: string
  } | null
  onAceptar?: () => void
  onRechazar?: () => void
}

export function DetalleVisitaModalEmpleadoCompras({
  isOpen,
  onClose,
  visita,
  onAceptar,
  onRechazar,
}: DetalleVisitaEmpleadoComprasProps) {
  if (!visita) return null

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Completada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Completada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
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
            Detalle de Visita - {visita.tipo} ({visita.fecha})
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Sitio</p>
              <p className="font-medium">{visita.sitio}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <div>{getEstadoBadge(visita.estado)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Solicitante</p>
              <p className="font-medium">{visita.solicitante}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de Inicio</p>
              <p className="font-medium">{visita.fechaInicio || visita.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de Fin</p>
              <p className="font-medium">{visita.fechaFin || visita.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hora de Inicio</p>
              <p className="font-medium">{visita.horaInicio || "No especificada"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hora de Fin</p>
              <p className="font-medium">{visita.horaFin || "No especificada"}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <Tabs defaultValue="personas">
            <TabsList className="mb-4">
              <TabsTrigger value="personas">Personas ({visita.personas})</TabsTrigger>
              <TabsTrigger value="vehiculos">Vehículos ({visita.vehiculos})</TabsTrigger>
              <TabsTrigger value="detalles">Detalles</TabsTrigger>
            </TabsList>

            <TabsContent value="personas">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Personas</h3>
                {visita.personasDetalle && visita.personasDetalle.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Nombre</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Documento</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Empresa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visita.personasDetalle.map((persona) => (
                          <tr key={persona.id} className="border-b border-gray-200">
                            <td className="py-2 px-4 text-sm">{persona.nombre}</td>
                            <td className="py-2 px-4 text-sm">{persona.documento}</td>
                            <td className="py-2 px-4 text-sm">{persona.empresa}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No hay información detallada de personas disponible.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="vehiculos">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Vehículos</h3>
                {visita.vehiculosDetalle && visita.vehiculosDetalle.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tipo</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Patente</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Marca</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Modelo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visita.vehiculosDetalle.map((vehiculo) => (
                          <tr key={vehiculo.id} className="border-b border-gray-200">
                            <td className="py-2 px-4 text-sm">{vehiculo.tipo}</td>
                            <td className="py-2 px-4 text-sm">{vehiculo.patente}</td>
                            <td className="py-2 px-4 text-sm">{vehiculo.marca}</td>
                            <td className="py-2 px-4 text-sm">{vehiculo.modelo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No hay información detallada de vehículos disponible.</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="detalles">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Motivo de la Visita</h3>
                  <p className="text-gray-700">{visita.motivo || "No especificado"}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Observaciones</h3>
                  <p className="text-gray-700">{visita.observaciones || "No hay observaciones registradas."}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Botones de acción */}
        {(onAceptar || onRechazar) && (
          <div className="mt-6 flex justify-end space-x-2">
            {onRechazar && (
              <Button variant="destructive" onClick={onRechazar}>
                Rechazar Visita
              </Button>
            )}
            {onAceptar && <Button onClick={onAceptar}>Aceptar Visita</Button>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
