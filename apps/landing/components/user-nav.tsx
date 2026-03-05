"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import { useAuth } from "./auth-context"

export function UserNav({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false)
  const { logout } = useAuth()

  const handleLogout = () => {
    setOpen(false)
    logout()
  }

  const handlePortalUsuario = () => {
    setOpen(false)
    window.location.href = "/portal/empleado-prensa"
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`relative rounded-full px-3 w-auto text-white hover:bg-white/10 transition-all duration-300 ${
            compact ? "h-7 text-xs" : "h-8 text-sm"
          }`}
        >
          <div className="flex items-center text-white">
            <span className="font-medium text-white text-shadow">Mariano H.</span>
            <User className={`${compact ? "h-3 w-3 ml-1" : "h-4 w-4 ml-2"} text-white`} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Mariano M.</p>
            <p className="text-xs leading-none text-muted-foreground">mariano@plp.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handlePortalUsuario}>Portal usuario</DropdownMenuItem>
        <DropdownMenuItem>Mis Entidades</DropdownMenuItem>
        <DropdownMenuItem>Ayuda</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Cerrar Sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
