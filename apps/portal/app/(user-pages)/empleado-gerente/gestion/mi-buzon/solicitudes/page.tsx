"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, Printer, Download, Eye, X, Check, FileText, Clock, User, Building, Calendar, Mail, CornerDownRight, Trash, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChatModal } from "@/components/ui/chat-modal"
import { useChat } from "@/hooks/use-chat"

// Tipos para las solicitudes de gerencia
type SolicitudGerencia = {
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
  firmantes?: Array<{
    id: number
    nombre: string
    cargo: string
    estado: "Pendiente" | "Firmado" | "Rechazado" | "En espera"
    fechaFirma?: string
    observaciones?: string
    esActual: boolean
  }>
  correo?: string
  asignacion?: string
  adjuntos?: string[]
}

export default function SolicitudesGerenciaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [numeroSolicitud, setNumeroSolicitud] = useState("")
  const [nombreSolicitante, setNombreSolicitante] = useState("")
  const [tipoSolicitanteFilter, setTipoSolicitanteFilter] = useState("Todos")
  const [departamentoFilter, setDepartamentoFilter] = useState("Todos")
  const [tipoFilter, setTipoFilter] = useState("Todos")
  const [estadoFilter, setEstadoFilter] = useState("Todos")
  const [activeTab, setActiveTab] = useState("recibidas")



  // Estados para los modales de confirmación
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [observacion, setObservacion] = useState("")

  // Estados para el chat modal
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [solicitudSeleccionadaChat, setSolicitudSeleccionadaChat] = useState<SolicitudGerencia | null>(null)

  // Estado para el modal de redirección
  const [isRedirigirModalOpen, setIsRedirigirModalOpen] = useState(false)
  const [redirigirTipo, setRedirigirTipo] = useState("Empleado")
  const [redirigirBusqueda, setRedirigirBusqueda] = useState("")
  const [redirigirSeleccion, setRedirigirSeleccion] = useState<string | null>(null)

  // Datos de ejemplo para solicitudes externas (Proveedores, Clientes, etc.)
  const solicitudesExternas: SolicitudGerencia[] = [
    {
      id: 1,
      numero: "SOL-2024-7001",
      tipo: "Consulta",
      tipoSolicitante: "Cliente",
      asunto: "Consulta sobre Expansión de Operaciones",
      descripcion:
        "Consultamos sobre las posibilidades de expansión de nuestras operaciones portuarias. Necesitamos evaluar factibilidad técnica y económica.",
      fecha: "10/02/2024",
      estado: "Resuelta",
      ultimaActualizacion: "15/02/2024",
      solicitante: "Naviera del Atlántico S.A.",
      departamento: "Gerencia",
      correo: "contacto@navieraatlantico.com",
      asignacion: "Ricardo Fernández",
      comentarios: [
        "10/02/2024 - Sistema: Solicitud creada",
        "10/02/2024 - Naviera del Atlántico: Adjunta propuesta de expansión",
      ],
      firmantes: [],
        },
        {
          id: 2,
      numero: "SOL-2024-7002",
      tipo: "Reclamo",
      tipoSolicitante: "Proveedor",
      asunto: "Reclamo por Demora en Proceso de Licitación",
      descripcion:
        "Reclamamos la demora en el proceso de licitación N° LIC-2024-20. Los plazos establecidos han sido excedidos significativamente.",
      fecha: "11/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "11/02/2024",
      solicitante: "Construcciones Marítimas SRL",
      departamento: "Gerencia",
      correo: "contacto@construccionesmaritimas.com",
      asignacion: "Carlos López",
      comentarios: [
        "11/02/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 3,
      numero: "SOL-2024-7003",
      tipo: "Tramite",
      tipoSolicitante: "Cliente",
      asunto: "Solicitud de Renovación de Contrato Marco",
      descripcion:
        "Solicitamos la renovación del contrato marco de servicios portuarios que vence el 30/03/2024. Adjuntamos propuesta de condiciones actualizadas.",
      fecha: "12/02/2024",
      estado: "Rechazada",
      ultimaActualizacion: "12/02/2024",
      solicitante: "Exportadora Regional Ltda.",
      departamento: "Gerencia",
      correo: "administracion@exportadoraregional.com",
      asignacion: "Ana Martínez",
      comentarios: [
        "12/02/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
  ]

  // Datos de ejemplo para solicitudes de empleados
  const solicitudesEmpleados: SolicitudGerencia[] = [
    {
      id: 6,
      numero: "SOL-2024-7006",
      tipo: "Licencia ordinaria anual",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de vacaciones de verano",
      descripcion:
        "Solicito autorización para tomar vacaciones del 01/03/2024 al 15/03/2024.",
      fecha: "15/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "15/02/2024",
      solicitante: "María González",
      departamento: "Gerencia",
      correo: "maria.gonzalez@empresa.com",
      asignacion: "Ricardo Fernández",
      comentarios: [
        "15/02/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Ricardo Fernández",
          cargo: "Gerente General",
          estado: "Pendiente",
          esActual: true,
        },
      ],
    },
    {
      id: 7,
      numero: "SOL-2024-7007",
      tipo: "Licencia medica",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de licencia médica",
      descripcion:
        "Solicito licencia médica por tratamiento médico programado del 20/02/2024 al 28/02/2024.",
      fecha: "16/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "18/02/2024",
      solicitante: "Juan Pérez",
      departamento: "Gerencia",
      correo: "juan.perez@empresa.com",
      asignacion: "Carlos López",
      comentarios: [
        "16/02/2024 - Sistema: Solicitud creada",
        "18/02/2024 - Carlos López: En revisión",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Carlos López",
          cargo: "Subdirector de Gerencia",
          estado: "En espera",
          esActual: true,
        },
      ],
    },
    {
      id: 8,
      numero: "SOL-2024-7008",
      tipo: "Solicitud de prestamo",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de préstamo personal",
      descripcion:
        "Solicito préstamo personal por motivos familiares urgentes.",
      fecha: "17/02/2024",
      estado: "Aprobada",
      ultimaActualizacion: "20/02/2024",
      solicitante: "Ana Martínez",
      departamento: "Gerencia",
      correo: "ana.martinez@empresa.com",
      asignacion: "Roberto Silva",
      comentarios: [
        "17/02/2024 - Sistema: Solicitud creada",
        "20/02/2024 - Roberto Silva: Aprobada",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Roberto Silva",
          cargo: "Director Administrativo",
          estado: "Firmado",
          fechaFirma: "20/02/2024",
          esActual: false,
        },
      ],
    },
    {
      id: 9,
      numero: "SOL-2024-7009",
      tipo: "Dia de tramite",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de día de trámite",
      descripcion:
        "Solicito día de trámite para realizar gestiones bancarias personales el 25/02/2024.",
      fecha: "18/02/2024",
      estado: "Aprobada",
      ultimaActualizacion: "19/02/2024",
      solicitante: "Carlos Rodríguez",
      departamento: "Gerencia",
      correo: "carlos.rodriguez@empresa.com",
      asignacion: "Ricardo Fernández",
      comentarios: [
        "18/02/2024 - Sistema: Solicitud creada",
        "19/02/2024 - Ricardo Fernández: Aprobada",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Ricardo Fernández",
          cargo: "Gerente General",
          estado: "Firmado",
          fechaFirma: "19/02/2024",
          esActual: false,
        },
      ],
    },
    {
      id: 10,
      numero: "SOL-2024-7010",
      tipo: "Documentación",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de certificado de antigüedad",
      descripcion:
        "Solicito certificado de antigüedad para trámites de crédito hipotecario.",
      fecha: "19/02/2024",
      estado: "Aprobada",
      ultimaActualizacion: "20/02/2024",
      solicitante: "Patricia López",
      departamento: "Gerencia",
      correo: "patricia.lopez@empresa.com",
      asignacion: "Roberto Silva",
      comentarios: [
        "19/02/2024 - Sistema: Solicitud creada",
        "20/02/2024 - Roberto Silva: Aprobada",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Roberto Silva",
          cargo: "Director Administrativo",
          estado: "Firmado",
          fechaFirma: "20/02/2024",
          esActual: false,
        },
      ],
    },
    {
      id: 11,
      numero: "SOL-2024-7011",
      tipo: "Cambio de datos",
      tipoSolicitante: "Empleado",
      asunto: "Actualización de datos personales",
      descripcion:
        "Solicito actualización de mi dirección y teléfono en el sistema de RRHH.",
      fecha: "20/02/2024",
      estado: "Rechazada",
      ultimaActualizacion: "21/02/2024",
      solicitante: "Diego Fernández",
      departamento: "Gerencia",
      correo: "diego.fernandez@empresa.com",
      asignacion: "Carlos López",
      comentarios: [
        "20/02/2024 - Sistema: Solicitud creada",
        "21/02/2024 - Carlos López: Rechazada - Documentación incompleta",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Carlos López",
          cargo: "Subdirector de Gerencia",
          estado: "Rechazado",
          fechaFirma: "21/02/2024",
          esActual: false,
        },
      ],
    },
    {
      id: 12,
      numero: "SOL-2024-7012",
      tipo: "Licencia ordinaria anual",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de vacaciones de invierno",
      descripcion:
        "Solicito vacaciones de invierno del 15/07/2024 al 29/07/2024.",
      fecha: "21/02/2024",
      estado: "Cancelada",
      ultimaActualizacion: "22/02/2024",
      solicitante: "Sofía Ramírez",
      departamento: "Gerencia",
      correo: "sofia.ramirez@empresa.com",
      asignacion: "Ricardo Fernández",
      comentarios: [
        "21/02/2024 - Sistema: Solicitud creada",
        "22/02/2024 - Sofía Ramírez: Solicitud cancelada por el empleado",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Ricardo Fernández",
          cargo: "Gerente General",
          estado: "En espera",
          esActual: false,
        },
      ],
    },
  ]

  // Filtrar solicitudes pendientes por tipo
  const solicitudesExternasPendientes = solicitudesExternas.filter((solicitud) => solicitud.estado === "En proceso")
  const solicitudesEmpleadosPendientes = solicitudesEmpleados.filter((solicitud) => solicitud.estado === "En proceso")

  // Función para filtrar las solicitudes externas
  const filterSolicitudesExternas = (solicitudes: SolicitudGerencia[]) => {
    return solicitudes.filter((solicitud) => {
      const matchesNumero = numeroSolicitud === "" || solicitud.numero.includes(numeroSolicitud)
      const matchesEstado = estadoFilter === "Todos" || solicitud.estado === estadoFilter
      const matchesTipo = tipoFilter === "Todos" || solicitud.tipo === tipoFilter
      const matchesSearch = searchTerm === "" || Object.values(solicitud).some((value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesNumero && matchesEstado && matchesTipo && matchesSearch
    })
  }

  // Función para filtrar las solicitudes de empleados
  const filterSolicitudesEmpleados = (solicitudes: SolicitudGerencia[]) => {
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
    setTipoSolicitanteFilter("Todos")
    setDepartamentoFilter("Todos")
    setTipoFilter("Todos")
    setEstadoFilter("Todos")
  }



  const handleOpenApproveModal = (solicitud: SolicitudGerencia) => {
    setIsApproveModalOpen(true)
  }

  const handleOpenRejectModal = (solicitud: SolicitudGerencia) => {
    setIsRejectModalOpen(true)
  }

  const handleOpenChatModal = (solicitud: SolicitudGerencia) => {
    setSolicitudSeleccionadaChat(solicitud)
    setIsChatModalOpen(true)
  }

  // Hook para manejar el chat
  const { mensajes, enviarMensaje } = useChat({
    chatId: solicitudSeleccionadaChat?.numero || '',
    usuarioActual: 'Ricardo Fernández' // En producción vendría del contexto de usuario
  })

  const handleConfirmApprove = () => {
    setIsApproveModalOpen(false)
    setObservacion("")
  }

  const handleConfirmReject = () => {
    setIsRejectModalOpen(false)
    setObservacion("")
  }

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En Revisión":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Revisión</Badge>
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
      case "Respondida":
        return <Badge className="bg-green-50 text-green-700 hover:bg-green-100">Respondida</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  // Datos de ejemplo
  const empleadosEjemplo = [
    "Ana García",
    "Carlos López",
    "María Fernández",
    "Roberto Martínez",
    "Diego Torres",
    "Juan Pérez",
    "Sofía Ramírez",
  ]
  const departamentosEjemplo = [
    "Gerencia General",
    "Operaciones Portuarias",
    "Administración",
    "Comunicación",
    "Recursos Humanos",
    "Compras",
  ]

  // Sugerencias filtradas
  const sugerencias = (redirigirTipo === "Empleado" ? empleadosEjemplo : departamentosEjemplo)
    .filter((item) => item.toLowerCase().includes(redirigirBusqueda.toLowerCase()))
    .slice(0, 8)

  // Abrir modal de redirigir
  const handleOpenRedirigirModal = () => {
    setIsRedirigirModalOpen(true)
    setRedirigirBusqueda("")
    setRedirigirSeleccion(null)
    setRedirigirTipo("Empleado")
  }
  // Cerrar modal de redirigir
  const handleRedirigir = () => {
    setIsRedirigirModalOpen(false)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Tabs visualmente mejoradas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex justify-center gap-2 bg-transparent mb-8">
          <TabsTrigger
            value="recibidas"
            className={cn(
              "relative px-8 py-3 rounded-full font-semibold transition-all duration-200 text-base flex items-center",
              activeTab === "recibidas"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Externos
            {solicitudesExternasPendientes.length > 0 && (
              <span className={cn(
                "ml-2 inline-flex items-center justify-center rounded-full text-xs font-bold w-6 h-6",
                activeTab === "recibidas"
                  ? "bg-white text-blue-600"
                  : "bg-red-500 text-white"
              )}>
                {solicitudesExternasPendientes.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="pendientes"
            className={cn(
              "relative px-8 py-3 rounded-full font-semibold transition-all duration-200 text-base flex items-center",
              activeTab === "pendientes"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Empleados
            {solicitudesEmpleadosPendientes.length > 0 && (
              <span className={cn(
                "ml-2 inline-flex items-center justify-center rounded-full text-xs font-bold w-6 h-6",
                activeTab === "pendientes"
                  ? "bg-white text-blue-600"
                  : "bg-red-500 text-white"
              )}>
                {solicitudesEmpleadosPendientes.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Tab de Recibidas */}
        <TabsContent value="recibidas" className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Solicitudes Externas - Gerencia</h1>
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
                <label htmlFor="numeroSolicitudRecibidas" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Solicitud
                </label>
                <Input
                  id="numeroSolicitudRecibidas"
                  placeholder="Ej: SOL-2024-7001"
                  className="w-full"
                  value={numeroSolicitud}
                  onChange={(e) => setNumeroSolicitud(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="estadoRecibidas" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                  <SelectTrigger id="estadoRecibidas">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Resuelta">Resuelta</SelectItem>
                    <SelectItem value="Rechazada">Rechazada</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                    <SelectItem value="En proceso">En proceso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="tipoSolicitudRecibidas" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Solicitud
                </label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger id="tipoSolicitudRecibidas">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Reclamo">Reclamo</SelectItem>
                    <SelectItem value="Consulta">Consulta</SelectItem>
                    <SelectItem value="Tramite">Trámite</SelectItem>
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
                        <td className="px-4 py-4 text-sm text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/empleado-gerente/gestion/mi-buzon/solicitudes/externos/${solicitud.id}`} className="flex items-center">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalle
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenChatModal(solicitud)}>
                                <Check className="mr-2 h-4 w-4" />
                                Resolver
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenRejectModal(solicitud)}>
                                <X className="mr-2 h-4 w-4" />
                                Rechazar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenChatModal(solicitud)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Mensajes
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={handleOpenRedirigirModal}>
                                <CornerDownRight className="mr-2 h-4 w-4" />
                                Redirigir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-4 text-sm text-center text-gray-500 italic">
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

        {/* Tab de Aprobaciones Pendientes */}
        <TabsContent value="pendientes" className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Solicitudes de Empleados - Gerencia</h1>
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
                <label htmlFor="numeroSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Solicitud
                </label>
                <Input
                  id="numeroSolicitud"
                  placeholder="Ej: SOL-2024-7001"
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
                    <SelectItem value="Aprobada">Aprobada</SelectItem>
                    <SelectItem value="Rechazada">Rechazada</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento
                </label>
                <Select value={departamentoFilter} onValueChange={setDepartamentoFilter}>
                  <SelectTrigger id="departamento">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Gerencia">Gerencia</SelectItem>
                    <SelectItem value="Operaciones Portuarias">Operaciones Portuarias</SelectItem>
                    <SelectItem value="Administración">Administración</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="tipoSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Solicitud
                </label>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger id="tipoSolicitud">
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

          {/* Tabla de Solicitudes Pendientes */}
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
                        <td className="px-4 py-4 text-sm text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/empleado-gerente/gestion/mi-buzon/solicitudes/empleados/${solicitud.id}`} className="flex items-center">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalle
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenApproveModal(solicitud)}>
                                <Check className="mr-2 h-4 w-4" />
                                Aprobar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenRejectModal(solicitud)}>
                                <X className="mr-2 h-4 w-4" />
                                Rechazar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenChatModal(solicitud)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Mensajes
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={handleOpenRedirigirModal}>
                                  <CornerDownRight className="mr-2 h-4 w-4" />
                                  Redirigir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-4 text-sm text-center text-gray-500 italic">
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
        titulo={solicitudSeleccionadaChat?.numero || ''}
        subtitulo={solicitudSeleccionadaChat?.asunto}
        mensajes={mensajes}
        onEnviarMensaje={enviarMensaje}
        usuarioActual="Ricardo Fernández"
      />

      {/* Modal de Redirigir */}
      {isRedirigirModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Redirigir Solicitud</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Redirigir a</label>
              <Select value={redirigirTipo} onValueChange={setRedirigirTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Empleado">Empleado</SelectItem>
                  <SelectItem value="Departamento">Departamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <Input
                placeholder={`Buscar ${redirigirTipo.toLowerCase()}...`}
                value={redirigirBusqueda}
                onChange={e => setRedirigirBusqueda(e.target.value)}
                className="w-full"
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
