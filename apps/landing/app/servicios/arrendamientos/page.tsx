"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Building2, ArrowRight, CheckCircle2, FileText, Users, MapPin, Ship } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import WorkingGoogleMap from "@/components/working-google-map"

const CELESTE = "#CAE6FF"

type TipoArrendamiento = "industrial" | "bien-publico" | "terminales" | null

interface ArrendamientoType {
  id: TipoArrendamiento
  titulo: string
  descripcion: string
  icon: any
  color: string
}

interface ArrendamientoDetail {
  id: TipoArrendamiento
  consisteEn: string
  quienesPueden: string[]
  usosHabilitados: string[]
  modalidad: string
}

const tiposArrendamiento: ArrendamientoType[] = [
  
  {
    id: "industrial",
    titulo: "Actividades industriales y/o comerciales",
    descripcion: "Áreas para operaciones comerciales, logísticas e industriales dentro del puerto.",
    icon: Building2,
    color: "bg-plp-gray-50 border-plp-gray-300 hover:border-plp-secondary"
  },
  {
    id: "bien-publico",
    titulo: "Entidades de bien público",
    descripcion: "Espacios para organizaciones sin fines de lucro que presten servicios a la comunidad portuaria.",
    icon: Users,
    color: "bg-plp-gray-50 border-plp-gray-300 hover:border-plp-secondary"
  },
  {
    id: "terminales",
    titulo: "Terminales portuarias",
    descripcion: "Áreas y muelles para operación de terminales de carga, contenedores, granos, combustibles y otras cargas especializadas.",
    icon: Ship,
    color: "bg-plp-gray-50 border-plp-gray-300 hover:border-plp-secondary"
  }
]

const detallesArrendamiento: Record<string, ArrendamientoDetail> = {
  
  industrial: {
    id: "industrial",
    consisteEn: "Arrendamiento de espacios, depósitos, oficinas y áreas operativas para desarrollar actividades comerciales, industriales o logísticas vinculadas a la operación portuaria. Incluye desde pequeñas oficinas hasta grandes superficies para almacenamiento y procesamiento.",
    quienesPueden: [
      "Empresas de logística y transporte",
      "Operadores portuarios",
      "Industrias vinculadas al comercio exterior",
      "Prestadores de servicios portuarios",
      "Empresas de importación y exportación"
    ],
    usosHabilitados: [
      "Almacenamiento y depósito",
      "Oficinas administrativas",
      "Operaciones logísticas",
      "Actividades industriales compatibles",
      "Talleres y servicios técnicos",
      "Espacios comerciales vinculados"
    ],
    modalidad: "Contrato de arrendamiento con plazos renovables según proyecto"
  },
  "bien-publico": {
    id: "bien-publico",
    consisteEn: "Cesión de espacios para organizaciones sin fines de lucro que presten servicios de interés social, deportivo, cultural o educativo a la comunidad portuaria y su entorno. El objetivo es fortalecer el tejido social y el bienestar de quienes habitan y trabajan en el puerto.",
    quienesPueden: [
      "Asociaciones civiles registradas",
      "Clubes deportivos",
      "Cooperativas con fines sociales",
      "Organizaciones culturales o educativas",
      "Entidades religiosas reconocidas"
    ],
    usosHabilitados: [
      "Actividades deportivas y recreativas",
      "Servicios educativos y culturales",
      "Atención social y comunitaria",
      "Actividades religiosas",
      "Espacios de encuentro comunitario"
    ],
    modalidad: "Permiso de uso gratuito o arrendamiento con condiciones preferenciales"
  },
  terminales: {
    id: "terminales",
    consisteEn: "Arrendamiento o concesión de áreas portuarias para la operación de terminales especializadas: contenedores, granos, combustibles, cargas generales u otras. Incluye el uso de muelles, patios de maniobras, instalaciones de almacenamiento y equipamiento asociado. Las terminales operan bajo normativa portuaria y acuerdos de largo plazo.",
    quienesPueden: [
      "Empresas operadoras portuarias",
      "Terminales de contenedores",
      "Terminales de granos y cereales",
      "Terminales de combustibles y líquidos",
      "Operadores de cargas generales y proyecto",
      "Consorcios o joint ventures con experiencia portuaria"
    ],
    usosHabilitados: [
      "Carga y descarga de contenedores",
      "Operaciones de granos y cereales",
      "Almacenamiento y despacho de combustibles",
      "Cargas generales y de proyecto",
      "Conectividad multimodal (ferroviaria, camión)",
      "Servicios de estiba y desestiba",
      "Almacenamiento en depósitos y patios"
    ],
    modalidad: "Concesión o arrendamiento a largo plazo mediante licitación o acuerdo directo según normativa vigente"
  }
}

