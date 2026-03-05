"use client"

import { useState, useEffect } from "react"
import { CalendarioActividadesEventosLayout } from "@/components/eventos/calendario-actividades-eventos-layout"
import type { ActividadEvento } from "@/components/eventos/types-calendario"
import { parseStoredEventos } from "@/lib/calendario-eventos-storage"

const STORAGE_KEY = "eventos-contable"

const eventosEjemplo: ActividadEvento[] = [
  { id: 1, titulo: "Cierre Contable Mensual", descripcion: "Proceso de cierre contable del mes anterior, revisión de estados financieros y preparación de informes para la dirección.", fecha: new Date(2025, 5, 3, 9, 0), fechaInicio: new Date(2025, 5, 3, 9, 0), horaInicio: "09:00", fechaFin: new Date(2025, 5, 3, 12, 0), horaFin: "12:00", ubicacion: "Departamento de Contabilidad - Oficina Principal", tipo: "cierre", estado: "pendiente", tipoItem: "actividad" },
  { id: 2, titulo: "Auditoría Externa - Revisión de Cuentas", descripcion: "Sesión de trabajo con auditores externos para revisión de cuentas por cobrar, cuentas por pagar y conciliaciones bancarias.", fecha: new Date(2025, 5, 5, 10, 30), fechaInicio: new Date(2025, 5, 5, 10, 30), horaInicio: "10:30", fechaFin: new Date(2025, 5, 5, 15, 30), horaFin: "15:30", ubicacion: "Sala de Auditoría - Edificio Administrativo", tipo: "auditoria", estado: "pendiente", tipoItem: "actividad" },
  { id: 3, titulo: "Capacitación: Nuevas Normas Contables", descripcion: "Capacitación sobre las nuevas normas contables internacionales NIIF y su implementación en el sistema portuario.", fecha: new Date(2025, 5, 7, 14, 0), fechaInicio: new Date(2025, 5, 7, 14, 0), horaInicio: "14:00", fechaFin: new Date(2025, 5, 7, 17, 0), horaFin: "17:00", ubicacion: "Aula de Capacitación - Centro de Formación", tipo: "capacitacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 4, titulo: "Reunión con Bancos - Líneas de Crédito", descripcion: "Reunión con representantes bancarios para negociar nuevas líneas de crédito y condiciones financieras.", fecha: new Date(2025, 5, 9, 11, 0), fechaInicio: new Date(2025, 5, 9, 11, 0), horaInicio: "11:00", fechaFin: new Date(2025, 5, 9, 13, 0), horaFin: "13:00", ubicacion: "Sala de Reuniones Ejecutiva - Dirección Financiera", tipo: "reunion", estado: "pendiente", tipoItem: "actividad" },
  { id: 5, titulo: "Presentación Resultados Trimestrales", descripcion: "Presentación de resultados financieros del trimestre ante el directorio y análisis de indicadores económicos.", fecha: new Date(2025, 5, 12, 16, 0), fechaInicio: new Date(2025, 5, 12, 16, 0), horaInicio: "16:00", fechaFin: new Date(2025, 5, 12, 18, 0), horaFin: "18:00", ubicacion: "Sala de Directorio - Edificio Central", tipo: "presentacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 6, titulo: "Reconciliación Bancaria Mensual", descripcion: "Proceso de reconciliación de todas las cuentas bancarias de la empresa y verificación de movimientos.", fecha: new Date(2025, 5, 15, 9, 30), fechaInicio: new Date(2025, 5, 15, 9, 30), horaInicio: "09:30", fechaFin: new Date(2025, 5, 15, 12, 30), horaFin: "12:30", ubicacion: "Oficina de Tesorería - Departamento Financiero", tipo: "reconciliacion", estado: "pendiente", tipoItem: "actividad" },
  { id: 7, titulo: "Comité de Finanzas Mensual", descripcion: "Reunión mensual del comité de finanzas para revisar presupuestos, proyecciones y tomar decisiones estratégicas.", fecha: new Date(2025, 5, 18, 10, 0), fechaInicio: new Date(2025, 5, 18, 10, 0), horaInicio: "10:00", fechaFin: new Date(2025, 5, 18, 12, 0), horaFin: "12:00", ubicacion: "Sala de Comités - Edificio Administrativo", tipo: "comite", estado: "pendiente", tipoItem: "actividad" },
  { id: 8, titulo: "Revisión Presupuesto Anual", descripcion: "Revisión y ajuste del presupuesto anual según los resultados del primer semestre y proyecciones futuras.", fecha: new Date(2025, 5, 22, 13, 30), fechaInicio: new Date(2025, 5, 22, 13, 30), horaInicio: "13:30", fechaFin: new Date(2025, 5, 22, 16, 30), horaFin: "16:30", ubicacion: "Sala de Planificación - Departamento Financiero", tipo: "revision", estado: "pendiente", tipoItem: "actividad" },
]

export default function CalendarioEventosContablePage() {
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
