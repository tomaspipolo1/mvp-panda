"use client"

import { Card } from "@/components/ui/card"
import { CalendarDays, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Noticia } from "@/lib/noticias-data"

/** Formatea "2025-03-10" -> "10 de marzo 2025" */
function formatFecha(fecha: string): string {
  const d = new Date(fecha + "T12:00:00")
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ]
  return `${d.getDate()} de ${meses[d.getMonth()]} ${d.getFullYear()}`
}

interface NoticiaCardProps {
  noticia: Noticia
  /** Primera noticia del listado: card más ancha (destacada) */
  destacada?: boolean
}

export function NoticiaCard({ noticia, destacada = false }: NoticiaCardProps) {
  return (
    <Card className="overflow-hidden rounded-xl shadow-sm border border-plp-gray-200 bg-white flex flex-col h-full group hover:shadow-md transition-shadow">
      <Link href={`/comunicacion/noticias/${noticia.id}`} className="flex flex-col h-full">
        <div
          className={`relative w-full overflow-hidden bg-plp-gray-100 ${
            destacada ? "aspect-[3/1]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={noticia.imagen}
            alt={noticia.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes={destacada ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
            {noticia.fuente === "instagram" && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                Instagram
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-plp-primary text-white shadow-sm">
              {noticia.categoria}
            </span>
          </div>
        </div>
        <div className={`flex flex-col flex-1 ${destacada ? "p-2.5" : "p-4"}`}>
          <h3 className={`font-bold text-plp-primary line-clamp-2 group-hover:text-plp-secondary transition-colors ${destacada ? "text-sm mb-1" : "text-base mb-2"}`}>
            {noticia.titulo}
          </h3>
          <p className={`text-plp-gray-600 leading-relaxed flex-1 ${destacada ? "text-xs line-clamp-1 mb-1.5" : "text-sm line-clamp-2 mb-4"}`}>
            {noticia.descripcion}
          </p>
          <div className={`flex items-center justify-between gap-2 mt-auto ${destacada ? "gap-1" : ""}`}>
            <span className="flex items-center gap-1.5 text-xs text-plp-gray-500">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              {formatFecha(noticia.fecha)}
            </span>
            <span className="text-sm font-medium text-plp-primary flex items-center gap-1 group-hover:underline">
              Leer más
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </Card>
  )
}
