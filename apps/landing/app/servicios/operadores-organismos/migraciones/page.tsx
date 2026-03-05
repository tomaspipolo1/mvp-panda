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
  Waves
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
    titulo: "Registro de embarcaciones",
    descripcion: "Servicios de registro y habilitación de embarcaciones particulares para navegación en aguas argentinas.",
    icon: Sailboat,
    caracteristicas: ["Registro de embarcaciones", "Habilitación para navegación", "Documentación náutica", "Cumplimiento normativo"]
  },

  {
    id: 3,
    titulo: "Autorizaciones de navegación",
    descripcion: "Gestión de autorizaciones especiales para navegación de embarcaciones particulares y comerciales.",
    icon: Navigation,
    caracteristicas: ["Autorizaciones especiales", "Permisos de navegación", "Rutas autorizadas", "Condiciones operativas"]
  },
  {
    id: 4,
    titulo: "Asesoramiento náutico",
    descripcion: "Servicios de asesoramiento y consultas sobre normativa migratoria y requisitos para navegación.",
    icon: Compass,
    caracteristicas: ["Asesoramiento especializado", "Normativa vigente", "Consultas náuticas", "Requisitos operativos"]
  }
]

const estadisticas = [
  { valor: "Control", unidad: "Migratorio", descripcion: "Portuario integral" },
  { valor: "Registro", unidad: "Embarcaciones", descripcion: "Particulares y comerciales" },
  { valor: "Autorizaciones", unidad: "Navegación", descripcion: "Especiales y rutas" },
  { valor: "Documentación", unidad: "Tripulación", descripcion: "Y pasajeros" },
  { valor: "Asesoramiento", unidad: "Náutico", descripcion: "Especializado" },
  { valor: "Integración", unidad: "Portuaria", descripcion: "Operaciones eficientes" }
]

const funciones = [
  {
    titulo: "Registro de embarcaciones particulares",
    descripcion: "Proceso de registro y habilitación de embarcaciones particulares para navegación en aguas argentinas.",
    icon: Sailboat,
    beneficios: ["Registro oficial", "Habilitación náutica", "Documentación vigente", "Cumplimiento legal"]
  },
  {
    titulo: "Control de tripulaciones",
    descripcion: "Gestión y control de documentación migratoria para tripulaciones de embarcaciones comerciales.",
    icon: UserCheck,
    beneficios: ["Control migratorio", "Documentación vigente", "Gestión de tripulaciones", "Procedimientos simplificados"]
  },
  {
    titulo: "Autorizaciones especiales",
    descripcion: "Gestión de autorizaciones especiales para navegación en rutas específicas y condiciones particulares.",
    icon: Navigation,
    beneficios: ["Autorizaciones especiales", "Rutas específicas", "Condiciones particulares", "Gestión eficiente"]
  }
]

const serviciosEspecializados = [
  {
    titulo: "Registro de embarcaciones particulares",
    descripcion: "Servicios de registro y habilitación para embarcaciones particulares que desean navegar en aguas argentinas.",
    fecha: "Disponible",
    impacto: "Navegación habilitada"
  },
  {
    titulo: "Control migratorio portuario",
    descripcion: "Control y gestión de documentación migratoria para operaciones portuarias y navegación comercial.",
    fecha: "Obligatorio",
    impacto: "Cumplimiento normativo"
  },
  {
    titulo: "Asesoramiento náutico",
    descripcion: "Servicios de asesoramiento sobre requisitos migratorios y normativa para navegación.",
    fecha: "Disponible",
    impacto: "Información especializada"
  }
]

