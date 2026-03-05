"use client"

import { ExpandablePanel } from "@/components/expandable-panel"
import { Settings } from "lucide-react"

interface CategoriaServiciosPortuarios {
  grupo: string
  tareas: string[]
}

interface CategoriaServiciosDisplayProps {
  categorias: CategoriaServiciosPortuarios[]
  onEdit?: () => void
}

export function CategoriaServiciosDisplay({ categorias, onEdit }: CategoriaServiciosDisplayProps) {
  const previewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categorias.slice(0, 2).map((categoria, index) => (
        <div key={index}>
          <p className="text-sm text-gray-500 mt-2 mb-1">{categoria.grupo}</p>
          <p className="font-medium text-plp-darkest">
            {categoria.tareas.length} tarea{categoria.tareas.length !== 1 ? 's' : ''} seleccionada{categoria.tareas.length !== 1 ? 's' : ''}
          </p>
        </div>
      ))}
      {categorias.length > 2 && (
        <div>
          <p className="text-sm text-gray-500 mb-1">Categorías adicionales</p>
          <p className="font-medium text-plp-darkest">
            +{categorias.length - 2} grupo{categorias.length - 2 !== 1 ? 's' : ''} más
          </p>
        </div>
      )}
    </div>
  )

  return (
    <ExpandablePanel
      icon={<Settings className="h-5 w-5" />}
      title="Categoría de Servicios"
      previewContent={previewContent}
      actionButton={onEdit ? "edit" : "none"}
      onActionClick={onEdit}
    >
      <div className="space-y-6 mt-2">
        {categorias.map((categoria, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="text-lg font-semibold text-plp-darkest mb-3">{categoria.grupo}</h4>
            <div className="space-y-2">
              {categoria.tareas.map((tarea, tareaIndex) => (
                <div key={tareaIndex} className="flex items-start">
                  <span className="text-plp-medium mr-2 mt-1">•</span>
                  <span className="text-sm text-gray-700">{tarea}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ExpandablePanel>
  )
}
