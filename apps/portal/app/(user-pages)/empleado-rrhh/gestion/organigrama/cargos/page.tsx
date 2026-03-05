"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, Edit, Trash2, ChevronLeft, ChevronRight, Briefcase } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ModalAltaCargo } from "@/components/organigrama/modal-alta-cargo"
import { ModalEliminarCargo } from "@/components/organigrama/modal-eliminar-cargo"

// Datos de ejemplo para cargos
const cargosData = [
  { codigo: "AGENLA", nombre: "AGENTE DE ENLACE", descripcion: "Responsable de enlace y coordinación", empleados: 3 },
  { codigo: "AN1A", nombre: "AN1 ADMINISTRATIVO", descripcion: "Analista nivel 1 área administrativa", empleados: 12 },
  { codigo: "AN1F", nombre: "AN1 FERROVIARIO", descripcion: "Analista nivel 1 área ferroviaria", empleados: 8 },
  { codigo: "AN1OB", nombre: "AN1 OBRERO", descripcion: "Analista nivel 1 área obrera", empleados: 15 },
  { codigo: "AN1OP", nombre: "AN1 OPERATIVO", descripcion: "Analista nivel 1 área operativa", empleados: 10 },
  {
    codigo: "AN1M",
    nombre: "AN1 MANT, VIAS Y OBRAS",
    descripcion: "Analista nivel 1 mantenimiento, vías y obras",
    empleados: 18,
  },
  { codigo: "AN2A", nombre: "AN2 ADMINISTRATIVO", descripcion: "Analista nivel 2 área administrativa", empleados: 9 },
  { codigo: "AN2F", nombre: "AN2 FERROVIARIO", descripcion: "Analista nivel 2 área ferroviaria", empleados: 6 },
  {
    codigo: "AN2M",
    nombre: "AN2 MANT, VIAS Y OBRAS",
    descripcion: "Analista nivel 2 mantenimiento, vías y obras",
    empleados: 14,
  },
  { codigo: "AN2OB", nombre: "AN2 OBRERO", descripcion: "Analista nivel 2 área obrera", empleados: 11 },
  { codigo: "AN2OP", nombre: "AN2 OPERATIVO", descripcion: "Analista nivel 2 área operativa", empleados: 7 },
  { codigo: "AN3A", nombre: "AN3 ADMINISTRATIVO", descripcion: "Analista nivel 3 área administrativa", empleados: 5 },
  { codigo: "AN3F", nombre: "AN3 FERROVIARIO", descripcion: "Analista nivel 3 área ferroviaria", empleados: 4 },
  {
    codigo: "AN3M",
    nombre: "AN3 MANT, VIAS Y OBRAS",
    descripcion: "Analista nivel 3 mantenimiento, vías y obras",
    empleados: 8,
  },
  { codigo: "PROFJUN", nombre: "PROFESIONAL JUNIOR", descripcion: "Profesional nivel junior", empleados: 12 },
  { codigo: "AN3OP", nombre: "AN3 OPERATIVO", descripcion: "Analista nivel 3 área operativa", empleados: 6 },
  { codigo: "ASPCON", nombre: "ASPIRANTE A CONDUCTOR", descripcion: "Aspirante a conductor de trenes", empleados: 8 },
  { codigo: "COND", nombre: "CONDUCTOR", descripcion: "Conductor de trenes", empleados: 25 },
  { codigo: "COORD", nombre: "COORDINADOR", descripcion: "Coordinador de área", empleados: 15 },
  { codigo: "COOSUPE", nombre: "COORDINADOR SUPERIOR", descripcion: "Coordinador superior de área", empleados: 8 },
  {
    codigo: "E1A",
    nombre: "E1 ADMINISTRATIVO",
    descripcion: "Especialista nivel 1 área administrativa",
    empleados: 10,
  },
  { codigo: "E1F", nombre: "E1 FERROVIARIO", descripcion: "Especialista nivel 1 área ferroviaria", empleados: 12 },
  {
    codigo: "E1M",
    nombre: "E1 MANT, VIAS Y OBRAS",
    descripcion: "Especialista nivel 1 mantenimiento, vías y obras",
    empleados: 20,
  },
  { codigo: "E1OB", nombre: "E1 OBRERO", descripcion: "Especialista nivel 1 área obrera", empleados: 18 },
  { codigo: "E1OP", nombre: "E1 OPERATIVO", descripcion: "Especialista nivel 1 área operativa", empleados: 14 },
  { codigo: "E2A", nombre: "E2 ADMINISTRATIVO", descripcion: "Especialista nivel 2 área administrativa", empleados: 8 },
  { codigo: "E2F", nombre: "E2 FERROVIARIO", descripcion: "Especialista nivel 2 área ferroviaria", empleados: 9 },
  {
    codigo: "E2M",
    nombre: "E2 MANT, VIAS Y OBRAS",
    descripcion: "Especialista nivel 2 mantenimiento, vías y obras",
    empleados: 16,
  },
  { codigo: "GER", nombre: "GERENTE", descripcion: "Gerente de área", empleados: 6 },
  { codigo: "E2OP", nombre: "E2 OPERATIVO", descripcion: "Especialista nivel 2 área operativa", empleados: 11 },
  { codigo: "E3A", nombre: "E3 ADMINISTRATIVO", descripcion: "Especialista nivel 3 área administrativa", empleados: 6 },
  { codigo: "E3F", nombre: "E3 FERROVIARIO", descripcion: "Especialista nivel 3 área ferroviaria", empleados: 7 },
  {
    codigo: "E3M",
    nombre: "E3 MANT, VIAS Y OBRAS",
    descripcion: "Especialista nivel 3 mantenimiento, vías y obras",
    empleados: 12,
  },
  { codigo: "E3OB", nombre: "E3 OBRERO", descripcion: "Especialista nivel 3 área obrera", empleados: 10 },
  { codigo: "E3OP", nombre: "E3 OPERATIVO", descripcion: "Especialista nivel 3 área operativa", empleados: 8 },
  { codigo: "E2OB", nombre: "E2 OBRERO", descripcion: "Especialista nivel 2 área obrera", empleados: 13 },
  { codigo: "E4F", nombre: "E4 FERROVIARIO", descripcion: "Especialista nivel 4 área ferroviaria", empleados: 5 },
  {
    codigo: "E4M",
    nombre: "E4 MANT, VIAS Y OBRAS",
    descripcion: "Especialista nivel 4 mantenimiento, vías y obras",
    empleados: 9,
  },
  { codigo: "E4OB", nombre: "E4 OBRERO", descripcion: "Especialista nivel 4 área obrera", empleados: 7 },
  { codigo: "E4OP", nombre: "E4 OPERATIVO", descripcion: "Especialista nivel 4 área operativa", empleados: 6 },
  {
    codigo: "E5M",
    nombre: "E5 MANT, VIAS Y OBRAS",
    descripcion: "Especialista nivel 5 mantenimiento, vías y obras",
    empleados: 4,
  },
  {
    codigo: "E6M",
    nombre: "E6 MANT, VIAS Y OBRAS",
    descripcion: "Especialista nivel 6 mantenimiento, vías y obras",
    empleados: 3,
  },
  { codigo: "E4A", nombre: "E4 ADMINISTRATIVO", descripcion: "Especialista nivel 4 área administrativa", empleados: 4 },
  { codigo: "INST", nombre: "INSTRUCTOR", descripcion: "Instructor de capacitación", empleados: 8 },
  { codigo: "JTREN", nombre: "JEFE DE TREN", descripcion: "Jefe de tren", empleados: 12 },
  { codigo: "ODEP", nombre: "OPERADOR DE DEPOSITO", descripcion: "Operador de depósito", empleados: 15 },
  { codigo: "ODEPII", nombre: "OPERADOR DE DEPOSITO II", descripcion: "Operador de depósito nivel II", empleados: 10 },
  { codigo: "PAS", nombre: "PASANTE", descripcion: "Pasante en formación", empleados: 20 },
  { codigo: "AN3OB", nombre: "AN3 OBRERO", descripcion: "Analista nivel 3 área obrera", empleados: 7 },
  { codigo: "PROFING", nombre: "PROFESIONAL INGRESANTE", descripcion: "Profesional ingresante", empleados: 15 },
  { codigo: "PROFMED", nombre: "PROFESIONAL MEDIO", descripcion: "Profesional nivel medio", empleados: 18 },
  { codigo: "PROFSEN", nombre: "PROFESIONAL SENIOR", descripcion: "Profesional senior", empleados: 12 },
  { codigo: "PROFSUP", nombre: "PROFESIONAL SUPERIOR", descripcion: "Profesional superior", empleados: 8 },
  { codigo: "SUBCOOR", nombre: "SUBCOORDINADOR", descripcion: "Subcoordinador de área", empleados: 10 },
  { codigo: "SUBSUPE", nombre: "SUBCOORDINADOR SUPERIOR", descripcion: "Subcoordinador superior", empleados: 6 },
  { codigo: "SUPERV", nombre: "SUPERVISOR", descripcion: "Supervisor de área", empleados: 14 },
  { codigo: "TEC", nombre: "TECNICO", descripcion: "Técnico especializado", empleados: 22 },
  { codigo: "TECING", nombre: "TECNICO INGRESANTE", descripcion: "Técnico ingresante", empleados: 16 },
]

