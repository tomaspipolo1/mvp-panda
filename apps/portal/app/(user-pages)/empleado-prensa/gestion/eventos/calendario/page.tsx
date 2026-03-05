"use client"

import { useState, useEffect } from "react"
import { CalendarioActividadesEventosLayout } from "@/components/eventos/calendario-actividades-eventos-layout"
import type { ActividadEvento } from "@/components/eventos/types-calendario"
import { parseStoredEventos } from "@/lib/calendario-eventos-storage"

const STORAGE_KEY = "eventos-prensa"

// Prensa: único rol que muestra tab Eventos. Los de ejemplo son actividades; el usuario puede crear eventos desde el tab.
const eventosEjemplo: ActividadEvento[] = [
  { id: 1, titulo: "Conferencia de Prensa Puerto", descripcion: "Conferencia de prensa sobre las nuevas inversiones en infraestructura portuaria y proyectos de modernización.", fecha: new Date(2025, 5, 3, 9, 0), fechaInicio: new Date(2025, 5, 3, 9, 0), horaInicio: "09:00", fechaFin: new Date(2025, 5, 3, 11, 0), horaFin: "11:00", ubicacion: "Sala de Prensa Principal - Puerto La Plata", tipo: "conferencia", estado: "pendiente", tipoItem: "actividad" },
  { id: 2, titulo: "Entrevista Director Ejecutivo", descripcion: "Entrevista exclusiva con el Director Ejecutivo sobre los resultados del primer trimestre y planes futuros.", fecha: new Date(2025, 5, 5, 14, 0), fechaInicio: new Date(2025, 5, 5, 14, 0), horaInicio: "14:00", fechaFin: new Date(2025, 5, 5, 15, 30), horaFin: "15:30", ubicacion: "Oficina Dirección Ejecutiva", tipo: "entrevista", estado: "en_curso", tipoItem: "actividad" },
  { id: 3, titulo: "Cobertura Llegada Crucero", descripcion: "Cobertura mediática de la llegada del crucero de lujo con 3000 pasajeros al Puerto La Plata.", fecha: new Date(2025, 5, 7, 8, 0), fechaInicio: new Date(2025, 5, 7, 8, 0), horaInicio: "08:00", fechaFin: new Date(2025, 5, 7, 12, 0), horaFin: "12:00", ubicacion: "Muelle de Cruceros - Terminal Pasajeros", tipo: "cobertura", estado: "pendiente", tipoItem: "actividad" },
  { id: 4, titulo: "Reunión Comité Editorial", descripcion: "Reunión mensual del comité editorial para revisar contenidos y planificar próximas publicaciones.", fecha: new Date(2025, 5, 9, 10, 0), fechaInicio: new Date(2025, 5, 9, 10, 0), horaInicio: "10:00", fechaFin: new Date(2025, 5, 9, 12, 0), horaFin: "12:00", ubicacion: "Sala de Reuniones Prensa", tipo: "reunion", estado: "finalizado", tipoItem: "actividad" },
  { id: 5, titulo: "Presentación Informe Anual", descripcion: "Presentación del informe anual de actividades del puerto ante medios de comunicación.", fecha: new Date(2025, 5, 12, 16, 0), fechaInicio: new Date(2025, 5, 12, 16, 0), horaInicio: "16:00", fechaFin: new Date(2025, 5, 12, 18, 0), horaFin: "18:00", ubicacion: "Auditorio Principal", tipo: "presentacion", estado: "finalizado", tipoItem: "actividad" },
]

export default function CalendarioEventosPrensaPage() {
  const [items, setItems] = useState<ActividadEvento[]>([])

  useEffect(() => {
    const base = [...eventosEjemplo]
    const baseMaxId = base.length ? Math.max(...base.map((e) => e.id)) : 0
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    if (raw) {
      const custom = parseStoredEventos(raw, baseMaxId)
      setItems([...base, ...custom])
    } else {
      setItems(base)
    }
  }, [])

  const handleItemsChange = (newItems: ActividadEvento[]) => {
    setItems(newItems)
    const custom = newItems.filter((e) => !eventosEjemplo.some((ex) => ex.id === e.id))
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(custom))
    }
  }

  return (
    <CalendarioActividadesEventosLayout
      items={items}
      onItemsChange={handleItemsChange}
      mostrarTabEventos
    />
  )
}
