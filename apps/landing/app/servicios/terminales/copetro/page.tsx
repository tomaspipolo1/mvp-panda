"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ContactoExternoModal } from "@/components/contacto-externo-modal"
import { Separator } from "@/components/ui/separator"
import { 
  Factory,
  Ship,
  Truck,
  Train,
  Globe,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Clock,
  Users,
  Award,
  Leaf,
  Zap,
  ArrowRight,
  TrendingUp,
  Shield,
  Settings,
  Package,
  Warehouse
} from "lucide-react"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const servicios = [
  {
    id: 1,
    titulo: "Distribución de carbón de petróleo",
    descripcion: "Procesamiento y distribución de carbón de petróleo producto de la refinación para mercado interno y exportación.",
    icon: Package,
    caracteristicas: ["Carbón de petróleo", "Mercado interno", "Exportación", "Procesamiento especializado"]
  },
  {
    id: 2,
    titulo: "Terminal de graneles sólidos",
    descripcion: "Operación de terminal especializada en el manejo y almacenamiento de graneles sólidos con tecnología avanzada.",
    icon: Warehouse,
    caracteristicas: ["Almacenamiento seguro", "Cintas transportadoras", "Sistema de carga", "Capacidad 55.000 ton"]
  },
  {
    id: 3,
    titulo: "Abastecimiento industrial",
    descripcion: "Suministro de carbón calcinado a industrias nacionales e internacionales, destacándose Aluar en Puerto Madryn.",
    icon: Factory,
    caracteristicas: ["Carbón calcinado", "Industrias nacionales", "Mercado internacional", "Aluar Puerto Madryn"]
  },
  {
    id: 4,
    titulo: "Gestión ambiental",
    descripcion: "Compromiso con el medio ambiente mediante sistemas de aislamiento y tecnología de vanguardia.",
    icon: Leaf,
    caracteristicas: ["Celda de acopio aislada", "Cintas cubiertas", "Sistema innovador", "Protección ambiental"]
  }
]

const estadisticas = [
  { valor: "115.909", unidad: "m²", descripcion: "Superficie total" },
  { valor: "55.000", unidad: "toneladas", descripcion: "Capacidad de acopio" },
  { valor: "1.200", unidad: "metros", descripcion: "Cintas transportadoras" },
  { valor: "400", unidad: "metros", descripcion: "Muelles Sitios 7 y 8" },
  { valor: "3", unidad: "refinerías", descripcion: "YPF La Plata, YPF Luján, Shell Dock Sud" },
  { valor: "Grupo", unidad: "Oxbow", descripcion: "Operador principal" }
]

const iniciativas = [
  {
    titulo: "Compromiso ambiental",
    descripcion: "Fuerte compromiso con el medio ambiente mediante sistemas de aislamiento y tecnología de vanguardia.",
    icon: Leaf,
    logros: ["Celda de acopio aislada", "Cintas transportadoras cubiertas", "Sistema de carga innovador", "Protección ambiental integral"]
  },
  {
    titulo: "Valor estratégico",
    descripcion: "Posicionamiento estratégico como receptor de carbón de las principales refinerías del país.",
    icon: TrendingUp,
    beneficios: ["Recepción de YPF La Plata", "Recepción de YPF Luján de Cuyo", "Recepción de Shell Dock Sud", "Distribución nacional e internacional"]
  },
  {
    titulo: "Tecnología avanzada",
    descripcion: "Implementación de sistemas tecnológicos de vanguardia para el manejo eficiente de graneles sólidos.",
    icon: Zap,
    logros: ["Sistema de carga de buques", "Cintas transportadoras cubiertas", "Celda de acopio aislada", "Operaciones automatizadas"]
  }
]

const proyectos = [
  {
    titulo: "Expansión de capacidad",
    descripcion: "Ampliación de la capacidad de almacenamiento y procesamiento de carbón de petróleo.",
    fecha: "2024",
    impacto: "55.000 toneladas capacidad"
  },
  {
    titulo: "Modernización de muelles",
    descripcion: "Actualización de los muelles de los Sitios 7 y 8 para optimizar operaciones portuarias.",
    fecha: "2024",
    impacto: "400 metros de muelle"
  },
  {
    titulo: "Sistema de carga innovador",
    descripcion: "Implementación de tecnología de vanguardia para la carga eficiente de buques.",
    fecha: "2024",
    impacto: "Operaciones optimizadas"
  }
]