const ITEMS_PER_PAGE = 12

export default function CargosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Estados para los modales
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create")
  const [showModalCargo, setShowModalCargo] = useState(false)
  const [showModalEliminar, setShowModalEliminar] = useState(false)
  const [selectedCargo, setSelectedCargo] = useState<any>(null)

  // Filtrar cargos
  const filteredCargos = cargosData.filter(
    (cargo) =>
      cargo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cargo.codigo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calcular paginación
  const totalPages = Math.ceil(filteredCargos.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCargos = filteredCargos.slice(startIndex, endIndex)

  // Reset página al filtrar
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  // Handlers para los modales
  const handleNuevoCargo = () => {
    setModalMode("create")
    setSelectedCargo(null)
    setShowModalCargo(true)
  }

  const handleVerCargo = (cargo: any) => {
    setModalMode("view")
    setSelectedCargo(cargo)
    setShowModalCargo(true)
  }

  const handleEditarCargo = (cargo: any) => {
    setModalMode("edit")
    setSelectedCargo(cargo)
    setShowModalCargo(true)
  }

  const handleEliminarCargo = (cargo: any) => {
    setSelectedCargo(cargo)
    setShowModalEliminar(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Cargos</h1>
          <p className="text-muted-foreground">Administra los cargos y posiciones de la organización</p>
        </div>
        <Button onClick={handleNuevoCargo}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cargo
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o código..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de cargos */}
      <Card>
        <CardHeader>
          <CardTitle>Cargos ({filteredCargos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Empleados</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCargos.map((cargo) => (
                <TableRow key={cargo.codigo}>
                  <TableCell>
                    <code className="font-mono font-bold text-sm bg-muted px-2 py-1 rounded">{cargo.codigo}</code>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{cargo.nombre}</div>
                      <div className="text-sm text-muted-foreground">{cargo.descripcion}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{cargo.empleados}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleVerCargo(cargo)}>
                          <Briefcase className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditarCargo(cargo)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEliminarCargo(cargo)} className="text-red-600">
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

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1} a {Math.min(endIndex, filteredCargos.length)} de {filteredCargos.length}{" "}
                cargos
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modales */}
      <ModalAltaCargo
        isOpen={showModalCargo}
        onClose={() => setShowModalCargo(false)}
        cargo={selectedCargo}
        mode={modalMode}
      />

      {selectedCargo && (
        <ModalEliminarCargo
          isOpen={showModalEliminar}
          onClose={() => setShowModalEliminar(false)}
          cargo={selectedCargo}
        />
      )}
    </div>
  )
}
