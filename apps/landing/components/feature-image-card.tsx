"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"

export interface FeatureImageCardProps {
  titulo: string
  descripcion: string
  icon: LucideIcon
  items: string[]
  bgTexto: string
  imagen: string
  imagenAlt?: string
  /** "imagen-izq" = imagen a la izquierda, "texto-izq" = texto a la izquierda */
  layout: "imagen-izq" | "texto-izq"
}

export function FeatureImageCard({
  titulo,
  descripcion,
  icon: Icon,
  items,
  bgTexto,
  imagen,
  imagenAlt = "",
  layout,
}: FeatureImageCardProps) {
  const content = (
    <>
      <div className="flex items-center gap-3 mb-3">
        <Icon className="h-6 w-6 text-plp-primary shrink-0" />
        <h4 className="text-xl font-bold text-plp-primary">{titulo}</h4>
      </div>
      <p className="text-plp-gray-700 mb-4 leading-relaxed">{descripcion}</p>
      <ul className="space-y-2">
        {items.map((item, j) => (
          <li key={j} className="text-plp-gray-600 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-plp-primary shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </>
  )

  const imageBlock = (
    <div className="relative w-full md:w-2/5 min-h-[200px] md:min-h-[280px] shrink-0">
      <Image
        src={imagen}
        alt={imagenAlt || titulo}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    </div>
  )

  const textBlock = (orderClass: string) => (
    <div
      className={`flex-1 p-6 md:p-8 flex flex-col justify-center ${orderClass}`}
      style={{ backgroundColor: bgTexto }}
    >
      {content}
    </div>
  )

  const imageBlockRight = (
    <div className="relative w-full md:w-2/5 min-h-[200px] md:min-h-[280px] shrink-0 order-1 md:order-2">
      <Image
        src={imagen}
        alt={imagenAlt || titulo}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    </div>
  )

  return (
    <Card className="overflow-hidden rounded-xl shadow-md border-0 flex flex-col md:flex-row md:min-h-[280px]">
      {layout === "imagen-izq" ? (
        <>
          {imageBlock}
          {textBlock("")}
        </>
      ) : (
        <>
          {textBlock("order-2 md:order-1")}
          {imageBlockRight}
        </>
      )}
    </Card>
  )
}
