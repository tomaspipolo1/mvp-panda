"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  Map,
  Route,
  Target,
  Wrench,
  HardHat,
  Palette,
  Droplets,
  Fuel,
  Cable,
  Radio,
  Camera,
  Coffee,
  Utensils,
  Bed,
  Bus,
  Bike,
  ArrowUpDown,
  ArrowLeftRight,
  Network,
  Grid,
  Layers,
  BarChart3,
  Activity
} from "lucide-react"
import Link from "next/link"

// Categorías de servicios a buques
const categoriasServicios = [
  {
    id: "remolque",
    titulo: "Remolque y Asistencia",
    descripcion: "Servicios de remolque y asistencia en maniobras portuarias",
    icon: Ship,
    color: "bg-blue-500",
    servicios: [
      "Remolque de buques",
      "Asistencia en maniobras",
      "Servicios de emergencia",
      "Salvamento marítimo"
    ]
  },
  {
    id: "limpieza",
    titulo: "Limpieza y Mantenimiento",
    descripcion: "Servicios de limpieza de buques y mantenimiento portuario",
    icon: Droplets,
    color: "bg-green-500",
    servicios: [
      "Limpieza de tanques",
      "Mantenimiento portuario",
      "Servicios ambientales",
      "Tratamiento de residuos"
    ]
  },
  {
    id: "personal",
    titulo: "Personal Portuario",
    descripcion: "Provisión de personal especializado para operaciones portuarias",
    icon: Users,
    color: "bg-purple-500",
    servicios: [
      "Personal calificado",
      "Capacitación",
      "Servicios 24/7",
      "Gestión de recursos"
    ]
  },
  {
    id: "combustible",
    titulo: "Combustible y Lubricantes",
    descripcion: "Suministro de combustible y lubricantes para buques",
    icon: Fuel,
    color: "bg-orange-500",
    servicios: [
      "Combustible marino",
      "Lubricantes",
      "Suministro 24/7",
      "Servicios de emergencia"
    ]
  },
  {
    id: "tecnico",
    titulo: "Servicios Técnicos",
    descripcion: "Servicios técnicos especializados para buques y equipos",
    icon: Wrench,
    color: "bg-red-500",
    servicios: [
      "Mantenimiento técnico",
      "Reparaciones especializadas",
      "Servicios de emergencia",
      "Tecnología portuaria"
    ]
  },
  {
    id: "logistica",
    titulo: "Logística y Almacenamiento",
    descripcion: "Servicios logísticos y de almacenamiento portuario",
    icon: Warehouse,
    color: "bg-indigo-500",
    servicios: [
      "Almacenamiento",
      "Distribución",
      "Gestión logística",
      "Servicios de valor agregado"
    ]
  }
]

// Servicios del Consorcio
const serviciosConsorcio = [
  {
    id: 1,
    titulo: "Gestión Portuaria",
    descripcion: "Gestión integral de operaciones portuarias y coordinación de servicios",
    icon: ShipWheel,
    caracteristicas: ["Coordinación centralizada", "Gestión de tráfico", "Optimización operativa", "Control de calidad"],
    solicitud: "A través del portal web del CGPLP"
  },
  {
    id: 2,
    titulo: "Autorizaciones y Permisos",
    descripcion: "Gestión de autorizaciones y permisos para operaciones portuarias",
    icon: FileCheck,
    caracteristicas: ["Procesamiento digital", "Tiempos de respuesta optimizados", "Seguimiento en línea", "Documentación digital"],
    solicitud: "Portal de trámites digitales"
  },
  {
    id: 3,
    titulo: "Información Operativa",
    descripcion: "Información en tiempo real sobre operaciones y condiciones portuarias",
    icon: Database,
    caracteristicas: ["Datos en tiempo real", "Reportes operativos", "Información meteorológica", "Estado de instalaciones"],
    solicitud: "Sistema de información portuaria"
  },
  {
    id: 4,
    titulo: "Coordinación de Servicios",
    descripcion: "Coordinación entre diferentes servicios portuarios y empresas",
    icon: Network,
    caracteristicas: ["Integración de servicios", "Optimización de recursos", "Comunicación centralizada", "Gestión de conflictos"],
    solicitud: "Centro de coordinación operativa"
  }
]

// Proceso de solicitud
const procesoSolicitud = [
  {
    paso: 1,
    titulo: "Identificación del Servicio",
    descripcion: "Identificar el tipo de servicio requerido según la categorización",
    icon: Search
  },
  {
    paso: 2,
    titulo: "Contacto con CGPLP",
    descripcion: "Contactar al Consorcio para coordinar la prestación del servicio",
    icon: Phone
  },
  {
    paso: 3,
    titulo: "Autorización y Permisos",
    descripcion: "Obtener las autorizaciones necesarias para la operación",
    icon: FileCheck
  },
  {
    paso: 4,
    titulo: "Coordinación con Empresas",
    descripcion: "El CGPLP coordina con las empresas de servicios portuarios",
    icon: Users
  },
  {
    paso: 5,
    titulo: "Ejecución del Servicio",
    descripcion: "Ejecución del servicio por la empresa autorizada",
    icon: CheckCircle
  }
]

