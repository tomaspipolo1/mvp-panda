"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Ship,
  Sparkles,
  BarChart3,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const celeste = "#CAE6FF"
const indicadoresTecnicos = [
  { titulo: "Indicador 1", descripcion: "Implementamos procesos sistemáticos para identificar oportunidades de mejora y optimizar nuestros servicios portuarios." },
  { titulo: "Indicador 2", descripcion: "Nos enfocamos en entender y superar las expectativas de nuestros clientes, usuarios y partes interesadas." },
  { titulo: "Indicador 3", descripcion: "Identificamos, evaluamos y gestionamos proactivamente los riesgos operativos y ambientales." },
  { titulo: "Indicador 4", descripcion: "Optimizamos nuestros procesos para maximizar la eficiencia y reducir costos operativos." },
]

const caracteristicas = [
  {
    titulo: "Ubicación estratégica",
    descripcion: "Situado en el corazón del corredor bioceánico, conectando el Atlántico con el Pacífico a través de la región central de América del Sur.",
    icon: MapPin,
    beneficios: ["Acceso directo a rutas comerciales", "Conexión multimodal", "Red ferroviaria integrada"],
    bgTexto: "#E1F0FF",
    imagen: "/banner.jpg",
    layout: "imagen-izq" as const,
  },
  {
    titulo: "Infraestructura moderna",
    descripcion: "Equipamiento de última generación con grúas de alta capacidad, sistemas automatizados y tecnología de punta para operaciones eficientes.",
    icon: Ship,
    beneficios: ["Grúas de hasta 65 toneladas", "Sistemas automatizados", "Tecnología RFID"],
    bgTexto: "#F2F2F2",
    imagen: "/social/port-sunrise.png",
    layout: "texto-izq" as const,
  },
  {
    titulo: "Servicios especializados",
    descripcion: "Ofrecemos servicios integrales que incluyen bunkering, reparaciones menores, servicios de remolque y asistencia técnica especializada.",
    icon: Sparkles,
    beneficios: ["Bunkering 24/7", "Reparaciones menores", "Asistencia técnica"],
    bgTexto: "#F2E9F7",
    imagen: "/colorful-harbor-town.png",
    layout: "imagen-izq" as const,
  },
]

const estadisticasCards = [
  { etiqueta: "LONGITUD TOTAL DEL MUELLE", valor: "2.340.000 m" },
  { etiqueta: "CAPACIDAD DE ALMACENAMIENTO", valor: "45.600 tn" },
  { etiqueta: "CANTIDAD DE CONTENEDORES", valor: "92 millones" },
  { etiqueta: "TOTAL DE BUQUES", valor: "1.2K" },
]

const otrasSecciones = [
  { label: "Licitaciones", href: "/licitaciones" },
  { label: "Mapa del puerto", href: "/servicios/vision-comercial/mapa" },
  { label: "Oportunidades", href: "/servicios/vision-comercial/oportunidades" },
  { label: "Tarifario", href: "/servicios/tarifario" },
]

