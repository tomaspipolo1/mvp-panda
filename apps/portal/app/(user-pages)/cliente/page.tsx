"use client"

import { useState } from "react"
import Link from "next/link"
import { CreditCard, FileText, Calendar, Building, ArrowRight, User, Package, FileCheck } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClientePage() {
  const [activeTab, setActiveTab] = useState("cuenta-corriente")

  // Datos de ejemplo para el cliente
  const clienteData = {
    nombre: "Y.P.F S.A.",
    email: "rchaves@puertolaplata.com",
    tipo: "Cliente uso navegación",
    direccion: "Av. del Puerto 1250, La Plata",
    representante: "Rodolfo Chaves",
    tipoCliente: "Petroquimica",
  }

  // Datos financieros actualizados
  const financialData = {
    saldoActual: {
      monto: "$1.250.430,75",
      fechaActualizacion: "15/04/2023",
    },
    saldoPendiente: {
      monto: "$345.780,00",
    },
    facturasPendientes: {
      cantidad: 12,
      total: "$345.780,00",
    },
    proximoVencimiento: {
      fecha: "25/04/2023",
      factura: "FC-2023-0458",
    },
  }

  // Solicitudes
  const solicitudes = [
    {
      titulo: "Solicitud de acceso a muelle",
      fecha: "15/04/2023",
      estado: "En proceso",
    },
    {
      titulo: "Solicitud de documentación",
      fecha: "10/04/2023",
      estado: "Aprobada",
    },
    {
      titulo: "Solicitud de cambio de horario",
      fecha: "05/04/2023",
      estado: "Rechazada",
    },
  ]

  // Visitas
  const visitas = [
    {
      id: "V-2023-045",
      descripcion: "Acceso a Muelle",
      fecha: "22/04/2023",
      estado: "Programada",
    },
    {
      id: "V-2023-038",
      descripcion: "Entrega de Materiales",
      fecha: "15/04/2023",
      estado: "Completada",
    },
    {
      id: "V-2023-032",
      descripcion: "Reunión Técnica",
      fecha: "10/04/2023",
      estado: "Cancelada",
    },
  ]

  // Facturas
  const facturas = [
    {
      id: "F-2023-089",
      monto: "$5,250.00",
      vencimiento: "30/04/2023",
      estado: "Pendiente",
    },
    {
      id: "F-2023-076",
      monto: "$3,500.00",
      vencimiento: "25/04/2023",
      estado: "Pendiente",
    },
    {
      id: "F-2023-064",
      monto: "$4,800.00",
      vencimiento: "15/04/2023",
      estado: "Pagada",
    },
  ]

  // Documentación pendiente
  const documentacionPendiente = [
    {
      nombre: "Certificación ISO 9001",
      vencimiento: "15 días",
      estado: "pendiente",
    },
  ]

  // Próximas visitas
  const proximasVisitas = [
    {
      id: "4582",
      lugar: "Terminal 3",
      fecha: "Hoy",
      hora: "14:30",
    },
  ]

  // Función para obtener el color de estado
  const getStatusColor = (estado) => {
    switch (estado.toLowerCase()) {
      case "en proceso":
      case "programada":
        return "bg-blue-100 text-blue-800"
      case "aprobada":
      case "completada":
      case "pagada":
        return "bg-green-100 text-green-800"
      case "rechazada":
      case "cancelada":
      case "pendiente":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Información del cliente */}
      <Card className="mb-8 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Información del usuario */}
            <div className="p-6 flex items-start space-x-4 flex-1">
              <Avatar className="h-20 w-20 border-2 border-gray-200">
                <AvatarFallback className="bg-plp-primary text-white text-xl">
                  {clienteData.nombre.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-plp-darkest">{clienteData.nombre}</h2>
                <p className="text-gray-500">{clienteData.email}</p>
                <p className="text-plp-dark font-medium">{clienteData.tipo}</p>
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
                    <p className="text-sm text-gray-600">{clienteData.direccion}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <User className="h-5 w-5 text-plp-primary mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Representante</p>
                    <p className="text-sm text-gray-600">{clienteData.representante}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-plp-primary mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tipo de proveedor</p>
                    <p className="text-sm text-gray-600">{clienteData.tipoCliente}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Servicios más utilizados - Título */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">Servicios | Más utilizados</h2>

      {/* Servicios más utilizados - Navegación con Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto bg-white border border-gray-200 rounded-lg p-1">
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
        </TabsList>

        {/* Contenido de las pestañas */}
        <TabsContent value="cuenta-corriente" className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Mi Cuenta Corriente</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Saldo actual */}
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-plp-primary">
              <p className="text-sm text-blue-700 font-medium">Saldo actual</p>
              <p className="text-2xl font-bold text-blue-800">{financialData.saldoActual.monto}</p>
              <p className="text-xs text-blue-600 mt-1">Actualizado: {financialData.saldoActual.fechaActualizacion}</p>
            </div>

            {/* Facturas pendientes */}
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
              <p className="text-sm text-amber-700 font-medium">Facturas pendientes</p>
              <p className="text-2xl font-bold text-amber-800">{financialData.facturasPendientes.cantidad}</p>
              <p className="text-xs text-amber-600 mt-1">Monto total: {financialData.facturasPendientes.total}</p>
            </div>

            {/* Factura próxima a vencer */}
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <p className="text-sm text-orange-700 font-medium">Factura próxima a vencer</p>
              <p className="text-2xl font-bold text-orange-800">{financialData.proximoVencimiento.factura}</p>
              <p className="text-xs text-orange-600 mt-1">Vence: {financialData.proximoVencimiento.fecha}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/cliente/gestion/facturacion/cuenta-corriente"
              className="flex items-center text-plp-dark hover:text-plp-darkest"
            >
              <span>Ver detalle completo</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="solicitudes" className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Mis Solicitudes</h3>

          <div className="space-y-4">
            {solicitudes.map((solicitud, index) => (
              <div key={index} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{solicitud.titulo}</p>
                  <p className="text-gray-600">Fecha: {solicitud.fecha}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(solicitud.estado)}`}>
                  {solicitud.estado}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <Link
              href="/cliente/gestion/solicitudes/mis-solicitudes"
              className="flex items-center text-plp-dark hover:text-plp-darkest"
            >
              <span>Ver todas mis solicitudes</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="visitas" className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Mis Visitas</h3>

          <div className="space-y-4">
            {visitas.map((visita, index) => (
              <div key={index} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Visita #{visita.id}</p>
                  <p className="text-gray-600">
                    {visita.descripcion} - {visita.fecha}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(visita.estado)}`}>
                  {visita.estado}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <Link
              href="/cliente/visitas/mis-visitas"
              className="flex items-center text-plp-dark hover:text-plp-darkest"
            >
              <span>Ver todas mis visitas</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="facturas" className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Mis Facturas</h3>

          <div className="space-y-4">
            {facturas.map((factura, index) => (
              <div key={index} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Factura #{factura.id}</p>
                  <p className="text-gray-600">
                    Monto: {factura.monto} - Vence: {factura.vencimiento}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(factura.estado)}`}>
                  {factura.estado}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <Link
              href="/cliente/gestion/facturacion/facturas"
              className="flex items-center text-plp-dark hover:text-plp-darkest"
            >
              <span>Ver todas mis facturas</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      {/* Secciones inferiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Documentación Pendiente */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Documentación Pendiente</h3>

          {documentacionPendiente.length > 0 ? (
            <div className="space-y-4">
              {documentacionPendiente.map((doc, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3">
                  <div className="flex items-start">
                    <FileText className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                    <span>{doc.nombre}</span>
                  </div>
                  <span className="text-red-500">Vence en {doc.vencimiento}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay documentación pendiente.</p>
          )}
        </div>

        {/* Próximas Visitas */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Próximas Entregas</h3>

          {proximasVisitas.length > 0 ? (
            <div className="space-y-4">
              {proximasVisitas.map((visita, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-3">
                  <div className="flex items-start">
                    <Package className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">
                        Entrega #{visita.id} - {visita.lugar}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span>
                      {visita.fecha}, {visita.hora}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay entregas programadas próximamente.</p>
          )}
        </div>
      </div>
    </div>
  )
}
