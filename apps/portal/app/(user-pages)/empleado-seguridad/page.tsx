"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/empleados/stat-card"
import { QuickActions } from "@/components/empleados/quick-actions"
import { FeedSection } from "@/components/empleados/feed-section"
import { Truck, Shield, ClipboardList, Calendar, CreditCard, Clock } from "lucide-react"

const actividadStats = [
  {
    title: "Accesos Pendientes",
    value: "12",
    subtitle: "+3 desde ayer",
    icon: Shield,
  },
  {
    title: "Accesos Transportes",
    value: "28",
    subtitle: "A ingresar el día de hoy",
    icon: Truck,
  },
  {
    title: "Gestiones Pendientes",
    value: "6",
    subtitle: "-2 desde ayer",
    icon: ClipboardList,
  },
]

const infoPersonalStats = [
  {
    title: "Días Vacaciones",
    value: "18",
    subtitle: "Días restantes 2025",
    icon: Calendar,
  },
  {
    title: "Días Trámite",
    value: "5",
    subtitle: "Días restantes disponibles",
    icon: Clock,
  },
  {
    title: "Préstamo Disponible",
    value: "$850K",
    subtitle: "Monto máximo disponible",
    icon: CreditCard,
  },
]

const quickActions = [
  { label: "Calendario", icon: Calendar },
  { label: "Visitas pendientes", icon: Shield },
  { label: "Transporte cargas", icon: Truck },
  { label: "Nueva visita", icon: Calendar },
  { label: "Mis gestiones", icon: ClipboardList },
]

const eventos = [
  {
    dateBox: "20 Ene",
    title: "Simulacro de Emergencia",
    subtitle: "Área de Seguridad - Puerto Principal",
    meta: "20 Ene 2025 - 09:00",
  },
  {
    dateBox: "22 Ene",
    title: "Capacitación Seguridad Industrial",
    subtitle: "Sala de Capacitación - Edificio Administrativo",
    meta: "22 Ene 2025 - 14:00",
  },
  {
    dateBox: "25 Ene",
    title: "Inspección Equipos Seguridad",
    subtitle: "Almacén Central - Puerto",
    meta: "25 Ene 2025 - 10:00",
  },
  {
    dateBox: "28 Ene",
    title: "Reunión Comité Seguridad",
    subtitle: "Sala de Reuniones - Piso 2",
    meta: "28 Ene 2025 - 16:00",
  },
]

const actividades = [
  {
    color: "#6ba5d8",
    title: "Acceso aprobado para TecnoPort SA",
    subtitle: "ACC-2025-042 - Acceso a Muelle",
    meta: "Hace 1 hora",
  },
  {
    color: "#6ba5d8",
    title: "Nuevo registro de transporte",
    subtitle: "Camión ABC-123 - Transportes del Plata",
    meta: "Hace 2 horas",
  },
  {
    color: "#6ba5d8",
    title: "Solicitud de visita procesada",
    subtitle: "VIS-2025-089 - Inspección técnica",
    meta: "Hace 3 horas",
  },
  {
    color: "#6ba5d8",
    title: "Incidente de seguridad reportado",
    subtitle: "INC-2025-003 - Área de carga",
    meta: "Hace 4 horas",
  },
]

export default function EmpleadoSeguridadPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-[#e9f2fb] to-[#f7fbff] border border-[#d7e6f5] shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-[#1f2a44]">Bienvenido de nuevo</CardTitle>
            <CardDescription className="text-base text-[#4b5b75]">
              Aquí está tu resumen de actividad en Seguridad y Accesos
            </CardDescription>
          </div>
          <QuickActions title="Accesos rápidos" actions={quickActions} />
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-md border-0 bg-[#d9e8f7]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#1f2a44]">Actividad</CardTitle>
            <CardDescription className="text-[#4b5b75]">Principales KPIs de seguridad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {actividadStats.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  subtitle={stat.subtitle}
                  icon={stat.icon}
                  iconColor="#6ba5d8"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-[#e0e2e8]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#1f2a44]">Información personal</CardTitle>
            <CardDescription className="text-[#4b5b75]">Datos de RRHH para el empleado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {infoPersonalStats.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  subtitle={stat.subtitle}
                  icon={stat.icon}
                  iconColor="#1f2a44"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#1f2a44]">
              <ClipboardList className="h-5 w-5 text-[#6ba5d8]" />
              Actividad reciente
            </CardTitle>
            <CardDescription className="text-[#4b5b75]">Últimas acciones y gestiones procesadas</CardDescription>
          </CardHeader>
          <CardContent>
            <FeedSection title="" items={actividades} variant="activity" />
          </CardContent>
        </Card>

        <Card className="shadow-md border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#1f2a44]">
              <Calendar className="h-5 w-5 text-[#6ba5d8]" />
              Próximos eventos
            </CardTitle>
            <CardDescription className="text-[#4b5b75]">Tu agenda programada</CardDescription>
          </CardHeader>
          <CardContent>
            <FeedSection title="" items={eventos} variant="events" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
