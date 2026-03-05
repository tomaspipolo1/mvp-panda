"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { label: "El Puerto", href: "/puerto" },
  { label: "Comercial", href: "/comercial" },
  { label: "Prensa", href: "/prensa" },
  { label: "Servicios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
  { label: "Estadísticas", href: "/estadisticas" },
  { label: "Trabajo en PLP", href: "/trabajo" },
]

export function MainNav({ compact = false }: { compact?: boolean }) {
  const [activeItem, setActiveItem] = useState("")

  return (
    <nav className="hidden md:flex items-center">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-all duration-300 font-medium hover:text-blue-300 text-white text-shadow",
            compact ? "px-3 py-1 text-sm" : "px-4 py-2 text-base",
            activeItem === item.href ? "text-blue-300" : "text-white",
          )}
          onClick={() => setActiveItem(item.href)}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
