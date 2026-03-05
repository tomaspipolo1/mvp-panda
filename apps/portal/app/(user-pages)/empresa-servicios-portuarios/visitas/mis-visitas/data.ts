import type { ActionEvent } from "@/components/visitas/historial-acciones"

export interface VisitaEmpresaServicios {
  id: string | number
  numero?: string
  fecha: string
  hora: string
  tipo: string
  destino: string
  personas: number
  vehiculos?: number
  estado: string
  fechaInicio?: string
  fechaFin?: string
  horaInicio?: string
  horaFin?: string
  motivo?: string
  observaciones?: string
  personasDetalle?: Array<{
    id: string
    nombre: string
    documento: string
    empresa: string
    mail?: string
    telefono?: string
  }>
  vehiculosDetalle?: Array<{
    id: string
    tipo: string
    patente: string
    marca: string
    modelo: string
  }>
}

export const visitasEmpresaServicios: VisitaEmpresaServicios[] = [
  {
    id: "1",
    numero: "VIS-ESP-2024-001",
    fecha: "15/05/2024",
    hora: "10:00",
    tipo: "Acceso a muelle",
    destino: "Sitio 1",
    personas: 3,
    vehiculos: 1,
    estado: "Pendiente",
    motivo: "Entrega de suministros para embarque",
    fechaInicio: "15/05/2024",
    fechaFin: "15/05/2024",
    horaInicio: "10:00",
    horaFin: "14:00",
    personasDetalle: [
      { id: "p1", nombre: "Javier Romero", documento: "29.456.789", empresa: "Servicios Portuarios del Sur" },
      { id: "p2", nombre: "Laura Ibáñez", documento: "28.345.678", empresa: "Servicios Portuarios del Sur" },
    ],
    vehiculosDetalle: [
      { id: "v1", tipo: "Camioneta", patente: "AB123CD", marca: "Toyota", modelo: "Hilux" },
    ],
  },
  {
    id: "2",
    numero: "VIS-ESP-2024-002",
    fecha: "20/05/2024",
    hora: "14:30",
    tipo: "Obras",
    destino: "Planta principal",
    personas: 4,
    vehiculos: 1,
    estado: "Aprobada",
    motivo: "Supervisión de tareas de mantenimiento",
    fechaInicio: "20/05/2024",
    fechaFin: "20/05/2024",
    horaInicio: "14:30",
    horaFin: "18:00",
    personasDetalle: [
      { id: "p1", nombre: "Mariano Pérez", documento: "30.123.456", empresa: "Servicios Portuarios del Sur" },
      { id: "p2", nombre: "Ana Molina", documento: "31.987.654", empresa: "Servicios Portuarios del Sur" },
    ],
    vehiculosDetalle: [
      { id: "v1", tipo: "Utilitario", patente: "XY987ZT", marca: "Renault", modelo: "Kangoo" },
    ],
  },
  {
    id: "3",
    numero: "VIS-ESP-2024-003",
    fecha: "10/05/2024",
    hora: "09:15",
    tipo: "Evento",
    destino: "Auditorio central",
    personas: 6,
    vehiculos: 0,
    estado: "Finalizada",
    motivo: "Presentación de nuevo servicio logístico",
    fechaInicio: "10/05/2024",
    fechaFin: "10/05/2024",
    horaInicio: "09:15",
    horaFin: "12:00",
    personasDetalle: [
      { id: "p1", nombre: "Carla Ruiz", documento: "27.890.123", empresa: "Servicios Portuarios del Sur" },
      { id: "p2", nombre: "Fernando Díaz", documento: "28.765.432", empresa: "Servicios Portuarios del Sur" },
    ],
  },
  {
    id: "4",
    numero: "VIS-ESP-2024-004",
    fecha: "05/05/2024",
    hora: "11:45",
    tipo: "Acceso a muelle",
    destino: "Sitio 4",
    personas: 2,
    vehiculos: 1,
    estado: "Rechazada",
    motivo: "Ingreso de personal tercerizado sin acreditación",
    fechaInicio: "05/05/2024",
    fechaFin: "05/05/2024",
    horaInicio: "11:45",
    horaFin: "13:30",
    personasDetalle: [
      { id: "p1", nombre: "Bruno Maldonado", documento: "26.543.210", empresa: "Servicios Portuarios del Sur" },
    ],
    vehiculosDetalle: [
      { id: "v1", tipo: "Camioneta", patente: "JKL456", marca: "Ford", modelo: "Ranger" },
    ],
  },
  {
    id: "5",
    numero: "VIS-ESP-2024-005",
    fecha: "25/05/2024",
    hora: "15:00",
    tipo: "Mantenimiento",
    destino: "Zona operativa",
    personas: 5,
    vehiculos: 1,
    estado: "En curso",
    motivo: "Revisión de equipos de izaje",
    fechaInicio: "25/05/2024",
    fechaFin: "25/05/2024",
    horaInicio: "15:00",
    horaFin: "19:00",
    personasDetalle: [
      { id: "p1", nombre: "Sofía Herrera", documento: "32.123.456", empresa: "Servicios Portuarios del Sur" },
    ],
    vehiculosDetalle: [
      { id: "v1", tipo: "Camión", patente: "MN345OP", marca: "Mercedes-Benz", modelo: "Atego" },
    ],
  },
  {
    id: "6",
    numero: "VIS-ESP-2024-006",
    fecha: "28/05/2024",
    hora: "08:30",
    tipo: "Acceso a muelle",
    destino: "Sitio 6",
    personas: 2,
    vehiculos: 1,
    estado: "Cancelada",
    motivo: "Carga reprogramada por condiciones climáticas",
    fechaInicio: "28/05/2024",
    fechaFin: "28/05/2024",
    horaInicio: "08:30",
    horaFin: "11:00",
    personasDetalle: [
      { id: "p1", nombre: "Diego Giménez", documento: "29.222.333", empresa: "Servicios Portuarios del Sur" },
    ],
    vehiculosDetalle: [
      { id: "v1", tipo: "Camioneta", patente: "QR678ST", marca: "Volkswagen", modelo: "Amarok" },
    ],
  },
]

