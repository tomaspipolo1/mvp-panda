// Tipos compartidos para el legajo de empleado

export type Direccion = {
  id: number
  tipo: string
  calle: string
  numero: string
  piso?: string
  departamento?: string
  codigoPostal: string
  localidad: string
  provincia: string
  comentarios?: string
}

export type Conyuge = {
  nombreCompleto: string
  dni: string
  fechaNacimiento: string
}

export type Hijo = {
  nombreCompleto: string
  dni: string
  fechaNacimiento: string
}

export type Empleado = {
  id: number
  nombre: string
  apellido: string
  dni: string
  cuil: string
  fechaNacimiento: string
  sexo: string
  nacionalidad?: string
  estadoCivil?: string
  grupoSanguineo?: string
  hijos?: boolean
  conyuge?: Conyuge
  hijosDatos?: Hijo[]
  legajo: string
  fechaIngreso: string
  gerencia: string
  departamento: string
  cargo: string
  estado: string
  email: string
  telefono: string
  telefonoEmpresa?: string
  telefonoEmergencia?: string
  contactoEmergencia?: string
  direcciones: Direccion[]
  avatar?: string
  imagen?: string // Nueva propiedad para foto/selfie
}

export type LicenciaOrdinaria = {
  periodo: number
  dias: number
}

export type DiaTramite = {
  dias: number
}

// Funciones de utilidad
export function calcularEdad(fechaNacimiento: string): number {
  const hoy = new Date()
  const fechaNac = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - fechaNac.getFullYear()
  const mes = hoy.getMonth() - fechaNac.getMonth()

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--
  }

  return edad
}

export function formatearFecha(fecha: string): string {
  const opciones: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" }
  return new Date(fecha).toLocaleDateString("es-AR", opciones)
}

export function calcularAntiguedad(fechaIngreso: string): number {
  const hoy = new Date()
  const ingreso = new Date(fechaIngreso)
  let antiguedad = hoy.getFullYear() - ingreso.getFullYear()
  const mes = hoy.getMonth() - ingreso.getMonth()

  if (mes < 0 || (mes === 0 && hoy.getDate() < ingreso.getDate())) {
    antiguedad--
  }

  return antiguedad
}
