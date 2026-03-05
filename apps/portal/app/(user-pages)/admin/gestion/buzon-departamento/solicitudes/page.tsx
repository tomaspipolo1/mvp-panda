"use client"

import { useState } from "react"
import { ArrowLeft, Search, Mail, MailOpen, Paperclip, Filter, Printer, Download, Eye, User, UserCheck, MoreVertical } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { DetalleSolicitudBuzonModal } from "@/components/solicitudes/detalle-solicitud-buzon-modal"
import { cn } from "@/lib/utils"

// Tipos para las solicitudes del departamento
type SolicitudDepartamento = {
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
  hora?: string
  leido?: boolean
  prioridad?: string
  contenido?: string
}

// Datos de ejemplo para solicitudes externas del departamento
const solicitudesExternas: SolicitudDepartamento[] = [
  {
    id: 101,
    numero: "SOL-ADM-3001",
    tipo: "Inscripción",
    tipoSolicitante: "Empresa Servicios Portuarios",
    asunto: "Solicitud de Inscripción - Nueva Empresa",
    descripcion: "Solicito la inscripción como empresa de servicios portuarios. Adjunto toda la documentación requerida según normativa vigente.",
    fecha: "15/01/2024",
    estado: "En proceso",
    ultimaActualizacion: "15/01/2024",
    solicitante: "Servicios Portuarios del Sur S.A.",
    departamento: "Administración",
    correo: "contacto@puertosur.com",
    asignacion: "Sin asignar",
    adjuntos: ["dni-apoderado.pdf", "constancia-arca.pdf", "convenio-multilateral.pdf", "art-personal.pdf", "factura-inscripcion.pdf", "certificado-afip.pdf", "constancia-monotributo.pdf", "declaracion-jurada.pdf", "poliza-seguro.pdf", "certificado-bancario.pdf", "balance-ejercicio.pdf", "estado-cuenta.pdf", "contrato-alquiler.pdf"],
    hora: "10:00",
    leido: false,
    prioridad: "Alta",
    contenido: "Solicito la inscripción como empresa de servicios portuarios. Adjunto toda la documentación requerida según normativa vigente.",
  },
  {
    id: 102,
    numero: "SOL-ADM-3002",
    tipo: "Reinscripción",
    tipoSolicitante: "Empresa Servicios Portuarios",
    asunto: "Solicitud de Reinscripción - Renovación de Habilitación",
    descripcion: "Solicito la reinscripción como empresa de servicios portuarios para renovar la habilitación vigente. Adjunto documentación actualizada.",
    fecha: "14/01/2024",
    estado: "En proceso",
    ultimaActualizacion: "14/01/2024",
    solicitante: "Transportes Marítimos Rápidos",
    departamento: "Administración",
    correo: "info@transmaritimos.com.ar",
    asignacion: "María González",
    adjuntos: ["dni-apoderado.pdf", "constancia-arca.pdf", "convenio-multilateral.pdf", "art-personal.pdf", "factura-inscripcion.pdf", "certificado-afip.pdf", "constancia-monotributo.pdf", "declaracion-jurada.pdf", "poliza-seguro.pdf", "certificado-bancario.pdf", "balance-ejercicio.pdf", "estado-cuenta.pdf", "contrato-alquiler.pdf", "licencia-comercial.pdf", "permiso-municipal.pdf"],
    hora: "14:00",
    leido: true,
    prioridad: "Alta",
    contenido: "Solicito la reinscripción como empresa de servicios portuarios para renovar la habilitación vigente. Adjunto documentación actualizada.",
  },
  {
    id: 103,
    numero: "SOL-ADM-3003",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Consulta sobre Procedimientos de Atraque",
    descripcion: "Consulto sobre los nuevos procedimientos de atraque para buques de gran porte. Necesito información sobre documentación requerida y tiempos de gestión.",
    fecha: "12/01/2024",
    estado: "Resuelta",
    ultimaActualizacion: "12/01/2024",
    solicitante: "Naviera del Río de la Plata",
    departamento: "Administración",
    correo: "operaciones@navierarioplata.com",
    asignacion: "Carlos Rodríguez",
    adjuntos: [],
    hora: "15:30",
    leido: true,
    prioridad: "Baja",
    contenido: "Consulto sobre los nuevos procedimientos de atraque para buques de gran porte. Necesito información sobre documentación requerida y tiempos de gestión.",
  },
  {
    id: 104,
    numero: "SOL-ADM-3004",
    tipo: "Reclamo",
    tipoSolicitante: "Proveedor",
    asunto: "Reclamo por Facturación Incorrecta",
    descripcion: "Reclamo por facturación incorrecta en la factura N° 0001-00234567. Los servicios facturados no corresponden a los efectivamente prestados.",
    fecha: "13/01/2024",
    estado: "En proceso",
    ultimaActualizacion: "13/01/2024",
    solicitante: "Servicios Portuarios del Atlántico",
    departamento: "Administración",
    correo: "facturacion@serviciosportuarios.com",
    asignacion: "Sin asignar",
    adjuntos: ["factura_observada.pdf", "detalle_servicios.xlsx"],
    hora: "13:10",
    leido: false,
    prioridad: "Media",
    contenido: "Reclamo por facturación incorrecta en la factura N° 0001-00234567. Los servicios facturados no corresponden a los efectivamente prestados.",
  },
  {
    id: 105,
    numero: "SOL-ADM-3005",
    tipo: "Inscripción",
    tipoSolicitante: "Empresa Servicios Portuarios",
    asunto: "Solicitud de Inscripción - Nueva Empresa",
    descripcion: "Solicito la inscripción como empresa de servicios portuarios. Adjunto toda la documentación requerida según normativa vigente.",
    fecha: "13/01/2024",
    estado: "En proceso",
    ultimaActualizacion: "13/01/2024",
    solicitante: "Insumos Portuarios SRL",
    departamento: "Administración",
    correo: "ventas@insumosportuarios.com",
    asignacion: "Sin asignar",
    adjuntos: ["dni-apoderado.pdf", "constancia-arca.pdf", "convenio-multilateral.pdf", "art-personal.pdf", "factura-inscripcion.pdf", "certificado-afip.pdf", "constancia-monotributo.pdf", "declaracion-jurada.pdf", "poliza-seguro.pdf", "certificado-bancario.pdf", "balance-ejercicio.pdf", "estado-cuenta.pdf", "contrato-alquiler.pdf", "licencia-comercial.pdf", "permiso-municipal.pdf", "certificado-iso.pdf", "manual-calidad.pdf", "procedimientos-operativos.pdf"],
    hora: "16:30",
    leido: false,
    prioridad: "Alta",
    contenido: "Solicito la inscripción como empresa de servicios portuarios. Adjunto toda la documentación requerida según normativa vigente.",
  },
]

