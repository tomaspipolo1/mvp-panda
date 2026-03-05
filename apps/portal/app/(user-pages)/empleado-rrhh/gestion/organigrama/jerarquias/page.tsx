"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Crown,
  Users,
  User,
  UserCheck,
  UserCog,
  Shield,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Search,
  Eye,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import ModalAltaNivelJerarquico from "@/components/organigrama/modal-alta-nivel-jerarquico"
import ModalEliminarNivelJerarquico from "@/components/organigrama/modal-eliminar-nivel-jerarquico"

// Datos de la jerarquía - Datos reales de la empresa
const jerarquiaData = [
  {
    id: 1,
    nivel: 1,
    cargo: "Gerente",
    codigo: "GER",
    descripcion: "Máximo nivel de responsabilidad y toma de decisiones estratégicas",
    empleados: 6,
    color: "bg-red-500",
    icon: Crown,
  },
  {
    id: 2,
    nivel: 2,
    cargo: "Coordinador Superior",
    codigo: "COOSUPE",
    descripcion: "Coordinación de alto nivel y supervisión de múltiples áreas",
    empleados: 1,
    color: "bg-orange-500",
    icon: Users,
  },
  {
    id: 3,
    nivel: 3,
    cargo: "Coordinador",
    codigo: "COORD",
    descripcion: "Coordinación operativa y gestión de equipos de trabajo",
    empleados: 12,
    color: "bg-yellow-500",
    icon: User,
  },
  {
    id: 4,
    nivel: 4,
    cargo: "Subcoordinador Superior",
    codigo: "SUBSUPE",
    descripcion: "Subcoordinación especializada y apoyo a coordinadores",
    empleados: 0,
    color: "bg-green-500",
    icon: UserCheck,
  },
  {
    id: 5,
    nivel: 5,
    cargo: "Subcoordinador",
    codigo: "SUBCOOR",
    descripcion: "Subcoordinación operativa y supervisión directa",
    empleados: 10,
    color: "bg-blue-500",
    icon: UserCog,
  },
  {
    id: 6,
    nivel: 6,
    cargo: "Supervisor",
    codigo: "SUPERV",
    descripcion: "Supervisión directa del personal operativo",
    empleados: 0,
    color: "bg-purple-500",
    icon: Shield,
  },
]

export default function JerarquiasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [modalAltaOpen, setModalAltaOpen] = useState(false)
  const [modalEliminarOpen, setModalEliminarOpen] = useState(false)
  const [modoModal, setModoModal] = useState<"crear" | "editar" | "ver">("crear")
  const [nivelSeleccionado, setNivelSeleccionado] = useState<any>(null)

  const filteredData = jerarquiaData.filter(
    (nivel) =>
      nivel.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nivel.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nivel.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleVerNivel = (nivel: any) => {
    setNivelSeleccionado(nivel)
    setModoModal("ver")
    setModalAltaOpen(true)
  }

  const handleEditarNivel = (nivel: any) => {
    setNivelSeleccionado(nivel)
    setModoModal("editar")
    setModalAltaOpen(true)
  }

  const handleEliminarNivel = (nivel: any) => {
    setNivelSeleccionado(nivel)
    setModalEliminarOpen(true)
  }

  const handleCrearNivel = () => {
    setNivelSeleccionado(null)
    setModoModal("crear")
    setModalAltaOpen(true)
  }

  const handleSubmitNivel = async (data: any) => {
    console.log("Guardar nivel:", data)
    // Aquí iría la lógica para guardar/actualizar el nivel
  }

  const handleConfirmarEliminacion = async () => {
    console.log("Eliminar nivel:", nivelSeleccionado?.cargo)
    // Aquí iría la lógica para eliminar el nivel
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jerarquías Organizacionales</h1>
          <p className="text-gray-600 mt-1">Estructura jerárquica de cargos y niveles de responsabilidad</p>
        </div>
        <Button className="bg-plp-dark hover:bg-plp-medium" onClick={handleCrearNivel}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Nivel
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por cargo, código o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Jerarquías */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Estructura Jerárquica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Nivel</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="w-24">Código</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="w-24 text-center">Empleados</TableHead>
                <TableHead className="w-20 text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((nivel) => {
                const IconComponent = nivel.icon
                return (
                  <TableRow key={nivel.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${nivel.color} flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{nivel.nivel}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${nivel.color}`}>
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{nivel.cargo}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono font-bold">
                        {nivel.codigo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600 max-w-md">{nivel.descripcion}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{nivel.empleados}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleVerNivel(nivel)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditarNivel(nivel)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEliminarNivel(nivel)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron niveles jerárquicos que coincidan con la búsqueda.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modales */}
      <ModalAltaNivelJerarquico
        isOpen={modalAltaOpen}
        onClose={() => setModalAltaOpen(false)}
        onSubmit={handleSubmitNivel}
        modo={modoModal}
        nivelInicial={nivelSeleccionado}
      />

      <ModalEliminarNivelJerarquico
        isOpen={modalEliminarOpen}
        onClose={() => setModalEliminarOpen(false)}
        onConfirm={handleConfirmarEliminacion}
        nivel={nivelSeleccionado}
      />
    </div>
  )
}
