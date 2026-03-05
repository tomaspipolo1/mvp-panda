"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter, Printer, Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"

export default function ReportesPage() {
  const [reportType, setReportType] = useState("facturas")
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Reportes</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Seleccionar tipo de reporte</CardTitle>
          <CardDescription>Elija el tipo de reporte que desea generar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="facturas" onValueChange={setReportType} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="facturas">Facturas proveedores</TabsTrigger>
              <TabsTrigger value="ordenes">Órdenes de compra</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Configure los filtros para el reporte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dateRange">Rango de fechas</Label>
              <DatePickerWithRange className="w-full" />
            </div>

            {reportType === "facturas" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="proveedorFilter">Proveedor</Label>
                  <Select>
                    <SelectTrigger id="proveedorFilter">
                      <SelectValue placeholder="Todos los proveedores" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los proveedores</SelectItem>
                      <SelectItem value="aceros">Aceros del Sur S.A.</SelectItem>
                      <SelectItem value="transportes">Transportes Rápidos</SelectItem>
                      <SelectItem value="insumos">Insumos Portuarios</SelectItem>
                      <SelectItem value="maquinaria">Maquinaria Pesada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estadoFilter">Estado</Label>
                  <Select>
                    <SelectTrigger id="estadoFilter">
                      <SelectValue placeholder="Todos los estados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los estados</SelectItem>
                      <SelectItem value="pagada">Pagada</SelectItem>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="vencida">Vencida</SelectItem>
                      <SelectItem value="anulada">Anulada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {reportType === "ordenes" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="proveedorFilter">Proveedor</Label>
                  <Select>
                    <SelectTrigger id="proveedorFilter">
                      <SelectValue placeholder="Todos los proveedores" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los proveedores</SelectItem>
                      <SelectItem value="aceros">Aceros del Sur S.A.</SelectItem>
                      <SelectItem value="transportes">Transportes Rápidos</SelectItem>
                      <SelectItem value="insumos">Insumos Portuarios</SelectItem>
                      <SelectItem value="maquinaria">Maquinaria Pesada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estadoFilter">Estado</Label>
                  <Select>
                    <SelectTrigger id="estadoFilter">
                      <SelectValue placeholder="Todos los estados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los estados</SelectItem>
                      <SelectItem value="aprobada">Aprobada</SelectItem>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="entregada">Entregada</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 sm:flex-initial">
              <Filter className="h-4 w-4 mr-2" />
              Aplicar filtros
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-initial">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={reportType} className="w-full">
        <TabsContent value="facturas" className="mt-0">
          <ReporteFacturas />
        </TabsContent>
        <TabsContent value="ordenes" className="mt-0">
          <ReporteOrdenes />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReporteFacturas() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Reporte de Facturas de Proveedores</CardTitle>
          <CardDescription>Listado de facturas emitidas por proveedores</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº Factura
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimiento
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  numero: "A-0001-00012345",
                  proveedor: "Aceros del Sur S.A.",
                  fecha: "15/01/2024",
                  monto: "$4,750,000",
                  estado: "Pagada",
                  vencimiento: "15/02/2024",
                },
                {
                  numero: "B-0002-00054321",
                  proveedor: "Transportes Rápidos",
                  fecha: "20/01/2024",
                  monto: "$1,250,000",
                  estado: "Pendiente",
                  vencimiento: "20/02/2024",
                },
                {
                  numero: "A-0003-00098765",
                  proveedor: "Insumos Portuarios",
                  fecha: "25/01/2024",
                  monto: "$3,200,000",
                  estado: "Pagada",
                  vencimiento: "25/02/2024",
                },
                {
                  numero: "C-0001-00013579",
                  proveedor: "Maquinaria Pesada",
                  fecha: "01/02/2024",
                  monto: "$12,500,000",
                  estado: "Vencida",
                  vencimiento: "01/03/2024",
                },
                {
                  numero: "A-0002-00024680",
                  proveedor: "Aceros del Sur S.A.",
                  fecha: "05/02/2024",
                  monto: "$8,300,000",
                  estado: "Pendiente",
                  vencimiento: "05/03/2024",
                },
                {
                  numero: "B-0003-00011223",
                  proveedor: "Transportes Rápidos",
                  fecha: "10/02/2024",
                  monto: "$950,000",
                  estado: "Anulada",
                  vencimiento: "10/03/2024",
                },
                {
                  numero: "A-0001-00013456",
                  proveedor: "Insumos Portuarios",
                  fecha: "15/02/2024",
                  monto: "$2,100,000",
                  estado: "Pendiente",
                  vencimiento: "15/03/2024",
                },
              ].map((factura, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{factura.numero}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{factura.proveedor}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{factura.fecha}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{factura.monto}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <Badge
                      className={
                        factura.estado === "Pagada"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : factura.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : factura.estado === "Vencida"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {factura.estado}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{factura.vencimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Mostrando 7 de 120 facturas</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReporteOrdenes() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Reporte de Órdenes de Compra</CardTitle>
          <CardDescription>Listado de órdenes de compra emitidas</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº Orden
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha emisión
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha entrega
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  numero: "OC-2023-156",
                  proveedor: "Aceros del Sur S.A.",
                  fechaEmision: "15/01/2024",
                  monto: "$4,750,000",
                  estado: "Aprobada",
                  fechaEntrega: "15/02/2024",
                },
                {
                  numero: "OC-2023-155",
                  proveedor: "Transportes Rápidos",
                  fechaEmision: "14/01/2024",
                  monto: "$1,250,000",
                  estado: "Pendiente",
                  fechaEntrega: "14/02/2024",
                },
                {
                  numero: "OC-2023-154",
                  proveedor: "Insumos Portuarios",
                  fechaEmision: "10/01/2024",
                  monto: "$3,200,000",
                  estado: "Entregada",
                  fechaEntrega: "10/02/2024",
                },
                {
                  numero: "OC-2023-153",
                  proveedor: "Maquinaria Pesada",
                  fechaEmision: "05/01/2024",
                  monto: "$12,500,000",
                  estado: "Aprobada",
                  fechaEntrega: "05/02/2024",
                },
                {
                  numero: "OC-2023-152",
                  proveedor: "Aceros del Sur S.A.",
                  fechaEmision: "01/01/2024",
                  monto: "$8,300,000",
                  estado: "Entregada",
                  fechaEntrega: "01/02/2024",
                },
                {
                  numero: "OC-2023-151",
                  proveedor: "Transportes Rápidos",
                  fechaEmision: "28/12/2023",
                  monto: "$950,000",
                  estado: "Cancelada",
                  fechaEntrega: "28/01/2024",
                },
                {
                  numero: "OC-2023-150",
                  proveedor: "Insumos Portuarios",
                  fechaEmision: "20/12/2023",
                  monto: "$2,100,000",
                  estado: "Entregada",
                  fechaEntrega: "20/01/2024",
                },
              ].map((orden, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{orden.numero}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{orden.proveedor}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{orden.fechaEmision}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{orden.monto}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <Badge
                      className={
                        orden.estado === "Aprobada"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : orden.estado === "Pendiente"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : orden.estado === "Entregada"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {orden.estado}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{orden.fechaEntrega}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Mostrando 7 de 98 órdenes</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
