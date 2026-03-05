"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, FileText, CreditCard, ArrowDownLeft, ArrowUpRight, Download, Eye, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Movimiento {
  id: string
  fecha: string
  tipo: "Factura" | "Recibo" | "Nota de Crédito" | "Nota de Débito"
  numero: string
  concepto: string
  debe: number | null
  haber: number | null
  saldo: number
  estado: "Pendiente" | "Pagado" | "Procesado"
}

interface TablaMovimientosClienteProps {
  movimientos: Movimiento[]
  onVerDetalle?: (movimiento: Movimiento) => void
  onDescargarPDF?: (movimiento: Movimiento) => void
}

export function TablaMovimientosCliente({ movimientos, onVerDetalle, onDescargarPDF }: TablaMovimientosClienteProps) {
  const [sortField, setSortField] = useState<string>("fecha")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const itemsPerPage = 6

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filtrar por término de búsqueda
  const filteredMovimientos = movimientos.filter(
    (mov) =>
      mov.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.concepto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar movimientos
  const sortedMovimientos = [...filteredMovimientos].sort((a, b) => {
    if (sortField === "fecha") {
      const dateA = new Date(a.fecha.split("/").reverse().join("-"))
      const dateB = new Date(b.fecha.split("/").reverse().join("-"))
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }

    if (sortField === "tipo") {
      return sortDirection === "asc" ? a.tipo.localeCompare(b.tipo) : b.tipo.localeCompare(a.tipo)
    }

    return 0
  })

  // Paginación
  const totalPages = Math.ceil(sortedMovimientos.length / itemsPerPage)
  const paginatedMovimientos = sortedMovimientos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "Factura":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "Recibo":
        return <CreditCard className="h-5 w-5 text-green-500" />
      case "Nota de Crédito":
        return <ArrowDownLeft className="h-5 w-5 text-red-500" />
      case "Nota de Débito":
        return <ArrowUpRight className="h-5 w-5 text-orange-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "Pagado":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Pagado</Badge>
      case "Procesado":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Procesado</Badge>
      default:
        return null
    }
  }

  const formatCurrency = (value: number | null) => {
    if (value === null) return "-"
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const handleVerDetalleClick = (movimiento: Movimiento) => {
    // Primero cerramos el dropdown
    setOpenDropdownId(null)
    
    // Luego abrimos el modal con un pequeño retraso
    setTimeout(() => {
      onVerDetalle && onVerDetalle(movimiento)
    }, 100)
  }

  const handleDescargarPDFClick = (movimiento: Movimiento) => {
    // Primero cerramos el dropdown
    setOpenDropdownId(null)
    
    // Luego ejecutamos la descarga con un pequeño retraso
    setTimeout(() => {
      onDescargarPDF && onDescargarPDF(movimiento)
    }, 100)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-plp-darkest">Movimientos de Cuenta Corriente</h3>
        <div className="w-72">
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left">
                <button className="flex items-center text-gray-600 font-medium" onClick={() => handleSort("fecha")}>
                  Fecha
                  {sortField === "fecha" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button className="flex items-center text-gray-600 font-medium" onClick={() => handleSort("tipo")}>
                  Tipo
                  {sortField === "tipo" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Número</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Concepto</span>
              </th>
              <th className="py-3 px-4 text-right">
                <span className="text-gray-600 font-medium">Debe</span>
              </th>
              <th className="py-3 px-4 text-right">
                <span className="text-gray-600 font-medium">Haber</span>
              </th>
              <th className="py-3 px-4 text-right">
                <span className="text-gray-600 font-medium">Saldo</span>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Estado</span>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedMovimientos.map((movimiento) => (
              <tr key={movimiento.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">{movimiento.fecha}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    {getTipoIcon(movimiento.tipo)}
                    <span className="ml-2">{movimiento.tipo}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{movimiento.numero}</td>
                <td className="py-4 px-4">{movimiento.concepto}</td>
                <td className="py-4 px-4 text-right">{formatCurrency(movimiento.debe)}</td>
                <td className="py-4 px-4 text-right">{formatCurrency(movimiento.haber)}</td>
                <td className="py-4 px-4 text-right font-medium">{formatCurrency(movimiento.saldo)}</td>
                <td className="py-4 px-4 text-center">{getEstadoBadge(movimiento.estado)}</td>
                <td className="py-4 px-4 text-center">
                  <DropdownMenu open={openDropdownId === movimiento.id} onOpenChange={(open) => setOpenDropdownId(open ? movimiento.id : null)}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleVerDetalleClick(movimiento)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDescargarPDFClick(movimiento)}>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Mostrando {paginatedMovimientos.length} de {filteredMovimientos.length} registros
        </div>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = i + 1
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNumber)}
                className={currentPage === pageNumber ? "bg-plp-dark" : ""}
              >
                {pageNumber}
              </Button>
            )
          })}
          {totalPages > 5 && <span className="px-2">...</span>}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
