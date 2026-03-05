"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Eye, Filter, Plus, Search, FileText, FileSpreadsheet, MoreVertical } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"

// Datos de ejemplo para clientes
const clientesData = [
  {
    id: 1,
    razonSocial: "Distribuidora Marítima S.A.",
    nombre: "Pedro Fernández",
    cuit: "30-12345678-9",
    tiposCliente: ["Agencia Marítima"],
    subcategorias: ["Mayorista"],
    estado: "Activo",
    ultimaActividad: "15/04/2023",
  },
  {
    id: 2,
    razonSocial: "Transportes Rápidos SRL",
    nombre: "Laura Sánchez",
    cuit: "30-98765432-1",
    tiposCliente: ["Empresa de Servicios Portuarios"],
    subcategorias: ["Transporte"],
    estado: "Activo",
    ultimaActividad: "22/03/2023",
  },
  {
    id: 3,
    razonSocial: "Tecnología Avanzada Argentina",
    nombre: "Martín Gómez",
    cuit: "30-56789012-3",
    tiposCliente: ["Permisionario"],
    subcategorias: ["Equipamiento"],
    estado: "Activo",
    ultimaActividad: "05/04/2023",
  },
  {
    id: 4,
    razonSocial: "Seguridad Integral SA",
    nombre: "Carolina Ruiz",
    cuit: "30-34567890-1",
    tiposCliente: ["Consecionarios"],
    subcategorias: ["Vigilancia"],
    estado: "Inactivo",
    ultimaActividad: "10/01/2023",
  },
  {
    id: 5,
    razonSocial: "Constructora del Sur",
    nombre: "Javier Torres",
    cuit: "30-23456789-0",
    tiposCliente: ["Permisionario"],
    subcategorias: ["Infraestructura"],
    estado: "Activo",
    ultimaActividad: "01/04/2023",
  },
  {
    id: 6,
    razonSocial: "Servicios Portuarios del Sur",
    nombre: "Ana María Castro",
    cuit: "30-87654321-2",
    tiposCliente: ["Empresa de Servicios Portuarios"],
    subcategorias: ["Mantenimiento"],
    estado: "Potencial",
    ultimaActividad: "N/A",
  },
  {
    id: 7,
    razonSocial: "Exportadora Atlántica",
    nombre: "Roberto Díaz",
    cuit: "30-76543210-3",
    tiposCliente: ["Agencia Marítima"],
    subcategorias: ["Exportación"],
    estado: "Potencial",
    ultimaActividad: "N/A",
  },
]

export default function ListadoClientesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filtroTipoCliente, setFiltroTipoCliente] = useState<string[]>([])
  const [filtroEstado, setFiltroEstado] = useState<string[]>([])

  // Función para exportar a Excel
  const exportToExcel = () => {
    console.log("Exportando a Excel...")
    alert("Exportando a Excel... (Funcionalidad simulada)")
  }

  // Función para exportar a PDF
  const exportToPDF = () => {
    console.log("Exportando a PDF...")
    alert("Exportando a PDF... (Funcionalidad simulada)")
  }

  // Filtrar clientes según la búsqueda y filtros avanzados
  const filteredClientes = clientesData.filter((cliente) => {
    // Filtro de búsqueda
    const matchesSearch =
      cliente.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cuit.includes(searchTerm) ||
      cliente.tiposCliente.some((tipo) => tipo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      cliente.subcategorias.some((subcat) => subcat.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtro de tipo de cliente
    const matchesTipoCliente =
      filtroTipoCliente.length === 0 ||
      filtroTipoCliente.some((tipo) => cliente.tiposCliente.some((clienteTipo) => clienteTipo.toLowerCase() === tipo.toLowerCase()))

    // Filtro de estado
    const matchesEstado =
      filtroEstado.length === 0 ||
      filtroEstado.some((estado) => cliente.estado.toLowerCase() === estado.toLowerCase())

    return matchesSearch && matchesTipoCliente && matchesEstado
  })

  // Filtrar clientes según la pestaña activa
  const tabFilteredClientes = filteredClientes.filter((cliente) => {
    if (activeTab === "todos") return true
    if (activeTab === "activos") return cliente.estado === "Activo"
    if (activeTab === "potenciales") return cliente.estado === "Potencial"
    return true
  })

  // Verificar si hay filtros activos
  const hasActiveFilters = filtroTipoCliente.length > 0 || filtroEstado.length > 0

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Listado de Clientes</h1>
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
            <Link href="/empleado-contable/gestion/clientes/nuevo">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Cliente
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
                placeholder="Buscar por razón social, nombre, CUIT o tipo de cliente..."
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
                      {filtroTipoCliente.length + filtroEstado.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filtros</h4>

                  <div className="space-y-2">
                    <Label>Tipo de Cliente</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {["Permisionario", "Agencia Marítima", "Empresa de Servicios Portuarios", "Consecionarios"].map((tipo) => (
                        <div key={tipo} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tipo-${tipo.toLowerCase().replace(/\s+/g, "-")}`}
                            checked={filtroTipoCliente.includes(tipo)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFiltroTipoCliente([...filtroTipoCliente, tipo])
                              } else {
                                setFiltroTipoCliente(filtroTipoCliente.filter((t) => t !== tipo))
                              }
                            }}
                          />
                          <label
                            htmlFor={`tipo-${tipo.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {tipo}
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

                  <div className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFiltroTipoCliente([])
                        setFiltroEstado([])
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
              {filtroTipoCliente.map((tipo) => (
                <Badge key={`tipo-${tipo}`} variant="secondary" className="px-3 py-1">
                  Tipo: {tipo}
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setFiltroTipoCliente(filtroTipoCliente.filter((t) => t !== tipo))}
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

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={() => {
                    setFiltroTipoCliente([])
                    setFiltroEstado([])
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
                      <th className="py-3 px-4 text-left font-medium">Tipo de Cliente</th>
                      <th className="py-3 px-4 text-left font-medium">Subcategoría</th>
                      <th className="py-3 px-4 text-left font-medium">Estado</th>
                      <th className="py-3 px-4 text-left font-medium">Última actividad</th>
                      <th className="py-3 px-4 text-center font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabFilteredClientes.length > 0 ? (
                      tabFilteredClientes.map((cliente) => (
                        <tr key={cliente.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{cliente.razonSocial}</td>
                          <td className="py-3 px-4">{cliente.nombre}</td>
                          <td className="py-3 px-4">{cliente.cuit}</td>
                          <td className="py-3 px-4">
                            {cliente.tiposCliente[0]}
                            {cliente.tiposCliente.length > 1 && (
                              <span className="ml-1 text-xs text-gray-500">+{cliente.tiposCliente.length - 1}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {cliente.subcategorias[0]}
                            {cliente.subcategorias.length > 1 && (
                              <span className="ml-1 text-xs text-gray-500">+{cliente.subcategorias.length - 1}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={
                                cliente.estado === "Activo"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : cliente.estado === "Potencial"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              }
                            >
                              {cliente.estado}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{cliente.ultimaActividad}</td>
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
                                    onClick={() => router.push(`/empleado-contable/gestion/clientes/detalle/${cliente.id}`)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver detalle
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-6 text-center text-gray-500">
                          No se encontraron clientes que coincidan con la búsqueda
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
    </div>
  )
}
