"use client"

import { useState, useEffect, useRef } from "react"
import { UserNav } from "@/components/user-nav"
import { LoginButtons } from "@/components/login-buttons"
import { useAuth } from "./auth-context"
import { MegaMenu } from "./mega-menu"
import { MobileMenu } from "./mobile-menu"
import Link from "next/link"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { isLoggedIn } = useAuth()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Establecer la variable CSS para la altura del header
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight
        document.documentElement.style.setProperty("--header-height", `${height}px`)
      }
    }

    // Actualizar al montar y cuando cambia el estado de scrolled
    updateHeaderHeight()
    window.addEventListener("resize", updateHeaderHeight)

    return () => {
      window.removeEventListener("resize", updateHeaderHeight)
    }
  }, [scrolled])

  return (
    <header className="fixed top-[22px] left-0 right-0 w-full z-50 overflow-visible shadow-2xl" ref={headerRef}>
      {/* Fondo con color estático */}
      <div className="absolute inset-0 bg-[#1B1E4A] pointer-events-none"></div>

      {/* Main navigation bar - shrinks when scrolled */}
      <div className={`relative z-10 transition-all duration-300 ease-in-out ${scrolled ? "py-1" : "py-2 sm:py-3"}`}>
        <div className="w-full px-4 md:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-3 md:gap-4 overflow-visible">
          {/* Logo - shrinks when scrolled */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0 pl-0">
            <Link href="/">
              <img
                src="/logo-plp-white.png"
                alt="PLP Logo"
                className={`transition-all duration-300 h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 2xl:h-11 ${
                  scrolled ? "h-5 sm:h-6 md:h-7 lg:h-8 xl:h-9 2xl:h-10" : ""
                }`}
              />
            </Link>
            <Link href="/">
              <img
                src="/logo-provincia.png"
                alt="Provincia de Buenos Aires"
                className={`transition-all duration-300 h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 2xl:h-11 ${
                  scrolled ? "h-5 sm:h-6 md:h-7 lg:h-8 xl:h-9 2xl:h-10" : ""
                }`}
              />
            </Link>
          </div>

          {/* Mega Menu Navigation - show from 1366px and up */}
          <div className={`hidden min-[1366px]:flex transition-all duration-300 flex-1 justify-center min-w-0 overflow-visible ${scrolled ? "scale-95" : ""}`}>
            <MegaMenu />
          </div>

          {/* User Nav - compact and responsive */}
          <div className={`flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-5 transition-all duration-300 flex-shrink-0 pr-0 ${
            scrolled ? "scale-95" : ""
          }`}>
            {isLoggedIn ? <UserNav compact={scrolled} /> : <LoginButtons compact={scrolled} />}
            {/* Mobile Menu - show below 1366px */}
            <div className="min-[1366px]:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
