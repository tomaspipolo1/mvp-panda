import { notFound } from "next/navigation"
import DetallesSolicitudMiBuzon, { SolicitudEmpleado } from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Array de solicitudes externas para mesa de entradas
const solicitudesExternas: SolicitudEmpleado[] = [
  {
    id: 1,
    fecha: "2024-01-15",
    numero: "EXT-2024-001",
    solicitante: "María González",
    tipoSolicitante: "Externo",
    departamento: "Cliente",
    tipo: "Reclamo",
    asunto: "Reclamo por demora en entrega de mercadería",
    estado: "En proceso",
    ultimaActualizacion: "2024-01-15",
    descripcion: "El cliente reclama por la demora en la entrega de su mercadería que debería haber llegado el día 10 de enero.",
    comentarios: ["Reclamo recibido", "En revisión"],
    correo: "maria.gonzalez@empresa.com",
    asignacion: "Laura Pérez"
  },
  {
    id: 2,
    fecha: "2024-01-16",
    numero: "EXT-2024-002",
    solicitante: "Carlos Rodríguez",
    tipoSolicitante: "Externo",
    departamento: "Proveedor",
    tipo: "Consulta",
    asunto: "Consulta sobre nuevos requisitos de documentación",
    estado: "Resuelta",
    ultimaActualizacion: "2024-01-18",
    descripcion: "El proveedor consulta sobre los nuevos requisitos de documentación para futuras entregas.",
    comentarios: ["Consulta recibida", "Respondida"],
    correo: "carlos.rodriguez@proveedor.com",
    asignacion: "Laura Pérez"
  },
  {
    id: 3,
    fecha: "2024-01-17",
    numero: "EXT-2024-003",
    solicitante: "Ana Martínez",
    tipoSolicitante: "Externo",
    departamento: "Cliente",
    tipo: "Tramite",
    asunto: "Trámite para solicitud de acceso al puerto",
    estado: "En proceso",
    ultimaActualizacion: "2024-01-17",
    descripcion: "Solicitud de acceso al puerto para realizar inspecciones de mercadería.",
    comentarios: ["Trámite iniciado", "En proceso"],
    correo: "ana.martinez@cliente.com",
    asignacion: "Laura Pérez"
  },
  {
    id: 4,
    fecha: "2024-01-18",
    numero: "EXT-2024-004",
    solicitante: "Roberto Silva",
    tipoSolicitante: "Externo",
    departamento: "Proveedor",
    tipo: "Reclamo",
    asunto: "Reclamo por facturación incorrecta",
    estado: "Rechazada",
    ultimaActualizacion: "2024-01-20",
    descripcion: "El proveedor reclama por una facturación incorrecta en el último envío.",
    comentarios: ["Reclamo recibido", "Rechazado por falta de documentación"],
    correo: "roberto.silva@proveedor.com",
    asignacion: "Laura Pérez"
  },
  {
    id: 5,
    fecha: "2024-01-19",
    numero: "EXT-2024-005",
    solicitante: "Laura Fernández",
    tipoSolicitante: "Externo",
    departamento: "Cliente",
    tipo: "Consulta",
    asunto: "Consulta sobre horarios de atención",
    estado: "Resuelta",
    ultimaActualizacion: "2024-01-19",
    descripcion: "Consulta sobre los horarios de atención al cliente en el puerto.",
    comentarios: ["Consulta recibida", "Respondida"],
    correo: "laura.fernandez@cliente.com",
    asignacion: "Laura Pérez"
  }
]

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function DetalleExternaPage({ params }: Props) {
  const { id } = await params
  const solicitudId = parseInt(id)
  const solicitud = solicitudesExternas.find((s) => s.id === solicitudId)

  if (!solicitud) {
    notFound()
  }

  return (
    <DetallesSolicitudMiBuzon
      solicitud={solicitud}
      urlRetorno="/empleado-mesa-entradas/gestion/mi-buzon/solicitudes"
      usuarioActual="Laura Pérez"
      tituloModulo="Detalle de Solicitud Externa - Mesa de Entradas"
    />
  )
}
