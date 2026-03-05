"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  FileText,
  Download,
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

// Datos de ejemplo para proveedores
const proveedoresData = {
  1: {
    id: 1,
    // Datos Generales
    razonSocial: "Suministros Industriales S.A.",
    cuitCuil: "30-12345678-9",
    nombreFantasia: "Suministros SI",
    naturalezaOrganizacion: "Sociedad Anónima",
    tipoSocietario: "Sociedad Anónima",
    ultimaActividad: "Comercio al por mayor de materiales de construcción",
    convenioMultilateral: "Sí",
    exencionesImpositivas: "No",
    estado: "Activo",
    fechaAlta: "15/04/2023",
    fechaCreacion: "14/04/2023",
    calificacion: "Proveedor A",
    // Información de contacto
    nombreContacto: "Juan Pérez",
    cargoContacto: "Gerente Comercial",
    telefonoContacto: "+54 11 4567-8901",
    emailContacto: "contacto@suministrosindustriales.com",
    sitioWeb: "www.suministrosindustriales.com",
    // Direcciones (array)
    direcciones: [
      {
        id: 1,
        calle: "Av. Industrial",
        numero: "1234",
        piso: "",
        departamento: "",
        ciudad: "Buenos Aires",
        provincia: "Buenos Aires",
        codigoPostal: "C1104AAD",
        pais: "Argentina",
        tipo: "Fiscal"
      }
    ],
    // Información bancaria
    banco: "Banco Nación",
    cuentaBancaria: "0012345678",
    cbu: "0110012301234567890123",
    alias: "suministros.ind",
    // Categorías comerciales
    categoriasComerciales: [
      { categoria: "Materiales", subcategoria: "Construcción" },
      { categoria: "Materiales", subcategoria: "Infraestructura" }
    ],
    // Documentos
    documentos: [
      { id: 1, nombre: "Constancia ARCA", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia ARBA", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 3, nombre: "Convenio Multilateral", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 4, nombre: "Declaración Patrimonial", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "01/01/2023", estado: "Verificado" },
      { id: 5, nombre: "Referencias Financieras", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "10/01/2023", estado: "Verificado" },
      { id: 6, nombre: "Balance Aprobado 2022", tipo: "PDF", fechaCarga: "14/04/2023", fechaEmision: "31/12/2022", estado: "Verificado" },
      { id: 7, nombre: "Brochure Comercial", tipo: "PDF", fechaCarga: "14/04/2023", estado: "Verificado" },
      { id: 8, nombre: "Carta de Presentación", tipo: "PDF", fechaCarga: "14/04/2023", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "14/04/2023 09:15", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "14/04/2023 10:30", accion: "Carga de documentación", usuario: "Juan Pérez" },
      { id: 3, fecha: "15/04/2023 08:45", accion: "Proveedor aprobado", usuario: "Contabilidad" },
      { id: 4, fecha: "20/05/2023 14:20", accion: "Actualización de datos bancarios", usuario: "Juan Pérez" },
    ],
  },
  2: {
    id: 2,
    // Datos Generales
    razonSocial: "Logística Portuaria SRL",
    cuitCuil: "30-98765432-1",
    nombreFantasia: "Logística LP",
    naturalezaOrganizacion: "Sociedad de Responsabilidad Limitada",
    tipoSocietario: "Sociedad de Responsabilidad Limitada",
    ultimaActividad: "Transporte y logística portuaria",
    convenioMultilateral: "No",
    exencionesImpositivas: "No",
    estado: "Activo",
    fechaAlta: "22/03/2023",
    fechaCreacion: "20/03/2023",
    calificacion: "Proveedor B",
    // Información de contacto
    nombreContacto: "María González",
    cargoContacto: "Directora de Operaciones",
    telefonoContacto: "+54 11 5678-9012",
    emailContacto: "info@logisticaportuaria.com",
    sitioWeb: "www.logisticaportuaria.com",
    // Direcciones (array)
    direcciones: [
      {
        id: 1,
        calle: "Puerto Comercial",
        numero: "567",
        piso: "",
        departamento: "",
        ciudad: "La Plata",
        provincia: "Buenos Aires",
        codigoPostal: "B1900TYU",
        pais: "Argentina",
        tipo: "Fiscal"
      }
    ],
    // Información bancaria
    banco: "Banco Provincia",
    cuentaBancaria: "0023456789",
    cbu: "0140023401234567890123",
    alias: "logistica.port",
    // Categorías comerciales
    categoriasComerciales: [
      { categoria: "Servicios", subcategoria: "Transporte" },
      { categoria: "Servicios", subcategoria: "Logística" }
    ],
    // Documentos
    documentos: [
      { id: 1, nombre: "Constancia ARCA", tipo: "PDF", fechaCarga: "20/03/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 2, nombre: "Constancia ARBA", tipo: "PDF", fechaCarga: "20/03/2023", fechaEmision: "01/01/2023", fechaVencimiento: "31/12/2023", estado: "Verificado" },
      { id: 3, nombre: "Declaración Patrimonial", tipo: "PDF", fechaCarga: "20/03/2023", fechaEmision: "01/01/2023", estado: "Verificado" },
      { id: 4, nombre: "Referencias Financieras", tipo: "PDF", fechaCarga: "20/03/2023", fechaEmision: "10/01/2023", estado: "Verificado" },
      { id: 5, nombre: "Balance Aprobado 2022", tipo: "PDF", fechaCarga: "20/03/2023", fechaEmision: "31/12/2022", estado: "Verificado" },
      { id: 6, nombre: "Brochure Comercial", tipo: "PDF", fechaCarga: "20/03/2023", estado: "Verificado" },
    ],
    historial: [
      { id: 1, fecha: "20/03/2023 14:20", accion: "Registro inicial", usuario: "Sistema" },
      { id: 2, fecha: "21/03/2023 09:45", accion: "Carga de documentación", usuario: "María González" },
      { id: 3, fecha: "22/03/2023 11:30", accion: "Proveedor aprobado", usuario: "Contabilidad" },
    ],
  },
}

export default function DetalleProveedorPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = Number.parseInt(resolvedParams.id)
  const router = useRouter()

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

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Detalle del Proveedor</h1>
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
                      : proveedor.estado === "Inactivo"
                        ? "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-100"
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
                  <p className="mt-1">{proveedor.cuitCuil}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nombre de Fantasía</h3>
                  <p className="mt-1">{proveedor.nombreFantasia}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Naturaleza de Organización</h3>
                  <p className="mt-1">{proveedor.naturalezaOrganizacion}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tipo Societario</h3>
                  <p className="mt-1">{proveedor.tipoSocietario}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Última Actividad</h3>
                  <p className="mt-1">{proveedor.ultimaActividad}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Convenio Multilateral</h3>
                  <Badge variant="outline" className={proveedor.convenioMultilateral === "Sí" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {proveedor.convenioMultilateral}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Exenciones Impositivas</h3>
                  <Badge variant="outline" className={proveedor.exencionesImpositivas === "Sí" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                    {proveedor.exencionesImpositivas}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fecha de Alta</h3>
                  <p className="mt-1">{proveedor.fechaAlta}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Calificación</h3>
                  <Badge
                    variant="outline"
                    className={
                      proveedor.calificacion === "Proveedor A"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : proveedor.calificacion === "Proveedor B"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    }
                  >
                    {proveedor.calificacion}
                  </Badge>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Categorías Comerciales</h3>
                <div className="space-y-2">
                  {proveedor.categoriasComerciales.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {cat.categoria}
                      </Badge>
                      <span className="text-gray-400">→</span>
                      <Badge variant="outline" className="bg-gray-100 text-gray-800">
                        {cat.subcategoria}
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
              {proveedor.direcciones.map((direccion, idx) => (
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
                  <p className="mt-1">{proveedor.nombreContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cargo</h3>
                  <p className="mt-1">{proveedor.cargoContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                  <p className="mt-1">{proveedor.telefonoContacto}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{proveedor.emailContacto}</p>
                </div>
                <div className="md:col-span-2">
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
                  <h3 className="text-sm font-medium text-gray-500">Número de Cuenta</h3>
                  <p className="mt-1">{proveedor.cuentaBancaria}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">CBU</h3>
                  <p className="mt-1">{proveedor.cbu}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Alias</h3>
                  <p className="mt-1">{proveedor.alias}</p>
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
                        {proveedor.documentos.map((doc: any) => (
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
                    {proveedor.historial.map((item) => (
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
        </div>
      </div>
    </div>
  )
}

