"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Retencion {
  id: string
  fecha: string
  tipo: string
  jurisdiccion: string
  comprobante: string
  concepto: string
  baseImponible: number
  alicuota: number
  monto: number
}

interface TablaRetencionesProps {
  retenciones: Retencion[]
  onVerDetalle: (retencion: Retencion) => void
  onDescargarCertificado: (retencion: Retencion) => void
}

export function TablaRetenciones({ retenciones, onVerDetalle, onDescargarCertificado }: TablaRetencionesProps) {
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
  const filteredRetenciones = retenciones.filter(
    (retencion) =>
      retencion.comprobante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      retencion.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      retencion.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      retencion.jurisdiccion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar retenciones
  const sortedRetenciones = [...filteredRetenciones].sort((a, b) => {
    if (sortField === "fecha") {
      const dateA = new Date(a.fecha.split("/").reverse().join("-"))
      const dateB = new Date(b.fecha.split("/").reverse().join("-"))
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }

    if (sortField === "baseImponible" || sortField === "alicuota" || sortField === "monto") {
      const valueA = a[sortField as keyof Retencion] as number
      const valueB = b[sortField as keyof Retencion] as number
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA
    }

    // Para otros campos como tipo, jurisdicción, etc.
    const valueA = a[sortField as keyof Retencion]
    const valueB = b[sortField as keyof Retencion]

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    return 0
  })

  // Paginación
  const totalPages = Math.ceil(sortedRetenciones.length / itemsPerPage)
  const paginatedRetenciones = sortedRetenciones.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const formatPercentage = (value: number) => {
    return `${value}%`
  }

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-plp-darkest">Retenciones</h3>
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
                <span className="text-gray-600 font-medium">Tipo</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Jurisdicción</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Comprobante</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Concepto</span>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  className="flex items-center text-gray-600 font-medium ml-auto"
                  onClick={() => handleSort("baseImponible")}
                >
                  Base Imponible
                  {sortField === "baseImponible" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-right">
                <button
                  className="flex items-center text-gray-600 font-medium ml-auto"
                  onClick={() => handleSort("alicuota")}
                >
                  Alícuota
                  {sortField === "alicuota" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
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
            {paginatedRetenciones.map((retencion) => (
              <tr key={retencion.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">{retencion.fecha}</td>
                <td className="py-4 px-4">{retencion.tipo}</td>
                <td className="py-4 px-4">{retencion.jurisdiccion}</td>
                <td className="py-4 px-4">{retencion.comprobante}</td>
                <td className="py-4 px-4">{retencion.concepto}</td>
                <td className="py-4 px-4 text-right">{formatCurrency(retencion.baseImponible)}</td>
                <td className="py-4 px-4 text-right">{formatPercentage(retencion.alicuota)}</td>
                <td className="py-4 px-4 text-right">{formatCurrency(retencion.monto)}</td>
                <td className="py-4 px-4 text-center">
                  <div className="relative" ref={dropdownRef}>
                    <DropdownMenu
                      open={openDropdown === retencion.id}
                      onOpenChange={() => toggleDropdown(retencion.id)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => onVerDetalle(retencion)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDescargarCertificado(retencion)} className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Descargar certificado
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
          Mostrando {paginatedRetenciones.length} de {filteredRetenciones.length} registros
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
