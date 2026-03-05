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
  AnchorIcon,
  Map,
  Route,
  Target,
  Zap as Lightning
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
    titulo: "Pilotaje de buques",
    descripcion: "Servicios de pilotaje experto para guiar buques de manera segura a través de las complejas aguas del Río de la Plata.",
    icon: Ship,
    caracteristicas: ["Pilotaje experto", "Navegación segura", "Conocimiento del río", "Maniobras especializadas"]
  },
  {
    id: 2,
    titulo: "Asesoramiento náutico",
    descripcion: "Asesoramiento especializado al capitán sobre condiciones del río, peligros y canales de navegación.",
    icon: Compass,
    caracteristicas: ["Asesoramiento al capitán", "Condiciones del río", "Identificación de peligros", "Canales de navegación"]
  },
  {
    id: 3,
    titulo: "Maniobras críticas",
    descripcion: "Control del buque en maniobras críticas como entrada, salida y atracada en el puerto.",
    icon: Target,
    caracteristicas: ["Control de maniobras", "Entrada al puerto", "Salida del puerto", "Atracada segura"]
  },
  {
    id: 4,
    titulo: "Seguridad marítima",
    descripcion: "Garantía de la seguridad de personas, buque y medio ambiente durante las operaciones portuarias.",
    icon: Shield,
    caracteristicas: ["Seguridad de personas", "Protección del buque", "Cuidado ambiental", "Operaciones seguras"]
  }
]

const estadisticas = [
  { valor: "Pilotos", unidad: "Expertos", descripcion: "Puerto La Plata" },
  { valor: "Conocimiento", unidad: "Profundo", descripcion: "Río de la Plata" },
  { valor: "Maniobras", unidad: "Críticas", descripcion: "Entrada y salida" },
  { valor: "Seguridad", unidad: "Garantizada", descripcion: "Personas y buques" },
  { valor: "Experiencia", unidad: "Extensa", descripcion: "Navegación fluvial" },
  { valor: "Asesoramiento", unidad: "Especializado", descripcion: "Al capitán" }
]

const funciones = [
  {
    titulo: "Pilotaje experto",
    descripcion: "Guía de buques a través de las complejas aguas del Río de la Plata con conocimiento profundo del río.",
    icon: Ship,
    beneficios: ["Navegación segura", "Conocimiento del río", "Experiencia fluvial", "Maniobras precisas"]
  },
  {
    titulo: "Asesoramiento al capitán",
    descripcion: "Asesoramiento especializado sobre condiciones del río, peligros y canales de navegación.",
    icon: Compass,
    beneficios: ["Información actualizada", "Identificación de peligros", "Rutas seguras", "Condiciones del río"]
  },
  {
    titulo: "Control de maniobras",
    descripcion: "Toma del control del buque en maniobras críticas como entrada, salida y atracada.",
    icon: Target,
    beneficios: ["Control experto", "Maniobras críticas", "Precisión náutica", "Seguridad operativa"]
  }
]

const serviciosEspecializados = [
  {
    titulo: "Pilotaje de entrada",
    descripcion: "Servicios de pilotaje para la entrada segura de buques al puerto de La Plata.",
    fecha: "Disponible",
    impacto: "Entrada segura"
  },
  {
    titulo: "Pilotaje de salida",
    descripcion: "Servicios de pilotaje para la salida segura de buques del puerto de La Plata.",
    fecha: "Disponible",
    impacto: "Salida segura"
  },
  {
    titulo: "Maniobras de atracada",
    descripcion: "Control experto en maniobras de atracada y desatracada de buques.",
    fecha: "Especializado",
    impacto: "Atracada precisa"
  }
]

const recursos = [
  {
    titulo: "Conocimiento del Río de la Plata",
    fecha: "Actualizado",
    descripcion: "Información detallada sobre las condiciones del río, bancos y canales de navegación.",
    detalles: "Incluye mapas náuticos, información de mareas y condiciones hidrográficas del río"
  },
  {
    titulo: "Procedimientos de pilotaje",
    fecha: "Vigente",
    descripcion: "Procedimientos y protocolos de pilotaje para diferentes tipos de buques.",
    detalles: "Información detallada sobre maniobras, comunicaciones y protocolos de seguridad"
  },
  {
    titulo: "Información meteorológica",
    fecha: "En tiempo real",
    descripcion: "Información meteorológica y condiciones del río para operaciones seguras.",
    detalles: "Datos de viento, visibilidad, corrientes y condiciones que afectan la navegación"
  }
]

const PRACTICOS_TELEFONO = "+54 221 567-8901"
const PRACTICOS_EMAIL = "practicos@puertolaplata.com"

export default function OperadoresPracticos() {
  const [modalContactoOpen, setModalContactoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <ContactoExternoModal
        open={modalContactoOpen}
        onOpenChange={setModalContactoOpen}
        titulo="Contactar a Prácticos de Puerto La Plata"
        telefono={PRACTICOS_TELEFONO}
        email={PRACTICOS_EMAIL}
      />

      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
              Prácticos de Puerto La Plata
            </h1>
            <p className="text-lg mb-6" style={{ color: '#1B1E4A', opacity: 0.8 }}>
              Pilotos experimentados que guían buques de manera segura y eficiente a través de las complejas aguas 
              del Río de la Plata, garantizando la seguridad de personas, buques y medio ambiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
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
              <h2 className="text-3xl font-semibold text-plp-primary mb-6">Prácticos de Puerto La Plata - Pilotos Expertos</h2>
              <p className="text-lg text-plp-gray-700 mb-6 leading-relaxed">
                Los <strong>Prácticos de Puerto La Plata</strong> son pilotos experimentados que guían los buques de manera segura 
                y eficiente a través de las complejas aguas del Río de la Plata y hacia/desde el puerto, 
                asesorando al capitán y tomando el control del barco en maniobras críticas.
              </p>
              <p className="text-plp-gray-700 mb-6 leading-relaxed">
                Su profundo conocimiento del río, sus peligros, bancos y canales, es fundamental para garantizar 
                la seguridad de las personas, del buque y del medio ambiente durante las operaciones portuarias.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-700">
                  <Ship className="mr-1 h-3 w-3" />
                  Pilotaje Experto
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Compass className="mr-1 h-3 w-3" />
                  Asesoramiento Náutico
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Target className="mr-1 h-3 w-3" />
                  Maniobras Críticas
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/puerto-plata-satellite.png"
                alt="Prácticos de Puerto La Plata - Pilotos Expertos"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm font-medium text-plp-primary">Prácticos</p>
                <p className="text-xs text-plp-gray-600">Puerto La Plata</p>
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
                Los Prácticos de Puerto La Plata operan en estrecha colaboración con el Consorcio de Gestión del Puerto La Plata (CGPLP), 
                proporcionando servicios de pilotaje experto que garantizan la seguridad y eficiencia 
                de las operaciones portuarias en el complejo.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Ship className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Pilotaje experto</h3>
                <p className="text-sm text-plp-gray-600">
                  Guía segura de buques a través de las complejas aguas del Río de la Plata hacia el puerto.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Compass className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Asesoramiento náutico</h3>
                <p className="text-sm text-plp-gray-600">
                  Asesoramiento especializado al capitán sobre condiciones del río y canales de navegación.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Target className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Maniobras críticas</h3>
                <p className="text-sm text-plp-gray-600">
                  Control del buque en maniobras críticas como entrada, salida y atracada en el puerto.
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
