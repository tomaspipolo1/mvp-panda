// Tipos de flujos disponibles
export const TIPOS_FLUJOS = {
  SOLICITUDES: [
    { id: "consulta", nombre: "Solicitud de Consulta" },
    { id: "redeterminacion", nombre: "Solicitud de Redeterminación" },
    { id: "inscripcion", nombre: "Solicitud de Inscripción" },
    { id: "reinscripcion", nombre: "Solicitud de Reinscripción" },
    { id: "modificacion", nombre: "Solicitud de Modificación" },
    { id: "baja", nombre: "Solicitud de Baja" },
  ],
  VISITAS: [
    { id: "acceso-obra", nombre: "Visita de Acceso a Obra" },
    { id: "mantenimiento", nombre: "Visita de Mantenimiento" },
    { id: "muelles", nombre: "Visita a Muelles" },
    { id: "eventos", nombre: "Visita a Eventos" },
    { id: "inspeccion", nombre: "Visita de Inspección" },
  ],
  ALTAS: [
    { id: "alta-proveedor", nombre: "Alta proveedor" },
    { id: "alta-cliente", nombre: "Alta cliente" },
    { id: "alta-esp", nombre: "Alta empresa de servicios portuarios" },
  ],
  EVENTOS: [
    { id: "evento-interno", nombre: "Evento interno" },
    { id: "evento-externo", nombre: "Evento externo" },
  ],
  TRAMITES: [
    { id: "dia-tramite", nombre: "Día de trámite" },
    { id: "licencia-medica", nombre: "Licencia Médica" },
    { id: "licencia-ordinaria-anual", nombre: "Licencia ordinaria anual" },
    { id: "licencia-paternidad", nombre: "Licencia por Paternidad" },
    { id: "licencia-maternidad", nombre: "Licencia por Maternidad" },
    { id: "solicitud-prestamo", nombre: "Solicitud de préstamo" },
    { id: "solicitud-recibo-sueldo", nombre: "Solicitud de recibo de sueldo" },
  ],
} as const

export type CategoriaFlujo = keyof typeof TIPOS_FLUJOS

export type TipoFlujo = {
  categoria: CategoriaFlujo
  id: string
  nombre: string
}

export type Aprobador = {
  id: string
  rol: string
  cargo: string
  usuarioId?: string
  usuarioNombre?: string
  orden: number
  esDepartamento?: boolean // Si es true, va al buzón del departamento en lugar de usuario específico
  departamento?: string // Nombre del departamento (ej: "Compras/Ingeniería", "Seguridad")
}

export type FlujoAprobacion = {
  id: string
  nombre: string
  tipo: TipoFlujo
  descripcion?: string
  activo: boolean
  aprobadores: Aprobador[]
  fechaCreacion: string
  fechaActualizacion: string
}

