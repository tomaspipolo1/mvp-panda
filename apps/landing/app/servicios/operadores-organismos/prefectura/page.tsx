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
  Anchor,
  Search,
  FileCheck,
  Scale,
  Gavel,
  Database,
  Plane,
  Container,
  Sailboat,
  Passport,
  UserCheck,
  Navigation,
  Compass,
  Waves,
  LifeBuoy,
  Eye,
  Fish,
  AlertTriangle,
  Lock,
  ShipWheel,
  AnchorIcon
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
    titulo: "Seguridad en la navegación",
    descripcion: "Garantía de la seguridad marítima a través de control de tráfico, señalización y supervisión de operaciones portuarias.",
    icon: ShipWheel,
    caracteristicas: ["Control de tráfico marítimo", "Señalización náutica", "Supervisión portuaria", "Normativa marítima"]
  },
  {
    id: 2,
    titulo: "Protección ambiental",
    descripcion: "Protección del medio ambiente marino y recursos pesqueros mediante control y fiscalización ambiental.",
    icon: Fish,
    caracteristicas: ["Control ambiental", "Protección marina", "Recursos pesqueros", "Fiscalización ecológica"]
  },
  {
    id: 3,
    titulo: "Control de actividades ilícitas",
    descripcion: "Prevención y control de narcotráfico, contrabando y otras actividades ilícitas en el ámbito marítimo.",
    icon: Shield,
    caracteristicas: ["Prevención de narcotráfico", "Control de contrabando", "Actividades ilícitas", "Seguridad marítima"]
  },
  {
    id: 4,
    titulo: "Auxilio y salvamento",
    descripcion: "Servicios de auxilio de la vida humana en el agua y operaciones de salvamento marítimo.",
    icon: LifeBuoy,
    caracteristicas: ["Auxilio marítimo", "Salvamento", "Rescate acuático", "Emergencias marítimas"]
  }
]

const estadisticas = [
  { valor: "Autoridad", unidad: "Marítima", descripcion: "Puerto La Plata" },
  { valor: "Seguridad", unidad: "Navegación", descripcion: "Garantizada" },
  { valor: "Protección", unidad: "Ambiental", descripcion: "Marina y pesquera" },
  { valor: "Control", unidad: "Ilícitas", descripcion: "Narcotráfico y contrabando" },
  { valor: "Auxilio", unidad: "Marítimo", descripcion: "Vida humana en el agua" },
  { valor: "Fiscalización", unidad: "Portuaria", descripcion: "Instalaciones seguras" }
]

const funciones = [
  {
    titulo: "Seguridad marítima",
    descripcion: "Garantía de la seguridad en la navegación a través de control de tráfico y supervisión portuaria.",
    icon: ShipWheel,
    beneficios: ["Control de tráfico", "Supervisión portuaria", "Seguridad náutica", "Normativa vigente"]
  },
  {
    titulo: "Protección ambiental",
    descripcion: "Protección del medio ambiente marino y recursos pesqueros mediante fiscalización especializada.",
    icon: Fish,
    beneficios: ["Control ambiental", "Protección marina", "Recursos pesqueros", "Fiscalización ecológica"]
  },
  {
    titulo: "Control de ilícitos",
    descripcion: "Prevención y control de actividades ilícitas como narcotráfico y contrabando en el ámbito marítimo.",
    icon: Shield,
    beneficios: ["Prevención de ilícitos", "Control de narcotráfico", "Contrabando", "Seguridad integral"]
  }
]

const serviciosEspecializados = [
  {
    titulo: "Fiscalización portuaria",
    descripcion: "Control y fiscalización de instalaciones portuarias para garantizar la seguridad operativa.",
    fecha: "Obligatorio",
    impacto: "Seguridad portuaria"
  },
  {
    titulo: "Gestión de trámites",
    descripcion: "Gestión de trámites marítimos y portuarios para operadores del sector.",
    fecha: "Disponible",
    impacto: "Eficiencia operativa"
  },
  {
    titulo: "Auxilio marítimo",
    descripcion: "Servicios de auxilio y salvamento para emergencias en el ámbito marítimo.",
    fecha: "24/7",
    impacto: "Seguridad de vida"
  }
]

