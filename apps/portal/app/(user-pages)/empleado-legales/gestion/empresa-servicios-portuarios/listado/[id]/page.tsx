"use client"

import { useState, use } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Phone,
  Calendar,
  FileCheck,
  Clock,
  Landmark,
  Building,
  Users,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo para las empresas del listado
const empresasData = {
  1: {
    id: 1,
    // Datos Generales
    naturalezaOrganizacion: "Sociedades legalmente constituida",
    tipoSocietario: "Sociedad Anónima",
    razonSocial: "Servicios Portuarios del Sur S.A.",
    cuitCuil: "30-71234567-8",
    nombreFantasia: "Puerto Sur",
    ultimaActividad: "Empresa ya en actividad",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    categoriasServiciosPortuarios: [
      { grupo: "1", tareas: [
        "Servicios de limpieza portuaria",
        "Mantenimiento de instalaciones portuarias",
        "Limpieza de áreas de trabajo"
      ]},
      { grupo: "2", tareas: [
        "Tareas de Estiba (movimiento de mercaderías de cualquier tipo) a buques u otros medios de transporte y/o plazoleta",
        "Operaciones de carga y descarga especializada"
      ]}
    ],
    estado: "Habilitada",
    fechaCreacion: "15/03/2023",
    
    // Información de Contacto
    nombreContacto: "Ing. Carlos Mendoza",
    cargoContacto: "Gerente General",
    telefonoContacto: "+54 221 4567890",
    emailContacto: "contacto@puertosur.com",
    sitioWeb: "www.puertosur.com",
    
    // Información Bancaria
    banco: "Banco Galicia",
    cuentaBancaria: "0012345678",
    cbu: "0070012301234567890123",
    alias: "PUERTOSUR",
    
               // Personal
      personal: [
        {
          id: "1",
          nombreCompleto: "Carlos Mendoza",
          dni: "25.123.456",
          telefono: "+54 221 4567890",
          archivo: "dni-carlos-mendoza.pdf"
        },
        {
          id: "2",
          nombreCompleto: "María González",
          dni: "27.987.654",
          telefono: "+54 221 4567891",
          archivo: "dni-maria-gonzalez.jpg"
        },
        {
          id: "3",
          nombreCompleto: "Roberto Silva",
          dni: "23.456.789",
          telefono: "+54 221 4567892",
          archivo: "dni-roberto-silva.pdf"
        }
      ],
     
     // Vehículos
     vehiculos: [
       {
         id: "1",
         patente: "ABC123",
         tipoVehiculo: "Camión",
         marca: "Mercedes-Benz"
       },
       {
         id: "2",
         patente: "XYZ789",
         tipoVehiculo: "Camioneta",
         marca: "Ford"
       },
       {
         id: "3",
         patente: "DEF456",
         tipoVehiculo: "Grúa",
         marca: "Iveco"
       }
     ],
     
     // Direcciones
     direcciones: [
       {
         id: "1",
         tipo: "Legal",
         calle: "Av. Costanera Sur",
         numero: "1500",
         piso: "3",
         departamento: "B",
         codigoPostal: "C1107AAR",
         pais: "Argentina",
         provincia: "Buenos Aires",
         ciudad: "Buenos Aires",
         comentarios: "Edificio Torre Portuaria Sur"
       }
     ],
    
    // Documentos
    documentos: {
      constanciaARCA: { archivo: "constancia-arca-sur.pdf", fechaEmision: "01/03/2023", fechaVencimiento: "01/03/2024" },
      constanciaARBA: { archivo: "constancia-arba-sur.pdf", fechaEmision: "01/03/2023", fechaVencimiento: "01/03/2024" },
      convenioMultilateral: { archivo: "convenio-multilateral-sur.pdf", fechaEmision: "01/03/2023", fechaVencimiento: "01/03/2024" },
      exencionesImpositivas: { archivo: "exenciones-impositivas-sur.pdf", fechaEmision: "01/03/2023", fechaVencimiento: "01/03/2024" }
    },
    
    historial: [
      { id: 1, fecha: "15/03/2023 09:00", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "15/03/2023 10:30", accion: "Carga de documentación", usuario: "Ing. Carlos Mendoza" },
      { id: 3, fecha: "20/03/2023 14:15", accion: "Aprobación de solicitud", usuario: "Empleado Legales" },
    ],
  },
  2: {
    id: 2,
    // Datos Generales
    naturalezaOrganizacion: "Sociedades legalmente constituida",
    tipoSocietario: "Sociedad de Responsabilidad Limitada",
    razonSocial: "Transportes Marítimos Rápidos",
    cuitCuil: "30-70987654-3",
    nombreFantasia: "TransMar",
    ultimaActividad: "Empresa ya en actividad",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    categoriasServiciosPortuarios: [
      { grupo: "3", tareas: [
        "Transporte de carga marítima",
        "Logística portuaria",
        "Servicios de remolque de buques"
      ]}
    ],
    estado: "Habilitada",
    fechaCreacion: "22/01/2023",
    
    // Información de Contacto
    nombreContacto: "Lic. Ana Rodríguez",
    cargoContacto: "Directora Comercial",
    telefonoContacto: "+54 221 4876543",
    emailContacto: "info@transmaritimos.com.ar",
    sitioWeb: "www.transmaritimos.com.ar",
    
    // Información Bancaria
    banco: "Banco Macro",
    cuentaBancaria: "0023456789",
    cbu: "2850012301234567890123",
    alias: "TRANSMAR",
    
               // Personal
      personal: [
        {
          id: "1",
          nombreCompleto: "Ana Rodríguez",
          dni: "28.456.789",
          telefono: "+54 221 4876543",
          archivo: "dni-ana-rodriguez.pdf"
        },
        {
          id: "2",
          nombreCompleto: "Juan Pérez",
          dni: "26.789.123",
          telefono: "+54 221 4876544",
          archivo: "dni-juan-perez.jpg"
        }
      ],
     
     // Vehículos
     vehiculos: [
       {
         id: "1",
         patente: "GHI789",
         tipoVehiculo: "Camión",
         marca: "Scania"
       },
       {
         id: "2",
         patente: "JKL012",
         tipoVehiculo: "Remolque",
         marca: "Krone"
       }
     ],
     
     // Direcciones
     direcciones: [
       {
         id: "1",
         tipo: "Legal",
         calle: "Calle del Puerto",
         numero: "789",
         piso: "2",
         departamento: "",
         codigoPostal: "B1900ABC",
         pais: "Argentina",
         provincia: "Buenos Aires",
         ciudad: "La Plata",
         comentarios: "Zona Portuaria"
       }
     ],
    
    // Documentos
    documentos: {
      constanciaARCA: { archivo: "constancia-arca-trans.pdf", fechaEmision: "01/01/2023", fechaVencimiento: "01/01/2024" },
      constanciaARBA: { archivo: "constancia-arba-trans.pdf", fechaEmision: "01/01/2023", fechaVencimiento: "01/01/2024" },
      convenioMultilateral: { archivo: "convenio-multilateral-trans.pdf", fechaEmision: "01/01/2023", fechaVencimiento: "01/01/2024" },
      exencionesImpositivas: { archivo: "exenciones-impositivas-trans.pdf", fechaEmision: "01/01/2023", fechaVencimiento: "01/01/2024" }
    },
    
    historial: [
      { id: 1, fecha: "22/01/2023 08:30", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "22/01/2023 11:45", accion: "Carga de documentación", usuario: "Lic. Ana Rodríguez" },
      { id: 3, fecha: "25/01/2023 16:20", accion: "Aprobación de solicitud", usuario: "Empleado Legales" },
    ],
  },
  3: {
    id: 3,
    // Datos Generales
    naturalezaOrganizacion: "Sociedades legalmente constituida",
    tipoSocietario: "Sociedad Anónima",
    razonSocial: "Insumos Portuarios SRL",
    cuitCuil: "30-69876543-2",
    nombreFantasia: "InsumosPort",
    ultimaActividad: "Empresa ya en actividad",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    categoriasServiciosPortuarios: [
      { grupo: "4", tareas: [
        "Provisión de insumos portuarios",
        "Servicios de seguridad portuaria",
        "Control de acceso y vigilancia"
      ]}
    ],
    estado: "Suspendida",
    fechaCreacion: "10/05/2023",
    
    // Información de Contacto
    nombreContacto: "Dr. Roberto Fernández",
    cargoContacto: "Presidente",
    telefonoContacto: "+54 221 4789012",
    emailContacto: "ventas@insumosportuarios.com",
    sitioWeb: "www.insumosportuarios.com",
    
    // Información Bancaria
    banco: "Banco Santander",
    cuentaBancaria: "0034567890",
    cbu: "0720012301234567890123",
    alias: "INSUMOSPORT",
    
               // Personal
      personal: [
        {
          id: "1",
          nombreCompleto: "Roberto Fernández",
          dni: "24.567.890",
          telefono: "+54 221 4789012",
          archivo: "dni-roberto-fernandez.pdf"
        },
        {
          id: "2",
          nombreCompleto: "Laura Martínez",
          dni: "29.123.456",
          telefono: "+54 221 4789013",
          archivo: "dni-laura-martinez.jpg"
        }
      ],
     
     // Vehículos
     vehiculos: [
       {
         id: "1",
         patente: "MNO345",
         tipoVehiculo: "Camioneta",
         marca: "Toyota"
       }
     ],
     
     // Direcciones
     direcciones: [
       {
         id: "1",
         tipo: "Legal",
         calle: "Ruta Nacional 9",
         numero: "",
         piso: "",
         departamento: "",
         codigoPostal: "B2900",
         pais: "Argentina",
         provincia: "Buenos Aires",
         ciudad: "San Nicolás",
         comentarios: "Km 20"
       }
     ],
    
    // Documentos
    documentos: {
      constanciaARCA: { archivo: "constancia-arca-ins.pdf", fechaEmision: "01/05/2023", fechaVencimiento: "01/05/2024" },
      constanciaARBA: { archivo: "constancia-arba-ins.pdf", fechaEmision: "01/05/2023", fechaVencimiento: "01/05/2024" },
      convenioMultilateral: { archivo: "convenio-multilateral-ins.pdf", fechaEmision: "01/05/2023", fechaVencimiento: "01/05/2024" },
      exencionesImpositivas: { archivo: "exenciones-impositivas-ins.pdf", fechaEmision: "01/05/2023", fechaVencimiento: "01/05/2024" }
    },
    
    historial: [
      { id: 1, fecha: "10/05/2023 10:15", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "10/05/2023 13:45", accion: "Carga de documentación", usuario: "Dr. Roberto Fernández" },
      { id: 3, fecha: "15/05/2023 09:30", accion: "Aprobación de solicitud", usuario: "Empleado Legales" },
      { id: 4, fecha: "20/08/2023 14:20", accion: "Suspensión temporal", usuario: "Empleado Legales" },
    ],
  },
  4: {
    id: 4,
    // Datos Generales
    naturalezaOrganizacion: "Sociedades legalmente constituida",
    tipoSocietario: "Sociedad Anónima",
    razonSocial: "Maquinaria Pesada Argentina",
    cuitCuil: "30-65432198-7",
    nombreFantasia: "MaquiPesada",
    ultimaActividad: "Empresa ya en actividad",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    categoriasServiciosPortuarios: [
      { grupo: "2", tareas: [
        "Alquiler de maquinaria pesada",
        "Operaciones de carga y descarga con grúas",
        "Mantenimiento de equipamiento portuario"
      ]},
      { grupo: "4", tareas: [
        "Servicios de seguridad en operaciones",
        "Control de acceso a zonas restringidas"
      ]}
    ],
    estado: "Habilitada",
    fechaCreacion: "08/06/2023",
    
    // Información de Contacto
    nombreContacto: "Ing. Patricia López",
    cargoContacto: "Gerente de Operaciones",
    telefonoContacto: "+54 221 4234567",
    emailContacto: "contacto@maquipesada.com.ar",
    sitioWeb: "www.maquipesada.com.ar",
    
    // Información Bancaria
    banco: "Banco Nación",
    cuentaBancaria: "0045678901",
    cbu: "0110012301234567890123",
    alias: "MAQUIPESADA",
    
               // Personal
      personal: [
        {
          id: "1",
          nombreCompleto: "Patricia López",
          dni: "22.345.678",
          telefono: "+54 221 4234567",
          archivo: "dni-patricia-lopez.pdf"
        },
        {
          id: "2",
          nombreCompleto: "Carlos Ruiz",
          dni: "21.987.654",
          telefono: "+54 221 4234568",
          archivo: "dni-carlos-ruiz.jpg"
        },
        {
          id: "3",
          nombreCompleto: "Ana Torres",
          dni: "30.234.567",
          telefono: "+54 221 4234569",
          archivo: "dni-ana-torres.pdf"
        }
      ],
     
     // Vehículos
     vehiculos: [
       {
         id: "1",
         patente: "PQR678",
         tipoVehiculo: "Grúa",
         marca: "Liebherr"
       },
       {
         id: "2",
         patente: "STU901",
         tipoVehiculo: "Excavadora",
         marca: "Caterpillar"
       },
       {
         id: "3",
         patente: "VWX234",
         tipoVehiculo: "Camión",
         marca: "Volvo"
       }
     ],
     
     // Direcciones
     direcciones: [
       {
         id: "1",
         tipo: "Legal",
         calle: "Calle Industrial",
         numero: "456",
         piso: "1",
         departamento: "",
         codigoPostal: "B1900DEF",
         pais: "Argentina",
         provincia: "Buenos Aires",
         ciudad: "La Plata",
         comentarios: "Parque Industrial"
       }
     ],
    
    // Documentos
    documentos: {
      constanciaARCA: { archivo: "constancia-arca-maqui.pdf", fechaEmision: "01/06/2023", fechaVencimiento: "01/06/2024" },
      constanciaARBA: { archivo: "constancia-arba-maqui.pdf", fechaEmision: "01/06/2023", fechaVencimiento: "01/06/2024" },
      convenioMultilateral: { archivo: "convenio-multilateral-maqui.pdf", fechaEmision: "01/06/2023", fechaVencimiento: "01/06/2024" },
      exencionesImpositivas: { archivo: "exenciones-impositivas-maqui.pdf", fechaEmision: "01/06/2023", fechaVencimiento: "01/06/2024" }
    },
    
    historial: [
      { id: 1, fecha: "08/06/2023 09:45", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "08/06/2023 12:30", accion: "Carga de documentación", usuario: "Ing. Patricia López" },
      { id: 3, fecha: "12/06/2023 15:15", accion: "Aprobación de solicitud", usuario: "Empleado Legales" },
    ],
  },
  5: {
    id: 5,
    // Datos Generales
    naturalezaOrganizacion: "Sociedades legalmente constituida",
    tipoSocietario: "Sociedad Anónima",
    razonSocial: "Tecnología Portuaria SA",
    cuitCuil: "30-76543210-9",
    nombreFantasia: "TecnoPuertos",
    ultimaActividad: "Empresa ya en actividad",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    categoriasServiciosPortuarios: [
      { grupo: "1", tareas: [
        "Sistemas de control portuario",
        "Tecnología de seguridad",
        "Monitoreo de operaciones"
      ]},
      { grupo: "3", tareas: [
        "Desarrollo de software portuario",
        "Implementación de sistemas"
      ]}
    ],
    estado: "Pre-inscripta",
    fechaCreacion: "15/12/2023",
    
    // Información de Contacto
    nombreContacto: "Dr. Roberto Silva",
    cargoContacto: "Director General",
    telefonoContacto: "+54 221 4765432",
    emailContacto: "info@tecnopuertos.com",
    sitioWeb: "www.tecnopuertos.com",
    
    // Información Bancaria
    banco: "Banco Santander",
    cuentaBancaria: "0056789012",
    cbu: "0720012301234567890123",
    alias: "TECNOPUERTOS",
    
               // Personal
      personal: [
        {
          id: "1",
          nombreCompleto: "Roberto Silva",
          dni: "31.456.789",
          telefono: "+54 221 4765432",
          archivo: "dni-roberto-silva.pdf"
        },
        {
          id: "2",
          nombreCompleto: "Sofía Morales",
          dni: "32.789.123",
          telefono: "+54 221 4765433",
          archivo: "dni-sofia-morales.jpg"
        }
      ],
     
     // Vehículos
     vehiculos: [
       {
         id: "1",
         patente: "YZA567",
         tipoVehiculo: "Camioneta",
         marca: "Renault"
       }
     ],
     
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
      constanciaARCA: { archivo: "constancia-arca-tecno.pdf", fechaEmision: "01/12/2023", fechaVencimiento: "01/12/2024" },
      constanciaARBA: { archivo: "constancia-arba-tecno.pdf", fechaEmision: "01/12/2023", fechaVencimiento: "01/12/2024" },
      convenioMultilateral: { archivo: "convenio-multilateral-tecno.pdf", fechaEmision: "01/12/2023", fechaVencimiento: "01/12/2024" },
      exencionesImpositivas: { archivo: "exenciones-impositivas-tecno.pdf", fechaEmision: "01/12/2023", fechaVencimiento: "01/12/2024" }
    },
    
    historial: [
      { id: 1, fecha: "15/12/2023 09:15", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "15/12/2023 10:30", accion: "Carga de documentación", usuario: "Dr. Roberto Silva" },
      { id: 3, fecha: "18/12/2023 08:45", accion: "Solicitud de alta enviada", usuario: "Dr. Roberto Silva" },
    ],
  }
}

export default function DetalleEmpresaListadoPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = Number.parseInt(resolvedParams.id)
  const router = useRouter()
  const { toast } = useToast()


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



  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Detalle de la Empresa</h1>
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
                  className={
                    empresa.estado === "Habilitada" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                    empresa.estado === "Pre-inscripta" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" :
                    "bg-red-100 text-red-800 hover:bg-red-100"
                  }
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

           {/* Personal */}
           <Card>
             <CardHeader className="pb-3">
               <div className="flex items-center gap-2">
                 <Users className="h-5 w-5 text-gray-500" />
                 <CardTitle className="text-lg">Personal</CardTitle>
               </div>
             </CardHeader>
             <CardContent>
               <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead>
                     <tr>
                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Nombre Completo
                       </th>
                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         DNI
                       </th>
                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Teléfono
                       </th>
                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Archivo
                       </th>
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                     {empresa.personal.map((persona) => (
                       <tr key={persona.id} className="hover:bg-gray-50">
                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                           {persona.nombreCompleto}
                         </td>
                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                           {persona.dni}
                         </td>
                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                           {persona.telefono}
                         </td>
                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                           <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                             {persona.archivo}
                           </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </CardContent>
           </Card>

           {/* Vehículos */}
           <Card>
             <CardHeader className="pb-3">
               <div className="flex items-center gap-2">
                 <Truck className="h-5 w-5 text-gray-500" />
                 <CardTitle className="text-lg">Vehículos</CardTitle>
               </div>
             </CardHeader>
             <CardContent>
               <div className="overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead>
                     <tr>
                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Patente
                       </th>
                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Tipo Vehículo
                       </th>
                       <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Marca
                       </th>
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                     {empresa.vehiculos.map((vehiculo) => (
                       <tr key={vehiculo.id} className="hover:bg-gray-50">
                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
                           {vehiculo.patente}
                         </td>
                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                           {vehiculo.tipoVehiculo}
                         </td>
                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                           {vehiculo.marca}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </CardContent>
           </Card>


        </div>

        {/* Columna derecha - Resumen */}
        <div className="space-y-6">
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
                      ) : item.accion.includes("Aprobación") ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : item.accion.includes("Suspensión") ? (
                        <XCircle className="h-5 w-5 text-red-500" />
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


    </div>
  )
}
