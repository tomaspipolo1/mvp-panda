"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Check, X, Mail, CornerDownRight, Trash, FileText, Clock, User, Building, Calendar, Printer, Download, Eye, Users, Truck, Shield, CreditCard, MapPin, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChatModal } from "@/components/ui/chat-modal"
import { useChat } from "@/hooks/use-chat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Tipos específicos para solicitudes de inscripción/reinscripción
export type SolicitudInscripcion = {
  id: number
  fecha: string
  numero: string
  solicitante: string
  tipoSolicitante: string
  departamento: string
  tipo: string
  asunto: string
  estado: string
  ultimaActualizacion: string
  descripcion?: string
  comentarios?: string[]
  correo?: string
  asignacion?: string
  adjuntos?: string[]
  
  // Campos específicos para inscripción/reinscripción
  naturalezaOrganizacion?: string
  tipoSocietario?: string
  
  // Datos personales
  nombre?: string
  apellido?: string
  dni?: string
  apoderado?: string
  apoderadoNombre?: string
  apoderadoApellido?: string
  apoderadoDni?: string
  
  // Datos generales
  razonSocial?: string
  cuit?: string
  nombreFantasia?: string
  ultimaActividad?: string
  convenioMultilateral?: string
  exencionesImpositivas?: string
  
  // Domicilios
  domicilioFiscal?: string
  domicilioComercial?: string
  
  // Contacto comercial
  nombreCompleto?: string
  cargo?: string
  telefono?: string
  email?: string
  
  // Información bancaria
  banco?: string
  tipoCuenta?: string
  numeroCuenta?: string
  cbu?: string
  
  // Personal y vehículos
  personalSeleccionado?: Array<{
    nombre: string
    dni: string
    telefono: string
  }>
  vehiculosSeleccionados?: Array<{
    tipo: string
    patente: string
    marca: string
  }>
  
  // Documentación detallada
  documentacionPersonal?: Array<{
    id: string
    nombre: string
    estado: 'pendiente' | 'completado' | 'rechazado'
    fechaCarga?: string
    archivo?: string
  }>
  documentacionGeneral?: Array<{
    id: string
    nombre: string
    estado: 'pendiente' | 'completado' | 'rechazado'
    fechaEmision?: string
    fechaVencimiento?: string
    fechaCarga?: string
    archivo?: string
  }>
  documentacionSeguros?: Array<{
    id: string
    nombre: string
    estado: 'pendiente' | 'completado' | 'rechazado'
    fechaEmision?: string
    fechaVencimiento?: string
    fechaCarga?: string
    archivo?: string
  }>
  documentacionFacturacion?: Array<{
    id: string
    nombre: string
    estado: 'pendiente' | 'completado' | 'rechazado'
    fechaCarga?: string
    archivo?: string
  }>
  
  // Flujo de aprobación
  aprobadores?: {
    legales?: {
      aprobado: boolean
      aprobadoPor?: string
      fechaAprobacion?: string
    }
    contable?: {
      aprobado: boolean
      aprobadoPor?: string
      fechaAprobacion?: string
    }
    habilitacion?: {
      habilitado: boolean
      habilitadoPor?: string
      fechaHabilitacion?: string
    }
  }
}

type DetallesSolicitudInscripcionProps = {
  solicitud: SolicitudInscripcion
  urlRetorno: string
  usuarioActual: string
  tituloModulo?: string
}

