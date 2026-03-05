"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Check,
  X,
  Mail,
  FileText,
  Clock,
  User,
  Building,
  Calendar,
  Printer,
  Download,
  Eye,
  MapPin,
  Truck,
  PackageCheck,
  Phone,
  CreditCard,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChatModal } from "@/components/ui/chat-modal"
import { useChat } from "@/hooks/use-chat"
import { HistorialAcciones, type ActionEvent } from "@/components/visitas/historial-acciones"

const mapEstadoToFinalEvent = (estado: string): { type: ActionEvent["type"]; message: string } => {
  const normalized = estado.toLowerCase()

  if (normalized === "aprobada" || normalized === "aprobado") {
    return { type: "approved", message: "Solicitud aprobada" }
  }

  if (normalized === "rechazada" || normalized === "rechazado") {
    return { type: "rejected", message: "Solicitud rechazada" }
  }

  if (normalized === "pendiente") {
    return { type: "progress", message: "Solicitud en proceso" }
  }

  if (normalized === "cancelada" || normalized === "cancelado") {
    return { type: "info", message: "Solicitud cancelada" }
  }

  if (normalized === "en curso") {
    return { type: "info", message: "Solicitud en curso" }
  }

  if (normalized === "finalizada" || normalized === "completada") {
    return { type: "info", message: "Solicitud finalizada" }
  }

  return { type: "info", message: `Solicitud ${normalized}` }
}

// Tipos
type Documento = {
  nombre: string
  tipo: string
  grupo: string
  vencimiento: string
}

type Conductor = {
  nombre: string
  dni: string
  telefono: string
  nroLicencia: string
}

type Vehiculo = {
  tipo: string
  patente: string
  marca: string
  modelo: string
}

type SolicitudCamion = {
  id: string
  numero: string
  tipoVisita: string
  operacion: string
  tipoCarga: string
  destino: string
  fechaIngreso: string
  horaIngreso: string
  fechaEgreso?: string
  horaEgreso?: string
  esRecurrente?: boolean
  diasSemana?: string[]
  solicitante: string
  empresa: string
  razonSocial: string
  cuit: string
  email: string
  telefono: string
  transporteTerciarizado?: boolean
  empresaTransporte?: string
  conductor: Conductor
  vehiculo: Vehiculo
  documentos: Documento[]
  observaciones: string
  estado: string
}

