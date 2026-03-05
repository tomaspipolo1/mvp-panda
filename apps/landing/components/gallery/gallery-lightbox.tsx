"use client"

import { useEffect, useState, useCallback } from "react"
import { LightboxOverlay } from "./lightbox-overlay"
import { LightboxViewer, type LightboxImageItem } from "./lightbox-viewer"

interface GalleryLightboxProps {
  open: boolean
  onClose: () => void
  items: LightboxImageItem[]
  initialIndex: number
}

export function GalleryLightbox({
  open,
  onClose,
  items,
  initialIndex,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const total = items.length
  const currentItem = total > 0 ? items[currentIndex] : null

  useEffect(() => {
    if (open) setCurrentIndex(Math.min(initialIndex, total - 1))
  }, [open, initialIndex, total])

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? total - 1 : i - 1))
  }, [total])

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i >= total - 1 ? 0 : i + 1))
  }, [total])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose, goPrev, goNext])

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open || !currentItem) return null

  return (
    <LightboxOverlay onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4" role="presentation">
        <div onClick={(e) => e.stopPropagation()} role="presentation">
          <LightboxViewer
            item={currentItem}
            currentIndex={currentIndex}
            total={total}
            onPrev={goPrev}
            onNext={goNext}
            onClose={onClose}
          />
        </div>
      </div>
    </LightboxOverlay>
  )
}

export type { LightboxImageItem }
