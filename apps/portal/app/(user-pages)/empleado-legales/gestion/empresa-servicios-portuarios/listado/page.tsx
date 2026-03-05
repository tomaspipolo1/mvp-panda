"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, CheckCircle, Filter, Search, User, XCircle, AlertTriangle, Eye, FileText, MoreVertical, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"

export default function EmpresaServiciosPortuariosLegales() {
  const router = useRouter()
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [busqueda, setBusqueda] = useState("")
  const [gruposSeleccionados, setGruposSeleccionados] = useState<string[]>([])
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")

  // Datos de ejemplo de empresas
  const empresas = [
    {
      nombre: "Servicios Portuarios del Sur S.A.",
      cuit: "30-71234567-8",
      grupos: ["1", "2"],
      email: "contacto@puertosur.com",
      estado: "Habilitada",
      fechaRegistro: "15/03/2023",
    },
    {
      nombre: "Transportes Marítimos Rápidos",
      cuit: "30-70987654-3",
      grupos: ["3"],
      email: "info@transmaritimos.com.ar",
      estado: "Habilitada",
      fechaRegistro: "22/01/2023",
    },
    {
      nombre: "Insumos Portuarios SRL",
      cuit: "30-69876543-2",
      grupos: ["4"],
      email: "ventas@insumosportuarios.com",
      estado: "Suspendida",
      fechaRegistro: "10/05/2023",
    },
    {
      nombre: "Maquinaria Pesada Argentina",
      cuit: "30-65432198-7",
      grupos: ["2", "4"],
      email: "contacto@maquipesada.com.ar",
      estado: "Habilitada",
      fechaRegistro: "08/06/2023",
    },
    {
      nombre: "Tecnología Portuaria SA",
      cuit: "30-76543210-9",
      grupos: ["1", "3"],
      email: "info@tecnopuertos.com",
      estado: "Pre-inscripta",
      fechaRegistro: "15/12/2023",
    },
    {
      nombre: "Logística Portuaria Integral",
      cuit: "30-65432109-8",
      grupos: ["1", "2", "3", "4"],
      email: "contacto@logisticaportuaria.com",
      estado: "Habilitada",
      fechaRegistro: "12/04/2023",
    },
    {
      nombre: "Seguridad Portuaria del Norte",
      cuit: "30-67890123-4",
      grupos: ["4"],
      email: "info@seguridadpuerto.com",
      estado: "Habilitada",
      fechaRegistro: "30/11/2023",
    },
    {
      nombre: "Operaciones Portuarias del Este",
      cuit: "30-66778899-0",
      grupos: ["2", "3"],
      email: "contacto@operacioneseste.com",
      estado: "Habilitada",
      fechaRegistro: "05/02/2023",
    },
    {
      nombre: "Servicios de Limpieza Portuaria",
      cuit: "30-55667788-1",
      grupos: ["1"],
      email: "info@limpiezapuerto.com",
      estado: "Habilitada",
      fechaRegistro: "18/07/2023",
    },
    {
      nombre: "Tecnología Portuaria Avanzada",
      cuit: "30-44556677-2",
      grupos: ["1", "3"],
      email: "contacto@tecnopuertos.com",
      estado: "Habilitada",
      fechaRegistro: "25/09/2023",
    },
    {
      nombre: "Servicios de Grúa Portuaria",
      cuit: "30-33445566-3",
      grupos: ["2"],
      email: "info@gruapuerto.com",
      estado: "Suspendida",
      fechaRegistro: "03/08/2023",
    },
    {
      nombre: "Mantenimiento Portuario Especializado",
      cuit: "30-22334455-4",
      grupos: ["3", "4"],
      email: "contacto@mantenimientopuerto.com",
      estado: "Pre-inscripta",
      fechaRegistro: "20/10/2023",
    },
  ]

  // Filtrar empresas según todos los filtros
  const empresasFiltradas = useMemo(() => {
    return empresas.filter(empresa => {
      // Filtro por búsqueda (nombre o CUIT)
      const cumpleBusqueda = busqueda === "" || 
        empresa.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        empresa.cuit.includes(busqueda)
      
      // Filtro por estado
      const cumpleEstado = filtroEstado === "todos" || empresa.estado === filtroEstado
      
      // Filtro por grupos seleccionados
      const cumpleGrupos = gruposSeleccionados.length === 0 || 
        gruposSeleccionados.some(grupo => empresa.grupos.includes(grupo))
      
      // Filtro por fecha desde
      const cumpleFechaDesde = fechaDesde === "" || 
        new Date(empresa.fechaRegistro.split("/").reverse().join("-")) >= new Date(fechaDesde)
      
      // Filtro por fecha hasta
      const cumpleFechaHasta = fechaHasta === "" || 
        new Date(empresa.fechaRegistro.split("/").reverse().join("-")) <= new Date(fechaHasta)
      
      return cumpleBusqueda && cumpleEstado && cumpleGrupos && cumpleFechaDesde && cumpleFechaHasta
    })
  }, [empresas, filtroEstado, busqueda, gruposSeleccionados, fechaDesde, fechaHasta])

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setFiltroEstado("todos")
    setBusqueda("")
    setGruposSeleccionados([])
    setFechaDesde("")
    setFechaHasta("")
  }
  const metricas = useMemo(() => {
    const total = empresas.length
    const habilitadas = empresas.filter(e => e.estado === "Habilitada").length
    const preInscriptas = empresas.filter(e => e.estado === "Pre-inscripta").length
    const suspendidas = empresas.filter(e => e.estado === "Suspendida").length

    return { total, habilitadas, preInscriptas, suspendidas }
  }, [empresas])

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Listado de Empresas de Servicios Portuarios</h1>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{metricas.habilitadas}</h3>
              <p className="text-sm text-gray-500">Empresas habilitadas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{metricas.preInscriptas}</h3>
              <p className="text-sm text-gray-500">Pre-inscriptas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{metricas.suspendidas}</h3>
              <p className="text-sm text-gray-500">Empresas suspendidas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{metricas.total}</h3>
              <p className="text-sm text-gray-500">Total registradas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-1">
              Búsqueda
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                id="busqueda" 
                placeholder="Nombre o CUIT" 
                className="pl-10" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="grupos" className="block text-sm font-medium text-gray-700 mb-1">
              Grupo
            </label>
            <Select value={gruposSeleccionados.length > 0 ? gruposSeleccionados[0] : "todos"} onValueChange={(value) => {
              if (value === "todos") {
                setGruposSeleccionados([])
              } else {
                setGruposSeleccionados([value])
              }
            }}>
              <SelectTrigger id="grupos" className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="1">Grupo 1</SelectItem>
                <SelectItem value="2">Grupo 2</SelectItem>
                <SelectItem value="3">Grupo 3</SelectItem>
                <SelectItem value="4">Grupo 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger id="estado" className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Habilitada">Habilitadas</SelectItem>
                <SelectItem value="Pre-inscripta">Pre-inscriptas</SelectItem>
                <SelectItem value="Suspendida">Suspendidas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Desde
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="fechaDesde"
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className="pl-10 w-full"
                placeholder="dd/mm/aaaa"
              />
            </div>
          </div>
          <div>
            <label htmlFor="fechaHasta" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Hasta
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="fechaHasta"
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className="pl-10 w-full"
                placeholder="dd/mm/aaaa"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" onClick={handleClearFilters}>
            Limpiar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Aplicar filtros
          </Button>
        </div>
      </div>

      {/* Tabla de Empresas */}
      <div className="bg-white rounded-lg border border-gray-200 mt-8">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Empresas de Servicios Portuarios</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Empresa</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CUIT</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Grupo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contacto</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha Registro</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Estado</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empresasFiltradas.length > 0 ? (
                empresasFiltradas.map((empresa, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">
                      <span className="font-medium">{empresa.nombre}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{empresa.cuit}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {empresa.grupos.map((grupo, idx) => (
                          <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                            {grupo}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{empresa.email}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{empresa.fechaRegistro}</td>
                    <td className="px-4 py-4 text-sm">
                      <Badge
                        className={
                          empresa.estado === "Habilitada"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : empresa.estado === "Pre-inscripta"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {empresa.estado}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/empleado-legales/gestion/empresa-servicios-portuarios/listado/${index + 1}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/empleado-legales/gestion/empresa-servicios-portuarios/listado/${index + 1}/documentacion`)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Ver documentación
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-sm text-center text-gray-500 italic">
                    No se encontraron empresas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-between items-center text-sm text-gray-500">
          <div>
            Mostrando {empresasFiltradas.length} de {empresas.length} registros
          </div>
        </div>
      </div>
    </div>
  )
}
