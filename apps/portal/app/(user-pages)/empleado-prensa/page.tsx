"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/empleados/stat-card"
import { QuickActions } from "@/components/empleados/quick-actions"
import { FeedSection } from "@/components/empleados/feed-section"
import { Newspaper, Calendar, ClipboardList, CreditCard, Clock, ImageIcon } from "lucide-react"

const actividadStats = [
  {
    title: "Publicaciones del mes",
    value: "24",
    subtitle: "+4 desde el mes pasado",
    icon: Newspaper,
  },
  {
    title: "Eventos del mes",
    value: "5",
    subtitle: "-1 desde el mes pasado",
    icon: Calendar,
  },
  {
    title: "Visitas pendientes",
    value: "8",
    subtitle: "+2 desde ayer",
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
  { label: "Nuevo post", icon: Newspaper },
  { label: "Galería", icon: ImageIcon },
  { label: "Mis gestiones", icon: ClipboardList },
]

const eventos = [
  {
    dateBox: "15 Ene",
    title: "Conferencia de Prensa - Nuevos Proyectos",
    subtitle: "Sala de Prensa - Edificio Administrativo",
    meta: "15 Ene 2025 - 10:00",
  },
  {
    dateBox: "22 Ene",
    title: "Entrevista con el Director General",
    subtitle: "Oficina Dirección - Piso 4",
    meta: "22 Ene 2025 - 14:30",
  },
  {
    dateBox: "28 Ene",
    title: "Visita Guiada - Universidad Nacional",
    subtitle: "Punto de Encuentro - Entrada Principal",
    meta: "28 Ene 2025 - 09:00",
  },
  {
    dateBox: "01 Feb",
    title: "Lanzamiento Campaña Sostenibilidad",
    subtitle: "Auditorio Principal - Planta Baja",
    meta: "01 Feb 2025 - 11:00",
  },
]

const actividades = [
  {
    color: "#6ba5d8",
    title: "Post publicado en el blog",
    subtitle: '"Inauguración de la nueva sede corporativa"',
    meta: "Hace 1 hora",
  },
  {
    color: "#6ba5d8",
    title: "Visita guiada aprobada",
    subtitle: "Colegio San Martín - 25 estudiantes",
    meta: "Hace 3 horas",
  },
  {
    color: "#6ba5d8",
    title: "Imágenes subidas a galería",
    subtitle: "Evento inauguración - 15 fotografías",
    meta: "Hace 4 horas",
  },
  {
    color: "#6ba5d8",
    title: "Entrevista programada",
    subtitle: "Radio Puerto - Programa matutino",
    meta: "Hace 6 horas",
  },
]

export default function EmpleadoPrensaPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-[#e9f2fb] to-[#f7fbff] border border-[#d7e6f5] shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-[#1f2a44]">Bienvenido de nuevo</CardTitle>
            <CardDescription className="text-base text-[#4b5b75]">
              Aquí está tu resumen de actividad en Prensa
            </CardDescription>
          </div>
          <QuickActions title="Accesos rápidos" actions={quickActions} />
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-md border-0 bg-[#d9e8f7]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#1f2a44]">Actividad</CardTitle>
            <CardDescription className="text-[#4b5b75]">Principales KPIs de prensa</CardDescription>
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
