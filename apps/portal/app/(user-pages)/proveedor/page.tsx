import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, FileText, Calendar, CreditCard, User, FileCheck, Package } from "lucide-react"

export default function ProveedorPage() {
  // Datos simulados del proveedor
  const proveedorData = {
    nombre: "Transportes Marítimos S.A.",
    email: "contacto@transportesmaritimos.com",
    tipo: "Proveedor de Servicios",
    direccion: "Av. del Puerto 1250, La Plata",
    telefono: "+54 221 456-7890",
    representante: "Carlos Gutiérrez",
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Tarjeta de perfil */}
      <Card className="mb-8 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Información del usuario */}
            <div className="p-6 flex items-start space-x-4 flex-1">
              <Avatar className="h-20 w-20 border-2 border-gray-200">
                <AvatarFallback className="bg-plp-primary text-white text-xl">
                  {proveedorData.nombre.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-plp-darkest">{proveedorData.nombre}</h2>
                <p className="text-gray-500">{proveedorData.email}</p>
                <p className="text-plp-dark font-medium">{proveedorData.tipo}</p>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-gray-50 p-6 md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Información de contacto</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Building className="h-5 w-5 text-plp-primary mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Dirección principal</p>
                    <p className="text-sm text-gray-600">{proveedorData.direccion}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="h-5 w-5 text-plp-primary mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Representante</p>
                    <p className="text-sm text-gray-600">{proveedorData.representante}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-plp-primary mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tipo de proveedor</p>
                    <p className="text-sm text-gray-600">{proveedorData.tipo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección de servicios */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-plp-darkest mb-4">Servicios</h2>

        <Tabs defaultValue="cuenta-corriente" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger
              value="cuenta-corriente"
              className="py-3 transition-all duration-200 ease-in-out rounded-md
                data-[state=active]:bg-[#002060] data-[state=active]:text-white data-[state=active]:shadow-md
                hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#002060] focus:ring-opacity-50"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Mi Cuenta Corriente</span>
              <span className="md:hidden">Cuenta</span>
            </TabsTrigger>
            <TabsTrigger
              value="solicitudes"
              className="py-3 transition-all duration-200 ease-in-out rounded-md
                data-[state=active]:bg-[#002060] data-[state=active]:text-white data-[state=active]:shadow-md
                hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#002060] focus:ring-opacity-50"
            >
              <FileCheck className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Mis Solicitudes</span>
              <span className="md:hidden">Solicitudes</span>
            </TabsTrigger>
            <TabsTrigger
              value="visitas"
              className="py-3 transition-all duration-200 ease-in-out rounded-md
                data-[state=active]:bg-[#002060] data-[state=active]:text-white data-[state=active]:shadow-md
                hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#002060] focus:ring-opacity-50"
            >
              <Calendar className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Mis Visitas</span>
              <span className="md:hidden">Visitas</span>
            </TabsTrigger>
            <TabsTrigger
              value="facturas"
              className="py-3 transition-all duration-200 ease-in-out rounded-md
                data-[state=active]:bg-[#002060] data-[state=active]:text-white data-[state=active]:shadow-md
                hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#002060] focus:ring-opacity-50"
            >
              <FileText className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Mis Facturas</span>
              <span className="md:hidden">Facturas</span>
            </TabsTrigger>
            <TabsTrigger
              value="licitaciones"
              className="py-3 transition-all duration-200 ease-in-out rounded-md
                data-[state=active]:bg-[#002060] data-[state=active]:text-white data-[state=active]:shadow-md
                hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#002060] focus:ring-opacity-50"
            >
              <FileText className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Mis Licitaciones</span>
              <span className="md:hidden">Licitaciones</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cuenta-corriente" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-plp-darkest mb-4">Mi Cuenta Corriente</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-plp-primary">
                    <p className="text-sm text-blue-700 font-medium">Saldo actual</p>
                    <p className="text-2xl font-bold text-blue-800">$45,320.00</p>
                    <p className="text-xs text-blue-600 mt-1">Actualizado: 18/04/2023</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm text-green-700 font-medium">Facturas en Progreso</p>
                    <p className="text-2xl font-bold text-green-800">5</p>
                    <p className="text-xs text-green-600 mt-1">Total: $18,750.00</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                    <p className="text-sm text-amber-700 font-medium">Factura próxima a vencer</p>
                    <p className="text-2xl font-bold text-amber-800">F-2023-089</p>
                    <p className="text-xs text-amber-600 mt-1">Vence: 25/04/2023</p>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <Link
                    href="/proveedor/gestion/facturacion/cuenta-corriente"
                    className="text-plp-primary hover:text-plp-dark font-medium text-sm"
                  >
                    Ver detalle completo →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="solicitudes" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-plp-darkest mb-4">Mis Solicitudes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Solicitud de acceso a muelle</p>
                      <p className="text-sm text-gray-500">Fecha: 15/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      En proceso
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Solicitud de documentación</p>
                      <p className="text-sm text-gray-500">Fecha: 10/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Aprobada
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Solicitud de cambio de horario</p>
                      <p className="text-sm text-gray-500">Fecha: 05/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      Rechazada
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <Link
                    href="/proveedor/gestion/solicitudes/mis-solicitudes"
                    className="text-[#002060] hover:text-[#00307a] font-medium text-sm"
                  >
                    Ver todas mis solicitudes →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visitas" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-plp-darkest mb-4">Mis Visitas</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Visita #V-2023-045</p>
                      <p className="text-sm text-gray-500">Acceso a Muelle - 22/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      Programada
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Visita #V-2023-038</p>
                      <p className="text-sm text-gray-500">Entrega de Materiales - 15/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Completada
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Visita #V-2023-032</p>
                      <p className="text-sm text-gray-500">Reunión Técnica - 10/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      Cancelada
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <Link
                    href="/proveedor/visitas/mis-visitas"
                    className="text-[#002060] hover:text-[#00307a] font-medium text-sm"
                  >
                    Ver todas mis visitas →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facturas" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-plp-darkest mb-4">Mis Facturas</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Factura #F-2023-089</p>
                      <p className="text-sm text-gray-500">Monto: $5,250.00 - Vence: 30/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                      Pendiente
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Factura #F-2023-076</p>
                      <p className="text-sm text-gray-500">Monto: $3,500.00 - Vence: 25/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                      Pendiente
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Factura #F-2023-064</p>
                      <p className="text-sm text-gray-500">Monto: $4,800.00 - Vencía: 15/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Pagada
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <Link
                    href="/proveedor/gestion/facturacion/facturas"
                    className="text-[#002060] hover:text-[#00307a] font-medium text-sm"
                  >
                    Ver todas mis facturas →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="licitaciones" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-plp-darkest mb-4">Mis Licitaciones</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Mantenimiento Grúas Portuarias</p>
                      <p className="text-sm text-gray-500">Licitación #LIC-2023-089 - Vence: 30/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      En Proceso
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Suministro Equipos Seguridad</p>
                      <p className="text-sm text-gray-500">Licitación #LIC-2023-076 - Vence: 15/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                      En Evaluación
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-[#002060] transition-colors">
                    <div>
                      <p className="font-medium text-plp-darkest">Servicios de Limpieza Industrial</p>
                      <p className="text-sm text-gray-500">Licitación #LIC-2023-064 - Vencía: 05/04/2023</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Adjudicada
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <Link
                    href="/proveedor/gestion/licitaciones/mis-licitaciones"
                    className="text-[#002060] hover:text-[#00307a] font-medium text-sm"
                  >
                    Ver todas mis licitaciones →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sección de estadísticas o información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-plp-darkest mb-4">Documentación Pendiente</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-plp-dark">Certificación ISO 9001</span>
                <span className="text-sm font-medium text-red-500">Vence en 15 días</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-plp-dark">Seguro de Responsabilidad Civil</span>
                <span className="text-sm font-medium text-amber-500">Vence en 45 días</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-plp-dark">Declaración Jurada Anual</span>
                <span className="text-sm font-medium text-green-500">Al día</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-plp-darkest mb-4">Próximas visitas al Puerto La Plata</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-plp-dark">Acceso a Muelle - Terminal 3</span>
                <span className="text-sm text-gray-500">Hoy, 14:30</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-plp-dark">Laboral - Oficinas administrativas</span>
                <span className="text-sm text-gray-500">Mañana, 09:00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-plp-dark">Guiada - Con acceso a muelle</span>
                <span className="text-sm text-gray-500">25/04, 11:15</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
