"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArchiveIcon, CalendarIcon, Edit2Icon, PlusIcon, SearchIcon } from "lucide-react"

// Datos de ejemplo para los posts
const posts = [
  {
    id: 1,
    title: "Llegada del buque MSC Magnifica a nuestro puerto",
    excerpt:
      "Nos complace anunciar la llegada del buque MSC Magnifica a nuestro puerto. Con 293 metros de eslora, es uno de los cruceros más grandes que hemos recibido este año. ¡Bienvenidos a La Plata!",
    content:
      "Nos complace anunciar la llegada del buque MSC Magnifica a nuestro puerto. Con 293 metros de eslora, es uno de los cruceros más grandes que hemos recibido este año. El crucero, que forma parte de la flota de MSC Cruceros, arribó esta mañana con más de 3,000 pasajeros a bordo, quienes tendrán la oportunidad de conocer nuestra hermosa ciudad y sus alrededores. Este arribo representa un importante impulso para el turismo local y reafirma la posición de Puerto La Plata como un destino clave en las rutas de cruceros internacionales. ¡Bienvenidos a La Plata!",
    image: "/cruise-ship-gathering.png",
    date: "10 de abr de 2023",
    status: "publicado",
  },
  {
    id: 2,
    title: "Nuevo récord de operaciones en el primer trimestre",
    excerpt:
      "Puerto La Plata alcanzó un nuevo récord histórico de operaciones durante el primer trimestre de 2023, con un incremento del 27% respecto al mismo período del año anterior.",
    content:
      "Puerto La Plata alcanzó un nuevo récord histórico de operaciones durante el primer trimestre de 2023, con un incremento del 27% respecto al mismo período del año anterior. Este logro es resultado de las inversiones en infraestructura realizadas en los últimos años y de la implementación de nuevas tecnologías que han permitido optimizar los procesos operativos. El aumento en el volumen de carga se debe principalmente al crecimiento en las exportaciones de productos agrícolas y a la diversificación de las operaciones con nuevos clientes internacionales. Agradecemos a todo el personal del puerto y a las empresas que confían en nuestros servicios por hacer posible este importante hito.",
    image: "/bustling-cargo-hub.png",
    date: "28 de mar de 2023",
    status: "publicado",
  },
  {
    id: 3,
    title: "Inauguración de nueva terminal de contenedores",
    excerpt:
      "Con una inversión de más de 50 millones de dólares, hoy inauguramos la nueva terminal de contenedores que permitirá duplicar nuestra capacidad operativa.",
    content:
      "Con una inversión de más de 50 millones de dólares, hoy inauguramos la nueva terminal de contenedores que permitirá duplicar nuestra capacidad operativa. La ceremonia contó con la presencia de autoridades nacionales, provinciales y municipales, así como representantes de las principales empresas navieras y logísticas del país. La nueva terminal, equipada con tecnología de última generación, incluye tres nuevas grúas pórtico capaces de operar buques de hasta 14,000 TEUs, posicionando a Puerto La Plata como uno de los puertos más modernos de la región. Este proyecto generará más de 200 nuevos puestos de trabajo directos y fortalecerá el rol del puerto como motor de desarrollo económico para toda la región.",
    image: "/bustling-port-opening.png",
    date: "15 de feb de 2023",
    status: "archivado",
  },
  {
    id: 4,
    title: "Programa de capacitación para operadores portuarios",
    excerpt:
      "Lanzamos un nuevo programa de capacitación para operadores portuarios en colaboración con la Universidad Nacional de La Plata, con el objetivo de profesionalizar el sector.",
    content:
      "Lanzamos un nuevo programa de capacitación para operadores portuarios en colaboración con la Universidad Nacional de La Plata, con el objetivo de profesionalizar el sector y mejorar la calidad de los servicios ofrecidos. El programa, que tendrá una duración de seis meses, abordará temas como seguridad portuaria, gestión ambiental, logística internacional y nuevas tecnologías aplicadas a la operación portuaria. Las inscripciones estarán abiertas hasta el 30 de abril y las clases comenzarán en mayo. Esta iniciativa forma parte de nuestro compromiso con el desarrollo profesional de nuestros colaboradores y la mejora continua de nuestros procesos operativos.",
    image: "/port-operations-training.png",
    date: "5 de abr de 2023",
    status: "borrador",
  },
  {
    id: 5,
    title: "Visita de delegación internacional al puerto",
    excerpt:
      "Recibimos la visita de una importante delegación de empresarios y funcionarios de Singapur interesados en establecer nuevas rutas comerciales con nuestro puerto.",
    content:
      "Recibimos la visita de una importante delegación de empresarios y funcionarios de Singapur interesados en establecer nuevas rutas comerciales con nuestro puerto. Durante la jornada, los visitantes recorrieron nuestras instalaciones y mantuvieron reuniones con directivos del puerto y representantes del sector logístico local. La delegación mostró especial interés en las nuevas terminales de contenedores y en las posibilidades de incrementar el intercambio comercial entre ambos países.",
    image: "/international-delegation.png",
    date: "20 de ene de 2023",
    status: "archivado",
  },
]

