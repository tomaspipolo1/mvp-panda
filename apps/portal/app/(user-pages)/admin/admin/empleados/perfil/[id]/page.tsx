"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Briefcase,
  Phone,
  Home,
  FileText,
  UserX,
  ChevronLeft,
  Edit,
  Mail,
  Calendar,
  Hash,
  Building,
  MapPin,
  Clock,
} from "lucide-react"
import { MapaSelector } from "@/components/ui/mapa-selector";

// Tipo para las direcciones
type Direccion = {
  id: number
  tipo: string
  calle: string
  numero: string
  piso?: string
  departamento?: string
  codigoPostal: string
  localidad: string
  provincia: string
  comentarios?: string
}

// Tipo para el empleado
type Conyuge = {
  nombreCompleto: string
  dni: string
  fechaNacimiento: string
}
type Hijo = {
  nombreCompleto: string
  dni: string
  fechaNacimiento: string
}
type Empleado = {
  id: number
  nombre: string
  apellido: string
  dni: string
  cuil: string
  fechaNacimiento: string
  sexo: string
  nacionalidad?: string
  estadoCivil?: string
  grupoSanguineo?: string
  hijos?: boolean
  conyuge?: Conyuge
  hijosDatos?: Hijo[]
  legajo: string
  fechaIngreso: string
  gerencia: string
  departamento: string
  cargo: string
  estado: string
  email: string
  telefono: string
  telefonoEmpresa?: string
  telefonoEmergencia?: string
  contactoEmergencia?: string
  direcciones: Direccion[]
  avatar?: string
}

// Datos de ejemplo - Esto sería reemplazado por una llamada a la API
const empleadosData: Record<string, Empleado> = {
  "1": {
    id: 1,
    nombre: "Juan Carlos",
    apellido: "González",
    dni: "12345678",
    cuil: "20-12345678-9",
    fechaNacimiento: "1985-03-15",
    sexo: "Masculino",
    nacionalidad: "Argentina",
    estadoCivil: "Casado",
    grupoSanguineo: "O+",
    hijos: true,
    conyuge: {
      nombreCompleto: "María González",
      dni: "23456789",
      fechaNacimiento: "1987-05-10",
    },
    hijosDatos: [
      {
        nombreCompleto: "Lucía González",
        dni: "34567890",
        fechaNacimiento: "2010-09-15",
      },
      {
        nombreCompleto: "Pedro González",
        dni: "45678901",
        fechaNacimiento: "2013-12-22",
      },
    ],
    legajo: "EMP001",
    fechaIngreso: "2020-01-15",
    gerencia: "Administración",
    departamento: "Contabilidad",
    cargo: "Contador Senior",
    estado: "Activo",
    email: "juan.gonzalez@empresa.com",
    telefono: "+54 11 1234-5678",
    telefonoEmpresa: "+54 11 4000-1000",
    telefonoEmergencia: "+54 11 5555-5555",
    contactoEmergencia: "María González",
    avatar: "/placeholder.svg?height=120&width=120&text=JG",
    direcciones: [
      {
        id: 1,
        tipo: "Personal",
        calle: "Av. Corrientes",
        numero: "1234",
        piso: "5",
        departamento: "A",
        codigoPostal: "1043",
        localidad: "Buenos Aires",
        provincia: "CABA",
        comentarios: "Portero eléctrico",
      },
    ],
  },
  "2": {
    id: 2,
    nombre: "María Elena",
    apellido: "Rodríguez",
    dni: "23456789",
    cuil: "27-23456789-4",
    fechaNacimiento: "1990-07-22",
    sexo: "Femenino",
    nacionalidad: "Argentina",
    estadoCivil: "Soltera",
    grupoSanguineo: "A-",
    hijos: false,
    conyuge: undefined,
    hijosDatos: [],
    legajo: "EMP002",
    fechaIngreso: "2021-03-10",
    gerencia: "Administración",
    departamento: "Finanzas",
    cargo: "Analista Financiero",
    estado: "Activo",
    email: "maria.rodriguez@empresa.com",
    telefono: "+54 11 2345-6789",
    telefonoEmpresa: "",
    telefonoEmergencia: "+54 11 4444-4444",
    contactoEmergencia: "Carlos Rodríguez",
    avatar: "/placeholder.svg?height=120&width=120&text=MR",
    direcciones: [
      {
        id: 2,
        tipo: "Personal",
        calle: "San Martín",
        numero: "567",
        codigoPostal: "1636",
        localidad: "Olivos",
        provincia: "Buenos Aires",
        comentarios: "",
      },
      {
        id: 3,
        tipo: "Laboral",
        calle: "Av. Santa Fe",
        numero: "890",
        piso: "12",
        departamento: "B",
        codigoPostal: "1059",
        localidad: "Buenos Aires",
        provincia: "CABA",
        comentarios: "Oficina principal",
      },
    ],
  },
  "3": {
    id: 3,
    nombre: "Carlos Alberto",
    apellido: "Martínez",
    dni: "34567890",
    cuil: "20-34567890-1",
    fechaNacimiento: "1982-11-08",
    sexo: "Masculino",
    nacionalidad: "Argentina",
    estadoCivil: "Divorciado",
    grupoSanguineo: "B+",
    hijos: true,
    conyuge: undefined,
    hijosDatos: [
      {
        nombreCompleto: "Sofía Martínez",
        dni: "56789012",
        fechaNacimiento: "2015-03-30",
      },
    ],
    legajo: "EMP003",
    fechaIngreso: "2019-06-20",
    gerencia: "Administración",
    departamento: "Tesorería",
    cargo: "Tesorero",
    estado: "Activo",
    email: "carlos.martinez@empresa.com",
    telefono: "+54 11 3456-7890",
    telefonoEmpresa: "+54 11 4000-1000",
    telefonoEmergencia: "+54 11 3333-3333",
    contactoEmergencia: "Ana Martínez",
    avatar: "/placeholder.svg?height=120&width=120&text=CM",
    direcciones: [],
  },
}

