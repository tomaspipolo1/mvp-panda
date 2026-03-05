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

// Tipos para las solicitudes
type Solicitud = {
  id: number
  fecha: string
  numero: string
  tipo: string
  estado: string
  ultimaActualizacion: string
  empleado: {
    nombre: string
    apellido: string
    legajo: string
  }
  descripcion: string
  aprobadores: Array<{
    nombre: string
    apellido: string
    firma: string
    fecha: string | null
  }>
  documentos: string[]
  // Campos específicos según tipo
  fechaInicio?: string
  fechaFin?: string
  diasHabiles?: number
  periodo?: string[]
  montoSolicitado?: string
  fechaAcreditacion?: string
  tipoDocumento?: string
  tipoDato?: string
}

// Tipo para los archivos adjuntos
type ArchivoAdjunto = {
  nombre: string
  archivo: string
}

export default function DetalleSolicitudMisSolicitudesPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [modalCancelarAbierto, setModalCancelarAbierto] = useState(false)
  const [motivoCancelacion, setMotivoCancelacion] = useState("")

  // Datos de ejemplo para las solicitudes (mismo array que en page.tsx)
  const solicitudes: Solicitud[] = [
    {
      id: 1,
      fecha: "15/04/2023",
      numero: "SOL-2023-0125",
      tipo: "Licencia Ordinaria Anual",
      estado: "En proceso",
      ultimaActualizacion: "15/04/2023",
      empleado: {
        nombre: "Juan Carlos",
        apellido: "Pérez",
        legajo: "EMP-001",
      },
      descripcion: "Solicitud de vacaciones anuales del 20 al 30 de abril para descanso familiar.",
      fechaInicio: "20/04/2023",
      fechaFin: "30/04/2023",
      diasHabiles: 8,
      periodo: ["2023"],
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "En proceso", fecha: null },
        { nombre: "Roberto", apellido: "Silva", firma: "En proceso", fecha: null },
        { nombre: "Ana", apellido: "Martínez", firma: "En proceso", fecha: null },
      ],
      documentos: ["Formulario_Vacaciones.pdf"],
    },
    {
      id: 2,
      fecha: "10/04/2023",
      numero: "SOL-2023-0124",
      tipo: "Licencia Médica",
      estado: "Aprobada",
      ultimaActualizacion: "12/04/2023",
      empleado: {
        nombre: "Ana María",
        apellido: "López",
        legajo: "EMP-002",
      },
      descripcion: "Solicitud de licencia médica por reposo indicado por médico tratante.",
      fechaInicio: "11/04/2023",
      fechaFin: "15/04/2023",
      diasHabiles: 5,
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Aprobado", fecha: "11/04/2023" },
        { nombre: "Roberto", apellido: "Silva", firma: "Aprobado", fecha: "12/04/2023" },
        { nombre: "Ana", apellido: "Martínez", firma: "Aprobado", fecha: "12/04/2023" },
      ],
      documentos: ["Certificado_Medico.pdf", "Formulario_Licencia.pdf"],
    },
    {
      id: 3,
      fecha: "05/04/2023",
      numero: "SOL-2023-0123",
      tipo: "Día de trámite",
      estado: "Rechazada",
      ultimaActualizacion: "08/04/2023",
      empleado: {
        nombre: "Carlos",
        apellido: "Rodríguez",
        legajo: "EMP-003",
      },
      descripcion: "Solicitud de día de trámite para gestiones personales bancarias.",
      fechaInicio: "10/04/2023",
      fechaFin: "10/04/2023",
      diasHabiles: 1,
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Aprobado", fecha: "06/04/2023" },
        { nombre: "Roberto", apellido: "Silva", firma: "Rechazado", fecha: "08/04/2023" },
        { nombre: "Ana", apellido: "Martínez", firma: "En proceso", fecha: null },
      ],
      documentos: [],
    },
    {
      id: 4,
      fecha: "28/03/2023",
      numero: "SOL-2023-0122",
      tipo: "Solicitud de Préstamo",
      estado: "En proceso",
      ultimaActualizacion: "30/03/2023",
      empleado: {
        nombre: "Laura",
        apellido: "Fernández",
        legajo: "EMP-004",
      },
      descripcion: "Solicitud de préstamo personal para gastos médicos familiares.",
      montoSolicitado: "$500,000",
      fechaAcreditacion: "05/04/2023",
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Aprobado", fecha: "29/03/2023" },
        { nombre: "Roberto", apellido: "Silva", firma: "En proceso", fecha: null },
        { nombre: "Ana", apellido: "Martínez", firma: "En proceso", fecha: null },
      ],
      documentos: ["Solicitud_Prestamo.pdf", "Comprobantes_Gastos.pdf"],
    },
    {
      id: 5,
      fecha: "20/03/2023",
      numero: "SOL-2023-0121",
      tipo: "Solicitud de Recibos de Sueldo",
      estado: "Aprobada",
      ultimaActualizacion: "22/03/2023",
      empleado: {
        nombre: "Miguel",
        apellido: "Torres",
        legajo: "EMP-005",
      },
      descripcion: "Solicitud de recibos de sueldo de enero a marzo para trámite hipotecario.",
      tipoDocumento: "Recibos de Sueldo",
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Aprobado", fecha: "21/03/2023" },
        { nombre: "Roberto", apellido: "Silva", firma: "Aprobado", fecha: "22/03/2023" },
        { nombre: "Ana", apellido: "Martínez", firma: "Aprobado", fecha: "22/03/2023" },
      ],
      documentos: [],
    },
    {
      id: 6,
      fecha: "15/03/2023",
      numero: "SOL-2023-0120",
      tipo: "Otra solicitud",
      estado: "Rechazada",
      ultimaActualizacion: "18/03/2023",
      empleado: {
        nombre: "Patricia",
        apellido: "Morales",
        legajo: "EMP-006",
      },
      descripcion: "Solicitud de cambio de horario laboral por motivos familiares.",
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "Rechazado", fecha: "16/03/2023" },
        { nombre: "Roberto", apellido: "Silva", firma: "En proceso", fecha: null },
        { nombre: "Ana", apellido: "Martínez", firma: "En proceso", fecha: null },
      ],
      documentos: ["Justificacion_Cambio_Horario.pdf"],
    },
    {
      id: 7,
      fecha: "12/03/2023",
      numero: "SOL-2023-0119",
      tipo: "Licencia Ordinaria Anual",
      estado: "Cancelada",
      ultimaActualizacion: "14/03/2023",
      empleado: {
        nombre: "Roberto",
        apellido: "Jiménez",
        legajo: "EMP-007",
      },
      descripcion: "Solicitud de vacaciones familiares cancelada por cambio de planes.",
      fechaInicio: "01/05/2023",
      fechaFin: "15/05/2023",
      diasHabiles: 11,
      periodo: ["2023"],
      aprobadores: [
        { nombre: "María", apellido: "González", firma: "En proceso", fecha: null },
        { nombre: "Roberto", apellido: "Silva", firma: "En proceso", fecha: null },
        { nombre: "Ana", apellido: "Martínez", firma: "En proceso", fecha: null },
      ],
      documentos: ["Formulario_Vacaciones.pdf"],
    },
  ]

  // Buscar la solicitud según el ID
  const solicitud = solicitudes.find(s => s.id === parseInt(resolvedParams.id)) || solicitudes[0]

  // Hook para manejar el chat
  const { mensajes, enviarMensaje } = useChat({
    chatId: solicitud.numero,
    usuarioActual: `${solicitud.empleado.nombre} ${solicitud.empleado.apellido}`
  })

  // Función para obtener archivos según el tipo de solicitud
  const getArchivosPorTipo = (tipo: string, documentos: string[]): ArchivoAdjunto[] => {
    return documentos.map(doc => ({
      nombre: doc.replace(/_/g, ' ').replace('.pdf', ''),
      archivo: doc
    }))
  }

  const archivos = getArchivosPorTipo(solicitud.tipo, solicitud.documentos)

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
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

  const handleVerDocumento = (nombre: string, archivo: string) => {
    alert(`Ver documento: ${nombre} (${archivo})`);
  };

  const handleConfirmarCancelacion = () => {
    setModalCancelarAbierto(false)
    setMotivoCancelacion("")
    // Aquí iría la lógica para cancelar la solicitud
    alert(`Solicitud ${solicitud.numero} cancelada`)
    router.push("/empleado-contable/gestion/solicitudes/mis-solicitudes")
  }

  // Función para renderizar el contenedor de datos específicos según el tipo
  const renderContenedorDatosEspecificos = () => {
    switch (solicitud.tipo) {
      case "Licencia Ordinaria Anual":
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
      case "Licencia Médica":
      case "Día de trámite":
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
      case "Solicitud de Préstamo":
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
      case "Solicitud de Recibos de Sueldo":
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Detalles de Documentación</h2>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-500">Tipo de documento:</span>
              <p className="text-sm font-medium">{solicitud.tipoDocumento || "Recibos de Sueldo"}</p>
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
          <Link href="/empleado-contable/gestion/solicitudes/mis-solicitudes">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Mi Solicitud</h1>
            <p className="text-gray-600">{solicitud.numero} - {solicitud.tipo}</p>
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
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Última actualización:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.ultimaActualizacion}</p>
              </div>
            </div>
          </div>

          {/* Contenedor de datos específicos según el tipo */}
          {renderContenedorDatosEspecificos()}

          {/* Información general */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Información General</h2>
            <div className="space-y-4">
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

        {/* Columna derecha - Acciones y estado */}
        <div className="space-y-6">
          {/* Acciones */}
          {(solicitud.estado === "En proceso" || solicitud.estado === "Aprobada") && (
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
                    onClick={() => setModalCancelarAbierto(true)}
                  >
                    <X className="mr-2 h-4 w-4" /> Cancelar Solicitud
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Información del solicitante */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Solicitante</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Nombre:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.empleado.nombre} {solicitud.empleado.apellido}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Legajo:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.empleado.legajo}</p>
              </div>
            </div>
          </div>

          {/* Aprobadores */}
          {solicitud.aprobadores && solicitud.aprobadores.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Aprobadores</h2>
              <div className="space-y-3">
                {solicitud.aprobadores.map((aprobador, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {aprobador.nombre} {aprobador.apellido}
                        </div>
                      </div>
                      <div className="text-right">
                        {aprobador.firma === "En proceso" && <Badge className="bg-blue-100 text-blue-800">En proceso</Badge>}
                        {aprobador.firma === "Aprobado" && <Badge className="bg-green-100 text-green-800">Aprobado</Badge>}
                        {aprobador.firma === "Rechazado" && <Badge className="bg-red-100 text-red-800">Rechazado</Badge>}
                      </div>
                    </div>
                    {aprobador.fecha && (
                      <div className="text-xs text-gray-500">
                        Fecha: {aprobador.fecha}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Chat */}
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        titulo={solicitud.numero}
        subtitulo={solicitud.tipo}
        mensajes={mensajes}
        onEnviarMensaje={enviarMensaje}
        usuarioActual={`${solicitud.empleado.nombre} ${solicitud.empleado.apellido}`}
      />

      {/* Modal de Cancelación */}
      {modalCancelarAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Cancelar Solicitud</h3>
            <p className="text-gray-600 mb-4">¿Está seguro que desea cancelar esta solicitud?</p>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">
                  Esta acción no se puede deshacer. Se enviará una notificación a los aprobadores informando la cancelación.
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
              <Button variant="outline" onClick={() => setModalCancelarAbierto(false)}>
                Cerrar
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleConfirmarCancelacion}
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


