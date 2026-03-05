"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Eye, Download, FileText, FileSpreadsheet, Filter, CheckCircle, XCircle, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo para clientes pendientes
const clientesPendientes = [
  {
    id: 3,
    razonSocial: "Logística Portuaria Internacional",
    nombre: "Gustavo Morales",
    cuit: "30-87654321-9",
    tiposCliente: ["Agencia Marítima"],
    subcategorias: ["Importación"],
    estado: "Pendiente",
    fechaSolicitud: "10/05/2023",
  },
  {
    id: 4,
    razonSocial: "Servicios Marítimos del Plata",
    nombre: "Claudia Fernández",
    cuit: "30-76543210-8",
    tiposCliente: ["Empresa de Servicios Portuarios"],
    subcategorias: ["Mantenimiento"],
    estado: "Pendiente",
    fechaSolicitud: "15/05/2023",
  },
  {
    id: 5,
    razonSocial: "Terminal Portuaria Sur",
    nombre: "Ricardo Suárez",
    cuit: "30-65432109-7",
    tiposCliente: ["Permisionario"],
    subcategorias: ["Carga"],
    estado: "Pendiente",
    fechaSolicitud: "20/05/2023",
  },
  {
    id: 6,
    razonSocial: "Astilleros Navales Argentinos",
    nombre: "Daniela Vega",
    cuit: "30-54321098-6",
    tiposCliente: ["Consecionarios"],
    subcategorias: ["Construcción"],
    estado: "Pendiente",
    fechaSolicitud: "25/05/2023",
  },
  {
    id: 7,
    razonSocial: "Operadora Logística del Sur",
    nombre: "Fernando Paz",
    cuit: "30-43210987-5",
    tiposCliente: ["Empresa de Servicios Portuarios"],
    subcategorias: ["Logística"],
    estado: "Pendiente",
    fechaSolicitud: "01/06/2023",
  },
]

// Tipos de cliente para filtros
const tiposCliente = [
  { value: "permisionario", label: "Permisionario" },
  { value: "agencia-maritima", label: "Agencia Marítima" },
  { value: "servicios-portuarios", label: "Empresa de Servicios Portuarios" },
  { value: "consecionarios", label: "Consecionarios" },
]

