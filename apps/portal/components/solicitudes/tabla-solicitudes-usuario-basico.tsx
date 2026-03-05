"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Solicitud {
  id: string
  fecha: string
  numero: string
  tipo: string
  clase: string
  asunto: string
  estado: "Pendiente" | "En Proceso" | "Resuelta" | "Rechazada"
  ultimaActualizacion: string
}

interface TablaSolicitudesUsuarioBasicoProps {
  solicitudes: Solicitud[]
  onVerDetalle: (solicitud: Solicitud) => void
  onAgregarComentario: (solicitud: Solicitud) => void
  onCancelarSolicitud: (solicitud: Solicitud) => void
}

export function TablaSolicitudesUsuarioBasico({
  solicitudes,
  onVerDetalle,
  onAgregarComentario,
  onCancelarSolicitud,
}: TablaSolicitudesUsuarioBasicoProps) {
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
  const filteredSolicitudes = solicitudes.filter(
    (solicitud) =>
      solicitud.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.clase.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar solicitudes
  const sortedSolicitudes = [...filteredSolicitudes].sort((a, b) => {
    if (sortField === "fecha" || sortField === "ultimaActualizacion") {
      const dateA = new Date(a[sortField as keyof Solicitud] as string)
      const dateB = new Date(b[sortField as keyof Solicitud] as string)
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }

    // Para otros campos como número, tipo, etc.
    const valueA = a[sortField as keyof Solicitud]
    const valueB = b[sortField as keyof Solicitud]

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    return 0
  })

  // Paginación
  const totalPages = Math.ceil(sortedSolicitudes.length / itemsPerPage)
  const paginatedSolicitudes = sortedSolicitudes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "En Proceso":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En Proceso</Badge>
      case "Resuelta":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resuelta</Badge>
      case "Rechazada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>
      default:
        return null
    }
  }

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-plp-darkest">Solicitudes</h3>
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
                <span className="text-gray-600 font-medium">Tipo</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Clase</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Asunto</span>
              </th>
              <th className="py-3 px-4 text-center">
                <span className="text-gray-600 font-medium">Estado</span>
              </th>
              <th className="py-3 px-4 text-left">
                <button
                  className="flex items-center text-gray-600 font-medium"
                  onClick={() => handleSort("ultimaActualizacion")}
                >
                  Última Actualización
                  {sortField === "ultimaActualizacion" ? (
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
            {paginatedSolicitudes.map((solicitud) => (
              <tr key={solicitud.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">{solicitud.fecha}</td>
                <td className="py-4 px-4">{solicitud.numero}</td>
                <td className="py-4 px-4">{solicitud.tipo}</td>
                <td className="py-4 px-4">{solicitud.clase}</td>
                <td className="py-4 px-4">{solicitud.asunto}</td>
                <td className="py-4 px-4 text-center">{getEstadoBadge(solicitud.estado)}</td>
                <td className="py-4 px-4">{solicitud.ultimaActualizacion}</td>
                <td className="py-4 px-4 text-center">
                  <div className="relative" ref={dropdownRef}>
                    <DropdownMenu
                      open={openDropdown === solicitud.id}
                      onOpenChange={() => toggleDropdown(solicitud.id)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => onVerDetalle(solicitud)} className="cursor-pointer">
                          Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onAgregarComentario(solicitud)} 
                          className="cursor-pointer"
                          disabled={solicitud.estado === "Resuelta" || solicitud.estado === "Rechazada"}
                        >
                          Agregar comentario
                          {(solicitud.estado === "Resuelta" || solicitud.estado === "Rechazada") && (
                            <span className="ml-2 text-xs text-gray-500">(Cerrada)</span>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onCancelarSolicitud(solicitud)}
                          className="cursor-pointer text-red-600"
                          disabled={solicitud.estado === "Resuelta" || solicitud.estado === "Rechazada"}
                        >
                          Cancelar solicitud
                          {(solicitud.estado === "Resuelta" || solicitud.estado === "Rechazada") && (
                            <span className="ml-2 text-xs text-gray-500">(Cerrada)</span>
                          )}
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
          Mostrando {paginatedSolicitudes.length} de {filteredSolicitudes.length} registros
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
                className={currentPage === pageNumber ? "bg-black" : ""}
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