const COPETRO_TELEFONO = "+54 221 789-0123"
const COPETRO_EMAIL = "contacto@copetro.com.ar"

export default function TerminalesCopetro() {
  const [modalContactoOpen, setModalContactoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <ContactoExternoModal
        open={modalContactoOpen}
        onOpenChange={setModalContactoOpen}
        titulo="Contactar a Copetro"
        telefono={COPETRO_TELEFONO}
        email={COPETRO_EMAIL}
      />

      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
              Terminal de Graneles Sólidos
            </h1>
            <p className="text-lg mb-6" style={{ color: '#1B1E4A', opacity: 0.8 }}>
              Operada por el Grupo Oxbow (Copetro), especializada en la distribución y procesamiento 
              de carbón de petróleo con compromiso ambiental y tecnología de vanguardia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-50"
                style={{ color: '#1B1E4A' }}
                onClick={() => setModalContactoOpen(true)}
              >
                <Phone className="mr-2 h-5 w-5" />
                Contactar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introducción */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-plp-primary mb-6">Copetro - Terminal de Graneles Sólidos</h2>
              <p className="text-lg text-plp-gray-700 mb-6 leading-relaxed">
                El <strong>Grupo Oxbow (Copetro)</strong> opera la terminal del Puerto La Plata dedicada a la distribución 
                y procesamiento de carbón de petróleo producto de la refinación del mismo, con la cual abastece 
                la demanda del mercado interno y exporta el excedente a mercados extranjeros.
              </p>
              <p className="text-plp-gray-700 mb-6 leading-relaxed">
                La firma asume un fuerte compromiso con el medio ambiente, razón por la cual cuenta con una celda 
                de acopio para 55.000 toneladas de materia prima completamente aislada del exterior, más de 1.200 m 
                de cintas transportadoras cubiertas y un innovador sistema de carga de buques.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-700">
                  <Leaf className="mr-1 h-3 w-3" />
                  Compromiso Ambiental
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Award className="mr-1 h-3 w-3" />
                  Tecnología Avanzada
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Package className="mr-1 h-3 w-3" />
                  Graneles Sólidos
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/puerto-plata-satellite.png"
                alt="Terminal Copetro - Puerto La Plata"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm font-medium text-plp-primary">Terminal Copetro</p>
                <p className="text-xs text-plp-gray-600">Grupo Oxbow - Puerto La Plata, Argentina</p>
              </div>
            </div>
          </div>
        </section>

        {/* Conexión con CGPLP */}
        <section className="mb-12">
          <Card className="p-8 bg-gradient-to-r from-plp-primary/5 to-plp-secondary/5 border border-plp-primary/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-plp-primary mb-4">Conexión con el CGPLP</h2>
              <p className="text-plp-gray-700 max-w-3xl mx-auto">
                Copetro opera en estrecha colaboración con el Consorcio de Gestión del Puerto La Plata (CGPLP), 
                coordinando operaciones portuarias, servicios de muelle y desarrollo de infraestructura para garantizar 
                la eficiencia operativa y el crecimiento sostenible del complejo portuario.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Ship className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Operaciones portuarias</h3>
                <p className="text-sm text-plp-gray-600">
                  Coordinación de carga, descarga y servicios auxiliares portuarios especializados en graneles sólidos.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Desarrollo conjunto</h3>
                <p className="text-sm text-plp-gray-600">
                  Proyectos de expansión e inversión en infraestructura portuaria y logística de graneles.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Servicios integrados</h3>
                <p className="text-sm text-plp-gray-600">
                  Oferta de servicios portuarios y logísticos complementarios para la industria de graneles.
                </p>
              </div>
            </div>
          </Card>
        </section>


        {/* Galería de imágenes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-plp-primary mb-6 text-center">Galería</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {["/placeholder.jpg","/placeholder.jpg","/placeholder.jpg","/placeholder.jpg","/placeholder.jpg"].map((src,i)=> (
                <CarouselItem key={i} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-2">
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-plp-gray-200">
                    <img src={src} alt={`Galería ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>
    </div>
  )
}
