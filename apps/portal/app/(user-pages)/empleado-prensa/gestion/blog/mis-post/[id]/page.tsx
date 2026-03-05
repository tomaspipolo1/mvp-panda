"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArchiveIcon, CalendarIcon, ChevronLeftIcon, PrinterIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { PencilIcon } from "lucide-react"

// Datos de ejemplo para los posts
const posts = [
  {
    id: 1,
    title: "Llegada del buque MSC Magnifica a nuestro puerto",
    subtitle: "Un hito importante para el turismo y la economía local",
    excerpt:
      "Nos complace anunciar la llegada del buque MSC Magnifica a nuestro puerto. Con 293 metros de eslora, es uno de los cruceros más grandes que hemos recibido este año. ¡Bienvenidos a La Plata!",
    content: `<p>Nos complace anunciar la llegada del buque MSC Magnifica a nuestro puerto. Con 293 metros de eslora, es uno de los cruceros más grandes que hemos recibido este año.</p>
    
    <p>El crucero, que forma parte de la flota de MSC Cruceros, arribó esta mañana con más de 3,000 pasajeros a bordo, quienes tendrán la oportunidad de conocer nuestra hermosa ciudad y sus alrededores.</p>
    
    <p>La llegada de este crucero representa un importante impulso para el turismo local, ya que los pasajeros realizarán diversas actividades en la ciudad, generando un impacto positivo en comercios, restaurantes y sitios turísticos.</p>
    
    <p>Desde Puerto La Plata, hemos preparado un programa especial de bienvenida para los visitantes, que incluye información turística, transporte hacia los principales puntos de interés y actividades culturales.</p>
    
    <p>Este arribo forma parte de la estrategia de posicionamiento de Puerto La Plata como destino de cruceros internacionales, un segmento que ha mostrado un crecimiento sostenido en los últimos años.</p>
    
    <p>Agradecemos a MSC Cruceros por su confianza en nuestras instalaciones y servicios, y reafirmamos nuestro compromiso de seguir trabajando para consolidar a Puerto La Plata como un punto de referencia en el mapa de cruceros de la región.</p>
    
    <p>¡Bienvenidos a La Plata!</p>`,
    image: "/majestic-arrival.png",
    gallery: ["/cruise-disembarkation.png", "/cruise-arrival-celebration.png", "/la-plata-cruise-arrival.png"],
    author: "Departamento de Comunicación",
    date: "10 de abril de 2023",
    publishTime: "09:30",
    category: "Turismo",
    tags: ["Cruceros", "Turismo", "MSC", "Economía local"],
    status: "publicado",
  },
  {
    id: 2,
    title: "Nuevo récord de operaciones en el primer trimestre",
    subtitle: "Crecimiento sostenido en todas las áreas operativas",
    excerpt:
      "Puerto La Plata alcanzó un nuevo récord histórico de operaciones durante el primer trimestre de 2023, con un incremento del 27% respecto al mismo período del año anterior.",
    content: `<p>Puerto La Plata alcanzó un nuevo récord histórico de operaciones durante el primer trimestre de 2023, con un incremento del 27% respecto al mismo período del año anterior.</p>
    
    <p>Este logro es resultado de las inversiones en infraestructura realizadas en los últimos años y de la implementación de nuevas tecnologías que han permitido optimizar los procesos operativos.</p>
    
    <p>El aumento en el volumen de carga se debe principalmente al crecimiento en las exportaciones de productos agrícolas y a la diversificación de las operaciones con nuevos clientes internacionales.</p>
    
    <p>Durante este primer trimestre, se registraron 245 operaciones de buques, un 18% más que en el mismo período de 2022, mientras que el volumen de carga manipulada alcanzó las 2.3 millones de toneladas.</p>
    
    <p>Estos resultados confirman la tendencia de crecimiento que venimos observando en los últimos años y nos posicionan como uno de los puertos más dinámicos de la región.</p>
    
    <p>Agradecemos a todo el personal del puerto y a las empresas que confían en nuestros servicios por hacer posible este importante hito.</p>`,
    image: "/bustling-cargo-hub.png",
    gallery: ["/bustling-docks.png", "/busy-port-loading.png", "/port-traffic-growth.png"],
    author: "Departamento de Estadísticas",
    date: "28 de marzo de 2023",
    publishTime: "11:15",
    category: "Operaciones",
    tags: ["Récord", "Estadísticas", "Crecimiento", "Exportaciones"],
    status: "publicado",
  },
  {
    id: 3,
    title: "Inauguración de nueva terminal de contenedores",
    subtitle: "Un paso decisivo hacia la modernización de nuestras instalaciones",
    excerpt:
      "Con una inversión de más de 50 millones de dólares, hoy inauguramos la nueva terminal de contenedores que permitirá duplicar nuestra capacidad operativa.",
    content: `<p>Con una inversión de más de 50 millones de dólares, hoy inauguramos la nueva terminal de contenedores que permitirá duplicar nuestra capacidad operativa.</p>
    
    <p>La ceremonia contó con la presencia de autoridades nacionales, provinciales y municipales, así como representantes de las principales empresas navieras y logísticas del país.</p>
    
    <p>La nueva terminal, equipada con tecnología de última generación, incluye tres nuevas grúas pórtico capaces de operar buques de hasta 14,000 TEUs, posicionando a Puerto La Plata como uno de los puertos más modernos de la región.</p>
    
    <p>Además, se han construido 25 hectáreas de playas de contenedores y se ha implementado un sistema automatizado de gestión que permitirá reducir los tiempos de operación y mejorar la eficiencia en el manejo de la carga.</p>
    
    <p>Este proyecto, que ha demandado dos años de trabajo, generará más de 200 nuevos puestos de trabajo directos y fortalecerá el rol del puerto como motor de desarrollo económico para toda la región.</p>
    
    <p>La nueva terminal comenzará a operar a plena capacidad a partir de la próxima semana, con la llegada del primer buque portacontenedores de gran porte.</p>`,
    image: "/bustling-port-opening.png",
    gallery: ["/busy-port-cranes.png", "/port-ribbon-cutting.png", "/bustling-port.png"],
    author: "Dirección de Infraestructura",
    date: "15 de febrero de 2023",
    publishTime: "16:45",
    category: "Infraestructura",
    tags: ["Inversiones", "Modernización", "Contenedores", "Empleo"],
    status: "archivado",
  },
  {
    id: 4,
    title: "Programa de capacitación para operadores portuarios",
    subtitle: "Formación continua para la excelencia operativa",
    excerpt:
      "Lanzamos un nuevo programa de capacitación para operadores portuarios en colaboración con la Universidad Nacional de La Plata, con el objetivo de profesionalizar el sector.",
    content: `<p>Lanzamos un nuevo programa de capacitación para operadores portuarios en colaboración con la Universidad Nacional de La Plata, con el objetivo de profesionalizar el sector y mejorar la calidad de los servicios ofrecidos.</p>
    
    <p>El programa, que tendrá una duración de seis meses, abordará temas como seguridad portuaria, gestión ambiental, logística internacional y nuevas tecnologías aplicadas a la operación portuaria.</p>
    
    <p>Las clases serán impartidas por profesores universitarios y profesionales con amplia experiencia en el sector portuario, combinando teoría y práctica para garantizar una formación integral.</p>
    
    <p>Los participantes que completen satisfactoriamente el programa recibirán una certificación conjunta de Puerto La Plata y la Universidad Nacional de La Plata, reconocida a nivel nacional e internacional.</p>
    
    <p>Las inscripciones estarán abiertas hasta el 30 de abril y las clases comenzarán en mayo. Los interesados pueden obtener más información y realizar su inscripción a través de nuestra página web o en las oficinas administrativas del puerto.</p>
    
    <p>Esta iniciativa forma parte de nuestro compromiso con el desarrollo profesional de nuestros colaboradores y la mejora continua de nuestros procesos operativos.</p>`,
    image: "/port-operations-training.png",
    gallery: ["/port-worker-training.png", "/placeholder.svg?key=bvzis", "/placeholder.svg?key=agj0v"],
    author: "Departamento de Recursos Humanos",
    date: "5 de abril de 2023",
    publishTime: "10:00",
    category: "Capacitación",
    tags: ["Formación", "Universidad", "Profesionalización", "Recursos Humanos"],
    status: "borrador",
  },
  {
    id: 5,
    title: "Visita de delegación internacional al puerto",
    subtitle: "Fortaleciendo lazos comerciales con Asia",
    excerpt:
      "Recibimos la visita de una importante delegación de empresarios y funcionarios de Singapur interesados en establecer nuevas rutas comerciales con nuestro puerto.",
    content: `<p>Recibimos la visita de una importante delegación de empresarios y funcionarios de Singapur interesados en establecer nuevas rutas comerciales con nuestro puerto.</p>
    
    <p>Durante la jornada, los visitantes recorrieron nuestras instalaciones y mantuvieron reuniones con directivos del puerto y representantes del sector logístico local.</p>
    
    <p>La delegación mostró especial interés en las nuevas terminales de contenedores y en las posibilidades de incrementar el intercambio comercial entre ambos países.</p>
    
    <p>Esta visita se enmarca en la estrategia de internacionalización de Puerto La Plata y en la búsqueda de nuevos socios comerciales en el continente asiático.</p>
    
    <p>Esperamos que de este encuentro surjan acuerdos concretos que permitan aumentar el volumen de carga y diversificar las operaciones del puerto.</p>`,
    image: "/international-delegation.png",
    gallery: ["/business-meeting.png", "/port-tour.png", "/handshake-agreement.png"],
    author: "Departamento de Relaciones Internacionales",
    date: "20 de enero de 2023",
    publishTime: "14:30",
    category: "Relaciones Internacionales",
    tags: ["Asia", "Comercio Internacional", "Delegaciones", "Acuerdos"],
    status: "archivado",
  },
]

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const postId = Number.parseInt(params.id)

  // Encontrar el post correspondiente al ID
  const post = posts.find((p) => p.id === postId)

  if (!post) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Post no encontrado</h1>
        <Button onClick={() => router.back()}>
          <ChevronLeftIcon className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>
    )
  }

  const handleArchive = () => {
    // En una implementación real, aquí se actualizaría el estado del post a "archivado"
    alert(`Post "${post.title}" archivado correctamente`)
    router.push("/empleado-prensa/gestion/blog/mis-post")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => router.back()} className="mr-4">
          <ChevronLeftIcon className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <h1 className="text-3xl font-bold text-plp-dark flex-grow">Detalle del Post</h1>

        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1" asChild>
            <Link href={`/empleado-prensa/gestion/blog/editar-post/${params.id}`}>
              <PencilIcon className="h-4 w-4" />
              Editar
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1 text-amber-600 hover:text-amber-700"
            onClick={handleArchive}
            disabled={post.status === "archivado"}
          >
            <ArchiveIcon className="h-4 w-4" />
            {post.status === "archivado" ? "Archivado" : "Archivar"}
          </Button>
          <Button variant="outline" className="text-red-500 hover:text-red-700">
            <Trash2Icon className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
          <Button variant="outline">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 mr-3">
              <Image src="/images/plp-logo.png" alt="Puerto La Plata" width={40} height={40} />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Puerto La Plata</h2>
              <div className="flex items-center text-gray-500 text-sm">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>
                  {post.date} • {post.publishTime}
                </span>
              </div>
            </div>
          </div>

          {post.status !== "publicado" && (
            <div className="mb-4">
              <span
                className={
                  post.status === "borrador"
                    ? "bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full"
                    : "bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                }
              >
                {post.status === "borrador" ? "Borrador" : "Archivado"}
              </span>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <h2 className="text-xl text-gray-600 mb-6">{post.subtitle}</h2>

          <div className="relative h-[400px] w-full mb-6">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover rounded-lg" />
          </div>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{post.category}</span>
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {post.gallery && post.gallery.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Galería de imágenes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {post.gallery.map((img, index) => (
                  <div key={index} className="relative h-48">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Imagen ${index + 1} de ${post.title}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-6" />

          <div className="flex justify-between items-center">
            <div>
              <span
                className={
                  post.status === "publicado"
                    ? "bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                    : post.status === "borrador"
                      ? "bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full"
                      : "bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                }
              >
                {post.status === "publicado" ? "Publicado" : post.status === "borrador" ? "Borrador" : "Archivado"}
              </span>
            </div>

            <div className="text-sm text-gray-500">
              <p>Autor: {post.author}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
