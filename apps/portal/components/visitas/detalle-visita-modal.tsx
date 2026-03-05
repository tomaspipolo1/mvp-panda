"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface DetalleVisitaProps {
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
    motivo: string
    fechaInicio: string
    fechaFin: string
    horaInicio: string
    horaFin: string
    personasDetalle: Persona[]
    vehiculosDetalle: Vehiculo[]
    observaciones: string
  } | null
}

export function DetalleVisitaModal({ isOpen, onClose, visita }: DetalleVisitaProps) {
  if (!visita) return null

  // Hardcoded example documents for demonstration
  const documentos = [
    { id: 'doc1', nombre: 'ART.pdf', url: '#' },
    { id: 'doc2', nombre: 'Seguro_Vehiculo.pdf', url: '#' },
    { id: 'doc3', nombre: 'Permiso_Acceso.pdf', url: '#' },
    { id: 'doc4', nombre: 'Certificado_Capacitacion.pdf', url: '#' },
  ]

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
              <p className="text-sm text-gray-500">Fecha de Inicio</p>
              <p className="font-medium">{visita.fechaInicio}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de Fin</p>
              <p className="font-medium">{visita.fechaFin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hora de Inicio</p>
              <p className="font-medium">{visita.horaInicio}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hora de Fin</p>
              <p className="font-medium">{visita.horaFin}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <Tabs defaultValue="personas">
            <TabsList className="mb-4">
              <TabsTrigger value="personas">Personas ({visita.personas})</TabsTrigger>
              <TabsTrigger value="vehiculos">Vehículos ({visita.vehiculos})</TabsTrigger>
              <TabsTrigger value="detalles">Detalles</TabsTrigger>
              <TabsTrigger value="documentacion">Documentación</TabsTrigger>
            </TabsList>

            <TabsContent value="personas">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Personas</h3>
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
              </div>
            </TabsContent>

            <TabsContent value="vehiculos">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Vehículos</h3>
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
              </div>
            </TabsContent>

            <TabsContent value="detalles">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Motivo de la Visita</h3>
                  <p className="text-gray-700">{visita.motivo}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Observaciones</h3>
                  <p className="text-gray-700">{visita.observaciones || "No hay observaciones registradas."}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentacion">
              <div className="space-y-4">
                <h3 className="font-semibold mb-2">Documentación Adjunta</h3>
                {documentos.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Nombre del Documento</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {documentos.map((doc) => (
                          <tr key={doc.id} className="border-b border-gray-200">
                            <td className="py-2 px-4 text-sm">{doc.nombre}</td>
                            <td className="py-2 px-4 text-sm">
                              <a href={doc.url} download className="text-blue-600 hover:underline flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                                </svg>
                                Descargar
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No hay documentación adjunta para esta visita.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
