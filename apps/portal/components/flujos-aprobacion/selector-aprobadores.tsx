"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { GripVertical, X, ArrowRight, User, Search, Building2 } from "lucide-react"
import { Aprobador } from "@/app/(user-pages)/admin/admin/flujos-aprobacion/types"

interface SelectorAprobadoresProps {
  aprobadores: Aprobador[]
  onAprobadoresChange: (aprobadores: Aprobador[]) => void
  disabled?: boolean
  modoSeleccion?: "persona" | "departamento"
}

// Cargos disponibles
const cargos = [
  { id: "COORD", nombre: "Coordinador", rol: "Coordinador" },
  { id: "SUBCOOR", nombre: "Subcoordinador", rol: "Subcoordinador" },
  { id: "GER", nombre: "Gerente", rol: "Gerente" },
  { id: "PRES", nombre: "Presidente", rol: "Presidente" },
  { id: "SUPERV", nombre: "Supervisor", rol: "Supervisor" },
]

// Usuarios de ejemplo (en producción vendría de la API)
const usuariosPorCargo: Record<string, Array<{ id: string; nombre: string }>> = {
  COORD: [
    { id: "u4", nombre: "Ana Rodríguez" },
    { id: "u5", nombre: "Luis Martínez" },
    { id: "u11", nombre: "Pedro Sánchez" },
  ],
  SUBCOOR: [
    { id: "u6", nombre: "Diego Fernández" },
    { id: "u7", nombre: "Patricia Morales" },
  ],
  GER: [
    { id: "u1", nombre: "Carlos Mendoza" },
    { id: "u2", nombre: "María González" },
  ],
  PRES: [
    { id: "u12", nombre: "Dr. Roberto Martínez" },
    { id: "u13", nombre: "Ing. Laura Fernández" },
  ],
  SUPERV: [
    { id: "u8", nombre: "Carmen López" },
    { id: "u9", nombre: "Juan Pérez" },
    { id: "u14", nombre: "Sofía Ramírez" },
  ],
}

type ItemDisponible = {
  id: string
  nombre: string
  rol: string
  cargo: string
  usuarioId: string
}

type DepartamentoDisponible = {
  id: string
  nombre: string
}

// Departamentos de ejemplo (mock de búsqueda)
const departamentos: DepartamentoDisponible[] = [
  { id: "dep-compras", nombre: "Compras / Ingeniería" },
  { id: "dep-seguridad", nombre: "Seguridad" },
  { id: "dep-rrhh", nombre: "Recursos Humanos" },
  { id: "dep-legales", nombre: "Legales" },
  { id: "dep-finanzas", nombre: "Finanzas" },
  { id: "dep-operaciones", nombre: "Operaciones" },
  { id: "dep-it", nombre: "Tecnología (IT)" },
  { id: "dep-infra", nombre: "Infraestructura" },
]

