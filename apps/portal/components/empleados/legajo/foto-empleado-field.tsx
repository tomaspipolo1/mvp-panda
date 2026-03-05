"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, XCircle } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { UseFormReturn } from "react-hook-form"

interface FotoEmpleadoFieldProps {
  form: UseFormReturn<any>
  name?: string
}

export function FotoEmpleadoField({ form, name = "imagen" }: FotoEmpleadoFieldProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageAspectRatio, setImageAspectRatio] = useState<"1:1" | "4:3" | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentValue = form.watch(name)

  // Sincronizar preview con el valor del formulario
  useEffect(() => {
    if (currentValue && typeof currentValue === "string" && currentValue.startsWith("data:")) {
      setImagePreview(currentValue)
      // Detectar proporción si hay imagen
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.width / img.height
        if (aspectRatio >= 0.9 && aspectRatio <= 1.1) {
          setImageAspectRatio("1:1")
        } else if (aspectRatio >= 0.7 && aspectRatio <= 0.8) {
          setImageAspectRatio("4:3")
        } else {
          setImageAspectRatio("1:1")
        }
      }
      img.src = currentValue
    } else if (!currentValue) {
      setImagePreview(null)
      setImageAspectRatio(null)
    }
  }, [currentValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen")
        return
      }

      // Crear preview y detectar proporción
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        form.setValue(name, result)

        // Detectar proporción de la imagen
        const img = new Image()
        img.onload = () => {
          const aspectRatio = img.width / img.height
          if (aspectRatio >= 0.9 && aspectRatio <= 1.1) {
            setImageAspectRatio("1:1")
          } else if (aspectRatio >= 0.7 && aspectRatio <= 0.8) {
            setImageAspectRatio("4:3")
          } else {
            setImageAspectRatio("1:1")
          }
        }
        img.src = result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setImageAspectRatio(null)
    form.setValue(name, "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Foto/Selfie</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {imagePreview ? (
                <div className="relative inline-block">
                  <div
                    className={`relative rounded-lg overflow-hidden border-2 border-gray-200 ${
                      imageAspectRatio === "4:3"
                        ? "w-32 h-[106px]" // 4:3 vertical (128px * 4/3 = ~106px)
                        : "w-32 h-32" // 1:1 (cuadrado)
                    }`}
                  >
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">Sin imagen</p>
                  </div>
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground">Formatos: 1:1 o 4:3 vertical</p>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
