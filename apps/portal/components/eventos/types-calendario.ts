/** Tipo de ítem para tabs Actividades / Eventos */
export type TipoItemCalendario = "actividad" | "evento"

export interface ParticipanteCalendario {
  id: number
  nombre: string
  documento: string
  empresa?: string
}

export interface ActividadEvento {
  id: number
  titulo: string
  descripcion?: string
  fecha: Date
  fechaInicio: Date
  horaInicio?: string
  fechaFin?: Date
  horaFin?: string
  ubicacion?: string
  participantes?: ParticipanteCalendario[]
  imagen?: string
  tipo: string
  color?: string
  estado: "pendiente" | "en_curso" | "finalizado"
  /** Para filtrar por tab: Actividades o Eventos */
  tipoItem?: TipoItemCalendario
}

export function estadoToLabel(estado: ActividadEvento["estado"]): string {
  switch (estado) {
    case "pendiente":
      return "Pendiente"
    case "en_curso":
      return "En curso"
    case "finalizado":
      return "Finalizado"
    default:
      return String(estado)
  }
}

export function estadoBadgeClass(estado: ActividadEvento["estado"]): string {
  switch (estado) {
    case "pendiente":
      return "bg-yellow-100 text-yellow-800"
    case "en_curso":
      return "bg-blue-100 text-blue-800"
    case "finalizado":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
