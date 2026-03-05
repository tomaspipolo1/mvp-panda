import { Search, Filter, FileText, Download, Eye, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExpedientesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Expedientes</h1>
        <p className="text-muted-foreground">Administra los expedientes recibidos en Mesa de Entradas.</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar expedientes..." className="pl-8" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Nuevo Expediente
        </Button>
      </div>

      <Tabs defaultValue="activos">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activos">Activos</TabsTrigger>
          <TabsTrigger value="en-proceso">En Proceso</TabsTrigger>
          <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
          <TabsTrigger value="archivados">Archivados</TabsTrigger>
        </TabsList>

        <TabsContent value="activos">
          <Card>
            <CardHeader>
              <CardTitle>Expedientes Activos</CardTitle>
              <CardDescription>Expedientes que requieren atención inmediata.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nº Expediente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Asunto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Solicitante
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha Ingreso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        numero: "EXP-2023-00789",
                        asunto: "Solicitud de permiso de obra",
                        solicitante: "Constructora del Puerto S.A.",
                        fecha: "12/05/2023",
                        estado: "Activo",
                      },
                      {
                        numero: "EXP-2023-00788",
                        asunto: "Renovación de contrato de concesión",
                        solicitante: "Terminal Portuaria S.A.",
                        fecha: "11/05/2023",
                        estado: "Activo",
                      },
                      {
                        numero: "EXP-2023-00787",
                        asunto: "Autorización de ingreso de mercadería",
                        solicitante: "Importadora Atlántica",
                        fecha: "10/05/2023",
                        estado: "Activo",
                      },
                      {
                        numero: "EXP-2023-00786",
                        asunto: "Solicitud de reunión con directorio",
                        solicitante: "Asociación de Prácticos",
                        fecha: "09/05/2023",
                        estado: "Activo",
                      },
                      {
                        numero: "EXP-2023-00785",
                        asunto: "Presentación de documentación técnica",
                        solicitante: "Astilleros Unidos",
                        fecha: "08/05/2023",
                        estado: "Activo",
                      },
                    ].map((expediente, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {expediente.numero}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.asunto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.solicitante}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {expediente.estado}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-amber-600">
                              <Clock className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="en-proceso">
          <Card>
            <CardHeader>
              <CardTitle>Expedientes En Proceso</CardTitle>
              <CardDescription>Expedientes que están siendo procesados por las áreas correspondientes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nº Expediente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Asunto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Solicitante
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha Ingreso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Área Actual
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        numero: "EXP-2023-00784",
                        asunto: "Solicitud de ampliación de muelle",
                        solicitante: "Terminal Portuaria S.A.",
                        fecha: "07/05/2023",
                        area: "Infraestructura",
                        estado: "En Proceso",
                      },
                      {
                        numero: "EXP-2023-00783",
                        asunto: "Presentación de plan de seguridad",
                        solicitante: "Seguridad Marítima S.A.",
                        fecha: "06/05/2023",
                        area: "Seguridad",
                        estado: "En Proceso",
                      },
                      {
                        numero: "EXP-2023-00782",
                        asunto: "Solicitud de permiso ambiental",
                        solicitante: "Transportes Marítimos",
                        fecha: "05/05/2023",
                        area: "Medio Ambiente",
                        estado: "En Proceso",
                      },
                    ].map((expediente, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {expediente.numero}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.asunto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.solicitante}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.area}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            {expediente.estado}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finalizados">
          <Card>
            <CardHeader>
              <CardTitle>Expedientes Finalizados</CardTitle>
              <CardDescription>Expedientes que han completado su ciclo de procesamiento.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nº Expediente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Asunto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Solicitante
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha Ingreso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha Finalización
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        numero: "EXP-2023-00780",
                        asunto: "Solicitud de certificado de operación",
                        solicitante: "Naviera del Sur",
                        fecha: "03/05/2023",
                        fechaFin: "10/05/2023",
                        estado: "Finalizado",
                      },
                      {
                        numero: "EXP-2023-00779",
                        asunto: "Presentación de documentación aduanera",
                        solicitante: "Importadora Atlántica",
                        fecha: "02/05/2023",
                        fechaFin: "09/05/2023",
                        estado: "Finalizado",
                      },
                    ].map((expediente, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {expediente.numero}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.asunto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.solicitante}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.fechaFin}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {expediente.estado}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archivados">
          <Card>
            <CardHeader>
              <CardTitle>Expedientes Archivados</CardTitle>
              <CardDescription>Expedientes que han sido archivados para referencia futura.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nº Expediente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Asunto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Solicitante
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha Ingreso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha Archivo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        numero: "EXP-2023-00775",
                        asunto: "Solicitud de permiso de obra",
                        solicitante: "Constructora del Puerto S.A.",
                        fecha: "25/04/2023",
                        fechaArchivo: "05/05/2023",
                        estado: "Archivado",
                      },
                      {
                        numero: "EXP-2023-00770",
                        asunto: "Renovación de contrato de concesión",
                        solicitante: "Terminal Portuaria S.A.",
                        fecha: "20/04/2023",
                        fechaArchivo: "02/05/2023",
                        estado: "Archivado",
                      },
                    ].map((expediente, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {expediente.numero}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.asunto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.solicitante}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expediente.fechaArchivo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            {expediente.estado}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
