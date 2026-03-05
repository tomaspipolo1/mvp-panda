"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, FileText, Clock, User, Building, Calendar, Printer, Download, Eye, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChatModal } from "@/components/ui/chat-modal"
import { useChat } from "@/hooks/use-chat"
import { HistorialAcciones, type ActionEvent } from "@/components/visitas/historial-acciones"

// Tipos para las solicitudes de proveedores
type SolicitudProveedor = {
  id: number
  fecha: string
  numero: string
  solicitante: string
  tipoSolicitante: string
  empresa: string
  tipo: string
  asunto: string
  estado: string
  ultimaActualizacion: string
  descripcion?: string
  comentarios?: string[]
  correo?: string
  adjuntos?: string[]
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

const stageConfigs: Record<"resolved" | "rejected" | "cancelled", { type: ActionEvent["type"]; message: string }> = {
  resolved: { type: "approved", message: "Solicitud resuelta" },
  rejected: { type: "rejected", message: "Solicitud rechazada" },
  cancelled: { type: "info", message: "Solicitud cancelada" },
}

const buildHistorialEventos = (solicitud: SolicitudProveedor): ActionEvent[] => {
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

  if (normalizedEstado === "en proceso") {
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

export default function DetalleSolicitudProveedorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [isCancelarModalOpen, setIsCancelarModalOpen] = useState(false)
  const [motivoCancelacion, setMotivoCancelacion] = useState("")

  // Datos de ejemplo para solicitudes de proveedores
  const solicitudesProveedores: SolicitudProveedor[] = [
    {
      id: 1,
      numero: "SOL-2023-0125",
      tipo: "Trámite",
      tipoSolicitante: "Proveedor",
      asunto: "Actualización de información bancaria",
      descripcion: "Solicito actualizar la información bancaria de mi cuenta para recibir los pagos en una nueva cuenta del Banco Provincia.",
      fecha: "15/04/2023",
      estado: "En proceso",
      ultimaActualizacion: "15/04/2023",
      solicitante: "Mariano Hernández",
      empresa: "Transportes Hernández S.A.",
      correo: "mariano.hernandez@transportes.com",
      comentarios: [
        "15/04/2023 - Sistema: Solicitud creada",
      ],
      adjuntos: [
        "certificado-bancario.pdf",
        "cbu-actualizado.pdf"
      ]
    },
    {
      id: 2,
      numero: "SOL-2023-0124",
      tipo: "Trámite",
      tipoSolicitante: "Proveedor",
      asunto: "Solicitud de certificado de cumplimiento",
      descripcion: "Solicito certificado de cumplimiento de servicios prestados durante el año 2023 para presentar en una licitación externa.",
      fecha: "10/04/2023",
      estado: "En proceso",
      ultimaActualizacion: "12/04/2023",
      solicitante: "Mariano Hernández",
      empresa: "Transportes Hernández S.A.",
      correo: "mariano.hernandez@transportes.com",
      comentarios: [
        "10/04/2023 - Sistema: Solicitud creada",
        "12/04/2023 - Administrador: Se está procesando su solicitud. El certificado estará disponible en 48 horas hábiles.",
      ],
      adjuntos: [
        "solicitud-certificado.pdf",
        "documentacion-respaldo.pdf"
      ]
    },
    {
      id: 3,
      numero: "SOL-2023-0123",
      tipo: "Reclamo",
      tipoSolicitante: "Proveedor",
      asunto: "Facturación incorrecta",
      descripcion: "La factura N° FC-2023-0089 contiene un error en el monto total. El valor correcto debería ser $45,780.00 en lugar de $54,780.00.",
      fecha: "05/04/2023",
      estado: "Resuelta",
      ultimaActualizacion: "08/04/2023",
      solicitante: "Mariano Hernández",
      empresa: "Transportes Hernández S.A.",
      correo: "mariano.hernandez@transportes.com",
      comentarios: [
        "05/04/2023 - Sistema: Solicitud creada",
        "06/04/2023 - Administrador: Estamos revisando la factura mencionada. Nos comunicaremos a la brevedad.",
        "08/04/2023 - Administrador: Se ha emitido una nota de crédito por la diferencia. La encontrará disponible en la sección de facturas.",
      ],
      adjuntos: [
        "factura-original.pdf",
        "comprobante-error.pdf"
      ]
    },
    {
      id: 4,
      numero: "SOL-2023-0122",
      tipo: "Consulta",
      tipoSolicitante: "Proveedor",
      asunto: "Información sobre licitación",
      descripcion: "Quisiera obtener más información sobre la licitación LIC-2023-0118 respecto a los requisitos técnicos específicos para la presentación.",
      fecha: "28/03/2023",
      estado: "Rechazada",
      ultimaActualizacion: "30/03/2023",
      solicitante: "Mariano Hernández",
      empresa: "Transportes Hernández S.A.",
      correo: "mariano.hernandez@transportes.com",
      comentarios: [
        "28/03/2023 - Sistema: Solicitud creada",
        "30/03/2023 - Administrador: Esta consulta debe realizarse a través del sistema de consultas específico de la licitación. Por favor, utilice la opción 'Ver consultas' en la sección de licitaciones.",
      ],
      adjuntos: [
        "consulta-tecnica.pdf"
      ]
    },
    {
      id: 5,
      numero: "SOL-2023-0121",
      tipo: "Trámite",
      tipoSolicitante: "Proveedor",
      asunto: "Actualización de domicilio fiscal",
      descripcion: "Solicito actualizar el domicilio fiscal de la empresa debido a una mudanza de oficinas.",
      fecha: "20/03/2023",
      estado: "Cancelada",
      ultimaActualizacion: "21/03/2023",
      solicitante: "Mariano Hernández",
      empresa: "Transportes Hernández S.A.",
      correo: "mariano.hernandez@transportes.com",
      comentarios: [
        "20/03/2023 - Sistema: Solicitud creada",
        "21/03/2023 - Mariano Hernández: Solicitud cancelada por el usuario",
      ],
      adjuntos: [
        "constancia-domicilio.pdf"
      ]
    }
  ]

  // Buscar la solicitud según el ID
  const solicitud = solicitudesProveedores.find(s => s.id === parseInt(resolvedParams.id)) || solicitudesProveedores[0]

  // Hook para manejar el chat
  const { mensajes, enviarMensaje } = useChat({
    chatId: solicitud.numero,
    usuarioActual: 'Mariano Hernández' // En producción vendría del contexto de usuario
  })

  // Función para obtener archivos directamente de la solicitud
  const archivos: ArchivoAdjunto[] = solicitud.adjuntos?.map((archivo) => {
    // Mapear el nombre del archivo a un nombre más descriptivo
    const nombreMap: { [key: string]: string } = {
      "certificado-bancario.pdf": "Certificado Bancario",
      "cbu-actualizado.pdf": "CBU Actualizado",
      "solicitud-certificado.pdf": "Solicitud de Certificado",
      "documentacion-respaldo.pdf": "Documentación de Respaldo",
      "factura-original.pdf": "Factura Original",
      "comprobante-error.pdf": "Comprobante de Error",
      "consulta-tecnica.pdf": "Consulta Técnica",
      "constancia-domicilio.pdf": "Constancia de Domicilio"
    }
    return {
      nombre: nombreMap[archivo] || archivo,
      archivo: archivo
    }
  }) || []

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "En Proceso":
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

  const handleVerDocumento = (nombre: string, archivo: string) => {
    alert(`Ver documento: ${nombre} (${archivo})`);
  };

  const handleConfirmCancelar = () => {
    console.log(`Solicitud ${solicitud.numero} cancelada. Motivo:`, motivoCancelacion)
    alert(`Solicitud ${solicitud.numero} cancelada`)
    setIsCancelarModalOpen(false)
    setMotivoCancelacion("")
    router.push("/proveedor/gestion/solicitudes/mis-solicitudes")
  };

  const historialEventos = buildHistorialEventos(solicitud)

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/proveedor/gestion/solicitudes/mis-solicitudes">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Solicitud</h1>
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
                  variant="outline"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={() => setIsChatModalOpen(true)}
                >
                  <Mail className="mr-2 h-4 w-4" /> Mensajes
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-red-600 text-white hover:bg-red-700"
                  onClick={() => setIsCancelarModalOpen(true)}
                  disabled={solicitud.estado === "Resuelta" || solicitud.estado === "Rechazada" || solicitud.estado === "Cancelada"}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancelar Solicitud
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
                  <span className="text-sm font-medium text-gray-500">Empresa:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.empresa}</p>
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

          <HistorialAcciones
            className="bg-white rounded-lg border border-gray-200 p-6"
            events={historialEventos}
            variant="external"
            title="Historial de la solicitud"
          />
        </div>
      </div>

      {/* Modal de Chat */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        titulo={solicitud.numero}
        subtitulo={solicitud.asunto}
        mensajes={mensajes}
        onEnviarMensaje={enviarMensaje}
        usuarioActual="Mariano Hernández"
      />

      {/* Modal de Cancelar Solicitud */}
      {isCancelarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Cancelar Solicitud</h3>
            <p className="text-gray-600 mb-4">¿Está seguro que desea cancelar esta solicitud?</p>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">
                  Esta acción no se puede deshacer. La solicitud quedará marcada como cancelada.
                </p>
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
                <p className="text-xs text-gray-500 mt-1">Este campo es obligatorio.</p>
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
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleConfirmCancelar}
                disabled={!motivoCancelacion.trim()}
              >
                Confirmar Cancelación
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

