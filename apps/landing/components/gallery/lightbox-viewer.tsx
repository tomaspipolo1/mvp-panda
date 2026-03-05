"use client"

import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LightboxNavButton } from "./lightbox-nav-button"
import { LightboxCounter } from "./lightbox-counter"

export interface LightboxImageItem {
  id: number
  src: string
  alt: string
  category?: string
}

interface LightboxViewerProps {
  item: LightboxImageItem
  currentIndex: number
  total: number
  onPrev: () => void
  onNext: () => void
  onClose?: () => void
  onClick?: (e: React.MouseEvent) => void
  className?: string
}

export function LightboxViewer({
  item,
  currentIndex,
  total,
  onPrev,
  onNext,
  onClose,
  onClick,
  className,
}: LightboxViewerProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Vista previa: ${item.alt}`}
      className={cn(
        "relative flex flex-col items-center gap-3",
        "animate-in fade-in-0 zoom-in-95 duration-200",
        className
      )}
      onClick={onClick}
    >
      <div className="relative flex items-center gap-2 md:gap-4">
        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Cerrar"
            className="absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        {total > 1 && (
          <LightboxNavButton
            direction="prev"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            aria-label="Imagen anterior"
          />
        )}
        <div className="relative flex items-center justify-center">
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[85vh] max-w-[90vw] w-auto object-contain"
            draggable={false}
          />
        </div>
        {total > 1 && (
          <LightboxNavButton
            direction="next"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            aria-label="Siguiente imagen"
          />
        )}
      </div>

      {total > 1 && (
        <LightboxCounter current={currentIndex + 1} total={total} />
      )}
    </div>
  )
}
