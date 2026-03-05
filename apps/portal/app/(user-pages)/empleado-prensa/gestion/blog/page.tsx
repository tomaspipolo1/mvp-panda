import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Edit2Icon, EyeIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-plp-dark">Blog y Noticias</h1>
        <Button className="bg-plp-primary hover:bg-plp-dark">
          <PlusIcon className="h-4 w-4 mr-2" />
          Nueva Publicación
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gestión de Publicaciones</CardTitle>
              <CardDescription>Administra todas las publicaciones del blog corporativo</CardDescription>
            </div>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar publicaciones..." className="pl-10 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="publicados">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="publicados">Publicados</TabsTrigger>
              <TabsTrigger value="borradores">Borradores</TabsTrigger>
              <TabsTrigger value="programados">Programados</TabsTrigger>
            </TabsList>

            <TabsContent value="publicados">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">Inauguración de la nueva sede corporativa</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                        <span>Publicado: 5 de Mayo, 2023</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mr-2">
                          Corporativo
                        </span>
                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Sostenibilidad
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit2Icon className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="borradores">
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">Borrador: Nuevas políticas de sostenibilidad</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                        <span>Última edición: 10 de Mayo, 2023</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full mr-2">
                          Borrador
                        </span>
                        <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Sostenibilidad
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2Icon className="h-4 w-4 mr-1" />
                        Continuar edición
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="programados">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">Anuncio de resultados trimestrales</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                      <span>Programado para: 20 de Mayo, 2023</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full mr-2">
                        Programado
                      </span>
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Finanzas
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit2Icon className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-sm text-gray-500">Mostrando 3 de 24 publicaciones</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