// Función para calcular la edad
function calcularEdad(fechaNacimiento: string): number {
  const hoy = new Date()
  const fechaNac = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - fechaNac.getFullYear()
  const mes = hoy.getMonth() - fechaNac.getMonth()

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--
  }

  return edad
}

// Función para formatear fecha
function formatearFecha(fecha: string): string {
  const opciones: Intl.DateTimeFormatOptions = { day: "2-digit", month: "2-digit", year: "numeric" }
  return new Date(fecha).toLocaleDateString("es-AR", opciones)
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

export default function PerfilEmpleadoPage({ params }: { params: any }) {
  const router = useRouter()
  const [vacacionesAbierto, setVacacionesAbierto] = useState(false)
  const [empleadoId, setEmpleadoId] = useState<string | null>(null)
  const [empleado, setEmpleado] = useState<Empleado | null>(null)

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await params
      setEmpleadoId(resolvedParams.id)
    }
    unwrapParams()
  }, [params])

  useEffect(() => {
    if (!empleadoId) return
    setEmpleado(empleadosData[empleadoId] || null)
  }, [empleadoId])

  // Si no existe el empleado, redirigir al listado
  if (!empleadoId || !empleado) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando datos del empleado...</p>
        </div>
      </div>
    )
  }

  // Calcular edad y antigüedad
  const edad = calcularEdad(empleado.fechaNacimiento)
  const antiguedad = calcularAntiguedad(empleado.fechaIngreso)

  // Función para manejar la edición del empleado
  const manejarEditarEmpleado = () => {
    router.push(`/admin/admin/empleados/editar/${empleadoId}`)
  }

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

  // Datos de ejemplo para licencias
  const licenciaOrdinaria = [
    { periodo: 2024, dias: 2 },
    { periodo: 2025, dias: 12 },
    { periodo: 2026, dias: 20 },
  ]
  // Día de trámite: solo un valor, sin período
  const diaTramite = { dias: 1 }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Contenedor principal con márgenes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Encabezado mejorado */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/admin/admin/empleados/listado")}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Volver al listado
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Perfil de Empleado</h1>
                <p className="text-sm text-gray-500 mt-1">Información completa del empleado</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={manejarEditarEmpleado}>
                <Edit className="h-4 w-4" />
                Editar empleado
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Ver legajo PDF
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => window.print()}>
                <FileText className="h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="destructive" size="sm" className="flex items-center gap-2">
                <UserX className="h-4 w-4" />
                Dar de baja
              </Button>
            </div>
          </div>
        </div>

        {/* Información principal con avatar */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={empleado.avatar || "/placeholder.svg"}
                alt={`${empleado.nombre} ${empleado.apellido}`}
              />
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
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Antigüedad:</span>
                  <span className="font-medium">{antiguedad} años</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card de Licencias y días disponibles */}
        <div className="mb-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b flex flex-row items-center justify-between">
              <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Briefcase className="h-5 w-5 text-green-600" />
                </div>
                Licencias y días disponibles
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={vacacionesAbierto ? "Ocultar" : "Mostrar"}
                onClick={() => setVacacionesAbierto((v) => !v)}
              >
                {vacacionesAbierto ? (
                  <ChevronLeft className="h-5 w-5 transform rotate-90 transition-transform" />
                ) : (
                  <ChevronLeft className="h-5 w-5 transform -rotate-90 transition-transform" />
                )}
              </Button>
            </CardHeader>
            {vacacionesAbierto && (
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                  <span className="text-base font-semibold text-gray-700 text-center col-span-3 md:col-span-3">Licencia ordinaria Anual</span>
                  <span className="text-base font-semibold text-gray-700 text-center">Día de trámite</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {licenciaOrdinaria.map(({ periodo, dias }) => (
                    <div
                      key={"anual-" + periodo}
                      className="flex flex-col items-center justify-center bg-white rounded-xl shadow border border-green-100 py-8 px-4"
                    >
                      <span className="text-lg text-gray-500 mb-2">Periodo</span>
                      <span className="text-2xl font-semibold text-gray-800 mb-2">{periodo}</span>
                      <span className="text-4xl font-bold text-green-700 mb-1">{dias}</span>
                      <span className="text-base text-gray-600">Días hábiles</span>
                    </div>
                  ))}
                  {/* Día de Trámite - mostrar año correspondiente */}
                  <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow border border-blue-100 py-8 px-4">
                    <span className="text-lg text-gray-500 mb-2">Período</span>
                    <span className="text-2xl font-semibold text-gray-800 mb-2">2025</span>
                    <span className="text-4xl font-bold text-blue-700 mb-1">{diaTramite.dias}</span>
                    <span className="text-base text-gray-600">Días disponibles</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
        {/* Grid: Datos personales - Datos de contacto */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 grid gap-6">
            {/* Datos Personales */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  Datos Personales
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">DNI</p>
                      <p className="font-medium text-gray-900">{empleado.dni}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">CUIL</p>
                      <p className="font-medium text-gray-900">{empleado.cuil}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Fecha de nacimiento</p>
                      <p className="font-medium text-gray-900">{formatearFecha(empleado.fechaNacimiento)}</p>
                      <p className="text-sm text-gray-500">{edad} años</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Sexo</p>
                      <p className="font-medium text-gray-900">{empleado.sexo}</p>
                    </div>
                  </div>

                  {/* Nacionalidad */}
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Nacionalidad</p>
                      <p className="font-medium text-gray-900">{empleado.nacionalidad || '-'}</p>
                    </div>
                  </div>
                  {/* Estado civil */}
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Estado civil</p>
                      <p className="font-medium text-gray-900">{empleado.estadoCivil || '-'}</p>
                    </div>
                  </div>
                  {/* Grupo sanguíneo */}
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Grupo sanguíneo</p>
                      <p className="font-medium text-gray-900">{empleado.grupoSanguineo || '-'}</p>
                    </div>
                  </div>
                  {/* Hijo/s */}
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Hijo/s</p>
                      <p className="font-medium text-gray-900">{empleado.hijos ? 'Sí' : 'No'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 grid gap-6">
            {/* Datos de Contacto */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  Datos de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <div className="space-y-4 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{empleado.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Teléfono</p>
                      <p className="font-medium text-gray-900">{empleado.telefono}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Teléfono Empresa</p>
                      <p className="font-medium text-gray-900">{empleado.telefonoEmpresa || "-"}</p>
                    </div>
                  </div>

                  {/* Teléfono de contacto en casos de emergencia */}
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Teléfono de emergencia</p>
                      <p className="font-medium text-gray-900">{empleado.telefonoEmergencia || '-'}</p>
                    </div>
                  </div>
                  {/* Nombre y apellido persona a contactar */}
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Persona a contactar</p>
                      <p className="font-medium text-gray-900">{empleado.contactoEmergencia || '-'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Datos familiares a todo el ancho */}
        <div className="max-w-7xl mx-auto py-6 mb-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <User className="h-5 w-5 text-yellow-600" />
                </div>
                Datos familiares
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 space-y-6">
              {/* Cónyuge */}
              {empleado.estadoCivil === "Casado" && empleado.conyuge && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Cónyuge</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nombre completo</p>
                      <p className="font-medium text-gray-900">{empleado.conyuge.nombreCompleto}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">DNI</p>
                      <p className="font-medium text-gray-900">{empleado.conyuge.dni}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fecha de nacimiento</p>
                      <p className="font-medium text-gray-900">{formatearFecha(empleado.conyuge.fechaNacimiento)}</p>
                    </div>
                  </div>
                </div>
              )}
              {/* Hijos */}
              {empleado.hijos && empleado.hijosDatos && empleado.hijosDatos.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Hijo/s</h4>
                  <div className="space-y-2">
                    {empleado.hijosDatos.map((hijo, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-3">
                        <div>
                          <p className="text-sm text-gray-500">Nombre completo</p>
                          <p className="font-medium text-gray-900">{hijo.nombreCompleto}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">DNI</p>
                          <p className="font-medium text-gray-900">{hijo.dni}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fecha de nacimiento</p>
                          <p className="font-medium text-gray-900">{formatearFecha(hijo.fechaNacimiento)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Grid: Datos laborales - Direcciones */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 grid gap-6">
            {/* Datos Laborales */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                  Datos Laborales
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Fecha de ingreso</p>
                      <p className="font-medium text-gray-900">{formatearFecha(empleado.fechaIngreso)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Gerencia</p>
                      <p className="font-medium text-gray-900">{empleado.gerencia}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Departamento</p>
                      <p className="font-medium text-gray-900">{empleado.departamento}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Cargo</p>
                      <p className="font-medium text-gray-900">{empleado.cargo}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2 grid gap-6">
            {/* Direcciones */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Home className="h-5 w-5 text-orange-600" />
                  </div>
                  Direcciones
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                {empleado.direcciones.length > 0 ? (
                  <div className="space-y-4 h-full overflow-y-auto">
                    {empleado.direcciones.map((direccion) => (
                      <div key={direccion.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline" className="text-xs">
                            {direccion.tipo}
                          </Badge>
                        </div>

                        <div className="text-sm space-y-1">
                          <p className="font-medium text-gray-900">
                            {direccion.calle} {direccion.numero}
                            {direccion.piso && `, Piso ${direccion.piso}`}
                            {direccion.departamento && `, Depto ${direccion.departamento}`}
                          </p>
                          <p className="text-gray-600">
                            CP {direccion.codigoPostal}, {direccion.localidad}
                          </p>
                          <p className="text-gray-600">{direccion.provincia}</p>
                          {direccion.comentarios && (
                            <p className="text-gray-500 italic text-xs mt-2">{direccion.comentarios}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 h-full flex flex-col justify-center">
                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">Este empleado no tiene direcciones cargadas.</p>
                  </div>
                )}
              </CardContent>
            </Card>
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
              <p className="mb-2 text-gray-600">Selecciona la ubicación exacta de la casa o dirección haciendo click en el mapa.</p>
              <MapaSelector
                initialPosition={[-34.6037, -58.3816]} // Buenos Aires centro por defecto
                onChange={(coords: [number, number]) => {
                  // Aquí puedes guardar las coordenadas en el estado o enviarlas a la API
                  console.log("Coordenadas seleccionadas:", coords);
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

