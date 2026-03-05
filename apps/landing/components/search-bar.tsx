"use client"

import { useEffect, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
      // Cmd/Ctrl+K toggles search
      const isCmdOrCtrl = event.metaKey || event.ctrlKey
      if (isCmdOrCtrl && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (open) {
      // Focus input when opening
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = inputRef.current?.value?.trim()
    if (!value) return
    // Hook search integration here
    console.log("search:", value)
    setOpen(false)
  }

  return (
    <div className="relative flex items-center">
      <Button
        size={compact ? "xs" : "sm"}
        className={cn("bg-[#0077B6] hover:bg-[#005A8D] transition-all duration-300", compact ? "h-7 w-7 p-0" : "h-9 w-9 p-0")}
        aria-label="Abrir búsqueda"
        onClick={() => setOpen((v) => !v)}
      >
        <Search className={compact ? "h-3 w-3" : "h-4 w-4"} />
      </Button>

      {open && (
        <>
          {/* Overlay below the header so it stays sharp */}
          <div
            className="fixed left-0 right-0 bottom-0 z-[40] bg-gradient-to-b from-black/30 via-black/20 to-black/0 backdrop-blur-sm"
            style={{ top: "var(--header-height, 80px)" }}
            aria-hidden
          />

          {/* Spotlight container under header, centered */}
          <div
            className="fixed left-0 right-0 z-[70] flex justify-center px-4"
            style={{ top: "calc(var(--header-height, 80px) + 16px)" }}
          >
            <div
              ref={panelRef}
              className="w-full max-w-2xl rounded-lg bg-black/60 backdrop-blur-sm shadow-xl border border-white/20 p-3 text-white transition-all duration-200 ease-out scale-100 opacity-100"
            >
              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <Input ref={inputRef} type="search" placeholder="Buscar..." className="h-11 flex-1 bg-black/40 text-white placeholder:text-white/70 border-white/20" />
                <Button type="submit" size="sm" className="h-11 px-3 bg-[#0077B6] hover:bg-[#005A8D]">
                  <Search className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="h-11 px-2 text-white hover:bg-white/10" aria-label="Cerrar búsqueda" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Helper function since we're not importing from lib/utils directly
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
