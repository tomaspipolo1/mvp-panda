"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, X, FileText, Clock, User, Building, Calendar, Printer, Download, Eye, MapPin, Users, Truck, BriefcaseIcon } from "lucide-react"
import Link from "next/link"
import { HistorialAcciones, type ActionEvent } from "@/components/visitas/historial-acciones"

// Tipos
export type Persona = {
  id: string
  nombre: string
  documento: string
  empresa: string
  mail?: string
  telefono?: string
  ingreso?: string
  egreso?: string
}

export type Vehiculo = {
  id: string
  tipo: string
  patente: string
  marca: string
  modelo: string
  ingreso?: string
  egreso?: string
}

export type Visita = {
  id: string
  numero: string
  visitante: string
  empresa: string
  fechaVisita: string
  horaVisita: string
  estado: string
  motivo: string
  tipo: string
  sitio: string
  personas: number
  vehiculos: number
  personasDetalle: Persona[]
  vehiculosDetalle: Vehiculo[]
  fechaInicio?: string
  fechaFin?: string
  horaInicio?: string
  horaFin?: string
  observaciones?: string
  solicitante?: string
  descripcion?: string
  // Campos específicos para Transporte cargas
  operacion?: string
  tipoCarga?: string
  recurrente?: boolean
  diasRecurrentes?: string[]
  conductor?: {
    nombre: string
    dni: string
    telefono: string
    numeroLicencia: string
  }
  razonSocial?: string
  cuit?: string
  email?: string
  telefono?: string
  // Campos específicos para Obras/mantenimiento
  tipoActividad?: string // "Obras" o "Mantenimiento"
  actividad?: string // Descripción de la actividad específica
  tipoContratacion?: string // "Licitación" o "Contrato"
  numeroLicitacion?: string
  numeroExpediente?: string
}

export type ArchivoAdjunto = {
  nombre: string
  archivo: string
  tipo: string
}

export type AccionesVisita = {
  canApprove?: boolean
  canReject?: boolean
  canEdit?: boolean
  canCancel?: boolean
  onApprove?: () => void
  onReject?: () => void
  onEdit?: () => void
  onCancel?: () => void
}

interface DetalleVisitaComponentProps {
  visita: Visita
  documentos?: ArchivoAdjunto[]
  acciones?: AccionesVisita
  backUrl: string
  userType?: "empleado-compras" | "empleado-seguridad" | "empleado-contable" | "empleado-prensa" | "cliente"
  historialEventos?: ActionEvent[]
}

