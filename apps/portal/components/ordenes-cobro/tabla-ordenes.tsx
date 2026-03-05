"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface OrdenCobro {
  id: string
  fecha: string
  numero: string
  concepto: string
  formaCobro: string
  monto: number
}

interface TablaOrdenesProps {
  ordenes: OrdenCobro[]
  onVerDetalle: (orden: OrdenCobro) => void
  onDescargarPDF: (orden: OrdenCobro) => void
}

export function TablaOrdenes({ ordenes, onVerDetalle, onDescargarPDF }: TablaOrdenesProps) {
  const [sortField, setSortField] = useState<string>("fecha")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const itemsPerPage = 4

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filtrar por término de búsqueda
  const filteredOrdenes = ordenes.filter(
    (orden) =>
      orden.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.formaCobro.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar órdenes
  const sortedOrdenes = [...filteredOrdenes].sort((a, b) => {
    if (sortField === "fecha") {
      const dateA = new Date(a.fecha.split("/").reverse().join("-"))
      const dateB = new Date(b.fecha.split("/").reverse().join("-"))
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }

    if (sortField === "monto") {
      return sortDirection === "asc" ? a.monto - b.monto : b.monto - a.monto
    }

    // Para otros campos como número, concepto, etc.
    const valueA = a[sortField as keyof OrdenCobro]
    const valueB = b[sortField as keyof OrdenCobro]

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    return 0
  })

  // Paginación
  const totalPages = Math.ceil(sortedOrdenes.length / itemsPerPage)
  const paginatedOrdenes = sortedOrdenes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-plp-darkest">Órdenes de Cobro</h3>
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
                <span className="text-gray-600 font-medium">Número</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Concepto</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Forma de Cobro</span>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  className="flex items-center text-gray-600 font-medium ml-auto"
                  onClick={() => handleSort("monto")}
                >
                  Monto
                  {sortField === "monto" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrdenes.map((orden) => (
              <tr key={orden.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">{orden.fecha}</td>
                <td className="py-4 px-4">{orden.numero}</td>
                <td className="py-4 px-4">{orden.concepto}</td>
                <td className="py-4 px-4">{orden.formaCobro}</td>
                <td className="py-4 px-4 text-right">{formatCurrency(orden.monto)}</td>
                <td className="py-4 px-4 text-center">
                  <div className="relative" ref={dropdownRef}>
                    <DropdownMenu open={openDropdown === orden.id} onOpenChange={() => toggleDropdown(orden.id)}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => onVerDetalle(orden)} className="cursor-pointer">
                          <FileText className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDescargarPDF(orden)} className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Descargar PDF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Mostrando {paginatedOrdenes.length} de {filteredOrdenes.length} registros
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
