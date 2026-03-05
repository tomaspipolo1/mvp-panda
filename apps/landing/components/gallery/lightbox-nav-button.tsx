"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LightboxNavButtonProps {
  direction: "prev" | "next"
  onClick: () => void
  className?: string
  "aria-label": string
}

export function LightboxNavButton({
  direction,
  onClick,
  className,
  "aria-label": ariaLabel,
}: LightboxNavButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50",
        className
      )}
    >
      <Icon className="h-6 w-6" />
    </button>
  )
}