export function DetalleVisitaComponent({
  visita,
  documentos = [],
  acciones,
  backUrl,
  userType = "empleado-seguridad",
  historialEventos = [],
}: DetalleVisitaComponentProps) {
  const [observacion, setObservacion] = useState("")
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aceptada":
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{estado}</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      case "En curso":
      case "En Curso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En curso</Badge>
      case "Finalizada":
      case "Completada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{estado}</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const handleConfirmApprove = () => {
    setIsApproveModalOpen(false)
    setObservacion("")
    if (acciones?.onApprove) {
      acciones.onApprove()
    }
  }

  const handleConfirmReject = () => {
    setIsRejectModalOpen(false)
    setObservacion("")
    if (acciones?.onReject) {
      acciones.onReject()
    }
  }

  const handleVerDocumento = (nombre: string, archivo: string) => {
    alert(`Ver documento: ${nombre} (${archivo})`)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={backUrl}>
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Visita</h1>
            <p className="text-gray-600">
              {visita.numero} - {visita.motivo || visita.descripcion}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Información principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información básica */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detalle de la visita - Específico para Transporte cargas */}
          {visita.tipo === "Transporte cargas" ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Detalle de la Visita</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Nro visita:</span>
                  <p className="text-sm font-medium">{visita.numero}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Estado:</span>
                  <div>{renderEstadoBadge(visita.estado)}</div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Tipo visita:</span>
                  <p className="text-sm font-medium">{visita.tipo}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Destino:</span>
                  <p className="text-sm font-medium">{visita.sitio}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Operación:</span>
                  <p className="text-sm font-medium">{visita.operacion || "-"}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Tipo de carga:</span>
                  <p className="text-sm font-medium">{visita.tipoCarga || "-"}</p>
                </div>
              </div>
            </div>
          ) : visita.tipo === "Obras/mantenimiento" ? (
            /* Detalle de la visita - Específico para Obras/mantenimiento */
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Detalle de la Visita</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Nro de visita:</span>
                  <p className="text-sm font-medium">{visita.numero}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Estado:</span>
                  <div>{renderEstadoBadge(visita.estado)}</div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Tipo visita:</span>
                  <p className="text-sm font-medium">{visita.tipo}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Tipo actividad:</span>
                  <p className="text-sm font-medium">{visita.tipoActividad || "-"}</p>
                </div>
                <div className="space-y-2 col-span-2">
                  <span className="text-sm font-medium text-gray-500">Actividad:</span>
                  <p className="text-sm font-medium">{visita.actividad || "-"}</p>
                </div>
              </div>
            </div>
          ) : (
            /* Detalle de la visita - Para otros tipos */
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Detalle de la Visita</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Nro visita:</span>
                  </div>
                  <p className="text-sm font-medium">{visita.numero}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Fecha visita:</span>
                  </div>
                  <p className="text-sm font-medium">{visita.fechaVisita}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Tipo visita:</span>
                  </div>
                  <p className="text-sm font-medium">{visita.tipo}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                  </div>
                  <div>{renderEstadoBadge(visita.estado)}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Destino:</span>
                  </div>
                  <p className="text-sm font-medium">{visita.sitio}</p>
                </div>
              </div>
            </div>
          )}

          {/* Fechas y horarios */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Fechas y Horarios</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">
                  {visita.tipo === "Transporte cargas" ? "Fecha desde:" : "Fecha ingreso:"}
                </span>
                <p className="text-sm font-medium">{visita.fechaInicio || visita.fechaVisita}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">
                  {visita.tipo === "Transporte cargas" ? "Fecha hasta:" : "Fecha egreso:"}
                </span>
                <p className="text-sm font-medium">{visita.fechaFin || visita.fechaVisita}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">
                  {visita.tipo === "Transporte cargas" ? "Hora desde:" : "Hora ingreso:"}
                </span>
                <p className="text-sm font-medium">{visita.horaInicio || visita.horaVisita}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">
                  {visita.tipo === "Transporte cargas" ? "Hora hasta:" : "Hora egreso:"}
                </span>
                <p className="text-sm font-medium">{visita.horaFin || "18:00"}</p>
              </div>
            </div>
            {visita.tipo === "Transporte cargas" && visita.recurrente && visita.diasRecurrentes && (
              <div className="mt-4 space-y-2">
                <span className="text-sm font-medium text-gray-500">Días recurrentes:</span>
                <div className="flex flex-wrap gap-2">
                  {visita.diasRecurrentes.map((dia, idx) => (
                    <Badge key={idx} className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {dia}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Datos de contratación - Solo para Obras/mantenimiento */}
          {visita.tipo === "Obras/mantenimiento" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Datos de Contratación</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Tipo de contratación:</span>
                  <p className="text-sm font-medium">{visita.tipoContratacion || "-"}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">
                    {visita.tipoContratacion === "Licitación" ? "Nro de licitación:" : "Nro de expediente:"}
                  </span>
                  <p className="text-sm font-medium">
                    {visita.tipoContratacion === "Licitación"
                      ? visita.numeroLicitacion || "-"
                      : visita.numeroExpediente || "-"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Información del conductor - Para Transporte cargas y Obras/mantenimiento */}
          {(visita.tipo === "Transporte cargas" || visita.tipo === "Obras/mantenimiento") && visita.conductor && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Información del Conductor</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Nombre:</span>
                  <p className="text-sm font-medium">{visita.conductor.nombre}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">DNI:</span>
                  <p className="text-sm font-medium">{visita.conductor.dni}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                  <p className="text-sm font-medium">{visita.conductor.telefono}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Nro de licencia:</span>
                  <p className="text-sm font-medium">{visita.conductor.numeroLicencia}</p>
                </div>
              </div>
            </div>
          )}

          {/* Información del vehículo - Para Transporte cargas y Obras/mantenimiento */}
          {(visita.tipo === "Transporte cargas" || visita.tipo === "Obras/mantenimiento") &&
            visita.vehiculosDetalle &&
            visita.vehiculosDetalle.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Información del Vehículo</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Tipo:</span>
                  <p className="text-sm font-medium">{visita.vehiculosDetalle[0].tipo}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Patente:</span>
                  <p className="text-sm font-medium">{visita.vehiculosDetalle[0].patente}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Marca:</span>
                  <p className="text-sm font-medium">{visita.vehiculosDetalle[0].marca}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Modelo:</span>
                  <p className="text-sm font-medium">{visita.vehiculosDetalle[0].modelo}</p>
                </div>
              </div>
            </div>
          )}

          {/* Personas que asistirán - Para Obras/mantenimiento */}
          {visita.tipo === "Obras/mantenimiento" && visita.personasDetalle && visita.personasDetalle.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Personas que asistirán ({visita.personas})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Nombre</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Documento</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Mail</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Teléfono</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Empresa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visita.personasDetalle.map((persona, idx) => (
                      <tr key={persona.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.nombre}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.documento}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.mail || "-"}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.telefono || "-"}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.empresa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Personas - Para otros tipos de visita (excepto Transporte cargas y Obras/mantenimiento) */}
          {visita.tipo !== "Transporte cargas" &&
            visita.tipo !== "Obras/mantenimiento" &&
            visita.personasDetalle &&
            visita.personasDetalle.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Personas ({visita.personas})
                </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Nombre</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Documento</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Mail</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Teléfono</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Empresa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visita.personasDetalle.map((persona, idx) => (
                      <tr key={persona.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.nombre}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.documento}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.mail || "-"}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.telefono || "-"}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.empresa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Vehículos - Solo para otros tipos de visita */}
          {visita.tipo !== "Transporte cargas" && visita.vehiculosDetalle && visita.vehiculosDetalle.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Vehículos ({visita.vehiculos})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Tipo</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Patente</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Marca</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Modelo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visita.vehiculosDetalle.map((vehiculo, idx) => (
                      <tr key={vehiculo.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="py-2 px-4 text-sm text-gray-800">{vehiculo.tipo}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{vehiculo.patente}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{vehiculo.marca}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{vehiculo.modelo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Documentación */}
          {documentos && documentos.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Documentación</h2>
              <div className="space-y-3">
                {documentos.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                  >
                    <div className="flex items-center flex-1">
                      <FileText className="h-4 w-4 text-blue-600 mr-3" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">{doc.tipo}</div>
                        <div className="text-xs text-gray-500 mt-1">{doc.nombre}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerDocumento(doc.tipo, doc.archivo)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Columna derecha - Acciones */}
        <div className="space-y-6">
          {/* Acciones */}
          {acciones && (acciones.canApprove || acciones.canReject) && visita.estado === "Pendiente" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Acciones</h2>
              <div className="space-y-4">
                <div className="space-y-3">
                  {acciones.canApprove && (
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => setIsApproveModalOpen(true)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {userType === "empleado-compras" ? "Aceptar" : "Aprobar"}
                    </Button>
                  )}
                  {acciones.canReject && (
                    <Button
                      variant="outline"
                      className="w-full bg-red-600 text-white hover:bg-red-700"
                      onClick={() => setIsRejectModalOpen(true)}
                    >
                      <X className="mr-2 h-4 w-4" /> Rechazar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Información del solicitante */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Solicitante</h2>
            {visita.tipo === "Transporte cargas" || visita.tipo === "Obras/mantenimiento" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Razón social:</span>
                  <p className="text-sm font-medium">{visita.razonSocial || visita.empresa}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">CUIT:</span>
                  <p className="text-sm font-medium">{visita.cuit || "-"}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <p className="text-sm font-medium">{visita.email || "-"}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                  <p className="text-sm font-medium">{visita.telefono || "-"}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Nombre:</span>
                  </div>
                  <p className="text-sm font-medium">{visita.visitante}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Empresa:</span>
                  </div>
                  <p className="text-sm font-medium">{visita.empresa}</p>
                </div>
              </div>
            )}
          </div>

          {/* Estadísticas */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Estadísticas</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Personas</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{visita.personas}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Vehículos</span>
                </div>
                <span className="text-lg font-bold text-green-600">{visita.vehiculos}</span>
              </div>
            </div>
          </div>

          {historialEventos.length > 0 && (
            <HistorialAcciones
              className="mt-6"
              events={historialEventos}
              variant={
                userType === "empleado-seguridad" ||
                userType === "empleado-compras" ||
                userType === "empleado-contable" ||
                userType === "empleado-prensa"
                  ? "internal"
                  : "external"
              }
              title="Historial de la solicitud"
            />
          )}
        </div>
      </div>

      {/* Modal de Confirmación de Aprobación/Aceptación */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">
              Confirmar {userType === "empleado-compras" ? "Aceptación" : "Aprobación"}
            </h3>
            <p className="text-gray-600 mb-4">
              ¿Está seguro que desea {userType === "empleado-compras" ? "aceptar" : "aprobar"} esta visita?
            </p>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">
                  Se enviará una notificación por correo electrónico al solicitante informando la{" "}
                  {userType === "empleado-compras" ? "aceptación" : "aprobación"}.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observaciones (opcional)
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  placeholder="Agregue observaciones o comentarios adicionales..."
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleConfirmApprove}>
                Confirmar {userType === "empleado-compras" ? "Aceptación" : "Aprobación"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Rechazo */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Confirmar Rechazo</h3>
            <p className="text-gray-600 mb-4">¿Está seguro que desea rechazar esta visita?</p>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">
                  Se enviará una notificación por correo electrónico al solicitante informando el rechazo.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo del rechazo <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  placeholder="Explique el motivo del rechazo..."
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Este campo es obligatorio para el rechazo de visitas.</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleConfirmReject}
                disabled={!observacion.trim()}
              >
                Confirmar Rechazo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

