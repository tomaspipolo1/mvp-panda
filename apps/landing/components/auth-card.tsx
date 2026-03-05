"use client"

import type { ReactNode } from "react"
import Image from "next/image"

interface AuthCardProps {
  imageSrc: string
  imageAlt: string
  children: ReactNode
  variant?: 'login' | 'register'
}

export function AuthCard({ imageSrc, imageAlt, children, variant = 'login' }: AuthCardProps) {
  const isRegister = variant === 'register'

  return (
    <div className={`w-full ${isRegister ? 'max-w-6xl' : 'max-w-5xl'} bg-white shadow-2xl flex overflow-hidden relative rounded-lg`} style={{ minHeight: '600px' }}>
      {/* Imagen de fondo completa */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Panel izquierdo - Imagen visible (solo en desktop) */}
      <div className={`hidden md:block ${isRegister ? 'w-1/3' : 'w-1/2'} relative z-10`}>
        <div className="w-full h-full"></div>
      </div>

      {/* Panel derecho - Formulario con transparencia */}
      <div className={`w-full ${isRegister ? 'md:w-2/3' : 'md:w-1/2'} bg-white/80 backdrop-blur-sm flex items-center justify-center p-8 md:p-12 relative z-10`}>
        <div className={`w-full ${isRegister ? 'max-w-2xl' : 'max-w-md'}`}>
          {children}
        </div>
      </div>
    </div>
  )
}
