import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, DollarSign, FileText, Truck, Users, Settings } from "lucide-react"
import Link from "next/link"

export default function GestionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gestión</h1>
        <p className="text-gray-600">Administra todos los aspectos de tu empresa de servicios portuarios</p>
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Servicios Activos</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Categorías registradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturación Mensual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.450.000</div>
            <p className="text-xs text-muted-foreground">
              Enero 2024
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehículos Operativos</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6/8</div>
            <p className="text-xs text-muted-foreground">
              En servicio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Módulos de Gestión */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/empresa-servicios-portuarios/gestion/entidad">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Entidad
              </CardTitle>
              <CardDescription>
                Información general de la empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Gestiona datos generales, categorías de servicios, información de contacto y direcciones.
              </p>
              <Button variant="outline" className="w-full">
                Gestionar Entidad
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/empresa-servicios-portuarios/gestion/facturacion">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Facturación
              </CardTitle>
              <CardDescription>
                Gestión financiera y facturación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Administra facturas, cuenta corriente, pagos y reportes financieros.
              </p>
              <Button variant="outline" className="w-full">
                Gestionar Facturación
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/empresa-servicios-portuarios/gestion/solicitudes">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Solicitudes
              </CardTitle>
              <CardDescription>
                Trámites y solicitudes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Crea y gestiona solicitudes, autorizaciones y trámites administrativos.
              </p>
              <Button variant="outline" className="w-full">
                Gestionar Solicitudes
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/empresa-servicios-portuarios/gestion/transporte">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Transporte
              </CardTitle>
              <CardDescription>
                Flota de vehículos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Administra la flota de vehículos, mantenimientos y equipos de transporte.
              </p>
              <Button variant="outline" className="w-full">
                Gestionar Transporte
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Personal
            </CardTitle>
            <CardDescription>
              Gestión de recursos humanos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Administra empleados, permisos, capacitaciones y recursos humanos.
            </p>
            <Button variant="outline" className="w-full">
              Gestionar Personal
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración
            </CardTitle>
            <CardDescription>
                Configuración del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Configura preferencias, notificaciones y parámetros del sistema.
            </p>
            <Button variant="outline" className="w-full">
              Configurar Sistema
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Nueva Solicitud
          </Button>
          <Button variant="outline">
            <DollarSign className="h-4 w-4 mr-2" />
            Ver Cuenta Corriente
          </Button>
          <Button variant="outline">
            <Truck className="h-4 w-4 mr-2" />
            Agregar Vehículo
          </Button>
          <Button variant="outline">
            <Building className="h-4 w-4 mr-2" />
            Actualizar Datos
          </Button>
        </div>
      </div>
    </div>
  )
}
