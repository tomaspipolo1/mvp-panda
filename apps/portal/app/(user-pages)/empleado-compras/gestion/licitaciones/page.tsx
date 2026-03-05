import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, FileText, Filter, Plus, Search } from "lucide-react"

export default function LicitacionesCompras() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Gestión de Licitaciones</h1>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva Licitación
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Buscar licitaciones por número, título, proveedor..." className="pl-10" />
        </div>
      </div>

      <Tabs defaultValue="activas" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="activas">Activas</TabsTrigger>
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="adjudicadas">Adjudicadas</TabsTrigger>
          <TabsTrigger value="finalizadas">Finalizadas</TabsTrigger>
          <TabsTrigger value="todas">Todas</TabsTrigger>
        </TabsList>

        <TabsContent value="activas" className="mt-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Número
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Publicación
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Cierre
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Oferentes
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      numero: "LIC-2024-001",
                      titulo: "Adquisición de Grúas Portuarias",
                      fechaPublicacion: "10/01/2024",
                      fechaCierre: "10/02/2024",
                      estado: "En evaluación",
                      oferentes: 5,
                    },
                    {
                      numero: "LIC-2024-002",
                      titulo: "Mantenimiento de Infraestructura",
                      fechaPublicacion: "15/01/2024",
                      fechaCierre: "15/02/2024",
                      estado: "Recepción de ofertas",
                      oferentes: 3,
                    },
                    {
                      numero: "LIC-2023-056",
                      titulo: "Servicios de Seguridad y Vigilancia",
                      fechaPublicacion: "15/12/2023",
                      fechaCierre: "20/01/2024",
                      estado: "Consultas",
                      oferentes: 7,
                    },
                    {
                      numero: "LIC-2023-055",
                      titulo: "Equipamiento Informático",
                      fechaPublicacion: "10/12/2023",
                      fechaCierre: "15/01/2024",
                      estado: "En evaluación",
                      oferentes: 4,
                    },
                  ].map((licitacion, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-plp-accent">
                        {licitacion.numero}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{licitacion.titulo}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {licitacion.fechaPublicacion}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{licitacion.fechaCierre}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <Badge
                          variant="outline"
                          className={
                            licitacion.estado === "En evaluación"
                              ? "bg-blue-50 text-blue-700 border-blue-300"
                              : licitacion.estado === "Recepción de ofertas"
                                ? "bg-green-50 text-green-700 border-green-300"
                                : "bg-amber-50 text-amber-700 border-amber-300"
                          }
                        >
                          {licitacion.estado}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-center">{licitacion.oferentes}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        <div className="flex justify-center space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Ver detalle">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Ver documentos">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pendientes" className="mt-0">
          <Card className="p-8 text-center">
            <h3 className="text-xl font-medium text-gray-500">No hay licitaciones pendientes</h3>
          </Card>
        </TabsContent>

        <TabsContent value="adjudicadas" className="mt-0">
          <Card className="p-8 text-center">
            <h3 className="text-xl font-medium text-gray-500">
              Seleccione esta pestaña para ver licitaciones adjudicadas
            </h3>
          </Card>
        </TabsContent>

        <TabsContent value="finalizadas" className="mt-0">
          <Card className="p-8 text-center">
            <h3 className="text-xl font-medium text-gray-500">
              Seleccione esta pestaña para ver licitaciones finalizadas
            </h3>
          </Card>
        </TabsContent>

        <TabsContent value="todas" className="mt-0">
          <Card className="p-8 text-center">
            <h3 className="text-xl font-medium text-gray-500">
              Seleccione esta pestaña para ver todas las licitaciones
            </h3>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
