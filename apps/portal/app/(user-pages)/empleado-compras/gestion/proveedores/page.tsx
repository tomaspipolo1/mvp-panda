import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Building, CheckCircle, Filter, Search, User, XCircle } from "lucide-react"

export default function ProveedoresCompras() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Gestión de Proveedores</h1>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">156</h3>
              <p className="text-sm text-gray-500">Proveedores activos</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Building className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">12</h3>
              <p className="text-sm text-gray-500">Nuevas solicitudes de alta</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">5</h3>
              <p className="text-sm text-gray-500">Proveedores suspendidos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Buscar proveedores por nombre, CUIT, rubro..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Exportar</Button>
          <Button variant="outline">Imprimir</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CUIT
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rubro
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  nombre: "Aceros del Sur S.A.",
                  cuit: "30-71234567-8",
                  rubro: "Metalúrgica",
                  telefono: "+54 221 4567890",
                  email: "contacto@acerosur.com",
                  estado: "Activo",
                },
                {
                  nombre: "Transportes Rápidos",
                  cuit: "30-70987654-3",
                  rubro: "Transporte",
                  telefono: "+54 221 4876543",
                  email: "info@transportesrapidos.com.ar",
                  estado: "Activo",
                },
                {
                  nombre: "Insumos Portuarios SRL",
                  cuit: "30-69876543-2",
                  rubro: "Insumos",
                  telefono: "+54 221 4789012",
                  email: "ventas@insumosportuarios.com",
                  estado: "Suspendido",
                },
                {
                  nombre: "Maquinaria Pesada Argentina",
                  cuit: "30-65432198-7",
                  rubro: "Maquinaria",
                  telefono: "+54 221 4234567",
                  email: "contacto@maquipesada.com.ar",
                  estado: "Activo",
                },
                {
                  nombre: "Tecnología Portuaria SA",
                  cuit: "30-76543210-9",
                  rubro: "Tecnología",
                  telefono: "+54 221 4765432",
                  email: "info@tecnopuertos.com",
                  estado: "Pendiente",
                },
              ].map((proveedor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                      <span className="font-medium text-gray-900">{proveedor.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.cuit}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.rubro}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.telefono}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{proveedor.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <Badge
                      variant="outline"
                      className={
                        proveedor.estado === "Activo"
                          ? "bg-green-50 text-green-700 border-green-300"
                          : proveedor.estado === "Pendiente"
                            ? "bg-amber-50 text-amber-700 border-amber-300"
                            : "bg-red-50 text-red-700 border-red-300"
                      }
                    >
                      {proveedor.estado}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                    <Button variant="link" className="text-plp-accent">
                      Ver detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
