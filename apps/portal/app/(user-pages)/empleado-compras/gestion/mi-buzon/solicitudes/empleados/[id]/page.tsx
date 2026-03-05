"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Check, X, Mail, CornerDownRight, Trash, FileText, Clock, User, Building, Calendar, Printer, Download, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChatModal } from "@/components/ui/chat-modal"
import { useChat } from "@/hooks/use-chat"

// Tipos para las solicitudes de empleados
type SolicitudEmpleado = {
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
  // Campos específicos para empleados
  fechaInicio?: string
  fechaFin?: string
  diasHabiles?: number
  periodo?: string[]
  montoSolicitado?: string
  fechaAcreditacion?: string
  tipoDocumento?: string
  tipoDato?: string
  firmantes?: Array<{
    id: number
    nombre: string
    cargo: string
    estado: "Pendiente" | "Firmado" | "Rechazado" | "En espera"
    fechaFirma?: string
    observaciones?: string
    esActual: boolean
  }>
}

// Tipo para los archivos adjuntos
type ArchivoAdjunto = {
  nombre: string
  archivo: string
  requerido?: boolean
  categoria?: string
  fechaEmision?: string
  fechaVencimiento?: string
}

export default function DetalleSolicitudEmpleadoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [observacion, setObservacion] = useState("")
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [isRedirigirModalOpen, setIsRedirigirModalOpen] = useState(false)
  const [redirigirTipo, setRedirigirTipo] = useState("Empleado")
  const [redirigirBusqueda, setRedirigirBusqueda] = useState("")
  const [redirigirSeleccion, setRedirigirSeleccion] = useState<string | null>(null)

  // Datos de ejemplo para solicitudes de empleados
  const solicitudesEmpleados: SolicitudEmpleado[] = [
    {
      id: 6,
      numero: "SOL-2024-3006",
      tipo: "Licencia ordinaria anual",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de vacaciones",
      descripcion: "Solicito autorización para tomar vacaciones del 20/03/2024 al 02/04/2024.",
      fecha: "15/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "15/02/2024",
      solicitante: "María González",
      departamento: "Compras",
      correo: "maria.gonzalez@empresa.com",
      asignacion: "Laura Pérez",
      fechaInicio: "20/03/2024",
      fechaFin: "02/04/2024",
      diasHabiles: 10,
      periodo: ["2024"],
      comentarios: [
        "15/02/2024 - Sistema: Solicitud creada",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Laura Pérez",
          cargo: "Jefa de Compras",
          estado: "Pendiente",
          esActual: true,
        },
      ],
      adjuntos: [
        "solicitud-vacaciones.pdf",
        "calendario-laboral.pdf"
      ]
    },
    {
      id: 7,
      numero: "SOL-2024-3007",
      tipo: "Licencia medica",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de licencia médica",
      descripcion: "Solicito licencia médica por tratamiento médico programado.",
      fecha: "16/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "18/02/2024",
      solicitante: "Juan Pérez",
      departamento: "Compras",
      correo: "juan.perez@empresa.com",
      asignacion: "Carlos López",
      fechaInicio: "25/02/2024",
      fechaFin: "28/02/2024",
      diasHabiles: 4,
      comentarios: [
        "16/02/2024 - Sistema: Solicitud creada",
        "18/02/2024 - Carlos López: En revisión",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Carlos López",
          cargo: "Supervisor de Compras",
          estado: "En espera",
          esActual: true,
        },
      ],
      adjuntos: [
        "certificado-medico.pdf",
        "solicitud-licencia.pdf"
      ]
    },
    {
      id: 8,
      numero: "SOL-2024-3008",
      tipo: "Solicitud de prestamo",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de préstamo personal",
      descripcion: "Solicito préstamo personal por motivos familiares urgentes.",
      fecha: "17/02/2024",
      estado: "Aprobada",
      ultimaActualizacion: "20/02/2024",
      solicitante: "Ana Martínez",
      departamento: "Compras",
      correo: "ana.martinez@empresa.com",
      asignacion: "Roberto Silva",
      montoSolicitado: "$500,000",
      fechaAcreditacion: "25/02/2024",
      comentarios: [
        "17/02/2024 - Sistema: Solicitud creada",
        "20/02/2024 - Roberto Silva: Aprobada",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Roberto Silva",
          cargo: "Gerente de Compras",
          estado: "Firmado",
          fechaFirma: "20/02/2024",
          esActual: false,
        },
      ],
      adjuntos: [
        "solicitud-prestamo.pdf",
        "documentacion-respaldo.pdf"
      ]
    },
    {
      id: 9,
      numero: "SOL-2024-3009",
      tipo: "Dia de tramite",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de día de trámite",
      descripcion: "Solicito día de trámite para realizar gestiones bancarias personales.",
      fecha: "18/02/2024",
      estado: "Aprobada",
      ultimaActualizacion: "19/02/2024",
      solicitante: "Carlos Rodríguez",
      departamento: "Compras",
      correo: "carlos.rodriguez@empresa.com",
      asignacion: "Laura Pérez",
      fechaInicio: "25/02/2024",
      fechaFin: "25/02/2024",
      diasHabiles: 1,
      comentarios: [
        "18/02/2024 - Sistema: Solicitud creada",
        "19/02/2024 - Laura Pérez: Aprobada",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Laura Pérez",
          cargo: "Jefa de Compras",
          estado: "Firmado",
          fechaFirma: "19/02/2024",
          esActual: false,
        },
      ],
      adjuntos: [
        "solicitud-dia-tramite.pdf",
        "documentacion-respaldo.pdf"
      ]
    },
    {
      id: 10,
      numero: "SOL-2024-3010",
      tipo: "Documentación",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de certificado laboral",
      descripcion: "Solicito certificado laboral para trámites de crédito hipotecario.",
      fecha: "19/02/2024",
      estado: "Aprobada",
      ultimaActualizacion: "20/02/2024",
      solicitante: "Patricia López",
      departamento: "Compras",
      correo: "patricia.lopez@empresa.com",
      asignacion: "Roberto Silva",
      tipoDocumento: "Certificado laboral",
      comentarios: [
        "19/02/2024 - Sistema: Solicitud creada",
        "20/02/2024 - Roberto Silva: Aprobada",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Roberto Silva",
          cargo: "Gerente de Compras",
          estado: "Firmado",
          fechaFirma: "20/02/2024",
          esActual: false,
        },
      ],
      adjuntos: [
        "solicitud-documentacion.pdf"
      ]
    },
    {
      id: 11,
      numero: "SOL-2024-3011",
      tipo: "Cambio de datos",
      tipoSolicitante: "Empleado",
      asunto: "Actualización de datos personales",
      descripcion: "Solicito actualización de mi dirección y teléfono en el sistema de RRHH.",
      fecha: "20/02/2024",
      estado: "Rechazada",
      ultimaActualizacion: "21/02/2024",
      solicitante: "Diego Fernández",
      departamento: "Compras",
      correo: "diego.fernandez@empresa.com",
      asignacion: "Carlos López",
      tipoDato: "Datos personales",
      comentarios: [
        "20/02/2024 - Sistema: Solicitud creada",
        "21/02/2024 - Carlos López: Rechazada - Documentación incompleta",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Carlos López",
          cargo: "Supervisor de Compras",
          estado: "Rechazado",
          fechaFirma: "21/02/2024",
          esActual: false,
        },
      ],
      adjuntos: [
        "solicitud-cambio-datos.pdf",
        "documentacion-nueva.pdf"
      ]
    },
    {
      id: 12,
      numero: "SOL-2024-3012",
      tipo: "Licencia ordinaria anual",
      tipoSolicitante: "Empleado",
      asunto: "Solicitud de vacaciones de invierno",
      descripcion: "Solicito vacaciones de invierno del 15/07/2024 al 29/07/2024.",
      fecha: "21/02/2024",
      estado: "Cancelada",
      ultimaActualizacion: "22/02/2024",
      solicitante: "Sofía Ramírez",
      departamento: "Compras",
      correo: "sofia.ramirez@empresa.com",
      asignacion: "Laura Pérez",
      fechaInicio: "15/07/2024",
      fechaFin: "29/07/2024",
      diasHabiles: 11,
      periodo: ["2024"],
      comentarios: [
        "21/02/2024 - Sistema: Solicitud creada",
        "22/02/2024 - Sofía Ramírez: Solicitud cancelada por el empleado",
      ],
      firmantes: [
        {
          id: 1,
          nombre: "Laura Pérez",
          cargo: "Jefa de Compras",
          estado: "En espera",
          esActual: false,
        },
      ],
      adjuntos: [
        "solicitud-vacaciones.pdf",
        "calendario-laboral.pdf"
      ]
    }
  ]

  // Buscar la solicitud según el ID
  const solicitud = solicitudesEmpleados.find(s => s.id === parseInt(resolvedParams.id)) || solicitudesEmpleados[0]

  // Hook para manejar el chat
  const { mensajes, enviarMensaje } = useChat({
    chatId: solicitud.numero,
    usuarioActual: 'Laura Pérez' // En producción vendría del contexto de usuario
  })

  // Función para obtener archivos según el tipo de solicitud
  const getArchivosPorTipo = (tipo: string): ArchivoAdjunto[] => {
    switch (tipo) {
      case "Licencia ordinaria anual":
        return [
          { nombre: "Solicitud de Vacaciones", archivo: "solicitud-vacaciones.pdf" },
          { nombre: "Calendario Laboral", archivo: "calendario-laboral.pdf" }
        ]
      case "Licencia medica":
        return [
          { nombre: "Certificado Médico", archivo: "certificado-medico.pdf" },
          { nombre: "Solicitud de Licencia", archivo: "solicitud-licencia.pdf" }
        ]
      case "Dia de tramite":
        return [
          { nombre: "Solicitud de Día de Trámite", archivo: "solicitud-dia-tramite.pdf" },
          { nombre: "Documentación de Respaldo", archivo: "documentacion-respaldo.pdf" }
        ]
      case "Solicitud de prestamo":
        return [
          { nombre: "Solicitud de Préstamo", archivo: "solicitud-prestamo.pdf" },
          { nombre: "Documentación de Respaldo", archivo: "documentacion-respaldo.pdf" }
        ]
      case "Documentación":
        return [
          { nombre: "Solicitud de Documentación", archivo: "solicitud-documentacion.pdf" }
        ]
      case "Cambio de datos":
        return [
          { nombre: "Solicitud de Cambio", archivo: "solicitud-cambio-datos.pdf" },
          { nombre: "Documentación Nueva", archivo: "documentacion-nueva.pdf" }
        ]
      default:
        return []
    }
  }

  const archivos = getArchivosPorTipo(solicitud.tipo)

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En proceso</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

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

  const handleVerDocumento = (nombre: string, archivo: string) => {
    alert(`Ver documento: ${nombre} (${archivo})`);
  };

  // Función para renderizar el contenedor de fechas específico según el tipo
  const renderContenedorFechas = () => {
    switch (solicitud.tipo) {
      case "Licencia ordinaria anual":
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Fechas</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Período:</span>
                <p className="text-sm font-medium">{solicitud.periodo?.join(", ") || "-"}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha inicio:</span>
                <p className="text-sm font-medium">{solicitud.fechaInicio || "-"}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha fin:</span>
                <p className="text-sm font-medium">{solicitud.fechaFin || "-"}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Días hábiles:</span>
                <p className="text-sm font-medium">{solicitud.diasHabiles || "-"}</p>
              </div>
            </div>
          </div>
        )
      case "Licencia medica":
      case "Dia de tramite":
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Fechas</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha inicio:</span>
                <p className="text-sm font-medium">{solicitud.fechaInicio || "-"}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha fin:</span>
                <p className="text-sm font-medium">{solicitud.fechaFin || "-"}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Días hábiles:</span>
                <p className="text-sm font-medium">{solicitud.diasHabiles || "-"}</p>
              </div>
            </div>
          </div>
        )
      case "Solicitud de prestamo":
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Detalles del Préstamo</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Monto solicitado:</span>
                <p className="text-sm font-medium">{solicitud.montoSolicitado || "-"}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha deseada de acreditación:</span>
                <p className="text-sm font-medium">{solicitud.fechaAcreditacion || "-"}</p>
              </div>
            </div>
          </div>
        )
      case "Documentación":
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Detalles de Documentación</h2>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Tipo de documento:</span>
              <p className="text-sm font-medium">{solicitud.tipoDocumento || "Certificado laboral"}</p>
            </div>
          </div>
        )
      case "Cambio de datos":
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Detalles del Cambio</h2>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Tipo de dato:</span>
              <p className="text-sm font-medium">{solicitud.tipoDato || "Datos personales"}</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/empleado-compras/gestion/mi-buzon/solicitudes">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Solicitud de Empleado</h1>
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

          {/* Contenedor de fechas específico según el tipo */}
          {renderContenedorFechas()}

          {/* Información general */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Información General</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Asunto:</span>
                <p className="text-sm font-medium">{solicitud.asunto}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Descripción:</span>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-md">{solicitud.descripcion}</p>
              </div>
            </div>
          </div>

          {/* Documentación */}
          {archivos && archivos.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Documentación</h2>
              <div className="space-y-3">
                {archivos.map((archivo, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                    <div className="flex items-center flex-1">
                      <FileText className="h-4 w-4 text-blue-600 mr-3" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">
                          {archivo.nombre}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Fecha de carga: {solicitud.fecha}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerDocumento(archivo.nombre, archivo.archivo)}
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
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Acciones</h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => setIsApproveModalOpen(true)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Aprobar
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-red-600 text-white hover:bg-red-700"
                  onClick={() => setIsRejectModalOpen(true)}
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

          {/* Firmantes */}
          {solicitud.firmantes && solicitud.firmantes.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Firmantes</h2>
              <div className="space-y-3">
                {solicitud.firmantes.map((firmante) => (
                  <div key={firmante.id} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{firmante.nombre}</div>
                        <div className="text-xs text-gray-500">{firmante.cargo}</div>
                      </div>
                      <div className="text-right">
                        {firmante.estado === "Pendiente" && <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>}
                        {firmante.estado === "Firmado" && <Badge className="bg-green-100 text-green-800">Firmado</Badge>}
                        {firmante.estado === "Rechazado" && <Badge className="bg-red-100 text-red-800">Rechazado</Badge>}
                        {firmante.estado === "En espera" && <Badge className="bg-gray-100 text-gray-800">En espera</Badge>}
                      </div>
                    </div>
                    {firmante.fechaFirma && (
                      <div className="text-xs text-gray-500">
                        Fecha: {firmante.fechaFirma}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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
        usuarioActual="Laura Pérez"
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
