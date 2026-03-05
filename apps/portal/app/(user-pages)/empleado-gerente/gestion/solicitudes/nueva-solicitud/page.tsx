"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Upload, Trash2, Plus } from "lucide-react"
import Link from "next/link"

interface ArchivoAdjunto {
  id: string
  nombre: string
  tipo: string
  tamano: string
}

interface Superior {
  id: string
  nombre: string
}

interface Periodo {
  id: string
  valor: string
}

export default function NuevaSolicitudPage() {
  const [formData, setFormData] = useState({
    tipoSolicitud: "",
    nombre: "",
    apellido: "",
    legajo: "", // Vacío para que el usuario lo complete
    fechaInicio: "",
    fechaFin: "",
    monto: "",
    periodo: "",
    descripcion: "",
    notificar: false,
  })

  const [archivosAdjuntos, setArchivosAdjuntos] = useState<ArchivoAdjunto[]>([])
  const [superiores, setSuperiores] = useState<Superior[]>([
    { id: "sup1", nombre: "María González - Gerente de Recursos Humanos" },
  ])
  const [periodos, setPeriodos] = useState<Periodo[]>([{ id: "per1", valor: "" }])

  const fileInputRef = useState<HTMLInputElement | null>(null)
  const ultimoSueldoNeto = 350000 // Valor de ejemplo para el último sueldo neto

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, notificar: checked }))
  }

  const handleAdjuntarArchivo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        nombre: file.name,
        tipo: file.type,
        tamano: formatFileSize(file.size),
      }))
      setArchivosAdjuntos([...archivosAdjuntos, ...newFiles])
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveFile = (id: string) => {
    setArchivosAdjuntos(archivosAdjuntos.filter((archivo) => archivo.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleAddSuperior = () => {
    const newSuperior = {
      id: `sup${superiores.length + 1}`,
      nombre: "Seleccionar superior",
    }
    setSuperiores([...superiores, newSuperior])
  }

  const handleRemoveSuperior = (id: string) => {
    if (superiores.length > 1) {
      setSuperiores(superiores.filter((sup) => sup.id !== id))
    }
  }

  const handleChangeSuperior = (id: string, value: string) => {
    setSuperiores(superiores.map((sup) => (sup.id === id ? { ...sup, nombre: value } : sup)))
  }

  const handleAddPeriodo = () => {
    const newPeriodo = {
      id: `per${periodos.length + 1}`,
      valor: "",
    }
    setPeriodos([...periodos, newPeriodo])
  }

  const handleRemovePeriodo = (id: string) => {
    if (periodos.length > 1) {
      setPeriodos(periodos.filter((per) => per.id !== id))
    }
  }

  const handleChangePeriodo = (id: string, value: string) => {
    setPeriodos(periodos.map((per) => (per.id === id ? { ...per, valor: value } : per)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log({
      ...formData,
      superiores,
      periodos,
      archivosAdjuntos,
    })
    alert("Solicitud enviada correctamente")
  }

  // Renderizado condicional de campos según el tipo de solicitud
  const renderCamposEspecificos = () => {
    switch (formData.tipoSolicitud) {
      case "licencia_ordinaria":
      case "licencia_medica":
      case "dia_tramite":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Inicio
              </Label>
              <div className="relative">
                <Input
                  id="fechaInicio"
                  name="fechaInicio"
                  type="date"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  className="w-full pl-10"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Fin
              </Label>
              <div className="relative">
                <Input
                  id="fechaFin"
                  name="fechaFin"
                  type="date"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  className="w-full pl-10"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        )
      case "prestamo":
        return (
          <div>
            <Label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-1">
              Monto Solicitado (máx. ${ultimoSueldoNeto.toLocaleString()})
            </Label>
            <Input
              id="monto"
              name="monto"
              type="number"
              value={formData.monto}
              onChange={handleChange}
              max={ultimoSueldoNeto}
              placeholder={`Máximo: $${ultimoSueldoNeto.toLocaleString()}`}
              className="w-full"
              required
            />
            {Number.parseFloat(formData.monto) > ultimoSueldoNeto && (
              <p className="text-red-500 text-sm mt-1">
                El monto no puede superar su último sueldo neto (${ultimoSueldoNeto.toLocaleString()})
              </p>
            )}
          </div>
        )
      case "recibos":
        return (
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="block text-sm font-medium text-gray-700">Períodos Solicitados</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddPeriodo}
                className="flex items-center text-blue-600"
              >
                <Plus className="h-4 w-4 mr-1" />
                Agregar Período
              </Button>
            </div>

            {periodos.map((periodo, index) => (
              <div key={periodo.id} className="flex items-center gap-2 mb-2">
                <div className="flex-grow">
                  <Select value={periodo.valor} onValueChange={(value) => handleChangePeriodo(periodo.id, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enero_2023">Enero 2023</SelectItem>
                      <SelectItem value="febrero_2023">Febrero 2023</SelectItem>
                      <SelectItem value="marzo_2023">Marzo 2023</SelectItem>
                      <SelectItem value="abril_2023">Abril 2023</SelectItem>
                      <SelectItem value="mayo_2023">Mayo 2023</SelectItem>
                      <SelectItem value="junio_2023">Junio 2023</SelectItem>
                      <SelectItem value="julio_2023">Julio 2023</SelectItem>
                      <SelectItem value="agosto_2023">Agosto 2023</SelectItem>
                      <SelectItem value="septiembre_2023">Septiembre 2023</SelectItem>
                      <SelectItem value="octubre_2023">Octubre 2023</SelectItem>
                      <SelectItem value="noviembre_2023">Noviembre 2023</SelectItem>
                      <SelectItem value="diciembre_2023">Diciembre 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePeriodo(periodo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link
          href="/empleado-gerente/gestion/solicitudes/mis-solicitudes"
          className="flex items-center text-blue-600 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Nueva Solicitud</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Formulario de Solicitud</h2>
          <p className="text-gray-600 mb-6">Complete los datos para generar una nueva solicitud</p>

          <div className="space-y-6">
            {/* Tipo de Solicitud */}
            <div>
              <Label htmlFor="tipoSolicitud" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Solicitud
              </Label>
              <Select
                value={formData.tipoSolicitud}
                onValueChange={(value) => handleSelectChange("tipoSolicitud", value)}
              >
                <SelectTrigger id="tipoSolicitud" className="w-full">
                  <SelectValue placeholder="Seleccionar tipo de solicitud" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="licencia_ordinaria">Licencia Ordinaria Anual</SelectItem>
                  <SelectItem value="licencia_medica">Licencia Médica</SelectItem>
                  <SelectItem value="dia_tramite">Día de trámite</SelectItem>
                  <SelectItem value="prestamo">Solicitud de Préstamo</SelectItem>
                  <SelectItem value="recibos">Solicitud de Recibos de Sueldo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Datos personales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese su apellido"
                  className="w-full"
                  required
                />
              </div>
            </div>

            {/* Legajo */}
            <div>
              <Label htmlFor="legajo" className="block text-sm font-medium text-gray-700 mb-1">
                Legajo
              </Label>
              <Input
                id="legajo"
                name="legajo"
                value={formData.legajo}
                onChange={handleChange}
                placeholder="Ej: 9102"
                className="w-full"
                required
              />
            </div>

            {/* Superiores Jerárquicos */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="block text-sm font-medium text-gray-700">Aprobadores</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSuperior}
                  className="flex items-center text-blue-600"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar Firmante
                </Button>
              </div>

              {superiores.map((superior, index) => (
                <div key={superior.id} className="flex items-center gap-2 mb-2">
                  <div className="flex-grow">
                    <Select
                      value={superior.nombre}
                      onValueChange={(value) => handleChangeSuperior(superior.id, value)}
                      disabled={index === 0}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar superior" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="María González - Gerente de Recursos Humanos">
                          María González - Gerente de Recursos Humanos
                        </SelectItem>
                        <SelectItem value="Carlos Rodríguez - Director de Operaciones">
                          Carlos Rodríguez - Director de Operaciones
                        </SelectItem>
                        <SelectItem value="Ana Martínez - Gerente de Finanzas">
                          Ana Martínez - Gerente de Finanzas
                        </SelectItem>
                        <SelectItem value="Roberto Sánchez - Presidente">Roberto Sánchez - Presidente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSuperior(superior.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Campos específicos según el tipo de solicitud */}
            {renderCamposEspecificos()}

            {/* Descripción */}
            <div>
              <Label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describa detalladamente el motivo de su solicitud..."
                rows={6}
                required
              />
            </div>
          </div>
        </div>

        {/* Documentación Adjunta */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Documentación Adjunta</h2>
            <Button type="button" variant="outline" onClick={handleAdjuntarArchivo} className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Adjuntar Archivo
            </Button>
            <input
              type="file"
              ref={(el) => (fileInputRef.current = el)}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Nombre del Archivo</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Tamaño</th>
                  <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {archivosAdjuntos.length > 0 ? (
                  archivosAdjuntos.map((archivo) => (
                    <tr key={archivo.id} className="border-b border-gray-200">
                      <td className="py-4 px-4">{archivo.nombre}</td>
                      <td className="py-4 px-4">{archivo.tipo}</td>
                      <td className="py-4 px-4">{archivo.tamano}</td>
                      <td className="py-4 px-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(archivo.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 px-4 text-center text-gray-500 italic">
                      No hay archivos adjuntos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="flex items-center space-x-2">
          <Checkbox id="notificar" checked={formData.notificar} onCheckedChange={handleCheckboxChange} />
          <Label htmlFor="notificar" className="text-sm font-normal">
            Notificarme por correo electrónico cuando haya actualizaciones
          </Label>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/empleado-gerente/gestion/solicitudes/mis-solicitudes">Cancelar</Link>
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Enviar Solicitud
          </Button>
        </div>
      </form>
    </div>
  )
}
