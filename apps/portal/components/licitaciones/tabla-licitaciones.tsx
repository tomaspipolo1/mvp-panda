"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Eye, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface Licitacion {
  id: string
  numero: string
  titulo: string
  organismo: string
  apertura: string
  cierre: string
  montoEstimado: number
  estado: string
  resultado: string | null
}

interface TablaLicitacionesProps {
  licitaciones: Licitacion[]
  onVerDetalle: (licitacion: Licitacion) => void
  onVerDocumentos: (licitacion: Licitacion) => void
  onVerConsultas: (licitacion: Licitacion) => void
}

export function TablaLicitaciones({
  licitaciones,
  onVerDetalle,
  onVerDocumentos,
  onVerConsultas,
}: TablaLicitacionesProps) {
  const [sortField, setSortField] = useState<string>("numero")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const itemsPerPage = 5
  const router = useRouter()

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
  const filteredLicitaciones = licitaciones.filter(
    (licitacion) =>
      licitacion.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licitacion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      licitacion.organismo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar licitaciones
  const sortedLicitaciones = [...filteredLicitaciones].sort((a, b) => {
    if (sortField === "apertura" || sortField === "cierre") {
      const dateA = new Date(a[sortField as keyof Licitacion] as string)
      const dateB = new Date(b[sortField as keyof Licitacion] as string)
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }

    if (sortField === "montoEstimado") {
      const valueA = a[sortField] as number
      const valueB = b[sortField] as number
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA
    }

    // Para otros campos como número, título, etc.
    const valueA = a[sortField as keyof Licitacion]
    const valueB = b[sortField as keyof Licitacion]

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    return 0
  })

  // Paginación
  const totalPages = Math.ceil(sortedLicitaciones.length / itemsPerPage)
  const paginatedLicitaciones = sortedLicitaciones.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Abierta":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Abierta</Badge>
      case "En Evaluación":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">En Evaluación</Badge>
      case "Finalizada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Finalizada</Badge>
      case "Cancelada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
      case "Borrador":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Borrador</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{estado}</Badge>
    }
  }

  const getResultadoText = (estado: string, resultado: string | null) => {
    if (estado !== "Finalizada") {
      return "-"
    }

    if (resultado === "Adjudicada") {
      return <span className="text-green-600 font-medium">Adjudicada</span>
    }

    if (resultado === "Perdida") {
      return <span className="text-red-600 font-medium">Perdida</span>
    }

    return "-"
  }

  // Determinar si se puede editar la licitación (estados Abierta, En Evaluación o Borrador)
  const puedeEditar = (estado: string) => {
    return ["Abierta", "En Evaluación", "Borrador"].includes(estado)
  }

  const handleEditar = (licitacion: any) => {
    // Si es un borrador, redirigir al formulario de nueva inscripción
    if (licitacion.estado === "Borrador") {
      router.push(`/proveedor/gestion/licitaciones/nueva-inscripcion/formulario?id=${licitacion.id}`)
    } else {
      // Para otros estados editables, redirigir al formulario de edición
      router.push(`/proveedor/gestion/licitaciones/editar/${licitacion.id}`)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Licitaciones Inscritas</h3>
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
                <button className="flex items-center text-gray-600 font-medium" onClick={() => handleSort("numero")}>
                  Número
                  {sortField === "numero" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Título</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Organismo</span>
              </th>
              <th className="py-3 px-4 text-left">
                <button className="flex items-center text-gray-600 font-medium" onClick={() => handleSort("apertura")}>
                  Apertura
                  {sortField === "apertura" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-left">
                <button className="flex items-center text-gray-600 font-medium" onClick={() => handleSort("cierre")}>
                  Cierre
                  {sortField === "cierre" ? (
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
                  onClick={() => handleSort("montoEstimado")}
                >
                  Monto Estimado
                  {sortField === "montoEstimado" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Estado</span>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Resultado</span>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLicitaciones.map((licitacion) => (
              <tr key={licitacion.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">{licitacion.numero}</td>
                <td className="py-4 px-4">{licitacion.titulo}</td>
                <td className="py-4 px-4">{licitacion.organismo}</td>
                <td className="py-4 px-4">{licitacion.apertura}</td>
                <td className="py-4 px-4">{licitacion.cierre}</td>
                <td className="py-4 px-4 text-right">{formatCurrency(licitacion.montoEstimado)}</td>
                <td className="py-4 px-4 text-center">{getEstadoBadge(licitacion.estado)}</td>
                <td className="py-4 px-4 text-center">{getResultadoText(licitacion.estado, licitacion.resultado)}</td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onVerDetalle(licitacion)} className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {puedeEditar(licitacion.estado) && (
                      <Button variant="ghost" size="icon" onClick={() => handleEditar(licitacion)} className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
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
          Mostrando {paginatedLicitaciones.length} de {filteredLicitaciones.length} registros
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
                className={currentPage === pageNumber ? "bg-blue-700" : ""}
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
