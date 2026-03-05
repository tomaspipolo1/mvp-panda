"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { useMemo, useState } from "react"
import { detallesVisitas } from "../data"
import {
  PersonasCard,
  VehiculosCard,
  VisitaInfoCard,
  VisitaStatusBadge,
} from "@/components/empleado-guardia/visita-detail-components"

const formatNow = () => {
  const now = new Date()
  const fecha = now.toLocaleDateString("es-AR")
  const hora = now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
  return `${fecha} ${hora}`
}

export default function DetalleVisitaPage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const searchParams = useSearchParams()
  const visitaId = searchParams.get("id")
  const visita = useMemo(() => detallesVisitas.find((v) => v.id === visitaId) || detallesVisitas[0], [visitaId])

  const getInitialVisitaEdit = () => {
    if (["Cancelada", "Rechazada"].includes(visita.estado)) {
      return {
        ...visita,
        personas: visita.personas.map((p) => ({ ...p, ingreso: false, egreso: false })),
        vehiculos: visita.vehiculos.map((v) => ({ ...v, ingreso: false, egreso: false })),
      }
    }
    if (["Finalizada"].includes(visita.estado)) {
      return {
        ...visita,
        personas: visita.personas.map((p) => ({ ...p, ingreso: true, egreso: true })),
        vehiculos: visita.vehiculos.map((v) => ({ ...v, ingreso: true, egreso: true })),
      }
    }
    if (["En curso"].includes(visita.estado)) {
      const personas = visita.personas.map((p) => ({ ...p, ingreso: false, egreso: false }))
      const vehiculos = visita.vehiculos.map((v) => ({ ...v, ingreso: false, egreso: false }))
      if (personas.length > 0) personas[0].ingreso = true
      else if (vehiculos.length > 0) vehiculos[0].ingreso = true
      return { ...visita, personas, vehiculos }
    }
    return {
      ...visita,
      personas: visita.personas.map((p) => ({ ...p, ingreso: false, egreso: false })),
      vehiculos: visita.vehiculos.map((v) => ({ ...v, ingreso: false, egreso: false })),
    }
  }

  const [visitaEdit, setVisitaEdit] = useState(getInitialVisitaEdit)
  const [editDisabled, setEditDisabled] = useState(false)

  const handlePersonaChange = (idx: number, field: "ingreso" | "egreso", value: boolean) => {
    if (editDisabled) return
    setVisitaEdit((v) => ({
      ...v,
      personas: v.personas.map((p, i) =>
        i === idx
          ? {
              ...p,
              [field]: value,
              [`${field}At`]: value ? formatNow() : undefined,
            }
          : p
      ),
    }))
  }

  const handleVehiculoChange = (idx: number, field: "ingreso" | "egreso", value: boolean) => {
    if (editDisabled) return
    setVisitaEdit((v) => ({
      ...v,
      vehiculos: v.vehiculos.map((p, i) =>
        i === idx
          ? {
              ...p,
              [field]: value,
              [`${field}At`]: value ? formatNow() : undefined,
            }
          : p
      ),
    }))
  }

  const handleGuardar = () => {
    setEditDisabled(true)
    setTimeout(() => router.push("/empleado-guardia/visita"), 300)
  }

  const handleFinalizar = () => {
    setVisitaEdit((v) => ({ ...v, estado: "Finalizada" }))
    setEditDisabled(true)
    setTimeout(() => router.push("/empleado-guardia/visita"), 300)
  }

  const handleSelectAllPersonasIngreso = () => {
    setVisitaEdit((v) => ({
      ...v,
      personas: v.personas.map((p) => ({ ...p, ingreso: true, ingresoAt: formatNow() })),
    }))
  }

  const handleSelectAllPersonasEgreso = () => {
    setVisitaEdit((v) => ({
      ...v,
      personas: v.personas.map((p) => ({ ...p, egreso: true, egresoAt: formatNow() })),
    }))
  }

  const handleSelectAllVehiculosIngreso = () => {
    setVisitaEdit((v) => ({
      ...v,
      vehiculos: v.vehiculos.map((veh) => ({ ...veh, ingreso: true, ingresoAt: formatNow() })),
    }))
  }

  const handleSelectAllVehiculosEgreso = () => {
    setVisitaEdit((v) => ({
      ...v,
      vehiculos: v.vehiculos.map((veh) => ({ ...veh, egreso: true, egresoAt: formatNow() })),
    }))
  }

  const fechaIngresoParts = visita.fechaIngreso.split(" ")
  const fechaEgresoParts = visita.fechaEgreso.split(" ")

  return (
    <div className={`flex flex-col gap-6 py-4 md:py-6 px-4 md:px-8 ${isMobile ? "ml-16" : ""}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()} className="bg-white shadow-sm">
            ← Volver
          </Button>
          <h1 className="text-2xl font-bold text-[#0f1e3a]">Detalle de la visita {visita.id}</h1>
        </div>
        <VisitaStatusBadge estado={visitaEdit.estado} />
      </div>

      <VisitaInfoCard
        tipo={visita.tipo}
        solicitante={visita.solicitante}
        empresa={visita.empresa}
        destino={visita.destino}
        fechaIngreso={fechaIngresoParts[0]}
        horaIngreso={fechaIngresoParts[1]}
        fechaEgreso={fechaEgresoParts[0]}
        horaEgreso={fechaEgresoParts[1]}
      />

      <PersonasCard
        personas={visitaEdit.personas as any}
        estado={visitaEdit.estado}
        onToggle={handlePersonaChange}
        onMarkAllIngreso={handleSelectAllPersonasIngreso}
        onMarkAllEgreso={handleSelectAllPersonasEgreso}
      />

      <VehiculosCard
        vehiculos={visitaEdit.vehiculos as any}
        estado={visitaEdit.estado}
        onToggle={handleVehiculoChange}
        onMarkAllIngreso={handleSelectAllVehiculosIngreso}
        onMarkAllEgreso={handleSelectAllVehiculosEgreso}
      />

      <div className="flex flex-col md:flex-row gap-3 justify-end">
        <Button
          className="bg-blue-900 hover:bg-blue-800 text-white w-full md:w-48"
          onClick={handleGuardar}
          disabled={editDisabled}
        >
          Guardar Cambios
        </Button>
        <Button
          className="bg-red-600 hover:bg-red-700 w-full md:w-48"
          onClick={handleFinalizar}
          disabled={editDisabled || visitaEdit.estado === "Finalizada"}
        >
          Finalizar Visita
        </Button>
      </div>
    </div>
  )
}
