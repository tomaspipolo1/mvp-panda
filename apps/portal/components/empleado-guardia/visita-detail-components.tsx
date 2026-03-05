"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Briefcase, User, Building2, Phone, Mail, CarFront } from "lucide-react"
import type { ReactNode } from "react"

export type Persona = {
  nombre: string
  dni?: string
  email?: string
  telefono?: string
  ingreso: boolean
  egreso: boolean
  ingresoAt?: string
  egresoAt?: string
}

export type Vehiculo = {
  patente: string
  tipo?: string
  marca?: string
  ingreso: boolean
  egreso: boolean
  ingresoAt?: string
  egresoAt?: string
}

type Estado = "Pendiente" | "Aceptada" | "En curso" | "Finalizada" | "Rechazada" | "Cancelada" | string

const estadoStyles: Record<Estado, { bg: string; text?: string }> = {
  Pendiente: { bg: "bg-amber-100 text-amber-700" },
  Aceptada: { bg: "bg-green-100 text-green-700" },
  "En curso": { bg: "bg-blue-100 text-blue-700" },
  Finalizada: { bg: "bg-gray-200 text-gray-700" },
  Rechazada: { bg: "bg-red-100 text-red-700" },
  Cancelada: { bg: "bg-red-100 text-red-700" },
}

export function VisitaStatusBadge({ estado }: { estado: Estado }) {
  const style = estadoStyles[estado] || { bg: "bg-gray-200 text-gray-700" }
  return (
    <Badge className={`${style.bg} ${style.text ?? ""} px-3 py-1 text-sm font-semibold capitalize`}>
      {estado}
    </Badge>
  )
}

function InfoRow({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#1f2a44]">
      {icon}
      <span className="font-semibold">{label}</span>
      <span className="text-[#0f1e3a]">{value}</span>
    </div>
  )
}

export function VisitaInfoCard({
  tipo,
  solicitante,
  empresa,
  destino,
  fechaIngreso,
  horaIngreso,
  fechaEgreso,
  horaEgreso,
}: {
  tipo: string
  solicitante: string
  empresa?: string
  destino: string
  fechaIngreso: string
  horaIngreso: string
  fechaEgreso: string
  horaEgreso: string
}) {
  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-[#0f1e3a]">Información General</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="space-y-3">
          <InfoRow icon={<Briefcase className="h-4 w-4 text-gray-500" />} label="Tipo visita:" value={tipo} />
          <InfoRow icon={<User className="h-4 w-4 text-gray-500" />} label="Solicitante:" value={solicitante} />
          {empresa && (
            <InfoRow icon={<Building2 className="h-4 w-4 text-gray-500" />} label="Empresa:" value={empresa} />
          )}
          <InfoRow icon={<MapPin className="h-4 w-4 text-gray-500" />} label="Destino:" value={destino} />
        </div>
        <div className="space-y-3">
          <InfoRow icon={<Calendar className="h-4 w-4 text-gray-500" />} label="Fecha ingreso:" value={fechaIngreso} />
          <InfoRow icon={<Clock className="h-4 w-4 text-gray-500" />} label="Hora ingreso:" value={horaIngreso} />
          <InfoRow icon={<Calendar className="h-4 w-4 text-gray-500" />} label="Fecha egreso:" value={fechaEgreso} />
          <InfoRow icon={<Clock className="h-4 w-4 text-gray-500" />} label="Hora egreso:" value={horaEgreso} />
        </div>
      </CardContent>
    </Card>
  )
}

type PersonasCardProps = {
  personas: Persona[]
  estado: Estado
  onToggle: (idx: number, field: "ingreso" | "egreso", value: boolean) => void
  onMarkAllIngreso: () => void
  onMarkAllEgreso: () => void
}

