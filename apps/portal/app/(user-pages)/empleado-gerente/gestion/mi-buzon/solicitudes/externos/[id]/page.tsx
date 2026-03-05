

import { use } from "react"
import DetallesSolicitudMiBuzon, { SolicitudEmpleado } from "@/components/solicitudes/detalle-solicitud-mi-buzon"

// Datos de ejemplo para solicitudes externas de gerencia
const solicitudesExternas: SolicitudEmpleado[] = [
  {
    id: 1,
    numero: "SOL-2024-7001",
    tipo: "Consulta",
    tipoSolicitante: "Cliente",
    asunto: "Consulta sobre Expansión de Operaciones",
    descripcion: "Consultamos sobre las posibilidades de expansión de nuestras operaciones portuarias. Necesitamos evaluar factibilidad técnica y económica para aumentar nuestra capacidad de almacenamiento en un 40%.",
    fecha: "10/02/2024",
    estado: "Resuelta",
    ultimaActualizacion: "15/02/2024",
    solicitante: "Naviera del Atlántico S.A.",
    departamento: "Gerencia",
    correo: "contacto@navieraatlantico.com",
    asignacion: "Ricardo Fernández",
    adjuntos: ["propuesta_expansion.pdf", "planos_actuales.dwg"],
    comentarios: [
      "10/02/2024 - Sistema: Solicitud creada",
      "10/02/2024 - Naviera del Atlántico: Adjunta propuesta de expansión",
      "12/02/2024 - Ricardo Fernández: Revisando factibilidad técnica",
      "15/02/2024 - Ricardo Fernández: Solicitud resuelta. Se envió informe de factibilidad.",
    ],
  },
  {
    id: 2,
    numero: "SOL-2024-7002",
    tipo: "Reclamo",
    tipoSolicitante: "Proveedor",
    asunto: "Reclamo por Demora en Proceso de Licitación",
    descripcion: "Reclamamos la demora en el proceso de licitación N° LIC-2024-20. Los plazos establecidos han sido excedidos significativamente. La demora está afectando nuestra planificación de recursos y compromisos con otros proyectos.",
    fecha: "11/02/2024",
    estado: "En proceso",
    ultimaActualizacion: "11/02/2024",
    solicitante: "Construcciones Marítimas SRL",
    departamento: "Gerencia",
    correo: "contacto@construccionesmaritimas.com",
    asignacion: "Carlos López",
    adjuntos: ["documentacion_licitacion.pdf", "cronograma_original.xlsx"],
    comentarios: [
      "11/02/2024 - Sistema: Solicitud creada",
      "11/02/2024 - Construcciones Marítimas: Adjunta documentación de respaldo",
    ],
  },
  {
    id: 3,
    numero: "SOL-2024-7003",
    tipo: "Tramite",
    tipoSolicitante: "Cliente",
    asunto: "Solicitud de Renovación de Contrato Marco",
    descripcion: "Solicitamos la renovación del contrato marco de servicios portuarios que vence el 30/03/2024. Adjuntamos propuesta de condiciones actualizadas con nuevas tarifas y servicios adicionales.",
    fecha: "12/02/2024",
    estado: "Rechazada",
    ultimaActualizacion: "12/02/2024",
    solicitante: "Exportadora Regional Ltda.",
    departamento: "Gerencia",
    correo: "administracion@exportadoraregional.com",
    asignacion: "Ana Martínez",
    adjuntos: ["propuesta_renovacion.pdf", "contrato_actual.pdf"],
    comentarios: [
      "12/02/2024 - Sistema: Solicitud creada",
      "12/02/2024 - Ana Martínez: Propuesta rechazada. Las condiciones no se ajustan a la política vigente.",
    ],
  },
]

export default function DetalleSolicitudExternaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  
  // Buscar la solicitud por ID
  const solicitud = solicitudesExternas.find((s) => s.id === parseInt(id))

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
      tituloModulo="Detalle de Solicitud Externa"
    />
  )
}

