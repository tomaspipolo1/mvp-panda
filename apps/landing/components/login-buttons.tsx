"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "./auth-context"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export function LoginButtons({ compact = false }: { compact?: boolean }) {
  const { login } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={compact ? "xs" : "sm"}
          className={`border-blue-400 bg-blue-500/30 !text-white hover:bg-blue-500/50 hover:border-blue-300 transition-all duration-300 flex items-center gap-1 ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          Iniciar sesión
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48" style={{ backgroundColor: '#1B1E4A' }}>
        <DropdownMenuItem asChild>
          <Link href="/login" className="cursor-pointer text-white hover:bg-white/10">
            Iniciar sesión
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem asChild>
          <Link href="/registro" className="cursor-pointer text-white hover:bg-white/10">
            O creá tu cuenta
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
