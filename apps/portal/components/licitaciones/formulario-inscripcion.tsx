"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Upload, X, FileText, AlertTriangle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"

interface DocumentoLicitacion {
  id: string
  nombre: string
  tipo: string
  tamano: string
}

interface DocumentoRequerido {
  id: string
  tipo: string
  estado: "Pendiente" | "Cargado"
  fechaCarga: string | null
  obligatorio: boolean
}

interface DocumentoAdicional {
  id: string
  nombre: string
  tipo: string
  tamano: string
  fechaCarga: string
}

interface FormularioInscripcionProps {
  licitacion: {
    id: string
    numero: string
    expediente: string
    titulo: string
    montoEstimado: number
    fechaApertura: string
    documentos: DocumentoLicitacion[]
    documentosRequeridos: DocumentoRequerido[]
  }
}

export function FormularioInscripcion({ licitacion }: FormularioInscripcionProps) {
  const [entidad, setEntidad] = useState<string>("")
  const [montoOfertado, setMontoOfertado] = useState<string>("")
  const [fechaPresentacion, setFechaPresentacion] = useState<string>("")
  const [observaciones, setObservaciones] = useState<string>("")
  const [documentosAdicionales, setDocumentosAdicionales] = useState<DocumentoAdicional[]>([])
  const [archivosSeleccionados, setArchivosSeleccionados] = useState<{ [key: string]: File | null }>({})
  const [archivosAdicionalesSeleccionados, setArchivosAdicionalesSeleccionados] = useState<File[]>([])
  const [cargando, setCargando] = useState<{ [key: string]: boolean }>({})

  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileInputAdicionalesRef = useRef<HTMLInputElement>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Verificar documentos obligatorios
    const documentosObligatoriosFaltantes = licitacion.documentosRequeridos
      .filter((doc) => doc.obligatorio && doc.estado === "Pendiente" && !archivosSeleccionados[doc.id])
      .map((doc) => doc.tipo)

    if (documentosObligatoriosFaltantes.length > 0) {
      toast({
        title: "Error en la inscripción",
        description: `Faltan documentos obligatorios: ${documentosObligatoriosFaltantes.join(", ")}`,
        variant: "destructive",
      })
      return
    }

    // Simular envío del formulario
    toast({
      title: "Inscripción guardada",
      description: "Su inscripción a la licitación ha sido guardada correctamente.",
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setArchivosSeleccionados((prev) => ({
        ...prev,
        [docId]: file,
      }))
    }
  }

  const handleFileAdicionalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setArchivosAdicionalesSeleccionados((prev) => [...prev, ...filesArray])
    }
  }

  const handleUploadFile = async (docId: string) => {
    const file = archivosSeleccionados[docId]
    if (!file) return

    setCargando((prev) => ({ ...prev, [docId]: true }))

    // Simular carga
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Actualizar estado del documento
    const updatedDocs = licitacion.documentosRequeridos.map((doc) => {
      if (doc.id === docId) {
        return {
          ...doc,
          estado: "Cargado" as const,
          fechaCarga: new Date().toLocaleDateString(),
        }
      }
      return doc
    })

    licitacion.documentosRequeridos = updatedDocs

    setCargando((prev) => ({ ...prev, [docId]: false }))
    setArchivosSeleccionados((prev) => ({
      ...prev,
      [docId]: null,
    }))

    toast({
      title: "Documento cargado",
      description: "El documento ha sido cargado correctamente.",
    })
  }

  const handleUploadAdicionales = async () => {
    if (archivosAdicionalesSeleccionados.length === 0) return

    // Simular carga
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Agregar documentos adicionales
    const nuevosDocumentos = archivosAdicionalesSeleccionados.map((file, index) => ({
      id: `adicional-${Date.now()}-${index}`,
      nombre: file.name,
      tipo: file.type.split("/")[1].toUpperCase(),
      tamano: `${(file.size / 1024).toFixed(1)} KB`,
      fechaCarga: new Date().toLocaleDateString(),
    }))

    setDocumentosAdicionales((prev) => [...prev, ...nuevosDocumentos])
    setArchivosAdicionalesSeleccionados([])

    toast({
      title: "Documentos adicionales cargados",
      description: `Se han cargado ${nuevosDocumentos.length} documento(s) adicional(es).`,
    })
  }

  const removeSelectedFile = (docId: string) => {
    setArchivosSeleccionados((prev) => {
      const updated = { ...prev }
      delete updated[docId]
      return updated
    })
  }

  const removeSelectedAdicional = (index: number) => {
    setArchivosAdicionalesSeleccionados((prev) => prev.filter((_, i) => i !== index))
  }

  const removeDocumentoAdicional = (id: string) => {
    setDocumentosAdicionales((prev) => prev.filter((doc) => doc.id !== id))

    toast({
      title: "Documento eliminado",
      description: "El documento adicional ha sido eliminado.",
    })
  }

  const triggerFileInput = (docId: string) => {
    // Crear un input file temporal
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
    input.onchange = (e) => handleFileChange(e as any, docId)
    input.click()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Link href="/proveedor/gestion/licitaciones/nueva-inscripcion" className="flex items-center text-plp-dark mr-4">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold text-plp-darkest">Nueva Inscripción a Licitación</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Número */}
          <div>
            <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">
              Número
            </label>
            <Input id="numero" value={licitacion.numero} readOnly className="bg-gray-50" />
          </div>

          {/* Número de Expediente */}
          <div>
            <label htmlFor="expediente" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Expediente
            </label>
            <Input id="expediente" value={licitacion.expediente} readOnly className="bg-gray-50" />
          </div>

          {/* Entidad Licitante */}
          <div>
            <label htmlFor="entidad" className="block text-sm font-medium text-gray-700 mb-1">
              Entidad Licitante
            </label>
            <Select value={entidad} onValueChange={setEntidad} required>
              <SelectTrigger id="entidad">
                <SelectValue placeholder="Seleccionar entidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entidad1">Suministros Industriales S.A.</SelectItem>
                <SelectItem value="entidad2">Constructora ABC S.R.L.</SelectItem>
                <SelectItem value="entidad3">Servicios Tecnológicos XYZ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Monto Estimado */}
          <div>
            <label htmlFor="montoEstimado" className="block text-sm font-medium text-gray-700 mb-1">
              Monto Estimado
            </label>
            <Input
              id="montoEstimado"
              value={formatCurrency(licitacion.montoEstimado)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          {/* Monto Ofertado */}
          <div>
            <label htmlFor="montoOfertado" className="block text-sm font-medium text-gray-700 mb-1">
              Monto Ofertado
            </label>
            <Input
              id="montoOfertado"
              value={montoOfertado}
              onChange={(e) => setMontoOfertado(e.target.value)}
              placeholder="$0.00"
              required
            />
          </div>

          {/* Fecha de Presentación */}
          <div>
            <label htmlFor="fechaPresentacion" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Presentación
            </label>
            <Input
              id="fechaPresentacion"
              type="date"
              value={fechaPresentacion}
              onChange={(e) => setFechaPresentacion(e.target.value)}
              placeholder="dd/mm/aaaa"
              required
            />
          </div>

          {/* Fecha de Apertura */}
          <div>
            <label htmlFor="fechaApertura" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Apertura
            </label>
            <Input id="fechaApertura" value={licitacion.fechaApertura} readOnly className="bg-gray-50" />
          </div>
        </div>

        {/* Documentos de la Licitación */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-2">Documentos de la Licitación</h2>
          <p className="text-gray-600 mb-4">Descargue los documentos correspondientes a esta licitación.</p>

          <div className="space-y-4">
            {licitacion.documentos.map((documento) => (
              <div
                key={documento.id}
                className="flex items-center justify-between border-b border-gray-200 py-3 last:border-0"
              >
                <div className="flex items-start">
                  <div className="mr-4 text-gray-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{documento.nombre}</p>
                    <p className="text-sm text-gray-500">
                      {documento.tipo} • {documento.tamano}
                    </p>
                  </div>
                </div>
                <Button variant="outline">Descargar</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Documentación Requerida */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Documentación Requerida</h2>
              <p className="text-sm text-gray-500 mt-1">
                Los documentos marcados con <span className="text-red-500">*</span> son obligatorios y su falta es
                motivo de rechazo.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo de Documento</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Estado</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Fecha de Carga</th>
                  <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {licitacion.documentosRequeridos.map((documento) => (
                  <tr key={documento.id} className="border-b border-gray-200">
                    <td className="py-4 px-4">
                      {documento.tipo}
                      {documento.obligatorio && <span className="text-red-500 ml-1">*</span>}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          documento.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-green-100 text-green-800 hover:bg-green-100"
                        }
                      >
                        {documento.estado}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">{documento.fechaCarga || "-"}</td>
                    <td className="py-4 px-4">
                      {documento.estado === "Pendiente" ? (
                        <div className="flex flex-col items-center space-y-2">
                          {archivosSeleccionados[documento.id] ? (
                            <div className="w-full">
                              <div className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm mb-2">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="truncate max-w-[150px]">
                                    {archivosSeleccionados[documento.id]?.name}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeSelectedFile(documento.id)}
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                              <Button
                                type="button"
                                onClick={() => handleUploadFile(documento.id)}
                                disabled={cargando[documento.id]}
                                className="w-full"
                                size="sm"
                              >
                                {cargando[documento.id] ? (
                                  <span className="flex items-center">
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Subiendo...
                                  </span>
                                ) : (
                                  <span className="flex items-center">
                                    <Upload className="h-4 w-4 mr-1" />
                                    Subir Archivo
                                  </span>
                                )}
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center w-full"
                              onClick={() => triggerFileInput(documento.id)}
                            >
                              <Upload className="h-4 w-4 mr-1" />
                              Seleccionar Archivo
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <Badge className="bg-green-100 text-green-800 flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            Cargado
                          </Badge>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alerta de documentos obligatorios */}
          <div className="mt-4 flex items-start p-4 border border-yellow-200 bg-yellow-50 rounded-md">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-700">
                <strong>Importante:</strong> Los documentos marcados con <span className="text-red-500">*</span> son
                obligatorios. La falta de presentación de estos documentos será motivo de rechazo de la oferta.
              </p>
            </div>
          </div>
        </div>

        {/* Documentación Adicional */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Documentación Adicional</h2>
              <p className="text-sm text-gray-500 mt-1">
                Adjunte cualquier documentación adicional que considere relevante para su oferta.
              </p>
            </div>
            <input
              type="file"
              ref={fileInputAdicionalesRef}
              onChange={handleFileAdicionalesChange}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
            <Button
              variant="outline"
              onClick={() => fileInputAdicionalesRef.current?.click()}
              className="flex items-center"
            >
              <Upload className="mr-2 h-4 w-4" />
              Seleccionar Archivos
            </Button>
          </div>

          {/* Archivos adicionales seleccionados */}
          {archivosAdicionalesSeleccionados.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Archivos seleccionados:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-md">
                {archivosAdicionalesSeleccionados.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="truncate max-w-[300px]">{file.name}</span>
                      <span className="text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSelectedAdicional(index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Button type="button" onClick={handleUploadAdicionales} className="mt-2" size="sm">
                <Upload className="h-4 w-4 mr-1" />
                Subir {archivosAdicionalesSeleccionados.length} archivo(s)
              </Button>
            </div>
          )}

          {/* Lista de documentos adicionales */}
          {documentosAdicionales.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Nombre del Documento</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Tipo</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Tamaño</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Fecha de Carga</th>
                    <th className="py-3 px-4 text-center text-gray-600 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {documentosAdicionales.map((doc) => (
                    <tr key={doc.id} className="border-b border-gray-200">
                      <td className="py-4 px-4">{doc.nombre}</td>
                      <td className="py-4 px-4">{doc.tipo}</td>
                      <td className="py-4 px-4">{doc.tamano}</td>
                      <td className="py-4 px-4">{doc.fechaCarga}</td>
                      <td className="py-4 px-4 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocumentoAdicional(doc.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
              <p>No hay documentos adicionales cargados</p>
              <p className="text-sm mt-1">Seleccione archivos para adjuntar a su oferta</p>
            </div>
          )}
        </div>

        {/* Observaciones */}
        <div>
          <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">
            Observaciones
          </label>
          <Textarea
            id="observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Ingrese cualquier información adicional relevante para la licitación..."
            rows={5}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">
            Guardar como borrador
          </Button>
          <Button type="submit" className="bg-black hover:bg-gray-800">
            Presentar Oferta
          </Button>
        </div>
      </form>
    </div>
  )
}
