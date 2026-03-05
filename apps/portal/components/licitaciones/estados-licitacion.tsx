"use client"

import { LockOpen, Lock, FileSearch, Award, CheckCircle, XCircle, Ban, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function EstadosLicitacion() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Estados de Licitación</h2>
        <p className="text-gray-600 mb-6">
          Las licitaciones pasan por diferentes estados durante su ciclo de vida. Cada estado determina las acciones
          permitidas y el nivel de acceso a la información.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estado: Abierta */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Abierta</CardTitle>
              <Badge className="bg-green-100 text-green-800">Abierta</Badge>
            </div>
            <CardDescription>Período inicial de la licitación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start mb-4">
              <LockOpen className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Características:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Permite agregar, quitar y modificar documentación</li>
                  <li>Información encriptada para garantizar seguridad</li>
                  <li>Período de inscripción de proveedores</li>
                  <li>Etapa de preguntas y respuestas</li>
                </ul>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                Este es el estado inicial de una licitación cuando se publica y está disponible para que los proveedores
                se inscriban.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Estado: En Proceso */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">En Proceso</CardTitle>
              <Badge className="bg-blue-100 text-blue-800">En Proceso</Badge>
            </div>
            <CardDescription>
              Después de la fecha límite para inscripción y antes de la apertura de sobres
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start mb-4">
              <Lock className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Características:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>No permite incorporar nueva documentación</li>
                  <li>Información encriptada</li>
                  <li>Período de espera hasta la apertura de sobres</li>
                </ul>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                En este estado, la licitación ya no acepta nuevas inscripciones y se encuentra en espera para la
                apertura de sobres.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Estado: En Evaluación */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">En Evaluación</CardTitle>
              <Badge className="bg-yellow-100 text-yellow-800">En Evaluación</Badge>
            </div>
            <CardDescription>Después de la apertura de sobres y hasta la adjudicación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start mb-4">
              <FileSearch className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Características:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Permite solicitar más información a proveedores</li>
                  <li>Información desencriptada para evaluación</li>
                  <li>Mesa de Entradas recibe notificación para cargar documentación en GDE</li>
                  <li>La información adicional también se incorpora al expediente</li>
                </ul>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                Durante este estado se evalúan las ofertas presentadas y se puede solicitar información adicional a los
                proveedores para aclarar aspectos de sus propuestas.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Estado: Adjudicada */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Adjudicada</CardTitle>
              <Badge className="bg-purple-100 text-purple-800">Adjudicada</Badge>
            </div>
            <CardDescription>Se adjudica a un ganador</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start mb-4">
              <Award className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Características:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Este estado se muestra solo a la empresa ganadora</li>
                  <li>Se puede solicitar más información al proveedor adjudicado</li>
                  <li>Se envía notificación a Mesa de Entradas para incorporar información en el expediente</li>
                </ul>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>La licitación ha sido adjudicada a un proveedor específico que ha resultado ganador del proceso.</p>
            </div>
          </CardContent>
        </Card>

        {/* Estado: Finalizada */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Finalizada</CardTitle>
              <Badge className="bg-gray-100 text-gray-800">Finalizada</Badge>
            </div>
            <CardDescription>Se terminó la obra o servicio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start mb-4">
              <CheckCircle className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Características:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>No se puede subir más documentación</li>
                  <li>No se puede utilizar ese expediente para solicitudes</li>
                  <li>El proceso ha concluido completamente</li>
                </ul>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>La licitación ha concluido y el trabajo o servicio ha sido completado satisfactoriamente.</p>
            </div>
          </CardContent>
        </Card>

        {/* Estado: Perdida */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Perdida</CardTitle>
              <Badge className="bg-orange-100 text-orange-800">Perdida</Badge>
            </div>
            <CardDescription>Estado visible para proveedores no ganadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start mb-4">
              <XCircle className="h-5 w-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Características:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Este estado aparece a los proveedores que no ganaron la licitación</li>
                  <li>Indica que otro proveedor fue seleccionado</li>
                </ul>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                Este estado es visible únicamente para los proveedores que participaron pero no resultaron ganadores.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Estado: Cancelada */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Cancelada</CardTitle>
              <Badge className="bg-red-100 text-red-800">Cancelada</Badge>
            </div>
            <CardDescription>Licitación cancelada por el departamento de Compras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start mb-4">
              <Ban className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Características:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>La licitación ha sido cancelada por el departamento de Compras</li>
                  <li>No se continúa con el proceso</li>
                  <li>Se notifica a todos los proveedores inscritos</li>
                </ul>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                La licitación ha sido cancelada y no se llevará a cabo. Puede deberse a cambios en los requerimientos,
                restricciones presupuestarias u otros motivos administrativos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Diagrama de flujo */}
      <div>
        <h2 className="text-xl font-bold mb-4">Flujo de Estados</h2>
        <p className="text-gray-600 mb-6">
          El siguiente diagrama muestra la progresión típica de estados en una licitación:
        </p>

        <div className="overflow-x-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 min-w-[600px] py-8">
            <div className="flex flex-col items-center">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">Abierta</Badge>
              <p className="text-xs text-gray-500 mt-1">Publicación inicial</p>
            </div>

            <ArrowRight className="h-6 w-6 text-gray-400 mx-2" />

            <div className="flex flex-col items-center">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">En Proceso</Badge>
              <p className="text-xs text-gray-500 mt-1">Cierre de inscripciones</p>
            </div>

            <ArrowRight className="h-6 w-6 text-gray-400 mx-2" />

            <div className="flex flex-col items-center">
              <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">En Evaluación</Badge>
              <p className="text-xs text-gray-500 mt-1">Análisis de ofertas</p>
            </div>

            <ArrowRight className="h-6 w-6 text-gray-400 mx-2" />

            <div className="flex flex-col items-center">
              <div className="flex flex-col gap-2">
                <Badge className="bg-purple-100 text-purple-800 px-4 py-2">Adjudicada</Badge>
                <Badge className="bg-orange-100 text-orange-800 px-4 py-2">Perdida</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Decisión</p>
            </div>

            <ArrowRight className="h-6 w-6 text-gray-400 mx-2" />

            <div className="flex flex-col items-center">
              <Badge className="bg-gray-100 text-gray-800 px-4 py-2">Finalizada</Badge>
              <p className="text-xs text-gray-500 mt-1">Cierre del proceso</p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-sm text-yellow-800">
            <strong>Nota:</strong> Una licitación puede ser cancelada en cualquier momento antes de ser adjudicada,
            pasando directamente al estado "Cancelada".
          </p>
        </div>
      </div>
    </div>
  )
}
