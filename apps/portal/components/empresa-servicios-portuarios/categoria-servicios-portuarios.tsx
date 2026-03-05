"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface CategoriaServiciosPortuarios {
  grupo: string
  tareas: string[]
}

interface Props {
  categorias: CategoriaServiciosPortuarios[]
  onChange: (categorias: CategoriaServiciosPortuarios[]) => void
}

const GRUPOS_SERVICIOS_PORTUARIOS = {
  "Grupo 1": [
    "Tareas de Remolque de Buques"
  ],
  "Grupo 2": [
    "Tareas de Estiba (movimiento de mercaderías de cualquier tipo) a buques u otros medios de transporte y/o plazoleta",
    "Provisión de Combustible a buques y/o derivados de hidrocarburos",
    "Conexionado, carga y/o descarga de hidrocarburos inflamables, productos químicos y/o agroquímicos",
    "Transporte de residuos especiales y/o peligrosos",
    "Empresas proveedoras de servicios y de grúas móviles y otros elementos mecánicos",
    "Transporte de contenedores, bobinas y/u otras cargas",
    "Agencias Marítimas",
    "Servicio de Traslado de personas vía acuática",
    "Talleres de reparaciones y/o servicios navales",
    "Transporte de Maquinarias y/o Equipos Pesados",
    "Transporte de pescado fresco y/o enfriado y/o congelado",
    "Servicios de pesaje",
    "Servicios de salvamento y buceo",
    "Servicios de control de plagas y/o saneamiento ambiental y/o fumigaciones"
  ],
  "Grupo 3": [
    "Provisiones marítimas generales a buques (rancho)",
    "Provisión de agua a buques",
    "Tarea de amarre y desamarre de embarcaciones",
    "Servicio de practicaje y/o pilotaje"
  ],
  "Grupo 4": [
    "Todos aquellos no mencionados anteriormente"
  ]
}

export function CategoriaServiciosPortuarios({ categorias, onChange }: Props) {
  const [selectedGrupo, setSelectedGrupo] = useState<string>("")
  const [selectedTareas, setSelectedTareas] = useState<string[]>([])

  const handleAddCategoria = () => {
    if (selectedGrupo && selectedTareas.length > 0) {
      const nuevaCategoria: CategoriaServiciosPortuarios = {
        grupo: selectedGrupo,
        tareas: selectedTareas
      }
      
      // Verificar si ya existe el grupo
      const existingIndex = categorias.findIndex(cat => cat.grupo === selectedGrupo)
      
      if (existingIndex >= 0) {
        // Actualizar el grupo existente
        const updatedCategorias = [...categorias]
        updatedCategorias[existingIndex] = nuevaCategoria
        onChange(updatedCategorias)
      } else {
        // Agregar nuevo grupo
        onChange([...categorias, nuevaCategoria])
      }
      
      // Limpiar selección
      setSelectedGrupo("")
      setSelectedTareas([])
    }
  }

  const handleRemoveCategoria = (grupo: string) => {
    onChange(categorias.filter(cat => cat.grupo !== grupo))
  }

  const handleTareaToggle = (tarea: string) => {
    setSelectedTareas(prev => 
      prev.includes(tarea) 
        ? prev.filter(t => t !== tarea)
        : [...prev, tarea]
    )
  }

  const handleGrupoChange = (grupo: string) => {
    setSelectedGrupo(grupo)
    // Si ya existe el grupo, cargar sus tareas seleccionadas
    const existingCategoria = categorias.find(cat => cat.grupo === grupo)
    if (existingCategoria) {
      setSelectedTareas(existingCategoria.tareas)
    } else {
      setSelectedTareas([])
    }
  }

  return (
    <div className="space-y-4">
      {/* Selección de nueva categoría */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Agregar Categoría de Servicios</h4>
        
        {/* Selección de Grupo */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grupo
          </label>
          <select
            value={selectedGrupo}
            onChange={(e) => handleGrupoChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
          >
            <option value="">Seleccione un grupo</option>
            {Object.keys(GRUPOS_SERVICIOS_PORTUARIOS).map(grupo => (
              <option key={grupo} value={grupo}>{grupo}</option>
            ))}
          </select>
        </div>

        {/* Selección de Tareas */}
        {selectedGrupo && (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tareas del {selectedGrupo}
            </label>
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-2 bg-white">
              {GRUPOS_SERVICIOS_PORTUARIOS[selectedGrupo as keyof typeof GRUPOS_SERVICIOS_PORTUARIOS]?.map(tarea => (
                <label key={tarea} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTareas.includes(tarea)}
                    onChange={() => handleTareaToggle(tarea)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{tarea}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Botón Agregar */}
        <button
          type="button"
          onClick={handleAddCategoria}
          disabled={!selectedGrupo || selectedTareas.length === 0}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Agregar Categoría
        </button>
      </div>

      {/* Categorías seleccionadas */}
      {categorias.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Categorías Seleccionadas</h4>
          <div className="space-y-3">
            {categorias.map((categoria, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">{categoria.grupo}</h5>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategoria(categoria.grupo)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {categoria.tareas.map((tarea, tareaIndex) => (
                    <li key={tareaIndex} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span>{tarea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 