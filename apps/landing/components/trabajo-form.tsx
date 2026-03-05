"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, HelpCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export function TrabajoForm() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    genero: "",
    discapacidad: "",
    descripcionDiscapacidad: "",
    celular: "",
    email: "",
    partidoResidencia: "",
    fechaNacimiento: "",
    nacionalidad: "",
    nivelEducativo: "",
    tituloObtenido: ""
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de envío
    console.log("Formulario enviado:", formData, selectedFile)
    
    // Redirigir a la página de éxito
    router.push('/contacto/trabaja/exito')
  }

  return (
    <Card className="p-6 md:p-8 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Formulario de Contacto</h2>
        <p className="text-sm text-gray-600">Completá el formulario y nos pondremos en contacto lo antes posible.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre y Apellido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
              Nombre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nombre"
              type="text"
              required
              className="w-full"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apellido" className="text-sm font-medium text-gray-700">
              Apellido <span className="text-red-500">*</span>
            </Label>
            <Input
              id="apellido"
              type="text"
              required
              className="w-full"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
            />
          </div>
        </div>

        {/* Género y Discapacidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="genero" className="text-sm font-medium text-gray-700">
              Género <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.genero} onValueChange={(value) => setFormData({ ...formData, genero: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="femenino">Femenino</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
                <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="discapacidad" className="text-sm font-medium text-gray-700">
              ¿Posee alguna discapacidad? <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Select value={formData.discapacidad} onValueChange={(value) => setFormData({ ...formData, discapacidad: value, ...(value === "no" ? { descripcionDiscapacidad: "" } : {}) })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="si">Sí</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <HelpCircle className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">Si indicás que sí, describí la discapacidad en el campo siguiente.</p>
          </div>
        </div>

        {/* Describa la discapacidad (solo si tiene discapacidad) */}
        {formData.discapacidad === "si" && (
          <div className="space-y-2">
            <Label htmlFor="descripcionDiscapacidad" className="text-sm font-medium text-gray-700">
              Describa la discapacidad que posee <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="descripcionDiscapacidad"
              rows={3}
              required
              placeholder="Ej.: movilidad reducida, visión, audición..."
              className="w-full resize-none"
              value={formData.descripcionDiscapacidad}
              onChange={(e) => setFormData({ ...formData, descripcionDiscapacidad: e.target.value })}
            />
          </div>
        )}

        {/* Celular y Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="celular" className="text-sm font-medium text-gray-700">
              Número de celular <span className="text-red-500">*</span>
            </Label>
            <Input
              id="celular"
              type="tel"
              required
              className="w-full"
              value={formData.celular}
              onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              className="w-full"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {/* Partido de Residencia y Fecha de Nacimiento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="partidoResidencia" className="text-sm font-medium text-gray-700">
              Partido de residencia <span className="text-red-500">*</span>
            </Label>
            <Input
              id="partidoResidencia"
              type="text"
              required
              className="w-full"
              value={formData.partidoResidencia}
              onChange={(e) => setFormData({ ...formData, partidoResidencia: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fechaNacimiento" className="text-sm font-medium text-gray-700">
              Fecha de nacimiento <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fechaNacimiento"
              type="date"
              required
              min="1940-01-01"
              max="2010-12-31"
              className="w-full"
              value={formData.fechaNacimiento}
              onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
            />
          </div>
        </div>

        {/* Nacionalidad */}
        <div className="space-y-2">
          <Label htmlFor="nacionalidad" className="text-sm font-medium text-gray-700">
            Nacionalidad <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.nacionalidad} onValueChange={(value) => setFormData({ ...formData, nacionalidad: value })}>
            <SelectTrigger className={`w-full ${!formData.nacionalidad ? 'border-red-300' : ''}`}>
              <SelectValue placeholder="Para completar este campo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="argentina">Argentina</SelectItem>
              <SelectItem value="boliviana">Boliviana</SelectItem>
              <SelectItem value="brasileña">Brasileña</SelectItem>
              <SelectItem value="chilena">Chilena</SelectItem>
              <SelectItem value="colombiana">Colombiana</SelectItem>
              <SelectItem value="paraguaya">Paraguaya</SelectItem>
              <SelectItem value="peruana">Peruana</SelectItem>
              <SelectItem value="uruguaya">Uruguaya</SelectItem>
              <SelectItem value="venezolana">Venezolana</SelectItem>
              <SelectItem value="otra">Otra</SelectItem>
            </SelectContent>
          </Select>
          {!formData.nacionalidad && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <span className="text-sm">⚠</span> Para completar este campo
            </p>
          )}
        </div>

        {/* Nivel Educativo */}
        <div className="space-y-2">
          <Label htmlFor="nivelEducativo" className="text-sm font-medium text-gray-700">
            Nivel educativo alcanzado <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.nivelEducativo} onValueChange={(value) => setFormData({ ...formData, nivelEducativo: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Terciario completo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primario-incompleto">Primario incompleto</SelectItem>
              <SelectItem value="primario-completo">Primario completo</SelectItem>
              <SelectItem value="secundario-incompleto">Secundario incompleto</SelectItem>
              <SelectItem value="secundario-completo">Secundario completo</SelectItem>
              <SelectItem value="terciario-incompleto">Terciario incompleto</SelectItem>
              <SelectItem value="terciario-completo">Terciario completo</SelectItem>
              <SelectItem value="universitario-incompleto">Universitario incompleto</SelectItem>
              <SelectItem value="universitario-completo">Universitario completo</SelectItem>
              <SelectItem value="posgrado">Posgrado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Título obtenido */}
        <div className="space-y-2">
          <Label htmlFor="tituloObtenido" className="text-sm font-medium text-gray-700">
            Detallar el título obtenido o a obtener
          </Label>
          <Textarea
            id="tituloObtenido"
            rows={3}
            className="w-full resize-none"
            value={formData.tituloObtenido}
            onChange={(e) => setFormData({ ...formData, tituloObtenido: e.target.value })}
          />
        </div>

        {/* Cargar Curriculum */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Cargar curriculum
          </Label>
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50/30">
            {!selectedFile ? (
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Upload className="h-10 w-10 text-blue-500" />
                </div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm font-medium">
                    Añadir archivo
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-3">
                  Ejemplo: NombreCompleto_CV.pdf<br />
                  Sube 1 archivo compatible PDF o image. Tamaño máximo: 10 MB.
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-white rounded-md">
                <span className="text-sm text-gray-700 truncate flex-1">{selectedFile.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Botón Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto px-8"
            style={{ backgroundColor: '#1B1E4A' }}
          >
            Enviar mi postulación
          </Button>
        </div>
      </form>
    </Card>
  )
}
