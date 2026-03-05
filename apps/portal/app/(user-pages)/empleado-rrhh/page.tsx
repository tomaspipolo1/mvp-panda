"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/empleados/stat-card"
import { QuickActions } from "@/components/empleados/quick-actions"
import { FeedSection } from "@/components/empleados/feed-section"
import { Users, ClipboardList, UserCheck, CreditCard, Calendar, Clock } from "lucide-react"

const actividadStats = [
  {
    title: "Préstamos Pendientes",
    value: "8",
    subtitle: "+1 desde la semana pasada",
    icon: CreditCard,
  },
  {
    title: "Empleados Activos",
    value: "239",
    subtitle: "96.8% del total",
    icon: UserCheck,
  },
  {
    title: "Solicitudes Pendientes",
    value: "12",
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
  { label: "Listado empleados", icon: Users },
  { label: "Calendario", icon: Calendar },
  { label: "Cargos y roles", icon: UserCheck },
  { label: "Solicitudes recibidas", icon: ClipboardList },
]

const eventos = [
  {
    dateBox: "15 Ene",
    title: "Capacitación en Seguridad Industrial",
    subtitle: "Sala de Capacitación - Edificio Administrativo",
    meta: "15 Ene 2025 - 09:00",
  },
  {
    dateBox: "18 Ene",
    title: "Reunión de Evaluación de Desempeño",
    subtitle: "Oficina de RRHH - Piso 3",
    meta: "18 Ene 2025 - 14:00",
  },
  {
    dateBox: "22 Ene",
    title: "Inducción para Nuevos Empleados",
    subtitle: "Salón Auditorio - Planta Baja",
    meta: "22 Ene 2025 - 10:00",
  },
  {
    dateBox: "25 Ene",
    title: "Taller de Liderazgo",
    subtitle: "Sala de Reuniones - Piso 2",
    meta: "25 Ene 2025 - 16:00",
  },
]

const actividades = [
  {
    color: "#6ba5d8",
    title: "Solicitud de vacaciones aprobada",
    subtitle: "Juan Pérez - Departamento de Compras",
    meta: "Hace 2 horas",
  },
  {
    color: "#6ba5d8",
    title: "Nueva incorporación registrada",
    subtitle: "María González - Departamento de Seguridad",
    meta: "Hace 4 horas",
  },
  {
    color: "#6ba5d8",
    title: "Préstamo aprobado",
    subtitle: "Luis Fernández - Departamento de Operaciones",
    meta: "Hace 5 horas",
  },
  {
    color: "#6ba5d8",
    title: "Capacitación programada",
    subtitle: "Seguridad Portuaria - 15 participantes",
    meta: "Hace 6 horas",
  },
]

export default function EmpleadoRRHHPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-[#e9f2fb] to-[#f7fbff] border border-[#d7e6f5] shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-[#1f2a44]">Bienvenido de nuevo</CardTitle>
            <CardDescription className="text-base text-[#4b5b75]">
              Aquí está tu resumen de actividad en Recursos Humanos
            </CardDescription>
          </div>
          <QuickActions title="Accesos rápidos" actions={quickActions} />
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-md border-0 bg-[#d9e8f7]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#1f2a44]">Actividad</CardTitle>
            <CardDescription className="text-[#4b5b75]">Principales KPIs de RRHH</CardDescription>
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
            <CardDescription className="text-[#4b5b75]">Últimas acciones y solicitudes procesadas</CardDescription>
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
