"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, MessageSquarePlus, CheckCircle, AlertCircle } from "lucide-react"
import { PedirInformacionModal } from "./pedir-informacion-modal"

interface Oferta {
  id: string
  proveedor: string
  fechaPresentacion: string
  montoOferta: number
  documentos: {
    nombre: string
    tipo: string
    fechaSubida: string
    url: string
  }[]
  estado: "pendiente" | "completa" | "requiere_info"
  informacionAdicional?: string
}

interface VerOfertasModalProps {
  isOpen: boolean
  onClose: () => void
  licitacionId: string
  licitacionTitulo: string
  estado: string
}

export function VerOfertasModal({ isOpen, onClose, licitacionId, licitacionTitulo, estado }: VerOfertasModalProps) {
  const [ofertas, setOfertas] = useState<Oferta[]>([
    {
      id: "1",
      proveedor: "Constructora ABC S.A.",
      fechaPresentacion: "15/04/2025",
      montoOferta: 1250000,
      documentos: [
        { nombre: "Pliego", tipo: "PDF", fechaSubida: "15/04/2025", url: "#" },
        { nombre: "Garantía de oferta", tipo: "PDF", fechaSubida: "15/04/2025", url: "#" },
        { nombre: "Certificado de visita", tipo: "PDF", fechaSubida: "15/04/2025", url: "#" },
      ],
      estado: "completa",
    },
    {
      id: "2",
      proveedor: "Servicios Portuarios XYZ",
      fechaPresentacion: "14/04/2025",
      montoOferta: 1320000,
      documentos: [
        { nombre: "Pliego", tipo: "PDF", fechaSubida: "14/04/2025", url: "#" },
        { nombre: "Garantía de oferta", tipo: "PDF", fechaSubida: "14/04/2025", url: "#" },
      ],
      estado: "requiere_info",
      informacionAdicional: "Se solicitó certificado de visita obligatorio",
    },
    {
      id: "3",
      proveedor: "Ingeniería Marítima S.R.L.",
      fechaPresentacion: "13/04/2025",
      montoOferta: 1180000,
      documentos: [
        { nombre: "Pliego", tipo: "PDF", fechaSubida: "13/04/2025", url: "#" },
        { nombre: "Garantía de oferta", tipo: "PDF", fechaSubida: "13/04/2025", url: "#" },
        { nombre: "Certificado de visita", tipo: "PDF", fechaSubida: "13/04/2025", url: "#" },
      ],
      estado: "pendiente",
    },
  ])

  const [pedirInfoModalOpen, setPedirInfoModalOpen] = useState(false)
  const [selectedOferta, setSelectedOferta] = useState<Oferta | null>(null)

  const handlePedirInfo = (oferta: Oferta) => {
    setSelectedOferta(oferta)
    setPedirInfoModalOpen(true)
  }

  const handleInfoSolicitada = (ofertaId: string, mensaje: string) => {
    setOfertas(
      ofertas.map((oferta) =>
        oferta.id === ofertaId
          ? { ...oferta, estado: "requiere_info" as const, informacionAdicional: mensaje }
          : oferta,
      ),
    )
    setPedirInfoModalOpen(false)
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pendiente de revisión
          </Badge>
        )
      case "completa":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completa
          </Badge>
        )
      case "requiere_info":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Requiere información
          </Badge>
        )
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  const handleExportarDocumentos = (ofertaId: string) => {
    // En un caso real, aquí se implementaría la lógica para generar y descargar el ZIP
    console.log(`Exportando documentos de la oferta ${ofertaId} en formato ZIP`)
    // Simulamos la descarga
    alert(`Descargando todos los documentos de la oferta en formato ZIP`)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Ofertas para licitación: {licitacionTitulo}</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Total de ofertas: {ofertas.length}</h3>
                <p className="text-sm text-gray-500">Listado de ofertas presentadas para esta licitación</p>
              </div>
            </div>

            <div className="space-y-4">
              {ofertas.map((oferta) => (
                <Card key={oferta.id} className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{oferta.proveedor}</CardTitle>
                        <CardDescription>Presentada el {oferta.fechaPresentacion}</CardDescription>
                      </div>
                      {getEstadoBadge(oferta.estado)}
                    </div>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Monto ofertado</p>
                        <p className="text-lg font-semibold">${oferta.montoOferta.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Documentos</p>
                        <p className="text-lg font-semibold">{oferta.documentos.length}</p>
                      </div>
                    </div>

                    {oferta.informacionAdicional && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-md">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-700">Información adicional solicitada:</p>
                            <p className="text-sm text-blue-600">{oferta.informacionAdicional}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">Documentos presentados:</p>
                      <div className="space-y-2">
                        {oferta.documentos.map((doc, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span>{doc.nombre}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                              <Download className="h-4 w-4" />
                              <span>Descargar</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <Separator />

                  <CardFooter className="pt-3">
                    <div className="flex justify-end w-full gap-2">
                      <Button variant="outline" className="gap-1" onClick={() => handleExportarDocumentos(oferta.id)}>
                        <Download className="h-4 w-4" />
                        <span>Exportar documentos</span>
                      </Button>
                      <Button variant="outline" className="gap-1" onClick={() => handlePedirInfo(oferta)}>
                        <MessageSquarePlus className="h-4 w-4" />
                        <span>Solicitar información</span>
                      </Button>
                      <Button className="gap-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Ver detalles</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PedirInformacionModal
        isOpen={pedirInfoModalOpen}
        onClose={() => setPedirInfoModalOpen(false)}
        oferta={selectedOferta}
        onSubmit={handleInfoSolicitada}
      />
    </>
  )
}
