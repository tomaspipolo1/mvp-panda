"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { ModalAltaDepartamento } from "@/components/organigrama/modal-alta-departamento"
import { ModalEliminarDepartamento } from "@/components/organigrama/modal-eliminar-departamento"

// Datos de ejemplo para departamentos
const departamentosData = [
  // GERENCIA DE INFRAESTRUCTURA Y MANTENIMIENTO
  {
    id: 1,
    nombre: "GERENCIA DE INFRAESTRUCTURA Y MANTENIMIENTO",
    codigo: "GIM",
    descripcion: "Gerencia principal de infraestructura y mantenimiento",
    gerencia: "Gerencia de Infraestructura y Mantenimiento",
    superior: "María González",
    cantidadEmpleados: 30,
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "TALLER",
    codigo: "TALL",
    descripcion: "Taller de mantenimiento y reparaciones",
    gerencia: "Gerencia de Infraestructura y Mantenimiento",
    superior: "Luis Martínez",
    cantidadEmpleados: 6,
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "MANTENIMIENTO",
    codigo: "MANT",
    descripcion: "Departamento de mantenimiento general",
    gerencia: "Gerencia de Infraestructura y Mantenimiento",
    superior: "Roberto Silva",
    cantidadEmpleados: 8,
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "MANTENIMIENTO PINTURA",
    codigo: "MANTP",
    descripcion: "Departamento de mantenimiento y pintura",
    gerencia: "Gerencia de Infraestructura y Mantenimiento",
    superior: "Carmen López",
    cantidadEmpleados: 4,
    estado: "Activo",
  },
  {
    id: 5,
    nombre: "MANTENIMIENTO HERRERÍA",
    codigo: "MANTH",
    descripcion: "Departamento de mantenimiento y herrería",
    gerencia: "Gerencia de Infraestructura y Mantenimiento",
    superior: "Ana Rodríguez",
    cantidadEmpleados: 5,
    estado: "Activo",
  },
  {
    id: 6,
    nombre: "BATIMETRÍAS Y BALIZAMIENTOS",
    codigo: "BATI",
    descripcion: "Medición de profundidades y señalización marítima",
    gerencia: "Gerencia de Infraestructura y Mantenimiento",
    superior: "Diego Fernández",
    cantidadEmpleados: 3,
    estado: "Activo",
  },
  {
    id: 7,
    nombre: "DRAGADO Y MUELLES",
    codigo: "DRAG",
    descripcion: "Operaciones de dragado y mantenimiento de muelles",
    gerencia: "Gerencia de Infraestructura y Mantenimiento",
    superior: "Patricia Morales",
    cantidadEmpleados: 7,
    estado: "Activo",
  },
  {
    id: 8,
    nombre: "OBRAS TERRESTRES",
    codigo: "OBRAS",
    descripcion: "Construcción y mantenimiento de obras terrestres",
    gerencia: "Gerencia de Infraestructura y Mantenimiento",
    superior: "Carlos Ruiz",
    cantidadEmpleados: 6,
    estado: "Activo",
  },

  // GERENCIA DE OPERACIONES
  {
    id: 9,
    nombre: "GERENCIA DE OPERACIONES",
    codigo: "GO",
    descripcion: "Gerencia principal de operaciones portuarias",
    gerencia: "Gerencia de Operaciones",
    superior: "Juan Pérez",
    cantidadEmpleados: 35,
    estado: "Activo",
  },
  {
    id: 10,
    nombre: "SEGURIDAD INTEGRAL",
    codigo: "SEGU",
    descripcion: "Departamento de seguridad integral del puerto",
    gerencia: "Gerencia de Operaciones",
    superior: "Miguel Torres",
    cantidadEmpleados: 10,
    estado: "Activo",
  },
  {
    id: 11,
    nombre: "TRAFICO TERRESTRE",
    codigo: "TRAF",
    descripcion: "Gestión del tráfico terrestre general",
    gerencia: "Gerencia de Operaciones",
    superior: "Laura Sánchez",
    cantidadEmpleados: 8,
    estado: "Activo",
  },
  {
    id: 12,
    nombre: "TRAFICO TERRESTRE MAQUINISTAS",
    codigo: "TRAFM",
    descripcion: "Tráfico terrestre especializado en maquinistas",
    gerencia: "Gerencia de Operaciones",
    superior: "Pedro Ramírez",
    cantidadEmpleados: 6,
    estado: "Activo",
  },
  {
    id: 13,
    nombre: "TRAFICO TERRESTRE SEÑALEROS",
    codigo: "TRAFS",
    descripcion: "Tráfico terrestre especializado en señaleros",
    gerencia: "Gerencia de Operaciones",
    superior: "Elena Castro",
    cantidadEmpleados: 5,
    estado: "Activo",
  },
  {
    id: 14,
    nombre: "MEDIOAMBIENTE Y SEGURIDAD",
    codigo: "MYS",
    descripcion: "Gestión medioambiental y seguridad",
    gerencia: "Gerencia de Operaciones",
    superior: "Ricardo Vega",
    cantidadEmpleados: 4,
    estado: "Activo",
  },
  {
    id: 15,
    nombre: "GIRO DE BUQUES",
    codigo: "GIRO",
    descripcion: "Operaciones de giro y maniobra de buques",
    gerencia: "Gerencia de Operaciones",
    superior: "Sofía Mendoza",
    cantidadEmpleados: 7,
    estado: "Activo",
  },

  // GERENCIA DE ADMINISTRACIÓN
  {
    id: 16,
    nombre: "GERENCIA DE ADMINISTRACIÓN",
    codigo: "GA",
    descripcion: "Gerencia principal de administración",
    gerencia: "Gerencia de Administración",
    superior: "Fernando López",
    cantidadEmpleados: 25,
    estado: "Activo",
  },
  {
    id: 17,
    nombre: "CONTABLE",
    codigo: "CONT",
    descripcion: "Departamento de contabilidad y finanzas",
    gerencia: "Gerencia de Administración",
    superior: "Isabel García",
    cantidadEmpleados: 8,
    estado: "Activo",
  },
  {
    id: 18,
    nombre: "COMPRAS Y ABASTECIMIENTO",
    codigo: "COMP",
    descripcion: "Gestión de compras y abastecimiento",
    gerencia: "Gerencia de Administración",
    superior: "Andrés Moreno",
    cantidadEmpleados: 6,
    estado: "Activo",
  },
  {
    id: 19,
    nombre: "INGRESOS",
    codigo: "ING",
    descripcion: "Gestión de ingresos y facturación",
    gerencia: "Gerencia de Administración",
    superior: "Claudia Herrera",
    cantidadEmpleados: 7,
    estado: "Activo",
  },
  {
    id: 20,
    nombre: "SISTEMAS",
    codigo: "SIST",
    descripcion: "Departamento de sistemas e informática",
    gerencia: "Gerencia de Administración",
    superior: "Javier Ruiz",
    cantidadEmpleados: 5,
    estado: "Activo",
  },
  {
    id: 21,
    nombre: "MESA DE ENTRADAS Y ARCHIVO",
    codigo: "MESA",
    descripcion: "Mesa de entradas y gestión de archivo",
    gerencia: "Gerencia de Administración",
    superior: "Mónica Silva",
    cantidadEmpleados: 3,
    estado: "Activo",
  },
  {
    id: 22,
    nombre: "TESORERÍA",
    codigo: "TESO",
    descripcion: "Departamento de tesorería y pagos",
    gerencia: "Gerencia de Administración",
    superior: "Alberto Díaz",
    cantidadEmpleados: 4,
    estado: "Activo",
  },

  // GERENCIA DE RRHH, RRII Y COMUNIDAD
  {
    id: 23,
    nombre: "GERENCIA DE RRHH, RRII Y COMUNIDAD",
    codigo: "GRIC",
    descripcion: "Gerencia de recursos humanos, relaciones institucionales y comunidad",
    gerencia: "Gerencia de RRHH RRII y Comunidad",
    superior: "Valeria Campos",
    cantidadEmpleados: 15,
    estado: "Activo",
  },
  {
    id: 24,
    nombre: "GESTIÓN DE RRHH",
    codigo: "GRRHH",
    descripcion: "Gestión de recursos humanos",
    gerencia: "Gerencia de RRHH RRII y Comunidad",
    superior: "Raúl Jiménez",
    cantidadEmpleados: 6,
    estado: "Activo",
  },
  {
    id: 25,
    nombre: "RELACIONES INSTITUCIONALES",
    codigo: "RRII",
    descripcion: "Departamento de relaciones institucionales",
    gerencia: "Gerencia de RRHH RRII y Comunidad",
    superior: "Natalia Vargas",
    cantidadEmpleados: 4,
    estado: "Activo",
  },
  {
    id: 26,
    nombre: "UNIDAD COMERCIAL",
    codigo: "COMER",
    descripcion: "Unidad comercial y desarrollo de negocios",
    gerencia: "Gerencia de RRHH RRII y Comunidad",
    superior: "Gonzalo Ramos",
    cantidadEmpleados: 5,
    estado: "Activo",
  },

  // GERENCIA DE ASUNTOS LEGALES
  {
    id: 27,
    nombre: "GERENCIA DE ASUNTOS LEGALES",
    codigo: "GAL",
    descripcion: "Gerencia de asuntos legales",
    gerencia: "Gerencia de Legales",
    superior: "Marcela Ortega",
    cantidadEmpleados: 8,
    estado: "Activo",
  },
  {
    id: 28,
    nombre: "ASUNTOS Y DESPACHOS JURÍDICOS",
    codigo: "ASUN",
    descripcion: "Departamento de asuntos y despachos jurídicos",
    gerencia: "Gerencia de Legales",
    superior: "Rodrigo Peña",
    cantidadEmpleados: 8,
    estado: "Activo",
  },
  // PRESIDENCIA
  {
    id: 29,
    nombre: "SECRETARIA DE PRESIDENCIA",
    codigo: "SECPRE",
    descripcion: "Secretaría de presidencia",
    gerencia: "Presidencia",
    superior: "Carmen Delgado",
    cantidadEmpleados: 5,
    estado: "Activo",
  },
  {
    id: 30,
    nombre: "SECRETARIA DE DIRECTORIO",
    codigo: "SECDRI",
    descripcion: "Secretaría de directorio",
    gerencia: "Presidencia",
    superior: "Roberto Vásquez",
    cantidadEmpleados: 4,
    estado: "Activo",
  },
]