// Datos de ejemplo para solicitudes de empleados
const solicitudesEmpleados: SolicitudDepartamento[] = [
  {
    id: 201,
    numero: "SOL-ADM-4001",
    tipo: "Licencia ordinaria anual",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de vacaciones de verano",
    descripcion: "Solicito autorización para tomar vacaciones del 15/02/2024 al 28/02/2024.",
    fecha: "10/01/2024",
    estado: "En proceso",
    ultimaActualizacion: "10/01/2024",
    solicitante: "Roberto Martínez",
    departamento: "Administración",
    correo: "roberto.martinez@empresa.com",
    asignacion: "Sin asignar",
    adjuntos: ["solicitud-vacaciones.pdf"],
    hora: "10:30",
    leido: false,
    prioridad: "Media",
    contenido: "Solicito autorización para tomar vacaciones del 15/02/2024 al 28/02/2024.",
  },
  {
    id: 202,
    numero: "SOL-ADM-4002",
    tipo: "Licencia medica",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de licencia médica",
    descripcion: "Solicito licencia médica por tratamiento médico programado del 20/01/2024 al 25/01/2024.",
    fecha: "12/01/2024",
    estado: "En proceso",
    ultimaActualizacion: "12/01/2024",
    solicitante: "Laura Fernández",
    departamento: "Administración",
    correo: "laura.fernandez@empresa.com",
    asignacion: "Ana Martínez",
    adjuntos: ["certificado-medico.pdf"],
    hora: "14:15",
    leido: true,
    prioridad: "Alta",
    contenido: "Solicito licencia médica por tratamiento médico programado del 20/01/2024 al 25/01/2024.",
  },
  {
    id: 203,
    numero: "SOL-ADM-4003",
    tipo: "Documentación",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de certificado de trabajo",
    descripcion: "Solicito certificado de trabajo para trámites bancarios personales.",
    fecha: "13/01/2024",
    estado: "Aprobada",
    ultimaActualizacion: "13/01/2024",
    solicitante: "Diego Torres",
    departamento: "Administración",
    correo: "diego.torres@empresa.com",
    asignacion: "Roberto Silva",
    adjuntos: ["solicitud-certificado.pdf"],
    hora: "09:45",
    leido: true,
    prioridad: "Baja",
    contenido: "Solicito certificado de trabajo para trámites bancarios personales.",
  },
]

