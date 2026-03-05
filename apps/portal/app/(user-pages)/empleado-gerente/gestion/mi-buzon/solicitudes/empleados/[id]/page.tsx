

import { use } from "react"
import DetallesSolicitudMiBuzon, { SolicitudEmpleado } from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Datos de ejemplo para solicitudes de empleados de gerencia
const solicitudesEmpleados: SolicitudEmpleado[] = [
  {
    id: 6,
    numero: "SOL-2024-7006",
    tipo: "Licencia ordinaria anual",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de vacaciones de verano",
    descripcion: "Solicito autorización para tomar vacaciones del 01/03/2024 al 15/03/2024. He coordinado con mi equipo para la cobertura de mis responsabilidades durante mi ausencia.",
    fecha: "15/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "15/02/2024",
    solicitante: "María González",
    departamento: "Gerencia",
    correo: "maria.gonzalez@empresa.com",
    asignacion: "Ricardo Fernández",
    adjuntos: ["solicitud-vacaciones.pdf"],
    comentarios: [
      "15/02/2024 - Sistema: Solicitud creada",
      "15/02/2024 - María González: Adjunta plan de cobertura",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Ricardo Fernández",
        cargo: "Gerente General",
        estado: "Pendiente",
        esActual: true,
      },
    ],
    fechaInicio: "01/03/2024",
    fechaFin: "15/03/2024",
    diasHabiles: 10,
    periodo: ["Febrero 2024", "Marzo 2024"],
  },
  {
    id: 7,
    numero: "SOL-2024-7007",
    tipo: "Licencia medica",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de licencia médica",
    descripcion: "Solicito licencia médica por tratamiento médico programado del 20/02/2024 al 28/02/2024. Adjunto certificado médico que respalda la solicitud.",
    fecha: "16/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "18/02/2024",
    solicitante: "Juan Pérez",
    departamento: "Gerencia",
    correo: "juan.perez@empresa.com",
    asignacion: "Carlos López",
    adjuntos: ["certificado-medico.pdf", "orden-medica.pdf"],
    comentarios: [
      "16/02/2024 - Sistema: Solicitud creada",
      "16/02/2024 - Juan Pérez: Adjunta certificado médico",
      "18/02/2024 - Carlos López: En revisión",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Carlos López",
        cargo: "Subdirector de Gerencia",
        estado: "En espera",
        esActual: true,
      },
    ],
    fechaInicio: "20/02/2024",
    fechaFin: "28/02/2024",
    diasHabiles: 7,
  },
  {
    id: 8,
    numero: "SOL-2024-7008",
    tipo: "Solicitud de prestamo",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de préstamo personal",
    descripcion: "Solicito préstamo personal por motivos familiares urgentes. El monto solicitado es de $500,000 pesos con descuento en nómina a 12 meses.",
    fecha: "17/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Ana Martínez",
    departamento: "Gerencia",
    correo: "ana.martinez@empresa.com",
    asignacion: "Roberto Silva",
    adjuntos: ["solicitud-prestamo.pdf", "recibos-sueldo.pdf"],
    comentarios: [
      "17/02/2024 - Sistema: Solicitud creada",
      "17/02/2024 - Ana Martínez: Adjunta documentación requerida",
      "20/02/2024 - Roberto Silva: Aprobada",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Roberto Silva",
        cargo: "Director Administrativo",
        estado: "Firmado",
        fechaFirma: "20/02/2024",
        esActual: false,
      },
    ],
    montoSolicitado: "$500,000",
    fechaAcreditacion: "25/02/2024",
  },
  {
    id: 9,
    numero: "SOL-2024-7009",
    tipo: "Dia de tramite",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de día de trámite",
    descripcion: "Solicito día de trámite para realizar gestiones bancarias personales el 25/02/2024. Necesito realizar trámite presencial que no puede posponerse.",
    fecha: "18/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "19/02/2024",
    solicitante: "Carlos Rodríguez",
    departamento: "Gerencia",
    correo: "carlos.rodriguez@empresa.com",
    asignacion: "Ricardo Fernández",
    adjuntos: ["solicitud-dia-tramite.pdf"],
    comentarios: [
      "18/02/2024 - Sistema: Solicitud creada",
      "19/02/2024 - Ricardo Fernández: Aprobada",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Ricardo Fernández",
        cargo: "Gerente General",
        estado: "Firmado",
        fechaFirma: "19/02/2024",
        esActual: false,
      },
    ],
    fechaInicio: "25/02/2024",
    fechaFin: "25/02/2024",
    diasHabiles: 1,
  },
  {
    id: 10,
    numero: "SOL-2024-7010",
    tipo: "Documentación",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de certificado de antigüedad",
    descripcion: "Solicito certificado de antigüedad para trámites de crédito hipotecario. Necesito que especifique fecha de ingreso, cargo actual y antigüedad total.",
    fecha: "19/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Patricia López",
    departamento: "Gerencia",
    correo: "patricia.lopez@empresa.com",
    asignacion: "Roberto Silva",
    adjuntos: ["solicitud-certificado.pdf"],
    comentarios: [
      "19/02/2024 - Sistema: Solicitud creada",
      "20/02/2024 - Roberto Silva: Aprobada. Certificado generado.",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Roberto Silva",
        cargo: "Director Administrativo",
        estado: "Firmado",
        fechaFirma: "20/02/2024",
        esActual: false,
      },
    ],
    tipoDocumento: "Certificado de antigüedad",
  },
  {
    id: 11,
    numero: "SOL-2024-7011",
    tipo: "Cambio de datos",
    tipoSolicitante: "Empleado",
    asunto: "Actualización de datos personales",
    descripcion: "Solicito actualización de mi dirección y teléfono en el sistema de RRHH. Adjunto comprobante de domicilio actualizado.",
    fecha: "20/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "21/02/2024",
    solicitante: "Diego Fernández",
    departamento: "Gerencia",
    correo: "diego.fernandez@empresa.com",
    asignacion: "Carlos López",
    adjuntos: ["solicitud-cambio-datos.pdf", "comprobante-domicilio.pdf"],
    comentarios: [
      "20/02/2024 - Sistema: Solicitud creada",
      "21/02/2024 - Carlos López: Rechazada - Documentación incompleta. Falta constancia de CUIL actualizada.",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Carlos López",
        cargo: "Subdirector de Gerencia",
        estado: "Rechazado",
        fechaFirma: "21/02/2024",
        esActual: false,
      },
    ],
    tipoDato: "Dirección y teléfono",
  },
  {
    id: 12,
    numero: "SOL-2024-7012",
    tipo: "Licencia ordinaria anual",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de vacaciones de invierno",
    descripcion: "Solicito vacaciones de invierno del 15/07/2024 al 29/07/2024. Cancelada por cambio de planes personales.",
    fecha: "21/02/2024",
    estado: "Cancelada",
    ultimaActualizacion: "22/02/2024",
    solicitante: "Sofía Ramírez",
    departamento: "Gerencia",
    correo: "sofia.ramirez@empresa.com",
    asignacion: "Ricardo Fernández",
    adjuntos: ["solicitud-vacaciones.pdf"],
    comentarios: [
      "21/02/2024 - Sistema: Solicitud creada",
      "22/02/2024 - Sofía Ramírez: Solicitud cancelada por el empleado",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Ricardo Fernández",
        cargo: "Gerente General",
        estado: "En espera",
        esActual: false,
      },
    ],
    fechaInicio: "15/07/2024",
    fechaFin: "29/07/2024",
    diasHabiles: 10,
    periodo: ["Julio 2024"],
  },
]

export default function DetalleSolicitudEmpleadoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  
  // Buscar la solicitud por ID
  const solicitud = solicitudesEmpleados.find((s) => s.id === parseInt(id))

  // Si no se encuentra la solicitud, mostrar mensaje
  if (!solicitud) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Solicitud no encontrada</h2>
          <p className="text-red-600">No se encontró la solicitud con ID: {id}</p>
        </div>
      </div>
    )
  }

  return (
    <DetallesSolicitudMiBuzon
      solicitud={solicitud}
      urlRetorno="/empleado-gerente/gestion/mi-buzon/solicitudes"
      usuarioActual="Ricardo Fernández"
      tituloModulo="Detalle de Solicitud de Empleado"
    />
  )
}

