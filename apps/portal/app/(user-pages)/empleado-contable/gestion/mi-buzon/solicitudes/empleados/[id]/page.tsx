import DetallesSolicitudMiBuzon from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Datos de ejemplo para solicitudes de empleados del departamento contable
const solicitudesEmpleados = [
  {
    id: 6,
    numero: "SOL-2024-4006",
    tipo: "Licencia ordinaria anual",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de vacaciones",
    descripcion:
      "Solicito autorización para tomar vacaciones del 20/03/2024 al 02/04/2024.",
    fecha: "15/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "15/02/2024",
    solicitante: "María González",
    departamento: "Contable",
    correo: "maria.gonzalez@empresa.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "15/02/2024 - Sistema: Solicitud creada",
    ],
    adjuntos: ["solicitud-vacaciones.pdf", "calendario-laboral.pdf"],
    fechaInicio: "20/03/2024",
    fechaFin: "02/04/2024",
    diasHabiles: 10,
    periodo: ["Marzo 2024", "Abril 2024"],
    firmantes: [
      {
        id: 1,
        nombre: "Laura Pérez",
        cargo: "Jefa de Contabilidad",
        estado: "Pendiente" as const,
        esActual: true,
      },
    ],
  },
  {
    id: 7,
    numero: "SOL-2024-4007",
    tipo: "Licencia medica",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de licencia médica",
    descripcion:
      "Solicito licencia médica por tratamiento médico programado.",
    fecha: "16/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "18/02/2024",
    solicitante: "Juan Pérez",
    departamento: "Contable",
    correo: "juan.perez@empresa.com",
    asignacion: "Carlos López",
    comentarios: [
      "16/02/2024 - Sistema: Solicitud creada",
      "18/02/2024 - Carlos López: En revisión",
    ],
    adjuntos: ["certificado-medico.pdf", "solicitud-licencia.pdf"],
    fechaInicio: "20/02/2024",
    fechaFin: "25/02/2024",
    diasHabiles: 5,
    firmantes: [
      {
        id: 1,
        nombre: "Carlos López",
        cargo: "Supervisor de Contabilidad",
        estado: "En espera" as const,
        esActual: true,
      },
    ],
  },
  {
    id: 8,
    numero: "SOL-2024-4008",
    tipo: "Solicitud de prestamo",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de préstamo personal",
    descripcion:
      "Solicito préstamo personal por motivos familiares urgentes.",
    fecha: "17/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Ana Martínez",
    departamento: "Contable",
    correo: "ana.martinez@empresa.com",
    asignacion: "Roberto Silva",
    comentarios: [
      "17/02/2024 - Sistema: Solicitud creada",
      "20/02/2024 - Roberto Silva: Aprobada",
    ],
    adjuntos: ["solicitud-prestamo.pdf", "documentacion-respaldo.pdf"],
    montoSolicitado: "$50,000",
    fechaAcreditacion: "25/02/2024",
    firmantes: [
      {
        id: 1,
        nombre: "Roberto Silva",
        cargo: "Gerente de Contabilidad",
        estado: "Firmado" as const,
        fechaFirma: "20/02/2024",
        esActual: false,
      },
    ],
  },
  {
    id: 9,
    numero: "SOL-2024-4009",
    tipo: "Dia de tramite",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de día de trámite",
    descripcion:
      "Solicito día de trámite para realizar gestiones bancarias personales.",
    fecha: "18/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "19/02/2024",
    solicitante: "Carlos Rodríguez",
    departamento: "Contable",
    correo: "carlos.rodriguez@empresa.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "18/02/2024 - Sistema: Solicitud creada",
      "19/02/2024 - Laura Pérez: Aprobada",
    ],
    adjuntos: ["solicitud-dia-tramite.pdf", "documentacion-respaldo.pdf"],
    fechaInicio: "22/02/2024",
    fechaFin: "22/02/2024",
    diasHabiles: 1,
    firmantes: [
      {
        id: 1,
        nombre: "Laura Pérez",
        cargo: "Jefa de Contabilidad",
        estado: "Firmado" as const,
        fechaFirma: "19/02/2024",
        esActual: false,
      },
    ],
  },
  {
    id: 10,
    numero: "SOL-2024-4010",
    tipo: "Documentación",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de certificado laboral",
    descripcion:
      "Solicito certificado laboral para trámites de crédito hipotecario.",
    fecha: "19/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Patricia López",
    departamento: "Contable",
    correo: "patricia.lopez@empresa.com",
    asignacion: "Roberto Silva",
    comentarios: [
      "19/02/2024 - Sistema: Solicitud creada",
      "20/02/2024 - Roberto Silva: Aprobada",
    ],
    adjuntos: ["solicitud-documentacion.pdf"],
    tipoDocumento: "Certificado laboral",
    firmantes: [
      {
        id: 1,
        nombre: "Roberto Silva",
        cargo: "Gerente de Contabilidad",
        estado: "Firmado" as const,
        fechaFirma: "20/02/2024",
        esActual: false,
      },
    ],
  },
  {
    id: 11,
    numero: "SOL-2024-4011",
    tipo: "Cambio de datos",
    tipoSolicitante: "Empleado",
    asunto: "Actualización de datos personales",
    descripcion:
      "Solicito actualización de mi dirección y teléfono en el sistema de RRHH.",
    fecha: "20/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "21/02/2024",
    solicitante: "Diego Fernández",
    departamento: "Contable",
    correo: "diego.fernandez@empresa.com",
    asignacion: "Carlos López",
    comentarios: [
      "20/02/2024 - Sistema: Solicitud creada",
      "21/02/2024 - Carlos López: Rechazada - Documentación incompleta",
    ],
    adjuntos: ["solicitud-cambio-datos.pdf", "documentacion-nueva.pdf"],
    tipoDato: "Datos personales (dirección y teléfono)",
    firmantes: [
      {
        id: 1,
        nombre: "Carlos López",
        cargo: "Supervisor de Contabilidad",
        estado: "Rechazado" as const,
        fechaFirma: "21/02/2024",
        esActual: false,
      },
    ],
  },
  {
    id: 12,
    numero: "SOL-2024-4012",
    tipo: "Licencia ordinaria anual",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de vacaciones de invierno",
    descripcion:
      "Solicito vacaciones de invierno del 15/07/2024 al 29/07/2024.",
    fecha: "21/02/2024",
    estado: "Cancelada",
    ultimaActualizacion: "22/02/2024",
    solicitante: "Sofía Ramírez",
    departamento: "Contable",
    correo: "sofia.ramirez@empresa.com",
    asignacion: "Laura Pérez",
    comentarios: [
      "21/02/2024 - Sistema: Solicitud creada",
      "22/02/2024 - Sofía Ramírez: Solicitud cancelada por el empleado",
    ],
    adjuntos: ["solicitud-vacaciones.pdf", "calendario-laboral.pdf"],
    fechaInicio: "15/07/2024",
    fechaFin: "29/07/2024",
    diasHabiles: 10,
    periodo: ["Julio 2024"],
    firmantes: [
      {
        id: 1,
        nombre: "Laura Pérez",
        cargo: "Jefa de Contabilidad",
        estado: "En espera" as const,
        esActual: false,
      },
    ],
  },
]

export default async function DetalleSolicitudEmpleadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const solicitudId = parseInt(id)
  const solicitud = solicitudesEmpleados.find(s => s.id === solicitudId)

  if (!solicitud) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800">Solicitud no encontrada</h2>
          <p className="text-red-600">La solicitud con ID {solicitudId} no existe.</p>
        </div>
      </div>
    )
  }

  return (
    <DetallesSolicitudMiBuzon
      solicitud={solicitud}
      urlRetorno="/empleado-contable/gestion/mi-buzon/solicitudes"
      usuarioActual="Laura Pérez"
      tituloModulo="Detalle de Solicitud de Empleado - Contable"
    />
  )
}