export function SelectorAprobadores({
  aprobadores,
  onAprobadoresChange,
  disabled = false,
  modoSeleccion = "persona",
}: SelectorAprobadoresProps) {
  const [busquedaPersona, setBusquedaPersona] = useState<string>("")
  const [busquedaDepartamento, setBusquedaDepartamento] = useState<string>("")
  const [draggedItem, setDraggedItem] = useState<{ source: "disponibles" | "aprobadores"; index: number; data?: any } | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const normalizar = (valor: string) => valor.trim().toLowerCase()

  // Generar lista plana de todos los usuarios con sus cargos
  const todosLosUsuarios: ItemDisponible[] = cargos.flatMap((cargo) => {
    const usuarios = usuariosPorCargo[cargo.id] || []
    return usuarios.map((usuario) => ({
      id: `${cargo.id}-${usuario.id}`,
      nombre: usuario.nombre,
      rol: cargo.rol,
      cargo: cargo.id,
      usuarioId: usuario.id,
    }))
  })

  // Filtrar usuarios por nombre o cargo según búsqueda
  const usuariosFiltrados = todosLosUsuarios.filter((usuario) => {
    const busquedaLower = busquedaPersona.toLowerCase()
    const nombreMatch = usuario.nombre.toLowerCase().includes(busquedaLower)
    const cargoMatch = usuario.rol.toLowerCase().includes(busquedaLower)
    return nombreMatch || cargoMatch
  })

  // Filtrar items que ya están en aprobadores (solo usuarios específicos)
  const itemsDisponiblesFiltrados = usuariosFiltrados.filter((item) => {
    return !aprobadores.some((a) => a.usuarioId === item.usuarioId && !a.esDepartamento)
  })

  const puedeAgregarDepartamento = (nombre: string) => {
    if (!nombre.trim()) return false
    return !aprobadores.some(
      (a) => a.esDepartamento && normalizar(a.departamento || "") === normalizar(nombre)
    )
  }

  const departamentosFiltrados = departamentos.filter((dep) =>
    normalizar(dep.nombre).includes(normalizar(busquedaDepartamento))
  )

  const handleAgregarDesdeDisponibles = (item: ItemDisponible) => {
    if (item.usuarioId && item.rol && item.cargo) {
      const nuevoAprobador: Aprobador = {
        id: `aprobador-${Date.now()}-${Math.random()}`,
        rol: item.rol,
        cargo: item.cargo,
        usuarioId: item.usuarioId,
        usuarioNombre: item.nombre,
        orden: aprobadores.length + 1,
        esDepartamento: false,
      }
      onAprobadoresChange([...aprobadores, nuevoAprobador])
    }
  }

  const handleAgregarDepartamento = (nombreDepartamento: string) => {
    if (!puedeAgregarDepartamento(nombreDepartamento)) return
    const nuevoAprobador: Aprobador = {
      id: `aprobador-dep-${Date.now()}-${Math.random()}`,
      rol: nombreDepartamento,
      cargo: "DEPARTAMENTO",
      usuarioId: "",
      usuarioNombre: undefined,
      orden: aprobadores.length + 1,
      esDepartamento: true,
      departamento: nombreDepartamento,
    }
    onAprobadoresChange([...aprobadores, nuevoAprobador])
  }


  const handleEliminarAprobador = (id: string) => {
    const nuevosAprobadores = aprobadores
      .filter((a) => a.id !== id)
      .map((a, idx) => ({ ...a, orden: idx + 1 }))
    onAprobadoresChange(nuevosAprobadores)
  }

  // Drag and Drop handlers para items disponibles
  const handleDragStartDisponible = (e: React.DragEvent, index: number, item: ItemDisponible) => {
    if (disabled) return
    setDraggedItem({ source: "disponibles", index, data: item })
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", "") // Necesario para algunos navegadores
  }

  const handleDragOverDisponible = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (draggedItem?.source === "aprobadores") {
      e.dataTransfer.dropEffect = "move"
    }
  }

  const handleDropEnDisponibles = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Si se arrastra desde aprobadores, eliminar
    if (draggedItem?.source === "aprobadores" && draggedItem.index !== null) {
      const itemToRemove = aprobadores[draggedItem.index]
      handleEliminarAprobador(itemToRemove.id)
    }
    
    setDraggedItem(null)
    setDragOverIndex(null)
  }

  // Drag and Drop handlers para aprobadores
  const handleDragStartAprobador = (e: React.DragEvent, index: number) => {
    if (disabled) return
    setDraggedItem({ source: "aprobadores", index })
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", "")
  }

  const handleDragOverAprobador = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverIndex(index)
    e.dataTransfer.dropEffect = "move"
  }

  const handleDropEnAprobador = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    e.stopPropagation()

    if (!draggedItem) {
      setDragOverIndex(null)
      return
    }

    if (draggedItem.source === "aprobadores") {
      // Reordenar dentro de aprobadores
      if (draggedItem.index === dropIndex) {
        setDraggedItem(null)
        setDragOverIndex(null)
        return
      }

      const items = [...aprobadores]
      const draggedItemData = items[draggedItem.index]
      items.splice(draggedItem.index, 1)
      items.splice(dropIndex, 0, draggedItemData)

      const reordered = items.map((item, idx) => ({ ...item, orden: idx + 1 }))
      onAprobadoresChange(reordered)
    } else if (draggedItem.source === "disponibles" && draggedItem.data) {
      // Agregar desde disponibles
      handleAgregarDesdeDisponibles(draggedItem.data)
    }

    setDraggedItem(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverIndex(null)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Columna izquierda - Selector de cargo y Usuarios disponibles */}
      <Card
        onDragOver={handleDragOverDisponible}
        onDrop={handleDropEnDisponibles}
        className={draggedItem?.source === "aprobadores" ? "border-2 border-dashed border-blue-400" : ""}
      >
        <CardHeader>
          <CardTitle className="text-sm">
            {modoSeleccion === "departamento" ? "Departamentos disponibles" : "Usuarios disponibles"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {modoSeleccion === "persona" ? (
            <div className="space-y-2">
              <Label htmlFor="busqueda-persona">Seleccionar Persona</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="busqueda-persona"
                  placeholder="Buscar por nombre o cargo..."
                  value={busquedaPersona}
                  onChange={(e) => {
                    setBusquedaPersona(e.target.value)
                  }}
                  disabled={disabled}
                  className="pl-10"
                />
              </div>
              {busquedaPersona && (
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {itemsDisponiblesFiltrados.length === 0 ? (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      No se encontraron personas
                    </div>
                  ) : (
                    itemsDisponiblesFiltrados.map((item, index) => (
                      <Card
                        key={item.id}
                        draggable={!disabled}
                        onDragStart={(e) => handleDragStartDisponible(e, index, item)}
                        onDragEnd={handleDragEnd}
                        className={`transition-all cursor-move hover:shadow-md ${
                          draggedItem?.source === "disponibles" && draggedItem.index === index
                            ? "opacity-50 border-2 border-blue-500"
                            : ""
                        }`}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-blue-500" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">{item.nombre}</div>
                              {item.rol && <div className="text-xs text-gray-500">{item.rol}</div>}
                            </div>
                            {!disabled && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => handleAgregarDesdeDisponibles(item)}
                              >
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}
              {!busquedaPersona && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Escriba el nombre de una persona para buscar
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="busqueda-departamento">Seleccionar Departamento</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="busqueda-departamento"
                  placeholder="Buscar por nombre de departamento..."
                  value={busquedaDepartamento}
                  onChange={(e) => setBusquedaDepartamento(e.target.value)}
                  disabled={disabled}
                  className="pl-10"
                />
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {departamentosFiltrados.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No se encontraron departamentos
                  </div>
                ) : (
                  departamentosFiltrados.map((dep) => (
                    <Card key={dep.id} className="transition-all hover:shadow-md">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-purple-500" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{dep.nombre}</div>
                            <div className="text-xs text-gray-500">Buzón de departamento</div>
                          </div>
                          {!disabled && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleAgregarDepartamento(dep.nombre)}
                              disabled={!puedeAgregarDepartamento(dep.nombre)}
                            >
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        {!puedeAgregarDepartamento(dep.nombre) && (
                          <div className="text-xs text-red-500 mt-2">Ya agregado</div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Columna derecha - Aprobadores seleccionados */}
      <Card
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (draggedItem?.source === "disponibles" && draggedItem.data) {
            handleAgregarDesdeDisponibles(draggedItem.data)
            setDraggedItem(null)
            setDragOverIndex(null)
          }
        }}
        className={draggedItem?.source === "disponibles" ? "border-2 border-dashed border-green-400" : ""}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <ArrowRight className="h-4 w-4" />
            Aprobadores ({aprobadores.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {aprobadores.length === 0 ? (
              <div
                className={`text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg ${
                  draggedItem?.source === "disponibles" ? "border-green-400 bg-green-50" : ""
                }`}
              >
                Arrastre usuarios aquí o haga clic en la flecha para agregar
              </div>
            ) : (
              aprobadores
                .sort((a, b) => a.orden - b.orden)
                .map((aprobador, index) => (
                  <Card
                    key={aprobador.id}
                    draggable={!disabled}
                    onDragStart={(e) => handleDragStartAprobador(e, index)}
                    onDragOver={(e) => handleDragOverAprobador(e, index)}
                    onDrop={(e) => handleDropEnAprobador(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragLeave={handleDragLeave}
                    className={`transition-all ${
                      draggedItem?.source === "aprobadores" && draggedItem.index === index
                        ? "opacity-50 border-2 border-blue-500"
                        : dragOverIndex === index
                          ? "border-2 border-green-400 bg-green-50"
                          : "hover:shadow-md cursor-move"
                    }`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {!disabled && <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                          <Badge variant="outline" className="min-w-[30px] justify-center flex-shrink-0 text-xs">
                            {aprobador.orden}
                          </Badge>
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {aprobador.esDepartamento ? (
                              <Building2 className="h-4 w-4 text-purple-500 flex-shrink-0" />
                            ) : (
                              <User className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">
                                {aprobador.esDepartamento
                                  ? aprobador.departamento || aprobador.rol
                                  : aprobador.usuarioNombre || aprobador.rol}
                              </div>
                              <div className="text-xs text-gray-500 truncate">
                                {aprobador.esDepartamento ? "Buzón departamento" : aprobador.rol}
                              </div>
                            </div>
                          </div>
                        </div>
                        {!disabled && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 flex-shrink-0 text-red-600 hover:text-red-700"
                            onClick={() => handleEliminarAprobador(aprobador.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