export default function DetalleCamionPendientePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [observacion, setObservacion] = useState("")
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)

  // Documentación obligatoria
  const docVehiculoObligatoria: Documento[] = [
    { nombre: "licencia_conductor.pdf", tipo: "Licencia de Conducir", grupo: "conductor", vencimiento: "31/12/2025" },
    { nombre: "cedula_verde.pdf", tipo: "Cédula Verde", grupo: "vehiculo", vencimiento: "15/08/2024" },
    { nombre: "cedula_azul.pdf", tipo: "Cédula Azul", grupo: "vehiculo", vencimiento: "15/08/2024" },
    { nombre: "seguro_vehiculo.pdf", tipo: "Seguro del Vehículo", grupo: "vehiculo", vencimiento: "30/11/2024" }
  ]

  // Datos de ejemplo
  const solicitudes: SolicitudCamion[] = [
    {
      id: "SOL-2023-001",
      numero: "SOL-2023-001",
      tipoVisita: "Transporte de Carga",
      operacion: "Carga",
      tipoCarga: "Materiales",
      destino: "Areneras",
      fechaIngreso: "15/05/2023",
      horaIngreso: "09:30",
      fechaEgreso: "15/05/2023",
      horaEgreso: "18:00",
      solicitante: "Carlos Rodríguez",
      empresa: "Logística ABC",
      razonSocial: "Logística ABC S.A.",
      cuit: "30-12345678-9",
      email: "contacto@logisticaabc.com",
      telefono: "+54 11 4567-8900",
      conductor: {
        nombre: "Carlos Rodríguez",
        dni: "28456789",
        telefono: "+54 11 1234-5678",
        nroLicencia: "LIC-2023-001"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "AB123CD",
        marca: "Mercedes-Benz",
        modelo: "Actros 2042"
      },
      documentos: docVehiculoObligatoria,
      observaciones: "Carga de materiales a granel.",
      estado: "pendiente"
    },
    {
      id: "SOL-2023-002",
      numero: "SOL-2023-002",
      tipoVisita: "Transporte de Carga",
      operacion: "Descarga",
      tipoCarga: "Maquinaria",
      destino: "Terminal TEC Plata",
      fechaIngreso: "16/05/2023",
      horaIngreso: "14:45",
      fechaEgreso: "16/05/2023",
      horaEgreso: "20:00",
      esRecurrente: true,
      diasSemana: ["Martes", "Miércoles", "Viernes"],
      solicitante: "María González",
      empresa: "Transporte Sur S.A.",
      razonSocial: "Transporte Sur S.A.",
      cuit: "30-23456789-0",
      email: "info@transportesur.com",
      telefono: "+54 11 5678-9012",
      transporteTerciarizado: true,
      empresaTransporte: "Logística Express S.R.L.",
      conductor: {
        nombre: "María González",
        dni: "30987654",
        telefono: "+54 11 2345-6789",
        nroLicencia: "LIC-2023-002"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "XY456ZW",
        marca: "Volvo",
        modelo: "FH 540"
      },
      documentos: docVehiculoObligatoria,
      observaciones: "Descarga de maquinaria pesada.",
      estado: "pendiente"
    },
    {
      id: "SOL-2023-003",
      numero: "SOL-2023-003",
      tipoVisita: "Transporte de Carga",
      operacion: "Carga",
      tipoCarga: "Líquidos",
      destino: "Copetro",
      fechaIngreso: "17/05/2023",
      horaIngreso: "11:15",
      fechaEgreso: "17/05/2023",
      horaEgreso: "17:30",
      solicitante: "Juan Pérez",
      empresa: "Químicos del Sur",
      razonSocial: "Químicos del Sur S.R.L.",
      cuit: "30-34567890-1",
      email: "operaciones@quimicosdelsur.com",
      telefono: "+54 11 6789-0123",
      conductor: {
        nombre: "Juan Pérez",
        dni: "25678901",
        telefono: "+54 11 3456-7890",
        nroLicencia: "LIC-2023-003"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "CD789EF",
        marca: "Scania",
        modelo: "R450"
      },
      documentos: docVehiculoObligatoria,
      observaciones: "Carga de líquidos peligrosos.",
      estado: "pendiente"
    },
    {
      id: "SOL-2023-004",
      numero: "SOL-2023-004",
      tipoVisita: "Transporte de Carga",
      operacion: "Carga",
      tipoCarga: "Contenedores",
      destino: "PLP - Obras e Ingenieria",
      fechaIngreso: "18/05/2023",
      horaIngreso: "08:00",
      fechaEgreso: "18/05/2023",
      horaEgreso: "15:00",
      solicitante: "Laura Martínez",
      empresa: "Contenedores Express",
      razonSocial: "Contenedores Express S.A.",
      cuit: "30-45678901-2",
      email: "laura.martinez@contexpress.com",
      telefono: "+54 11 7890-1234",
      conductor: {
        nombre: "Laura Martínez",
        dni: "32456123",
        telefono: "+54 11 4567-8901",
        nroLicencia: "LIC-2023-004"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "GH012IJ",
        marca: "Iveco",
        modelo: "Stralis"
      },
      documentos: docVehiculoObligatoria,
      observaciones: "Carga de contenedores refrigerados.",
      estado: "pendiente"
    },
    {
      id: "SOL-2023-005",
      numero: "SOL-2023-005",
      tipoVisita: "Transporte de Carga",
      operacion: "Descarga",
      tipoCarga: "Granos",
      destino: "PLP - Pañol/Deposito",
      fechaIngreso: "19/05/2023",
      horaIngreso: "16:30",
      fechaEgreso: "19/05/2023",
      horaEgreso: "22:00",
      solicitante: "Roberto Sánchez",
      empresa: "Agroexport S.A.",
      razonSocial: "Agroexport S.A.",
      cuit: "30-56789012-3",
      email: "rsanchez@agroexport.com",
      telefono: "+54 11 8901-2345",
      conductor: {
        nombre: "Roberto Sánchez",
        dni: "27890345",
        telefono: "+54 11 5678-9012",
        nroLicencia: "LIC-2023-005"
      },
      vehiculo: {
        tipo: "Camión",
        patente: "KL345MN",
        marca: "MAN",
        modelo: "TGX"
      },
      documentos: docVehiculoObligatoria,
      observaciones: "Descarga de granos.",
      estado: "pendiente"
    }
  ]

  // Buscar la solicitud según el ID
  const solicitud = solicitudes.find(s => s.id === resolvedParams.id) || solicitudes[0]



  const renderEstadoBadge = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "aprobado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobado</Badge>
      case "rechazado":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazado</Badge>
      case "en curso":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">En Curso</Badge>
      case "finalizada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Finalizada</Badge>
      case "cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const handleConfirmApprove = () => {
    setIsApproveModalOpen(false)
    setObservacion("")
    alert(`Solicitud ${solicitud.numero} aprobada`)
    router.push("/empleado-seguridad/visitas/camiones/pendientes")
  }

  const handleConfirmReject = () => {
    setIsRejectModalOpen(false)
    setObservacion("")
    alert(`Solicitud ${solicitud.numero} rechazada`)
    router.push("/empleado-seguridad/visitas/camiones/pendientes")
  }

  const handleVerDocumento = (nombre: string, archivo: string) => {
    alert(`Ver documento: ${nombre} (${archivo})`)
  }

  const creadorDetalle = [solicitud.empresa || solicitud.razonSocial, solicitud.solicitante].filter(Boolean).join(" - ") || undefined
  const finalEvent = mapEstadoToFinalEvent(solicitud.estado)

  const historialEventos: ActionEvent[] = [
    {
      id: "evt-1",
      timestamp: "2024-01-05T09:00:00",
      type: "created",
      message: "Solicitud creada",
      actor: solicitud.solicitante,
      detail: creadorDetalle,
    },
    {
      id: "evt-2",
      timestamp: "2024-01-05T10:00:00",
      type: "progress",
      message: "Solicitud en proceso",
      showActor: false,
    },
    {
      id: "evt-3",
      timestamp: "2024-01-05T10:45:00",
      type: "info",
      message: "Equipo de Seguridad revisó la solicitud",
      actor: "Equipo de Seguridad",
      detail: "Control de camiones",
    },
    {
      id: "evt-4",
      timestamp: "2024-01-05T11:30:00",
      ...finalEvent,
      showActor: false,
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/empleado-seguridad/visitas/camiones/pendientes">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Solicitud Transporte de Carga</h1>
            <p className="text-gray-600">{solicitud.numero} - {solicitud.tipoCarga}</p>
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
          {/* Detalle de la visita */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Detalle de la Visita</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Número de visita:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.numero}</p>
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
                  <Truck className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Tipo visita:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.tipoVisita}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Destino:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.destino}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <PackageCheck className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Operación:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.operacion}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <PackageCheck className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Tipo carga:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.tipoCarga}</p>
              </div>
            </div>
          </div>

          {/* Fechas y horarios */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Fechas y Horarios</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha desde:</span>
                <p className="text-sm font-medium">{solicitud.fechaIngreso}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha hasta:</span>
                <p className="text-sm font-medium">{solicitud.fechaEgreso || "-"}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Hora desde:</span>
                <p className="text-sm font-medium">{solicitud.horaIngreso}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Hora hasta:</span>
                <p className="text-sm font-medium">{solicitud.horaEgreso || "-"}</p>
              </div>
            </div>

            {/* Días de la semana si es recurrente */}
            {solicitud.esRecurrente && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Días de la semana</h3>
                <div className="flex flex-wrap gap-3">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia) => (
                    <label key={dia} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={solicitud.diasSemana?.includes(dia) || false}
                        disabled
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{dia}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Información del conductor */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Información del Conductor
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Nombre:</span>
                <p className="text-sm font-medium">{solicitud.conductor.nombre}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">DNI:</span>
                <p className="text-sm font-medium">{solicitud.conductor.dni}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                <p className="text-sm font-medium">{solicitud.conductor.telefono || "-"}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Nro Licencia:</span>
                <p className="text-sm font-medium">{solicitud.conductor.nroLicencia}</p>
              </div>
            </div>
          </div>

          {/* Información del vehículo */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Información del Vehículo
            </h2>
            {solicitud.transporteTerciarizado ? (
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Empresa de transporte:</span>
                <p className="text-sm font-medium">{solicitud.empresaTransporte}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Tipo:</span>
                  <p className="text-sm font-medium">{solicitud.vehiculo.tipo}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Patente:</span>
                  <p className="text-sm font-medium">{solicitud.vehiculo.patente}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Marca:</span>
                  <p className="text-sm font-medium">{solicitud.vehiculo.marca}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Modelo:</span>
                  <p className="text-sm font-medium">{solicitud.vehiculo.modelo}</p>
                </div>
              </div>
            )}
          </div>

          {/* Documentación */}
          {solicitud.documentos && solicitud.documentos.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Documentación</h2>
              <div className="space-y-3">
                {solicitud.documentos.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                    <div className="flex items-center flex-1">
                      <FileText className="h-4 w-4 text-blue-600 mr-3" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">
                          {doc.tipo}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {doc.nombre} • Vence: {doc.vencimiento}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerDocumento(doc.tipo, doc.nombre)}
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
          {solicitud.estado.toLowerCase() === "pendiente" && (
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
                  <Building className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Razón social:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.razonSocial}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">CUIT:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.cuit}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.email}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Teléfono:</span>
                </div>
                <p className="text-sm font-medium">{solicitud.telefono}</p>
              </div>
            </div>
          </div>

          <HistorialAcciones
            events={historialEventos}
            variant="internal"
            title="Historial de la solicitud"
          />
        </div>
      </div>

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

    </div>
  )
}