const gerencias = [
  "Todas las gerencias",
  "Gerencia de Administración",
  "Gerencia de Legales",
  "Gerencia de RRHH RRII y Comunidad",
  "Gerencia de Operaciones",
  "Gerencia de Infraestructura y Mantenimiento",
  "Presidencia",
]

export default function DepartamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGerencia, setSelectedGerencia] = useState("Todas las gerencias")
  const [filteredDepartamentos, setFilteredDepartamentos] = useState(departamentosData)
  const [currentPage, setCurrentPage] = useState(1)

  // Estados para los modales
  const [showModalAlta, setShowModalAlta] = useState(false)
  const [showModalVer, setShowModalVer] = useState(false)
  const [showModalEditar, setShowModalEditar] = useState(false)
  const [showModalEliminar, setShowModalEliminar] = useState(false)
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState<any>(null)

  const itemsPerPage = 10

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    applyFilters(term, selectedGerencia)
  }

  const handleGerenciaFilter = (gerencia: string) => {
    setSelectedGerencia(gerencia)
    applyFilters(searchTerm, gerencia)
  }

  const applyFilters = (term: string, gerencia: string) => {
    let filtered = departamentosData

    if (term) {
      filtered = filtered.filter(
        (dept) =>
          dept.nombre.toLowerCase().includes(term.toLowerCase()) ||
          dept.codigo.toLowerCase().includes(term.toLowerCase()) ||
          dept.superior.toLowerCase().includes(term.toLowerCase()),
      )
    }

    if (gerencia !== "Todas las gerencias") {
      filtered = filtered.filter((dept) => dept.gerencia === gerencia)
    }

    setFilteredDepartamentos(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const totalPages = Math.ceil(filteredDepartamentos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedDepartamentos = filteredDepartamentos.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handlers para acciones de departamentos
  const handleVerDetalles = (departamento: any) => {
    setDepartamentoSeleccionado(departamento)
    setShowModalVer(true)
  }

  const handleEditar = (departamento: any) => {
    setDepartamentoSeleccionado(departamento)
    setShowModalEditar(true)
  }

  const handleEliminar = (departamento: any) => {
    setDepartamentoSeleccionado(departamento)
    setShowModalEliminar(true)
  }

  const handleConfirmEliminar = () => {
    console.log("Eliminando departamento:", departamentoSeleccionado)
    // Aquí iría la lógica para eliminar el departamento
    // Por ahora solo cerramos el modal
    setShowModalEliminar(false)
  }

  const handleConfirmGuardar = (departamentoData: any) => {
    console.log("Guardando departamento:", departamentoData)
    // Aquí iría la lógica para guardar el departamento
  }

  const handleConfirmEditar = (departamentoData: any) => {
    console.log("Actualizando departamento:", departamentoData)
    // Aquí iría la lógica para actualizar el departamento
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departamentos</h1>
          <p className="text-gray-600 mt-1">Gestión de departamentos por gerencia</p>
        </div>
        <Button className="bg-plp-dark hover:bg-plp-dark/90" onClick={() => setShowModalAlta(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Departamento
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, código o superior..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedGerencia} onValueChange={handleGerenciaFilter}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filtrar por gerencia" />
              </SelectTrigger>
              <SelectContent>
                {gerencias.map((gerencia) => (
                  <SelectItem key={gerencia} value={gerencia}>
                    {gerencia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Departamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Departamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Gerencia</TableHead>
                  <TableHead>Superior</TableHead>
                  <TableHead className="text-center">Empleados</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDepartamentos.map((departamento) => (
                  <TableRow key={departamento.id}>
                    <TableCell className="font-mono font-bold text-sm">{departamento.codigo}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{departamento.nombre}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{departamento.descripcion}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {departamento.gerencia}
                      </Badge>
                    </TableCell>
                    <TableCell>{departamento.superior}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{departamento.cantidadEmpleados}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVerDetalles(departamento)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditar(departamento)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleEliminar(departamento)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando {startIndex + 1} a {Math.min(endIndex, filteredDepartamentos.length)} de{" "}
            {filteredDepartamentos.length} departamentos
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Modales */}
      <ModalAltaDepartamento
        isOpen={showModalAlta}
        onClose={() => setShowModalAlta(false)}
        onConfirm={handleConfirmGuardar}
        mode="crear"
      />

      <ModalAltaDepartamento
        isOpen={showModalVer}
        onClose={() => setShowModalVer(false)}
        mode="ver"
        departamento={departamentoSeleccionado}
      />

      <ModalAltaDepartamento
        isOpen={showModalEditar}
        onClose={() => setShowModalEditar(false)}
        onConfirm={handleConfirmEditar}
        mode="editar"
        departamento={departamentoSeleccionado}
      />

      <ModalEliminarDepartamento
        isOpen={showModalEliminar}
        onClose={() => setShowModalEliminar(false)}
        onConfirm={handleConfirmEliminar}
        departamento={departamentoSeleccionado}
      />
    </div>
  )
}
