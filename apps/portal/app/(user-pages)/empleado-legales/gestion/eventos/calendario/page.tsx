"use client"

import { useState, useEffect } from "react"
import { CalendarioActividadesEventosLayout } from "@/components/eventos/calendario-actividades-eventos-layout"
import type { ActividadEvento } from "@/components/eventos/types-calendario"
import { parseStoredEventos } from "@/lib/calendario-eventos-storage"

const STORAGE_KEY = "eventos-legales"

const eventosEjemplo: ActividadEvento[] = [
  { id: 1, titulo: "Reunión con Proveedor ABC", descripcion: "Evaluación de nueva propuesta comercial para suministros de oficina. Revisión de precios, condiciones de pago y tiempos de entrega.", fecha: new Date(2025, 5, 10, 9, 0), fechaInicio: new Date(2025, 5, 10, 9, 0), horaInicio: "09:00", fechaFin: new Date(2025, 5, 10, 10, 30), horaFin: "10:30", ubicacion: "Sala de Reuniones - Piso 3", tipo: "reunion_proveedor", estado: "pendiente", tipoItem: "actividad" },
  { id: 2, titulo: "Evaluación Licitación #2025-001", descripcion: "Análisis y evaluación de ofertas recibidas para la licitación de equipos de seguridad portuaria.", fecha: new Date(2025, 5, 12, 14, 0), fechaInicio: new Date(2025, 5, 12, 14, 0), horaInicio: "14:00", fechaFin: new Date(2025, 5, 12, 17, 0), horaFin: "17:00", ubicacion: "Sala de Evaluaciones", tipo: "evaluacion", estado: "en_curso", tipoItem: "actividad" },
  { id: 3, titulo: "Presentación Nuevos Productos", descripcion: "Presentación de nuevos equipos de manipulación de carga por parte de la empresa TechPort Solutions.", fecha: new Date(2025, 5, 15, 10, 0), fechaInicio: new Date(2025, 5, 15, 10, 0), horaInicio: "10:00", fechaFin: new Date(2025, 5, 15, 12, 0), horaFin: "12:00", ubicacion: "Auditorio Principal", tipo: "presentacion", estado: "finalizado", tipoItem: "actividad" },
  { id: 4, titulo: "Auditoría Proveedor XYZ", descripcion: "Auditoría de calidad y cumplimiento de estándares del proveedor XYZ para servicios de mantenimiento.", fecha: new Date(2025, 5, 18, 8, 30), fechaInicio: new Date(2025, 5, 18, 8, 30), horaInicio: "08:30", fechaFin: new Date(2025, 5, 18, 16, 0), horaFin: "16:00", ubicacion: "Instalaciones Proveedor XYZ", tipo: "auditoria", estado: "en_curso", tipoItem: "actividad" },
  { id: 5, titulo: "Capacitación Normativas de Compras", descripcion: "Capacitación sobre nuevas normativas y procedimientos de compras públicas.", fecha: new Date(2025, 5, 20, 9, 0), fechaInicio: new Date(2025, 5, 20, 9, 0), horaInicio: "09:00", fechaFin: new Date(2025, 5, 20, 17, 0), horaFin: "17:00", ubicacion: "Centro de Capacitación", tipo: "capacitacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 6, titulo: "Reunión Mensual Equipo Compras", descripcion: "Reunión mensual para revisar indicadores, objetivos y planificación de actividades.", fecha: new Date(2025, 5, 25, 15, 0), fechaInicio: new Date(2025, 5, 25, 15, 0), horaInicio: "15:00", fechaFin: new Date(2025, 5, 25, 16, 30), horaFin: "16:30", ubicacion: "Sala de Reuniones Compras", tipo: "reunion_equipo", estado: "pendiente", tipoItem: "actividad" },
  { id: 7, titulo: "Negociación Contrato Anual", descripcion: "Negociación de contrato anual para suministro de combustibles y lubricantes.", fecha: new Date(2025, 5, 28, 10, 0), fechaInicio: new Date(2025, 5, 28, 10, 0), horaInicio: "10:00", fechaFin: new Date(2025, 5, 28, 15, 0), horaFin: "15:00", ubicacion: "Sala de Negociaciones", tipo: "negociacion", estado: "finalizado", tipoItem: "actividad" },
]

export default function CalendarioEventosLegalesPage() {
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
