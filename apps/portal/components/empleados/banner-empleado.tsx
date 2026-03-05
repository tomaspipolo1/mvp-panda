import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Hash, Building, Briefcase, Clock } from "lucide-react"

type Empleado = {
  id: number
  nombre: string
  apellido: string
  legajo: string
  departamento: string
  cargo: string
  estado: string
  avatar?: string
}

interface BannerEmpleadoProps {
  empleado: Empleado
  antiguedad?: number
}

export function BannerEmpleado({ empleado, antiguedad }: BannerEmpleadoProps) {
  // Obtener color del badge según estado
  const getEstadoBadge = (estado: string) => {
    const variants = {
      Activo: { variant: "default" as const, className: "bg-green-600 hover:bg-green-700" },
      Inactivo: { variant: "secondary" as const, className: "bg-gray-500 hover:bg-gray-600" },
      Licencia: {
        variant: "outline" as const,
        className: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500",
      },
      Vacaciones: { variant: "destructive" as const, className: "bg-red-500 hover:bg-red-600" },
      Baja: { variant: "destructive" as const, className: "bg-red-700 hover:bg-red-800" },
    }
    return variants[estado as keyof typeof variants] || variants.Activo
  }

  const estadoBadge = getEstadoBadge(empleado.estado)

  // Generar iniciales para el avatar
  const iniciales = `${empleado.nombre.charAt(0)}${empleado.apellido.charAt(0)}`

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
          <AvatarImage src={empleado.avatar || "/placeholder.svg"} alt={`${empleado.nombre} ${empleado.apellido}`} />
          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            {iniciales}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {empleado.nombre} {empleado.apellido}
            </h2>
            <Badge variant={estadoBadge.variant} className={estadoBadge.className}>
              {empleado.estado}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Legajo:</span>
              <span className="font-medium">{empleado.legajo}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Departamento:</span>
              <span className="font-medium">{empleado.departamento}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Cargo:</span>
              <span className="font-medium">{empleado.cargo}</span>
            </div>
            {antiguedad && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Antigüedad:</span>
                <span className="font-medium">{antiguedad} años</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
