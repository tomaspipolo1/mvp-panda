"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Filter, Printer, Download, Eye, X, Check, FileText, Clock, User, Building, Calendar, Mail, CornerDownRight, Trash, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChatModal } from "@/components/ui/chat-modal"
import { useChat } from "@/hooks/use-chat"

// Tipos para las solicitudes de mesa de entradas

type SolicitudMesaEntradas = {
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

export default function SolicitudesMesaEntradasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [numeroSolicitud, setNumeroSolicitud] = useState("")
  const [nombreSolicitante, setNombreSolicitante] = useState("")
  const [tipoSolicitanteFilter, setTipoSolicitanteFilter] = useState("Todos")
  const [departamentoFilter, setDepartamentoFilter] = useState("Todos")
  const [tipoFilter, setTipoFilter] = useState("Todos")
  const [estadoFilter, setEstadoFilter] = useState("Todos")
  const [activeTab, setActiveTab] = useState("recibidas")

  // Estados para el modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudMesaEntradas | null>(null)

  // Estados para los modales de confirmación
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [observacion, setObservacion] = useState("")

  // Estados para el chat modal
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [solicitudSeleccionadaChat, setSolicitudSeleccionadaChat] = useState<SolicitudMesaEntradas | null>(null)

  // Handler para responder (puedes expandirlo luego)
  const [isResponderModalOpen, setIsResponderModalOpen] = useState(false)

  // Estado para el modal de redirección
  const [isRedirigirModalOpen, setIsRedirigirModalOpen] = useState(false)
  const [redirigirTipo, setRedirigirTipo] = useState("Empleado")
  const [redirigirBusqueda, setRedirigirBusqueda] = useState("")
  const [redirigirSeleccion, setRedirigirSeleccion] = useState<string | null>(null)

  // Datos de ejemplo para la tabla de solicitudes recibidas en Mesa de Entradas
  const solicitudesRecibidas: SolicitudMesaEntradas[] = [
    {
      id: 1,
      numero: "SOL-2024-6001",
      tipo: "Tramite",
      tipoSolicitante: "Proveedor",
      asunto: "Ingreso de factura 2024-001 - Servicios de limpieza",
      descripcion:
        "Ingreso de factura por servicios de limpieza correspondiente al mes de febrero 2024. Monto: $85,000. Adjunto factura y comprobantes.",
      fecha: "10/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "10/02/2024",
      solicitante: "Servicios Integrales SRL",
      departamento: "-",
      correo: "facturacion@serviciosintegrales.com",
      asignacion: "María González",
      comentarios: [
        "10/02/2024 - Sistema: Solicitud creada",
        "10/02/2024 - Servicios Integrales: Adjunta factura y comprobantes",
      ],
      firmantes: [],
    },
    {
      id: 2,
      numero: "SOL-2024-6002",
      tipo: "Consulta",
      tipoSolicitante: "Cliente",
      asunto: "Consulta sobre documentación requerida",
      descripcion:
        "Solicitamos información sobre la documentación requerida para el ingreso de mercadería. Es primera vez que realizamos operaciones con ustedes.",
      fecha: "11/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "11/02/2024",
      solicitante: "Importadora del Sur S.A.",
      departamento: "-",
      correo: "operaciones@importadoradelsur.com",
      asignacion: "María González",
      comentarios: [
        "11/02/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 3,
      numero: "SOL-2024-6003",
      tipo: "Tramite",
      tipoSolicitante: "Proveedor",
      asunto: "Ingreso de factura 2024-002 - Materiales de oficina",
      descripcion:
        "Ingreso de factura por materiales de oficina entregados el 15/02/2024. Monto: $45,000. Incluye toner, papel y elementos de escritura.",
      fecha: "12/02/2024",
      estado: "Resuelta",
      ultimaActualizacion: "12/02/2024",
      solicitante: "Oficinas del Centro S.A.",
      departamento: "-",
      correo: "facturacion@oficinascentro.com",
      asignacion: "María González",
      comentarios: [
        "12/02/2024 - Sistema: Solicitud creada",
        "12/02/2024 - Oficinas del Centro: Adjunta factura y remito",
      ],
      firmantes: [],
    },
    {
      id: 4,
      numero: "SOL-2024-6004",
      tipo: "Tramite",
      tipoSolicitante: "Proveedor",
      asunto: "Solicitud de acceso para entrega de mercadería",
      descripcion:
        "Solicitamos autorización de acceso para entrega de mercadería programada para el 20/02/2024. Vehículo: camión con patente ABC123. Conductor: Juan Pérez.",
      fecha: "13/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "13/02/2024",
      solicitante: "Logística Rápida SRL",
      departamento: "-",
      correo: "operaciones@logisticarapida.com",
      asignacion: "María González",
      comentarios: [
        "13/02/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 5,
      numero: "SOL-2024-6005",
      tipo: "Reclamo",
      tipoSolicitante: "Cliente",
      asunto: "Reclamo por demora en procesamiento",
      descripcion:
        "Reclamamos la demora en el procesamiento de nuestra solicitud SOL-2024-0058. Presentada el 05/02/2024 y aún sin respuesta. Urgente para operaciones.",
      fecha: "14/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "14/02/2024",
      solicitante: "Exportadora Norte S.A.",
      departamento: "-",
      correo: "gerencia@exportadoranorte.com",
      asignacion: "María González",
      comentarios: [
        "14/02/2024 - Sistema: Solicitud creada",
        "14/02/2024 - Exportadora Norte: Adjunta copia de solicitud original",
      ],
      firmantes: [],
    },
    {
      id: 6,
      numero: "SOL-2024-6006",
      tipo: "Tramite",
      tipoSolicitante: "Proveedor",
      asunto: "Ingreso de factura 2024-003 - Servicios de mantenimiento",
      descripcion:
        "Ingreso de factura por servicios de mantenimiento preventivo realizados el 10/02/2024. Monto: $120,000. Incluye mantenimiento de equipos HVAC.",
      fecha: "15/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "15/02/2024",
      solicitante: "Mantenimiento Profesional SRL",
      departamento: "-",
      correo: "facturacion@mantenimientoprofesional.com",
      asignacion: "María González",
      comentarios: [
        "15/02/2024 - Sistema: Solicitud creada",
        "15/02/2024 - Mantenimiento Profesional: Adjunta factura y certificado de trabajo",
      ],
      firmantes: [],
    },
    {
      id: 7,
      numero: "SOL-2024-6007",
      tipo: "Consulta",
      tipoSolicitante: "Proveedor",
      asunto: "Consulta sobre estado de pago",
      descripcion:
        "Consultamos sobre el estado de pago de la factura 2024-001 presentada el 10/02/2024. Monto: $85,000. Necesitamos confirmación para nuestra contabilidad.",
      fecha: "16/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "16/02/2024",
      solicitante: "Servicios Integrales SRL",
      departamento: "-",
      correo: "cobranzas@serviciosintegrales.com",
      asignacion: "María González",
      comentarios: [
        "16/02/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 8,
      numero: "SOL-2024-6008",
      tipo: "Tramite",
      tipoSolicitante: "Cliente",
      asunto: "Solicitud de certificado de origen",
      descripcion:
        "Solicitamos certificado de origen para mercadería exportada el 12/02/2024. Contenedor: ABCD1234567. Requerido para trámites aduaneros.",
      fecha: "17/02/2024",
      estado: "Resuelta",
      ultimaActualizacion: "17/02/2024",
      solicitante: "Comercial Internacional S.A.",
      departamento: "-",
      correo: "documentacion@comercialinternacional.com",
      asignacion: "María González",
      comentarios: [
        "17/02/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 9,
      numero: "SOL-2024-6009",
      tipo: "Tramite",
      tipoSolicitante: "Proveedor",
      asunto: "Ingreso de factura 2024-004 - Servicios de seguridad",
      descripcion:
        "Ingreso de factura por servicios de seguridad correspondiente al mes de febrero 2024. Monto: $95,000. Incluye vigilancia 24/7 y control de acceso.",
      fecha: "18/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "18/02/2024",
      solicitante: "Seguridad Total S.A.",
      departamento: "-",
      correo: "facturacion@seguridadtotal.com",
      asignacion: "María González",
      comentarios: [
        "18/02/2024 - Sistema: Solicitud creada",
        "18/02/2024 - Seguridad Total: Adjunta factura y reporte de servicios",
      ],
      firmantes: [],
    },
    {
      id: 10,
      numero: "SOL-2024-6010",
      tipo: "Reclamo",
      tipoSolicitante: "Proveedor",
      asunto: "Reclamo por rechazo de factura",
      descripcion:
        "Reclamamos el rechazo de nuestra factura 2024-002 por servicios de mantenimiento. Motivo: documentación incompleta. Adjuntamos documentación faltante.",
      fecha: "19/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "19/02/2024",
      solicitante: "Mantenimiento Profesional SRL",
      departamento: "-",
      correo: "gerencia@mantenimientoprofesional.com",
      asignacion: "María González",
      comentarios: [
        "19/02/2024 - Sistema: Solicitud creada",
        "19/02/2024 - Mantenimiento Profesional: Adjunta documentación complementaria",
      ],
      firmantes: [],
    },
    {
      id: 11,
      numero: "SOL-2024-6011",
      tipo: "Consulta",
      tipoSolicitante: "Cliente",
      asunto: "Consulta sobre horarios de atención",
      descripcion:
        "Consultamos sobre los horarios de atención de mesa de entradas para presentación de documentación. Necesitamos coordinar entrega de mercadería.",
      fecha: "20/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "20/02/2024",
      solicitante: "Distribuidora del Este",
      departamento: "-",
      correo: "operaciones@distribuidoradeleste.com",
      asignacion: "María González",
      comentarios: [
        "20/02/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [],
    },
    {
      id: 12,
      numero: "SOL-2024-6012",
      tipo: "Tramite",
      tipoSolicitante: "Proveedor",
      asunto: "Ingreso de factura 2024-005 - Servicios de catering",
      descripcion:
        "Ingreso de factura por servicios de catering para evento corporativo del 15/02/2024. Monto: $65,000. Incluye almuerzo para 50 personas.",
      fecha: "20/02/2024",
      estado: "Resuelta",
      ultimaActualizacion: "20/02/2024",
      solicitante: "Catering Profesional SRL",
      departamento: "-",
      correo: "facturacion@cateringprofesional.com",
      asignacion: "María González",
      comentarios: [
        "20/02/2024 - Sistema: Solicitud creada",
        "20/02/2024 - Catering Profesional: Adjunta factura y lista de asistentes",
      ],
      firmantes: [],
    },
  ]

  // Separar solicitudes por tipo
  const solicitudesExternas = solicitudesRecibidas.filter((solicitud) => 
    solicitud.tipoSolicitante === "Proveedor" || 
    solicitud.tipoSolicitante === "Cliente" || 
    solicitud.tipoSolicitante === "Usuario Externo"
  )
  
  const solicitudesEmpleados = solicitudesRecibidas.filter((solicitud) => 
    solicitud.tipoSolicitante === "Empleado"
  )

  // Filtrar solicitudes pendientes por tipo
  const solicitudesExternasPendientes = solicitudesExternas.filter((solicitud) => solicitud.estado === "En proceso")
  const solicitudesEmpleadosPendientes = solicitudesEmpleados.filter((solicitud) => solicitud.estado === "En proceso")

  // Función para filtrar las solicitudes
  const filterSolicitudes = (solicitudes: SolicitudMesaEntradas[]) => {
    return solicitudes.filter((solicitud) => {
      const matchesNumero = numeroSolicitud === "" || solicitud.numero.includes(numeroSolicitud)
      const matchesSolicitante = tipoSolicitanteFilter === "Todos" || solicitud.tipoSolicitante === tipoSolicitanteFilter
      const matchesDepartamento = departamentoFilter === "Todos" || solicitud.departamento === departamentoFilter
      const matchesTipo = tipoFilter === "Todos" || solicitud.tipo === tipoFilter
      const matchesEstado = estadoFilter === "Todos" || solicitud.estado === estadoFilter
      const matchesSearch = searchTerm === "" || Object.values(solicitud).some((value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesNumero && matchesSolicitante && matchesDepartamento && matchesTipo && matchesEstado && matchesSearch
    })
  }

  const filteredSolicitudesExternas = filterSolicitudes(solicitudesExternas)
  const filteredSolicitudesEmpleados = filterSolicitudes(solicitudesEmpleados)

  const handleClearFilters = () => {
    setNumeroSolicitud("")
    setTipoSolicitanteFilter("Todos")
    setDepartamentoFilter("Todos")
    setTipoFilter("Todos")
    setEstadoFilter("Todos")
  }

  const handleOpenModal = (solicitud: SolicitudMesaEntradas) => {
    setSelectedSolicitud(solicitud)
    setIsModalOpen(true)
  }

  const handleOpenApproveModal = (solicitud?: SolicitudMesaEntradas) => {
    if (solicitud) {
      setSelectedSolicitud(solicitud)
    }
    setIsApproveModalOpen(true)
  }

  const handleOpenRejectModal = (solicitud?: SolicitudMesaEntradas) => {
    if (solicitud) {
      setSelectedSolicitud(solicitud)
    }
    setIsRejectModalOpen(true)
  }

  const handleOpenResponderModal = (solicitud?: SolicitudMesaEntradas) => {
    if (solicitud) {
      setSelectedSolicitud(solicitud)
    }
    setIsResponderModalOpen(true)
  }

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false)
    setSolicitudSeleccionadaChat(null)
  }

  const handleOpenChatModal = (solicitud: SolicitudMesaEntradas) => {
    setSolicitudSeleccionadaChat(solicitud)
    setIsChatModalOpen(true)
  }

  // Hook para manejar el chat
  const { mensajes, enviarMensaje } = useChat({
    chatId: solicitudSeleccionadaChat?.numero || '',
    usuarioActual: 'María González' // En producción vendría del contexto de usuario
  })

  const handleConfirmApprove = () => {
    setIsApproveModalOpen(false)
    setIsModalOpen(false)
    setObservacion("")
  }

  const handleConfirmReject = () => {
    setIsRejectModalOpen(false)
    setIsModalOpen(false)
    setObservacion("")
  }

  const handleConfirmResponder = () => {
    setIsResponderModalOpen(false)
    setIsModalOpen(false)
  }

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En proceso</Badge>
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
    "Prensa",
    "Recursos Humanos",
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
            <h1 className="text-2xl font-bold">Solicitudes Externas - Mesa de Entradas</h1>
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
                  placeholder="Ej: SOL-2024-2001"
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
                    <SelectItem value="En proceso">En proceso</SelectItem>
                    <SelectItem value="Resuelta">Resuelta</SelectItem>
                    <SelectItem value="Rechazada">Rechazada</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
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
                    <SelectItem value="Tramite">Tramite</SelectItem>
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
                                <Link href={`/empleado-mesa-entradas/gestion/mi-buzon/solicitudes/externas/${solicitud.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalle
                                </Link>
                              </DropdownMenuItem>
                              {solicitud.estado !== "Resuelta" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleOpenChatModal(solicitud)}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Resolver
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleOpenRejectModal(solicitud)}>
                                    <X className="mr-2 h-4 w-4" />
                                    Rechazar
                                  </DropdownMenuItem>
                                </>
                              )}
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
            <h1 className="text-2xl font-bold">Solicitudes de Empleados - Mesa de Entradas</h1>
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
                  placeholder="Ej: SOL-2024-2001"
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
                    <SelectItem value="Resuelta">Resuelta</SelectItem>
                    <SelectItem value="Rechazada">Rechazada</SelectItem>
                    <SelectItem value="Cancelada">Cancelada</SelectItem>
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
                    <SelectItem value="Gerencia General">Gerencia General</SelectItem>
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
                    <SelectItem value="Reclamo">Reclamo</SelectItem>
                    <SelectItem value="Consulta">Consulta</SelectItem>
                    <SelectItem value="Tramite">Tramite</SelectItem>
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
                                <Link href={`/empleado-mesa-entradas/gestion/mi-buzon/solicitudes/empleados/${solicitud.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Ver detalle
                                </Link>
                              </DropdownMenuItem>
                              {solicitud.estado !== "Resuelta" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleOpenChatModal(solicitud)}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Resolver
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleOpenRejectModal(solicitud)}>
                                    <X className="mr-2 h-4 w-4" />
                                    Rechazar
                                  </DropdownMenuItem>
                                </>
                              )}
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
                      <td colSpan={8} className="px-4 py-4 text-sm text-center text-gray-500 italic">
                        No hay solicitudes pendientes de aprobación
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

      {/* Modal de Detalles de Solicitud */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalle de Solicitud</DialogTitle>
            <DialogDescription>
              {selectedSolicitud?.numero} - {selectedSolicitud?.asunto}
            </DialogDescription>
          </DialogHeader>
          {selectedSolicitud && (
            <div className="space-y-6 overflow-y-auto pr-2 flex-grow">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Tipo de solicitud:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.tipo}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Fecha:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.fecha}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Solicitante:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.solicitante}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Correo:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.correo}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Departamento:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.departamento || '-'}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Asignación:</span>
                  </div>
                  <p className="text-sm">
                    {selectedSolicitud.asignacion
                      ? selectedSolicitud.asignacion
                      : <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Última Actualización:</span>
                  </div>
                  <p className="text-sm">{selectedSolicitud.ultimaActualizacion}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Estado:</span>
                  </div>
                  <div>{renderEstadoBadge(selectedSolicitud.estado)}</div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-md font-medium">Descripción</h3>
                <p className="text-sm bg-gray-50 p-3 rounded-md">{selectedSolicitud.descripcion}</p>
              </div>
              {selectedSolicitud.adjuntos && selectedSolicitud.adjuntos.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-md font-medium">Adjuntos</h3>
                    <ul className="list-disc pl-5">
                      {selectedSolicitud.adjuntos.map((adj, idx) => (
                        <li key={idx} className="text-sm text-blue-700 underline cursor-pointer">{adj}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              <Separator />
              <div className="space-y-2">
                <h3 className="text-md font-medium">Historial de Comentarios</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedSolicitud.comentarios?.map((comentario, index) => (
                    <div key={index} className="text-sm bg-gray-50 p-2 rounded-md">
                      {comentario}
                    </div>
                  ))}
                </div>
              </div>
              {/* Mostrar firmantes solo si es Empleado y hay firmantes */}
              {selectedSolicitud.tipoSolicitante === "Empleado" && selectedSolicitud.firmantes && selectedSolicitud.firmantes.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-md font-medium">Firmantes</h3>
                    <table className="w-full text-sm border">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-2 py-1 text-left">Firmante</th>
                          <th className="px-2 py-1 text-left">Cargo</th>
                          <th className="px-2 py-1 text-left">Estado</th>
                          <th className="px-2 py-1 text-left">Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedSolicitud.firmantes.map((f) => (
                          <tr key={f.id} className={f.esActual ? "bg-blue-50" : ""}>
                            <td className="px-2 py-1">
                              {f.nombre} {f.esActual && <Badge className="ml-1 bg-blue-200 text-blue-800">Actual</Badge>}
                            </td>
                            <td className="px-2 py-1">{f.cargo}</td>
                            <td className="px-2 py-1">
                              {f.estado === "Pendiente" && <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>}
                              {f.estado === "Firmado" && <Badge className="bg-green-100 text-green-800">Firmado</Badge>}
                              {f.estado === "Rechazado" && <Badge className="bg-red-100 text-red-800">Rechazado</Badge>}
                              {f.estado === "En espera" && <Badge className="bg-gray-100 text-gray-800">En espera</Badge>}
                            </td>
                            <td className="px-2 py-1">{f.fechaFirma || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter className="flex justify-end space-x-2 mt-4 pt-2 border-t">
            {/* Acciones según estado */}
            {selectedSolicitud && selectedSolicitud.estado !== "Resuelta" && (
              <>
                <Button
                  variant="outline"
                  className="bg-green-600 text-white hover:bg-green-700"
                  onClick={() => handleOpenApproveModal()}
                >
                  <Check className="mr-2 h-4 w-4" /> Resolver
                </Button>
                <Button
                  variant="outline"
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => handleOpenRejectModal()}
                >
                  <X className="mr-2 h-4 w-4" /> Rechazar
                </Button>
              </>
            )}
            <Button
              variant="outline"
              className="bg-blue-400 text-white hover:bg-blue-500"
              onClick={handleOpenRedirigirModal}
            >
              <CornerDownRight className="mr-2 h-4 w-4" />
              Redirigir
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación de Resolución */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirmar Resolución</DialogTitle>
            <DialogDescription>¿Está seguro que desea resolver esta solicitud?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Se enviará una notificación por correo electrónico al solicitante informando la resolución.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="observacion-aprobacion" className="block text-sm font-medium text-gray-700">
                Observaciones (opcional)
              </label>
              <textarea
                id="observacion-aprobacion"
                rows={3}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                placeholder="Agregue observaciones o comentarios adicionales..."
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleConfirmApprove}>
              Confirmar Resolución
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación de Rechazo */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirmar Rechazo</DialogTitle>
            <DialogDescription>¿Está seguro que desea rechazar esta solicitud?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Se enviará una notificación por correo electrónico al solicitante informando el rechazo.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="motivo-rechazo" className="block text-sm font-medium text-gray-700">
                Motivo del rechazo <span className="text-red-500">*</span>
              </label>
              <textarea
                id="motivo-rechazo"
                rows={3}
                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                placeholder="Explique el motivo del rechazo..."
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Este campo es obligatorio para el rechazo de solicitudes.</p>
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-2 mt-4">
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
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Responder Solicitud */}
      <Dialog open={isResponderModalOpen} onOpenChange={setIsResponderModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Responder Solicitud</DialogTitle>
            <DialogDescription>
              {selectedSolicitud?.numero} - {selectedSolicitud?.asunto}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <textarea
              rows={4}
              className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              placeholder="Escriba su respuesta aquí..."
            />
          </div>
          <DialogFooter className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsResponderModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleConfirmResponder}>
              Enviar Respuesta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Redirigir */}
      <Dialog open={isRedirigirModalOpen} onOpenChange={setIsRedirigirModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Redirigir Solicitud</DialogTitle>
          </DialogHeader>
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
          <DialogFooter className="flex justify-end space-x-2 mt-4">
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
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Chat */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={handleCloseChatModal}
        titulo={solicitudSeleccionadaChat?.numero || ''}
        subtitulo={solicitudSeleccionadaChat?.asunto}
        mensajes={mensajes}
        onEnviarMensaje={enviarMensaje}
        usuarioActual="María González"
      />
    </div>
  )
}
