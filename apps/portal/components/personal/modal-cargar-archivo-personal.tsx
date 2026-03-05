"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react"

interface ModalCargarArchivoPersonalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
}

export function ModalCargarArchivoPersonal({ isOpen, onClose, onUpload }: ModalCargarArchivoPersonalProps) {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase()

      if (fileExtension === "xlsx" || fileExtension === "xls" || fileExtension === "csv") {
        setFile(selectedFile)
        setError("")
      } else {
        setFile(null)
        setError("El archivo debe ser Excel (.xlsx, .xls) o CSV (.csv)")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Debe seleccionar un archivo")
      return
    }

    try {
      setUploading(true)
      // Simulación de carga
      await new Promise((resolve) => setTimeout(resolve, 1500))

      onUpload(file)
      setUploadSuccess(true)

      // Mostrar mensaje de éxito por 1.5 segundos antes de cerrar
      setTimeout(() => {
        toast({
          title: "Archivo cargado",
          description: "El archivo ha sido procesado exitosamente.",
        })
        setFile(null)
        setUploadSuccess(false)
        setUploading(false)
        onClose()
      }, 1500)
    } catch (error) {
      setUploading(false)
      setError("Error al procesar el archivo. Inténtelo nuevamente.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Cargar Archivo de Personal</DialogTitle>
          <DialogDescription>
            Suba un archivo Excel o CSV con el listado de personal. El archivo debe contener las columnas: Nombre
            Completo, DNI y Teléfono.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 transition-colors hover:border-gray-400">
              {!uploadSuccess ? (
                <>
                  <FileSpreadsheet className="h-10 w-10 text-gray-400 mb-4" />
                  <div className="space-y-2 text-center">
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Haga clic para cargar</span> o arrastre y suelte
                    </p>
                    <p className="text-xs text-gray-500">Excel o CSV (máx. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept=".xlsx,.xls,.csv"
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-green-500 mb-4" />
                  <p className="text-sm font-medium">¡Archivo cargado exitosamente!</p>
                </div>
              )}
            </div>

            {file && !uploadSuccess && (
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium truncate max-w-[300px]">{file.name}</span>
                </div>
                <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            )}

            {error && (
              <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={uploading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!file || uploading || uploadSuccess}>
              {uploading ? (
                <>
                  <span className="animate-spin mr-2">◌</span>
                  Procesando...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Cargar Archivo
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
