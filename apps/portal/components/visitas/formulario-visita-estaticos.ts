/**
 * Valores estáticos del formulario de nueva visita.
 * Única fuente de datos para todos los selects; las páginas pueden sobreescribir vía configuracion.
 */

export const OPCIONES_DESTINO_DEFAULT = [
  "Areneras",
  "Terminal TEC Plata",
  "Copetro",
  "Deposito Fiscal",
  "PLP - Oficinas Administrativas",
  "Zona Operativa/Muelles",
  "PLP - Pañol/Deposito",
  "PLP - Obras e Ingenieria",
  "PLP - Taller de herreria",
  "PLP - Taller de Locomotoras",
]

export const SITIOS_MUELLE_DEFAULT = Array.from({ length: 22 }, (_, i) => `Sitio ${i + 1}`)

export const OPCIONES_DESTINO_MAP_DEFAULT: Record<string, string[]> = {
  default: OPCIONES_DESTINO_DEFAULT,
  Laboral: OPCIONES_DESTINO_DEFAULT,
  Guiada: OPCIONES_DESTINO_DEFAULT,
  "Transporte Cargas": OPCIONES_DESTINO_DEFAULT,
  Evento: OPCIONES_DESTINO_DEFAULT,
  "Obras/Mantenimiento": [],
  "Servicio a buques": [],
}

export const TIPOS_OPERACION = ["Descarga", "Carga", "Carga y Descarga"]

export const TIPOS_CARGA = [
  "Granel",
  "Liquida",
  "Gases",
  "Contenedores",
  "Paquetes",
  "Materiales de Construcción",
  "Maquinaria",
  "Otro",
]

export const TIPOS_ACTIVIDAD = ["Obras", "Mantenimiento"]

export const ACTIVIDADES_OBRAS = [
  "Construcción",
  "Movimiento de suelos",
  "Demolición",
  "Instalaciones",
  "Estructuras metálicas",
]

export const ACTIVIDADES_MANTENIMIENTO = [
  "Corte de pasto",
  "Limpieza",
  "Electricidad",
  "Plomería",
  "Pintura",
  "Reparaciones generales",
]

export const TIPOS_CONTRATACION = ["Licitación", "Directa"]

export const PERSONAS_RESPONSABLES = [
  "Adrian Monticelli",
  "Aquiles Ruiz",
  "Facundo Fiorino",
  "Julian Pertierra",
]

export const TIPOS_VEHICULO = ["Auto", "Camioneta", "Camión", "Utilitario", "Moto", "Acoplado"]

export const DEPARTAMENTOS_RESPONSABLES = [
  "Contable",
  "Compras",
  "Obras",
  "Seguridad",
  "Operaciones",
  "Sistemas",
]

export const CATEGORIAS_LICENCIA = [
  "A.1", "A.2", "A.3", "A.4", "A.5",
  "B.1", "B.2",
  "C.1", "C.2",
  "D.1", "D.2", "D.3",
  "E.1", "E.2",
  "F",
  "G.1", "G.2", "G.3",
]
