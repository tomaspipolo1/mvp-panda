"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ContactoExternoModal } from "@/components/contacto-externo-modal"
import { Separator } from "@/components/ui/separator"
import { 
  Factory,
  Fuel,
  Droplets,
  Truck,
  Ship,
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
  Settings
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
    titulo: "Combustibles",
    descripcion: "Producción de naftas, gasoil y otros combustibles que abastecen el 50% del AMBA.",
    icon: Fuel,
    caracteristicas: ["Naftas G2 y G3", "Gasoil", "Cumplimiento NEC", "300k m³/mes"]
  },
  {
    id: 2,
    titulo: "Lubricantes",
    descripcion: "Fabricación de lubricantes especializados para diferentes aplicaciones industriales.",
    icon: Droplets,
    caracteristicas: ["Aceites industriales", "Lubricantes automotrices", "Especialidades", "Calidad premium"]
  },
  {
    id: 3,
    titulo: "Asfaltos",
    descripcion: "Producción de asfaltos para la construcción y mantenimiento de infraestructura vial.",
    icon: Truck,
    caracteristicas: ["Asfaltos modificados", "Mezclas asfálticas", "Control de calidad", "Logística especializada"]
  },
  {
    id: 4,
    titulo: "Petroquímica",
    descripcion: "Desarrollo de productos petroquímicos especializados para diversas industrias.",
    icon: Factory,
    caracteristicas: ["Aromáticos", "Intermedios químicos", "Especialidades", "Innovación tecnológica"]
  }
]

const estadisticas = [
  { valor: "1.470", unidad: "empleados", descripcion: "Personal directo" },
  { valor: "4.000", unidad: "personas/día", descripcion: "Ingreso aproximado" },
  { valor: "400", unidad: "hectáreas", descripcion: "Superficie total" },
  { valor: "50%", unidad: "AMBA", descripcion: "Parque circulante abastecido" },
  { valor: "+200", unidad: "empresas", descripcion: "Proveedores contratistas" },
  { valor: "4", unidad: "unidades", descripcion: "De negocio principales" }
]

const iniciativas = [
  {
    titulo: "Plan 4x4",
    descripcion: "Estrategia para cuadruplicar el valor de la compañía en cuatro años.",
    icon: TrendingUp,
    pilares: ["Producción", "Gestión", "Eficiencia", "Argentina LNG"]
  },
  {
    titulo: "Real Time Intelligence Center",
    descripcion: "Centro de operaciones en tiempo real único en el Downstream de Argentina.",
    icon: Zap,
    beneficios: ["Optimización de procesos", "Anticipación de desvíos", "Estándares globales", "Mejora continua"]
  },
  {
    titulo: "Modernización NEC",
    descripcion: "Adecuación a las Nuevas Especificaciones de Combustibles.",
    icon: Shield,
    logros: ["Reducción de azufre", "Cumplimiento G2/G3", "Menor impacto ambiental", "Tecnología avanzada"]
  }
]

const proyectos = [
  {
    titulo: "Revamp Topping 4",
    descripcion: "Incremento del 40% en procesamiento de crudo de Vaca Muerta.",
    fecha: "2024",
    impacto: "27K barriles diarios"
  },
  {
    titulo: "Revamp Topping D",
    descripcion: "Capacidad de procesamiento aumentada a 210K barriles por día.",
    fecha: "2024",
    impacto: "70% crudo Vaca Muerta"
  },
  {
    titulo: "Reformado Catalítico",
    descripcion: "Incremento del 10% en carga y producción de aromáticos.",
    fecha: "2024",
    impacto: "133 m³/h capacidad"
  }
]

const YPF_TELEFONO = "+54 221 456-7890"
const YPF_EMAIL = "complejolaplata@ypf.com"

export default function TerminalesYPF() {
  const [modalContactoOpen, setModalContactoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <ContactoExternoModal
        open={modalContactoOpen}
        onOpenChange={setModalContactoOpen}
        titulo="Contactar a YPF - Complejo Industrial La Plata"
        telefono={YPF_TELEFONO}
        email={YPF_EMAIL}
      />

      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
              Complejo Industrial La Plata
            </h1>
            <p className="text-lg mb-6" style={{ color: '#1B1E4A', opacity: 0.8 }}>
              Visión global, energía local. Combinamos escala operativa, tecnología e innovación 
              para liderar la transformación de YPF en el Puerto La Plata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://lacompania.ypf.com/complejo-industrial-la-plata/index.html" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white hover:bg-gray-50" style={{ color: '#1B1E4A' }}>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Visitar YPF
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
              <h2 className="text-3xl font-semibold text-plp-primary mb-6">YPF - Complejo Industrial La Plata</h2>
              <p className="text-lg text-plp-gray-700 mb-6 leading-relaxed">
                El <strong>Complejo Industrial La Plata</strong> es una de las instalaciones más importantes de YPF, 
                donde combinamos escala operativa, tecnología e innovación para liderar la transformación de la compañía. 
                Con una visión estratégica alineada al Plan 4x4, avanzamos hacia una industria más eficiente, 
                segura y sustentable.
              </p>
              <p className="text-plp-gray-700 mb-6 leading-relaxed">
                Nuestro complejo abastece el 50% del parque circulante del AMBA, procesando crudo de Vaca Muerta 
                y produciendo combustibles, lubricantes, asfaltos y productos petroquímicos con los más altos 
                estándares de calidad y seguridad.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-700">
                  <Leaf className="mr-1 h-3 w-3" />
                  Sustentable
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Award className="mr-1 h-3 w-3" />
                  Calidad ISO
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Zap className="mr-1 h-3 w-3" />
                  Tecnología Avanzada
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/puerto-plata-satellite.png"
                alt="Complejo Industrial La Plata - YPF"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm font-medium text-plp-primary">Complejo Industrial La Plata</p>
                <p className="text-xs text-plp-gray-600">YPF - Puerto La Plata, Argentina</p>
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
                El Complejo Industrial La Plata opera en estrecha colaboración con el Consorcio de Gestión del Puerto La Plata (CGPLP), 
                coordinando operaciones logísticas, servicios portuarios y desarrollo de infraestructura para garantizar 
                la eficiencia operativa y el crecimiento sostenible del complejo portuario.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Ship className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Logística portuaria</h3>
                <p className="text-sm text-plp-gray-600">
                  Coordinación de embarques, descargas y servicios auxiliares portuarios especializados.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Desarrollo conjunto</h3>
                <p className="text-sm text-plp-gray-600">
                  Proyectos de expansión e inversión en infraestructura portuaria y logística.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Users className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Servicios integrados</h3>
                <p className="text-sm text-plp-gray-600">
                  Oferta de servicios portuarios y logísticos complementarios para la industria.
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
