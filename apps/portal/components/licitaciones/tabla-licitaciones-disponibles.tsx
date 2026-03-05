"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Eye, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ComentarioLicitacionModal } from "@/components/licitaciones/comentario-licitacion-modal"

interface LicitacionDisponible {
  id: string
  numero: string
  objeto: string
  tipo: "Pública" | "Privada" | "Concurso de precios"
  cierre: string
  apertura: string
  montoEstimado: number
  inscripto: boolean
  estado: "Abierta" | "Cerrada" | "En evaluación" | "Adjudicada" | "Finalizada" | "Cancelada"
}

interface TablaLicitacionesDisponiblesProps {
  licitaciones: LicitacionDisponible[]
}

export function TablaLicitacionesDisponibles({ licitaciones }: TablaLicitacionesDisponiblesProps) {
  const [sortField, setSortField] = useState<string>("numero")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 10
  const [isComentarioModalOpen, setIsComentarioModalOpen] = useState(false)
  const [modalTipo, setModalTipo] = useState<"inscripcion" | "rechazo">("inscripcion")
  const [licitacionSeleccionada, setLicitacionSeleccionada] = useState<string>("")

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
      licitacion.objeto.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Ordenar licitaciones
  const sortedLicitaciones = [...filteredLicitaciones].sort((a, b) => {
    if (sortField === "cierre" || sortField === "apertura") {
      const dateA = new Date(a[sortField as keyof LicitacionDisponible] as string)
      const dateB = new Date(b[sortField as keyof LicitacionDisponible] as string)
      return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
    }

    if (sortField === "montoEstimado") {
      const valueA = a[sortField] as number
      const valueB = b[sortField] as number
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA
    }

    // Para otros campos como número, objeto, etc.
    const valueA = a[sortField as keyof LicitacionDisponible]
    const valueB = b[sortField as keyof LicitacionDisponible]

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
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Abierta</Badge>
      case "Cerrada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cerrada</Badge>
      case "En evaluación":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En evaluación</Badge>
      case "Adjudicada":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Adjudicada</Badge>
      case "Finalizada":
        return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">Finalizada</Badge>
      case "Cancelada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const handleVerDetalle = (licitacionId: string) => {
    window.location.href = `/proveedor/gestion/licitaciones/nueva-inscripcion/${licitacionId}`
  }

  const handleInscribirse = (licitacionId: string) => {
    // Usar setTimeout para asegurar que el dropdown se cierre antes de abrir el modal
    setTimeout(() => {
      setLicitacionSeleccionada(licitacionId)
      setModalTipo("inscripcion")
      setIsComentarioModalOpen(true)
    }, 100)
  }

  const handleRechazar = (licitacionId: string) => {
    // Usar setTimeout para asegurar que el dropdown se cierre antes de abrir el modal
    setTimeout(() => {
      setLicitacionSeleccionada(licitacionId)
      setModalTipo("rechazo")
      setIsComentarioModalOpen(true)
    }, 100)
  }

  const handleSubmitComentario = (comentario: string) => {
    console.log(`${modalTipo} de licitación ${licitacionSeleccionada}`)
    console.log(`Comentario: ${comentario}`)
    console.log(`Se enviará notificación a compras@puertolaplata.com`)
    
    const accion = modalTipo === "inscripcion" ? "inscrito" : "rechazado"
    alert(`Se ha ${accion} la licitación ${licitacionSeleccionada} exitosamente.\nSe enviará una notificación a compras@puertolaplata.com`)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-plp-darkest">Licitaciones Disponibles</h3>
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
                <span className="text-gray-600 font-medium">Objeto</span>
              </th>
              <th className="py-3 px-4 text-left">
                <span className="text-gray-600 font-medium">Tipo</span>
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
                <span className="text-gray-600 font-medium">Inscripto</span>
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
            {paginatedLicitaciones.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  No se encontraron licitaciones
                </td>
              </tr>
            ) : (
              paginatedLicitaciones.map((licitacion) => (
                <tr key={licitacion.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">{licitacion.numero}</td>
                  <td className="py-4 px-4">{licitacion.objeto}</td>
                  <td className="py-4 px-4">{licitacion.tipo}</td>
                  <td className="py-4 px-4">{licitacion.cierre}</td>
                  <td className="py-4 px-4">{licitacion.apertura}</td>
                  <td className="py-4 px-4 text-right">{formatCurrency(licitacion.montoEstimado)}</td>
                  <td className="py-4 px-4 text-center">
                    {licitacion.inscripto ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sí</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">No</Badge>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">{getEstadoBadge(licitacion.estado)}</td>
                  <td className="py-4 px-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleVerDetalle(licitacion.id)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </DropdownMenuItem>
                        {!licitacion.inscripto && (
                          <DropdownMenuItem onClick={() => handleInscribirse(licitacion.id)} className="cursor-pointer">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Inscribirse
                          </DropdownMenuItem>
                        )}
                        {!licitacion.inscripto && (licitacion.tipo === "Privada" || licitacion.tipo === "Concurso de precios") && (
                          <DropdownMenuItem onClick={() => handleRechazar(licitacion.id)} className="cursor-pointer">
                            <XCircle className="mr-2 h-4 w-4" />
                            Rechazar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
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
                className={currentPage === pageNumber ? "bg-plp-dark text-white" : ""}
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

      {/* Modal de comentario */}
      <ComentarioLicitacionModal
        isOpen={isComentarioModalOpen}
        onClose={() => setIsComentarioModalOpen(false)}
        onSubmit={handleSubmitComentario}
        licitacionNumero={licitacionSeleccionada}
        tipo={modalTipo}
      />
    </div>
  )
}
