"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  Calendar,
  HelpCircle,
  ChevronDown,
  FileText,
  Truck,
  Building,
  Home,
  UserCircle,
  Shield,
  Briefcase,
  Receipt,
  FileSearch,
  ClipboardList,
  CalendarCheck,
  CalendarPlus,
  CreditCard,
  ShoppingCart,
  DollarSign,
  FileIcon as FileInvoice,
  Percent,
  ListChecks,
  FilePlus,
  ClipboardCheck,
  ClipboardPlus,
  Users,
  Store,
  ImageIcon,
  Newspaper,
  Clock,
  Eye,
  PlusCircle,
  BarChart,
  List,
  Mail,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  AppWindow,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useIsMobile } from "@/hooks/use-mobile"

type SubSubModule = {
  name: string
  icon: React.ElementType
  href: string
}

type SubModule = {
  name: string
  icon: React.ElementType
  href: string
  subModules?: SubSubModule[]
}

type Module = {
  name: string
  icon: React.ElementType
  href?: string
  subModules?: SubModule[]
}

/** Separador visual (ej. entre Inicio y el resto, o antes de Visitas) */
type SidebarSeparator = { type: "separator" }

type SidebarItem = Module | SidebarSeparator

type UserModules = {
  [key: string]: SidebarItem[]
}