export function PersonasCard({ personas, estado, onToggle, onMarkAllIngreso, onMarkAllEgreso }: PersonasCardProps) {
  const disableAll = ["Cancelada", "Rechazada", "Finalizada"].includes(estado)
  const allIngresaron = personas.every((p) => p.ingreso)

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base text-[#0f1e3a]">Personas que ingresan ({personas.length})</CardTitle>
        <div className="flex gap-2">
          {!allIngresaron ? (
            <Button
              size="sm"
              variant="outline"
              className="border-blue-500 text-blue-700"
              disabled={disableAll}
              onClick={onMarkAllIngreso}
            >
              Todos ingresaron
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-green-500 text-green-700"
              disabled={disableAll}
              onClick={onMarkAllEgreso}
            >
              Todos salieron
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {personas.map((p, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
            <div className="flex items-center gap-3 text-sm text-[#1f2a44]">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-semibold">{p.nombre}</span>
              <span className="text-gray-600">{p.dni ?? "-"}</span>
              <span className="flex items-center gap-1 text-gray-600">
                <Phone className="h-4 w-4 text-gray-400" /> {p.telefono ?? "-"}
              </span>
              {p.email && (
                <span className="flex items-center gap-1 text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" /> {p.email}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs text-gray-600">
                {p.ingresoAt && <span>Ingreso: {p.ingresoAt}</span>}
                {p.egresoAt && <span>Salida: {p.egresoAt}</span>}
              </div>
              <div className="flex items-center gap-2">
                {!p.ingreso && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500 text-blue-700"
                    disabled={["Cancelada", "Rechazada", "Finalizada"].includes(estado)}
                    onClick={() => onToggle(i, "ingreso", true)}
                  >
                    Ingresó
                  </Button>
                )}
                {!p.egreso && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-500 text-green-700"
                    disabled={["Cancelada", "Rechazada", "Finalizada"].includes(estado)}
                    onClick={() => onToggle(i, "egreso", true)}
                  >
                    Salió
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

type VehiculosCardProps = {
  vehiculos: Vehiculo[]
  estado: Estado
  onToggle: (idx: number, field: "ingreso" | "egreso", value: boolean) => void
  onMarkAllIngreso: () => void
  onMarkAllEgreso: () => void
}

export function VehiculosCard({ vehiculos, estado, onToggle, onMarkAllIngreso, onMarkAllEgreso }: VehiculosCardProps) {
  const disableAll = ["Cancelada", "Rechazada", "Finalizada"].includes(estado)
  const allIngresaron = vehiculos.every((v) => v.ingreso)

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base text-[#0f1e3a]">Vehículos ({vehiculos.length})</CardTitle>
        <div className="flex gap-2">
          {!allIngresaron ? (
            <Button
              size="sm"
              variant="outline"
              className="border-blue-500 text-blue-700"
              disabled={disableAll}
              onClick={onMarkAllIngreso}
            >
              Todos ingresaron
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-green-500 text-green-700"
              disabled={disableAll}
              onClick={onMarkAllEgreso}
            >
              Todos salieron
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {vehiculos.map((v, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
            <div className="flex items-center gap-3 text-sm text-[#1f2a44]">
              <CarFront className="h-4 w-4 text-gray-500" />
              <span className="font-semibold">{v.patente}</span>
              <span className="text-gray-600">{v.tipo ?? "-"}</span>
              <span className="text-gray-600">{v.marca ?? "-"}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-xs text-gray-600">
                {v.ingresoAt && <span>Ingreso: {v.ingresoAt}</span>}
                {v.egresoAt && <span>Salida: {v.egresoAt}</span>}
              </div>
              <div className="flex items-center gap-2">
                {!v.ingreso && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500 text-blue-700"
                    disabled={["Cancelada", "Rechazada", "Finalizada"].includes(estado)}
                    onClick={() => onToggle(i, "ingreso", true)}
                  >
                    Ingresó
                  </Button>
                )}
                {!v.egreso && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-500 text-green-700"
                    disabled={["Cancelada", "Rechazada", "Finalizada"].includes(estado)}
                    onClick={() => onToggle(i, "egreso", true)}
                  >
                    Salió
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
