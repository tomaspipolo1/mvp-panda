import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  Users,
  Building,
  FileText,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react"

export default function AdminPage() {
  // Datos simulados del administrador
  const adminData = {
    nombre: "Administrador del Sistema",
    email: "admin@plp.com",
    rol: "Administrador Principal",
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Tarjeta de perfil del Admin */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Información del usuario */}
            <div className="p-6 flex items-start space-x-4 flex-1">
              <Avatar className="h-20 w-20 border-2 border-gray-200">
                <AvatarFallback className="bg-plp-primary text-white text-xl">
                  <Shield className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-plp-darkest">{adminData.nombre}</h2>
                <p className="text-gray-500">{adminData.email}</p>
                <p className="text-plp-dark font-medium mt-1">{adminData.rol}</p>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-gray-50 p-6 md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Control Total del Sistema</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Permisos</p>
                    <p className="text-sm text-gray-600">Acceso total al sistema</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-plp-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Gestión</p>
                    <p className="text-sm text-gray-600">Usuarios, proveedores y más</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Activity className="h-5 w-5 text-plp-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Monitoreo</p>
                    <p className="text-sm text-gray-600">Sistema en tiempo real</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas Principales - KPIs */}
      <div>
        <h2 className="text-xl font-bold text-plp-darkest mb-4">Dashboard General</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Usuarios Totales */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium mb-1">Usuarios Totales</p>
                  <p className="text-3xl font-bold text-plp-darkest">1,247</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600 font-medium">+12% este mes</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visitas a la Página del Mes */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium mb-1">Visitas a la Página</p>
                  <p className="text-3xl font-bold text-plp-darkest">15,842</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600 font-medium">+23% este mes</span>
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total de Flujos de Aprobación */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium mb-1">Flujos de Aprobación</p>
                  <p className="text-3xl font-bold text-plp-darkest">128</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600 font-medium">86 completados</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Solicitudes Pendientes */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium mb-1">Solicitudes Pendientes</p>
                  <p className="text-3xl font-bold text-plp-darkest">48</p>
                  <div className="flex items-center mt-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 mr-1" />
                    <span className="text-xs text-amber-600 font-medium">Requieren atención</span>
                  </div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <FileText className="h-8 w-8 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Panel de Gestión - Información Detallada */}
      <div>
        <h2 className="text-xl font-bold text-plp-darkest mb-4">Panel de Gestión</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card Usuarios */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-plp-darkest">Usuarios</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Pendientes validación</span>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                    12
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Activos</span>
                  <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    1,235
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Inactivos (+90 días)</span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                    156
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Proveedores */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-plp-darkest">Proveedores</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Por validar</span>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                    8
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Activos operando</span>
                  <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    342
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Doc. por vencer</span>
                  <span className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                    24
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Solicitudes */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 p-2 rounded-lg mr-3">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-plp-darkest">Solicitudes</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Pendientes revisión</span>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                    48
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Aprobadas hoy</span>
                  <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    23
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rechazadas mes</span>
                  <span className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                    15
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Sistema */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-plp-darkest">Sistema</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center pb-2 border-b border-gray-100">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Servicios operativos</span>
                </div>
                <div className="flex items-center pb-2 border-b border-gray-100">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Sin incidencias</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Backup actualizado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actividad Reciente y Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad Reciente */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-plp-primary mr-2" />
              <h3 className="text-lg font-bold text-plp-darkest">Actividad Reciente</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start py-2 border-b border-gray-100">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-medium">Proveedor aprobado</p>
                  <p className="text-xs text-gray-500 truncate">Logística Express S.A.</p>
                  <p className="text-xs text-gray-400 mt-1">Hace 15 min</p>
                </div>
              </div>
              <div className="flex items-start py-2 border-b border-gray-100">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-medium">Usuario registrado</p>
                  <p className="text-xs text-gray-500 truncate">Juan Pérez - Proveedor</p>
                  <p className="text-xs text-gray-400 mt-1">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-start py-2 border-b border-gray-100">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-medium">Flujo de aprobación completado</p>
                  <p className="text-xs text-gray-500">Solicitud #SOL-2024-156</p>
                  <p className="text-xs text-gray-400 mt-1">Hace 3 horas</p>
                </div>
              </div>
              <div className="flex items-start py-2 border-b border-gray-100">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-medium">Solicitud pendiente</p>
                  <p className="text-xs text-gray-500">Solicitud #SOL-2024-157 requiere revisión</p>
                  <p className="text-xs text-gray-400 mt-1">Hace 4 horas</p>
                </div>
              </div>
              <div className="flex items-start py-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-medium">Visita programada</p>
                  <p className="text-xs text-gray-500">Visita #V-2024-089 confirmada</p>
                  <p className="text-xs text-gray-400 mt-1">Hace 5 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alertas Importantes */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-5 w-5 text-plp-primary mr-2" />
              <h3 className="text-lg font-bold text-plp-darkest">Alertas Importantes</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-800">Alta prioridad</p>
                    <p className="text-xs text-red-600 mt-1">
                      24 documentos de proveedores vencen en menos de 30 días
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-amber-800">Media prioridad</p>
                    <p className="text-xs text-amber-600 mt-1">
                      12 usuarios esperan validación desde hace más de 48h
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-amber-800">Media prioridad</p>
                    <p className="text-xs text-amber-600 mt-1">
                      48 solicitudes pendientes requieren atención
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-800">Sistema operativo</p>
                    <p className="text-xs text-green-600 mt-1">
                      Todos los servicios funcionan correctamente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-plp-darkest mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
              <Users className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Validar Usuarios</span>
              <span className="text-xs text-gray-500 mt-1">12 pendientes</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
              <Building className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Revisar Proveedores</span>
              <span className="text-xs text-gray-500 mt-1">8 por validar</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors group">
              <FileText className="h-8 w-8 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Procesar Solicitudes</span>
              <span className="text-xs text-gray-500 mt-1">48 pendientes</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
              <BarChart3 className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Ver Reportes</span>
              <span className="text-xs text-gray-500 mt-1">Analíticas</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

