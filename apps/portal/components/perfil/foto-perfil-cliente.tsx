"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface FotoPerfilClienteProps {
  imagenActual?: string
  onImagenCambiada: (file: File | null) => void
}

export function FotoPerfilCliente({ imagenActual, onImagenCambiada }: FotoPerfilClienteProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(imagenActual || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
        onImagenCambiada(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImagenCambiada(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
          {previewUrl ? (
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="Foto de perfil"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera size={48} className="text-gray-400" />
          )}
        </div>
        {previewUrl && (
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
            aria-label="Eliminar imagen"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col items-center space-y-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="foto-perfil"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2"
        >
          <Upload size={16} />
          <span>{previewUrl ? "Cambiar foto" : "Subir foto"}</span>
        </Button>
        <p className="text-xs text-gray-500 text-center">
          Formatos permitidos: JPG, PNG. <br />
          Tamaño máximo: 5MB
        </p>
      </div>
    </div>
  )
}
