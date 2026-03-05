"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, ArrowRight } from "lucide-react"
import { ModalEliminarFlujo } from "@/components/flujos-aprobacion/modal-eliminar-flujo"
import { TIPOS_FLUJOS, TipoFlujo, FlujoAprobacion, Aprobador } from "./types"

// Datos de ejemplo - Listado grande
const flujosData: FlujoAprobacion[] = [
  {
    id: "1",
    nombre: "Flujo de Inscripción de Proveedores",
    tipo: { categoria: "SOLICITUDES", id: "inscripcion", nombre: "Solicitud de Inscripción" },
    descripcion: "Flujo de aprobación para nuevas inscripciones de proveedores",
    activo: true,
    aprobadores: [
      { id: "a1", rol: "Gerente", cargo: "GER", usuarioId: "u1", usuarioNombre: "Carlos Mendoza", orden: 1 },
      { id: "a2", rol: "Director", cargo: "DIR", usuarioId: "u10", usuarioNombre: "Dr. Eduardo Fernández", orden: 2 },
    ],
    fechaCreacion: "2024-01-15",
    fechaActualizacion: "2024-01-20",
  },
  {
    id: "2",
    nombre: "Flujo de Visitas a Muelles",
    tipo: { categoria: "VISITAS", id: "muelles", nombre: "Visita a Muelles" },
    descripcion: "Aprobación requerida para visitas a las instalaciones de muelles",
    activo: true,
    aprobadores: [
      { id: "a3", rol: "Supervisor", cargo: "SUPERV", usuarioId: "u8", usuarioNombre: "Carmen López", orden: 1 },
      { id: "a4", rol: "Gerente", cargo: "GER", usuarioId: "u1", usuarioNombre: "Carlos Mendoza", orden: 2 },
    ],
    fechaCreacion: "2024-02-10",
    fechaActualizacion: "2024-02-10",
  },
  {
    id: "3",
    nombre: "Flujo de Redeterminación de Precios",
    tipo: { categoria: "SOLICITUDES", id: "redeterminacion", nombre: "Solicitud de Redeterminación" },
    descripcion: "Aprobación para solicitudes de redeterminación de precios",
    activo: true,
    aprobadores: [
      { id: "a5", rol: "Coordinador", cargo: "COORD", usuarioId: "u4", usuarioNombre: "Ana Rodríguez", orden: 1 },
      { id: "a6", rol: "Coordinador Superior", cargo: "COOSUPE", usuarioId: "u3", usuarioNombre: "Roberto Silva", orden: 2 },
      { id: "a7", rol: "Gerente", cargo: "GER", usuarioId: "u2", usuarioNombre: "María González", orden: 3 },
    ],
    fechaCreacion: "2024-01-20",
    fechaActualizacion: "2024-02-15",
  },
  {
    id: "4",
    nombre: "Flujo de Consultas Generales",
    tipo: { categoria: "SOLICITUDES", id: "consulta", nombre: "Solicitud de Consulta" },
    descripcion: "Flujo para consultas generales de proveedores",
    activo: true,
    aprobadores: [
      { id: "a8", rol: "Subcoordinador", cargo: "SUBCOOR", usuarioId: "u6", usuarioNombre: "Diego Fernández", orden: 1 },
    ],
    fechaCreacion: "2024-03-01",
    fechaActualizacion: "2024-03-01",
  },
  {
    id: "5",
    nombre: "Flujo de Visitas de Acceso a Obra",
    tipo: { categoria: "VISITAS", id: "acceso-obra", nombre: "Visita de Acceso a Obra" },
    descripcion: "Aprobación para visitas de acceso a obras en construcción",
    activo: true,
    aprobadores: [
      { id: "a9", rol: "Supervisor", cargo: "SUPERV", usuarioId: "u9", usuarioNombre: "Juan Pérez", orden: 1 },
      { id: "a10", rol: "Coordinador", cargo: "COORD", usuarioId: "u5", usuarioNombre: "Luis Martínez", orden: 2 },
      { id: "a11", rol: "Gerente", cargo: "GER", usuarioId: "u1", usuarioNombre: "Carlos Mendoza", orden: 3 },
    ],
    fechaCreacion: "2024-02-20",
    fechaActualizacion: "2024-02-25",
  },
  {
    id: "6",
    nombre: "Flujo de Reinscripción de Proveedores",
    tipo: { categoria: "SOLICITUDES", id: "reinscripcion", nombre: "Solicitud de Reinscripción" },
    descripcion: "Flujo para reinscripciones de proveedores existentes",
    activo: true,
    aprobadores: [
      { id: "a12", rol: "Coordinador", cargo: "COORD", usuarioId: "u4", usuarioNombre: "Ana Rodríguez", orden: 1 },
      { id: "a13", rol: "Gerente", cargo: "GER", usuarioId: "u2", usuarioNombre: "María González", orden: 2 },
    ],
    fechaCreacion: "2024-01-25",
    fechaActualizacion: "2024-01-25",
  },
  {
    id: "7",
    nombre: "Flujo de Visitas de Mantenimiento",
    tipo: { categoria: "VISITAS", id: "mantenimiento", nombre: "Visita de Mantenimiento" },
    descripcion: "Aprobación para visitas de mantenimiento de instalaciones",
    activo: true,
    aprobadores: [
      { id: "a14", rol: "Subcoordinador", cargo: "SUBCOOR", usuarioId: "u7", usuarioNombre: "Patricia Morales", orden: 1 },
      { id: "a15", rol: "Supervisor", cargo: "SUPERV", usuarioId: "u8", usuarioNombre: "Carmen López", orden: 2 },
    ],
    fechaCreacion: "2024-03-05",
    fechaActualizacion: "2024-03-05",
  },
  {
    id: "8",
    nombre: "Flujo de Modificación de Datos",
    tipo: { categoria: "SOLICITUDES", id: "modificacion", nombre: "Solicitud de Modificación" },
    descripcion: "Flujo para modificaciones de datos de proveedores",
    activo: true,
    aprobadores: [
      { id: "a16", rol: "Coordinador", cargo: "COORD", usuarioId: "u4", usuarioNombre: "Ana Rodríguez", orden: 1 },
    ],
    fechaCreacion: "2024-02-28",
    fechaActualizacion: "2024-02-28",
  },
  {
    id: "9",
    nombre: "Flujo de Visitas a Eventos",
    tipo: { categoria: "VISITAS", id: "eventos", nombre: "Visita a Eventos" },
    descripcion: "Aprobación para visitas relacionadas con eventos corporativos",
    activo: true,
    aprobadores: [
      { id: "a17", rol: "Coordinador Superior", cargo: "COOSUPE", usuarioId: "u3", usuarioNombre: "Roberto Silva", orden: 1 },
      { id: "a18", rol: "Director", cargo: "DIR", usuarioId: "u10", usuarioNombre: "Dr. Eduardo Fernández", orden: 2 },
    ],
    fechaCreacion: "2024-03-10",
    fechaActualizacion: "2024-03-10",
  },
  {
    id: "10",
    nombre: "Flujo de Baja de Proveedores",
    tipo: { categoria: "SOLICITUDES", id: "baja", nombre: "Solicitud de Baja" },
    descripcion: "Flujo para solicitudes de baja de proveedores",
    activo: true,
    aprobadores: [
      { id: "a19", rol: "Gerente", cargo: "GER", usuarioId: "u1", usuarioNombre: "Carlos Mendoza", orden: 1 },
      { id: "a20", rol: "Coordinador Superior", cargo: "COOSUPE", usuarioId: "u3", usuarioNombre: "Roberto Silva", orden: 2 },
      { id: "a21", rol: "Director", cargo: "DIR", usuarioId: "u10", usuarioNombre: "Dr. Eduardo Fernández", orden: 3 },
    ],
    fechaCreacion: "2024-01-30",
    fechaActualizacion: "2024-02-05",
  },
  {
    id: "11",
    nombre: "Flujo de Visitas de Inspección",
    tipo: { categoria: "VISITAS", id: "inspeccion", nombre: "Visita de Inspección" },
    descripcion: "Aprobación para visitas de inspección técnica",
    activo: false,
    aprobadores: [
      { id: "a22", rol: "Supervisor", cargo: "SUPERV", usuarioId: "u9", usuarioNombre: "Juan Pérez", orden: 1 },
    ],
    fechaCreacion: "2024-03-15",
    fechaActualizacion: "2024-03-15",
  },
  {
    id: "12",
    nombre: "Flujo de Consultas Urgentes",
    tipo: { categoria: "SOLICITUDES", id: "consulta", nombre: "Solicitud de Consulta" },
    descripcion: "Flujo rápido para consultas urgentes",
    activo: true,
    aprobadores: [
      { id: "a23", rol: "Subcoordinador", cargo: "SUBCOOR", usuarioId: "u6", usuarioNombre: "Diego Fernández", orden: 1 },
      { id: "a24", rol: "Coordinador", cargo: "COORD", usuarioId: "u5", usuarioNombre: "Luis Martínez", orden: 2 },
    ],
    fechaCreacion: "2024-03-20",
    fechaActualizacion: "2024-03-20",
  },
]