export default function Sidebar({ userType = "Proveedor" }: { userType?: string }) {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null)
  const [activeSubSubModule, setActiveSubSubModule] = useState<string | null>(null)
  const [headerHeight, setHeaderHeight] = useState(64) // Altura inicial del header (16 * 4 = 64px)
  const isMobile = useIsMobile()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  // Sincronizar colapso con mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true)
    } else {
      setIsCollapsed(false)
    }
  }, [isMobile])

  // Persistencia en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("sidebar-collapsed", isCollapsed ? "true" : "false")
    } catch {}
  }, [isCollapsed])

  // Efecto para detectar el scroll y ajustar el sidebar según la altura del header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setHeaderHeight(isScrolled ? 48 : 64) // 12 * 4 = 48px cuando está scrolleado, 16 * 4 = 64px cuando no
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const userModules: UserModules = {
    Proveedor: [
      { name: "Inicio", icon: Home, href: "/proveedor" },
      { type: "separator" },
      { name: "Entidad", icon: Building, href: "/proveedor/gestion/entidad" },
      {
        name: "Facturación",
        icon: Receipt,
        href: "/proveedor/gestion/facturacion",
        subModules: [
          { name: "Mi cuenta corriente", icon: CreditCard, href: "/proveedor/gestion/facturacion/cuenta-corriente" },
          { name: "Órdenes de compra", icon: ShoppingCart, href: "/proveedor/gestion/facturacion/ordenes-compra" },
          { name: "Facturas", icon: FileInvoice, href: "/proveedor/gestion/facturacion/facturas" },
          { name: "Percepciones", icon: Percent, href: "/proveedor/gestion/facturacion/percepciones" },
        ],
      },
      { name: "Licitaciones", icon: FileSearch, href: "/proveedor/gestion/licitaciones/nueva-inscripcion" },
      { name: "Solicitudes", icon: ClipboardList, href: "/proveedor/gestion/solicitudes/mis-solicitudes" },
      { name: "Transporte", icon: Truck, href: "/proveedor/gestion/transporte/mis-transportes" },
      { name: "Mi Personal", icon: Users, href: "/proveedor/gestion/mi-personal" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/proveedor/visitas/mis-visitas" },
    ],
    "Usuario Básico": [
      { name: "Inicio", icon: Home, href: "/usuario-basico" },
      { type: "separator" },
      { name: "Mis entidades", icon: Building, href: "/usuario-basico/gestion/mis-entidades" },
      { name: "Solicitudes", icon: ClipboardList, href: "/usuario-basico/gestion/solicitudes/mis-solicitudes" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/usuario-basico/visitas/mis-visitas" },
    ],
    Cliente: [
      { name: "Inicio", icon: Home, href: "/cliente" },
      { type: "separator" },
      { name: "Entidad", icon: Building, href: "/cliente/gestion/entidad" },
      {
        name: "Facturación",
        icon: Receipt,
        href: "/cliente/gestion/facturacion",
        subModules: [
          { name: "Mi cuenta corriente", icon: CreditCard, href: "/cliente/gestion/facturacion/cuenta-corriente" },
          { name: "Mis Facturas", icon: FileInvoice, href: "/cliente/gestion/facturacion/facturas" },
          { name: "Retenciones", icon: Percent, href: "/cliente/gestion/facturacion/retenciones" },
        ],
      },
      { name: "Licitaciones", icon: FileSearch, href: "/cliente/gestion/licitaciones" },
      { name: "Solicitudes", icon: ClipboardList, href: "/cliente/gestion/solicitudes/mis-solicitudes" },
      { name: "Transporte", icon: Truck, href: "/cliente/gestion/transporte/mis-transportes" },
      { name: "Mi Personal", icon: Users, href: "/cliente/gestion/mi-personal" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/cliente/visitas/mis-visitas" },
    ],
    "Empresa Servicios Portuarios": [
      { name: "Inicio", icon: Home, href: "/empresa-servicios-portuarios" },
      { type: "separator" },
      { name: "Entidad", icon: Building, href: "/empresa-servicios-portuarios/gestion/entidad" },
      {
        name: "Facturación",
        icon: Receipt,
        href: "/empresa-servicios-portuarios/gestion/facturacion",
        subModules: [
          { name: "Mi cuenta corriente", icon: CreditCard, href: "/empresa-servicios-portuarios/gestion/facturacion/mi-cuenta-corriente" },
          { name: "Mis Facturas", icon: FileInvoice, href: "/empresa-servicios-portuarios/gestion/facturacion/mis-facturas" },
        ],
      },
      { name: "Licitaciones", icon: FileSearch, href: "/empresa-servicios-portuarios/gestion/licitaciones" },
      { name: "Solicitudes", icon: ClipboardList, href: "/empresa-servicios-portuarios/gestion/solicitudes/mis-solicitudes" },
      { name: "Transporte", icon: Truck, href: "/empresa-servicios-portuarios/gestion/transporte/mis-vehiculos" },
      { name: "Mi Personal", icon: Users, href: "/empresa-servicios-portuarios/gestion/mi-personal" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/empresa-servicios-portuarios/visitas/mis-visitas" },
    ],
    Empleado: [
      { name: "Dashboard", icon: Home, href: "/empleado" },
      { type: "separator" },
      { name: "Entidades", icon: Building, href: "/empleado/entidades" },
      { name: "Logística", icon: Truck, href: "/empleado/logistica" },
      { name: "Reportes", icon: FileText, href: "/empleado/reportes" },
      { name: "Aplicativos", icon: AppWindow, href: "/empleado/aplicativos" },
    ],
    "Empleado - Prensa": [
      { name: "Inicio", icon: Home, href: "/empleado-prensa" },
      { type: "separator" },
      { name: "Calendario", icon: Calendar, href: "/empleado-prensa/gestion/eventos/calendario" },
      { name: "Buzón Departamento", icon: Mail, href: "/empleado-prensa/gestion/buzon-departamento/solicitudes" },
      { name: "Mi Buzón", icon: Mail, href: "/empleado-prensa/gestion/mi-buzon/solicitudes" },
      { name: "Portal Empleado", icon: ClipboardList, href: "/empleado-prensa/gestion/solicitudes/mis-solicitudes" },
      { name: "Blog", icon: Newspaper, href: "/empleado-prensa/gestion/blog/mis-post" },
      { name: "Documentación", icon: FileText, href: "/empleado-prensa/gestion/documentacion" },
      { name: "Galería de imágenes", icon: ImageIcon, href: "/empleado-prensa/gestion/galeria-imagenes" },
      { name: "Aplicativos", icon: AppWindow, href: "/empleado-prensa/aplicativos" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/empleado-prensa/visitas/mis-visitas" },
    ],
    "Empleado - Compras": [
      { name: "Inicio", icon: Home, href: "/empleado-compras" },
      { type: "separator" },
      { name: "Calendario", icon: Calendar, href: "/empleado-compras/gestion/eventos/calendario" },
      { name: "Buzón Departamento", icon: Mail, href: "/empleado-compras/gestion/buzon-departamento/solicitudes" },
      { name: "Mi Buzón", icon: Mail, href: "/empleado-compras/gestion/mi-buzon/solicitudes" },
      { name: "Portal Empleado", icon: ClipboardList, href: "/empleado-compras/gestion/solicitudes/mis-solicitudes" },
      { name: "Licitaciones", icon: FileSearch, href: "/empleado-compras/gestion/licitaciones/listado" },
      { name: "Proveedores", icon: Store, href: "/empleado-compras/gestion/proveedores/listado" },
      { name: "Reportes", icon: BarChart, href: "/empleado-compras/gestion/reportes" },
      { name: "Aplicativos", icon: AppWindow, href: "/empleado-compras/aplicativos" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/empleado-compras/visitas/mis-visitas" },
    ],
    "Empleado - Seguridad": [
      { name: "Inicio", icon: Home, href: "/empleado-seguridad" },
      { type: "separator" },
      { name: "Calendario", icon: Calendar, href: "/empleado-seguridad/gestion/eventos/calendario" },
      { name: "Buzón Departamento", icon: Mail, href: "/empleado-seguridad/gestion/buzon-departamento/solicitudes" },
      { name: "Mi Buzón", icon: Mail, href: "/empleado-seguridad/gestion/mi-buzon/solicitudes" },
      { name: "Portal Empleado", icon: ClipboardList, href: "/empleado-seguridad/gestion/solicitudes/mis-solicitudes" },
      { name: "Aplicativos", icon: AppWindow, href: "/empleado-seguridad/aplicativos" },
      { type: "separator" },
      { name: "Transporte Cargas", icon: Truck, href: "/empleado-seguridad/visitas/camiones/pendientes" },
      { name: "Visitas", icon: CalendarCheck, href: "/empleado-seguridad/visitas/pendientes" },
    ],
    "Empleado - Guardia": [
      {
        name: "Visita",
        icon: Eye,
        href: "/empleado-guardia/visita",
      },
      { type: "separator" },
      {
        name: "Nueva visita",
        icon: PlusCircle,
        href: "/empleado-guardia/nueva-visita",
      },
    ],
    "Empleado - Mesa de Entradas": [
      { name: "Inicio", icon: Home, href: "/empleado-mesa-entradas" },
      { type: "separator" },
      { name: "Calendario", icon: Calendar, href: "/empleado-mesa-entradas/gestion/eventos/calendario" },
      { name: "Buzón Departamento", icon: Mail, href: "/empleado-mesa-entradas/gestion/buzon-departamento/solicitudes" },
      { name: "Mi Buzón", icon: Mail, href: "/empleado-mesa-entradas/gestion/mi-buzon/solicitudes" },
      { name: "Facturas", icon: FileInvoice, href: "/empleado-mesa-entradas/gestion/facturas" },
      { name: "Expedientes", icon: FileText, href: "/empleado-mesa-entradas/gestion/expedientes" },
      { name: "Licitaciones", icon: FileSearch, href: "/empleado-mesa-entradas/gestion/licitaciones" },
      { name: "Aplicativos", icon: AppWindow, href: "/empleado-mesa-entradas/aplicativos" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/empleado-mesa-entradas/visitas/mis-visitas" },
    ],
    "Empleado - Gerente": [
      { name: "Inicio", icon: Home, href: "/empleado-gerente" },
      { type: "separator" },
      { name: "Calendario", icon: Calendar, href: "/empleado-gerente/gestion/eventos/calendario" },
      { name: "Buzón Departamento", icon: Mail, href: "/empleado-gerente/gestion/buzon-departamento/solicitudes" },
      { name: "Mi Buzón", icon: Mail, href: "/empleado-gerente/gestion/mi-buzon/solicitudes" },
      { name: "Portal Empleado", icon: ClipboardList, href: "/empleado-gerente/gestion/solicitudes/mis-solicitudes" },
      { name: "Reportes", icon: BarChart, href: "/empleado-gerente/gestion/reportes" },
      { name: "Aplicativos", icon: AppWindow, href: "/empleado-gerente/aplicativos" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/empleado-gerente/visitas/mis-visitas" },
    ],
    "Empleado - Contable": [
      { name: "Inicio", icon: Home, href: "/empleado-contable" },
      { type: "separator" },
      { name: "Calendario", icon: Calendar, href: "/empleado-contable/gestion/eventos/calendario" },
      { name: "Buzón Departamento", icon: Mail, href: "/empleado-contable/gestion/buzon-departamento/solicitudes" },
      { name: "Mi Buzón", icon: Mail, href: "/empleado-contable/gestion/mi-buzon/solicitudes" },
      { name: "Portal Empleado", icon: ClipboardList, href: "/empleado-contable/gestion/solicitudes/mis-solicitudes" },
      { name: "Tarifario", icon: DollarSign, href: "/empleado-contable/gestion/tarifario" },
      { name: "Proveedores", icon: Store, href: "/empleado-contable/gestion/proveedores/listado" },
      { name: "Clientes", icon: Users, href: "/empleado-contable/gestion/clientes/listado" },
      { name: "Aplicativos", icon: AppWindow, href: "/empleado-contable/aplicativos" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/empleado-contable/visitas/mis-visitas" },
    ],
    "Empleado - RRHH": [
      { name: "Inicio", icon: Home, href: "/empleado-rrhh" },
      { type: "separator" },
      { name: "Calendario", icon: Calendar, href: "/empleado-rrhh/gestion/eventos/calendario" },
      { name: "Buzón Departamento", icon: Mail, href: "/empleado-rrhh/gestion/buzon-departamento/solicitudes" },
      { name: "Mi Buzón", icon: Mail, href: "/empleado-rrhh/gestion/mi-buzon/solicitudes" },
      { name: "Portal Empleado", icon: ClipboardList, href: "/empleado-rrhh/gestion/solicitudes/mis-solicitudes" },
      { name: "Empleados", icon: Users, href: "/empleado-rrhh/gestion/empleados/listado" },
      { name: "Organigrama", icon: Building, href: "/empleado-rrhh/gestion/organigrama/gerencias" },
      { name: "Aplicativos", icon: AppWindow, href: "/empleado-rrhh/aplicativos" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/empleado-rrhh/visitas/mis-visitas" },
    ],
    "Empleado - Legales": [
      { name: "Inicio", icon: Home, href: "/empleado-legales" },
      { type: "separator" },
      { name: "Calendario", icon: Calendar, href: "/empleado-legales/gestion/eventos/calendario" },
      { name: "Buzón Departamento", icon: Mail, href: "/empleado-legales/gestion/buzon-departamento/solicitudes" },
      { name: "Mi Buzón", icon: Mail, href: "/empleado-legales/gestion/mi-buzon/solicitudes" },
      { name: "Portal Empleado", icon: ClipboardList, href: "/empleado-legales/gestion/solicitudes/mis-solicitudes" },
      { name: "Empresa de Servicios Portuarios", icon: Building, href: "/empleado-legales/gestion/empresa-servicios-portuarios/listado" },
      { name: "Reportes", icon: BarChart, href: "/empleado-legales/gestion/reportes/contratos" },
      { name: "Aplicativos", icon: AppWindow, href: "/empleado-legales/aplicativos" },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/empleado-legales/visitas/mis-visitas" },
    ],
    Admin: [
      { name: "Inicio", icon: Home, href: "/admin" },
      { type: "separator" },
      {
        name: "Gestión",
        icon: Briefcase,
        subModules: [
          { name: "Calendario", icon: Calendar, href: "/admin/gestion/calendario/vista" },
          { name: "Buzón Departamento", icon: Mail, href: "/admin/gestion/buzon-departamento/solicitudes" },
          { name: "Mi Buzón", icon: Mail, href: "/admin/gestion/mi-buzon/solicitudes" },
          { name: "Portal Empleado", icon: ClipboardList, href: "/admin/gestion/portal-empleado/mis-solicitudes" },
        ],
      },
      {
        name: "Admin",
        icon: Shield,
        subModules: [
          { name: "Logs", icon: FileText, href: "/admin/admin/logs" },
          { name: "Usuarios", icon: User, href: "/admin/admin/usuarios/listado" },
          { name: "Estaticos", icon: List, href: "/admin/admin/estaticos" },
          { name: "Flujos de Aprobación", icon: CheckCircle, href: "/admin/admin/flujos-aprobacion" },
        ],
      },
      { type: "separator" },
      { name: "Visitas", icon: CalendarCheck, href: "/admin/admin/visitas/mis-visitas" },
    ],
  }

  const mvpUserModules: UserModules = {
    "Empleado - Prensa": [
      { name: "Inicio", icon: Home, href: "/empleado-prensa" },
      { type: "separator" },
      { name: "Blog", icon: Newspaper, href: "/empleado-prensa/gestion/blog/mis-post" },
      { name: "Material descargable", icon: FileText, href: "/empleado-prensa/gestion/documentacion" },
      { name: "Galería", icon: ImageIcon, href: "/empleado-prensa/gestion/galeria-imagenes" },
    ],
    "Empleado - Contable": [
      { name: "Inicio", icon: Home, href: "/empleado-contable" },
      { type: "separator" },
      { name: "Tarifario", icon: FileText, href: "/empleado-contable/gestion/tarifario" },
    ],
  }

  const modules = useMemo(
    () => mvpUserModules[userType] || mvpUserModules["Empleado - Prensa"],
    [userType],
  )

  // Sincroniza el módulo/submódulo activo con el pathname actual (ignora separadores)
  useEffect(() => {
    let bestModule: string | null = null
    let bestSubModule: string | null = null
    let bestSubSub: string | null = null
    let bestLen = 0

    const consider = (href: string | undefined, moduleName: string, subName?: string, subSubName?: string) => {
      if (!href) return
      if (pathname === href || pathname.startsWith(`${href}/`)) {
        const len = href.length
        if (len > bestLen) {
          bestLen = len
          bestModule = moduleName
          bestSubModule = subName ?? null
          bestSubSub = subSubName ?? null
        }
      }
    }

    for (const item of modules) {
      if ("type" in item && item.type === "separator") continue
      const module = item as Module
      consider(module.href, module.name)
      if (module.subModules) {
        for (const subModule of module.subModules) {
          consider(subModule.href, module.name, subModule.name)
          if (subModule.subModules) {
            for (const subSub of subModule.subModules) {
              consider(subSub.href, module.name, subModule.name, subSub.name)
            }
          }
        }
      }
    }

    setActiveModule(bestModule)
    setActiveSubModule(bestSubModule)
    setActiveSubSubModule(bestSubSub)
  }, [modules, pathname])

  const toggleModule = (moduleName: string) => {
    if (activeModule === moduleName) {
      setActiveModule(null)
      setActiveSubModule(null) // Cerrar también el submódulo activo
    } else {
      setActiveModule(moduleName)
    }
  }

  const toggleSubModule = (subModuleName: string) => {
    if (activeSubModule === subModuleName) {
      setActiveSubModule(null)
    } else {
      setActiveSubModule(subModuleName)
    }
  }

  // Estilo especial para el sidebar cuando es empleado-guardia (optimizado para tablet)
  const isGuardia = userType === "Empleado - Guardia"
  const sidebarWidth = isCollapsed ? 64 : 256;

  return (
    <aside
      className={cn(
        "text-white border-r border-plp-medium shadow-sidebar fixed z-40 flex flex-col transition-all duration-300",
        isCollapsed ? "items-center" : "items-stretch"
      )}
      style={{
        width: sidebarWidth,
        top: `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight}px)`,
        backgroundColor: "#1F1E38",
        transition: "width 0.3s cubic-bezier(.4,0,.2,1), top 0.3s ease, height 0.3s ease",
      }}
    >
      <div className={cn("h-full overflow-y-auto scrollbar-hide p-2 pt-6", isCollapsed ? "px-0" : "px-2")}
      >
        <button
          type="button"
          aria-label={isCollapsed ? "Expandir menú" : "Contraer menú"}
          className={cn(
            "flex items-center w-full py-2.5 rounded-md transition-colors text-white hover:bg-[#2a2a49] mb-2",
            isCollapsed ? "justify-center px-0" : "justify-end px-3"
          )}
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-6 w-6 text-plp-light" />
          ) : (
            <ChevronLeft className="h-6 w-6 text-plp-light" />
          )}
        </button>
        <nav className={cn("space-y-2")}
          style={{ width: isCollapsed ? 56 : "auto" }}
        >
          {modules.map((item, index) => {
            if ("type" in item && item.type === "separator") {
              return (
                <div key={`sep-${index}`} className="my-3 border-t border-plp-medium/60" />
              )
            }
            const module = item as Module
            return (
            <div key={module.name}>
              {module.subModules && module.subModules.length > 0 ? (
                <Collapsible
                  open={activeModule === module.name}
                  onOpenChange={() => toggleModule(module.name)}
                  className="w-full"
                >
                  <CollapsibleTrigger className={cn(
                    "flex items-center w-full py-2.5 px-3 rounded-md text-left transition-colors",
                    activeModule === module.name && !activeSubModule && !activeSubSubModule
                      ? "bg-[#6BA5D8] text-white"
                      : "hover:bg-[#2a2a49] text-white",
                    isCollapsed ? "justify-center" : "justify-between"
                  )}>
                    <div className="flex items-center justify-center">
                      <module.icon
                        className={cn(
                          "h-6 w-6 shrink-0",
                          activeModule === module.name && !activeSubModule && !activeSubSubModule ? "text-white" : "text-plp-light",
                          isCollapsed ? "mx-auto" : "mr-3"
                        )}
                      />
                      {!isCollapsed && <span className={cn(isGuardia && "text-lg")}>{module.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-200 text-plp-light shrink-0",
                          activeModule === module.name ? "transform rotate-180" : "",
                          isGuardia && "h-5 w-5",
                        )}
                      />
                    )}
                  </CollapsibleTrigger>
                  {!isCollapsed && (
                    <CollapsibleContent className="pl-10 space-y-2 mt-1">
                      {module.subModules.map((subModule) => (
                        <div key={subModule.name}>
                          {subModule.subModules ? (
                            <Collapsible
                              open={activeSubModule === subModule.name}
                              onOpenChange={() => toggleSubModule(subModule.name)}
                              className="w-full"
                            >
                              <CollapsibleTrigger
                                className={cn(
                                  "flex items-center justify-between w-full py-2.5 px-3 rounded-md text-left text-gray-200 transition-colors",
                                  activeSubModule === subModule.name && !activeSubSubModule
                                    ? "bg-[#6BA5D8] text-white"
                                    : "hover:bg-[#2a2a49]"
                                )}
                              >
                                <div className="flex items-center">
                                  <subModule.icon
                                    className={cn(
                                      "h-5 w-5 shrink-0 mr-2",
                                      activeSubModule === subModule.name && !activeSubSubModule ? "text-white" : "text-plp-light"
                                    )}
                                  />
                                  {!isCollapsed && <span>{subModule.name}</span>}
                                </div>
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 transition-transform duration-200 text-plp-light shrink-0",
                                    activeSubModule === subModule.name ? "transform rotate-180" : "",
                                  )}
                                />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="pl-6 space-y-2 mt-1">
                                {subModule.subModules.map((subSubModule) => (
                                  <Link
                                    key={subSubModule.name}
                                    href={subSubModule.href}
                                    className={cn(
                                      "flex items-center py-2.5 px-3 rounded-md text-gray-300 transition-colors hover:bg-[#2a2a49]",
                                      activeSubSubModule === subSubModule.name && "bg-[#6BA5D8] text-white"
                                    )}
                                  >
                                    <subSubModule.icon
                                      className={cn(
                                        "h-4 w-4 shrink-0 mr-2",
                                        activeSubSubModule === subSubModule.name ? "text-white" : "text-plp-light"
                                      )}
                                    />
                                    {!isCollapsed && <span className="text-sm">{subSubModule.name}</span>}
                                  </Link>
                                ))}
                              </CollapsibleContent>
                            </Collapsible>
                          ) : (
                            <Link
                              href={subModule.href}
                              className={cn(
                                "flex items-center py-2.5 px-3 rounded-md text-gray-200 transition-colors",
                                "hover:bg-[#2a2a49]",
                                activeSubModule === subModule.name && !activeSubSubModule && "bg-[#6BA5D8] text-white"
                              )}
                            >
                                <subModule.icon
                                className={cn(
                                  "h-5 w-5 shrink-0 mr-2",
                                  activeSubModule === subModule.name && !activeSubSubModule ? "text-white" : "text-plp-light"
                                )}
                              />
                              {!isCollapsed && <span>{subModule.name}</span>}
                            </Link>
                          )}
                        </div>
                      ))}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              ) : (
                <Link
                  href={module.href || "#"}
                  className={cn(
                    "flex items-center py-2.5 px-3 rounded-md transition-colors",
                    activeModule === module.name
                      ? "bg-[#6BA5D8] text-white"
                      : "hover:bg-[#2a2a49] text-white",
                    isGuardia && "py-4 px-3 text-lg",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <module.icon
                    className={cn(
                      "h-6 w-6 shrink-0",
                      activeModule === module.name ? "text-white" : "text-plp-light",
                      isCollapsed ? "mx-auto" : "mr-3"
                    )}
                  />
                  {!isCollapsed && <span>{module.name}</span>}
                </Link>
              )}
            </div>
          )
          })}
        </nav>
      </div>
    </aside>
  )
}
