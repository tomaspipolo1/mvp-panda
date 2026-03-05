"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  UserX,
  Activity,
} from "lucide-react"
import { ConfirmarBajaEmpleadoModal } from "@/components/empleados/confirmar-baja-empleado-modal"

// Datos de ejemplo - 122 empleados
const empleados = [
  // Administración
  {
    id: 1,
    nombre: "Juan Carlos",
    apellido: "González",
    dni: "12345678",
    legajo: "EMP001",
    gerencia: "Administración",
    departamento: "Contabilidad",
    cargo: "Contador Senior",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "María Elena",
    apellido: "Rodríguez",
    dni: "23456789",
    legajo: "EMP002",
    gerencia: "Administración",
    departamento: "Finanzas",
    cargo: "Analista Financiero",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Carlos Alberto",
    apellido: "Martínez",
    dni: "34567890",
    legajo: "EMP003",
    gerencia: "Administración",
    departamento: "Tesorería",
    cargo: "Tesorero",
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Ana Sofía",
    apellido: "López",
    dni: "45678901",
    legajo: "EMP004",
    gerencia: "Administración",
    departamento: "Contabilidad",
    cargo: "Auxiliar Contable",
    estado: "Licencia",
  },
  {
    id: 5,
    nombre: "Roberto",
    apellido: "Fernández",
    dni: "56789012",
    legajo: "EMP005",
    gerencia: "Administración",
    departamento: "Finanzas",
    cargo: "Gerente Financiero",
    estado: "Activo",
  },
  {
    id: 6,
    nombre: "Laura Patricia",
    apellido: "Silva",
    dni: "67890123",
    legajo: "EMP005B",
    gerencia: "Administración",
    departamento: "Auditoría",
    cargo: "Auditor Interno",
    estado: "Vacaciones",
  },
  {
    id: 7,
    nombre: "Diego Alejandro",
    apellido: "Morales",
    dni: "78901234",
    legajo: "EMP006",
    gerencia: "Administración",
    departamento: "Presupuesto",
    cargo: "Analista de Presupuesto",
    estado: "Activo",
  },
  {
    id: 8,
    nombre: "Valentina",
    apellido: "Castro",
    dni: "89012345",
    legajo: "EMP007",
    gerencia: "Administración",
    departamento: "Contabilidad",
    cargo: "Contador Junior",
    estado: "Activo",
  },
  {
    id: 9,
    nombre: "Andrés Felipe",
    apellido: "Vargas",
    dni: "90123456",
    legajo: "EMP008",
    gerencia: "Administración",
    departamento: "Finanzas",
    cargo: "Analista de Costos",
    estado: "Inactivo",
  },
  {
    id: 10,
    nombre: "Camila",
    apellido: "Herrera",
    dni: "01234567",
    legajo: "EMP009",
    gerencia: "Administración",
    departamento: "Tesorería",
    cargo: "Cajero",
    estado: "Activo",
  },

  // RRHH
  {
    id: 11,
    nombre: "Fernando",
    apellido: "Jiménez",
    dni: "11234567",
    legajo: "EMP010",
    gerencia: "RRHH",
    departamento: "Recursos Humanos",
    cargo: "Gerente de RRHH",
    estado: "Activo",
  },
  {
    id: 12,
    nombre: "Sofía",
    apellido: "Ramírez",
    dni: "12234567",
    legajo: "EMP011",
    gerencia: "RRHH",
    departamento: "Selección",
    cargo: "Analista de Selección",
    estado: "Activo",
  },
  {
    id: 13,
    nombre: "Miguel Ángel",
    apellido: "Torres",
    dni: "13234567",
    legajo: "EMP012",
    gerencia: "RRHH",
    departamento: "Capacitación",
    cargo: "Coordinador de Capacitación",
    estado: "Activo",
  },
  {
    id: 14,
    nombre: "Isabella",
    apellido: "Mendoza",
    dni: "14234567",
    legajo: "EMP013",
    gerencia: "RRHH",
    departamento: "Nómina",
    cargo: "Analista de Nómina",
    estado: "Licencia",
  },
  {
    id: 15,
    nombre: "Alejandro",
    apellido: "Ruiz",
    dni: "15234567",
    legajo: "EMP014",
    gerencia: "RRHH",
    departamento: "Bienestar",
    cargo: "Coordinador de Bienestar",
    estado: "Activo",
  },
  {
    id: 16,
    nombre: "Natalia",
    apellido: "Guerrero",
    dni: "16234567",
    legajo: "EMP015",
    gerencia: "RRHH",
    departamento: "Desarrollo",
    cargo: "Analista de Desarrollo",
    estado: "Activo",
  },
  {
    id: 17,
    nombre: "Sebastián",
    apellido: "Peña",
    dni: "17234567",
    legajo: "EMP016",
    gerencia: "RRHH",
    departamento: "Relaciones Laborales",
    cargo: "Especialista en Relaciones",
    estado: "Vacaciones",
  },
  {
    id: 18,
    nombre: "Gabriela",
    apellido: "Ortiz",
    dni: "18234567",
    legajo: "EMP017",
    gerencia: "RRHH",
    departamento: "Seguridad Industrial",
    cargo: "Coordinador de Seguridad",
    estado: "Activo",
  },
  {
    id: 19,
    nombre: "Mateo",
    apellido: "Vásquez",
    dni: "19234567",
    legajo: "EMP018",
    gerencia: "RRHH",
    departamento: "Medicina Laboral",
    cargo: "Médico Laboral",
    estado: "Activo",
  },
  {
    id: 20,
    nombre: "Daniela",
    apellido: "Rojas",
    dni: "20234567",
    legajo: "EMP019",
    gerencia: "RRHH",
    departamento: "Psicología",
    cargo: "Psicólogo Organizacional",
    estado: "Activo",
  },

  // Ingeniería
  {
    id: 21,
    nombre: "Joaquín",
    apellido: "Moreno",
    dni: "21234567",
    legajo: "EMP020",
    gerencia: "Ingeniería",
    departamento: "Desarrollo",
    cargo: "Ingeniero de Software Senior",
    estado: "Activo",
  },
  {
    id: 22,
    nombre: "Valeria",
    apellido: "Sánchez",
    dni: "22234567",
    legajo: "EMP021",
    gerencia: "Ingeniería",
    departamento: "Infraestructura",
    cargo: "Ingeniero de Infraestructura",
    estado: "Activo",
  },
  {
    id: 23,
    nombre: "Nicolás",
    apellido: "Delgado",
    dni: "23234567",
    legajo: "EMP022",
    gerencia: "Ingeniería",
    departamento: "Calidad",
    cargo: "Ingeniero de Calidad",
    estado: "Licencia",
  },
  {
    id: 24,
    nombre: "Mariana",
    apellido: "Cruz",
    dni: "24234567",
    legajo: "EMP023",
    gerencia: "Ingeniería",
    departamento: "Sistemas",
    cargo: "Administrador de Sistemas",
    estado: "Activo",
  },
  {
    id: 25,
    nombre: "Emilio",
    apellido: "Paredes",
    dni: "25234567",
    legajo: "EMP024",
    gerencia: "Ingeniería",
    departamento: "Desarrollo",
    cargo: "Desarrollador Full Stack",
    estado: "Activo",
  },
  {
    id: 26,
    nombre: "Lucía",
    apellido: "Aguilar",
    dni: "26234567",
    legajo: "EMP025",
    gerencia: "Ingeniería",
    departamento: "Testing",
    cargo: "Tester QA",
    estado: "Vacaciones",
  },
  {
    id: 27,
    nombre: "Tomás",
    apellido: "Molina",
    dni: "27234567",
    legajo: "EMP026",
    gerencia: "Ingeniería",
    departamento: "DevOps",
    cargo: "Ingeniero DevOps",
    estado: "Activo",
  },
  {
    id: 28,
    nombre: "Antonella",
    apellido: "Ramos",
    dni: "28234567",
    legajo: "EMP027",
    gerencia: "Ingeniería",
    departamento: "Seguridad",
    cargo: "Especialista en Ciberseguridad",
    estado: "Activo",
  },
  {
    id: 29,
    nombre: "Ignacio",
    apellido: "Flores",
    dni: "29234567",
    legajo: "EMP028",
    gerencia: "Ingeniería",
    departamento: "Datos",
    cargo: "Analista de Datos",
    estado: "Activo",
  },
  {
    id: 30,
    nombre: "Renata",
    apellido: "Cabrera",
    dni: "30234567",
    legajo: "EMP029",
    gerencia: "Ingeniería",
    departamento: "UX/UI",
    cargo: "Diseñador UX/UI",
    estado: "Inactivo",
  },

  // Operaciones
  {
    id: 31,
    nombre: "Maximiliano",
    apellido: "Navarro",
    dni: "31234567",
    legajo: "EMP030",
    gerencia: "Operaciones",
    departamento: "Logística",
    cargo: "Gerente de Operaciones",
    estado: "Activo",
  },
  {
    id: 32,
    nombre: "Constanza",
    apellido: "Espinoza",
    dni: "32234567",
    legajo: "EMP031",
    gerencia: "Operaciones",
    departamento: "Almacén",
    cargo: "Jefe de Almacén",
    estado: "Activo",
  },
  {
    id: 33,
    nombre: "Benjamín",
    apellido: "Medina",
    dni: "33234567",
    legajo: "EMP032",
    gerencia: "Operaciones",
    departamento: "Transporte",
    cargo: "Coordinador de Transporte",
    estado: "Licencia",
  },
  {
    id: 34,
    nombre: "Francisca",
    apellido: "Reyes",
    dni: "34234567",
    legajo: "EMP033",
    gerencia: "Operaciones",
    departamento: "Mantenimiento",
    cargo: "Técnico de Mantenimiento",
    estado: "Activo",
  },
  {
    id: 35,
    nombre: "Santiago",
    apellido: "Campos",
    dni: "35234567",
    legajo: "EMP034",
    gerencia: "Operaciones",
    departamento: "Producción",
    cargo: "Supervisor de Producción",
    estado: "Activo",
  },
  {
    id: 36,
    nombre: "Amparo",
    apellido: "Vargas",
    dni: "36234567",
    legajo: "EMP035",
    gerencia: "Operaciones",
    departamento: "Control de Calidad",
    cargo: "Inspector de Calidad",
    estado: "Vacaciones",
  },
  {
    id: 37,
    nombre: "Rodrigo",
    apellido: "Pinto",
    dni: "37234567",
    legajo: "EMP036",
    gerencia: "Operaciones",
    departamento: "Seguridad",
    cargo: "Guardia de Seguridad",
    estado: "Activo",
  },
  {
    id: 38,
    nombre: "Javiera",
    apellido: "Lara",
    dni: "38234567",
    legajo: "EMP037",
    gerencia: "Operaciones",
    departamento: "Limpieza",
    cargo: "Supervisor de Limpieza",
    estado: "Activo",
  },
  {
    id: 39,
    nombre: "Cristóbal",
    apellido: "Soto",
    dni: "39234567",
    legajo: "EMP038",
    gerencia: "Operaciones",
    departamento: "Recepción",
    cargo: "Recepcionista",
    estado: "Activo",
  },
  {
    id: 40,
    nombre: "Monserrat",
    apellido: "Ibáñez",
    dni: "40234567",
    legajo: "EMP039",
    gerencia: "Operaciones",
    departamento: "Archivo",
    cargo: "Archivista",
    estado: "Inactivo",
  },

  // Legales
  {
    id: 41,
    nombre: "Patricio",
    apellido: "Contreras",
    dni: "41234567",
    legajo: "EMP040",
    gerencia: "Legales",
    departamento: "Asesoría Legal",
    cargo: "Gerente Legal",
    estado: "Activo",
  },
  {
    id: 42,
    nombre: "Esperanza",
    apellido: "Fuentes",
    dni: "42234567",
    legajo: "EMP041",
    gerencia: "Legales",
    departamento: "Contratos",
    cargo: "Abogado de Contratos",
    estado: "Activo",
  },
  {
    id: 43,
    nombre: "Esteban",
    apellido: "Muñoz",
    dni: "43234567",
    legajo: "EMP042",
    gerencia: "Legales",
    departamento: "Litigios",
    cargo: "Abogado Litigante",
    estado: "Licencia",
  },
  {
    id: 44,
    nombre: "Paloma",
    apellido: "Cáceres",
    dni: "44234567",
    legajo: "EMP043",
    gerencia: "Legales",
    departamento: "Cumplimiento",
    cargo: "Oficial de Cumplimiento",
    estado: "Activo",
  },
  {
    id: 45,
    nombre: "Gonzalo",
    apellido: "Valdés",
    dni: "45234567",
    legajo: "EMP044",
    gerencia: "Legales",
    departamento: "Propiedad Intelectual",
    cargo: "Especialista en PI",
    estado: "Activo",
  },
  {
    id: 46,
    nombre: "Isidora",
    apellido: "Bravo",
    dni: "46234567",
    legajo: "EMP045",
    gerencia: "Legales",
    departamento: "Regulatorio",
    cargo: "Analista Regulatorio",
    estado: "Vacaciones",
  },
  {
    id: 47,
    nombre: "Vicente",
    apellido: "Cortés",
    dni: "47234567",
    legajo: "EMP046",
    gerencia: "Legales",
    departamento: "Documentación",
    cargo: "Asistente Legal",
    estado: "Activo",
  },
  {
    id: 48,
    nombre: "Florencia",
    apellido: "Sandoval",
    dni: "48234567",
    legajo: "EMP047",
    gerencia: "Legales",
    departamento: "Notaría",
    cargo: "Notario",
    estado: "Activo",
  },

  // Presidencia
  {
    id: 49,
    nombre: "Augusto",
    apellido: "Henríquez",
    dni: "49234567",
    legajo: "EMP048",
    gerencia: "Presidencia",
    departamento: "Dirección General",
    cargo: "Presidente",
    estado: "Activo",
  },
  {
    id: 50,
    nombre: "Magdalena",
    apellido: "Figueroa",
    dni: "50234567",
    legajo: "EMP049",
    gerencia: "Presidencia",
    departamento: "Secretaría",
    cargo: "Secretaria Ejecutiva",
    estado: "Activo",
  },
  {
    id: 51,
    nombre: "Claudio",
    apellido: "Poblete",
    dni: "51234567",
    legajo: "EMP050",
    gerencia: "Presidencia",
    departamento: "Comunicaciones",
    cargo: "Director de Comunicaciones",
    estado: "Activo",
  },
  {
    id: 52,
    nombre: "Bárbara",
    apellido: "Tapia",
    dni: "52234567",
    legajo: "EMP051",
    gerencia: "Presidencia",
    departamento: "Relaciones Públicas",
    cargo: "Relacionista Público",
    estado: "Licencia",
  },
  {
    id: 53,
    nombre: "Álvaro",
    apellido: "Carrasco",
    dni: "53234567",
    legajo: "EMP052",
    gerencia: "Presidencia",
    departamento: "Protocolo",
    cargo: "Jefe de Protocolo",
    estado: "Activo",
  },
  {
    id: 54,
    nombre: "Antonia",
    apellido: "Vera",
    dni: "54234567",
    legajo: "EMP053",
    gerencia: "Presidencia",
    departamento: "Asuntos Corporativos",
    cargo: "Gerente de Asuntos Corporativos",
    estado: "Activo",
  },
]

