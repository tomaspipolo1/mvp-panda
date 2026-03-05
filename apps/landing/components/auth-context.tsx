"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Por defecto sin sesión

  useEffect(() => {
    try {
      const saved = localStorage.getItem("landing-is-logged-in")
      if (saved === "true") {
        setIsLoggedIn(true)
      }
    } catch {
      // no-op en entornos sin storage
    }
  }, [])

  const login = () => {
    setIsLoggedIn(true)
    try {
      localStorage.setItem("landing-is-logged-in", "true")
    } catch {}
  }

  const logout = () => {
    setIsLoggedIn(false)
    try {
      localStorage.removeItem("landing-is-logged-in")
    } catch {}
  }

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
