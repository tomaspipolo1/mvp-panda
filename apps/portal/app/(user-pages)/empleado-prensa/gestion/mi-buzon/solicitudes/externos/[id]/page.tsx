"use client"

import { use } from "react"
import DetallesSolicitudMiBuzon, { SolicitudEmpleado } from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Datos de ejemplo para solicitudes externas de prensa (Proveedores, Clientes, medios, etc.)
const solicitudesExternas: SolicitudEmpleado[] = [
  {
    id: 1,
    numero: "SOL-2024-7001",
    tipo: "Consulta",
    tipoSolicitante: "Proveedor",
    asunto: "Solicitud de Entrevista - Nuevas Inversiones Portuarias",
    descripcion:
      "Solicitamos una entrevista con el Director del Puerto para cubrir las nuevas inversiones en infraestructura portuaria anunciadas para 2024.",
    fecha: "10/02/2024",
    estado: "Resuelta",
    ultimaActualizacion: "15/02/2024",
    solicitante: "Diario La Nación",
    departamento: "Prensa",
    correo: "prensa@lanacion.com.ar",
    asignacion: "Ana García",
    comentarios: [
      "10/02/2024 - Sistema: Solicitud creada",
      "10/02/2024 - Diario La Nación: Adjunta preguntas de la entrevista",
    ],
    firmantes: [],
    adjuntos: [
      "preguntas-entrevista.pdf",
      "acreditacion-periodista.pdf"
    ]
  },
  {
    id: 2,
    numero: "SOL-2024-7002",
    tipo: "Tramite",
    tipoSolicitante: "Proveedor",
    asunto: "Cobertura Especial - Llegada de Cruceros",
    descripcion:
      "Solicitamos autorización para realizar cobertura especial de la temporada de cruceros 2024. Necesitamos acceso a muelles y entrevistas.",
    fecha: "11/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "11/02/2024",
    solicitante: "Canal 7 Televisión",
    departamento: "Prensa",
    correo: "produccion@canal7.com",
    asignacion: "Carlos López",
    comentarios: [
      "11/02/2024 - Sistema: Solicitud creada",
    ],
    firmantes: [],
    adjuntos: [
      "propuesta-cobertura.pdf",
      "acreditaciones-equipo.pdf"
    ]
  },
  {
    id: 3,
    numero: "SOL-2024-7003",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Información sobre Estadísticas Portuarias",
    descripcion:
      "Solicitamos información actualizada sobre estadísticas de movimiento de cargas y pasajeros para programa especial sobre el puerto.",
    fecha: "12/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "12/02/2024",
    solicitante: "Radio Continental",
    departamento: "Prensa",
    correo: "info@radiocontinental.com",
    asignacion: "Ana García",
    comentarios: [
      "12/02/2024 - Sistema: Solicitud creada",
      "12/02/2024 - Ana García: Información confidencial - Rechazada",
    ],
    firmantes: [],
    adjuntos: [
      "solicitud-informacion.pdf"
    ]
  },
  {
    id: 4,
    numero: "SOL-2024-7004",
    tipo: "Documentación",
    tipoSolicitante: "Proveedor",
    asunto: "Solicitud de Material Audiovisual",
    descripcion:
      "Solicitamos acceso al archivo de material audiovisual del puerto para un documental sobre la historia marítima de la ciudad.",
    fecha: "13/02/2024",
    estado: "Aprobada",
    ultimaActualizacion: "14/02/2024",
    solicitante: "Productora Dock Films",
    departamento: "Prensa",
    correo: "contacto@dockfilms.com",
    asignacion: "Roberto Silva",
    comentarios: [
      "13/02/2024 - Sistema: Solicitud creada",
      "14/02/2024 - Roberto Silva: Aprobada con restricciones de uso",
    ],
    firmantes: [],
    adjuntos: [
      "propuesta-documental.pdf",
      "contrato-uso-material.pdf"
    ]
  },
  {
    id: 5,
    numero: "SOL-2024-7005",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Conferencia de Prensa - Nuevos Servicios",
    descripcion:
      "Solicitamos información sobre la próxima conferencia de prensa para anunciar los nuevos servicios de transporte de contenedores refrigerados.",
    fecha: "14/02/2024",
    estado: "Resuelta",
    ultimaActualizacion: "15/02/2024",
    solicitante: "Agencia EFE",
    departamento: "Prensa",
    correo: "argentina@efe.com",
    asignacion: "Ana García",
    comentarios: [
      "14/02/2024 - Sistema: Solicitud creada",
      "15/02/2024 - Ana García: Invitación enviada - Resuelta",
    ],
    firmantes: [],
    adjuntos: [
      "acreditacion-agencia.pdf"
    ]
  },
]

export default function DetalleSolicitudExternosPrensaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  
  // Buscar la solicitud según el ID
  const solicitud = solicitudesExternas.find(s => s.id === parseInt(resolvedParams.id)) || solicitudesExternas[0]

  return (
    <DetallesSolicitudMiBuzon
      solicitud={solicitud}
      urlRetorno="/empleado-prensa/gestion/mi-buzon/solicitudes"
      usuarioActual="Ana García"
      tituloModulo="Detalle de Solicitud Externa - Prensa"
    />
  )
}

