"use client"

import { MapPin, Pencil } from "lucide-react"
import { ExpandablePanel } from "@/components/expandable-panel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Direccion {
  tipo: string
  nombre: string
  calle: string
  adicional?: string
  ciudad: string
  codigoPostal: string
  pais: string
}

interface DireccionesProps {
  direcciones: Direccion[]
  onAdd?: () => void
  onEdit?: (direccion: Direccion) => void
}

export function Direcciones({ direcciones, onAdd, onEdit }: DireccionesProps) {
  // Preview content - shown when panel is not expanded
  const previewContent =
    direcciones.length > 0 ? (
      <div className="pt-4">
        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex items-center mb-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{direcciones[0].tipo}</Badge>
            <h3 className="ml-2 font-medium text-plp-darkest">{direcciones[0].nombre}</h3>
          </div>
          <p className="text-gray-700">{direcciones[0].calle}</p>
          {direcciones[0].adicional && <p className="text-gray-700">{direcciones[0].adicional}</p>}
          <p className="text-gray-700">
            {direcciones[0].ciudad}, {direcciones[0].codigoPostal}
          </p>
          <p className="text-gray-700">{direcciones[0].pais}</p>
        </div>
      </div>
    ) : null

  return (
    <ExpandablePanel
      icon={<MapPin size={24} />}
      title="Direcciones"
      actionButton="add"
      onActionClick={onAdd}
      previewContent={previewContent}
    >
      <div className="space-y-4">
        {direcciones.map((direccion, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{direccion.tipo}</Badge>
                <h3 className="ml-2 font-medium text-plp-darkest">{direccion.nombre}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit && onEdit(direccion)}
                className="text-gray-500 hover:text-plp-dark"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-700">{direccion.calle}</p>
            {direccion.adicional && <p className="text-gray-700">{direccion.adicional}</p>}
            <p className="text-gray-700">
              {direccion.ciudad}, {direccion.codigoPostal}
            </p>
            <p className="text-gray-700">{direccion.pais}</p>
          </div>
        ))}
      </div>
    </ExpandablePanel>
  )
}
