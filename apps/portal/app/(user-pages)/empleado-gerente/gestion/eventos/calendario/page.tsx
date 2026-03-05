"use client"

import { useState, useEffect } from "react"
import { CalendarioActividadesEventosLayout } from "@/components/eventos/calendario-actividades-eventos-layout"
import type { ActividadEvento } from "@/components/eventos/types-calendario"
import { parseStoredEventos } from "@/lib/calendario-eventos-storage"

const STORAGE_KEY = "eventos-gerente"

const eventosEjemplo: ActividadEvento[] = [
  { id: 1, titulo: "Reunión de Directorio", descripcion: "Reunión mensual del directorio para revisar resultados financieros, aprobar inversiones y tomar decisiones estratégicas para el puerto.", fecha: new Date(2025, 5, 5, 9, 0), fechaInicio: new Date(2025, 5, 5, 9, 0), horaInicio: "09:00", fechaFin: new Date(2025, 5, 5, 12, 0), horaFin: "12:00", ubicacion: "Sala de Reuniones - Presidencia", tipo: "directorio", estado: "pendiente", tipoItem: "actividad" },
  { id: 2, titulo: "Presentación Resultados Trimestrales", descripcion: "Presentación de resultados financieros y operativos del trimestre a los accionistas y stakeholders principales.", fecha: new Date(2025, 5, 8, 10, 30), fechaInicio: new Date(2025, 5, 8, 10, 30), horaInicio: "10:30", fechaFin: new Date(2025, 5, 8, 12, 30), horaFin: "12:30", ubicacion: "Salón Auditorio - Planta Baja", tipo: "presentacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 3, titulo: "Planificación Estratégica Anual", descripcion: "Sesión de planificación estratégica para definir objetivos, metas y proyectos prioritarios del próximo año fiscal.", fecha: new Date(2025, 5, 12, 14, 0), fechaInicio: new Date(2025, 5, 12, 14, 0), horaInicio: "14:00", fechaFin: new Date(2025, 5, 12, 18, 0), horaFin: "18:00", ubicacion: "Sala de Conferencias - Edificio Central", tipo: "planificacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 4, titulo: "Reunión con Sindicatos", descripcion: "Reunión de negociación colectiva con representantes sindicales para revisar condiciones laborales y beneficios.", fecha: new Date(2025, 5, 15, 11, 0), fechaInicio: new Date(2025, 5, 15, 11, 0), horaInicio: "11:00", fechaFin: new Date(2025, 5, 15, 15, 0), horaFin: "15:00", ubicacion: "Sala de Reuniones - Gerencia", tipo: "negociacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 5, titulo: "Visita de Autoridades Portuarias", descripcion: "Visita oficial de autoridades portuarias nacionales para inspección de instalaciones y evaluación de cumplimiento normativo.", fecha: new Date(2025, 5, 18, 9, 30), fechaInicio: new Date(2025, 5, 18, 9, 30), horaInicio: "09:30", fechaFin: new Date(2025, 5, 18, 16, 0), horaFin: "16:00", ubicacion: "Terminal Portuaria - Muelle Principal", tipo: "institucional", estado: "pendiente", tipoItem: "actividad" },
  { id: 6, titulo: "Comité Ejecutivo", descripcion: "Reunión semanal del comité ejecutivo para revisar operaciones diarias, tomar decisiones urgentes y coordinar actividades.", fecha: new Date(2025, 5, 22, 10, 0), fechaInicio: new Date(2025, 5, 22, 10, 0), horaInicio: "10:00", fechaFin: new Date(2025, 5, 22, 11, 30), horaFin: "11:30", ubicacion: "Oficina de Gerencia General", tipo: "comite", estado: "pendiente", tipoItem: "actividad" },
  { id: 7, titulo: "Evaluación de Inversiones", descripcion: "Evaluación de propuestas de inversión en infraestructura portuaria, equipamiento y tecnología para modernización.", fecha: new Date(2025, 5, 25, 15, 30), fechaInicio: new Date(2025, 5, 25, 15, 30), horaInicio: "15:30", fechaFin: new Date(2025, 5, 25, 17, 30), horaFin: "17:30", ubicacion: "Oficina de Planificación - Piso 2", tipo: "evaluacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 8, titulo: "Reunión con Clientes Estratégicos", descripcion: "Reunión con principales clientes del puerto para revisar servicios, negociar nuevos contratos y fortalecer relaciones comerciales.", fecha: new Date(2025, 5, 28, 13, 0), fechaInicio: new Date(2025, 5, 28, 13, 0), horaInicio: "13:00", fechaFin: new Date(2025, 5, 28, 16, 0), horaFin: "16:00", ubicacion: "Sala de Reuniones - Directorio", tipo: "comercial", estado: "pendiente", tipoItem: "actividad" },
]

export default function CalendarioEventosGerentePage() {
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
