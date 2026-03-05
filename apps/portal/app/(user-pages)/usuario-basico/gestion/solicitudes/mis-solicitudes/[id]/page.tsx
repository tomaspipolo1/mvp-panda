"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, FileText, Clock, User, Building, Calendar, Printer, Download, Eye, X } from "lucide-react"
import { ChatModal } from "@/components/ui/chat-modal"
import { useChat } from "@/hooks/use-chat"
import { HistorialAcciones, type ActionEvent } from "@/components/visitas/historial-acciones"

type SolicitudUsuarioBasico = {
  id: number | string
  fecha: string
  numero: string
  solicitante: string
  empresa: string
  tipo: string
  clase: string
  asunto: string
  estado: "Pendiente" | "En Proceso" | "Resuelta" | "Rechazada"
  ultimaActualizacion: string
  descripcion?: string
  comentarios?: string[]
  correo?: string
  adjuntos?: string[]
}

type ArchivoAdjunto = {
  nombre: string
  archivo: string
}

const stageConfigs: Record<"resolved" | "rejected" | "cancelled", { type: ActionEvent["type"]; message: string }> = {
  resolved: { type: "approved", message: "Solicitud resuelta" },
  rejected: { type: "rejected", message: "Solicitud rechazada" },
  cancelled: { type: "info", message: "Solicitud cancelada" },
}

export const solicitudesUsuarioBasico: SolicitudUsuarioBasico[] = [
  {
    id: "1",
    fecha: "15/04/2023",
    numero: "SOL-2023-0125",
    tipo: "Trámite",
    clase: "Cambio de datos personales",
    asunto: "Actualización de DNI",
    estado: "Pendiente",
    ultimaActualizacion: "15/04/2023",
    descripcion: "Solicito actualizar mi número de DNI debido a renovación del documento.",
    solicitante: "Juan Pérez",
    empresa: "Usuario Básico",
    correo: "juan.perez@email.com",
    adjuntos: ["dni_nuevo.pdf"],
  },
  {
    id: "2",
    fecha: "10/04/2023",
    numero: "SOL-2023-0124",
    tipo: "Consulta",
    clase: "Acceso",
    asunto: "Acceso a área restringida",
    estado: "En Proceso",
    ultimaActualizacion: "12/04/2023",
    descripcion: "Necesito acceso al área de documentación para revisar mi expediente.",
    solicitante: "Juan Pérez",
    empresa: "Usuario Básico",
    correo: "juan.perez@email.com",
    adjuntos: ["solicitud-acceso.pdf"],
  },
  {
    id: "3",
    fecha: "05/04/2023",
    numero: "SOL-2023-0123",
    tipo: "Reclamo",
    clase: "Servicios",
    asunto: "Demora en atención",
    estado: "Resuelta",
    ultimaActualizacion: "08/04/2023",
    descripcion: "El tiempo de espera para ser atendido fue excesivo.",
    solicitante: "Juan Pérez",
    empresa: "Usuario Básico",
    correo: "juan.perez@email.com",
    adjuntos: ["detalle-reclamo.pdf"],
  },
  {
    id: "4",
    fecha: "28/03/2023",
    numero: "SOL-2023-0122",
    tipo: "Consulta",
    clase: "Comercial",
    asunto: "Información sobre tarifas",
    estado: "Rechazada",
    ultimaActualizacion: "30/03/2023",
    descripcion: "Solicito información detallada sobre las tarifas de servicios.",
    solicitante: "Juan Pérez",
    empresa: "Usuario Básico",
    correo: "juan.perez@email.com",
    adjuntos: ["consulta-tarifas.pdf"],
  },
]

const buildHistorialEventos = (solicitud: SolicitudUsuarioBasico): ActionEvent[] => {
  const detalleCreacion = [solicitud.empresa, solicitud.solicitante].filter(Boolean).join(" - ") || undefined
  const normalizedEstado = solicitud.estado.toLowerCase()

  const eventos: ActionEvent[] = [
    {
      id: "evt-1",
      timestamp: "2024-01-05T09:00:00",
      type: "created",
      message: "Solicitud creada",
      actor: solicitud.solicitante,
      detail: detalleCreacion,
    },
    {
      id: "evt-2",
      timestamp: "2024-01-05T10:30:00",
      type: "progress",
      message: "Solicitud en proceso",
      showActor: false,
    },
  ]

  const addStage = (config: { type: ActionEvent["type"]; message: string }) => {
    eventos.push({
      id: `evt-${eventos.length + 1}`,
      timestamp: `2024-01-05T${(8 + eventos.length).toString().padStart(2, "0")}:00:00`,
      ...config,
      showActor: false,
    })
  }

  if (normalizedEstado === "pendiente" || normalizedEstado === "en proceso") {
    return eventos
  }

  if (normalizedEstado === "resuelta") {
    addStage(stageConfigs.resolved)
    return eventos
  }

  if (normalizedEstado === "rechazada") {
    addStage(stageConfigs.rejected)
    return eventos
  }

  if (normalizedEstado === "cancelada") {
    addStage(stageConfigs.cancelled)
    return eventos
  }

  addStage({ type: "info", message: `Solicitud ${solicitud.estado}` })
  return eventos
}

export default function DetalleSolicitudUsuarioBasicoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [isCancelarModalOpen, setIsCancelarModalOpen] = useState(false)
  const [motivoCancelacion, setMotivoCancelacion] = useState("")

  const solicitud =
    solicitudesUsuarioBasico.find((sol) => sol.id.toString() === resolvedParams.id) || solicitudesUsuarioBasico[0]

  const { mensajes, enviarMensaje } = useChat({
    chatId: solicitud.numero,
    usuarioActual: solicitud.solicitante,
  })

  const archivos: ArchivoAdjunto[] =
    solicitud.adjuntos?.map((archivo) => ({
      nombre: archivo.replace(".pdf", "").replace(/-/g, " "),
      archivo,
    })) || []

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En Proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En proceso</Badge>
      case "Resuelta":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resuelta</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const handleVerDocumento = (nombre: string, archivo: string) => {
    alert(`Ver documento: ${nombre} (${archivo})`)
  }

  const handleConfirmCancelar = () => {
    alert(`Solicitud ${solicitud.numero} cancelada`)
    setIsCancelarModalOpen(false)
    setMotivoCancelacion("")
    router.push("/usuario-basico/gestion/solicitudes/mis-solicitudes")
  }

  const historialEventos = buildHistorialEventos(solicitud)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/usuario-basico/gestion/solicitudes/mis-solicitudes">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Solicitud</h1>
            <p className="text-gray-600">
              {solicitud.numero} - {solicitud.asunto}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
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
                  <span className="text-sm font-medium text-gray-500">Fecha:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.fecha}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Estado:</span>
                </div>
                <div>{renderEstadoBadge(solicitud.estado)}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Tipo:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.tipo}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Descripción</h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md">{solicitud.descripcion}</p>
          </div>

          {archivos.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Documentación</h2>
              <div className="space-y-3">
                {archivos.map((archivo, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                    <div className="flex items-center flex-1">
                      <FileText className="h-4 w-4 text-blue-600 mr-3" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">{archivo.nombre}</div>
                        <div className="text-xs text-gray-500 mt-1">Adjunto</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleVerDocumento(archivo.nombre, archivo.archivo)}>
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

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Acciones</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => setIsChatModalOpen(true)}>
                <Mail className="mr-2 h-4 w-4" /> Mensajes
              </Button>
              <Button
                variant="outline"
                className="w-full bg-red-600 text-white hover:bg-red-700"
                onClick={() => setIsCancelarModalOpen(true)}
                disabled={solicitud.estado === "Resuelta" || solicitud.estado === "Rechazada"}
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar Solicitud
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Datos del solicitante</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Nombre</span>
                <p className="text-sm font-medium">{solicitud.solicitante}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Empresa</span>
                <p className="text-sm font-medium">{solicitud.empresa}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Correo</span>
                <p className="text-sm font-medium">{solicitud.correo}</p>
              </div>
            </div>
          </div>

          <HistorialAcciones
            className="bg-white rounded-lg border border-gray-200 p-6"
            events={historialEventos}
            variant="external"
            title="Historial de la solicitud"
          />
        </div>
      </div>

      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        titulo={solicitud.numero}
        subtitulo={solicitud.asunto}
        mensajes={mensajes}
        onEnviarMensaje={enviarMensaje}
        usuarioActual={solicitud.solicitante}
      />

      {isCancelarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Cancelar Solicitud</h3>
            <p className="text-gray-600 mb-4">¿Está seguro que desea cancelar esta solicitud?</p>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">Esta acción no se puede deshacer.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo de cancelación <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  placeholder="Explique el motivo de la cancelación..."
                  value={motivoCancelacion}
                  onChange={(e) => setMotivoCancelacion(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCancelarModalOpen(false)
                  setMotivoCancelacion("")
                }}
              >
                Cerrar
              </Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleConfirmCancelar} disabled={!motivoCancelacion.trim()}>
                Confirmar Cancelación
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