const recursos = [
  {
    titulo: "Normativa marítima",
    fecha: "Actualizada",
    descripcion: "Información sobre normativa marítima vigente y procedimientos de seguridad.",
    detalles: "Incluye reglamentaciones de navegación, seguridad portuaria y protección ambiental"
  },
  {
    titulo: "Procedimientos de fiscalización",
    fecha: "Vigente",
    descripcion: "Procedimientos de fiscalización portuaria y control marítimo.",
    detalles: "Información detallada sobre controles, inspecciones y requisitos de seguridad"
  },
  {
    titulo: "Servicios de auxilio",
    fecha: "Disponible",
    descripcion: "Información sobre servicios de auxilio marítimo y procedimientos de emergencia.",
    detalles: "Protocolos de rescate, contactos de emergencia y procedimientos de auxilio"
  }
]

const PREFECTURA_TELEFONO = "0800-888-7730  "
const PREFECTURA_EMAIL = "info@prefecturanaval.gov.ar."

export default function OperadoresPrefectura() {
  const [modalContactoOpen, setModalContactoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <ContactoExternoModal
        open={modalContactoOpen}
        onOpenChange={setModalContactoOpen}
        titulo="Contactar a Prefectura Naval"
        telefono={PREFECTURA_TELEFONO}
        email={PREFECTURA_EMAIL}
      />

      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
              Prefectura Naval Argentina
            </h1>
            <p className="text-lg mb-6" style={{ color: '#1B1E4A', opacity: 0.8 }}>
              Autoridad Marítima en Puerto La Plata, garantizando la seguridad en la navegación, 
              protección ambiental y control de actividades ilícitas en el ámbito marítimo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://www.argentina.gob.ar/prefecturanaval" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white hover:bg-gray-50" style={{ color: '#1B1E4A' }}>
                  <Shield className="mr-2 h-5 w-5" />
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
              <h2 className="text-3xl font-semibold text-plp-primary mb-6">Prefectura Naval Argentina - Autoridad Marítima</h2>
              <p className="text-lg text-plp-gray-700 mb-6 leading-relaxed">
                En <strong>Puerto La Plata</strong>, la <strong>Prefectura Naval Argentina (PNA)</strong> actúa como la Autoridad Marítima, 
                garantizando la seguridad en la navegación, la protección del medio ambiente y los recursos pesqueros, 
                el control de actividades ilícitas y el auxilio de la vida humana en el agua.
              </p>
              <p className="text-plp-gray-700 mb-6 leading-relaxed">
                A través de sus servicios especializados, proporciona fiscalización en el ámbito portuario y marítimo, 
                incluyendo la seguridad de las instalaciones portuarias y la gestión de trámites para operadores del sector.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-700">
                  <ShipWheel className="mr-1 h-3 w-3" />
                  Seguridad Marítima
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Fish className="mr-1 h-3 w-3" />
                  Protección Ambiental
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Shield className="mr-1 h-3 w-3" />
                  Control de Ilícitos
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/puerto-plata-satellite.png"
                alt="Prefectura Naval Argentina - Autoridad Marítima"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm font-medium text-plp-primary">PNA</p>
                <p className="text-xs text-plp-gray-600">Autoridad Marítima Puerto La Plata</p>
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
                La Prefectura Naval Argentina opera en estrecha colaboración con el Consorcio de Gestión del Puerto La Plata (CGPLP), 
                proporcionando servicios de seguridad marítima, fiscalización portuaria y control ambiental 
                que garantizan la operatividad segura del complejo portuario.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <ShipWheel className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Seguridad marítima</h3>
                <p className="text-sm text-plp-gray-600">
                  Garantía de la seguridad en la navegación y operaciones portuarias del complejo.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Fish className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Protección ambiental</h3>
                <p className="text-sm text-plp-gray-600">
                  Protección del medio ambiente marino y recursos pesqueros en la zona portuaria.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Fiscalización</h3>
                <p className="text-sm text-plp-gray-600">
                  Control y fiscalización de instalaciones portuarias para garantizar la seguridad operativa.
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
