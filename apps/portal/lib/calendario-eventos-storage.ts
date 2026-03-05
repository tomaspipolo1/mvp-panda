import type { ActividadEvento } from "@/components/eventos/types-calendario"

/**
 * Parsea un string de localStorage a ActividadEvento[] con IDs numéricos válidos.
 * @param stored - JSON string del localStorage
 * @param baseMaxId - ID máximo de los eventos de ejemplo (para asignar IDs a custom sin colisión)
 */
export function parseStoredEventos(stored: string, baseMaxId: number): ActividadEvento[] {
  try {
    const parsed = JSON.parse(stored) as Record<string, unknown>[]
    let nextCustomId = baseMaxId + 1
    return parsed.map((e) => {
      const numId = Number(e.id)
      const id = Number.isFinite(numId) ? numId : nextCustomId++
      return {
        ...e,
        id,
        fecha: new Date(e.fecha as string),
        fechaInicio: new Date(e.fechaInicio as string),
        fechaFin: e.fechaFin ? new Date(e.fechaFin as string) : undefined,
      }
    }) as ActividadEvento[]
  } catch {
    return []
  }
}
