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
  Building,
  FileText,
  CheckCircle,
  DollarSign,
  Car,
  Anchor
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
    titulo: "Almacenaje de mercadería",
    descripcion: "Servicios de almacenaje seguro y eficiente de cargas con certificación IRAM-ISO-2015 en todos sus procesos.",
    icon: Warehouse,
    caracteristicas: ["Almacenaje seguro", "Certificación IRAM-ISO", "Procesos certificados", "Eficiencia operativa"]
  },
  {
    id: 2,
    titulo: "Operaciones de ingreso y egreso",
    descripcion: "Gestión completa de operaciones de ingreso, egreso y movimientos internos de mercadería.",
    icon: Package,
    caracteristicas: ["Ingreso de mercadería", "Egreso de mercadería", "Movimientos internos", "Normativa vigente"]
  },
  {
    id: 3,
    titulo: "Ventajas impositivas",
    descripcion: "Beneficios fiscales para actividades industriales y comerciales dentro del régimen de zona franca.",
    icon: DollarSign,
    caracteristicas: ["Actividad industrial", "Actividad comercial", "Beneficios fiscales", "Régimen especial"]
  },
  {
    id: 4,
    titulo: "Ventajas logísticas",
    descripcion: "Infraestructura logística estratégica con conectividad multimodal y servicios especializados.",
    icon: Car,
    caracteristicas: ["Conectividad multimodal", "Infraestructura estratégica", "Servicios especializados", "Ubicación privilegiada"]
  }
]

const estadisticas = [
  { valor: "Mayor", unidad: "emprendimiento", descripcion: "Zona franca en Argentina" },
  { valor: "IRAM-ISO", unidad: "2015", descripcion: "Certificación en todos los procesos" },
  { valor: "Ensenada", unidad: "Buenos Aires", descripcion: "Ubicación estratégica" },
  { valor: "Líneas", unidad: "rotativas", descripcion: "Atención telefónica" },
  { valor: "Edificio", unidad: "Usos Múltiples", descripcion: "Infraestructura moderna" },
  { valor: "B1925CKA", unidad: "Código postal", descripcion: "Ensenada, Buenos Aires" }
]

const ventajas = [
  {
    titulo: "Ventajas impositivas",
    descripcion: "Beneficios fiscales especiales para empresas que operan dentro del régimen de zona franca.",
    icon: DollarSign,
    beneficios: ["Exención de impuestos", "Régimen especial", "Actividad industrial", "Actividad comercial"]
  },
  {
    titulo: "Ventajas logísticas",
    descripcion: "Infraestructura logística de vanguardia con conectividad multimodal y servicios especializados.",
    icon: Car,
    beneficios: ["Conectividad multimodal", "Infraestructura estratégica", "Servicios especializados", "Ubicación privilegiada"]
  },
  {
    titulo: "Seguridad y eficiencia",
    descripcion: "Almacenaje seguro y eficiente de cargas con los más altos estándares de calidad y seguridad.",
    icon: Shield,
    beneficios: ["Almacenaje seguro", "Eficiencia operativa", "Estándares de calidad", "Seguridad integral"]
  }
]

const procedimientos = [
  {
    titulo: "Operaciones",
    descripcion: "Gestión completa de operaciones de ingreso, egreso y movimientos internos de mercadería.",
    fecha: "Vigente",
    impacto: "Normativa actualizada"
  },
  {
    titulo: "Seguridad e Higiene",
    descripcion: "Instructivos IMO y normativa de seguridad e higiene para todas las operaciones.",
    fecha: "Vigente",
    impacto: "Estándares de seguridad"
  },
  {
    titulo: "Digesto Normativo",
    descripcion: "Compilación completa de normativas y procedimientos operativos vigentes.",
    fecha: "Actualizado",
    impacto: "Marco regulatorio"
  }
]

