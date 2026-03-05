"use client"

import { use } from "react"
import DetallesSolicitudMiBuzon, { SolicitudEmpleado } from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Datos de ejemplo para solicitudes de empleados de prensa
const solicitudesEmpleados: SolicitudEmpleado[] = [
  {
    id: 6,
    numero: "SOL-2024-7006",
    tipo: "Documentación",
    tipoSolicitante: "Empleado",
    asunto: "Comunicado de Prensa - Nueva Terminal",
    descripcion:
      "Solicito la elaboración y difusión de un comunicado de prensa sobre la inauguración de la nueva terminal de contenedores.",
    fecha: "15/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "15/02/2024",
    solicitante: "Roberto Martínez",
    departamento: "Prensa",
    correo: "roberto.martinez@puerto.com",
    asignacion: "Ana García",
    comentarios: [
      "15/02/2024 - Sistema: Solicitud creada",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Ana García",
        cargo: "Jefa de Prensa",
        estado: "Pendiente",
        esActual: true,
      },
    ],
    adjuntos: [
      "borrador-comunicado.pdf",
      "imagenes-terminal.zip"
    ]
  },
  {
    id: 7,
    numero: "SOL-2024-7007",
    tipo: "Licencia ordinaria anual",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de vacaciones",
    descripcion:
      "Solicito autorización para tomar vacaciones del 20/03/2024 al 02/04/2024.",
    fecha: "16/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "18/02/2024",
    solicitante: "María González",
    departamento: "Prensa",
    correo: "maria.gonzalez@empresa.com",
    asignacion: "Carlos López",
    fechaInicio: "20/03/2024",
    fechaFin: "02/04/2024",
    diasHabiles: 10,
    periodo: ["2024"],
    comentarios: [
      "16/02/2024 - Sistema: Solicitud creada",
      "18/02/2024 - Carlos López: En revisión",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Carlos López",
        cargo: "Gerente de Comunicación",
        estado: "En espera",
        esActual: true,
      },
    ],
    adjuntos: [
      "solicitud-vacaciones.pdf",
      "calendario-laboral.pdf"
    ]
  },
  {
    id: 8,
    numero: "SOL-2024-7008",
    tipo: "Documentación",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de certificado laboral",
    descripcion:
      "Solicito certificado laboral para trámites de crédito hipotecario.",
    fecha: "17/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Patricia López",
    departamento: "Prensa",
    correo: "patricia.lopez@empresa.com",
    asignacion: "Roberto Silva",
    tipoDocumento: "Certificado laboral",
    comentarios: [
      "17/02/2024 - Sistema: Solicitud creada",
      "20/02/2024 - Roberto Silva: Aprobada",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Roberto Silva",
        cargo: "Gerente de Prensa",
        estado: "Firmado",
        fechaFirma: "20/02/2024",
        esActual: false,
      },
    ],
    adjuntos: [
      "solicitud-documentacion.pdf"
    ]
  },
  {
    id: 9,
    numero: "SOL-2024-7009",
    tipo: "Dia de tramite",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de día de trámite",
    descripcion:
      "Solicito día de trámite para realizar gestiones bancarias personales.",
    fecha: "18/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "19/02/2024",
    solicitante: "Carlos Rodríguez",
    departamento: "Prensa",
    correo: "carlos.rodriguez@empresa.com",
    asignacion: "Ana García",
    fechaInicio: "25/02/2024",
    fechaFin: "25/02/2024",
    diasHabiles: 1,
    comentarios: [
      "18/02/2024 - Sistema: Solicitud creada",
      "19/02/2024 - Ana García: Aprobada",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Ana García",
        cargo: "Jefa de Prensa",
        estado: "Firmado",
        fechaFirma: "19/02/2024",
        esActual: false,
      },
    ],
    adjuntos: [
      "solicitud-dia-tramite.pdf",
      "documentacion-respaldo.pdf"
    ]
  },
  {
    id: 10,
    numero: "SOL-2024-7010",
    tipo: "Licencia medica",
    tipoSolicitante: "Empleado",
    asunto: "Solicitud de licencia médica",
    descripcion:
      "Solicito licencia médica por tratamiento médico programado.",
    fecha: "19/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "20/02/2024",
    solicitante: "Diego Fernández",
    departamento: "Prensa",
    correo: "diego.fernandez@empresa.com",
    asignacion: "Carlos López",
    fechaInicio: "25/02/2024",
    fechaFin: "28/02/2024",
    diasHabiles: 4,
    comentarios: [
      "19/02/2024 - Sistema: Solicitud creada",
      "20/02/2024 - Carlos López: Rechazada - Documentación incompleta",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Carlos López",
        cargo: "Gerente de Comunicación",
        estado: "Rechazado",
        fechaFirma: "20/02/2024",
        esActual: false,
      },
    ],
    adjuntos: [
      "certificado-medico.pdf",
      "solicitud-licencia.pdf"
    ]
  },
  {
    id: 11,
    numero: "SOL-2024-7011",
    tipo: "Cambio de datos",
    tipoSolicitante: "Empleado",
    asunto: "Actualización de datos personales",
    descripcion:
      "Solicito actualización de mi dirección y teléfono en el sistema de RRHH.",
    fecha: "20/02/2024",
    estado: "Cancelada",
    ultimaActualizacion: "21/02/2024",
    solicitante: "Sofía Ramírez",
    departamento: "Prensa",
    correo: "sofia.ramirez@empresa.com",
    asignacion: "Ana García",
    tipoDato: "Datos personales",
    comentarios: [
      "20/02/2024 - Sistema: Solicitud creada",
      "21/02/2024 - Sofía Ramírez: Solicitud cancelada por el empleado",
    ],
    firmantes: [
      {
        id: 1,
        nombre: "Ana García",
        cargo: "Jefa de Prensa",
        estado: "En espera",
        esActual: false,
      },
    ],
    adjuntos: [
      "solicitud-cambio-datos.pdf",
      "documentacion-nueva.pdf"
    ]
  },
]

export default function DetalleSolicitudEmpleadoPrensaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  
  // Buscar la solicitud según el ID
  const solicitud = solicitudesEmpleados.find(s => s.id === parseInt(resolvedParams.id)) || solicitudesEmpleados[0]

  return (
    <DetallesSolicitudMiBuzon
      solicitud={solicitud}
      urlRetorno="/empleado-prensa/gestion/mi-buzon/solicitudes"
      usuarioActual="Ana García"
      tituloModulo="Detalle de Solicitud de Empleado - Prensa"
    />
  )
}

