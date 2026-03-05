"use client"

import { cn } from "@/lib/utils"

interface LightboxCounterProps {
  current: number
  total: number
  className?: string
}

export function LightboxCounter({ current, total, className }: LightboxCounterProps) {
  return (
    <p
      className={cn(
        "text-center text-sm text-white/90 tabular-nums",
        className
      )}
      aria-live="polite"
    >
      {current} / {total}
    </p>
  )
}