const recursos = [
  {
    titulo: "Normativa migratoria náutica",
    fecha: "Actualizada",
    descripcion: "Información sobre normativa migratoria vigente para navegación en aguas argentinas.",
    detalles: "Incluye requisitos, procedimientos y documentación necesaria para navegación"
  },
  {
    titulo: "Procedimientos de registro",
    fecha: "Disponible",
    descripcion: "Guías y procedimientos para el registro de embarcaciones particulares.",
    detalles: "Información detallada sobre trámites y requisitos para registro de embarcaciones"
  },
  {
    titulo: "Autorizaciones especiales",
    fecha: "Vigente",
    descripcion: "Información sobre autorizaciones especiales para navegación en rutas específicas.",
    detalles: "Procedimientos y requisitos para autorizaciones de navegación especial"
  }
]

const MIGRACIONES_TELEFONO = "+54 9 11 3910-1010"
const MIGRACIONES_EMAIL = "del.laplata@migraciones.gov.ar"

export default function OperadoresMigraciones() {
  const [modalContactoOpen, setModalContactoOpen] = useState(false)


  return (
    <div className="min-h-screen bg-white">

        <ContactoExternoModal
          open={modalContactoOpen}
          onOpenChange={setModalContactoOpen}
          titulo="Contactar a Migraciones"
          telefono={MIGRACIONES_TELEFONO}
          email={MIGRACIONES_EMAIL}
        />
      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: '#CAE6FF' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B1E4A' }}>
              Migraciones
            </h1>
            <p className="text-lg mb-6" style={{ color: '#1B1E4A', opacity: 0.8 }}>
              Control migratorio portuario y registro de embarcaciones particulares, 
              facilitando la navegación y operaciones marítimas en aguas argentinas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://www.argentina.gob.ar/migraciones" target="_blank" rel="noopener noreferrer">
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
              <h2 className="text-3xl font-semibold text-plp-primary mb-6">Migraciones - Control Migratorio Portuario</h2>
              <p className="text-lg text-plp-gray-700 mb-6 leading-relaxed">
                La <strong>Dirección Nacional de Migraciones</strong> es el organismo responsable del control migratorio 
                en operaciones portuarias, proporcionando servicios esenciales para el registro de embarcaciones 
                particulares y la gestión de documentación migratoria en el ámbito marítimo.
              </p>
              <p className="text-plp-gray-700 mb-6 leading-relaxed">
                A través de sus servicios especializados, facilita la navegación de embarcaciones particulares, 
                controla la documentación de tripulaciones y pasajeros, y proporciona asesoramiento náutico 
                para operaciones marítimas en aguas argentinas.
              </p>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-700">
                  <Sailboat className="mr-1 h-3 w-3" />
                  Registro Embarcaciones
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  
                  Control Migratorio
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Navigation className="mr-1 h-3 w-3" />
                  Autorizaciones
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img
                src="/puerto-plata-satellite.png"
                alt="Migraciones - Control Migratorio Portuario"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                <p className="text-sm font-medium text-plp-primary">Migraciones</p>
                <p className="text-xs text-plp-gray-600">Control Migratorio Portuario</p>
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
                La Dirección Nacional de Migraciones opera en estrecha colaboración con el Consorcio de Gestión del Puerto La Plata (CGPLP), 
                proporcionando servicios de control migratorio, registro de embarcaciones y autorizaciones de navegación 
                que facilitan las operaciones portuarias y la navegación marítima en la región.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Sailboat className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Registro de embarcaciones</h3>
                <p className="text-sm text-plp-gray-600">
                  Registro y habilitación de embarcaciones particulares para navegación en aguas del puerto.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Control migratorio</h3>
                <p className="text-sm text-plp-gray-600">
                  Gestión de documentación migratoria para tripulaciones y pasajeros en operaciones portuarias.
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="mx-auto mb-4 p-3 bg-plp-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Navigation className="h-8 w-8 text-plp-primary" />
                </div>
                <h3 className="text-lg font-semibold text-plp-primary mb-2">Autorizaciones</h3>
                <p className="text-sm text-plp-gray-600">
                  Gestión de autorizaciones especiales para navegación y operaciones marítimas específicas.
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
