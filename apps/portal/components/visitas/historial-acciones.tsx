"use client"

import type { ComponentType } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CheckCircle2, Clock3, Info, MinusCircle } from "lucide-react"

type ActionType = "created" | "progress" | "approved" | "rejected" | "info"

export interface ActionEvent {
  id: string
  timestamp: string
  type: ActionType
  message: string
  actor?: string
  showActor?: boolean
  detail?: string
}

interface ActionTimelineProps {
  events: ActionEvent[]
  variant?: "internal" | "external"
  className?: string
  title?: string
}

const typeStyles: Record<
  ActionType,
  { icon: ComponentType<{ className?: string }> | null; color: string; border: string }
> = {
  created: { icon: Clock3, color: "text-slate-600", border: "border-slate-200" },
  progress: { icon: Info, color: "text-amber-600", border: "border-amber-200" },
  approved: { icon: CheckCircle2, color: "text-green-600", border: "border-green-200" },
  rejected: { icon: MinusCircle, color: "text-red-600", border: "border-red-200" },
  info: { icon: Info, color: "text-blue-600", border: "border-blue-200" },
}

export function HistorialAcciones({
  events,
  variant = "internal",
  className = "",
  title = "Historial de acciones",
}: ActionTimelineProps) {
  if (!events?.length) return null

  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex flex-col gap-4">
        {events.map((event, index) => {
          const Icon = typeStyles[event.type]?.icon ?? Info
          const style = typeStyles[event.type] ?? typeStyles.info
          const dateLabel = format(new Date(event.timestamp), "dd/MM/yyyy HH:mm", { locale: es })

          return (
            <div key={event.id} className="relative pl-9">
              {index !== events.length - 1 && (
                <span className="absolute left-4 top-7 bottom-0 w-px bg-gray-100" aria-hidden="true" />
              )}
              <div
                className={`absolute left-0 top-0 w-8 h-8 rounded-full bg-white border ${style.border} flex items-center justify-center`}
              >
                {Icon ? <Icon className={`w-4 h-4 ${style.color}`} /> : null}
              </div>
              <p className="text-sm text-gray-900">{event.message}</p>
              {event.detail && <p className="text-xs text-gray-500 mt-0.5">{event.detail}</p>}
              {!event.detail && variant === "internal" && event.actor && event.showActor !== false && (
                <p className="text-xs text-gray-500 mt-0.5">{`Por ${event.actor}`}</p>
              )}
              <p className="text-xs text-gray-400 mt-0.5">{dateLabel}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}


