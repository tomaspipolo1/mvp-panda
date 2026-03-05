"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, X, FileText, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SubirDocumentosModalProps {
  isOpen: boolean
  onClose: () => void
  licitacion: any
}

export function SubirDocumentosModal({ isOpen, onClose, licitacion }: SubirDocumentosModalProps) {
  const { toast } = useToast()
  const [documentos, setDocumentos] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setDocumentos((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setDocumentos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (documentos.length === 0) {
      toast({
        title: "Error",
        description: "Debe seleccionar al menos un documento para subir.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    // Simulamos la subida de documentos
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Documentos subidos",
      description: `Se han subido ${documentos.length} documentos correctamente para la licitación ${licitacion.numero}.`,
      variant: "default",
    })

    setUploading(false)
    setDocumentos([])
    onClose()
  }

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} bytes`
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subir documentación faltante</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h3 className="font-medium text-lg">Licitación: {licitacion?.titulo}</h3>
            <p className="text-sm text-gray-500">Número: {licitacion?.numero}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentos">Seleccione los documentos a subir</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Input
                id="documentos"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <label
                htmlFor="documentos"
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Haga clic para seleccionar archivos o arrastre y suelte aquí
                </span>
                <Button variant="outline" size="sm" disabled={uploading}>
                  Seleccionar archivos
                </Button>
              </label>
            </div>
          </div>

          {documentos.length > 0 && (
            <div className="space-y-2">
              <Label>Documentos seleccionados</Label>
              <div className="border rounded-md divide-y">
                {documentos.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500">
            <p>
              <strong>Nota:</strong> Solo se permiten archivos PDF, DOCX, XLSX, JPG y PNG. Tamaño máximo por archivo: 10
              MB.
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose} disabled={uploading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={documentos.length === 0 || uploading}>
            {uploading ? (
              <>
                <span className="animate-spin mr-2">⏳</span> Subiendo...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" /> Subir documentos
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
