"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BannerEmpleado } from "@/components/empleados/banner-empleado"
import { ChevronLeft, Calendar, DollarSign, Heart, FileText } from "lucide-react"

// Datos de ejemplo de empleados (mismo que en listado)
const empleadosData: Record<string, any> = {
  "1": {
    id: 1,
    nombre: "Juan Carlos",
    apellido: "González",
    dni: "12345678",
    cuil: "20-12345678-9",
    fechaNacimiento: "1985-03-15",
    sexo: "Masculino",
    legajo: "EMP001",
    fechaIngreso: "2020-01-15",
    gerencia: "Administración",
    departamento: "Contabilidad",
    cargo: "Contador Senior",
    estado: "Activo",
    email: "juan.gonzalez@empresa.com",
    telefono: "+54 11 1234-5678",
    avatar: "/placeholder.svg?height=120&width=120&text=JG",
  },
  "2": {
    id: 2,
    nombre: "María Elena",
    apellido: "Rodríguez",
    dni: "23456789",
    cuil: "27-23456789-4",
    fechaNacimiento: "1990-07-22",
    sexo: "Femenino",
    legajo: "EMP002",
    fechaIngreso: "2021-03-10",
    gerencia: "Administración",
    departamento: "Finanzas",
    cargo: "Analista Financiero",
    estado: "Activo",
    email: "maria.rodriguez@empresa.com",
    telefono: "+54 11 2345-6789",
    avatar: "/placeholder.svg?height=120&width=120&text=MR",
  },
}

// Actualizar los datos de ejemplo de actividades para incluir números de solicitud
// y ajustar los tipos según lo solicitado
const actividadesData: Record<string, any[]> = {
  "1": [
    {
      id: 1,
      numeroSolicitud: "SOL-2024-0135",
      tipo: "Vacaciones",
      descripcion: "Solicitud de 15 días de vacaciones",
      fechaSolicitud: "2024-11-15",
      estado: "Aprobada",
    },
    {
      id: 2,
      numeroSolicitud: "SOL-2024-0128",
      tipo: "Préstamo",
      descripcion: "Préstamo personal por $500,000",
      fechaSolicitud: "2024-10-10",
      estado: "Aprobada",
    },
    {
      id: 3,
      numeroSolicitud: "SOL-2024-0112",
      tipo: "Licencia Médica",
      descripcion: "Licencia por intervención quirúrgica",
      fechaSolicitud: "2024-09-20",
      estado: "Aprobada",
    },
    {
      id: 4,
      numeroSolicitud: "SOL-2024-0143",
      tipo: "Día de Trámite",
      descripcion: "Día para trámites bancarios",
      fechaSolicitud: "2024-11-01",
      estado: "Aprobada",
    },
    {
      id: 5,
      numeroSolicitud: "SOL-2024-0098",
      tipo: "Vacaciones",
      descripcion: "Curso de Excel Avanzado",
      fechaSolicitud: "2024-08-15",
      estado: "Aprobada",
    },
    {
      id: 6,
      numeroSolicitud: "SOL-2024-0087",
      tipo: "Vacaciones",
      descripcion: "Solicitud de 5 días de vacaciones",
      fechaSolicitud: "2024-07-10",
      estado: "Rechazada",
    },
    {
      id: 7,
      numeroSolicitud: "SOL-2024-0076",
      tipo: "Día de Trámite",
      descripcion: "Solicitud de horario flexible",
      fechaSolicitud: "2024-06-20",
      estado: "Cancelada",
    },
  ],
  "2": [
    {
      id: 8,
      numeroSolicitud: "SOL-2024-0156",
      tipo: "Licencia Médica",
      descripcion: "Licencia por nacimiento de hijo",
      fechaSolicitud: "2024-08-01",
      estado: "Aprobada",
    },
    {
      id: 9,
      numeroSolicitud: "SOL-2024-0145",
      tipo: "Vacaciones",
      descripcion: "Seminario de Finanzas Corporativas",
      fechaSolicitud: "2024-07-20",
      estado: "Aprobada",
    },
  ],
}

