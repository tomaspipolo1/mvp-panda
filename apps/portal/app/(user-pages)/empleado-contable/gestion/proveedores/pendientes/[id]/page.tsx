"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Phone,
  Calendar,
  FileCheck,
  Clock,
  Landmark,
  Receipt,
  UserCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo para el proveedor
const proveedoresData = {
  1: {
    id: 1,
    razonSocial: "Servicios Marítimos del Sur",
    cuit: "30-87654321-2",
    tipoProveedor: "Servicios",
    estado: "Pendiente",
    fechaSolicitud: "15/04/2023",
    fechaCreacion: "14/04/2023",
    // Información de contacto
    nombreContacto: "María González",
    cargoContacto: "Gerente Comercial",
    email: "contacto@maritimosur.com",
    telefono: "+54 11 4567-8901",
    direccion: "Av. del Puerto 1234, Buenos Aires",
    codigoPostal: "C1104AAD",
    provincia: "Buenos Aires",
    pais: "Argentina",
    sitioWeb: "www.maritimosur.com",
    // Información bancaria
    banco: "Banco Nación",
    tipoCuenta: "Corriente",
    numeroCuenta: "0012345678",
    titular: "Servicios Marítimos del Sur",
    cbu: "0110012301234567890123",
    // Información fiscal
    regimenFiscal: "General",
    condicionIVA: "Responsable Inscripto",
    ingresosBrutos: "901-234567-8",
    inicioActividades: "01/01/2010",
    // Representante legal
    representanteLegal: "María González",
    dniRepresentante: "25.678.901",
    descripcion:
      "Empresa especializada en servicios de mantenimiento para embarcaciones y equipamiento portuario con más de 15 años de experiencia en el sector marítimo.",
    documentos: [
      { id: 1, nombre: "Estatuto Social", tipo: "PDF", fechaCarga: "14/04/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia de CUIT", tipo: "PDF", fechaCarga: "14/04/2023", estado: "Verificado" },
      { id: 3, nombre: "Certificado Fiscal", tipo: "PDF", fechaCarga: "14/04/2023", estado: "Pendiente" },
      { id: 4, nombre: "Referencias Comerciales", tipo: "PDF", fechaCarga: "14/04/2023", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "14/04/2023 09:15", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "14/04/2023 10:30", accion: "Carga de documentación", usuario: "María González" },
      { id: 3, fecha: "15/04/2023 08:45", accion: "Solicitud de alta enviada", usuario: "María González" },
    ],
  },
  2: {
    id: 2,
    razonSocial: "Importadora Atlántica",
    cuit: "30-76543210-3",
    tipoProveedor: "Comercio",
    estado: "Pendiente",
    fechaSolicitud: "22/03/2023",
    fechaCreacion: "20/03/2023",
    // Información de contacto
    nombreContacto: "Carlos Rodríguez",
    cargoContacto: "Director Comercial",
    email: "info@importadoraatlantica.com",
    telefono: "+54 11 5678-9012",
    direccion: "Calle Comercio 567, Mar del Plata",
    codigoPostal: "B7600GUF",
    provincia: "Buenos Aires",
    pais: "Argentina",
    sitioWeb: "www.importadoraatlantica.com",
    // Información bancaria
    banco: "Banco Provincia",
    tipoCuenta: "Corriente",
    numeroCuenta: "0023456789",
    titular: "Importadora Atlántica",
    cbu: "0140023401234567890123",
    // Información fiscal
    regimenFiscal: "General",
    condicionIVA: "Responsable Inscripto",
    ingresosBrutos: "902-345678-9",
    inicioActividades: "15/05/2012",
    // Representante legal
    representanteLegal: "Carlos Rodríguez",
    dniRepresentante: "20.123.456",
    descripcion:
      "Empresa dedicada a la importación de productos y equipamiento para la industria naval y portuaria. Especialistas en repuestos y accesorios para embarcaciones.",
    documentos: [
      { id: 1, nombre: "Estatuto Social", tipo: "PDF", fechaCarga: "20/03/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia de CUIT", tipo: "PDF", fechaCarga: "20/03/2023", estado: "Verificado" },
      { id: 3, nombre: "Certificado Fiscal", tipo: "PDF", fechaCarga: "21/03/2023", estado: "Pendiente" },
      { id: 4, nombre: "Referencias Comerciales", tipo: "PDF", fechaCarga: "21/03/2023", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "20/03/2023 14:20", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "21/03/2023 09:45", accion: "Carga de documentación", usuario: "Carlos Rodríguez" },
      { id: 3, fecha: "22/03/2023 11:30", accion: "Solicitud de alta enviada", usuario: "Carlos Rodríguez" },
    ],
  },
  3: {
    id: 3,
    razonSocial: "Astilleros Patagónicos",
    cuit: "30-65432109-4",
    tipoProveedor: "Industria Naval",
    estado: "Pendiente",
    fechaSolicitud: "05/04/2023",
    fechaCreacion: "03/04/2023",
    // Información de contacto
    nombreContacto: "Roberto Martínez",
    cargoContacto: "Gerente General",
    email: "contacto@astillerospatagonicos.com",
    telefono: "+54 11 6789-0123",
    direccion: "Ruta Costera 789, Puerto Madryn",
    codigoPostal: "U9120ACD",
    provincia: "Chubut",
    pais: "Argentina",
    sitioWeb: "www.astillerospatagonicos.com",
    // Información bancaria
    banco: "Banco Patagonia",
    tipoCuenta: "Corriente",
    numeroCuenta: "0034567890",
    titular: "Astilleros Patagónicos",
    cbu: "0340034501234567890123",
    // Información fiscal
    regimenFiscal: "General",
    condicionIVA: "Responsable Inscripto",
    ingresosBrutos: "903-456789-0",
    inicioActividades: "10/10/2008",
    // Representante legal
    representanteLegal: "Roberto Martínez",
    dniRepresentante: "18.765.432",
    descripcion:
      "Empresa especializada en construcción y reparación de embarcaciones de mediano y gran porte. Contamos con instalaciones de última generación y personal altamente calificado.",
    documentos: [
      { id: 1, nombre: "Estatuto Social", tipo: "PDF", fechaCarga: "03/04/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia de CUIT", tipo: "PDF", fechaCarga: "03/04/2023", estado: "Verificado" },
      { id: 3, nombre: "Certificado Fiscal", tipo: "PDF", fechaCarga: "04/04/2023", estado: "Verificado" },
      { id: 4, nombre: "Referencias Comerciales", tipo: "PDF", fechaCarga: "04/04/2023", estado: "Verificado" },
      { id: 5, nombre: "Certificaciones ISO", tipo: "PDF", fechaCarga: "04/04/2023", estado: "Pendiente" },
    ],
    historial: [
      { id: 1, fecha: "03/04/2023 10:15", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "04/04/2023 11:30", accion: "Carga de documentación", usuario: "Roberto Martínez" },
      { id: 3, fecha: "05/04/2023 09:00", accion: "Solicitud de alta enviada", usuario: "Roberto Martínez" },
    ],
  },
  4: {
    id: 4,
    razonSocial: "Logística Austral",
    cuit: "30-54321098-5",
    tipoProveedor: "Logística",
    estado: "Pendiente",
    fechaSolicitud: "10/01/2023",
    fechaCreacion: "08/01/2023",
    // Información de contacto
    nombreContacto: "Laura Fernández",
    cargoContacto: "Directora de Operaciones",
    email: "info@logisticaaustral.com",
    telefono: "+54 11 7890-1234",
    direccion: "Av. Portuaria 456, Ushuaia",
    codigoPostal: "V9410ZXC",
    provincia: "Tierra del Fuego",
    pais: "Argentina",
    sitioWeb: "www.logisticaaustral.com",
    // Información bancaria
    banco: "Banco Galicia",
    tipoCuenta: "Corriente",
    numeroCuenta: "0045678901",
    titular: "Logística Austral",
    cbu: "0070045601234567890123",
    // Información fiscal
    regimenFiscal: "General",
    condicionIVA: "Responsable Inscripto",
    ingresosBrutos: "904-567890-1",
    inicioActividades: "05/03/2015",
    // Representante legal
    representanteLegal: "Laura Fernández",
    dniRepresentante: "22.345.678",
    descripcion:
      "Empresa dedicada al transporte marítimo de cargas y logística portuaria. Operamos en toda la región austral con una flota moderna y eficiente.",
    documentos: [
      { id: 1, nombre: "Estatuto Social", tipo: "PDF", fechaCarga: "08/01/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia de CUIT", tipo: "PDF", fechaCarga: "08/01/2023", estado: "Verificado" },
      { id: 3, nombre: "Certificado Fiscal", tipo: "PDF", fechaCarga: "09/01/2023", estado: "Pendiente" },
      { id: 4, nombre: "Permisos de Navegación", tipo: "PDF", fechaCarga: "09/01/2023", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "08/01/2023 15:45", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "09/01/2023 10:20", accion: "Carga de documentación", usuario: "Laura Fernández" },
      { id: 3, fecha: "10/01/2023 08:30", accion: "Solicitud de alta enviada", usuario: "Laura Fernández" },
    ],
  },
  5: {
    id: 5,
    razonSocial: "Suministros Portuarios",
    cuit: "30-43210987-6",
    tipoProveedor: "Materiales",
    estado: "Pendiente",
    fechaSolicitud: "01/04/2023",
    fechaCreacion: "30/03/2023",
    // Información de contacto
    nombreContacto: "Javier López",
    cargoContacto: "Gerente de Ventas",
    email: "ventas@suministrosportuarios.com",
    telefono: "+54 11 8901-2345",
    direccion: "Calle Industrial 789, La Plata",
    codigoPostal: "B1900TYU",
    provincia: "Buenos Aires",
    pais: "Argentina",
    sitioWeb: "www.suministrosportuarios.com",
    // Información bancaria
    banco: "Banco Santander",
    tipoCuenta: "Corriente",
    numeroCuenta: "0056789012",
    titular: "Suministros Portuarios",
    cbu: "0720056701234567890123",
    // Información fiscal
    regimenFiscal: "General",
    condicionIVA: "Responsable Inscripto",
    ingresosBrutos: "905-678901-2",
    inicioActividades: "20/07/2011",
    // Representante legal
    representanteLegal: "Javier López",
    dniRepresentante: "24.567.890",
    descripcion:
      "Empresa proveedora de equipamiento y suministros para puertos y terminales. Ofrecemos soluciones integrales para la operación portuaria.",
    documentos: [
      { id: 1, nombre: "Estatuto Social", tipo: "PDF", fechaCarga: "30/03/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia de CUIT", tipo: "PDF", fechaCarga: "30/03/2023", estado: "Verificado" },
      { id: 3, nombre: "Certificado Fiscal", tipo: "PDF", fechaCarga: "31/03/2023", estado: "Pendiente" },
      { id: 4, nombre: "Catálogo de Productos", tipo: "PDF", fechaCarga: "31/03/2023", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "30/03/2023 11:30", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "31/03/2023 09:15", accion: "Carga de documentación", usuario: "Javier López" },
      { id: 3, fecha: "01/04/2023 10:45", accion: "Solicitud de alta enviada", usuario: "Javier López" },
    ],
  },
}