const novedades = [
  {
    titulo: "Ronda de negocios Multisectorial Ensenada 2025",
    fecha: "22 de julio de 2025",
    descripcion: "Evento organizado por el Ministerio de Producción, Ciencia e Innovación Tecnológica de la Provincia de Buenos Aires y la Secretaría de Hacienda y Producción del Municipio de Ensenada.",
    detalles: "Fecha: Jueves 31 de julio – 9:30 hs. Lugar: Edificio Malvinas, La Merced 133, Ensenada"
  },
  {
    titulo: "Capacitación: Seguridad en la Operación de Autoelevadores",
    fecha: "11 de julio de 2025",
    descripcion: "Curso a cargo del Ing. Pablo Alejandro Billordo en el Edificio de Usos Múltiples.",
    detalles: "Viernes 18 de julio - 9:00 hs - Duración: 3 hs - Costo: $15.000"
  },
  {
    titulo: "Curso: Primeros auxilios y RCP",
    fecha: "8 de julio de 2025",
    descripcion: "Curso gratuito de RCP y primeros auxilios en el salón del Edificio de Usos Múltiples.",
    detalles: "Viernes 11 de julio - 14:30 hs - Duración: 2 hs - Gratuito"
  }
]

const ZONA_FRANCA_TELEFONO = "+54 221 678-9012"
const ZONA_FRANCA_EMAIL = "contacto@zonafrancalaplata.com.ar"

export default function OperadoresZonaFranca() {
  const [modalContactoOpen, setModalContactoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <ContactoExternoModal
        open={modalContactoOpen}
        onOpenChange={setModalContactoOpen}
        titulo="Contactar a Buenos Aires Zona Franca La Plata"
        telefono={ZONA_FRANCA_TELEFONO}
        email={ZONA_FRANCA_EMAIL}
      />

      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
              Buenos Aires Zona Franca La Plata
            </h1>
            <p className="text-lg mb-6" style={{ color: '#1B1E4A', opacity: 0.8 }}>
              El mayor emprendimiento de este tipo en Argentina tanto en operaciones y volumen manejados 
              como en obras de infraestructura, certificado IRAM-ISO-2015.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://www.bazflp.com/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white hover:bg-gray-50" style={{ color: '#1B1E4A' }}>
                <ExternalLink className="mr-2 h-5 w-5" />
                Visitar sitio web
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
              <h2 className="text-3xl font-semibold text-plp-primary mb-6">Buenos Aires Zona Franca La Plata</h2>
              <p className="text-lg text-plp-gray-700 mb-6 leading-relaxed">
                La <strong>Buenos Aires Zona Franca La Plata (BAZFLP)</strong> es el mayor emprendimiento de este tipo en Argentina, 
                tanto en operaciones y volumen manejados como en obras de infraestructura. 
                Está certificada bajo los requerimientos de <strong>IRAM-ISO-2015</strong> en todos sus procesos.
              </p>
              <p className="text-plp-gray-700 mb-6 leading-relaxed">
                Ofrece servicios de almacenaje seguro y eficiente de cargas, operaciones de ingreso y egreso de mercadería, 
                y ventajas impositivas y logísticas para empresas que operan dentro del régimen de zona franca.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-700">
                  <Award className="mr-1 h-3 w-3" />
                  IRAM-ISO 2015
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Building className="mr-1 h-3 w-3" />
                  Zona Franca
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Shield className="mr-1 h-3 w-3" />
                  Seguridad
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/puerto-plata-satellite.png"
                alt="Buenos Aires Zona Franca La Plata"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm font-medium text-plp-primary">BAZFLP</p>
                <p className="text-xs text-plp-gray-600">Ensenada, Buenos Aires, Argentina</p>
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
                La Buenos Aires Zona Franca La Plata opera en estrecha colaboración con el Consorcio de Gestión 
                del Puerto La Plata (CGPLP), proporcionando servicios complementarios de almacenaje, 
                operaciones logísticas y ventajas impositivas que potencian las capacidades del complejo portuario.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Warehouse className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Servicios complementarios</h3>
                <p className="text-sm text-plp-gray-600">
                  Almacenaje y operaciones logísticas que complementan las capacidades portuarias del CGPLP.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Ventajas impositivas</h3>
                <p className="text-sm text-plp-gray-600">
                  Régimen de zona franca que ofrece beneficios fiscales para operaciones portuarias.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Desarrollo conjunto</h3>
                <p className="text-sm text-plp-gray-600">
                  Proyectos de expansión e inversión en infraestructura logística y portuaria.
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
