"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Factory, Cpu, Calendar, Radar, Smartphone, Waves, Network } from "lucide-react"

const HERO_DESCRIPCION =
  "Este es un texto generado para digitalización y tecnología."

const cards = [
  {
    id: 1,
    icon: MapPin,
    titulo: "Ubicación estratégica",
    fecha: "10 de marzo 2024",
    descripcion:
      "Situado en el corazón del corredor bioceánico, conectando el Atlántico con el Pacífico a través de la región central de América del Sur.",
    bullets: [
      "Acceso directo a rutas comerciales",
      "Conexión multimodal",
      "Red ferroviaria integrada",
    ],
    imagen: "/banner.jpg",
    imagenAlt: "Puerto - ubicación estratégica",
    textBg: "bg-[#E6F2FC]",
    imageOnLeft: true,
  },
  {
    id: 2,
    icon: Factory,
    titulo: "Infraestructura moderna",
    fecha: "10 de marzo 2024",
    descripcion:
      "Equipamiento de última generación con grúas de alta capacidad, sistemas automatizados y tecnología de punta para operaciones eficientes.",
    bullets: [
      "Grúas de hasta 65 toneladas",
      "Sistemas automatizados",
      "Tecnología RFID",
    ],
    imagen: "/social/DSC04672.JPG",
    imagenAlt: "Puerto - infraestructura",
    textBg: "bg-gray-100",
    imageOnLeft: false,
  },
  {
    id: 3,
    icon: Cpu,
    titulo: "Plataforma integral de operaciones",
    fecha: "10 de marzo 2024",
    descripcion:
      "Unifica la programación de buques, patio y gate en una sola capa cloud, con tableros en tiempo real y APIs para interoperabilidad.",
    bullets: ["SaaS", "APIs", "Realtime"],
    imagen: "/social/Visita-Puerto-LP.jpeg",
    imagenAlt: "Puerto - operaciones",
    textBg: "bg-gray-100",
    imageOnLeft: true,
  },
  {
    id: 4,
    icon: Radar,
    titulo: "Sensorización IoT del frente de atraque",
    fecha: "10 de marzo 2024",
    descripcion:
      "Red de sensores para condiciones meteo-oceánicas, ocupación de muelles, vibración y estado de defensas.",
    bullets: ["IoT", "Edge", "Mantenimiento"],
    imagen: "/colorful-harbor-town.png",
    imagenAlt: "Puerto - sensores",
    textBg: "bg-[#E6F2FC]",
    imageOnLeft: false,
  },
  {
    id: 5,
    icon: Smartphone,
    titulo: "Aplicativo móvil para transportistas",
    fecha: "10 de marzo 2024",
    descripcion:
      "Turnos, pre-gate, avisos y seguimiento de cargas con notificaciones y credenciales digitales.",
    bullets: ["Mobile", "Turnos", "UX"],
    imagen: "/social/port-sunrise.png",
    imagenAlt: "Puerto - app móvil",
    textBg: "bg-gray-100",
    imageOnLeft: true,
  },
  {
    id: 6,
    icon: Waves,
    titulo: "Gemelo digital del puerto",
    fecha: "10 de marzo 2024",
    descripcion:
      "Modelo 3D con datos en vivo para simular escenarios, flujos y capacidad en picos de demanda.",
    bullets: ["Digital Twin", "Simulación"],
    imagen: "/banner.jpg",
    imagenAlt: "Puerto - gemelo digital",
    textBg: "bg-[#E6F2FC]",
    imageOnLeft: false,
  },
  {
    id: 7,
    icon: Network,
    titulo: "Interoperabilidad con organismos",
    fecha: "10 de marzo 2024",
    descripcion:
      "Mensajería estandarizada para Prefectura, Aduana y terminales. Menos papeles, más trazabilidad.",
    bullets: ["EDI", "Integraciones"],
    imagen: "/social/DSC04672.JPG",
    imagenAlt: "Puerto - interoperabilidad",
    textBg: "bg-gray-100",
    imageOnLeft: true,
  },
]

export default function DigitalizacionTecnologia() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero / intro — fondo celeste */}
      <section className="w-full bg-[#E6F7FE] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Digitalización y tecnología
            </h1>
            <p className="mt-3 text-gray-700 leading-relaxed">
              {HERO_DESCRIPCION}
            </p>
          </div>
        </div>
      </section>

      {/* Cards horizontales — imagen y texto alternando de lado (compactas) */}
      <section className="w-full py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-4">
            {cards.map((c) => {
              const Icon = c.icon
              return (
                <Card
                  key={c.id}
                  className="overflow-hidden rounded-lg border border-gray-200 shadow-sm"
                >
                  <div
                    className={`grid md:grid-cols-2 gap-0 ${c.imageOnLeft ? "" : "md:grid-flow-dense"}`}
                  >
                    {/* Imagen */}
                    <div
                      className={`relative aspect-[16/10] md:aspect-auto md:min-h-[180px] md:h-full ${c.imageOnLeft ? "" : "md:col-start-2"}`}
                    >
                      <Image
                        src={c.imagen}
                        alt={c.imagenAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {/* Texto */}
                    <div
                      className={`p-4 md:p-5 flex flex-col justify-center ${c.textBg} ${c.imageOnLeft ? "" : "md:col-start-1 md:row-start-1"}`}
                    >
                      <Icon className="h-5 w-5 text-gray-800 mb-2" />
                      <h2 className="text-lg font-bold text-gray-900 mb-0.5">
                        {c.titulo}
                      </h2>
                      <p className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                        <Calendar className="h-3.5 w-3.5" />
                        {c.fecha}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        {c.descripcion}
                      </p>
                      <ul className="list-disc list-inside text-gray-700 text-xs space-y-0.5">
                        {c.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Banner (card) — gradiente azul, CTA */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-4xl overflow-hidden rounded-2xl border-0 bg-gradient-to-r from-sky-200/90 via-sky-100 to-sky-200/90 py-8 px-6 text-center shadow-sm md:py-10 md:px-10">
            <h2 className="text-lg font-bold text-gray-900 md:text-xl max-w-2xl mx-auto leading-snug">
              ¿Tenés una propuesta de innovación<br />aplicable para el Puerto La Plata?
            </h2>
            <Link
              href={`/contacto?tipoConsulta=sistemas&asunto=${encodeURIComponent(`Proyecto de innovación para el Puerto`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos debido a que me gustaría presentar una propuesta de innovación para el Puerto La Plata.`)}`}
            >
              <Button
                className="mt-5 bg-plp-primary hover:bg-plp-primary/90 text-white rounded-lg px-6 text-sm"
              >Postular solución
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  )
}