export default function DetallesSolicitudInscripcion({
  solicitud,
  urlRetorno,
  usuarioActual,
  tituloModulo = "Detalle de Solicitud de Inscripción"
}: DetallesSolicitudInscripcionProps) {
  const router = useRouter()
  const [observacion, setObservacion] = useState("")
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [isRedirigirModalOpen, setIsRedirigirModalOpen] = useState(false)
  const [redirigirTipo, setRedirigirTipo] = useState("Empleado")
  const [redirigirBusqueda, setRedirigirBusqueda] = useState("")
  const [redirigirSeleccion, setRedirigirSeleccion] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("datos-basicos")

  // Hook para manejar el chat
  const { mensajes, enviarMensaje } = useChat({
    chatId: solicitud.numero,
    usuarioActual: usuarioActual
  })

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "En proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En proceso</Badge>
      case "Aprobada por Legales":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada por Legales</Badge>
      case "Aprobada por Contable":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada por Contable</Badge>
      case "Habilitada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Habilitada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  // Determinar si el usuario puede habilitar (solo empleados de Legales)
  const puedeHabilitar = usuarioActual.includes("Legales") || usuarioActual.includes("legales")
  
  // Determinar si ambas instancias están aprobadas
  const ambasInstanciasAprobadas = solicitud.aprobadores?.legales?.aprobado && solicitud.aprobadores?.contable?.aprobado
  
  // Determinar si el usuario actual ya aprobó la solicitud
  // Extraer solo el nombre del usuario actual (antes del " - ")
  const nombreUsuarioActual = usuarioActual.split(' - ')[0]
  const usuarioYaAprobo = solicitud.aprobadores?.legales?.aprobadoPor === nombreUsuarioActual || 
                         solicitud.aprobadores?.contable?.aprobadoPor === nombreUsuarioActual

  const handleConfirmApprove = () => {
    setIsApproveModalOpen(false)
    setObservacion("")
  }

  const handleConfirmReject = () => {
    setIsRejectModalOpen(false)
    setObservacion("")
  }

  const handleRedirigir = () => {
    setIsRedirigirModalOpen(false)
  }

  const handleVerDocumento = (nombre: string, archivo: string) => {
    alert(`Ver documento: ${nombre} (${archivo})`);
  }

  // Datos de ejemplo para sugerencias
  const empleadosEjemplo = [
    "Ana García", "Carlos López", "María Fernández", "Roberto Martínez",
    "Diego Torres", "Juan Pérez", "Sofía Ramírez"
  ]
  const departamentosEjemplo = [
    "Gerencia General", "Operaciones Portuarias", "Administración",
    "Comunicación", "Prensa", "Recursos Humanos"
  ]

  const sugerencias = (redirigirTipo === "Empleado" ? empleadosEjemplo : departamentosEjemplo)
    .filter((item) => item.toLowerCase().includes(redirigirBusqueda.toLowerCase()))
    .slice(0, 8)

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={urlRetorno}>
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{tituloModulo}</h1>
            <p className="text-gray-600">{solicitud.numero} - {solicitud.asunto}</p>
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
          {/* Detalle solicitud */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Detalle Solicitud</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Nro solicitud:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.numero}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Fecha solicitud:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.fecha}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Tipo solicitud:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.tipo}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Estado:</span>
                </div>
                <div>{renderEstadoBadge(solicitud.estado)}</div>
              </div>
            </div>
          </div>

          {/* Pestañas de contenido */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="datos-basicos" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Datos Básicos
              </TabsTrigger>
              <TabsTrigger value="personal-vehiculos" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Personal/Vehículos
              </TabsTrigger>
              <TabsTrigger value="documentacion" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documentación
              </TabsTrigger>
            </TabsList>

            <TabsContent value="datos-basicos" className="space-y-6">
              {/* Datos Personales */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Datos Personales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Nombre:</span>
                    <p className="text-sm font-medium">{solicitud.nombre || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Apellido:</span>
                    <p className="text-sm font-medium">{solicitud.apellido || "-"}</p>
                  </div>
                  {solicitud.dni && (
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-500">DNI:</span>
                      <p className="text-sm font-medium">{solicitud.dni}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Apoderado:</span>
                    <p className="text-sm font-medium">{solicitud.apoderado === "si" ? "Sí" : "No"}</p>
                  </div>
                </div>
                {solicitud.apoderado === "si" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-500">Nombre Apoderado:</span>
                      <p className="text-sm font-medium">{solicitud.apoderadoNombre || "-"}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-500">Apellido Apoderado:</span>
                      <p className="text-sm font-medium">{solicitud.apoderadoApellido || "-"}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-500">DNI Apoderado:</span>
                      <p className="text-sm font-medium">{solicitud.apoderadoDni || "-"}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Datos Generales */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Datos Generales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Razón Social:</span>
                    <p className="text-sm font-medium">{solicitud.razonSocial || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">CUIT:</span>
                    <p className="text-sm font-medium">{solicitud.cuit || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Nombre Fantasía:</span>
                    <p className="text-sm font-medium">{solicitud.nombreFantasia || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Naturaleza Organización:</span>
                    <p className="text-sm font-medium">{solicitud.naturalezaOrganizacion || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Tipo Societario:</span>
                    <p className="text-sm font-medium">{solicitud.tipoSocietario || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Contacto Comercial */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contacto Comercial
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Nombre Completo:</span>
                    <p className="text-sm font-medium">{solicitud.nombreCompleto || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Cargo:</span>
                    <p className="text-sm font-medium">{solicitud.cargo || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                    <p className="text-sm font-medium">{solicitud.telefono || "-"}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-500">Email:</span>
                    <p className="text-sm font-medium">{solicitud.email || "-"}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="personal-vehiculos" className="space-y-6">
              {/* Personal */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personal Operativo
                </h3>
                {solicitud.personalSeleccionado && solicitud.personalSeleccionado.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nombre Completo</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">DNI</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Teléfono</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {solicitud.personalSeleccionado.map((persona, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{persona.nombre}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{persona.dni}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{persona.telefono}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No hay personal seleccionado</p>
                )}
              </div>

              {/* Vehículos */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Vehículos Operativos
                </h3>
                {solicitud.vehiculosSeleccionados && solicitud.vehiculosSeleccionados.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tipo Vehículo</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Patente</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Marca</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {solicitud.vehiculosSeleccionados.map((vehiculo, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{vehiculo.tipo}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{vehiculo.patente}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{vehiculo.marca}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No hay vehículos seleccionados</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="documentacion" className="space-y-6">
              {/* Documentación Personal */}
              {solicitud.documentacionPersonal && solicitud.documentacionPersonal.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Documentación Personal
                  </h3>
                  <div className="space-y-3">
                    {solicitud.documentacionPersonal.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                        <div className="flex items-center flex-1">
                          <FileText className="h-4 w-4 text-blue-600 mr-3" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-700">{doc.nombre}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Estado: {doc.estado === 'completado' ? 'Completado' : 'Pendiente'}
                              {doc.fechaCarga && ` - Cargado: ${doc.fechaCarga}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleVerDocumento(doc.nombre, doc.archivo || '')}>
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

              {/* Documentación General */}
              {solicitud.documentacionGeneral && solicitud.documentacionGeneral.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Documentación General
                  </h3>
                  <div className="space-y-3">
                    {solicitud.documentacionGeneral.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                        <div className="flex items-center flex-1">
                          <FileText className="h-4 w-4 text-blue-600 mr-3" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-700">{doc.nombre}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Estado: {doc.estado === 'completado' ? 'Completado' : 'Pendiente'}
                              {doc.fechaEmision && ` - Emisión: ${doc.fechaEmision}`}
                              {doc.fechaVencimiento && ` - Vencimiento: ${doc.fechaVencimiento}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleVerDocumento(doc.nombre, doc.archivo || '')}>
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

              {/* Documentación de Seguros */}
              {solicitud.documentacionSeguros && solicitud.documentacionSeguros.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Documentación de Seguros
                  </h3>
                  <div className="space-y-3">
                    {solicitud.documentacionSeguros.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                        <div className="flex items-center flex-1">
                          <FileText className="h-4 w-4 text-blue-600 mr-3" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-700">{doc.nombre}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Estado: {doc.estado === 'completado' ? 'Completado' : 'Pendiente'}
                              {doc.fechaEmision && ` - Emisión: ${doc.fechaEmision}`}
                              {doc.fechaVencimiento && ` - Vencimiento: ${doc.fechaVencimiento}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleVerDocumento(doc.nombre, doc.archivo || '')}>
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

              {/* Documentación de Facturación */}
              {solicitud.documentacionFacturacion && solicitud.documentacionFacturacion.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Documentación de Facturación
                  </h3>
                  <div className="space-y-3">
                    {solicitud.documentacionFacturacion.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                        <div className="flex items-center flex-1">
                          <FileText className="h-4 w-4 text-blue-600 mr-3" />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-700">{doc.nombre}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Estado: {doc.estado === 'completado' ? 'Completado' : 'Pendiente'}
                              {doc.fechaCarga && ` - Cargado: ${doc.fechaCarga}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleVerDocumento(doc.nombre, doc.archivo || '')}>
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
            </TabsContent>
          </Tabs>
        </div>

        {/* Columna derecha - Acciones y Aprobadores */}
        <div className="space-y-6">
          {/* Aprobadores */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Aprobadores</h2>
            <div className="space-y-4">
              {/* Legales */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${solicitud.aprobadores?.legales?.aprobado ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium">Legales</span>
                </div>
                <div className="text-right">
                  {solicitud.aprobadores?.legales?.aprobado ? (
                    <div>
                      <div className="text-sm font-medium text-green-700">✓ {solicitud.aprobadores.legales.aprobadoPor}</div>
                      <div className="text-xs text-gray-500">{solicitud.aprobadores.legales.fechaAprobacion}</div>
                    </div>
                  ) : (
                    <div className="text-sm text-red-600">⏳ Pendiente</div>
                  )}
                </div>
              </div>

              {/* Contable */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${solicitud.aprobadores?.contable?.aprobado ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium">Contable</span>
                </div>
                <div className="text-right">
                  {solicitud.aprobadores?.contable?.aprobado ? (
                    <div>
                      <div className="text-sm font-medium text-green-700">✓ {solicitud.aprobadores.contable.aprobadoPor}</div>
                      <div className="text-xs text-gray-500">{solicitud.aprobadores.contable.fechaAprobacion}</div>
                    </div>
                  ) : (
                    <div className="text-sm text-red-600">⏳ Pendiente</div>
                  )}
                </div>
              </div>

              {/* Habilitación */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${solicitud.aprobadores?.habilitacion?.habilitado ? 'bg-green-500' : ambasInstanciasAprobadas ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium">Habilitación</span>
                </div>
                <div className="text-right">
                  {solicitud.aprobadores?.habilitacion?.habilitado ? (
                    <div>
                      <div className="text-sm font-medium text-green-700">✓ {solicitud.aprobadores.habilitacion.habilitadoPor}</div>
                      <div className="text-xs text-gray-500">{solicitud.aprobadores.habilitacion.fechaHabilitacion}</div>
                    </div>
                  ) : ambasInstanciasAprobadas ? (
                    <div className="text-sm text-yellow-600">🔓 Lista para habilitar</div>
                  ) : (
                    <div className="text-sm text-red-600">🔒 Bloqueada</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Acciones</h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <Button
                  className={`w-full ${usuarioYaAprobo ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                  onClick={() => setIsApproveModalOpen(true)}
                  disabled={usuarioYaAprobo}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Aprobar
                </Button>
                <Button
                  variant="outline"
                  className={`w-full ${usuarioYaAprobo ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}
                  onClick={() => setIsRejectModalOpen(true)}
                  disabled={usuarioYaAprobo}
                >
                  <X className="mr-2 h-4 w-4" /> Rechazar
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={() => setIsChatModalOpen(true)}
                >
                  <Mail className="mr-2 h-4 w-4" /> Mensajes
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-blue-400 text-white hover:bg-blue-500"
                  onClick={() => setIsRedirigirModalOpen(true)}
                >
                  <CornerDownRight className="mr-2 h-4 w-4" />
                  Redirigir
                </Button>
                <Button
                  variant="outline"
                  className={`w-full ${ambasInstanciasAprobadas && puedeHabilitar ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                  disabled={!ambasInstanciasAprobadas || !puedeHabilitar}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Habilitar
                </Button>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Contacto</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Tipo solicitante:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.tipoSolicitante}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Departamento:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.departamento}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Solicitante:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.solicitante}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Correo:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.correo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales - Mantener los mismos modales que ya existían */}
      {/* Modal de Confirmación de Aprobación */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Confirmar Aprobación</h3>
            <p className="text-gray-600 mb-4">¿Está seguro que desea aprobar esta solicitud?</p>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">
                  Se enviará una notificación por correo electrónico al solicitante informando la aprobación.
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
                Confirmar Aprobación
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
            <p className="text-gray-600 mb-4">¿Está seguro que desea rechazar esta solicitud?</p>
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
                <p className="text-xs text-gray-500 mt-1">Este campo es obligatorio para el rechazo de solicitudes.</p>
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

      {/* Modal de Chat */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        titulo={solicitud.numero}
        subtitulo={solicitud.asunto}
        mensajes={mensajes}
        onEnviarMensaje={enviarMensaje}
        usuarioActual={usuarioActual}
      />

      {/* Modal de Redirigir */}
      {isRedirigirModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Redirigir Solicitud</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Redirigir a</label>
                <select
                  value={redirigirTipo}
                  onChange={(e) => setRedirigirTipo(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                >
                  <option value="Empleado">Empleado</option>
                  <option value="Departamento">Departamento</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                <input
                  type="text"
                  placeholder={`Buscar ${redirigirTipo.toLowerCase()}...`}
                  value={redirigirBusqueda}
                  onChange={(e) => setRedirigirBusqueda(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  disabled={!!redirigirSeleccion}
                />
                <div className="mt-3 border rounded-md h-32 min-h-[120px] max-h-32 overflow-y-auto bg-white flex flex-col justify-start">
                  {redirigirSeleccion ? (
                    <div className="flex items-center justify-between px-4 py-3 bg-blue-50 text-blue-700 font-medium">
                      <span>{redirigirSeleccion}</span>
                      <button
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => setRedirigirSeleccion(null)}
                        type="button"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    sugerencias.length > 0 ? (
                      sugerencias.map((item) => (
                        <div
                          key={item}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                          onClick={() => setRedirigirSeleccion(item)}
                        >
                          {item}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-gray-400 text-center select-none">Sin resultados</div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsRedirigirModalOpen(false)}>
                Cerrar
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                disabled={!redirigirSeleccion}
                onClick={handleRedirigir}
              >
                Redirigir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
