import { notFound } from "next/navigation"
import DetallesSolicitudMiBuzon, { SolicitudEmpleado } from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Array de solicitudes de empleados para mesa de entradas
const solicitudesEmpleados: SolicitudEmpleado[] = [
  {
    id: 1,
    fecha: "2024-01-15",
    numero: "EMP-2024-001",
    solicitante: "Juan Pérez",
    tipoSolicitante: "Empleado",
    departamento: "Operaciones Portuarias",
    tipo: "Reclamo",
    asunto: "Reclamo por condiciones de trabajo",
    estado: "En proceso",
    ultimaActualizacion: "2024-01-15",
    descripcion: "El empleado reclama por las condiciones de trabajo en el área de carga.",
    comentarios: ["Reclamo recibido", "En revisión"],
    correo: "juan.perez@puerto.com",
    asignacion: "Laura Pérez"
  },
  {
    id: 2,
    fecha: "2024-01-16",
    numero: "EMP-2024-002",
    solicitante: "María García",
    tipoSolicitante: "Empleado",
    departamento: "Administración",
    tipo: "Consulta",
    asunto: "Consulta sobre beneficios laborales",
    estado: "Resuelta",
    ultimaActualizacion: "2024-01-18",
    descripcion: "Consulta sobre los beneficios laborales disponibles para empleados.",
    comentarios: ["Consulta recibida", "Respondida"],
    correo: "maria.garcia@puerto.com",
    asignacion: "Laura Pérez"
  },
  {
    id: 3,
    fecha: "2024-01-17",
    numero: "EMP-2024-003",
    solicitante: "Carlos López",
    tipoSolicitante: "Empleado",
    departamento: "Recursos Humanos",
    tipo: "Tramite",
    asunto: "Trámite para cambio de horario",
    estado: "En proceso",
    ultimaActualizacion: "2024-01-17",
    descripcion: "Solicitud de cambio de horario de trabajo por motivos personales.",
    comentarios: ["Trámite iniciado", "En proceso"],
    correo: "carlos.lopez@puerto.com",
    asignacion: "Laura Pérez"
  },
  {
    id: 4,
    fecha: "2024-01-18",
    numero: "EMP-2024-004",
    solicitante: "Ana Rodríguez",
    tipoSolicitante: "Empleado",
    departamento: "Comunicación",
    tipo: "Reclamo",
    asunto: "Reclamo por falta de equipos de trabajo",
    estado: "Rechazada",
    ultimaActualizacion: "2024-01-20",
    descripcion: "Reclamo por la falta de equipos de trabajo necesarios para realizar las tareas.",
    comentarios: ["Reclamo recibido", "Rechazado por falta de presupuesto"],
    correo: "ana.rodriguez@puerto.com",
    asignacion: "Laura Pérez"
  },
  {
    id: 5,
    fecha: "2024-01-19",
    numero: "EMP-2024-005",
    solicitante: "Roberto Martínez",
    tipoSolicitante: "Empleado",
    departamento: "Seguridad",
    tipo: "Consulta",
    asunto: "Consulta sobre protocolos de seguridad",
    estado: "Resuelta",
    ultimaActualizacion: "2024-01-19",
    descripcion: "Consulta sobre los protocolos de seguridad en el área portuaria.",
    comentarios: ["Consulta recibida", "Respondida"],
    correo: "roberto.martinez@puerto.com",
    asignacion: "Laura Pérez"
  },
  {
    id: 6,
    fecha: "2024-01-20",
    numero: "EMP-2024-006",
    solicitante: "Laura Fernández",
    tipoSolicitante: "Empleado",
    departamento: "Prensa",
    tipo: "Tramite",
    asunto: "Trámite para solicitud de capacitación",
    estado: "En proceso",
    ultimaActualizacion: "2024-01-20",
    descripcion: "Solicitud de capacitación en nuevas tecnologías de comunicación.",
    comentarios: ["Trámite iniciado", "En proceso"],
    correo: "laura.fernandez@puerto.com",
    asignacion: "Laura Pérez"
  }
]

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function DetalleEmpleadoPage({ params }: Props) {
  const { id } = await params
  const solicitudId = parseInt(id)
  const solicitud = solicitudesEmpleados.find((s) => s.id === solicitudId)

  if (!solicitud) {
    notFound()
  }

  return (
    <DetallesSolicitudMiBuzon
      solicitud={solicitud}
      urlRetorno="/empleado-mesa-entradas/gestion/mi-buzon/solicitudes"
      usuarioActual="Laura Pérez"
      tituloModulo="Detalle de Solicitud de Empleado - Mesa de Entradas"
    />
  )
}
