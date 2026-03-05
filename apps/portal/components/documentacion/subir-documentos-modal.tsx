"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload, Plus, X, Folder, ChevronRight, ChevronDown, File } from "lucide-react"
import { Label } from "@/components/ui/label"

// Tipos para la estructura de carpetas
type FolderItem = {
  id: string
  name: string
  subfolders: FolderItem[]
  expanded?: boolean
}

// Tipo para archivos a subir
type ArchivoSubir = {
  id: string
  nombre: string
  archivo: File | null
}

export function SubirDocumentosModal() {
  const [open, setOpen] = useState(false)
  const [archivos, setArchivos] = useState<ArchivoSubir[]>([{ id: "1", nombre: "", archivo: null }])
  const [carpetaSeleccionada, setCarpetaSeleccionada] = useState<string>("")
  const [rutaCarpeta, setRutaCarpeta] = useState<string[]>([])

  // Estructura de carpetas (misma que en la página principal)
  const [carpetas] = useState<FolderItem[]>([
    {
      id: "1",
      name: "Certificación de Calidad",
      subfolders: [
        {
          id: "1-1",
          name: "Normas ISO",
          subfolders: [],
        },
      ],
      expanded: false,
    },
    {
      id: "2",
      name: "Tarifario",
      subfolders: [
        {
          id: "2-1",
          name: "Terrestre",
          subfolders: [],
          expanded: false,
        },
        {
          id: "2-2",
          name: "Nautica",
          subfolders: [],
          expanded: false,
        },
      ],
      expanded: false,
    },
    {
      id: "3",
      name: "Manuales Operativos",
      subfolders: [],
      expanded: false,
    },
    {
      id: "4",
      name: "Presentaciones Corporativas",
      subfolders: [],
      expanded: false,
    },
    {
      id: "5",
      name: "Comunicados de Prensa",
      subfolders: [],
      expanded: false,
    },
  ])

  const [carpetasExpandidas, setCarpetasExpandidas] = useState<Set<string>>(new Set())

  // Función para expandir/colapsar carpetas
  const toggleCarpeta = (carpetaId: string) => {
    const nuevasExpandidas = new Set(carpetasExpandidas)
    if (nuevasExpandidas.has(carpetaId)) {
      nuevasExpandidas.delete(carpetaId)
    } else {
      nuevasExpandidas.add(carpetaId)
    }
    setCarpetasExpandidas(nuevasExpandidas)
  }

  // Función para seleccionar carpeta
  const seleccionarCarpeta = (carpetaId: string, ruta: string[]) => {
    setCarpetaSeleccionada(carpetaId)
    setRutaCarpeta(ruta)
  }

  // Renderizar árbol de carpetas
  const renderArbolCarpetas = (carpetas: FolderItem[], nivel = 0, rutaPadre: string[] = []) => {
    return carpetas.map((carpeta) => {
      const rutaActual = [...rutaPadre, carpeta.name]
      const estaExpandida = carpetasExpandidas.has(carpeta.id)
      const estaSeleccionada = carpetaSeleccionada === carpeta.id

      return (
        <div key={carpeta.id} className="select-none">
          <div
            className={`flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-100 ${
              estaSeleccionada ? "bg-blue-100 text-blue-800" : ""
            }`}
            style={{ paddingLeft: `${nivel * 20 + 8}px` }}
            onClick={() => seleccionarCarpeta(carpeta.id, rutaActual)}
          >
            {carpeta.subfolders.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleCarpeta(carpeta.id)
                }}
                className="mr-1 p-0.5 hover:bg-gray-200 rounded"
              >
                {estaExpandida ? (
                  <ChevronDown className="h-3 w-3 text-gray-500" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-gray-500" />
                )}
              </button>
            )}
            {carpeta.subfolders.length === 0 && <div className="w-4 mr-1" />}
            <Folder className="h-4 w-4 mr-2 text-yellow-500" />
            <span className="text-sm">{carpeta.name}</span>
          </div>
          {estaExpandida && carpeta.subfolders.length > 0 && (
            <div>{renderArbolCarpetas(carpeta.subfolders, nivel + 1, rutaActual)}</div>
          )}
        </div>
      )
    })
  }

  // Agregar nuevo archivo
  const agregarArchivo = () => {
    const nuevoId = (archivos.length + 1).toString()
    setArchivos([...archivos, { id: nuevoId, nombre: "", archivo: null }])
  }

  // Eliminar archivo
  const eliminarArchivo = (id: string) => {
    if (archivos.length > 1) {
      setArchivos(archivos.filter((archivo) => archivo.id !== id))
    }
  }

  // Actualizar nombre de archivo
  const actualizarNombre = (id: string, nombre: string) => {
    setArchivos(archivos.map((archivo) => (archivo.id === id ? { ...archivo, nombre } : archivo)))
  }

  // Actualizar archivo
  const actualizarArchivo = (id: string, archivo: File | null) => {
    setArchivos(archivos.map((item) => (item.id === id ? { ...item, archivo } : item)))
  }

  // Validar formulario
  const esFormularioValido = () => {
    return (
      carpetaSeleccionada !== "" &&
      archivos.every((archivo) => archivo.nombre.trim() !== "" && archivo.archivo !== null)
    )
  }

  // Manejar subida
  const manejarSubida = () => {
    if (!esFormularioValido()) return

    // Aquí iría la lógica para subir los archivos
    console.log("Subiendo archivos:", {
      carpeta: carpetaSeleccionada,
      ruta: rutaCarpeta,
      archivos: archivos,
    })

    // Resetear formulario y cerrar modal
    setArchivos([{ id: "1", nombre: "", archivo: null }])
    setCarpetaSeleccionada("")
    setRutaCarpeta([])
    setOpen(false)
  }

  // Resetear formulario al cerrar
  const manejarCerrar = () => {
    setArchivos([{ id: "1", nombre: "", archivo: null }])
    setCarpetaSeleccionada("")
    setRutaCarpeta([])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Subir documentos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Subir documentos</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex gap-6">
          {/* Panel izquierdo - Navegador de carpetas */}
          <div className="w-1/3 border rounded-lg p-4 overflow-y-auto">
            <h3 className="font-medium mb-3 text-sm">Seleccionar ubicación</h3>

            {/* Ruta actual */}
            {rutaCarpeta.length > 0 && (
              <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
                <div className="flex items-center text-gray-600">
                  <Folder className="h-3 w-3 mr-1" />
                  <span>{rutaCarpeta.join(" / ")}</span>
                </div>
              </div>
            )}

            {/* Árbol de carpetas */}
            <div className="space-y-1">{renderArbolCarpetas(carpetas)}</div>
          </div>

          {/* Panel derecho - Lista de archivos */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Archivos a subir</h3>
                <Button type="button" variant="outline" size="sm" onClick={agregarArchivo}>
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar archivo
                </Button>
              </div>

              {archivos.map((archivo, index) => (
                <div key={archivo.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <File className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium">Archivo {index + 1}</span>
                    </div>
                    {archivos.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => eliminarArchivo(archivo.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`nombre-${archivo.id}`} className="text-sm font-medium">
                        Nombre del documento
                      </Label>
                      <Input
                        id={`nombre-${archivo.id}`}
                        placeholder="Ej: Manual de procedimientos 2024"
                        value={archivo.nombre}
                        onChange={(e) => actualizarNombre(archivo.id, e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`archivo-${archivo.id}`} className="text-sm font-medium">
                        Seleccionar archivo
                      </Label>
                      <div className="mt-1">
                        <Input
                          id={`archivo-${archivo.id}`}
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            actualizarArchivo(archivo.id, file)
                          }}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Formatos permitidos: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX (máx. 10MB)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={manejarCerrar}>
            Cancelar
          </Button>
          <Button onClick={manejarSubida} disabled={!esFormularioValido()}>
            <Upload className="h-4 w-4 mr-2" />
            Subir documentos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
