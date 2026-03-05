"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function FormularioNuevaSolicitudUsuarioBasico() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    tipo: "",
    clase: "",
    asunto: "",
    descripcion: "",
    tipoDato: "",
    nuevoValor: "",
    archivos: [] as File[],
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        archivos: [...prev.archivos, ...filesArray],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      archivos: prev.archivos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.tipo || !formData.clase || !formData.asunto || !formData.descripcion) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    // Validación adicional para cambio de datos personales
    if (formData.clase === "cambio_datos_personales" && (!formData.tipoDato || !formData.nuevoValor)) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos para el cambio de datos personales.",
        variant: "destructive",
      })
      return
    }

    // Validación del formato del nuevo valor (8 dígitos numéricos)
    if (formData.clase === "cambio_datos_personales" && formData.nuevoValor) {
      const numeroRegex = /^\d{1,8}$/
      if (!numeroRegex.test(formData.nuevoValor)) {
        toast({
          title: "Error",
          description: "El nuevo valor debe contener hasta 8 dígitos numéricos únicamente.",
          variant: "destructive",
        })
        return
      }
    }

    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para enviar la solicitud al backend
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulación de envío

      toast({
        title: "Solicitud enviada",
        description: "Su solicitud ha sido enviada correctamente.",
      })

      // Redireccionar a la página de mis solicitudes
      router.push("/usuario-basico/gestion/solicitudes/mis-solicitudes")
    } catch (error) {
      console.error("Error al enviar solicitud:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al enviar la solicitud. Por favor intente nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getClaseOptions = (tipo: string) => {
    switch (tipo) {
      case "reclamo":
        return [
          { value: "ecologicas", label: "Ecológicas" },
          { value: "servicios", label: "Servicios" },
          { value: "otros_reclamo", label: "Otros" },
        ]
      case "consulta":
        return [
          { value: "comercial", label: "Comercial" },
          { value: "acceso", label: "Acceso" },
          { value: "otros_consulta", label: "Otros" },
        ]
      case "tramite":
        return [
          { value: "cambio_datos_personales", label: "Cambio de datos personales" },
          { value: "otros_tramite", label: "Otros" },
        ]
      default:
        return []
    }
  }

  const handleTipoChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      tipo: value,
      clase: "", // Reset clase when tipo changes
      tipoDato: "", // Reset tipoDato
      nuevoValor: "", // Reset nuevoValor
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <p className="text-gray-600">Complete los datos para generar una nueva solicitud</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="tipo" className="text-base font-medium">
              Tipo de Solicitud
            </Label>
            <Select value={formData.tipo} onValueChange={handleTipoChange}>
              <SelectTrigger id="tipo" className="w-full mt-1">
                <SelectValue placeholder="Seleccionar tipo de solicitud" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reclamo">Reclamo</SelectItem>
                <SelectItem value="consulta">Consulta</SelectItem>
                <SelectItem value="tramite">Trámite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="clase" className="text-base font-medium">
              Clase
            </Label>
            <Select
              value={formData.clase}
              onValueChange={(value) => handleChange("clase", value)}
              disabled={!formData.tipo}
            >
              <SelectTrigger id="clase" className="w-full mt-1">
                <SelectValue placeholder="Seleccionar clase" />
              </SelectTrigger>
              <SelectContent>
                {getClaseOptions(formData.tipo).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {formData.clase === "cambio_datos_personales" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="tipoDato" className="text-base font-medium">
                Tipo de dato
              </Label>
              <Select value={formData.tipoDato} onValueChange={(value) => handleChange("tipoDato", value)}>
                <SelectTrigger id="tipoDato" className="w-full mt-1">
                  <SelectValue placeholder="Seleccionar tipo de dato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dni">DNI</SelectItem>
                  <SelectItem value="cuil">CUIL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="nuevoValor" className="text-base font-medium">
                Nuevo valor
              </Label>
              <Input
                id="nuevoValor"
                type="text"
                value={formData.nuevoValor}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 8)
                  handleChange("nuevoValor", value)
                }}
                className="mt-1"
                placeholder="Ingrese el nuevo valor (hasta 8 dígitos)"
                maxLength={8}
              />
            </div>
          </div>
        )}

        <div className="max-w-md">
          <Label htmlFor="asunto" className="text-base font-medium">
            Asunto
          </Label>
          <Input
            id="asunto"
            value={formData.asunto}
            onChange={(e) => handleChange("asunto", e.target.value)}
            className="mt-1"
            placeholder="Ingrese el asunto de su solicitud"
          />
        </div>

        <div>
          <Label htmlFor="descripcion" className="text-base font-medium">
            Descripción
          </Label>
          <Textarea
            id="descripcion"
            value={formData.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            rows={6}
            className="mt-1 resize-none"
            placeholder="Describa detalladamente el motivo de su solicitud..."
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Documentación Adjunta</h3>
          <div>
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50">
                <Upload size={16} />
                <span>Adjuntar Archivo</span>
              </div>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png"
              />
            </label>
          </div>
        </div>

        <div className="border rounded-md">
          <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium">
            <div className="col-span-5">Nombre del Archivo</div>
            <div className="col-span-3">Tipo</div>
            <div className="col-span-2">Tamaño</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          {formData.archivos.length === 0 ? (
            <div className="p-6 text-center text-gray-500 italic">No hay archivos adjuntos</div>
          ) : (
            <div>
              {formData.archivos.map((file, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b text-sm items-center">
                  <div className="col-span-5 truncate">{file.name}</div>
                  <div className="col-span-3">{file.type || "Desconocido"}</div>
                  <div className="col-span-2">{formatFileSize(file.size)}</div>
                  <div className="col-span-2 text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-transparent p-0"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/usuario-basico/gestion/solicitudes/mis-solicitudes")}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-plp-dark hover:bg-plp-medium">
          {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
        </Button>
      </div>
    </form>
  )
}
