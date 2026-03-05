"use client"

import { useState, use } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  User,
  FileText,
  Shield,
  CreditCard,
  Eye,
  Download,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Datos de ejemplo para las empresas del listado (mismo que en la página principal)
const empresasData = {
  1: {
    id: 1,
    razonSocial: "Servicios Portuarios del Sur S.A.",
    // Documentación Personal
    documentacionPersonal: [
      {
        id: "1",
        nombre: "Copia DNI",
        archivo: "dni-carlos-mendoza.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "2",
        nombre: "Certificado apoderado",
        archivo: "certificado-apoderado.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "3",
        nombre: "Declaración jurada copia fiel (del apoderado)",
        archivo: "declaracion-jurada.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      }
    ],
    // Documentación General
    documentacionGeneral: [
      {
        id: "4",
        nombre: "Régimen tributario ARCA",
        archivo: "constancia-arca-sur.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "5",
        nombre: "Régimen tributario ARBA",
        archivo: "constancia-arba-sur.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "6",
        nombre: "Convenio multilateral",
        archivo: "convenio-multilateral-sur.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "7",
        nombre: "Exenciones impositivas",
        archivo: "exenciones-impositivas-sur.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "8",
        nombre: "Sistema cuenta tributaria (Estado de cumplimiento)",
        archivo: "sistema-cuenta-tributaria.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "9",
        nombre: "Constancia inscripción Proveedor de Abordo / Constancia de DNA",
        archivo: "constancia-proveedor-abordo.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "10",
        nombre: "Certificado de Anotaciones Personales",
        archivo: "certificado-anotaciones.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "11",
        nombre: "Informe Juicio Universales",
        archivo: "informe-juicio-universales.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      }
    ],
    // Documentación de Seguros
    documentacionSeguros: [
      {
        id: "12",
        nombre: "ART Personal",
        archivo: "art-personal.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "13",
        nombre: "Responsable de Seguridad e Higiene, Matrícula y Alta ARCA o Contrato de trabajo",
        archivo: "responsable-seguridad.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      }
    ],
    // Documentación de Facturación
    documentacionFacturacion: [
      {
        id: "14",
        nombre: "Factura Inscripción",
        archivo: "factura-inscripcion.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "15",
        nombre: "Comprobante de Pago factura",
        archivo: "comprobante-pago.pdf",
        fechaEmision: "01/03/2023",
        fechaVencimiento: "01/03/2024",
        estado: "completado",
        requerido: true
      }
    ]
  },
  // Datos similares para otras empresas...
  2: {
    id: 2,
    razonSocial: "Transportes Marítimos Rápidos",
    documentacionPersonal: [
      {
        id: "1",
        nombre: "Copia DNI",
        archivo: "dni-ana-rodriguez.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "2",
        nombre: "Certificado apoderado",
        archivo: "certificado-apoderado-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "3",
        nombre: "Declaración jurada copia fiel (del apoderado)",
        archivo: "declaracion-jurada-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      }
    ],
    documentacionGeneral: [
      {
        id: "4",
        nombre: "Régimen tributario ARCA",
        archivo: "constancia-arca-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "5",
        nombre: "Régimen tributario ARBA",
        archivo: "constancia-arba-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "6",
        nombre: "Convenio multilateral",
        archivo: "convenio-multilateral-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "7",
        nombre: "Exenciones impositivas",
        archivo: "exenciones-impositivas-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "8",
        nombre: "Sistema cuenta tributaria (Estado de cumplimiento)",
        archivo: "sistema-cuenta-tributaria-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "9",
        nombre: "Constancia inscripción Proveedor de Abordo / Constancia de DNA",
        archivo: "constancia-proveedor-abordo-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "10",
        nombre: "Certificado de Anotaciones Personales",
        archivo: "certificado-anotaciones-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "11",
        nombre: "Informe Juicio Universales",
        archivo: "informe-juicio-universales-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      }
    ],
    documentacionSeguros: [
      {
        id: "12",
        nombre: "ART Personal",
        archivo: "art-personal-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "13",
        nombre: "Responsable de Seguridad e Higiene, Matrícula y Alta ARCA o Contrato de trabajo",
        archivo: "responsable-seguridad-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      }
    ],
    documentacionFacturacion: [
      {
        id: "14",
        nombre: "Factura Inscripción",
        archivo: "factura-inscripcion-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      },
      {
        id: "15",
        nombre: "Comprobante de Pago factura",
        archivo: "comprobante-pago-trans.pdf",
        fechaEmision: "01/01/2023",
        fechaVencimiento: "01/01/2024",
        estado: "completado",
        requerido: true
      }
    ]
  }
}

export default function DocumentacionEmpresaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = Number.parseInt(resolvedParams.id)
  const router = useRouter()
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<{ nombre: string; archivo: string } | null>(null)

  // Obtener datos de la empresa según el ID
  const empresa = empresasData[id as keyof typeof empresasData]

  // Si no existe la empresa, mostrar mensaje de error
  if (!empresa) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Empresa no encontrada</h1>
          <p className="text-gray-500">La empresa que estás buscando no existe o ha sido eliminada.</p>
          <Button onClick={() => router.back()}>Volver</Button>
        </div>
      </div>
    )
  }

  const handleVerDocumento = (nombre: string, archivo: string) => {
    setSelectedDocument({ nombre, archivo })
    setIsDocumentModalOpen(true)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Documentación de la Empresa</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{empresa.razonSocial}</h2>
        <p className="text-gray-600">Revisión de toda la documentación cargada</p>
      </div>

      <div className="space-y-8">
        {/* Documentación Personal */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg">Documentación Personal</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-1/3">Tipo de Documento</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-20">Estado</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Emisión</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Vencimiento</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {empresa.documentacionPersonal.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {doc.nombre} {doc.requerido && <span className="text-red-500">*</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge 
                          variant="outline" 
                          className={
                            doc.estado === "completado" ? "bg-green-100 text-green-800" :
                            doc.estado === "pendiente" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }
                        >
                          {doc.estado === "completado" ? "Completado" : 
                           doc.estado === "pendiente" ? "Pendiente" : "Rechazado"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-500">
                        {doc.fechaEmision}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-500">
                        {doc.fechaVencimiento}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerDocumento(doc.nombre, doc.archivo)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Documentación General */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg">Documentación General</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-1/3">Tipo de Documento</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-20">Estado</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Emisión</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Vencimiento</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {empresa.documentacionGeneral.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {doc.nombre} {doc.requerido && <span className="text-red-500">*</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge 
                          variant="outline" 
                          className={
                            doc.estado === "completado" ? "bg-green-100 text-green-800" :
                            doc.estado === "pendiente" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }
                        >
                          {doc.estado === "completado" ? "Completado" : 
                           doc.estado === "pendiente" ? "Pendiente" : "Rechazado"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-500">
                        {doc.fechaEmision}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-500">
                        {doc.fechaVencimiento}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerDocumento(doc.nombre, doc.archivo)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Documentación de Seguros */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg">Documentación de Seguros</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-1/3">Tipo de Documento</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-20">Estado</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Emisión</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha Vencimiento</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {empresa.documentacionSeguros.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {doc.nombre} {doc.requerido && <span className="text-red-500">*</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge 
                          variant="outline" 
                          className={
                            doc.estado === "completado" ? "bg-green-100 text-green-800" :
                            doc.estado === "pendiente" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }
                        >
                          {doc.estado === "completado" ? "Completado" : 
                           doc.estado === "pendiente" ? "Pendiente" : "Rechazado"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-500">
                        {doc.fechaEmision}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-500">
                        {doc.fechaVencimiento}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerDocumento(doc.nombre, doc.archivo)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Documentación de Facturación */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <CardTitle className="text-lg">Documentación de Facturación</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Los documentos marcados con * son obligatorios y su falta es motivo de rechazo.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-1/2">Tipo de Documento</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-20">Estado</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900 w-32">Fecha de Carga</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {empresa.documentacionFacturacion.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {doc.nombre} {doc.requerido && <span className="text-red-500">*</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge 
                          variant="outline" 
                          className={
                            doc.estado === "completado" ? "bg-green-100 text-green-800" :
                            doc.estado === "pendiente" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }
                        >
                          {doc.estado === "completado" ? "Completado" : 
                           doc.estado === "pendiente" ? "Pendiente" : "Rechazado"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-500">
                        {doc.fechaEmision}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerDocumento(doc.nombre, doc.archivo)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Descargar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal para ver documento */}
      <Dialog open={isDocumentModalOpen} onOpenChange={setIsDocumentModalOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Visualizar Documento</DialogTitle>
            <DialogDescription>
              Documento: {selectedDocument?.nombre}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium">{selectedDocument?.nombre}</div>
                  <div className="text-sm text-gray-500">Archivo: {selectedDocument?.archivo}</div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
              </div>
              
              <div className="bg-white border rounded-md p-4 min-h-[400px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Vista previa del documento</p>
                  <p className="text-sm">El documento se muestra aquí en formato PDF o imagen</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