export default function DetalleProveedorPendientePage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const router = useRouter()
  const { toast } = useToast()
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [approveComment, setApproveComment] = useState("")
  const [rejectReason, setRejectReason] = useState("")

  // Obtener datos del proveedor según el ID
  const proveedor = proveedoresData[id as keyof typeof proveedoresData]

  // Si no existe el proveedor, mostrar mensaje de error
  if (!proveedor) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Proveedor no encontrado</h1>
          <p className="text-gray-500">El proveedor que estás buscando no existe o ha sido eliminado.</p>
          <Button onClick={() => router.back()}>Volver</Button>
        </div>
      </div>
    )
  }

  // Función para aprobar proveedor
  const handleApproveProveedor = () => {
    console.log(`Aprobando proveedor ${proveedor.id} con comentario: ${approveComment}`)
    setIsApproveModalOpen(false)

    toast({
      title: "Proveedor aprobado",
      description: `${proveedor.razonSocial} ha sido aprobado exitosamente.`,
      duration: 3000,
    })

    // Redirigir a la lista de proveedores pendientes
    setTimeout(() => {
      router.push("/empleado-contable/gestion/proveedores/pendientes")
    }, 1500)
  }

  // Función para rechazar proveedor
  const handleRejectProveedor = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Error",
        description: "Debe proporcionar un motivo para el rechazo.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    console.log(`Rechazando proveedor ${proveedor.id} con motivo: ${rejectReason}`)
    setIsRejectModalOpen(false)

    toast({
      title: "Proveedor rechazado",
      description: `${proveedor.razonSocial} ha sido rechazado.`,
      duration: 3000,
    })

    // Redirigir a la lista de proveedores pendientes
    setTimeout(() => {
      router.push("/empleado-contable/gestion/proveedores/pendientes")
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Detalle del Proveedor Pendiente</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información general */}
        <div className="lg:col-span-2 space-y-6">
          {/* Datos Generales */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-gray-500" />
                  <CardTitle className="text-xl">Datos Generales</CardTitle>
                </div>
                <Badge
                  variant="outline"
                  className={
                    proveedor.estado === "Activo"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {proveedor.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Razón Social</h3>
                  <p className="mt-1">{proveedor.razonSocial}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">CUIT/CUIL</h3>
                  <p className="mt-1">{proveedor.cuit}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tipo de Proveedor</h3>
                  <p className="mt-1">{proveedor.tipoProveedor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                  <p className="mt-1">{proveedor.estado}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha de Solicitud</h3>
                  <p className="mt-1">{proveedor.fechaSolicitud}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha de Creación</h3>
                  <p className="mt-1">{proveedor.fechaCreacion}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Descripción</h3>
                <p className="text-sm text-gray-700">{proveedor.descripcion}</p>
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-lg">Información de Contacto</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nombre de Contacto</h3>
                  <p className="mt-1">{proveedor.nombreContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cargo</h3>
                  <p className="mt-1">{proveedor.cargoContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{proveedor.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                  <p className="mt-1">{proveedor.telefono}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
                  <p className="mt-1">{proveedor.direccion}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Código Postal</h3>
                  <p className="mt-1">{proveedor.codigoPostal}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Provincia</h3>
                  <p className="mt-1">{proveedor.provincia}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">País</h3>
                  <p className="mt-1">{proveedor.pais}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Sitio Web</h3>
                  <p className="mt-1">{proveedor.sitioWeb}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Bancaria */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-lg">Información Bancaria</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Banco</h3>
                  <p className="mt-1">{proveedor.banco}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tipo de Cuenta</h3>
                  <p className="mt-1">{proveedor.tipoCuenta}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Número de Cuenta</h3>
                  <p className="mt-1">{proveedor.numeroCuenta}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Titular</h3>
                  <p className="mt-1">{proveedor.titular}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">CBU</h3>
                  <p className="mt-1">{proveedor.cbu}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Fiscal */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-lg">Información Fiscal</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Régimen Fiscal</h3>
                  <p className="mt-1">{proveedor.regimenFiscal}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Condición IVA</h3>
                  <p className="mt-1">{proveedor.condicionIVA}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Ingresos Brutos</h3>
                  <p className="mt-1">{proveedor.ingresosBrutos}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Inicio de Actividades</h3>
                  <p className="mt-1">{proveedor.inicioActividades}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="documentos">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="documentos">Documentación</TabsTrigger>
              <TabsTrigger value="historial">Historial</TabsTrigger>
            </TabsList>

            <TabsContent value="documentos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documentación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left font-medium">Documento</th>
                          <th className="py-3 px-4 text-left font-medium">Tipo</th>
                          <th className="py-3 px-4 text-left font-medium">Fecha de Carga</th>
                          <th className="py-3 px-4 text-left font-medium">Estado</th>
                          <th className="py-3 px-4 text-center font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proveedor.documentos.map((doc) => (
                          <tr key={doc.id} className="border-b">
                            <td className="py-3 px-4">{doc.nombre}</td>
                            <td className="py-3 px-4">{doc.tipo}</td>
                            <td className="py-3 px-4">{doc.fechaCarga}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className={
                                  doc.estado === "Verificado"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                }
                              >
                                {doc.estado}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Button variant="ghost" size="sm" className="h-8 w-8">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Historial de Actividad</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proveedor.historial.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                        <div className="bg-gray-100 rounded-full p-2">
                          {item.accion.includes("Registro") ? (
                            <Calendar className="h-5 w-5 text-gray-500" />
                          ) : item.accion.includes("Carga") ? (
                            <FileCheck className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.accion}</h4>
                            <span className="text-sm text-gray-500">{item.fecha}</span>
                          </div>
                          <p className="text-sm text-gray-600">Usuario: {item.usuario}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Columna derecha - Acciones y resumen */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setIsApproveModalOpen(true)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Aprobar Proveedor
              </Button>

              <Button variant="destructive" className="w-full" onClick={() => setIsRejectModalOpen(true)}>
                <XCircle className="h-4 w-4 mr-2" />
                Rechazar Proveedor
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen de Documentación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Documentos Cargados</span>
                  <span className="font-medium">{proveedor.documentos.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Documentos Verificados</span>
                  <span className="font-medium">
                    {proveedor.documentos.filter((doc) => doc.estado === "Verificado").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Documentos Pendientes</span>
                  <span className="font-medium">
                    {proveedor.documentos.filter((doc) => doc.estado === "Pendiente").length}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between items-center font-medium">
                  <span>Estado de Verificación</span>
                  <Badge
                    variant="outline"
                    className={
                      proveedor.documentos.every((doc) => doc.estado === "Verificado")
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {proveedor.documentos.every((doc) => doc.estado === "Verificado") ? "Completo" : "Incompleto"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información Adicional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Días desde solicitud</span>
                  <span className="font-medium">
                    {Math.floor(Math.random() * 10) + 1} {/* Simulación */}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Prioridad</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Normal
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Asignado a</span>
                  <span className="font-medium">Departamento Contable</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal para aprobar proveedor */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aprobar Proveedor</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea aprobar a este proveedor? Esta acción permitirá que el proveedor opere en el
              sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="font-medium">{proveedor.razonSocial}</div>
              <div className="text-sm text-gray-500">CUIT: {proveedor.cuit}</div>
              <div className="text-sm text-gray-500">Tipo: {proveedor.tipoProveedor}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="approveComment">Comentarios (opcional)</Label>
              <Textarea
                id="approveComment"
                placeholder="Agregue comentarios adicionales sobre la aprobación..."
                value={approveComment}
                onChange={(e) => setApproveComment(e.target.value)}
              />
            </div>

            <DialogFooter className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleApproveProveedor}>
                Confirmar Aprobación
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para rechazar proveedor */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rechazar Proveedor</DialogTitle>
            <DialogDescription>
              Por favor, indique el motivo por el cual está rechazando a este proveedor.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="font-medium">{proveedor.razonSocial}</div>
              <div className="text-sm text-gray-500">CUIT: {proveedor.cuit}</div>
              <div className="text-sm text-gray-500">Tipo: {proveedor.tipoProveedor}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rejectReason">
                Motivo del rechazo <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="rejectReason"
                placeholder="Indique el motivo del rechazo..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className={!rejectReason.trim() ? "border-red-300 focus-visible:ring-red-500" : ""}
              />
              {!rejectReason.trim() && <p className="text-sm text-red-500">El motivo del rechazo es obligatorio</p>}
            </div>

            <DialogFooter className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleRejectProveedor}>
                Confirmar Rechazo
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
