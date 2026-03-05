"use client"

import { useState } from "react"
import { FileText, PenLine, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

type Documento = {
  id: string
  nombre: string
  formato: string
  tamano: string
  actualizado: string
  vence?: string
}

export default function DocumentosCliente() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [currentDocumento, setCurrentDocumento] = useState<Documento | null>(null)
  const { toast } = useToast()

  const documentos: Documento[] = [
    {
      id: "1",
      nombre: "Constancia de CUIT",
      formato: "PDF",
      tamano: "245 KB",
      actualizado: "15/03/2023",
      vence: "15/03/2024",
    },
    {
      id: "2",
      nombre: "Certificado Bancario",
      formato: "PDF",
      tamano: "198 KB",
      actualizado: "10/02/2023",
      vence: "10/02/2024",
    },
    {
      id: "3",
      nombre: "Estatuto Social",
      formato: "PDF",
      tamano: "1.2 MB",
      actualizado: "05/01/2023",
    },
    {
      id: "4",
      nombre: "Poder del Representante Legal",
      formato: "PDF",
      tamano: "876 KB",
      actualizado: "20/12/2022",
      vence: "20/12/2023",
    },
  ]

  const handleEditDocumento = (documento: Documento) => {
    setCurrentDocumento(documento)
    setIsEditModalOpen(true)
  }

  const handleViewDocumento = (documento: Documento) => {
    setCurrentDocumento(documento)
    setIsViewModalOpen(true)
  }

  const handleSaveDocumento = () => {
    // Aquí iría la lógica para guardar los cambios
    setIsEditModalOpen(false)
    toast({
      title: "Documento actualizado",
      description: "La información del documento ha sido actualizada correctamente.",
    })
  }

  const handleUploadDocumento = () => {
    // Aquí ir��a la lógica para subir un nuevo documento
    setIsUploadModalOpen(false)
    toast({
      title: "Documento subido",
      description: "El documento ha sido subido correctamente.",
    })
  }

  return (
    <>
      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-700" />
            <h2 className="text-lg font-semibold">Documentos</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsUploadModalOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Subir
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Contraer" : "Expandir"}
              <svg
                className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <p className="font-medium">{documentos[0].nombre}</p>
                  <p className="text-sm text-gray-500">
                    {documentos[0].formato} - {documentos[0].tamano} - Actualizado: {documentos[0].actualizado}
                    {documentos[0].vence && ` - Vence: ${documentos[0].vence}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEditDocumento(documentos[0])}
                >
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleViewDocumento(documentos[0])}>
                  Ver
                </Button>
              </div>
            </div>
          </div>

          {isExpanded &&
            documentos.slice(1).map((documento) => (
              <div key={documento.id} className="border rounded-lg p-4 mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="font-medium">{documento.nombre}</p>
                      <p className="text-sm text-gray-500">
                        {documento.formato} - {documento.tamano} - Actualizado: {documento.actualizado}
                        {documento.vence && ` - Vence: ${documento.vence}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditDocumento(documento)}
                    >
                      <PenLine className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewDocumento(documento)}>
                      Ver
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal para Subir Documento */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Subir Nuevo Documento</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre-doc">Nombre del Documento</Label>
              <Input id="nombre-doc" placeholder="Ej: Constancia de CUIT" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="archivo">Archivo</Label>
              <Input id="archivo" type="file" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha-actualizacion">Fecha de Actualización</Label>
                <Input id="fecha-actualizacion" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha-vencimiento">Fecha de Vencimiento (opcional)</Label>
                <Input id="fecha-vencimiento" type="date" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUploadDocumento}>Subir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Editar Documento */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Documento</DialogTitle>
          </DialogHeader>
          {currentDocumento && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nombre-doc">Nombre del Documento</Label>
                <Input id="edit-nombre-doc" defaultValue={currentDocumento.nombre} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-fecha-actualizacion">Fecha de Actualización</Label>
                  <Input id="edit-fecha-actualizacion" defaultValue={currentDocumento.actualizado} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-fecha-vencimiento">Fecha de Vencimiento</Label>
                  <Input id="edit-fecha-vencimiento" defaultValue={currentDocumento.vence || ""} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveDocumento}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para Ver Documento */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{currentDocumento?.nombre}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-gray-100 rounded-lg p-4 text-center min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Vista previa del documento {currentDocumento?.nombre}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {currentDocumento?.formato} - {currentDocumento?.tamano}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Cerrar
            </Button>
            <Button>Descargar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
