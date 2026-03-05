import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FileText } from "lucide-react"
import React from "react"
import { User } from "lucide-react"
import { StickyNoteIcon } from "lucide-react"
import { Calendar, Clock, Building2, MapPin } from "lucide-react"

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

interface DetalleSolicitudCamionContentProps {
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
    empresa?: string
    solicitante?: string
  }
}

export function DetalleSolicitudCamionContent({ solicitud }: DetalleSolicitudCamionContentProps) {
  return (
    <div className="w-full space-y-6">
      {/* Datos generales */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Columna datos principales (2 subcolumnas) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subcolumna 1 */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><User className="w-4 h-4" /> Tipo visita:</div>
                  <div className="text-base text-black font-normal">{solicitud.tipoVisita}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><User className="w-4 h-4" /> Solicitante:</div>
                  <div className="text-base text-black font-normal">{solicitud.solicitante || 'Sin solicitante'}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><Calendar className="w-4 h-4" /> Fecha ingreso:</div>
                  <div className="text-base text-black font-normal">{solicitud.fechaIngreso}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><Clock className="w-4 h-4" /> Hora ingreso:</div>
                  <div className="text-base text-black font-normal">{solicitud.horaIngreso}</div>
                </div>
              </div>
              {/* Subcolumna 2 */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><Building2 className="w-4 h-4" /> Empresa:</div>
                  <div className="text-base text-black font-normal">{solicitud.empresa || 'Sin empresa'}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><MapPin className="w-4 h-4" /> Destino:</div>
                  <div className="text-base text-black font-normal">{solicitud.destino}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><Calendar className="w-4 h-4" /> Fecha egreso:</div>
                  <div className="text-base text-black font-normal">{solicitud.fechaEgreso || 'Sin fecha'}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm mb-1"><Clock className="w-4 h-4" /> Hora egreso:</div>
                  <div className="text-base text-black font-normal">{solicitud.horaEgreso || 'Sin hora'}</div>
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
        </CardContent>
      </Card>

      {/* Conductor */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4">Conductor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-semibold text-blue-800">Nombre completo:</span> {solicitud.conductor.nombre}</div>
            <div><span className="font-semibold text-blue-800">DNI:</span> {solicitud.conductor.dni}</div>
            <div><span className="font-semibold text-blue-800">Teléfono:</span> {solicitud.conductor.telefono || '-'}</div>
            <div><span className="font-semibold text-blue-800">Nro. Licencia:</span> {solicitud.conductor.nroLicencia}</div>
          </div>
        </CardContent>
      </Card>

      {/* Personas acompañantes */}
      {solicitud.acompanantes && solicitud.acompanantes.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4">Personas Acompañantes</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Nombre completo</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">DNI</th>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitud.acompanantes.map((p, idx) => (
                    <tr key={p.dni + idx} className={idx % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 text-sm text-gray-800">{p.nombre}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{p.dni}</td>
                      <td className="py-2 px-4 text-sm text-gray-800">{p.telefono || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vehículo */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold mb-4">Vehículo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-semibold text-blue-800">Tipo:</span> {solicitud.vehiculo.tipo}</div>
            <div><span className="font-semibold text-blue-800">Patente:</span> {solicitud.vehiculo.patente}</div>
            <div><span className="font-semibold text-blue-800">Marca:</span> {solicitud.vehiculo.marca}</div>
            <div><span className="font-semibold text-blue-800">Modelo:</span> {solicitud.vehiculo.modelo}</div>
          </div>
        </CardContent>
      </Card>

      {/* Documentación */}
      {solicitud.documentos && solicitud.documentos.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-blue-800" /> Documentación</h2>
            <div className="space-y-4">
              {solicitud.documentos.map((doc, idx) => (
                <div key={doc.nombre + idx} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{doc.tipo}</p>
                      <p className="text-xs text-gray-500">{doc.nombre}</p>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-medium hover:underline">Ver</button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 