const filtrosDisponibles = [
  { id: "todos", label: "Todos" },
  { id: "bien-publico", label: "Entidades de bien público" },
  { id: "industrial", label: "Actividades industriales y/o comerciales" },
  { id: "terminales", label: "Terminales portuarias" }
]

export default function PermisosUsoPage() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<TipoArrendamiento>(null)
  const [filtroMapa, setFiltroMapa] = useState<string>("todos")

  const handleSelectTipo = (tipo: TipoArrendamiento) => {
    if (tipoSeleccionado === tipo) {
      setTipoSeleccionado(null)
    } else {
      setTipoSeleccionado(tipo)
      // Scroll suave a la sección de detalles
      setTimeout(() => {
        document.getElementById('detalle-arrendamiento')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    }
  }

  const detalleActual = tipoSeleccionado ? detallesArrendamiento[tipoSeleccionado] : null

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full py-10 md:py-14" style={{ backgroundColor: CELESTE }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative rounded-xl overflow-hidden aspect-video md:aspect-[4/3] bg-plp-gray-200">
              <Image
                src="/banner.jpg"
                alt="Arrendamientos en el Puerto La Plata"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-plp-primary mb-4">
                Arrendamientos
              </h1>
              <p className="text-plp-gray-600 leading-relaxed mb-6">
                Accedé a espacios dentro del Puerto La Plata para actividades industriales comerciales, proyectos de bien público o viviendas/isleños. Te orientamos para que encuentres la opción que mejor se adapte a tus necesidades.
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-2 text-plp-gray-700">
                  <MapPin className="h-5 w-5 text-plp-primary shrink-0" />
                  <span className="text-sm md:text-base">Múltiples espacios disponibles</span>
                </div>
                <div className="flex items-center gap-2 text-plp-gray-700">
                  <FileText className="h-5 w-5 text-plp-primary shrink-0" />
                  <span className="text-sm md:text-base">Proceso claro y transparente</span>
                </div>
                <div className="flex items-center gap-2 text-plp-gray-700">
                  <Users className="h-5 w-5 text-plp-primary shrink-0" />
                  <span className="text-sm md:text-base">Asesoramiento personalizado</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-plp-primary bg-white text-plp-primary hover:bg-plp-gray-100"
                onClick={() => {
                  document.getElementById('selector-tipo')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  })
                }}
              >
                Ver opciones disponibles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de tipo de arrendamiento */}
      <section id="selector-tipo" className="w-full pt-12 md:pt-16 pb-8 md:pb-12 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-4 text-center">
            ¿ Qué tipo de espacio necesitás ?
          </h2>
          <p className="text-plp-gray-600 text-center mb-10 max-w-3xl mx-auto">
            Seleccioná el tipo de arrendamiento que mejor se adapte a tu situación para conocer más detalles sobre requisitos, usos habilitados y espacios disponibles.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiposArrendamiento.map((tipo) => {
              const isSelected = tipoSeleccionado === tipo.id
              return (
                <Card
                  key={tipo.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'ring-4 ring-plp-primary shadow-xl scale-105' 
                      : tipo.color + ' border-2 shadow-md hover:shadow-lg'
                  }`}
                  onClick={() => handleSelectTipo(tipo.id)}
                >
                  <div className="flex justify-center mb-4">
                    <tipo.icon className={`h-12 w-12 ${isSelected ? 'text-plp-primary' : 'text-plp-gray-600'}`} />
                  </div>
                  <h3 className="text-lg font-bold text-plp-primary mb-3 text-center min-h-[3.5rem] flex items-center justify-center">
                    {tipo.titulo}
                  </h3>
                  <p className="text-sm text-plp-gray-600 leading-relaxed text-center">
                    {tipo.descripcion}
                  </p>
                  {isSelected && (
                    <div className="mt-4 flex justify-center">
                      <CheckCircle2 className="h-6 w-6 text-plp-primary" />
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sección expandida con detalles */}
      {detalleActual && (
        <section 
          id="detalle-arrendamiento" 
          className="w-full py-12 md:py-16 bg-plp-gray-50 border-t-4 border-plp-primary animate-accordion-down scroll-mt-20"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-2">
                  {tiposArrendamiento.find(t => t.id === tipoSeleccionado)?.titulo}
                </h2>
                <p className="text-plp-gray-600">Información detallada sobre este tipo de arrendamiento</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* ¿En qué consiste? */}
                <Card className="p-6 bg-white border-0 shadow-md">
                  <h3 className="text-lg font-bold text-plp-primary mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    ¿En qué consiste?
                  </h3>
                  <p className="text-sm text-plp-gray-600 leading-relaxed">
                    {detalleActual.consisteEn}
                  </p>
                </Card>

                {/* Modalidad de otorgamiento */}
                <Card className="p-6 bg-white border-0 shadow-md">
                  <h3 className="text-lg font-bold text-plp-primary mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Modalidad de otorgamiento
                  </h3>
                  <p className="text-sm text-plp-gray-600 leading-relaxed">
                    {detalleActual.modalidad}
                  </p>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* ¿Quiénes pueden acceder? */}
                <Card className="p-6 bg-white border-0 shadow-md">
                  <h3 className="text-lg font-bold text-plp-primary mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    ¿Quiénes pueden acceder?
                  </h3>
                  <ul className="space-y-2">
                    {detalleActual.quienesPueden.map((item, index) => (
                      <li key={index} className="text-sm text-plp-gray-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-plp-primary shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Usos y actividades habilitadas */}
                <Card className="p-6 bg-white border-0 shadow-md">
                  <h3 className="text-lg font-bold text-plp-primary mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Usos y actividades habilitadas
                  </h3>
                  <ul className="space-y-2">
                    {detalleActual.usosHabilitados.map((item, index) => (
                      <li key={index} className="text-sm text-plp-gray-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-plp-primary shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent(`Consulta sobre ${tiposArrendamiento.find(t => t.id === tipoSeleccionado)?.titulo}`)}&mensaje=${encodeURIComponent(`Me gustaría recibir más información sobre los arrendamientos de tipo: ${tiposArrendamiento.find(t => t.id === tipoSeleccionado)?.titulo}`)}`}
                >
                  <Button size="lg" className="bg-plp-secondary text-white hover:bg-plp-primary">
                    Consultar disponibilidad
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sección del mapa con filtros */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-4 text-center">
              Espacios en el Puerto
            </h2>
            <p className="text-plp-gray-600 text-center mb-8">
              Explorá la ubicación de los espacios disponibles según el tipo de arrendamiento.
            </p>

            {/* Filtros del mapa */}
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              {filtrosDisponibles.map((filtro) => (
                <Button
                  key={filtro.id}
                  variant={filtroMapa === filtro.id ? "default" : "outline"}
                  size="sm"
                  className={`${
                    filtroMapa === filtro.id
                      ? 'bg-plp-primary text-white hover:bg-plp-primary-hover'
                      : 'border-plp-primary text-plp-primary hover:bg-plp-gray-50'
                  }`}
                  onClick={() => setFiltroMapa(filtro.id)}
                >
                  {filtro.label}
                </Button>
              ))}
            </div>

            {/* Indicador de filtro activo */}
            {filtroMapa !== "todos" && (
              <div className="mb-4 text-center">
                <span className="inline-block bg-plp-primary/10 text-plp-primary px-4 py-2 rounded-full text-sm font-medium">
                  Mostrando: {filtrosDisponibles.find(f => f.id === filtroMapa)?.label}
                </span>
              </div>
            )}

            {/* Componente del mapa */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-plp-gray-200">
              <WorkingGoogleMap />
            </div>

            <div className="mt-6 text-center text-sm text-plp-gray-500">
              Los filtros modificarán la visualización del mapa próximamente. Por el momento, se muestran todos los espacios disponibles.
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="w-full py-14 md:py-20 bg-plp-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-plp-primary border-0 rounded-2xl shadow-xl text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Nuestro equipo está disponible para orientarte en el proceso de arrendamiento, resolver tus consultas y acompañarte en cada paso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/contacto?tipoConsulta=comercial&asunto=${encodeURIComponent('Consulta sobre arrendamientos')}&mensaje=${encodeURIComponent('Me gustaría recibir información sobre el proceso de arrendamiento en el Puerto La Plata.')}`}
              >
                <Button size="lg" className="bg-white text-plp-primary hover:bg-plp-gray-100">
                  Contactar al equipo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