export default function BuzonSolicitudesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [numeroSolicitud, setNumeroSolicitud] = useState("")
  const [tipoFilter, setTipoFilter] = useState("Todos")
  const [estadoFilter, setEstadoFilter] = useState("Todos")
  const [departamentoFilter, setDepartamentoFilter] = useState("Todos")
  const [activeTab, setActiveTab] = useState("externos")
  
  // Estados para modales
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<any>(null)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [isAsignarModalOpen, setIsAsignarModalOpen] = useState(false)
  const [asignarBusqueda, setAsignarBusqueda] = useState("")
  const [asignarSeleccion, setAsignarSeleccion] = useState<string | null>(null)

  // Filtrar solicitudes pendientes por tipo
  const solicitudesExternasPendientes = solicitudesExternas.filter((solicitud) => solicitud.estado === "En proceso")
  const solicitudesEmpleadosPendientes = solicitudesEmpleados.filter((solicitud) => solicitud.estado === "En proceso")

  // Función para filtrar las solicitudes externas
  const filterSolicitudesExternas = (solicitudes: SolicitudDepartamento[]) => {
    return solicitudes.filter((solicitud) => {
      const matchesNumero = numeroSolicitud === "" || solicitud.numero.includes(numeroSolicitud)
      const matchesEstado = estadoFilter === "Todos" || solicitud.estado === estadoFilter
      const matchesTipo = tipoFilter === "Todos" || solicitud.tipo === tipoFilter
      const matchesSearch = searchTerm === "" || Object.values(solicitud).some((value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesNumero && matchesEstado && matchesTipo && matchesSearch
    })
  }

  // Función para filtrar las solicitudes de empleados
  const filterSolicitudesEmpleados = (solicitudes: SolicitudDepartamento[]) => {
    return solicitudes.filter((solicitud) => {
      const matchesNumero = numeroSolicitud === "" || solicitud.numero.includes(numeroSolicitud)
      const matchesEstado = estadoFilter === "Todos" || solicitud.estado === estadoFilter
      const matchesDepartamento = departamentoFilter === "Todos" || solicitud.departamento === departamentoFilter
      const matchesTipo = tipoFilter === "Todos" || solicitud.tipo === tipoFilter
      const matchesSearch = searchTerm === "" || Object.values(solicitud).some((value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesNumero && matchesEstado && matchesDepartamento && matchesTipo && matchesSearch
    })
  }

  const filteredSolicitudesExternas = filterSolicitudesExternas(solicitudesExternas)
  const filteredSolicitudesEmpleados = filterSolicitudesEmpleados(solicitudesEmpleados)

  const handleClearFilters = () => {
    setNumeroSolicitud("")
    setTipoFilter("Todos")
    setEstadoFilter("Todos")
    setDepartamentoFilter("Todos")
  }

  const handleSolicitudClick = (solicitud: any) => {
    // Adaptar la solicitud al formato esperado por el modal
    const solicitudAdaptada = {
      ...solicitud,
      remitente: solicitud.solicitante,
      tipoSolicitud: solicitud.tipo,
      numeroSolicitud: solicitud.numero,
    }
    setSolicitudSeleccionada(solicitudAdaptada)
    setModalAbierto(true)
  }

  const handleCloseModal = () => {
    setModalAbierto(false)
    setSolicitudSeleccionada(null)
  }

  const handleTomar = (solicitud: SolicitudDepartamento) => {
    // Lógica para tomar la solicitud (asignarla al usuario actual)
    console.log("Tomando solicitud:", solicitud.numero)
  }

  const handleOpenAsignarModal = (solicitud: SolicitudDepartamento) => {
    setSolicitudSeleccionada(solicitud)
    setIsAsignarModalOpen(true)
    setAsignarBusqueda("")
    setAsignarSeleccion(null)
  }

  const handleAsignar = () => {
    if (asignarSeleccion && solicitudSeleccionada) {
      console.log("Asignando solicitud", solicitudSeleccionada.numero, "a", asignarSeleccion)
      setIsAsignarModalOpen(false)
      setAsignarSeleccion(null)
      setSolicitudSeleccionada(null)
    }
  }

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En proceso</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Resuelta":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resuelta</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  // Datos de ejemplo para asignación
  const empleadosEjemplo = [
    "Ana García",
    "Carlos López", 
    "María Fernández",
    "Roberto Martínez",
    "Diego Torres",
    "Juan Pérez",
    "Sofía Ramírez",
  ]

  // Sugerencias filtradas para asignación
  const sugerenciasAsignacion = empleadosEjemplo
    .filter((item) => item.toLowerCase().includes(asignarBusqueda.toLowerCase()))
    .slice(0, 8)

  return (
    <div className="container mx-auto py-6 space-y-6">
      

      {/* Tabs visualmente mejoradas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex justify-center gap-2 bg-transparent mb-8">
          <TabsTrigger
            value="externos"
            className={cn(
              "relative px-8 py-3 rounded-full font-semibold transition-all duration-200 text-base flex items-center",
              activeTab === "externos"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Externos
            {solicitudesExternasPendientes.length > 0 && (
              <span className={cn(
                "ml-2 inline-flex items-center justify-center rounded-full text-xs font-bold w-6 h-6",
                activeTab === "externos"
                  ? "bg-white text-blue-600"
                  : "bg-red-500 text-white"
              )}>
                {solicitudesExternasPendientes.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="empleados"
            className={cn(
              "relative px-8 py-3 rounded-full font-semibold transition-all duration-200 text-base flex items-center",
              activeTab === "empleados"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Empleados
            {solicitudesEmpleadosPendientes.length > 0 && (
              <span className={cn(
                "ml-2 inline-flex items-center justify-center rounded-full text-xs font-bold w-6 h-6",
                activeTab === "empleados"
                  ? "bg-white text-blue-600"
                  : "bg-red-500 text-white"
              )}>
                {solicitudesEmpleadosPendientes.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Tab de Externos */}
        <TabsContent value="externos" className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Solicitudes Externas - Departamento Administración</h1>
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

          {/* Filtros */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="numeroSolicitudExternos" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Solicitud
                </label>
              <Input
                  id="numeroSolicitudExternos"
                  placeholder="Ej: SOL-ADM-3001"
                  className="w-full"
                  value={numeroSolicitud}
                  onChange={(e) => setNumeroSolicitud(e.target.value)}
              />
            </div>
              <div>
                <label htmlFor="estadoExternos" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                  <SelectTrigger id="estadoExternos">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="En proceso">En proceso</SelectItem>
                    <SelectItem value="Resuelta">Resuelta</SelectItem>
                    <SelectItem value="Rechazada">Rechazada</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="tipoSolicitudExternos" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Solicitud
                </label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger id="tipoSolicitudExternos">
                    <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Inscripción">Inscripción</SelectItem>
                    <SelectItem value="Reinscripción">Reinscripción</SelectItem>
                    <SelectItem value="Consulta">Consulta</SelectItem>
                    <SelectItem value="Reclamo">Reclamo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" onClick={handleClearFilters}>
                Limpiar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Aplicar Filtros
              </Button>
                    </div>
                  </div>

          {/* Tabla de Solicitudes Externas */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Solicitudes Externas</h2>
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
                  </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Número</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Solicitante</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Asunto</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Asignación</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSolicitudesExternas.length > 0 ? (
                    filteredSolicitudesExternas.map((solicitud) => (
                      <tr key={solicitud.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.fecha}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.numero}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.solicitante}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.tipo}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.asunto}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{renderEstadoBadge(solicitud.estado)}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.asignacion}</td>
                        <td className="px-4 py-4 text-sm text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleSolicitudClick(solicitud)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalle
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleTomar(solicitud)}>
                                <User className="mr-2 h-4 w-4" />
                                Tomar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenAsignarModal(solicitud)}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Asignar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-4 text-sm text-center text-gray-500 italic">
                        No hay solicitudes que coincidan con los filtros
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
                    </div>
            <div className="p-4 flex justify-between items-center text-sm text-gray-500">
              <div>
                Mostrando {filteredSolicitudesExternas.length} de {solicitudesExternas.length} registros
                  </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Siguiente
                </Button>
                </div>
            </div>
            </div>
          </TabsContent>

        {/* Tab de Empleados */}
        <TabsContent value="empleados" className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Solicitudes de Empleados - Departamento Administración</h1>
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

          {/* Filtros */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="numeroSolicitudEmpleados" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Solicitud
                </label>
                <Input
                  id="numeroSolicitudEmpleados"
                  placeholder="Ej: SOL-ADM-4001"
                  className="w-full"
                  value={numeroSolicitud}
                  onChange={(e) => setNumeroSolicitud(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="estadoEmpleados" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                  <SelectTrigger id="estadoEmpleados">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="En proceso">En proceso</SelectItem>
                    <SelectItem value="Aprobada">Aprobada</SelectItem>
                    <SelectItem value="Rechazada">Rechazada</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="departamentoEmpleados" className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento
                </label>
                <Select value={departamentoFilter} onValueChange={setDepartamentoFilter}>
                  <SelectTrigger id="departamentoEmpleados">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Administración">Administración</SelectItem>
                    <SelectItem value="Legales">Legales</SelectItem>
                    <SelectItem value="Operaciones">Operaciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="tipoSolicitudEmpleados" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Solicitud
                </label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger id="tipoSolicitudEmpleados">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Licencia ordinaria anual">Licencia ordinaria anual</SelectItem>
                    <SelectItem value="Licencia medica">Licencia médica</SelectItem>
                    <SelectItem value="Dia de tramite">Día de trámite</SelectItem>
                    <SelectItem value="Documentación">Documentación</SelectItem>
                    <SelectItem value="Cambio de datos">Cambio de datos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" onClick={handleClearFilters}>
                Limpiar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Aplicar Filtros
              </Button>
            </div>
                  </div>

          {/* Tabla de Solicitudes de Empleados */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Solicitudes de Empleados</h2>
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
                        </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Número</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Solicitante</th>
                    
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Departamento</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tipo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Asunto</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Asignación</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSolicitudesEmpleados.length > 0 ? (
                    filteredSolicitudesEmpleados.map((solicitud) => (
                      <tr key={solicitud.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.fecha}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.numero}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.solicitante}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.departamento}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.tipo}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.asunto}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{renderEstadoBadge(solicitud.estado)}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{solicitud.asignacion}</td>
                        <td className="px-4 py-4 text-sm text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleSolicitudClick(solicitud)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver detalle
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleTomar(solicitud)}>
                                <User className="mr-2 h-4 w-4" />
                                Tomar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenAsignarModal(solicitud)}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Asignar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="px-4 py-4 text-sm text-center text-gray-500 italic">
                        No hay solicitudes de empleados que coincidan con los filtros
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
                    </div>
            <div className="p-4 flex justify-between items-center text-sm text-gray-500">
              <div>
                Mostrando {filteredSolicitudesEmpleados.length} de {solicitudesEmpleados.length} registros
                  </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                  1
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Siguiente
                </Button>
                </div>
            </div>
            </div>
          </TabsContent>
        </Tabs>

      {/* Modal de detalle */}
      <DetalleSolicitudBuzonModal isOpen={modalAbierto} onClose={handleCloseModal} solicitud={solicitudSeleccionada} />

      {/* Modal de Asignación */}
      {isAsignarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Asignar Solicitud</h3>
            <p className="text-gray-600 mb-4">
              Asignar solicitud {solicitudSeleccionada?.numero} a un empleado
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar empleado</label>
                <Input
                  placeholder="Buscar empleado..."
                  value={asignarBusqueda}
                  onChange={e => setAsignarBusqueda(e.target.value)}
                  className="w-full"
                  disabled={!!asignarSeleccion}
                />
                <div className="mt-3 border rounded-md h-32 min-h-[120px] max-h-32 overflow-y-auto bg-white flex flex-col justify-start">
                  {asignarSeleccion ? (
                    <div className="flex items-center justify-between px-4 py-3 bg-blue-50 text-blue-700 font-medium">
                      <span>{asignarSeleccion}</span>
                      <button
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => setAsignarSeleccion(null)}
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    sugerenciasAsignacion.length > 0 ? (
                      sugerenciasAsignacion.map((item) => (
                        <div
                          key={item}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                          onClick={() => setAsignarSeleccion(item)}
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
              <Button variant="outline" onClick={() => setIsAsignarModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                disabled={!asignarSeleccion}
                onClick={handleAsignar}
              >
                Asignar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

