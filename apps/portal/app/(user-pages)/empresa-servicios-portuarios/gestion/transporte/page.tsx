import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Wrench, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function TransportePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Transporte</h1>
        <p className="text-gray-600">Gestiona la flota de vehículos y equipos de transporte</p>
      </div>

      {/* Resumen de Transporte */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehículos</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              En flota
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <Truck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">6</div>
            <p className="text-xs text-muted-foreground">
              Operativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Mantenimiento</CardTitle>
            <Wrench className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">
              En servicio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacidad Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">450t</div>
            <p className="text-xs text-muted-foreground">
              Carga máxima
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Opciones de Transporte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/empresa-servicios-portuarios/gestion/transporte/mis-vehiculos">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Mis Vehículos
              </CardTitle>
              <CardDescription>
                Gestiona la flota de vehículos de tu empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Administra vehículos, mantenimientos, revisiones y documentación de la flota.
              </p>
              <Button variant="outline" className="w-full">
                Ver Vehículos
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Mantenimientos
            </CardTitle>
            <CardDescription>
              Programa y gestiona mantenimientos de vehículos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Planifica mantenimientos preventivos y revisa el historial de servicios.
            </p>
            <Button variant="outline" className="w-full">
              Gestionar Mantenimientos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tipos de Vehículos */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Vehículos en Flota</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Camiones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">3</span>
                <span className="text-sm text-gray-500">unidades</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Camiones de carga pesada para transporte de contenedores y mercaderías.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Remolques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">2</span>
                <span className="text-sm text-gray-500">unidades</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Remolques especializados para diferentes tipos de cargas portuarias.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Grúas Móviles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">3</span>
                <span className="text-sm text-gray-500">unidades</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Grúas móviles para operaciones de carga y descarga en el puerto.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Vehículo
          </Button>
          <Button variant="outline">
            <Wrench className="h-4 w-4 mr-2" />
            Programar Mantenimiento
          </Button>
          <Button variant="outline">
            <Truck className="h-4 w-4 mr-2" />
            Ver Reportes
          </Button>
        </div>
      </div>
    </div>
  )
}
