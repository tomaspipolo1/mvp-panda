import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FileText, User, Truck, StickyNoteIcon, Calendar, Clock, Building2, MapPin } from "lucide-react"
import React from "react"

interface Persona {
  nombre: string
  dni: string
  telefono?: string
}

interface Conductor extends Persona {
  nroLicencia: string
}

interface Vehiculo {
  tipo: string
  patente: string
  marca: string
  modelo: string
}

interface Documento {
  nombre: string
  tipo: string
}

interface DetalleCamionContentProps {
  solicitud: {
    id: string
    numero: string
    tipoVisita: string
    operacion: string
    tipoCarga: string
    destino: string
    responsableRecibir?: string
    fechaIngreso: string
    horaIngreso: string
    fechaEgreso?: string
    horaEgreso?: string
    conductor: Conductor
    acompanantes?: Persona[]
    vehiculo: Vehiculo
    documentos?: Documento[]
    observaciones?: string
    estado?: string
    solicitante?: string
    empresa?: string
  }
}

export function DetalleCamionContent({ solicitud }: DetalleCamionContentProps) {
  const getEstadoBadge = (estado?: string) => {
    if (!estado) return null
    switch (estado.toLowerCase()) {
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "aprobado":
      case "aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "rechazado":
      case "rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "finalizada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Finalizada</Badge>
      case "en curso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Curso</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  console.log('Acompañantes en detalle-camion-content:', solicitud.acompanantes);

  return (
    <div className="w-full">
      {/* Título y estado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-xl font-bold">{solicitud.numero}</h2>
        <div className="md:self-auto self-start">{getEstadoBadge(solicitud.estado)}</div>
      </div>
      <Tabs defaultValue="datos-generales" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="datos-generales">Datos Generales</TabsTrigger>
          <TabsTrigger value="documentacion">Documentación</TabsTrigger>
        </TabsList>
        {/* Tab Datos Generales */}
        <TabsContent value="datos-generales">
          <div className="w-full mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna datos principales (2 subcolumnas) */}
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Grilla alineada por filas */}
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {/* Fila 1 */}
                      <div>
                        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><User className="w-4 h-4" /> Tipo visita:</div>
                        <div className="text-base text-black font-normal">{solicitud.tipoVisita}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><Building2 className="w-4 h-4" /> Empresa:</div>
                        <div className="text-base text-black font-normal">{solicitud.empresa || 'Sin empresa'}</div>
                      </div>
                      {/* Fila 2 */}
                      <div>
                        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><User className="w-4 h-4" /> Solicitante:</div>
                        <div className="text-base text-black font-normal">{solicitud.solicitante || 'Sin solicitante'}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><MapPin className="w-4 h-4" /> Destino:</div>
                        <div className="text-base text-black font-normal">{solicitud.destino}</div>
                      </div>
                      {/* Fila 3: Responsable de recibir */}
                      {typeof solicitud.responsableRecibir === 'string' && solicitud.responsableRecibir.trim() !== '' ? (
                        <>
                          <div>
                            <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><User className="w-4 h-4" /> Responsable de recibir:</div>
                            <div className="text-base text-black font-normal">{solicitud.responsableRecibir}</div>
                          </div>
                          <div></div>
                        </>
                      ) : (
                        <>
                          <div></div>
                          <div></div>
                        </>
                      )}
                      {/* Fila 4 */}
                      <div>
                        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><Calendar className="w-4 h-4" /> Fecha ingreso:</div>
                        <div className="text-base text-black font-normal">{solicitud.fechaIngreso}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><Calendar className="w-4 h-4" /> Fecha egreso:</div>
                        <div className="text-base text-black font-normal">{solicitud.fechaEgreso || 'Sin fecha'}</div>
                      </div>
                      {/* Fila 5 */}
                      <div>
                        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><Clock className="w-4 h-4" /> Hora ingreso:</div>
                        <div className="text-base text-black font-normal">{solicitud.horaIngreso}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><Clock className="w-4 h-4" /> Hora egreso:</div>
                        <div className="text-base text-black font-normal">{solicitud.horaEgreso || 'Sin hora'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Columna Observaciones */}
              <div className="bg-white rounded-lg border shadow-sm p-6 h-full flex flex-col">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <StickyNoteIcon className="w-5 h-5 text-blue-800" />
                  <span>Observaciones</span>
                </h3>
                <p className="text-gray-700 flex-1">{solicitud.observaciones || "No hay observaciones registradas."}</p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          {/* Personas y Vehículos en formato tabla */}
          <div className="mb-8 w-full">
            {/* Conductor */}
            <div className="bg-white rounded-lg border shadow-sm p-4 mb-8">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-800" />
                <span>Conductor</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Nombre completo</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">DNI</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Teléfono</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Nro de licencia</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Ingreso</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Salió</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="py-2 px-4 text-sm text-gray-800">{solicitud.conductor.nombre}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{solicitud.conductor.dni}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{solicitud.conductor.telefono || '-'}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{solicitud.conductor.nroLicencia}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{["finalizada","en curso"].includes((solicitud.estado||"").toLowerCase()) ? `${solicitud.fechaIngreso} ${solicitud.horaIngreso}` : '-'}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{solicitud.estado && solicitud.estado.toLowerCase() === "finalizada" && solicitud.fechaEgreso && solicitud.horaEgreso ? `${solicitud.fechaEgreso} ${solicitud.horaEgreso}` : '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Personas (Acompañantes) - SIEMPRE fuera de cualquier otro contenedor */}
            {Array.isArray(solicitud.acompanantes) && solicitud.acompanantes.length > 0 && (
              <div className="bg-white rounded-lg border shadow-sm p-4 mb-8">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-800" />
                  <span>Personas ({solicitud.acompanantes.length})</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Nombre completo</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">DNI</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Teléfono</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Ingreso</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Salió</th>
                      </tr>
                    </thead>
                    <tbody>
                      {solicitud.acompanantes.map((a, idx) => (
                        <tr key={a.dni + idx} className={idx % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                          <td className="py-2 px-4 text-sm text-gray-800">{a.nombre}</td>
                          <td className="py-2 px-4 text-sm text-gray-800">{a.dni}</td>
                          <td className="py-2 px-4 text-sm text-gray-800">{a.telefono || '-'}</td>
                          <td className="py-2 px-4 text-sm text-gray-800">{["finalizada","en curso"].includes((solicitud.estado||"").toLowerCase()) ? `${solicitud.fechaIngreso} ${solicitud.horaIngreso}` : '-'}</td>
                          <td className="py-2 px-4 text-sm text-gray-800">{solicitud.estado && solicitud.estado.toLowerCase() === "finalizada" && solicitud.fechaEgreso && solicitud.horaEgreso ? `${solicitud.fechaEgreso} ${solicitud.horaEgreso}` : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Vehículos */}
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-800" />
                <span>Vehículos (1)</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Tipo</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Patente</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Marca</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Modelo</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Ingreso</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Salió</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-white">
                      <td className="py-2 px-4 text-sm text-gray-800">{solicitud.vehiculo.tipo}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{solicitud.vehiculo.patente}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{solicitud.vehiculo.marca}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{solicitud.vehiculo.modelo}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{["finalizada","en curso"].includes((solicitud.estado||"").toLowerCase()) ? `${solicitud.fechaIngreso} ${solicitud.horaIngreso}` : '-'}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{solicitud.estado && solicitud.estado.toLowerCase() === "finalizada" && solicitud.fechaEgreso && solicitud.horaEgreso ? `${solicitud.fechaEgreso} ${solicitud.horaEgreso}` : '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>
        {/* Tab Documentación */}
        <TabsContent value="documentacion">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2" /> Documentación
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-4">
                  {solicitud.documentos && solicitud.documentos.length > 0 ? (
                    solicitud.documentos.map((doc, idx) => (
                      <div key={doc.nombre + idx} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">{doc.tipo}</p>
                            <p className="text-xs text-gray-500">{doc.nombre}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 text-sm font-medium hover:underline">Ver</button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No hay documentación registrada.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 