export default function MisPostPage() {
  const [activeTab, setActiveTab] = useState("publicados")
  const [searchTerm, setSearchTerm] = useState("")

  // Función segura para filtrar posts
  const getFilteredPosts = () => {
    try {
      return posts.filter((post) => {
        // Verificar que el post existe
        if (!post) return false

        // Obtener el status con un valor predeterminado
        const status = post.status || ""

        // Filtrar por pestaña activa
        if (activeTab === "publicados" && status === "publicado") return true
        if (activeTab === "borradores" && status === "borrador") return true
        if (activeTab === "archivados" && status === "archivado") return true

        return false
      })
    } catch (error) {
      console.error("Error al filtrar posts:", error)
      return []
    }
  }

  // Obtener posts filtrados
  const filteredPosts = getFilteredPosts()

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-plp-dark">Mis Posts</h1>
          <Link href="/empleado-prensa/gestion/blog/nuevo-post">
            <Button className="bg-[#001A57] hover:bg-[#00133f] text-white rounded-md flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Nuevo Post
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <Tabs defaultValue="publicados" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="publicados">Publicados</TabsTrigger>
              <TabsTrigger value="borradores">Borradores</TabsTrigger>
              <TabsTrigger value="archivados">Archivados</TabsTrigger>
            </TabsList>

            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar posts..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="publicados" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link href={`/empleado-prensa/gestion/blog/mis-post/${post.id}`} key={post.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt="Post image"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 mr-2">
                          <Image src="/images/plp-logo.png" alt="Puerto La Plata" width={32} height={32} />
                        </div>
                        <span className="font-semibold">Puerto La Plata</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 border-t">
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <span
                            className={
                              post.status === "publicado"
                                ? "bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                                : post.status === "borrador"
                                  ? "bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
                                  : "bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                            }
                          >
                            {post.status === "publicado"
                              ? "Publicado"
                              : post.status === "borrador"
                                ? "Borrador"
                                : "Archivado"}
                          </span>
                          {post.status === "borrador" && (
                            <Button variant="outline" size="sm">
                              <Edit2Icon className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                          )}
                          {post.status === "archivado" && (
                            <Button variant="outline" size="sm">
                              <Edit2Icon className="h-4 w-4 mr-1" />
                              Restaurar
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No se encontraron posts para mostrar.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="borradores" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link href={`/empleado-prensa/gestion/blog/mis-post/${post.id}`} key={post.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt="Post image"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 mr-2">
                          <Image src="/images/plp-logo.png" alt="Puerto La Plata" width={32} height={32} />
                        </div>
                        <span className="font-semibold">Puerto La Plata</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 border-t">
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Borrador</span>
                          <Button variant="outline" size="sm">
                            <Edit2Icon className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No se encontraron borradores.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="archivados" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link href={`/empleado-prensa/gestion/blog/mis-post/${post.id}`} key={post.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt="Post image"
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 mr-2">
                          <Image src="/images/plp-logo.png" alt="Puerto La Plata" width={32} height={32} />
                        </div>
                        <span className="font-semibold">Puerto La Plata</span>
                      </div>
                      <div className="mb-2">
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <ArchiveIcon className="h-3 w-3" />
                          Archivado
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 border-t">
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Archivado</span>
                          <Button variant="outline" size="sm">
                            <Edit2Icon className="h-4 w-4 mr-1" />
                            Restaurar
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No se encontraron posts archivados.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
