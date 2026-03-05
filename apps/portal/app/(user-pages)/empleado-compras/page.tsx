"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/empleados/stat-card"
import { QuickActions } from "@/components/empleados/quick-actions"
import { FeedSection } from "@/components/empleados/feed-section"
import {
  Building,
  ClipboardList,
  Calendar,
  Clock,
  CreditCard,
  ShoppingCart,
  Gavel,
  DollarSign,
  AlertTriangle,
  UserCheck,
  MessageCircle,
  FilePlus,
  LayoutDashboard,
  Users,
} from "lucide-react"

const actividadStats = [
  {
    title: "Gastos del Mes (Promedio)",
    value: "$245K",
    subtitle: "Total de gastos: $2.94M",
    icon: DollarSign,
    color: "#3b82f6",
  },
  {
    title: "Gastos Emergencia (Promedio)",
    value: "$32K",
    subtitle: "Total de gastos: $384K",
    icon: AlertTriangle,
    color: "#22c55e",
  },
  {
    title: "Proveedores a Autorizar",
    value: "8",
    subtitle: "Total de proveedores: 156",
    icon: UserCheck,
    color: "#f97316",
  },
]

const infoPersonalStats = [
  {
    title: "Días Vacaciones",
    value: "18",
    subtitle: "Días restantes 2025",
    icon: Calendar,
    color: "#a855f7",
  },
  {
    title: "Días Trámite",
    value: "5",
    subtitle: "Días restantes disponibles",
    icon: Clock,
    color: "#6366f1",
  },
  {
    title: "Préstamo Disponible",
    value: "$850K",
    subtitle: "Monto máximo disponible",
    icon: CreditCard,
    color: "#ec4899",
  },
]

const quickActions = [
  { label: "Calendario", icon: Calendar },
  { label: "Proveedores", icon: Building },
  { label: "Licitaciones", icon: Gavel },
  { label: "Mis gestiones", icon: ClipboardList },
]

const eventos = [
  {
    dateBox: "18 Ene",
    title: "Apertura Licitación Grúas Portuarias",
    subtitle: "Sala de Licitaciones - Edificio Administrativo",
    meta: "18 Ene 2025 - 10:00",
  },
  {
    dateBox: "20 Ene",
    title: "Comité de Compras",
    subtitle: "Sala de Reuniones - Piso 3",
    meta: "20 Ene 2025 - 14:00",
  },
  {
    dateBox: "25 Ene",
    title: "Inspección Proveedor TecnoPort",
    subtitle: "Instalaciones del Proveedor",
    meta: "25 Ene 2025 - 09:00",
  },
  {
    dateBox: "01 Feb",
    title: "Recepción Equipos Logísticos",
    subtitle: "Almacén Central - Puerto",
    meta: "01 Feb 2025 - 08:00",
  },
]

const actividades = [
  {
    color: "#6ba5d8",
    title: "Orden de compra aprobada",
    subtitle: "OC-2025-001 - Aceros del Sur S.A.",
    meta: "Hace 1 hora",
  },
  {
    color: "#6ba5d8",
    title: "Nuevo proveedor registrado",
    subtitle: "Transportes Marítimos del Plata",
    meta: "Hace 3 horas",
  },
  {
    color: "#6ba5d8",
    title: "Licitación publicada",
    subtitle: "LIC-2025-003 - Equipos de Seguridad",
    meta: "Hace 4 horas",
  },
  {
    color: "#6ba5d8",
    title: "Solicitud de compra procesada",
    subtitle: "SOL-2025-045 - Departamento de Operaciones",
    meta: "Hace 5 horas",
  },
]

export default function EmpleadoComprasPage() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="bg-gradient-to-r from-[#e9f2fb] to-[#f7fbff] border border-[#d7e6f5] shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-[#1f2a44]">Bienvenido de nuevo, María</CardTitle>
            <CardDescription className="text-base text-[#4b5b75]">
              Aquí está tu resumen de actividad en Compras
            </CardDescription>
          </div>
          <QuickActions title="Accesos rápidos" actions={quickActions} />
        </CardHeader>
      </Card>

      {/* Métricas agrupadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-md border-0 bg-[#d9e8f7]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#1f2a44]">Actividad</CardTitle>
            <CardDescription className="text-[#4b5b75]">Principales KPIs de compras</CardDescription>
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

      {/* Feed + eventos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#1f2a44]">
              <LayoutDashboard className="h-5 w-5 text-[#6ba5d8]" />
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
