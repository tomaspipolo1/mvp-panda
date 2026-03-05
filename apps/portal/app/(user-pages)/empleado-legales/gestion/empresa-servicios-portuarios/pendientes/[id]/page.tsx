"use client"

import { useState, use } from "react"
import { useRouter, useParams } from "next/navigation"
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
  Building,
  MapPin,
  Users,
  Truck,
  Shield,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

// Datos de ejemplo para las empresas de servicios portuarios
const empresasData = {
  1: {
    id: 1,
    // Datos Generales
    naturalezaOrganizacion: "Sociedades legalmente constituida",
    tipoSocietario: "Cooperativa",
    razonSocial: "Tecnología Portuaria SA",
    cuitCuil: "30-76543210-9",
    nombreFantasia: "TecnoPuertos",
    ultimaActividad: "Empresa ya en actividad",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    categoriasServiciosPortuarios: [
      { grupo: "2", tareas: [
        "Conexionado, carga y/o descarga de hidrocarburos inflamables, productos químicos y/o agroquímicos",
        "Provisión de Combustible a buques y/o derivados de hidrocarburos",
        "Tareas de Estiba (movimiento de mercaderías de cualquier tipo) a buques u otros medios de transporte y/o plazoleta"
      ]},
      { grupo: "1", tareas: ["Tareas de Remolque de Buques"] }
    ],
    estado: "Pendiente",

    fechaCreacion: "08/12/2023",
    
    // Información de Contacto
    nombreContacto: "Dr. Roberto Silva",
    cargoContacto: "Director General",
    telefonoContacto: "+54 221 4765432",
    emailContacto: "contacto@tecnopuertos.com",
    sitioWeb: "www.tecnopuertos.com",
    
    // Información Bancaria
    banco: "Banco Santander",
    cuentaBancaria: "0012345678",
    cbu: "0720012301234567890123",
    alias: "TECNOPUERTOS",
    
    // Direcciones
    direcciones: [
      {
        id: "1",
        tipo: "Legal",
        calle: "Av. del Puerto",
        numero: "1234",
        piso: "5",
        departamento: "A",
        codigoPostal: "C1104AAD",
        pais: "Argentina",
        provincia: "Buenos Aires",
        ciudad: "Buenos Aires",
        comentarios: "Edificio Torre Portuaria"
      }
    ],
    
    // Documentos
    documentos: {
      constanciaARCA: { archivo: "constancia-arca.pdf", fechaEmision: "01/12/2023", fechaVencimiento: "01/12/2024" },
      constanciaARBA: { archivo: "constancia-arba.pdf", fechaEmision: "01/12/2023", fechaVencimiento: "01/12/2024" },
      convenioMultilateral: { archivo: "convenio-multilateral.pdf", fechaEmision: "01/12/2023", fechaVencimiento: "01/12/2024" },
      exencionesImpositivas: { archivo: "exenciones-impositivas.pdf", fechaEmision: "01/12/2023", fechaVencimiento: "01/12/2024" },
      declaracionPatrimonial: { archivo: "declaracion-patrimonial.pdf", fechaEmision: "01/12/2023" },
      constanciaINAES: { archivo: "constancia-inaes.pdf", fechaEmision: "01/12/2023" },
      reglamentoINAES: { archivo: "reglamento-inaes.pdf", fechaEmision: "01/12/2023" }
    },
    
    // Documentos adicionales
    referenciasFinancieras: [
      { id: "1", nombre: "Referencia Banco Santander", archivo: "referencia-santander.pdf", fechaEmision: "01/12/2023" }
    ],
    balancesAprobados: [
      { id: "1", nombre: "Balance 2022", archivo: "balance-2022.pdf", fechaEmision: "31/12/2022" },
      { id: "2", nombre: "Balance 2023", archivo: "balance-2023.pdf", fechaEmision: "31/12/2023" }
    ],
    
    historial: [
      { id: 1, fecha: "08/12/2023 09:15", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "08/12/2023 10:30", accion: "Carga de documentación", usuario: "Dr. Roberto Silva" },
      { id: 3, fecha: "10/12/2023 08:45", accion: "Solicitud de alta enviada", usuario: "Dr. Roberto Silva" },
    ],
  },
  2: {
    id: 2,
    // Datos Generales
    naturalezaOrganizacion: "Sociedades legalmente constituida",
    tipoSocietario: "Cooperativa",
    razonSocial: "Mantenimiento Portuario Especializado",
    cuitCuil: "30-22334455-4",
    nombreFantasia: "MantPuerto",
    ultimaActividad: "Empresa ya en actividad",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    categoriasServiciosPortuarios: [
      { grupo: "3", tareas: [
        "Mantenimiento y reparación de equipamiento portuario",
        "Servicios de limpieza y descontaminación",
        "Operaciones de carga y descarga especializada"
      ]},
      { grupo: "4", tareas: ["Servicios de seguridad portuaria", "Control de acceso"] }
    ],
    estado: "Pendiente",

    fechaCreacion: "12/10/2023",
    
    // Información de Contacto
    nombreContacto: "Ing. Patricia López",
    cargoContacto: "Gerente de Operaciones",
    telefonoContacto: "+54 221 4123456",
    emailContacto: "contacto@mantenimientopuerto.com",
    sitioWeb: "www.mantenimientopuerto.com",
    
    // Información Bancaria
    banco: "Banco Nación",
    cuentaBancaria: "0023456789",
    cbu: "0110023401234567890123",
    alias: "MANTPUERTO",
    
    // Direcciones
    direcciones: [
      {
        id: "1",
        tipo: "Legal",
        calle: "Calle Industrial",
        numero: "567",
        piso: "1",
        departamento: "",
        codigoPostal: "B1900TYU",
        pais: "Argentina",
        provincia: "Buenos Aires",
        ciudad: "La Plata",
        comentarios: "Zona Industrial"
      }
    ],
    
    // Documentos
    documentos: {
      constanciaARCA: { archivo: "constancia-arca-mant.pdf", fechaEmision: "01/10/2023", fechaVencimiento: "01/10/2024" },
      constanciaARBA: { archivo: "constancia-arba-mant.pdf", fechaEmision: "01/10/2023", fechaVencimiento: "01/10/2024" },
      convenioMultilateral: { archivo: "convenio-multilateral-mant.pdf", fechaEmision: "01/10/2023", fechaVencimiento: "01/10/2024" },
      exencionesImpositivas: { archivo: "exenciones-impositivas-mant.pdf", fechaEmision: "01/10/2023", fechaVencimiento: "01/10/2024" },
      declaracionPatrimonial: { archivo: "declaracion-patrimonial-mant.pdf", fechaEmision: "01/10/2023" },
      constanciaINAES: { archivo: "constancia-inaes-mant.pdf", fechaEmision: "01/10/2023" },
      reglamentoINAES: { archivo: "reglamento-inaes-mant.pdf", fechaEmision: "01/10/2023" }
    },
    
    // Documentos adicionales
    referenciasFinancieras: [
      { id: "1", nombre: "Referencia Banco Nación", archivo: "referencia-nacion.pdf", fechaEmision: "01/10/2023" }
    ],
    balancesAprobados: [
      { id: "1", nombre: "Balance 2021", archivo: "balance-2021.pdf", fechaEmision: "31/12/2021" },
      { id: "2", nombre: "Balance 2022", archivo: "balance-2022.pdf", fechaEmision: "31/12/2022" }
    ],
    
    historial: [
      { id: 1, fecha: "12/10/2023 14:20", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "13/10/2023 09:45", accion: "Carga de documentación", usuario: "Ing. Patricia López" },
      { id: 3, fecha: "15/10/2023 11:30", accion: "Solicitud de alta enviada", usuario: "Ing. Patricia López" },
    ],
  },
  3: {
    id: 3,
    // Datos Generales
    naturalezaOrganizacion: "Persona Fisica",
    tipoSocietario: "Cooperativa",
    razonSocial: "Servicios de Limpieza Portuaria del Norte",
    cuitCuil: "30-11223344-5",
    nombreFantasia: "Limpieza Norte",
    ultimaActividad: "Nueva empresa",
    convenioMultilateral: "No",
    exencionesImpositivas: "No",
    categoriasServiciosPortuarios: [
      { grupo: "1", tareas: [
        "Servicios de limpieza portuaria",
        "Mantenimiento de instalaciones portuarias",
        "Limpieza de áreas de trabajo"
      ]}
    ],
    estado: "Pendiente",

    fechaCreacion: "18/11/2023",
    
    // Información de Contacto
    nombreContacto: "Sr. Miguel Torres",
    cargoContacto: "Propietario",
    telefonoContacto: "+54 221 4456789",
    emailContacto: "info@limpiezanorte.com",
    sitioWeb: "www.limpiezanorte.com",
    
    // Información Bancaria
    banco: "Banco Provincia",
    cuentaBancaria: "0034567890",
    cbu: "0140034501234567890123",
    alias: "LIMPIEZANORTE",
    
    // Direcciones
    direcciones: [
      {
        id: "1",
        tipo: "Legal",
        calle: "Ruta Provincial 2",
        numero: "",
        piso: "",
        departamento: "",
        codigoPostal: "B2900",
        pais: "Argentina",
        provincia: "Buenos Aires",
        ciudad: "San Nicolás",
        comentarios: "Km 15"
      }
    ],
    
    // Documentos
    documentos: {
      constanciaARCA: { archivo: "constancia-arca-limp.pdf", fechaEmision: "01/11/2023", fechaVencimiento: "01/11/2024" },
      constanciaARBA: { archivo: "constancia-arba-limp.pdf", fechaEmision: "01/11/2023", fechaVencimiento: "01/11/2024" },
      convenioMultilateral: { archivo: "convenio-multilateral-limp.pdf", fechaEmision: "01/11/2023", fechaVencimiento: "01/11/2024" },
      exencionesImpositivas: { archivo: "exenciones-impositivas-limp.pdf", fechaEmision: "01/11/2023", fechaVencimiento: "01/11/2024" },
      declaracionPatrimonial: { archivo: "declaracion-patrimonial-limp.pdf", fechaEmision: "01/11/2023" },
      constanciaINAES: { archivo: "constancia-inaes-limp.pdf", fechaEmision: "01/11/2023" },
      reglamentoINAES: { archivo: "reglamento-inaes-limp.pdf", fechaEmision: "01/11/2023" }
    },
    
    // Documentos adicionales
    referenciasFinancieras: [
      { id: "1", nombre: "Referencia Banco Provincia", archivo: "referencia-provincia.pdf", fechaEmision: "01/11/2023" }
    ],
    balancesAprobados: [
      { id: "1", nombre: "Balance 2023", archivo: "balance-2023.pdf", fechaEmision: "31/12/2023" }
    ],
    
    historial: [
      { id: 1, fecha: "18/11/2023 10:15", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "19/11/2023 11:30", accion: "Carga de documentación", usuario: "Sr. Miguel Torres" },
      { id: 3, fecha: "20/11/2023 09:00", accion: "Solicitud de alta enviada", usuario: "Sr. Miguel Torres" },
    ],
  },
}

export default function DetalleEmpresaPendientePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = Number.parseInt(resolvedParams.id)
  const router = useRouter()
  const { toast } = useToast()
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<{ nombre: string; archivo: string } | null>(null)
  const [approveComment, setApproveComment] = useState("")
  const [rejectReason, setRejectReason] = useState("")

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

  // Función para aprobar empresa
  const handleApproveEmpresa = () => {
    console.log(`Aprobando empresa ${empresa.id} con comentario: ${approveComment}`)
    setIsApproveModalOpen(false)

    toast({
      title: "Empresa aprobada",
      description: `${empresa.razonSocial} ha sido aprobada exitosamente.`,
      duration: 3000,
    })

    // Redirigir a la lista de empresas pendientes
    setTimeout(() => {
      router.push("/empleado-legales/gestion/empresa-servicios-portuarios/pendientes")
    }, 1500)
  }

  // Función para ver documento
  const handleVerDocumento = (nombre: string, archivo: string) => {
    setSelectedDocument({ nombre, archivo })
    setIsDocumentModalOpen(true)
  }

  // Función para rechazar empresa
  const handleRejectEmpresa = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Error",
        description: "Debe proporcionar un motivo para el rechazo.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    console.log(`Rechazando empresa ${empresa.id} con motivo: ${rejectReason}`)
    setIsRejectModalOpen(false)

    toast({
      title: "Empresa rechazada",
      description: `${empresa.razonSocial} ha sido rechazada.`,
      duration: 3000,
    })

    // Redirigir a la lista de empresas pendientes
    setTimeout(() => {
      router.push("/empleado-legales/gestion/empresa-servicios-portuarios/pendientes")
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Detalle de la Empresa Pendiente</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información general */}
        <div className="lg:col-span-2 space-y-6">
          {/* Datos Generales */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-gray-500" />
                  <CardTitle className="text-xl">Datos Generales</CardTitle>
                </div>
                <Badge
                  variant="outline"
                  className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                >
                  {empresa.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Razón Social</h3>
                  <p className="mt-1">{empresa.razonSocial}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">CUIT/CUIL</h3>
                  <p className="mt-1">{empresa.cuitCuil}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nombre Fantasía</h3>
                  <p className="mt-1">{empresa.nombreFantasia}</p>
                </div>
                                 <div>
                   <h3 className="text-sm font-medium text-gray-500">Naturaleza de la Organización</h3>
                   <p className="mt-1">{empresa.naturalezaOrganizacion}</p>
                 </div>
                 <div>
                   <h3 className="text-sm font-medium text-gray-500">Tipo Societario</h3>
                   <p className="mt-1">{empresa.tipoSocietario}</p>
                 </div>
                 
                 <div>
                   <h3 className="text-sm font-medium text-gray-500">Última Actividad</h3>
                   <p className="mt-1">{empresa.ultimaActividad}</p>
                 </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Convenio Multilateral</h3>
                  <p className="mt-1">{empresa.convenioMultilateral}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Exenciones Impositivas</h3>
                  <p className="mt-1">{empresa.exencionesImpositivas}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Estado</h3>
                  <p className="mt-1">{empresa.estado}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha de Creación</h3>
                  <p className="mt-1">{empresa.fechaCreacion}</p>
                </div>
              </div>

              <Separator className="my-4" />


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
                  <p className="mt-1">{empresa.nombreContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cargo</h3>
                  <p className="mt-1">{empresa.cargoContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{empresa.emailContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                  <p className="mt-1">{empresa.telefonoContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Sitio Web</h3>
                  <p className="mt-1">{empresa.sitioWeb}</p>
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
                  <p className="mt-1">{empresa.banco}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cuenta Bancaria</h3>
                  <p className="mt-1">{empresa.cuentaBancaria}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">CBU</h3>
                  <p className="mt-1">{empresa.cbu}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Alias</h3>
                  <p className="mt-1">{empresa.alias}</p>
                </div>
              </div>
            </CardContent>
          </Card>







          {/* Documentación */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estado de Documentación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Documentos Principales</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Constancia ARCA</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800">Subido</Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-600">Archivo: {empresa.documentos.constanciaARCA.archivo}</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 px-2 text-xs"
                          onClick={() => handleVerDocumento("Constancia ARCA", empresa.documentos.constanciaARCA.archivo)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600">Vencimiento: {empresa.documentos.constanciaARCA.fechaVencimiento || "No especificada"}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Constancia ARBA</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800">Subido</Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-600">Archivo: {empresa.documentos.constanciaARBA.archivo}</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 px-2 text-xs"
                          onClick={() => handleVerDocumento("Constancia ARBA", empresa.documentos.constanciaARBA.archivo)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600">Vencimiento: {empresa.documentos.constanciaARBA.fechaVencimiento || "No especificada"}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Convenio Multilateral</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800">Subido</Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-600">Archivo: {empresa.documentos.convenioMultilateral.archivo}</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 px-2 text-xs"
                          onClick={() => handleVerDocumento("Convenio Multilateral", empresa.documentos.convenioMultilateral.archivo)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600">Vencimiento: {empresa.documentos.convenioMultilateral.fechaVencimiento || "No especificada"}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Exenciones Impositivas</span>
                        <Badge variant="outline" className="bg-green-100 text-green-800">Subido</Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-600">Archivo: {empresa.documentos.exencionesImpositivas.archivo}</p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-6 px-2 text-xs"
                          onClick={() => handleVerDocumento("Exenciones Impositivas", empresa.documentos.exencionesImpositivas.archivo)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600">Vencimiento: {empresa.documentos.exencionesImpositivas.fechaVencimiento || "No especificada"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                Aprobar Empresa
              </Button>

              <Button variant="destructive" className="w-full" onClick={() => setIsRejectModalOpen(true)}>
                <XCircle className="h-4 w-4 mr-2" />
                Rechazar Empresa
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorías Seleccionadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {empresa.categoriasServiciosPortuarios.map((categoria, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="font-medium text-sm text-gray-700">
                      Grupo {categoria.grupo}
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      {categoria.tareas.map((tarea, tareaIdx) => (
                        <li key={tareaIdx} className="list-disc">
                          {tarea}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Direcciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {empresa.direcciones.map((direccion, index) => (
                  <div key={direccion.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs">
                        {direccion.tipo}
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">
                        {direccion.calle} {direccion.numero}
                        {direccion.piso && `, Piso ${direccion.piso}`}
                        {direccion.departamento && `, Depto ${direccion.departamento}`}
                      </p>
                      <p className="text-gray-600">
                        {direccion.ciudad}, {direccion.provincia}
                      </p>
                      <p className="text-gray-500 text-xs">
                        CP: {direccion.codigoPostal}, {direccion.pais}
                      </p>
                      {direccion.comentarios && (
                        <p className="text-gray-500 text-xs italic">
                          {direccion.comentarios}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Historial de Actividad */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Historial de Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {empresa.historial.map((item) => (
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
        </div>
      </div>

      {/* Modal para aprobar empresa */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aprobar Empresa</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea aprobar a esta empresa? Esta acción permitirá que la empresa opere en el
              sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="font-medium">{empresa.razonSocial}</div>
              <div className="text-sm text-gray-500">CUIT: {empresa.cuitCuil}</div>
              <div className="text-sm text-gray-500">Nombre Fantasía: {empresa.nombreFantasia}</div>
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
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleApproveEmpresa}>
                Confirmar Aprobación
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para rechazar empresa */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rechazar Empresa</DialogTitle>
            <DialogDescription>
              Por favor, indique el motivo por el cual está rechazando a esta empresa.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="font-medium">{empresa.razonSocial}</div>
              <div className="text-sm text-gray-500">CUIT: {empresa.cuitCuil}</div>
              <div className="text-sm text-gray-500">Nombre Fantasía: {empresa.nombreFantasia}</div>
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
              <Button variant="destructive" onClick={handleRejectEmpresa}>
                Confirmar Rechazo
              </Button>
            </DialogFooter>
          </div>
                 </DialogContent>
       </Dialog>

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
             </div>

             <div className="border rounded-lg p-4 bg-white min-h-[400px] flex items-center justify-center">
               <div className="text-center space-y-2">
                 <FileText className="h-16 w-16 text-gray-400 mx-auto" />
                 <p className="text-gray-500">Vista previa del documento</p>
                 <p className="text-sm text-gray-400">{selectedDocument?.archivo}</p>
                 <p className="text-xs text-gray-400">Haz clic en "Descargar" para obtener el archivo completo</p>
               </div>
             </div>
           </div>

           <DialogFooter>
             <Button variant="outline" onClick={() => setIsDocumentModalOpen(false)}>
               Cerrar
             </Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
     </div>
   )
 }
