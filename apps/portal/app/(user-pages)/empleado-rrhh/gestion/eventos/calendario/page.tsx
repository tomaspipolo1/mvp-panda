"use client"

import { useState, useEffect } from "react"
import { CalendarioActividadesEventosLayout } from "@/components/eventos/calendario-actividades-eventos-layout"
import type { ActividadEvento } from "@/components/eventos/types-calendario"
import { parseStoredEventos } from "@/lib/calendario-eventos-storage"

const STORAGE_KEY = "eventos-rrhh"

const eventosEjemplo: ActividadEvento[] = [
  { id: 1, titulo: "Entrevistas Nuevos Candidatos", descripcion: "Entrevistas para cubrir vacantes en el departamento de operaciones portuarias. Se evaluarán 5 candidatos preseleccionados.", fecha: new Date(2025, 5, 10, 9, 0), fechaInicio: new Date(2025, 5, 10, 9, 0), horaInicio: "09:00", fechaFin: new Date(2025, 5, 10, 14, 30), horaFin: "14:30", ubicacion: "Sala de Reuniones - RRHH", tipo: "entrevista", estado: "pendiente", tipoItem: "actividad" },
  { id: 2, titulo: "Capacitación Seguridad Laboral", descripcion: "Capacitación obligatoria sobre nuevos protocolos de seguridad para personal de muelles y almacenes.", fecha: new Date(2025, 5, 12, 14, 0), fechaInicio: new Date(2025, 5, 12, 14, 0), horaInicio: "14:00", fechaFin: new Date(2025, 5, 12, 17, 0), horaFin: "17:00", ubicacion: "Salón Auditorio - Planta Baja", tipo: "capacitacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 3, titulo: "Evaluación de Desempeño Trimestral", descripcion: "Revisión de objetivos y evaluación de desempeño del personal administrativo.", fecha: new Date(2025, 5, 15, 10, 0), fechaInicio: new Date(2025, 5, 15, 10, 0), horaInicio: "10:00", fechaFin: new Date(2025, 5, 15, 18, 0), horaFin: "18:00", ubicacion: "Oficina de RRHH - Sector Evaluaciones", tipo: "evaluacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 4, titulo: "Inducción Nuevos Empleados", descripcion: "Jornada de inducción para el personal recientemente incorporado a la empresa.", fecha: new Date(2025, 5, 18, 8, 30), fechaInicio: new Date(2025, 5, 18, 8, 30), horaInicio: "08:30", fechaFin: new Date(2025, 5, 18, 16, 0), horaFin: "16:00", ubicacion: "Sala de Capacitación - Edificio Administrativo", tipo: "induccion", estado: "pendiente", tipoItem: "actividad" },
  { id: 5, titulo: "Taller Clima Laboral", descripcion: "Taller para mejorar el clima laboral y la comunicación entre departamentos.", fecha: new Date(2025, 5, 20, 9, 0), fechaInicio: new Date(2025, 5, 20, 9, 0), horaInicio: "09:00", fechaFin: new Date(2025, 5, 20, 13, 0), horaFin: "13:00", ubicacion: "Salón Auditorio - Planta Baja", tipo: "taller", estado: "pendiente", tipoItem: "actividad" },
  { id: 6, titulo: "Reunión Comité de Convivencia", descripcion: "Reunión mensual del comité de convivencia para tratar casos y propuestas de mejora.", fecha: new Date(2025, 5, 25, 15, 0), fechaInicio: new Date(2025, 5, 25, 15, 0), horaInicio: "15:00", fechaFin: new Date(2025, 5, 25, 16, 30), horaFin: "16:30", ubicacion: "Sala de Reuniones - Presidencia", tipo: "reunion_comite", estado: "pendiente", tipoItem: "actividad" },
  { id: 7, titulo: "Jornada de Bienestar", descripcion: "Actividades de bienestar para empleados: chequeos médicos, actividades recreativas y charlas de salud.", fecha: new Date(2025, 5, 28, 8, 0), fechaInicio: new Date(2025, 5, 28, 8, 0), horaInicio: "08:00", fechaFin: new Date(2025, 5, 28, 17, 0), horaFin: "17:00", ubicacion: "Terminal Portuaria - Área Recreativa", tipo: "bienestar", estado: "pendiente", tipoItem: "actividad" },
]

export default function CalendarioEventosRRHHPage() {
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
    />
  )
}
