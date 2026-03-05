import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, BarChart2, Download, FileText, PieChart, TrendingUp } from "lucide-react"

export default function ReporteriaCompras() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Reportería</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Compras Mensuales</CardTitle>
            <BarChart className="h-4 w-4 text-plp-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78.5M</div>
            <p className="text-xs text-gray-500">+12.5% respecto al mes anterior</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-3.5 w-3.5 mr-2" />
                Descargar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Licitaciones Activas</CardTitle>
            <PieChart className="h-4 w-4 text-plp-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">$245M en procesos activos</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-3.5 w-3.5 mr-2" />
                Descargar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Proveedores Activos</CardTitle>
            <TrendingUp className="h-4 w-4 text-plp-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-500">+3 nuevos este mes</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-3.5 w-3.5 mr-2" />
                Descargar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold">Generar Reportes</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <Select defaultValue="mes">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes">Mes actual</SelectItem>
                <SelectItem value="trimestre">Trimestre actual</SelectItem>
                <SelectItem value="anual">Año actual</SelectItem>
                <SelectItem value="personalizado">Personalizado</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reportes de Compras</CardTitle>
              <CardDescription>Métricas y análisis de adquisiciones</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Compras por período",
                  "Compras por tipo de producto/servicio",
                  "Compras por proveedor",
                  "Evolución de precios",
                  "Ahorro generado",
                ].map((item, index) => (
                  <li key={index} className="flex items-center justify-between border-b pb-2">
                    <span>{item}</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-3.5 w-3.5 mr-2" />
                      PDF
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reportes de Licitaciones</CardTitle>
              <CardDescription>Análisis de procesos licitatorios</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Licitaciones por estado",
                  "Licitaciones por tipo",
                  "Participación de proveedores",
                  "Montos adjudicados",
                  "Tiempos de proceso",
                ].map((item, index) => (
                  <li key={index} className="flex items-center justify-between border-b pb-2">
                    <span>{item}</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-3.5 w-3.5 mr-2" />
                      PDF
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Indicadores de Gestión</CardTitle>
          <CardDescription>Métrica mensual de KPIs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Indicador
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor Actual
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meta
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variación
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tendencia
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    indicador: "Tiempo promedio de proceso de compra",
                    valor: "22 días",
                    meta: "20 días",
                    variacion: "+10%",
                    tendencia: "negativa",
                  },
                  {
                    indicador: "Ahorro en compras",
                    valor: "15.2%",
                    meta: "10%",
                    variacion: "+52%",
                    tendencia: "positiva",
                  },
                  {
                    indicador: "Satisfacción de usuarios internos",
                    valor: "4.2/5",
                    meta: "4.5/5",
                    variacion: "-7%",
                    tendencia: "estable",
                  },
                  {
                    indicador: "Compras realizadas a tiempo",
                    valor: "87%",
                    meta: "95%",
                    variacion: "-8%",
                    tendencia: "negativa",
                  },
                  {
                    indicador: "Ratio de licitaciones exitosas",
                    valor: "92%",
                    meta: "85%",
                    variacion: "+8%",
                    tendencia: "positiva",
                  },
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.indicador}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.valor}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{item.meta}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`${
                          item.tendencia === "positiva"
                            ? "text-green-600"
                            : item.tendencia === "negativa"
                              ? "text-red-600"
                              : "text-amber-600"
                        }`}
                      >
                        {item.variacion}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div
                        className={`px-2 py-1 inline-flex items-center rounded-full text-xs font-medium ${
                          item.tendencia === "positiva"
                            ? "bg-green-100 text-green-800"
                            : item.tendencia === "negativa"
                              ? "bg-red-100 text-red-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {item.tendencia === "positiva" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : item.tendencia === "negativa" ? (
                          <BarChart2 className="h-3 w-3 mr-1 transform rotate-180" />
                        ) : (
                          <BarChart2 className="h-3 w-3 mr-1" />
                        )}
                        {item.tendencia.charAt(0).toUpperCase() + item.tendencia.slice(1)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
