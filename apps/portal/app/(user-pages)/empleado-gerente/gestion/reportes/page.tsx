"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Calendar,
  ShoppingCart,
  Ship,
  Anchor,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  BarChart3,
  Clock,
  Download,
  LineChart,
  PieChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

export default function ReportesPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold text-plp-dark">Reportes Gerenciales</h1>
        <p className="text-muted-foreground">Dashboard ejecutivo y reportes detallados</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes de Compra</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">+12 este mes</p>
              <div className="flex items-center text-green-500 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> 8%
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
              <div className="flex flex-col items-center p-1 bg-green-50 rounded">
                <span className="font-semibold text-green-600">98</span>
                <span className="text-[10px]">Completadas</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-yellow-50 rounded">
                <span className="font-semibold text-yellow-600">22</span>
                <span className="text-[10px]">En proceso</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-red-50 rounded">
                <span className="font-semibold text-red-600">8</span>
                <span className="text-[10px]">Pendientes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitas</CardTitle>
            <Calendar className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Este mes</p>
              <div className="flex items-center text-cyan-500 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> 15%
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
              <div className="flex flex-col items-center p-1 bg-cyan-50 rounded">
                <span className="font-semibold text-cyan-600">18</span>
                <span className="text-[10px]">Laborales</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-teal-50 rounded">
                <span className="font-semibold text-teal-600">14</span>
                <span className="text-[10px]">Guiadas</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-indigo-50 rounded">
                <span className="font-semibold text-indigo-600">10</span>
                <span className="text-[10px]">Eventos</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitudes</CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">+8 desde ayer</p>
              <div className="flex items-center text-amber-500 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> 15%
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
              <div className="flex flex-col items-center p-1 bg-green-50 rounded">
                <span className="font-semibold text-green-600">32</span>
                <span className="text-[10px]">Aprobadas</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-amber-50 rounded">
                <span className="font-semibold text-amber-600">18</span>
                <span className="text-[10px]">Pendientes</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-red-50 rounded">
                <span className="font-semibold text-red-600">6</span>
                <span className="text-[10px]">Rechazadas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ocupación de Muelles</CardTitle>
            <Anchor className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Capacidad actual</p>
              <div className="flex items-center text-blue-500 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> 5%
              </div>
            </div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs">
              <span>Muelle Norte: 85%</span>
              <span>Muelle Sur: 72%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-indigo-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buques Ingresados</CardTitle>
            <Ship className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Este mes</p>
              <div className="flex items-center text-indigo-500 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> 12%
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
              <div className="flex flex-col items-center p-1 bg-indigo-50 rounded">
                <span className="font-semibold text-indigo-600">14</span>
                <span className="text-[10px]">Carga</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-purple-50 rounded">
                <span className="font-semibold text-purple-600">8</span>
                <span className="text-[10px]">Cruceros</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-blue-50 rounded">
                <span className="font-semibold text-blue-600">2</span>
                <span className="text-[10px]">Especiales</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos de Emergencia</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$145,800</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Este mes</p>
              <div className="flex items-center text-red-500 text-xs">
                <Clock className="h-3 w-3 mr-1" /> Último: hace 3 días
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              <div className="flex flex-col items-center p-1 bg-red-50 rounded">
                <span className="font-semibold text-red-600">$98,500</span>
                <span className="text-[10px]">Infraestructura</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-orange-50 rounded">
                <span className="font-semibold text-orange-600">$47,300</span>
                <span className="text-[10px]">Equipamiento</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span>Presupuesto mensual: $200,000</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos Menores</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$68,250</div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Este mes</p>
              <div className="flex items-center text-emerald-500 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" /> 3%
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
              <div className="flex flex-col items-center p-1 bg-emerald-50 rounded">
                <span className="font-semibold text-emerald-600">$32,100</span>
                <span className="text-[10px]">Oficina</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-green-50 rounded">
                <span className="font-semibold text-green-600">$24,800</span>
                <span className="text-[10px]">Servicios</span>
              </div>
              <div className="flex flex-col items-center p-1 bg-teal-50 rounded">
                <span className="font-semibold text-teal-600">$11,350</span>
                <span className="text-[10px]">Otros</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span>Presupuesto mensual: $75,000</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList className="bg-muted/80">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">
              Vista General
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
              Analíticas
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-white">
              Reportes
            </TabsTrigger>
          </TabsList>
          <DatePickerWithRange date={undefined} setDate={() => {}} />
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>Tráfico de Buques</CardTitle>
                <CardDescription>Últimos 30 días</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[250px] w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                    {[35, 28, 45, 25, 32, 48, 40, 42, 38, 30, 35, 45].map((height, i) => (
                      <div
                        key={i}
                        className="w-4 bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-sm"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Ship className="h-16 w-16 text-indigo-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>Ocupación de Muelles</CardTitle>
                <CardDescription>Promedio semanal</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[250px] w-full bg-gradient-to-r from-blue-50 to-cyan-50 rounded-md flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-[16px] border-blue-200 relative">
                      <div
                        className="absolute inset-0 border-[16px] border-transparent border-t-blue-500 rounded-full"
                        style={{ transform: "rotate(0deg)" }}
                      ></div>
                      <div
                        className="absolute inset-0 border-[16px] border-transparent border-r-blue-500 rounded-full"
                        style={{ transform: "rotate(0deg)" }}
                      ></div>
                      <div
                        className="absolute inset-0 border-[16px] border-transparent border-b-blue-500 rounded-full"
                        style={{ transform: "rotate(0deg)" }}
                      ></div>
                      <div
                        className="absolute inset-0 border-[16px] border-transparent border-l-blue-500 rounded-full"
                        style={{ transform: "rotate(280deg)" }}
                      ></div>
                    </div>
                    <div className="mt-4 text-2xl font-bold text-blue-500">78%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>Gastos Mensuales</CardTitle>
                <CardDescription>Comparativa</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[250px] w-full bg-gradient-to-r from-emerald-50 to-green-50 rounded-md flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end justify-around px-8 pb-8">
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="h-24 w-12 bg-red-400 rounded-t-md"></div>
                        <div className="h-32 w-12 bg-emerald-400 rounded-t-md"></div>
                      </div>
                      <span className="mt-2 text-xs font-medium">Enero</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="h-36 w-12 bg-red-400 rounded-t-md"></div>
                        <div className="h-24 w-12 bg-emerald-400 rounded-t-md"></div>
                      </div>
                      <span className="mt-2 text-xs font-medium">Febrero</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="h-20 w-12 bg-red-400 rounded-t-md"></div>
                        <div className="h-28 w-12 bg-emerald-400 rounded-t-md"></div>
                      </div>
                      <span className="mt-2 text-xs font-medium">Marzo</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-red-400 mr-1"></div>
                      <span>Emergencia</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-emerald-400 mr-1"></div>
                      <span>Menores</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-2 rounded-md bg-blue-50">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Buque "Stella Maris" atracado en Muelle Norte</p>
                      <p className="text-xs text-muted-foreground">Hace 35 minutos • Operaciones Portuarias</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 rounded-md bg-green-50">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Orden de compra #2458 aprobada</p>
                      <p className="text-xs text-muted-foreground">Hace 2 horas • Departamento de Compras</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 rounded-md bg-red-50">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Gasto de emergencia: Reparación grúa muelle sur
                      </p>
                      <p className="text-xs text-muted-foreground">Hace 4 horas • Mantenimiento</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 rounded-md bg-amber-50">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Solicitud #1258 requiere su aprobación</p>
                      <p className="text-xs text-muted-foreground">Hace 5 horas • Departamento de Operaciones</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Analíticas</CardTitle>
              <CardDescription>Visualización de datos y métricas clave</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-blue-400" />
                </div>
                <p className="mt-4 text-muted-foreground">Contenido de analíticas en desarrollo</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Movimiento Portuario</CardTitle>
                <CardDescription>Análisis de operaciones portuarias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/20">
                  <BarChart3 className="h-8 w-8 text-plp-primary" />
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Download className="mr-2 h-4 w-4" /> Descargar Reporte
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Visitas Registradas</CardTitle>
                <CardDescription>Estadísticas de visitas al puerto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/20">
                  <LineChart className="h-8 w-8 text-plp-primary" />
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Download className="mr-2 h-4 w-4" /> Descargar Reporte
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Solicitudes por Área</CardTitle>
                <CardDescription>Distribución de solicitudes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted/20">
                  <PieChart className="h-8 w-8 text-plp-primary" />
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Download className="mr-2 h-4 w-4" /> Descargar Reporte
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informes Detallados</CardTitle>
              <CardDescription>Reportes completos para análisis en profundidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Informe Mensual de Operaciones",
                  "Análisis de Eficiencia Operativa",
                  "Reporte de Incidencias",
                  "Estadísticas de Tráfico Portuario",
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-plp-primary" />
                      <span>{report}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
