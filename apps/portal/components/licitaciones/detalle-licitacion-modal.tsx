"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DetalleLicitacionProps {
  isOpen: boolean
  onClose: () => void
  licitacion: {
    id: string
    numero: string
    titulo: string
    organismo: string
    apertura: string
    cierre: string
    montoEstimado: number
    estado: string
    resultado: string | null
    detalles?: {
      descripcion: string
      requisitos: string[]
      documentos: Array<{
        nombre: string
        tipo: string
        fechaSubida: string
        tamano: string
      }>
      consultas: Array<{
        fecha: string
        pregunta: string
        respuesta: string | null
      }>
      historial: Array<{
        fecha: string
        accion: string
        usuario: string
        comentario: string | null
      }>
    }
  } | null
}

export function DetalleLicitacionModal({ isOpen, onClose, licitacion }: DetalleLicitacionProps) {
  if (!licitacion) return null

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    })
      .format(value)
      .replace("ARS", "$")
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Publicada":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Publicada</Badge>
      case "En Evaluación":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">En Evaluación</Badge>
      case "Adjudicada":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Adjudicada</Badge>
      case "Finalizada":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Finalizada</Badge>
      case "Cancelada":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <span>
                Licitación {licitacion.numero} - {licitacion.titulo}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Organismo</p>
              <p className="font-medium">{licitacion.organismo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <div>{getEstadoBadge(licitacion.estado)}</div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de Apertura</p>
              <p className="font-medium">{licitacion.apertura}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de Cierre</p>
              <p className="font-medium">{licitacion.cierre}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monto Estimado</p>
              <p className="font-medium">{formatCurrency(licitacion.montoEstimado)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Resultado</p>
              <p className="font-medium">
                {licitacion.resultado ? (
                  licitacion.resultado === "Ganada" ? (
                    <span className="text-green-600">Ganada</span>
                  ) : (
                    licitacion.resultado
                  )
                ) : (
                  "-"
                )}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          {licitacion.detalles && (
            <Tabs defaultValue="descripcion">
              <TabsList className="mb-4">
                <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
                <TabsTrigger value="consultas">Consultas</TabsTrigger>
                <TabsTrigger value="historial">Historial</TabsTrigger>
              </TabsList>

              <TabsContent value="descripcion">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Descripción</h3>
                    <p className="text-gray-700">{licitacion.detalles.descripcion}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Requisitos</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {licitacion.detalles.requisitos.map((requisito, index) => (
                        <li key={index} className="text-gray-700">
                          {requisito}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documentos">
                <div className="space-y-4">
                  <h3 className="font-semibold mb-2">Documentos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Nombre</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tipo</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha de Subida</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tamaño</th>
                          <th className="py-2 px-4 text-center text-sm font-medium text-gray-600">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {licitacion.detalles.documentos.map((documento, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="py-2 px-4 text-sm">{documento.nombre}</td>
                            <td className="py-2 px-4 text-sm">{documento.tipo}</td>
                            <td className="py-2 px-4 text-sm">{documento.fechaSubida}</td>
                            <td className="py-2 px-4 text-sm">{documento.tamano}</td>
                            <td className="py-2 px-4 text-sm text-center">
                              <Button variant="ghost" size="sm" className="text-plp-dark hover:text-plp-medium">
                                <Download className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="consultas">
                <div className="space-y-4">
                  <h3 className="font-semibold mb-2">Consultas</h3>
                  {licitacion.detalles.consultas.map((consulta, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <p className="text-sm text-gray-500">Fecha: {consulta.fecha}</p>
                      </div>
                      <p className="font-medium mb-2">Pregunta:</p>
                      <p className="text-gray-700 mb-4">{consulta.pregunta}</p>
                      <p className="font-medium mb-2">Respuesta:</p>
                      <p className="text-gray-700">
                        {consulta.respuesta ? consulta.respuesta : "Pendiente de respuesta"}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="historial">
                <div className="space-y-4">
                  <h3 className="font-semibold mb-2">Historial</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Acción</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Usuario</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Comentario</th>
                        </tr>
                      </thead>
                      <tbody>
                        {licitacion.detalles.historial.map((evento, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="py-2 px-4 text-sm">{evento.fecha}</td>
                            <td className="py-2 px-4 text-sm">{evento.accion}</td>
                            <td className="py-2 px-4 text-sm">{evento.usuario}</td>
                            <td className="py-2 px-4 text-sm">{evento.comentario || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
