"use client"

import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Video, Images, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { getNoticiaById, NOTICIAS } from "@/lib/noticias-data"

/** Formatea "2025-03-10" -> "10 de marzo 2025" */
function formatFecha(fecha: string): string {
  const d = new Date(fecha + "T12:00:00")
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ]
  return `${d.getDate()} de ${meses[d.getMonth()]} ${d.getFullYear()}`
}

/** Formatea "2025-03-10" -> "10 de mar de 2025" para cards */
function formatFechaShort(fecha: string): string {
  const d = new Date(fecha + "T12:00:00")
  return new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short", year: "numeric" }).format(d)
}

/** Carousel de otras noticias (excluye la actual) */
function OtrasNoticiasCarousel({ currentId }: { currentId: string }) {
  const otras = NOTICIAS.filter((n) => n.id !== currentId)
  if (otras.length === 0) return null

  return (
    <section className="w-full py-10 md:py-14 bg-gray-50 border-t border-plp-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Otras noticias que podrían interesarte</h2>
        <Carousel className="w-full max-w-6xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {otras.map((n) => (
              <CarouselItem key={n.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <Link
                  href={`/comunicacion/noticias/${n.id}`}
                  className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] bg-plp-gray-100">
                    <Image
                      src={n.imagen}
                      alt={n.titulo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {n.fuente === "instagram" && (
                      <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                        Instagram
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-plp-primary mb-2 line-clamp-2">{n.titulo}</h3>
                    <p className="text-plp-gray-700 text-sm mb-3 line-clamp-3 flex-1">{n.descripcion}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="flex items-center gap-1.5 text-xs text-plp-gray-500">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                        {formatFechaShort(n.fecha)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          n.fuente === "instagram"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                            : "bg-plp-primary text-white"
                        }`}
                      >
                        {n.fuente === "instagram" ? "Instagram" : "Noticia"}
                      </span>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-2 border-plp-gray-200 bg-white" />
          <CarouselNext className="border-2 border-plp-gray-200 bg-white" />
        </Carousel>
      </div>
    </section>
  )
}

function DetalleInstagram({ noticia }: { noticia: NonNullable<ReturnType<typeof getNoticiaById>> }) {
  const tieneReelUrl = Boolean(noticia.reelUrl)
  const galeria = noticia.galeria?.length ? noticia.galeria : [noticia.imagen]
  const [conReel, setConReel] = useState(tieneReelUrl)

  return (
    <div className="min-h-screen bg-white">
      {/* Barra: Volver + switch Con reel / Sin reel */}
      <section className="w-full border-b border-plp-gray-200 bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button variant="ghost" size="sm" className="text-plp-primary hover:bg-plp-primary/10 -ml-2" asChild>
              <Link href="/comunicacion/noticias" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a noticias
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <Label htmlFor="modo-reel" className="text-sm font-medium text-plp-gray-700 cursor-pointer flex items-center gap-2">
                <Images className="h-4 w-4" />
                Sin reel
              </Label>
              <Switch
                id="modo-reel"
                checked={conReel}
                onCheckedChange={setConReel}
                disabled={!tieneReelUrl}
              />
              <Label htmlFor="modo-reel" className="text-sm font-medium text-plp-gray-700 cursor-pointer flex items-center gap-2">
                <Video className="h-4 w-4" />
                Con reel
              </Label>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido según modo */}
      {conReel && tieneReelUrl && noticia.reelUrl ? (
        /* Con reel: izquierda = imagen + texto, derecha = reel grande; abajo galería */
        <>
          <section className="w-full bg-gray-100 py-10 md:py-14">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 md:items-start">
                <div className="min-w-0 space-y-8 flex flex-col items-center">
                  <div className="relative w-full max-w-md aspect-[4/3] max-h-[360px] rounded-xl overflow-hidden bg-plp-gray-200 mx-auto">
                    <Image
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                      Instagram
                    </span>
                  </div>
                  <div className="text-plp-gray-700 leading-relaxed space-y-4 w-full max-w-2xl md:mx-0 mx-auto">
                    {noticia.contenido.split("\n\n").map((parrafo, i) => (
                      <p key={i}>{parrafo}</p>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center md:justify-end md:sticky md:top-8">
                  <div className="w-full max-w-[380px] md:max-w-[520px] lg:max-w-[640px] xl:max-w-[800px] aspect-[9/16] rounded-xl overflow-hidden bg-plp-gray-200 shadow-lg flex-shrink-0">
                    <iframe
                      src={noticia.reelUrl}
                      title={`Reel: ${noticia.titulo}`}
                      className="w-full h-full border-0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-10 md:py-14 bg-white border-t border-plp-gray-200">
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Galería de imágenes</h2>
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {galeria.map((src, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                      <Card className="overflow-hidden border border-plp-gray-200 shadow-sm">
                        <div className="relative aspect-[4/3] w-full">
                          <Image src={src} alt={`${noticia.titulo} - ${index + 1}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="border-2 border-plp-gray-200 bg-white" />
                <CarouselNext className="border-2 border-plp-gray-200 bg-white" />
              </Carousel>
            </div>
          </section>
          <OtrasNoticiasCarousel currentId={noticia.id} />
        </>
      ) : (
        /* Sin reel: imagen (4:3 o 3:4), abajo texto, abajo galería */
        <>
          <section className="w-full bg-gray-100 py-10 md:py-14">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl space-y-8">
                <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] max-h-[400px] rounded-xl overflow-hidden bg-plp-gray-200">
                  <Image
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                    Instagram
                  </span>
                </div>
                <div className="text-plp-gray-700 leading-relaxed space-y-4">
                  {noticia.contenido.split("\n\n").map((parrafo, i) => (
                    <p key={i}>{parrafo}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-10 md:py-14 bg-white border-t border-plp-gray-200">
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Galería de imágenes</h2>
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {galeria.map((src, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                      <Card className="overflow-hidden border border-plp-gray-200 shadow-sm">
                        <div className="relative aspect-[4/3] w-full">
                          <Image src={src} alt={`${noticia.titulo} - ${index + 1}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="border-2 border-plp-gray-200 bg-white" />
                <CarouselNext className="border-2 border-plp-gray-200 bg-white" />
              </Carousel>
            </div>
          </section>
          <OtrasNoticiasCarousel currentId={noticia.id} />
        </>
      )}
    </div>
  )
}

function DetalleDefault({ noticia }: { noticia: NonNullable<ReturnType<typeof getNoticiaById>> }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Volver a noticias - debajo del breadcrumb */}
      <div className="w-full border-b border-plp-gray-200 bg-white py-4">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" className="text-plp-primary hover:bg-plp-primary/10 -ml-2" asChild>
            <Link href="/comunicacion/noticias" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a noticias
            </Link>
          </Button>
        </div>
      </div>

      {/* Primera sección: imagen a la izquierda, título + subtítulo + fecha a la derecha */}
      <section className="w-full bg-gray-100 py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative w-full aspect-[4/3] max-h-[400px] rounded-xl overflow-hidden bg-plp-gray-200 order-2 md:order-1">
              <Image
                src={noticia.imagen}
                alt={noticia.titulo}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold bg-plp-primary text-white shadow-sm">
                {noticia.categoria}
              </span>
            </div>
            <div className="flex flex-col justify-center order-1 md:order-2">
              <h1 className="text-2xl md:text-3xl font-bold text-plp-primary mb-3">
                {noticia.titulo}
              </h1>
              <p className="text-plp-gray-600 text-base md:text-lg mb-4">
                {noticia.descripcion}
              </p>
              <div className="flex items-center gap-2 text-plp-gray-600">
                <CalendarDays className="h-4 w-4 shrink-0" />
                <time dateTime={noticia.fecha}>{formatFecha(noticia.fecha)}</time>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segunda sección: cuerpo del post */}
      <article className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <div className="text-plp-gray-700 leading-relaxed space-y-4">
          {noticia.contenido.split("\n\n").map((parrafo, i) => (
            <p key={i} className="mb-4 last:mb-0">
              {parrafo}
            </p>
          ))}
        </div>
      </article>

      {/* Tercera sección: galería de imágenes */}
      <section className="w-full py-10 md:py-14 bg-white border-t border-plp-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Galería de imágenes</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {(noticia.galeria?.length ? noticia.galeria : [noticia.imagen]).map((src, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                  <Card className="overflow-hidden border border-plp-gray-200 shadow-sm">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={src}
                        alt={`${noticia.titulo} - ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-2 border-plp-gray-200 bg-white" />
            <CarouselNext className="border-2 border-plp-gray-200 bg-white" />
          </Carousel>
        </div>
      </section>
      <OtrasNoticiasCarousel currentId={noticia.id} />
    </div>
  )
}

export default function NoticiaDetallePage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : params.id?.[0]

  const noticia = useMemo(() => (id ? getNoticiaById(id) : undefined), [id])

  if (!id || !noticia) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-bold text-plp-primary">Noticia no encontrada</h1>
        <p className="text-plp-gray-600">El id &quot;{id ?? ""}&quot; no corresponde a ninguna noticia.</p>
        <Button asChild variant="outline" className="border-plp-primary text-plp-primary">
          <Link href="/comunicacion/noticias">Volver a noticias</Link>
        </Button>
      </div>
    )
  }

  if (noticia.fuente === "instagram") {
    return <DetalleInstagram noticia={noticia} />
  }

  return <DetalleDefault noticia={noticia} />
}
