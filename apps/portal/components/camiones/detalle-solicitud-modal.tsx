"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { FileText, Truck, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DetalleSolicitudModalProps {
  isOpen: boolean
  onClose: () => void
  solicitud: {
    id: string
    numero: string
    solicitante: string
    dni: string
    patente: string
    fecha: string
    hora: string
    estado: "pendiente" | "aprobado" | "rechazado"
    empresa: string
    tipoVehiculo: string
    motivo: string
    destino: string
    observaciones?: string
    documentos?: { nombre: string; tipo: string }[]
  }
}

export function DetalleSolicitudModal({ isOpen, onClose, solicitud }: DetalleSolicitudModalProps) {
  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pendiente
          </Badge>
        )
      case "aprobado":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Aprobado
          </Badge>
        )
      case "rechazado":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rechazado
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">Solicitud de Acceso #{solicitud.numero}</DialogTitle>
            {getEstadoBadge(solicitud.estado)}
          </div>
          <DialogDescription>
            Detalles de la solicitud de acceso para el camión con patente {solicitud.patente}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Tabs defaultValue="datos-generales" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="datos-generales">Datos Generales</TabsTrigger>
              <TabsTrigger value="documentacion">Documentación</TabsTrigger>
            </TabsList>

            <TabsContent value="datos-generales" className="mt-6">
              <div className="space-y-6">
                {/* Información de la Solicitud */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <FileText className="h-4 w-4 mr-2" /> Información de la Solicitud
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">N° Solicitud:</span>
                        <span className="text-sm col-span-2">{solicitud.numero}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Estado:</span>
                        <div className="col-span-2">{getEstadoBadge(solicitud.estado)}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Fecha:</span>
                        <span className="text-sm col-span-2">{solicitud.fecha}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Hora:</span>
                        <span className="text-sm col-span-2">{solicitud.hora}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Motivo:</span>
                        <span className="text-sm col-span-2">{solicitud.motivo}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Destino:</span>
                        <span className="text-sm col-span-2">{solicitud.destino}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Empresa:</span>
                        <span className="text-sm col-span-2">{solicitud.empresa}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Tipo de Vehículo:</span>
                        <span className="text-sm col-span-2">{solicitud.tipoVehiculo}</span>
                      </div>
                    </div>
                    {solicitud.observaciones && (
                      <div className="mt-4">
                        <div className="grid grid-cols-3 gap-2">
                          <span className="text-sm font-medium text-gray-500">Observaciones:</span>
                          <span className="text-sm col-span-2">{solicitud.observaciones}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Datos del Conductor */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" /> Datos del Conductor
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Nombre:</span>
                        <span className="text-sm col-span-2">{solicitud.solicitante}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">DNI:</span>
                        <span className="text-sm col-span-2">{solicitud.dni}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                        <span className="text-sm col-span-2">+54 9 221 456-7890</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Nro. Licencia:</span>
                        <span className="text-sm col-span-2">LIC-2023-001234</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Categoría:</span>
                        <span className="text-sm col-span-2">Profesional - Categoría E</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Datos del Vehículo */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <Truck className="h-4 w-4 mr-2" /> Datos del Vehículo
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Tipo:</span>
                        <span className="text-sm col-span-2">{solicitud.tipoVehiculo}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Patente:</span>
                        <span className="text-sm col-span-2">{solicitud.patente}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Marca:</span>
                        <span className="text-sm col-span-2">Mercedes-Benz</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Modelo:</span>
                        <span className="text-sm col-span-2">Actros 2042</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-gray-500">Titular:</span>
                        <span className="text-sm col-span-2">{solicitud.solicitante}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentacion" className="mt-6">
              <div className="space-y-6">
                {/* Documentación del Conductor */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2" /> Documentación del Conductor
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">Licencia de Conducir</p>
                            <p className="text-xs text-gray-500">licencia_conductor.pdf</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Fecha de Vencimiento</p>
                            <input
                              type="date"
                              value="2025-12-31"
                              disabled
                              className="text-xs bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                            />
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            Ver
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documentación del Vehículo */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <Truck className="h-4 w-4 mr-2" /> Documentación del Vehículo
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">Cédula Verde</p>
                            <p className="text-xs text-gray-500">cedula_verde.pdf</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Fecha de Vencimiento</p>
                            <input
                              type="date"
                              value="2024-08-15"
                              disabled
                              className="text-xs bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                            />
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            Ver
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">Cédula Azul</p>
                            <p className="text-xs text-gray-500">cedula_azul.pdf</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Fecha de Vencimiento</p>
                            <input
                              type="date"
                              value="2024-08-15"
                              disabled
                              className="text-xs bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                            />
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            Ver
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-orange-500" />
                          <div>
                            <p className="text-sm font-medium">Seguro del Vehículo</p>
                            <p className="text-xs text-gray-500">seguro_vehiculo.pdf</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Fecha de Vencimiento</p>
                            <input
                              type="date"
                              value="2024-11-30"
                              disabled
                              className="text-xs bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                            />
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            Ver
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <Button className="w-full" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Descargar toda la documentación (ZIP)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Separator />

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <div className="flex gap-2">
            {solicitud.estado === "pendiente" && (
              <>
                <Button variant="destructive">Rechazar</Button>
                <Button variant="default">Aprobar</Button>
              </>
            )}
            <Button variant="outline">Imprimir</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
