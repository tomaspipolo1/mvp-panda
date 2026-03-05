"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, CheckCircle, Filter, Search, Eye, AlertTriangle, MoreVertical, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function EmpresasPendientesLegales() {
  const router = useRouter()
  const { toast } = useToast()
  const [busqueda, setBusqueda] = useState("")
  const [gruposSeleccionados, setGruposSeleccionados] = useState<string[]>([])
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [selectedEmpresa, setSelectedEmpresa] = useState<typeof empresasPendientes[0] | null>(null)
  const [approveComment, setApproveComment] = useState("")
  const [rejectReason, setRejectReason] = useState("")
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)

  // Datos de ejemplo de empresas que se dieron de alta como usuarios y están pendientes de aprobación
  const empresasPendientes = [
    {
      id: 1,
      razonSocial: "Tecnología Portuaria SA",
      cuit: "30-76543210-9",
      grupos: ["1", "3"],
      fechaAlta: "10/12/2023",
    },
    {
      id: 2,
      razonSocial: "Mantenimiento Portuario Especializado",
      cuit: "30-22334455-4",
      grupos: ["2", "4"],
      fechaAlta: "15/10/2023",
    },
    {
      id: 3,
      razonSocial: "Servicios de Limpieza Portuaria del Norte",
      cuit: "30-11223344-5",
      grupos: ["1"],
      fechaAlta: "20/11/2023",
    },
    {
      id: 4,
      razonSocial: "Transportes Portuarios Express",
      cuit: "30-99887766-7",
      grupos: ["2", "3", "4"],
      fechaAlta: "25/11/2023",
    },
    {
      id: 5,
      razonSocial: "Seguridad Portuaria Integral",
      cuit: "30-88776655-8",
      grupos: ["1", "2"],
      fechaAlta: "01/12/2023",
    },
    {
      id: 6,
      razonSocial: "Operaciones Portuarias del Oeste",
      cuit: "30-77665544-9",
      grupos: ["3"],
      fechaAlta: "05/12/2023",
    },
  ]

  // Filtrar empresas según todos los filtros
  const empresasFiltradas = useMemo(() => {
    return empresasPendientes.filter(empresa => {
      // Filtro por búsqueda (razón social o CUIT)
      const cumpleBusqueda = busqueda === "" || 
        empresa.razonSocial.toLowerCase().includes(busqueda.toLowerCase()) ||
        empresa.cuit.includes(busqueda)
      
      // Filtro por grupos seleccionados
      const cumpleGrupos = gruposSeleccionados.length === 0 || 
        gruposSeleccionados.some(grupo => empresa.grupos.includes(grupo))
      
      // Filtro por fecha desde
      const cumpleFechaDesde = fechaDesde === "" || 
        new Date(empresa.fechaAlta.split("/").reverse().join("-")) >= new Date(fechaDesde)
      
      // Filtro por fecha hasta
      const cumpleFechaHasta = fechaHasta === "" || 
        new Date(empresa.fechaAlta.split("/").reverse().join("-")) <= new Date(fechaHasta)
      
      return cumpleBusqueda && cumpleGrupos && cumpleFechaDesde && cumpleFechaHasta
    })
  }, [empresasPendientes, busqueda, gruposSeleccionados, fechaDesde, fechaHasta])

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setBusqueda("")
    setGruposSeleccionados([])
    setFechaDesde("")
    setFechaHasta("")
  }
  const handleVerEmpresa = (id: number) => {
    router.push(`/empleado-legales/gestion/empresa-servicios-portuarios/pendientes/${id}`)
  }

  // Función para abrir modal de aprobación
  const handleAprobarEmpresa = (empresa: typeof empresasPendientes[0]) => {
    setSelectedEmpresa(empresa)
    setOpenDropdownId(null) // Cerrar dropdown
    setIsApproveModalOpen(true)
  }

  // Función para abrir modal de rechazo
  const handleRechazarEmpresa = (empresa: typeof empresasPendientes[0]) => {
    setSelectedEmpresa(empresa)
    setOpenDropdownId(null) // Cerrar dropdown
    setIsRejectModalOpen(true)
  }

  // Función para confirmar aprobación
  const handleConfirmarAprobacion = () => {
    if (!selectedEmpresa) return

    console.log(`Aprobando empresa ${selectedEmpresa.id} con comentario: ${approveComment}`)
    setIsApproveModalOpen(false)
    setApproveComment("")
    setSelectedEmpresa(null) // Limpiar empresa seleccionada

    toast({
      title: "Empresa aprobada",
      description: `${selectedEmpresa.razonSocial} ha sido aprobada exitosamente.`,
    })

    // Aquí se podría actualizar el estado de la empresa en la lista
    // Por ahora solo simulamos la aprobación
  }

  // Función para confirmar rechazo
  const handleConfirmarRechazo = () => {
    if (!selectedEmpresa) return

    if (!rejectReason.trim()) {
      toast({
        title: "Error",
        description: "Debe proporcionar un motivo para el rechazo.",
        variant: "destructive",
      })
      return
    }

    console.log(`Rechazando empresa ${selectedEmpresa.id} con motivo: ${rejectReason}`)
    setIsRejectModalOpen(false)
    setRejectReason("")
    setSelectedEmpresa(null) // Limpiar empresa seleccionada

    toast({
      title: "Empresa rechazada",
      description: `${selectedEmpresa.razonSocial} ha sido rechazada.`,
    })

    // Aquí se podría actualizar el estado de la empresa en la lista
    // Por ahora solo simulamos el rechazo
  }







  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Empresas pre-incriptas pendientes de aprobación</h1>
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
                placeholder="Razón social o CUIT" 
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

      {/* Tabla de Empresas Pendientes */}
      <div className="bg-white rounded-lg border border-gray-200 mt-8">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Empresas Pendientes de Aprobación</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Razón Social</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">CUIT</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Grupo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Fecha Alta</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empresasFiltradas.length > 0 ? (
                empresasFiltradas.map((empresa, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-900">
                      <span className="font-medium">{empresa.razonSocial}</span>
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
                    <td className="px-4 py-4 text-sm text-gray-900">{empresa.fechaAlta}</td>
                    <td className="px-4 py-4 text-sm text-center">
                      <DropdownMenu 
                        open={openDropdownId === empresa.id} 
                        onOpenChange={(open) => setOpenDropdownId(open ? empresa.id : null)}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setOpenDropdownId(null)
                            handleVerEmpresa(empresa.id)
                          }}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAprobarEmpresa(empresa)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Aprobar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRechazarEmpresa(empresa)}>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Rechazar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-sm text-center text-gray-500 italic">
                    No se encontraron empresas pendientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-between items-center text-sm text-gray-500">
          <div>
            Mostrando {empresasFiltradas.length} de {empresasPendientes.length} registros
          </div>
        </div>
      </div>

      {/* Modal para aprobar empresa */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aprobar Empresa</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea aprobar a esta empresa? Esta acción permitirá que la empresa opere en el
              sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="font-medium">{selectedEmpresa?.razonSocial}</div>
              <div className="text-sm text-gray-500">CUIT: {selectedEmpresa?.cuit}</div>
              <div className="text-sm text-gray-500">Grupos: {selectedEmpresa?.grupos.join(", ")}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="approveComment">Comentarios (opcional)</Label>
              <Textarea
                id="approveComment"
                placeholder="Agregue comentarios adicionales sobre la aprobación..."
                value={approveComment}
                onChange={(e) => setApproveComment(e.target.value)}
              />
            </div>

            <DialogFooter className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleConfirmarAprobacion}>
                Confirmar Aprobación
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para rechazar empresa */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rechazar Empresa</DialogTitle>
            <DialogDescription>
              Por favor, indique el motivo por el cual está rechazando a esta empresa.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="font-medium">{selectedEmpresa?.razonSocial}</div>
              <div className="text-sm text-gray-500">CUIT: {selectedEmpresa?.cuit}</div>
              <div className="text-sm text-gray-500">Grupos: {selectedEmpresa?.grupos.join(", ")}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rejectReason">
                Motivo del rechazo <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="rejectReason"
                placeholder="Indique el motivo del rechazo..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className={!rejectReason.trim() ? "border-red-300 focus-visible:ring-red-500" : ""}
              />
              {!rejectReason.trim() && <p className="text-sm text-red-500">El motivo del rechazo es obligatorio</p>}
            </div>

            <DialogFooter className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleConfirmarRechazo}>
                Confirmar Rechazo
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
