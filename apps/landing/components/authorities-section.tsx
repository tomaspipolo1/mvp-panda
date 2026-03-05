"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AuthoritiesCarousel } from "./authorities-carousel"
import { directorio } from "@/lib/authorities-data"

export function AuthoritiesSection() {
  return (
    <section className="py-0">
      <div className="w-full">
        <div className="relative min-h-[600px] py-8" style={{ background: "linear-gradient(to bottom, #131839, #79B5E3)" }}>
          <div className="relative container mx-auto px-4 flex flex-col items-center text-center text-white py-6">
            <h2 className="text-3xl md:text-4xl tracking-wide mb-6">
              Nuestras <span className="text-blue-300">autoridades</span>
            </h2>
            <p className="max-w-4xl text-white/90 mb-8">
              El Consorcio de Gestión del Puerto La Plata cuenta con un directorio integrado por representantes
              del gobierno provincial, los municipios de Berisso, Ensenada y La Plata, y sectores empresariales y sindicales.
            </p>

            <AuthoritiesCarousel authorities={directorio} />

            <div className="mt-6 mb-2">
              <Link href="/institucional/estructura">
                <Button className="bg-[#1B1E4A] hover:bg-[#272C5B] text-white rounded-lg px-8 py-3">
                  Ver estructura
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
