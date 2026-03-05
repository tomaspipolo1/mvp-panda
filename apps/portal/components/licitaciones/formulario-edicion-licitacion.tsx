"use client"

import { useState } from "react"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

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
}

interface FormularioEdicionLicitacionProps {
  licitacion: {
    id: string
    numero: string
    expediente: string
    titulo: string
    montoEstimado: number
    fechaApertura: string
    documentos: DocumentoLicitacion[]
    documentosRequeridos: DocumentoRequerido[]
    montoOfertado?: string
    fechaPresentacion?: string
    observaciones?: string
    entidad?: string
  }
}

export function FormularioEdicionLicitacion({ licitacion }: FormularioEdicionLicitacionProps) {
  const [documentosSeleccionados, setDocumentosSeleccionados] = useState<{ [key: string]: File | null }>({})
  const [cargando, setCargando] = useState<{ [key: string]: boolean }>({})
  const { toast } = useToast()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const handleFileChange = (documentoId: string, file: File | null) => {
    setDocumentosSeleccionados((prev) => ({
      ...prev,
      [documentoId]: file,
    }))
  }

  const handleSubirDocumento = async (documentoId: string) => {
    const file = documentosSeleccionados[documentoId]
    if (!file) return

    setCargando((prev) => ({ ...prev, [documentoId]: true }))

    // Simulamos la carga del archivo
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulamos una respuesta exitosa
    toast({
      title: "Documento cargado",
      description: `El documento ${file.name} ha sido cargado correctamente.`,
    })

    // Actualizamos el estado del documento
    setCargando((prev) => ({ ...prev, [documentoId]: false }))
    setDocumentosSeleccionados((prev) => ({ ...prev, [documentoId]: null }))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Link href="/proveedor/gestion/licitaciones/mis-licitaciones" className="flex items-center text-plp-dark mr-4">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold text-plp-darkest">Editar Inscripción a Licitación</h1>
      </div>

      <div className="space-y-8">
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
            <Input
              id="entidad"
              value={licitacion.entidad || "Consorcio de Gestión del Puerto La Plata"}
              readOnly
              className="bg-gray-50"
            />
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
              value={licitacion.montoOfertado || ""}
              readOnly
              className="bg-gray-50"
              placeholder="$0.00"
            />
          </div>

          {/* Fecha de Presentación */}
          <div>
            <label htmlFor="fechaPresentacion" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Presentación
            </label>
            <Input
              id="fechaPresentacion"
              value={licitacion.fechaPresentacion || ""}
              readOnly
              className="bg-gray-50"
              placeholder="dd/mm/aaaa"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{documento.nombre}</p>
                    <p className="text-sm text-gray-500">{documento.tipo}</p>
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
            <h2 className="text-xl font-bold">Documentación Requerida</h2>
            <div className="text-sm text-amber-600 font-medium">
              Suba los documentos faltantes para completar su inscripción
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
                    <td className="py-4 px-4">{documento.tipo}</td>
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
                    <td className="py-4 px-4 text-center">
                      {documento.estado === "Pendiente" ? (
                        <div className="flex items-center justify-center space-x-2">
                          <input
                            type="file"
                            id={`file-${documento.id}`}
                            className="hidden"
                            onChange={(e) => handleFileChange(documento.id, e.target.files?.[0] || null)}
                          />
                          <label
                            htmlFor={`file-${documento.id}`}
                            className="cursor-pointer px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            Seleccionar archivo
                          </label>
                          {documentosSeleccionados[documento.id] && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSubirDocumento(documento.id)}
                              disabled={cargando[documento.id]}
                              className="flex items-center"
                            >
                              {cargando[documento.id] ? (
                                <span className="animate-pulse">Subiendo...</span>
                              ) : (
                                <>
                                  <Upload className="h-4 w-4 mr-1" />
                                  Subir
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="flex items-center mx-auto">
                          Ver documento
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Información sobre documentos seleccionados */}
          <div className="mt-4">
            {Object.entries(documentosSeleccionados).map(
              ([docId, file]) =>
                file && (
                  <div key={docId} className="text-sm text-gray-600 mb-1">
                    Seleccionado: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </div>
                ),
            )}
          </div>
        </div>

        {/* Observaciones */}
        <div>
          <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">
            Observaciones
          </label>
          <Textarea
            id="observaciones"
            value={licitacion.observaciones || ""}
            readOnly
            className="bg-gray-50"
            rows={5}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4">
          <Link href="/proveedor/gestion/licitaciones/mis-licitaciones">
            <Button variant="outline" type="button">
              Volver
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