const gerencias = ["Administración", "Presidencia", "Ingeniería", "RRHH", "Legales", "Operaciones"]
const estados = ["Activo", "Inactivo", "Licencia", "Vacaciones"]

export default function ListadoEmpleados() {
  const router = useRouter()
  const [busqueda, setBusqueda] = useState("")
  const [filtroGerencia, setFiltroGerencia] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("")
  const [filtroCargo, setFiltroCargo] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const empleadosPorPagina = 10
  const [ordenPor, setOrdenPor] = useState<string>("")
  const [ordenDireccion, setOrdenDireccion] = useState<"asc" | "desc">("asc")

  // Estados del modal simplificados
  const [empleadoParaBaja, setEmpleadoParaBaja] = useState<(typeof empleados)[0] | null>(null)
  const [isModalBajaOpen, setIsModalBajaOpen] = useState(false)

  // Filtrar empleados
  const empleadosFiltrados = empleados.filter((empleado) => {
    const coincideBusqueda =
      empleado.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.dni?.includes(busqueda) ||
      empleado.cargo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      empleado.legajo?.toLowerCase().includes(busqueda.toLowerCase())

    const coincideGerencia = !filtroGerencia || filtroGerencia === "all" || empleado.gerencia === filtroGerencia
    const coincideEstado = !filtroEstado || filtroEstado === "all" || empleado.estado === filtroEstado
    const coincideCargo = !filtroCargo || empleado.cargo?.toLowerCase().includes(filtroCargo.toLowerCase())

    return coincideBusqueda && coincideGerencia && coincideEstado && coincideCargo
  })

  // Ordenar empleados
  const empleadosOrdenados = [...empleadosFiltrados].sort((a, b) => {
    if (!ordenPor) return 0

    let valorA = a[ordenPor as keyof typeof a]
    let valorB = b[ordenPor as keyof typeof b]

    if (typeof valorA === "string") valorA = valorA.toLowerCase()
    if (typeof valorB === "string") valorB = valorB.toLowerCase()

    if (valorA < valorB) return ordenDireccion === "asc" ? -1 : 1
    if (valorA > valorB) return ordenDireccion === "asc" ? 1 : -1
    return 0
  })

  // Paginación
  const totalPaginas = Math.ceil(empleadosOrdenados.length / empleadosPorPagina)
  const indiceInicio = (paginaActual - 1) * empleadosPorPagina
  const empleadosPaginados = empleadosOrdenados.slice(indiceInicio, indiceInicio + empleadosPorPagina)

  const manejarOrden = (campo: string) => {
    if (ordenPor === campo) {
      setOrdenDireccion(ordenDireccion === "asc" ? "desc" : "asc")
    } else {
      setOrdenPor(campo)
      setOrdenDireccion("asc")
    }
  }

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Activo: "default", // azul
      Inactivo: "secondary", // gris
      Licencia: "outline", // gris con borde
      Vacaciones: "destructive", // rojo
    }
    return variants[estado as keyof typeof variants] || "default"
  }

  const limpiarFiltros = () => {
    setBusqueda("")
    setFiltroGerencia("")
    setFiltroEstado("")
    setFiltroCargo("")
    setOrdenPor("")
    setPaginaActual(1)
  }

  const verPerfilEmpleado = (empleadoId: number) => {
    router.push(`/admin/admin/empleados/perfil/${empleadoId}`)
  }

  const editarEmpleado = (empleadoId: number) => {
    router.push(`/admin/admin/empleados/editar/${empleadoId}`)
  }

  const verActividadEmpleado = (empleadoId: number) => {
    router.push(`/admin/admin/empleados/actividad/${empleadoId}`)
  }

  const manejarBajaEmpleado = async (empleadoId: number, motivo: string, observaciones: string) => {
    try {
      console.log("Dando de baja empleado:", { empleadoId, motivo, observaciones })
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Baja procesada exitosamente")
    } catch (error) {
      console.error("Error al dar de baja empleado:", error)
      throw error
    }
  }

  const abrirModalBaja = (empleado: (typeof empleados)[0]) => {
    setEmpleadoParaBaja(empleado)
    setIsModalBajaOpen(true)
  }

  const cerrarModalBaja = () => {
    setIsModalBajaOpen(false)
    setEmpleadoParaBaja(null)
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Listado de Empleados</h1>
        <Button onClick={() => router.push("/admin/admin/empleados/alta")}>Agregar Empleado</Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{empleados.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {empleados.filter((e) => e.estado === "Activo").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Licencia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {empleados.filter((e) => e.estado === "Licencia").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {empleados.filter((e) => e.estado === "Inactivo").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, DNI o cargo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filtroGerencia} onValueChange={setFiltroGerencia}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por gerencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las gerencias</SelectItem>
                {gerencias.map((gerencia) => (
                  <SelectItem key={gerencia} value={gerencia}>
                    {gerencia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {estados.map((estado) => (
                  <SelectItem key={estado} value={estado}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Filtrar por cargo..."
              value={filtroCargo}
              onChange={(e) => setFiltroCargo(e.target.value)}
            />
            <Button variant="outline" onClick={limpiarFiltros}>
              Limpiar filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>
            Empleados ({empleadosOrdenados.length} {empleadosOrdenados.length === 1 ? "resultado" : "resultados"})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Nombre</TableHead>
                  <TableHead className="font-semibold">Apellido</TableHead>
                  <TableHead className="font-semibold">DNI</TableHead>
                  <TableHead className="font-semibold">Gerencia</TableHead>
                  <TableHead className="font-semibold">Departamento</TableHead>
                  <TableHead className="font-semibold">Cargo</TableHead>
                  <TableHead className="font-semibold">Estado</TableHead>
                  <TableHead className="font-semibold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empleadosPaginados.map((empleado) => (
                  <TableRow key={empleado.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{empleado.nombre}</TableCell>
                    <TableCell>{empleado.apellido}</TableCell>
                    <TableCell>{empleado.dni}</TableCell>
                    <TableCell>{empleado.gerencia}</TableCell>
                    <TableCell>{empleado.departamento}</TableCell>
                    <TableCell>{empleado.cargo}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          empleado.estado === "Activo"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : empleado.estado === "Inactivo"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : empleado.estado === "Licencia"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }
                      >
                        {empleado.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem onClick={() => verPerfilEmpleado(empleado.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver perfil empleado
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => editarEmpleado(empleado.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar datos
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => verActividadEmpleado(empleado.id)}>
                            <Activity className="mr-2 h-4 w-4" />
                            Ver actividad
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => abrirModalBaja(empleado)}>
                            <UserX className="mr-2 h-4 w-4" />
                            Dar de baja
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-1 py-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
              >
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground mx-4">
                {paginaActual}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de confirmación de baja */}
      <ConfirmarBajaEmpleadoModal
        empleado={empleadoParaBaja}
        isOpen={isModalBajaOpen}
        onClose={cerrarModalBaja}
        onConfirm={manejarBajaEmpleado}
      />
    </div>
  )
}

