"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TablaDocumentos } from "@/components/facturas/tabla-documentos"
import { Plus, Filter } from "lucide-react"
import { NuevaFacturaModal } from "@/components/facturas/nueva-factura-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { DetalleDocumentoModal } from "@/components/facturas/detalle-documento-modal"

interface Documento {
  id: string
  fecha: string
  numero: string
  cliente: string
  concepto: string
  monto: number
  estado: string
  historial?: Array<{
    usuario: string
    accion: string
    fecha: string
  }>
  detalles?: {
    fechaVencimiento?: string
    ordenCompra?: string
    formaPago?: string
    observaciones?: string
    items: Array<{
      codigo: string
      descripcion: string
      cantidad: number
      precioUnitario: number
      subtotal: number
    }>
  }
}

interface PanelDocumentosProps {
  tipo: "facturas" | "notasCredito" | "notasDebito"
  documentos: Documento[]
}

export function PanelDocumentos({ tipo, documentos }: PanelDocumentosProps) {
  const [filtroNumero, setFiltroNumero] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("")
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>(undefined)
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Nuevo estado para el modal de detalle
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false)
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState<Documento | null>(null)

  const documentosFiltrados = documentos.filter((doc) => {
    const matchNumero = doc.numero.toLowerCase().includes(filtroNumero.toLowerCase())
    const matchEstado = filtroEstado === "" || doc.estado === filtroEstado
    return matchNumero && matchEstado
  })

  // Función para manejar la acción de ver detalle
  const handleVerDetalle = useCallback((documento: Documento) => {
    setDocumentoSeleccionado(documento)
    setIsDetalleModalOpen(true)
  }, [])

  // Función para manejar el cierre del modal de detalle
  const handleCloseDetalleModal = useCallback(() => {
    setIsDetalleModalOpen(false)
    // Pequeño retraso para asegurar que el modal se cierre completamente antes de limpiar el documento seleccionado
    setTimeout(() => {
      setDocumentoSeleccionado(null)
    }, 300)
  }, [])

  // Función para manejar la acción de descargar PDF
  const handleDescargarPDF = useCallback((documento: Documento) => {
    console.log("Descargar PDF:", documento.numero)
    // Implementar lógica de descarga
  }, [])

  // Función para manejar la acción de anular
  const handleAnular = useCallback((documento: Documento) => {
    console.log("Anular:", documento.numero)
    // Implementar lógica de anulación
  }, [])

  const getTitulo = () => {
    switch (tipo) {
      case "facturas":
        return "Gestión de Facturas"
      case "notasCredito":
        return "Gestión de Notas de Crédito"
      case "notasDebito":
        return "Gestión de Notas de Débito"
      default:
        return "Gestión de Documentos"
    }
  }

  const getDescripcion = () => {
    switch (tipo) {
      case "facturas":
        return "Cree, visualice y gestione sus facturas. Puede anular facturas existentes o crear nuevas."
      case "notasCredito":
        return "Cree, visualice y gestione sus notas de crédito. Puede anular notas existentes o crear nuevas."
      case "notasDebito":
        return "Cree, visualice y gestione sus notas de débito. Puede anular notas existentes o crear nuevas."
      default:
        return ""
    }
  }

  const getButtonText = () => {
    switch (tipo) {
      case "facturas":
        return "Nueva Factura"
      case "notasCredito":
        return "Nueva Nota de Crédito"
      case "notasDebito":
        return "Nueva Nota de Débito"
      default:
        return "Nuevo Documento"
    }
  }

  const limpiarFiltros = () => {
    setFiltroNumero("")
    setFiltroEstado("")
    setFechaDesde(undefined)
    setFechaHasta(undefined)
  }

  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{getTitulo()}</h2>
            <p className="text-gray-600 mt-1">{getDescripcion()}</p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0a2472] hover:bg-[#061a54] text-white font-medium px-4 py-2 rounded-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            {getButtonText()}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Label htmlFor="filtroNumero">Número de Factura</Label>
            <Input
              id="filtroNumero"
              placeholder="Ej: FC-2023-0458"
              className="mt-1"
              value={filtroNumero}
              onChange={(e) => setFiltroNumero(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="filtroEstado">Estado</Label>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger id="filtroEstado" className="mt-1">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Ingresada">Ingresada</SelectItem>
                <SelectItem value="En Proceso">En Proceso</SelectItem>
                <SelectItem value="Paga">Paga</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Fecha Desde</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full mt-1 justify-start text-left font-normal",
                    !fechaDesde && "text-muted-foreground",
                  )}
                >
                  {fechaDesde ? format(fechaDesde, "dd/MM/yyyy") : "dd/mm/aaaa"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={fechaDesde} onSelect={setFechaDesde} initialFocus locale={es} />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label>Fecha Hasta</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full mt-1 justify-start text-left font-normal",
                    !fechaHasta && "text-muted-foreground",
                  )}
                >
                  {fechaHasta ? format(fechaHasta, "dd/MM/yyyy") : "dd/mm/aaaa"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={fechaHasta} onSelect={setFechaHasta} initialFocus locale={es} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" onClick={limpiarFiltros}>
            Limpiar
          </Button>
          <Button className="bg-[#0a2472] hover:bg-[#061a54]">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
        </div>

        <div className="mb-4">
          <Input placeholder="Buscar..." className="max-w-sm" onChange={(e) => setFiltroNumero(e.target.value)} />
        </div>

        <TablaDocumentos
          documentos={documentosFiltrados}
          tipo={tipo}
          onVerDetalle={handleVerDetalle}
          onDescargarPDF={handleDescargarPDF}
          onAnular={handleAnular}
        />

        {tipo === "facturas" && <NuevaFacturaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

        {/* Modal de detalle */}
        <DetalleDocumentoModal
          isOpen={isDetalleModalOpen}
          onClose={handleCloseDetalleModal}
          tipo={tipo}
          documento={documentoSeleccionado}
        />
      </CardContent>
    </Card>
  )
}
