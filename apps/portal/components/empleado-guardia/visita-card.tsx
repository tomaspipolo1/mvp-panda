import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, User, Users, Truck, Briefcase } from "lucide-react"
import type { ReactNode } from "react"

export type Visita = {
  id: string
  tipo: string
  estado: string
  fecha: string
  hora: string
  sitio: string
  solicitante: string
  empresa: string
  personas: number
  vehiculos: number
}

const estadoStyles: Record<
  string,
  { border: string; badge: string; text?: string; bg?: string }
> = {
  Pendiente: { border: "border-amber-400", badge: "bg-amber-400 text-white" },
  Aceptada: { border: "border-green-500", badge: "bg-green-500 text-white" },
  "En curso": { border: "border-blue-500", badge: "bg-blue-500 text-white" },
  Finalizada: { border: "border-gray-400", badge: "bg-gray-400 text-white" },
  Rechazada: { border: "border-red-500", badge: "bg-red-500 text-white" },
  Cancelada: { border: "border-red-500", badge: "bg-red-500 text-white" },
}

type InfoRowProps = {
  icon: ReactNode
  children: ReactNode
}

function InfoRow({ icon, children }: InfoRowProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#1f2a44]">
      {icon}
      <span>{children}</span>
    </div>
  )
}

type VisitaCardProps = {
  visita: Visita
  onVerDetalle: (visita: Visita) => void
}

export function VisitaCard({ visita, onVerDetalle }: VisitaCardProps) {
  const style = estadoStyles[visita.estado] || { border: "border-gray-200", badge: "bg-gray-300 text-[#1f2a44]" }

  return (
    <div className={`bg-white rounded-xl shadow-sm border-2 ${style.border} p-4 flex flex-col h-full`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <p className="text-sm text-gray-500">{visita.tipo}</p>
          <h3 className="text-lg font-semibold text-[#0f1e3a]">{visita.id}</h3>
        </div>
        <Badge className={`px-3 py-1 text-xs font-semibold ${style.badge}`}>{visita.estado}</Badge>
      </div>

      <div className="space-y-2 mb-4">
        <InfoRow icon={<User className="h-4 w-4 text-gray-500" />}>{visita.solicitante}</InfoRow>
        <InfoRow icon={<Briefcase className="h-4 w-4 text-gray-500" />}>{visita.empresa}</InfoRow>
        <InfoRow icon={<MapPin className="h-4 w-4 text-gray-500" />}>{visita.sitio}</InfoRow>
        <InfoRow
          icon={
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar className="h-4 w-4" />
              <Clock className="h-4 w-4" />
            </div>
          }
        >
          {visita.fecha} - {visita.hora}
        </InfoRow>
        <div className="flex gap-4">
          <InfoRow icon={<Users className="h-4 w-4 text-gray-500" />}>{visita.personas} personas</InfoRow>
          <InfoRow icon={<Truck className="h-4 w-4 text-gray-500" />}>{visita.vehiculos} vehículos</InfoRow>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          className="w-full bg-[#1f2a44] hover:bg-[#142036]"
          onClick={() => onVerDetalle(visita)}
        >
          Ver detalle
        </Button>
      </div>
    </div>
  )
}
