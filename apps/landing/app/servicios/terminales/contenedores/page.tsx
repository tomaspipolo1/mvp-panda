"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ContactoExternoModal } from "@/components/contacto-externo-modal"
import { Separator } from "@/components/ui/separator"
import { 
  Ship,
  Container,
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
  ArrowRight
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
    titulo: "Operaciones de contenedores",
    descripcion: "Manejo eficiente de contenedores con tecnología de última generación y equipamiento moderno.",
    icon: Container,
    caracteristicas: ["Grúas de alta capacidad", "Sistemas automatizados", "Operaciones 24/7"]
  },
  {
    id: 2,
    titulo: "Conectividad multimodal",
    descripcion: "Integración perfecta entre transporte marítimo, ferroviario y terrestre para optimizar la logística.",
    icon: Train,
    caracteristicas: ["Conexión ferroviaria directa", "Acceso a rutas nacionales", "Interconexión regional"]
  },
  {
    id: 3,
    titulo: "Servicios logísticos",
    descripcion: "Soluciones integrales de logística que incluyen almacenamiento, distribución y gestión de inventarios.",
    icon: Truck,
    caracteristicas: ["Almacenamiento seguro", "Distribución eficiente", "Trazabilidad completa"]
  },
  {
    id: 4,
    titulo: "Tecnología avanzada",
    descripcion: "Sistemas informáticos de vanguardia para la gestión y control de operaciones portuarias.",
    icon: Zap,
    caracteristicas: ["Sistemas TOS avanzados", "Tecnología RFID", "Monitoreo en tiempo real"]
  }
]

const estadisticas = [
  { valor: "45.200", unidad: "TEU/año", descripcion: "Capacidad operativa" },
  { valor: "24/7", unidad: "", descripcion: "Operaciones continuas" },
  { valor: "32", unidad: "pies", descripcion: "Calado máximo" },
  { valor: "8", unidad: "posiciones", descripcion: "Sitios de atraque" }
]

const certificaciones = [
  {
    titulo: "Primer Puerto Argentino Carbono Neutro",
    descripcion: "Certificación internacional por operaciones sostenibles y compromiso ambiental.",
    fecha: "Julio 2025",
    icon: Leaf
  },
  {
    titulo: "ISO 14001",
    descripcion: "Gestión ambiental certificada con estándares internacionales.",
    fecha: "Vigente",
    icon: Award
  },
  {
    titulo: "ISO 9001",
    descripcion: "Sistema de gestión de calidad certificado.",
    fecha: "Vigente",
    icon: Award
  }
]

const noticiasRecientes = [
  {
    titulo: "ONE, Newsan y TecPlata inauguran el servicio River Plate Express",
    fecha: "23 Mayo 2025",
    descripcion: "Nuevo servicio de conexión directa que mejora la conectividad regional."
  },
  {
    titulo: "Bitrenes de Yusen Logistics operando en TecPlata por primera vez",
    fecha: "20 Mayo 2025",
    descripcion: "Innovación en transporte multimodal con equipos especializados."
  },
  {
    titulo: "Visita del Director Ejecutivo de la Agencia Nacional de Puertos",
    fecha: "26 Marzo 2025",
    descripcion: "Reconocimiento a las operaciones y estándares de calidad."
  }
]


const TECPLATA_TELEFONO = "+54 221 123-4567"
const TECPLATA_EMAIL = "contacto@tecplata.com"

export default function TerminalesContenedores() {
  const [modalContactoOpen, setModalContactoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <ContactoExternoModal
        open={modalContactoOpen}
        onOpenChange={setModalContactoOpen}
        titulo="Contactar a TecPlata"
        telefono={TECPLATA_TELEFONO}
        email={TECPLATA_EMAIL}
      />

      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
              Terminales de contenedores
            </h1>
            <p className="text-lg mb-6" style={{ color: '#1B1E4A', opacity: 0.8 }}>
              Una nueva conexión de Argentina con el mundo a través de modernas instalaciones portuarias 
              operadas por TecPlata S.A., filial de ICTSI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://www.tecplata.com/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white hover:bg-gray-50" style={{ color: '#1B1E4A' }}>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Visitar TecPlata
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-white/50 hover:bg-white"
                style={{ color: '#1B1E4A', borderColor: '#1B1E4A' }}
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
              <h2 className="text-3xl font-semibold text-plp-primary mb-6">TecPlata S.A.</h2>
              <p className="text-lg text-plp-gray-700 mb-6 leading-relaxed">
                En el estratégico Puerto La Plata, <strong>INTERNATIONAL CONTAINER TERMINAL SERVICES INC. (ICTSI)</strong> 
                ha construido y opera a través de TecPlata S.A. una moderna terminal de contenedores provista de la última 
                tecnología en materia de equipamiento, diseño, infraestructura y sistemas informáticos.
              </p>
              <p className="text-plp-gray-700 mb-6 leading-relaxed">
                Nuestro propósito es convertir a nuestra terminal en un motor de crecimiento positivo y sostenible, 
                trabajando incansablemente para desarrollar y operar una instalación portuaria eficiente que ofrezca 
                los mayores beneficios a nuestros clientes, socios, colaboradores y a la comunidad.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-700">
                  <Leaf className="mr-1 h-3 w-3" />
                  Carbono Neutro
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Award className="mr-1 h-3 w-3" />
                  Certificaciones ISO
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/puerto-plata-satellite.png"
                alt="Terminal TecPlata - Puerto La Plata"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm font-medium text-plp-primary">Terminal TecPlata</p>
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
                TecPlata opera en estrecha colaboración con el Consorcio de Gestión del Puerto La Plata (CGPLP), 
                coordinando operaciones, infraestructura y servicios para garantizar la eficiencia portuaria y 
                el desarrollo sostenible del complejo.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Ship className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Coordinación operativa</h3>
                <p className="text-sm text-plp-gray-600">
                  Gestión coordinada de atraques, servicios auxiliares y operaciones portuarias.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Desarrollo conjunto</h3>
                <p className="text-sm text-plp-gray-600">
                  Proyectos de expansión e inversión en infraestructura portuaria compartida.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Servicios integrados</h3>
                <p className="text-sm text-plp-gray-600">
                  Oferta de servicios portuarios complementarios y especializados.
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
