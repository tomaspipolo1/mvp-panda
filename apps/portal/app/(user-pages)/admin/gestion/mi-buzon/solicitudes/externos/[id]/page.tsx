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

// Tipos para las solicitudes externas
type SolicitudExterna = {
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

export default function DetalleSolicitudExternaPage({ params }: { params: Promise<{ id: string }> }) {
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

  // Datos de ejemplo para solicitudes externas
  const solicitudesExternas: SolicitudExterna[] = [
    {
      id: 1,
      numero: "SOL-2024-3001",
      tipo: "Reclamo",
      tipoSolicitante: "Proveedor",
      asunto: "Reclamo por pago atrasado - Factura 4567",
      descripcion: "Presentamos reclamo por el pago atrasado de la factura 4567 correspondiente a la entrega de insumos de enero.",
      fecha: "10/02/2024",
      estado: "Resuelta",
      ultimaActualizacion: "15/02/2024",
      solicitante: "Proveedora Industrial S.A.",
      departamento: "Administración",
      correo: "contacto@proveedoraindustrial.com",
      asignacion: "Admin Principal",
      comentarios: [
        "10/02/2024 - Sistema: Solicitud creada",
        "10/02/2024 - Proveedora Industrial: Adjunta documentación de costos",
      ],
      adjuntos: [
        "carta-reclamo.pdf",
        "factura-4567.pdf",
        "comprobantes-pago.pdf"
      ]
    },
    {
      id: 2,
      numero: "SOL-2024-3002",
      tipo: "Consulta",
      tipoSolicitante: "Cliente",
      asunto: "Consulta sobre proceso de licitación",
      descripcion: "Solicito información sobre el proceso de licitación para la compra de equipos informáticos.",
      fecha: "11/02/2024",
      estado: "En proceso",
      ultimaActualizacion: "11/02/2024",
      solicitante: "Empresa IT Solutions",
      departamento: "Administración",
      correo: "contacto@itsolutions.com",
      asignacion: "Admin Principal",
      comentarios: [
        "11/02/2024 - Sistema: Solicitud creada",
      ],
      adjuntos: [
        "consulta-licitacion.pdf",
        "especificaciones-equipos.pdf"
      ]
    },
    {
      id: 3,
      numero: "SOL-2024-3003",
      tipo: "Tramite",
      tipoSolicitante: "Proveedor",
      asunto: "Actualización de datos bancarios",
      descripcion: "Solicitamos la actualización de los datos bancarios para futuros pagos. Adjuntamos nueva constancia de CBU.",
      fecha: "12/02/2024",
      estado: "Rechazada",
      ultimaActualizacion: "12/02/2024",
      solicitante: "Suministros del Sur",
      departamento: "Administración",
      correo: "administracion@suministrosdelsur.com",
      asignacion: "Admin Principal",
      comentarios: [
        "12/02/2024 - Sistema: Solicitud creada",
      ],
      adjuntos: [
        "solicitud-cambio-datos.pdf",
        "constancia-cbu.pdf"
      ]
    }
  ]

  // Buscar la solicitud según el ID
  const solicitud = solicitudesExternas.find(s => s.id === parseInt(resolvedParams.id)) || solicitudesExternas[0]

  // Hook para manejar el chat
  const { mensajes, enviarMensaje } = useChat({
    chatId: solicitud.numero,
    usuarioActual: 'Admin Principal' // En producción vendría del contexto de usuario
  })

  // Función para obtener la clase según el tipo de solicitud
  const getClaseSolicitud = (tipo: string): string => {
    switch (tipo) {
      case "Reclamo":
        return "Servicios" // Puede ser: Ecológicas, Servicios, otros
      case "Consulta":
        return "Comercial" // Puede ser: Comercial, Acceso, otros
      case "Tramite":
        return "Redeterminación" // Puede ser: Redeterminación, Cambio de datos, otros
      default:
        return "Otros"
    }
  }

  // Función para obtener archivos según el tipo de solicitud
  const getArchivosPorTipo = (tipo: string): ArchivoAdjunto[] => {
    switch (tipo) {
      case "Reclamo":
        return [
          { nombre: "Carta de Reclamo", archivo: "carta-reclamo.pdf" },
          { nombre: "Factura Impaga", archivo: "factura-4567.pdf" },
          { nombre: "Comprobantes de Pago", archivo: "comprobantes-pago.pdf" }
        ]
      case "Consulta":
        return [
          { nombre: "Documento de Consulta", archivo: "consulta-licitacion.pdf" },
          { nombre: "Especificaciones", archivo: "especificaciones-equipos.pdf" }
        ]
      case "Tramite":
        return [
          { nombre: "Solicitud de Trámite", archivo: "solicitud-cambio-datos.pdf" },
          { nombre: "Constancia CBU", archivo: "constancia-cbu.pdf" }
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

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/gestion/mi-buzon/solicitudes">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Solicitud Externa</h1>
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
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Asignación:</span>
                </div>
                <p className="text-sm font-medium">
                  {solicitud.asignacion
                    ? solicitud.asignacion
                    : <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Clase:</span>
                </div>
                <p className="text-sm font-medium">{getClaseSolicitud(solicitud.tipo)}</p>
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
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => setIsApproveModalOpen(true)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Resolver
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

          {/* Historial de Estado */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Historial de Estado</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Estado actual: {solicitud.estado}</div>
                  <div className="text-xs text-gray-500">{solicitud.ultimaActualizacion}</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Solicitud creada</div>
                  <div className="text-xs text-gray-500">{solicitud.fecha}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales - Mantener los mismos modales que ya existían */}
      {/* Modal de Confirmación de Resolución */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Confirmar Resolución</h3>
            <p className="text-gray-600 mb-4">¿Está seguro que desea resolver esta solicitud?</p>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">
                  Se enviará una notificación por correo electrónico al solicitante informando la resolución.
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
                Confirmar Resolución
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
        usuarioActual="Admin Principal"
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

