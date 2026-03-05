import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle, XCircle, Plus } from "lucide-react"
import Link from "next/link"

export default function SolicitudesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Solicitudes</h1>
        <p className="text-gray-600">Gestiona las solicitudes y trámites de tu empresa</p>
      </div>

      {/* Resumen de Solicitudes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Solicitudes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Este año
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">
              Pendientes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">7</div>
            <p className="text-xs text-muted-foreground">
              Completadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rechazadas</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-muted-foreground">
              Rechazadas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Opciones de Solicitudes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/empresa-servicios-portuarios/gestion/solicitudes/mis-solicitudes">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Mis Solicitudes
              </CardTitle>
              <CardDescription>
                Consulta el estado de todas tus solicitudes enviadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Revisa el historial completo, estado y seguimiento de tus solicitudes.
              </p>
              <Button variant="outline" className="w-full">
                Ver Solicitudes
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/empresa-servicios-portuarios/gestion/solicitudes/nueva-solicitud">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Nueva Solicitud
              </CardTitle>
              <CardDescription>
                Crea y envía una nueva solicitud
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Completa el formulario para enviar una nueva solicitud o trámite.
              </p>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Crear Solicitud
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Tipos de Solicitudes */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Solicitudes Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Autorización de Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Solicita autorización para nuevos servicios portuarios o ampliación de servicios existentes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Renovación de Licencia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Renueva licencias y permisos para continuar operando en el puerto.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ampliación de Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Solicita ampliar los servicios a nuevos tipos de buques o cargas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