// Función para calcular años de antigüedad
function calcularAntiguedad(fechaIngreso: string): number {
  const hoy = new Date()
  const ingreso = new Date(fechaIngreso)
  let antiguedad = hoy.getFullYear() - ingreso.getFullYear()
  const mes = hoy.getMonth() - ingreso.getMonth()

  if (mes < 0 || (mes === 0 && hoy.getDate() < ingreso.getDate())) {
    antiguedad--
  }

  return antiguedad
}

// Función para formatear fecha
function formatearFecha(fecha: string): string {
  const opciones: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" }
  return new Date(fecha).toLocaleDateString("es-AR", opciones)
}

export default function ActividadEmpleadoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const empleadoId = params.id
  const empleado = empleadosData[empleadoId]
  const actividades = actividadesData[empleadoId] || []

  // Si no existe el empleado, redirigir al listado
  if (!empleado) {
    router.push("/empleado-rrhh/gestion/empleados/listado")
    return null
  }

  const antiguedad = calcularAntiguedad(empleado.fechaIngreso)

  // Actualizar la función getIconoActividad para que coincida con los nuevos tipos
  const getIconoActividad = (tipo: string) => {
    const iconos = {
      Vacaciones: Calendar,
      Préstamo: DollarSign,
      "Licencia Médica": Heart,
      "Día de Trámite": FileText,
    }
    const IconComponent = iconos[tipo as keyof typeof iconos] || FileText
    return <IconComponent className="h-4 w-4" />
  }

  // Actualizar la función getEstadoBadge para que coincida con los nuevos estados
  const getEstadoBadge = (estado: string) => {
    const variants = {
      Aprobada: { variant: "default" as const, className: "bg-green-600 hover:bg-green-700" },
      Rechazada: { variant: "destructive" as const, className: "bg-red-600 hover:bg-red-700" },
      Cancelada: { variant: "secondary" as const, className: "bg-gray-500 hover:bg-gray-600" },
    }
    return variants[estado as keyof typeof variants] || variants.Aprobada
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Contenedor principal con márgenes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Encabezado */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/empleado-rrhh/gestion/empleados/listado")}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Volver al listado
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Actividad del Empleado</h1>
                <p className="text-sm text-gray-500 mt-1">Historial completo de solicitudes y actividades</p>
              </div>
            </div>
          </div>
        </div>

        {/* Banner del empleado */}
        <div className="mb-6">
          <BannerEmpleado empleado={empleado} antiguedad={antiguedad} />
        </div>

        {/* Actualizar las estadísticas para que coincidan con los nuevos estados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Solicitudes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{actividades.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {actividades.filter((a) => a.estado === "Aprobada").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rechazadas/Canceladas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {actividades.filter((a) => a.estado === "Rechazada" || a.estado === "Cancelada").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de actividades */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            {actividades.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border-r border-border">Nro Solicitud</TableHead>
                    <TableHead className="border-r border-border">Tipo</TableHead>
                    <TableHead className="border-r border-border">Descripción</TableHead>
                    <TableHead className="border-r border-border">Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actividades.map((actividad) => {
                    const estadoBadge = getEstadoBadge(actividad.estado)
                    return (
                      <TableRow key={actividad.id}>
                        <TableCell className="border-r border-border font-mono">{actividad.numeroSolicitud}</TableCell>
                        <TableCell className="border-r border-border">
                          <div className="flex items-center gap-2">
                            {getIconoActividad(actividad.tipo)}
                            <span className="font-medium">{actividad.tipo}</span>
                          </div>
                        </TableCell>
                        <TableCell className="border-r border-border">{actividad.descripcion}</TableCell>
                        <TableCell className="border-r border-border">
                          {formatearFecha(actividad.fechaSolicitud)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={estadoBadge.variant} className={estadoBadge.className}>
                            {actividad.estado}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Este empleado no tiene actividades registradas.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
