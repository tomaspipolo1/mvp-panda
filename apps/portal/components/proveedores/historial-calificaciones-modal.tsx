"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalificarProveedorModal } from "./calificar-proveedor-modal"

// Función para obtener el color de la clasificación
const obtenerColorClasificacion = (clasificacion: string): string => {
  switch (clasificacion) {
    case "Proveedor A":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Proveedor B":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Proveedor C":
      return "bg-amber-100 text-amber-800 hover:bg-amber-100"
    case "NO APROBADO":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

interface Calificacion {
  id: string
  fecha: string
  usuario: string
  resultado: string
  promedio: number
}

interface Proveedor {
  id: number
  razonSocial: string
  cuit: string
  calificacion?: string
}

interface HistorialCalificacionesModalProps {
  isOpen: boolean
  onClose: () => void
  proveedor: Proveedor | null
  onNuevaCalificacion?: (data: {
    proveedorId: number
    evaluaciones: Record<string, number>
    promedio: number
    clasificacion: string
    observaciones: string
  }) => void
}

export function HistorialCalificacionesModal({
  isOpen,
  onClose,
  proveedor,
  onNuevaCalificacion,
}: HistorialCalificacionesModalProps) {
  const [isCalificarModalOpen, setIsCalificarModalOpen] = useState(false)

  // Datos de ejemplo del historial de calificaciones
  const historialCalificaciones: Calificacion[] = [
    {
      id: "1",
      fecha: "15/03/2024",
      usuario: "Juan Pérez - Compras",
      resultado: "Proveedor A",
      promedio: 4.5,
    },
    {
      id: "2",
      fecha: "10/02/2024",
      usuario: "María González - Logística",
      resultado: "Proveedor A",
      promedio: 4.2,
    },
    {
      id: "3",
      fecha: "05/01/2024",
      usuario: "Carlos López - Compras",
      resultado: "Proveedor B",
      promedio: 3.8,
    },
  ]

  const handleNuevaCalificacion = () => {
    setIsCalificarModalOpen(true)
  }

  const handleGuardarCalificacion = (data: {
    proveedorId: number
    evaluaciones: Record<string, number>
    promedio: number
    clasificacion: string
    observaciones: string
  }) => {
    // Llamar al callback si existe
    if (onNuevaCalificacion) {
      onNuevaCalificacion(data)
    }

    // Cerrar ambos modales
    setIsCalificarModalOpen(false)
    onClose()
  }

  if (!proveedor) return null

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Historial de Calificaciones</DialogTitle>
            <DialogDescription>
              {proveedor.razonSocial} - {proveedor.cuit}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Total de calificaciones: {historialCalificaciones.length}</h3>
                <p className="text-sm text-gray-500">Historial de evaluaciones recibidas</p>
              </div>
              <Button onClick={handleNuevaCalificacion} className="bg-plp-dark hover:bg-plp-medium">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Calificación
              </Button>
            </div>

            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Promedio
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resultado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {historialCalificaciones.map((calificacion) => (
                      <tr key={calificacion.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900">{calificacion.fecha}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{calificacion.usuario}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{calificacion.promedio.toFixed(2)}</td>
                        <td className="px-4 py-4">
                          <Badge variant="outline" className={obtenerColorClasificacion(calificacion.resultado)}>
                            {calificacion.resultado}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {historialCalificaciones.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay calificaciones registradas para este proveedor</p>
                <Button onClick={handleNuevaCalificacion} className="mt-4 bg-plp-dark hover:bg-plp-medium">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Primera Calificación
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de calificar proveedor */}
      <CalificarProveedorModal
        isOpen={isCalificarModalOpen}
        onClose={() => setIsCalificarModalOpen(false)}
        proveedor={proveedor}
        onGuardar={handleGuardarCalificacion}
      />
    </>
  )
}

