"use client"

import { useState, useEffect } from "react"
import { CalendarioActividadesEventosLayout } from "@/components/eventos/calendario-actividades-eventos-layout"
import type { ActividadEvento } from "@/components/eventos/types-calendario"
import { parseStoredEventos } from "@/lib/calendario-eventos-storage"

const STORAGE_KEY = "eventos-mesa-entradas"

const eventosEjemplo: ActividadEvento[] = [
  { id: 1, titulo: "Recepción de expedientes - Licitación Grúas", descripcion: "Recepción y registro de expedientes para la licitación de grúas portuarias. Verificación de documentación y cumplimiento de requisitos.", fecha: new Date(2025, 5, 5, 9, 0), fechaInicio: new Date(2025, 5, 5, 9, 0), horaInicio: "09:00", fechaFin: new Date(2025, 5, 5, 12, 0), horaFin: "12:00", ubicacion: "Mesa de Entradas Principal", tipo: "recepcion", estado: "pendiente", tipoItem: "actividad" },
  { id: 2, titulo: "Capacitación: Sistema de Gestión Documental", descripcion: "Capacitación sobre el nuevo sistema de gestión documental y archivo digital. Procedimientos de digitalización y clasificación.", fecha: new Date(2025, 5, 8, 10, 30), fechaInicio: new Date(2025, 5, 8, 10, 30), horaInicio: "10:30", fechaFin: new Date(2025, 5, 8, 16, 0), horaFin: "16:00", ubicacion: "Sala de Capacitación - Edificio Administrativo", tipo: "capacitacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 3, titulo: "Auditoría de archivo documental", descripcion: "Auditoría interna del archivo documental y verificación de expedientes. Control de calidad y cumplimiento normativo.", fecha: new Date(2025, 5, 12, 14, 0), fechaInicio: new Date(2025, 5, 12, 14, 0), horaInicio: "14:00", fechaFin: new Date(2025, 5, 12, 17, 0), horaFin: "17:00", ubicacion: "Archivo Central - Subsuelo", tipo: "auditoria", estado: "pendiente", tipoItem: "actividad" },
  { id: 4, titulo: "Reunión con proveedores - Documentación", descripcion: "Reunión informativa con proveedores sobre requisitos de documentación para licitaciones y contratos.", fecha: new Date(2025, 5, 15, 11, 0), fechaInicio: new Date(2025, 5, 15, 11, 0), horaInicio: "11:00", fechaFin: new Date(2025, 5, 15, 13, 0), horaFin: "13:00", ubicacion: "Sala de Reuniones - Administración", tipo: "reunion", estado: "pendiente", tipoItem: "actividad" },
  { id: 5, titulo: "Digitalización de expedientes históricos", descripcion: "Proceso de digitalización de expedientes históricos del archivo. Preservación digital y mejora de accesibilidad.", fecha: new Date(2025, 5, 18, 9, 30), fechaInicio: new Date(2025, 5, 18, 9, 30), horaInicio: "09:30", fechaFin: new Date(2025, 5, 18, 17, 0), horaFin: "17:00", ubicacion: "Oficina de Digitalización - Mesa de Entradas", tipo: "digitalizacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 6, titulo: "Revisión de procedimientos administrativos", descripcion: "Revisión y actualización de procedimientos administrativos de mesa de entradas. Optimización de procesos.", fecha: new Date(2025, 5, 22, 10, 0), fechaInicio: new Date(2025, 5, 22, 10, 0), horaInicio: "10:00", fechaFin: new Date(2025, 5, 22, 15, 0), horaFin: "15:00", ubicacion: "Oficina de Mesa de Entradas - Sector Procedimientos", tipo: "revision", estado: "pendiente", tipoItem: "actividad" },
  { id: 7, titulo: "Atención especial - Visita de inspectores", descripcion: "Atención especial a inspectores de organismos de control para revisión documental y cumplimiento normativo.", fecha: new Date(2025, 5, 25, 15, 30), fechaInicio: new Date(2025, 5, 25, 15, 30), horaInicio: "15:30", fechaFin: new Date(2025, 5, 25, 17, 30), horaFin: "17:30", ubicacion: "Mesa de Entradas - Atención Especial", tipo: "atencion", estado: "pendiente", tipoItem: "actividad" },
  { id: 8, titulo: "Cierre mensual de expedientes", descripcion: "Proceso de cierre mensual y estadísticas de expedientes ingresados. Generación de reportes y métricas.", fecha: new Date(2025, 5, 28, 13, 0), fechaInicio: new Date(2025, 5, 28, 13, 0), horaInicio: "13:00", fechaFin: new Date(2025, 5, 28, 16, 0), horaFin: "16:00", ubicacion: "Oficina de Administración - Sector Estadísticas", tipo: "cierre", estado: "pendiente", tipoItem: "actividad" },
]

export default function CalendarioEventosMesaEntradasPage() {
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
