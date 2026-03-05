"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, Trash2, Plus, Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Datos de ejemplo para la galería
const imagenesEjemplo = [
  {
    id: 1,
    titulo: "Edificio corporativo",
    categoria: "instalaciones",
    fecha: "15/04/2023",
    url: "/interconnected-network.png",
  },
  { id: 2, titulo: "Equipo directivo", categoria: "personas", fecha: "10/03/2023", url: "/confident-leader.png" },
  { id: 3, titulo: "Evento anual", categoria: "eventos", fecha: "05/02/2023", url: "/diverse-team-meeting.png" },
  {
    id: 4,
    titulo: "Producto destacado",
    categoria: "productos",
    fecha: "20/01/2023",
    url: "/classic-red-convertible.png",
  },
  {
    id: 5,
    titulo: "Oficinas centrales",
    categoria: "instalaciones",
    fecha: "15/12/2022",
    url: "/wooden-shelf-with-decor.png",
  },
  {
    id: 6,
    titulo: "Reunión de trabajo",
    categoria: "personas",
    fecha: "10/11/2022",
    url: "/professional-interview-setup.png",
  },
  { id: 7, titulo: "Conferencia de prensa", categoria: "eventos", fecha: "05/10/2022", url: "/reading-the-news.png" },
  {
    id: 8,
    titulo: "Catálogo de servicios",
    categoria: "productos",
    fecha: "01/09/2022",
    url: "/diverse-online-profiles.png",
  },
]

export default function GaleriaImagenesPage() {
  const [filtro, setFiltro] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
  const [imagenSeleccionada, setImagenSeleccionada] = useState<number | null>(null)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [archivosSeleccionados, setArchivosSeleccionados] = useState<string[]>([])
  const [tituloImagen, setTituloImagen] = useState("")
  const [categoriaImagen, setCategoriaImagen] = useState("")

  // Filtrar imágenes según búsqueda y categoría
  const imagenesFiltradas = imagenesEjemplo.filter((img) => {
    const coincideFiltro = filtro === "" || img.titulo.toLowerCase().includes(filtro.toLowerCase())
    const coincideCategoria = categoriaSeleccionada === "" || img.categoria === categoriaSeleccionada
    return coincideFiltro && coincideCategoria
  })

  const simularSeleccionArchivos = () => {
    // Simular nombres de archivos seleccionados
    const nombresArchivos = ["imagen1.jpg", "imagen2.png", "imagen3.jpeg"]
    setArchivosSeleccionados(nombresArchivos)
  }

  // Añadir esta función para simular la subida
  const simularSubida = () => {
    // Validar que se haya seleccionado una categoría
    if (!categoriaImagen) {
      alert("Por favor, selecciona una categoría para la imagen")
      return
    }

    // Aquí iría la lógica para subir las imágenes
    // Por ahora solo cerramos el modal y limpiamos el estado
    setModalAbierto(false)
    setArchivosSeleccionados([])
    setTituloImagen("")
    setCategoriaImagen("")

    // Mostrar mensaje de éxito (en un caso real se implementaría un toast)
    alert("Imágenes subidas correctamente")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Galería de Imágenes</h1>
        <Button onClick={() => setModalAbierto(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Subir imágenes
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar imágenes..."
              className="pl-10"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
            <select
              className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              <option value="instalaciones">Instalaciones</option>
              <option value="personas">Personas</option>
              <option value="eventos">Eventos</option>
              <option value="productos">Productos</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagenesFiltradas.map((imagen) => (
            <div
              key={imagen.id}
              className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer ${
                imagenSeleccionada === imagen.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setImagenSeleccionada(imagen.id === imagenSeleccionada ? null : imagen.id)}
            >
              <div className="relative h-40">
                <Image src={imagen.url || "/placeholder.svg"} alt={imagen.titulo} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="p-3">
                <h3 className="font-medium truncate">{imagen.titulo}</h3>
                <p className="text-xs text-gray-500">
                  {imagen.categoria.charAt(0).toUpperCase() + imagen.categoria.slice(1)} • {imagen.fecha}
                </p>

                {imagenSeleccionada === imagen.id && (
                  <div className="mt-2 flex justify-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {imagenesFiltradas.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No se encontraron imágenes que coincidan con los criterios de búsqueda.</p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Mostrando {imagenesFiltradas.length} de {imagenesEjemplo.length} imágenes
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled={imagenesFiltradas.length === imagenesEjemplo.length}>
              Cargar más
            </Button>
          </div>
        </div>
      </div>

      {/* Modal para subir imágenes */}
      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Subir imágenes</DialogTitle>
            <DialogDescription>
              Selecciona las imágenes que deseas subir a la galería. Formatos permitidos: JPG, PNG, GIF.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={simularSeleccionArchivos}
            >
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-1">
                Arrastra y suelta tus imágenes aquí o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-400">Máximo 10 MB por archivo</p>
            </div>

            {archivosSeleccionados.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Archivos seleccionados:</h4>
                <div className="space-y-2">
                  {archivosSeleccionados.map((archivo, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center">
                        <ImageIcon className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm">{archivo}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => setArchivosSeleccionados((prev) => prev.filter((_, i) => i !== index))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {archivosSeleccionados.length > 0 && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    value={tituloImagen}
                    onChange={(e) => setTituloImagen(e.target.value)}
                    placeholder="Ej: Evento corporativo 2023"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="categoria" className="text-base font-medium">
                    Categoría de la imagen *
                  </Label>
                  <p className="text-xs text-gray-500 mb-1">Selecciona la categoría que mejor describe esta imagen</p>
                  <select
                    id="categoria"
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={categoriaImagen}
                    onChange={(e) => setCategoriaImagen(e.target.value)}
                    required
                  >
                    <option value="">-- Selecciona una categoría --</option>
                    <option value="instalaciones">Instalaciones</option>
                    <option value="personas">Personas</option>
                    <option value="eventos">Eventos</option>
                    <option value="productos">Productos</option>
                    <option value="corporativo">Corporativo</option>
                    <option value="prensa">Prensa</option>
                    <option value="marketing">Marketing</option>
                    <option value="redes-sociales">Redes Sociales</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAbierto(false)}>
              Cancelar
            </Button>
            <Button onClick={simularSubida} disabled={archivosSeleccionados.length === 0 || !categoriaImagen}>
              Subir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
