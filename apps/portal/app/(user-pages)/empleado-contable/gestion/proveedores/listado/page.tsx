"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Eye, Star, Download, FileText, FileSpreadsheet, Filter, Plus, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { HistorialCalificacionesModal } from "@/components/proveedores/historial-calificaciones-modal"
import Link from "next/link"

// Datos de ejemplo para proveedores
const proveedores = [
  {
    id: 1,
    razonSocial: "Suministros Industriales S.A.",
    nombre: "Juan Pérez",
    cuit: "30-12345678-9",
    categorias: ["Materiales", "Construcción"],
    subcategorias: ["Construcción", "Infraestructura"],
    estado: "Activo",
    ultimaActividad: "15/04/2023",
    calificacion: "Proveedor A",
  },
  {
    id: 2,
    razonSocial: "Logística Portuaria SRL",
    nombre: "María González",
    cuit: "30-98765432-1",
    categorias: ["Servicios"],
    subcategorias: ["Transporte"],
    estado: "Activo",
    ultimaActividad: "22/03/2023",
    calificacion: "Proveedor B",
  },
  {
    id: 3,
    razonSocial: "Tecnología Naval Argentina",
    nombre: "Carlos Rodríguez",
    cuit: "30-56789012-3",
    categorias: ["Tecnología", "Materiales", "Seguridad"],
    subcategorias: ["Equipamiento", "Construcción"],
    estado: "Activo",
    ultimaActividad: "05/04/2023",
    calificacion: "Proveedor A",
  },
  {
    id: 4,
    razonSocial: "Seguridad Marítima SA",
    nombre: "Ana López",
    cuit: "30-34567890-1",
    categorias: ["Seguridad"],
    subcategorias: ["Vigilancia"],
    estado: "Inactivo",
    ultimaActividad: "10/01/2023",
    calificacion: "Proveedor B",
  },
  {
    id: 5,
    razonSocial: "Construcciones Portuarias",
    nombre: "Roberto García",
    cuit: "30-23456789-0",
    categorias: ["Construcción", "Servicios"],
    subcategorias: ["Infraestructura", "Mantenimiento"],
    estado: "Activo",
    ultimaActividad: "01/04/2023",
    calificacion: "Proveedor C",
  },
  {
    id: 6,
    razonSocial: "Servicios Marítimos del Sur",
    nombre: "Laura Martínez",
    cuit: "30-87654321-2",
    categorias: ["Servicios"],
    subcategorias: ["Mantenimiento"],
    estado: "Potencial",
    ultimaActividad: "N/A",
    calificacion: "NO APROBADO",
  },
  {
    id: 7,
    razonSocial: "Importadora Atlántica",
    nombre: "Diego Fernández",
    cuit: "30-76543210-3",
    categorias: ["Comercio"],
    subcategorias: ["Importación"],
    estado: "Potencial",
    ultimaActividad: "N/A",
    calificacion: "NO APROBADO",
  },
]

// Categorías y subcategorías para filtros
const categorias = [
  { value: "materiales", label: "Materiales" },
  { value: "servicios", label: "Servicios" },
  { value: "tecnologia", label: "Tecnología" },
  { value: "seguridad", label: "Seguridad" },
  { value: "construccion", label: "Construcción" },
  { value: "comercio", label: "Comercio" },
]

const subcategorias = [
  { value: "construccion", label: "Construcción" },
  { value: "transporte", label: "Transporte" },
  { value: "equipamiento", label: "Equipamiento" },
  { value: "vigilancia", label: "Vigilancia" },
  { value: "infraestructura", label: "Infraestructura" },
  { value: "mantenimiento", label: "Mantenimiento" },
  { value: "importacion", label: "Importación" },
]

