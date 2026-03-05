"use client"

import Link from "next/link"
import { Calendar, Instagram } from "lucide-react"

/** Items del feed: tipo "instagram" abre detalle Instagram (noticiaId 1 o 10), tipo "noticia" abre detalle estándar. */
const noticias = [
  {
    id: "n1",
    noticiaId: "2",
    titulo: "Nuevo récord en Puerto La Plata",
    contenido: "Hemos superado los 1.2M TEUs operados este año. Gracias a todo el equipo por su dedicación y profesionalismo.",
    imagen: "/social/INICIO_PANEL_TEC 1.jpg",
    fecha: "2024-03-12T14:30:00",
    tipo: "noticia" as const,
  },
  {
    id: "ig1",
    noticiaId: "1",
    titulo: "Amanecer en Puerto La Plata",
    contenido: "Comenzando un nuevo día de operaciones. #PuertoLaPlata #Amanecer #Logística",
    imagen: "/social/port-sunrise.png",
    fecha: "2024-03-08T07:30:00",
    tipo: "instagram" as const,
  },
  {
    id: "ig2",
    noticiaId: "10",
    titulo: "Operaciones nocturnas",
    contenido: "El puerto nunca duerme. Trabajando 24/7 para mantener la cadena logística en movimiento. #PuertoLaPlata #Operaciones #Logística",
    imagen: "/social/colorful-harbor-town.png",
    fecha: "2024-03-06T22:15:00",
    tipo: "instagram" as const,
  },
  {
    id: "ig3",
    noticiaId: "1",
    titulo: "Equipo en acción",
    contenido: "Nuestro equipo trabajando en la descarga de contenedores. Cada día es una nueva oportunidad de superarnos. #PuertoLaPlata #Equipo #Trabajo",
    imagen: "/social/diverse-group-city.png",
    fecha: "2024-03-04T14:30:00",
    tipo: "instagram" as const,
  },
  {
    id: "n3",
    noticiaId: "6",
    titulo: "Acuerdo con Puerto de Rotterdam",
    contenido: "Puerto La Plata se complace en anunciar la firma de un nuevo acuerdo de cooperación con el Puerto de Rotterdam para el intercambio de mejores prácticas en gestión portuaria.",
    imagen: "/social/INICIO_PANEL_MUP 1.jpg",
    fecha: "2024-03-05T11:45:00",
    tipo: "noticia" as const,
  },
  {
    id: "n4",
    noticiaId: "4",
    titulo: "Visita de estudiantes UNLP",
    contenido: "Hoy recibimos la visita de estudiantes de la Universidad Nacional de La Plata. Fue un placer mostrarles nuestras instalaciones y explicarles cómo funcionan las operaciones portuarias.",
    imagen: "/social/Visita-Puerto-LP.jpeg",
    fecha: "2024-03-03T16:20:00",
    tipo: "noticia" as const,
  },
]

// Componente para el feed de noticias
export function SocialFeed() {
  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-AR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-medium text-center text-plp-primary text-bold mb-4">Noticias</h2>
        <p className="text-center text-plp-gray-600 mb-8 max-w-2xl mx-auto">
          Mantente al día con las últimas novedades y anuncios de Puerto La Plata.
        </p>

        {/* Grid de noticias: Instagram → detalle Instagram; Noticia → detalle estándar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {noticias.map((noticia) => (
            <Link
              key={noticia.id}
              href={`/comunicacion/noticias/${noticia.noticiaId}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col cursor-pointer"
            >
              {/* Imagen */}
              <div className="relative h-32">
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="w-full h-full object-cover"
                />
                {noticia.tipo === "instagram" && (
                  <div className="absolute top-2 right-2">
                    <Instagram className="h-5 w-5 text-white bg-black/50 rounded p-1" />
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-plp-primary mb-2 line-clamp-2">
                  {noticia.titulo}
                </h3>
                <p className="text-plp-gray-700 text-sm mb-3 line-clamp-3 flex-1">
                  {noticia.contenido}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center text-xs text-plp-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(noticia.fecha)}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    noticia.tipo === "instagram"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-plp-primary text-white"
                  }`}>
                    {noticia.tipo === "instagram" ? "Instagram" : "Noticia"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Botón para ver más */}
        <div className="mt-8 text-center">
          <a
            href="/comunicacion/noticias"
            className="inline-block bg-plp-primary hover:bg-plp-primary/90 text-white px-6 py-3 rounded-md transition-colors"
          >
            Ver más noticias
          </a>
        </div>
      </div>
    </section>
  )
}
