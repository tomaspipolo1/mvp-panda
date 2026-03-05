import { notFound } from "next/navigation"
import DetallesSolicitudMiBuzon, { SolicitudEmpleado } from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Array de solicitudes de empleados
const solicitudesEmpleados: SolicitudEmpleado[] = [
  {
    id: 6,
    numero: "SOL-2024-3006",
    tipo: "Licencia ordinaria anual",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de vacaciones",
    descripcion:
      "Solicito autorización para tomar vacaciones del 20/03/2024 al 02/04/2024.",
    fecha: "15/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "15/02/2024",
    solicitante: "María González",
    departamento: "Administración",
    correo: "maria.gonzalez@empresa.com",
    asignacion: "Laura Pérez",
    periodo: ["Marzo", "Abril"],
    fechaInicio: "20/03/2024",
    fechaFin: "02/04/2024",
    diasHabiles: 10,
    firmantes: [
      {
        id: 1,
        nombre: "Laura Pérez",
        cargo: "Jefa de RRHH",
        estado: "Pendiente",
        esActual: true,
      },
    ],
  },
  {
    id: 7,
    numero: "SOL-2024-3007",
    tipo: "Licencia medica",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de licencia médica",
    descripcion:
      "Solicito licencia médica por tratamiento médico programado.",
    fecha: "16/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "18/02/2024",
    solicitante: "Juan Pérez",
    departamento: "Logística",
    correo: "juan.perez@empresa.com",
    asignacion: "Carlos López",
    fechaInicio: "20/02/2024",
    fechaFin: "25/02/2024",
    diasHabiles: 5,
    firmantes: [
      {
        id: 1,
        nombre: "Carlos López",
        cargo: "Supervisor de RRHH",
        estado: "En espera",
        esActual: true,
      },
    ],
  },
  {
    id: 8,
    numero: "SOL-2024-3008",
    tipo: "Solicitud de prestamo",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de préstamo personal",
    descripcion:
      "Solicito préstamo personal por motivos familiares urgentes.",
    fecha: "17/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Ana Martínez",
    departamento: "Finanzas",
    correo: "ana.martinez@empresa.com",
    asignacion: "Roberto Silva",
    montoSolicitado: "$50,000",
    fechaAcreditacion: "28/02/2024",
    firmantes: [
      {
        id: 1,
        nombre: "Roberto Silva",
        cargo: "Gerente de RRHH",
        estado: "Firmado",
        fechaFirma: "20/02/2024",
        esActual: false,
      },
    ],
  },
  {
    id: 9,
    numero: "SOL-2024-3009",
    tipo: "Dia de tramite",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de día de trámite",
    descripcion:
      "Solicito día de trámite para realizar gestiones bancarias personales.",
    fecha: "18/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "19/02/2024",
    solicitante: "Carlos Rodríguez",
    departamento: "IT",
    correo: "carlos.rodriguez@empresa.com",
    asignacion: "Laura Pérez",
    fechaInicio: "22/02/2024",
    fechaFin: "22/02/2024",
    diasHabiles: 1,
    firmantes: [
      {
        id: 1,
        nombre: "Laura Pérez",
        cargo: "Jefa de RRHH",
        estado: "Firmado",
        fechaFirma: "19/02/2024",
        esActual: false,
      },
    ],
  },
  {
    id: 10,
    numero: "SOL-2024-3010",
    tipo: "Documentación",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de certificado laboral",
    descripcion:
      "Solicito certificado laboral para trámites de crédito hipotecario.",
    fecha: "19/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Patricia López",
    departamento: "Operaciones",
    correo: "patricia.lopez@empresa.com",
    asignacion: "Roberto Silva",
    tipoDocumento: "Certificado laboral",
    firmantes: [
      {
        id: 1,
        nombre: "Roberto Silva",
        cargo: "Gerente de RRHH",
        estado: "Firmado",
        fechaFirma: "20/02/2024",
        esActual: false,
      },
    ],
  },
  {
    id: 11,
    numero: "SOL-2024-3011",
    tipo: "Cambio de datos",
    tipoSolicitante: "Empleado",
    asunto: "Actualización de datos personales",
    descripcion:
      "Solicito actualización de mi dirección y teléfono en el sistema de RRHH.",
    fecha: "20/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "21/02/2024",
    solicitante: "Diego Fernández",
    departamento: "Ventas",
    correo: "diego.fernandez@empresa.com",
    asignacion: "Laura Pérez",
    tipoDato: "Datos personales",
    firmantes: [
      {
        id: 1,
        nombre: "Laura Pérez",
        cargo: "Jefa de RRHH",
        estado: "Rechazado",
        fechaFirma: "21/02/2024",
        observaciones: "Documentación incompleta",
        esActual: false,
      },
    ],
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
      urlRetorno="/empleado-rrhh/gestion/mi-buzon/solicitudes"
      usuarioActual="Laura Pérez"
      tituloModulo="Detalle de Solicitud de Empleado"
    />
  )
}

