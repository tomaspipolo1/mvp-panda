"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { MapPin, Phone, Mail, ExternalLink, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type Empresa = {
  id: number
  nombre: string
  telefono: string
  email: string
  direccion: string
}

// 4 grupos según diseño de referencia
const grupos = [
  {
    id: "grupo-1",
    titulo: "Grupo 1",
    descripcion: "Servicios de remolque de buques y asistencia en maniobras portuarias",
    filtros: [
      { value: "remolque", label: "Tareas de remolque de buques" },
      { value: "asistencia", label: "Asistencia en maniobras portuarias" },
      { value: "emergencia", label: "Servicios de emergencia" },
    ],
    empresas: [
      { id: 1, nombre: "Remolcadores La Plata S.A.", telefono: "+54 221 123-4567", email: "info@remolcadoreslaplata.com", direccion: "Calle falsa 123 P8D9" },
      { id: 2, nombre: "Asistencia Portuaria del Sur", telefono: "+54 221 234-5678", email: "contacto@asistenciasur.com", direccion: "Puerto La Plata, Buenos Aires" },
    ] as Empresa[],
  },
  {
    id: "grupo-2",
    titulo: "Grupo 2",
    descripcion: "Servicios de limpieza de buques, tanques y mantenimiento portuario",
    filtros: [
      { value: "estiba", label: "Tareas de estiba (movimientos de mercadería de cualquier tipo) a buques u otros medios de transporte y/o depósito y/o plazoleta" },
      { value: "limpieza", label: "Limpieza de tanques y buques" },
      { value: "mantenimiento", label: "Mantenimiento portuario" },
    ],
    empresas: [
      { id: 3, nombre: "Limpieza Portuaria Integral", telefono: "+54 221 345-6789", email: "info@limpiezaportuaria.com", direccion: "Puerto La Plata, Buenos Aires" },
      { id: 4, nombre: "EcoClean Portuario", telefono: "+54 221 456-7890", email: "info@ecocleanportuario.com", direccion: "Puerto La Plata, Buenos Aires" },
      { id: 5, nombre: "Título de la card", telefono: "115129632895", email: "adngadga@gmail.com", direccion: "Calle falsa 123 P8D9" },
    ] as Empresa[],
  },
  {
    id: "grupo-3",
    titulo: "Grupo 3",
    descripcion: "Provisión de personal especializado para operaciones portuarias",
    filtros: [
      { value: "personal", label: "Personal especializado" },
      { value: "capacitacion", label: "Capacitación portuaria" },
    ],
    empresas: [
      { id: 6, nombre: "Personal Portuario Especializado", telefono: "+54 221 567-8901", email: "info@personalportuario.com", direccion: "Puerto La Plata, Buenos Aires" },
      { id: 7, nombre: "Recursos Humanos Portuarios", telefono: "+54 221 678-9012", email: "contacto@rhportuarios.com", direccion: "Puerto La Plata, Buenos Aires" },
    ] as Empresa[],
  },
  {
    id: "grupo-4",
    titulo: "Grupo 4",
    descripcion: "Oferta de servicios portuarios complementarios y especializados.",
    filtros: [
      { value: "combustible", label: "Combustible y lubricantes" },
      { value: "tecnico", label: "Servicios técnicos" },
      { value: "logistica", label: "Logística y almacenamiento" },
    ],
    empresas: [
      { id: 8, nombre: "Combustibles Portuarios S.A.", telefono: "+54 221 789-0123", email: "info@combustiblesportuarios.com", direccion: "Puerto La Plata, Buenos Aires" },
      { id: 9, nombre: "Servicios Técnicos Portuarios", telefono: "+54 221 901-2345", email: "info@serviciostecnicosportuarios.com", direccion: "Puerto La Plata, Buenos Aires" },
      { id: 10, nombre: "Logística Portuaria Integral", telefono: "+54 221 123-4567", email: "info@logisticaportuaria.com", direccion: "Puerto La Plata, Buenos Aires" },
    ] as Empresa[],
  },
]

