"use client"

import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Building, Building2, MapPin, MoreVertical, Plus, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Definir los tipos de estado posibles
type EstadoEntidad = "Pendiente de aprobación" |  "Activo"  | "Cancelado" | "Borrador"

// Definir los tipos de entidad
type TipoEntidad = "Proveedor" | "Cliente" | "Agencia Marítima"

// Función para determinar el color del badge según el estado
const getBadgeVariant = (estado: EstadoEntidad) => {
  switch (estado) {
    case "Pendiente de aprobación":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "Activo":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Cancelado":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    case "Borrador":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

// Función para determinar la ruta según el tipo de entidad
const getPortalRoute = (tipo: TipoEntidad) => {
  switch (tipo) {
    case "Proveedor":
      return "/proveedor"
    case "Cliente":
      return "/cliente"
    case "Agencia Marítima":
      // Asumimos que las agencias marítimas usan el portal de proveedor
      return "/proveedor"
    default:
      return "/usuario-basico"
  }
}

type TipoNuevaEntidad = "proveedor" | "cliente" | "empresa-servicios-portuarios"

export default function MisEntidadesPage() {
  const router = useRouter()
  const [modalNuevaEntidadOpen, setModalNuevaEntidadOpen] = useState(false)

  const handleSeleccionarTipoEntidad = (tipo: TipoNuevaEntidad) => {
    setModalNuevaEntidadOpen(false)
    router.push(`/usuario-basico/gestion/nueva-entidad/${tipo}`)
  }

  const [entidades] = useState([
    {
      id: 1,
      nombre: "Auletta SRL",
      cuit: "30-700012533-3",
      tipo: "Proveedor" as TipoEntidad,
      contacto: "Ernesto Gomez",
      email: "ejemplo@auletta.com.ar",
      direccion: "Calle 50 1988 - La Plata - Buenos Aires",
      estado: "Activo" as EstadoEntidad,
    },
    {
      id: 2,
      nombre: "RetóricaJS SA",
      cuit: "30-400222533-1",
      tipo: "Agencia Marítima" as TipoEntidad,
      contacto: "Ernesto Gomez",
      email: "ejemplo@auletta.com.ar",
      direccion: "Calle 50 1988 - La Plata - Buenos Aires",
      estado: "Pendiente de aprobación" as EstadoEntidad,
    },
    {
      id: 5,
      nombre: "Constructora Omega",
      cuit: "30-555666777-8",
      tipo: "Cliente" as TipoEntidad,
      contacto: "Roberto Sánchez",
      email: "ventas@omega.com.ar",
      direccion: "Calle 7 entre 45 y 46 - La Plata - Buenos Aires",
      estado: "Cancelado" as EstadoEntidad,
    },
    {
      id: 6,
      nombre: "Suministros Industriales SA",
      cuit: "30-111222333-4",
      tipo: "Proveedor" as TipoEntidad,
      contacto: "Laura Martínez",
      email: "contacto@suministrosindustriales.com.ar",
      direccion: "Av. Mitre 500 - Avellaneda - Buenos Aires",
      estado: "Borrador" as EstadoEntidad,
    },
  ])

  const getTipoSlug = (tipo: TipoEntidad): TipoNuevaEntidad => {
    if (tipo === "Proveedor") return "proveedor"
    if (tipo === "Cliente") return "cliente"
    return "empresa-servicios-portuarios" // Agencia Marítima u otro
  }

  const handleVerDetalle = (entidad: (typeof entidades)[0]) => {
    router.push(`/usuario-basico/gestion/mis-entidades/nueva-entidad/${getTipoSlug(entidad.tipo)}?id=${entidad.id}`)
  }

  const handleModificarDatos = (entidad: (typeof entidades)[0]) => {
    if (entidad.tipo === "Proveedor") {
      router.push("/usuario-basico/gestion/nueva-entidad/proveedor?id=" + entidad.id)
    } else if (entidad.tipo === "Cliente") {
      router.push("/usuario-basico/gestion/nueva-entidad/cliente?id=" + entidad.id)
    } else {
      router.push("/usuario-basico/gestion/nueva-entidad/empresa-servicios-portuarios?id=" + entidad.id)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-plp-darkest">Mis Entidades</h1>
        <Button
          onClick={() => setModalNuevaEntidadOpen(true)}
          className="bg-[#002060] hover:bg-[#001a4d] text-white px-4 py-2 flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Entidad
        </Button>
      </div>

      <Dialog open={modalNuevaEntidadOpen} onOpenChange={setModalNuevaEntidadOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Seleccionar tipo de entidad</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <div
              onClick={() => handleSeleccionarTipoEntidad("proveedor")}
              className="flex flex-col items-center justify-center min-h-[140px] p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow cursor-pointer transition-colors"
            >
              <Building2 className="h-12 w-12 mb-2 text-blue-600" />
              <span className="text-lg font-medium text-center">Proveedor</span>
              <p className="text-xs text-gray-500 mt-2 text-center">Crear un nuevo proveedor para el sistema</p>
            </div>
            <div
              onClick={() => handleSeleccionarTipoEntidad("cliente")}
              className="flex flex-col items-center justify-center min-h-[140px] p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow cursor-pointer transition-colors"
            >
              <Users className="h-12 w-12 mb-2 text-green-600" />
              <span className="text-lg font-medium text-center">Cliente</span>
              <p className="text-xs text-gray-500 mt-2 text-center">Crear un nuevo cliente para el sistema</p>
            </div>
            <div
              onClick={() => handleSeleccionarTipoEntidad("empresa-servicios-portuarios")}
              className="flex flex-col items-center justify-center min-h-[140px] p-6 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow cursor-pointer transition-colors"
            >
              <Building className="h-12 w-12 mb-2 text-purple-600" />
              <span className="text-lg font-medium text-center">Empresa Servicios Portuarios</span>
              <p className="text-xs text-gray-500 mt-2 text-center">Crear una empresa de servicios portuarios</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {entidades.map((entidad) => (
          <div key={entidad.id} className="bg-white rounded-lg border border-gray-200 p-6 relative">
            {/* Menú de 3 puntitos arriba a la derecha */}
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleVerDetalle(entidad)}>
                    Ver detalle
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleModificarDatos(entidad)}>
                    Modificar datos
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
              <div>
                <h2 className="text-xl font-semibold text-plp-darkest">{entidad.nombre}</h2>
                <p className="text-sm text-gray-600 mt-1">CUIT: {entidad.cuit}</p>

                <div className="mt-4 text-gray-500">
                  <p>{entidad.contacto}</p>
                  <p>{entidad.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-lg font-medium text-plp-dark">{entidad.tipo}</p>
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p>{entidad.direccion}</p>
                </div>
                <Badge className={`w-fit ${getBadgeVariant(entidad.estado)}`}>
                  {entidad.estado}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
