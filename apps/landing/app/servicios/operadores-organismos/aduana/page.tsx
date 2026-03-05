"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
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
  Container
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
    titulo: "Control aduanero",
    descripcion: "Servicios integrales de control y fiscalización de mercaderías en operaciones de importación y exportación.",
    icon: Shield,
    caracteristicas: ["Fiscalización integral", "Control de mercaderías", "Prevención de contrabando", "Cumplimiento normativo"]
  },
  {
    id: 2,
    titulo: "Despacho de aduana",
    descripcion: "Gestión completa de trámites aduaneros para agilizar las operaciones portuarias y comerciales.",
    icon: FileCheck,
    caracteristicas: ["Trámites aduaneros", "Documentación", "Procedimientos simplificados", "Asesoramiento especializado"]
  },
  {
    id: 3,
    titulo: "Agentes de carga",
    descripcion: "Servicios de agentes de carga autorizados para la gestión logística y documental de mercaderías.",
    icon: Package,
    caracteristicas: ["Agentes autorizados", "Gestión logística", "Documentación comercial", "Seguimiento de cargas"]
  },
  {
    id: 4,
    titulo: "Información y consultas",
    descripcion: "Centro de información integral con herramientas y recursos para operadores del comercio exterior.",
    icon: Search,
    caracteristicas: ["Información actualizada", "Herramientas digitales", "Consultas especializadas", "Recursos informativos"]
  }
]

const estadisticas = [
  { valor: "Centro", unidad: "Integral", descripcion: "Información aduanera" },
  { valor: "Múltiples", unidad: "servicios", descripcion: "Aduaneros especializados" },
  { valor: "Herramientas", unidad: "digitales", descripcion: "Para operadores" },
  { valor: "Información", unidad: "actualizada", descripcion: "Normativa vigente" },
  { valor: "Soporte", unidad: "especializado", descripcion: "Comercio exterior" },
  { valor: "Integración", unidad: "portuaria", descripcion: "Operaciones eficientes" }
]

const herramientas = [
  {
    titulo: "Rastreo de cargas",
    descripcion: "Sistema de seguimiento en tiempo real de mercaderías en tránsito aduanero.",
    icon: Search,
    beneficios: ["Seguimiento en tiempo real", "Información actualizada", "Transparencia operativa", "Control de estado"]
  },
  {
    titulo: "Información de referencia",
    descripcion: "Base de datos integral con información sobre puertos, aeropuertos, líneas marítimas y aéreas.",
    icon: Database,
    beneficios: ["Base de datos completa", "Información de puertos", "Líneas marítimas y aéreas", "Recursos actualizados"]
  },
  {
    titulo: "Normativa vigente",
    descripcion: "Acceso a la normativa actualizada y procedimientos aduaneros vigentes.",
    icon: FileText,
    beneficios: ["Normativa actualizada", "Procedimientos vigentes", "Información legal", "Cumplimiento normativo"]
  }
]

const serviciosEspecializados = [
  {
    titulo: "Despachantes de Aduana",
    descripcion: "Servicios de despachantes autorizados para la gestión de trámites aduaneros.",
    fecha: "Autorizados",
    impacto: "Gestión profesional"
  },
  {
    titulo: "Alquiler y Venta de Contenedores",
    descripcion: "Servicios de alquiler y venta de contenedores para operaciones portuarias.",
    fecha: "Disponible",
    impacto: "Logística optimizada"
  },
  {
    titulo: "Cursos y Carreras de Comercio Exterior",
    descripcion: "Capacitación especializada en comercio exterior y operaciones aduaneras.",
    fecha: "Disponible",
    impacto: "Formación profesional"
  }
]

const recursos = [
  {
    titulo: "Puertos Marítimos Argentinos",
    fecha: "Actualizado",
    descripcion: "Información completa sobre puertos marítimos argentinos y sus capacidades operativas.",
    detalles: "Incluye datos de infraestructura, servicios y conectividad de todos los puertos del país"
  },
  {
    titulo: "Terminales Portuarias",
    fecha: "Disponible",
    descripcion: "Directorio de terminales portuarias con información operativa y de servicios.",
    detalles: "Información detallada sobre capacidades, servicios y conectividad de terminales"
  },
  {
    titulo: "Líneas Marítimas",
    fecha: "Actualizado",
    descripcion: "Información sobre líneas marítimas que operan en puertos argentinos.",
    detalles: "Directorio completo de líneas marítimas con rutas y servicios disponibles"
  }
]

const ADUANA_TELEFONO = "+54 9 11 4342-9657"
const ADUANA_EMAIL = "del.laplata@migraciones.gov.ar"


export default function OperadoresAduana() {

  const [modalContactoOpen, setModalContactoOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <ContactoExternoModal
          open={modalContactoOpen}
          onOpenChange={setModalContactoOpen}
          titulo="Contactar a Migraciones"
          telefono={ADUANA_TELEFONO}
          email={ADUANA_EMAIL}
        />
      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
              Aduana Argentina
            </h1>
            <p className="text-lg mb-6" style={{ color: '#1B1E4A', opacity: 0.8 }}>
              Centro de Información Integral para operadores del comercio exterior, 
              facilitando la gestión aduanera y operaciones portuarias eficientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://www.aduanaargentina.com/" target="_blank" rel="noopener noreferrer">
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
              <h2 className="text-3xl font-semibold text-plp-primary mb-6">Aduana Argentina - Centro de Información Integral</h2>
              <p className="text-lg text-plp-gray-700 mb-6 leading-relaxed">
                La <strong>Aduana Argentina</strong> es el organismo responsable del control y fiscalización de las operaciones 
                de comercio exterior, proporcionando servicios integrales que facilitan las operaciones portuarias 
                y comerciales en todo el país.
              </p>
              <p className="text-plp-gray-700 mb-6 leading-relaxed">
                A través de su Centro de Información Integral, ofrece herramientas digitales, servicios especializados 
                y recursos informativos que optimizan la gestión aduanera y potencian la eficiencia operativa del 
                complejo portuario.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-700">
                  <Shield className="mr-1 h-3 w-3" />
                  Control Aduanero
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <FileCheck className="mr-1 h-3 w-3" />
                  Despacho Aduanero
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Search className="mr-1 h-3 w-3" />
                  Información Integral
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/puerto-plata-satellite.png"
                alt="Aduana Argentina - Centro de Información Integral"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm font-medium text-plp-primary">Aduana Argentina</p>
                <p className="text-xs text-plp-gray-600">Centro de Información Integral</p>
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
                La Aduana Argentina opera en estrecha colaboración con el Consorcio de Gestión del Puerto La Plata (CGPLP), 
                proporcionando servicios de control aduanero, despacho de mercaderías y herramientas informativas 
                que agilizan las operaciones portuarias y facilitan el comercio exterior.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Control aduanero</h3>
                <p className="text-sm text-plp-gray-600">
                  Fiscalización y control de mercaderías que transitan por el puerto, garantizando el cumplimiento normativo.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <FileCheck className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Despacho aduanero</h3>
                <p className="text-sm text-plp-gray-600">
                  Gestión de trámites aduaneros que agiliza las operaciones portuarias y facilita el comercio exterior.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Search className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Información integral</h3>
                <p className="text-sm text-plp-gray-600">
                  Herramientas y recursos informativos que optimizan la gestión operativa del complejo portuario.
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
