"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Briefcase,
  Phone,
  Home,
  Hash,
  Building,
  Clock,
  Calendar,
  MapPin,
} from "lucide-react"
import { MapaSelector } from "@/components/ui/mapa-selector"
import type { Empleado, LicenciaOrdinaria, DiaTramite } from "./types"
import { calcularEdad, calcularAntiguedad } from "./types"
import { DatosPersonalesSection } from "./datos-personales-section"
import { DatosContactoSection } from "./datos-contacto-section"
import { DatosFamiliaresSection } from "./datos-familiares-section"
import { DatosLaboralesSection } from "./datos-laborales-section"
import { DireccionesSection } from "./direcciones-section"
import { LicenciasSection } from "./licencias-section"
import { ImagenAmpliadaModal } from "./imagen-ampliada-modal"

interface LegajoEmpleadoProps {
  empleado: Empleado
  licenciaOrdinaria?: LicenciaOrdinaria[]
  diaTramite?: DiaTramite
  showActions?: boolean
  onEdit?: () => void
  onPrint?: () => void
  onViewPDF?: () => void
  onBaja?: () => void
  onBack?: () => void
}

export function LegajoEmpleado({
  empleado,
  licenciaOrdinaria = [],
  diaTramite,
  showActions = false,
  onEdit,
  onPrint,
  onViewPDF,
  onBaja,
  onBack,
}: LegajoEmpleadoProps) {
  const [vacacionesAbierto, setVacacionesAbierto] = useState(false)
  const [imagenAmpliadaAbierta, setImagenAmpliadaAbierta] = useState(false)

  // Calcular edad y antigüedad
  const edad = calcularEdad(empleado.fechaNacimiento)
  const antiguedad = calcularAntiguedad(empleado.fechaIngreso)

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

  // Usar imagen si está disponible, sino avatar, sino placeholder
  const imagenEmpleado = empleado.imagen || empleado.avatar

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Información principal con avatar */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-start gap-6">
            {imagenEmpleado ? (
              <div
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setImagenAmpliadaAbierta(true)}
              >
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage
                    src={imagenEmpleado}
                    alt={`${empleado.nombre} ${empleado.apellido}`}
                  />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {iniciales}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src="/placeholder.svg"
                  alt={`${empleado.nombre} ${empleado.apellido}`}
                />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {iniciales}
                </AvatarFallback>
              </Avatar>
            )}

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
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Antigüedad:</span>
                  <span className="font-medium">{antiguedad} años</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Licencias y días disponibles */}
        {licenciaOrdinaria.length > 0 && (
          <LicenciasSection
            licenciaOrdinaria={licenciaOrdinaria}
            diaTramite={diaTramite}
            vacacionesAbierto={vacacionesAbierto}
            setVacacionesAbierto={setVacacionesAbierto}
          />
        )}

        {/* Grid: Datos personales - Datos de contacto */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 grid gap-6">
            <DatosPersonalesSection empleado={empleado} edad={edad} />
          </div>
          <div className="lg:col-span-2 grid gap-6">
            <DatosContactoSection empleado={empleado} />
          </div>
        </div>

        {/* Datos familiares a todo el ancho */}
        <div className="max-w-7xl mx-auto py-6 mb-6">
          <DatosFamiliaresSection empleado={empleado} />
        </div>

        {/* Grid: Datos laborales - Direcciones */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 grid gap-6">
            <DatosLaboralesSection empleado={empleado} />
          </div>
          <div className="lg:col-span-2 grid gap-6">
            <DireccionesSection direcciones={empleado.direcciones} />
          </div>
        </div>

        {/* Card de Mapa para seleccionar ubicación */}
        <div className="max-w-7xl mx-auto mt-6 mb-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                Ubicación en el mapa
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1">
              <p className="mb-2 text-gray-600">
                Selecciona la ubicación exacta de la casa o dirección haciendo click en el mapa.
              </p>
              <MapaSelector
                initialPosition={[-34.6037, -58.3816]} // Buenos Aires centro por defecto
                onChange={(coords: [number, number]) => {
                  console.log("Coordenadas seleccionadas:", coords)
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de imagen ampliada */}
      {imagenEmpleado && (
        <ImagenAmpliadaModal
          isOpen={imagenAmpliadaAbierta}
          onClose={() => setImagenAmpliadaAbierta(false)}
          imagenUrl={imagenEmpleado}
          nombreCompleto={`${empleado.nombre} ${empleado.apellido}`}
        />
      )}
    </div>
  )
}