const stageConfigs: Record<
  "approved" | "rejected" | "cancelled" | "inCourse" | "finalized",
  { type: ActionEvent["type"]; message: string }
> = {
  approved: { type: "approved", message: "Solicitud aprobada" },
  rejected: { type: "rejected", message: "Solicitud rechazada" },
  cancelled: { type: "info", message: "Solicitud cancelada" },
  inCourse: { type: "info", message: "Solicitud en curso" },
  finalized: { type: "info", message: "Solicitud finalizada" },
}

export const buildHistorialEventos = (visita: { empresa?: string; visitante?: string; estado: string }): ActionEvent[] => {
  const detalleCreacion = [visita.empresa, visita.visitante].filter(Boolean).join(" - ") || undefined
  const normalizedEstado = visita.estado.toLowerCase()

  const eventos: ActionEvent[] = [
    {
      id: "evt-1",
      timestamp: "2024-01-05T09:00:00",
      type: "created",
      message: "Solicitud creada",
      actor: visita.visitante,
      detail: detalleCreacion,
    },
    {
      id: "evt-2",
      timestamp: "2024-01-05T10:30:00",
      type: "progress",
      message: "Solicitud en proceso",
      showActor: false,
    },
  ]

  const addStage = (config: { type: ActionEvent["type"]; message: string }) => {
    eventos.push({
      id: `evt-${eventos.length + 1}`,
      timestamp: `2024-01-05T${(8 + eventos.length).toString().padStart(2, "0")}:00:00`,
      ...config,
      showActor: false,
    })
  }

  if (normalizedEstado === "pendiente") return eventos
  if (normalizedEstado === "rechazada") {
    addStage(stageConfigs.rejected)
    return eventos
  }
  if (normalizedEstado === "cancelada") {
    addStage(stageConfigs.cancelled)
    return eventos
  }
  if (normalizedEstado === "aprobada" || normalizedEstado === "aceptada") {
    addStage(stageConfigs.approved)
    return eventos
  }
  if (normalizedEstado === "en curso") {
    addStage(stageConfigs.approved)
    addStage(stageConfigs.inCourse)
    return eventos
  }
  if (normalizedEstado === "finalizada" || normalizedEstado === "completada" || normalizedEstado === "realizada") {
    addStage(stageConfigs.approved)
    addStage(stageConfigs.inCourse)
    addStage(stageConfigs.finalized)
    return eventos
  }

  addStage({ type: "info", message: `Solicitud ${visita.estado}` })
  return eventos
}


