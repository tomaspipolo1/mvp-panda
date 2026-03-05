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
  Warehouse,
  Mountain,
  Construction
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
    titulo: "Extracción de arena",
    descripcion: "Operaciones de extracción y procesamiento de arena para uso industrial y construcción.",
    icon: Mountain,
    caracteristicas: ["Extracción sostenible", "Procesamiento industrial", "Control de calidad", "Logística especializada"]
  },
  {
    id: 2,
    titulo: "Terminal de graneles",
    descripcion: "Operación de terminal especializada en el manejo y almacenamiento de graneles sólidos.",
    icon: Warehouse,
    caracteristicas: ["Almacenamiento seguro", "Cintas transportadoras", "Sistema de carga", "Capacidad optimizada"]
  },
  {
    id: 3,
    titulo: "Suministro industrial",
    descripcion: "Abastecimiento de arena procesada para industrias de construcción y manufactura.",
    icon: Factory,
    caracteristicas: ["Arena industrial", "Industrias nacionales", "Mercado local", "Servicio continuo"]
  },
  {
    id: 4,
    titulo: "Gestión ambiental",
    descripcion: "Compromiso con el medio ambiente mediante prácticas sostenibles y tecnología avanzada.",
    icon: Leaf,
    caracteristicas: ["Prácticas sostenibles", "Control ambiental", "Tecnología verde", "Certificaciones"]
  }
]

const estadisticas = [
  { valor: "TBD", unidad: "m²", descripcion: "Superficie total" },
  { valor: "TBD", unidad: "toneladas", descripcion: "Capacidad de almacenamiento" },
  { valor: "TBD", unidad: "metros", descripcion: "Cintas transportadoras" },
  { valor: "TBD", unidad: "metros", descripcion: "Muelles disponibles" },
  { valor: "TBD", unidad: "clientes", descripcion: "Industrias abastecidas" },
  { valor: "TBD", unidad: "años", descripcion: "Experiencia operativa" }
]

const iniciativas = [
  {
    titulo: "Sostenibilidad ambiental",
    descripcion: "Compromiso con prácticas sostenibles y protección del medio ambiente en todas las operaciones.",
    icon: Leaf,
    logros: ["Extracción responsable", "Control de emisiones", "Gestión de residuos", "Certificaciones ambientales"]
  },
  {
    titulo: "Innovación tecnológica",
    descripcion: "Implementación de tecnología de vanguardia para optimizar procesos y mejorar la eficiencia.",
    icon: Zap,
    logros: ["Automatización de procesos", "Sistemas de control", "Tecnología de monitoreo", "Optimización operativa"]
  },
  {
    titulo: "Desarrollo local",
    descripcion: "Contribución al desarrollo económico local y regional mediante la generación de empleo y servicios.",
    icon: TrendingUp,
    beneficios: ["Generación de empleo", "Desarrollo regional", "Servicios locales", "Integración comunitaria"]
  }
]

const proyectos = [
  {
    titulo: "Expansión de capacidad",
    descripcion: "Ampliación de la capacidad de extracción y procesamiento de arena para satisfacer la demanda creciente.",
    fecha: "TBD",
    impacto: "TBD"
  },
  {
    titulo: "Modernización de equipos",
    descripcion: "Actualización de maquinaria y equipos para mejorar la eficiencia y seguridad operativa.",
    fecha: "TBD",
    impacto: "TBD"
  },
  {
    titulo: "Sistema de control ambiental",
    descripcion: "Implementación de sistemas avanzados de monitoreo y control ambiental.",
    fecha: "TBD",
    impacto: "TBD"
  }
]

const ARENERAS_TELEFONO = "+54 221 234-5678"
const ARENERAS_EMAIL = "contacto@terminalareneras.com"

export default function TerminalesAreneras() {
  const [modalContactoOpen, setModalContactoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <ContactoExternoModal
        open={modalContactoOpen}
        onOpenChange={setModalContactoOpen}
        titulo="Contactar a Terminal de Areneras"
        telefono={ARENERAS_TELEFONO}
        email={ARENERAS_EMAIL}
      />

      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
              Terminal de Areneras
            </h1>
            <p className="text-lg mb-6" style={{ color: '#1B1E4A', opacity: 0.8 }}>
              Especializada en la extracción, procesamiento y distribución de arena para uso industrial 
              y construcción, con compromiso ambiental y tecnología de vanguardia.
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
              <h2 className="text-3xl font-semibold text-plp-primary mb-6">Terminal de Areneras - Puerto La Plata</h2>
              <p className="text-lg text-plp-gray-700 mb-6 leading-relaxed">
                [INFORMACIÓN PENDIENTE] La terminal de areneras del Puerto La Plata se especializa en la extracción, 
                procesamiento y distribución de arena para uso industrial y construcción, operando con los más altos 
                estándares de calidad y compromiso ambiental.
              </p>
              <p className="text-plp-gray-700 mb-6 leading-relaxed">
                [INFORMACIÓN PENDIENTE] Nuestras operaciones incluyen la extracción sostenible de arena, 
                procesamiento industrial especializado, y distribución eficiente a clientes locales y regionales, 
                contribuyendo al desarrollo de la industria de la construcción.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-700">
                  <Leaf className="mr-1 h-3 w-3" />
                  Sostenibilidad
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Award className="mr-1 h-3 w-3" />
                  Calidad
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Mountain className="mr-1 h-3 w-3" />
                  Extracción
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/puerto-plata-satellite.png"
                alt="Terminal de Areneras - Puerto La Plata"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm font-medium text-plp-primary">Terminal de Areneras</p>
                <p className="text-xs text-plp-gray-600">Puerto La Plata, Argentina</p>
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
                [INFORMACIÓN PENDIENTE] La terminal de areneras opera en estrecha colaboración con el Consorcio de Gestión 
                del Puerto La Plata (CGPLP), coordinando operaciones portuarias, servicios de muelle y desarrollo de 
                infraestructura para garantizar la eficiencia operativa y el crecimiento sostenible del complejo portuario.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Ship className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Operaciones portuarias</h3>
                <p className="text-sm text-plp-gray-600">
                  [INFORMACIÓN PENDIENTE] Coordinación de carga, descarga y servicios auxiliares portuarios especializados.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Desarrollo conjunto</h3>
                <p className="text-sm text-plp-gray-600">
                  [INFORMACIÓN PENDIENTE] Proyectos de expansión e inversión en infraestructura portuaria y logística.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Servicios integrados</h3>
                <p className="text-sm text-plp-gray-600">
                  [INFORMACIÓN PENDIENTE] Oferta de servicios portuarios y logísticos complementarios.
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
