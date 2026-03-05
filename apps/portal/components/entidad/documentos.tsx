"use client"

import { FileText, Pencil } from "lucide-react"
import { ExpandablePanel } from "@/components/expandable-panel"
import { Button } from "@/components/ui/button"

interface Documento {
  nombre: string
  tipo: string
  tamano: string
  fechaActualizacion: string
  fechaVencimiento?: string // Agregamos la fecha de vencimiento como opcional
}

interface DocumentosProps {
  documentos: Documento[]
  onUpload?: () => void
  onView?: (documento: Documento) => void
  onEdit?: (documento: Documento) => void
}

export function Documentos({ documentos, onUpload, onView, onEdit }: DocumentosProps) {
  // Preview content - shown when panel is not expanded
  const previewContent =
    documentos.length > 0 ? (
      <div className="pt-4">
        <div className="p-4 border border-gray-200 rounded-md flex items-center justify-between">
          <div className="flex items-start">
            <FileText className="h-5 w-5 mr-3 text-gray-400 mt-1" />
            <div>
              <p className="font-medium text-plp-darkest">{documentos[0].nombre}</p>
              <p className="text-sm text-gray-500">
                {documentos[0].tipo} - {documentos[0].tamano} - Actualizado: {documentos[0].fechaActualizacion}
                {documentos[0].fechaVencimiento && ` - Vence: ${documentos[0].fechaVencimiento}`}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit && onEdit(documentos[0])}
              className="text-gray-500 hover:text-plp-dark"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onView && onView(documentos[0])}>
              Ver
            </Button>
          </div>
        </div>
      </div>
    ) : null

  return (
    <ExpandablePanel
      icon={<FileText size={24} />}
      title="Documentos"
      actionButton="upload"
      onActionClick={onUpload}
      previewContent={previewContent}
    >
      <div className="space-y-4">
        {documentos.map((documento, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-md flex items-center justify-between">
            <div className="flex items-start">
              <FileText className="h-5 w-5 mr-3 text-gray-400 mt-1" />
              <div>
                <p className="font-medium text-plp-darkest">{documento.nombre}</p>
                <p className="text-sm text-gray-500">
                  {documento.tipo} - {documento.tamano} - Actualizado: {documento.fechaActualizacion}
                  {documento.fechaVencimiento && ` - Vence: ${documento.fechaVencimiento}`}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit && onEdit(documento)}
                className="text-gray-500 hover:text-plp-dark"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onView && onView(documento)}>
                Ver
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ExpandablePanel>
  )
}
