// Tipos y interfaces compartidas para el formulario de nueva visita

export interface Persona {
  id: string
  nombre: string
  documento: string
  empresa: string
  telefono?: string
  correo?: string
  responsable?: boolean
  licenciaConducir?: File | null
  numeroLicencia?: string
  categorias?: string[]
  fechaVencimientoLicencia?: Date | undefined
}

export interface Vehiculo {
  id: string
  tipo: string
  patente: string
  marca?: string
  modelo?: string
  seguro?: File | null
  cedulaVerde?: File | null
  titular?: string
  conductorNoTitular?: boolean
  cedulaAzul?: File | null
  certificadoSeguridad?: File | null
  fechaVencimientoSeguro?: Date | undefined
}

export interface Documento {
  id: string
  nombre: string
  archivo: File
  tipo: string
}

export interface Evento {
  id: string
  nombre: string
  fechaDesde: Date
  fechaHasta: Date
  horaDesde: string
  horaHasta: string
}

export interface ConductorCargado {
  id: number
  nombre: string
  dni: string
  telefono?: string
  email?: string
  numeroLicencia: string
  categorias: string[]
  licencia?: string
  fechaVencimientoLicencia?: string
}

export interface VehiculoCargado {
  id: number
  tipo: string
  patente: string
  marca?: string
  modelo?: string
  seguro?: string
  fechaVencimientoSeguro?: string
}

export interface PersonalCargado {
  id: number
  nombreCompleto: string
  dni: string
  telefono?: string
}

export type TipoUsuario =
  | "usuario-basico"
  | "proveedor"
  | "cliente"
  | "empresa-servicios-portuarios"
  | "empleado-compras"
  | "empleado-seguridad"
  | "empleado-prensa"
  | "empleado-contable"
  | "empleado-rrhh"
  | "empleado-legales"
  | "empleado-gerente"

export interface ProveedorRegistrado {
  id: number
  razonSocial: string
  cuit: string
  email: string
  telefono: string
  activo: boolean
}

export interface ConfiguracionFormularioVisita {
  tipoUsuario: TipoUsuario
  tiposVisita: string[]
  /** Opcional: si no se pasa, el formulario usa destinos y sitios por defecto definidos en el componente */
  opcionesDestino?: Record<string, string[]>
  eventosDisponibles?: Evento[]
  tiposCarga?: string[]
  tiposOperacion?: string[]
  tiposActividad?: string[]
  actividadesObras?: string[]
  actividadesMantenimiento?: string[]
  tiposContratacion?: string[]
  personasResponsables?: string[]
  /** Opcional: si no se pasa, el formulario usa valores de formulario-visita-estaticos */
  tiposVehiculo?: string[]
  categoriasLicencia?: string[] // Solo necesario si se muestra el modal de nuevo conductor
  vehiculosCargados?: VehiculoCargado[]
  conductoresCargados?: ConductorCargado[]
  personalCargado?: PersonalCargado[]
  // Flags de características
  permiteEventos?: boolean
  permiteTransporteCargas?: boolean
  permiteObrasMantenimiento?: boolean
  permiteAccesoMuelle?: boolean
  permiteVisitaRecurrente?: boolean
  requierePersonalVisitaLaboral?: boolean
  muestraDocumentacion?: boolean
  muestraPersonaResponsable?: boolean
  autocompletadoPersonal?: boolean
  camposFechaEventosDeshabilitados?: boolean
  // Destinos múltiples, muelle, proveedor (cualquier rol que lo habilite)
  permiteDestinosMultiples?: boolean
  /** Opcional: si no se pasa, el formulario usa sitios por defecto definidos en el componente */
  sitiosMuelle?: string[]
  permiteSeccionProveedor?: boolean
  /** Tipos de visita en los que se muestra y exige sección proveedor (ej. ["Transporte Cargas"] o ["Transporte Cargas", "Obras/Mantenimiento"]) */
  tiposVisitaConProveedor?: string[]
  /** Si true, también se muestra/exige proveedor cuando acceso a muelle está marcado */
  mostrarProveedorConAccesoAMuelle?: boolean
  proveedoresRegistrados?: ProveedorRegistrado[]
  permiteAccesoAMuelleCheckbox?: boolean
  departamentosResponsables?: string[]
  /** Si true, mostrar campo teléfono en personas que asistirán */
  muestraCampoTelefonoPersona?: boolean
  /** Si true, mostrar campo empresa en personas que asistirán */
  muestraCampoEmpresaPersona?: boolean
}

export interface DatosFormularioVisita {
  tipoVisita: string
  destino: string
  eventoSeleccionado?: string
  personalVisita?: string
  operacion?: string
  tipoCarga?: string
  otroTipoCarga?: string
  empresaTransporte?: string
  transporteTerciarizado?: boolean
  tipoActividad?: string
  actividad?: string
  tipoContratacion?: string
  numeroExpediente?: string
  numeroOrdenCompra?: string
  personaResponsable?: string
  fechaDesde?: Date
  horaDesde: string
  fechaHasta?: Date
  horaHasta: string
  visitaRecurrente?: boolean
  diasSemana?: string[]
  personas: Persona[]
  vehiculos: Vehiculo[]
  documentos?: Documento[]
  observaciones: string
  // Empleado-compras
  destinosSeleccionados?: string[]
  accesoAMuelle?: boolean
  razonSocial?: string
  cuitProveedor?: string
  emailProveedor?: string
  telefonoProveedor?: string
  proveedorNoInscripto?: boolean
  departamentoResponsable?: string
}

