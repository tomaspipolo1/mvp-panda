"use client"

import { useState, useEffect } from "react"
import { CalendarioActividadesEventosLayout } from "@/components/eventos/calendario-actividades-eventos-layout"
import type { ActividadEvento } from "@/components/eventos/types-calendario"
import { parseStoredEventos } from "@/lib/calendario-eventos-storage"

const STORAGE_KEY = "eventos-seguridad"

const currentYear = 2025
const currentMonth = 5 // junio
const getDate = (day: number, hour = 0, minute = 0) => new Date(currentYear, currentMonth, day, hour, minute)

const eventosEjemplo: ActividadEvento[] = [
  { id: 1, titulo: "Simulacro de emergencia portuaria", descripcion: "Simulacro de emergencia con evacuación de instalaciones y coordinación con bomberos y servicios de emergencia.", fecha: getDate(5, 9, 0), fechaInicio: getDate(5, 9, 0), horaInicio: "09:00", fechaFin: getDate(5, 12, 0), horaFin: "12:00", ubicacion: "Instalaciones Portuarias - Zona de Emergencia", tipo: "simulacro", estado: "pendiente", tipoItem: "actividad" },
  { id: 2, titulo: "Capacitación: Nuevos protocolos de seguridad", descripcion: "Capacitación sobre nuevos protocolos de seguridad, control de accesos y procedimientos de emergencia actualizados.", fecha: getDate(8, 10, 30), fechaInicio: getDate(8, 10, 30), horaInicio: "10:30", fechaFin: getDate(8, 15, 30), horaFin: "15:30", ubicacion: "Aula de Capacitación - Edificio Seguridad", tipo: "capacitacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 3, titulo: "Inspección de sistemas de vigilancia", descripcion: "Inspección y mantenimiento preventivo de cámaras de seguridad, sistemas de monitoreo y equipos de comunicación.", fecha: getDate(12, 14, 0), fechaInicio: getDate(12, 14, 0), horaInicio: "14:00", fechaFin: getDate(12, 18, 0), horaFin: "18:00", ubicacion: "Centro de Control - Torre de Vigilancia", tipo: "inspeccion", estado: "pendiente", tipoItem: "actividad" },
  { id: 4, titulo: "Reunión con fuerzas de seguridad", descripcion: "Reunión de coordinación mensual con Prefectura Naval, Policía Federal y Gendarmería para revisar protocolos conjuntos.", fecha: getDate(15, 11, 0), fechaInicio: getDate(15, 11, 0), horaInicio: "11:00", fechaFin: getDate(15, 13, 0), horaFin: "13:00", ubicacion: "Sala de Coordinación Interinstitucional", tipo: "reunion", estado: "pendiente", tipoItem: "actividad" },
  { id: 5, titulo: "Auditoría de seguridad ISPS", descripcion: "Auditoría del código internacional para la protección de buques e instalaciones portuarias (Código ISPS).", fecha: getDate(18, 9, 30), fechaInicio: getDate(18, 9, 30), horaInicio: "09:30", fechaFin: getDate(18, 16, 30), horaFin: "16:30", ubicacion: "Oficina ISPS - Edificio Administrativo", tipo: "auditoria", estado: "pendiente", tipoItem: "actividad" },
  { id: 6, titulo: "Entrenamiento de respuesta a incidentes", descripcion: "Entrenamiento del equipo de respuesta rápida ante incidentes de seguridad, incluyendo simulacros prácticos.", fecha: getDate(22, 10, 0), fechaInicio: getDate(22, 10, 0), horaInicio: "10:00", fechaFin: getDate(22, 16, 0), horaFin: "16:00", ubicacion: "Campo de Entrenamiento - Zona Operativa", tipo: "entrenamiento", estado: "pendiente", tipoItem: "actividad" },
  { id: 7, titulo: "Control de acceso - Evento especial cruceros", descripcion: "Operativo especial de control de accesos para temporada alta de cruceros con protocolos reforzados de seguridad.", fecha: getDate(25, 15, 30), fechaInicio: getDate(25, 15, 30), horaInicio: "15:30", fechaFin: getDate(25, 20, 30), horaFin: "20:30", ubicacion: "Terminal de Cruceros - Accesos Principales", tipo: "control", estado: "pendiente", tipoItem: "actividad" },
  { id: 8, titulo: "Revisión mensual de incidentes", descripcion: "Revisión mensual de incidentes de seguridad, análisis de causas y propuestas de mejoras en los protocolos.", fecha: getDate(28, 13, 0), fechaInicio: getDate(28, 13, 0), horaInicio: "13:00", fechaFin: getDate(28, 15, 0), horaFin: "15:00", ubicacion: "Oficina Jefatura de Seguridad", tipo: "revision", estado: "pendiente", tipoItem: "actividad" },
]

export default function CalendarioEventosSeguridadPage() {
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