export default function FlujosAprobacionPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredFlujos, setFilteredFlujos] = useState(flujosData)
  const [showModalEliminar, setShowModalEliminar] = useState(false)
  const [flujoSeleccionado, setFlujoSeleccionado] = useState<FlujoAprobacion | null>(null)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = flujosData.filter(
      (flujo) =>
        flujo.nombre.toLowerCase().includes(term.toLowerCase()) ||
        flujo.tipo.nombre.toLowerCase().includes(term.toLowerCase()) ||
        flujo.descripcion?.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredFlujos(filtered)
  }

  const handleNuevoFlujo = () => {
    router.push("/admin/admin/flujos-aprobacion/nuevo")
  }

  const handleVerFlujo = (flujo: FlujoAprobacion) => {
    setOpenDropdownId(null)
    router.push(`/admin/admin/flujos-aprobacion/${flujo.id}`)
  }

  const handleEditarFlujo = (flujo: FlujoAprobacion) => {
    setOpenDropdownId(null)
    router.push(`/admin/admin/flujos-aprobacion/${flujo.id}/editar`)
  }

  const handleEliminarFlujo = (flujo: FlujoAprobacion) => {
    // Cerrar el dropdown primero
    setOpenDropdownId(null)
    // Usar setTimeout para asegurar que el dropdown se cierre antes de abrir el modal
    setTimeout(() => {
      setFlujoSeleccionado(flujo)
      setShowModalEliminar(true)
    }, 100)
  }

  const handleConfirmEliminar = () => {
    console.log("Eliminando flujo:", flujoSeleccionado)
    setShowModalEliminar(false)
    setFlujoSeleccionado(null)
  }

  const handleCloseModal = () => {
    setShowModalEliminar(false)
    setFlujoSeleccionado(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Flujos de Aprobación</h1>
          <p className="text-gray-600 mt-1">Configure los flujos de aprobación para solicitudes y visitas</p>
        </div>
        <Button className="bg-plp-dark hover:bg-plp-dark/90" onClick={handleNuevoFlujo}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Flujo
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, tipo o descripción..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Flujos */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Flujos ({filteredFlujos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-center">Aprobadores</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFlujos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No se encontraron flujos que coincidan con la búsqueda.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFlujos.map((flujo) => (
                    <TableRow key={flujo.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div>
                          <div className="font-medium">{flujo.nombre}</div>
                          {flujo.descripcion && (
                            <div className="text-sm text-gray-500 truncate max-w-md">{flujo.descripcion}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{flujo.tipo.nombre}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={flujo.tipo.categoria === "SOLICITUDES" ? "default" : "secondary"}
                          className={
                            flujo.tipo.categoria === "SOLICITUDES"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-green-100 text-green-800 hover:bg-green-100"
                          }
                        >
                          {flujo.tipo.categoria === "SOLICITUDES" ? "Solicitud" : "Visita"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Badge variant="outline">{flujo.aprobadores.length}</Badge>
                          <span className="text-xs text-gray-500">aprobadores</span>
                        </div>
                        {flujo.aprobadores.length > 0 && (
                          <div className="text-xs text-gray-400 mt-1">
                            {flujo.aprobadores
                              .sort((a, b) => a.orden - b.orden)
                              .slice(0, 2)
                              .map((a, idx) => (
                                <span key={a.id}>
                                  {idx > 0 && <ArrowRight className="inline h-3 w-3 mx-1" />}
                                  {a.usuarioNombre || a.rol}
                                </span>
                              ))}
                            {flujo.aprobadores.length > 2 && (
                              <span className="text-gray-500"> +{flujo.aprobadores.length - 2} más</span>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={flujo.activo ? "default" : "secondary"}
                          className={flujo.activo ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        >
                          {flujo.activo ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu
                          open={openDropdownId === flujo.id}
                          onOpenChange={(open) => {
                            if (!open) {
                              setOpenDropdownId(null)
                            } else {
                              setOpenDropdownId(flujo.id)
                            }
                          }}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleVerFlujo(flujo)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                                handleEditarFlujo(flujo)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onSelect={(e) => {
                                e.preventDefault()
                                handleEliminarFlujo(flujo)
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Eliminar */}
      <ModalEliminarFlujo
        isOpen={showModalEliminar}
        onClose={handleCloseModal}
        onConfirm={handleConfirmEliminar}
        flujo={flujoSeleccionado}
      />
    </div>
  )
}