// Estadísticas de servicios
const estadisticas = [
  { valor: "6", unidad: "Categorías", descripcion: "De servicios" },
  { valor: "24/7", unidad: "Disponibilidad", descripcion: "Operación continua" },
  { valor: "100%", unidad: "Cobertura", descripcion: "Servicios integrales" },
  { valor: "Digital", unidad: "Gestión", descripcion: "Procesos automatizados" },
  { valor: "Rápida", unidad: "Respuesta", descripcion: "Tiempos optimizados" },
  { valor: "Integrada", unidad: "Coordinación", descripcion: "Sistema centralizado" }
]

export default function ServiciosBuques() {
  return (
    <div className="min-h-screen bg-white">
      

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introducción */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-plp-primary mb-4">Servicios Integrales a los Buques</h2>
            <p className="text-lg text-plp-gray-700 max-w-3xl mx-auto">
              El Consorcio de Gestión del Puerto La Plata (CGPLP) coordina y gestiona una amplia gama de servicios 
              prestados por empresas especializadas, organizados por categorías según el tipo de servicio que ofrecen.
            </p>
          </div>
        </section>

        {/* Categorías de servicios */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-plp-primary mb-8 text-center">Categorías de Servicios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriasServicios.map((categoria) => (
              <Card key={categoria.id} className="p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 ${categoria.color} rounded-lg`}>
                    <categoria.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-plp-primary">{categoria.titulo}</h3>
                </div>
                <p className="text-plp-gray-700 mb-4">{categoria.descripcion}</p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-plp-gray-600">SERVICIOS INCLUIDOS:</p>
                  {categoria.servicios.map((servicio, index) => (
                    <div key={index} className="text-sm text-plp-gray-700 flex items-center gap-2">
                      <div className="w-1 h-1 bg-plp-primary rounded-full" />
                      {servicio}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Servicios del Consorcio */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-plp-primary mb-8 text-center">Servicios del Consorcio (CGPLP)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {serviciosConsorcio.map((servicio) => (
              <Card key={servicio.id} className="p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-plp-primary/10 rounded-lg">
                    <servicio.icon className="h-6 w-6 text-plp-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-plp-primary">{servicio.titulo}</h3>
                </div>
                <p className="text-plp-gray-700 mb-4">{servicio.descripcion}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-plp-gray-600">CARACTERÍSTICAS:</p>
                  {servicio.caracteristicas.map((caracteristica, index) => (
                    <div key={index} className="text-sm text-plp-gray-700 flex items-center gap-2">
                      <div className="w-1 h-1 bg-plp-primary rounded-full" />
                      {caracteristica}
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-plp-primary/5 rounded-lg">
                  <p className="text-xs font-medium text-plp-primary">SOLICITUD:</p>
                  <p className="text-sm font-semibold text-plp-gray-700">{servicio.solicitud}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Proceso de solicitud */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-plp-primary mb-8 text-center">Proceso de Solicitud de Servicios</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {procesoSolicitud.map((paso) => (
              <Card key={paso.paso} className="p-4 text-center border border-gray-100 shadow-sm">
                <div className="mx-auto mb-3 p-2 bg-plp-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                  <paso.icon className="h-6 w-6 text-plp-primary" />
                </div>
                <div className="text-2xl font-bold text-plp-primary mb-2">{paso.paso}</div>
                <h3 className="text-sm font-semibold text-plp-primary mb-2">{paso.titulo}</h3>
                <p className="text-xs text-plp-gray-600">{paso.descripcion}</p>
              </Card>
            ))}
          </div>
        </section>

        

       

        {/* CTA final */}
        <section>
          <Card className="p-8 bg-gradient-to-r from-plp-primary to-plp-secondary text-white text-center">
            <h3 className="text-2xl font-bold mb-4">¿Necesitas servicios para tu buque?</h3>
            <p className="text-lg mb-6 opacity-90">
              Contacta con el Consorcio de Gestión del Puerto La Plata para coordinar 
              los servicios que necesitas para tu operación portuaria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10">
                <FileText className="mr-2 h-4 w-4" />
                Solicitar servicio
              </Button>
              <Link href="/servicios/operadores-organismos/empresas-servicios-portuarios">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/10">
                  <Building className="mr-2 h-4 w-4" />
                  Ver empresas
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
