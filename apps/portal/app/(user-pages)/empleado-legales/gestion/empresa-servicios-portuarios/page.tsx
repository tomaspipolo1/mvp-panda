"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, CheckCircle, AlertTriangle, XCircle, Clock, FileText, Eye } from "lucide-react"
import Link from "next/link"

export default function EmpresaServiciosPortuariosLegales() {
  // Datos de ejemplo para las métricas
  const metricas = {
    total: 12,
    habilitadas: 8,
    pendientes: 2,
    suspendidas: 2
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Gestión de Empresas de Servicios Portuarios</h1>
        <p className="text-gray-600">Panel de control para la gestión de empresas portuarias</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{metricas.habilitadas}</h3>
              <p className="text-sm text-gray-500">Empresas habilitadas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{metricas.pendientes}</h3>
              <p className="text-sm text-gray-500">Pendientes de aprobación</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{metricas.suspendidas}</h3>
              <p className="text-sm text-gray-500">Empresas suspendidas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{metricas.total}</h3>
              <p className="text-sm text-gray-500">Total registradas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Listado */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Listado General</h3>
                <p className="text-gray-600">Ver todas las empresas registradas</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Accede al listado completo de empresas de servicios portuarios con filtros por estado, 
              búsqueda por nombre, CUIT o tipo de servicio.
            </p>
            <div className="flex gap-2">
              <Link href="/empleado-legales/gestion/empresa-servicios-portuarios/listado">
                <Button className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Listado
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Pendientes */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Pendientes de Aprobación</h3>
                <p className="text-gray-600">Gestionar solicitudes pendientes</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Revisa y gestiona las empresas que están esperando aprobación para su inscripción 
              o reinscripción en el sistema.
            </p>
            <div className="flex gap-2">
              <Link href="/empleado-legales/gestion/empresa-servicios-portuarios/pendientes">
                <Button className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Ver Pendientes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Exportar Reporte
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Nueva Empresa
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Ver Alertas
          </Button>
        </div>
      </div>
    </div>
  )
}
