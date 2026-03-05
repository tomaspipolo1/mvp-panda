import { notFound } from "next/navigation"
import DetallesSolicitudMiBuzon, { SolicitudEmpleado } from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Datos de ejemplo para solicitudes de empleados de legales
const solicitudesEmpleados: SolicitudEmpleado[] = [
  {
    id: 6,
    numero: "SOL-LEG-4001",
    tipo: "Licencia ordinaria anual",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de vacaciones",
    descripcion: "Solicito autorización para tomar vacaciones del 20/03/2024 al 02/04/2024.",
    fecha: "15/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "15/02/2024",
    solicitante: "María González",
    departamento: "Legales",
    correo: "maria.gonzalez@empresa.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "15/02/2024 - Sistema: Solicitud creada",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Laura Pérez",
        cargo: "Jefa de Legales",
        estado: "Pendiente",
        esActual: true,
      },
    ],
    fechaInicio: "20/03/2024",
    fechaFin: "02/04/2024",
    diasHabiles: 10,
    periodo: ["Marzo", "Abril"],
  },
  {
    id: 7,
    numero: "SOL-LEG-4002",
    tipo: "Licencia medica",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de licencia médica",
    descripcion: "Solicito licencia médica por tratamiento médico programado.",
    fecha: "16/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "18/02/2024",
    solicitante: "Juan Pérez",
    departamento: "Legales",
    correo: "juan.perez@empresa.com",
    asignacion: "Carlos López",
    comentarios: [
      "16/02/2024 - Sistema: Solicitud creada",
      "18/02/2024 - Carlos López: En revisión",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Carlos López",
        cargo: "Supervisor de Legales",
        estado: "En espera",
        esActual: true,
      },
    ],
    fechaInicio: "25/02/2024",
    fechaFin: "01/03/2024",
    diasHabiles: 5,
  },
  {
    id: 8,
    numero: "SOL-LEG-4003",
    tipo: "Documentación",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de certificado de trabajo",
    descripcion: "Solicito certificado de trabajo para trámites bancarios personales.",
    fecha: "17/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Ana Martínez",
    departamento: "Legales",
    correo: "ana.martinez@empresa.com",
    asignacion: "Roberto Silva",
    comentarios: [
      "17/02/2024 - Sistema: Solicitud creada",
      "20/02/2024 - Roberto Silva: Aprobada",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Roberto Silva",
        cargo: "Gerente de Legales",
        estado: "Firmado",
        fechaFirma: "20/02/2024",
        esActual: false,
      },
    ],
    tipoDocumento: "Certificado laboral",
  },
  {
    id: 9,
    numero: "SOL-LEG-4004",
    tipo: "Dia de tramite",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de día de trámite",
    descripcion: "Solicito día de trámite para realizar gestiones bancarias personales.",
    fecha: "18/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "19/02/2024",
    solicitante: "Carlos Rodríguez",
    departamento: "Legales",
    correo: "carlos.rodriguez@empresa.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "18/02/2024 - Sistema: Solicitud creada",
      "19/02/2024 - Laura Pérez: Aprobada",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Laura Pérez",
        cargo: "Jefa de Legales",
        estado: "Firmado",
        fechaFirma: "19/02/2024",
        esActual: false,
      },
    ],
    fechaInicio: "22/02/2024",
    fechaFin: "22/02/2024",
    diasHabiles: 1,
  },
  {
    id: 10,
    numero: "SOL-LEG-4005",
    tipo: "Cambio de datos",
    tipoSolicitante: "Empleado",
    asunto: "Actualización de datos personales",
    descripcion: "Solicito actualización de mi dirección y teléfono en el sistema de RRHH.",
    fecha: "20/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "21/02/2024",
    solicitante: "Diego Fernández",
    departamento: "Legales",
    correo: "diego.fernandez@empresa.com",
    asignacion: "Carlos López",
    comentarios: [
      "20/02/2024 - Sistema: Solicitud creada",
      "21/02/2024 - Carlos López: Rechazada - Documentación incompleta",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Carlos López",
        cargo: "Supervisor de Legales",
        estado: "Rechazado",
        fechaFirma: "21/02/2024",
        esActual: false,
      },
    ],
    tipoDato: "Datos personales",
  },
  {
    id: 11,
    numero: "SOL-LEG-4006",
    tipo: "Licencia ordinaria anual",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de vacaciones de invierno",
    descripcion: "Solicito vacaciones de invierno del 15/07/2024 al 29/07/2024.",
    fecha: "21/02/2024",
    estado: "Cancelada",
    ultimaActualizacion: "22/02/2024",
    solicitante: "Sofía Ramírez",
    departamento: "Legales",
    correo: "sofia.ramirez@empresa.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "21/02/2024 - Sistema: Solicitud creada",
      "22/02/2024 - Sofía Ramírez: Solicitud cancelada por el empleado",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Laura Pérez",
        cargo: "Jefa de Legales",
        estado: "En espera",
        esActual: false,
      },
    ],
    fechaInicio: "15/07/2024",
    fechaFin: "29/07/2024",
    diasHabiles: 11,
    periodo: ["Julio"],
  },
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
      urlRetorno="/empleado-legales/gestion/mi-buzon/solicitudes"
      usuarioActual="Laura Pérez"
      tituloModulo="Detalle de Solicitud de Empleado - Legales"
    />
  )
}
