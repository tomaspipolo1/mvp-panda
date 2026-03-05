"use client"

import { use, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  FileText,
  Download,
  Phone,
  Calendar,
  FileCheck,
  Clock,
  Landmark,
  UserCircle,
  Building2,
  CheckCircle,
  XCircle,
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Datos de ejemplo para clientes
const clientesData = {
  1: {
    id: 1,
    // Datos Generales
    razonSocial: "Distribuidora Marítima S.A.",
    cuitCuil: "30-12345678-9",
    nombreFantasia: "Distribuidora DM",
    naturalezaOrganizacion: "Sociedad Anónima",
    tipoSocietario: "Sociedad Anónima",
    ultimaActividad: "Comercio mayorista de productos marítimos",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    estado: "Activo",
    fechaAlta: "15/04/2023",
    fechaCreacion: "14/04/2023",
    // Información de contacto
    nombreContacto: "Pedro Fernández",
    cargoContacto: "Gerente Comercial",
    telefonoContacto: "+54 11 4567-8901",
    emailContacto: "contacto@distribuidoramaritima.com",
    sitioWeb: "www.distribuidoramaritima.com",
    // Direcciones (array)
    direcciones: [
      {
        id: 1,
        calle: "Av. Costanera",
        numero: "2345",
        piso: "",
        departamento: "",
        ciudad: "Buenos Aires",
        provincia: "Buenos Aires",
        codigoPostal: "C1107AAD",
        pais: "Argentina",
        tipo: "Fiscal"
      }
    ],
    // Información bancaria
    banco: "Banco Nación",
    cuentaBancaria: "0045678901",
    cbu: "0110045601234567890123",
    alias: "distribuidora.dm",
    // Tipos de cliente y categorías
    tiposCliente: [
      { tipo: "Agencia Marítima", subcategoria: "Mayorista" }
    ],
    // Documentos
    documentos: [
      { id: 1, nombre: "Constancia ARCA", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia ARBA", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 3, nombre: "Convenio Multilateral", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 4, nombre: "Declaración Patrimonial", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "01/01/2023", estado: "Verificado" },
      { id: 5, nombre: "Balance Aprobado 2022", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "31/12/2022", estado: "Verificado" },
      { id: 6, nombre: "Contrato de Servicios", tipo: "PDF", fechaCarga: "14/04/2023", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "14/04/2023 09:15", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "14/04/2023 10:30", accion: "Carga de documentación", usuario: "Pedro Fernández" },
      { id: 3, fecha: "15/04/2023 08:45", accion: "Cliente aprobado", usuario: "Contabilidad" },
      { id: 4, fecha: "20/05/2023 14:20", accion: "Actualización de datos bancarios", usuario: "Pedro Fernández" },
    ],
  },
  2: {
    id: 2,
    // Datos Generales
    razonSocial: "Transportes Rápidos SRL",
    cuitCuil: "30-98765432-1",
    nombreFantasia: "Transportes TR",
    naturalezaOrganizacion: "Sociedad de Responsabilidad Limitada",
    tipoSocietario: "Sociedad de Responsabilidad Limitada",
    ultimaActividad: "Transporte de mercaderías",
    convenioMultilateral: "No",
    exencionesImpositivas: "No",
    estado: "Activo",
    fechaAlta: "22/03/2023",
    fechaCreacion: "20/03/2023",
    // Información de contacto
    nombreContacto: "Laura Sánchez",
    cargoContacto: "Directora de Operaciones",
    telefonoContacto: "+54 11 5678-9012",
    emailContacto: "info@transportesrapidos.com",
    sitioWeb: "www.transportesrapidos.com",
    // Direcciones (array)
    direcciones: [
      {
        id: 1,
        calle: "Ruta 2",
        numero: "Km 45",
        piso: "",
        departamento: "",
        ciudad: "La Plata",
        provincia: "Buenos Aires",
        codigoPostal: "B1900XYZ",
        pais: "Argentina",
        tipo: "Fiscal"
      }
    ],
    // Información bancaria
    banco: "Banco Provincia",
    cuentaBancaria: "0056789012",
    cbu: "0140056701234567890123",
    alias: "transportes.tr",
    // Tipos de cliente y categorías
    tiposCliente: [
      { tipo: "Empresa de Servicios Portuarios", subcategoria: "Transporte" }
    ],
    // Documentos
    documentos: [
      { id: 1, nombre: "Constancia ARCA", tipo: "PDF", fechaCarga: "20/03/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia ARBA", tipo: "PDF", fechaCarga: "20/03/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 3, nombre: "Declaración Patrimonial", tipo: "PDF", fechaCarga: "20/03/2023", fechaEmision: "01/01/2023", estado: "Verificado" },
      { id: 4, nombre: "Balance Aprobado 2022", tipo: "PDF", fechaCarga: "20/03/2023", fechaEmision: "31/12/2022", estado: "Verificado" },
      { id: 5, nombre: "Contrato de Servicios", tipo: "PDF", fechaCarga: "20/03/2023", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "20/03/2023 14:20", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "21/03/2023 09:45", accion: "Carga de documentación", usuario: "Laura Sánchez" },
      { id: 3, fecha: "22/03/2023 11:30", accion: "Cliente aprobado", usuario: "Contabilidad" },
    ],
  },
  3: {
    id: 3,
    // Datos Generales
    razonSocial: "Logística Portuaria Internacional",
    cuitCuil: "30-87654321-9",
    nombreFantasia: "Logística LPI",
    naturalezaOrganizacion: "Sociedad Anónima",
    tipoSocietario: "Sociedad Anónima",
    ultimaActividad: "Servicios de logística portuaria",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    estado: "Pendiente",
    fechaAlta: "10/05/2023",
    fechaCreacion: "09/05/2023",
    // Información de contacto
    nombreContacto: "Gustavo Morales",
    cargoContacto: "Director Comercial",
    telefonoContacto: "+54 11 4444-5555",
    emailContacto: "contacto@logisticaportuaria.com",
    sitioWeb: "www.logisticaportuaria.com",
    // Direcciones (array)
    direcciones: [
      {
        id: 1,
        calle: "Av. Puerto",
        numero: "789",
        piso: "",
        departamento: "",
        ciudad: "Buenos Aires",
        provincia: "Buenos Aires",
        codigoPostal: "C1108AAD",
        pais: "Argentina",
        tipo: "Fiscal"
      }
    ],
    // Información bancaria
    banco: "Banco Galicia",
    cuentaBancaria: "0067890123",
    cbu: "0070067801234567890123",
    alias: "logistica.lpi",
    // Tipos de cliente y categorías
    tiposCliente: [
      { tipo: "Agencia Marítima", subcategoria: "Importación" }
    ],
    // Documentos
    documentos: [
      { id: 1, nombre: "Constancia ARCA", tipo: "PDF", fechaCarga: "09/05/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Pendiente" },
      { id: 2, nombre: "Constancia ARBA", tipo: "PDF", fechaCarga: "09/05/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Pendiente" },
      { id: 3, nombre: "Balance Aprobado 2022", tipo: "PDF", fechaCarga: "09/05/2023", fechaEmision: "31/12/2022", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "09/05/2023 10:15", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "09/05/2023 11:30", accion: "Carga de documentación", usuario: "Gustavo Morales" },
    ],
  },
  4: {
    id: 4,
    // Datos Generales
    razonSocial: "Servicios Marítimos del Plata",
    cuitCuil: "30-76543210-8",
    nombreFantasia: "Servicios SMP",
    naturalezaOrganizacion: "Sociedad de Responsabilidad Limitada",
    tipoSocietario: "Sociedad de Responsabilidad Limitada",
    ultimaActividad: "Servicios portuarios y mantenimiento",
    convenioMultilateral: "No",
    exencionesImpositivas: "No",
    estado: "Pendiente",
    fechaAlta: "15/05/2023",
    fechaCreacion: "14/05/2023",
    // Información de contacto
    nombreContacto: "Claudia Fernández",
    cargoContacto: "Gerente de Operaciones",
    telefonoContacto: "+54 11 5555-6666",
    emailContacto: "info@serviciosmp.com",
    sitioWeb: "www.serviciosmp.com",
    // Direcciones (array)
    direcciones: [
      {
        id: 1,
        calle: "Calle Portuaria",
        numero: "456",
        piso: "",
        departamento: "",
        ciudad: "La Plata",
        provincia: "Buenos Aires",
        codigoPostal: "B1900ABC",
        pais: "Argentina",
        tipo: "Fiscal"
      }
    ],
    // Información bancaria
    banco: "Banco ICBC",
    cuentaBancaria: "0078901234",
    cbu: "0150078901234567890123",
    alias: "servicios.smp",
    // Tipos de cliente y categorías
    tiposCliente: [
      { tipo: "Empresa de Servicios Portuarios", subcategoria: "Mantenimiento" }
    ],
    // Documentos
    documentos: [
      { id: 1, nombre: "Constancia ARCA", tipo: "PDF", fechaCarga: "14/05/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia ARBA", tipo: "PDF", fechaCarga: "14/05/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Pendiente" },
      { id: 3, nombre: "Balance Aprobado 2022", tipo: "PDF", fechaCarga: "14/05/2023", fechaEmision: "31/12/2022", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "14/05/2023 09:20", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "14/05/2023 10:45", accion: "Carga de documentación", usuario: "Claudia Fernández" },
    ],
  },
  5: {
    id: 5,
    // Datos Generales
    razonSocial: "Terminal Portuaria Sur",
    cuitCuil: "30-65432109-7",
    nombreFantasia: "Terminal TPS",
    naturalezaOrganizacion: "Sociedad Anónima",
    tipoSocietario: "Sociedad Anónima",
    ultimaActividad: "Operaciones de terminal portuaria",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    estado: "Pendiente",
    fechaAlta: "20/05/2023",
    fechaCreacion: "19/05/2023",
    // Información de contacto
    nombreContacto: "Ricardo Suárez",
    cargoContacto: "Director de Terminal",
    telefonoContacto: "+54 11 6666-7777",
    emailContacto: "contacto@terminaltps.com",
    sitioWeb: "www.terminaltps.com",
    // Direcciones (array)
    direcciones: [
      {
        id: 1,
        calle: "Zona Portuaria",
        numero: "100",
        piso: "",
        departamento: "",
        ciudad: "Buenos Aires",
        provincia: "Buenos Aires",
        codigoPostal: "C1109AAD",
        pais: "Argentina",
        tipo: "Fiscal"
      }
    ],
    // Información bancaria
    banco: "Banco Santander",
    cuentaBancaria: "0089012345",
    cbu: "0720089001234567890123",
    alias: "terminal.tps",
    // Tipos de cliente y categorías
    tiposCliente: [
      { tipo: "Permisionario", subcategoria: "Carga" }
    ],
    // Documentos
    documentos: [
      { id: 1, nombre: "Constancia ARCA", tipo: "PDF", fechaCarga: "19/05/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia ARBA", tipo: "PDF", fechaCarga: "19/05/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 3, nombre: "Balance Aprobado 2022", tipo: "PDF", fechaCarga: "19/05/2023", fechaEmision: "31/12/2022", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "19/05/2023 14:30", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "19/05/2023 15:45", accion: "Carga de documentación", usuario: "Ricardo Suárez" },
    ],
  },
  6: {
    id: 6,
    // Datos Generales
    razonSocial: "Astilleros Navales Argentinos",
    cuitCuil: "30-54321098-6",
    nombreFantasia: "Astilleros ANA",
    naturalezaOrganizacion: "Sociedad Anónima",
    tipoSocietario: "Sociedad Anónima",
    ultimaActividad: "Construcción y reparación naval",
    convenioMultilateral: "No",
    exencionesImpositivas: "No",
    estado: "Pendiente",
    fechaAlta: "25/05/2023",
    fechaCreacion: "24/05/2023",
    // Información de contacto
    nombreContacto: "Daniela Vega",
    cargoContacto: "Directora Técnica",
    telefonoContacto: "+54 11 7777-8888",
    emailContacto: "info@astillerosana.com",
    sitioWeb: "www.astillerosana.com",
    // Direcciones (array)
    direcciones: [
      {
        id: 1,
        calle: "Av. Astilleros",
        numero: "2000",
        piso: "",
        departamento: "",
        ciudad: "Ensenada",
        provincia: "Buenos Aires",
        codigoPostal: "B1925XYZ",
        pais: "Argentina",
        tipo: "Fiscal"
      }
    ],
    // Información bancaria
    banco: "Banco BBVA",
    cuentaBancaria: "0090123456",
    cbu: "0170090101234567890123",
    alias: "astilleros.ana",
    // Tipos de cliente y categorías
    tiposCliente: [
      { tipo: "Consecionarios", subcategoria: "Construcción" }
    ],
    // Documentos
    documentos: [
      { id: 1, nombre: "Constancia ARCA", tipo: "PDF", fechaCarga: "24/05/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Pendiente" },
      { id: 2, nombre: "Constancia ARBA", tipo: "PDF", fechaCarga: "24/05/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 3, nombre: "Balance Aprobado 2022", tipo: "PDF", fechaCarga: "24/05/2023", fechaEmision: "31/12/2022", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "24/05/2023 11:00", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "24/05/2023 12:15", accion: "Carga de documentación", usuario: "Daniela Vega" },
    ],
  },
  7: {
    id: 7,
    // Datos Generales
    razonSocial: "Operadora Logística del Sur",
    cuitCuil: "30-43210987-5",
    nombreFantasia: "Operadora OLS",
    naturalezaOrganizacion: "Sociedad de Responsabilidad Limitada",
    tipoSocietario: "Sociedad de Responsabilidad Limitada",
    ultimaActividad: "Operaciones logísticas integradas",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    estado: "Pendiente",
    fechaAlta: "01/06/2023",
    fechaCreacion: "31/05/2023",
    // Información de contacto
    nombreContacto: "Fernando Paz",
    cargoContacto: "Gerente General",
    telefonoContacto: "+54 11 8888-9999",
    emailContacto: "contacto@operadoraols.com",
    sitioWeb: "www.operadoraols.com",
    // Direcciones (array)
    direcciones: [
      {
        id: 1,
        calle: "Av. Logística",
        numero: "3500",
        piso: "",
        departamento: "",
        ciudad: "La Plata",
        provincia: "Buenos Aires",
        codigoPostal: "B1900DEF",
        pais: "Argentina",
        tipo: "Fiscal"
      }
    ],
    // Información bancaria
    banco: "Banco Macro",
    cuentaBancaria: "0001234567",
    cbu: "0285001201234567890123",
    alias: "operadora.ols",
    // Tipos de cliente y categorías
    tiposCliente: [
      { tipo: "Empresa de Servicios Portuarios", subcategoria: "Logística" }
    ],
    // Documentos
    documentos: [
      { id: 1, nombre: "Constancia ARCA", tipo: "PDF", fechaCarga: "31/05/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia ARBA", tipo: "PDF", fechaCarga: "31/05/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 3, nombre: "Balance Aprobado 2022", tipo: "PDF", fechaCarga: "31/05/2023", fechaEmision: "31/12/2022", estado: "Pendiente" },
    ],
    historial: [
      { id: 1, fecha: "31/05/2023 16:00", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "31/05/2023 17:20", accion: "Carga de documentación", usuario: "Fernando Paz" },
    ],
  },
}

export default function DetalleClientePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = Number.parseInt(resolvedParams.id)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Verificar si venimos de la página de pendientes
  const isPendiente = searchParams.get("pendiente") === "true"

  // Estados para modales
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [approveComment, setApproveComment] = useState("")
  const [rejectReason, setRejectReason] = useState("")

  // Obtener datos del cliente según el ID
  const cliente = clientesData[id as keyof typeof clientesData]

  // Función para aprobar cliente
  const handleApproveCliente = () => {
    console.log(`Aprobando cliente ${cliente.id} con comentario: ${approveComment}`)

    setIsApproveModalOpen(false)

    toast({
      title: "Cliente aprobado",
      description: `${cliente.razonSocial} ha sido aprobado exitosamente.`,
      duration: 3000,
    })

    // Redirigir a la lista de pendientes después de un breve delay
    setTimeout(() => {
      router.push("/empleado-contable/gestion/clientes/pendientes")
    }, 1500)
  }

  // Función para rechazar cliente
  const handleRejectCliente = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Error",
        description: "Debe proporcionar un motivo para el rechazo.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    console.log(`Rechazando cliente ${cliente.id} con motivo: ${rejectReason}`)

    setIsRejectModalOpen(false)

    toast({
      title: "Cliente rechazado",
      description: `${cliente.razonSocial} ha sido rechazado.`,
      duration: 3000,
    })

    // Redirigir a la lista de pendientes después de un breve delay
    setTimeout(() => {
      router.push("/empleado-contable/gestion/clientes/pendientes")
    }, 1500)
  }

  // Si no existe el cliente, mostrar mensaje de error
  if (!cliente) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Cliente no encontrado</h1>
          <p className="text-gray-500">El cliente que estás buscando no existe o ha sido eliminado.</p>
          <Button onClick={() => router.back()}>Volver</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Detalle del Cliente</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información general */}
        <div className="lg:col-span-2 space-y-6">
          {/* Datos Generales */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <CardTitle className="text-xl">Datos Generales</CardTitle>
                </div>
                <Badge
                  variant="outline"
                  className={
                    cliente.estado === "Activo"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : cliente.estado === "Inactivo"
                        ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  }
                >
                  {cliente.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Razón Social</h3>
                  <p className="mt-1">{cliente.razonSocial}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">CUIT/CUIL</h3>
                  <p className="mt-1">{cliente.cuitCuil}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nombre de Fantasía</h3>
                  <p className="mt-1">{cliente.nombreFantasia}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Naturaleza de Organización</h3>
                  <p className="mt-1">{cliente.naturalezaOrganizacion}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tipo Societario</h3>
                  <p className="mt-1">{cliente.tipoSocietario}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Última Actividad</h3>
                  <p className="mt-1">{cliente.ultimaActividad}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Convenio Multilateral</h3>
                  <Badge variant="outline" className={cliente.convenioMultilateral === "Sí" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {cliente.convenioMultilateral}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Exenciones Impositivas</h3>
                  <Badge variant="outline" className={cliente.exencionesImpositivas === "Sí" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {cliente.exencionesImpositivas}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha de Alta</h3>
                  <p className="mt-1">{cliente.fechaAlta}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tipos de Cliente</h3>
                <div className="space-y-2">
                  {cliente.tiposCliente.map((tipo, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {tipo.tipo}
                      </Badge>
                      <span className="text-gray-400">→</span>
                      <Badge variant="outline" className="bg-gray-100 text-gray-800">
                        {tipo.subcategoria}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Direcciones */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-lg">Direcciones</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {cliente.direcciones.map((direccion, idx) => (
                <div key={direccion.id} className={idx > 0 ? "mt-4 pt-4 border-t" : ""}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">Tipo de Dirección</h3>
                      <Badge variant="outline" className="mt-1">{direccion.tipo}</Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Calle</h3>
                      <p className="mt-1">{direccion.calle}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Número</h3>
                      <p className="mt-1">{direccion.numero}</p>
                    </div>
                    {direccion.piso && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Piso</h3>
                        <p className="mt-1">{direccion.piso}</p>
                      </div>
                    )}
                    {direccion.departamento && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Departamento</h3>
                        <p className="mt-1">{direccion.departamento}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Ciudad</h3>
                      <p className="mt-1">{direccion.ciudad}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Provincia</h3>
                      <p className="mt-1">{direccion.provincia}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Código Postal</h3>
                      <p className="mt-1">{direccion.codigoPostal}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">País</h3>
                      <p className="mt-1">{direccion.pais}</p>
                    </div>
                  </div>
                </div>
              ))}
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
                  <h3 className="text-sm font-medium text-gray-500">Nombre del Contacto</h3>
                  <p className="mt-1">{cliente.nombreContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cargo</h3>
                  <p className="mt-1">{cliente.cargoContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                  <p className="mt-1">{cliente.telefonoContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{cliente.emailContacto}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Sitio Web</h3>
                  <p className="mt-1">{cliente.sitioWeb}</p>
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
                  <p className="mt-1">{cliente.banco}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Número de Cuenta</h3>
                  <p className="mt-1">{cliente.cuentaBancaria}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">CBU</h3>
                  <p className="mt-1">{cliente.cbu}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Alias</h3>
                  <p className="mt-1">{cliente.alias}</p>
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
                          <th className="py-3 px-4 text-left font-medium">Fecha de Emisión</th>
                          <th className="py-3 px-4 text-left font-medium">Fecha de Vencimiento</th>
                          <th className="py-3 px-4 text-left font-medium">Estado</th>
                          <th className="py-3 px-4 text-center font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cliente.documentos.map((doc: any) => (
                          <tr key={doc.id} className="border-b">
                            <td className="py-3 px-4">{doc.nombre}</td>
                            <td className="py-3 px-4">{doc.tipo}</td>
                            <td className="py-3 px-4">{doc.fechaCarga}</td>
                            <td className="py-3 px-4">{doc.fechaEmision || "-"}</td>
                            <td className="py-3 px-4">{doc.fechaVencimiento || "-"}</td>
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
                    {cliente.historial.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                        <div className="bg-gray-100 rounded-full p-2">
                          {item.accion.includes("Registro") ? (
                            <Calendar className="h-5 w-5 text-gray-500" />
                          ) : item.accion.includes("Carga") || item.accion.includes("Actualización") ? (
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

        {/* Columna derecha - Resumen */}
        <div className="space-y-6">
          {/* Contenedor de acciones - Solo visible cuando viene de pendientes */}
          {isPendiente && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full h-10 bg-green-600 hover:bg-green-700 text-white text-base font-medium rounded-md"
                  onClick={() => setIsApproveModalOpen(true)}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Aprobar
                </Button>
                <Button
                  className="w-full h-10 bg-red-600 hover:bg-red-700 text-white text-base font-medium rounded-md"
                  onClick={() => setIsRejectModalOpen(true)}
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Rechazar
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen de Documentación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Documentos Cargados</span>
                  <span className="font-medium">{cliente.documentos.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Documentos Verificados</span>
                  <span className="font-medium">
                    {cliente.documentos.filter((doc) => doc.estado === "Verificado").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Documentos Pendientes</span>
                  <span className="font-medium">
                    {cliente.documentos.filter((doc) => doc.estado === "Pendiente").length}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between items-center font-medium">
                  <span>Estado de Verificación</span>
                  <Badge
                    variant="outline"
                    className={
                      cliente.documentos.every((doc) => doc.estado === "Verificado")
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {cliente.documentos.every((doc) => doc.estado === "Verificado") ? "Completo" : "Incompleto"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal para aprobar cliente */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aprobar Cliente</DialogTitle>
            <DialogDescription>
              ¿Está seguro que desea aprobar a este cliente? Esta acción permitirá que el cliente opere en el
              sistema.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="font-medium">{cliente.razonSocial}</div>
              <div className="text-sm text-gray-500">Contacto: {cliente.nombreContacto}</div>
              <div className="text-sm text-gray-500">CUIT: {cliente.cuitCuil}</div>
              <div className="text-sm text-gray-500">
                Tipos: {cliente.tiposCliente.map((tipo) => tipo.tipo).join(", ")}
              </div>
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
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleApproveCliente}>
                Confirmar Aprobación
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para rechazar cliente */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rechazar Cliente</DialogTitle>
            <DialogDescription>
              Por favor, indique el motivo por el cual está rechazando a este cliente.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-md p-3 bg-gray-50">
              <div className="font-medium">{cliente.razonSocial}</div>
              <div className="text-sm text-gray-500">Contacto: {cliente.nombreContacto}</div>
              <div className="text-sm text-gray-500">CUIT: {cliente.cuitCuil}</div>
              <div className="text-sm text-gray-500">
                Tipos: {cliente.tiposCliente.map((tipo) => tipo.tipo).join(", ")}
              </div>
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
              <Button variant="destructive" onClick={handleRejectCliente}>
                Confirmar Rechazo
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