// Función para obtener el color de la clasificación
const obtenerColorClasificacion = (clasificacion: string): string => {
  switch (clasificacion) {
    case "Proveedor A":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Proveedor B":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Proveedor C":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100"
    case "NO APROBADO":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export default function ListadoProveedoresPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const [isHistorialModalOpen, setIsHistorialModalOpen] = useState(false)
  const [selectedProveedor, setSelectedProveedor] = useState<any>(null)
  const [filtroCategoria, setFiltroCategoria] = useState<string[]>([])
  const [filtroSubcategoria, setFiltroSubcategoria] = useState<string[]>([])
  const [filtroEstado, setFiltroEstado] = useState<string[]>([])
  const [filtroCalificacion, setFiltroCalificacion] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Función para abrir el modal de historial de calificaciones
  const handleCalificar = (proveedor: any) => {
    setTimeout(() => {
      setSelectedProveedor(proveedor)
      setIsHistorialModalOpen(true)
    }, 0)
  }

  // Función para guardar la calificación
  const handleGuardarCalificacion = (data: {
    proveedorId: number
    evaluaciones: Record<string, number>
    promedio: number
    clasificacion: string
    observaciones: string
  }) => {
    // Aquí iría la lógica para guardar la calificación en la base de datos
    console.log("Calificación guardada:", data)

    // Actualizar la calificación en el estado local (simulación)
    const updatedProveedores = proveedores.map((p) =>
      p.id === data.proveedorId ? { ...p, calificacion: data.clasificacion } : p,
    )

    console.log("Proveedores actualizados:", updatedProveedores)
  }

  // Función para exportar a Excel
  const exportToExcel = () => {
    // Aquí iría la lógica para exportar a Excel
    console.log("Exportando a Excel...")
    alert("Exportando a Excel... (Funcionalidad simulada)")
  }

  // Función para exportar a PDF
  const exportToPDF = () => {
    // Aquí iría la lógica para exportar a PDF
    console.log("Exportando a PDF...")
    alert("Exportando a PDF... (Funcionalidad simulada)")
  }

  // Filtrar proveedores según la búsqueda y filtros avanzados
  const filteredProveedores = proveedores.filter((proveedor) => {
    // Filtro de búsqueda
    const matchesSearch =
      proveedor.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.cuit.includes(searchTerm) ||
      proveedor.categorias.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
      proveedor.subcategorias.some((subcat) => subcat.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtro de categoría
    const matchesCategoria =
      filtroCategoria.length === 0 ||
      filtroCategoria.some((cat) => proveedor.categorias.some((provCat) => provCat.toLowerCase() === cat.toLowerCase()))

    // Filtro de subcategoría
    const matchesSubcategoria =
      filtroSubcategoria.length === 0 ||
      filtroSubcategoria.some((subcat) =>
        proveedor.subcategorias.some((provSubcat) => provSubcat.toLowerCase() === subcat.toLowerCase()),
      )

    // Filtro de estado
    const matchesEstado =
      filtroEstado.length === 0 ||
      filtroEstado.some((estado) => proveedor.estado.toLowerCase() === estado.toLowerCase())

    // Filtro de calificación
    const matchesCalificacion = filtroCalificacion === null || proveedor.calificacion === filtroCalificacion

    return matchesSearch && matchesCategoria && matchesSubcategoria && matchesEstado && matchesCalificacion
  })

  // Filtrar proveedores según la pestaña activa
  const tabFilteredProveedores = filteredProveedores.filter((proveedor) => {
    if (activeTab === "todos") return true
    if (activeTab === "activos") return proveedor.estado === "Activo"
    if (activeTab === "potenciales") return proveedor.estado === "Potencial"
    return true
  })

  // Verificar si hay filtros activos
  const hasActiveFilters =
    filtroCategoria.length > 0 ||
    filtroSubcategoria.length > 0 ||
    filtroEstado.length > 0 ||
    filtroCalificacion !== null

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Listado de Proveedores</h1>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportToExcel} className="cursor-pointer">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Exportar a Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF} className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Exportar a PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="bg-plp-dark hover:bg-plp-medium">
            <Link href="/empleado-contable/gestion/proveedores/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proveedor
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por razón social, nombre, CUIT o categoría..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={hasActiveFilters ? "default" : "outline"}
                  className={hasActiveFilters ? "bg-plp-dark hover:bg-plp-medium" : ""}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                  {hasActiveFilters && (
                    <Badge className="ml-2 bg-white text-plp-dark hover:bg-gray-100">
                      {filtroCategoria.length +
                        filtroSubcategoria.length +
                        filtroEstado.length +
                        (filtroCalificacion !== null ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filtros</h4>

                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {categorias.map((categoria) => (
                        <div key={categoria.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`categoria-${categoria.value}`}
                            checked={filtroCategoria.includes(categoria.label)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFiltroCategoria([...filtroCategoria, categoria.label])
                              } else {
                                setFiltroCategoria(filtroCategoria.filter((c) => c !== categoria.label))
                              }
                            }}
                          />
                          <label
                            htmlFor={`categoria-${categoria.value}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {categoria.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subcategoría</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {subcategorias.map((subcategoria) => (
                        <div key={subcategoria.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subcategoria-${subcategoria.value}`}
                            checked={filtroSubcategoria.includes(subcategoria.label)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFiltroSubcategoria([...filtroSubcategoria, subcategoria.label])
                              } else {
                                setFiltroSubcategoria(filtroSubcategoria.filter((c) => c !== subcategoria.label))
                              }
                            }}
                          />
                          <label
                            htmlFor={`subcategoria-${subcategoria.value}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {subcategoria.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Activo", "Inactivo", "Potencial"].map((estado) => (
                        <div key={estado} className="flex items-center space-x-2">
                          <Checkbox
                            id={`estado-${estado.toLowerCase()}`}
                            checked={filtroEstado.includes(estado)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFiltroEstado([...filtroEstado, estado])
                              } else {
                                setFiltroEstado(filtroEstado.filter((e) => e !== estado))
                              }
                            }}
                          />
                          <label
                            htmlFor={`estado-${estado.toLowerCase()}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {estado}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Calificación</Label>
                    <Select
                      value={filtroCalificacion || ""}
                      onValueChange={(value) => setFiltroCalificacion(value === "any" ? null : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Cualquier calificación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Cualquier calificación</SelectItem>
                        <SelectItem value="Proveedor A">Proveedor A</SelectItem>
                        <SelectItem value="Proveedor B">Proveedor B</SelectItem>
                        <SelectItem value="Proveedor C">Proveedor C</SelectItem>
                        <SelectItem value="NO APROBADO">NO APROBADO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFiltroCategoria([])
                        setFiltroSubcategoria([])
                        setFiltroEstado([])
                        setFiltroCalificacion(null)
                      }}
                    >
                      Limpiar filtros
                    </Button>
                    <Button className="bg-plp-dark hover:bg-plp-medium" onClick={() => setIsFilterOpen(false)}>
                      Aplicar filtros
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filtroCategoria.map((cat) => (
                <Badge key={`cat-${cat}`} variant="secondary" className="px-3 py-1">
                  Categoría: {cat}
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setFiltroCategoria(filtroCategoria.filter((c) => c !== cat))}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {filtroSubcategoria.map((subcat) => (
                <Badge key={`subcat-${subcat}`} variant="secondary" className="px-3 py-1">
                  Subcategoría: {subcat}
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setFiltroSubcategoria(filtroSubcategoria.filter((s) => s !== subcat))}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {filtroEstado.map((estado) => (
                <Badge key={`estado-${estado}`} variant="secondary" className="px-3 py-1">
                  Estado: {estado}
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setFiltroEstado(filtroEstado.filter((e) => e !== estado))}
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {filtroCalificacion !== null && (
                <Badge variant="secondary" className="px-3 py-1">
                  Calificación: {filtroCalificacion}
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setFiltroCalificacion(null)}
                  >
                    ×
                  </button>
                </Badge>
              )}

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={() => {
                    setFiltroCategoria([])
                    setFiltroSubcategoria([])
                    setFiltroEstado([])
                    setFiltroCalificacion(null)
                  }}
                >
                  Limpiar todos
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="todos" className="data-[state=active]:bg-plp-dark data-[state=active]:text-white">
            Todos
          </TabsTrigger>
          <TabsTrigger value="activos" className="data-[state=active]:bg-plp-dark data-[state=active]:text-white">
            Activos
          </TabsTrigger>
          <TabsTrigger value="potenciales" className="data-[state=active]:bg-plp-dark data-[state=active]:text-white">
            Potenciales
          </TabsTrigger>
        </TabsList>

        {["todos", "activos", "potenciales"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="py-3 px-4 text-left font-medium">Razón Social</th>
                      <th className="py-3 px-4 text-left font-medium">Nombre</th>
                      <th className="py-3 px-4 text-left font-medium">CUIT</th>
                      <th className="py-3 px-4 text-left font-medium">Categoría</th>
                      <th className="py-3 px-4 text-left font-medium">Subcategoría</th>
                      <th className="py-3 px-4 text-left font-medium">Estado</th>
                      <th className="py-3 px-4 text-left font-medium">Última actividad</th>
                      <th className="py-3 px-4 text-left font-medium">Calificación</th>
                      <th className="py-3 px-4 text-center font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabFilteredProveedores.length > 0 ? (
                      tabFilteredProveedores.map((proveedor) => (
                        <tr key={proveedor.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{proveedor.razonSocial}</td>
                          <td className="py-3 px-4">{proveedor.nombre}</td>
                          <td className="py-3 px-4">{proveedor.cuit}</td>
                          <td className="py-3 px-4">
                            {proveedor.categorias[0]}
                            {proveedor.categorias.length > 1 && (
                              <span className="ml-1 text-xs text-gray-500">+{proveedor.categorias.length - 1}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {proveedor.subcategorias[0]}
                            {proveedor.subcategorias.length > 1 && (
                              <span className="ml-1 text-xs text-gray-500">+{proveedor.subcategorias.length - 1}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={
                                proveedor.estado === "Activo"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : proveedor.estado === "Potencial"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              }
                            >
                              {proveedor.estado}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{proveedor.ultimaActividad}</td>
                          <td className="py-3 px-4">
                            {proveedor.calificacion ? (
                              <Badge variant="outline" className={obtenerColorClasificacion(proveedor.calificacion)}>
                                {proveedor.calificacion}
                              </Badge>
                            ) : (
                              <span className="text-gray-500">Sin calificar</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => router.push(`/empleado-contable/gestion/proveedores/detalle/${proveedor.id}`)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver detalle
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleCalificar(proveedor)}>
                                    <Star className="h-4 w-4 mr-2" />
                                    Calificación
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="py-6 text-center text-gray-500">
                          No se encontraron proveedores que coincidan con la búsqueda
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Modal de historial de calificaciones */}
      <HistorialCalificacionesModal
        isOpen={isHistorialModalOpen}
        onClose={() => setIsHistorialModalOpen(false)}
        proveedor={selectedProveedor}
        onNuevaCalificacion={handleGuardarCalificacion}
      />
    </div>
  )
}