export default function VentajasCompetitivas() {
  return (
    <div className="min-h-screen bg-white">
      {/* ========== SECCIÓN CELESTE: ¿Por qué elegir? + Indicadores técnicos ========== */}
      <div className="w-full py-10 md:py-14" style={{ backgroundColor: celeste }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* ¿Por qué elegir el Puerto La Plata? */}
            <section className="mb-16 md:mb-20">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-4">
                    ¿Por qué elegir el Puerto La Plata?
                  </h2>
                  <p className="text-plp-gray-600 leading-relaxed">
                    Nuestro puerto se destaca por su ubicación estratégica, infraestructura de vanguardia y servicios
                    especializados que garantizan operaciones eficientes y competitivas. Conectamos el mundo a través
                    de una red multimodal que optimiza tiempos y costos para tu negocio.
                  </p>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-video md:aspect-[4/3] bg-plp-gray-200">
                  <Image
                    src="/banner.jpg"
                    alt="Operaciones portuarias Puerto La Plata"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </section>

            {/* Indicadores técnicos — solo líneas verticales, sin tarjeta */}
            <section>
              <h3 className="text-xl md:text-2xl font-bold text-plp-primary mb-8 text-center">
                Indicadores técnicos
              </h3>
              <div className="flex flex-col md:flex-row">
                {indicadoresTecnicos.map((ind, i) => (
                  <div key={i} className="flex flex-1">
                    {i > 0 && (
                      <div className="hidden md:block w-px bg-plp-gray-400 shrink-0 self-stretch" aria-hidden />
                    )}
                    <div className="flex-1 p-4 md:p-6">
                      <h4 className="text-base font-bold text-plp-primary mb-2">{ind.titulo}</h4>
                      <p className="text-sm text-plp-gray-600 leading-relaxed">{ind.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ========== SECCIÓN CARACTERÍSTICAS DESTACADAS (fondo gris) ========== */}
      <div className="w-full py-14 md:py-20 bg-plp-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-plp-primary mb-12 text-center">
            Características destacadas
          </h3>
          <div className="max-w-5xl mx-auto space-y-8">
            {caracteristicas.map((c, i) => (
              <Card
                key={i}
                className="overflow-hidden rounded-xl shadow-md border-0 flex flex-col md:flex-row md:min-h-[280px]"
              >
                {c.layout === "imagen-izq" ? (
                  <>
                    <div className="relative w-full md:w-2/5 min-h-[200px] md:min-h-[280px] shrink-0">
                      <Image src={c.imagen} alt="" fill className="object-cover" sizes="40vw" />
                    </div>
                    <div
                      className="flex-1 p-6 md:p-8 flex flex-col justify-center"
                      style={{ backgroundColor: c.bgTexto }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <c.icon className="h-6 w-6 text-plp-primary shrink-0" />
                        <h4 className="text-xl font-bold text-plp-primary">{c.titulo}</h4>
                      </div>
                      <p className="text-plp-gray-700 mb-4 leading-relaxed">{c.descripcion}</p>
                      <ul className="space-y-2">
                        {c.beneficios.map((b, j) => (
                          <li key={j} className="text-plp-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-plp-primary shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="flex-1 p-6 md:p-8 flex flex-col justify-center order-2 md:order-1"
                      style={{ backgroundColor: c.bgTexto }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <c.icon className="h-6 w-6 text-plp-primary shrink-0" />
                        <h4 className="text-xl font-bold text-plp-primary">{c.titulo}</h4>
                      </div>
                      <p className="text-plp-gray-700 mb-4 leading-relaxed">{c.descripcion}</p>
                      <ul className="space-y-2">
                        {c.beneficios.map((b, j) => (
                          <li key={j} className="text-plp-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-plp-primary shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative w-full md:w-2/5 min-h-[200px] md:min-h-[280px] shrink-0 order-1 md:order-2">
                      <Image src={c.imagen} alt="" fill className="object-cover" sizes="40vw" />
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ========== SECCIÓN ESTADÍSTICAS (celeste) ========== */}
      <div className="w-full py-14 md:py-20" style={{ backgroundColor: celeste }}>
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-plp-primary mb-10 text-center">
            Estadísticas de tráfico y operaciones
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
            {estadisticasCards.map((s, i) => (
              <Card key={i} className="p-6 bg-white rounded-xl shadow-sm text-center border border-plp-gray-200">
                <div className="text-xs font-semibold text-plp-gray-500 uppercase tracking-wide mb-2">
                  {s.etiqueta}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-plp-primary">{s.valor}</div>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/estadisticas">
              <Button className="bg-plp-primary hover:bg-plp-primary-hover text-white">
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver estadísticas completas
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ========== SECCIÓN CTA (bloque oscuro) ========== */}
      <div className="w-full py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-plp-primary border-0 rounded-2xl shadow-xl text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para operar con nosotros?</h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Nuestro equipo comercial está disponible para analizar tus necesidades y encontrar la mejor solución para tu operación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
                      href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta comercial`)}&mensaje=${encodeURIComponent(`Me gustaría contactarlos para consultar sobre una operación portuaria que desearía realizar y recibir más información.`)}`}
                      className="flex-1"
                    >
              <Button size="lg" className="bg-white text-plp-primary hover:bg-gray-100">
                Contactar equipo comercial
              </Button>
            </Link>
            </div>
          </Card>
        </div>
      </div>

      
    </div>
  )
}
