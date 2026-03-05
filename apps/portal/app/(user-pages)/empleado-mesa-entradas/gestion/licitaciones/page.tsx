import { Search, Filter, Download, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LicitacionesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Licitaciones</h1>
        <p className="text-muted-foreground">
          Administra las licitaciones recibidas en Mesa de Entradas.
        </p>
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar licitaciones..." className="pl-8" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>
      
      <Tabs defaultValue="activas">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activas">Activas</TabsTrigger>
          <TabsTrigger value="cerradas">Cerradas</TabsTrigger>
          <TabsTrigger value="adjudicadas">Adjudicadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activas">
          <Card>
            <CardHeader>
              <CardTitle>Licitaciones Activas</CardTitle>
              <CardDescription>
                Licitaciones en curso que están recibiendo ofertas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº Licitación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objeto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Publicación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Cierre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { numero: "LIC-2023-0012", objeto: "Adquisición de equipos informáticos", fechaPublicacion: "01/05/2023", fechaCierre: "31/05/2023", presupuesto: "$5,000,000.00", estado: "Activa" },
                      { numero: "LIC-2023-0011", objeto: "Servicio de mantenimiento de grúas", fechaPublicacion: "25/04/2023", fechaCierre: "25/05/2023", presupuesto: "$12,000,000.00", estado: "Activa" },
                      { numero: "LIC-2023-0010", objeto: "Obra de ampliación de muelle", fechaPublicacion: "20/04/2023", fechaCierre: "20/05/2023", presupuesto: "$50,000,000.00", estado: "Activa" },
                    ].map((licitacion, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{licitacion.numero}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.objeto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.fechaPublicacion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.fechaCierre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.presupuesto}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {licitacion.estado}
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
        
        <TabsContent value="cerradas">
          <Card>
            <CardHeader>
              <CardTitle>Licitaciones Cerradas</CardTitle>
              <CardDescription>
                Licitaciones que han finalizado el período de recepción de ofertas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº Licitación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objeto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Publicación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Cierre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ofertas Recibidas</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { numero: "LIC-2023-0009", objeto: "Servicio de seguridad", fechaPublicacion: "15/03/2023", fechaCierre: "15/04/2023", ofertas: "5", estado: "Cerrada" },
                      { numero: "LIC-2023-0008", objeto: "Adquisición de vehículos", fechaPublicacion: "10/03/2023", fechaCierre: "10/04/2023", ofertas: "3", estado: "Cerrada" },
                    ].map((licitacion, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{licitacion.numero}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.objeto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.fechaPublicacion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.fechaCierre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.ofertas}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            {licitacion.estado}
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
        
        <TabsContent value="adjudicadas">
          <Card>
            <CardHeader>
              <CardTitle>Licitaciones Adjudicadas</CardTitle>
              <CardDescription>
                Licitaciones que han sido adjudicadas a un proveedor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº Licitación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objeto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Publicación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Adjudicación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor Adjudicado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { numero: "LIC-2023-0007", objeto: "Servicio de limpieza", fechaPublicacion: "01/03/2023", fechaAdjudicacion: "15/04/2023", proveedor: "Servicios Integrales S.A.", monto: "$3,500,000.00", estado: "Adjudicada" },
                      { numero: "LIC-2023-0006", objeto: "Mantenimiento de instalaciones", fechaPublicacion: "15/02/2023", fechaAdjudicacion: "01/04/2023", proveedor: "Mantenimiento Portuario S.A.", monto: "$8,200,000.00", estado: "Adjudicada" },
                    ].map((licitacion, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{licitacion.numero}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.objeto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.fechaPublicacion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.fechaAdjudicacion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.proveedor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.monto}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {licitacion.estado}
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
