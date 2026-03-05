"use client"

import { cn } from "@/lib/utils"

interface LightboxOverlayProps {
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}

export function LightboxOverlay({ className, onClick, children }: LightboxOverlayProps) {
  return (
    <div
      role="presentation"
      className={cn(
        "fixed inset-0 z-50 bg-black/85 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      onClick={onClick}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}
