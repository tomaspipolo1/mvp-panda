"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { ModalAltaGerencia } from "@/components/organigrama/modal-alta-gerencia"
import { ModalEliminarGerencia } from "@/components/organigrama/modal-eliminar-gerencia"

// Datos de ejemplo para gerencias
const gerenciasData = [
  {
    id: 1,
    nombre: "Administración",
    codigo: "GA",
    descripcion: "Gestión administrativa y financiera",
    gerenteResponsable: "Carlos Mendoza",
    cantidadDepartamentos: 5,
    cantidadEmpleados: 45,
    estado: "Activa",
  },
  {
    id: 2,
    nombre: "Legales",
    codigo: "GAL",
    descripcion: "Asesoría legal y cumplimiento normativo",
    gerenteResponsable: "María González",
    cantidadDepartamentos: 3,
    cantidadEmpleados: 12,
    estado: "Activa",
  },
  {
    id: 3,
    nombre: "RRHH RRII y Comunidad",
    codigo: "GRIC",
    descripcion: "Gestión del capital humano, relaciones institucionales y comunidad",
    gerenteResponsable: "Roberto Silva",
    cantidadDepartamentos: 4,
    cantidadEmpleados: 28,
    estado: "Activa",
  },
  {
    id: 4,
    nombre: "Operaciones",
    codigo: "GO",
    descripcion: "Gestión operativa y logística",
    gerenteResponsable: "Ana Rodríguez",
    cantidadDepartamentos: 6,
    cantidadEmpleados: 52,
    estado: "Activa",
  },
  {
    id: 5,
    nombre: "Infraestructura y Mantenimiento",
    codigo: "GIM",
    descripcion: "Gestión de infraestructura y mantenimiento de instalaciones",
    gerenteResponsable: "Luis Martínez",
    cantidadDepartamentos: 4,
    cantidadEmpleados: 38,
    estado: "Activa",
  },
  {
    id: 6,
    nombre: "Presidencia",
    codigo: "PRES",
    descripcion: "Dirección ejecutiva y presidencia de la organización",
    gerenteResponsable: "Dr. Eduardo Fernández",
    cantidadDepartamentos: 2,
    cantidadEmpleados: 8,
    estado: "Activa",
  },
]

export default function GerenciasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredGerencias, setFilteredGerencias] = useState(gerenciasData)
  const [showModalAlta, setShowModalAlta] = useState(false)
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create")
  const [selectedGerencia, setSelectedGerencia] = useState<any>(null)
  const [showModalEliminar, setShowModalEliminar] = useState(false)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = gerenciasData.filter(
      (gerencia) =>
        gerencia.nombre.toLowerCase().includes(term.toLowerCase()) ||
        gerencia.codigo.toLowerCase().includes(term.toLowerCase()) ||
        gerencia.gerenteResponsable.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredGerencias(filtered)
  }

  const handleConfirmAlta = (nuevaGerencia: any) => {
    console.log("Nueva gerencia creada:", nuevaGerencia)
    // Aquí se haría la llamada a la API para crear la gerencia
    // Por ahora solo mostramos en consola
  }

  const handleVerDetalles = (gerencia: any) => {
    setSelectedGerencia(gerencia)
    setModalMode("view")
    setShowModalAlta(true)
  }

  const handleEditar = (gerencia: any) => {
    setSelectedGerencia(gerencia)
    setModalMode("edit")
    setShowModalAlta(true)
  }

  const handleEliminar = (gerencia: any) => {
    setSelectedGerencia(gerencia)
    setShowModalEliminar(true)
  }

  const handleConfirmEliminar = () => {
    console.log("Gerencia eliminada:", selectedGerencia)
    // Aquí se haría la llamada a la API para eliminar
    setSelectedGerencia(null)
  }

  const handleNuevaGerencia = () => {
    setSelectedGerencia(null)
    setModalMode("create")
    setShowModalAlta(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerencias</h1>
          <p className="text-gray-600 mt-1">Gestión de gerencias y estructura organizacional</p>
        </div>
        <Button className="bg-plp-dark hover:bg-plp-dark/90" onClick={handleNuevaGerencia}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Gerencia
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, código o gerente..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Gerencias */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Gerencias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Gerente Responsable</TableHead>
                  <TableHead className="text-center">Departamentos</TableHead>
                  <TableHead className="text-center">Empleados</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGerencias.map((gerencia) => (
                  <TableRow key={gerencia.id}>
                    <TableCell className="font-mono font-medium">{gerencia.codigo}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{gerencia.nombre}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{gerencia.descripcion}</div>
                      </div>
                    </TableCell>
                    <TableCell>{gerencia.gerenteResponsable}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{gerencia.cantidadDepartamentos}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{gerencia.cantidadEmpleados}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVerDetalles(gerencia)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditar(gerencia)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleEliminar(gerencia)}>
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

      {/* Modal Alta/Editar/Ver Gerencia */}
      <ModalAltaGerencia
        isOpen={showModalAlta}
        onClose={() => setShowModalAlta(false)}
        onConfirm={handleConfirmAlta}
        mode={modalMode}
        gerencia={selectedGerencia}
      />

      {/* Modal Eliminar Gerencia */}
      <ModalEliminarGerencia
        isOpen={showModalEliminar}
        onClose={() => setShowModalEliminar(false)}
        onConfirm={handleConfirmEliminar}
        gerencia={selectedGerencia}
      />
    </div>
  )
}
