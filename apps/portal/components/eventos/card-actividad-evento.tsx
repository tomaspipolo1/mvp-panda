"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { ActividadEvento } from "./types-calendario"
import { estadoToLabel, estadoBadgeClass } from "./types-calendario"
import { cn } from "@/lib/utils"

interface CardActividadEventoProps {
  item: ActividadEvento
  onClick: () => void
  className?: string
}

export function CardActividadEvento({ item, onClick, className }: CardActividadEventoProps) {
  const fechaStr = item.fechaInicio
    ? format(new Date(item.fechaInicio), "d MMM yyyy", { locale: es })
    : ""
  const horaStr =
    item.horaInicio && item.horaFin
      ? `${item.horaInicio} - ${item.horaFin}`
      : item.horaInicio
        ? item.horaInicio
        : ""

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="font-semibold text-gray-900 flex-1">{item.titulo}</h3>
        <span
          className={cn(
            "shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            estadoBadgeClass(item.estado)
          )}
        >
          {estadoToLabel(item.estado)}
        </span>
      </div>
      {item.descripcion && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.descripcion}</p>
      )}
      <div className="space-y-2 text-sm text-gray-500">
        {fechaStr && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
            <span>{fechaStr}</span>
          </div>
        )}
        {horaStr && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-gray-400" />
            <span>{horaStr}</span>
          </div>
        )}
        {item.ubicacion && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="line-clamp-2">{item.ubicacion}</span>
          </div>
        )}
      </div>
    </button>
  )
}
