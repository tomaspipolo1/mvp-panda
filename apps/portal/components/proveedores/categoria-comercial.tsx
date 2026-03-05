"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

// Datos de ejemplo para categorías y subcategorías
const CATEGORIAS_COMERCIALES = [
  {
    nombre: "Tecnología y Equipamiento",
    subcategorias: [
      "Hardware para empresas (servidores, PC, etc.)",
      "Software y licencias",
      "Equipos de comunicación",
      "Servicios de TI",
    ],
  },
  {
    nombre: "Industria y Manufactura",
    subcategorias: [
      "Equipos de automatización",
      "Maquinaria industrial",
      "Herramientas y accesorios",
      "Materiales de construcción",
    ],
  },
  {
    nombre: "Servicios Profesionales",
    subcategorias: ["Consultoría", "Servicios legales", "Servicios contables", "Capacitación"],
  },
  {
    nombre: "Logística y Transporte",
    subcategorias: ["Transporte terrestre", "Transporte marítimo", "Almacenamiento", "Servicios aduaneros"],
  },
]

interface CategoriaComercialProps {
  categorias: {
    categoria: string
    subcategorias: string[]
  }[]
  onChange: (categorias: { categoria: string; subcategorias: string[] }[]) => void
}

export function CategoriaComercial({ categorias, onChange }: CategoriaComercialProps) {
  const [selectedCategoria, setSelectedCategoria] = useState("")
  const [selectedSubcategorias, setSelectedSubcategorias] = useState<string[]>([])

  const handleAddCategoria = () => {
    if (selectedCategoria && selectedSubcategorias.length > 0) {
      const nuevaCategoria = {
        categoria: selectedCategoria,
        subcategorias: selectedSubcategorias,
      }

      // Verificar si ya existe la categoría
      const existingIndex = categorias.findIndex(cat => cat.categoria === selectedCategoria)
      
      if (existingIndex >= 0) {
        // Actualizar la categoría existente
        const updatedCategorias = [...categorias]
        updatedCategorias[existingIndex] = nuevaCategoria
        onChange(updatedCategorias)
      } else {
        // Agregar nueva categoría
        onChange([...categorias, nuevaCategoria])
      }
      
      // Limpiar selección
      setSelectedSubcategorias([])
    }
  }

  const handleRemoveCategoria = (index: number) => {
    const nuevasCategorias = [...categorias]
    nuevasCategorias.splice(index, 1)
    onChange(nuevasCategorias)
  }

  const handleSubcategoriaToggle = (subcategoria: string) => {
    setSelectedSubcategorias(prev => 
      prev.includes(subcategoria) 
        ? prev.filter(sub => sub !== subcategoria)
        : [...prev, subcategoria]
    )
  }

  const handleCategoriaChange = (categoria: string) => {
    setSelectedCategoria(categoria)
    // Si ya existe la categoría, cargar sus subcategorías seleccionadas
    const existingCategoria = categorias.find(cat => cat.categoria === categoria)
    if (existingCategoria) {
      setSelectedSubcategorias(existingCategoria.subcategorias)
    } else {
      setSelectedSubcategorias([])
    }
  }

  // Obtener las subcategorías disponibles para la categoría seleccionada
  const subcategoriasDisponibles =
    CATEGORIAS_COMERCIALES.find((cat) => cat.nombre === selectedCategoria)?.subcategorias || []

  return (
    <div className="space-y-4">
      {/* Selección de nueva categoría */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Agregar Categoría Comercial</h4>
        
        {/* Selección de Categoría */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={selectedCategoria}
            onChange={(e) => handleCategoriaChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-plp-primary"
          >
            <option value="">Seleccione una categoría</option>
            {CATEGORIAS_COMERCIALES.map((cat) => (
              <option key={cat.nombre} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Subcategorías */}
        {selectedCategoria && (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategorías de {selectedCategoria}
            </label>
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-2 bg-white">
              {subcategoriasDisponibles.map((subcategoria) => (
                <label key={subcategoria} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSubcategorias.includes(subcategoria)}
                    onChange={() => handleSubcategoriaToggle(subcategoria)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{subcategoria}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Botón Agregar */}
        <button
          type="button"
          onClick={handleAddCategoria}
          disabled={!selectedCategoria || selectedSubcategorias.length === 0}
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
            {categorias.map((cat, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-gray-900">{cat.categoria}</h5>
                  <button
                    type="button"
                    onClick={() => handleRemoveCategoria(index)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {cat.subcategorias.map((subcategoria, subcategoriaIndex) => (
                    <li key={subcategoriaIndex} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span>{subcategoria}</span>
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