export default function ClientesPendientesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<any>(null)
  const [filtroTipoCliente, setFiltroTipoCliente] = useState<string[]>([])
  const [rejectReason, setRejectReason] = useState("")
  const [approveComment, setApproveComment] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [clientes, setClientes] = useState(clientesPendientes)
  const { toast } = useToast()

  // Función para exportar a Excel
  const exportToExcel = () => {
    console.log("Exportando a Excel...")
    toast({
      title: "Exportando a Excel",
      description: "El archivo se está descargando.",
      duration: 3000,
    })
  }

  // Función para exportar a PDF
  const exportToPDF = () => {
    console.log("Exportando a PDF...")
    toast({
      title: "Exportando a PDF",
      description: "El archivo se está descargando.",
      duration: 3000,
    })
  }

  // Función para ver detalles del cliente
  const handleViewCliente = (cliente: any) => {
    // Navegar a la página de detalle completo
    router.push(`/admin/admin/clientes/pendientes/${cliente.id}`)
  }

  // Función para abrir modal de aprobación
  const handleOpenApproveModal = (cliente: any) => {
    setSelectedCliente(cliente)
    setApproveComment("")
    setIsApproveModalOpen(true)
  }

  // Función para abrir modal de rechazo
  const handleOpenRejectModal = (cliente: any) => {
    setSelectedCliente(cliente)
    setRejectReason("")
    setIsRejectModalOpen(true)
  }

  // Función para aprobar cliente
  const handleApproveCliente = () => {
    // Aquí iría la lógica para aprobar el cliente
    console.log(`Aprobando cliente ${selectedCliente.id} con comentario: ${approveComment}`)

    // Actualizar la lista de clientes (simulado)
    setClientes(clientes.filter((c) => c.id !== selectedCliente.id))

    setIsApproveModalOpen(false)

    toast({
      title: "Cliente aprobado",
      description: `${selectedCliente.razonSocial} ha sido aprobado exitosamente.`,
      duration: 3000,
    })
  }

  // Función para rechazar cliente
  const handleRejectCliente = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Error",
        description: "Debe proporcionar un motivo para el rechazo.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    // Aquí iría la lógica para rechazar el cliente
    console.log(`Rechazando cliente ${selectedCliente.id} con motivo: ${rejectReason}`)

    // Actualizar la lista de clientes (simulado)
    setClientes(clientes.filter((c) => c.id !== selectedCliente.id))

    setIsRejectModalOpen(false)

    toast({
      title: "Cliente rechazado",
      description: `${selectedCliente.razonSocial} ha sido rechazado.`,
      duration: 3000,
    })
  }

  // Filtrar clientes según la búsqueda y filtros avanzados
  const filteredClientes = clientes.filter((cliente) => {
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

    return matchesSearch && matchesTipoCliente
  })

  // Verificar si hay filtros activos
  const hasActiveFilters = filtroTipoCliente.length > 0

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clientes Pendientes</h1>
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
                    <Badge className="ml-2 bg-white text-plp-dark hover:bg-gray-100">{filtroTipoCliente.length}</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filtros</h4>

                  <div className="space-y-2">
                    <Label>Tipo de Cliente</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {tiposCliente.map((tipo) => (
                        <div key={tipo.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tipo-${tipo.value}`}
                            checked={filtroTipoCliente.includes(tipo.label)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFiltroTipoCliente([...filtroTipoCliente, tipo.label])
                              } else {
                                setFiltroTipoCliente(filtroTipoCliente.filter((t) => t !== tipo.label))
                              }
                            }}
                          />
                          <label
                            htmlFor={`tipo-${tipo.value}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {tipo.label}
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

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={() => {
                    setFiltroTipoCliente([])
                  }}
                >
                  Limpiar todos
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="rounded-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-3 px-4 text-left font-medium">Razón Social</th>
                <th className="py-3 px-4 text-left font-medium">Nombre</th>
                <th className="py-3 px-4 text-left font-medium">CUIT</th>
                <th className="py-3 px-4 text-left font-medium">Tipo de Cliente</th>
                <th className="py-3 px-4 text-left font-medium">Subcategoría</th>
                <th className="py-3 px-4 text-left font-medium">Estado</th>
                <th className="py-3 px-4 text-left font-medium">Fecha Solicitud</th>
                <th className="py-3 px-4 text-center font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.length > 0 ? (
                filteredClientes.map((cliente) => (
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
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        {cliente.estado}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{cliente.fechaSolicitud}</td>
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
                              onClick={() => handleViewCliente(cliente)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-green-600"
                              onClick={() => handleOpenApproveModal(cliente)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprobar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onClick={() => handleOpenRejectModal(cliente)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Rechazar
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
                    No se encontraron clientes pendientes que coincidan con la búsqueda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para aprobar cliente */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aprobar Cliente</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea aprobar a este cliente? Esta acción permitirá que el cliente opere en el
              sistema.
            </DialogDescription>
          </DialogHeader>

          {selectedCliente && (
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-gray-50">
                <div className="font-medium">{selectedCliente.razonSocial}</div>
                <div className="text-sm text-gray-500">Contacto: {selectedCliente.nombre}</div>
                <div className="text-sm text-gray-500">CUIT: {selectedCliente.cuit}</div>
                <div className="text-sm text-gray-500">Tipo: {selectedCliente.tiposCliente.join(", ")}</div>
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
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleApproveCliente}>
                  Confirmar Aprobación
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal para rechazar cliente */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rechazar Cliente</DialogTitle>
            <DialogDescription>
              Por favor, indique el motivo por el cual está rechazando a este cliente.
            </DialogDescription>
          </DialogHeader>

          {selectedCliente && (
            <div className="space-y-4">
              <div className="border rounded-md p-3 bg-gray-50">
                <div className="font-medium">{selectedCliente.razonSocial}</div>
                <div className="text-sm text-gray-500">Contacto: {selectedCliente.nombre}</div>
                <div className="text-sm text-gray-500">CUIT: {selectedCliente.cuit}</div>
                <div className="text-sm text-gray-500">Tipo: {selectedCliente.tiposCliente.join(", ")}</div>
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
                <Button variant="destructive" onClick={handleRejectCliente}>
                  Confirmar Rechazo
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