export default function EmpresasServiciosPortuarios() {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string>(grupos[0].id)
  const [filtroPorGrupo, setFiltroPorGrupo] = useState<Record<string, string>>({})
  const [expandidos, setExpandidos] = useState<Record<string, boolean>>(
    Object.fromEntries(grupos.map((g) => [g.id, g.id === grupos[0].id]))
  )

  const toggleExpandido = (id: string) => {
    setExpandidos((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sección destacada */}
      <div className="w-full py-12" style={{ backgroundColor: "#CAE6FF" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1B1E4A" }}>
              Empresas de Servicios Portuarios Habilitadas
            </h1>
            <p className="text-lg mb-6" style={{ color: "#1B1E4A", opacity: 0.8 }}>
              Centro de Información Integral para operadores del comercio exterior,
              facilitando la gestión aduanera y operaciones portuarias eficientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white hover:bg-gray-50" style={{ color: "#1B1E4A" }}>
                <ExternalLink className="mr-2 h-5 w-5" />
                Buscar empresa
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-white/50 hover:bg-white" style={{ color: "#1B1E4A", borderColor: "#1B1E4A" }}>
                <Search className="mr-2 h-5 w-5" />
                Ver categorías
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Seleccioná el tipo de servicio + grupos + detalle */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold text-plp-primary mb-6">
          Seleccioná el tipo de servicio que necesitás
        </h2>

        {/* 4 cards horizontales de grupos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {grupos.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGrupoSeleccionado(g.id)}
              className={`text-left p-4 rounded-xl border transition-colors ${
                grupoSeleccionado === g.id
                  ? "border-plp-primary bg-plp-gray-100/60 shadow-sm"
                  : "border-plp-gray-200 bg-white hover:bg-plp-gray-50"
              }`}
            >
              <h3 className="text-base font-bold text-plp-primary mb-1">{g.titulo}</h3>
              <p className="text-sm text-plp-gray-600 leading-snug line-clamp-3">{g.descripcion}</p>
            </button>
          ))}
        </div>

        {/* Secciones colapsables por grupo */}
        {grupos.map((g) => (
          <Collapsible
            key={g.id}
            open={expandidos[g.id] ?? false}
            onOpenChange={() => toggleExpandido(g.id)}
          >
            <Card className="mb-4 overflow-hidden rounded-xl border border-plp-gray-200">
              <div className="p-4 md:p-5 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-plp-gray-200">
                      <MapPin className="h-4 w-4 text-plp-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-plp-primary">{g.titulo}</h3>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-plp-primary font-medium hover:bg-plp-primary/10"
                    >
                      {expandidos[g.id] ? "Mostrar menos" : "Mostrar todos"}
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent>
                  <div className="mt-4 pt-4 border-t border-plp-gray-100">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-sm font-medium text-plp-gray-700">Filtrar por:</span>
                      <Select
                        value={filtroPorGrupo[g.id] ?? g.filtros[0].value}
                        onValueChange={(v) => setFiltroPorGrupo((prev) => ({ ...prev, [g.id]: v }))}
                      >
                        <SelectTrigger className="w-full min-w-[200px] max-w-md bg-plp-primary/10 border-plp-primary/30 text-plp-primary font-medium">
                          <SelectValue placeholder="Elegir filtro" />
                        </SelectTrigger>
                        <SelectContent>
                          {g.filtros.map((f) => (
                            <SelectItem key={f.value} value={f.value} className="line-clamp-2">
                              {f.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-sm text-plp-gray-600 mb-4">
                      Tarifas y aranceles para operaciones de importación
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {g.empresas.map((emp) => (
                        <Card
                          key={emp.id}
                          className="p-4 rounded-xl border border-plp-gray-200 bg-plp-gray-50/50"
                        >
                          <div className="flex gap-3">
                            <Avatar className="h-12 w-12 rounded-full bg-plp-gray-300 shrink-0">
                              <AvatarFallback className="bg-plp-gray-400 text-white text-sm font-semibold">
                                {emp.nombre.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-plp-primary truncate">{emp.nombre}</h4>
                              <p className="text-xs text-plp-gray-600 mt-1">{emp.direccion}</p>
                              <p className="text-xs text-plp-gray-600">{emp.email}</p>
                              <p className="text-xs text-plp-gray-600">{emp.telefono}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="flex-1 bg-plp-primary hover:bg-plp-primary/90 text-white" asChild>
                              <a href={`tel:${emp.telefono.replace(/\s/g, "")}`}>Llamar</a>
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 border-plp-primary text-plp-primary hover:bg-plp-gray-50" asChild>
                              <a href={`mailto:${emp.email}`}>Enviar un correo</a>
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Card>
          </Collapsible>
        ))}

      </div>

      {/* Sobre las Empresas Habilitadas — fondo gris a ancho completo, 3 cards más anchas */}
      <section className="w-full py-14 bg-plp-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold text-plp-primary mb-4">Sobre las Empresas Habilitadas</h2>
            <p className="text-plp-gray-700">
              Todas las empresas listadas cuentan con la habilitación correspondiente del Consorcio de Gestión del Puerto La Plata (CGPLP)
              y están autorizadas para operar en el complejo portuario. Cada empresa ha sido evaluada y cumple con los estándares
              de calidad y seguridad requeridos.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { titulo: "Habilitadas", texto: "Las empresas cuentan con habilitación oficial" },
              { titulo: "Certificadas", texto: "Cumplen con estándares de calidad y seguridad" },
              { titulo: "Autorizadas", texto: "Autorizadas para operar en Puerto La Plata" },
            ].map((item) => (
              <Card key={item.titulo} className="p-8 md:p-10 text-center border-2 border-violet-200 bg-white rounded-xl shadow-sm flex-1 min-w-0">
                <div className="mx-auto mb-4 p-2.5 rounded-full w-14 h-14 flex items-center justify-center bg-plp-primary/10">
                  <MapPin className="h-7 w-7 text-plp-primary" />
                </div>
                <h3 className="text-xl font-semibold text-plp-primary mb-3">{item.titulo}</h3>
                <p className="text-plp-gray-600">{item.texto}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Tienes un proyecto en mente? — banner oscuro + 2 botones */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <section className="py-0">
          <Card className="max-w-4xl mx-auto p-8 md:p-10 rounded-2xl bg-plp-primary border-0 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">¿Tienes un proyecto en mente?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Nuestro equipo comercial está disponible para analizar tu propuesta y encontrar la mejor manera de hacerla realidad en el Puerto La Plata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-plp-primary hover:bg-plp-gray-100" asChild>
                <Link href="/contacto">Contactar equipo comercial</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent" asChild>
                <Link href="/contacto">Solicitar cotización</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
