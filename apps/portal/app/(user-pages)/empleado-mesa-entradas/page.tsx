"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/empleados/stat-card"
import { QuickActions } from "@/components/empleados/quick-actions"
import { FeedSection } from "@/components/empleados/feed-section"
import { FileText, Building, ClipboardList, CreditCard, Clock, Calendar } from "lucide-react"

const actividadStats = [
  {
    title: "Expedientes Activos",
    value: "127",
    subtitle: "+5 nuevos esta semana",
    icon: FileText,
  },
  {
    title: "Facturas Pendientes",
    value: "43",
    subtitle: "+12 desde ayer",
    icon: FileText,
  },
  {
    title: "Licitaciones Activas",
    value: "8",
    subtitle: "2 cierran esta semana",
    icon: Building,
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
  { label: "Facturas", icon: FileText },
  { label: "Licitaciones", icon: Building },
  { label: "Mis gestiones", icon: ClipboardList },
]

const eventos = [
  {
    dateBox: "15 Ene",
    title: "Vencimiento Licitación Equipos Portuarios",
    subtitle: "Mesa de Entradas - Edificio Administrativo",
    meta: "15 Ene 2025 - 17:00",
  },
  {
    dateBox: "20 Ene",
    title: "Auditoría Expedientes Administrativos",
    subtitle: "Oficina Mesa de Entradas - Piso 2",
    meta: "20 Ene 2025 - 09:00",
  },
  {
    dateBox: "25 Ene",
    title: "Capacitación Gestión Documental",
    subtitle: "Sala de Capacitación - Planta Baja",
    meta: "25 Ene 2025 - 14:00",
  },
  {
    dateBox: "30 Ene",
    title: "Reunión Comité de Compras",
    subtitle: "Sala de Reuniones - Piso 3",
    meta: "30 Ene 2025 - 10:00",
  },
]

const actividades = [
  {
    color: "#6ba5d8",
    title: "Expediente EXP-2025-00789 ingresado",
    subtitle: "Solicitud de permiso de obra - Muelle 3",
    meta: "Hace 1 hora",
  },
  {
    color: "#6ba5d8",
    title: "Factura FC-2025-001 procesada",
    subtitle: "Servicios de limpieza - Enero 2025",
    meta: "Hace 3 horas",
  },
  {
    color: "#6ba5d8",
    title: "Licitación LIC-2025-003 publicada",
    subtitle: "Equipos de seguridad portuaria",
    meta: "Hace 4 horas",
  },
  {
    color: "#6ba5d8",
    title: "Expediente EXP-2025-00788 derivado",
    subtitle: "Derivado a Gerencia General para aprobación",
    meta: "Hace 6 horas",
  },
]

export default function EmpleadoMesaEntradasPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-[#e9f2fb] to-[#f7fbff] border border-[#d7e6f5] shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-[#1f2a44]">Bienvenido de nuevo</CardTitle>
            <CardDescription className="text-base text-[#4b5b75]">
              Aquí está tu resumen de actividad en Mesa de Entradas
            </CardDescription>
          </div>
          <QuickActions title="Accesos rápidos" actions={quickActions} />
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-md border-0 bg-[#d9e8f7]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#1f2a44]">Actividad</CardTitle>
            <CardDescription className="text-[#4b5b75]">Principales KPIs de mesa de entradas</CardDescription>
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
            <CardDescription className="text-[#4b5b75]">Últimas acciones y documentos procesados</CardDescription>
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
