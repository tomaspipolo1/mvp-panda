import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export default function GestionSolicitudesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Solicitudes</h1>
        <Link href="/empleado-seguridad/gestion/solicitudes/nueva-solicitud">
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Nueva Solicitud
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mis Solicitudes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todas" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
              <TabsTrigger value="aprobadas">Aprobadas</TabsTrigger>
              <TabsTrigger value="rechazadas">Rechazadas</TabsTrigger>
            </TabsList>

            <TabsContent value="todas">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Número</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tipo</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Estado</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm">SOL-2023-001</td>
                      <td className="py-2 px-4 text-sm">Vacaciones</td>
                      <td className="py-2 px-4 text-sm">2023-05-10</td>
                      <td className="py-2 px-4 text-sm">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Aprobada</span>
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <Button variant="outline" size="sm">
                          Ver Detalle
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm">SOL-2023-002</td>
                      <td className="py-2 px-4 text-sm">Licencia Médica</td>
                      <td className="py-2 px-4 text-sm">2023-04-15</td>
                      <td className="py-2 px-4 text-sm">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pendiente</span>
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <Button variant="outline" size="sm">
                          Ver Detalle
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm">SOL-2023-003</td>
                      <td className="py-2 px-4 text-sm">Permiso Especial</td>
                      <td className="py-2 px-4 text-sm">2023-03-22</td>
                      <td className="py-2 px-4 text-sm">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Rechazada</span>
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <Button variant="outline" size="sm">
                          Ver Detalle
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="pendientes">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Número</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tipo</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Estado</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm">SOL-2023-002</td>
                      <td className="py-2 px-4 text-sm">Licencia Médica</td>
                      <td className="py-2 px-4 text-sm">2023-04-15</td>
                      <td className="py-2 px-4 text-sm">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pendiente</span>
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <Button variant="outline" size="sm">
                          Ver Detalle
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="aprobadas">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Número</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tipo</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Estado</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm">SOL-2023-001</td>
                      <td className="py-2 px-4 text-sm">Vacaciones</td>
                      <td className="py-2 px-4 text-sm">2023-05-10</td>
                      <td className="py-2 px-4 text-sm">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Aprobada</span>
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <Button variant="outline" size="sm">
                          Ver Detalle
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="rechazadas">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Número</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tipo</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Fecha</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Estado</th>
                      <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm">SOL-2023-003</td>
                      <td className="py-2 px-4 text-sm">Permiso Especial</td>
                      <td className="py-2 px-4 text-sm">2023-03-22</td>
                      <td className="py-2 px-4 text-sm">
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Rechazada</span>
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <Button variant="outline" size="sm">
                          Ver Detalle
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
