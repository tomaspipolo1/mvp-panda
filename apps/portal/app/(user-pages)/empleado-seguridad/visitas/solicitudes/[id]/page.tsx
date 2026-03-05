"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  Users,
  Truck,
  BriefcaseIcon,
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

// Tipos para las visitas
type Persona = {
  id: string
  nombre: string
  documento: string
  empresa: string
  mail?: string
  telefono?: string
  ingreso?: string
  egreso?: string
}

type Vehiculo = {
  id: string
  tipo: string
  patente: string
  marca: string
  modelo: string
  ingreso?: string
  egreso?: string
}

type Visita = {
  id: string
  numero: string
  visitante: string
  empresa: string
  fechaVisita: string
  horaVisita: string
  estado: string
  motivo: string
  tipo: string
  sitio: string
  personas: number
  vehiculos: number
  personasDetalle: Persona[]
  vehiculosDetalle: Vehiculo[]
  fechaInicio?: string
  fechaFin?: string
  horaInicio?: string
  horaFin?: string
  observaciones?: string
}

// Tipo para los archivos adjuntos
type ArchivoAdjunto = {
  nombre: string
  archivo: string
  tipo: string
}

export default function DetalleVisitaPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const [observacion, setObservacion] = useState("")
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)

  // Datos de ejemplo para todas las visitas
  const visitas: Visita[] = [
    {
      id: "1",
      numero: "ACC-2023-040",
      visitante: "Roberto Gómez",
      empresa: "Logística ABC",
      fechaVisita: "15/05/2023",
      horaVisita: "10:00",
      estado: "Aprobada",
      motivo: "Inspección de seguridad",
      tipo: "Acceso a Obra",
      sitio: "Terminal 1",
      personas: 3,
      vehiculos: 1,
      fechaInicio: "15/05/2023",
      fechaFin: "15/05/2023",
      horaInicio: "10:00",
      horaFin: "18:00",
      observaciones: "Inspección de seguridad completada exitosamente.",
      personasDetalle: [
        { id: "p1", nombre: "Roberto Gómez", documento: "12345678", empresa: "Logística ABC", mail: "roberto.gomez@abc.com", telefono: "+54 11 1234-5678" },
        { id: "p2", nombre: "Juan Pérez", documento: "23456789", empresa: "Logística ABC", telefono: "+54 11 2345-6789" },
        { id: "p3", nombre: "Ana Torres", documento: "34567890", empresa: "Logística ABC", mail: "ana.torres@abc.com" },
      ],
      vehiculosDetalle: [
        { id: "v1", tipo: "Camioneta", patente: "AB123CD", marca: "Toyota", modelo: "Hilux" },
      ],
    },
    {
      id: "2",
      numero: "ACC-2023-041",
      visitante: "Laura Sánchez",
      empresa: "Transportes XYZ",
      fechaVisita: "16/05/2023",
      horaVisita: "14:30",
      estado: "Rechazada",
      motivo: "Supervisión de carga",
      tipo: "Acceso a Muelle",
      sitio: "Muelle Sur",
      personas: 2,
      vehiculos: 0,
      fechaInicio: "16/05/2023",
      fechaFin: "16/05/2023",
      horaInicio: "14:30",
      horaFin: "17:00",
      observaciones: "Solicitud rechazada por documentación incompleta.",
      personasDetalle: [
        { id: "p4", nombre: "Laura Sánchez", documento: "45678901", empresa: "Transportes XYZ", mail: "laura.sanchez@xyz.com", telefono: "+54 11 3456-7890" },
        { id: "p5", nombre: "Carlos Ruiz", documento: "56789012", empresa: "Transportes XYZ", telefono: "+54 11 4567-8901" },
      ],
      vehiculosDetalle: [],
    },
    {
      id: "3",
      numero: "ACC-2023-042",
      visitante: "Miguel Fernández",
      empresa: "Consultora Marítima",
      fechaVisita: "17/05/2023",
      horaVisita: "09:15",
      estado: "Finalizada",
      motivo: "Inauguración",
      tipo: "Evento",
      sitio: "Salón Principal",
      personas: 25,
      vehiculos: 5,
      fechaInicio: "17/05/2023",
      fechaFin: "17/05/2023",
      horaInicio: "09:15",
      horaFin: "14:00",
      observaciones: "Evento finalizado exitosamente con presencia de autoridades.",
      personasDetalle: [
        { id: "p6", nombre: "Miguel Fernández", documento: "67890123", empresa: "Consultora Marítima", mail: "miguel.fernandez@maritima.com", telefono: "+54 11 5678-9012", ingreso: "17/05/2023 09:10", egreso: "17/05/2023 12:00" },
      ],
      vehiculosDetalle: [
        { id: "v2", tipo: "Minibús", patente: "CD456EF", marca: "Mercedes-Benz", modelo: "Sprinter", ingreso: "17/05/2023 09:05", egreso: "17/05/2023 12:05" },
        { id: "v3", tipo: "Auto", patente: "EF789GH", marca: "Ford", modelo: "Focus", ingreso: "17/05/2023 09:12", egreso: "17/05/2023 12:10" },
      ],
    },
    {
      id: "4",
      numero: "ACC-2023-043",
      visitante: "Ana Martínez",
      empresa: "Servicios Portuarios",
      fechaVisita: "18/05/2023",
      horaVisita: "11:30",
      estado: "En Curso",
      motivo: "Grupo escolar",
      tipo: "Guiada",
      sitio: "Terminal Principal",
      personas: 30,
      vehiculos: 1,
      fechaInicio: "18/05/2023",
      fechaFin: "18/05/2023",
      horaInicio: "11:30",
      horaFin: "14:30",
      observaciones: "Visita guiada en progreso.",
      personasDetalle: [
        { id: "p7", nombre: "Ana Martínez", documento: "78901234", empresa: "Servicios Portuarios", mail: "ana.martinez@portuarios.com", telefono: "+54 11 6789-0123", ingreso: "18/05/2023 11:35" },
      ],
      vehiculosDetalle: [
        { id: "v4", tipo: "Colectivo", patente: "GH012IJ", marca: "Iveco", modelo: "Daily", ingreso: "18/05/2023 11:40" },
      ],
    },
    {
      id: "5",
      numero: "ACC-2023-050",
      visitante: "María López",
      empresa: "Recursos Humanos S.A.",
      fechaVisita: "24/05/2023",
      horaVisita: "07:45",
      estado: "Aprobada",
      motivo: "Capacitación de personal",
      tipo: "Laboral",
      sitio: "Sala de Capacitación",
      personas: 12,
      vehiculos: 0,
      fechaInicio: "24/05/2023",
      fechaFin: "24/05/2023",
      horaInicio: "07:45",
      horaFin: "16:00",
      observaciones: "Capacitación programada sobre normativas de seguridad.",
      personasDetalle: [
        { id: "p9", nombre: "María López", documento: "90123456", empresa: "Recursos Humanos S.A.", mail: "maria.lopez@rhsa.com", telefono: "+54 11 8901-2345" },
        { id: "p10", nombre: "Pedro Gómez", documento: "91234567", empresa: "Recursos Humanos S.A.", telefono: "+54 11 9012-3456" },
      ],
      vehiculosDetalle: [],
    },
    {
      id: "6",
      numero: "ACC-2023-044",
      visitante: "Carlos Rodríguez",
      empresa: "Constructora Puerto",
      fechaVisita: "19/05/2023",
      horaVisita: "08:00",
      estado: "Completada",
      motivo: "Entrega de equipos",
      tipo: "Materiales",
      sitio: "Almacén Central",
      personas: 4,
      vehiculos: 2,
      fechaInicio: "19/05/2023",
      fechaFin: "19/05/2023",
      horaInicio: "08:00",
      horaFin: "12:00",
      observaciones: "Entrega de equipos completada sin inconvenientes.",
      personasDetalle: [
        { id: "p8", nombre: "Carlos Rodríguez", documento: "89012345", empresa: "Constructora Puerto", mail: "carlos.rodriguez@puerto.com", telefono: "+54 11 7890-1234", ingreso: "19/05/2023 08:05", egreso: "19/05/2023 11:50" },
      ],
      vehiculosDetalle: [
        { id: "v5", tipo: "Camión", patente: "IJ345KL", marca: "Scania", modelo: "R450", ingreso: "19/05/2023 08:00", egreso: "19/05/2023 11:45" },
        { id: "v6", tipo: "Camioneta", patente: "KL678MN", marca: "Volkswagen", modelo: "Amarok", ingreso: "19/05/2023 08:10", egreso: "19/05/2023 11:55" },
      ],
    },
    {
      id: "7",
      numero: "ACC-2023-045",
      visitante: "Patricia Morales",
      empresa: "Seguridad Total",
      fechaVisita: "20/05/2023",
      horaVisita: "10:00",
      estado: "Cancelada",
      motivo: "Auditoría de seguridad",
      tipo: "Acceso a Obra",
      sitio: "Terminal 2",
      personas: 5,
      vehiculos: 1,
      fechaInicio: "20/05/2023",
      fechaFin: "20/05/2023",
      horaInicio: "10:00",
      horaFin: "16:00",
      observaciones: "Visita cancelada por el solicitante.",
      personasDetalle: [
        { id: "p11", nombre: "Patricia Morales", documento: "92345678", empresa: "Seguridad Total", mail: "patricia.morales@seguridadtotal.com", telefono: "+54 11 9123-4567" },
      ],
      vehiculosDetalle: [
        { id: "v7", tipo: "Camioneta", patente: "MN789OP", marca: "Chevrolet", modelo: "S10", },
      ],
    },
  ]

  // Buscar la visita según el ID
  const visita = visitas.find(v => v.id === resolvedParams.id) || visitas[0]

  // Hook para manejar el chat
  const { mensajes, enviarMensaje } = useChat({
    chatId: visita.numero,
    usuarioActual: 'Carlos Méndez' // En producción vendría del contexto de usuario
  })

  const creadorDetalle = [visita.empresa, visita.visitante].filter(Boolean).join(" - ") || undefined
  const finalEvent = mapEstadoToFinalEvent(visita.estado)

  const historialEventos: ActionEvent[] = [
    {
      id: "evt-1",
      timestamp: "2024-01-05T09:00:00",
      type: "created",
      message: "Solicitud creada",
      actor: visita.visitante,
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
      timestamp: "2024-01-05T11:00:00",
      type: "info",
      message: "Carlos Méndez revisó la solicitud",
      actor: "Carlos Méndez",
      detail: "Seguridad Operativa",
    },
    {
      id: "evt-4",
      timestamp: "2024-01-05T12:00:00",
      ...finalEvent,
      showActor: false,
    },
  ]

  // Documentos de ejemplo
  const documentos: ArchivoAdjunto[] = [
    { nombre: "ART.pdf", archivo: "art.pdf", tipo: "ART" },
    { nombre: "Seguro_Vehiculo.pdf", archivo: "seguro-vehiculo.pdf", tipo: "Seguro del vehículo" },
    { nombre: "Permiso_Acceso.pdf", archivo: "permiso-acceso.pdf", tipo: "Permiso" },
    { nombre: "Certificado_Capacitacion.pdf", archivo: "certificado-capacitacion.pdf", tipo: "Certificado" },
    { nombre: "Cedula_Verde.pdf", archivo: "cedula-verde.pdf", tipo: "Cédula verde vehículo" },
    { nombre: "DNI_Conductor.pdf", archivo: "dni-conductor.pdf", tipo: "DNI conductor" },
    { nombre: "Licencia_Conducir.pdf", archivo: "licencia-conducir.pdf", tipo: "Licencia de conducir" },
  ]

  const renderEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Aprobada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprobada</Badge>
      case "Completada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Completada</Badge>
      case "Cancelada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cancelada</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      case "Finalizada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Finalizada</Badge>
      case "En Curso":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">En Curso</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const handleConfirmApprove = () => {
    setIsApproveModalOpen(false)
    setObservacion("")
    // Aquí iría la lógica para aprobar la visita
    alert(`Visita ${visita.numero} aprobada`)
    router.push("/empleado-seguridad/visitas/solicitudes")
  }

  const handleConfirmReject = () => {
    setIsRejectModalOpen(false)
    setObservacion("")
    // Aquí iría la lógica para rechazar la visita
    alert(`Visita ${visita.numero} rechazada`)
    router.push("/empleado-seguridad/visitas/solicitudes")
  }

  const handleVerDocumento = (nombre: string, archivo: string) => {
    alert(`Ver documento: ${nombre} (${archivo})`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/empleado-seguridad/visitas/solicitudes">
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Detalle de Visita</h1>
            <p className="text-gray-600">{visita.numero} - {visita.motivo}</p>
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
                  <span className="text-sm font-medium text-gray-500">Nro visita:</span>
                </div>
                <p className="text-sm font-medium">{visita.numero}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Fecha visita:</span>
                </div>
                <p className="text-sm font-medium">{visita.fechaVisita}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <BriefcaseIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Tipo visita:</span>
                </div>
                <p className="text-sm font-medium">{visita.tipo}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Estado:</span>
                </div>
                <div>{renderEstadoBadge(visita.estado)}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Destino:</span>
                </div>
                <p className="text-sm font-medium">{visita.sitio}</p>
              </div>
            </div>
          </div>

          {/* Fechas y horarios */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Fechas y Horarios</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha ingreso:</span>
                <p className="text-sm font-medium">{visita.fechaInicio || visita.fechaVisita}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Fecha egreso:</span>
                <p className="text-sm font-medium">{visita.fechaFin || visita.fechaVisita}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Hora ingreso:</span>
                <p className="text-sm font-medium">{visita.horaInicio || visita.horaVisita}</p>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-500">Hora egreso:</span>
                <p className="text-sm font-medium">{visita.horaFin || "18:00"}</p>
              </div>
            </div>
          </div>

          {/* Personas */}
          {visita.personasDetalle && visita.personasDetalle.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Personas ({visita.personas})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Nombre</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Documento</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Mail</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Teléfono</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Empresa</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Ingreso</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Salió</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visita.personasDetalle.map((persona, idx) => (
                      <tr key={persona.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.nombre}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.documento}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.mail || '-'}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.telefono || '-'}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.empresa}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.ingreso || '-'}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{persona.egreso || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Vehículos */}
          {visita.vehiculosDetalle && visita.vehiculosDetalle.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Vehículos ({visita.vehiculos})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Tipo</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Patente</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Marca</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Modelo</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Ingreso</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Salió</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visita.vehiculosDetalle.map((vehiculo, idx) => (
                      <tr key={vehiculo.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="py-2 px-4 text-sm text-gray-800">{vehiculo.tipo}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{vehiculo.patente}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{vehiculo.marca}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{vehiculo.modelo}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{vehiculo.ingreso || '-'}</td>
                        <td className="py-2 px-4 text-sm text-gray-800">{vehiculo.egreso || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Documentación */}
          {documentos && documentos.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Documentación</h2>
              <div className="space-y-3">
                {documentos.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                    <div className="flex items-center flex-1">
                      <FileText className="h-4 w-4 text-blue-600 mr-3" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">
                          {doc.tipo}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {doc.nombre}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerDocumento(doc.tipo, doc.archivo)}
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
          {visita.estado === "Pendiente" && (
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
                <p className="text-sm font-medium">{visita.visitante}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">Empresa:</span>
                </div>
                <p className="text-sm font-medium">{visita.empresa}</p>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Estadísticas</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Personas</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{visita.personas}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Vehículos</span>
                </div>
                <span className="text-lg font-bold text-green-600">{visita.vehiculos}</span>
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
            <p className="text-gray-600 mb-4">¿Está seguro que desea aprobar esta visita?</p>
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
            <p className="text-gray-600 mb-4">¿Está seguro que desea rechazar esta visita?</p>
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
                <p className="text-xs text-gray-500 mt-1">Este campo es obligatorio para el rechazo de visitas.</p>
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
        titulo={visita.numero}
        subtitulo={visita.motivo}
        mensajes={mensajes}
        onEnviarMensaje={enviarMensaje}
        usuarioActual="Carlos Méndez"
      />
    </div>
  )
}
